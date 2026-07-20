import type { ConfidenceComponent, ConfidenceScore, Journey, Visit } from "../model/types.js";
import { durationMilliseconds } from "./intervals.js";

function finalize(components: ConfidenceComponent[]): ConfidenceScore {
  return {
    score: Math.max(0, Math.min(100, Math.round(100 + components.reduce((sum, component) => sum + component.impact, 0)))),
    components,
  };
}

export function scoreVisit(visit: Visit): ConfidenceScore {
  const components: ConfidenceComponent[] = [];
  if (!visit.coordinates) components.push({ code: "missing-coordinates", impact: -35, explanation: "The visit has no valid coordinates." });
  if (visit.interval.startUncertain || !visit.interval.start) components.push({ code: "uncertain-arrival", impact: -20, explanation: "The arrival time is missing or uncertain." });
  if (visit.interval.endUncertain || !visit.interval.end) components.push({ code: "uncertain-departure", impact: -20, explanation: "The departure time is missing or uncertain." });
  const duration = durationMilliseconds(visit.interval.start, visit.interval.end);
  if (duration !== null && duration < 2 * 60_000) components.push({ code: "very-short-visit", impact: -8, explanation: "The visit is shorter than two minutes." });
  const probability = visit.source.providerProbability;
  if (probability !== undefined && probability < 0.5) components.push({ code: "low-provider-probability", impact: -25, explanation: "Google assigned a low probability to the detected visit." });
  else if (probability !== undefined && probability >= 0.8) components.push({ code: "high-provider-probability", impact: 3, explanation: "Google assigned a high probability to the detected visit." });
  return finalize(components);
}

export function scoreJourney(journey: Journey): ConfidenceScore {
  const components: ConfidenceComponent[] = [];
  if (!journey.interval.start || journey.interval.startUncertain) components.push({ code: "uncertain-start", impact: -20, explanation: "The journey start is missing or uncertain." });
  if (!journey.interval.end || journey.interval.endUncertain) components.push({ code: "uncertain-end", impact: -20, explanation: "The journey end is missing or uncertain." });
  if (!journey.distanceMeters || journey.distanceMeters <= 0) components.push({ code: "missing-distance", impact: -12, explanation: "No usable recorded distance is available." });
  if (journey.path.length < 2) components.push({ code: "sparse-route", impact: -18, explanation: "The recorded route has fewer than two points." });
  if (journey.travelMode === "UNKNOWN") components.push({ code: "unknown-mode", impact: -15, explanation: "The travel mode is unknown." });
  const duration = durationMilliseconds(journey.interval.start, journey.interval.end);
  if (duration && journey.distanceMeters) {
    const speedKph = journey.distanceMeters / duration * 3_600;
    if (speedKph > 350) components.push({ code: "implausible-speed", impact: -45, explanation: `The implied average speed is ${Math.round(speedKph)} km/h.` });
  }
  return finalize(components);
}
