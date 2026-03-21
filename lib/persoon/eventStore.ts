import type { PersoonEvent, TrackEventInput } from "@/lib/persoon/event-types";

const PERSOON_EVENTS_STORAGE_KEY = "persoon_events";
const EMPTY_EVENTS: PersoonEvent[] = [];

let cachedEvents: PersoonEvent[] = EMPTY_EVENTS;
let hasHydratedSnapshot = false;

const listeners = new Set<() => void>();

function generateEventId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function createPersoonEvent(input: TrackEventInput): PersoonEvent {
  return {
    id: generateEventId(),
    type: input.type,
    personaId: input.personaId,
    timestamp: Date.now(),
    metadata: input.metadata,
  };
}

function emit() {
  listeners.forEach((listener) => listener());
}

function readEventsFromStorage(): PersoonEvent[] {
  if (typeof window === "undefined") {
    return EMPTY_EVENTS;
  }

  try {
    const rawEvents = window.localStorage.getItem(PERSOON_EVENTS_STORAGE_KEY);

    if (!rawEvents) {
      return EMPTY_EVENTS;
    }

    const parsedEvents = JSON.parse(rawEvents) as unknown;

    return Array.isArray(parsedEvents) ? (parsedEvents as PersoonEvent[]) : EMPTY_EVENTS;
  } catch {
    return EMPTY_EVENTS;
  }
}

function writeEventsToStorage(events: PersoonEvent[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (events.length === 0) {
      window.localStorage.removeItem(PERSOON_EVENTS_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(
      PERSOON_EVENTS_STORAGE_KEY,
      JSON.stringify(events),
    );
  } catch {
    // Ignore storage failures so tracking never interrupts the UI.
  }
}

function ensureHydratedSnapshot() {
  if (typeof window === "undefined" || hasHydratedSnapshot) {
    return;
  }

  cachedEvents = readEventsFromStorage();
  hasHydratedSnapshot = true;
}

function handleStorageChange() {
  const nextEvents = readEventsFromStorage();

  if (nextEvents === cachedEvents) {
    return;
  }

  cachedEvents = nextEvents;
  hasHydratedSnapshot = true;
  emit();
}

export function subscribeToPersoonEvents(listener: () => void) {
  listeners.add(listener);

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorageChange);
  }

  return () => {
    listeners.delete(listener);

    if (typeof window !== "undefined" && listeners.size === 0) {
      window.removeEventListener("storage", handleStorageChange);
    }
  };
}

export function getPersoonEventsSnapshot() {
  ensureHydratedSnapshot();
  return cachedEvents;
}

export function getPersoonEventsServerSnapshot() {
  return EMPTY_EVENTS;
}

export function trackPersoonEvent(input: TrackEventInput) {
  ensureHydratedSnapshot();

  const event = createPersoonEvent(input);
  cachedEvents = [event, ...cachedEvents];
  writeEventsToStorage(cachedEvents);
  emit();

  return event;
}

export function clearPersoonEvents() {
  ensureHydratedSnapshot();

  if (cachedEvents === EMPTY_EVENTS) {
    writeEventsToStorage(EMPTY_EVENTS);
    return;
  }

  cachedEvents = EMPTY_EVENTS;
  writeEventsToStorage(EMPTY_EVENTS);
  emit();
}
