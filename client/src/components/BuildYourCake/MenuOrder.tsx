/* =============================================================
   MenuOrder - 2-step "choose from menu" ordering flow
   Step 1: Pick a cake from the gallery + size + flavor
   Step 2: Order summary with special instructions → WhatsApp
   ============================================================= */

import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import type { SizeOption, FlavorOption } from "./types";
import { CAKE_SIZES, CAKE_FLAVORS } from "./data";

interface MenuOrderState {
  cakeName: string;
  size: SizeOption | null;
  flavor: FlavorOption | null;
  deliveryDate: string; // ISO "YYYY-MM-DD"
  instructions: string;
}

const ACCENT = "oklch(0.58 0.14 10)";

export default function MenuOrder({
  preselectedCake,
}: {
  preselectedCake?: string;
}) {
  const [step, setStep] = useState<"select" | "summary">("select");
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const [order, setOrder] = useState<MenuOrderState>({
    cakeName: preselectedCake ?? "",
    size: null,
    flavor: null,
    deliveryDate: "",
    instructions: "",
  });

  // If a cake was pre-selected via URL param, populate it
  useEffect(() => {
    if (preselectedCake) {
      setOrder(o => ({ ...o, cakeName: preselectedCake }));
    }
  }, [preselectedCake]);

  const { data: gallery = [], isLoading } =
    trpc.googleDrive.getGallery.useQuery(undefined, {
      staleTime: 5 * 60 * 1000,
    });

  const cakeNames = Array.from(new Set(gallery.map(item => item.name))).sort();

  const canProceed =
    order.cakeName.trim() !== "" &&
    order.size !== null &&
    order.flavor !== null &&
    order.deliveryDate !== "";

  const goTo = (target: "select" | "summary", dir: "forward" | "back") => {
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setStep(target);
      setAnimating(false);
    }, 220);
  };

  const totalPrice = order.size?.price ?? 0;

  const sendWhatsApp = () => {
    let msg = `Hi Dhvani! I'd like to order from ChefDollsCakeShelf.%0A%0A`;
    msg += `🎂 *Menu Order:*%0A`;
    const dateStr = new Date(order.deliveryDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    msg += `• Cake: ${order.cakeName}%0A`;
    msg += `• Size: ${order.size?.label} (${order.size?.serves})%0A`;
    msg += `• Flavor: ${order.flavor?.emoji} ${order.flavor?.label}%0A`;
    msg += `• Delivery Date: ${dateStr}%0A`;
    msg += `• Estimated Budget: ₹${totalPrice}+`;
    if (order.instructions.trim()) {
      msg += `%0A• Special Instructions: ${order.instructions}`;
    }
    msg += `%0A%0APlease let me know availability and final pricing!`;
    window.open(`https://wa.me/919867390830?text=${msg}`, "_blank");
  };

  return (
    <div
      style={{
        opacity: animating ? 0 : 1,
        transform: animating
          ? direction === "forward"
            ? "translateX(18px)"
            : "translateX(-18px)"
          : "translateX(0)",
        transition: "opacity 0.22s ease, transform 0.22s ease",
      }}
    >
      {step === "select" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step 1 card */}
          <div
            className="lg:col-span-2 rounded-3xl p-6 md:p-8 flex flex-col gap-6"
            style={{
              background: "white",
              border: "1px solid oklch(0.92 0.03 60)",
              boxShadow: "0 2px 12px oklch(0.65 0.12 10 / 0.05)",
            }}
          >
            <div>
              <h3
                className="font-display text-2xl font-semibold mb-1"
                style={{ color: "oklch(0.28 0.05 30)" }}
              >
                🎂 Choose Your Cake
              </h3>
              <p
                className="text-sm"
                style={{
                  color: "oklch(0.55 0.04 30)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Select a cake from our menu, then pick your size and flavor.
              </p>
            </div>

            {/* Cake dropdown */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wide mb-2"
                style={{
                  color: "oklch(0.55 0.04 30)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Select Cake
              </label>
              {isLoading ? (
                <div
                  className="h-11 rounded-xl animate-pulse"
                  style={{ background: "oklch(0.93 0.02 60)" }}
                />
              ) : (
                <select
                  value={order.cakeName}
                  onChange={e =>
                    setOrder(o => ({ ...o, cakeName: e.target.value }))
                  }
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 appearance-none"
                  style={{
                    border: `1.5px solid ${order.cakeName ? ACCENT : "oklch(0.88 0.04 60)"}`,
                    fontFamily: "var(--font-body)",
                    color: order.cakeName
                      ? "oklch(0.28 0.05 30)"
                      : "oklch(0.60 0.03 30)",
                    background: "white",
                    cursor: "pointer",
                  }}
                  onFocus={e => (e.target.style.borderColor = ACCENT)}
                  onBlur={e =>
                    (e.target.style.borderColor = order.cakeName
                      ? ACCENT
                      : "oklch(0.88 0.04 60)")
                  }
                >
                  <option value="">— Pick a cake from our menu —</option>
                  {cakeNames.map(name => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Size picker */}
            {order.cakeName && (
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wide mb-3"
                  style={{
                    color: "oklch(0.55 0.04 30)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CAKE_SIZES.map(s => {
                    const isSelected = order.size?.label === s.label;
                    return (
                      <button
                        key={s.label}
                        onClick={() => setOrder(o => ({ ...o, size: s }))}
                        className="p-4 rounded-2xl text-center transition-all duration-200 hover:scale-105"
                        style={{
                          background: isSelected ? ACCENT : "white",
                          border: `2px solid ${isSelected ? ACCENT : "oklch(0.88 0.04 60)"}`,
                          boxShadow: isSelected
                            ? `0 4px 15px ${ACCENT}50`
                            : "none",
                        }}
                      >
                        <p className="text-2xl mb-1">{s.emoji}</p>
                        <p
                          className="text-sm font-semibold"
                          style={{
                            color: isSelected ? "white" : "oklch(0.35 0.05 30)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {s.label}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{
                            color: isSelected
                              ? "rgba(255,255,255,0.8)"
                              : "oklch(0.55 0.04 30)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {s.serves}
                        </p>
                        <p
                          className="text-xs font-bold mt-1"
                          style={{
                            color: isSelected ? "oklch(0.95 0.04 60)" : ACCENT,
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          ₹{s.price}+
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Flavor picker */}
            {order.cakeName && (
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wide mb-3"
                  style={{
                    color: "oklch(0.55 0.04 30)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Flavor
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CAKE_FLAVORS.map(f => {
                    const isSelected = order.flavor?.label === f.label;
                    return (
                      <button
                        key={f.label}
                        onClick={() => setOrder(o => ({ ...o, flavor: f }))}
                        className="p-3 rounded-2xl text-left flex items-center gap-3 transition-all duration-200 hover:scale-[1.02]"
                        style={{
                          background: isSelected
                            ? "oklch(0.95 0.04 10)"
                            : "white",
                          border: `2px solid ${isSelected ? ACCENT : "oklch(0.88 0.04 60)"}`,
                        }}
                      >
                        <span className="text-2xl">{f.emoji}</span>
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: isSelected
                              ? "oklch(0.45 0.1 10)"
                              : "oklch(0.40 0.05 30)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {f.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Delivery date picker */}
            {order.cakeName && (
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: "oklch(0.55 0.04 30)", fontFamily: "var(--font-body)" }}
                >
                  Delivery Date
                </label>
                {/* Cakes need 5 days notice */}
                <div
                  className="rounded-2xl px-4 py-3 mb-3 flex items-start gap-2"
                  style={{ background: "oklch(0.97 0.03 70)", border: `1.5px solid ${ACCENT}` }}
                >
                  <span className="text-base mt-0.5">⏰</span>
                  <p className="text-sm" style={{ color: "oklch(0.40 0.06 40)", fontFamily: "var(--font-body)" }}>
                    <strong>Heads up:</strong> Custom cakes require at least 5–7 days notice.
                  </p>
                </div>
                <input
                  type="date"
                  value={order.deliveryDate}
                  min={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                  onChange={e => setOrder(o => ({ ...o, deliveryDate: e.target.value }))}
                  className="rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{
                    border: `1.5px solid ${order.deliveryDate ? ACCENT : "oklch(0.88 0.04 60)"}`,
                    fontFamily: "var(--font-body)",
                    color: "oklch(0.35 0.05 30)",
                    background: "white",
                    cursor: "pointer",
                  }}
                  onFocus={e => (e.target.style.borderColor = ACCENT)}
                  onBlur={e => (e.target.style.borderColor = order.deliveryDate ? ACCENT : "oklch(0.88 0.04 60)")}
                />
                {order.deliveryDate && (
                  <div
                    className="mt-3 rounded-2xl px-4 py-3 inline-flex items-center gap-2"
                    style={{ background: "oklch(0.96 0.04 140)", border: "1.5px solid oklch(0.75 0.1 140)" }}
                  >
                    <span>✅</span>
                    <span className="text-sm font-semibold" style={{ color: "oklch(0.28 0.05 30)", fontFamily: "var(--font-body)" }}>
                      {new Date(order.deliveryDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  </div>
                )}
              </div>
            )}

          {/* Special instructions */}
          {order.cakeName && (<div>
            <label
              className="block text-xs font-semibold uppercase tracking-wide mb-2"
              style={{
                color: "oklch(0.55 0.04 30)",
                fontFamily: "var(--font-body)",
              }}
            >
              Special Instructions (optional)
            </label>
            <textarea
              rows={3}
              value={order.instructions}
              onChange={e =>
                setOrder(o => ({ ...o, instructions: e.target.value }))
              }
              placeholder="e.g. Dietary requirements, allergies, or a personalised message for your cake..."
              className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all duration-200"
              style={{
                border: "1.5px solid oklch(0.88 0.04 60)",
                fontFamily: "var(--font-body)",
                color: "oklch(0.35 0.05 30)",
                background: "oklch(0.99 0.01 80)",
              }}
              onFocus={e => (e.target.style.borderColor = ACCENT)}
              onBlur={e => (e.target.style.borderColor = "oklch(0.88 0.04 60)")}
            />
          </div>)}

            {/* Continue button */}
            <div
              className="flex justify-end pt-2 border-t"
              style={{ borderColor: "oklch(0.93 0.02 60)" }}
            >
              <button
                onClick={() => goTo("summary", "forward")}
                disabled={!canProceed}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: canProceed ? ACCENT : "oklch(0.88 0.02 40)",
                  color: "white",
                  fontFamily: "var(--font-body)",
                }}
              >
                Review Order →
              </button>
            </div>
          </div>

          {/* Preview sidebar */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 rounded-3xl p-6"
              style={{
                background: "white",
                border: "1px solid oklch(0.92 0.03 60)",
                boxShadow: "0 8px 40px oklch(0.65 0.12 10 / 0.1)",
              }}
            >
              <h3
                className="font-display text-xl font-semibold mb-4 text-center"
                style={{ color: "oklch(0.28 0.05 30)" }}
              >
                🎂 Your Selection
              </h3>
              {!order.cakeName && !order.size && !order.flavor ? (
                <p
                  className="text-sm text-center"
                  style={{
                    color: "oklch(0.65 0.03 30)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Make a selection to see your order preview.
                </p>
              ) : (
                <div className="space-y-3">
                  {order.cakeName && (
                    <PreviewRow label="Cake" value={order.cakeName} />
                  )}
                  {order.size && (
                    <PreviewRow
                      label="Size"
                      value={`${order.size.label} · ${order.size.serves}`}
                    />
                  )}
                  {order.flavor && (
                    <PreviewRow
                      label="Flavor"
                      value={`${order.flavor.emoji} ${order.flavor.label}`}
                    />
                  )}
                  {order.deliveryDate && (
                    <PreviewRow
                      label="Date"
                      value={new Date(order.deliveryDate + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    />
                  )}
                  {order.size && (
                    <div
                      className="rounded-2xl p-3 mt-2 text-center"
                      style={{ background: "oklch(0.97 0.025 60)" }}
                    >
                      <p
                        className="text-xs mb-1"
                        style={{
                          color: "oklch(0.55 0.04 30)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        Estimated Price
                      </p>
                      <p
                        className="font-display text-2xl font-bold"
                        style={{ color: "oklch(0.45 0.1 10)" }}
                      >
                        ₹{order.size.price}+
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {step === "summary" && (
        <div
          className="rounded-3xl p-6 md:p-8 flex flex-col gap-6"
          style={{
            background: "white",
            border: "1px solid oklch(0.92 0.03 60)",
            boxShadow: "0 2px 12px oklch(0.65 0.12 10 / 0.05)",
          }}
        >
          <div className="text-center">
            <span style={{ fontSize: "3.5rem" }}>🎂</span>
            <h3
              className="font-display text-2xl font-semibold mt-2"
              style={{ color: "oklch(0.28 0.05 30)" }}
            >
              Your Order is Ready! 🎉
            </h3>
            <p
              className="text-sm mt-1"
              style={{
                color: "oklch(0.55 0.04 30)",
                fontFamily: "var(--font-body)",
              }}
            >
              Review your selection and add any special instructions before
              sending.
            </p>
          </div>

          {/* Summary card */}
          <div
            className="rounded-2xl p-5 space-y-3"
            style={{
              background: "oklch(0.97 0.025 60)",
              border: "1px solid oklch(0.90 0.04 60)",
            }}
          >
            <PreviewRow label="Cake" value={order.cakeName} />
            <PreviewRow
              label="Size"
              value={`${order.size?.emoji} ${order.size?.label} · ${order.size?.serves}`}
            />
            <PreviewRow
              label="Flavor"
              value={`${order.flavor?.emoji} ${order.flavor?.label}`}
            />
            <PreviewRow
              label="Delivery Date"
              value={new Date(order.deliveryDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            />
            <PreviewRow
              label="Special Instructions"
              value={order.instructions || "None"}
            />
          </div>

          {/* Price */}
          <div
            className="rounded-2xl p-4 text-center"
            style={{ background: "oklch(0.97 0.025 60)" }}
          >
            <p
              className="text-xs mb-1"
              style={{
                color: "oklch(0.55 0.04 30)",
                fontFamily: "var(--font-body)",
              }}
            >
              Estimated Starting Price
            </p>
            <p
              className="font-display text-3xl font-bold"
              style={{ color: "oklch(0.45 0.1 10)" }}
            >
              ₹{totalPrice}+
            </p>
            <p
              className="text-xs mt-1"
              style={{
                color: "oklch(0.60 0.04 30)",
                fontFamily: "var(--font-body)",
              }}
            >
              Final price confirmed after consultation
            </p>
          </div>

          {/* Navigation */}
          <div
            className="flex justify-between items-center pt-2 border-t"
            style={{ borderColor: "oklch(0.93 0.02 60)" }}
          >
            <button
              onClick={() => goTo("select", "back")}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{
                background: "oklch(0.96 0.02 60)",
                color: "oklch(0.40 0.05 30)",
                fontFamily: "var(--font-body)",
                border: "1.5px solid oklch(0.88 0.04 60)",
              }}
            >
              ← Back
            </button>
            <button
              onClick={sendWhatsApp}
              className="py-3 px-6 rounded-2xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              style={{
                background: "#25D366",
                color: "white",
                fontFamily: "var(--font-body)",
                boxShadow: "0 4px 15px rgba(37, 211, 102, 0.3)",
              }}
            >
              💬 Send to Dhvani via WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex justify-between items-start gap-2 pb-2"
      style={{ borderBottom: "1px solid oklch(0.93 0.02 60)" }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-wide flex-shrink-0"
        style={{ color: "oklch(0.60 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
      <span
        className="text-xs text-right"
        style={{ color: "oklch(0.35 0.05 30)", fontFamily: "var(--font-body)" }}
      >
        {value}
      </span>
    </div>
  );
}
