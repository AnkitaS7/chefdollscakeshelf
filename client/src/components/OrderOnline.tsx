/* =============================================================
   OrderOnline - 4-step ordering guide, single horizontal row
   Design: Compact info strip - all 4 steps in one row
   ============================================================= */

import { Link } from "wouter";

const steps = [
  {
    step: "1",
    emoji: "🛍️",
    title: "Choose Your Item",
    description: "Browse our menu and pick your favourite or design a custom creation.",
    color: "oklch(0.58 0.14 10)",
    bg: "oklch(0.97 0.04 10)",
    border: "oklch(0.88 0.08 10)",
  },
  {
    step: "2",
    emoji: "📝",
    title: "Fill the Form",
    description: "Share your flavour, quantity, event date, and special instructions.",
    color: "oklch(0.55 0.14 200)",
    bg: "oklch(0.96 0.04 200)",
    border: "oklch(0.85 0.08 200)",
  },
  {
    step: "3",
    emoji: "✅",
    title: "Confirmation",
    description: "We'll confirm within 24 hours with pricing and pickup details.",
    color: "oklch(0.55 0.15 140)",
    bg: "oklch(0.95 0.05 140)",
    border: "oklch(0.84 0.08 140)",
  },
  {
    step: "4",
    emoji: "🎉",
    title: "Enjoy!",
    description: "Pick up your freshly baked order and enjoy every single bite!",
    color: "oklch(0.65 0.12 60)",
    bg: "oklch(0.96 0.05 60)",
    border: "oklch(0.86 0.08 60)",
  },
];

export default function OrderOnline() {
  return (
    <section
      id="order-online"
      className="py-8 relative overflow-hidden"
      style={{ background: "oklch(0.99 0.01 80)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.1 70), transparent)" }}
      />

      <div className="container">
        {/* Compact header row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <div>
            <p className="font-script text-xl" style={{ color: "oklch(0.72 0.12 70)" }}>
              Simple & Sweet
            </p>
            <h2
              className="font-display text-2xl md:text-3xl font-semibold"
              style={{ color: "oklch(0.22 0.04 40)" }}
            >
              Order in 4 Easy Steps
            </h2>
            <p
              className="text-xs mt-0.5"
              style={{ color: "oklch(0.55 0.04 30)", fontFamily: "var(--font-body)" }}
            >
              From our kitchen to your celebration - as sweet as our cakes.
            </p>
          </div>
          {/* CTA buttons inline with header on desktop */}
          <div className="flex gap-2 flex-shrink-0">
            <Link
              href="/contact"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 btn-pink"
              style={{ fontFamily: "var(--font-body)" }}
            >
              📩 Place Order
            </Link>
            <a
              href="https://wa.me/919999999999?text=Hi%20Dhvani!%20I%20would%20like%20to%20order%20a%20cake%20from%20ChefDollsCakeShelf."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: "#25D366",
                color: "white",
                fontFamily: "var(--font-body)",
              }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

        {/* 4 steps in a single row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((step, i) => (
            <div
              key={step.step}
              className="rounded-xl p-4 flex flex-col gap-2 transition-shadow duration-300 hover:shadow-md relative"
              style={{
                background: step.bg,
                border: `1.5px solid ${step.border}`,
              }}
            >
              {/* Connector arrow (desktop only) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-sm"
                  style={{ color: "oklch(0.70 0.06 40)" }}
                >
                  →
                </div>
              )}

              {/* Emoji + step number */}
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-lg flex flex-col items-center justify-center flex-shrink-0"
                  style={{ background: "white" }}
                >
                  <span className="text-base leading-none">{step.emoji}</span>
                  <span
                    className="text-[9px] font-bold"
                    style={{ color: step.color, fontFamily: "var(--font-body)" }}
                  >
                    {step.step}
                  </span>
                </div>
                <h3
                  className="font-display text-sm font-semibold leading-tight"
                  style={{ color: "oklch(0.22 0.04 40)" }}
                >
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <p
                className="text-xs leading-relaxed"
                style={{ color: "oklch(0.50 0.04 30)", fontFamily: "var(--font-body)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
