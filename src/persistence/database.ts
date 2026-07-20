import type { CorrectionCommand } from "../model/corrections.js";
import type { AnnotationRule, VisitAnnotation } from "../model/types.js";

const DATABASE_NAME = "PlacesTrackerAnalyticsDB";
const DATABASE_VERSION = 2;

function remoteServerMode(): boolean {
  return typeof window !== "undefined" && new URLSearchParams(window.location.search).get("server") === "1";
}

function remoteServerToken(): string {
  return typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("token") ?? "";
}

async function remoteRequest<T>(storeName: string, method: "GET" | "PUT" | "DELETE", key?: string, value?: unknown): Promise<T> {
  const path = `/api/state/${encodeURIComponent(storeName)}${key ? `/${encodeURIComponent(key)}` : ""}`;
  const response = await fetch(path, {
    method,
    headers: { "X-Places-Token": remoteServerToken(), ...(value === undefined ? {} : { "Content-Type": "application/json" }) },
    ...(value === undefined ? {} : { body: JSON.stringify(value) }),
  });
  if (!response.ok) throw new Error(`Places server state request failed (${response.status}).`);
  return response.status === 204 ? undefined as T : await response.json() as T;
}

function valueKey(storeName: string, value: unknown): string {
  const record = value as Record<string, unknown>;
  const field = storeName === "suggestion-decisions" ? "suggestionId" : storeName === "analytics-cache" || storeName === "settings" ? "key" : "id";
  const key = record[field];
  if (typeof key !== "string" || !key) throw new Error(`Missing ${field} for ${storeName}.`);
  return key;
}

export type SuggestionDecision = "accepted" | "merged" | "ignored-once" | "ignored-permanently";

export interface StoredSuggestionDecision {
  suggestionId: string;
  decision: SuggestionDecision;
  decidedAt: string;
  targetPlaceId?: string;
}

export interface AnalyticsCacheRecord<T = unknown> {
  key: string;
  value: T;
  createdAt: string;
  analyticsVersion: string;
}

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed."));
  });
}

export function openPlacesDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains("corrections")) database.createObjectStore("corrections", { keyPath: "id" });
      if (!database.objectStoreNames.contains("annotations")) database.createObjectStore("annotations", { keyPath: "id" });
      if (!database.objectStoreNames.contains("annotation-rules")) database.createObjectStore("annotation-rules", { keyPath: "id" });
      if (!database.objectStoreNames.contains("suggestion-decisions")) database.createObjectStore("suggestion-decisions", { keyPath: "suggestionId" });
      if (!database.objectStoreNames.contains("analytics-cache")) database.createObjectStore("analytics-cache", { keyPath: "key" });
      if (!database.objectStoreNames.contains("settings")) database.createObjectStore("settings", { keyPath: "key" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Unable to open the places database."));
  });
}

async function put<T>(storeName: string, value: T): Promise<void> {
  if (remoteServerMode()) {
    await remoteRequest(storeName, "PUT", valueKey(storeName, value), value);
    return;
  }
  const database = await openPlacesDatabase();
  try {
    const transaction = database.transaction(storeName, "readwrite");
    await requestResult(transaction.objectStore(storeName).put(value));
  } finally { database.close(); }
}

async function getAll<T>(storeName: string): Promise<T[]> {
  if (remoteServerMode()) return remoteRequest<T[]>(storeName, "GET");
  const database = await openPlacesDatabase();
  try { return await requestResult(database.transaction(storeName, "readonly").objectStore(storeName).getAll()) as T[]; }
  finally { database.close(); }
}

async function get<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
  if (remoteServerMode()) {
    const records = await remoteRequest<T[]>(storeName, "GET");
    return records.find(record => valueKey(storeName, record) === String(key));
  }
  const database = await openPlacesDatabase();
  try { return await requestResult(database.transaction(storeName, "readonly").objectStore(storeName).get(key)) as T | undefined; }
  finally { database.close(); }
}

async function remove(storeName: string, key: IDBValidKey): Promise<void> {
  if (remoteServerMode()) {
    await remoteRequest(storeName, "DELETE", String(key));
    return;
  }
  const database = await openPlacesDatabase();
  try {
    const transaction = database.transaction(storeName, "readwrite");
    await requestResult(transaction.objectStore(storeName).delete(key));
  } finally { database.close(); }
}

export const placesPersistence = {
  putCorrection: (command: CorrectionCommand) => put("corrections", command),
  getCorrections: () => getAll<CorrectionCommand>("corrections"),
  putAnnotation: (annotation: VisitAnnotation) => put("annotations", annotation),
  getAnnotations: () => getAll<VisitAnnotation>("annotations"),
  putAnnotationRule: (rule: AnnotationRule) => put("annotation-rules", rule),
  deleteAnnotationRule: (id: string) => remove("annotation-rules", id),
  getAnnotationRules: () => getAll<AnnotationRule>("annotation-rules"),
  putSuggestionDecision: (decision: StoredSuggestionDecision) => put("suggestion-decisions", decision),
  getSuggestionDecisions: () => getAll<StoredSuggestionDecision>("suggestion-decisions"),
  putCache: <T>(record: AnalyticsCacheRecord<T>) => put("analytics-cache", record),
  getCache: <T>(key: string) => get<AnalyticsCacheRecord<T>>("analytics-cache", key),
  getCacheRecords: <T>() => getAll<AnalyticsCacheRecord<T>>("analytics-cache"),
};
