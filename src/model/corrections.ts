import type { Boundary, Coordinates, EntityId, Place, Visit } from "./types.js";

interface CorrectionBase {
  id: EntityId;
  createdAt: string;
  revision: number;
}

export type CorrectionCommand =
  | (CorrectionBase & { type: "rename-place"; placeId: EntityId; name: string })
  | (CorrectionBase & { type: "categorise-place"; placeId: EntityId; category: string | null })
  | (CorrectionBase & { type: "move-place"; placeId: EntityId; coordinates: Coordinates })
  | (CorrectionBase & { type: "change-boundary"; placeId: EntityId; boundary: Boundary | null })
  | (CorrectionBase & { type: "merge-places"; sourcePlaceIds: EntityId[]; targetPlaceId: EntityId; name: string })
  | (CorrectionBase & { type: "split-place"; sourcePlaceId: EntityId; newPlace: Place; visitIds: EntityId[] })
  | (CorrectionBase & { type: "reassign-visit"; visitId: EntityId; placeId: EntityId })
  | (CorrectionBase & { type: "ignore-place"; placeId: EntityId; ignored: boolean })
  | (CorrectionBase & { type: "update-place-notes"; placeId: EntityId; notes: string; tags: EntityId[] })
  | (CorrectionBase & { type: "undo"; targetCommandId: EntityId });

export interface CorrectedTimelineEntities {
  places: Place[];
  visits: Visit[];
  aliases: Record<EntityId, EntityId>;
}

function clonePlace(place: Place): Place {
  return { ...place, coordinates: place.coordinates ? { ...place.coordinates } : null, tags: [...place.tags], sourceReferences: [...place.sourceReferences] };
}

export function applyCorrections(
  sourcePlaces: readonly Place[],
  sourceVisits: readonly Visit[],
  commands: readonly CorrectionCommand[],
): CorrectedTimelineEntities {
  const undone = new Set(commands.filter((command): command is Extract<CorrectionCommand, { type: "undo" }> => command.type === "undo").map(command => command.targetCommandId));
  const active = commands.filter(command => command.type !== "undo" && !undone.has(command.id)).sort((left, right) => left.revision - right.revision || left.createdAt.localeCompare(right.createdAt));
  const places = new Map(sourcePlaces.map(place => [place.id, clonePlace(place)]));
  const visits = new Map(sourceVisits.map(visit => [visit.id, { ...visit }]));
  const aliases: Record<EntityId, EntityId> = {};
  const resolveAlias = (placeId: EntityId): EntityId => {
    let resolved = placeId;
    const seen = new Set<string>();
    while (aliases[resolved] && !seen.has(resolved)) {
      seen.add(resolved);
      resolved = aliases[resolved]!;
    }
    return resolved;
  };
  active.forEach(command => {
    if (command.type === "rename-place") {
      const place = places.get(resolveAlias(command.placeId));
      if (place) place.name = command.name;
    } else if (command.type === "categorise-place") {
      const place = places.get(resolveAlias(command.placeId));
      if (place) place.category = command.category;
    } else if (command.type === "move-place") {
      const place = places.get(resolveAlias(command.placeId));
      if (place) place.coordinates = { ...command.coordinates };
    } else if (command.type === "change-boundary") {
      const place = places.get(resolveAlias(command.placeId));
      if (place) place.boundary = command.boundary;
    } else if (command.type === "ignore-place") {
      const place = places.get(resolveAlias(command.placeId));
      if (place) place.ignored = command.ignored;
    } else if (command.type === "update-place-notes") {
      const place = places.get(resolveAlias(command.placeId));
      if (place) { place.notes = command.notes; place.tags = [...command.tags]; }
    } else if (command.type === "reassign-visit") {
      const visit = visits.get(command.visitId);
      if (visit && places.has(resolveAlias(command.placeId))) visit.placeId = resolveAlias(command.placeId);
    } else if (command.type === "merge-places") {
      const targetId = resolveAlias(command.targetPlaceId);
      const target = places.get(targetId) ?? places.get(resolveAlias(command.sourcePlaceIds[0] ?? ""));
      if (!target) return;
      if (!places.has(targetId)) places.set(targetId, { ...clonePlace(target), id: targetId });
      const mergedTarget = places.get(targetId)!;
      mergedTarget.name = command.name;
      command.sourcePlaceIds.forEach(sourceId => {
        const resolvedSource = resolveAlias(sourceId);
        if (resolvedSource === targetId) return;
        aliases[resolvedSource] = targetId;
        const source = places.get(resolvedSource);
        if (source) source.ignored = true;
        visits.forEach(visit => { if (resolveAlias(visit.placeId) === targetId || visit.placeId === resolvedSource) visit.placeId = targetId; });
      });
    } else if (command.type === "split-place") {
      places.set(command.newPlace.id, clonePlace(command.newPlace));
      const selected = new Set(command.visitIds);
      visits.forEach(visit => { if (selected.has(visit.id) && resolveAlias(visit.placeId) === resolveAlias(command.sourcePlaceId)) visit.placeId = command.newPlace.id; });
    }
  });
  visits.forEach(visit => { visit.placeId = resolveAlias(visit.placeId); });
  return { places: [...places.values()], visits: [...visits.values()], aliases };
}
