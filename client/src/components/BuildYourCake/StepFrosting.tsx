import type { ProductType, FrostingOption } from "./types";

export default function StepFrosting({
  product,
  frostings,
  selected,
  onSelect,
}: {
  product: ProductType;
  frostings: FrostingOption[];
  selected: FrostingOption | null;
  onSelect: (f: FrostingOption) => void;
}) {
  const accentColor =
    product === "cupcake" ? "oklch(0.55 0.14 200)" : "oklch(0.65 0.12 10)";

  return (
    <div className="flex-1 flex flex-col">
      <h3
        className="font-display text-2xl font-semibold mb-2"
        style={{ color: "oklch(0.28 0.05 30)" }}
      >
        🎂 Choose Your Frosting
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: "oklch(0.55 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        {product === "cupcake"
          ? "Pick a frosting style for your cupcakes."
          : "The finishing touch that makes your cake perfect."}
      </p>
      <div className="flex flex-wrap gap-3">
        {frostings.map(f => {
          const isSelected = selected?.label === f.label;
          return (
            <button
              key={f.label}
              onClick={() => onSelect(f)}
              className="px-5 py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105"
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${accentColor}, oklch(0.72 0.1 5))`
                  : "white",
                border: `2px solid ${isSelected ? accentColor : "oklch(0.88 0.04 60)"}`,
                color: isSelected ? "white" : "oklch(0.40 0.05 30)",
                fontFamily: "var(--font-body)",
              }}
            >
              {f.emoji} {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
