/* =============================================================
   CupcakeQuantity - piece picker for cupcakes.
   Cupcakes sell in multiples of 4 (min 4), so instead of fixed
   cards this is a −/＋ stepper. It reports the choice as a
   SizeOption (via cupcakeSize) so the rest of the builder —
   summary, sidebar, price, WhatsApp — is unchanged.
   ============================================================= */

import { useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import type { SizeOption } from "./types";
import { CUPCAKE_MIN, CUPCAKE_STEP, CUPCAKE_MAX, cupcakeSize } from "./data";

export default function CupcakeQuantity({
  selected,
  onSelect,
  accentColor,
  pricePerPiece,
}: {
  selected: SizeOption | null;
  onSelect: (s: SizeOption) => void;
  accentColor: string;
  /** Per-piece rate from the chosen flavor; the running total is this × qty. */
  pricePerPiece: number;
}) {
  const qty = selected?.qty ?? CUPCAKE_MIN;

  // Sync the SizeOption to the current flavor's rate. Fires on first arrival
  // (defaulting to the minimum so a price shows and the customer can continue
  // without a forced tap) and again if the flavor — and thus the rate — changes,
  // re-pricing the same quantity.
  useEffect(() => {
    onSelect(cupcakeSize(qty, pricePerPiece));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricePerPiece]);

  const setQty = (n: number) =>
    onSelect(
      cupcakeSize(Math.min(CUPCAKE_MAX, Math.max(CUPCAKE_MIN, n)), pricePerPiece)
    );

  const atMin = qty <= CUPCAKE_MIN;
  const atMax = qty >= CUPCAKE_MAX;
  const price = pricePerPiece * qty;

  return (
    <div className="flex flex-col gap-5">
      {/* Stepper + live price */}
      <div
        className="rounded-2xl p-5 flex items-center justify-between gap-4"
        style={{ background: "var(--surface-warm)", border: "1px solid var(--line-soft)" }}
      >
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setQty(qty - CUPCAKE_STEP)}
            disabled={atMin}
            aria-label={`Remove ${CUPCAKE_STEP} cupcakes`}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
            style={{ background: "white", border: `2px solid ${accentColor}`, color: accentColor }}
          >
            <Minus className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="text-center min-w-20" aria-live="polite">
            <p
              className="font-display text-3xl font-bold leading-none"
              style={{ color: "var(--text-heading)" }}
            >
              {qty}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
            >
              cupcakes
            </p>
          </div>

          <button
            type="button"
            onClick={() => setQty(qty + CUPCAKE_STEP)}
            disabled={atMax}
            aria-label={`Add ${CUPCAKE_STEP} cupcakes`}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
            style={{ background: accentColor, border: `2px solid ${accentColor}`, color: "white" }}
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="text-right">
          <p
            className="text-xs"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
          >
            Price
          </p>
          <p
            className="font-display text-2xl font-bold"
            style={{ color: "var(--rose-ink)" }}
          >
            ₹{price.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <p
        className="text-xs"
        style={{ color: "var(--text-faint)", fontFamily: "var(--font-body)" }}
      >
        Cupcakes come in boxes of {CUPCAKE_STEP} — order any multiple, from{" "}
        {CUPCAKE_MIN} up to {CUPCAKE_MAX}.
      </p>
    </div>
  );
}
