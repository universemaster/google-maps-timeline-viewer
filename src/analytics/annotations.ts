import { entityId } from "../model/identifiers.js";
import type { AnnotationRule, Visit, VisitAnnotation } from "../model/types.js";
import { durationMilliseconds } from "./intervals.js";

export const VISIT_PURPOSES = ["Study", "Meal", "Coffee", "Shopping", "Exercise", "Walk", "Social", "Appointment", "Waiting", "Travel", "Errand", "Sightseeing", "Accommodation", "Other"] as const;

export function matchesAnnotationRule(visit: Visit, rule: AnnotationRule): boolean {
  if (!rule.enabled) return false;
  if (rule.placeId && visit.placeId !== rule.placeId) return false;
  const duration = durationMilliseconds(visit.interval.start, visit.interval.end);
  if (rule.minimumDurationMs !== null && (duration === null || duration < rule.minimumDurationMs)) return false;
  if (rule.maximumDurationMs !== null && (duration === null || duration > rule.maximumDurationMs)) return false;
  return true;
}

function emptyAnnotation(visitId: string): VisitAnnotation {
  return {
    id: entityId("annotation", visitId),
    visitId,
    purpose: null,
    activity: null,
    satisfaction: null,
    noise: null,
    crowding: null,
    airQuality: null,
    spending: null,
    foodAndDrink: [],
    people: [],
    note: "",
    tags: [],
    wouldReturn: null,
    planned: null,
    detectedPlaceCorrect: null,
  };
}

export function applyAnnotationRules(visits: readonly Visit[], rules: readonly AnnotationRule[]): VisitAnnotation[] {
  return visits.flatMap(visit => {
    const matching = rules.filter(rule => matchesAnnotationRule(visit, rule));
    if (matching.length === 0) return [];
    const annotation = matching.reduce<VisitAnnotation>((current, rule) => ({ ...current, ...rule.set, id: current.id, visitId: current.visitId }), emptyAnnotation(visit.id));
    return [annotation];
  });
}

export function mergeAnnotations(generated: readonly VisitAnnotation[], manual: readonly VisitAnnotation[]): VisitAnnotation[] {
  const merged = new Map(generated.map(annotation => [annotation.visitId, { ...annotation }]));
  manual.forEach(annotation => merged.set(annotation.visitId, { ...(merged.get(annotation.visitId) ?? emptyAnnotation(annotation.visitId)), ...annotation }));
  return [...merged.values()];
}

export function copyAnnotationToVisits(annotation: VisitAnnotation, visitIds: readonly string[]): VisitAnnotation[] {
  return visitIds.map(visitId => ({ ...annotation, id: entityId("annotation", visitId), visitId, foodAndDrink: [...annotation.foodAndDrink], people: [...annotation.people], tags: [...annotation.tags] }));
}
