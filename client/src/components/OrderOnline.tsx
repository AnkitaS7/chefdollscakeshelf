/* =============================================================
   OrderOnline - 4-step ordering guide, single horizontal row
   Design: base.html card style (floating badge, centered emoji,
           title, description) with original color theme
   ============================================================= */

import { Link } from "wouter";

const steps = [
  {
    step: "1",
    emoji: "🛍️",
    title: "Choose Your Item",
    description:
      "Browse our menu and pick your favourite or design a custom creation.",
    color: "oklch(0.58 0.14 10)",
    bg: "oklch(0.97 0.04 10)",
    border: "oklch(0.88 0.08 10)",
  },
  {
    step: "2",
    emoji: "📝",
    title: "Fill the Form",
    description:
      "Share your flavour, quantity, event date, and special instructions.",
    color: "oklch(0.55 0.14 200)",
    bg: "oklch(0.96 0.04 200)",
    border: "oklch(0.85 0.08 200)",
  },
  {
    step: "3",
    emoji: "✅",
    title: "Confirmation",
    description:
      "We'll confirm within 24 hours with pricing and pickup details.",
    color: "oklch(0.55 0.15 140)",
    bg: "oklch(0.95 0.05 140)",
    border: "oklch(0.84 0.08 140)",
  },
  {
    step: "4",
    emoji: "🎉",
    title: "Enjoy!",
    description:
      "Pick up your freshly baked order and enjoy every single bite!",
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
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.78 0.1 70), transparent)",
        }}
      />

      <div className="container">
        {/* Compact header row - original layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 mb-5">
          <div className="mb-5">
            <p
              className="flex justify-center font-script text-2xl"
              style={{ color: "oklch(0.72 0.12 70)" }}
            >
              Simple & Sweet
            </p>
            <h2
              className="flex justify-center font-display text-2xl md:text-3xl font-semibold"
              style={{ color: "oklch(0.22 0.04 40)" }}
            >
              Order in 4 Easy Steps
            </h2>
            <p
              className="text-sm mt-0.5"
              style={{
                color: "oklch(0.55 0.04 30)",
                fontFamily: "var(--font-body)",
              }}
            >
              From our kitchen to your celebration - as sweet as our cakes.
            </p>
          </div>
        </div>

        {/* 4 step cards in a single row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {steps.map(step => (
            <div
              key={step.step}
              className="relative rounded-xl p-6 text-center flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{
                background: step.bg,
                border: `1.5px solid ${step.border}`,
              }}
            >
              {/* Floating step-number badge */}
              <div
                className="absolute left-1/2 -translate-x-1/2 -top-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: step.color }}
              >
                {step.step}
              </div>

              {/* Emoji icon */}
              <div className="text-4xl mt-2">{step.emoji}</div>

              {/* Title */}
              <h3
                className="font-display text-xl font-semibold leading-tight"
                style={{ color: "oklch(0.22 0.04 40)" }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "oklch(0.50 0.04 30)",
                  fontFamily: "var(--font-body)",
                }}
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
