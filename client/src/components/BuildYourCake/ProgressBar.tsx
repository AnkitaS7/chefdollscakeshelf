import { Check } from "lucide-react";
import type { StepConfig } from "./types";
import { STEP_ICONS } from "./icons";

export default function ProgressBar({
  steps,
  currentIndex,
  onStepClick,
}: {
  steps: StepConfig[];
  currentIndex: number;
  onStepClick: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-0 overflow-x-auto pb-1">
      {steps.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        const StepIcon = STEP_ICONS[step.id];
        return (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => onStepClick(i)}
              disabled={i > currentIndex}
              className="flex flex-col items-center gap-1 group"
              style={{ minWidth: 56 }}
              // The text label is hidden below `sm`, so the button would
              // otherwise be an unlabelled emoji for mobile screen readers.
              aria-label={`Step ${i + 1}: ${step.label}`}
              aria-current={active ? "step" : undefined}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{
                  background: done
                    ? "var(--green)"
                    : active
                      ? "var(--rose-strong)"
                      : "var(--surface-muted)",
                  color: done || active ? "white" : "var(--text-faint)",
                  border: active
                    ? "2.5px solid oklch(0.45 0.12 10)"
                    : "2px solid transparent",
                  boxShadow: active
                    ? "0 0 0 3px oklch(0.58 0.14 10 / 0.15)"
                    : "none",
                  transform: active ? "scale(0.85)" : "scale(1)",
                  cursor: i < currentIndex ? "pointer" : "default",
                }}
              >
                {done ? (
                  <Check className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <StepIcon className="w-5 h-5" aria-hidden="true" />
                )}
              </div>
              <span
                className="text-xs font-medium hidden sm:block"
                style={{
                  color: active
                    ? "oklch(0.38 0.08 10)"
                    : done
                      ? "oklch(0.45 0.08 140)"
                      : "oklch(0.65 0.03 30)",
                  fontFamily: "var(--font-body)",
                  fontWeight: active ? 700 : 500,
                }}
              >
                {step.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <div
                className="w-8 h-0.5 mx-1 flex-shrink-0 transition-all duration-500"
                style={{
                  background:
                    i < currentIndex
                      ? "var(--green)"
                      : "oklch(0.88 0.03 60)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
