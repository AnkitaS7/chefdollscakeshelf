import type { ProductType, SizeOption } from "./types";

export default function StepSize({
  product,
  sizes,
  selected,
  onSelect,
}: {
  product: ProductType;
  sizes: SizeOption[];
  selected: SizeOption | null;
  onSelect: (s: SizeOption) => void;
}) {
  const title =
    product === "cake"
      ? "📏 Choose Your Cake Size"
      : product === "cupcake"
        ? "🧁 Choose Your Serving Size"
        : "🍫 Choose Your Quantity";

  const accentColor =
    product === "cake"
      ? "oklch(0.65 0.12 10)"
      : product === "cupcake"
        ? "oklch(0.55 0.14 200)"
        : "oklch(0.40 0.08 40)";

  return (
    <div className="flex-1 flex flex-col">
      <h3
        className="font-display text-2xl font-semibold mb-2"
        style={{ color: "oklch(0.28 0.05 30)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: "oklch(0.55 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        {product === "brownie"
          ? "How many brownies would you like?"
          : "Pick the right size for your occasion."}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {sizes.map(s => {
          const isSelected = selected?.label === s.label;
          return (
            <button
              key={s.label}
              onClick={() => onSelect(s)}
              className="p-4 rounded-2xl text-center transition-all duration-200 hover:scale-105"
              style={{
                background: isSelected ? accentColor : "white",
                border: `2px solid ${isSelected ? accentColor : "oklch(0.88 0.04 60)"}`,
                boxShadow: isSelected ? `0 4px 15px ${accentColor}50` : "none",
              }}
            >
              <p className="text-2xl mb-1">{s.emoji}</p>
              <p
                className="text-sm font-semibold"
                style={{
                  color: isSelected ? "white" : "oklch(0.35 0.05 30)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {s.label}
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
                {s.serves}
              </p>
              <p
                className="text-xs font-bold mt-1"
                style={{
                  color: isSelected ? "oklch(0.95 0.04 60)" : accentColor,
                  fontFamily: "var(--font-body)",
                }}
              >
                ₹{s.price}+
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
