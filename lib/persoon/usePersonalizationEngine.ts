"use client";

import { useMemo } from "react";

import { DEFAULT_CONTENT, RULES } from "@/lib/persoon/data/rules";
import type {
  ContentVariation,
  PersonalizationResult,
  PersonaTraits,
} from "@/lib/persoon/types";
import { evaluateCondition } from "@/lib/persoon/utils";

export function usePersonalizationEngine(
  traits: PersonaTraits,
): PersonalizationResult {
  return useMemo(() => {
    const matchedRules = [...RULES]
      .sort((left, right) => left.priority - right.priority)
      .filter((rule) =>
        rule.conditions.every((condition) => evaluateCondition(condition, traits)),
      );

    const content = matchedRules.reduce<ContentVariation>(
      (accumulator, rule) => ({ ...accumulator, ...rule.output }),
      { ...DEFAULT_CONTENT },
    );

    const coveredTraits = new Set(
      matchedRules.flatMap((rule) =>
        rule.conditions.map((condition) => condition.trait),
      ),
    );

    return {
      content,
      matchedRules,
      confidence: coveredTraits.size / Object.keys(traits).length,
    };
  }, [traits]);
}
