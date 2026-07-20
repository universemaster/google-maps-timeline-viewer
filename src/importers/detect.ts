import type { TimelineSourceFormat } from "../model/types.js";

export function detectTimelineFormat(input: unknown, sourceName = ""): TimelineSourceFormat {
  if (Array.isArray(input)) return "ios-on-device";
  if (!input || typeof input !== "object") return "unknown";
  const object = input as Record<string, unknown>;
  if (Array.isArray(object.semanticSegments)) return "semantic-segments";
  if (Array.isArray(object.timelineObjects)) {
    const first = object.timelineObjects[0];
    if (first && typeof first === "object" && ("visit" in first || "activity" in first)) return "ios-on-device";
    return /(^|[/\\])android([/\\]|$)/i.test(sourceName) ? "android-on-device" : "takeout";
  }
  return "unknown";
}
