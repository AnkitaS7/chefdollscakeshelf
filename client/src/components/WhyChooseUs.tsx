/* =============================================================
   WhyChooseUs - Feature cards with icons and hover effects
   Design: Offset grid with warm card aesthetic
   ============================================================= */

import { useEffect, useRef } from "react";
import { Leaf, Sparkles, Palette, Award, Heart, Clock } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Eggless",
    description:
      "Every single creation is completely eggless - no exceptions. Enjoy the most indulgent cakes without compromise.",
    color: "oklch(0.55 0.15 140)",
    bg: "oklch(0.94 0.05 140)",
    emoji: "🌿",
  },
  {
    icon: Clock,
    title: "Made Fresh to Order",
    description:
      "We never pre-bake. Your cake is crafted fresh the day before or on the day of delivery for peak freshness.",
    color: "oklch(0.55 0.12 200)",
    bg: "oklch(0.94 0.04 200)",
    emoji: "⏰",
  },
  {
    icon: Palette,
    title: "Custom Designs",
    description:
      "From hand-painted florals to sculpted fondant art - we bring your dream cake to life, exactly as you envision it.",
    color: "oklch(0.55 0.12 280)",
    bg: "oklch(0.94 0.04 280)",
    emoji: "🎨",
  },
  {
    icon: Award,
    title: "Premium Ingredients",
    description:
      "We source only the finest ingredients - Belgian chocolate, real butter, fresh cream, and natural flavors.",
    color: "oklch(0.65 0.12 60)",
    bg: "oklch(0.95 0.05 60)",
    emoji: "✨",
  },
  {
    icon: Heart,
    title: "Handmade with Love",
    description:
      "Each cake is personally crafted by Dhvani with meticulous attention to detail and genuine passion for baking.",
    color: "oklch(0.60 0.14 10)",
    bg: "oklch(0.95 0.04 10)",
    emoji: "💕",
  },
  {
    icon: Sparkles,
    title: "Celebration Specialists",
    description:
      "Birthdays, anniversaries, weddings, baby showers - we specialize in making every milestone unforgettable.",
    color: "oklch(0.55 0.12 320)",
    bg: "oklch(0.94 0.04 320)",
    emoji: "🎉",
  },
];

export default function WhyChooseUs() {
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
      id="why-us"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.97 0.025 20) 0%, oklch(0.99 0.01 60) 50%, oklch(0.97 0.02 10) 100%)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 text-4xl animate-float opacity-20">
          🎂
        </div>
        <div className="absolute bottom-20 left-10 text-3xl animate-float-delayed opacity-15">
          🌸
        </div>
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.78 0.1 70), transparent)",
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headRef} className="reveal text-center mb-14">
          <p
            className="font-script text-2xl mb-1"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            Why We're Different
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold mb-3"
            style={{ color: "oklch(0.22 0.04 40)" }}
          >
            The ChefDolls Promise
          </h2>
          <p
            className="text-base max-w-lg mx-auto"
            style={{
              color: "oklch(0.50 0.04 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            We don't just bake cakes - we craft experiences that make your
            celebrations truly extraordinary.
          </p>
          <div className="ornament-line mt-4 max-w-xs mx-auto">
            <span className="text-amber-400 text-sm">✦</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  delay,
}: {
  feature: (typeof features)[0];
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = feature.icon;

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
      className="reveal rounded-3xl p-6 card-hover group"
      style={{
        background: "white",
        border: "1px solid oklch(0.92 0.03 60)",
        boxShadow: "0 4px 20px oklch(0.65 0.12 10 / 0.05)",
      }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: feature.bg }}
      >
        <Icon className="w-7 h-7" style={{ color: feature.color }} />
      </div>

      {/* Content */}
      <h3
        className="font-display text-xl font-semibold mb-2"
        style={{ color: "oklch(0.28 0.05 30)" }}
      >
        {feature.emoji} {feature.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "oklch(0.50 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        {feature.description}
      </p>

      {/* Bottom accent */}
      <div
        className="mt-4 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
        style={{
          background: `linear-gradient(90deg, ${feature.color}, transparent)`,
        }}
      />
    </div>
  );
}
