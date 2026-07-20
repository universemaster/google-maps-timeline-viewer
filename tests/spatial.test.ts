import { describe, expect, it } from "vitest";
import { coordinateCentroid, estimatedRadiusMeters, haversineMeters } from "../src/analytics/spatial.js";

describe("spatial utilities", () => {
  it("calculates realistic local distances", () => {
    const distance = haversineMeters(
      { latitude: 51.5902, longitude: -3.3260 },
      { latitude: 51.6002, longitude: -3.3260 },
    );
    expect(distance).toBeGreaterThan(1_100);
    expect(distance).toBeLessThan(1_120);
  });

  it("calculates centroid and spread", () => {
    const points = [{ latitude: 51, longitude: -3 }, { latitude: 53, longitude: -1 }];
    expect(coordinateCentroid(points)).toEqual({ latitude: 52, longitude: -2 });
    expect(estimatedRadiusMeters(points)).toBeGreaterThan(100_000);
  });
});
