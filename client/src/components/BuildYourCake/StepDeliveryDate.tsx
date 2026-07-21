import { CalendarDays, CircleCheck, Clock } from "lucide-react";
import type { ProductType } from "./types";

// Minimum notice days per product type
const MIN_NOTICE: Record<ProductType, number> = {
  cake: 5,
  cupcake: 2,
  brownie: 2,
  cookietin: 2,
};

function toISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function StepDeliveryDate({
  product,
  selected,
  onSelect,
}: {
  product: ProductType;
  selected: string;
  onSelect: (date: string) => void;
}) {
  const minDays = MIN_NOTICE[product];
  const minDate = toISODate(new Date(Date.now() + minDays * 24 * 60 * 60 * 1000));

  const noticeLabel =
    product === "cake"
      ? "Custom cakes require at least 5–7 days notice."
      : "Cupcakes, brownies & cookie tins require at least 48 hours notice.";

  const accentColor =
    product === "cake"
      ? "oklch(0.65 0.12 10)"
      : product === "cupcake"
        ? "oklch(0.55 0.14 200)"
        : product === "cookietin"
          ? "oklch(0.55 0.10 70)"
          : "oklch(0.40 0.08 40)";

  // Format selected date for display (e.g. "Sunday, 13 April 2026")
  const displayDate = selected
    ? new Date(selected + "T00:00:00").toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex-1 flex flex-col">
      <h3
        className="font-display text-2xl font-semibold mb-2 flex items-center gap-2"
        style={{ color: "oklch(0.28 0.05 30)" }}
      >
        <CalendarDays className="w-5 h-5" aria-hidden="true" />
        When do you need it?
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: "oklch(0.55 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        Pick your preferred delivery or pickup date.
      </p>

      {/* Notice banner */}
      <div
        className="rounded-2xl px-4 py-3 mb-6 flex items-start gap-2"
        style={{
          background: "oklch(0.97 0.03 70)",
          border: `1.5px solid ${accentColor}`,
        }}
      >
        <Clock
          className="w-4 h-4 mt-0.5 flex-shrink-0"
          style={{ color: accentColor }}
          aria-hidden="true"
        />
        <p
          className="text-sm"
          style={{ color: "oklch(0.40 0.06 40)", fontFamily: "var(--font-body)" }}
        >
          <strong>Heads up:</strong> {noticeLabel} Earliest available date
          is <strong>{new Date(minDate + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long" })}</strong>.
        </p>
      </div>

      {/* Date input */}
      <div className="flex flex-col gap-2 max-w-xs">
        <label
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "oklch(0.55 0.04 30)", fontFamily: "var(--font-body)" }}
        >
          Select Date
        </label>
        <input
          type="date"
          value={selected}
          min={minDate}
          onChange={e => onSelect(e.target.value)}
          className="rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
          style={{
            border: `1.5px solid ${selected ? accentColor : "oklch(0.88 0.04 60)"}`,
            fontFamily: "var(--font-body)",
            color: "oklch(0.35 0.05 30)",
            background: "white",
            cursor: "pointer",
          }}
          onFocus={e => (e.target.style.borderColor = accentColor)}
          onBlur={e =>
            (e.target.style.borderColor = selected ? accentColor : "oklch(0.88 0.04 60)")
          }
        />
      </div>

      {/* Confirmed date display */}
      {displayDate && (
        <div
          className="mt-5 rounded-2xl px-5 py-4 inline-flex items-center gap-3 self-start"
          style={{
            background: "oklch(0.96 0.04 140)",
            border: "1.5px solid oklch(0.75 0.1 140)",
          }}
        >
          <CircleCheck
            className="w-5 h-5 flex-shrink-0"
            style={{ color: "oklch(0.55 0.15 140)" }}
            aria-hidden="true"
          />
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "oklch(0.45 0.08 140)", fontFamily: "var(--font-body)" }}
            >
              Selected Date
            </p>
            <p
              className="text-sm font-semibold mt-0.5"
              style={{ color: "oklch(0.28 0.05 30)", fontFamily: "var(--font-body)" }}
            >
              {displayDate}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
