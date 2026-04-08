/* =============================================================
   Menu Page - Full product gallery with categories
   ============================================================= */

import PageLayout from "@/components/PageLayout";
import GallerySection from "@/components/GallerySection";
import MarqueeBanner from "@/components/MarqueeBanner";
import { Link } from "wouter";

export default function Menu() {
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
          <div className="absolute top-4 left-8 text-4xl opacity-20">🧁</div>
          <div className="absolute top-8 right-12 text-3xl opacity-15">🎂</div>
          <div className="absolute bottom-4 right-1/3 text-2xl opacity-10">
            ✨
          </div>
        </div>
        <div className="container relative z-10">
          <p
            className="font-script text-2xl mb-2"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            Our Creations
          </p>
          <h1
            className="font-display text-4xl md:text-6xl font-semibold"
            style={{ color: "oklch(0.22 0.04 40)" }}
          >
            The Menu
            <br />
            <em style={{ color: "oklch(0.55 0.12 10)", fontStyle: "italic" }}>
              Every Bite, a Memory
            </em>
          </h1>
          <p
            className="mt-3 text-base max-w-md mx-auto"
            style={{
              color: "oklch(0.50 0.04 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            Browse our collection of 100% eggless cakes, cupcakes, and desserts.
            Every item is made fresh to order - just for you.
          </p>
          <div className="ornament-line mt-4 max-w-xs mx-auto">
            <span className="text-amber-400 text-sm">✦</span>
          </div>
        </div>
      </div>

      <MarqueeBanner />
      <GallerySection />

      {/* Bottom CTA */}
      <div
        className="py-16 text-center"
        style={{ background: "oklch(0.97 0.02 60)" }}
      >
        <p
          className="font-script text-2xl mb-2"
          style={{ color: "oklch(0.72 0.12 70)" }}
        >
          Don't see what you're looking for?
        </p>
        <h2
          className="font-display text-3xl md:text-4xl font-semibold mb-4"
          style={{ color: "oklch(0.22 0.04 40)" }}
        >
          Let's Build Your Dream Cake
        </h2>
        <p
          className="text-base max-w-md mx-auto mb-8"
          style={{
            color: "oklch(0.50 0.04 30)",
            fontFamily: "var(--font-body)",
          }}
        >
          Every cake is custom-made. Tell us your vision and we'll bring it to
          life.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/order"
            className="btn-pink px-8 py-3.5 rounded-full text-sm font-semibold shadow-md hover:scale-105 transition-transform duration-300"
            style={{ fontFamily: "var(--font-body)" }}
          >
            🎂 Build Your Cake
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full text-sm font-semibold border-2 hover:scale-105 transition-all duration-300"
            style={{
              borderColor: "oklch(0.72 0.12 70)",
              color: "oklch(0.45 0.08 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            📩 Send an Inquiry
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
