import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createServer as createNetServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";
import { applyExternalPlaceResolutions, createPlacesServer, defaultPlacesServerConfig, ServerStateRepository } from "../src/server/places-server.js";

const execFileAsync = promisify(execFile);
const temporaryDirectories: string[] = [];

async function temporaryDirectory(): Promise<string> {
  const path = await mkdtemp(join(tmpdir(), "places-server-test-"));
  temporaryDirectories.push(path);
  return path;
}

async function freePort(): Promise<number> {
  const server = createNetServer();
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  await new Promise<void>(resolve => server.close(() => resolve()));
  return port;
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map(path => rm(path, { recursive: true, force: true })));
});

describe("Places Mac server", () => {
  it("applies shared evidence resolutions to canonical places", () => {
    const timeline = {
      meta: { schemaVersion: 1, generatedAt: "", sources: [], dateRange: { start: null, end: null } },
      places: [{ id: "google_cafe", name: "Unknown place", category: null, coordinates: null, boundary: null, googlePlaceId: "cafe", semanticType: null, ignored: false, notes: "", tags: [], sourceReferences: [] }],
      visits: [], journeys: [], rawLocationPoints: [], annotations: [], categories: [], tags: [], qualityIssues: [], suggestedPlaces: [], importSessions: [],
    };
    expect(applyExternalPlaceResolutions(timeline, [{ placeId: "cafe", label: "Resolved Cafe", category: "Cafe", confidence: "high", confidenceScore: 95, sources: ["payment"], reason: "Coordinate and payment agree." }])).toBe(1);
    expect(timeline.places[0]).toMatchObject({ name: "Resolved Cafe", category: "Cafe", tags: ["evidence-resolved"] });
    expect(timeline.places[0]?.notes).toContain("95/100");
  });

  it("serves health, protects personal data, and persists shared state", async () => {
    const rootDir = await temporaryDirectory();
    await mkdir(join(rootDir, "data"), { recursive: true });
    const timelinePath = join(rootDir, "Timeline.json");
    await writeFile(timelinePath, JSON.stringify({ semanticSegments: [{
      startTime: "2026-07-01T09:00:00Z", endTime: "2026-07-01T10:00:00Z",
      visit: { topCandidate: { placeId: "cafe", semanticType: "CAFE", placeLocation: { latLng: "51.5°, -3.2°" } } },
    }] }));
    const port = await freePort();
    const { server, token } = await createPlacesServer({
      ...defaultPlacesServerConfig(rootDir), rootDir, host: "127.0.0.1", port, timelinePath,
      statePath: join(rootDir, "data/state.json"), tokenPath: join(rootDir, ".token"), placeResolutionsPath: join(rootDir, "missing-resolutions.json"), gitCommit: false, gitPush: false,
    });
    await new Promise<void>(resolve => server.listen(port, "127.0.0.1", resolve));
    try {
      expect(await (await fetch(`http://127.0.0.1:${port}/api/health`)).json()).toMatchObject({ ok: true, foregroundOnly: true, timelineAvailable: true });
      expect((await fetch(`http://127.0.0.1:${port}/api/bootstrap`)).status).toBe(401);
      const bootstrap = await (await fetch(`http://127.0.0.1:${port}/api/bootstrap`, { headers: { "X-Places-Token": token } })).json() as { timeline: { visits: unknown[] } };
      expect(bootstrap.timeline.visits).toHaveLength(1);
      expect((await fetch(`http://127.0.0.1:${port}/Timeline.json`)).status).toBe(404);

      const annotation = { id: "annotation-one", visitId: "visit-one", note: "Tea with Jo" };
      expect((await fetch(`http://127.0.0.1:${port}/api/state/annotations`, { method: "PUT", headers: { "Content-Type": "application/json", "X-Places-Token": token }, body: JSON.stringify(annotation) })).status).toBe(200);
      expect(await (await fetch(`http://127.0.0.1:${port}/api/state/annotations`, { headers: { "X-Places-Token": token } })).json()).toEqual([annotation]);
      expect((await fetch(`http://127.0.0.1:${port}/api/state/annotations/annotation-one`, { method: "DELETE", headers: { "X-Places-Token": token } })).status).toBe(204);
    } finally {
      await new Promise<void>(resolve => server.close(() => resolve()));
    }
  });

  it("commits only the tracked server state file after a mutation", async () => {
    const rootDir = await temporaryDirectory();
    await mkdir(join(rootDir, "data"), { recursive: true });
    await execFileAsync("git", ["init", "-q"], { cwd: rootDir });
    await execFileAsync("git", ["config", "user.email", "places-test@example.invalid"], { cwd: rootDir });
    await execFileAsync("git", ["config", "user.name", "Places Test"], { cwd: rootDir });
    await writeFile(join(rootDir, "README.md"), "fixture\n");
    await execFileAsync("git", ["add", "README.md"], { cwd: rootDir });
    await execFileAsync("git", ["commit", "-q", "-m", "Initial fixture"], { cwd: rootDir });
    await writeFile(join(rootDir, "unrelated.txt"), "leave me alone\n");
    const config = { ...defaultPlacesServerConfig(rootDir), rootDir, statePath: join(rootDir, "data/state.json"), gitCommit: true, gitPush: false };
    const repository = new ServerStateRepository(config);
    await repository.mutate("record", state => { state.collections.settings.theme = { key: "theme", value: "dark" }; }, "settings");
    const { stdout: changedFiles } = await execFileAsync("git", ["show", "--pretty=", "--name-only", "HEAD"], { cwd: rootDir });
    expect(changedFiles.trim()).toBe("data/state.json");
    expect(JSON.parse(await readFile(config.statePath, "utf8"))).toMatchObject({ collections: { settings: { theme: { value: "dark" } } } });
    const { stdout: status } = await execFileAsync("git", ["status", "--porcelain"], { cwd: rootDir });
    expect(status).toContain("?? unrelated.txt");
  });
});
