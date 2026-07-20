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

export function detectRoutineSequenceAnomalies(routine: RoutineAnalysis): AnomalyFinding[] {
  return routine.observations.flatMap((row, index, all) => {
    if (row.sequence.length < 2) return [];
    const prior = all.slice(0, index).filter(candidate => candidate.dayOfWeek === row.dayOfWeek && candidate.sequence.length >= 2);
    if (prior.length < 8) return [];
    const key = row.sequence.join("\u001f");
    const matches = prior.filter(candidate => candidate.sequence.join("\u001f") === key).length;
    if (matches > 0) return [];
    return [finding({
      id: `sequence_${row.date}`, date: row.date, type: "unusual-place-sequence", title: "Unusual place sequence",
      explanation: `This sequence had not appeared among ${prior.length} earlier matching weekdays.`, value: 0,
      historicalMedian: null, percentileRank: 0, confidence: Math.min(94, 60 + prior.length),
      comparableDates: prior.slice(-5).map(candidate => candidate.date), entityId: null,
    })];
  });
}

export function detectPlaceInactivityAnomalies(timeZone: string, visits: readonly Visit[], places: readonly Place[]): AnomalyFinding[] {
  const latest = visits.flatMap(visit => visit.interval.end ?? visit.interval.start ? [visit.interval.end ?? visit.interval.start!] : []).sort().at(-1);
  if (!latest) return [];
  const placeById = new Map(places.map(place => [place.id, place]));
  const byPlace = new Map<string, Visit[]>();
  visits.forEach(visit => { if (visit.interval.start) byPlace.set(visit.placeId, [...(byPlace.get(visit.placeId) ?? []), visit]); });
  return [...byPlace.entries()].flatMap(([placeId, rows]) => {
    const sorted = rows.sort((a, b) => a.interval.start!.localeCompare(b.interval.start!));
    if (sorted.length < 5) return [];
    const gaps = sorted.slice(1).flatMap((visit, index) => {
      const end = sorted[index]?.interval.end;
      return end ? [Date.parse(visit.interval.start!) - Date.parse(end)] : [];
    });
    const lastAt = sorted.at(-1)!.interval.end ?? sorted.at(-1)!.interval.start!;
    const currentGap = Date.parse(latest) - Date.parse(lastAt);
    const rank = routinePercentile(gaps, currentGap);
    if (currentGap < 90 * 86_400_000 || rank < 95) return [];
    return [finding({
      id: `inactive_${placeId}`, date: localParts(latest, timeZone).date, type: "formerly-frequent-place",
      title: `${placeById.get(placeId)?.name ?? "A formerly frequent place"} is no longer being visited`,
      explanation: `${Math.round(currentGap / 86_400_000)} days since the last visit; longer than ${rank.toFixed(1)}% of earlier intervals after ${sorted.length} visits.`,
      value: currentGap, historicalMedian: median(gaps), percentileRank: rank, confidence: Math.min(96, 62 + gaps.length * 3),
      comparableDates: sorted.slice(-5).map(visit => localParts(visit.interval.start!, timeZone).date), entityId: placeId,
    })];
  });
}

export function detectRoutineShiftAnomalies(routine: RoutineAnalysis): AnomalyFinding[] {
  if (routine.observations.length < 16) return [];
  const recent = routine.observations.slice(-4);
  const baseline = routine.observations.slice(-16, -4);
  const recentMedian = median(recent.map(row => row.timeOutsideHomeMs));
  const baselineValues = baseline.map(row => row.timeOutsideHomeMs);
  const baselineMedian = median(baselineValues);
  if (recentMedian === null || baselineMedian === null || baselineMedian === 0) return [];
  const change = (recentMedian - baselineMedian) / baselineMedian * 100;
  if (Math.abs(change) < 40) return [];
  const date = recent.at(-1)!.date;
  const rank = routinePercentile(baselineValues, recentMedian);
  return [finding({
    id: `routine_shift_${date}`, date, type: "routine-shift", title: "Recent time-outside-home routine changed",
    explanation: `The latest four-day median is ${Math.abs(change).toFixed(0)}% ${change > 0 ? "higher" : "lower"} than the preceding 12-day median.`,
    value: recentMedian, historicalMedian: baselineMedian, percentileRank: rank, confidence: 82,
    comparableDates: baseline.slice(-5).map(row => row.date), entityId: null,
  })];
}

export function detectAllAnomalies(timeZone: string, routine: RoutineAnalysis, places: readonly Place[], visits: readonly Visit[], journeys: readonly Journey[]): AnomalyFinding[] {
  return [
    ...routine.observations.flatMap(row => detectDayAnomalies(row.date, routine)),
    ...detectVisitAnomalies(timeZone, visits, places),
    ...detectJourneyAnomalies(timeZone, journeys),
    ...detectRoutineSequenceAnomalies(routine),
    ...detectPlaceInactivityAnomalies(timeZone, visits, places),
    ...detectRoutineShiftAnomalies(routine),
  ].sort((left, right) => right.date.localeCompare(left.date) || right.confidence - left.confidence);
}
