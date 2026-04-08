import type { ProductType } from "./types";

export default function StepDecorations({
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
  const hasCustomMessage = selected.includes("Custom Message Card");

  return (
    <div className="flex-1 flex flex-col gap-5">
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

      {hasCustomMessage && (
        <div
          className="rounded-2xl px-4 py-3 flex flex-col gap-2"
          style={{
            background: "oklch(0.97 0.03 70)",
            border: `1.5px solid ${accentColor}`,
            animation: "fadeSlideIn 0.22s ease",
          }}
        >
          <label
            className="text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5"
            style={{ color: accentColor, fontFamily: "var(--font-body)" }}
          >
            ✍️ What should the message say?
          </label>
          <input
            type="text"
            value={message}
            onChange={e => onMessage(e.target.value)}
            placeholder="e.g. Happy Birthday Priya! 🎂"
            maxLength={60}
            className="w-full rounded-xl px-3 py-2 text-sm outline-none transition-all duration-200"
            style={{
              border: "1.5px solid oklch(0.88 0.04 60)",
              fontFamily: "var(--font-body)",
              color: "oklch(0.35 0.05 30)",
              background: "white",
            }}
            onFocus={e => (e.target.style.borderColor = accentColor)}
            onBlur={e => (e.target.style.borderColor = "oklch(0.88 0.04 60)")}
            autoFocus
          />
          <p
            className="text-xs text-right"
            style={{
              color: "oklch(0.65 0.04 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            {message.length}/60 characters
          </p>
        </div>
      )}

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
