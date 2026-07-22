/* =============================================================
   FlavorPicker - searchable, category-grouped flavor grid.
   Shared by the custom builder (StepFlavor) and the menu order tab,
   so both stay in sync as the flavor list grows.
   ============================================================= */

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { FlavorOption } from "./types";
import { flavorGroupIcon } from "./icons";
import { flavorSurcharge } from "./data";

export default function FlavorPicker({
  flavors,
  selected,
  onSelect,
  accentColor,
  sizeKg,
}: {
  flavors: FlavorOption[];
  selected: FlavorOption | null;
  onSelect: (f: FlavorOption) => void;
  accentColor: string;
  /** Chosen cake weight. Set, the surcharge is priced for that whole cake;
      unset (menu tab, before a size is picked) it falls back to a per-kg rate. */
  sizeKg?: number;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  // Surcharges are quoted per kg in the price list, so a 2kg Dutch Truffle
  // adds ₹400 × 2. Rounded because the list works in whole rupees.
  const surchargeLabel = (pricePerKg: number) => {
    const perKg = flavorSurcharge(pricePerKg);
    return sizeKg != null
      ? `+₹${Math.round(perKg * sizeKg).toLocaleString("en-IN")}`
      : `+₹${perKg.toLocaleString("en-IN")}/kg`;
  };

  const matches = useMemo(
    () =>
      q
        ? flavors.filter(
            f =>
              f.label.toLowerCase().includes(q) ||
              (f.group ?? "").toLowerCase().includes(q)
          )
        : flavors,
    [flavors, q]
  );

  // The data is already ordered by family, so walking it once keeps the
  // authored order instead of re-sorting groups alphabetically.
  const groups = useMemo(() => {
    const out: { name: string; items: FlavorOption[] }[] = [];
    for (const f of matches) {
      const name = f.group ?? "";
      const last = out[out.length - 1];
      if (last && last.name === name) last.items.push(f);
      else out.push({ name, items: [f] });
    }
    return out;
  }, [matches]);

  // Search only earns its keep on a long list (cakes); cupcakes have six.
  const showSearch = flavors.length > 12;

  return (
    <div className="flex flex-col gap-5">
      {sizeKg != null && (
        <p
          className="text-xs font-semibold"
          style={{ color: accentColor, fontFamily: "var(--font-body)" }}
        >
          Prices shown for your {sizeKg} kg cake.
        </p>
      )}
      {showSearch && (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="flavor-search"
            className="text-xs font-semibold uppercase tracking-wide"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Search flavors
          </label>
          <div className="relative">
            <Search
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "oklch(0.62 0.04 30)" }}
              aria-hidden="true"
            />
            <input
              id="flavor-search"
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Try “mango”, “nutella”, “coffee”…"
              className="w-full rounded-xl pl-10 pr-11 py-3 text-sm outline-none transition-all duration-200"
              style={{
                border: `1.5px solid ${query ? accentColor : "var(--line)"}`,
                fontFamily: "var(--font-body)",
                color: "var(--text-dark)",
                background: "white",
              }}
              onFocus={e => (e.target.style.borderColor = accentColor)}
              onBlur={e =>
                (e.target.style.borderColor = query
                  ? accentColor
                  : "var(--line)")
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
          <p className="sr-only" aria-live="polite">
            {matches.length} flavors match
          </p>
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
            No flavors match “{query}”.
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
            Show all flavors
          </button>
        </div>
      ) : (
        groups.map(group => {
          const GroupIcon = flavorGroupIcon(group.name);
          return (
            <div key={group.name || "all"} className="flex flex-col gap-3">
              {group.name && (
                <div className="flex items-center gap-2">
                  <GroupIcon
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: accentColor }}
                    aria-hidden="true"
                  />
                  <h4
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{
                      color: "oklch(0.50 0.05 30)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {group.name}
                  </h4>
                  <span
                    className="h-px flex-1"
                    style={{ background: "oklch(0.91 0.03 60)" }}
                  />
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {group.items.map(f => {
                  const isSelected = selected?.label === f.label;
                  return (
                    <button
                      key={f.label}
                      onClick={() => onSelect(f)}
                      aria-pressed={isSelected}
                      className="p-3 rounded-2xl text-left flex items-center gap-3 transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        background: isSelected ? "oklch(0.95 0.04 10)" : "white",
                        border: `2px solid ${isSelected ? accentColor : "var(--line)"}`,
                      }}
                    >
                      <span className="text-2xl" aria-hidden="true">
                        {f.emoji}
                      </span>
                      <span className="flex flex-col">
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: isSelected
                              ? "var(--rose-ink)"
                              : "oklch(0.40 0.05 30)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {f.label}
                        </span>
                        {f.pricePerKg != null && (
                          <span
                            className="text-xs font-semibold"
                            style={{
                              color: isSelected
                                ? accentColor
                                : "oklch(0.58 0.08 30)",
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            {surchargeLabel(f.pricePerKg)}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
