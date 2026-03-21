"use client";

import type { AudienceMatchResult } from "@/lib/persoon/audience-types";

interface AudiencePanelProps {
  results: AudienceMatchResult[];
  matchedCount: number;
}

export function AudiencePanel({
  results,
  matchedCount,
}: AudiencePanelProps) {
  return (
    <section className="mt-8 rounded-[var(--radius-lg)] border border-border bg-surface px-5 py-5 shadow-[var(--shadow-lg)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-[0.65rem] uppercase tracking-[0.24em] text-foreground-muted">
            Audience Evaluation
          </div>
          <p className="mt-1 text-xs leading-5 text-foreground-soft">
            Segmentation sits between raw traits and downstream decisioning. This
            panel shows which reusable audiences the active persona currently
            qualifies for.
          </p>
        </div>
        <div className="rounded-full border border-border bg-surface-2 px-3 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-foreground-soft">
          {matchedCount}/{results.length} matched
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {results.map((result) => (
          <article
            key={result.audienceId}
            className={`rounded-[var(--radius-sm)] border px-4 py-4 ${
              result.matched
                ? "border-lime-300/30 bg-lime-300/5"
                : "border-border bg-surface-2"
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-medium text-foreground">
                    {result.audienceName}
                  </h2>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.16em] ${
                      result.matched
                        ? "border-lime-300/30 bg-lime-300/10 text-lime-100"
                        : "border-border text-foreground-muted"
                    }`}
                  >
                    {result.matched ? "matched" : "not matched"}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-foreground-muted">
                  {result.description}
                </p>
              </div>
              <div className="text-[0.68rem] uppercase tracking-[0.14em] text-foreground-muted">
                {result.matchedConditions}/{result.totalConditions} conditions
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {result.reasons.map((reason) => (
                <div
                  key={`${result.audienceId}-${reason}`}
                  className="rounded-[0.8rem] border border-white/6 bg-[rgba(255,255,255,0.025)] px-3 py-2 text-xs leading-5 text-foreground-soft"
                >
                  {reason}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
