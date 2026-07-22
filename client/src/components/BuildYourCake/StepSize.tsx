import type { ProductType, SizeOption } from "./types";
import { PRODUCT_ICONS } from "./icons";
import SizeCards from "./SizeCards";

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
  const Icon = PRODUCT_ICONS[product];

  const title =
    product === "cake"
      ? "Choose Your Cake Size"
      : product === "cupcake"
        ? "Choose Your Serving Size"
        : product === "cookietin"
          ? "Choose Your Cookie Tin"
          : "Choose Your Quantity";

  const accentColor =
    product === "cake"
      ? "var(--rose)"
      : product === "cupcake"
        ? "oklch(0.55 0.14 200)"
        : product === "cookietin"
          ? "oklch(0.55 0.10 70)"
          : "oklch(0.40 0.08 40)";

  const subtitle =
    product === "brownie"
      ? "How many brownies would you like?"
      : product === "cookietin"
        ? "Each tin is a generous 500gms of freshly baked cookies."
        : product === "cake"
          ? "Pick the right size for your occasion — your flavor sets the final price."
          : "Pick the right size for your occasion.";

  return (
    <div className="flex-1 flex flex-col">
      <h3
        className="font-display text-2xl font-semibold mb-2 flex items-center gap-2"
        style={{ color: "var(--text-heading)" }}
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
        {title}
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
      >
        {subtitle}
      </p>
      <SizeCards
        product={product}
        sizes={sizes}
        selected={selected}
        onSelect={onSelect}
        accentColor={accentColor}
      />
    </div>
  );
}
