/* =============================================================
   AboutSection — Story-driven content with baker portrait
   Design: Asymmetric split with warm editorial feel
   ============================================================= */

import { useEffect, useRef } from "react";
import { Heart, Leaf, Star } from "lucide-react";

const ABOUT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663513006516/gFNz9nK7irL8AANKwrwZkG/about-baker-EVGXhxwBjcMG8spSgcFCcy.webp";

const stats = [
  { value: "500+", label: "Cakes Created" },
  { value: "100%", label: "Eggless Always" },
  { value: "3+", label: "Years of Love" },
  { value: "⭐ 5.0", label: "Customer Rating" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (leftRef.current) leftRef.current.classList.add("visible");
            if (rightRef.current) rightRef.current.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "oklch(0.98 0.015 60)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -right-40 top-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "oklch(0.88 0.05 10)" }}
        />
        <div
          className="absolute -left-20 bottom-0 w-64 h-64 rounded-full blur-3xl opacity-15"
          style={{ background: "oklch(0.93 0.04 60)" }}
        />
      </div>

      <div className="container relative z-10">
        {/* Section label */}
        <div className="flex justify-center mb-12">
          <div className="text-center">
            <p
              className="font-script text-2xl mb-1"
              style={{ color: "oklch(0.72 0.12 70)" }}
            >
              The Story Behind
            </p>
            <h2
              className="font-display text-4xl md:text-5xl font-semibold"
              style={{ color: "oklch(0.22 0.04 40)" }}
            >
              Meet Dhvani
            </h2>
            <div className="ornament-line mt-3 max-w-xs mx-auto">
              <span className="text-amber-400 text-sm">✦</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div ref={leftRef} className="reveal-left flex justify-center">
            <div className="relative">
              {/* Decorative frame */}
              <div
                className="absolute -inset-4 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-20"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.88 0.05 10), oklch(0.78 0.1 70))",
                }}
              />
              {/* Main portrait */}
              <div className="relative rounded-[30%_70%_70%_30%/30%_30%_70%_70%] overflow-hidden shadow-2xl w-72 h-80 md:w-96 md:h-[480px]">
                <img
                  src={ABOUT_IMG}
                  alt="Dhvani Hariya, founder of ChefDollsCakeShelf, decorating a cake"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.35 0.08 10), transparent)",
                  }}
                />
              </div>

              {/* Floating quote card */}
              <div
                className="absolute -bottom-6 -right-6 md:-right-10 bg-white rounded-2xl shadow-xl p-4 max-w-[180px] animate-float"
                style={{ border: "1px solid oklch(0.90 0.03 60)" }}
              >
                <Heart
                  className="w-5 h-5 mb-2"
                  style={{ color: "oklch(0.65 0.12 10)" }}
                  fill="oklch(0.65 0.12 10)"
                />
                <p
                  className="text-xs leading-relaxed"
                  style={{
                    color: "oklch(0.45 0.05 30)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  "Every cake is a little piece of my heart, baked just for
                  you."
                </p>
                <p
                  className="text-xs font-semibold mt-1"
                  style={{
                    color: "oklch(0.65 0.12 10)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  — Dhvani
                </p>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div ref={rightRef} className="reveal-right flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Leaf
                  className="w-4 h-4"
                  style={{ color: "oklch(0.55 0.15 140)" }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{
                    color: "oklch(0.55 0.15 140)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  100% Eggless Specialist
                </span>
              </div>
              <p
                className="font-display text-2xl md:text-3xl font-medium leading-relaxed mb-4"
                style={{ color: "oklch(0.28 0.05 30)" }}
              >
                "Baking isn't just what I do — it's how I{" "}
                <em style={{ color: "oklch(0.55 0.12 10)" }}>celebrate</em> the
                people I love."
              </p>
            </div>

            <div
              className="space-y-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <p
                className="text-base leading-relaxed"
                style={{ color: "oklch(0.45 0.04 30)" }}
              >
                Hi, I'm{" "}
                <strong style={{ color: "oklch(0.35 0.06 20)" }}>
                  Dhvani Hariya
                </strong>{" "}
                — a Mumbai-based home baker with a deep passion for creating
                cakes that don't just look stunning, but taste absolutely
                divine. What started as a love for baking in my home kitchen has
                grown into a boutique brand trusted by hundreds of families
                across Mumbai.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "oklch(0.45 0.04 30)" }}
              >
                Every single creation from ChefDollsCakeShelf is{" "}
                <strong style={{ color: "oklch(0.35 0.06 20)" }}>
                  100% eggless
                </strong>{" "}
                — because I believe that everyone deserves to enjoy the most
                beautiful, indulgent cakes, regardless of dietary preferences. I
                use only premium ingredients, and every cake is made fresh to
                order with the same love I'd put into a cake for my own family.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "oklch(0.45 0.04 30)" }}
              >
                Whether it's a birthday, anniversary, wedding, or just a Tuesday
                that deserves something special — I'm here to make it
                unforgettable.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {stats.map(stat => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-4 text-center card-hover"
                  style={{
                    background: "white",
                    border: "1px solid oklch(0.92 0.03 60)",
                    boxShadow: "0 2px 12px oklch(0.65 0.12 10 / 0.06)",
                  }}
                >
                  <p
                    className="font-display text-2xl font-bold"
                    style={{ color: "oklch(0.45 0.1 10)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs font-medium mt-0.5"
                    style={{
                      color: "oklch(0.55 0.04 30)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Instagram CTA */}
            <a
              href="https://www.instagram.com/chefdollscakeshelf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 group"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                }}
              >
                <Star className="w-4 h-4 text-white" fill="white" />
              </div>
              <span
                className="text-sm font-semibold group-hover:underline"
                style={{
                  color: "oklch(0.45 0.1 10)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Follow @chefdollscakeshelf on Instagram
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
