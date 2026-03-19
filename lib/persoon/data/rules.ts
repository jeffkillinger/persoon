import type { ContentVariation, Rule } from "@/lib/persoon/types";
import { getFeatures } from "@/lib/persoon/utils";

// baseline experience before any personalization rules are applied
export const DEFAULT_CONTENT: ContentVariation = {
  heroHeadline: "Personalization that works at the speed of your audience.",
  heroSubcopy:
    "Persoon lets you define who sees what — without engineering overhead.",
  ctaText: "Get started free",
  ctaUrgency: "low",
  onboardingSteps: [
    "Connect your data source",
    "Define a persona",
    "Write your first rule",
    "Preview the result",
  ],
  recommendedFeatures: getFeatures("visual-editor", "api-sdk"),
  messagingTone: "friendly",
};

// declarative rule set: each rule defines when it applies and what it overrides
// priority controls merge order (higher priority rules applied later take precendence)
export const RULES: Rule[] = [
  {
    id: "rule-developer",
    label: "Developer path",
    priority: 10,
    conditions: [{ trait: "role", operator: "eq", value: "developer" }],
    output: {
      heroHeadline: "Ship personalization as fast as you ship code.",
      heroSubcopy:
        "A clean API, flexible SDKs, and zero opinion about your stack.",
      ctaText: "Read the docs",
      messagingTone: "technical",
      recommendedFeatures: getFeatures("api-sdk", "cdp-sync", "analytics"),
      onboardingSteps: [
        "npm install @persoon/sdk",
        "Initialize with your API key",
        "Call evaluate(userId, traits)",
        "Render your variant",
      ],
    },
  },
  {
    id: "rule-enterprise",
    label: "Enterprise scale",
    priority: 20,
    conditions: [
      { trait: "companySize", operator: "eq", value: "enterprise" },
    ],
    output: {
      heroHeadline:
        "Personalization governance for teams that can't afford mistakes.",
      heroSubcopy:
        "Approval workflows, audit trails, and SSO — built in, not bolted on.",
      ctaText: "Talk to sales",
      ctaUrgency: "high",
      messagingTone: "formal",
      recommendedFeatures: getFeatures(
        "audit-log",
        "sso",
        "approval",
        "ab-testing",
      ),
    },
  },
  {
    id: "rule-executive",
    label: "Executive / ROI lens",
    priority: 15,
    conditions: [{ trait: "role", operator: "eq", value: "executive" }],
    output: {
      heroHeadline: "Every visitor gets the message most likely to convert.",
      heroSubcopy:
        "Persoon increases pipeline efficiency without adding headcount.",
      ctaText: "See the ROI calculator",
      ctaUrgency: "medium",
      messagingTone: "strategic",
      recommendedFeatures: getFeatures(
        "analytics",
        "ab-testing",
        "visual-editor",
      ),
      onboardingSteps: [
        "Define your highest-value segments",
        "Set a success metric",
        "Launch your first campaign",
        "Review performance dashboard",
      ],
    },
  },
  {
    id: "rule-high-skill",
    label: "High technical skill",
    priority: 5,
    conditions: [{ trait: "technicalSkill", operator: "gte", value: 4 }],
    output: {
      recommendedFeatures: getFeatures("api-sdk", "cdp-sync", "analytics"),
    },
  },
  {
    id: "rule-low-skill",
    label: "Low technical skill",
    priority: 5,
    conditions: [{ trait: "technicalSkill", operator: "lte", value: 2 }],
    output: {
      heroSubcopy:
        "Set up in minutes with our no-code visual editor. No developer required.",
      recommendedFeatures: getFeatures(
        "visual-editor",
        "analytics",
        "ab-testing",
      ),
      onboardingSteps: [
        "Connect your website",
        "Pick a segment to personalize",
        "Use the visual editor to customize content",
        "Go live in one click",
      ],
    },
  },
  {
    id: "rule-cost-goal",
    label: "Cost-focused",
    priority: 8,
    conditions: [{ trait: "primaryGoal", operator: "eq", value: "cost" }],
    output: {
      heroSubcopy:
        "Cut wasted impressions. Every view goes to the right segment.",
      ctaText: "Start free — no credit card",
      ctaUrgency: "medium",
    },
  },
  {
    id: "rule-compliance",
    label: "Compliance-focused",
    priority: 8,
    conditions: [
      { trait: "primaryGoal", operator: "eq", value: "compliance" },
    ],
    output: {
      heroHeadline:
        "Personalization that your legal team will actually approve.",
      heroSubcopy:
        "GDPR-ready, SOC 2 compliant, full audit trails on every rule change.",
      ctaText: "Review our security docs",
      messagingTone: "formal",
      recommendedFeatures: getFeatures("audit-log", "sso", "approval"),
    },
  },
];
