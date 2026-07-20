# Places Tracker architecture

The viewer remains local-first. Imported Timeline files are authoritative, raw source records are never rewritten, and all derived analytics and user corrections remain in the browser unless the user explicitly exports a workspace.

## Layers

1. Import adapters recognise old Takeout, Android, iOS and semantic-segment exports.
2. Normalisation creates stable `Place`, `Visit`, `Journey`, `RawLocationPoint` and `ImportSession` entities while retaining source provenance.
3. A correction log applies non-destructive place, visit, boundary and annotation changes.
4. Pure analytics modules calculate statistics, coverage, confidence, profiles, journeys, routines and anomalies without accessing the DOM.
5. A Web Worker runs expensive calculations and reports progress and cancellation.
6. Versioned IndexedDB stores corrections and derived caches. Cache keys include the import fingerprint, schema version, algorithm version, settings and edit revision.
7. Views consume one reconciled metric model so cards, charts, tables and exports agree.

The existing `timeline.html`, `TimelineEdits.json` and `TimelinePlaceCache.json` workflows remain compatibility surfaces during migration.

## Identity and provenance

Timestamp pairs are not reliable unique identifiers. Canonical entities receive stable IDs derived from the import fingerprint and source record path. Each entity keeps a source reference containing the import, original format, file name and record path. Provider probabilities remain separate from the viewer's explainable confidence scores.

## Time and intervals

Canonical timestamps are ISO instants. Calendar-day grouping always receives an explicit IANA timezone. Multi-day visits are split only for allocation and coverage calculations; the source visit remains one entity. Overlapping intervals are unioned before computing coverage or time allocation.

## Corrections

Corrections are append-only commands with revisions and undo relationships. Merge operations create aliases, split operations create a new place and reassign selected visits, and boundary edits preview affected visits before confirmation. Legacy timestamp-matched edits are migrated to stable IDs when a source record can be resolved.

## Local data boundary

No live tracking, background collection, sharing service, subscription backend, emergency feature or continuously active native application is part of this architecture. Optional locally stored sources may enrich an analysis, but core Timeline calculations cannot depend on them.
