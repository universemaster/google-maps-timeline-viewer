import { describe, expect, it } from "vitest";
import { buildDataQualityDashboard } from "../src/analytics/data-quality.js";
import { buildSelectedDaySummary } from "../src/analytics/selected-day.js";
import { discoverPlaces, DEFAULT_PLACE_DISCOVERY_SETTINGS } from "../src/analytics/place-discovery.js";
import type { Journey, Place, SourceReference, Visit } from "../src/model/types.js";

const source: SourceReference = { importSessionId: "synthetic", format: "android-on-device", sourceName: "synthetic rural and urban fixture", recordPath: "0" };
const home: Place = { id: "home", name: "Home", category: "Home", coordinates: { latitude: 51, longitude: -3 }, boundary: null, googlePlaceId: null, semanticType: "HOME", ignored: false, notes: "", tags: [], sourceReferences: [source] };
const visit = (id: string, start: string | null, end: string | null, latitude = 51): Visit => ({ id, placeId: "unknown", interval: { start, end, startUncertain: start === null, endUncertain: end === null }, coordinates: { latitude, longitude: -3 }, confidence: null, source: { ...source, recordPath: id }, annotationId: null });

describe("synthetic dense, sparse and damaged histories", () => {
  it("allocates a visit crossing midnight to both calendar days", () => {
    const crossing = visit("midnight", "2026-07-01T23:00:00Z", "2026-07-02T02:00:00Z");
    const first = buildSelectedDaySummary("2026-07-01", "UTC", [home], [crossing], []);
    const second = buildSelectedDaySummary("2026-07-02", "UTC", [home], [crossing], []);
    expect(first.stationaryDurationMs).toBe(60 * 60_000);
    expect(second.stationaryDurationMs).toBe(2 * 60 * 60_000);
  });

  it("surfaces GPS drift, adjacent duplicate places, missing times and train teleportation", () => {
    const adjacent: Place = { ...home, id: "adjacent", name: "Adjacent business", semanticType: null, coordinates: { latitude: 51.0002, longitude: -3 } };
    const damaged = [visit("missing-end", "2026-07-01T10:00:00Z", null), visit("drift-a", "2026-07-01T11:00:00Z", "2026-07-01T12:00:00Z", 51.0001), visit("drift-b", "2026-07-01T11:30:00Z", "2026-07-01T12:30:00Z", 51.0003)];
    const train: Journey = { id: "train", startPlaceId: "home", endPlaceId: "adjacent", interval: { start: "2026-07-01T13:00:00Z", end: "2026-07-01T14:00:00Z", startUncertain: false, endUncertain: false }, travelMode: "TRAIN", distanceMeters: 2_500_000, path: [{ at: "2026-07-01T13:00:00Z", coordinates: { latitude: 51, longitude: -3 } }, { at: "2026-07-01T14:00:00Z", coordinates: { latitude: 60, longitude: 10 } }], confidence: null, source, annotationId: null };
    const quality = buildDataQualityDashboard([home, adjacent], damaged, [train], "UTC");
    expect(quality.summary.unclosedVisits).toBe(1);
    expect(quality.summary.overlappingVisits).toBe(1);
    expect(quality.summary.implausibleDistanceJourneys).toBe(1);
    expect(quality.duplicatePlaceCandidates).toHaveLength(1);
  });

  it("uses a wider configurable radius for sparse rural dwell clusters", () => {
    const visits = [
      visit("r1", "2026-01-01T10:00:00Z", "2026-01-01T10:30:00Z", 52),
      visit("r2", "2026-01-02T10:00:00Z", "2026-01-02T10:30:00Z", 52.00045),
      visit("r3", "2026-01-03T10:00:00Z", "2026-01-03T10:30:00Z", 52.0002),
    ];
    const suggestions = discoverPlaces([], visits, [], "UTC", { ...DEFAULT_PLACE_DISCOVERY_SETTINGS, environment: "rural", minimumDistinctVisitDays: 3, minimumTotalDurationMs: 60 * 60_000 });
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]?.visitIds).toHaveLength(3);
  });
});
