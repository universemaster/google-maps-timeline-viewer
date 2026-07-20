import type { Journey, Place, Visit } from "../model/types.js";
import { scoreJourney, scoreVisit } from "./confidence.js";
import { durationMilliseconds } from "./intervals.js";
import { summarizeDistribution } from "./statistics.js";

export interface DataQualitySummary {
  visits: number;
  journeys: number;
  invalidOrMissingCoordinates: number;
  unclosedVisits: number;
  overlappingVisits: number;
  unknownPlaces: number;
  uncertainTravelModes: number;
  impossibleSpeedEvents: number;
  duplicateRecords: number;
  visitConfidence: ReturnType<typeof summarizeDistribution>;
  journeyConfidence: ReturnType<typeof summarizeDistribution>;
  mostRecentImportedDataDate: string | null;
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
    duplicateRecords,
    visitConfidence: summarizeDistribution(visits.map(visit => scoreVisit(visit).score)),
    journeyConfidence: summarizeDistribution(journeys.map(journey => scoreJourney(journey).score)),
    mostRecentImportedDataDate: timestamps.at(-1) ?? null,
  };
}
