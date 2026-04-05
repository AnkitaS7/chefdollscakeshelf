/* =============================================================
   OrderProcess — Step-by-step ordering guide
   Design: Connected steps with icons and animated connectors
   ============================================================= */

import { useEffect, useRef } from "react";
import { Search, MessageCircle, Palette, Package } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Browse Designs",
    description:
      "Explore our gallery of stunning cakes or browse our Instagram @chefdollscakeshelf for inspiration. Find your dream cake or come with your own vision!",
    color: "oklch(0.65 0.12 10)",
    bg: "oklch(0.95 0.04 10)",
    emoji: "🔍",
  },
  {
    step: "02",
    icon: MessageCircle,
    title: "DM or Contact Us",
    description:
      "Reach out via Instagram DM, WhatsApp, or our contact form. Tell us about your occasion, date, and any design ideas you have in mind.",
    color: "oklch(0.55 0.12 200)",
    bg: "oklch(0.94 0.04 200)",
    emoji: "💬",
  },
  {
    step: "03",
    icon: Palette,
    title: "Customize Together",
    description:
      "We'll discuss flavors, design, size, and budget. Dhvani will guide you through options and create a design sketch for your approval.",
    color: "oklch(0.65 0.12 60)",
    bg: "oklch(0.95 0.05 60)",
    emoji: "🎨",
  },
  {
    step: "04",
    icon: Package,
    title: "Delivery or Pickup",
    description:
      "Your freshly baked masterpiece is carefully packaged and delivered to your doorstep in Mumbai, or you can pick it up from our kitchen.",
    color: "oklch(0.55 0.15 140)",
    bg: "oklch(0.94 0.05 140)",
    emoji: "🎁",
  },
];

export default function OrderProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && headRef.current) {
            headRef.current.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="order-process"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "oklch(0.99 0.01 80)" }}
    >
      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.78 0.1 70), transparent)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headRef} className="reveal text-center mb-14">
          <p
            className="font-script text-2xl mb-1"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            Simple & Sweet
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold mb-3"
            style={{ color: "oklch(0.22 0.04 40)" }}
          >
            How to Order
            <br />
            <em style={{ color: "oklch(0.55 0.12 10)", fontStyle: "italic" }}>
              Your Dream Cake
            </em>
          </h2>
          <p
            className="text-base max-w-lg mx-auto"
            style={{
              color: "oklch(0.50 0.04 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            Ordering your perfect cake is as easy as 1-2-3-4. We make the entire
            process smooth, personal, and enjoyable.
          </p>
          <div className="ornament-line mt-4 max-w-xs mx-auto">
            <span className="text-amber-400 text-sm">✦</span>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-16 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 5%, oklch(0.88 0.04 60) 20%, oklch(0.88 0.04 60) 80%, transparent 95%)",
              top: "3.5rem",
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <StepCard key={step.step} step={step} delay={i * 120} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-14 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.12 10), oklch(0.55 0.14 350))",
          }}
        >
          {/* Decorative */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-10 -right-10 text-6xl opacity-10">
              🎂
            </div>
            <div className="absolute -bottom-10 -left-10 text-5xl opacity-10">
              ✨
            </div>
          </div>

          <div className="relative z-10">
            <p
              className="font-script text-2xl mb-2"
              style={{ color: "oklch(0.95 0.03 60)" }}
            >
              Ready to celebrate?
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
              Let's Create Something
              <br />
              Beautiful Together
            </h3>
            <p
              className="text-white/80 mb-8 max-w-md mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Minimum 3 days advance booking required. For wedding cakes, we
              recommend booking at least 2 weeks in advance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/919999999999?text=Hi%20Dhvani!%20I%20would%20like%20to%20order%20a%20cake%20from%20ChefDollsCakeShelf."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: "#25D366",
                  color: "white",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span>💬</span> Order via WhatsApp
              </a>
              <a
                href="https://www.instagram.com/chefdollscakeshelf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: "white",
                  color: "oklch(0.45 0.08 10)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span>📸</span> DM on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, delay }: { step: (typeof steps)[0]; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = step.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && cardRef.current) {
            setTimeout(() => {
              if (cardRef.current) cardRef.current.classList.add("visible");
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="reveal flex flex-col items-center text-center group"
    >
      {/* Step number + icon */}
      <div className="relative mb-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 relative z-10"
          style={{ background: step.bg, border: `2px solid ${step.color}20` }}
        >
          <Icon className="w-7 h-7" style={{ color: step.color }} />
        </div>
        <div
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
          style={{ background: step.color, fontFamily: "var(--font-body)" }}
        >
          {step.step}
        </div>
      </div>

      <h3
        className="font-display text-xl font-semibold mb-2"
        style={{ color: "oklch(0.28 0.05 30)" }}
      >
        {step.emoji} {step.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "oklch(0.50 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        {step.description}
      </p>
    </div>
  );
}
