/* =============================================================
   ContactSection — Order inquiry form + social CTAs
   Design: Split layout with form and contact info
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Instagram,
  MessageCircle,
  Send,
  CheckCircle,
} from "lucide-react";

const cakeTypes = [
  "Custom Cake",
  "Birthday Cake",
  "Wedding Cake",
  "Anniversary Cake",
  "Cupcake Box",
  "Baby Shower Cake",
  "Engagement Cake",
  "Other",
];

const occasions = [
  "Birthday",
  "Wedding",
  "Anniversary",
  "Baby Shower",
  "Engagement",
  "Corporate Event",
  "Festival",
  "Just Because",
  "Other",
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    cakeType: "",
    occasion: "",
    message: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message
    const msg = `Hi Dhvani! I'd like to order a cake from ChefDollsCakeShelf.%0A%0A*Name:* ${form.name}%0A*Phone:* ${form.phone}%0A*Cake Type:* ${form.cakeType}%0A*Occasion:* ${form.occasion}%0A*Message:* ${form.message}`;
    window.open(`https://wa.me/919999999999?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputStyle = {
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "oklch(0.98 0.015 60)" }}
    >
      {/* Background */}
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
        {/* Header */}
        <div ref={headRef} className="reveal text-center mb-14">
          <p
            className="font-script text-2xl mb-1"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            Let's Connect
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold mb-3"
            style={{ color: "oklch(0.22 0.04 40)" }}
          >
            Order Your
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
            Fill out the form below and we'll get back to you within 24 hours.
            Or reach out directly via WhatsApp or Instagram!
          </p>
          <div className="ornament-line mt-4 max-w-xs mx-auto">
            <span className="text-amber-400 text-sm">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-3xl p-6 md:p-8"
              style={{
                background: "white",
                border: "1px solid oklch(0.92 0.03 60)",
                boxShadow: "0 8px 40px oklch(0.65 0.12 10 / 0.08)",
              }}
            >
              {submitted ? (
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
                    Message Sent! 🎂
                  </h3>
                  <p
                    className="text-center text-sm"
                    style={{
                      color: "oklch(0.50 0.04 30)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Your order inquiry has been sent to WhatsApp. Dhvani will
                    get back to you within 24 hours!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-sm font-semibold mb-1.5"
                        style={{
                          color: "oklch(0.35 0.06 30)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={form.name}
                        onChange={e =>
                          setForm({ ...form, name: e.target.value })
                        }
                        style={inputStyle}
                        onFocus={e =>
                          (e.target.style.borderColor = "oklch(0.65 0.12 10)")
                        }
                        onBlur={e =>
                          (e.target.style.borderColor = "oklch(0.88 0.04 60)")
                        }
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold mb-1.5"
                        style={{
                          color: "oklch(0.35 0.06 30)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={e =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        style={inputStyle}
                        onFocus={e =>
                          (e.target.style.borderColor = "oklch(0.65 0.12 10)")
                        }
                        onBlur={e =>
                          (e.target.style.borderColor = "oklch(0.88 0.04 60)")
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-sm font-semibold mb-1.5"
                        style={{
                          color: "oklch(0.35 0.06 30)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        Cake Type *
                      </label>
                      <select
                        required
                        value={form.cakeType}
                        onChange={e =>
                          setForm({ ...form, cakeType: e.target.value })
                        }
                        style={{ ...inputStyle, appearance: "none" }}
                        onFocus={e =>
                          (e.target.style.borderColor = "oklch(0.65 0.12 10)")
                        }
                        onBlur={e =>
                          (e.target.style.borderColor = "oklch(0.88 0.04 60)")
                        }
                      >
                        <option value="">Select cake type</option>
                        {cakeTypes.map(t => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold mb-1.5"
                        style={{
                          color: "oklch(0.35 0.06 30)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        Occasion *
                      </label>
                      <select
                        required
                        value={form.occasion}
                        onChange={e =>
                          setForm({ ...form, occasion: e.target.value })
                        }
                        style={{ ...inputStyle, appearance: "none" }}
                        onFocus={e =>
                          (e.target.style.borderColor = "oklch(0.65 0.12 10)")
                        }
                        onBlur={e =>
                          (e.target.style.borderColor = "oklch(0.88 0.04 60)")
                        }
                      >
                        <option value="">Select occasion</option>
                        {occasions.map(o => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{
                        color: "oklch(0.35 0.06 30)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Tell Us About Your Dream Cake
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your cake — flavors, design ideas, number of tiers, delivery date, budget..."
                      value={form.message}
                      onChange={e =>
                        setForm({ ...form, message: e.target.value })
                      }
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: "100px",
                      }}
                      onFocus={e =>
                        (e.target.style.borderColor = "oklch(0.65 0.12 10)")
                      }
                      onBlur={e =>
                        (e.target.style.borderColor = "oklch(0.88 0.04 60)")
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-pink py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <Send className="w-4 h-4" />
                    Send My Order Inquiry via WhatsApp
                  </button>

                  <p
                    className="text-center text-xs"
                    style={{
                      color: "oklch(0.60 0.04 30)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    This will open WhatsApp with your inquiry pre-filled. We
                    respond within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Info card */}
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
                      href="https://wa.me/919999999999"
                      className="text-sm hover:underline"
                      style={{
                        color: "oklch(0.55 0.15 140)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      +91 99999 99999
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

            {/* Quick order buttons */}
            <div className="space-y-3">
              <a
                href="https://wa.me/919999999999?text=Hi%20Dhvani!%20I%20would%20like%20to%20order%20a%20cake."
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
                Order via WhatsApp
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

            {/* Note */}
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
                <strong>📅 Booking Note:</strong> Please book at least{" "}
                <strong>3 days in advance</strong> for regular cakes. For
                wedding and multi-tier cakes, we recommend{" "}
                <strong>2+ weeks advance booking</strong> to ensure the best
                quality and availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
