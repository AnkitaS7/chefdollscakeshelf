import type { ProductType } from "./types";
import { PRODUCTS } from "./data";

export default function StepProduct({
  onSelect,
  selected,
}: {
  onSelect: (type: ProductType) => void;
  selected: ProductType | null;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <h3
        className="font-display text-2xl font-semibold mb-2"
        style={{ color: "oklch(0.28 0.05 30)" }}
      >
        🛍️ What would you like to order?
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: "oklch(0.55 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        Select a product to get started. Your selection shapes the entire
        ordering experience.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
        {PRODUCTS.map(p => {
          const isSelected = selected === p.type;
          return (
            <button
              key={p.type}
              onClick={() => onSelect(p.type)}
              className="rounded-2xl p-6 text-center flex flex-col items-center gap-3 transition-all duration-250 hover:scale-[1.03] hover:shadow-md"
              style={{
                background: isSelected ? p.selectedBg : p.bg,
                border: `2px solid ${isSelected ? p.selectedBg : p.border}`,
                boxShadow: isSelected ? `0 6px 24px ${p.color}40` : "none",
                transform: isSelected ? "scale(1.03)" : "scale(1)",
              }}
            >
              <span style={{ fontSize: "3rem", lineHeight: 1 }}>{p.emoji}</span>
              <div>
                <p
                  className="font-display text-xl font-semibold"
                  style={{
                    color: isSelected ? "white" : "oklch(0.28 0.05 30)",
                  }}
                >
                  {p.label}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{
                    color: isSelected
                      ? "rgba(255,255,255,0.8)"
                      : "oklch(0.55 0.04 30)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {p.tagline}
                </p>
              </div>
              {isSelected && (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "rgba(255,255,255,0.25)",
                    color: "white",
                  }}
                >
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
