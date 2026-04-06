import type { StepConfig } from "./types";

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
        return (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => onStepClick(i)}
              disabled={i > currentIndex}
              className="flex flex-col items-center gap-1 group"
              style={{ minWidth: 56 }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{
                  background: done
                    ? "oklch(0.55 0.15 140)"
                    : active
                      ? "oklch(0.58 0.14 10)"
                      : "oklch(0.93 0.02 60)",
                  color: done || active ? "white" : "oklch(0.60 0.04 30)",
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
                {done ? "✓" : step.emoji}
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
                      ? "oklch(0.55 0.15 140)"
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
