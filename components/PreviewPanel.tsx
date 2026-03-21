import type { PersonalizationResult } from "@/lib/persoon/types";
import { CTA_STYLES, FEATURE_TAG_STYLES } from "@/lib/persoon/constants";

interface PreviewPanelProps {
  result: PersonalizationResult;
  onCtaClick: () => void;
}

// renders the fully personalized experience returned by the engine
// displays the content, recommended features, and rule/debug metadata
export function PreviewPanel({ result, onCtaClick }: PreviewPanelProps) {
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
          onClick={onCtaClick}
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

      {/* exposes which rules matched so the personalization logic is transparent */}
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
