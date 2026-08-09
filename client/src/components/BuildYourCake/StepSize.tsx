import type { ProductType, SizeOption } from "./types";
import { PRODUCT_ICONS } from "./icons";
import SizeCards from "./SizeCards";
import CupcakeQuantity from "./CupcakeQuantity";

export default function StepSize({
  product,
  sizes,
  selected,
  onSelect,
  pricePerPiece,
  pricePerKg,
}: {
  product: ProductType;
  sizes: SizeOption[];
  selected: SizeOption | null;
  onSelect: (s: SizeOption) => void;
  /** Cupcake per-piece rate from the chosen flavor; drives the stepper's total. */
  pricePerPiece?: number;
  /** Brownie per-kg rate from the chosen flavor; prices each weight card. */
  pricePerKg?: number;
}) {
  const Icon = PRODUCT_ICONS[product];

  const title =
    product === "cake"
      ? "Choose Your Cake Size"
      : product === "cupcake"
        ? "How Many Cupcakes?"
        : product === "cookietin"
          ? "Choose Your Cookie Tin"
          : "How Much Brownie?";

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
      ? "Freshly baked fudgy brownies — pick a weight to suit your occasion."
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
          pricePerPiece={pricePerPiece ?? 0}
        />
      ) : (
        <SizeCards
          product={product}
          sizes={sizes}
          selected={selected}
          onSelect={onSelect}
          accentColor={accentColor}
          pricePerKg={pricePerKg}
        />
      )}
    </div>
  );
}
