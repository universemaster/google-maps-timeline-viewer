import type { Journey, Place, Visit } from "../model/types.js";
import { scoreJourney, scoreVisit } from "./confidence.js";
import { durationMilliseconds } from "./intervals.js";
import { coveredMilliseconds, mergeIntervals, type NumericInterval } from "./intervals.js";
import { haversineMeters } from "./spatial.js";
import { summarizeDistribution } from "./statistics.js";
import { dayInterval, localParts } from "./time.js";
import { Temporal } from "@js-temporal/polyfill";

export interface DataQualitySummary {
  visits: number;
  journeys: number;
  invalidOrMissingCoordinates: number;
  unclosedVisits: number;
  overlappingVisits: number;
  unknownPlaces: number;
  uncertainTravelModes: number;
  impossibleSpeedEvents: number;
  teleportationEvents: number;
  implausibleDistanceJourneys: number;
  timezoneAnomalies: number;
  lowConfidenceVisits: number;
  lowConfidenceJourneys: number;
  duplicateRecords: number;
  visitConfidence: ReturnType<typeof summarizeDistribution>;
  journeyConfidence: ReturnType<typeof summarizeDistribution>;
  mostRecentImportedDataDate: string | null;
}

export type DataQualitySeverity = "critical" | "high" | "medium" | "low";

export interface DataQualityIssue {
  code: string;
  severity: DataQualitySeverity;
  at: string | null;
  entityId: string | null;
  description: string;
  evidence: Record<string, number | string>;
}

export interface DailyCoverageQuality {
  date: string;
  coveredMs: number;
  dayLengthMs: number;
  coveragePercent: number;
  gapCount: number;
  longestGapMs: number;
  confidence: number;
  issueCount: number;
}

export interface DuplicatePlaceCandidate {
  leftPlaceId: string;
  rightPlaceId: string;
  distanceMeters: number;
}

export interface DataQualityDashboard {
  summary: DataQualitySummary;
  selectedRangeCoveragePercent: number;
  dailyCoverage: DailyCoverageQuality[];
  gaps: ReturnType<typeof summarizeDistribution>;
  gapDurationsMs: number[];
  issues: DataQualityIssue[];
  duplicatePlaceCandidates: DuplicatePlaceCandidate[];
  ageOfImportedDataMs: number | null;
  trackingQualityBySource: Array<{ sourceName: string; events: number; meanConfidence: number }>;
  unknownPlacesByYear: Array<{ year: number; visits: number }>;
}

function eventInterval(start: string | null, end: string | null, day: NumericInterval): NumericInterval | null {
  if (!start || !end) return null;
  const interval = { startMs: Math.max(day.startMs, Date.parse(start)), endMs: Math.min(day.endMs, Date.parse(end)) };
  return interval.endMs > interval.startMs ? interval : null;
}

function gapsForDay(intervals: NumericInterval[], day: NumericInterval): number[] {
  const merged = mergeIntervals(intervals);
  if (merged.length === 0) return [day.endMs - day.startMs];
  const gaps = [merged[0]!.startMs - day.startMs, day.endMs - merged.at(-1)!.endMs];
  for (let index = 1; index < merged.length; index += 1) gaps.push(merged[index]!.startMs - merged[index - 1]!.endMs);
  return gaps.filter(gap => gap > 0);
}

function eventCoordinates(event: Visit | Journey, edge: "start" | "end") {
  if ("placeId" in event) return event.coordinates;
  const point = edge === "start" ? event.path[0] : event.path.at(-1);
  return point?.coordinates ?? null;
}

export function buildDataQualityDashboard(
  places: readonly Place[],
  visits: readonly Visit[],
  journeys: readonly Journey[],
  timeZone: string,
  now = Date.now(),
): DataQualityDashboard {
  const summary = buildDataQualitySummary(places, visits, journeys);
  const timestamps = [...visits, ...journeys].flatMap(event => [event.interval.start, event.interval.end]).filter((value): value is string => value !== null).sort();
  if (timestamps.length === 0) {
    return { summary, selectedRangeCoveragePercent: 0, dailyCoverage: [], gaps: summarizeDistribution([]), gapDurationsMs: [], issues: [], duplicatePlaceCandidates: [], ageOfImportedDataMs: null, trackingQualityBySource: [], unknownPlacesByYear: [] };
  }
  const firstDate = Temporal.PlainDate.from(localParts(timestamps[0]!, timeZone).date);
  const lastDate = Temporal.PlainDate.from(localParts(timestamps.at(-1)!, timeZone).date);
  const dailyCoverage: DailyCoverageQuality[] = [];
  const allGaps: number[] = [];
  for (let cursor = firstDate; Temporal.PlainDate.compare(cursor, lastDate) <= 0; cursor = cursor.add({ days: 1 })) {
    const date = cursor.toString();
    const day = dayInterval(date, timeZone);
    const intervals = [...visits, ...journeys].flatMap(event => {
      const value = eventInterval(event.interval.start, event.interval.end, day);
      return value ? [value] : [];
    });
    const gaps = gapsForDay(intervals, day);
    allGaps.push(...gaps);
    const coveredMs = coveredMilliseconds(intervals);
    const coveragePercent = coveredMs / (day.endMs - day.startMs) * 100;
    const issueCount = [...visits, ...journeys].filter(event => event.interval.start && localParts(event.interval.start, timeZone).date === date && (event.interval.startUncertain || event.interval.endUncertain)).length;
    dailyCoverage.push({
      date,
      coveredMs,
      dayLengthMs: day.endMs - day.startMs,
      coveragePercent,
      gapCount: gaps.length,
      longestGapMs: Math.max(0, ...gaps),
      confidence: Math.max(0, Math.round(coveragePercent - issueCount * 8)),
      issueCount,
    });
  }

  const issues: DataQualityIssue[] = [];
  journeys.forEach(journey => {
    const duration = durationMilliseconds(journey.interval.start, journey.interval.end);
    if (duration && journey.distanceMeters) {
      const speedKph = journey.distanceMeters / duration * 3_600;
      if (speedKph > 350) issues.push({ code: "impossible-speed", severity: "high", at: journey.interval.start, entityId: journey.id, description: `Journey implies ${Math.round(speedKph)} km/h.`, evidence: { speedKph: Math.round(speedKph), distanceMeters: journey.distanceMeters } });
      if (journey.distanceMeters > 2_000_000) issues.push({ code: "implausible-distance", severity: "medium", at: journey.interval.start, entityId: journey.id, description: "Journey exceeds 2,000 km and should be reviewed.", evidence: { distanceMeters: journey.distanceMeters } });
    }
  });
  const ordered = [...visits, ...journeys].filter(event => event.interval.start && event.interval.end).sort((a, b) => (a.interval.start as string).localeCompare(b.interval.start as string));
  for (let index = 1; index < ordered.length; index += 1) {
    const prior = ordered[index - 1]!;
    const current = ordered[index]!;
    const from = eventCoordinates(prior, "end");
    const to = eventCoordinates(current, "start");
    const elapsed = Date.parse(current.interval.start!) - Date.parse(prior.interval.end!);
    if (!from || !to || elapsed <= 0) continue;
    const distance = haversineMeters(from, to);
    const speedKph = distance / elapsed * 3_600;
    if (speedKph > 1_000) issues.push({ code: "teleportation", severity: "high", at: current.interval.start, entityId: current.id, description: `Successive records imply ${Math.round(speedKph)} km/h.`, evidence: { speedKph: Math.round(speedKph), distanceMeters: Math.round(distance), elapsedMs: elapsed } });
  }
  visits.filter(visit => !visit.interval.start || !visit.interval.end).forEach(visit => issues.push({ code: "unclosed-visit", severity: "medium", at: visit.interval.start, entityId: visit.id, description: "Visit has a missing start or end time.", evidence: {} }));

  const duplicatePlaceCandidates: DuplicatePlaceCandidate[] = [];
  for (let left = 0; left < places.length; left += 1) {
    for (let right = left + 1; right < places.length; right += 1) {
      const leftPlace = places[left]!;
      const rightPlace = places[right]!;
      if (!leftPlace.coordinates || !rightPlace.coordinates || leftPlace.id === rightPlace.id) continue;
      const distanceMeters = haversineMeters(leftPlace.coordinates, rightPlace.coordinates);
      if (distanceMeters <= 75) duplicatePlaceCandidates.push({ leftPlaceId: leftPlace.id, rightPlaceId: rightPlace.id, distanceMeters });
    }
  }
  const sourceScores = new Map<string, number[]>();
  visits.forEach(visit => sourceScores.set(visit.source.sourceName, [...(sourceScores.get(visit.source.sourceName) ?? []), scoreVisit(visit).score]));
  journeys.forEach(journey => sourceScores.set(journey.source.sourceName, [...(sourceScores.get(journey.source.sourceName) ?? []), scoreJourney(journey).score]));
  const totalCovered = dailyCoverage.reduce((sum, day) => sum + day.coveredMs, 0);
  const totalAvailable = dailyCoverage.reduce((sum, day) => sum + day.dayLengthMs, 0);
  const placeById = new Map(places.map(place => [place.id, place]));
  const unknownByYear = new Map<number, number>();
  visits.filter(visit => visit.interval.start && (!placeById.has(visit.placeId) || /^unknown/i.test(placeById.get(visit.placeId)?.name ?? ""))).forEach(visit => {
    const year = localParts(visit.interval.start!, timeZone).year;
    unknownByYear.set(year, (unknownByYear.get(year) ?? 0) + 1);
  });
  return {
    summary,
    selectedRangeCoveragePercent: totalAvailable ? totalCovered / totalAvailable * 100 : 0,
    dailyCoverage,
    gaps: summarizeDistribution(allGaps),
    gapDurationsMs: allGaps,
    issues: issues.sort((left, right) => (right.at ?? "").localeCompare(left.at ?? "")),
    duplicatePlaceCandidates: duplicatePlaceCandidates.sort((left, right) => left.distanceMeters - right.distanceMeters),
    ageOfImportedDataMs: Math.max(0, now - Date.parse(timestamps.at(-1)!)),
    trackingQualityBySource: [...sourceScores.entries()].map(([sourceName, scores]) => ({ sourceName, events: scores.length, meanConfidence: scores.reduce((sum, score) => sum + score, 0) / scores.length })),
    unknownPlacesByYear: [...unknownByYear.entries()].map(([year, count]) => ({ year, visits: count })).sort((a, b) => a.year - b.year),
  };
}

export function buildDataQualitySummary(places: readonly Place[], visits: readonly Visit[], journeys: readonly Journey[]): DataQualitySummary {
  const placeById = new Map(places.map(place => [place.id, place]));
  const sortedVisits = [...visits].filter(visit => visit.interval.start).sort((a, b) => (a.interval.start as string).localeCompare(b.interval.start as string));
  let overlaps = 0;
  for (let index = 1; index < sortedVisits.length; index += 1) {
    const priorEnd = sortedVisits[index - 1]?.interval.end;
    const start = sortedVisits[index]?.interval.start;
    if (priorEnd && start && start < priorEnd) overlaps += 1;
  }
  const recordKeys = [...visits, ...journeys].map(event => `${event.source.sourceName}|${event.source.recordPath}`);
  const duplicateRecords = recordKeys.length - new Set(recordKeys).size;
  const impossibleSpeedEvents = journeys.filter(journey => {
    const duration = durationMilliseconds(journey.interval.start, journey.interval.end);
    return Boolean(duration && journey.distanceMeters && journey.distanceMeters / duration * 3_600 > 350);
  }).length;
  const ordered = [...visits, ...journeys].filter(event => event.interval.start && event.interval.end).sort((a, b) => a.interval.start!.localeCompare(b.interval.start!));
  let teleportationEvents = 0;
  for (let index = 1; index < ordered.length; index += 1) {
    const prior = ordered[index - 1]!;
    const current = ordered[index]!;
    const from = eventCoordinates(prior, "end");
    const to = eventCoordinates(current, "start");
    const elapsed = Date.parse(current.interval.start!) - Date.parse(prior.interval.end!);
    if (from && to && elapsed > 0 && haversineMeters(from, to) / elapsed * 3_600 > 1_000) teleportationEvents += 1;
  }
  const timestamps = [...visits, ...journeys].flatMap(event => [event.interval.start, event.interval.end]).filter((value): value is string => value !== null).sort();
  return {
    visits: visits.length,
    journeys: journeys.length,
    invalidOrMissingCoordinates: visits.filter(visit => !visit.coordinates).length,
    unclosedVisits: visits.filter(visit => !visit.interval.start || !visit.interval.end).length,
    overlappingVisits: overlaps,
    unknownPlaces: visits.filter(visit => !placeById.has(visit.placeId) || placeById.get(visit.placeId)?.name === "Unknown place").length,
    uncertainTravelModes: journeys.filter(journey => journey.travelMode === "UNKNOWN").length,
    impossibleSpeedEvents,
    teleportationEvents,
    implausibleDistanceJourneys: journeys.filter(journey => (journey.distanceMeters ?? 0) > 2_000_000).length,
    timezoneAnomalies: [...visits, ...journeys].filter(event => event.interval.start && event.interval.end && (!Number.isFinite(Date.parse(event.interval.start)) || !Number.isFinite(Date.parse(event.interval.end)) || Date.parse(event.interval.end) < Date.parse(event.interval.start))).length,
    lowConfidenceVisits: visits.filter(visit => scoreVisit(visit).score < 60).length,
    lowConfidenceJourneys: journeys.filter(journey => scoreJourney(journey).score < 60).length,
    duplicateRecords,
    visitConfidence: summarizeDistribution(visits.map(visit => scoreVisit(visit).score)),
    journeyConfidence: summarizeDistribution(journeys.map(journey => scoreJourney(journey).score)),
    mostRecentImportedDataDate: timestamps.at(-1) ?? null,
  };
}
