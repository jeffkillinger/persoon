import type {
  Audience,
  AudienceCondition,
  AudienceEventCondition,
  AudienceMatchResult,
  AudienceMetadata,
  EvaluateAudienceInput,
} from "@/lib/persoon/audience-types";
import type { PersoonEvent } from "@/lib/persoon/event-types";
import type { PersonaTraits } from "@/lib/persoon/types";
import { formatLabel } from "@/lib/persoon/utils";

interface ConditionEvaluation {
  matched: boolean;
  reason: string;
}

function formatValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "string") {
    return formatLabel(value);
  }

  return String(value);
}

function formatMetadata(metadata?: AudienceMetadata) {
  if (!metadata) {
    return "";
  }

  const summary = Object.entries(metadata)
    .map(([key, value]) => `${key}=${formatValue(value)}`)
    .join(", ");

  return summary ? ` with ${summary}` : "";
}

function isShallowEqual(left: unknown, right: unknown) {
  if (Array.isArray(left) && Array.isArray(right)) {
    if (left.length !== right.length) {
      return false;
    }

    return left.every((value, index) => value === right[index]);
  }

  return left === right;
}

function matchesMetadata(
  eventMetadata: PersoonEvent["metadata"],
  requiredMetadata?: AudienceMetadata,
) {
  if (!requiredMetadata) {
    return true;
  }

  return Object.entries(requiredMetadata).every(([key, value]) =>
    isShallowEqual(eventMetadata?.[key], value),
  );
}

function countMatchingEvents(
  events: PersoonEvent[],
  condition: AudienceEventCondition,
) {
  return events.filter(
    (event) =>
      event.type === condition.eventType &&
      matchesMetadata(event.metadata, condition.metadata),
  ).length;
}

function evaluateTraitCondition(
  condition: Extract<AudienceCondition, { kind: "trait" }>,
  traits: PersonaTraits,
): ConditionEvaluation {
  const actual = traits[condition.field];
  const fieldLabel = formatLabel(condition.field);
  const expected = formatValue(condition.value);
  const actualValue = formatValue(actual);

  switch (condition.operator) {
    case "equals":
      return {
        matched: actual === condition.value,
        reason:
          actual === condition.value
            ? `${fieldLabel} equals ${expected}`
            : `${fieldLabel} is ${actualValue}, expected ${expected}`,
      };
    case "notEquals":
      return {
        matched: actual !== condition.value,
        reason:
          actual !== condition.value
            ? `${fieldLabel} is not ${expected}`
            : `${fieldLabel} still equals ${expected}`,
      };
    case "greaterThanOrEqual":
      return {
        matched: typeof actual === "number" && actual >= Number(condition.value),
        reason:
          typeof actual === "number" && actual >= Number(condition.value)
            ? `${fieldLabel} is ${actualValue} and meets >= ${expected}`
            : `${fieldLabel} is ${actualValue}, below ${expected}`,
      };
    case "lessThanOrEqual":
      return {
        matched: typeof actual === "number" && actual <= Number(condition.value),
        reason:
          typeof actual === "number" && actual <= Number(condition.value)
            ? `${fieldLabel} is ${actualValue} and meets <= ${expected}`
            : `${fieldLabel} is ${actualValue}, above ${expected}`,
      };
    case "includes": {
      const matched =
        (Array.isArray(actual) && actual.includes(condition.value)) ||
        (typeof actual === "string" &&
          (Array.isArray(condition.value)
            ? condition.value.includes(actual)
            : actual.includes(String(condition.value))));

      return {
        matched,
        reason: matched
          ? `${fieldLabel} includes ${expected}`
          : `${fieldLabel} does not include ${expected}`,
      };
    }
    default:
      return {
        matched: false,
        reason: `Unsupported trait operator on ${fieldLabel}`,
      };
  }
}

function evaluateEventCondition(
  condition: AudienceEventCondition,
  events: PersoonEvent[],
): ConditionEvaluation {
  const matchingEventCount = countMatchingEvents(events, condition);
  const metadataSummary = formatMetadata(condition.metadata);

  switch (condition.operator) {
    case "eventOccurred":
      return {
        matched: matchingEventCount >= 1,
        reason:
          matchingEventCount >= 1
            ? `${condition.eventType} occurred${metadataSummary}`
            : `No ${condition.eventType} events${metadataSummary}`,
      };
    case "eventOccurredAtLeast": {
      const requiredCount = condition.count ?? 1;
      const reasonSuffix = metadataSummary ? metadataSummary : "";

      return {
        matched: matchingEventCount >= requiredCount,
        reason:
          matchingEventCount >= requiredCount
            ? `${condition.eventType} occurred ${matchingEventCount} times${reasonSuffix}`
            : `${condition.eventType} occurred ${matchingEventCount}/${requiredCount} times${reasonSuffix}`,
      };
    }
    default:
      return {
        matched: false,
        reason: `Unsupported event operator on ${condition.eventType}`,
      };
  }
}

export function evaluateAudience(
  audience: Audience,
  input: EvaluateAudienceInput,
): AudienceMatchResult {
  const conditionEvaluations = audience.conditions.map((condition) =>
    condition.kind === "trait"
      ? evaluateTraitCondition(condition, input.persona.traits)
      : evaluateEventCondition(condition, input.events),
  );
  const matchedConditions = conditionEvaluations.filter(
    (condition) => condition.matched,
  ).length;
  const matched =
    audience.match === "all"
      ? matchedConditions === audience.conditions.length
      : matchedConditions > 0;

  return {
    audienceId: audience.id,
    audienceName: audience.name,
    description: audience.description,
    matched,
    matchedConditions,
    totalConditions: audience.conditions.length,
    reasons: conditionEvaluations.map((condition) => condition.reason),
  };
}

export function evaluateAudiences(
  audiences: Audience[],
  input: EvaluateAudienceInput,
) {
  return audiences.map((audience) => evaluateAudience(audience, input));
}
