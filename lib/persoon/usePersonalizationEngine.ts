"use client";

import { useMemo } from "react";

import { DEFAULT_CONTENT, RULES } from "@/lib/persoon/data/rules";
import type {
  ContentVariation,
  PersonalizationResult,
  PersonaTraits,
} from "@/lib/persoon/types";
import { evaluateCondition } from "@/lib/persoon/utils";

// core personalization hook
// derives content, matched rules, and confidence from user traits
export function usePersonalizationEngine(
  traits: PersonaTraits,
): PersonalizationResult {
  
  // only recompute when traits change
  return useMemo(() => {

    // find all rules whose conditions fully match current traits 
    const matchedRules = [...RULES]
      .sort((left, right) => left.priority - right.priority)
      .filter((rule) =>
        rule.conditions.every((condition) => evaluateCondition(condition, traits)),
      );

    //merge rule outputs onto the default content
    const content = matchedRules.reduce<ContentVariation>(
      (accumulator, rule) => ({ ...accumulator, ...rule.output }),
      { ...DEFAULT_CONTENT },
    );

    //track how many unique traits are covered by matched rules
    const coveredTraits = new Set(
      matchedRules.flatMap((rule) =>
        rule.conditions.map((condition) => condition.trait),
      ),
    );

    // return the personalized content, the rules that influenced it, and a confidence score showing tailoring
    return {
      content,
      matchedRules,
      confidence: coveredTraits.size / Object.keys(traits).length,
    };
  }, [traits]);
}
