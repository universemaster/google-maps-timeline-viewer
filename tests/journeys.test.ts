import { describe, expect, it } from "vitest";
import { buildJourneyAnalytics, buildPublicTransportAnalytics, buildWalkingAnalytics } from "../src/analytics/journeys.js";
import type { Journey, SourceReference } from "../src/model/types.js";

const source: SourceReference = { importSessionId: "i", format: "takeout", sourceName: "fixture", recordPath: "0" };
const walking: Journey = {
  id: "walk", startPlaceId: "home", endPlaceId: "cafe", interval: { start: "2026-01-01T10:00:00Z", end: "2026-01-01T10:30:00Z", startUncertain: false, endUncertain: false },
  travelMode: "WALKING", distanceMeters: 2_000,
  path: [
    { at: "2026-01-01T10:00:00Z", coordinates: { latitude: 51, longitude: -3 } },
    { at: "2026-01-01T10:10:00Z", coordinates: { latitude: 51.005, longitude: -3 } },
    { at: "2026-01-01T10:15:00Z", coordinates: { latitude: 51.005, longitude: -3 } },
    { at: "2026-01-01T10:30:00Z", coordinates: { latitude: 51.01, longitude: -3 } },
  ], confidence: null, source, annotationId: null,
};

describe("journey analytics", () => {
  it("calculates movement, pauses, speed and route directness", () => {
    const metrics = buildJourneyAnalytics(walking);
    expect(metrics.durationMs).toBe(30 * 60_000);
    expect(metrics.stationaryDurationMs).toBe(5 * 60_000);
    expect(metrics.movingDurationMs).toBe(25 * 60_000);
    expect(metrics.pauses).toHaveLength(1);
    expect(metrics.averageSpeedKph).toBeCloseTo(4);
    expect(metrics.routeDirectness).toBeGreaterThan(0.5);
  });

  it("calculates walking pace and route novelty", () => {
    const similar = { ...walking, id: "old" };
    const metrics = buildWalkingAnalytics(walking, [similar]);
    expect(metrics?.averagePaceMinutesPerKilometre).toBeCloseTo(12.5);
    expect(metrics?.pauseCount).toBe(1);
    expect(metrics?.percentagePreviouslyTravelled).toBe(100);
    expect(metrics?.mostSimilarWalks[0]?.journeyId).toBe("old");
  });

  it("does not overclaim an exact public transport service", () => {
    const train = { ...walking, id: "train", travelMode: "TRAIN" };
    const metrics = buildPublicTransportAnalytics(train, [], []);
    expect(metrics?.likelyService).toBeNull();
    expect(metrics?.explanation).toContain("not enough evidence");
  });
});
