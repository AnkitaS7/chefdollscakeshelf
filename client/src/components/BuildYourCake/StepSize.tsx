import type { ProductType, SizeOption } from "./types";
import { PRODUCT_ICONS } from "./icons";
import SizeCards from "./SizeCards";
import CupcakeQuantity from "./CupcakeQuantity";

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
        ? "How Many Cupcakes?"
        : product === "cookietin"
          ? "Choose Your Cookie Tin"
          : "Choose Your Brownie Flavour";

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
      ? "Each is a generous 1000gms box of freshly baked brownies."
      : product === "cookietin"
        ? "Each tin is a generous 500gms of freshly baked cookies."
        : product === "cake"
          ? "Pick the right size for your occasion — your flavor sets the final price."
          : product === "cupcake"
            ? "Order in boxes of 4 — pick a quantity below."
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
      {product === "cupcake" ? (
        <CupcakeQuantity
          selected={selected}
          onSelect={onSelect}
          accentColor={accentColor}
        />
      ) : (
        <SizeCards
          product={product}
          sizes={sizes}
          selected={selected}
          onSelect={onSelect}
          accentColor={accentColor}
        />
      )}
    </div>
  );
}
