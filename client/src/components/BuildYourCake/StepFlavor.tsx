import type { ProductType, FlavorOption } from "./types";

export default function StepFlavor({
  product,
  flavors,
  selected,
  onSelect,
}: {
  product: ProductType;
  flavors: FlavorOption[];
  selected: FlavorOption | null;
  onSelect: (f: FlavorOption) => void;
}) {
  const accentColor =
    product === "cupcake" ? "oklch(0.55 0.14 200)" : "oklch(0.65 0.12 10)";

  return (
    <div className="flex-1 flex flex-col">
      <h3
        className="font-display text-2xl font-semibold mb-2"
        style={{ color: "oklch(0.28 0.05 30)" }}
      >
        🍰 Pick Your {product === "cupcake" ? "Cupcake" : "Cake"} Flavor
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: "oklch(0.55 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        Every bite matters - choose your favourite.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {flavors.map(f => {
          const isSelected = selected?.label === f.label;
          return (
            <button
              key={f.label}
              onClick={() => onSelect(f)}
              className="p-3 rounded-2xl text-left flex items-center gap-3 transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: isSelected ? "oklch(0.95 0.04 10)" : "white",
                border: `2px solid ${isSelected ? accentColor : "oklch(0.88 0.04 60)"}`,
              }}
            >
              <span className="text-2xl">{f.emoji}</span>
              <span
                className="text-sm font-medium"
                style={{
                  color: isSelected
                    ? "oklch(0.45 0.1 10)"
                    : "oklch(0.40 0.05 30)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {f.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
