import type { Journey, Place, Visit } from "../model/types.js";
import { durationMilliseconds } from "./intervals.js";
import { type DailyRoutineObservation, type RoutineAnalysis, routinePercentile } from "./routines.js";
import { localParts } from "./time.js";

export type AnomalySeverity = "notable" | "unusual" | "extreme";

export interface AnomalyFinding {
  id: string;
  date: string;
  type: string;
  title: string;
  explanation: string;
  value: number;
  historicalMedian: number | null;
  percentileRank: number;
  confidence: number;
  severity: AnomalySeverity;
  comparableDates: string[];
  entityId: string | null;
}

function median(values: readonly number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const centre = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[centre]! : (sorted[centre - 1]! + sorted[centre]!) / 2;
}

function severity(rank: number): AnomalySeverity {
  const tail = Math.min(rank, 100 - rank);
  return tail <= 1 ? "extreme" : tail <= 5 ? "unusual" : "notable";
}

function finding(args: Omit<AnomalyFinding, "severity">): AnomalyFinding {
  return { ...args, severity: severity(args.percentileRank) };
}

function comparableRows(target: DailyRoutineObservation, routine: RoutineAnalysis): DailyRoutineObservation[] {
  return routine.observations.filter(row => row.date < target.date && row.dayOfWeek === target.dayOfWeek).slice(-52);
}

export function detectDayAnomalies(date: string, routine: RoutineAnalysis): AnomalyFinding[] {
  const target = routine.observations.find(row => row.date === date);
  if (!target) return [];
  const history = comparableRows(target, routine);
  if (history.length < 4) return [];
  const metrics: Array<{ key: string; title: string; value: number | null; values: number[]; unit: string }> = [
    { key: "departure", title: "Home departure time", value: target.departureMinute, values: history.flatMap(row => row.departureMinute === null ? [] : [row.departureMinute]), unit: "minutes after midnight" },
    { key: "return", title: "Return-home time", value: target.returnMinute, values: history.flatMap(row => row.returnMinute === null ? [] : [row.returnMinute]), unit: "minutes after midnight" },
    { key: "places", title: "Places visited", value: target.placesVisited, values: history.map(row => row.placesVisited), unit: "places" },
    { key: "outside", title: "Time outside home", value: target.timeOutsideHomeMs, values: history.map(row => row.timeOutsideHomeMs), unit: "milliseconds" },
    { key: "journeys", title: "Journey time", value: target.journeyDurationMs, values: history.map(row => row.journeyDurationMs), unit: "milliseconds" },
    { key: "gap", title: "Largest tracking gap", value: target.summary.largestTrackingGapMs, values: history.map(row => row.summary.largestTrackingGapMs), unit: "milliseconds" },
  ];
  return metrics.flatMap(metric => {
    if (metric.value === null || metric.values.length < 4) return [];
    const rank = routinePercentile(metric.values, metric.value);
    if (rank > 10 && rank < 90) return [];
    const baseline = median(metric.values);
    return [finding({
      id: `day_${date}_${metric.key}`,
      date,
      type: `day-${metric.key}`,
      title: metric.title,
      explanation: `${metric.value.toLocaleString()} ${metric.unit}; historical median ${baseline?.toLocaleString() ?? "unavailable"}; ${rank.toFixed(1)}th percentile among ${metric.values.length} earlier matching weekdays.`,
      value: metric.value,
      historicalMedian: baseline,
      percentileRank: rank,
      confidence: Math.min(98, 55 + metric.values.length * 2),
      comparableDates: history.slice(-5).map(row => row.date),
      entityId: null,
    })];
  });
}

export function detectVisitAnomalies(timeZone: string, visits: readonly Visit[], places: readonly Place[]): AnomalyFinding[] {
  const placeById = new Map(places.map(place => [place.id, place]));
  const byPlace = new Map<string, Visit[]>();
  visits.forEach(visit => byPlace.set(visit.placeId, [...(byPlace.get(visit.placeId) ?? []), visit]));
  return [...byPlace.entries()].flatMap(([placeId, placeVisits]) => {
    const sorted = placeVisits.filter(visit => visit.interval.start).sort((a, b) => a.interval.start!.localeCompare(b.interval.start!));
    const result: AnomalyFinding[] = [];
    sorted.forEach((visit, index) => {
      const duration = durationMilliseconds(visit.interval.start, visit.interval.end);
      const prior = sorted.slice(0, index);
      const priorDurations = prior.flatMap(candidate => {
        const value = durationMilliseconds(candidate.interval.start, candidate.interval.end);
        return value === null ? [] : [value];
      });
      if (duration !== null && priorDurations.length >= 5) {
        const rank = routinePercentile(priorDurations, duration);
        if (rank <= 5 || rank >= 95) result.push(finding({
          id: `visit_${visit.id}_duration`,
          date: localParts(visit.interval.start!, timeZone).date,
          type: "visit-duration",
          title: `Unusual visit to ${placeById.get(placeId)?.name ?? "a place"}`,
          explanation: `This visit lasted ${Math.round(duration / 60000)} minutes, the ${rank.toFixed(1)}th percentile among ${priorDurations.length} earlier visits here.`,
          value: duration,
          historicalMedian: median(priorDurations),
          percentileRank: rank,
          confidence: Math.min(97, 60 + priorDurations.length * 2),
          comparableDates: prior.slice(-5).map(candidate => localParts(candidate.interval.start!, timeZone).date),
          entityId: visit.id,
        }));
      }
      const previous = prior.at(-1);
      if (previous?.interval.end && visit.interval.start) {
        const gap = Date.parse(visit.interval.start) - Date.parse(previous.interval.end);
        const historicalGaps = prior.slice(1).flatMap((candidate, priorIndex) => {
          const end = prior[priorIndex]?.interval.end;
          return end && candidate.interval.start ? [Date.parse(candidate.interval.start) - Date.parse(end)] : [];
        });
        if (historicalGaps.length >= 4) {
          const rank = routinePercentile(historicalGaps, gap);
          if (rank >= 95) result.push(finding({
            id: `visit_${visit.id}_return`, date: localParts(visit.interval.start, timeZone).date, type: "return-after-gap",
            title: `Return to ${placeById.get(placeId)?.name ?? "a place"} after a long interval`,
            explanation: `${Math.round(gap / 86_400_000)} days since the prior visit, the ${rank.toFixed(1)}th percentile for this place.`,
            value: gap, historicalMedian: median(historicalGaps), percentileRank: rank,
            confidence: Math.min(96, 58 + historicalGaps.length * 2), comparableDates: prior.slice(-5).map(candidate => localParts(candidate.interval.start!, timeZone).date), entityId: visit.id,
          }));
        }
      }
    });
    return result;
  });
}

export function detectJourneyAnomalies(timeZone: string, journeys: readonly Journey[]): AnomalyFinding[] {
  const byRouteMode = new Map<string, Journey[]>();
  journeys.forEach(journey => {
    const key = `${journey.startPlaceId ?? "?"}|${journey.endPlaceId ?? "?"}|${journey.travelMode}`;
    byRouteMode.set(key, [...(byRouteMode.get(key) ?? []), journey]);
  });
  return [...byRouteMode.values()].flatMap(group => group.sort((a, b) => (a.interval.start ?? "").localeCompare(b.interval.start ?? "")).flatMap((journey, index, sorted) => {
    const duration = durationMilliseconds(journey.interval.start, journey.interval.end);
    const priorDurations = sorted.slice(0, index).flatMap(candidate => {
      const value = durationMilliseconds(candidate.interval.start, candidate.interval.end);
      return value === null ? [] : [value];
    });
    if (duration === null || !journey.interval.start || priorDurations.length < 5) return [];
    const rank = routinePercentile(priorDurations, duration);
    if (rank < 95) return [];
    return [finding({
      id: `journey_${journey.id}_duration`, date: localParts(journey.interval.start, timeZone).date, type: "journey-duration",
      title: `Unusually long ${journey.travelMode.toLowerCase()} journey`,
      explanation: `${Math.round(duration / 60000)} minutes, the ${rank.toFixed(1)}th percentile among ${priorDurations.length} earlier comparable journeys.`,
      value: duration, historicalMedian: median(priorDurations), percentileRank: rank,
      confidence: Math.min(97, 60 + priorDurations.length * 2), comparableDates: sorted.slice(Math.max(0, index - 5), index).flatMap(candidate => candidate.interval.start ? [localParts(candidate.interval.start, timeZone).date] : []), entityId: journey.id,
    })];
  }));
}

export function detectAllAnomalies(timeZone: string, routine: RoutineAnalysis, places: readonly Place[], visits: readonly Visit[], journeys: readonly Journey[]): AnomalyFinding[] {
  return [
    ...routine.observations.flatMap(row => detectDayAnomalies(row.date, routine)),
    ...detectVisitAnomalies(timeZone, visits, places),
    ...detectJourneyAnomalies(timeZone, journeys),
  ].sort((left, right) => right.date.localeCompare(left.date) || right.confidence - left.confidence);
}
