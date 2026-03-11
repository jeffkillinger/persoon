"use client";

import { useMemo, useState } from "react";

type Role = "developer" | "marketer" | "executive" | "designer";
type CompanySize = "startup" | "smb" | "enterprise";
type TechnicalSkill = 1 | 2 | 3 | 4 | 5;
type Budget = "low" | "medium" | "high";
type Goal = "speed" | "scale" | "cost" | "compliance";

interface PersonaTraits {
  role: Role;
  companySize: CompanySize;
  technicalSkill: TechnicalSkill;
  budget: Budget;
  primaryGoal: Goal;
}

interface Persona {
  id: string;
  name: string;
  avatar: string;
  description: string;
  traits: PersonaTraits;
}

interface Feature {
  id: string;
  name: string;
  description: string;
  tag: "core" | "advanced" | "enterprise";
}

interface ContentVariation {
  heroHeadline: string;
  heroSubcopy: string;
  ctaText: string;
  ctaUrgency: "low" | "medium" | "high";
  onboardingSteps: string[];
  recommendedFeatures: Feature[];
  messagingTone: "technical" | "strategic" | "friendly" | "formal";
}

type TraitKey = keyof PersonaTraits;
type Operator = "eq" | "gte" | "lte" | "in";

interface RuleCondition {
  trait: TraitKey;
  operator: Operator;
  value: PersonaTraits[TraitKey] | PersonaTraits[TraitKey][];
}

interface Rule {
  id: string;
  label: string;
  priority: number;
  conditions: RuleCondition[];
  output: Partial<ContentVariation>;
}

interface PersonalizationResult {
  content: ContentVariation;
  matchedRules: Rule[];
  confidence: number;
}

const FEATURES: Feature[] = [
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

const getFeatures = (...ids: string[]) =>
  FEATURES.filter((feature) => ids.includes(feature.id));

const PERSONAS: Persona[] = [
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

const DEFAULT_CONTENT: ContentVariation = {
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

const RULES: Rule[] = [
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
      heroHeadline:
        "Every visitor gets the message most likely to convert.",
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

const ROLE_OPTIONS: Role[] = ["developer", "marketer", "executive", "designer"];
const COMPANY_SIZE_OPTIONS: CompanySize[] = ["startup", "smb", "enterprise"];
const BUDGET_OPTIONS: Budget[] = ["low", "medium", "high"];
const GOAL_OPTIONS: Goal[] = ["speed", "scale", "cost", "compliance"];

const FEATURE_TAG_STYLES: Record<Feature["tag"], string> = {
  core: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  advanced: "border-lime-300/20 bg-lime-300/10 text-lime-200",
  enterprise: "border-violet-300/20 bg-violet-300/10 text-violet-200",
};

const CTA_STYLES: Record<ContentVariation["ctaUrgency"], string> = {
  low: "border border-white/10 bg-white/5 text-white/90 hover:border-white/20 hover:bg-white/8",
  medium:
    "border border-lime-300/30 bg-lime-300/12 text-lime-200 hover:bg-lime-300/18",
  high: "border border-lime-300 bg-lime-300 text-zinc-950 hover:brightness-95",
};

function evaluateCondition(
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

function usePersonalizationEngine(traits: PersonaTraits): PersonalizationResult {
  return useMemo(() => {
    const matchedRules = [...RULES]
      .sort((left, right) => left.priority - right.priority)
      .filter((rule) =>
        rule.conditions.every((condition) => evaluateCondition(condition, traits)),
      );

    const content = matchedRules.reduce<ContentVariation>(
      (accumulator, rule) => ({ ...accumulator, ...rule.output }),
      { ...DEFAULT_CONTENT },
    );

    const coveredTraits = new Set(
      matchedRules.flatMap((rule) =>
        rule.conditions.map((condition) => condition.trait),
      ),
    );

    return {
      content,
      matchedRules,
      confidence: coveredTraits.size / Object.keys(traits).length,
    };
  }, [traits]);
}

function formatLabel(value: string) {
  return value.replace("-", " ");
}

interface PersonaSelectorProps {
  personas: Persona[];
  selectedId: string;
  onSelect: (persona: Persona) => void;
}

function PersonaSelector({
  personas,
  selectedId,
  onSelect,
}: PersonaSelectorProps) {
  return (
    <section className="space-y-3">
      <div className="text-[0.65rem] uppercase tracking-[0.24em] text-foreground-muted">
        Persona
      </div>
      <div className="space-y-2">
        {personas.map((persona) => {
          const isActive = persona.id === selectedId;

          return (
            <button
              key={persona.id}
              type="button"
              onClick={() => onSelect(persona)}
              className={`focus-ring flex w-full items-start gap-3 rounded-[var(--radius-sm)] border px-3 py-3 text-left transition ${
                isActive
                  ? "border-lime-300/60 bg-lime-300/8 shadow-[inset_0_0_0_1px_rgba(201,244,93,0.08)]"
                  : "border-border bg-surface-2 hover:border-border-strong hover:bg-surface-3"
              }`}
              aria-pressed={isActive}
            >
              <span className="pt-0.5 text-base">{persona.avatar}</span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-foreground">
                  {persona.name}
                </span>
                <span className="mt-1 block text-xs leading-5 text-foreground-soft">
                  {persona.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

interface TraitControlsProps {
  traits: PersonaTraits;
  onChange: (traits: PersonaTraits) => void;
}

function TraitControls({ traits, onChange }: TraitControlsProps) {
  const setTrait = <K extends keyof PersonaTraits>(
    key: K,
    value: PersonaTraits[K],
  ) => {
    onChange({ ...traits, [key]: value });
  };

  const renderChipGroup = <T extends string>({
    label,
    value,
    options,
    onSelect,
  }: {
    label: string;
    value: T;
    options: readonly T[];
    onSelect: (nextValue: T) => void;
  }) => (
    <div className="space-y-2">
      <div className="text-[0.68rem] uppercase tracking-[0.18em] text-foreground-soft">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`focus-ring rounded-full border px-3 py-1.5 text-[0.7rem] tracking-[0.08em] lowercase transition ${
                isActive
                  ? "border-lime-300 bg-lime-300 text-zinc-950"
                  : "border-border bg-transparent text-foreground-soft hover:border-border-strong hover:text-foreground"
              }`}
              aria-pressed={isActive}
            >
              {formatLabel(option)}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="space-y-5">
      <div className="text-[0.65rem] uppercase tracking-[0.24em] text-foreground-muted">
        Traits
      </div>

      {renderChipGroup({
        label: "Role",
        value: traits.role,
        options: ROLE_OPTIONS,
        onSelect: (value) => setTrait("role", value),
      })}

      {renderChipGroup({
        label: "Company Size",
        value: traits.companySize,
        options: COMPANY_SIZE_OPTIONS,
        onSelect: (value) => setTrait("companySize", value),
      })}

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.18em] text-foreground-soft">
          <span>Technical Skill</span>
          <span className="text-accent-lime">{traits.technicalSkill} / 5</span>
        </div>
        <input
          className="trait-slider focus-ring"
          type="range"
          min={1}
          max={5}
          step={1}
          value={traits.technicalSkill}
          onChange={(event) =>
            setTrait(
              "technicalSkill",
              Number(event.target.value) as TechnicalSkill,
            )
          }
          aria-label="Technical skill"
        />
        <div className="flex justify-between text-[0.6rem] uppercase tracking-[0.16em] text-foreground-muted">
          <span>Beginner</span>
          <span>Expert</span>
        </div>
      </div>

      {renderChipGroup({
        label: "Budget",
        value: traits.budget,
        options: BUDGET_OPTIONS,
        onSelect: (value) => setTrait("budget", value),
      })}

      {renderChipGroup({
        label: "Primary Goal",
        value: traits.primaryGoal,
        options: GOAL_OPTIONS,
        onSelect: (value) => setTrait("primaryGoal", value),
      })}
    </section>
  );
}

interface PreviewPanelProps {
  result: PersonalizationResult;
}

function PreviewPanel({ result }: PreviewPanelProps) {
  const { content, matchedRules, confidence } = result;

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[0.65rem] uppercase tracking-[0.24em] text-foreground-muted">
          Live Preview
        </div>
        <div className="relative inline-flex h-9 overflow-hidden rounded-full border border-border bg-surface-2 px-4 text-xs text-foreground-soft">
          <div
            className="absolute inset-y-0 left-0 bg-lime-300/12 transition-[width] duration-300"
            style={{ width: `${confidence * 100}%` }}
            aria-hidden="true"
          />
          <span className="relative z-10 m-auto whitespace-nowrap tracking-[0.08em]">
            {matchedRules.length} {matchedRules.length === 1 ? "rule" : "rules"}{" "}
            matched
          </span>
        </div>
      </div>

      <div className="rounded-[var(--radius-lg)] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0)),var(--surface)] p-6 shadow-[var(--shadow-lg)] sm:p-8">
        <div className="mb-3 text-[0.62rem] uppercase tracking-[0.28em] text-accent-cyan">
          {content.messagingTone}
        </div>
        <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-tight tracking-[-0.03em] text-foreground sm:text-5xl">
          {content.heroHeadline}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground-soft sm:text-[0.95rem]">
          {content.heroSubcopy}
        </p>
        <button
          type="button"
          className={`focus-ring mt-6 rounded-[0.9rem] px-5 py-3 text-sm transition ${CTA_STYLES[content.ctaUrgency]}`}
        >
          {content.ctaText}
        </button>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <div className="mb-3 text-[0.65rem] uppercase tracking-[0.24em] text-foreground-muted">
            Onboarding Path
          </div>
          <div className="space-y-2">
            {content.onboardingSteps.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-surface-2 text-[0.65rem] text-foreground-muted">
                  {index + 1}
                </span>
                <span className="text-xs leading-5 text-foreground-soft">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 text-[0.65rem] uppercase tracking-[0.24em] text-foreground-muted">
            Recommended Features
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {content.recommendedFeatures.map((feature) => (
              <article
                key={feature.id}
                className="rounded-[var(--radius-sm)] border border-border bg-surface px-4 py-4 transition hover:border-border-strong hover:bg-surface-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-sm font-medium text-foreground">
                    {feature.name}
                  </h2>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.16em] ${FEATURE_TAG_STYLES[feature.tag]}`}
                  >
                    {feature.tag}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-5 text-foreground-muted">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 text-[0.65rem] uppercase tracking-[0.24em] text-foreground-muted">
          Active Rules
        </div>
        <div className="flex flex-wrap gap-2">
          {matchedRules.map((rule) => (
            <span
              key={rule.id}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-[0.68rem] text-foreground-soft"
            >
              {rule.label}
              <span className="text-foreground-muted">p{rule.priority}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PersoonSandbox() {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(PERSONAS[0]);
  const [traits, setTraits] = useState<PersonaTraits>(PERSONAS[0].traits);

  const result = usePersonalizationEngine(traits);

  const handlePersonaSelect = (persona: Persona) => {
    setSelectedPersona(persona);
    setTraits(persona.traits);
  };

  return (
    <main className="min-h-screen px-4 py-4 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[rgba(10,11,16,0.86)] shadow-[var(--shadow-lg)] backdrop-blur">
        <header className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-lg text-accent-lime">✦</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-[family-name:var(--font-display)] text-2xl leading-none tracking-[-0.02em]">
                Persoon
              </span>
              <span className="rounded-full border border-border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-foreground-muted">
                Personalization Sandbox
              </span>
            </div>
          </div>
          <p className="text-xs leading-5 text-foreground-muted">
            Adjust traits and watch the preview update in real time.
          </p>
        </header>

        <div className="grid flex-1 lg:grid-cols-[21rem_minmax(0,1fr)]">
          <aside className="border-b border-border px-5 py-5 lg:border-r lg:border-b-0 lg:px-6 lg:py-6">
            <div className="space-y-6">
              <PersonaSelector
                personas={PERSONAS}
                selectedId={selectedPersona.id}
                onSelect={handlePersonaSelect}
              />
              <div className="h-px bg-border" />
              <TraitControls traits={traits} onChange={setTraits} />
            </div>
          </aside>

          <div className="px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
            <PreviewPanel result={result} />
          </div>
        </div>
      </div>
    </main>
  );
}
