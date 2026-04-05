/* =============================================================
   Home — Landing page for ChefDollsCakeShelf
   Design: Confectionery Editorial — Soft Maximalism
   Sections: Hero, Marquee, About preview, Gallery preview,
             Why Choose Us, Testimonials preview, Order CTA
   ============================================================= */

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import { Link } from "wouter";
import { useEffect, useRef } from "react";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.99 0.01 80)" }}>
      <LoadingScreen />
      <FloatingParticles />
      <Navbar />

      <main>
        <HeroSection />
        <MarqueeBanner />
        <HomeFeaturedPreview />
        <TestimonialsSection />
        <HomeOrderCTA />
      </main>

      <Footer />

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/919999999999?text=Hi%20Dhvani!%20I%20would%20like%20to%20order%20a%20cake%20from%20ChefDollsCakeShelf."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
        title="Order via WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

/* ── Featured preview section ─────────────────────────────────────────────── */
const features = [
  {
    emoji: "🎂",
    title: "Our Story",
    description:
      "Meet Dhvani Hariya — Mumbai's passionate home baker behind every eggless masterpiece. Learn about the love and craft that goes into each creation.",
    cta: "Meet Dhvani",
    href: "/about",
    bg: "oklch(0.97 0.03 10)",
    border: "oklch(0.90 0.06 10)",
    accent: "oklch(0.58 0.14 10)",
  },
  {
    emoji: "🧁",
    title: "Browse the Menu",
    description:
      "From custom wedding cakes to cupcake boxes — explore our full collection of 100% eggless cakes and desserts, each made fresh to order.",
    cta: "View Full Menu",
    href: "/menu",
    bg: "oklch(0.97 0.03 60)",
    border: "oklch(0.90 0.06 60)",
    accent: "oklch(0.60 0.12 60)",
  },
  {
    emoji: "📦",
    title: "Place an Order",
    description:
      "Ready to celebrate? Browse our ordering guide, check lead times, use our interactive cake builder, and send your order in minutes.",
    cta: "Start Your Order",
    href: "/order",
    bg: "oklch(0.97 0.03 200)",
    border: "oklch(0.90 0.05 200)",
    accent: "oklch(0.55 0.12 200)",
  },
];

function HomeFeaturedPreview() {
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
      ref={sectionRef}
      className="py-20 md:py-28"
      style={{ background: "oklch(0.98 0.02 60)" }}
    >
      <div className="container">
        <div ref={headRef} className="reveal text-center mb-12">
          <p
            className="font-script text-2xl mb-1"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            Explore
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold"
            style={{ color: "oklch(0.22 0.04 40)" }}
          >
            Everything
            <br />
            <em style={{ color: "oklch(0.55 0.12 10)", fontStyle: "italic" }}>
              ChefDollsCakeShelf
            </em>
          </h2>
          <div className="ornament-line mt-4 max-w-xs mx-auto">
            <span className="text-amber-400 text-sm">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} delay={i * 100} />
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
      className="reveal rounded-3xl p-8 flex flex-col gap-4 transition-shadow duration-300 hover:shadow-lg group"
      style={{
        background: feature.bg,
        border: `1.5px solid ${feature.border}`,
      }}
    >
      <div className="text-4xl">{feature.emoji}</div>
      <h3
        className="font-display text-2xl font-semibold"
        style={{ color: "oklch(0.22 0.04 40)" }}
      >
        {feature.title}
      </h3>
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "oklch(0.50 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        {feature.description}
      </p>
      <Link
        href={feature.href}
        className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3 w-fit"
        style={{
          color: feature.accent,
          fontFamily: "var(--font-body)",
          textDecoration: "none",
        }}
      >
        {feature.cta}
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
}

/* ── Order CTA banner ─────────────────────────────────────────────────────── */
function HomeOrderCTA() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && ref.current)
            ref.current.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-16 md:py-20"
      style={{ background: "oklch(0.99 0.01 80)" }}
    >
      <div className="container">
        <div
          ref={ref}
          className="reveal rounded-3xl p-8 md:p-14 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.12 10), oklch(0.55 0.14 350))",
          }}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-10 -right-10 text-7xl opacity-10">
              🎂
            </div>
            <div className="absolute -bottom-10 -left-10 text-6xl opacity-10">
              ✨
            </div>
            <div className="absolute top-1/2 left-1/4 text-5xl opacity-5">
              🌸
            </div>
          </div>
          <div className="relative z-10">
            <p
              className="font-script text-2xl mb-2"
              style={{ color: "oklch(0.95 0.03 60)" }}
            >
              Your celebration deserves the best
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-white mb-4">
              Ready to Order?
            </h2>
            <p
              className="text-white/80 mb-8 max-w-md mx-auto text-base"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Custom cakes need 5–7 days notice. Cupcakes &amp; pastries just 48
              hours. Start your order today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/order"
                className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background: "white",
                  color: "oklch(0.45 0.08 10)",
                  fontFamily: "var(--font-body)",
                }}
              >
                🎂 Place an Order
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold border-2 border-white/60 text-white transition-all duration-300 hover:scale-105 hover:bg-white/10"
                style={{ fontFamily: "var(--font-body)" }}
              >
                📩 Send an Inquiry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
