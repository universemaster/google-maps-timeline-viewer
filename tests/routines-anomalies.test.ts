import { describe, expect, it } from "vitest";
import { detectDayAnomalies, detectJourneyAnomalies, detectPlaceInactivityAnomalies, detectVisitAnomalies } from "../src/analytics/anomalies.js";
import { buildRoutineAnalysis } from "../src/analytics/routines.js";
import type { Journey, Place, SourceReference, Visit } from "../src/model/types.js";

const source: SourceReference = { importSessionId: "i", format: "takeout", sourceName: "fixture", recordPath: "0" };
const places: Place[] = [
  { id: "home", name: "Home", category: "Home", coordinates: null, boundary: null, googlePlaceId: null, semanticType: "HOME", ignored: false, notes: "", tags: [], sourceReferences: [source] },
  { id: "cafe", name: "Cafe", category: "Cafe", coordinates: null, boundary: null, googlePlaceId: null, semanticType: "CAFE", ignored: false, notes: "", tags: [], sourceReferences: [source] },
];

function visit(id: string, placeId: string, start: string, end: string): Visit {
  return { id, placeId, interval: { start, end, startUncertain: false, endUncertain: false }, coordinates: null, confidence: null, source, annotationId: null };
}

function journey(id: string, date: string, minutes: number): Journey {
  return { id, startPlaceId: "home", endPlaceId: "cafe", interval: { start: `${date}T09:00:00Z`, end: `${date}T${String(9 + Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}:00Z`, startUncertain: false, endUncertain: false }, travelMode: "WALKING", distanceMeters: 1000, path: [], confidence: null, source, annotationId: null };
}

describe("routine and anomaly analysis", () => {
  it("builds weekday percentile bands and repeated sequences", () => {
    const visits = ["01", "08", "15", "22", "29"].flatMap((day, index) => {
      const month = index === 4 ? "02" : "01";
      const actualDay = index === 4 ? "05" : day;
      const date = `2026-${month}-${actualDay}`;
      return [visit(`h1-${date}`, "home", `${date}T00:00:00Z`, `${date}T09:00:00Z`), visit(`c-${date}`, "cafe", `${date}T09:30:00Z`, `${date}T10:30:00Z`), visit(`h2-${date}`, "home", `${date}T11:00:00Z`, `${date}T23:00:00Z`)];
    });
    const routine = buildRoutineAnalysis("UTC", places, visits, []);
    const thursday = routine.weekdays.find(row => row.dayOfWeek === 4)!;
    expect(thursday.departureMinute.median).toBe(570);
    expect(thursday.returnMinute.median).toBe(660);
    expect(thursday.commonSequences[0]).toEqual({ placeIds: ["home", "cafe", "home"], count: 5 });
  });

  it("explains extreme matching-weekday days with historical context", () => {
    const dates = ["2026-01-01", "2026-01-08", "2026-01-15", "2026-01-22", "2026-01-29", "2026-02-05"];
    const visits = dates.flatMap((date, index) => [
      visit(`h1-${date}`, "home", `${date}T00:00:00Z`, `${date}T09:00:00Z`),
      visit(`c-${date}`, "cafe", `${date}T${index === 5 ? "15" : "09"}:30:00Z`, `${date}T${index === 5 ? "18" : "10"}:30:00Z`),
      visit(`h2-${date}`, "home", `${date}T${index === 5 ? "19" : "11"}:00:00Z`, `${date}T23:00:00Z`),
    ]);
    const routine = buildRoutineAnalysis("UTC", places, visits, []);
    const findings = detectDayAnomalies("2026-02-05", routine);
    expect(findings.some(item => item.type === "day-departure" && item.percentileRank >= 90)).toBe(true);
    expect(findings[0]?.comparableDates).toHaveLength(5);
  });

  it("flags visit and comparable-route duration outliers", () => {
    const dates = ["01", "02", "03", "04", "05", "06"];
    const visits = dates.map((day, index) => visit(`v${day}`, "cafe", `2026-01-${day}T10:00:00Z`, `2026-01-${day}T${index === 5 ? "15" : "11"}:00:00Z`));
    const journeys = dates.map((day, index) => journey(`j${day}`, `2026-01-${day}`, index === 5 ? 180 : 30));
    expect(detectVisitAnomalies("UTC", visits, places).some(item => item.type === "visit-duration")).toBe(true);
    expect(detectJourneyAnomalies("UTC", journeys).some(item => item.type === "journey-duration")).toBe(true);
  });

  it("finds a formerly frequent place after an exceptional absence", () => {
    const visits = ["01", "08", "15", "22", "29"].map(day => visit(`v${day}`, "cafe", `2025-01-${day}T10:00:00Z`, `2025-01-${day}T11:00:00Z`));
    visits.push(visit("latest", "home", "2026-01-01T10:00:00Z", "2026-01-01T11:00:00Z"));
    expect(detectPlaceInactivityAnomalies("UTC", visits, places).some(item => item.type === "formerly-frequent-place")).toBe(true);
  });
});
