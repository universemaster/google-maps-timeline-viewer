import { describe, expect, it } from "vitest";
import { applyAnnotationRules, copyAnnotationToVisits, mergeAnnotations } from "../src/analytics/annotations.js";
import type { AnnotationRule, SourceReference, Visit, VisitAnnotation } from "../src/model/types.js";

const source: SourceReference = { importSessionId: "i", format: "takeout", sourceName: "fixture", recordPath: "0" };
const visit: Visit = { id: "visit", placeId: "library", interval: { start: "2026-01-01T10:00:00Z", end: "2026-01-01T11:00:00Z", startUncertain: false, endUncertain: false }, coordinates: null, confidence: null, source, annotationId: null };
const rule: AnnotationRule = { id: "rule", name: "Long library visits", enabled: true, placeId: "library", minimumDurationMs: 30 * 60_000, maximumDurationMs: null, set: { purpose: "Study", tags: ["focused"] } };

describe("visit annotations", () => {
  it("applies deterministic place and duration rules", () => {
    expect(applyAnnotationRules([visit], [rule])[0]).toMatchObject({ visitId: "visit", purpose: "Study", tags: ["focused"] });
    expect(applyAnnotationRules([{ ...visit, interval: { ...visit.interval, end: "2026-01-01T10:10:00Z" } }], [rule])).toEqual([]);
  });

  it("lets manual annotations override generated values", () => {
    const generated = applyAnnotationRules([visit], [rule]);
    const manual: VisitAnnotation = { ...generated[0]!, purpose: "Appointment", note: "Manual" };
    expect(mergeAnnotations(generated, [manual])[0]).toMatchObject({ purpose: "Appointment", note: "Manual", tags: ["focused"] });
  });

  it("copies arrays without sharing mutable references", () => {
    const annotation = applyAnnotationRules([visit], [rule])[0]!;
    const copies = copyAnnotationToVisits(annotation, ["one", "two"]);
    copies[0]!.tags.push("changed");
    expect(copies[1]!.tags).toEqual(["focused"]);
  });
});
