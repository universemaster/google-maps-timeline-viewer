import type { CanonicalTimeline } from "../model/types.js";
import { detectAllAnomalies } from "./anomalies.js";
import { buildDataQualityDashboard } from "./data-quality.js";
import { buildRoutineAnalysis } from "./routines.js";

export interface IntelligenceWorkerInput { timeline: CanonicalTimeline; timeZone: string }
export interface IntelligenceWorkerResult {
  routine: ReturnType<typeof buildRoutineAnalysis>;
  anomalies: ReturnType<typeof detectAllAnomalies>;
  dataQuality: ReturnType<typeof buildDataQualityDashboard>;
}
export interface WorkerProgress { progress: number; stage: string }

export async function calculateIntelligenceJob(input: IntelligenceWorkerInput, report: (progress: WorkerProgress) => void = () => {}, isCancelled: () => boolean = () => false): Promise<IntelligenceWorkerResult> {
  report({ progress: 0.05, stage: "Preparing daily observations" });
  if (isCancelled()) throw new DOMException("Analysis cancelled", "AbortError");
  await Promise.resolve();
  const routine = buildRoutineAnalysis(input.timeZone, input.timeline.places, input.timeline.visits, input.timeline.journeys);
  report({ progress: 0.5, stage: "Finding unusual days and events" });
  if (isCancelled()) throw new DOMException("Analysis cancelled", "AbortError");
  await Promise.resolve();
  const anomalies = detectAllAnomalies(input.timeZone, routine, input.timeline.places, input.timeline.visits, input.timeline.journeys);
  report({ progress: 0.78, stage: "Scoring data quality" });
  if (isCancelled()) throw new DOMException("Analysis cancelled", "AbortError");
  await Promise.resolve();
  const dataQuality = buildDataQualityDashboard(input.timeline.places, input.timeline.visits, input.timeline.journeys, input.timeZone);
  report({ progress: 1, stage: "Analysis ready" });
  return { routine, anomalies, dataQuality };
}
