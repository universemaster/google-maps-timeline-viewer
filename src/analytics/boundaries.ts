import type { Boundary, Coordinates, Visit } from "../model/types.js";
import { haversineMeters } from "./spatial.js";

export function pointInsideBoundary(point: Coordinates, boundary: Boundary): boolean {
  if (boundary.kind === "circle") return haversineMeters(point, boundary.centre) <= boundary.radiusMeters;
  const vertices = boundary.vertices;
  if (vertices.length < 3) return false;
  let inside = false;
  for (let index = 0, previous = vertices.length - 1; index < vertices.length; previous = index, index += 1) {
    const currentPoint = vertices[index]!;
    const previousPoint = vertices[previous]!;
    const crosses = (currentPoint.latitude > point.latitude) !== (previousPoint.latitude > point.latitude)
      && point.longitude < (previousPoint.longitude - currentPoint.longitude) * (point.latitude - currentPoint.latitude)
        / (previousPoint.latitude - currentPoint.latitude) + currentPoint.longitude;
    if (crosses) inside = !inside;
  }
  return inside;
}

export interface BoundaryPreview {
  currentlyInsideVisitIds: string[];
  proposedInsideVisitIds: string[];
  enteringVisitIds: string[];
  leavingVisitIds: string[];
}

export function previewBoundaryChange(visits: readonly Visit[], current: Boundary | null, proposed: Boundary): BoundaryPreview {
  const located = visits.filter((visit): visit is Visit & { coordinates: Coordinates } => visit.coordinates !== null);
  const currentlyInsideVisitIds = current ? located.filter(visit => pointInsideBoundary(visit.coordinates, current)).map(visit => visit.id) : [];
  const proposedInsideVisitIds = located.filter(visit => pointInsideBoundary(visit.coordinates, proposed)).map(visit => visit.id);
  const currentSet = new Set(currentlyInsideVisitIds);
  const proposedSet = new Set(proposedInsideVisitIds);
  return {
    currentlyInsideVisitIds,
    proposedInsideVisitIds,
    enteringVisitIds: proposedInsideVisitIds.filter(id => !currentSet.has(id)),
    leavingVisitIds: currentlyInsideVisitIds.filter(id => !proposedSet.has(id)),
  };
}
