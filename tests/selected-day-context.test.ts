import { describe, expect, it } from "vitest";
import { buildDayEventFeed, buildSelectedDayContext } from "../src/analytics/selected-day-context.js";
import type { Journey, Place, SourceReference, Visit } from "../src/model/types.js";

const source: SourceReference = { importSessionId: "i", format: "takeout", sourceName: "fixture", recordPath: "0" };
const places: Place[] = [
  { id: "home", name: "Home", category: "Home", coordinates: null, boundary: null, googlePlaceId: null, semanticType: "HOME", ignored: false, notes: "", tags: [], sourceReferences: [source] },
  { id: "cafe", name: "Cafe", category: "Cafe", coordinates: null, boundary: null, googlePlaceId: null, semanticType: "CAFE", ignored: false, notes: "", tags: [], sourceReferences: [source] },
];
const visit = (id: string, placeId: string, date: string, start: string, end: string): Visit => ({ id, placeId, interval: { start: `${date}T${start}:00Z`, end: `${date}T${end}:00Z`, startUncertain: false, endUncertain: false }, coordinates: null, confidence: null, source, annotationId: null });

describe("selected-day historical context and event feed", () => {
  it("compares a day with earlier dates and calculates percentile rank", () => {
    const dates = ["2026-07-01", "2026-07-02", "2026-07-03", "2026-07-04"];
    const visits = dates.flatMap((date, index) => [visit(`h-${date}`, "home", date, "00:00", "09:00"), visit(`c-${date}`, "cafe", date, "10:00", index === 3 ? "18:00" : "11:00")]);
    const context = buildSelectedDayContext("2026-07-04", "UTC", places, visits, []);
    const outside = context.metrics.find(metric => metric.key === "timeOutsideHomeMs")!;
    expect(outside.percentileRank).toBeGreaterThan(80);
    expect(outside.comparisons.find(row => row.label === "Previous day")?.difference).toBe(7 * 3_600_000);
  });

  it("orders arrivals, journeys and departures into a selected-day feed", () => {
    const visits = [visit("c", "cafe", "2026-07-04", "10:00", "11:00")];
    const journeys: Journey[] = [{ id: "j", startPlaceId: "home", endPlaceId: "cafe", interval: { start: "2026-07-04T09:30:00Z", end: "2026-07-04T10:00:00Z", startUncertain: false, endUncertain: false }, travelMode: "WALKING", distanceMeters: 1000, path: [], confidence: null, source, annotationId: null }];
    expect(buildDayEventFeed("2026-07-04", "UTC", places, visits, journeys).map(event => event.type)).toEqual(["journey", "new-place", "departure"]);
  });
});
