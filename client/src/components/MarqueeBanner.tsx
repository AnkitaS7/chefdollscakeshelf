/* =============================================================
   MarqueeBanner - Scrolling brand message strip
   Design: Gold gradient band with continuous scroll
   ============================================================= */

const items = [
  "🎂 100% Eggless",
  "✨ Made Fresh to Order",
  "🌸 Custom Designs",
  "💛 Premium Ingredients",
  "🎀 Handmade with Love",
  "📍 Borivali Delivery",
  "⭐ 5-Star Rated",
  "🌿 Always Eggless",
  "🎉 Celebrations Made Special",
];

export default function MarqueeBanner() {
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden py-3 relative"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.28 0.05 30), oklch(0.22 0.04 40))",
      }}
    >
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          animation: "marquee 30s linear infinite",
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-sm font-semibold flex items-center gap-2"
            style={{
              color: "oklch(0.90 0.04 60)",
              fontFamily: "var(--font-body)",
            }}
          >
            {item}
            <span
              className="inline-block w-1.5 h-1.5 rounded-full ml-4"
              style={{ background: "oklch(0.78 0.1 70)" }}
            />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
