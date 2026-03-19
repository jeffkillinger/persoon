"use client";

import { useState } from "react";

import { PersonaSelector } from "@/components/PersonaSelector";
import { PreviewPanel } from "@/components/PreviewPanel";
import { TraitControls } from "@/components/TraitControls";
import { PERSONAS } from "@/lib/persoon/data/personas";
import type { Persona, PersonaTraits } from "@/lib/persoon/types";
import { usePersonalizationEngine } from "@/lib/persoon/usePersonalizationEngine";

// top-level sandbox container
// owns user state, runs personalization, and composes the UI
export function PersoonSandbox() {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(PERSONAS[0]);
  const [traits, setTraits] = useState<PersonaTraits>(PERSONAS[0].traits);

  // derive the personalized experience from the current trait state
  const result = usePersonalizationEngine(traits);

  // selecting a preset persona updates both the active persona and editable traits
  const handlePersonaSelect = (persona: Persona) => {
    setSelectedPersona(persona);
    setTraits(persona.traits);
  };

  return (
    <main className="min-h-screen px-4 py-4 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[rgba(10,11,16,0.86)] shadow-[var(--shadow-lg)] backdrop-blur">
        <header className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-lg text-accent-lime">✦</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-[family-name:var(--font-display)] text-2xl leading-none tracking-[-0.02em]">
                Persoon
              </span>
              <span className="rounded-full border border-border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-foreground-muted">
                Personalization Sandbox
              </span>
            </div>
          </div>
          <p className="text-xs leading-5 text-foreground-muted">
            Adjust traits and watch the preview update in real time.
          </p>
        </header>

        <div className="grid flex-1 lg:grid-cols-[21rem_minmax(0,1fr)]">
          <aside className="border-b border-border px-5 py-5 lg:border-r lg:border-b-0 lg:px-6 lg:py-6">
            <div className="space-y-6">
              <PersonaSelector
                personas={PERSONAS}
                selectedId={selectedPersona.id}
                onSelect={handlePersonaSelect}
              />
              <div className="h-px bg-border" />
              <TraitControls traits={traits} onChange={setTraits} />
            </div>
          </aside>

          <div className="px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
            <PreviewPanel result={result} />
          </div>
        </div>
      </div>
    </main>
  );
}
