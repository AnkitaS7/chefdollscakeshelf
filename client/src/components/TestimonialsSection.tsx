/* =============================================================
   TestimonialsSection - Real customer reviews from WhatsApp
   All reviews extracted from actual customer conversations
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Happy Customer",
    source: "WhatsApp Review",
    rating: 5,
    text: "The cake was super awesome - everyone liked it very much, super soft and moist. The way I wanted, you made exactly the same. Thank you so much! 😊",
    occasion: "Custom Cake",
    avatar: "🌸",
    avatarColor: "oklch(0.82 0.08 340)",
  },
  {
    name: "Disha Doshi",
    source: "WhatsApp Review",
    rating: 5,
    text: "The cake was amazing. My fiancé loved the cake. Will definitely recommend you.",
    occasion: "Engagement Cake",
    avatar: "💕",
    avatarColor: "oklch(0.78 0.10 10)",
  },
  {
    name: "Shraddha",
    source: "WhatsApp Review",
    rating: 5,
    text: "We all loved it. Damn yummy. You nailed it! 🔥🎉",
    occasion: "Celebration Cake",
    avatar: "🎉",
    avatarColor: "oklch(0.75 0.10 60)",
  },
  {
    name: "Bhakti Dedhia",
    source: "WhatsApp Review",
    rating: 5,
    text: "Very tasty cake, loved the black forest flavour 😘 Theme precision also very appropriate ❤️",
    occasion: "Black Forest Cake",
    avatar: "🍰",
    avatarColor: "oklch(0.72 0.10 200)",
  },
  {
    name: "Akshay Doshi",
    source: "WhatsApp Review",
    rating: 5,
    text: "Masst tha! I don't like cakes much - but I liked this one. That honestly says everything!",
    occasion: "Anniversary Cake",
    avatar: "✨",
    avatarColor: "oklch(0.70 0.12 280)",
  },
  {
    name: "Khyati Maru",
    source: "WhatsApp Review",
    rating: 5,
    text: "Everybody absolutely loved the cake! It was really delicious and yumm. A lot more orders are coming your way from everyone in my family 💯 The cake was bang on perfect!",
    occasion: "Family Celebration",
    avatar: "💖",
    avatarColor: "oklch(0.75 0.10 10)",
  },
  {
    name: "Forum Furia",
    source: "WhatsApp Review",
    rating: 5,
    text: "Couldn't imagine that my favourite flavour can be eaten too! The Chai cake is superb. I could actually say 'adrak elaichi wali chai khila do yaar'. It's super delicious! Thanks a ton 😘",
    occasion: "Chai Flavour Cake",
    avatar: "☕",
    avatarColor: "oklch(0.72 0.10 50)",
  },
  {
    name: "Paras Shethiya",
    source: "WhatsApp Review",
    rating: 5,
    text: "Amazinggg cake hai yaar! Chai cake socha nahi tha itna mast hoga. Chai cake was a hit!! Sab bol rahe hai ki chai cake aur zyada bolna tha 😂",
    occasion: "Chai Cake",
    avatar: "🎂",
    avatarColor: "oklch(0.68 0.12 10)",
  },
  {
    name: "Avani",
    source: "Instagram DM",
    rating: 5,
    text: "Very tasty and soft cake. To my surprise, the chai flavour was a bit of a hit! Everyone loved it a lot. Biscoff too was very soft. Thanks.",
    occasion: "Chai & Biscoff Cakes",
    avatar: "🌟",
    avatarColor: "oklch(0.78 0.10 70)",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  const navigate = (dir: "prev" | "next") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(prev =>
        dir === "next"
          ? (prev + 1) % testimonials.length
          : (prev - 1 + testimonials.length) % testimonials.length
      );
      setIsAnimating(false);
    }, 200);
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => navigate("next"), 5000);
    return () => clearInterval(interval);
  }, [paused]);

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

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-14 md:py-20 relative overflow-hidden"
      style={{ background: "oklch(0.98 0.015 60)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 right-0 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: "oklch(0.88 0.05 10)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-15"
          style={{ background: "oklch(0.78 0.1 70)" }}
        />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headRef} className="reveal text-center mb-10">
          <p
            className="font-script text-2xl mb-1"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            What They Say
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold mb-2"
            style={{ color: "oklch(0.22 0.04 40)" }}
          >
            Straight from the Heart
          </h2>
          <p
            className="text-sm max-w-md mx-auto"
            style={{
              color: "oklch(0.50 0.04 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            Real words from real customers - unfiltered, unedited, and full of
            love.
          </p>
          <div className="ornament-line mt-4 max-w-xs mx-auto">
            <span className="text-amber-400 text-sm">✦</span>
          </div>
        </div>

        {/* Main testimonial card */}
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-3xl p-7 md:p-10 relative transition-opacity duration-200"
            style={{
              background: "white",
              border: "1px solid oklch(0.92 0.03 60)",
              boxShadow: "0 8px 40px oklch(0.65 0.12 10 / 0.1)",
              opacity: isAnimating ? 0 : 1,
            }}
          >
            {/* Quote icon */}
            <div
              className="absolute -top-5 left-10 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.12 10), oklch(0.72 0.1 5))",
              }}
            >
              <Quote className="w-5 h-5 text-white" fill="white" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="text-amber-400 text-base">
                  ★
                </span>
              ))}
            </div>

            {/* Review text */}
            <p
              className="font-display text-lg md:text-xl font-medium leading-relaxed mb-6 italic"
              style={{ color: "oklch(0.32 0.05 30)" }}
            >
              "{t.text}"
            </p>

            {/* Reviewer */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-xl shadow-sm"
                  style={{ background: t.avatarColor + "33" }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{
                      color: "oklch(0.28 0.05 30)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color: "oklch(0.55 0.04 30)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {t.source}
                  </p>
                </div>
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "oklch(0.95 0.03 20)",
                  color: "oklch(0.50 0.08 10)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {t.occasion}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => navigate("prev")}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "white",
                border: "1px solid oklch(0.88 0.04 60)",
                boxShadow: "0 2px 8px oklch(0.65 0.12 10 / 0.1)",
                color: "oklch(0.45 0.08 10)",
              }}
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrent(i);
                    setPaused(true);
                    setTimeout(() => setPaused(false), 6000);
                  }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "20px" : "7px",
                    height: "7px",
                    background:
                      i === current
                        ? "oklch(0.65 0.12 10)"
                        : "oklch(0.85 0.04 20)",
                  }}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => navigate("next")}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "white",
                border: "1px solid oklch(0.88 0.04 60)",
                boxShadow: "0 2px 8px oklch(0.65 0.12 10 / 0.1)",
                color: "oklch(0.45 0.08 10)",
              }}
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mini preview cards - show 4 at a time */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-2xl mx-auto">
          {testimonials.slice(0, 4).map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i);
                setPaused(true);
                setTimeout(() => setPaused(false), 6000);
              }}
              className="rounded-xl p-3 text-left transition-all duration-200 hover:shadow-md"
              style={{
                background: current === i ? "oklch(0.95 0.03 20)" : "white",
                border: `1px solid ${current === i ? "oklch(0.75 0.08 10)" : "oklch(0.92 0.03 60)"}`,
              }}
            >
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-xs">
                    ★
                  </span>
                ))}
              </div>
              <p
                className="text-xs font-semibold truncate"
                style={{
                  color: "oklch(0.35 0.05 30)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {item.name}
              </p>
              <p
                className="text-xs truncate"
                style={{
                  color: "oklch(0.55 0.04 30)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {item.occasion}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
