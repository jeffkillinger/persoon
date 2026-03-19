import type { Persona } from "@/lib/persoon/types";

interface PersonaSelectorProps {
  personas: Persona[];
  selectedId: string;
  onSelect: (persona: Persona) => void;
}

export function PersonaSelector({
  personas,
  selectedId,
  onSelect,
}: PersonaSelectorProps) {
  return (
    <section className="space-y-3">
      <div className="text-[0.65rem] uppercase tracking-[0.24em] text-foreground-muted">
        Persona
      </div>
      <div className="space-y-2">
        {personas.map((persona) => {
          const isActive = persona.id === selectedId;

          return (
            <button
              key={persona.id}
              type="button"
              onClick={() => onSelect(persona)}
              className={`focus-ring flex w-full items-start gap-3 rounded-[var(--radius-sm)] border px-3 py-3 text-left transition ${
                isActive
                  ? "border-lime-300/60 bg-lime-300/8 shadow-[inset_0_0_0_1px_rgba(201,244,93,0.08)]"
                  : "border-border bg-surface-2 hover:border-border-strong hover:bg-surface-3"
              }`}
              aria-pressed={isActive}
            >
              <span className="pt-0.5 text-base">{persona.avatar}</span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-foreground">
                  {persona.name}
                </span>
                <span className="mt-1 block text-xs leading-5 text-foreground-soft">
                  {persona.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
