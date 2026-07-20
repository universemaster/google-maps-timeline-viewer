export type EntityId = string;
export type IsoTimestamp = string;

export type TimelineSourceFormat =
  | "takeout"
  | "android-on-device"
  | "ios-on-device"
  | "semantic-segments"
  | "unknown";

export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
  altitudeMeters?: number;
}

export interface SourceReference {
  importSessionId: EntityId;
  format: TimelineSourceFormat;
  sourceName: string;
  recordPath: string;
  sourceRecordId?: string;
  providerProbability?: number;
}

export interface TimeInterval {
  start: IsoTimestamp | null;
  end: IsoTimestamp | null;
  startUncertain: boolean;
  endUncertain: boolean;
}

export interface ImportSession {
  id: EntityId;
  importedAt: IsoTimestamp;
  sourceName: string;
  format: TimelineSourceFormat;
  fingerprint: string;
  firstEventAt: IsoTimestamp | null;
  lastEventAt: IsoTimestamp | null;
  recordCount: number;
}

export type Boundary =
  | { kind: "circle"; centre: Coordinates; radiusMeters: number }
  | { kind: "polygon"; vertices: Coordinates[] };

export interface Place {
  id: EntityId;
  name: string;
  category: string | null;
  coordinates: Coordinates | null;
  boundary: Boundary | null;
  googlePlaceId: string | null;
  semanticType: string | null;
  ignored: boolean;
  notes: string;
  tags: EntityId[];
  sourceReferences: SourceReference[];
}

export interface RawLocationPoint {
  id: EntityId;
  at: IsoTimestamp;
  coordinates: Coordinates;
  source: SourceReference;
}

export interface ConfidenceComponent {
  code: string;
  impact: number;
  explanation: string;
}

export interface ConfidenceScore {
  score: number;
  components: ConfidenceComponent[];
}

export interface Visit {
  id: EntityId;
  placeId: EntityId;
  interval: TimeInterval;
  coordinates: Coordinates | null;
  confidence: ConfidenceScore | null;
  source: SourceReference;
  annotationId: EntityId | null;
}

export interface JourneyPathPoint {
  at: IsoTimestamp | null;
  coordinates: Coordinates;
}

export interface Journey {
  id: EntityId;
  startPlaceId: EntityId | null;
  endPlaceId: EntityId | null;
  interval: TimeInterval;
  travelMode: string;
  distanceMeters: number | null;
  path: JourneyPathPoint[];
  confidence: ConfidenceScore | null;
  source: SourceReference;
  annotationId: EntityId | null;
}

export interface VisitAnnotation {
  id: EntityId;
  visitId: EntityId;
  purpose: string | null;
  activity: string | null;
  satisfaction: number | null;
  noise: number | null;
  crowding: number | null;
  airQuality: number | null;
  spending: number | null;
  foodAndDrink: string[];
  people: string[];
  note: string;
  tags: EntityId[];
  wouldReturn: boolean | null;
  planned: boolean | null;
  detectedPlaceCorrect: boolean | null;
}

export interface AnnotationRule {
  id: EntityId;
  name: string;
  enabled: boolean;
  placeId: EntityId | null;
  minimumDurationMs: number | null;
  maximumDurationMs: number | null;
  set: Partial<Omit<VisitAnnotation, "id" | "visitId">>;
}

export interface CanonicalTimeline {
  schemaVersion: number;
  importSession: ImportSession;
  places: Place[];
  visits: Visit[];
  journeys: Journey[];
  rawLocationPoints: RawLocationPoint[];
  annotations: VisitAnnotation[];
  warnings: NormalizationWarning[];
}

export interface NormalizationWarning {
  code: string;
  message: string;
  recordPath: string;
}
