import { describe, expect, it } from "vitest";
import { DEFAULT_PLACE_DISCOVERY_SETTINGS, discoverPlaces } from "../src/analytics/place-discovery.js";
import type { Place, SourceReference, Visit } from "../src/model/types.js";

const source: SourceReference = { importSessionId: "i", format: "semantic-segments", sourceName: "fixture", recordPath: "0" };
const unknownPlace: Place = { id: "place_unknown", name: "Unknown place", category: null, coordinates: null, boundary: null, googlePlaceId: null, semanticType: null, ignored: false, notes: "", tags: [], sourceReferences: [source] };
const visit = (id: string, day: number, latitude: number, longitude: number): Visit => ({
  id, placeId: unknownPlace.id,
  interval: { start: `2026-07-${String(day).padStart(2, "0")}T10:00:00Z`, end: `2026-07-${String(day).padStart(2, "0")}T10:30:00Z`, startUncertain: false, endUncertain: false },
  coordinates: { latitude, longitude }, confidence: null, source: { ...source, recordPath: id }, annotationId: null,
});

describe("automatic place discovery", () => {
  it("finds repeated dwell clusters on distinct days", () => {
    const suggestions = discoverPlaces([unknownPlace], [
      visit("a", 1, 51.59000, -3.32600), visit("b", 2, 51.59005, -3.32600),
      visit("c", 3, 51.59000, -3.32605), visit("d", 4, 51.59004, -3.32604),
    ], [], "Europe/London");
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]).toMatchObject({ visitCount: 4, uniqueDays: 4, totalDurationMs: 2 * 3_600_000, classification: "likely-meaningful-place" });
  });

  it("does not suggest clusters below duration or day thresholds", () => {
    expect(discoverPlaces([unknownPlace], [visit("a", 1, 51.59, -3.326), visit("b", 2, 51.59, -3.326)], [], "UTC")).toEqual([]);
  });

  it("classifies clusters close to a well-defined place as duplicates", () => {
    const known: Place = { ...unknownPlace, id: "known", name: "Library", category: "Library", coordinates: { latitude: 51.59, longitude: -3.326 } };
    const visits = [visit("a", 1, 51.5901, -3.326), visit("b", 2, 51.5901, -3.326), visit("c", 3, 51.5901, -3.326), visit("d", 4, 51.5901, -3.326)];
    const suggestions = discoverPlaces([unknownPlace, known], visits, [], "UTC", { ...DEFAULT_PLACE_DISCOVERY_SETTINGS, environment: "rural" });
    expect(suggestions[0]?.classification).toBe("likely-duplicate");
  });
});
