import { describe, expect, it } from "vitest";
import { previewPlaceMerge, suggestCoordinateSplit, suggestDateRangeSplit, suggestDurationSplit } from "../src/analytics/place-operations.js";
import type { Place, SourceReference, Visit } from "../src/model/types.js";

const source: SourceReference = { importSessionId: "i", format: "takeout", sourceName: "fixture", recordPath: "0" };
const places: Place[] = [
  { id: "a", name: "Cafe", category: "Cafe", coordinates: { latitude: 51, longitude: -3 }, boundary: null, googlePlaceId: "ga", semanticType: null, ignored: false, notes: "", tags: [], sourceReferences: [source] },
  { id: "b", name: "Coffee shop", category: "Food", coordinates: { latitude: 51.001, longitude: -3 }, boundary: null, googlePlaceId: "gb", semanticType: null, ignored: false, notes: "", tags: [], sourceReferences: [source] },
];
const visit = (id: string, placeId: string, latitude: number, date: string, hours: number): Visit => ({ id, placeId, interval: { start: `${date}T10:00:00Z`, end: `${date}T${String(10 + hours).padStart(2, "0")}:00:00Z`, startUncertain: false, endUncertain: false }, coordinates: { latitude, longitude: -3 }, confidence: null, source, annotationId: null });
const visits = [visit("v1", "a", 51, "2026-01-01", 1), visit("v2", "a", 51.00001, "2026-01-02", 1), visit("v3", "b", 51.001, "2026-02-01", 5)];

describe("place merge and split previews", () => {
  it("shows conflicts, proposed bounds and potential outliers before merging", () => {
    const preview = previewPlaceMerge(["a", "b"], places, visits);
    expect(preview.combinedVisitCount).toBe(3);
    expect(preview.conflictingNames).toEqual(["Cafe", "Coffee shop"]);
    expect(preview.googlePlaceIds).toEqual(["ga", "gb"]);
    expect(preview.proposedRadiusMeters).toBeGreaterThan(50);
  });

  it("suggests splits by coordinate, date and duration evidence", () => {
    expect(suggestCoordinateSplit(visits, 50)?.visitIds).toEqual(["v3"]);
    expect(suggestDateRangeSplit(visits, "2026-02-01", "2026-02-28")?.visitIds).toEqual(["v3"]);
    expect(suggestDurationSplit(visits, 240)?.visitIds).toEqual(["v3"]);
  });
});
