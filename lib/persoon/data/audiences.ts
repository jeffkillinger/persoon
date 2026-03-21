import type { Audience } from "@/lib/persoon/audience-types";

export const AUDIENCES: Audience[] = [
  {
    id: "high-technical-skill",
    name: "High Technical Skill Users",
    description:
      "Users with strong implementation fluency who are likely to prefer APIs and deeper platform control.",
    match: "all",
    conditions: [
      {
        kind: "trait",
        field: "technicalSkill",
        operator: "greaterThanOrEqual",
        value: 4,
      },
    ],
  },
  {
    id: "enterprise-buyers",
    name: "Enterprise Buyers",
    description:
      "Large-company users who signal enterprise purchasing context and higher-value sales motion.",
    match: "all",
    conditions: [
      {
        kind: "trait",
        field: "companySize",
        operator: "equals",
        value: "enterprise",
      },
    ],
  },
  {
    id: "returning-visitors",
    name: "Returning Visitors",
    description:
      "Users who have come back enough times to justify continuity-oriented messaging and progressive targeting.",
    match: "all",
    conditions: [
      {
        kind: "event",
        eventType: "page_view",
        operator: "eventOccurredAtLeast",
        count: 2,
      },
    ],
  },
  {
    id: "engaged-users",
    name: "Engaged Users",
    description:
      "Users who have taken a direct engagement action, indicating interest beyond passive browsing.",
    match: "all",
    conditions: [
      {
        kind: "event",
        eventType: "cta_click",
        operator: "eventOccurredAtLeast",
        count: 1,
      },
    ],
  },
  {
    id: "executive-scale-seekers",
    name: "Executive Scale Seekers",
    description:
      "Strategic buyers focused on growth and rollout breadth rather than hands-on implementation details.",
    match: "all",
    conditions: [
      {
        kind: "trait",
        field: "role",
        operator: "equals",
        value: "executive",
      },
      {
        kind: "trait",
        field: "primaryGoal",
        operator: "equals",
        value: "scale",
      },
    ],
  },
  {
    id: "compliance-focused-enterprise",
    name: "Compliance-Focused Enterprise",
    description:
      "Enterprise prospects where governance, security, and approval requirements should shape downstream targeting.",
    match: "all",
    conditions: [
      {
        kind: "trait",
        field: "companySize",
        operator: "equals",
        value: "enterprise",
      },
      {
        kind: "trait",
        field: "primaryGoal",
        operator: "equals",
        value: "compliance",
      },
    ],
  },
  {
    id: "feature-aware-users",
    name: "Feature-Aware Users",
    description:
      "Users who have already been exposed to the enterprise security story and can be targeted with follow-up proof points.",
    match: "all",
    conditions: [
      {
        kind: "event",
        eventType: "feature_exposed",
        operator: "eventOccurred",
        metadata: {
          featureId: "sso",
        },
      },
    ],
  },
  {
    id: "high-intent-executives",
    name: "High-Intent Executives",
    description:
      "Senior buyers combining executive context with active engagement, useful for sales-led follow-up and experiment targeting.",
    match: "all",
    conditions: [
      {
        kind: "trait",
        field: "role",
        operator: "equals",
        value: "executive",
      },
      {
        kind: "event",
        eventType: "cta_click",
        operator: "eventOccurredAtLeast",
        count: 1,
      },
    ],
  },
  {
    id: "enterprise-scale-operators",
    name: "Enterprise Scale Operators",
    description:
      "Users operating in enterprise environments with a scale goal, a common reusable audience for experimentation and messaging.",
    match: "all",
    conditions: [
      {
        kind: "trait",
        field: "companySize",
        operator: "equals",
        value: "enterprise",
      },
      {
        kind: "trait",
        field: "primaryGoal",
        operator: "equals",
        value: "scale",
      },
    ],
  },
];
