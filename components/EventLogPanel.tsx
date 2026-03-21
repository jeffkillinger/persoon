"use client";

import type { PersoonEvent } from "@/lib/persoon/event-types";
import {
  formatEventTimestamp,
  summarizeMetadata,
} from "@/lib/persoon/event-utils";

interface EventLogPanelProps {
  events: PersoonEvent[];
  onClear: () => void;
}

export function EventLogPanel({ events, onClear }: EventLogPanelProps) {
  return (
    <section className="mt-8 rounded-[var(--radius-lg)] border border-border bg-surface px-5 py-5 shadow-[var(--shadow-lg)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-[0.65rem] uppercase tracking-[0.24em] text-foreground-muted">
            Event Log
          </div>
          <p className="mt-1 text-xs leading-5 text-foreground-soft">
            Local, client-side events for tracking exposures, clicks, and page
            views.
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="focus-ring rounded-[0.8rem] border border-border bg-surface-2 px-3 py-2 text-xs text-foreground-soft transition hover:border-border-strong hover:bg-surface-3 hover:text-foreground"
        >
          Clear events
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {events.length === 0 ? (
          <div className="rounded-[var(--radius-sm)] border border-dashed border-border bg-surface-2 px-4 py-4 text-xs text-foreground-muted">
            No events tracked yet.
          </div>
        ) : (
          events.map((event) => (
            <article
              key={event.id}
              className="rounded-[var(--radius-sm)] border border-border bg-surface-2 px-4 py-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {event.type}
                  </div>
                  <div className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-foreground-muted">
                    {formatEventTimestamp(event.timestamp)}
                  </div>
                </div>
                <div className="text-xs text-foreground-soft sm:text-right">
                  Persona: {event.personaId ?? "n/a"}
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-foreground-muted">
                {summarizeMetadata(event.metadata)}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
