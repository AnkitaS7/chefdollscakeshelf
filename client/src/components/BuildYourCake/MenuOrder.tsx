/* =============================================================
   MenuOrder - 2-step "choose from menu" ordering flow
   Step 1: Pick a cake from the gallery + size + flavor
   Step 2: Order summary with special instructions → WhatsApp
   ============================================================= */

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Cake, CircleCheck, Clock } from "lucide-react";
import { trpc } from "@/lib/trpc";
import type { SizeOption, FlavorOption } from "./types";
import { CAKE_SIZES, CAKE_FLAVORS } from "./data";
import { WhatsAppIcon } from "./icons";
import FlavorPicker from "./FlavorPicker";
import SizeCards from "./SizeCards";

interface MenuOrderState {
  cakeName: string;
  size: SizeOption | null;
  flavor: FlavorOption | null;
  deliveryDate: string; // ISO "YYYY-MM-DD"
  instructions: string;
}

const ACCENT = "var(--rose-strong)";

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
  const selectedItem = gallery.find(item => item.name === order.cakeName);

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

  // Cakes are priced by flavor × weight (pricePerKg × kg); fall back to the plain
  // size base until a flavor is picked.
  const totalPrice =
    order.flavor?.pricePerKg && order.size?.kg
      ? order.flavor.pricePerKg * order.size.kg
      : (order.size?.price ?? 0);

  const sendWhatsApp = () => {
    let msg = `Hi Dhvani! I'd like to order from ChefDollsCakeShelf.%0A%0A`;
    msg += `🎂 *Menu Order:*%0A`;
    const dateStr = new Date(
      order.deliveryDate + "T00:00:00"
    ).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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
              border: "1px solid var(--line-soft)",
              boxShadow: "0 2px 12px oklch(0.65 0.12 10 / 0.05)",
            }}
          >
            <div>
              <h3
                className="font-display text-2xl font-semibold mb-1 flex items-center gap-2"
                style={{ color: "var(--text-heading)" }}
              >
                <Cake className="w-5 h-5" aria-hidden="true" />
                Choose Your Cake
              </h3>
              <p
                className="text-sm"
                style={{
                  color: "var(--text-muted)",
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
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Select Cake
              </label>
              {isLoading ? (
                <div
                  className="h-11 rounded-xl animate-pulse"
                  style={{ background: "var(--surface-muted)" }}
                />
              ) : (
                <select
                  value={order.cakeName}
                  onChange={e =>
                    setOrder(o => ({ ...o, cakeName: e.target.value }))
                  }
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 appearance-none"
                  style={{
                    border: `1.5px solid ${order.cakeName ? ACCENT : "var(--line)"}`,
                    fontFamily: "var(--font-body)",
                    color: order.cakeName
                      ? "var(--text-heading)"
                      : "oklch(0.60 0.03 30)",
                    background: "white",
                    cursor: "pointer",
                  }}
                  onFocus={e => (e.target.style.borderColor = ACCENT)}
                  onBlur={e =>
                    (e.target.style.borderColor = order.cakeName
                      ? ACCENT
                      : "var(--line)")
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
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Size
                </label>
                <SizeCards
                  product="cake"
                  sizes={CAKE_SIZES}
                  selected={order.size}
                  onSelect={s => setOrder(o => ({ ...o, size: s }))}
                  accentColor={ACCENT}
                />
              </div>
            )}

            {/* Flavor picker */}
            {order.cakeName && (
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wide mb-3"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Flavor
                </label>
                <FlavorPicker
                  flavors={CAKE_FLAVORS}
                  selected={order.flavor}
                  onSelect={f => setOrder(o => ({ ...o, flavor: f }))}
                  accentColor={ACCENT}
                  // Undefined until they pick a size here, which is what makes
                  // the cards fall back to the per-kg rate.
                  sizeKg={order.size?.kg}
                />
              </div>
            )}

            {/* Delivery date picker */}
            {order.cakeName && (
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Delivery Date
                </label>
                {/* Cakes need 5 days notice */}
                <div
                  className="rounded-2xl px-4 py-3 mb-3 flex items-start gap-2"
                  style={{
                    background: "oklch(0.97 0.03 70)",
                    border: `1.5px solid ${ACCENT}`,
                  }}
                >
                  <Clock
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: ACCENT }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-sm"
                    style={{
                      color: "oklch(0.40 0.06 40)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <strong>Heads up:</strong> Custom cakes require at least 5–7
                    days notice.
                  </p>
                </div>
                <input
                  type="date"
                  value={order.deliveryDate}
                  min={
                    new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={e =>
                    setOrder(o => ({ ...o, deliveryDate: e.target.value }))
                  }
                  className="rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{
                    border: `1.5px solid ${order.deliveryDate ? ACCENT : "var(--line)"}`,
                    fontFamily: "var(--font-body)",
                    color: "var(--text-dark)",
                    background: "white",
                    cursor: "pointer",
                  }}
                  onFocus={e => (e.target.style.borderColor = ACCENT)}
                  onBlur={e =>
                    (e.target.style.borderColor = order.deliveryDate
                      ? ACCENT
                      : "var(--line)")
                  }
                />
                {order.deliveryDate && (
                  <div
                    className="mt-3 rounded-2xl px-4 py-3 inline-flex items-center gap-2 mx-2"
                    style={{
                      background: "oklch(0.96 0.04 140)",
                      border: "1.5px solid oklch(0.75 0.1 140)",
                    }}
                  >
                    <CircleCheck
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: "var(--green)" }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-sm font-semibold"
                      style={{
                        color: "var(--text-heading)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {new Date(
                        order.deliveryDate + "T00:00:00"
                      ).toLocaleDateString("en-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
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
                color: "var(--text-muted)",
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
                border: "1.5px solid var(--line)",
                fontFamily: "var(--font-body)",
                color: "var(--text-dark)",
                background: "var(--background)",
              }}
              onFocus={e => (e.target.style.borderColor = ACCENT)}
              onBlur={e => (e.target.style.borderColor = "var(--line)")}
            />
          </div>)}

            {/* Continue button */}
            <div
              className="flex justify-end pt-2 border-t"
              style={{ borderColor: "var(--surface-muted)" }}
            >
              <button
                onClick={() => goTo("summary", "forward")}
                disabled={!canProceed}
                className="px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: canProceed ? ACCENT : "oklch(0.88 0.02 40)",
                  color: "white",
                  fontFamily: "var(--font-body)",
                }}
              >
                Review Order
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Preview sidebar */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 rounded-3xl p-6"
              style={{
                background: "white",
                border: "1px solid var(--line-soft)",
                boxShadow: "0 8px 40px oklch(0.65 0.12 10 / 0.1)",
              }}
            >
              <h3
                className="font-display text-xl font-semibold mb-4 flex items-center justify-center gap-2"
                style={{ color: "var(--text-heading)" }}
              >
                <Cake className="w-5 h-5" aria-hidden="true" />
                Your Selection
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
                <div className="space-y-6">
                  {selectedItem?.image && (
                    <img
                      src={selectedItem.image}
                      alt={order.cakeName}
                      className="rounded-2xl object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
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
                      value={new Date(
                        order.deliveryDate + "T00:00:00"
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    />
                  )}
                  {order.size && (
                    <div
                      className="rounded-2xl p-3 mt-2 text-center"
                      style={{ background: "var(--surface-warm)" }}
                    >
                      <p
                        className="text-xs mb-1"
                        style={{
                          color: "var(--text-muted)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        Estimated Price
                      </p>
                      <p
                        className="font-display text-2xl font-bold"
                        style={{ color: "var(--rose-ink)" }}
                      >
                        ₹{totalPrice}+
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
            border: "1px solid var(--line-soft)",
            boxShadow: "0 2px 12px oklch(0.65 0.12 10 / 0.05)",
          }}
        >
          <div className="text-center">
            <Cake
              className="w-14 h-14 mx-auto"
              strokeWidth={1.25}
              style={{ color: ACCENT }}
              aria-hidden="true"
            />
            <h3
              className="font-display text-2xl font-semibold mt-2"
              style={{ color: "var(--text-heading)" }}
            >
              Your Order is Ready!
            </h3>
            <p
              className="text-sm mt-1"
              style={{
                color: "var(--text-muted)",
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
              background: "var(--surface-warm)",
              border: "1px solid oklch(0.90 0.04 60)",
            }}
          >
            {selectedItem?.image && (
              <img
                src={selectedItem.image}
                alt={order.cakeName}
                className="block w-fit rounded-2xl object-cover mx-auto"
                style={{ maxHeight: "250px" }}
                loading="lazy"
                decoding="async"
              />
            )}
            <PreviewRow label="Cake" value={order.cakeName} />
            <PreviewRow
              label="Size"
              value={`${order.size?.label} · ${order.size?.serves}`}
            />
            <PreviewRow
              label="Flavor"
              value={`${order.flavor?.emoji} ${order.flavor?.label}`}
            />
            <PreviewRow
              label="Delivery Date"
              value={new Date(
                order.deliveryDate + "T00:00:00"
              ).toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
            <PreviewRow
              label="Special Instructions"
              value={order.instructions || "None"}
            />
          </div>

          {/* Price */}
          <div
            className="rounded-2xl p-4 text-center"
            style={{ background: "var(--surface-warm)" }}
          >
            <p
              className="text-xs mb-1"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              Estimated Starting Price
            </p>
            <p
              className="font-display text-3xl font-bold"
              style={{ color: "var(--rose-ink)" }}
            >
              ₹{totalPrice}+
            </p>
            <p
              className="text-xs mt-1"
              style={{
                color: "var(--text-faint)",
                fontFamily: "var(--font-body)",
              }}
            >
              Final price confirmed after consultation
            </p>
          </div>

          {/* Navigation */}
          <div
            className="flex justify-between items-center pt-2 border-t"
            style={{ borderColor: "var(--surface-muted)" }}
          >
            <button
              onClick={() => goTo("select", "back")}
              className="px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 hover:scale-105"
              style={{
                background: "oklch(0.96 0.02 60)",
                color: "oklch(0.40 0.05 30)",
                fontFamily: "var(--font-body)",
                border: "1.5px solid var(--line)",
              }}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back
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
              <WhatsAppIcon className="w-4 h-4" />
              Send to Dhvani via WhatsApp
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
      style={{ borderBottom: "1px solid var(--surface-muted)" }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-wide flex-shrink-0"
        style={{ color: "var(--text-faint)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
      <span
        className="text-xs text-right"
        style={{ color: "var(--text-dark)", fontFamily: "var(--font-body)" }}
      >
        {value}
      </span>
    </div>
  );
}
