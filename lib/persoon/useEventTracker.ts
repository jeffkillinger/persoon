"use client";

import {
  clearPersoonEvents,
  getPersoonEventsServerSnapshot,
  getPersoonEventsSnapshot,
  subscribeToPersoonEvents,
  trackPersoonEvent,
} from "@/lib/persoon/eventStore";
import { useSyncExternalStore } from "react";

export function useEventTracker() {
  const events = useSyncExternalStore(
    subscribeToPersoonEvents,
    getPersoonEventsSnapshot,
    getPersoonEventsServerSnapshot,
  );

  return {
    trackEvent: trackPersoonEvent,
    events,
    clearEvents: clearPersoonEvents,
  };
}
