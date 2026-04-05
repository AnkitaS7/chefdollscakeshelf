/* =============================================================
   BuildYourCake - Interactive multi-product cake builder
   Step 0: Product type selection (Cake / Cupcake / Brownie)
   Steps 1–4: Dynamically adapt per product type
   ============================================================= */

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────
type ProductType = "cake" | "cupcake" | "brownie";

interface OrderState {
  product: ProductType | null;
  size: SizeOption | null;
  flavor: FlavorOption | null;
  frosting: FrostingOption | null;
  decorations: string[];
  addons: string[];
  message: string;
}

interface SizeOption {
  label: string;
  serves: string;
  price: number;
  emoji: string;
}
interface FlavorOption {
  label: string;
  emoji: string;
  color: string;
}
interface FrostingOption {
  label: string;
  emoji: string;
}

// ─── Data ────────────────────────────────────────────────────

const PRODUCTS = [
  {
    type: "cake" as ProductType,
    label: "Cake",
    emoji: "🎂",
    tagline: "Custom layered cakes",
    color: "oklch(0.58 0.14 10)",
    bg: "oklch(0.97 0.04 10)",
    border: "oklch(0.88 0.08 10)",
    selectedBg: "oklch(0.58 0.14 10)",
  },
  {
    type: "cupcake" as ProductType,
    label: "Cupcake",
    emoji: "🧁",
    tagline: "Mini celebration bites",
    color: "oklch(0.55 0.14 200)",
    bg: "oklch(0.96 0.04 200)",
    border: "oklch(0.85 0.08 200)",
    selectedBg: "oklch(0.55 0.14 200)",
  },
  {
    type: "brownie" as ProductType,
    label: "Brownie",
    emoji: "🍫",
    tagline: "Rich fudgy squares",
    color: "oklch(0.40 0.08 40)",
    bg: "oklch(0.96 0.02 40)",
    border: "oklch(0.82 0.05 40)",
    selectedBg: "oklch(0.40 0.08 40)",
  },
];

// Cake data
const CAKE_SIZES: SizeOption[] = [
  { label: "6 inch", serves: "Serves 8–10", price: 800, emoji: "🎂" },
  { label: "8 inch", serves: "Serves 12–15", price: 1200, emoji: "🎂" },
  { label: "10 inch", serves: "Serves 18–22", price: 1800, emoji: "🎂" },
  { label: "2-Tier", serves: "Serves 25–30", price: 2800, emoji: "🎂" },
];

const CAKE_FLAVORS: FlavorOption[] = [
  { label: "Vanilla Bean", emoji: "🍦", color: "oklch(0.95 0.03 80)" },
  { label: "Chocolate Truffle", emoji: "🍫", color: "oklch(0.40 0.08 40)" },
  { label: "Strawberry", emoji: "🍓", color: "oklch(0.75 0.12 10)" },
  { label: "Red Velvet", emoji: "❤️", color: "oklch(0.55 0.15 15)" },
  { label: "Lemon Zest", emoji: "🍋", color: "oklch(0.90 0.12 95)" },
  { label: "Butterscotch", emoji: "🧈", color: "oklch(0.85 0.1 70)" },
];

const CAKE_FROSTINGS: FrostingOption[] = [
  { label: "Whipped Cream", emoji: "🤍" },
  { label: "Buttercream", emoji: "💛" },
  { label: "Fondant", emoji: "🌸" },
  { label: "Ganache", emoji: "🍫" },
];

const CAKE_DECORATIONS = [
  { label: "Fresh Flowers", emoji: "🌸" },
  { label: "Gold Leaf", emoji: "✨" },
  { label: "Macarons", emoji: "🍬" },
  { label: "Edible Glitter", emoji: "💫" },
  { label: "Custom Message", emoji: "✍️" },
  { label: "Fruit Topping", emoji: "🍓" },
];

// Cupcake data
const CUPCAKE_SIZES: SizeOption[] = [
  { label: "4 Cupcakes", serves: "Mini box", price: 320, emoji: "🧁" },
  { label: "8 Cupcakes", serves: "Party box", price: 600, emoji: "🧁" },
  { label: "12 Cupcakes", serves: "Celebration box", price: 880, emoji: "🧁" },
  { label: "16 Cupcakes", serves: "Grand box", price: 1150, emoji: "🧁" },
];

const CUPCAKE_FLAVORS: FlavorOption[] = [
  { label: "Vanilla Bean", emoji: "🍦", color: "oklch(0.95 0.03 80)" },
  { label: "Chocolate", emoji: "🍫", color: "oklch(0.40 0.08 40)" },
  { label: "Strawberry", emoji: "🍓", color: "oklch(0.75 0.12 10)" },
  { label: "Red Velvet", emoji: "❤️", color: "oklch(0.55 0.15 15)" },
  { label: "Lemon Zest", emoji: "🍋", color: "oklch(0.90 0.12 95)" },
  { label: "Funfetti", emoji: "🎉", color: "oklch(0.88 0.1 85)" },
];

const CUPCAKE_FROSTINGS: FrostingOption[] = [
  { label: "Swirl Buttercream", emoji: "💛" },
  { label: "Whipped Cream", emoji: "🤍" },
  { label: "Cream Cheese", emoji: "🧀" },
  { label: "Ganache Drip", emoji: "🍫" },
];

const CUPCAKE_DECORATIONS = [
  { label: "Sprinkles", emoji: "🌈" },
  { label: "Edible Glitter", emoji: "💫" },
  { label: "Fondant Topper", emoji: "🌸" },
  { label: "Custom Message", emoji: "✍️" },
  { label: "Gold Dust", emoji: "✨" },
  { label: "Fruit Slice", emoji: "🍓" },
];

// Brownie data
const BROWNIE_SIZES: SizeOption[] = [
  { label: "4 Brownies", serves: "Small box", price: 240, emoji: "🍫" },
  { label: "8 Brownies", serves: "Gift box", price: 450, emoji: "🍫" },
  { label: "12 Brownies", serves: "Party box", price: 650, emoji: "🍫" },
  { label: "16 Brownies", serves: "Grand box", price: 840, emoji: "🍫" },
];

const BROWNIE_ADDONS = [
  { label: "Walnut", emoji: "🌰" },
  { label: "Choco Chips", emoji: "🍫" },
  { label: "Caramel Swirl", emoji: "🍯" },
  { label: "Sea Salt Sprinkle", emoji: "🧂" },
  { label: "Custom Message Card", emoji: "✍️" },
  { label: "Gift Wrap", emoji: "🎁" },
];

// ─── Step config per product ──────────────────────────────────

type StepId =
  | "product"
  | "size"
  | "flavor"
  | "frosting"
  | "decorations"
  | "summary";

interface StepConfig {
  id: StepId;
  label: string;
  emoji: string;
}

function getSteps(product: ProductType | null): StepConfig[] {
  if (product === "brownie") {
    return [
      { id: "product", label: "Product", emoji: "🛍️" },
      { id: "size", label: "Quantity", emoji: "📦" },
      { id: "decorations", label: "Add-ons", emoji: "✨" },
      { id: "summary", label: "Summary", emoji: "🎉" },
    ];
  }
  return [
    { id: "product", label: "Product", emoji: "🛍️" },
    {
      id: "size",
      label: product === "cupcake" ? "Serving" : "Size",
      emoji: "📏",
    },
    { id: "flavor", label: "Flavor", emoji: "🍰" },
    { id: "frosting", label: "Frosting", emoji: "🎂" },
    {
      id: "decorations",
      label: product === "cupcake" ? "Toppings" : "Decor",
      emoji: "✨",
    },
    { id: "summary", label: "Summary", emoji: "🎉" },
  ];
}

// ─── Main component ───────────────────────────────────────────

export default function BuildYourCake() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const [order, setOrder] = useState<OrderState>({
    product: null,
    size: null,
    flavor: null,
    frosting: null,
    decorations: [],
    addons: [],
    message: "",
  });

  const steps = getSteps(order.product);
  const currentStep = steps[currentStepIndex];

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && headRef.current) {
            headRef.current.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate step transition
  const goToStep = (index: number, dir: "forward" | "back" = "forward") => {
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentStepIndex(index);
      setAnimating(false);
    }, 220);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      goToStep(currentStepIndex + 1, "forward");
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1, "back");
    }
  };

  // When product changes, reset downstream state and jump to step 1
  const selectProduct = (type: ProductType) => {
    setOrder({
      product: type,
      size: null,
      flavor: null,
      frosting: null,
      decorations: [],
      addons: [],
      message: "",
    });
    goToStep(1, "forward");
  };

  // Validation — can user proceed from current step?
  const canProceed = (): boolean => {
    const id = currentStep.id;
    if (id === "product") return order.product !== null;
    if (id === "size") return order.size !== null;
    if (id === "flavor") return order.flavor !== null;
    if (id === "frosting") return order.frosting !== null;
    if (id === "decorations") return true; // optional
    return true;
  };

  // Price calculation
  const totalPrice = () => {
    const base = order.size?.price ?? 0;
    if (order.product === "cake") return base + order.decorations.length * 150;
    if (order.product === "cupcake")
      return base + order.decorations.length * 50;
    if (order.product === "brownie") return base + order.addons.length * 60;
    return 0;
  };

  // WhatsApp message
  const buildWhatsAppMsg = () => {
    const p = order.product;
    let msg = `Hi Dhvani! I'd like to order from ChefDollsCakeShelf.%0A%0A`;
    if (p === "cake") {
      msg += `🎂 *Custom Cake Order:*%0A• Size: ${order.size?.label} (${order.size?.serves})%0A• Flavor: ${order.flavor?.label}%0A• Frosting: ${order.frosting?.label}%0A• Decorations: ${order.decorations.length > 0 ? order.decorations.join(", ") : "None"}%0A• Estimated Budget: ₹${totalPrice()}+`;
    } else if (p === "cupcake") {
      msg += `🧁 *Cupcake Order:*%0A• Quantity: ${order.size?.label}%0A• Flavor: ${order.flavor?.label}%0A• Frosting: ${order.frosting?.label}%0A• Toppings: ${order.decorations.length > 0 ? order.decorations.join(", ") : "None"}%0A• Estimated Budget: ₹${totalPrice()}+`;
    } else {
      msg += `🍫 *Brownie Order:*%0A• Quantity: ${order.size?.label}%0A• Add-ons: ${order.addons.length > 0 ? order.addons.join(", ") : "None"}%0A• Estimated Budget: ₹${totalPrice()}+`;
    }
    if (order.message) msg += `%0A• Note: ${order.message}`;
    msg += `%0A%0APlease let me know availability and final pricing!`;
    window.open(`https://wa.me/919999999999?text=${msg}`, "_blank");
  };

  // Product meta helper
  const productMeta = PRODUCTS.find(p => p.type === order.product);

  return (
    <section
      id="build-cake"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "oklch(0.97 0.02 20)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.78 0.1 70), transparent)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headRef} className="reveal text-center mb-10">
          <p
            className="font-script text-2xl mb-1"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            Design Your Own
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold mb-3"
            style={{ color: "oklch(0.22 0.04 40)" }}
          >
            Build Your
            <br />
            <em style={{ color: "oklch(0.55 0.12 10)", fontStyle: "italic" }}>
              {order.product === "cupcake"
                ? "Dream Cupcakes"
                : order.product === "brownie"
                  ? "Dream Brownies"
                  : "Dream Cake"}
            </em>
          </h2>
          <p
            className="text-base max-w-lg mx-auto"
            style={{
              color: "oklch(0.50 0.04 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            Choose your product, customise your way, and send it straight to
            Dhvani via WhatsApp!
          </p>
        </div>

        {/* Progress bar */}
        <ProgressBar
          steps={steps}
          currentIndex={currentStepIndex}
          onStepClick={i => {
            // Only allow clicking already-completed steps
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
              ref={stepRef}
              className="rounded-3xl p-6 md:p-8 min-h-[360px] flex flex-col"
              style={{
                background: "white",
                border: "1px solid oklch(0.92 0.03 60)",
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
              {/* Step 0 — Product selection */}
              {currentStep.id === "product" && (
                <StepProduct
                  onSelect={selectProduct}
                  selected={order.product}
                />
              )}

              {/* Step: Size / Quantity */}
              {currentStep.id === "size" && (
                <StepSize
                  product={order.product!}
                  sizes={
                    order.product === "cake"
                      ? CAKE_SIZES
                      : order.product === "cupcake"
                        ? CUPCAKE_SIZES
                        : BROWNIE_SIZES
                  }
                  selected={order.size}
                  onSelect={s => setOrder(o => ({ ...o, size: s }))}
                />
              )}

              {/* Step: Flavor (cake & cupcake only) */}
              {currentStep.id === "flavor" && (
                <StepFlavor
                  product={order.product!}
                  flavors={
                    order.product === "cupcake" ? CUPCAKE_FLAVORS : CAKE_FLAVORS
                  }
                  selected={order.flavor}
                  onSelect={f => setOrder(o => ({ ...o, flavor: f }))}
                />
              )}

              {/* Step: Frosting (cake & cupcake only) */}
              {currentStep.id === "frosting" && (
                <StepFrosting
                  product={order.product!}
                  frostings={
                    order.product === "cupcake"
                      ? CUPCAKE_FROSTINGS
                      : CAKE_FROSTINGS
                  }
                  selected={order.frosting}
                  onSelect={f => setOrder(o => ({ ...o, frosting: f }))}
                />
              )}

              {/* Step: Decorations / Add-ons */}
              {currentStep.id === "decorations" && (
                <StepDecorations
                  product={order.product!}
                  items={
                    order.product === "cake"
                      ? CAKE_DECORATIONS
                      : order.product === "cupcake"
                        ? CUPCAKE_DECORATIONS
                        : BROWNIE_ADDONS
                  }
                  selected={
                    order.product === "brownie"
                      ? order.addons
                      : order.decorations
                  }
                  onToggle={label => {
                    if (order.product === "brownie") {
                      setOrder(o => ({
                        ...o,
                        addons: o.addons.includes(label)
                          ? o.addons.filter(d => d !== label)
                          : [...o.addons, label],
                      }));
                    } else {
                      setOrder(o => ({
                        ...o,
                        decorations: o.decorations.includes(label)
                          ? o.decorations.filter(d => d !== label)
                          : [...o.decorations, label],
                      }));
                    }
                  }}
                  message={order.message}
                  onMessage={msg => setOrder(o => ({ ...o, message: msg }))}
                />
              )}

              {/* Step: Summary */}
              {currentStep.id === "summary" && (
                <StepSummary
                  order={order}
                  total={totalPrice()}
                  onSend={buildWhatsAppMsg}
                />
              )}

              {/* Navigation */}
              {currentStep.id !== "product" && (
                <div
                  className="flex justify-between items-center mt-auto pt-6 border-t"
                  style={{ borderColor: "oklch(0.93 0.02 60)" }}
                >
                  <button
                    onClick={handleBack}
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

                  {currentStep.id !== "summary" && (
                    <button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{
                        background: canProceed()
                          ? (productMeta?.selectedBg ?? "oklch(0.58 0.14 10)")
                          : "oklch(0.88 0.02 40)",
                        color: "white",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Continue →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Live summary sidebar */}
          <div className="lg:col-span-1">
            <OrderSidebar
              order={order}
              total={totalPrice()}
              onSend={buildWhatsAppMsg}
              currentStep={currentStep.id}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────

function ProgressBar({
  steps,
  currentIndex,
  onStepClick,
}: {
  steps: StepConfig[];
  currentIndex: number;
  onStepClick: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-0 overflow-x-auto pb-1">
      {steps.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => onStepClick(i)}
              disabled={i > currentIndex}
              className="flex flex-col items-center gap-1 group"
              style={{ minWidth: 56 }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{
                  background: done
                    ? "oklch(0.55 0.15 140)"
                    : active
                      ? "oklch(0.58 0.14 10)"
                      : "oklch(0.93 0.02 60)",
                  color: done || active ? "white" : "oklch(0.60 0.04 30)",
                  border: active
                    ? "2.5px solid oklch(0.45 0.12 10)"
                    : "2px solid transparent",
                  boxShadow: active
                    ? "0 0 0 3px oklch(0.58 0.14 10 / 0.15)"
                    : "none",
                  transform: active ? "scale(1.12)" : "scale(1)",
                  cursor: i < currentIndex ? "pointer" : "default",
                }}
              >
                {done ? "✓" : step.emoji}
              </div>
              <span
                className="text-xs font-medium hidden sm:block"
                style={{
                  color: active
                    ? "oklch(0.38 0.08 10)"
                    : done
                      ? "oklch(0.45 0.08 140)"
                      : "oklch(0.65 0.03 30)",
                  fontFamily: "var(--font-body)",
                  fontWeight: active ? 700 : 500,
                }}
              >
                {step.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <div
                className="w-8 h-0.5 mx-1 flex-shrink-0 transition-all duration-500"
                style={{
                  background:
                    i < currentIndex
                      ? "oklch(0.55 0.15 140)"
                      : "oklch(0.88 0.03 60)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 0: Product Selection ────────────────────────────────

function StepProduct({
  onSelect,
  selected,
}: {
  onSelect: (type: ProductType) => void;
  selected: ProductType | null;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <h3
        className="font-display text-2xl font-semibold mb-2"
        style={{ color: "oklch(0.28 0.05 30)" }}
      >
        🛍️ What would you like to order?
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: "oklch(0.55 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        Select a product to get started. Your selection shapes the entire
        ordering experience.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
        {PRODUCTS.map(p => {
          const isSelected = selected === p.type;
          return (
            <button
              key={p.type}
              onClick={() => onSelect(p.type)}
              className="rounded-2xl p-6 text-center flex flex-col items-center gap-3 transition-all duration-250 hover:scale-[1.03] hover:shadow-md"
              style={{
                background: isSelected ? p.selectedBg : p.bg,
                border: `2px solid ${isSelected ? p.selectedBg : p.border}`,
                boxShadow: isSelected ? `0 6px 24px ${p.color}40` : "none",
                transform: isSelected ? "scale(1.03)" : "scale(1)",
              }}
            >
              <span style={{ fontSize: "3rem", lineHeight: 1 }}>{p.emoji}</span>
              <div>
                <p
                  className="font-display text-xl font-semibold"
                  style={{
                    color: isSelected ? "white" : "oklch(0.28 0.05 30)",
                  }}
                >
                  {p.label}
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
                  {p.tagline}
                </p>
              </div>
              {isSelected && (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "rgba(255,255,255,0.25)",
                    color: "white",
                  }}
                >
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step: Size / Quantity ────────────────────────────────────

function StepSize({
  product,
  sizes,
  selected,
  onSelect,
}: {
  product: ProductType;
  sizes: SizeOption[];
  selected: SizeOption | null;
  onSelect: (s: SizeOption) => void;
}) {
  const title =
    product === "cake"
      ? "📏 Choose Your Cake Size"
      : product === "cupcake"
        ? "🧁 Choose Your Serving Size"
        : "🍫 Choose Your Quantity";

  const accentColor =
    product === "cake"
      ? "oklch(0.65 0.12 10)"
      : product === "cupcake"
        ? "oklch(0.55 0.14 200)"
        : "oklch(0.40 0.08 40)";

  return (
    <div className="flex-1 flex flex-col">
      <h3
        className="font-display text-2xl font-semibold mb-2"
        style={{ color: "oklch(0.28 0.05 30)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: "oklch(0.55 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        {product === "brownie"
          ? "How many brownies would you like?"
          : "Pick the right size for your occasion."}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {sizes.map(s => {
          const isSelected = selected?.label === s.label;
          return (
            <button
              key={s.label}
              onClick={() => onSelect(s)}
              className="p-4 rounded-2xl text-center transition-all duration-200 hover:scale-105"
              style={{
                background: isSelected ? accentColor : "white",
                border: `2px solid ${isSelected ? accentColor : "oklch(0.88 0.04 60)"}`,
                boxShadow: isSelected ? `0 4px 15px ${accentColor}50` : "none",
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
                  color: isSelected ? "oklch(0.95 0.04 60)" : accentColor,
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
  );
}

// ─── Step: Flavor ─────────────────────────────────────────────

function StepFlavor({
  product,
  flavors,
  selected,
  onSelect,
}: {
  product: ProductType;
  flavors: FlavorOption[];
  selected: FlavorOption | null;
  onSelect: (f: FlavorOption) => void;
}) {
  const accentColor =
    product === "cupcake" ? "oklch(0.55 0.14 200)" : "oklch(0.65 0.12 10)";
  return (
    <div className="flex-1 flex flex-col">
      <h3
        className="font-display text-2xl font-semibold mb-2"
        style={{ color: "oklch(0.28 0.05 30)" }}
      >
        🍰 Pick Your {product === "cupcake" ? "Cupcake" : "Cake"} Flavor
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: "oklch(0.55 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        Every bite matters — choose your favourite.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {flavors.map(f => {
          const isSelected = selected?.label === f.label;
          return (
            <button
              key={f.label}
              onClick={() => onSelect(f)}
              className="p-3 rounded-2xl text-left flex items-center gap-3 transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: isSelected ? "oklch(0.95 0.04 10)" : "white",
                border: `2px solid ${isSelected ? accentColor : "oklch(0.88 0.04 60)"}`,
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
  );
}

// ─── Step: Frosting ───────────────────────────────────────────

function StepFrosting({
  product,
  frostings,
  selected,
  onSelect,
}: {
  product: ProductType;
  frostings: FrostingOption[];
  selected: FrostingOption | null;
  onSelect: (f: FrostingOption) => void;
}) {
  const accentColor =
    product === "cupcake" ? "oklch(0.55 0.14 200)" : "oklch(0.65 0.12 10)";
  return (
    <div className="flex-1 flex flex-col">
      <h3
        className="font-display text-2xl font-semibold mb-2"
        style={{ color: "oklch(0.28 0.05 30)" }}
      >
        🎂 Choose Your Frosting
      </h3>
      <p
        className="text-sm mb-6"
        style={{ color: "oklch(0.55 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        {product === "cupcake"
          ? "Pick a frosting style for your cupcakes."
          : "The finishing touch that makes your cake perfect."}
      </p>
      <div className="flex flex-wrap gap-3">
        {frostings.map(f => {
          const isSelected = selected?.label === f.label;
          return (
            <button
              key={f.label}
              onClick={() => onSelect(f)}
              className="px-5 py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105"
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${accentColor}, oklch(0.72 0.1 5))`
                  : "white",
                border: `2px solid ${isSelected ? accentColor : "oklch(0.88 0.04 60)"}`,
                color: isSelected ? "white" : "oklch(0.40 0.05 30)",
                fontFamily: "var(--font-body)",
              }}
            >
              {f.emoji} {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step: Decorations / Add-ons ──────────────────────────────

function StepDecorations({
  product,
  items,
  selected,
  onToggle,
  message,
  onMessage,
}: {
  product: ProductType;
  items: { label: string; emoji: string }[];
  selected: string[];
  onToggle: (label: string) => void;
  message: string;
  onMessage: (msg: string) => void;
}) {
  const isBrownie = product === "brownie";
  const addonPrice = isBrownie ? 60 : product === "cupcake" ? 50 : 150;
  const accentColor =
    product === "cake"
      ? "oklch(0.72 0.12 70)"
      : product === "cupcake"
        ? "oklch(0.55 0.14 200)"
        : "oklch(0.40 0.08 40)";

  return (
    <div className="flex-1 flex flex-col gap-5">
      <div>
        <h3
          className="font-display text-2xl font-semibold mb-2"
          style={{ color: "oklch(0.28 0.05 30)" }}
        >
          {isBrownie ? "🌰 Choose Your Add-ons" : "✨ Add Decorations"}
        </h3>
        <p
          className="text-sm"
          style={{
            color: "oklch(0.55 0.04 30)",
            fontFamily: "var(--font-body)",
          }}
        >
          {isBrownie
            ? `Customise your brownies. Each add-on is +₹${addonPrice}.`
            : `Personalise your ${product}. Each decoration is +₹${addonPrice}. All optional!`}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {items.map(d => {
          const isSelected = selected.includes(d.label);
          return (
            <button
              key={d.label}
              onClick={() => onToggle(d.label)}
              className="px-4 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105"
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${accentColor}, oklch(0.82 0.1 75))`
                  : "white",
                border: `2px solid ${isSelected ? accentColor : "oklch(0.88 0.04 60)"}`,
                color: isSelected
                  ? product === "cake"
                    ? "oklch(0.22 0.04 40)"
                    : "white"
                  : "oklch(0.40 0.05 30)",
                fontFamily: "var(--font-body)",
              }}
            >
              {d.emoji} {d.label}
              {isSelected && (
                <span className="text-xs opacity-80">+₹{addonPrice}</span>
              )}
            </button>
          );
        })}
      </div>
      {/* Optional message field */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-wide mb-2"
          style={{
            color: "oklch(0.55 0.04 30)",
            fontFamily: "var(--font-body)",
          }}
        >
          Special Order Instructions (optional)
        </label>
        <textarea
          rows={2}
          value={message}
          onChange={e => onMessage(e.target.value)}
          placeholder={`Any special instructions for your ${product}?`}
          className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all duration-200"
          style={{
            border: "1.5px solid oklch(0.88 0.04 60)",
            fontFamily: "var(--font-body)",
            color: "oklch(0.35 0.05 30)",
            background: "oklch(0.99 0.01 80)",
          }}
          onFocus={e => (e.target.style.borderColor = accentColor)}
          onBlur={e => (e.target.style.borderColor = "oklch(0.88 0.04 60)")}
        />
      </div>
    </div>
  );
}

// ─── Step: Summary ────────────────────────────────────────────

function StepSummary({
  order,
  total,
  onSend,
}: {
  order: OrderState;
  total: number;
  onSend: () => void;
}) {
  const productMeta = PRODUCTS.find(p => p.type === order.product)!;
  const isBrownie = order.product === "brownie";

  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="text-center">
        <span style={{ fontSize: "3.5rem" }}>{productMeta.emoji}</span>
        <h3
          className="font-display text-2xl font-semibold mt-2"
          style={{ color: "oklch(0.28 0.05 30)" }}
        >
          Your {productMeta.label} is Ready to Order! 🎉
        </h3>
        <p
          className="text-sm mt-1"
          style={{
            color: "oklch(0.55 0.04 30)",
            fontFamily: "var(--font-body)",
          }}
        >
          Review your order below and send it to Dhvani.
        </p>
      </div>

      <div
        className="rounded-2xl p-5 space-y-3"
        style={{
          background: "oklch(0.97 0.025 60)",
          border: "1px solid oklch(0.90 0.04 60)",
        }}
      >
        <SummaryRow
          label="Product"
          value={`${productMeta.emoji} ${productMeta.label}`}
        />
        <SummaryRow
          label={isBrownie ? "Quantity" : "Size"}
          value={`${order.size?.emoji} ${order.size?.label} — ${order.size?.serves}`}
        />
        {!isBrownie && order.flavor && (
          <SummaryRow
            label="Flavor"
            value={`${order.flavor.emoji} ${order.flavor.label}`}
          />
        )}
        {!isBrownie && order.frosting && (
          <SummaryRow
            label="Frosting"
            value={`${order.frosting.emoji} ${order.frosting.label}`}
          />
        )}
        <SummaryRow
          label={isBrownie ? "Add-ons" : "Decorations"}
          value={
            (isBrownie ? order.addons : order.decorations).length > 0
              ? (isBrownie ? order.addons : order.decorations).join(", ")
              : "None"
          }
        />
        {order.message && <SummaryRow label="Note" value={order.message} />}
      </div>

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
          ₹{total}+
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

      <button
        onClick={onSend}
        className="w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
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
  );
}

// ─── Sidebar ─────────────────────────────────────────────────

function OrderSidebar({
  order,
  total,
  onSend,
  currentStep,
}: {
  order: OrderState;
  total: number;
  onSend: () => void;
  currentStep: StepId;
}) {
  const productMeta = PRODUCTS.find(p => p.type === order.product);
  const isBrownie = order.product === "brownie";

  return currentStep !== "summary" ? (
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
        {productMeta ? `${productMeta.emoji} Your Order` : "🎂 Your Order"}
      </h3>

      {!order.product ? (
        <p
          className="text-sm text-center"
          style={{
            color: "oklch(0.65 0.03 30)",
            fontFamily: "var(--font-body)",
          }}
        >
          Select a product to begin building your order.
        </p>
      ) : (
        <>
          <div className="space-y-3 mb-5">
            <SummaryRow
              label="Product"
              value={`${productMeta?.emoji} ${productMeta?.label}`}
            />
            {order.size && (
              <SummaryRow
                label={isBrownie ? "Qty" : "Size"}
                value={order.size.label}
              />
            )}
            {!isBrownie && order.flavor && (
              <SummaryRow
                label="Flavor"
                value={`${order.flavor.emoji} ${order.flavor.label}`}
              />
            )}
            {!isBrownie && order.frosting && (
              <SummaryRow
                label="Frosting"
                value={`${order.frosting.emoji} ${order.frosting.label}`}
              />
            )}
            {(isBrownie ? order.addons : order.decorations).length > 0 && (
              <SummaryRow
                label={isBrownie ? "Add-ons" : "Decor"}
                value={(isBrownie ? order.addons : order.decorations).join(
                  ", "
                )}
              />
            )}
          </div>

          {order.size && (
            <>
              <div
                className="rounded-2xl p-4 mb-4 text-center"
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
                  ₹{total}+
                </p>
              </div>

              <button
                onClick={onSend}
                className="w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "#25D366",
                  color: "white",
                  fontFamily: "var(--font-body)",
                  boxShadow: "0 4px 15px rgba(37,211,102,0.25)",
                }}
              >
                💬 WhatsApp Order
              </button>
            </>
          )}
        </>
      )}
    </div>
  ) : null;
}

// ─── Shared sub-components ────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
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
