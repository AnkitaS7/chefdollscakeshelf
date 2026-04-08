/* =============================================================
   Navbar - Sticky header with multi-page navigation
   Design: Transparent → frosted glass on scroll
   ============================================================= */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import brandLogo from "/brand-logo.jpg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Order", href: "/order" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-rose-100/60"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 group">
              <img
                src={brandLogo}
                alt="ChefDolls CakeShelf Logo"
                className="h-12 w-12 object-contain group-hover:scale-105 transition-transform duration-300 rounded-full"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative group"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    color: isActive(link.href)
                      ? "oklch(0.55 0.12 10)"
                      : "oklch(0.45 0.04 30)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-rose-400 to-amber-400 transition-all duration-300"
                    style={{ width: isActive(link.href) ? "100%" : "0%" }}
                  />
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-rose-400 to-amber-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/order"
                className="hidden md:flex btn-pink px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:scale-105 transition-transform duration-200"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Order Now
              </Link>
              <button
                className="md:hidden p-2 rounded-lg text-rose-700 hover:bg-rose-50 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 pt-20">
            <div className="mb-6">
              <p className="font-script text-2xl text-rose-400">Menu</p>
              <div className="h-px bg-gradient-to-r from-rose-200 to-amber-200 mt-1" />
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-left font-display text-xl py-2 px-3 rounded-xl transition-colors"
                  style={{
                    color: isActive(link.href)
                      ? "oklch(0.55 0.12 10)"
                      : "oklch(0.35 0.05 30)",
                    background: isActive(link.href)
                      ? "oklch(0.97 0.04 10)"
                      : "transparent",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 space-y-3">
              <Link
                href="/order"
                className="w-full btn-pink py-3 rounded-full text-sm font-semibold text-center block"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Order Now
              </Link>
              <a
                href="https://wa.me/919867390830?text=Hi%20Dhvani!%20I%20would%20like%20to%20order%20a%20cake."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold border border-green-300 text-green-700 hover:bg-green-50 transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
