/* =============================================================
   ContactSection - General inquiry OR leave a review
   Design: Split layout with tabbed form and contact info
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Instagram,
  MessageCircle,
  HelpCircle,
  CheckCircle,
  Star,
} from "lucide-react";

/* ─── Static data ────────────────────────────────────────────── */
const inquiryTopics = [
  "Cake Availability",
  "Pricing & Quotes",
  "Custom Design Options",
  "Allergens & Dietary Needs",
  "Delivery & Pickup",
  "Turnaround Times",
  "Event Collaboration",
  "Something Else",
] as const;

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"] as const;

/* ─── Types ──────────────────────────────────────────────────── */
type Mode = "inquiry" | "review";

interface InquiryFormState {
  name: string;
  email: string;
  phone: string;
  topic: string;
  question: string;
}

interface ReviewFormState {
  name: string;
  rating: number;
  hoverRating: number;
  cakeOrdered: string;
  review: string;
}

const EMPTY_INQUIRY: InquiryFormState = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  question: "",
};

const EMPTY_REVIEW: ReviewFormState = {
  name: "",
  rating: 0,
  hoverRating: 0,
  cakeOrdered: "",
  review: "",
};

/* ─── Shared input style ─────────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem",
  border: "1.5px solid oklch(0.88 0.04 60)",
  background: "oklch(0.99 0.01 80)",
  color: "oklch(0.28 0.05 30)",
  fontFamily: "var(--font-body)",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const focusColor = "oklch(0.65 0.12 10)";
const blurColor = "oklch(0.88 0.04 60)";

const onFocus = (e: React.FocusEvent<HTMLElement>) =>
  ((e.target as HTMLElement).style.borderColor = focusColor);
const onBlur = (e: React.FocusEvent<HTMLElement>) =>
  ((e.target as HTMLElement).style.borderColor = blurColor);

/* ─── Label helper ───────────────────────────────────────────── */
const Label: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({
  htmlFor,
  children,
}) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-semibold mb-1.5"
    style={{ color: "oklch(0.35 0.06 30)", fontFamily: "var(--font-body)" }}
  >
    {children}
  </label>
);

/* ═══════════════════════════════════════════════════════════════
   INQUIRY FORM
   Purpose: let someone ask a question or explore options.
   Fields: name, email (required), phone (optional),
           topic (what they're asking about), free-text question.
═══════════════════════════════════════════════════════════════ */
const InquiryForm: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const [form, setForm] = useState<InquiryFormState>(EMPTY_INQUIRY);

  const set =
    (key: keyof InquiryFormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const topicLine = form.topic ? `%0A*Topic:* ${form.topic}` : "";
    const emailLine = form.email ? `%0A*Email:* ${form.email}` : "";
    const phoneLine = form.phone ? `%0A*Phone:* ${form.phone}` : "";

    const msg =
      `Hi! I have a question for ChefDollsCakeShelf.` +
      `%0A%0A*Name:* ${form.name}` +
      emailLine +
      phoneLine +
      topicLine +
      `%0A%0A*Question:*%0A${encodeURIComponent(form.question)}`;

    window.open(`https://wa.me/919867390830?text=${msg}`, "_blank");
    onSubmit();
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "none",
    cursor: "pointer",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1rem center",
    paddingRight: "2.5rem",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <Label htmlFor="inq-name">Your Name *</Label>
        <input
          id="inq-name"
          type="text"
          required
          placeholder="e.g. Priya Sharma"
          value={form.name}
          onChange={set("name")}
          style={inputStyle}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="inq-email">Email Address *</Label>
          <input
            id="inq-email"
            type="email"
            required
            placeholder="priya@example.com"
            value={form.email}
            onChange={set("email")}
            style={inputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
        <div>
          <Label htmlFor="inq-phone">
            Phone{" "}
            <span
              style={{
                fontWeight: 400,
                fontSize: "0.75rem",
                color: "oklch(0.55 0.04 30)",
              }}
            >
              (optional)
            </span>
          </Label>
          <input
            id="inq-phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={set("phone")}
            style={inputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      </div>

      {/* Topic */}
      <div>
        <Label htmlFor="inq-topic">What's Your Inquiry About? *</Label>
        <select
          id="inq-topic"
          required
          value={form.topic}
          onChange={set("topic")}
          style={selectStyle}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <option value="">Select a topic…</option>
          {inquiryTopics.map(t => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Free-text question */}
      <div>
        <Label htmlFor="inq-question">Your Question *</Label>
        <textarea
          id="inq-question"
          required
          rows={4}
          placeholder="Ask us anything - about availability, what we can make, ingredients, lead times, pricing, or anything else on your mind…"
          value={form.question}
          onChange={set("question")}
          style={{ ...inputStyle, resize: "vertical", minHeight: "110px" }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      <button
        type="submit"
        className="w-full btn-pink py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <HelpCircle className="w-4 h-4" />
        Send My Inquiry via WhatsApp
      </button>

      <p
        className="text-center text-xs"
        style={{ color: "oklch(0.60 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        This opens WhatsApp with your question pre-filled. We typically respond
        within a few hours.
      </p>
    </form>
  );
};

/* ═══════════════════════════════════════════════════════════════
   REVIEW FORM
═══════════════════════════════════════════════════════════════ */
const ReviewForm: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const [form, setForm] = useState<ReviewFormState>(EMPTY_REVIEW);

  const set =
    (key: keyof ReviewFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0) return;

    const stars = "⭐".repeat(form.rating);
    const msg =
      `Hi! I'd love to leave a review for ChefDollsCakeShelf 🎂` +
      `%0A%0A*Name:* ${form.name}` +
      `%0A*Cake Ordered:* ${form.cakeOrdered}` +
      `%0A*Rating:* ${stars} (${form.rating}/5)` +
      `%0A*Review:* ${encodeURIComponent(form.review)}`;

    window.open(`https://wa.me/919867390830?text=${msg}`, "_blank");
    onSubmit();
  };

  const starActive = "oklch(0.72 0.18 70)";
  const starInactive = "oklch(0.88 0.04 60)";
  const displayRating = form.hoverRating || form.rating;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <Label htmlFor="rev-name">Your Name *</Label>
        <input
          id="rev-name"
          type="text"
          required
          placeholder="e.g. Meera Patel"
          value={form.name}
          onChange={set("name")}
          style={inputStyle}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      {/* Cake ordered */}
      <div>
        <Label htmlFor="rev-cake">Cake You Ordered *</Label>
        <input
          id="rev-cake"
          type="text"
          required
          placeholder="e.g. 3-tier wedding cake, Red velvet cupcakes…"
          value={form.cakeOrdered}
          onChange={set("cakeOrdered")}
          style={inputStyle}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      {/* Star rating */}
      <div>
        <p
          className="block text-sm font-semibold mb-2"
          style={{
            color: "oklch(0.35 0.06 30)",
            fontFamily: "var(--font-body)",
          }}
        >
          Your Rating *{" "}
          {displayRating > 0 && (
            <span className="font-normal ml-1" style={{ color: starActive }}>
              - {STAR_LABELS[displayRating]}
            </span>
          )}
        </p>
        <div className="flex gap-2" role="group" aria-label="Star rating">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onClick={() => setForm(f => ({ ...f, rating: n }))}
              onMouseEnter={() => setForm(f => ({ ...f, hoverRating: n }))}
              onMouseLeave={() => setForm(f => ({ ...f, hoverRating: 0 }))}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                transition: "transform 0.15s",
                transform: displayRating >= n ? "scale(1.18)" : "scale(1)",
              }}
            >
              <Star
                className="w-8 h-8"
                style={{
                  fill: displayRating >= n ? starActive : "transparent",
                  stroke: displayRating >= n ? starActive : starInactive,
                  transition: "fill 0.15s, stroke 0.15s",
                }}
              />
            </button>
          ))}
        </div>
        {/* Hidden required input so the browser catches a missing rating */}
        <input
          type="number"
          required
          min={1}
          max={5}
          value={form.rating || ""}
          onChange={() => {}}
          tabIndex={-1}
          aria-hidden="true"
          style={{
            position: "absolute",
            opacity: 0,
            pointerEvents: "none",
            width: 1,
            height: 1,
          }}
        />
      </div>

      {/* Review text */}
      <div>
        <Label htmlFor="rev-text">Your Review *</Label>
        <textarea
          id="rev-text"
          required
          rows={4}
          placeholder="Tell us about your experience - taste, design, delivery, anything that stood out…"
          value={form.review}
          onChange={set("review")}
          style={{ ...inputStyle, resize: "vertical", minHeight: "110px" }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      <button
        type="submit"
        className="w-full btn-pink py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <Star className="w-4 h-4" />
        Submit Review via WhatsApp
      </button>

      <p
        className="text-center text-xs"
        style={{ color: "oklch(0.60 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        Your review will be sent via WhatsApp and may be shared on our page with
        your permission.
      </p>
    </form>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SUCCESS STATE
═══════════════════════════════════════════════════════════════ */
const SuccessState: React.FC<{ mode: Mode }> = ({ mode }) => (
  <div className="flex flex-col items-center justify-center py-12 gap-4">
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center"
      style={{ background: "oklch(0.94 0.05 140)" }}
    >
      <CheckCircle
        className="w-8 h-8"
        style={{ color: "oklch(0.55 0.15 140)" }}
      />
    </div>
    <h3
      className="font-display text-2xl font-semibold"
      style={{ color: "oklch(0.28 0.05 30)" }}
    >
      {mode === "inquiry" ? "Inquiry Sent! 💬" : "Review Submitted! ⭐"}
    </h3>
    <p
      className="text-center text-sm max-w-xs"
      style={{ color: "oklch(0.50 0.04 30)", fontFamily: "var(--font-body)" }}
    >
      {mode === "inquiry"
        ? "Your question has been sent via WhatsApp. We'll get back to you within a few hours!"
        : "Thank you so much for taking the time to share your experience. It means the world to us! 🎂"}
    </p>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<Mode>("inquiry");
  const [submitted, setSubmitted] = useState(false);

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

  const switchMode = (next: Mode) => {
    setMode(next);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "0.6rem 1rem",
    borderRadius: "0.625rem",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    fontSize: "0.85rem",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    transition: "all 0.22s ease",
    background: active ? "oklch(0.55 0.14 10)" : "transparent",
    color: active ? "white" : "oklch(0.45 0.06 30)",
    boxShadow: active ? "0 4px 14px oklch(0.55 0.14 10 / 0.3)" : "none",
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "oklch(0.98 0.015 60)" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "oklch(0.88 0.05 10)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: "oklch(0.78 0.1 70)" }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.78 0.1 70), transparent)",
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <div ref={headRef} className="reveal text-center mb-14">
          <p
            className="font-script text-2xl mb-1"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            {mode === "inquiry"
              ? "We're Here to Help"
              : "We'd Love to Hear from You"}
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold mb-3"
            style={{ color: "oklch(0.22 0.04 40)" }}
          >
            {mode === "inquiry" ? (
              <>
                Got a{" "}
                <em
                  style={{ color: "oklch(0.55 0.12 10)", fontStyle: "italic" }}
                >
                  Question?
                </em>
              </>
            ) : (
              <>
                Share Your{" "}
                <em
                  style={{ color: "oklch(0.55 0.12 10)", fontStyle: "italic" }}
                >
                  Experience
                </em>
              </>
            )}
          </h2>
          <p
            className="text-base max-w-lg mx-auto"
            style={{
              color: "oklch(0.50 0.04 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            {mode === "inquiry"
              ? "Curious about what we make, pricing, ingredients, or availability? Send us a message and we'll get back to you."
              : "Loved your cake? We'd be so grateful to hear about it. Your review helps other customers and means the world to us!"}
          </p>
          <div className="ornament-line mt-4 max-w-xs mx-auto">
            <span className="text-amber-400 text-sm">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form card */}
          <div className="lg:col-span-3">
            <div
              className="rounded-3xl p-6 md:p-8"
              style={{
                background: "white",
                border: "1px solid oklch(0.92 0.03 60)",
                boxShadow: "0 8px 40px oklch(0.65 0.12 10 / 0.08)",
              }}
            >
              {/* Mode toggle tabs */}
              {!submitted && (
                <div
                  className="flex gap-1.5 mb-7 p-1.5 rounded-xl"
                  style={{
                    background: "oklch(0.96 0.02 60)",
                    border: "1px solid oklch(0.91 0.03 60)",
                  }}
                  role="tablist"
                  aria-label="Select form type"
                >
                  <button
                    role="tab"
                    aria-selected={mode === "inquiry"}
                    style={tabStyle(mode === "inquiry")}
                    onClick={() => switchMode("inquiry")}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    Send an Inquiry
                  </button>
                  <button
                    role="tab"
                    aria-selected={mode === "review"}
                    style={tabStyle(mode === "review")}
                    onClick={() => switchMode("review")}
                  >
                    <Star className="w-3.5 h-3.5" />
                    Leave a Review
                  </button>
                </div>
              )}

              {submitted ? (
                <SuccessState mode={mode} />
              ) : mode === "inquiry" ? (
                <InquiryForm onSubmit={handleSubmit} />
              ) : (
                <ReviewForm onSubmit={handleSubmit} />
              )}
            </div>
          </div>

          {/* Contact info sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div
              className="rounded-3xl p-6"
              style={{
                background: "white",
                border: "1px solid oklch(0.92 0.03 60)",
                boxShadow: "0 4px 20px oklch(0.65 0.12 10 / 0.06)",
              }}
            >
              <h3
                className="font-display text-xl font-semibold mb-4"
                style={{ color: "oklch(0.28 0.05 30)" }}
              >
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.94 0.05 140)" }}
                  >
                    <MessageCircle
                      className="w-4 h-4"
                      style={{ color: "oklch(0.55 0.15 140)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{
                        color: "oklch(0.35 0.05 30)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/919867390830"
                      className="text-sm hover:underline"
                      style={{
                        color: "oklch(0.55 0.15 140)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      +91 98673 90830
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.94 0.04 320)" }}
                  >
                    <Instagram
                      className="w-4 h-4"
                      style={{ color: "oklch(0.55 0.12 320)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{
                        color: "oklch(0.35 0.05 30)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Instagram
                    </p>
                    <a
                      href="https://www.instagram.com/chefdollscakeshelf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                      style={{
                        color: "oklch(0.55 0.12 320)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      @chefdollscakeshelf
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.95 0.04 10)" }}
                  >
                    <MapPin
                      className="w-4 h-4"
                      style={{ color: "oklch(0.60 0.12 10)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{
                        color: "oklch(0.35 0.05 30)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Location
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        color: "oklch(0.50 0.04 30)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Mumbai, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick contact buttons */}
            <div className="space-y-3">
              <a
                href="https://wa.me/919867390830?text=Hi%21%20I%20have%20a%20question%20about%20ChefDollsCakeShelf."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background: "#25D366",
                  color: "white",
                  fontFamily: "var(--font-body)",
                  boxShadow: "0 4px 15px rgba(37, 211, 102, 0.3)",
                }}
              >
                <span className="text-lg">💬</span>
                Chat on WhatsApp
              </a>
              <a
                href="https://www.instagram.com/chefdollscakeshelf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                  color: "white",
                  fontFamily: "var(--font-body)",
                  boxShadow: "0 4px 15px rgba(220, 39, 67, 0.3)",
                }}
              >
                <Instagram className="w-5 h-5" />
                DM on Instagram
              </a>
            </div>

            {/* Contextual note */}
            <div
              className="rounded-2xl p-4"
              style={{
                background: "oklch(0.97 0.025 60)",
                border: "1px solid oklch(0.90 0.04 60)",
              }}
            >
              <p
                className="text-xs leading-relaxed"
                style={{
                  color: "oklch(0.45 0.06 30)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {mode === "inquiry" ? (
                  <>
                    <strong>💡 Response time:</strong> We typically reply within
                    a few hours on WhatsApp. For complex questions about custom
                    designs or pricing, please allow up to{" "}
                    <strong>24 hours</strong> for a detailed response.
                  </>
                ) : (
                  <>
                    <strong>⭐ Review Note:</strong> Your review will be sent to
                    us via WhatsApp. With your permission, we may feature it on
                    our page or social media as a testimonial. We read every
                    single one - thank you! 🎂
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
