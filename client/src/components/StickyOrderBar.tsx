/* =============================================================
   StickyOrderBar - phone-only bar that appears once the hero is
   behind you, so the price floor and the way to order are always a
   thumb away. Desktop keeps the navbar CTA instead.

   It sets data-order-bar on <html> while visible so the floating
   WhatsApp button can step up out of its way.
   ============================================================= */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { CAKE_FLAVORS } from "./BuildYourCake/data";

const FROM_PRICE = Math.min(
  ...CAKE_FLAVORS.map(f => f.pricePerKg ?? Infinity)
);

export default function StickyOrderBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.orderBar = shown ? "on" : "off";
    return () => {
      delete document.documentElement.dataset.orderBar;
    };
  }, [shown]);

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300"
      style={{
        transform: shown ? "translateY(0)" : "translateY(110%)",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--line)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      // Hidden from assistive tech while off-screen: the same links are in
      // the navbar, so exposing a second copy would just be noise.
      aria-hidden={!shown}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <div>
          <p
            className="text-sm font-semibold leading-tight"
            style={{
              color: "var(--text-heading)",
              fontFamily: "var(--font-body)",
            }}
          >
            Cakes from ₹{FROM_PRICE.toLocaleString("en-IN")}/kg
          </p>
          <p
            className="text-xs leading-tight"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            5–7 days notice · 100% eggless
          </p>
        </div>
        <Link
          href="/order"
          tabIndex={shown ? undefined : -1}
          className="btn-pink px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap"
          style={{ fontFamily: "var(--font-body)", textDecoration: "none" }}
        >
          Start an order
        </Link>
      </div>
    </div>
  );
}
