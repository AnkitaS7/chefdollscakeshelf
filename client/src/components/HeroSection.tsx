/* =============================================================
   HeroSection — Full-bleed split layout with parallax feel
   Left: brand text + CTAs | Right: hero cake image
   ============================================================= */

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663513006516/gFNz9nK7irL8AANKwrwZkG/hero-cake-gefdk8N67kM7hmNuUEyU2P.webp";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero is always visible on load — trigger immediately after mount
    // Show hero content after loading screen fades (2.4s)
    const timer = setTimeout(() => {
      if (textRef.current) textRef.current.classList.add("visible");
      if (imgRef.current) imgRef.current.classList.add("visible");
    }, 2300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    window.location.href = "/about";
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.99 0.015 80) 0%, oklch(0.96 0.03 20) 50%, oklch(0.97 0.025 60) 100%)",
      }}
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-24 left-8 text-3xl animate-float opacity-40">
          ✨
        </div>
        <div className="absolute top-40 right-12 text-2xl animate-float-delayed opacity-30">
          🌸
        </div>
        <div className="absolute bottom-32 left-16 text-2xl animate-float-slow opacity-35">
          💫
        </div>
        <div className="absolute top-1/3 left-1/4 text-xl animate-float opacity-20">
          🎀
        </div>
        <div className="absolute bottom-1/4 right-1/3 text-xl animate-float-delayed opacity-25">
          ⭐
        </div>
        {/* Soft blobs */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: "oklch(0.88 0.05 10)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-25"
          style={{ background: "oklch(0.93 0.04 60)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
          style={{ background: "oklch(0.78 0.1 70)" }}
        />
      </div>

      <div className="container relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[85vh]">
          {/* Text Content */}
          <div
            ref={textRef}
            className="reveal-left flex flex-col justify-center order-2 lg:order-1 pb-12 lg:pb-0"
          >
            {/* Script label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400" />
              <span
                className="font-script text-xl"
                style={{ color: "oklch(0.72 0.12 70)" }}
              >
                Mumbai's Finest
              </span>
            </div>

            {/* Main heading */}
            <h1
              className="font-display leading-[1.05] mb-4"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                color: "oklch(0.22 0.04 40)",
                fontWeight: 600,
              }}
            >
              Handcrafted
              <br />
              <em style={{ color: "oklch(0.55 0.12 10)", fontStyle: "italic" }}>
                Eggless
              </em>{" "}
              Delights
              <br />
              <span style={{ fontWeight: 300 }}>Made with</span>{" "}
              <span className="text-gold" style={{ fontWeight: 700 }}>
                Love
              </span>
            </h1>

            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-md"
              style={{
                color: "oklch(0.45 0.05 30)",
                fontFamily: "var(--font-body)",
              }}
            >
              Mumbai's homegrown premium bakery for custom cakes &amp; desserts.
              Every creation is a celebration — baked fresh, designed with
              heart, and delivered with joy.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "100% Eggless",
                "Made Fresh",
                "Custom Designs",
                "Premium Quality",
              ].map(badge => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-full text-xs font-semibold border"
                  style={{
                    background: "oklch(0.97 0.02 60)",
                    borderColor: "oklch(0.85 0.06 60)",
                    color: "oklch(0.45 0.08 30)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  ✓ {badge}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/order"
                className="btn-pink px-8 py-3.5 rounded-full text-sm font-semibold shadow-lg animate-pulse-glow"
                style={{
                  fontFamily: "var(--font-body)",
                  textDecoration: "none",
                }}
              >
                Order Now 🎂
              </Link>
              <Link
                href="/menu"
                className="px-8 py-3.5 rounded-full text-sm font-semibold border-2 transition-all duration-300 hover:shadow-md hover:bg-rose-50"
                style={{
                  borderColor: "oklch(0.72 0.12 70)",
                  color: "oklch(0.45 0.1 30)",
                  fontFamily: "var(--font-body)",
                  background: "transparent",
                  textDecoration: "none",
                }}
              >
                View Menu ✨
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["🧁", "🎂", "🍰", "🎀"].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-sm shadow-sm"
                    style={{ background: "oklch(0.95 0.03 20)" }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{
                    color: "oklch(0.35 0.06 30)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  500+ Happy Customers
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: "oklch(0.55 0.04 30)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Follow us @chefdollscakeshelf
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            ref={imgRef}
            className="reveal-right flex justify-center items-center order-1 lg:order-2 pt-24 lg:pt-0"
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Decorative ring */}
              <div
                className="absolute inset-0 rounded-[40%_60%_60%_40%/40%_40%_60%_60%] scale-105 opacity-30"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.88 0.05 10), oklch(0.93 0.04 60))",
                }}
              />
              {/* Main image */}
              <div className="relative rounded-[40%_60%_60%_40%/40%_40%_60%_60%] overflow-hidden shadow-2xl">
                <img
                  src={HERO_IMG}
                  alt="Beautiful multi-tiered eggless celebration cake by ChefDollsCakeShelf"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "4/5" }}
                />
                {/* Overlay shimmer */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.1 70) 0%, transparent 60%)",
                  }}
                />
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -left-4 md:-left-8 bg-white rounded-2xl shadow-xl px-4 py-3 animate-float"
                style={{ border: "1px solid oklch(0.90 0.03 60)" }}
              >
                <p
                  className="font-script text-lg"
                  style={{ color: "oklch(0.72 0.12 70)" }}
                >
                  100% Eggless
                </p>
                <p
                  className="text-xs font-semibold"
                  style={{
                    color: "oklch(0.45 0.06 30)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Always & Forever 🌿
                </p>
              </div>

              {/* Top badge */}
              <div
                className="absolute -top-4 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl px-4 py-3 animate-float-delayed"
                style={{ border: "1px solid oklch(0.90 0.03 60)" }}
              >
                <p
                  className="text-xs font-semibold text-center"
                  style={{
                    color: "oklch(0.45 0.06 30)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  ⭐⭐⭐⭐⭐
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: "oklch(0.55 0.04 30)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Premium Quality
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Scroll down"
      >
        <span
          className="text-xs font-body"
          style={{
            color: "oklch(0.55 0.05 30)",
            fontFamily: "var(--font-body)",
          }}
        >
          Scroll
        </span>
        <ChevronDown
          className="w-5 h-5 animate-bounce"
          style={{ color: "oklch(0.65 0.12 10)" }}
        />
      </button>
    </section>
  );
}
