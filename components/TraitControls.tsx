import {
  BUDGET_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  GOAL_OPTIONS,
  ROLE_OPTIONS,
} from "@/lib/persoon/constants";
import type { PersonaTraits, TechnicalSkill } from "@/lib/persoon/types";
import { formatLabel } from "@/lib/persoon/utils";

interface TraitControlsProps {
  traits: PersonaTraits;
  onChange: (traits: PersonaTraits) => void;
}


// UI controls for editing persona traits
// updates flow up to parent, which re-runs personalization engine
export function TraitControls({ traits, onChange }: TraitControlsProps) {
  
  // generic updater for any trait key
  const setTrait = <K extends keyof PersonaTraits>(
    key: K,
    value: PersonaTraits[K],
  ) => {
    onChange({ ...traits, [key]: value });
  };

  // reusable renderer for chip-based selectors (avoids repeating UI logic)
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
