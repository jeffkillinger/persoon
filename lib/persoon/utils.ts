import { FEATURES } from "@/lib/persoon/data/features";
import type { PersonaTraits, RuleCondition } from "@/lib/persoon/types";

// selects features from central catalog by ID
// keeps feature definitions DRY and rules declarative
export const getFeatures = (...ids: string[]) =>
  FEATURES.filter((feature) => ids.includes(feature.id));

export function evaluateCondition(
  condition: RuleCondition,
  traits: PersonaTraits,
): boolean {
  // pull the actual value from the user's current traits
  const actual = traits[condition.trait];

  switch (condition.operator) {
    case "eq":
      return actual === condition.value;
    case "gte":
      return typeof actual === "number" && actual >= Number(condition.value);
    case "lte":
      return typeof actual === "number" && actual <= Number(condition.value);
    case "in":
      return Array.isArray(condition.value) && condition.value.includes(actual);
    default:
      return false;
  }
}

// small presentation helper. keeps UI formatting concerns out of components
export function formatLabel(value: string) {
  return value.replace("-", " ");
}
