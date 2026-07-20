import { describe, expect, it } from "vitest";
import { scoreJourney, scoreVisit } from "../src/analytics/confidence.js";
import { buildDataQualitySummary } from "../src/analytics/data-quality.js";
import { buildSelectedDaySummary } from "../src/analytics/selected-day.js";
import type { Journey, Place, SourceReference, Visit } from "../src/model/types.js";

const source: SourceReference = { importSessionId: "i", format: "takeout", sourceName: "fixture", recordPath: "0" };
const places: Place[] = [
  { id: "home", name: "Home", category: "Home", coordinates: { latitude: 51, longitude: -3 }, boundary: null, googlePlaceId: null, semanticType: "HOME", ignored: false, notes: "", tags: [], sourceReferences: [source] },
  { id: "cafe", name: "Cafe", category: "Cafe", coordinates: { latitude: 51.01, longitude: -3 }, boundary: null, googlePlaceId: null, semanticType: "CAFE", ignored: false, notes: "", tags: [], sourceReferences: [source] },
];

function visit(id: string, placeId: string, start: string, end: string): Visit {
  return { id, placeId, interval: { start, end, startUncertain: false, endUncertain: false }, coordinates: places.find(place => place.id === placeId)?.coordinates ?? null, confidence: null, source: { ...source, recordPath: id }, annotationId: null };
}

function journey(overrides: Partial<Journey> = {}): Journey {
  return {
    id: "journey",
    startPlaceId: "home",
    endPlaceId: "cafe",
    interval: { start: "2026-07-01T09:00:00Z", end: "2026-07-01T10:00:00Z", startUncertain: false, endUncertain: false },
    travelMode: "WALKING",
    distanceMeters: 4_000,
    path: [{ at: null, coordinates: { latitude: 51, longitude: -3 } }, { at: null, coordinates: { latitude: 51.01, longitude: -3 } }],
    confidence: null,
    source: { ...source, recordPath: "journey" },
    annotationId: null,
    ...overrides,
  };
}

describe("selected-day intelligence", () => {
  it("reconciles home, outside, movement and coverage intervals", () => {
    const visits = [
      visit("home-morning", "home", "2026-07-01T00:00:00Z", "2026-07-01T09:00:00Z"),
      visit("cafe", "cafe", "2026-07-01T10:00:00Z", "2026-07-01T12:00:00Z"),
      visit("home-evening", "home", "2026-07-01T12:00:00Z", "2026-07-01T23:00:00Z"),
    ];
    const summary = buildSelectedDaySummary("2026-07-01", "UTC", places, visits, [journey()]);
    expect(summary.timeAtHomeMs).toBe(20 * 3_600_000);
    expect(summary.timeOutsideHomeMs).toBe(3 * 3_600_000);
    expect(summary.walkingDurationMs).toBe(3_600_000);
    expect(summary.walkingDistanceMeters).toBe(4_000);
    expect(summary.trackingCoveragePercent).toBeCloseTo(95.8333, 3);
    expect(summary.largestTrackingGapMs).toBe(3_600_000);
    expect(summary.newPlaces).toBe(2);
  });
});

describe("explainable confidence and quality", () => {
  it("provides reasons for weak evidence", () => {
    const weakVisit = { ...visit("weak", "cafe", "2026-07-01T10:00:00Z", "2026-07-01T10:01:00Z"), coordinates: null };
    const confidence = scoreVisit(weakVisit);
    expect(confidence.score).toBe(57);
    expect(confidence.components.map(component => component.code)).toEqual(["missing-coordinates", "very-short-visit"]);
  });

  it("flags impossible journeys and reports score distributions", () => {
    const impossible = journey({ distanceMeters: 500_000, interval: { start: "2026-07-01T10:00:00Z", end: "2026-07-01T11:00:00Z", startUncertain: false, endUncertain: false } });
    expect(scoreJourney(impossible).components.map(component => component.code)).toContain("implausible-speed");
    const quality = buildDataQualitySummary(places, [visit("v", "cafe", "2026-07-01T10:00:00Z", "2026-07-01T11:00:00Z")], [impossible]);
    expect(quality.impossibleSpeedEvents).toBe(1);
    expect(quality.implausibleDistanceJourneys).toBe(0);
    expect(quality.teleportationEvents).toBe(0);
    expect(quality.visitConfidence.count).toBe(1);
    expect(quality.journeyConfidence.count).toBe(1);
  });
});
