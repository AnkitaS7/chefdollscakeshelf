/* =============================================================
   OrderLeadTime - Compact notice period banner
   Design: Tight inline strip - minimal vertical space
   ============================================================= */

import { Clock, CalendarDays, AlertCircle } from "lucide-react";

export default function OrderLeadTime() {
  return (
    <section
      id="lead-time"
      className="py-6 relative overflow-hidden"
      style={{ background: "oklch(0.98 0.02 60)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.1 70), transparent)" }}
      />

      <div className="container">
        {/* Compact header + cards in one row */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 max-w-4xl mx-auto">

          {/* Label pill */}
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl flex-shrink-0 self-stretch justify-center sm:justify-start"
            style={{
              background: "oklch(0.95 0.06 60)",
              border: "1px solid oklch(0.88 0.08 60)",
            }}
          >
            <Clock className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.55 0.12 60)" }} />
            <span
              className="text-sm font-bold whitespace-nowrap"
              style={{ color: "oklch(0.40 0.10 50)", fontFamily: "var(--font-body)" }}
            >
              Order Lead Time
            </span>
          </div>

          {/* Custom Cakes card */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl flex-1"
            style={{
              background: "oklch(0.97 0.04 10)",
              border: "1.5px solid oklch(0.88 0.08 10)",
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "white" }}
            >
              <CalendarDays className="w-4 h-4" style={{ color: "oklch(0.58 0.14 10)" }} />
            </div>
            <div className="min-w-0">
              <p
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "oklch(0.58 0.14 10)", fontFamily: "var(--font-body)" }}
              >
                🎂 Custom Cakes
              </p>
              <p
                className="font-display text-base font-bold"
                style={{ color: "oklch(0.22 0.04 40)" }}
              >
                5–7 Days Notice
              </p>
            </div>
          </div>

          {/* Cupcakes card */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl flex-1"
            style={{
              background: "oklch(0.96 0.04 200)",
              border: "1.5px solid oklch(0.85 0.08 200)",
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "white" }}
            >
              <Clock className="w-4 h-4" style={{ color: "oklch(0.55 0.14 200)" }} />
            </div>
            <div className="min-w-0">
              <p
                className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: "oklch(0.55 0.14 200)", fontFamily: "var(--font-body)" }}
              >
                🧁 Cupcakes & Pastries
              </p>
              <p
                className="font-display text-base font-bold"
                style={{ color: "oklch(0.22 0.04 40)" }}
              >
                48-Hour Notice
              </p>
            </div>
          </div>

          {/* Note */}
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl flex-shrink-0 max-w-xs"
            style={{
              background: "oklch(0.96 0.06 70)",
              border: "1px solid oklch(0.88 0.08 70)",
            }}
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.60 0.12 70)" }} />
            <p
              className="text-xs leading-snug"
              style={{ color: "oklch(0.45 0.06 40)", fontFamily: "var(--font-body)" }}
            >
              Wedding & large orders: <strong>2–3 weeks</strong> ahead recommended.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
