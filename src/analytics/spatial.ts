import type { Coordinates } from "../model/types.js";

const EARTH_RADIUS_METERS = 6_371_000;

export function haversineMeters(left: Coordinates, right: Coordinates): number {
  const toRadians = (degrees: number): number => degrees * Math.PI / 180;
  const latitudeDelta = toRadians(right.latitude - left.latitude);
  const longitudeDelta = toRadians(right.longitude - left.longitude);
  const leftLatitude = toRadians(left.latitude);
  const rightLatitude = toRadians(right.latitude);
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(leftLatitude) * Math.cos(rightLatitude) * Math.sin(longitudeDelta / 2) ** 2;
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(haversine));
}

export function coordinateCentroid(points: readonly Coordinates[]): Coordinates | null {
  if (points.length === 0) return null;
  return {
    latitude: points.reduce((sum, point) => sum + point.latitude, 0) / points.length,
    longitude: points.reduce((sum, point) => sum + point.longitude, 0) / points.length,
  };
}

export function estimatedRadiusMeters(points: readonly Coordinates[]): number | null {
  const centre = coordinateCentroid(points);
  if (!centre) return null;
  return Math.max(0, ...points.map(point => haversineMeters(centre, point)));
}
