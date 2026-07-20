import type { Journey, Place, Visit } from "../model/types.js";
import { durationMilliseconds } from "./intervals.js";
import { estimatedRadiusMeters, haversineMeters } from "./spatial.js";
import { movingAverage, summarizeDistribution, type DistributionSummary } from "./statistics.js";
import { localParts, monthKey } from "./time.js";

export interface PeriodMetric {
  period: string;
  visits: number;
  totalDurationMs: number;
  medianDurationMs: number | null;
  yearOnYearPercent: number | null;
  movingAverageVisits: number | null;
}

export interface FrequencySummary {
  perWeek: number;
  perMonth: number;
  perYear: number;
}

export interface PlaceProfile {
  place: Place;
  visitCount: number;
  uniqueVisitDays: number;
  firstVisitAt: string | null;
  mostRecentVisitAt: string | null;
  totalDurationMs: number;
  duration: DistributionSummary;
  frequency: FrequencySummary;
  longestIntervalBetweenVisitsMs: number | null;
  currentIntervalMs: number | null;
  arrivalHours: number[];
  departureHours: number[];
  daysOfWeek: number[];
  monthsOfYear: number[];
  calendarYears: Record<string, number>;
  byMonth: PeriodMetric[];
  byYear: PeriodMetric[];
  trend: "increasing" | "decreasing" | "stable" | "insufficient-data";
  commonPreviousPlaces: Array<{ placeId: string; count: number }>;
  commonNextPlaces: Array<{ placeId: string; count: number }>;
  commonArrivalModes: Array<{ mode: string; count: number }>;
  commonDepartureModes: Array<{ mode: string; count: number }>;
  meanDistanceToReachMeters: number | null;
  medianDistanceToReachMeters: number | null;
  commonOrigins: Array<{ placeId: string; count: number }>;
  commonDestinations: Array<{ placeId: string; count: number }>;
  commonJourneySequences: Array<{ placeIds: string[]; count: number }>;
  coordinateSpreadMeters: number | null;
  coordinateClusterCount: number;
  possibleDuplicatePlaceIds: string[];
  estimatedGeofenceRadiusMeters: number | null;
  lowConfidenceVisits: number;
  overlappingVisits: number;
  uncertainTimes: number;
}

function counts(values: string[]): Array<{ value: string; count: number }> {
  const result = new Map<string, number>();
  values.forEach(value => result.set(value, (result.get(value) ?? 0) + 1));
  return [...result].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}

function histogram(size: number, values: number[]): number[] {
  const result = Array.from({ length: size }, () => 0);
  values.forEach(value => { if (value >= 0 && value < size) result[value] = (result[value] ?? 0) + 1; });
  return result;
}

function periodMetrics(visits: Visit[], timeZone: string, granularity: "month" | "year"): PeriodMetric[] {
  const grouped = new Map<string, number[]>();
  visits.forEach(visit => {
    if (!visit.interval.start) return;
    const key = granularity === "month" ? monthKey(visit.interval.start, timeZone) : String(localParts(visit.interval.start, timeZone).year);
    const duration = durationMilliseconds(visit.interval.start, visit.interval.end);
    const values = grouped.get(key) ?? [];
    if (duration !== null) values.push(duration);
    grouped.set(key, values);
  });
  const rows: PeriodMetric[] = [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([period, durations]) => ({
    period,
    visits: visits.filter(visit => visit.interval.start && (granularity === "month" ? monthKey(visit.interval.start, timeZone) : String(localParts(visit.interval.start, timeZone).year)) === period).length,
    totalDurationMs: durations.reduce((sum, value) => sum + value, 0),
    medianDurationMs: summarizeDistribution(durations).median,
    yearOnYearPercent: null,
    movingAverageVisits: null,
  }));
  rows.forEach((row, index) => {
    const previous = granularity === "year" ? rows[index - 1] : rows.find(candidate => candidate.period === `${Number(row.period.slice(0, 4)) - 1}${row.period.slice(4)}`);
    row.yearOnYearPercent = previous && previous.visits > 0 ? ((row.visits - previous.visits) / previous.visits) * 100 : null;
  });
  const averages = movingAverage(rows.map(row => row.visits), granularity === "month" ? 3 : 2);
  rows.forEach((row, index) => { row.movingAverageVisits = averages[index] ?? null; });
  return rows;
}

function surroundingContext(target: Visit[], allVisits: Visit[], journeys: Journey[]) {
  const visits = [...allVisits].filter(visit => visit.interval.start).sort((a, b) => (a.interval.start as string).localeCompare(b.interval.start as string));
  const targetIds = new Set(target.map(visit => visit.id));
  const previous: string[] = [];
  const next: string[] = [];
  const arrivalModes: string[] = [];
  const departureModes: string[] = [];
  const sortedJourneys = [...journeys].filter(journey => journey.interval.start).sort((a, b) => (a.interval.start as string).localeCompare(b.interval.start as string));
  visits.forEach((visit, index) => {
    if (!targetIds.has(visit.id)) return;
    const prior = visits[index - 1];
    const following = visits[index + 1];
    if (prior) previous.push(prior.placeId);
    if (following) next.push(following.placeId);
    const arrival = sortedJourneys.filter(journey => journey.interval.end && visit.interval.start && journey.interval.end <= visit.interval.start).at(-1);
    const departure = sortedJourneys.find(journey => journey.interval.start && visit.interval.end && journey.interval.start >= visit.interval.end);
    if (arrival) arrivalModes.push(arrival.travelMode);
    if (departure) departureModes.push(departure.travelMode);
  });
  return {
    previous: counts(previous).map(({ value, count }) => ({ placeId: value, count })),
    next: counts(next).map(({ value, count }) => ({ placeId: value, count })),
    arrivals: counts(arrivalModes).map(({ value, count }) => ({ mode: value, count })),
    departures: counts(departureModes).map(({ value, count }) => ({ mode: value, count })),
  };
}

function coordinateClusterCount(visits: readonly Visit[], radiusMeters = 30): number {
  const centres: NonNullable<Visit["coordinates"]>[] = [];
  visits.forEach(visit => {
    if (!visit.coordinates) return;
    if (!centres.some(centre => haversineMeters(centre, visit.coordinates!) <= radiusMeters)) centres.push(visit.coordinates);
  });
  return centres.length;
}

function journeySequences(targetIds: Set<string>, allVisits: readonly Visit[]): Array<{ placeIds: string[]; count: number }> {
  const sorted = [...allVisits].filter(visit => visit.interval.start).sort((a, b) => a.interval.start!.localeCompare(b.interval.start!));
  const counts = new Map<string, { placeIds: string[]; count: number }>();
  sorted.forEach((visit, index) => {
    if (!targetIds.has(visit.id)) return;
    const placeIds = sorted.slice(Math.max(0, index - 2), Math.min(sorted.length, index + 3)).map(item => item.placeId);
    const key = placeIds.join("\u001f");
    const current = counts.get(key);
    counts.set(key, current ? { ...current, count: current.count + 1 } : { placeIds, count: 1 });
  });
  return [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 5);
}

export function buildPlaceProfile(
  place: Place,
  allVisits: readonly Visit[],
  journeys: readonly Journey[],
  timeZone: string,
  now = Date.now(),
  allPlaces: readonly Place[] = [],
): PlaceProfile {
  const visits = allVisits.filter(visit => visit.placeId === place.id).sort((a, b) => (a.interval.start ?? "").localeCompare(b.interval.start ?? ""));
  const complete = visits.filter(visit => visit.interval.start && visit.interval.end);
  const durations = complete.flatMap(visit => {
    const value = durationMilliseconds(visit.interval.start, visit.interval.end);
    return value === null ? [] : [value];
  });
  const starts = visits.flatMap(visit => visit.interval.start ? [visit.interval.start] : []);
  const ends = visits.flatMap(visit => visit.interval.end ? [visit.interval.end] : []);
  const uniqueDays = new Set(starts.map(value => localParts(value, timeZone).date));
  const firstMs = starts.length ? Date.parse(starts[0] as string) : null;
  const lastMs = ends.length ? Math.max(...ends.map(Date.parse)) : starts.length ? Date.parse(starts.at(-1) as string) : null;
  const gaps = visits.slice(1).flatMap((visit, index) => {
    const previousEnd = visits[index]?.interval.end;
    return previousEnd && visit.interval.start ? [Math.max(0, Date.parse(visit.interval.start) - Date.parse(previousEnd))] : [];
  });
  const spanMs = firstMs === null ? 0 : Math.max(1, (lastMs ?? now) - firstMs);
  const spanDays = spanMs / 86_400_000;
  const byYear = periodMetrics(visits, timeZone, "year");
  const recent = byYear.slice(-3).map(row => row.visits);
  const trend = recent.length < 2 ? "insufficient-data" : recent.at(-1)! > recent[0]! * 1.1 ? "increasing" : recent.at(-1)! < recent[0]! * 0.9 ? "decreasing" : "stable";
  const context = surroundingContext(visits, [...allVisits], [...journeys]);
  const arrivals = journeys.filter(journey => journey.endPlaceId === place.id || visits.some(visit => visit.interval.start && journey.interval.end && journey.interval.end <= visit.interval.start && Date.parse(visit.interval.start) - Date.parse(journey.interval.end) <= 30 * 60_000));
  const departures = journeys.filter(journey => journey.startPlaceId === place.id);
  const arrivalDistances = arrivals.flatMap(journey => journey.distanceMeters === null ? [] : [journey.distanceMeters]);
  const originCounts = counts(arrivals.flatMap(journey => journey.startPlaceId ? [journey.startPlaceId] : [])).map(({ value, count }) => ({ placeId: value, count }));
  const destinationCounts = counts(departures.flatMap(journey => journey.endPlaceId ? [journey.endPlaceId] : [])).map(({ value, count }) => ({ placeId: value, count }));
  const coordinates = visits.flatMap(visit => visit.coordinates ? [visit.coordinates] : []);
  const spread = estimatedRadiusMeters(coordinates);
  let overlappingVisits = 0;
  for (let index = 1; index < complete.length; index += 1) {
    if (Date.parse(complete[index]?.interval.start as string) < Date.parse(complete[index - 1]?.interval.end as string)) overlappingVisits += 1;
  }
  return {
    place,
    visitCount: visits.length,
    uniqueVisitDays: uniqueDays.size,
    firstVisitAt: starts[0] ?? null,
    mostRecentVisitAt: ends.sort().at(-1) ?? starts.at(-1) ?? null,
    totalDurationMs: durations.reduce((sum, value) => sum + value, 0),
    duration: summarizeDistribution(durations),
    frequency: {
      perWeek: spanDays ? visits.length / (spanDays / 7) : visits.length,
      perMonth: spanDays ? visits.length / (spanDays / 30.4375) : visits.length,
      perYear: spanDays ? visits.length / (spanDays / 365.25) : visits.length,
    },
    longestIntervalBetweenVisitsMs: gaps.length ? Math.max(...gaps) : null,
    currentIntervalMs: lastMs === null ? null : Math.max(0, now - lastMs),
    arrivalHours: histogram(24, starts.map(value => localParts(value, timeZone).hour)),
    departureHours: histogram(24, ends.map(value => localParts(value, timeZone).hour)),
    daysOfWeek: histogram(7, starts.map(value => localParts(value, timeZone).dayOfWeek - 1)),
    monthsOfYear: histogram(12, starts.map(value => localParts(value, timeZone).month - 1)),
    calendarYears: Object.fromEntries(counts(starts.map(value => String(localParts(value, timeZone).year))).map(({ value, count }) => [value, count])),
    byMonth: periodMetrics(visits, timeZone, "month"),
    byYear,
    trend,
    commonPreviousPlaces: context.previous,
    commonNextPlaces: context.next,
    commonArrivalModes: context.arrivals,
    commonDepartureModes: context.departures,
    meanDistanceToReachMeters: summarizeDistribution(arrivalDistances).mean,
    medianDistanceToReachMeters: summarizeDistribution(arrivalDistances).median,
    commonOrigins: originCounts,
    commonDestinations: destinationCounts,
    commonJourneySequences: journeySequences(new Set(visits.map(visit => visit.id)), allVisits),
    coordinateSpreadMeters: spread,
    coordinateClusterCount: coordinateClusterCount(visits),
    possibleDuplicatePlaceIds: place.coordinates ? allPlaces.filter(candidate => candidate.id !== place.id && candidate.coordinates && haversineMeters(place.coordinates!, candidate.coordinates) <= Math.max(30, spread ?? 30)).map(candidate => candidate.id) : [],
    estimatedGeofenceRadiusMeters: place.boundary?.kind === "circle" ? place.boundary.radiusMeters : spread,
    lowConfidenceVisits: visits.filter(visit => visit.confidence && visit.confidence.score < 60).length,
    overlappingVisits,
    uncertainTimes: visits.filter(visit => visit.interval.startUncertain || visit.interval.endUncertain).length,
  };
}
