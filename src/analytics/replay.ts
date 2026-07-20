import type { Coordinates, Journey, Place, Visit } from "../model/types.js";
import { dayInterval } from "./time.js";

export type ReplaySegment =
  | { kind: "visit"; startMs: number; endMs: number; visit: Visit; place: Place | null }
  | { kind: "journey"; startMs: number; endMs: number; journey: Journey };

export type ReplayPauseReason = "arrival" | "departure" | "mode-change" | "long-gap";

export interface ReplayPausePoint {
  atMs: number;
  reason: ReplayPauseReason;
  description: string;
}

export interface ReplayPlan {
  date: string;
  timeZone: string;
  startMs: number;
  endMs: number;
  segments: ReplaySegment[];
  pausePoints: ReplayPausePoint[];
  routeBounds: { minimum: Coordinates; maximum: Coordinates } | null;
}

export interface ReplayState {
  atMs: number;
  progress: number;
  activeSegment: ReplaySegment | null;
  coordinates: Coordinates | null;
  elapsedInSegmentMs: number;
  cumulativeDistanceMeters: number;
  cumulativeOutsideHomeMs: number;
  cumulativeWalkingMs: number;
  cumulativePublicTransportMs: number;
  cumulativeStationaryMs: number;
}

function isHome(place: Place | null): boolean {
  return Boolean(place && (place.semanticType?.toUpperCase() === "HOME" || place.name.trim().toLowerCase() === "home"));
}

function publicTransport(mode: string): boolean {
  return /(BUS|TRAIN|RAIL|TRAM|SUBWAY|TRANSIT|FERRY)/i.test(mode);
}

function walking(mode: string): boolean {
  return /WALK|ON_FOOT/i.test(mode);
}

function clippedInterval(start: string | null, end: string | null, lower: number, upper: number): { startMs: number; endMs: number } | null {
  if (!start || !end) return null;
  const startMs = Math.max(Date.parse(start), lower);
  const endMs = Math.min(Date.parse(end), upper);
  return Number.isFinite(startMs) && Number.isFinite(endMs) && endMs > startMs ? { startMs, endMs } : null;
}

function routeBounds(journeys: readonly Journey[]): ReplayPlan["routeBounds"] {
  const points = journeys.flatMap(journey => journey.path.map(point => point.coordinates));
  if (points.length === 0) return null;
  return {
    minimum: {
      latitude: Math.min(...points.map(point => point.latitude)),
      longitude: Math.min(...points.map(point => point.longitude)),
    },
    maximum: {
      latitude: Math.max(...points.map(point => point.latitude)),
      longitude: Math.max(...points.map(point => point.longitude)),
    },
  };
}

export function buildReplayPlan(
  date: string,
  timeZone: string,
  places: readonly Place[],
  visits: readonly Visit[],
  journeys: readonly Journey[],
  longGapMs = 60 * 60_000,
): ReplayPlan {
  const day = dayInterval(date, timeZone);
  const placeById = new Map(places.map(place => [place.id, place]));
  const segments: ReplaySegment[] = [
    ...visits.flatMap(visit => {
      const clipped = clippedInterval(visit.interval.start, visit.interval.end, day.startMs, day.endMs);
      return clipped ? [{ kind: "visit" as const, ...clipped, visit, place: placeById.get(visit.placeId) ?? null }] : [];
    }),
    ...journeys.flatMap(journey => {
      const clipped = clippedInterval(journey.interval.start, journey.interval.end, day.startMs, day.endMs);
      return clipped ? [{ kind: "journey" as const, ...clipped, journey }] : [];
    }),
  ].sort((left, right) => left.startMs - right.startMs || left.endMs - right.endMs);

  const pausePoints: ReplayPausePoint[] = [];
  segments.forEach((segment, index) => {
    if (segment.kind === "visit") {
      pausePoints.push({ atMs: segment.startMs, reason: "arrival", description: `Arrived at ${segment.place?.name ?? "a place"}` });
      pausePoints.push({ atMs: segment.endMs, reason: "departure", description: `Left ${segment.place?.name ?? "a place"}` });
    }
    const previous = segments[index - 1];
    if (previous && segment.startMs - previous.endMs >= longGapMs) {
      pausePoints.push({ atMs: previous.endMs, reason: "long-gap", description: `Tracking gap of ${Math.round((segment.startMs - previous.endMs) / 60_000)} minutes` });
    }
    if (previous?.kind === "journey" && segment.kind === "journey" && previous.journey.travelMode !== segment.journey.travelMode) {
      pausePoints.push({ atMs: segment.startMs, reason: "mode-change", description: `Travel mode changed to ${segment.journey.travelMode}` });
    }
  });
  pausePoints.sort((left, right) => left.atMs - right.atMs);
  return { date, timeZone, startMs: day.startMs, endMs: day.endMs, segments, pausePoints, routeBounds: routeBounds(journeys) };
}

function interpolate(left: Coordinates, right: Coordinates, progress: number): Coordinates {
  return {
    latitude: left.latitude + (right.latitude - left.latitude) * progress,
    longitude: left.longitude + (right.longitude - left.longitude) * progress,
  };
}

function coordinatesAt(segment: ReplaySegment, atMs: number): Coordinates | null {
  if (segment.kind === "visit") return segment.visit.coordinates ?? segment.place?.coordinates ?? null;
  const path = segment.journey.path;
  if (path.length === 0) return null;
  if (path.length === 1) return path[0]?.coordinates ?? null;
  const progress = Math.max(0, Math.min(1, (atMs - segment.startMs) / (segment.endMs - segment.startMs)));
  const scaled = progress * (path.length - 1);
  const index = Math.min(path.length - 2, Math.floor(scaled));
  return interpolate(path[index]!.coordinates, path[index + 1]!.coordinates, scaled - index);
}

export function replayStateAt(plan: ReplayPlan, atMs: number): ReplayState {
  const boundedAt = Math.max(plan.startMs, Math.min(plan.endMs, atMs));
  const activeSegment = plan.segments.find(segment => boundedAt >= segment.startMs && boundedAt < segment.endMs) ?? null;
  let cumulativeDistanceMeters = 0;
  let cumulativeOutsideHomeMs = 0;
  let cumulativeWalkingMs = 0;
  let cumulativePublicTransportMs = 0;
  let cumulativeStationaryMs = 0;
  plan.segments.forEach(segment => {
    const elapsed = Math.max(0, Math.min(boundedAt, segment.endMs) - segment.startMs);
    if (elapsed <= 0) return;
    const segmentDuration = segment.endMs - segment.startMs;
    if (segment.kind === "visit") {
      cumulativeStationaryMs += elapsed;
      if (!isHome(segment.place)) cumulativeOutsideHomeMs += elapsed;
    } else {
      cumulativeOutsideHomeMs += elapsed;
      cumulativeDistanceMeters += (segment.journey.distanceMeters ?? 0) * elapsed / segmentDuration;
      if (walking(segment.journey.travelMode)) cumulativeWalkingMs += elapsed;
      if (publicTransport(segment.journey.travelMode)) cumulativePublicTransportMs += elapsed;
    }
  });
  return {
    atMs: boundedAt,
    progress: (boundedAt - plan.startMs) / (plan.endMs - plan.startMs),
    activeSegment,
    coordinates: activeSegment ? coordinatesAt(activeSegment, boundedAt) : null,
    elapsedInSegmentMs: activeSegment ? boundedAt - activeSegment.startMs : 0,
    cumulativeDistanceMeters,
    cumulativeOutsideHomeMs,
    cumulativeWalkingMs,
    cumulativePublicTransportMs,
    cumulativeStationaryMs,
  };
}

export function nextPausePoint(
  plan: ReplayPlan,
  afterMs: number,
  enabledReasons: ReadonlySet<ReplayPauseReason>,
): ReplayPausePoint | null {
  return plan.pausePoints.find(point => point.atMs > afterMs && enabledReasons.has(point.reason)) ?? null;
}
