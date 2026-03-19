export type Role = "developer" | "marketer" | "executive" | "designer";
export type CompanySize = "startup" | "smb" | "enterprise";
export type TechnicalSkill = 1 | 2 | 3 | 4 | 5;
export type Budget = "low" | "medium" | "high";
export type Goal = "speed" | "scale" | "cost" | "compliance";

export interface PersonaTraits {
  role: Role;
  companySize: CompanySize;
  technicalSkill: TechnicalSkill;
  budget: Budget;
  primaryGoal: Goal;
}

export interface Persona {
  id: string;
  name: string;
  avatar: string;
  description: string;
  traits: PersonaTraits;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  tag: "core" | "advanced" | "enterprise";
}

export interface ContentVariation {
  heroHeadline: string;
  heroSubcopy: string;
  ctaText: string;
  ctaUrgency: "low" | "medium" | "high";
  onboardingSteps: string[];
  recommendedFeatures: Feature[];
  messagingTone: "technical" | "strategic" | "friendly" | "formal";
}

export type TraitKey = keyof PersonaTraits;
export type Operator = "eq" | "gte" | "lte" | "in";

export interface RuleCondition {
  trait: TraitKey;
  operator: Operator;
  value: PersonaTraits[TraitKey] | PersonaTraits[TraitKey][];
}

export interface Rule {
  id: string;
  label: string;
  priority: number;
  conditions: RuleCondition[];
  output: Partial<ContentVariation>;
}

export interface PersonalizationResult {
  content: ContentVariation;
  matchedRules: Rule[];
  confidence: number;
}
