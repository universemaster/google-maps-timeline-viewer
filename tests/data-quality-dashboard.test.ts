import { describe, expect, it } from "vitest";
import { buildDataQualityDashboard } from "../src/analytics/data-quality.js";
import type { Journey, Place, SourceReference, Visit } from "../src/model/types.js";

const source: SourceReference = { importSessionId: "i", format: "takeout", sourceName: "phone-export.json", recordPath: "0" };
const places: Place[] = [
  { id: "one", name: "One", category: null, coordinates: { latitude: 51, longitude: -3 }, boundary: null, googlePlaceId: null, semanticType: null, ignored: false, notes: "", tags: [], sourceReferences: [source] },
  { id: "nearby", name: "Nearby", category: null, coordinates: { latitude: 51.0001, longitude: -3 }, boundary: null, googlePlaceId: null, semanticType: null, ignored: false, notes: "", tags: [], sourceReferences: [source] },
];
const visit: Visit = { id: "visit", placeId: "one", interval: { start: "2026-03-29T00:00:00Z", end: "2026-03-29T02:00:00Z", startUncertain: false, endUncertain: false }, coordinates: places[0]!.coordinates, confidence: null, source, annotationId: null };
const impossible: Journey = { id: "flight", startPlaceId: null, endPlaceId: null, interval: { start: "2026-03-29T03:00:00Z", end: "2026-03-29T04:00:00Z", startUncertain: false, endUncertain: false }, travelMode: "DRIVING", distanceMeters: 500_000, path: [], confidence: null, source: { ...source, recordPath: "1" }, annotationId: null };

describe("data-quality dashboard model", () => {
  it("profiles coverage on a DST day and preserves issue evidence", () => {
    const dashboard = buildDataQualityDashboard(places, [visit], [impossible], "Europe/London", Date.parse("2026-03-30T00:00:00Z"));
    expect(dashboard.dailyCoverage).toHaveLength(1);
    expect(dashboard.dailyCoverage[0]?.dayLengthMs).toBe(23 * 3_600_000);
    expect(dashboard.dailyCoverage[0]?.coveredMs).toBe(3 * 3_600_000);
    expect(dashboard.summary.impossibleSpeedEvents).toBe(1);
    expect(dashboard.issues[0]).toMatchObject({ code: "impossible-speed", severity: "high", entityId: "flight" });
    expect(dashboard.duplicatePlaceCandidates).toHaveLength(1);
    expect(dashboard.trackingQualityBySource[0]).toMatchObject({ sourceName: "phone-export.json", events: 2 });
  });
});
