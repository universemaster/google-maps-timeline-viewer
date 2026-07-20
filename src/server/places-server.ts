import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { execFile } from "node:child_process";
import { createReadStream, existsSync } from "node:fs";
import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { extname, join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";
import { gzip } from "node:zlib";
import { normalizeTimeline } from "../importers/normalize.js";
import type { CanonicalTimeline } from "../model/types.js";

const execFileAsync = promisify(execFile);
const gzipAsync = promisify(gzip);
const COLLECTIONS = ["corrections", "annotations", "annotation-rules", "suggestion-decisions", "analytics-cache", "settings"] as const;
export type StateCollection = typeof COLLECTIONS[number];

export interface LegacyEdits { additions: unknown[]; modifications: unknown[]; deletions: unknown[] }
export interface ServerState {
  schemaVersion: 1;
  updatedAt: string;
  collections: Record<StateCollection, Record<string, unknown>>;
  legacyEdits: LegacyEdits;
}

export interface PlacesServerConfig {
  rootDir: string;
  host: string;
  port: number;
  timelinePath: string;
  statePath: string;
  tokenPath: string;
  androidApkPath: string;
  placeResolutionsPath: string;
  gitCommit: boolean;
  gitPush: boolean;
}

export function defaultPlacesServerConfig(rootDir = process.cwd()): PlacesServerConfig {
  return {
    rootDir,
    host: process.env.PLACES_HOST ?? "0.0.0.0",
    port: Number(process.env.PLACES_PORT ?? 8787),
    timelinePath: process.env.PLACES_TIMELINE_PATH ?? join(rootDir, "combined_location_history_dedupe_work/staging/unique_data_files/0016_Timeline.json"),
    statePath: process.env.PLACES_STATE_PATH ?? join(rootDir, "data/places-server-state.json"),
    tokenPath: process.env.PLACES_TOKEN_PATH ?? join(rootDir, ".places-server-token"),
    androidApkPath: process.env.PLACES_ANDROID_APK ?? join(rootDir, "build/android/PlacesTrackerAndroid-debug.apk"),
    placeResolutionsPath: process.env.PLACES_RESOLUTIONS_PATH ?? resolve(rootDir, "..", "everything-tracker", "data", "places", "place-resolutions.json"),
    gitCommit: process.env.PLACES_GIT_COMMIT !== "0",
    gitPush: process.env.PLACES_GIT_PUSH === "1",
  };
}

interface ExternalPlaceResolution {
  placeId?: string;
  label?: string;
  category?: string;
  confidence?: string;
  confidenceScore?: number;
  sources?: string[];
  reason?: string;
}

export function applyExternalPlaceResolutions(timeline: CanonicalTimeline, resolutions: readonly ExternalPlaceResolution[]): number {
  const byId = new Map(resolutions.filter(row => row.placeId && row.label).map(row => [row.placeId!, row]));
  let applied = 0;
  for (const place of timeline.places) {
    const rawId = place.googlePlaceId ?? (place.id.startsWith("google_") ? place.id.slice("google_".length) : place.id);
    const resolution = byId.get(rawId);
    if (!resolution?.label) continue;
    place.name = resolution.label;
    if (resolution.category) place.category = resolution.category;
    const evidenceNote = [
      `Evidence resolution: ${resolution.confidence ?? "unknown"} confidence${Number.isFinite(resolution.confidenceScore) ? ` (${resolution.confidenceScore}/100)` : ""}.`,
      resolution.reason,
      resolution.sources?.length ? `Sources: ${resolution.sources.join(", ")}.` : "",
    ].filter(Boolean).join(" ");
    if (evidenceNote && !place.notes.includes(evidenceNote)) place.notes = [place.notes, evidenceNote].filter(Boolean).join("\n");
    if (!place.tags.includes("evidence-resolved")) place.tags.push("evidence-resolved");
    applied += 1;
  }
  return applied;
}

async function readExternalPlaceResolutions(filePath: string): Promise<ExternalPlaceResolution[]> {
  try {
    const parsed = JSON.parse(await readFile(filePath, "utf8")) as { resolutions?: ExternalPlaceResolution[] } | ExternalPlaceResolution[];
    return Array.isArray(parsed) ? parsed : Array.isArray(parsed.resolutions) ? parsed.resolutions : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export function emptyServerState(): ServerState {
  return {
    schemaVersion: 1,
    updatedAt: new Date(0).toISOString(),
    collections: Object.fromEntries(COLLECTIONS.map(name => [name, {}])) as ServerState["collections"],
    legacyEdits: { additions: [], modifications: [], deletions: [] },
  };
}

export async function ensureServerToken(path: string): Promise<string> {
  if (existsSync(path)) return (await readFile(path, "utf8")).trim();
  await mkdir(resolve(path, ".."), { recursive: true });
  const token = randomBytes(32).toString("hex");
  await writeFile(path, `${token}\n`, { mode: 0o600, flag: "wx" });
  return token;
}

function safeEqual(left: string, right: string): boolean {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

function commitMessage(action: string, collection?: string): string {
  return `Update Places ${collection ? `${collection} ` : ""}${action}`.replace(/\s+/g, " ").trim();
}

export class ServerStateRepository {
  constructor(private readonly config: PlacesServerConfig) {}

  async read(): Promise<ServerState> {
    try {
      const parsed = JSON.parse(await readFile(this.config.statePath, "utf8")) as Partial<ServerState>;
      const base = emptyServerState();
      return {
        ...base,
        ...parsed,
        collections: { ...base.collections, ...(parsed.collections ?? {}) },
        legacyEdits: { ...base.legacyEdits, ...(parsed.legacyEdits ?? {}) },
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return emptyServerState();
      throw error;
    }
  }

  async mutate(action: string, change: (state: ServerState) => void, collection?: string): Promise<ServerState> {
    const state = await this.read();
    change(state);
    state.updatedAt = new Date().toISOString();
    await mkdir(resolve(this.config.statePath, ".."), { recursive: true });
    const temporaryPath = `${this.config.statePath}.${process.pid}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
    await rename(temporaryPath, this.config.statePath);
    if (this.config.gitCommit) await this.commit(commitMessage(action, collection));
    return state;
  }

  private async commit(message: string): Promise<void> {
    const stateRelativePath = relative(this.config.rootDir, this.config.statePath);
    await execFileAsync("git", ["add", "--", stateRelativePath], { cwd: this.config.rootDir });
    const { stdout } = await execFileAsync("git", ["status", "--porcelain", "--", stateRelativePath], { cwd: this.config.rootDir });
    if (!stdout.trim()) return;
    await execFileAsync("git", ["commit", "--only", "-m", message, "--", stateRelativePath], { cwd: this.config.rootDir });
    if (this.config.gitPush) await execFileAsync("git", ["push"], { cwd: this.config.rootDir });
  }
}

function json(response: ServerResponse, status: number, value: unknown): void {
  const body = Buffer.from(JSON.stringify(value));
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Content-Length": body.length, "Cache-Control": "no-store" });
  response.end(body);
}

async function readJson(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.from(chunk as Uint8Array);
    size += buffer.length;
    if (size > 10 * 1024 * 1024) throw new Error("Request body is too large.");
    chunks.push(buffer);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "null") as unknown;
}

function mimeType(path: string): string {
  return ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json; charset=utf-8", ".apk": "application/vnd.android.package-archive" } as Record<string, string>)[extname(path)] ?? "application/octet-stream";
}

function collectionKey(collection: StateCollection, value: Record<string, unknown>): string | null {
  const field = collection === "suggestion-decisions" ? "suggestionId" : collection === "analytics-cache" || collection === "settings" ? "key" : "id";
  return typeof value[field] === "string" && value[field] ? value[field] as string : null;
}

export async function createPlacesServer(input: Partial<PlacesServerConfig> = {}): Promise<{ server: Server; config: PlacesServerConfig; token: string }> {
  const config = { ...defaultPlacesServerConfig(input.rootDir), ...input };
  const token = await ensureServerToken(config.tokenPath);
  const repository = new ServerStateRepository(config);
  let timelineCache: { modifiedMs: number; resolutionsModifiedMs: number; timeline: CanonicalTimeline; resolvedPlaces: number } | null = null;

  const authenticated = (request: IncomingMessage, url: URL): boolean => {
    const supplied = request.headers["x-places-token"] ?? url.searchParams.get("token") ?? "";
    return typeof supplied === "string" && safeEqual(supplied, token);
  };

  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
      if (url.pathname === "/api/health") {
        const sourceStat = await stat(config.timelinePath).catch(() => null);
        const resolutionsStat = await stat(config.placeResolutionsPath).catch(() => null);
        json(response, 200, { ok: true, foregroundOnly: true, timelineAvailable: Boolean(sourceStat), timelineModifiedAt: sourceStat?.mtime.toISOString() ?? null, placeResolutionsAvailable: Boolean(resolutionsStat), placeResolutionsModifiedAt: resolutionsStat?.mtime.toISOString() ?? null });
        return;
      }
      if (url.pathname.startsWith("/api/") && !authenticated(request, url)) { json(response, 401, { error: "Invalid or missing Places server token." }); return; }

      if (request.method === "GET" && url.pathname === "/api/bootstrap") {
        const sourceStat = await stat(config.timelinePath);
        const resolutionsStat = await stat(config.placeResolutionsPath).catch(() => null);
        const resolutionsModifiedMs = resolutionsStat?.mtimeMs ?? 0;
        if (!timelineCache || timelineCache.modifiedMs !== sourceStat.mtimeMs || timelineCache.resolutionsModifiedMs !== resolutionsModifiedMs) {
          const raw = JSON.parse(await readFile(config.timelinePath, "utf8")) as unknown;
          const timeline = normalizeTimeline(raw, { sourceName: config.timelinePath, importedAt: sourceStat.mtime.toISOString() });
          const resolvedPlaces = applyExternalPlaceResolutions(timeline, await readExternalPlaceResolutions(config.placeResolutionsPath));
          timelineCache = { modifiedMs: sourceStat.mtimeMs, resolutionsModifiedMs, timeline, resolvedPlaces };
        }
        const payload = Buffer.from(JSON.stringify({ timeline: timelineCache.timeline, state: await repository.read(), server: { foregroundOnly: true, gitCommit: config.gitCommit, evidenceResolvedPlaces: timelineCache.resolvedPlaces } }));
        const compressed = await gzipAsync(payload);
        response.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Content-Encoding": "gzip", "Content-Length": compressed.length, "Cache-Control": "no-store" });
        response.end(compressed);
        return;
      }

      const stateMatch = url.pathname.match(/^\/api\/state\/([^/]+)(?:\/([^/]+))?$/);
      if (stateMatch) {
        const collection = decodeURIComponent(stateMatch[1] ?? "") as StateCollection;
        const key = stateMatch[2] ? decodeURIComponent(stateMatch[2]) : null;
        if (!COLLECTIONS.includes(collection)) { json(response, 404, { error: "Unknown state collection." }); return; }
        if (request.method === "GET") { json(response, 200, Object.values((await repository.read()).collections[collection])); return; }
        if (request.method === "PUT") {
          const value = await readJson(request) as Record<string, unknown>;
          const resolvedKey = key ?? collectionKey(collection, value);
          if (!resolvedKey) { json(response, 400, { error: "State record is missing its key." }); return; }
          await repository.mutate("record", state => { state.collections[collection][resolvedKey] = value; }, collection);
          json(response, 200, value); return;
        }
        if (request.method === "DELETE" && key) {
          await repository.mutate("record", state => { delete state.collections[collection][key]; }, collection);
          response.writeHead(204); response.end(); return;
        }
      }

      if (url.pathname === "/api/legacy-edits") {
        if (request.method === "GET") { json(response, 200, (await repository.read()).legacyEdits); return; }
        if (request.method === "PUT") {
          const edits = await readJson(request) as LegacyEdits;
          await repository.mutate("timeline edits", state => { state.legacyEdits = edits; });
          json(response, 200, edits); return;
        }
      }

      const requestedPath = url.pathname === "/" ? "/timeline.html" : url.pathname;
      const publicStaticPath = requestedPath === "/timeline.html" || requestedPath.startsWith("/assets/") || requestedPath === "/android/latest.apk";
      if (!publicStaticPath) { json(response, 404, { error: "Not found." }); return; }
      const filePath = requestedPath === "/android/latest.apk" ? config.androidApkPath : resolve(config.rootDir, `.${requestedPath}`);
      if (requestedPath !== "/android/latest.apk" && filePath !== config.rootDir && !filePath.startsWith(`${resolve(config.rootDir)}${sep}`)) { json(response, 403, { error: "Forbidden." }); return; }
      const fileStat = await stat(filePath).catch(() => null);
      if (!fileStat?.isFile()) { json(response, 404, { error: "Not found." }); return; }
      response.writeHead(200, { "Content-Type": mimeType(filePath), "Content-Length": fileStat.size, "Cache-Control": requestedPath.endsWith(".html") ? "no-cache" : "public, max-age=300" });
      createReadStream(filePath).pipe(response);
    } catch (error) {
      console.error(error);
      json(response, 500, { error: error instanceof Error ? error.message : "Internal server error." });
    }
  });
  return { server, config, token };
}

export async function startPlacesServer(input: Partial<PlacesServerConfig> = {}): Promise<Server> {
  const { server, config } = await createPlacesServer(input);
  await new Promise<void>((resolvePromise, reject) => {
    server.once("error", reject);
    server.listen(config.port, config.host, () => resolvePromise());
  });
  console.log(`Places server ready on http://${config.host}:${config.port}`);
  console.log("This process is foreground-only; press Ctrl-C to stop it.");
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await startPlacesServer();
