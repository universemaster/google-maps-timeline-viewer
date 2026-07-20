import type { CanonicalTimeline } from "../model/types.js";

export const ANALYTICS_VERSION = "places-analytics-v1";

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`).join(",")}}`;
  return JSON.stringify(value);
}

function fnv1a(value: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function buildAnalyticsCacheKey(timeline: CanonicalTimeline, operation: string, settings: unknown = {}, editRevision = 0): string {
  const identity = {
    analyticsVersion: ANALYTICS_VERSION,
    schemaVersion: timeline.schemaVersion,
    importFingerprint: timeline.importSession.fingerprint,
    operation,
    settings,
    editRevision,
  };
  return `${ANALYTICS_VERSION}:${operation}:${fnv1a(stableStringify(identity))}`;
}
