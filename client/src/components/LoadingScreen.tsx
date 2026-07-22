/* =============================================================
   LoadingScreen - Animated entrance with brand identity
   ============================================================= */

import { useEffect, useState } from "react";
import Picture from "./Picture";
import { INTRO_DONE_MS, INTRO_FADE_MS, INTRO_PLAYS } from "@/lib/intro";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(INTRO_PLAYS);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!INTRO_PLAYS) return;
    const timer1 = setTimeout(() => setFadeOut(true), INTRO_FADE_MS);
    const timer2 = setTimeout(() => setVisible(false), INTRO_DONE_MS);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-600 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "var(--background)" }}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--blush), transparent)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, var(--gold), transparent)",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-4">
        {/* Real brand logo */}
        <div className="animate-pulse">
          <Picture
            name="brand-logo"
            alt="ChefDolls CakeShelf"
            width={192}
            height={192}
            priority
            className="w-28 h-28 object-contain rounded-full shadow-lg"
          />
        </div>

        {/* Loading dots */}
        <div className="flex gap-1.5 mt-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-bounce"
              style={{
                background: "var(--rose)",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
