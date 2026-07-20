import type { Journey, Place, Visit } from "../model/types.js";
import { buildJourneyAnalytics } from "./journeys.js";
import { buildPlaceProfile } from "./place-profiles.js";

export interface ComparisonValue {
  value: number | null;
  differenceFromBaseline: number | null;
  percentageDifferenceFromBaseline: number | null;
}

export interface PlaceComparisonRow {
  place: Place;
  visitCount: ComparisonValue;
  uniqueDays: ComparisonValue;
  totalDurationMs: ComparisonValue;
  medianDurationMs: ComparisonValue;
  lowConfidenceVisits: ComparisonValue;
  medianArrivalHour: number | null;
  topPreviousPlaceId: string | null;
  topNextPlaceId: string | null;
}

export interface JourneyComparisonRow {
  journey: Journey;
  durationMs: ComparisonValue;
  distanceMeters: ComparisonValue;
  averageSpeedKph: ComparisonValue;
  routeDirectness: ComparisonValue;
  pauses: ComparisonValue;
  dataQualityScore: ComparisonValue;
}

function compare(value: number | null, baseline: number | null): ComparisonValue {
  if (value === null || baseline === null) return { value, differenceFromBaseline: null, percentageDifferenceFromBaseline: null };
  const difference = value - baseline;
  return { value, differenceFromBaseline: difference, percentageDifferenceFromBaseline: baseline === 0 ? null : difference / baseline * 100 };
}

function histogramMedian(histogram: readonly number[]): number | null {
  const total = histogram.reduce((sum, value) => sum + value, 0);
  if (total === 0) return null;
  const target = total / 2;
  let cumulative = 0;
  for (let index = 0; index < histogram.length; index += 1) {
    cumulative += histogram[index] ?? 0;
    if (cumulative >= target) return index;
  }
  return null;
}

export function comparePlaces(placeIds: readonly string[], places: readonly Place[], visits: readonly Visit[], journeys: readonly Journey[], timeZone: string): PlaceComparisonRow[] {
  const profiles = placeIds.flatMap(id => {
    const place = places.find(candidate => candidate.id === id);
    return place ? [buildPlaceProfile(place, visits, journeys, timeZone)] : [];
  });
  const baseline = profiles[0];
  if (!baseline) return [];
  return profiles.map(profile => ({
    place: profile.place,
    visitCount: compare(profile.visitCount, baseline.visitCount),
    uniqueDays: compare(profile.uniqueVisitDays, baseline.uniqueVisitDays),
    totalDurationMs: compare(profile.totalDurationMs, baseline.totalDurationMs),
    medianDurationMs: compare(profile.duration.median, baseline.duration.median),
    lowConfidenceVisits: compare(profile.lowConfidenceVisits, baseline.lowConfidenceVisits),
    medianArrivalHour: histogramMedian(profile.arrivalHours),
    topPreviousPlaceId: profile.commonPreviousPlaces[0]?.placeId ?? null,
    topNextPlaceId: profile.commonNextPlaces[0]?.placeId ?? null,
  }));
}

export function compareJourneys(journeyIds: readonly string[], journeys: readonly Journey[]): JourneyComparisonRow[] {
  const selected = journeyIds.flatMap(id => {
    const journey = journeys.find(candidate => candidate.id === id);
    return journey ? [{ journey, metrics: buildJourneyAnalytics(journey) }] : [];
  });
  const baseline = selected[0];
  if (!baseline) return [];
  return selected.map(({ journey, metrics }) => ({
    journey,
    durationMs: compare(metrics.durationMs, baseline.metrics.durationMs),
    distanceMeters: compare(metrics.recordedDistanceMeters ?? metrics.calculatedDistanceMeters, baseline.metrics.recordedDistanceMeters ?? baseline.metrics.calculatedDistanceMeters),
    averageSpeedKph: compare(metrics.averageSpeedKph, baseline.metrics.averageSpeedKph),
    routeDirectness: compare(metrics.routeDirectness, baseline.metrics.routeDirectness),
    pauses: compare(metrics.pauses.length, baseline.metrics.pauses.length),
    dataQualityScore: compare(metrics.dataQualityScore, baseline.metrics.dataQualityScore),
  }));
}
