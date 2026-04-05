/* =============================================================
   FloatingParticles — Ambient sparkle and decoration elements
   ============================================================= */

const particles = [
  { emoji: "✨", x: 5, y: 15, delay: 0, duration: 6 },
  { emoji: "🌸", x: 92, y: 25, delay: 1.5, duration: 7 },
  { emoji: "⭐", x: 15, y: 60, delay: 3, duration: 5.5 },
  { emoji: "💫", x: 85, y: 70, delay: 0.8, duration: 8 },
  { emoji: "✦", x: 30, y: 85, delay: 4, duration: 7 },
  { emoji: "🌺", x: 70, y: 90, delay: 1, duration: 5 },
];

export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute text-lg select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0.15,
            animation: `float ${p.duration}s ease-in-out infinite ${p.delay}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
