import { Temporal } from "@js-temporal/polyfill";
import type { Journey, Place, Visit } from "../model/types.js";
import { buildSelectedDaySummary, type SelectedDaySummary } from "./selected-day.js";
import { percentile, summarizeDistribution, type DistributionSummary } from "./statistics.js";
import { localParts } from "./time.js";

export interface DailyRoutineObservation {
  date: string;
  dayOfWeek: number;
  departureMinute: number | null;
  returnMinute: number | null;
  placesVisited: number;
  timeOutsideHomeMs: number;
  journeyDurationMs: number;
  sequence: string[];
  summary: SelectedDaySummary;
}

export interface RoutineBand {
  count: number;
  p10: number | null;
  p25: number | null;
  median: number | null;
  p75: number | null;
  p90: number | null;
}

export interface WeekdayRoutine {
  dayOfWeek: number;
  observations: number;
  departureMinute: RoutineBand;
  returnMinute: RoutineBand;
  placesVisited: RoutineBand;
  timeOutsideHomeMs: RoutineBand;
  journeyDurationMs: RoutineBand;
  commonSequences: Array<{ placeIds: string[]; count: number }>;
}

export interface RoutineAnalysis {
  firstDate: string | null;
  lastDate: string | null;
  observations: DailyRoutineObservation[];
  weekdays: WeekdayRoutine[];
  overall: Omit<WeekdayRoutine, "dayOfWeek">;
}

function isHome(place: Place | undefined): boolean {
  return Boolean(place && (place.semanticType?.toUpperCase() === "HOME" || place.name.trim().toLowerCase() === "home"));
}

function minuteOfDay(timestamp: string, timeZone: string): number {
  const zoned = Temporal.Instant.from(timestamp).toZonedDateTimeISO(timeZone);
  return zoned.hour * 60 + zoned.minute + zoned.second / 60;
}

function band(values: Array<number | null>): RoutineBand {
  const finite = values.filter((value): value is number => value !== null && Number.isFinite(value));
  const summary = summarizeDistribution(finite);
  return { count: finite.length, p10: summary.p10, p25: summary.p25, median: summary.median, p75: summary.p75, p90: summary.p90 };
}

function datesBetween(first: string, last: string): string[] {
  const result: string[] = [];
  let date = Temporal.PlainDate.from(first);
  const end = Temporal.PlainDate.from(last);
  while (Temporal.PlainDate.compare(date, end) <= 0) {
    result.push(date.toString());
    date = date.add({ days: 1 });
  }
  return result;
}

function commonSequences(observations: readonly DailyRoutineObservation[]): Array<{ placeIds: string[]; count: number }> {
  const counts = new Map<string, { placeIds: string[]; count: number }>();
  observations.filter(row => row.sequence.length > 0).forEach(row => {
    const key = row.sequence.join("\u001f");
    const current = counts.get(key);
    counts.set(key, current ? { ...current, count: current.count + 1 } : { placeIds: row.sequence, count: 1 });
  });
  return [...counts.values()].sort((left, right) => right.count - left.count || left.placeIds.join().localeCompare(right.placeIds.join())).slice(0, 5);
}

function summarizeRows(rows: readonly DailyRoutineObservation[]) {
  return {
    observations: rows.length,
    departureMinute: band(rows.map(row => row.departureMinute)),
    returnMinute: band(rows.map(row => row.returnMinute)),
    placesVisited: band(rows.map(row => row.placesVisited)),
    timeOutsideHomeMs: band(rows.map(row => row.timeOutsideHomeMs)),
    journeyDurationMs: band(rows.map(row => row.journeyDurationMs)),
    commonSequences: commonSequences(rows),
  };
}

export function buildRoutineAnalysis(
  timeZone: string,
  places: readonly Place[],
  visits: readonly Visit[],
  journeys: readonly Journey[],
): RoutineAnalysis {
  const eventTimes = [...visits.flatMap(visit => [visit.interval.start, visit.interval.end]), ...journeys.flatMap(journey => [journey.interval.start, journey.interval.end])]
    .filter((value): value is string => Boolean(value));
  if (eventTimes.length === 0) return { firstDate: null, lastDate: null, observations: [], weekdays: [], overall: summarizeRows([]) };
  const dates = eventTimes.map(timestamp => localParts(timestamp, timeZone).date).sort();
  const placeById = new Map(places.map(place => [place.id, place]));
  const observations = datesBetween(dates[0]!, dates.at(-1)!).map(date => {
    const dayVisits = visits.filter(visit => visit.interval.start && localParts(visit.interval.start, timeZone).date === date).sort((left, right) => left.interval.start!.localeCompare(right.interval.start!));
    const dayJourneys = journeys.filter(journey => journey.interval.start && localParts(journey.interval.start, timeZone).date === date);
    const firstOutside = dayVisits.find(visit => !isHome(placeById.get(visit.placeId)));
    let lastOutsideIndex = -1;
    for (let index = dayVisits.length - 1; index >= 0; index -= 1) {
      if (!isHome(placeById.get(dayVisits[index]!.placeId))) { lastOutsideIndex = index; break; }
    }
    const returnHome = lastOutsideIndex < 0 ? undefined : dayVisits.slice(lastOutsideIndex + 1).find(visit => isHome(placeById.get(visit.placeId)));
    const sequence = dayVisits.map(visit => visit.placeId).filter((placeId, index, all) => index === 0 || all[index - 1] !== placeId);
    const summary = buildSelectedDaySummary(date, timeZone, places, visits, journeys);
    return {
      date,
      dayOfWeek: Temporal.PlainDate.from(date).dayOfWeek,
      departureMinute: firstOutside?.interval.start ? minuteOfDay(firstOutside.interval.start, timeZone) : null,
      returnMinute: returnHome?.interval.start ? minuteOfDay(returnHome.interval.start, timeZone) : null,
      placesVisited: new Set(dayVisits.map(visit => visit.placeId)).size,
      timeOutsideHomeMs: summary.timeOutsideHomeMs,
      journeyDurationMs: dayJourneys.reduce((sum, journey) => sum + (journey.interval.start && journey.interval.end ? Math.max(0, Date.parse(journey.interval.end) - Date.parse(journey.interval.start)) : 0), 0),
      sequence,
      summary,
    };
  });
  return {
    firstDate: dates[0]!,
    lastDate: dates.at(-1)!,
    observations,
    weekdays: Array.from({ length: 7 }, (_, index) => ({ dayOfWeek: index + 1, ...summarizeRows(observations.filter(row => row.dayOfWeek === index + 1)) })),
    overall: summarizeRows(observations),
  };
}

export function routinePercentile(values: readonly number[], value: number): number {
  if (values.length === 0) return 50;
  const below = values.filter(candidate => candidate < value).length;
  const equal = values.filter(candidate => candidate === value).length;
  return (below + equal * 0.5) / values.length * 100;
}

export function routineThreshold(values: readonly number[], probability: number): number | null {
  return percentile(values, probability);
}
