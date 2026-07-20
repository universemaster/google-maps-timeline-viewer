import type { Journey, Place, Visit } from "../model/types.js";
import { coveredMilliseconds, mergeIntervals, overlappingMilliseconds, type NumericInterval } from "./intervals.js";
import { dayInterval, localParts } from "./time.js";

export interface SelectedDaySummary {
  date: string;
  timeZone: string;
  dayLengthMs: number;
  timeAtHomeMs: number;
  timeOutsideHomeMs: number;
  totalDistanceMeters: number;
  placesVisited: number;
  journeys: number;
  walkingDistanceMeters: number;
  walkingDurationMs: number;
  publicTransportDurationMs: number;
  stationaryDurationMs: number;
  newPlaces: number;
  repeatPlaces: number;
  longestVisitMs: number;
  longestJourneyMs: number;
  trackingCoveragePercent: number;
  largestTrackingGapMs: number;
}

function clipped(start: string | null, end: string | null, day: NumericInterval): NumericInterval | null {
  if (!start || !end) return null;
  const event = { startMs: Date.parse(start), endMs: Date.parse(end) };
  const duration = overlappingMilliseconds(event, day);
  return duration > 0 ? { startMs: Math.max(event.startMs, day.startMs), endMs: Math.min(event.endMs, day.endMs) } : null;
}

function isHome(place: Place | undefined): boolean {
  return Boolean(place && (place.semanticType?.toUpperCase() === "HOME" || place.name.trim().toLowerCase() === "home"));
}

function largestGap(intervals: NumericInterval[], day: NumericInterval): number {
  const merged = mergeIntervals(intervals);
  if (merged.length === 0) return day.endMs - day.startMs;
  const gaps = [merged[0]!.startMs - day.startMs, day.endMs - merged.at(-1)!.endMs];
  for (let index = 1; index < merged.length; index += 1) gaps.push(merged[index]!.startMs - merged[index - 1]!.endMs);
  return Math.max(...gaps);
}

export function buildSelectedDaySummary(
  date: string,
  timeZone: string,
  places: readonly Place[],
  visits: readonly Visit[],
  journeys: readonly Journey[],
): SelectedDaySummary {
  const day = dayInterval(date, timeZone);
  const placeById = new Map(places.map(place => [place.id, place]));
  const dayVisits = visits.flatMap(visit => {
    const interval = clipped(visit.interval.start, visit.interval.end, day);
    return interval ? [{ visit, interval }] : [];
  });
  const dayJourneys = journeys.flatMap(journey => {
    const interval = clipped(journey.interval.start, journey.interval.end, day);
    return interval ? [{ journey, interval }] : [];
  });
  const home = dayVisits.filter(({ visit }) => isHome(placeById.get(visit.placeId))).map(({ interval }) => interval);
  const outside = [
    ...dayVisits.filter(({ visit }) => !isHome(placeById.get(visit.placeId))).map(({ interval }) => interval),
    ...dayJourneys.map(({ interval }) => interval),
  ];
  const coverage = [...dayVisits.map(({ interval }) => interval), ...dayJourneys.map(({ interval }) => interval)];
  const visitedPlaceIds = new Set(dayVisits.map(({ visit }) => visit.placeId));
  const firstVisitByPlace = new Map<string, string>();
  visits.forEach(visit => {
    if (!visit.interval.start) return;
    const existing = firstVisitByPlace.get(visit.placeId);
    if (!existing || visit.interval.start < existing) firstVisitByPlace.set(visit.placeId, visit.interval.start);
  });
  const newPlaces = [...visitedPlaceIds].filter(placeId => {
    const first = firstVisitByPlace.get(placeId);
    return first ? localParts(first, timeZone).date === date : false;
  }).length;
  const walking = dayJourneys.filter(({ journey }) => /WALK/i.test(journey.travelMode));
  const publicTransport = dayJourneys.filter(({ journey }) => /(BUS|TRAIN|RAIL|TRAM|SUBWAY|TRANSIT|FERRY)/i.test(journey.travelMode));
  const dayLengthMs = day.endMs - day.startMs;
  return {
    date,
    timeZone,
    dayLengthMs,
    timeAtHomeMs: coveredMilliseconds(home),
    timeOutsideHomeMs: coveredMilliseconds(outside),
    totalDistanceMeters: dayJourneys.reduce((sum, { journey }) => sum + (journey.distanceMeters ?? 0), 0),
    placesVisited: visitedPlaceIds.size,
    journeys: dayJourneys.length,
    walkingDistanceMeters: walking.reduce((sum, { journey }) => sum + (journey.distanceMeters ?? 0), 0),
    walkingDurationMs: coveredMilliseconds(walking.map(({ interval }) => interval)),
    publicTransportDurationMs: coveredMilliseconds(publicTransport.map(({ interval }) => interval)),
    stationaryDurationMs: coveredMilliseconds(dayVisits.map(({ interval }) => interval)),
    newPlaces,
    repeatPlaces: visitedPlaceIds.size - newPlaces,
    longestVisitMs: Math.max(0, ...dayVisits.map(({ interval }) => interval.endMs - interval.startMs)),
    longestJourneyMs: Math.max(0, ...dayJourneys.map(({ interval }) => interval.endMs - interval.startMs)),
    trackingCoveragePercent: coveredMilliseconds(coverage) / dayLengthMs * 100,
    largestTrackingGapMs: largestGap(coverage, day),
  };
}
