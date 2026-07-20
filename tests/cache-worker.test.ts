import { describe, expect, it } from "vitest";
import { buildAnalyticsCacheKey } from "../src/analytics/cache.js";
import { calculateIntelligenceJob } from "../src/analytics/worker-jobs.js";
import type { CanonicalTimeline } from "../src/model/types.js";

const timeline: CanonicalTimeline = {
  schemaVersion: 1,
  importSession: { id: "i", importedAt: "2026-07-01T00:00:00Z", sourceName: "fixture", format: "takeout", fingerprint: "abc", firstEventAt: null, lastEventAt: null, recordCount: 0 },
  places: [], visits: [], journeys: [], rawLocationPoints: [], annotations: [], warnings: [],
};

describe("versioned analytics cache and worker jobs", () => {
  it("invalidates keys when settings or edits change", () => {
    const original = buildAnalyticsCacheKey(timeline, "intelligence", { timeZone: "UTC" }, 1);
    expect(buildAnalyticsCacheKey(timeline, "intelligence", { timeZone: "UTC" }, 1)).toBe(original);
    expect(buildAnalyticsCacheKey(timeline, "intelligence", { timeZone: "Europe/London" }, 1)).not.toBe(original);
    expect(buildAnalyticsCacheKey(timeline, "intelligence", { timeZone: "UTC" }, 2)).not.toBe(original);
  });

  it("reports staged progress and returns serialisable analytics", async () => {
    const progress: number[] = [];
    const result = await calculateIntelligenceJob({ timeline, timeZone: "UTC" }, update => progress.push(update.progress));
    expect(progress).toEqual([0.05, 0.5, 0.78, 1]);
    expect(result.routine.observations).toEqual([]);
    expect(result.anomalies).toEqual([]);
  });

  it("honours cancellation before work begins", async () => {
    await expect(calculateIntelligenceJob({ timeline, timeZone: "UTC" }, () => {}, () => true)).rejects.toMatchObject({ name: "AbortError" });
  });
});
