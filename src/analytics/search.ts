import { Temporal } from "@js-temporal/polyfill";
import type { Boundary, Journey, Place, Visit, VisitAnnotation } from "../model/types.js";
import { pointInsideBoundary } from "./boundaries.js";
import { durationMilliseconds } from "./intervals.js";
import { localParts } from "./time.js";

export interface NumberRange { minimum?: number; maximum?: number }
export interface DateRange { start?: string; end?: string }

export interface TimelineSearchQuery {
  dateRange?: DateRange;
  placeIds?: string[];
  placeCategories?: string[];
  visitDurationMs?: NumberRange;
  arrivalMinute?: NumberRange;
  departureMinute?: NumberRange;
  daysOfWeek?: number[];
  travelModes?: string[];
  journeyDistanceMeters?: NumberRange;
  journeyDurationMs?: NumberRange;
  confidence?: NumberRange;
  unknownPlace?: boolean;
  newPlace?: boolean;
  annotated?: boolean;
  tags?: string[];
  purposes?: string[];
  spending?: NumberRange;
  revisitIntervalMs?: NumberRange;
  geographicArea?: Boundary;
}

export interface TimelineSearchResult { visits: Visit[]; journeys: Journey[]; places: Place[] }

function inRange(value: number | null, range: NumberRange | undefined): boolean {
  if (!range) return true;
  if (value === null || !Number.isFinite(value)) return false;
  return (range.minimum === undefined || value >= range.minimum) && (range.maximum === undefined || value <= range.maximum);
}

function timestampMatches(timestamp: string | null, range: DateRange | undefined, timeZone: string): boolean {
  if (!range) return true;
  if (!timestamp) return false;
  const date = localParts(timestamp, timeZone).date;
  return (!range.start || date >= range.start) && (!range.end || date <= range.end);
}

function minuteOfDay(timestamp: string | null, timeZone: string): number | null {
  if (!timestamp) return null;
  const zoned = Temporal.Instant.from(timestamp).toZonedDateTimeISO(timeZone);
  return zoned.hour * 60 + zoned.minute;
}

export function searchTimeline(query: TimelineSearchQuery, timeZone: string, places: readonly Place[], visits: readonly Visit[], journeys: readonly Journey[], annotations: readonly VisitAnnotation[]): TimelineSearchResult {
  const placeById = new Map(places.map(place => [place.id, place]));
  const annotationByVisit = new Map(annotations.map(annotation => [annotation.visitId, annotation]));
  const firstVisitByPlace = new Map<string, string>();
  const previousVisitGap = new Map<string, number>();
  const lastEndByPlace = new Map<string, string>();
  [...visits].filter(visit => visit.interval.start).sort((a, b) => a.interval.start!.localeCompare(b.interval.start!)).forEach(visit => {
    if (!firstVisitByPlace.has(visit.placeId)) firstVisitByPlace.set(visit.placeId, visit.interval.start!);
    const priorEnd = lastEndByPlace.get(visit.placeId);
    if (priorEnd) previousVisitGap.set(visit.id, Date.parse(visit.interval.start!) - Date.parse(priorEnd));
    if (visit.interval.end) lastEndByPlace.set(visit.placeId, visit.interval.end);
  });
  const matchingVisits = visits.filter(visit => {
    const place = placeById.get(visit.placeId);
    const annotation = annotationByVisit.get(visit.id);
    const first = firstVisitByPlace.get(visit.placeId);
    return timestampMatches(visit.interval.start, query.dateRange, timeZone)
      && (!query.placeIds || query.placeIds.includes(visit.placeId))
      && (!query.placeCategories || Boolean(place?.category && query.placeCategories.includes(place.category)))
      && inRange(durationMilliseconds(visit.interval.start, visit.interval.end), query.visitDurationMs)
      && inRange(minuteOfDay(visit.interval.start, timeZone), query.arrivalMinute)
      && inRange(minuteOfDay(visit.interval.end, timeZone), query.departureMinute)
      && (!query.daysOfWeek || Boolean(visit.interval.start && query.daysOfWeek.includes(localParts(visit.interval.start, timeZone).dayOfWeek)))
      && (query.unknownPlace === undefined || query.unknownPlace === !place)
      && (query.newPlace === undefined || query.newPlace === Boolean(first && first === visit.interval.start))
      && (query.annotated === undefined || query.annotated === Boolean(annotation))
      && (!query.tags || query.tags.every(tag => Boolean(annotation?.tags.includes(tag) || place?.tags.includes(tag))))
      && (!query.purposes || Boolean(annotation?.purpose && query.purposes.includes(annotation.purpose)))
      && inRange(annotation?.spending ?? null, query.spending)
      && inRange(previousVisitGap.get(visit.id) ?? null, query.revisitIntervalMs)
      && (!query.geographicArea || Boolean(visit.coordinates && pointInsideBoundary(visit.coordinates, query.geographicArea)))
      && inRange(visit.confidence?.score ?? null, query.confidence);
  });
  const matchingJourneys = journeys.filter(journey => timestampMatches(journey.interval.start, query.dateRange, timeZone)
    && (!query.daysOfWeek || Boolean(journey.interval.start && query.daysOfWeek.includes(localParts(journey.interval.start, timeZone).dayOfWeek)))
    && (!query.travelModes || query.travelModes.some(mode => journey.travelMode.toUpperCase().includes(mode.toUpperCase())))
    && inRange(journey.distanceMeters, query.journeyDistanceMeters)
    && inRange(durationMilliseconds(journey.interval.start, journey.interval.end), query.journeyDurationMs)
    && inRange(journey.confidence?.score ?? null, query.confidence)
    && (!query.geographicArea || journey.path.some(point => pointInsideBoundary(point.coordinates, query.geographicArea!))));
  const matchingPlaceIds = new Set([...matchingVisits.map(visit => visit.placeId), ...matchingJourneys.flatMap(journey => [journey.startPlaceId, journey.endPlaceId]).filter((id): id is string => Boolean(id))]);
  return { visits: matchingVisits, journeys: matchingJourneys, places: places.filter(place => matchingPlaceIds.has(place.id)) };
}
