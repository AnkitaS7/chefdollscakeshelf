/* =============================================================
   Footer - Brand footer with multi-page navigation links
   Design: Warm dark footer with gold accents
   ============================================================= */

import { Instagram, MapPin, Heart } from "lucide-react";
import { Link } from "wouter";
import brandLogo from "../images/brand-logo.jpg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Order", href: "/order" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "oklch(0.18 0.04 30)" }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.78 0.1 70 / 0.5), transparent)",
        }}
      />

      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: "oklch(0.65 0.12 10)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-8"
          style={{ background: "oklch(0.78 0.1 70)" }}
        />
      </div>

      <div className="container relative z-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src={brandLogo}
                alt="ChefDolls CakeShelf"
                className="h-12 w-12 object-contain rounded-full"
              />
            </div>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{
                color: "oklch(0.70 0.03 40)",
                fontFamily: "var(--font-body)",
              }}
            >
              Mumbai's premium home bakery by Dhvani Hariya. Crafting 100%
              eggless cakes and desserts with love, passion, and the finest
              ingredients.
            </p>
            <div className="flex items-center gap-1.5 mb-4">
              <MapPin
                className="w-4 h-4 flex-shrink-0"
                style={{ color: "oklch(0.72 0.1 10)" }}
              />
              <span
                className="text-sm"
                style={{
                  color: "oklch(0.70 0.03 40)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Mumbai, Maharashtra, India
              </span>
            </div>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/chefdollscakeshelf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background:
                    "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                }}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://wa.me/919867390830"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "#25D366" }}
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-display text-lg font-semibold mb-4"
              style={{ color: "oklch(0.90 0.03 60)" }}
            >
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm transition-colors duration-200 hover:text-rose-300 w-fit"
                  style={{
                    color: "oklch(0.65 0.03 40)",
                    fontFamily: "var(--font-body)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Specialties */}
          <div>
            <h4
              className="font-display text-lg font-semibold mb-4"
              style={{ color: "oklch(0.90 0.03 60)" }}
            >
              Our Specialties
            </h4>
            <div className="flex flex-col gap-2">
              {[
                "Custom Wedding Cakes",
                "Birthday Cakes",
                "Anniversary Cakes",
                "Cupcake Boxes",
                "Baby Shower Cakes",
                "Engagement Cakes",
                "Festival Specials",
                "Corporate Orders",
              ].map(item => (
                <p
                  key={item}
                  className="text-sm"
                  style={{
                    color: "oklch(0.65 0.03 40)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  ✦ {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{ background: "oklch(0.30 0.03 30)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs text-center sm:text-left"
            style={{
              color: "oklch(0.50 0.03 40)",
              fontFamily: "var(--font-body)",
            }}
          >
            © 2025 ChefDollsCakeShelf by Dhvani Hariya. All rights reserved.
          </p>
          <p
            className="text-xs flex items-center gap-1"
            style={{
              color: "oklch(0.50 0.03 40)",
              fontFamily: "var(--font-body)",
            }}
          >
            Made with{" "}
            <Heart className="w-3 h-3 text-rose-400" fill="currentColor" /> in
            Mumbai
          </p>
        </div>
      </div>
    </footer>
  );
}
