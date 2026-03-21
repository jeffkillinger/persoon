import type { EventType, PersoonEvent } from "@/lib/persoon/event-types";
import type {
  CompanySize,
  Goal,
  Persona,
  PersonaTraits,
  Role,
  TechnicalSkill,
} from "@/lib/persoon/types";

export type AudienceTraitOperator =
  | "equals"
  | "notEquals"
  | "greaterThanOrEqual"
  | "lessThanOrEqual"
  | "includes";

export type AudienceEventOperator = "eventOccurred" | "eventOccurredAtLeast";
export type AudienceMatchMode = "all" | "any";

type AudienceTraitValueMap = {
  role: Role;
  companySize: CompanySize;
  technicalSkill: TechnicalSkill;
  budget: PersonaTraits["budget"];
  primaryGoal: Goal;
};

export type AudienceTraitField = keyof AudienceTraitValueMap;

type TraitConditionByField = {
  [Field in AudienceTraitField]: {
    kind: "trait";
    field: Field;
    operator: AudienceTraitOperator;
    value: AudienceTraitValueMap[Field] | string[];
  };
}[AudienceTraitField];

export type AudienceMetadata = Record<string, unknown>;

export interface AudienceEventCondition {
  kind: "event";
  eventType: EventType;
  operator: AudienceEventOperator;
  count?: number;
  metadata?: AudienceMetadata;
}

export type AudienceCondition = TraitConditionByField | AudienceEventCondition;

export interface Audience {
  id: string;
  name: string;
  description: string;
  match: AudienceMatchMode;
  conditions: AudienceCondition[];
}

export interface AudienceMatchResult {
  audienceId: string;
  audienceName: string;
  description: string;
  matched: boolean;
  matchedConditions: number;
  totalConditions: number;
  reasons: string[];
}

export interface EvaluateAudienceInput {
  persona: Persona;
  events: PersoonEvent[];
}
