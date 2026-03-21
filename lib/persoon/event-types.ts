export type EventType = "page_view" | "cta_click" | "feature_exposed";

export interface PersoonEvent {
  id: string;
  type: EventType;
  personaId?: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface TrackEventInput {
  type: EventType;
  personaId?: string;
  metadata?: Record<string, unknown>;
}
