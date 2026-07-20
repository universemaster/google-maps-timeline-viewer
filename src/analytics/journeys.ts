import type { Coordinates, Journey, Place } from "../model/types.js";
import { scoreJourney } from "./confidence.js";
import { durationMilliseconds } from "./intervals.js";
import { haversineMeters } from "./spatial.js";
import { median, percentile } from "./statistics.js";

export interface PauseMetric {
  startAt: string;
  endAt: string;
  durationMs: number;
  coordinates: Coordinates;
}

export interface JourneyAnalytics {
  journeyId: string;
  startPlaceId: string | null;
  endPlaceId: string | null;
  startAt: string | null;
  endAt: string | null;
  durationMs: number | null;
  movingDurationMs: number | null;
  stationaryDurationMs: number | null;
  recordedDistanceMeters: number | null;
  calculatedDistanceMeters: number | null;
  straightLineDistanceMeters: number | null;
  averageSpeedKph: number | null;
  medianSpeedKph: number | null;
  maximumPlausibleSpeedKph: number | null;
  travelMode: string;
  travelModeConfidence: number;
  routeDirectness: number | null;
  recordedMinusStraightMeters: number | null;
  pauses: PauseMetric[];
  pauseDurationMs: number;
  dataQualityScore: number;
}

export interface WalkingAnalytics {
  distanceMeters: number | null;
  durationMs: number | null;
  averagePaceMinutesPerKilometre: number | null;
  medianPaceMinutesPerKilometre: number | null;
  fastestSustainedPaceMinutesPerKilometre: number | null;
  longestPauseMs: number;
  pauseCount: number;
  routeNoveltyPercent: number | null;
  percentagePreviouslyTravelled: number | null;
  mostSimilarWalks: Array<{ journeyId: string; similarityPercent: number }>;
}

export interface PublicTransportAnalytics {
  likelyBoardingPlaceId: string | null;
  likelyAlightingPlaceId: string | null;
  waitingTimeMs: number | null;
  timeAboardMs: number | null;
  transferCount: number | null;
  likelyService: string | null;
  confidence: number;
  explanation: string;
}

interface LegMetric {
  startAt: string;
  endAt: string;
  durationMs: number;
  distanceMeters: number;
  speedKph: number;
  start: Coordinates;
  end: Coordinates;
}

function pathLegs(journey: Journey): LegMetric[] {
  const legs: LegMetric[] = [];
  for (let index = 1; index < journey.path.length; index += 1) {
    const previous = journey.path[index - 1]!;
    const current = journey.path[index]!;
    if (!previous.at || !current.at) continue;
    const durationMs = Date.parse(current.at) - Date.parse(previous.at);
    if (durationMs <= 0) continue;
    const distanceMeters = haversineMeters(previous.coordinates, current.coordinates);
    legs.push({ startAt: previous.at, endAt: current.at, durationMs, distanceMeters, speedKph: distanceMeters / durationMs * 3_600, start: previous.coordinates, end: current.coordinates });
  }
  return legs;
}

function calculatedDistance(journey: Journey): number | null {
  if (journey.path.length < 2) return null;
  let total = 0;
  for (let index = 1; index < journey.path.length; index += 1) total += haversineMeters(journey.path[index - 1]!.coordinates, journey.path[index]!.coordinates);
  return total;
}

function routeCells(journey: Journey, precision = 0.001): Set<string> {
  return new Set(journey.path.map(point => `${Math.round(point.coordinates.latitude / precision)}:${Math.round(point.coordinates.longitude / precision)}`));
}

function similarity(left: Set<string>, right: Set<string>): number {
  if (left.size === 0 || right.size === 0) return 0;
  const intersection = [...left].filter(value => right.has(value)).length;
  const union = new Set([...left, ...right]).size;
  return intersection / union * 100;
}

export function buildJourneyAnalytics(journey: Journey): JourneyAnalytics {
  const durationMs = durationMilliseconds(journey.interval.start, journey.interval.end);
  const legs = pathLegs(journey);
  const pauses = legs.filter(leg => leg.speedKph < 1 && leg.durationMs >= 60_000).map(leg => ({ startAt: leg.startAt, endAt: leg.endAt, durationMs: leg.durationMs, coordinates: leg.start }));
  const pauseDurationMs = pauses.reduce((sum, pause) => sum + pause.durationMs, 0);
  const distance = journey.distanceMeters ?? calculatedDistance(journey);
  const first = journey.path[0]?.coordinates;
  const last = journey.path.at(-1)?.coordinates;
  const straightLineDistanceMeters = first && last ? haversineMeters(first, last) : null;
  const plausibleSpeeds = legs.map(leg => leg.speedKph).filter(speed => speed <= 350);
  return {
    journeyId: journey.id,
    startPlaceId: journey.startPlaceId,
    endPlaceId: journey.endPlaceId,
    startAt: journey.interval.start,
    endAt: journey.interval.end,
    durationMs,
    movingDurationMs: durationMs === null ? null : Math.max(0, durationMs - pauseDurationMs),
    stationaryDurationMs: durationMs === null ? null : pauseDurationMs,
    recordedDistanceMeters: journey.distanceMeters,
    calculatedDistanceMeters: calculatedDistance(journey),
    straightLineDistanceMeters,
    averageSpeedKph: durationMs && distance ? distance / durationMs * 3_600 : null,
    medianSpeedKph: median(legs.map(leg => leg.speedKph)),
    maximumPlausibleSpeedKph: plausibleSpeeds.length ? Math.max(...plausibleSpeeds) : null,
    travelMode: journey.travelMode,
    travelModeConfidence: scoreJourney(journey).score,
    routeDirectness: distance && straightLineDistanceMeters !== null && distance > 0 ? straightLineDistanceMeters / distance : null,
    recordedMinusStraightMeters: distance !== null && straightLineDistanceMeters !== null ? distance - straightLineDistanceMeters : null,
    pauses,
    pauseDurationMs,
    dataQualityScore: scoreJourney(journey).score,
  };
}

export function buildWalkingAnalytics(journey: Journey, previousJourneys: readonly Journey[]): WalkingAnalytics | null {
  if (!/WALK|ON_FOOT/i.test(journey.travelMode)) return null;
  const metrics = buildJourneyAnalytics(journey);
  const distance = metrics.recordedDistanceMeters ?? metrics.calculatedDistanceMeters;
  const duration = metrics.movingDurationMs;
  const walkingLegs = pathLegs(journey).filter(leg => leg.speedKph >= 1 && leg.speedKph <= 15);
  const currentCells = routeCells(journey);
  const comparable = previousJourneys.filter(other => other.id !== journey.id && /WALK|ON_FOOT/i.test(other.travelMode)).map(other => ({ journeyId: other.id, similarityPercent: similarity(currentCells, routeCells(other)) })).sort((left, right) => right.similarityPercent - left.similarityPercent);
  const previouslyTravelled = new Set(previousJourneys.filter(other => other.id !== journey.id && /WALK|ON_FOOT/i.test(other.travelMode)).flatMap(other => [...routeCells(other)]));
  const reused = [...currentCells].filter(cell => previouslyTravelled.has(cell)).length;
  const previousPercent = currentCells.size ? reused / currentCells.size * 100 : null;
  return {
    distanceMeters: distance,
    durationMs: duration,
    averagePaceMinutesPerKilometre: distance && duration ? duration / 60_000 / (distance / 1_000) : null,
    medianPaceMinutesPerKilometre: median(walkingLegs.map(leg => 60 / leg.speedKph)),
    fastestSustainedPaceMinutesPerKilometre: percentile(walkingLegs.map(leg => 60 / leg.speedKph), 0.1),
    longestPauseMs: Math.max(0, ...metrics.pauses.map(pause => pause.durationMs)),
    pauseCount: metrics.pauses.length,
    routeNoveltyPercent: previousPercent === null ? null : 100 - previousPercent,
    percentagePreviouslyTravelled: previousPercent,
    mostSimilarWalks: comparable.slice(0, 3),
  };
}

export function buildPublicTransportAnalytics(journey: Journey, allJourneys: readonly Journey[], places: readonly Place[]): PublicTransportAnalytics | null {
  if (!/(BUS|TRAIN|RAIL|TRAM|SUBWAY|TRANSIT|FERRY)/i.test(journey.travelMode)) return null;
  const durationMs = durationMilliseconds(journey.interval.start, journey.interval.end);
  const placeIds = new Set(places.map(place => place.id));
  const confidence = scoreJourney(journey).score;
  const sameRouteCount = allJourneys.filter(other => other.id !== journey.id && other.startPlaceId === journey.startPlaceId && other.endPlaceId === journey.endPlaceId && other.travelMode === journey.travelMode).length;
  return {
    likelyBoardingPlaceId: journey.startPlaceId && placeIds.has(journey.startPlaceId) ? journey.startPlaceId : null,
    likelyAlightingPlaceId: journey.endPlaceId && placeIds.has(journey.endPlaceId) ? journey.endPlaceId : null,
    waitingTimeMs: null,
    timeAboardMs: durationMs,
    transferCount: 0,
    likelyService: null,
    confidence: Math.min(confidence, journey.startPlaceId && journey.endPlaceId ? 85 : 60),
    explanation: sameRouteCount ? `This origin, destination and mode recur in ${sameRouteCount} other journeys; no exact service is claimed.` : "The mode is recorded, but there is not enough evidence to identify an exact service.",
  };
}
