import type {
  Budget,
  CompanySize,
  ContentVariation,
  Feature,
  Goal,
  Role,
} from "@/lib/persoon/types";

// centralized option sets used to drive UI controls
export const ROLE_OPTIONS: Role[] = [
  "developer",
  "marketer",
  "executive",
  "designer",
];

export const COMPANY_SIZE_OPTIONS: CompanySize[] = [
  "startup",
  "smb",
  "enterprise",
];

export const BUDGET_OPTIONS: Budget[] = ["low", "medium", "high"];

export const GOAL_OPTIONS: Goal[] = ["speed", "scale", "cost", "compliance"];

// maps semantic feature tiers to consistent UI badge styles
export const FEATURE_TAG_STYLES: Record<Feature["tag"], string> = {
  core: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  advanced: "border-lime-300/20 bg-lime-300/10 text-lime-200",
  enterprise: "border-violet-300/20 bg-violet-300/10 text-violet-200",
};

// maps CTA urgency levels to visual emphasis in UI
export const CTA_STYLES: Record<ContentVariation["ctaUrgency"], string> = {
  low: "border border-white/10 bg-white/5 text-white/90 hover:border-white/20 hover:bg-white/8",
  medium:
    "border border-lime-300/30 bg-lime-300/12 text-lime-200 hover:bg-lime-300/18",
  high: "border border-lime-300 bg-lime-300 text-zinc-950 hover:brightness-95",
};
