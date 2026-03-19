import { FEATURES } from "@/lib/persoon/data/features";
import type { PersonaTraits, RuleCondition } from "@/lib/persoon/types";

export const getFeatures = (...ids: string[]) =>
  FEATURES.filter((feature) => ids.includes(feature.id));

export function evaluateCondition(
  condition: RuleCondition,
  traits: PersonaTraits,
): boolean {
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

export function formatLabel(value: string) {
  return value.replace("-", " ");
}
