/* =============================================================
   MenuCakePicker - visual, searchable cake grid for the menu flow.
   A cake is a visual purchase, so selection is by photo rather than a
   text dropdown. Reports the chosen cake by name. Thumbnails reserve a
   4/3 box so loading images don't shift the layout (CLS).
   ============================================================= */

import { useMemo, useState } from "react";
import { Check, ImageOff, Search, X } from "lucide-react";

export interface MenuCake {
  name: string;
  image: string;
}

export default function MenuCakePicker({
  cakes,
  selected,
  onSelect,
  isLoading,
  accentColor,
}: {
  cakes: MenuCake[];
  selected: string;
  onSelect: (name: string) => void;
  isLoading: boolean;
  accentColor: string;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const matches = useMemo(
    () => (q ? cakes.filter(c => c.name.toLowerCase().includes(q)) : cakes),
    [cakes, q]
  );

  // Search only earns its keep once the menu is long.
  const showSearch = cakes.length > 12;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl animate-pulse"
            style={{ aspectRatio: "4/3", background: "var(--surface-muted)" }}
          />
        ))}
      </div>
    );
  }

  if (cakes.length === 0) {
    return (
      <div
        className="rounded-2xl px-4 py-8 text-center"
        style={{ background: "var(--surface-warm)" }}
      >
        <p
          className="text-sm"
          style={{ color: "oklch(0.45 0.05 30)", fontFamily: "var(--font-body)" }}
        >
          Our menu is loading up — please check back in a moment, or message
          Dhvani directly.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {showSearch && (
        <div className="relative">
          <Search
            className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "oklch(0.62 0.04 30)" }}
            aria-hidden="true"
          />
          <input
            id="menu-cake-search"
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search cakes…"
            aria-label="Search cakes"
            className="w-full rounded-xl pl-10 pr-11 py-3 text-sm outline-none transition-all duration-200"
            style={{
              border: `1.5px solid ${query ? accentColor : "var(--line)"}`,
              fontFamily: "var(--font-body)",
              color: "var(--text-dark)",
              background: "white",
            }}
            onFocus={e => (e.target.style.borderColor = accentColor)}
            onBlur={e =>
              (e.target.style.borderColor = query ? accentColor : "var(--line)")
            }
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-xl"
              style={{ color: "var(--text-muted)" }}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {matches.length === 0 ? (
        <div
          className="rounded-2xl px-4 py-8 text-center"
          style={{ background: "var(--surface-warm)" }}
        >
          <p
            className="text-sm"
            style={{
              color: "oklch(0.45 0.05 30)",
              fontFamily: "var(--font-body)",
            }}
          >
            No cakes match “{query}”.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-3 px-5 py-2.5 rounded-full text-sm font-semibold"
            style={{
              background: accentColor,
              color: "white",
              fontFamily: "var(--font-body)",
            }}
          >
            Show all cakes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {matches.map(cake => {
            const isSelected = selected === cake.name;
            return (
              <button
                key={cake.name}
                type="button"
                onClick={() => onSelect(cake.name)}
                aria-pressed={isSelected}
                className="group rounded-2xl overflow-hidden text-left transition-all duration-200 hover:scale-[1.02]"
                style={{
                  border: `2px solid ${isSelected ? accentColor : "var(--line)"}`,
                  boxShadow: isSelected ? `0 4px 15px ${accentColor}40` : "none",
                }}
              >
                <div
                  className="relative"
                  style={{ aspectRatio: "4/3", background: "var(--surface-muted)" }}
                >
                  {cake.image ? (
                    <img
                      src={cake.image}
                      alt={cake.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageOff
                        className="w-6 h-6"
                        style={{ color: "var(--text-faint)" }}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  {isSelected && (
                    <span
                      className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: accentColor }}
                    >
                      <Check className="w-4 h-4 text-white" aria-hidden="true" />
                    </span>
                  )}
                </div>
                <span
                  className="block px-3 py-2 text-sm font-medium"
                  style={{
                    color: isSelected ? "var(--rose-ink)" : "var(--text-dark)",
                    fontFamily: "var(--font-body)",
                    background: "white",
                  }}
                >
                  {cake.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
