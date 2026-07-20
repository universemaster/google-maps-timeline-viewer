import { describe, expect, it } from "vitest";
import { buildReplayPlan, nextPausePoint, replayStateAt } from "../src/analytics/replay.js";
import type { Journey, Place, SourceReference, Visit } from "../src/model/types.js";

const source: SourceReference = { importSessionId: "import", format: "takeout", sourceName: "fixture", recordPath: "0" };
const places: Place[] = [
  { id: "home", name: "Home", category: "Home", coordinates: { latitude: 51, longitude: -3 }, boundary: null, googlePlaceId: null, semanticType: "HOME", ignored: false, notes: "", tags: [], sourceReferences: [source] },
  { id: "cafe", name: "Cafe", category: "Cafe", coordinates: { latitude: 52, longitude: -2 }, boundary: null, googlePlaceId: null, semanticType: "CAFE", ignored: false, notes: "", tags: [], sourceReferences: [source] },
];
const visit = (id: string, placeId: string, start: string, end: string): Visit => ({
  id, placeId, interval: { start, end, startUncertain: false, endUncertain: false }, coordinates: places.find(place => place.id === placeId)!.coordinates,
  confidence: null, source: { ...source, recordPath: id }, annotationId: null,
});
const journey: Journey = {
  id: "walk", startPlaceId: "home", endPlaceId: "cafe",
  interval: { start: "2026-07-01T09:00:00Z", end: "2026-07-01T10:00:00Z", startUncertain: false, endUncertain: false },
  travelMode: "WALKING", distanceMeters: 4_000,
  path: [{ at: null, coordinates: { latitude: 51, longitude: -3 } }, { at: null, coordinates: { latitude: 52, longitude: -2 } }],
  confidence: null, source: { ...source, recordPath: "walk" }, annotationId: null,
};

describe("daily replay", () => {
  const plan = buildReplayPlan("2026-07-01", "UTC", places, [
    visit("home", "home", "2026-07-01T08:00:00Z", "2026-07-01T09:00:00Z"),
    visit("cafe", "cafe", "2026-07-01T10:00:00Z", "2026-07-01T12:00:00Z"),
  ], [journey]);

  it("orders visits and journeys and creates event pause points", () => {
    expect(plan.segments.map(segment => segment.kind)).toEqual(["visit", "journey", "visit"]);
    expect(plan.pausePoints.map(point => point.reason)).toEqual(["arrival", "departure", "arrival", "departure"]);
  });

  it("interpolates routes and cumulative measures", () => {
    const state = replayStateAt(plan, Date.parse("2026-07-01T09:30:00Z"));
    expect(state.activeSegment?.kind).toBe("journey");
    expect(state.coordinates).toEqual({ latitude: 51.5, longitude: -2.5 });
    expect(state.cumulativeDistanceMeters).toBe(2_000);
    expect(state.cumulativeWalkingMs).toBe(30 * 60_000);
    expect(state.cumulativeOutsideHomeMs).toBe(30 * 60_000);
    expect(state.cumulativeStationaryMs).toBe(60 * 60_000);
  });

  it("finds the next enabled automatic pause", () => {
    const next = nextPausePoint(plan, Date.parse("2026-07-01T09:01:00Z"), new Set(["arrival"]));
    expect(next?.description).toBe("Arrived at Cafe");
  });
});
