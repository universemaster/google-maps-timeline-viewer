import type { CorrectionCommand } from "../model/corrections.js";
import type { AnnotationRule, VisitAnnotation } from "../model/types.js";

const DATABASE_NAME = "PlacesTrackerAnalyticsDB";
const DATABASE_VERSION = 2;

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
  const database = await openPlacesDatabase();
  try {
    const transaction = database.transaction(storeName, "readwrite");
    await requestResult(transaction.objectStore(storeName).put(value));
  } finally { database.close(); }
}

async function getAll<T>(storeName: string): Promise<T[]> {
  const database = await openPlacesDatabase();
  try { return await requestResult(database.transaction(storeName, "readonly").objectStore(storeName).getAll()) as T[]; }
  finally { database.close(); }
}

export const placesPersistence = {
  putCorrection: (command: CorrectionCommand) => put("corrections", command),
  getCorrections: () => getAll<CorrectionCommand>("corrections"),
  putAnnotation: (annotation: VisitAnnotation) => put("annotations", annotation),
  getAnnotations: () => getAll<VisitAnnotation>("annotations"),
  putAnnotationRule: (rule: AnnotationRule) => put("annotation-rules", rule),
  getAnnotationRules: () => getAll<AnnotationRule>("annotation-rules"),
  putSuggestionDecision: (decision: StoredSuggestionDecision) => put("suggestion-decisions", decision),
  getSuggestionDecisions: () => getAll<StoredSuggestionDecision>("suggestion-decisions"),
  putCache: <T>(record: AnalyticsCacheRecord<T>) => put("analytics-cache", record),
  getCacheRecords: <T>() => getAll<AnalyticsCacheRecord<T>>("analytics-cache"),
};
