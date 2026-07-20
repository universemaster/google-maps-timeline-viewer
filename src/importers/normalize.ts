import { entityId, stableHash } from "../model/identifiers.js";
import type {
  CanonicalTimeline,
  Coordinates,
  ImportSession,
  Journey,
  JourneyPathPoint,
  NormalizationWarning,
  Place,
  SourceReference,
  TimeInterval,
  TimelineSourceFormat,
  Visit,
} from "../model/types.js";
import { detectTimelineFormat } from "./detect.js";

type JsonObject = Record<string, unknown>;

function record(value: unknown): JsonObject | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as JsonObject : null;
}

function string(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function number(value: unknown): number | null {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function coordinatesFromLatLng(value: unknown): Coordinates | null {
  const text = string(value);
  if (!text) return null;
  const match = text.replace(/°/g, "").match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
  if (!match) return null;
  const latitude = Number(match[1]);
  const longitude = Number(match[2]);
  return validCoordinates(latitude, longitude) ? { latitude, longitude } : null;
}

function coordinatesFromObject(value: unknown): Coordinates | null {
  const object = record(value);
  if (!object) return null;
  const latitude = number(object.latitudeE7) !== null ? (number(object.latitudeE7) as number) / 1e7
    : number(object.latitude) ?? number(object.lat);
  const longitude = number(object.longitudeE7) !== null ? (number(object.longitudeE7) as number) / 1e7
    : number(object.longitude) ?? number(object.lng) ?? number(object.lon);
  if (latitude === null || longitude === null || !validCoordinates(latitude, longitude)) return null;
  const accuracyMeters = number(object.accuracyMeters) ?? number(object.accuracy);
  return accuracyMeters === null ? { latitude, longitude } : { latitude, longitude, accuracyMeters };
}

function validCoordinates(latitude: number, longitude: number): boolean {
  return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
}

function interval(start: unknown, end: unknown): TimeInterval {
  const startValue = string(start);
  const endValue = string(end);
  return {
    start: startValue && Number.isFinite(Date.parse(startValue)) ? new Date(startValue).toISOString() : null,
    end: endValue && Number.isFinite(Date.parse(endValue)) ? new Date(endValue).toISOString() : null,
    startUncertain: !startValue,
    endUncertain: !endValue,
  };
}

function sourceReference(
  session: ImportSession,
  path: string,
  probability?: number | null,
  sourceRecordId?: string | null,
): SourceReference {
  return {
    importSessionId: session.id,
    format: session.format,
    sourceName: session.sourceName,
    recordPath: path,
    ...(probability === null || probability === undefined ? {} : { providerProbability: probability }),
    ...(sourceRecordId ? { sourceRecordId } : {}),
  };
}

function addPlace(places: Map<string, Place>, candidate: Omit<Place, "sourceReferences">, source: SourceReference): Place {
  const existing = places.get(candidate.id);
  if (existing) {
    existing.sourceReferences.push(source);
    if (!existing.coordinates && candidate.coordinates) existing.coordinates = candidate.coordinates;
    if (existing.name === "Unknown place" && candidate.name !== existing.name) existing.name = candidate.name;
    return existing;
  }
  const created = { ...candidate, sourceReferences: [source] };
  places.set(created.id, created);
  return created;
}

function normalizeSemanticSegments(
  segments: unknown[],
  session: ImportSession,
  places: Map<string, Place>,
  visits: Visit[],
  journeys: Journey[],
  warnings: NormalizationWarning[],
): void {
  segments.forEach((entry, index) => {
    const segment = record(entry);
    const path = `semanticSegments[${index}]`;
    if (!segment) return;
    const segmentInterval = interval(segment.startTime, segment.endTime);
    const visit = record(segment.visit);
    const activity = record(segment.activity);
    if (visit) {
      const candidate = record(visit.topCandidate) ?? {};
      const location = record(candidate.placeLocation);
      const coords = coordinatesFromLatLng(location?.latLng) ?? coordinatesFromObject(location);
      const googlePlaceId = string(candidate.placeId) ?? string(candidate.placeID);
      const semanticType = string(candidate.semanticType);
      const placeId = googlePlaceId ? `google_${googlePlaceId}` : entityId("place", coords, semanticType);
      const source = sourceReference(session, path, number(candidate.probability) ?? number(visit.probability), googlePlaceId);
      addPlace(places, {
        id: placeId,
        name: string(candidate.placeName) ?? semanticType ?? "Unknown place",
        category: null,
        coordinates: coords,
        boundary: null,
        googlePlaceId,
        semanticType,
        ignored: false,
        notes: "",
        tags: [],
      }, source);
      visits.push({
        id: entityId("visit", session.id, path, segmentInterval),
        placeId,
        interval: segmentInterval,
        coordinates: coords,
        confidence: null,
        source,
        annotationId: null,
      });
    } else if (activity) {
      const start = record(activity.start);
      const end = record(activity.end);
      const pathPoints = Array.isArray(segment.timelinePath)
        ? segment.timelinePath.map((point): JourneyPathPoint | null => {
          const item = record(point);
          const coords = coordinatesFromLatLng(item?.point) ?? coordinatesFromObject(item);
          if (!coords) return null;
          return { at: string(item?.time) ?? null, coordinates: coords };
        }).filter((point): point is JourneyPathPoint => point !== null)
        : [];
      const topCandidate = record(activity.topCandidate);
      const source = sourceReference(session, path, number(activity.probability));
      const endpointPoints: JourneyPathPoint[] = [start, end].flatMap(item => {
        const coords = coordinatesFromLatLng(item?.latLng) ?? coordinatesFromObject(item);
        return coords ? [{ at: null, coordinates: coords }] : [];
      });
      journeys.push({
        id: entityId("journey", session.id, path, segmentInterval),
        startPlaceId: null,
        endPlaceId: null,
        interval: segmentInterval,
        travelMode: string(topCandidate?.type) ?? string(activity.activityType) ?? "UNKNOWN",
        distanceMeters: number(activity.distanceMeters) ?? number(activity.distance),
        path: pathPoints.length > 0 ? pathPoints : endpointPoints,
        confidence: null,
        source,
        annotationId: null,
      });
    } else {
      warnings.push({ code: "unsupported-semantic-segment", message: "Segment contains neither a visit nor an activity.", recordPath: path });
    }
  });
}

function normalizeTimelineObjects(
  objects: unknown[],
  session: ImportSession,
  places: Map<string, Place>,
  visits: Visit[],
  journeys: Journey[],
  warnings: NormalizationWarning[],
): void {
  objects.forEach((entry, index) => {
    const item = record(entry);
    const path = `timelineObjects[${index}]`;
    if (!item) return;
    const placeVisit = record(item.placeVisit) ?? record(item.visit);
    const activity = record(item.activitySegment) ?? record(item.activity);
    if (placeVisit) {
      const location = record(placeVisit.location) ?? record(placeVisit.topCandidate) ?? {};
      const duration = record(placeVisit.duration) ?? item;
      const placeLocation = location.placeLocation;
      const coords = coordinatesFromObject(location)
        ?? coordinatesFromLatLng(placeLocation)
        ?? coordinatesFromLatLng(record(placeLocation)?.latLng);
      const googlePlaceId = string(location.placeId) ?? string(location.placeID);
      const semanticType = string(location.semanticType);
      const visitInterval = interval(duration.startTimestamp ?? item.startTime, duration.endTimestamp ?? item.endTime);
      const placeId = googlePlaceId ? `google_${googlePlaceId}` : entityId("place", coords, semanticType, string(location.name));
      const source = sourceReference(session, path, number(placeVisit.probability), googlePlaceId);
      addPlace(places, {
        id: placeId,
        name: string(location.name) ?? semanticType ?? "Unknown place",
        category: null,
        coordinates: coords,
        boundary: null,
        googlePlaceId,
        semanticType,
        ignored: false,
        notes: "",
        tags: [],
      }, source);
      visits.push({ id: entityId("visit", session.id, path, visitInterval), placeId, interval: visitInterval, coordinates: coords, confidence: null, source, annotationId: null });
    } else if (activity) {
      const duration = record(activity.duration) ?? item;
      const journeyInterval = interval(duration.startTimestamp ?? item.startTime, duration.endTimestamp ?? item.endTime);
      const simplified = record(activity.simplifiedRawPath);
      const waypoints = record(activity.waypointPath);
      const rawPoints = Array.isArray(simplified?.points) ? simplified.points : Array.isArray(waypoints?.waypoints) ? waypoints.waypoints : [];
      const source = sourceReference(session, path);
      journeys.push({
        id: entityId("journey", session.id, path, journeyInterval),
        startPlaceId: null,
        endPlaceId: null,
        interval: journeyInterval,
        travelMode: string(activity.activityType) ?? string(waypoints?.travelMode) ?? "UNKNOWN",
        distanceMeters: number(activity.distance) ?? number(simplified?.distanceMeters) ?? number(waypoints?.distanceMeters),
        path: rawPoints.map(point => coordinatesFromObject(point)).filter((coords): coords is Coordinates => coords !== null).map(coords => ({ at: null, coordinates: coords })),
        confidence: null,
        source,
        annotationId: null,
      });
    } else {
      warnings.push({ code: "unsupported-timeline-object", message: "Timeline object contains neither a visit nor an activity.", recordPath: path });
    }
  });
}

function eventBounds(visits: Visit[], journeys: Journey[]): [string | null, string | null] {
  const timestamps = [...visits, ...journeys]
    .flatMap(event => [event.interval.start, event.interval.end])
    .filter((value): value is string => value !== null)
    .sort();
  return [timestamps[0] ?? null, timestamps.at(-1) ?? null];
}

export interface NormalizeTimelineOptions {
  sourceName?: string;
  importedAt?: string;
  format?: TimelineSourceFormat;
}

export function normalizeTimeline(input: unknown, options: NormalizeTimelineOptions = {}): CanonicalTimeline {
  const sourceName = options.sourceName ?? "Timeline.json";
  const format = options.format ?? detectTimelineFormat(input, sourceName);
  const fingerprint = stableHash(input);
  const session: ImportSession = {
    id: entityId("import", sourceName, fingerprint),
    importedAt: options.importedAt ?? new Date().toISOString(),
    sourceName,
    format,
    fingerprint,
    firstEventAt: null,
    lastEventAt: null,
    recordCount: 0,
  };
  const places = new Map<string, Place>();
  const visits: Visit[] = [];
  const journeys: Journey[] = [];
  const warnings: NormalizationWarning[] = [];
  const object = record(input);

  if (format === "semantic-segments" && Array.isArray(object?.semanticSegments)) {
    normalizeSemanticSegments(object.semanticSegments, session, places, visits, journeys, warnings);
  } else {
    const objects = Array.isArray(input) ? input : Array.isArray(object?.timelineObjects) ? object.timelineObjects : [];
    normalizeTimelineObjects(objects, session, places, visits, journeys, warnings);
  }
  const [firstEventAt, lastEventAt] = eventBounds(visits, journeys);
  session.firstEventAt = firstEventAt;
  session.lastEventAt = lastEventAt;
  session.recordCount = visits.length + journeys.length;
  return {
    schemaVersion: 1,
    importSession: session,
    places: [...places.values()],
    visits,
    journeys,
    rawLocationPoints: [],
    annotations: [],
    warnings,
  };
}
