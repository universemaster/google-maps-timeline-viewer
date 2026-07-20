import { calculateIntelligenceJob } from "../analytics/worker-jobs.js";

let cancelled = new Set<string>();

self.onmessage = async (event: MessageEvent) => {
  const message = event.data;
  if (message?.type === "cancel") { cancelled.add(message.id); return; }
  if (message?.type !== "run" || !message.id) return;
  const id = String(message.id);
  try {
    const result = await calculateIntelligenceJob(message.input, progress => self.postMessage({ type: "progress", id, ...progress }), () => cancelled.has(id));
    if (!cancelled.has(id)) self.postMessage({ type: "result", id, result });
  } catch (error) {
    if (!cancelled.has(id)) self.postMessage({ type: "error", id, message: error instanceof Error ? error.message : String(error) });
  } finally { cancelled.delete(id); }
};
