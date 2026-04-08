/* =============================================================
   GallerySection - Product showcase with category tabs
   Images are fetched live from Google Drive.
   Folder structure: Root / Category Name / Product Image.jpg
   ============================================================= */

import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import type { GalleryItem } from "../../../server/googleDriveRouter";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  const {
    data: products = [],
    isLoading,
    isError,
  } = trpc.googleDrive.getGallery.useQuery(
    undefined,
    { staleTime: 5 * 60 * 1000 } // treat as fresh for 5 minutes, matching server cache
  );

  const categories = [
    "All",
    ...Array.from(new Set(products.map(p => p.category))),
  ];

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter(p => p.category === activeCategory);

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

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "oklch(0.99 0.01 80)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
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
        <div ref={headRef} className="reveal text-center mb-12">
          <p
            className="font-script text-2xl mb-1"
            style={{ color: "oklch(0.72 0.12 70)" }}
          >
            Our Creations
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold mb-3"
            style={{ color: "oklch(0.22 0.04 40)" }}
          >
            A Feast for the Eyes
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{
              color: "oklch(0.50 0.04 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            Each cake is a unique work of edible art - designed to match your
            vision, crafted with premium ingredients, and delivered with love.
          </p>
          <div className="ornament-line mt-4 max-w-xs mx-auto">
            <span className="text-amber-400 text-sm">✦</span>
          </div>
        </div>

        {/* Category Tabs */}
        {!isLoading && !isError && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  background:
                    activeCategory === cat
                      ? "linear-gradient(135deg, oklch(0.65 0.12 10), oklch(0.72 0.1 5))"
                      : "oklch(0.96 0.02 60)",
                  color:
                    activeCategory === cat ? "white" : "oklch(0.45 0.06 30)",
                  border:
                    activeCategory === cat
                      ? "none"
                      : "1px solid oklch(0.88 0.04 60)",
                  boxShadow:
                    activeCategory === cat
                      ? "0 4px 15px oklch(0.65 0.12 10 / 0.3)"
                      : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden animate-pulse"
                style={{
                  background: "oklch(0.93 0.02 60)",
                  aspectRatio: "4/3",
                }}
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <p
            className="text-center"
            style={{
              color: "oklch(0.55 0.04 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            Could not load gallery. Please try again later.
          </p>
        )}

        {/* Product Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i * 80} />
            ))}
            {filtered.length === 0 && (
              <p
                className="col-span-3 text-center py-12"
                style={{
                  color: "oklch(0.55 0.04 30)",
                  fontFamily: "var(--font-body)",
                }}
              >
                No items in this category yet.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  delay,
}: {
  product: GalleryItem;
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && cardRef.current) {
            setTimeout(() => {
              if (cardRef.current) cardRef.current.classList.add("visible");
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="reveal group rounded-3xl overflow-hidden card-hover"
      style={{
        background: "white",
        border: "1px solid oklch(0.92 0.03 60)",
        boxShadow: "0 4px 20px oklch(0.65 0.12 10 / 0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{
            background: "oklch(0.22 0.04 40 / 0.65)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <a
            href={`/order?cake=${encodeURIComponent(product.name)}#build-cake`}
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-white border-2 border-white hover:bg-white hover:text-rose-800 transition-all duration-200 inline-block"
            style={{ fontFamily: "var(--font-body)", textDecoration: "none" }}
          >
            Order This Cake
          </a>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backdropFilter: "blur(8px)",
              color: "oklch(0.45 0.08 10)",
              fontFamily: "var(--font-body)",
              backgroundColor: "rgba(255,255,255,0.9)",
            }}
          >
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-display text-xl font-semibold mb-1"
          style={{ color: "oklch(0.28 0.05 30)" }}
        >
          {product.name}
        </h3>
        {product.description && (
          <p
            className="text-sm mb-3"
            style={{
              color: "oklch(0.55 0.04 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            {product.description}
          </p>
        )}

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  background: "oklch(0.95 0.03 20)",
                  color: "oklch(0.50 0.08 10)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span
            className="font-display text-lg font-semibold"
            style={{ color: "oklch(0.55 0.12 10)" }}
          >
            {product.price}
          </span>
          <a
            href="/contact"
            className="text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 inline-block hover:bg-rose-500 hover:text-white"
            style={{
              background: "oklch(0.95 0.03 20)",
              color: "oklch(0.50 0.08 10)",
              fontFamily: "var(--font-body)",
              textDecoration: "none",
            }}
          >
            Inquire →
          </a>
        </div>
      </div>
    </div>
  );
}
