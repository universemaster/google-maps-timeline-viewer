import { describe, expect, it } from "vitest";
import { compareJourneys, comparePlaces } from "../src/analytics/comparisons.js";
import { buildPeriodSummary } from "../src/analytics/period-summary.js";
import { searchTimeline } from "../src/analytics/search.js";
import type { Journey, Place, SourceReference, Visit, VisitAnnotation } from "../src/model/types.js";

const source: SourceReference = { importSessionId: "i", format: "takeout", sourceName: "fixture", recordPath: "0" };
const places: Place[] = [
  { id: "home", name: "Home", category: "Home", coordinates: { latitude: 51, longitude: -3 }, boundary: null, googlePlaceId: null, semanticType: "HOME", ignored: false, notes: "", tags: [], sourceReferences: [source] },
  { id: "cafe", name: "Cafe", category: "Cafe", coordinates: { latitude: 51.01, longitude: -3 }, boundary: null, googlePlaceId: null, semanticType: "CAFE", ignored: false, notes: "", tags: ["favourite"], sourceReferences: [source] },
];
const visit = (id: string, placeId: string, start: string, end: string): Visit => ({ id, placeId, interval: { start, end, startUncertain: false, endUncertain: false }, coordinates: places.find(place => place.id === placeId)!.coordinates, confidence: { score: 90, components: [] }, source, annotationId: null });
const journey = (id: string, minutes: number, distanceMeters: number): Journey => ({ id, startPlaceId: "home", endPlaceId: "cafe", interval: { start: "2026-07-01T09:00:00Z", end: `2026-07-01T09:${String(minutes).padStart(2, "0")}:00Z`, startUncertain: false, endUncertain: false }, travelMode: "WALKING", distanceMeters, path: [], confidence: { score: 88, components: [] }, source, annotationId: null });
const visits = [visit("h", "home", "2026-07-01T00:00:00Z", "2026-07-01T09:00:00Z"), visit("c1", "cafe", "2026-07-01T10:00:00Z", "2026-07-01T12:00:00Z"), visit("c2", "cafe", "2026-07-02T10:00:00Z", "2026-07-02T11:00:00Z")];
const journeys = [journey("j1", 30, 3000), journey("j2", 45, 4000)];
const annotations: VisitAnnotation[] = [{ id: "a", visitId: "c1", purpose: "Coffee", activity: null, satisfaction: 5, noise: null, crowding: null, airQuality: null, spending: 4.5, foodAndDrink: ["Coffee"], people: [], note: "", tags: ["productive"], wouldReturn: true, planned: true, detectedPlaceCorrect: true }];

describe("comparisons, compound search and period summaries", () => {
  it("compares places and journeys against the first selected baseline", () => {
    const placeRows = comparePlaces(["home", "cafe"], places, visits, journeys, "UTC");
    expect(placeRows[1]!.visitCount.percentageDifferenceFromBaseline).toBe(100);
    const journeyRows = compareJourneys(["j1", "j2"], journeys);
    expect(journeyRows[1]!.durationMs.percentageDifferenceFromBaseline).toBe(50);
  });

  it("supports compound visit and journey filters", () => {
    const result = searchTimeline({ dateRange: { start: "2026-07-01", end: "2026-07-01" }, placeCategories: ["Cafe"], visitDurationMs: { minimum: 90 * 60_000 }, purposes: ["Coffee"], spending: { maximum: 5 }, travelModes: ["WALK"], journeyDistanceMeters: { minimum: 2500 } }, "UTC", places, visits, journeys, annotations);
    expect(result.visits.map(row => row.id)).toEqual(["c1"]);
    expect(result.journeys.map(row => row.id)).toEqual(["j1", "j2"]);
  });

  it("allocates time and movement across an inclusive period", () => {
    const summary = buildPeriodSummary("2026-07-01", "2026-07-01", "UTC", places, visits, journeys);
    expect(summary.timeAtHomeMs).toBe(9 * 3_600_000);
    expect(summary.timeByCategoryMs.Cafe).toBe(2 * 3_600_000);
    expect(summary.journeysByTravelMode.WALKING).toBe(2);
    expect(summary.placeMetrics[0]!.placeId).toBe("home");
    expect(summary.journeyDistance.median).toBe(3500);
    expect(summary.longestJourneyId).toBe("j2");
  });
});
