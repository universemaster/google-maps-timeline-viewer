import { describe, expect, it } from "vitest";
import { buildPlaceProfile } from "../src/analytics/place-profiles.js";
import type { Journey, Place, SourceReference, Visit } from "../src/model/types.js";

const source: SourceReference = {
  importSessionId: "import_1",
  format: "semantic-segments",
  sourceName: "fixture.json",
  recordPath: "semanticSegments[0]",
};

const place: Place = {
  id: "place_cafe",
  name: "Cafe",
  category: "Cafe",
  coordinates: { latitude: 51.59, longitude: -3.32 },
  boundary: null,
  googlePlaceId: null,
  semanticType: "CAFE",
  ignored: false,
  notes: "",
  tags: [],
  sourceReferences: [source],
};

function visit(id: string, placeId: string, start: string, end: string): Visit {
  return {
    id,
    placeId,
    interval: { start, end, startUncertain: false, endUncertain: false },
    coordinates: place.coordinates,
    confidence: null,
    source,
    annotationId: null,
  };
}

describe("place profiles", () => {
  it("calculates robust visit, timing and journey-context statistics", () => {
    const visits = [
      visit("home-1", "home", "2025-01-06T08:00:00Z", "2025-01-06T09:00:00Z"),
      visit("cafe-1", place.id, "2025-01-06T09:30:00Z", "2025-01-06T10:00:00Z"),
      visit("home-2", "home", "2025-01-06T10:30:00Z", "2025-01-06T11:00:00Z"),
      visit("cafe-2", place.id, "2026-01-05T10:30:00Z", "2026-01-05T12:00:00Z"),
      visit("home-3", "home", "2026-01-05T12:30:00Z", "2026-01-05T13:00:00Z"),
    ];
    const journeys: Journey[] = [{
      id: "journey-1",
      startPlaceId: "home",
      endPlaceId: place.id,
      interval: { start: "2025-01-06T09:00:00Z", end: "2025-01-06T09:30:00Z", startUncertain: false, endUncertain: false },
      travelMode: "WALKING",
      distanceMeters: 1_000,
      path: [],
      confidence: null,
      source,
      annotationId: null,
    }];
    const profile = buildPlaceProfile(place, visits, journeys, "Europe/London", Date.parse("2026-01-06T12:00:00Z"));
    expect(profile.visitCount).toBe(2);
    expect(profile.uniqueVisitDays).toBe(2);
    expect(profile.totalDurationMs).toBe(2 * 3_600_000);
    expect(profile.duration).toMatchObject({ minimum: 1_800_000, median: 3_600_000, maximum: 5_400_000 });
    expect(profile.arrivalHours[9]).toBe(1);
    expect(profile.arrivalHours[10]).toBe(1);
    expect(profile.commonPreviousPlaces[0]).toEqual({ placeId: "home", count: 2 });
    expect(profile.commonNextPlaces[0]).toEqual({ placeId: "home", count: 2 });
    expect(profile.meanDistanceToReachMeters).toBe(1_000);
    expect(profile.coordinateClusterCount).toBe(1);
    expect(profile.byYear.map(row => row.visits)).toEqual([1, 1]);
    expect(profile.currentIntervalMs).toBe(24 * 3_600_000);
  });
});
