import { Palette } from "lucide-react";
import type { ProductType, FlavorOption } from "./types";
import FlavorPicker from "./FlavorPicker";

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
    product === "cupcake" ? "oklch(0.55 0.14 200)" : "var(--rose)";
  const noun = product === "cupcake" ? "Cupcake" : "Cake";

  return (
    <div className="flex-1 flex flex-col">
      <h3
        className="font-display text-2xl font-semibold mb-2 flex items-center gap-2"
        style={{ color: "var(--text-heading)" }}
      >
        <Palette className="w-5 h-5" aria-hidden="true" />
        Pick Your {noun} Flavor
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
      >
        Every bite matters — choose your favourite. Every {noun.toLowerCase()} is
        finished in our signature whipped cream.
      </p>
      <FlavorPicker
        flavors={flavors}
        selected={selected}
        onSelect={onSelect}
        accentColor={accentColor}
      />
    </div>
  );
}
