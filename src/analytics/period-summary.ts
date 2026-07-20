import type { Journey, Place, Visit } from "../model/types.js";
import { dayInterval } from "./time.js";
import { overlappingMilliseconds, type NumericInterval } from "./intervals.js";
import { summarizeDistribution, type DistributionSummary } from "./statistics.js";

export interface PeriodPlaceMetric { placeId: string; visits: number; totalDurationMs: number; medianDurationMs: number | null }
export interface PeriodSummary {
  startDate: string;
  endDate: string;
  durationMs: number;
  timeAtHomeMs: number;
  timeOutsideHomeMs: number;
  timeByCategoryMs: Record<string, number>;
  timeByTravelModeMs: Record<string, number>;
  distanceByTravelModeMeters: Record<string, number>;
  journeysByTravelMode: Record<string, number>;
  journeyDuration: DistributionSummary;
  placeMetrics: PeriodPlaceMetric[];
  newPlaceIds: string[];
  mostFrequentOriginDestination: { key: string; count: number } | null;
}

function add(record: Record<string, number>, key: string, value: number): void { record[key] = (record[key] ?? 0) + value; }
function isHome(place: Place | undefined): boolean { return Boolean(place && (place.semanticType?.toUpperCase() === "HOME" || place.name.trim().toLowerCase() === "home")); }
function interval(start: string | null, end: string | null): NumericInterval | null { return start && end ? { startMs: Date.parse(start), endMs: Date.parse(end) } : null; }

export function buildPeriodSummary(startDate: string, endDate: string, timeZone: string, places: readonly Place[], visits: readonly Visit[], journeys: readonly Journey[]): PeriodSummary {
  const range = { startMs: dayInterval(startDate, timeZone).startMs, endMs: dayInterval(endDate, timeZone).endMs };
  const placeById = new Map(places.map(place => [place.id, place]));
  const timeByCategoryMs: Record<string, number> = {};
  const timeByTravelModeMs: Record<string, number> = {};
  const distanceByTravelModeMeters: Record<string, number> = {};
  const journeysByTravelMode: Record<string, number> = {};
  const placeRows = new Map<string, number[]>();
  let timeAtHomeMs = 0;
  let timeOutsideHomeMs = 0;
  visits.forEach(visit => {
    const visitInterval = interval(visit.interval.start, visit.interval.end);
    if (!visitInterval) return;
    const duration = overlappingMilliseconds(visitInterval, range);
    if (duration <= 0) return;
    const place = placeById.get(visit.placeId);
    if (isHome(place)) timeAtHomeMs += duration; else timeOutsideHomeMs += duration;
    add(timeByCategoryMs, place?.category || "Unknown place", duration);
    placeRows.set(visit.placeId, [...(placeRows.get(visit.placeId) ?? []), duration]);
  });
  const journeyDurations: number[] = [];
  const routeCounts = new Map<string, number>();
  journeys.forEach(journey => {
    const journeyInterval = interval(journey.interval.start, journey.interval.end);
    if (!journeyInterval) return;
    const duration = overlappingMilliseconds(journeyInterval, range);
    if (duration <= 0) return;
    timeOutsideHomeMs += duration;
    journeyDurations.push(duration);
    add(timeByTravelModeMs, journey.travelMode, duration);
    add(journeysByTravelMode, journey.travelMode, 1);
    if (journey.distanceMeters !== null) add(distanceByTravelModeMeters, journey.travelMode, journey.distanceMeters * duration / Math.max(1, journeyInterval.endMs - journeyInterval.startMs));
    const key = `${journey.startPlaceId ?? "Unknown"} → ${journey.endPlaceId ?? "Unknown"}`;
    routeCounts.set(key, (routeCounts.get(key) ?? 0) + 1);
  });
  const firstByPlace = new Map<string, number>();
  visits.forEach(visit => { if (visit.interval.start) firstByPlace.set(visit.placeId, Math.min(firstByPlace.get(visit.placeId) ?? Infinity, Date.parse(visit.interval.start))); });
  const route = [...routeCounts.entries()].sort((a, b) => b[1] - a[1])[0];
  return {
    startDate, endDate, durationMs: range.endMs - range.startMs, timeAtHomeMs, timeOutsideHomeMs, timeByCategoryMs, timeByTravelModeMs, distanceByTravelModeMeters, journeysByTravelMode,
    journeyDuration: summarizeDistribution(journeyDurations),
    placeMetrics: [...placeRows.entries()].map(([placeId, durations]) => ({ placeId, visits: durations.length, totalDurationMs: durations.reduce((sum, value) => sum + value, 0), medianDurationMs: summarizeDistribution(durations).median })).sort((a, b) => b.totalDurationMs - a.totalDurationMs),
    newPlaceIds: [...placeRows.keys()].filter(placeId => { const first = firstByPlace.get(placeId); return first !== undefined && first >= range.startMs && first < range.endMs; }),
    mostFrequentOriginDestination: route ? { key: route[0], count: route[1] } : null,
  };
}
