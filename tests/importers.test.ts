import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { detectTimelineFormat } from "../src/importers/detect.js";
import { normalizeTimeline } from "../src/importers/normalize.js";

async function fixture(path: string): Promise<unknown> {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), "utf8"));
}

describe("Timeline import compatibility", () => {
  it.each([
    ["sample_data/Local_format/Android/Timeline.json", "android-on-device"],
    ["sample_data/Local_format/iOS/Timeline.json", "ios-on-device"],
    ["sample_data/Semantic Location History/2025/2025_JULY.json", "takeout"],
  ])("normalizes %s", async (path, expectedFormat) => {
    const input = await fixture(path);
    expect(detectTimelineFormat(input, path)).toBe(expectedFormat);
    const timeline = normalizeTimeline(input, { sourceName: path, importedAt: "2026-01-01T00:00:00.000Z" });
    expect(timeline.importSession.format).toBe(expectedFormat);
    expect(timeline.importSession.recordCount).toBeGreaterThan(0);
    expect(timeline.visits.length + timeline.journeys.length).toBe(timeline.importSession.recordCount);
    expect(new Set(timeline.visits.map(visit => visit.id)).size).toBe(timeline.visits.length);
  });

  it("normalizes current semantic-segment exports", () => {
    const input = {
      semanticSegments: [
        {
          startTime: "2026-07-01T09:00:00+01:00",
          endTime: "2026-07-01T10:30:00+01:00",
          visit: {
            probability: 0.8,
            topCandidate: {
              placeId: "example-place",
              semanticType: "CAFE",
              probability: 0.9,
              placeLocation: { latLng: "51.5902°, -3.3260°" },
            },
          },
        },
      ],
    };
    const timeline = normalizeTimeline(input, { importedAt: "2026-07-02T00:00:00.000Z" });
    expect(timeline.importSession.format).toBe("semantic-segments");
    expect(timeline.places).toHaveLength(1);
    expect(timeline.visits[0]).toMatchObject({ placeId: "google_example-place" });
    expect(timeline.visits[0]?.interval).toMatchObject({
      start: "2026-07-01T08:00:00.000Z",
      end: "2026-07-01T09:30:00.000Z",
    });
  });
});
