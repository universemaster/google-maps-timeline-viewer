import { describe, expect, it } from "vitest";
import { mean, median, movingAverage, percentile, percentileRank, summarizeDistribution } from "../src/analytics/statistics.js";

describe("statistical utilities", () => {
  it("calculates interpolated percentiles without mutating input", () => {
    const values = [40, 10, 30, 20];
    expect(percentile(values, 0.1)).toBeCloseTo(13);
    expect(percentile(values, 0.25)).toBeCloseTo(17.5);
    expect(median(values)).toBe(25);
    expect(percentile(values, 0.9)).toBeCloseTo(37);
    expect(values).toEqual([40, 10, 30, 20]);
  });

  it("returns null for empty distributions", () => {
    expect(mean([])).toBeNull();
    expect(median([])).toBeNull();
    expect(summarizeDistribution([])).toMatchObject({ count: 0, median: null, interquartileRange: null });
  });

  it("summarises robust distribution measures", () => {
    expect(summarizeDistribution([1, 2, 3, 4, 100])).toMatchObject({
      count: 5,
      minimum: 1,
      p25: 2,
      median: 3,
      p75: 4,
      maximum: 100,
      interquartileRange: 2,
    });
  });

  it("calculates percentile ranks with tied values", () => {
    expect(percentileRank([1, 2, 2, 4], 2)).toBe(50);
  });

  it("calculates trailing moving averages", () => {
    expect(movingAverage([1, 2, 3, 4], 3)).toEqual([null, null, 2, 3]);
  });
});
