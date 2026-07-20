import { entityId } from "../model/identifiers.js";
import type { Coordinates, Journey, Place, Visit } from "../model/types.js";
import { durationMilliseconds } from "./intervals.js";
import { coordinateCentroid, estimatedRadiusMeters, haversineMeters } from "./spatial.js";
import { median } from "./statistics.js";
import { localParts } from "./time.js";

export type SuggestedPlaceClassification =
  | "likely-meaningful-place"
  | "likely-duplicate"
  | "public-transport-interchange"
  | "repeated-route-pause"
  | "gps-scatter"
  | "temporary-accommodation"
  | "one-off-location"
  | "uncertain";

export interface PlaceDiscoverySettings {
  minimumDwellMs: number;
  minimumDistinctVisitDays: number;
  urbanRadiusMeters: number;
  suburbanRadiusMeters: number;
  ruralRadiusMeters: number;
  minimumTotalDurationMs: number;
  environment: "urban" | "suburban" | "rural";
}

export const DEFAULT_PLACE_DISCOVERY_SETTINGS: PlaceDiscoverySettings = {
  minimumDwellMs: 10 * 60_000,
  minimumDistinctVisitDays: 3,
  urbanRadiusMeters: 30,
  suburbanRadiusMeters: 50,
  ruralRadiusMeters: 75,
  minimumTotalDurationMs: 60 * 60_000,
  environment: "suburban",
};

export interface SuggestedPlace {
  id: string;
  centre: Coordinates;
  radiusMeters: number;
  visitIds: string[];
  visitCount: number;
  uniqueDays: number;
  totalDurationMs: number;
  medianDurationMs: number | null;
  firstVisitAt: string;
  mostRecentVisitAt: string;
  nearestKnownPlaces: Array<{ placeId: string; distanceMeters: number }>;
  confidence: number;
  classification: SuggestedPlaceClassification;
  reason: string;
}

interface CandidateVisit {
  visit: Visit;
  coordinates: Coordinates;
  durationMs: number;
}

function radius(settings: PlaceDiscoverySettings): number {
  return settings.environment === "urban" ? settings.urbanRadiusMeters : settings.environment === "rural" ? settings.ruralRadiusMeters : settings.suburbanRadiusMeters;
}

function wellDefined(place: Place | undefined): boolean {
  return Boolean(place && (place.googlePlaceId || place.category || place.boundary || (place.name !== "Unknown place" && !place.id.startsWith("place_"))));
}

function clusterVisits(candidates: CandidateVisit[], radiusMeters: number): CandidateVisit[][] {
  const cellDegrees = radiusMeters / 111_320;
  const buckets = new Map<string, number[]>();
  const parent = candidates.map((_, index) => index);
  const find = (index: number): number => parent[index] === index ? index : (parent[index] = find(parent[index]!));
  const unite = (left: number, right: number): void => {
    const leftRoot = find(left);
    const rightRoot = find(right);
    if (leftRoot !== rightRoot) parent[rightRoot] = leftRoot;
  };
  candidates.forEach((candidate, index) => {
    const y = Math.floor(candidate.coordinates.latitude / cellDegrees);
    const x = Math.floor(candidate.coordinates.longitude / cellDegrees);
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        const nearby = buckets.get(`${y + dy}:${x + dx}`) ?? [];
        nearby.forEach(otherIndex => {
          if (haversineMeters(candidate.coordinates, candidates[otherIndex]!.coordinates) <= radiusMeters) unite(index, otherIndex);
        });
      }
    }
    const key = `${y}:${x}`;
    buckets.set(key, [...(buckets.get(key) ?? []), index]);
  });
  const clusters = new Map<number, CandidateVisit[]>();
  candidates.forEach((candidate, index) => {
    const root = find(index);
    clusters.set(root, [...(clusters.get(root) ?? []), candidate]);
  });
  return [...clusters.values()];
}

function inferClassification(
  uniqueDays: number,
  medianDurationMs: number | null,
  totalDurationMs: number,
  radiusMeters: number,
  nearestDistance: number | null,
  transitModes: number,
): { classification: SuggestedPlaceClassification; reason: string; confidence: number } {
  if (nearestDistance !== null && nearestDistance <= Math.max(40, radiusMeters)) {
    return { classification: "likely-duplicate", reason: `The cluster overlaps a known place about ${Math.round(nearestDistance)} metres away.`, confidence: 88 };
  }
  if (nearestDistance !== null && nearestDistance <= radiusMeters * 2 && radiusMeters > 45) {
    return { classification: "gps-scatter", reason: "The coordinate spread looks like GPS scatter around a nearby saved place.", confidence: 74 };
  }
  if (transitModes >= Math.max(2, uniqueDays / 2) && (medianDurationMs ?? Infinity) <= 30 * 60_000) {
    return { classification: "public-transport-interchange", reason: "Repeated short stops coincide with public-transport journeys.", confidence: 76 };
  }
  if (uniqueDays >= 3 && totalDurationMs >= 60 * 60_000) {
    return { classification: "likely-meaningful-place", reason: `Repeated dwell was recorded on ${uniqueDays} separate days.`, confidence: Math.min(95, 60 + uniqueDays * 4) };
  }
  if (uniqueDays === 1) return { classification: "one-off-location", reason: "The location appears on only one day.", confidence: 55 };
  return { classification: "uncertain", reason: "The cluster repeats, but the available evidence is limited.", confidence: 45 };
}

export function discoverPlaces(
  places: readonly Place[],
  visits: readonly Visit[],
  journeys: readonly Journey[],
  timeZone: string,
  settings: PlaceDiscoverySettings = DEFAULT_PLACE_DISCOVERY_SETTINGS,
): SuggestedPlace[] {
  const placeById = new Map(places.map(place => [place.id, place]));
  const candidates: CandidateVisit[] = visits.flatMap(visit => {
    const durationMs = durationMilliseconds(visit.interval.start, visit.interval.end);
    if (!visit.coordinates || durationMs === null || durationMs < settings.minimumDwellMs || wellDefined(placeById.get(visit.placeId))) return [];
    return [{ visit, coordinates: visit.coordinates, durationMs }];
  });
  const known = places.filter(place => wellDefined(place) && place.coordinates);
  const clusteringRadius = radius(settings);
  return clusterVisits(candidates, clusteringRadius).flatMap(cluster => {
    const starts = cluster.flatMap(candidate => candidate.visit.interval.start ? [candidate.visit.interval.start] : []).sort();
    const uniqueDays = new Set(starts.map(start => localParts(start, timeZone).date)).size;
    const totalDurationMs = cluster.reduce((sum, candidate) => sum + candidate.durationMs, 0);
    if (uniqueDays < settings.minimumDistinctVisitDays || totalDurationMs < settings.minimumTotalDurationMs || starts.length === 0) return [];
    const centre = coordinateCentroid(cluster.map(candidate => candidate.coordinates));
    if (!centre) return [];
    const nearestKnownPlaces = known.map(place => ({ placeId: place.id, distanceMeters: haversineMeters(centre, place.coordinates!) })).sort((left, right) => left.distanceMeters - right.distanceMeters).slice(0, 3);
    const medianDurationMs = median(cluster.map(candidate => candidate.durationMs));
    const transitModes = journeys.filter(journey => /(BUS|TRAIN|RAIL|TRAM|SUBWAY|TRANSIT|FERRY)/i.test(journey.travelMode) && cluster.some(candidate => {
      const start = candidate.visit.interval.start;
      return start && journey.interval.end && Math.abs(Date.parse(start) - Date.parse(journey.interval.end)) < 45 * 60_000;
    })).length;
    const inferred = inferClassification(uniqueDays, medianDurationMs, totalDurationMs, clusteringRadius, nearestKnownPlaces[0]?.distanceMeters ?? null, transitModes);
    const visitIds = cluster.map(candidate => candidate.visit.id).sort();
    return [{
      id: entityId("suggested-place", visitIds),
      centre,
      radiusMeters: Math.max(clusteringRadius, estimatedRadiusMeters(cluster.map(candidate => candidate.coordinates)) ?? 0),
      visitIds,
      visitCount: cluster.length,
      uniqueDays,
      totalDurationMs,
      medianDurationMs,
      firstVisitAt: starts[0]!,
      mostRecentVisitAt: starts.at(-1)!,
      nearestKnownPlaces,
      confidence: inferred.confidence,
      classification: inferred.classification,
      reason: inferred.reason,
    }];
  }).sort((left, right) => right.confidence - left.confidence || right.totalDurationMs - left.totalDurationMs);
}
