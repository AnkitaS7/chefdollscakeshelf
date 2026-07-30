/* =============================================================
   MenuOrder - stepped "Choose from Menu" ordering flow.
   Mirrors the "Build Your Cake" wizard (ProgressBar + animated steps
   + live sidebar) so both tabs feel like one product:
     Cake (visual grid) → Size → Delivery Date → Flavor → Summary
   Ends by sending the order to Dhvani over WhatsApp.
   ============================================================= */

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Cake, CircleCheck, Clock } from "lucide-react";
import { trpc } from "@/lib/trpc";
import type { SizeOption, FlavorOption, StepConfig, StepId } from "./types";
import { CAKE_SIZES, CAKE_FLAVORS, CAKE_TYPES, type CakeType } from "./data";
import { STEP_ICONS, WhatsAppIcon } from "./icons";
import { minDeliveryDateHours } from "@/lib/date";
import ProgressBar from "./ProgressBar";
import FlavorPicker from "./FlavorPicker";
import SizeCards from "./SizeCards";
import MenuCakePicker, { type MenuCake } from "./MenuCakePicker";

interface MenuOrderState {
  cakeName: string;
  cakeType: CakeType;
  size: SizeOption | null;
  flavor: FlavorOption | null;
  deliveryDate: string; // ISO "YYYY-MM-DD"
  instructions: string;
}

const ACCENT = "var(--rose-strong)";

// The menu only makes cakes, so the first step is "which cake" (id "product",
// the product-selection analog) rather than a product-type picker.
const MENU_STEPS: StepConfig[] = [
  { id: "product", label: "Cake" },
  { id: "size", label: "Size" },
  { id: "date", label: "Delivery Date" },
  { id: "flavor", label: "Flavor" },
  { id: "summary", label: "Summary" },
];

export default function MenuOrder({
  preselectedCake,
}: {
  preselectedCake?: string;
}) {
  // Arriving from the gallery with a cake already chosen skips the cake step.
  const [currentStepIndex, setCurrentStepIndex] = useState(preselectedCake ? 1 : 0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const [order, setOrder] = useState<MenuOrderState>({
    cakeName: preselectedCake ?? "",
    cakeType: "regular",
    size: null,
    flavor: null,
    deliveryDate: "",
    instructions: "",
  });

  const currentStep = MENU_STEPS[currentStepIndex];

  // Lead time depends on the cake type; the date picker rounds hours up to days.
  const noticeHours = CAKE_TYPES.find(t => t.id === order.cakeType)!.noticeHours;
  const minDate = minDeliveryDateHours(noticeHours);

  // Switching type can push the minimum past an already-chosen date; drop a now
  // too-early date so an invalid one can't be carried into the order.
  const selectCakeType = (cakeType: CakeType) =>
    setOrder(o => {
      const min = minDeliveryDateHours(
        CAKE_TYPES.find(t => t.id === cakeType)!.noticeHours
      );
      return {
        ...o,
        cakeType,
        deliveryDate:
          o.deliveryDate && o.deliveryDate < min ? "" : o.deliveryDate,
      };
    });

  // If a cake was pre-selected via URL param, populate it.
  useEffect(() => {
    if (preselectedCake) setOrder(o => ({ ...o, cakeName: preselectedCake }));
  }, [preselectedCake]);

  const { data: gallery = [], isLoading } =
    trpc.googleDrive.getGallery.useQuery(undefined, {
      staleTime: 5 * 60 * 1000,
    });

  // One representative photo per cake name, alphabetised for the grid.
  const cakes: MenuCake[] = useMemo(() => {
    const byName = new Map<string, string>();
    for (const item of gallery) {
      if (!byName.has(item.name)) byName.set(item.name, item.image);
    }
    return Array.from(byName, ([name, image]) => ({ name, image })).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [gallery]);

  const selectedImage = cakes.find(c => c.name === order.cakeName)?.image;

  // Cakes are priced by flavor × weight (pricePerKg × kg); fall back to the plain
  // size base until a flavor is picked.
  const totalPrice =
    order.flavor?.pricePerKg && order.size?.kg
      ? order.flavor.pricePerKg * order.size.kg
      : (order.size?.price ?? 0);

  const goToStep = (index: number, dir: "forward" | "back" = "forward") => {
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentStepIndex(index);
      setAnimating(false);
    }, 220);
  };
  const handleNext = () => {
    if (currentStepIndex < MENU_STEPS.length - 1)
      goToStep(currentStepIndex + 1, "forward");
  };
  const handleBack = () => {
    if (currentStepIndex > 0) goToStep(currentStepIndex - 1, "back");
  };

  const canProceed = (): boolean => {
    switch (currentStep.id) {
      case "product":
        return order.cakeName.trim() !== "";
      case "size":
        return order.size !== null;
      case "date":
        return order.deliveryDate !== "";
      case "flavor":
        return order.flavor !== null;
      default:
        return true;
    }
  };

  // What's still needed to continue — surfaced next to the disabled button so it
  // isn't a silent dead-end.
  const missingHint = (): string | null => {
    if (canProceed()) return null;
    switch (currentStep.id) {
      case "size":
        return "Choose a size to continue.";
      case "date":
        return "Pick a delivery date to continue.";
      case "flavor":
        return "Pick a flavor to continue.";
      default:
        return null;
    }
  };

  const sendWhatsApp = () => {
    // Real newlines + one encode at the end; raw user text (instructions, cake
    // name) must not be spliced into the URL unescaped — a `#` or `&` would
    // truncate or split the message the baker receives.
    let msg = `Hi Dhvani! I'd like to order from ChefDollsCakeShelf.\n\n`;
    msg += `🎂 *Menu Order:*\n`;
    const dateStr = new Date(
      order.deliveryDate + "T00:00:00"
    ).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const cakeTypeLabel = CAKE_TYPES.find(t => t.id === order.cakeType)!.label;
    msg += `• Cake: ${order.cakeName}\n`;
    msg += `• Cake Type: ${cakeTypeLabel}\n`;
    msg += `• Size: ${order.size?.label} (${order.size?.serves})\n`;
    msg += `• Flavor: ${order.flavor?.emoji} ${order.flavor?.label}\n`;
    msg += `• Delivery Date: ${dateStr}\n`;
    msg += `• Estimated Budget: ₹${totalPrice}+`;
    if (order.instructions.trim()) {
      msg += `\n• Special Instructions: ${order.instructions}`;
    }
    msg += `\n\nPlease let me know availability and final pricing!`;
    window.open(
      `https://wa.me/919867390830?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const hint = missingHint();

  return (
    <>
      <ProgressBar
        steps={MENU_STEPS}
        currentIndex={currentStepIndex}
        onStepClick={i => {
          if (i < currentStepIndex) goToStep(i, "back");
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Main step area */}
        <div
          className={
            currentStep.id === "summary"
              ? "col-span-1 lg:col-span-full"
              : "lg:col-span-2"
          }
        >
          <div
            className="rounded-3xl p-6 md:p-8 min-h-[360px] flex flex-col"
            style={{
              background: "white",
              border: "1px solid var(--line-soft)",
              boxShadow: "0 2px 12px oklch(0.65 0.12 10 / 0.05)",
              opacity: animating ? 0 : 1,
              transform: animating
                ? direction === "forward"
                  ? "translateX(18px)"
                  : "translateX(-18px)"
                : "translateX(0)",
              transition: "opacity 0.22s ease, transform 0.22s ease",
            }}
          >
            {/* --- Cake --- */}
            {currentStep.id === "product" && (
              <StepShell
                stepId="product"
                title="Choose Your Cake"
                subtitle="Tap a cake from our menu — you'll pick size and flavor next."
              >
                <MenuCakePicker
                  cakes={cakes}
                  selected={order.cakeName}
                  isLoading={isLoading}
                  accentColor={ACCENT}
                  onSelect={name => {
                    setOrder(o => ({ ...o, cakeName: name }));
                    goToStep(currentStepIndex + 1, "forward");
                  }}
                />
              </StepShell>
            )}

            {/* --- Size --- */}
            {currentStep.id === "size" && (
              <StepShell
                stepId="size"
                title="Choose Your Size"
                subtitle="Pick the right size for your occasion — your flavor sets the final price."
              >
                <SizeCards
                  product="cake"
                  sizes={CAKE_SIZES}
                  selected={order.size}
                  accentColor={ACCENT}
                  onSelect={s => {
                    setOrder(o => ({ ...o, size: s }));
                    goToStep(currentStepIndex + 1, "forward");
                  }}
                />
              </StepShell>
            )}

            {/* --- Delivery Date (with cake type) --- */}
            {currentStep.id === "date" && (
              <StepShell
                stepId="date"
                title="When Do You Need It?"
                subtitle="Choose your cake type — it sets the earliest date we can deliver."
              >
                <fieldset>
                  <legend
                    className="text-xs font-semibold uppercase tracking-wide mb-2"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Cake type
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {CAKE_TYPES.map(t => {
                      const isSelected = order.cakeType === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => selectCakeType(t.id)}
                          aria-pressed={isSelected}
                          className="px-4 min-h-11 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
                          style={{
                            background: isSelected ? ACCENT : "white",
                            border: `2px solid ${isSelected ? ACCENT : "var(--line)"}`,
                            color: isSelected ? "white" : "var(--text-dark)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div
                  className="rounded-2xl px-4 py-3 flex items-start gap-2"
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
                    <strong>Heads up:</strong>{" "}
                    {CAKE_TYPES.find(t => t.id === order.cakeType)!.label} cakes
                    need at least {noticeHours} hours' notice.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="menu-delivery-date"
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Delivery date
                  </label>
                  <input
                    id="menu-delivery-date"
                    type="date"
                    value={order.deliveryDate}
                    min={minDate}
                    onChange={e =>
                      setOrder(o => ({ ...o, deliveryDate: e.target.value }))
                    }
                    className="rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 self-start"
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
                      className="rounded-2xl px-4 py-3 inline-flex items-center gap-2 self-start"
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
              </StepShell>
            )}

            {/* --- Flavor --- */}
            {currentStep.id === "flavor" && (
              <StepShell
                stepId="flavor"
                title="Pick Your Flavor"
                subtitle="Every bite matters — every cake is finished in our signature whipped cream."
              >
                <FlavorPicker
                  flavors={CAKE_FLAVORS}
                  selected={order.flavor}
                  accentColor={ACCENT}
                  sizeKg={order.size?.kg}
                  onSelect={f => {
                    setOrder(o => ({ ...o, flavor: f }));
                    goToStep(currentStepIndex + 1, "forward");
                  }}
                />
              </StepShell>
            )}

            {/* --- Summary --- */}
            {currentStep.id === "summary" && (
              <div className="flex-1 flex flex-col gap-5">
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

                <div
                  className="rounded-2xl p-5 space-y-3"
                  style={{
                    background: "var(--surface-warm)",
                    border: "1px solid oklch(0.90 0.04 60)",
                  }}
                >
                  {selectedImage && (
                    <div
                      className="rounded-2xl overflow-hidden mx-auto"
                      style={{
                        aspectRatio: "4/3",
                        maxWidth: "320px",
                        background: "var(--surface-muted)",
                      }}
                    >
                      <img
                        src={selectedImage}
                        alt={order.cakeName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <PreviewRow label="Cake" value={order.cakeName} />
                  <PreviewRow
                    label="Type"
                    value={CAKE_TYPES.find(t => t.id === order.cakeType)!.label}
                  />
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
                </div>

                <div>
                  <label
                    htmlFor="menu-instructions"
                    className="block text-xs font-semibold uppercase tracking-wide mb-2"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Special Order Instructions (optional)
                  </label>
                  <textarea
                    id="menu-instructions"
                    rows={2}
                    value={order.instructions}
                    onChange={e =>
                      setOrder(o => ({ ...o, instructions: e.target.value }))
                    }
                    placeholder="e.g. dietary needs, allergies, or a message for the card on your cake"
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
                </div>

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

                <button
                  onClick={sendWhatsApp}
                  className="w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
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
            )}

            {/* Nav row — every step but the cake grid (which auto-advances). */}
            {currentStep.id !== "product" && (
              <div
                className="flex flex-col gap-2 mt-auto pt-6 border-t"
                style={{ borderColor: "var(--surface-muted)" }}
              >
                {hint && currentStep.id !== "summary" && (
                  <p
                    className="text-xs text-right"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {hint}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <button
                    onClick={handleBack}
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

                  {currentStep.id !== "summary" && (
                    <button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{
                        background: canProceed()
                          ? ACCENT
                          : "oklch(0.88 0.02 40)",
                        color: "white",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {currentStep.id === "flavor" ? "Review Order" : "Continue"}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live selection sidebar — hidden on the full-width summary step. */}
        {currentStep.id !== "summary" && (
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
                <div className="space-y-4">
                  {selectedImage && (
                    <div
                      className="rounded-2xl overflow-hidden"
                      style={{
                        aspectRatio: "4/3",
                        background: "var(--surface-muted)",
                      }}
                    >
                      <img
                        src={selectedImage}
                        alt={order.cakeName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
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
                      className="rounded-2xl p-3 text-center"
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
        )}
      </div>
    </>
  );
}

/** Per-step heading (icon + title + subtitle) matching the builder's steps. */
function StepShell({
  stepId,
  title,
  subtitle,
  children,
}: {
  stepId: StepId;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const Icon = STEP_ICONS[stepId];
  return (
    <div className="flex-1 flex flex-col">
      <h3
        className="font-display text-2xl font-semibold mb-2 flex items-center gap-2"
        style={{ color: "var(--text-heading)" }}
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
        {title}
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
      >
        {subtitle}
      </p>
      <div className="flex flex-col gap-4">{children}</div>
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
