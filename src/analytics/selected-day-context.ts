import { Temporal } from "@js-temporal/polyfill";
import type { Journey, Place, Visit } from "../model/types.js";
import { type AnomalyFinding } from "./anomalies.js";
import { buildSelectedDaySummary, type SelectedDaySummary } from "./selected-day.js";
import { median, percentileRank } from "./statistics.js";
import { localParts } from "./time.js";

export type DayMetricKey = "timeAtHomeMs" | "timeOutsideHomeMs" | "totalDistanceMeters" | "placesVisited" | "journeys" | "walkingDurationMs" | "publicTransportDurationMs" | "trackingCoveragePercent" | "largestTrackingGapMs";

export interface HistoricalComparison {
  label: string;
  sampleSize: number;
  value: number | null;
  difference: number | null;
  percentageDifference: number | null;
}

export interface DayMetricContext {
  key: DayMetricKey;
  value: number;
  percentileRank: number | null;
  historicalSampleSize: number;
  comparisons: HistoricalComparison[];
}

export interface SelectedDayContext {
  selected: SelectedDaySummary;
  metrics: DayMetricContext[];
}

export interface DayEvent {
  at: string;
  type: "arrival" | "departure" | "journey" | "new-place" | "unusual" | "low-confidence";
  title: string;
  detail: string;
  entityId: string | null;
}

const METRICS: DayMetricKey[] = ["timeAtHomeMs", "timeOutsideHomeMs", "totalDistanceMeters", "placesVisited", "journeys", "walkingDurationMs", "publicTransportDurationMs", "trackingCoveragePercent", "largestTrackingGapMs"];

function comparison(label: string, target: number, values: number[]): HistoricalComparison {
  const baseline = median(values);
  if (baseline === null) return { label, sampleSize: 0, value: null, difference: null, percentageDifference: null };
  const difference = target - baseline;
  return { label, sampleSize: values.length, value: baseline, difference, percentageDifference: baseline === 0 ? null : difference / baseline * 100 };
}

export function buildSelectedDayContext(date: string, timeZone: string, places: readonly Place[], visits: readonly Visit[], journeys: readonly Journey[]): SelectedDayContext {
  const selected = buildSelectedDaySummary(date, timeZone, places, visits, journeys);
  const targetDate = Temporal.PlainDate.from(date);
  const earliestTimestamp = [...visits, ...journeys].flatMap(event => event.interval.start ? [event.interval.start] : []).sort()[0];
  const earliestDate = earliestTimestamp ? Temporal.PlainDate.from(localParts(earliestTimestamp, timeZone).date) : targetDate;
  const history: SelectedDaySummary[] = [];
  for (let cursor = earliestDate; Temporal.PlainDate.compare(cursor, targetDate) < 0; cursor = cursor.add({ days: 1 })) history.push(buildSelectedDaySummary(cursor.toString(), timeZone, places, visits, journeys));
  const targetDayOfWeek = targetDate.dayOfWeek;
  const sameWeekday = history.filter(row => Temporal.PlainDate.from(row.date).dayOfWeek === targetDayOfWeek);
  const previousTwelve = sameWeekday.slice(-12);
  const targetMonth = date.slice(0, 7);
  const sameMonth = history.filter(row => row.date.slice(0, 7) === targetMonth);
  const targetYear = date.slice(0, 4);
  const sameYear = history.filter(row => row.date.slice(0, 4) === targetYear);
  const previousDay = history.filter(row => row.date === targetDate.subtract({ days: 1 }).toString());
  const previousWeek = history.filter(row => row.date === targetDate.subtract({ weeks: 1 }).toString());
  return {
    selected,
    metrics: METRICS.map(key => {
      const value = selected[key];
      const historical = history.map(row => row[key]);
      return {
        key, value, percentileRank: percentileRank(historical, value), historicalSampleSize: historical.length,
        comparisons: [comparison("Previous day", value, previousDay.map(row => row[key])), comparison("Same weekday last week", value, previousWeek.map(row => row[key])), comparison("Previous 12 matching weekdays", value, previousTwelve.map(row => row[key])), comparison("Monthly median", value, sameMonth.map(row => row[key])), comparison("Annual median", value, sameYear.map(row => row[key]))],
      };
    }),
  };
}

export function buildDayEventFeed(date: string, timeZone: string, places: readonly Place[], visits: readonly Visit[], journeys: readonly Journey[], anomalies: readonly AnomalyFinding[] = []): DayEvent[] {
  const placeById = new Map(places.map(place => [place.id, place]));
  const firstVisitByPlace = new Map<string, string>();
  visits.forEach(visit => { if (visit.interval.start && (!firstVisitByPlace.has(visit.placeId) || visit.interval.start < firstVisitByPlace.get(visit.placeId)!)) firstVisitByPlace.set(visit.placeId, visit.interval.start); });
  const events: DayEvent[] = [];
  visits.filter(visit => visit.interval.start && localParts(visit.interval.start, timeZone).date === date).forEach(visit => {
    const name = placeById.get(visit.placeId)?.name ?? "Unknown place";
    events.push({ at: visit.interval.start!, type: firstVisitByPlace.get(visit.placeId) === visit.interval.start ? "new-place" : "arrival", title: `Arrived at ${name}`, detail: firstVisitByPlace.get(visit.placeId) === visit.interval.start ? "First recorded visit" : "Recorded visit", entityId: visit.id });
    if (visit.interval.end) events.push({ at: visit.interval.end, type: "departure", title: `Left ${name}`, detail: visit.interval.endUncertain ? "Departure time is uncertain" : "Recorded departure", entityId: visit.id });
    if (visit.confidence && visit.confidence.score < 60) events.push({ at: visit.interval.start!, type: "low-confidence", title: `Low-confidence visit at ${name}`, detail: `${visit.confidence.score}/100 — ${visit.confidence.components.map(component => component.explanation).join(", ")}`, entityId: visit.id });
  });
  journeys.filter(journey => journey.interval.start && localParts(journey.interval.start, timeZone).date === date).forEach(journey => events.push({ at: journey.interval.start!, type: "journey", title: `${journey.travelMode.replaceAll("_", " ")} journey`, detail: `${placeById.get(journey.startPlaceId ?? "")?.name ?? "Unknown"} → ${placeById.get(journey.endPlaceId ?? "")?.name ?? "Unknown"}`, entityId: journey.id }));
  anomalies.filter(anomaly => anomaly.date === date).forEach(anomaly => events.push({ at: `${date}T12:00:00Z`, type: "unusual", title: anomaly.title, detail: anomaly.explanation, entityId: anomaly.entityId }));
  return events.sort((left, right) => left.at.localeCompare(right.at));
}
