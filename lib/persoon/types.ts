// core trait dimensions used to drive personalization
export type Role = "developer" | "marketer" | "executive" | "designer";
export type CompanySize = "startup" | "smb" | "enterprise";
export type TechnicalSkill = 1 | 2 | 3 | 4 | 5;
export type Budget = "low" | "medium" | "high";
export type Goal = "speed" | "scale" | "cost" | "compliance";

// structured representation of user's attributes used by rule engine
export interface PersonaTraits {
  role: Role;
  companySize: CompanySize;
  technicalSkill: TechnicalSkill;
  budget: Budget;
  primaryGoal: Goal;
}

// preset persona used for simulations in sandbox
export interface Persona {
  id: string;
  name: string;
  avatar: string;
  description: string;
  traits: PersonaTraits;
}

// feature catalog item used for recommendations in personalized output
export interface Feature {
  id: string;
  name: string;
  description: string;
  tag: "core" | "advanced" | "enterprise";
}

// fully resolved content experience after personalization is applied
export interface ContentVariation {
  heroHeadline: string;
  heroSubcopy: string;
  ctaText: string;
  ctaUrgency: "low" | "medium" | "high";
  onboardingSteps: string[];
  recommendedFeatures: Feature[];
  messagingTone: "technical" | "strategic" | "friendly" | "formal";
}

// rule engine primitives: what to check and how to compare
export type TraitKey = keyof PersonaTraits;
export type Operator = "eq" | "gte" | "lte" | "in";

// one condition within a rule (all conditions must pass)
export interface RuleCondition {
  trait: TraitKey;
  operator: Operator;
  value: PersonaTraits[TraitKey] | PersonaTraits[TraitKey][];
}

// rule defines when it applies and what content it overrides
export interface Rule {
  id: string;
  label: string;
  priority: number;
  conditions: RuleCondition[];
  output: Partial<ContentVariation>;
}

// final output of personalization engine
export interface PersonalizationResult {
  content: ContentVariation;
  matchedRules: Rule[];
  confidence: number;
}
