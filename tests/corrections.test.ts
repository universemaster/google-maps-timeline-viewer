import { describe, expect, it } from "vitest";
import { applyCorrections, type CorrectionCommand } from "../src/model/corrections.js";
import type { Place, SourceReference, Visit } from "../src/model/types.js";

const source: SourceReference = { importSessionId: "i", format: "takeout", sourceName: "fixture", recordPath: "0" };
const place = (id: string, name: string): Place => ({ id, name, category: null, coordinates: { latitude: 51, longitude: -3 }, boundary: null, googlePlaceId: null, semanticType: null, ignored: false, notes: "", tags: [], sourceReferences: [source] });
const visit = (id: string, placeId: string): Visit => ({ id, placeId, interval: { start: "2026-01-01T10:00:00Z", end: "2026-01-01T11:00:00Z", startUncertain: false, endUncertain: false }, coordinates: { latitude: 51, longitude: -3 }, confidence: null, source, annotationId: null });
const base = { createdAt: "2026-01-02T00:00:00Z", revision: 1 };

describe("non-destructive place corrections", () => {
  it("merges places and reassigns their visits", () => {
    const command: CorrectionCommand = { ...base, id: "merge", type: "merge-places", sourcePlaceIds: ["a", "b"], targetPlaceId: "a", name: "Combined" };
    const result = applyCorrections([place("a", "A"), place("b", "B")], [visit("one", "a"), visit("two", "b")], [command]);
    expect(result.places.find(candidate => candidate.id === "a")?.name).toBe("Combined");
    expect(result.visits.map(item => item.placeId)).toEqual(["a", "a"]);
    expect(result.aliases).toEqual({ b: "a" });
  });

  it("splits selected visits into a new place", () => {
    const command: CorrectionCommand = { ...base, id: "split", type: "split-place", sourcePlaceId: "a", newPlace: place("new", "New"), visitIds: ["two"] };
    const result = applyCorrections([place("a", "A")], [visit("one", "a"), visit("two", "a")], [command]);
    expect(result.visits.map(item => item.placeId)).toEqual(["a", "new"]);
  });

  it("undoes a correction without changing raw entities", () => {
    const rename: CorrectionCommand = { ...base, id: "rename", type: "rename-place", placeId: "a", name: "Renamed" };
    const undo: CorrectionCommand = { ...base, id: "undo", revision: 2, type: "undo", targetCommandId: "rename" };
    const original = place("a", "Original");
    expect(applyCorrections([original], [], [rename, undo]).places[0]?.name).toBe("Original");
    expect(original.name).toBe("Original");
  });
});
