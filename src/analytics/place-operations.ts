import type { Coordinates, Place, Visit } from "../model/types.js";
import { coordinateCentroid, estimatedRadiusMeters, haversineMeters } from "./spatial.js";
import { summarizeDistribution } from "./statistics.js";

export interface PlaceMergePreview {
  sourcePlaceIds: string[];
  combinedVisitCount: number;
  combinedDurationMs: number;
  proposedCentre: Coordinates | null;
  proposedRadiusMeters: number | null;
  conflictingNames: string[];
  conflictingCategories: string[];
  googlePlaceIds: string[];
  possibleOutlierVisitIds: string[];
}

export interface SplitSuggestion {
  method: "coordinates" | "date-range" | "duration";
  visitIds: string[];
  explanation: string;
}

export function previewPlaceMerge(placeIds: readonly string[], places: readonly Place[], visits: readonly Visit[]): PlaceMergePreview {
  const selectedPlaces = places.filter(place => placeIds.includes(place.id));
  const selectedVisits = visits.filter(visit => placeIds.includes(visit.placeId));
  const coordinates = selectedVisits.flatMap(visit => visit.coordinates ? [visit.coordinates] : []);
  const centre = coordinateCentroid(coordinates.length ? coordinates : selectedPlaces.flatMap(place => place.coordinates ? [place.coordinates] : []));
  const radius = estimatedRadiusMeters(coordinates);
  return {
    sourcePlaceIds: [...placeIds],
    combinedVisitCount: selectedVisits.length,
    combinedDurationMs: selectedVisits.reduce((sum, visit) => sum + (visit.interval.start && visit.interval.end ? Math.max(0, Date.parse(visit.interval.end) - Date.parse(visit.interval.start)) : 0), 0),
    proposedCentre: centre,
    proposedRadiusMeters: radius,
    conflictingNames: [...new Set(selectedPlaces.map(place => place.name))],
    conflictingCategories: [...new Set(selectedPlaces.flatMap(place => place.category ? [place.category] : []))],
    googlePlaceIds: [...new Set(selectedPlaces.flatMap(place => place.googlePlaceId ? [place.googlePlaceId] : []))],
    possibleOutlierVisitIds: centre && radius !== null ? selectedVisits.filter(visit => visit.coordinates && haversineMeters(centre, visit.coordinates) > Math.max(75, radius * 0.8)).map(visit => visit.id) : [],
  };
}

function coordinateGroups(visits: readonly Visit[], radiusMeters: number): Visit[][] {
  const groups: Visit[][] = [];
  visits.filter(visit => visit.coordinates).forEach(visit => {
    const group = groups.find(items => items.some(item => item.coordinates && haversineMeters(item.coordinates, visit.coordinates!) <= radiusMeters));
    if (group) group.push(visit); else groups.push([visit]);
  });
  return groups.sort((a, b) => b.length - a.length);
}

export function suggestCoordinateSplit(visits: readonly Visit[], radiusMeters = 50): SplitSuggestion | null {
  const groups = coordinateGroups(visits, radiusMeters);
  const secondary = groups[1];
  if (!secondary || secondary.length < 1) return null;
  return { method: "coordinates", visitIds: secondary.map(visit => visit.id), explanation: `${secondary.length} visits form a separate coordinate cluster at least ${radiusMeters} m from the main cluster.` };
}

export function suggestDateRangeSplit(visits: readonly Visit[], startDate: string | null, endDate: string | null): SplitSuggestion | null {
  const selected = visits.filter(visit => visit.interval.start && (!startDate || visit.interval.start.slice(0, 10) >= startDate) && (!endDate || visit.interval.start.slice(0, 10) <= endDate));
  return selected.length ? { method: "date-range", visitIds: selected.map(visit => visit.id), explanation: `${selected.length} visits fall within the requested date range.` } : null;
}

export function suggestDurationSplit(visits: readonly Visit[], thresholdMinutes?: number): SplitSuggestion | null {
  const rows = visits.flatMap(visit => visit.interval.start && visit.interval.end ? [{ visit, durationMs: Date.parse(visit.interval.end) - Date.parse(visit.interval.start) }] : []);
  const summary = summarizeDistribution(rows.map(row => row.durationMs));
  const thresholdMs = thresholdMinutes === undefined ? (summary.p75 === null || summary.interquartileRange === null ? null : summary.p75 + 1.5 * summary.interquartileRange) : thresholdMinutes * 60_000;
  if (thresholdMs === null) return null;
  const selected = rows.filter(row => row.durationMs >= thresholdMs);
  return selected.length ? { method: "duration", visitIds: selected.map(row => row.visit.id), explanation: `${selected.length} visits last at least ${Math.round(thresholdMs / 60_000)} minutes.` } : null;
}
