/* =============================================================
   SizeCards - the size / quantity / tin picker grid.
   Shared by the custom builder (StepSize) and the menu order tab.
   ============================================================= */

import type { ProductType, SizeOption } from "./types";
import { PRODUCT_ICONS } from "./icons";

/** Cakes quote a "from" price (flavor sets the real total); tins are exact. */
function priceLabel(product: ProductType, price: number) {
  if (product === "cake") return `from ₹${price}`;
  if (product === "cookietin") return `₹${price}`;
  return `₹${price}+`;
}

export default function SizeCards({
  product,
  sizes,
  selected,
  onSelect,
  accentColor,
}: {
  product: ProductType;
  sizes: SizeOption[];
  selected: SizeOption | null;
  onSelect: (s: SizeOption) => void;
  accentColor: string;
}) {
  const Icon = PRODUCT_ICONS[product];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {sizes.map(s => {
        const isSelected = selected?.label === s.label;
        return (
          <button
            key={s.label}
            onClick={() => onSelect(s)}
            aria-pressed={isSelected}
            className="p-4 rounded-2xl text-center flex flex-col items-center transition-all duration-200 hover:scale-105"
            style={{
              background: isSelected ? accentColor : "white",
              border: `2px solid ${isSelected ? accentColor : "oklch(0.88 0.04 60)"}`,
              boxShadow: isSelected ? `0 4px 15px ${accentColor}50` : "none",
            }}
          >
            <Icon
              className="w-6 h-6 mb-2"
              style={{ color: isSelected ? "white" : accentColor }}
              aria-hidden="true"
            />
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
              {priceLabel(product, s.price)}
            </p>
          </button>
        );
      })}
    </div>
  );
}
