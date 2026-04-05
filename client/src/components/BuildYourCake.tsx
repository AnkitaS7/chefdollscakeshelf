/* =============================================================
   BuildYourCake — Interactive cake builder section
   Design: Step-by-step selector with live preview summary
   ============================================================= */

import { useEffect, useRef, useState } from "react";

const sizes = [
  { label: "6 inch", serves: "Serves 8-10", price: 800, emoji: "🎂" },
  { label: "8 inch", serves: "Serves 12-15", price: 1200, emoji: "🎂" },
  { label: "10 inch", serves: "Serves 18-22", price: 1800, emoji: "🎂" },
  { label: "2-Tier", serves: "Serves 25-30", price: 2800, emoji: "🎂" },
];

const flavors = [
  { label: "Vanilla Bean", emoji: "🍦", color: "oklch(0.95 0.03 80)" },
  { label: "Chocolate Truffle", emoji: "🍫", color: "oklch(0.40 0.08 40)" },
  { label: "Strawberry", emoji: "🍓", color: "oklch(0.75 0.12 10)" },
  { label: "Red Velvet", emoji: "❤️", color: "oklch(0.55 0.15 15)" },
  { label: "Lemon Zest", emoji: "🍋", color: "oklch(0.90 0.12 95)" },
  { label: "Butterscotch", emoji: "🧈", color: "oklch(0.85 0.1 70)" },
];

const frostings = [
  { label: "Whipped Cream", emoji: "🤍" },
  { label: "Buttercream", emoji: "💛" },
  { label: "Fondant", emoji: "🌸" },
  { label: "Ganache", emoji: "🍫" },
];

const decorations = [
  { label: "Fresh Flowers", emoji: "🌸" },
  { label: "Gold Leaf", emoji: "✨" },
  { label: "Macarons", emoji: "🍬" },
  { label: "Edible Glitter", emoji: "💫" },
  { label: "Custom Message", emoji: "✍️" },
  { label: "Fruit Topping", emoji: "🍓" },
];

export default function BuildYourCake() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(frostings[0]);
  const [selectedDecorations, setSelectedDecorations] = useState<string[]>([]);

  const toggleDecoration = (label: string) => {
    setSelectedDecorations(prev =>
      prev.includes(label) ? prev.filter(d => d !== label) : [...prev, label]
    );
  };

  const totalPrice = selectedSize.price + selectedDecorations.length * 150;

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

  const buildWhatsAppMsg = () => {
    const msg = `Hi Dhvani! I'd like to build a custom cake from ChefDollsCakeShelf.%0A%0A🎂 *My Cake Design:*%0A• Size: ${selectedSize.label} (${selectedSize.serves})%0A• Flavor: ${selectedFlavor.label}%0A• Frosting: ${selectedFrosting.label}%0A• Decorations: ${selectedDecorations.length > 0 ? selectedDecorations.join(", ") : "None"}%0A• Estimated Budget: ₹${totalPrice}+%0A%0APlease let me know availability and final pricing!`;
    window.open(`https://wa.me/919999999999?text=${msg}`, "_blank");
  };

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
        <div ref={headRef} className="reveal text-center mb-12">
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
              Dream Cake
            </em>
          </h2>
          <p
            className="text-base max-w-lg mx-auto"
            style={{
              color: "oklch(0.50 0.04 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            Mix and match to create your perfect cake. Once you're happy, send
            it directly to Dhvani via WhatsApp!
          </p>
          <div className="ornament-line mt-4 max-w-xs mx-auto">
            <span className="text-amber-400 text-sm">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Size */}
            <BuildStep title="1. Choose Your Size" emoji="📏">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sizes.map(s => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(s)}
                    className="p-3 rounded-2xl text-center transition-all duration-200 hover:scale-105"
                    style={{
                      background:
                        selectedSize.label === s.label
                          ? "oklch(0.65 0.12 10)"
                          : "white",
                      border: `2px solid ${selectedSize.label === s.label ? "oklch(0.65 0.12 10)" : "oklch(0.88 0.04 60)"}`,
                      boxShadow:
                        selectedSize.label === s.label
                          ? "0 4px 15px oklch(0.65 0.12 10 / 0.3)"
                          : "none",
                    }}
                  >
                    <p className="text-xl mb-1">{s.emoji}</p>
                    <p
                      className="text-sm font-semibold"
                      style={{
                        color:
                          selectedSize.label === s.label
                            ? "white"
                            : "oklch(0.35 0.05 30)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {s.label}
                    </p>
                    <p
                      className="text-xs"
                      style={{
                        color:
                          selectedSize.label === s.label
                            ? "white/80"
                            : "oklch(0.55 0.04 30)",
                        fontFamily: "var(--font-body)",
                        opacity: selectedSize.label === s.label ? 0.85 : 1,
                      }}
                    >
                      {s.serves}
                    </p>
                    <p
                      className="text-xs font-bold mt-1"
                      style={{
                        color:
                          selectedSize.label === s.label
                            ? "oklch(0.95 0.04 60)"
                            : "oklch(0.55 0.12 10)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      ₹{s.price}+
                    </p>
                  </button>
                ))}
              </div>
            </BuildStep>

            {/* Flavor */}
            <BuildStep title="2. Pick Your Flavor" emoji="🍰">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {flavors.map(f => (
                  <button
                    key={f.label}
                    onClick={() => setSelectedFlavor(f)}
                    className="p-3 rounded-2xl text-left flex items-center gap-3 transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background:
                        selectedFlavor.label === f.label
                          ? "oklch(0.95 0.04 10)"
                          : "white",
                      border: `2px solid ${selectedFlavor.label === f.label ? "oklch(0.65 0.12 10)" : "oklch(0.88 0.04 60)"}`,
                    }}
                  >
                    <span className="text-xl">{f.emoji}</span>
                    <span
                      className="text-sm font-medium"
                      style={{
                        color:
                          selectedFlavor.label === f.label
                            ? "oklch(0.45 0.1 10)"
                            : "oklch(0.40 0.05 30)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {f.label}
                    </span>
                  </button>
                ))}
              </div>
            </BuildStep>

            {/* Frosting */}
            <BuildStep title="3. Choose Frosting" emoji="🎂">
              <div className="flex flex-wrap gap-3">
                {frostings.map(f => (
                  <button
                    key={f.label}
                    onClick={() => setSelectedFrosting(f)}
                    className="px-4 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105"
                    style={{
                      background:
                        selectedFrosting.label === f.label
                          ? "linear-gradient(135deg, oklch(0.65 0.12 10), oklch(0.72 0.1 5))"
                          : "white",
                      border: `2px solid ${selectedFrosting.label === f.label ? "oklch(0.65 0.12 10)" : "oklch(0.88 0.04 60)"}`,
                      color:
                        selectedFrosting.label === f.label
                          ? "white"
                          : "oklch(0.40 0.05 30)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {f.emoji} {f.label}
                  </button>
                ))}
              </div>
            </BuildStep>

            {/* Decorations */}
            <BuildStep title="4. Add Decorations" emoji="✨">
              <div className="flex flex-wrap gap-3">
                {decorations.map(d => {
                  const selected = selectedDecorations.includes(d.label);
                  return (
                    <button
                      key={d.label}
                      onClick={() => toggleDecoration(d.label)}
                      className="px-4 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105"
                      style={{
                        background: selected
                          ? "linear-gradient(135deg, oklch(0.72 0.12 70), oklch(0.82 0.1 75))"
                          : "white",
                        border: `2px solid ${selected ? "oklch(0.72 0.12 70)" : "oklch(0.88 0.04 60)"}`,
                        color: selected
                          ? "oklch(0.22 0.04 40)"
                          : "oklch(0.40 0.05 30)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {d.emoji} {d.label}
                      {selected && <span className="text-xs">+₹150</span>}
                    </button>
                  );
                })}
              </div>
            </BuildStep>
          </div>

          {/* Summary */}
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
                Your Cake Summary 🎂
              </h3>

              <div className="space-y-3 mb-6">
                <SummaryRow
                  label="Size"
                  value={`${selectedSize.label} (${selectedSize.serves})`}
                />
                <SummaryRow
                  label="Flavor"
                  value={`${selectedFlavor.emoji} ${selectedFlavor.label}`}
                />
                <SummaryRow
                  label="Frosting"
                  value={`${selectedFrosting.emoji} ${selectedFrosting.label}`}
                />
                <SummaryRow
                  label="Decorations"
                  value={
                    selectedDecorations.length > 0
                      ? selectedDecorations.join(", ")
                      : "None selected"
                  }
                />
              </div>

              <div
                className="rounded-2xl p-4 mb-5 text-center"
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

              <button
                onClick={buildWhatsAppMsg}
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
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildStep({
  title,
  emoji,
  children,
}: {
  title: string;
  emoji: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-3xl p-6"
      style={{
        background: "white",
        border: "1px solid oklch(0.92 0.03 60)",
        boxShadow: "0 2px 12px oklch(0.65 0.12 10 / 0.05)",
      }}
    >
      <h3
        className="font-display text-lg font-semibold mb-4"
        style={{ color: "oklch(0.28 0.05 30)" }}
      >
        {emoji} {title}
      </h3>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-2">
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
