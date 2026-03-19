import type { Persona } from "@/lib/persoon/types";

export const PERSONAS: Persona[] = [
  {
    id: "dev-startup",
    name: "Startup Dev",
    avatar: "⚡",
    description: "Solo engineer moving fast, values simplicity and speed.",
    traits: {
      role: "developer",
      companySize: "startup",
      technicalSkill: 5,
      budget: "low",
      primaryGoal: "speed",
    },
  },
  {
    id: "marketer-enterprise",
    name: "Enterprise Marketer",
    avatar: "📊",
    description: "Runs campaigns at scale, needs approval workflows.",
    traits: {
      role: "marketer",
      companySize: "enterprise",
      technicalSkill: 2,
      budget: "high",
      primaryGoal: "scale",
    },
  },
  {
    id: "exec-smb",
    name: "SMB Executive",
    avatar: "🎯",
    description: "Watching the bottom line, needs ROI clarity fast.",
    traits: {
      role: "executive",
      companySize: "smb",
      technicalSkill: 1,
      budget: "medium",
      primaryGoal: "cost",
    },
  },
  {
    id: "designer-agency",
    name: "Agency Designer",
    avatar: "✦",
    description: "Works across multiple client brands, cares about flexibility.",
    traits: {
      role: "designer",
      companySize: "smb",
      technicalSkill: 3,
      budget: "medium",
      primaryGoal: "speed",
    },
  },
];
