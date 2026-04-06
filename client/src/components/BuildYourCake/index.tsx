/* =============================================================
   BuildYourCake - Interactive multi-product cake builder
   Tab A: "Build Your Cake" — full multi-step custom builder
   Tab B: "Choose from Menu" — quick 2-step menu order
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import type { OrderState, ProductType } from "./types";
import {
  PRODUCTS,
  CAKE_SIZES, CAKE_FLAVORS, CAKE_FROSTINGS, CAKE_DECORATIONS,
  CUPCAKE_SIZES, CUPCAKE_FLAVORS, CUPCAKE_FROSTINGS, CUPCAKE_DECORATIONS,
  BROWNIE_SIZES, BROWNIE_ADDONS,
  getSteps,
} from "./data";
import ProgressBar from "./ProgressBar";
import StepProduct from "./StepProduct";
import StepSize from "./StepSize";
import StepFlavor from "./StepFlavor";
import StepFrosting from "./StepFrosting";
import StepDecorations from "./StepDecorations";
import StepSummary from "./StepSummary";
import OrderSidebar from "./OrderSidebar";
import MenuOrder from "./MenuOrder";

export default function BuildYourCake() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  // Read ?cake= URL param — if present, open "Choose from Menu" tab with that cake pre-selected
  const urlCake = new URLSearchParams(window.location.search).get("cake") ?? "";
  const [activeTab, setActiveTab] = useState<"build" | "menu">(urlCake ? "menu" : "build");

  // Scroll to this section when arriving from the gallery with a pre-selected cake
  useEffect(() => {
    if (urlCake && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [urlCake]);

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

  const goToStep = (index: number, dir: "forward" | "back" = "forward") => {
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentStepIndex(index);
      setAnimating(false);
    }, 220);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) goToStep(currentStepIndex + 1, "forward");
  };

  const handleBack = () => {
    if (currentStepIndex > 0) goToStep(currentStepIndex - 1, "back");
  };

  const selectProduct = (type: ProductType) => {
    setOrder({ product: type, size: null, flavor: null, frosting: null, decorations: [], addons: [], message: "" });
    goToStep(1, "forward");
  };

  const canProceed = (): boolean => {
    const id = currentStep.id;
    if (id === "product") return order.product !== null;
    if (id === "size") return order.size !== null;
    if (id === "flavor") return order.flavor !== null;
    if (id === "frosting") return order.frosting !== null;
    return true;
  };

  const totalPrice = () => {
    const base = order.size?.price ?? 0;
    if (order.product === "cake") return base + order.decorations.length * 150;
    if (order.product === "cupcake") return base + order.decorations.length * 50;
    if (order.product === "brownie") return base + order.addons.length * 60;
    return 0;
  };

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
          background: "linear-gradient(90deg, transparent, oklch(0.78 0.1 70), transparent)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headRef} className="reveal text-center mb-10">
          <p className="font-script text-2xl mb-1" style={{ color: "oklch(0.72 0.12 70)" }}>
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
            style={{ color: "oklch(0.50 0.04 30)", fontFamily: "var(--font-body)" }}
          >
            Choose your product, customise your way, and send it straight to Dhvani via WhatsApp!
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div
            className="flex rounded-full p-1 gap-1"
            style={{ background: "oklch(0.93 0.02 60)", border: "1px solid oklch(0.88 0.04 60)" }}
          >
            {(["build", "menu"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  background: activeTab === tab
                    ? "linear-gradient(135deg, oklch(0.65 0.12 10), oklch(0.58 0.14 10))"
                    : "transparent",
                  color: activeTab === tab ? "white" : "oklch(0.45 0.06 30)",
                  boxShadow: activeTab === tab ? "0 2px 10px oklch(0.58 0.14 10 / 0.3)" : "none",
                }}
              >
                {tab === "build" ? "🎨 Build Your Cake" : "📋 Choose from Menu"}
              </button>
            ))}
          </div>
        </div>

        {/* Menu order flow */}
        {activeTab === "menu" && (
          <MenuOrder preselectedCake={urlCake} />
        )}

        {/* Custom builder flow */}
        {activeTab === "build" && <>

        {/* Progress bar */}
        <ProgressBar
          steps={steps}
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
              {currentStep.id === "product" && (
                <StepProduct onSelect={selectProduct} selected={order.product} />
              )}

              {currentStep.id === "size" && (
                <StepSize
                  product={order.product!}
                  sizes={
                    order.product === "cake" ? CAKE_SIZES
                    : order.product === "cupcake" ? CUPCAKE_SIZES
                    : BROWNIE_SIZES
                  }
                  selected={order.size}
                  onSelect={s => setOrder(o => ({ ...o, size: s }))}
                />
              )}

              {currentStep.id === "flavor" && (
                <StepFlavor
                  product={order.product!}
                  flavors={order.product === "cupcake" ? CUPCAKE_FLAVORS : CAKE_FLAVORS}
                  selected={order.flavor}
                  onSelect={f => setOrder(o => ({ ...o, flavor: f }))}
                />
              )}

              {currentStep.id === "frosting" && (
                <StepFrosting
                  product={order.product!}
                  frostings={order.product === "cupcake" ? CUPCAKE_FROSTINGS : CAKE_FROSTINGS}
                  selected={order.frosting}
                  onSelect={f => setOrder(o => ({ ...o, frosting: f }))}
                />
              )}

              {currentStep.id === "decorations" && (
                <StepDecorations
                  product={order.product!}
                  items={
                    order.product === "cake" ? CAKE_DECORATIONS
                    : order.product === "cupcake" ? CUPCAKE_DECORATIONS
                    : BROWNIE_ADDONS
                  }
                  selected={order.product === "brownie" ? order.addons : order.decorations}
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

              {currentStep.id === "summary" && (
                <StepSummary order={order} total={totalPrice()} onSend={buildWhatsAppMsg} />
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

        </>}
      </div>
    </section>
  );
}
