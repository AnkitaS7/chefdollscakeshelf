/* =============================================================
   LoadingScreen - Animated entrance with brand identity
   ============================================================= */

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 1600);
    const timer2 = setTimeout(() => setVisible(false), 2200);
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
      style={{ background: "oklch(0.99 0.01 80)" }}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.88 0.05 10), transparent)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.1 70), transparent)",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-4">
        {/* Real brand logo */}
        <div className="animate-pulse">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663513006516/gFNz9nK7irL8AANKwrwZkG/logo_bdef0cf2.jpeg"
            alt="ChefDolls CakeShelf"
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
                background: "oklch(0.65 0.12 10)",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
