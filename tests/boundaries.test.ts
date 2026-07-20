import { describe, expect, it } from "vitest";
import { pointInsideBoundary, previewBoundaryChange } from "../src/analytics/boundaries.js";
import type { SourceReference, Visit } from "../src/model/types.js";

const source: SourceReference = { importSessionId: "i", format: "takeout", sourceName: "fixture", recordPath: "0" };
const visit = (id: string, latitude: number, longitude: number): Visit => ({ id, placeId: "p", interval: { start: "2026-01-01T00:00:00Z", end: "2026-01-01T01:00:00Z", startUncertain: false, endUncertain: false }, coordinates: { latitude, longitude }, confidence: null, source, annotationId: null });

describe("place boundaries", () => {
  it("supports circle and polygon inclusion", () => {
    expect(pointInsideBoundary({ latitude: 51, longitude: -3 }, { kind: "circle", centre: { latitude: 51, longitude: -3 }, radiusMeters: 50 })).toBe(true);
    expect(pointInsideBoundary({ latitude: 51.001, longitude: -3 }, { kind: "circle", centre: { latitude: 51, longitude: -3 }, radiusMeters: 50 })).toBe(false);
    expect(pointInsideBoundary({ latitude: 1, longitude: 1 }, { kind: "polygon", vertices: [{ latitude: 0, longitude: 0 }, { latitude: 0, longitude: 2 }, { latitude: 2, longitude: 2 }, { latitude: 2, longitude: 0 }] })).toBe(true);
  });

  it("previews visits entering and leaving a proposed boundary", () => {
    const visits = [visit("centre", 51, -3), visit("outer", 51.001, -3)];
    const preview = previewBoundaryChange(visits, { kind: "circle", centre: { latitude: 51, longitude: -3 }, radiusMeters: 50 }, { kind: "circle", centre: { latitude: 51, longitude: -3 }, radiusMeters: 150 });
    expect(preview.enteringVisitIds).toEqual(["outer"]);
    expect(preview.leavingVisitIds).toEqual([]);
  });
});
