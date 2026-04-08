/* =============================================================
   About Page - Dhvani's story, values, and brand journey
   ============================================================= */

import PageLayout from "@/components/PageLayout";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import MarqueeBanner from "@/components/MarqueeBanner";

export default function About() {
  return (
    <PageLayout>
      {/* Page hero banner */}
      <div
        className="relative py-14 md:py-20 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.97 0.03 10), oklch(0.96 0.04 60), oklch(0.97 0.02 80))",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-8 text-4xl opacity-20">🎂</div>
          <div className="absolute top-8 right-12 text-3xl opacity-15">✨</div>
          <div className="absolute bottom-4 left-1/3 text-2xl opacity-10">
            🌸
          </div>
        </div>
        <div className="container relative z-10">
          <p
            className="font-script text-2xl mb-2"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            Our Story
          </p>
          <h1
            className="font-display text-4xl md:text-6xl font-semibold"
            style={{ color: "oklch(0.22 0.04 40)" }}
          >
            Made with Love,
            <br />
            <em style={{ color: "oklch(0.55 0.12 10)", fontStyle: "italic" }}>
              Baked with Passion
            </em>
          </h1>
          <div className="ornament-line mt-4 max-w-xs mx-auto">
            <span className="text-amber-400 text-sm">✦</span>
          </div>
        </div>
      </div>

      <MarqueeBanner />
      <AboutSection />
      <WhyChooseUs />
    </PageLayout>
  );
}
