import { describe, expect, it } from "vitest";
import { coveredMilliseconds, durationMilliseconds, mergeIntervals, overlappingMilliseconds } from "../src/analytics/intervals.js";

describe("interval utilities", () => {
  it("calculates valid durations and rejects incomplete or reversed intervals", () => {
    expect(durationMilliseconds("2026-01-01T00:00:00Z", "2026-01-01T01:00:00Z")).toBe(3_600_000);
    expect(durationMilliseconds(null, "2026-01-01T01:00:00Z")).toBeNull();
    expect(durationMilliseconds("2026-01-02T00:00:00Z", "2026-01-01T00:00:00Z")).toBeNull();
  });

  it("merges overlapping and touching coverage without double counting", () => {
    const intervals = [{ startMs: 0, endMs: 10 }, { startMs: 5, endMs: 20 }, { startMs: 20, endMs: 25 }];
    expect(mergeIntervals(intervals)).toEqual([{ startMs: 0, endMs: 25 }]);
    expect(coveredMilliseconds(intervals)).toBe(25);
  });

  it("calculates overlap", () => {
    expect(overlappingMilliseconds({ startMs: 0, endMs: 10 }, { startMs: 5, endMs: 15 })).toBe(5);
    expect(overlappingMilliseconds({ startMs: 0, endMs: 5 }, { startMs: 6, endMs: 10 })).toBe(0);
  });
});
