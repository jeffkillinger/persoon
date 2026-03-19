import type { Feature } from "@/lib/persoon/types";

// central feature catalog used across the app for recommendations and rule outputs
export const FEATURES: Feature[] = [
  {
    id: "visual-editor",
    name: "Visual Rule Builder",
    description: "Drag-and-drop personalization rules, no code required.",
    tag: "core",
  },
  {
    id: "api-sdk",
    name: "API & SDK",
    description: "Full REST API and JS/Python SDKs for programmatic control.",
    tag: "core",
  },
  {
    id: "ab-testing",
    name: "A/B Testing",
    description: "Split traffic across content variants and measure outcomes.",
    tag: "advanced",
  },
  {
    id: "cdp-sync",
    name: "CDP Sync",
    description: "Pull traits from Segment, mParticle, or Rudderstack.",
    tag: "advanced",
  },
  {
    id: "audit-log",
    name: "Audit Logs",
    description: "Full history of rule changes with user attribution.",
    tag: "enterprise",
  },
  {
    id: "sso",
    name: "SSO / SAML",
    description: "Enterprise identity provider support.",
    tag: "enterprise",
  },
  {
    id: "analytics",
    name: "Personalization Analytics",
    description: "See which rules fire, for whom, and what converts.",
    tag: "advanced",
  },
  {
    id: "approval",
    name: "Approval Workflows",
    description: "Require sign-off before rules go live.",
    tag: "enterprise",
  },
];
