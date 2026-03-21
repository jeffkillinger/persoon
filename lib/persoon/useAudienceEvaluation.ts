"use client";

import { useMemo } from "react";

import { AUDIENCES } from "@/lib/persoon/data/audiences";
import { evaluateAudiences } from "@/lib/persoon/evaluateAudience";
import type { PersoonEvent } from "@/lib/persoon/event-types";
import type { Persona } from "@/lib/persoon/types";

export function useAudienceEvaluation(persona: Persona, events: PersoonEvent[]) {
  return useMemo(() => {
    const personaEvents = events.filter(
      (event) => !event.personaId || event.personaId === persona.id,
    );
    const allAudienceResults = evaluateAudiences(AUDIENCES, {
      persona,
      events: personaEvents,
    }).sort((left, right) => {
      if (left.matched === right.matched) {
        return left.audienceName.localeCompare(right.audienceName);
      }

      return left.matched ? -1 : 1;
    });
    const matchedAudiences = allAudienceResults.filter((result) => result.matched);

    return {
      matchedAudiences,
      allAudienceResults,
      personaEvents,
    };
  }, [events, persona]);
}
