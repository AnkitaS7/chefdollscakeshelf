import type {
  ProductType,
  SizeOption,
  FlavorOption,
  FrostingOption,
  StepConfig,
} from "./types";

export const PRODUCTS = [
  {
    type: "cake" as ProductType,
    label: "Cake",
    emoji: "🎂",
    tagline: "Custom layered cakes",
    color: "var(--rose-strong)",
    bg: "oklch(0.97 0.04 10)",
    border: "oklch(0.88 0.08 10)",
    selectedBg: "var(--rose-strong)",
  },
  {
    type: "cupcake" as ProductType,
    label: "Cupcake",
    emoji: "🧁",
    tagline: "Mini celebration bites",
    color: "oklch(0.55 0.14 200)",
    bg: "oklch(0.96 0.04 200)",
    border: "oklch(0.85 0.08 200)",
    selectedBg: "oklch(0.55 0.14 200)",
  },
  {
    type: "brownie" as ProductType,
    label: "Brownie",
    emoji: "🍫",
    tagline: "Rich fudgy squares",
    color: "oklch(0.40 0.08 40)",
    bg: "oklch(0.96 0.02 40)",
    border: "oklch(0.82 0.05 40)",
    selectedBg: "oklch(0.40 0.08 40)",
  },
  {
    type: "cookietin" as ProductType,
    label: "Cookie Tin",
    emoji: "🍪",
    tagline: "Buttery chunk cookies",
    color: "oklch(0.55 0.10 70)",
    bg: "oklch(0.96 0.04 75)",
    border: "oklch(0.85 0.08 75)",
    selectedBg: "oklch(0.55 0.10 70)",
  },
];

// Grouped by family: the flavor picker renders headings by walking this order,
// so keep each family's rows contiguous.
// Prices are per 1kg (from the official price list). Total = pricePerKg × size.kg.
export const CAKE_FLAVORS: FlavorOption[] = [
  { group: "Dutch Truffle", label: "Dutch Truffle (15% Dark)", emoji: "🍫", color: "oklch(0.42 0.08 40)", pricePerKg: 1400 },
  { group: "Dutch Truffle", label: "Dutch Truffle (46% Dark)", emoji: "🍫", color: "oklch(0.36 0.08 40)", pricePerKg: 1800 },
  { group: "Dutch Truffle", label: "Dutch Truffle with Salted Caramel", emoji: "🍯", color: "oklch(0.60 0.10 55)", pricePerKg: 1500 },
  { group: "Dutch Truffle", label: "Pure Dutch Truffle with Salted Caramel", emoji: "🍯", color: "oklch(0.55 0.10 50)", pricePerKg: 1900 },
  { group: "Caramel", label: "Caramel", emoji: "🍯", color: "oklch(0.75 0.10 65)", pricePerKg: 1100 },
  { group: "Caramel", label: "Caramel Dutch Truffle with Roasted Almond", emoji: "🌰", color: "oklch(0.55 0.09 55)", pricePerKg: 1650 },
  { group: "Caramel", label: "Caramel Pure Dutch Truffle with Roasted Almond", emoji: "🌰", color: "oklch(0.48 0.09 50)", pricePerKg: 2600 },
  { group: "Chocolate", label: "Chocolate Mousse", emoji: "🍫", color: "oklch(0.38 0.08 40)", pricePerKg: 1100 },
  { group: "Chocolate", label: "Pure Chocolate Mousse", emoji: "🍫", color: "oklch(0.34 0.08 40)", pricePerKg: 1150 },
  { group: "Nutella & Premium", label: "Nutella", emoji: "🌰", color: "oklch(0.48 0.09 45)", pricePerKg: 1350 },
  { group: "Nutella & Premium", label: "Nutella Hazelnut", emoji: "🌰", color: "oklch(0.50 0.09 45)", pricePerKg: 1750 },
  { group: "Nutella & Premium", label: "Ferrero Rocher", emoji: "🍫", color: "oklch(0.40 0.07 45)", pricePerKg: 3150 },
  { group: "Nutella & Premium", label: "KitKat", emoji: "🍫", color: "oklch(0.45 0.08 40)", pricePerKg: 2300 },
  { group: "Nutella & Premium", label: "Biscoff", emoji: "🍪", color: "oklch(0.68 0.10 55)", pricePerKg: 1750 },
  { group: "Classics", label: "Black Forest", emoji: "🍒", color: "oklch(0.35 0.08 20)", pricePerKg: 1150 },
  { group: "Classics", label: "Cookie Cream", emoji: "🍪", color: "oklch(0.88 0.03 80)", pricePerKg: 1100 },
  { group: "Classics", label: "Red Velvet Cheese Cake", emoji: "🧀", color: "oklch(0.58 0.13 15)", pricePerKg: 1550 },
  { group: "Fruit", label: "Mix Fruit", emoji: "🍑", color: "oklch(0.80 0.10 60)", pricePerKg: 1050 },
  { group: "Fruit", label: "Pineapple", emoji: "🍍", color: "oklch(0.88 0.12 90)", pricePerKg: 1050 },
  { group: "Fruit", label: "Blueberry", emoji: "🫐", color: "oklch(0.55 0.14 270)", pricePerKg: 1100 },
  { group: "Fruit", label: "Strawberry", emoji: "🍓", color: "oklch(0.75 0.12 10)", pricePerKg: 1050 },
  { group: "Fruit", label: "Chocolate Strawberry", emoji: "🍓", color: "oklch(0.50 0.10 20)", pricePerKg: 1050 },
  { group: "Fruit", label: "Dutch Truffle Strawberry", emoji: "🍓", color: "oklch(0.45 0.10 18)", pricePerKg: 1450 },
  { group: "Fruit", label: "Pure Dutch Truffle Strawberry", emoji: "🍓", color: "oklch(0.40 0.10 18)", pricePerKg: 1850 },
  { group: "Fruit", label: "Mango (Seasonal)", emoji: "🥭", color: "oklch(0.85 0.12 75)", pricePerKg: 1550 },
  { group: "Fruit", label: "Dutch Truffle Mango", emoji: "🥭", color: "oklch(0.70 0.11 70)", pricePerKg: 1950 },
  { group: "Fruit", label: "Pure Dutch Truffle Mango", emoji: "🥭", color: "oklch(0.60 0.11 65)", pricePerKg: 2350 },
  { group: "Indian Specials", label: "Rasmalai", emoji: "🥛", color: "oklch(0.93 0.03 80)", pricePerKg: 2800 },
  { group: "Indian Specials", label: "Gulab Jamun", emoji: "🟤", color: "oklch(0.55 0.10 50)", pricePerKg: 1300 },
  { group: "Indian Specials", label: "Gulkand", emoji: "🌹", color: "oklch(0.75 0.12 350)", pricePerKg: 1150 },
  { group: "Indian Specials", label: "Tender Coconut and Gulkand", emoji: "🥥", color: "oklch(0.80 0.08 140)", pricePerKg: 1400 },
  { group: "Indian Specials", label: "Paan", emoji: "🌿", color: "oklch(0.55 0.12 145)", pricePerKg: 1550 },
  { group: "Coffee", label: "Coffee", emoji: "☕", color: "oklch(0.45 0.07 40)", pricePerKg: 1100 },
  { group: "Coffee", label: "Coffee Caramel", emoji: "☕", color: "oklch(0.58 0.09 50)", pricePerKg: 1150 },
  { group: "Coffee", label: "Mocha", emoji: "☕", color: "oklch(0.40 0.07 35)", pricePerKg: 1100 },
  { group: "Other", label: "Chai", emoji: "🍵", color: "oklch(0.70 0.08 55)", pricePerKg: 1100 },
  { group: "Other", label: "Dulce de Leches", emoji: "🍮", color: "oklch(0.78 0.10 65)", pricePerKg: 2000 },
];

// The price list is built as a plain-cake base of ₹1000/kg plus a per-flavor
// surcharge: Dutch Truffle (15% Dark) adds ₹400, so it costs ₹1400/kg all in.
// `pricePerKg` above is that all-in figure — it matches the list's 1kg column,
// and × kg reproduces its 0.5 / 1.5 / 2kg columns exactly.
export const CAKE_BASE_PRICE_PER_KG = 1000;

/** What a flavor adds on top of the base, as printed in the list. */
export function flavorSurcharge(pricePerKg: number): number {
  return pricePerKg - CAKE_BASE_PRICE_PER_KG;
}

// Cake — priced by weight (kg). Size cards quote the list's base price for the
// weight; the total becomes flavor.pricePerKg × kg once a flavor is chosen.
export const CAKE_SIZES: SizeOption[] = [
  { label: "0.5 kg", serves: "Serves 4–6", kg: 0.5 },
  { label: "1 kg", serves: "Serves 8–10", kg: 1 },
  { label: "1.5 kg", serves: "Serves 12–16", kg: 1.5 },
  { label: "2 kg", serves: "Serves 18–22", kg: 2 },
].map(s => ({ ...s, price: CAKE_BASE_PRICE_PER_KG * s.kg }));

// Minimum lead time by cake type. The "Build Your Cake" builder only makes
// regular cakes; the "Choose from Menu" tab can be any of these, so it shows a
// selector that drives the delivery-date minimum. Hours are rounded up to whole
// days by the date picker (see minDeliveryDateHours).
export const CAKE_TYPES = [
  { id: "regular", label: "Regular", noticeHours: 10 },
  { id: "custom", label: "Custom", noticeHours: 24 },
  { id: "wedding", label: "Wedding & Engagement", noticeHours: 36 },
] as const;

export type CakeType = (typeof CAKE_TYPES)[number]["id"];

/** Lead time for the standard builder products (regular cakes, cupcakes,
    brownies, cookie tins), in hours. */
export const STANDARD_NOTICE_HOURS = 10;

const noticeFor = (id: CakeType) =>
  CAKE_TYPES.find(t => t.id === id)!.noticeHours;

/** One-line lead-time summary for notice banners across the site, derived from
    CAKE_TYPES and STANDARD_NOTICE_HOURS so marketing copy can never drift from
    the actual delivery-date minimums the pickers enforce. */
export const LEAD_TIME_SUMMARY = `Regular cakes need ${noticeFor(
  "regular"
)}-hour notice, custom cakes ${noticeFor("custom")}-hour, and wedding & engagement cakes ${noticeFor(
  "wedding"
)}-hour. Cupcakes, brownies & cookie tins need ${STANDARD_NOTICE_HOURS}-hour notice.`;

// The bakery makes only one frosting — whipped cream. It is applied to every cake
// and cupcake automatically, so there is no frosting step in the builder.
export const WHIPPED_CREAM: FrostingOption = {
  label: "Whipped Cream",
  emoji: "🤍",
};

// Cupcake — sold by the piece in multiples of 4 (min 4), so there is no fixed
// size list; the quantity stepper builds a SizeOption on the fly via cupcakeSize.
export const CUPCAKE_MIN = 4; // smallest order
export const CUPCAKE_STEP = 4; // orders move in blocks of 4
export const CUPCAKE_MAX = 100; // sane upper bound for the stepper

// TODO(pricing): replace with the confirmed price for a box of 4 cupcakes.
// Interim value is the previous 4-piece box price. Every quantity scales from
// it — total = CUPCAKE_PRICE_PER_4 × (qty / 4).
export const CUPCAKE_PRICE_PER_4 = 320;

/** Build the cupcake "size" for a given piece count (a multiple of CUPCAKE_STEP).
    Price scales linearly from the per-4 block price. */
export function cupcakeSize(qty: number): SizeOption {
  return {
    label: `${qty} Cupcakes`,
    serves: `Box of ${qty}`,
    qty,
    price: CUPCAKE_PRICE_PER_4 * (qty / CUPCAKE_STEP),
  };
}

export const CUPCAKE_FLAVORS: FlavorOption[] = [
  { label: "Vanilla Bean", emoji: "🍦", color: "oklch(0.95 0.03 80)" },
  { label: "Chocolate", emoji: "🍫", color: "oklch(0.40 0.08 40)" },
  { label: "Strawberry", emoji: "🍓", color: "oklch(0.75 0.12 10)" },
  { label: "Red Velvet", emoji: "❤️", color: "oklch(0.55 0.15 15)" },
  { label: "Lemon Zest", emoji: "🍋", color: "oklch(0.90 0.12 95)" },
  { label: "Funfetti", emoji: "🎉", color: "oklch(0.88 0.1 85)" },
];

// Brownie
// Brownie — one 1000gms box; the flavor is the priced choice, so the six
// variants live in the "size" slot (like the cookie tins).
export const BROWNIE_SIZES: SizeOption[] = [
  { label: "Chocolate Walnut", serves: "1000gms", price: 1200 },
  { label: "Nutella Hazelnut", serves: "1000gms", price: 1350 },
  { label: "Biscoff", serves: "1000gms", price: 1350 },
  { label: "Dutch Truffle", serves: "1000gms", price: 1350 },
  { label: "Sea Salt Caramel", serves: "1000gms", price: 1350 },
  { label: "Assorted", serves: "1000gms", price: 1500 },
];

// Cookie Tin — each variant is a 500gms tin at a fixed price; the flavor is the
// priced choice, so the variants live in the "size" slot (like the brownies).
export const COOKIETIN_SIZES: SizeOption[] = [
  { label: "Vanilla Chocolate Chunk", serves: "500 gms tin", price: 750 },
  { label: "Chocolate Chunk", serves: "500 gms tin", price: 850 },
  { label: "Nutella Vanilla Chocolate Chunk", serves: "500 gms tin", price: 800 },
  { label: "Nutella Chocolate Chunk", serves: "500 gms tin", price: 900 },
];

export function getSteps(product: ProductType | null): StepConfig[] {
  if (product === "brownie") {
    return [
      { id: "product", label: "Product" },
      { id: "size", label: "Flavour" },
      { id: "date", label: "Delivery Date" },
      { id: "summary", label: "Summary" },
    ];
  }
  if (product === "cookietin") {
    return [
      { id: "product", label: "Product" },
      { id: "size", label: "Tin" },
      { id: "date", label: "Delivery Date" },
      { id: "summary", label: "Summary" },
    ];
  }
  return [
    { id: "product", label: "Product" },
    { id: "size", label: product === "cupcake" ? "Quantity" : "Size" },
    { id: "date", label: "Delivery Date" },
    { id: "flavor", label: "Flavor" },
    { id: "summary", label: "Summary" },
  ];
}
