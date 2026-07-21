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
    color: "oklch(0.58 0.14 10)",
    bg: "oklch(0.97 0.04 10)",
    border: "oklch(0.88 0.08 10)",
    selectedBg: "oklch(0.58 0.14 10)",
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

// Cake — priced by weight (kg). Base price = plain cake; final price = flavor.pricePerKg × kg.
export const CAKE_SIZES: SizeOption[] = [
  { label: "0.5 kg", serves: "Serves 4–6", price: 500, kg: 0.5, emoji: "🎂" },
  { label: "1 kg", serves: "Serves 8–10", price: 1000, kg: 1, emoji: "🎂" },
  { label: "1.5 kg", serves: "Serves 12–16", price: 1500, kg: 1.5, emoji: "🎂" },
  { label: "2 kg", serves: "Serves 18–22", price: 2000, kg: 2, emoji: "🎂" },
];

// Prices are per 1kg (from the official price list). Total = pricePerKg × size.kg.
export const CAKE_FLAVORS: FlavorOption[] = [
  // Dutch Truffle family
  { label: "Dutch Truffle (15% Dark)", emoji: "🍫", color: "oklch(0.42 0.08 40)", pricePerKg: 1400 },
  { label: "Dutch Truffle (46% Dark)", emoji: "🍫", color: "oklch(0.36 0.08 40)", pricePerKg: 1800 },
  { label: "Dutch Truffle with Salted Caramel", emoji: "🍯", color: "oklch(0.60 0.10 55)", pricePerKg: 1500 },
  { label: "Pure Dutch Truffle with Salted Caramel", emoji: "🍯", color: "oklch(0.55 0.10 50)", pricePerKg: 1900 },
  // Caramel family
  { label: "Caramel", emoji: "🍯", color: "oklch(0.75 0.10 65)", pricePerKg: 1100 },
  { label: "Caramel Dutch Truffle with Roasted Almond", emoji: "🌰", color: "oklch(0.55 0.09 55)", pricePerKg: 1650 },
  { label: "Caramel Pure Dutch Truffle with Roasted Almond", emoji: "🌰", color: "oklch(0.48 0.09 50)", pricePerKg: 2600 },
  // Chocolate
  { label: "Chocolate Mousse", emoji: "🍫", color: "oklch(0.38 0.08 40)", pricePerKg: 1100 },
  { label: "Pure Chocolate Mousse", emoji: "🍫", color: "oklch(0.34 0.08 40)", pricePerKg: 1150 },
  // Nutella / premium
  { label: "Nutella", emoji: "🌰", color: "oklch(0.48 0.09 45)", pricePerKg: 1350 },
  { label: "Nutella Hazelnut", emoji: "🌰", color: "oklch(0.50 0.09 45)", pricePerKg: 1750 },
  { label: "Ferrero Rocher", emoji: "🍫", color: "oklch(0.40 0.07 45)", pricePerKg: 3150 },
  { label: "KitKat", emoji: "🍫", color: "oklch(0.45 0.08 40)", pricePerKg: 2300 },
  { label: "Biscoff", emoji: "🍪", color: "oklch(0.68 0.10 55)", pricePerKg: 1750 },
  // Classics
  { label: "Black Forest", emoji: "🍒", color: "oklch(0.35 0.08 20)", pricePerKg: 1150 },
  { label: "Cookie Cream", emoji: "🍪", color: "oklch(0.88 0.03 80)", pricePerKg: 1100 },
  { label: "Red Velvet Cheese Cake", emoji: "🧀", color: "oklch(0.58 0.13 15)", pricePerKg: 1550 },
  // Fruit
  { label: "Mix Fruit", emoji: "🍑", color: "oklch(0.80 0.10 60)", pricePerKg: 1050 },
  { label: "Pineapple", emoji: "🍍", color: "oklch(0.88 0.12 90)", pricePerKg: 1050 },
  { label: "Blueberry", emoji: "🫐", color: "oklch(0.55 0.14 270)", pricePerKg: 1100 },
  { label: "Strawberry", emoji: "🍓", color: "oklch(0.75 0.12 10)", pricePerKg: 1050 },
  { label: "Chocolate Strawberry", emoji: "🍓", color: "oklch(0.50 0.10 20)", pricePerKg: 1050 },
  { label: "Dutch Truffle Strawberry", emoji: "🍓", color: "oklch(0.45 0.10 18)", pricePerKg: 1450 },
  { label: "Pure Dutch Truffle Strawberry", emoji: "🍓", color: "oklch(0.40 0.10 18)", pricePerKg: 1850 },
  { label: "Mango (Seasonal)", emoji: "🥭", color: "oklch(0.85 0.12 75)", pricePerKg: 1550 },
  { label: "Dutch Truffle Mango", emoji: "🥭", color: "oklch(0.70 0.11 70)", pricePerKg: 1950 },
  { label: "Pure Dutch Truffle Mango", emoji: "🥭", color: "oklch(0.60 0.11 65)", pricePerKg: 2350 },
  // Indian / specialty
  { label: "Rasmalai", emoji: "🥛", color: "oklch(0.93 0.03 80)", pricePerKg: 2800 },
  { label: "Gulab Jamun", emoji: "🟤", color: "oklch(0.55 0.10 50)", pricePerKg: 1300 },
  { label: "Gulkand", emoji: "🌹", color: "oklch(0.75 0.12 350)", pricePerKg: 1150 },
  { label: "Tender Coconut and Gulkand", emoji: "🥥", color: "oklch(0.80 0.08 140)", pricePerKg: 1400 },
  { label: "Paan", emoji: "🌿", color: "oklch(0.55 0.12 145)", pricePerKg: 1550 },
  // Coffee
  { label: "Coffee", emoji: "☕", color: "oklch(0.45 0.07 40)", pricePerKg: 1100 },
  { label: "Coffee Caramel", emoji: "☕", color: "oklch(0.58 0.09 50)", pricePerKg: 1150 },
  { label: "Mocha", emoji: "☕", color: "oklch(0.40 0.07 35)", pricePerKg: 1100 },
  // Other
  { label: "Chai", emoji: "🍵", color: "oklch(0.70 0.08 55)", pricePerKg: 1100 },
  { label: "Dulce de Leches", emoji: "🍮", color: "oklch(0.78 0.10 65)", pricePerKg: 2000 },
];

// The bakery makes only one frosting — whipped cream. It is applied to every cake
// and cupcake automatically, so there is no frosting step in the builder.
export const WHIPPED_CREAM: FrostingOption = {
  label: "Whipped Cream",
  emoji: "🤍",
};

export const CAKE_DECORATIONS = [
  { label: "Fresh Flowers", emoji: "🌸" },
  { label: "Gold Leaf", emoji: "✨" },
  { label: "Macarons", emoji: "🍬" },
  { label: "Edible Glitter", emoji: "💫" },
  { label: "Custom Message Card", emoji: "✍️" },
  { label: "Fruit Topping", emoji: "🍓" },
];

// Cupcake
export const CUPCAKE_SIZES: SizeOption[] = [
  { label: "4 Cupcakes", serves: "Mini box", price: 320, emoji: "🧁" },
  { label: "8 Cupcakes", serves: "Party box", price: 600, emoji: "🧁" },
  { label: "12 Cupcakes", serves: "Celebration box", price: 880, emoji: "🧁" },
  { label: "16 Cupcakes", serves: "Grand box", price: 1150, emoji: "🧁" },
];

export const CUPCAKE_FLAVORS: FlavorOption[] = [
  { label: "Vanilla Bean", emoji: "🍦", color: "oklch(0.95 0.03 80)" },
  { label: "Chocolate", emoji: "🍫", color: "oklch(0.40 0.08 40)" },
  { label: "Strawberry", emoji: "🍓", color: "oklch(0.75 0.12 10)" },
  { label: "Red Velvet", emoji: "❤️", color: "oklch(0.55 0.15 15)" },
  { label: "Lemon Zest", emoji: "🍋", color: "oklch(0.90 0.12 95)" },
  { label: "Funfetti", emoji: "🎉", color: "oklch(0.88 0.1 85)" },
];

export const CUPCAKE_DECORATIONS = [
  { label: "Sprinkles", emoji: "🌈" },
  { label: "Edible Glitter", emoji: "💫" },
  { label: "Fondant Topper", emoji: "🌸" },
  { label: "Custom Message Card", emoji: "✍️" },
  { label: "Gold Dust", emoji: "✨" },
  { label: "Fruit Slice", emoji: "🍓" },
];

// Brownie
export const BROWNIE_SIZES: SizeOption[] = [
  { label: "4 Brownies", serves: "Small box", price: 240, emoji: "🍫" },
  { label: "8 Brownies", serves: "Gift box", price: 450, emoji: "🍫" },
  { label: "12 Brownies", serves: "Party box", price: 650, emoji: "🍫" },
  { label: "16 Brownies", serves: "Grand box", price: 840, emoji: "🍫" },
];

export const BROWNIE_ADDONS = [
  { label: "Walnut", emoji: "🌰" },
  { label: "Choco Chips", emoji: "🍫" },
  { label: "Caramel Swirl", emoji: "🍯" },
  { label: "Sea Salt Sprinkle", emoji: "🧂" },
  { label: "Custom Message Card", emoji: "✍️" },
  { label: "Gift Wrap", emoji: "🎁" },
];

// Cookie Tin — each variant is a 500gms tin at a fixed price; the flavor is the
// priced choice, so the variants live in the "size" slot (like brownie quantities).
export const COOKIETIN_SIZES: SizeOption[] = [
  { label: "Vanilla Chocolate Chunk", serves: "500 gms tin", price: 750, emoji: "🍪" },
  { label: "Chocolate Chunk", serves: "500 gms tin", price: 850, emoji: "🍪" },
  { label: "Nutella Vanilla Chocolate Chunk", serves: "500 gms tin", price: 800, emoji: "🍪" },
  { label: "Nutella Chocolate Chunk", serves: "500 gms tin", price: 900, emoji: "🍪" },
];

export function getSteps(product: ProductType | null): StepConfig[] {
  if (product === "brownie") {
    return [
      { id: "product", label: "Product", emoji: "🛍️" },
      { id: "size", label: "Quantity", emoji: "📦" },
      { id: "date", label: "Delivery Date", emoji: "📆" },
      { id: "decorations", label: "Add-ons", emoji: "✨" },
      { id: "summary", label: "Summary", emoji: "🎉" },
    ];
  }
  if (product === "cookietin") {
    return [
      { id: "product", label: "Product", emoji: "🛍️" },
      { id: "size", label: "Tin", emoji: "🍪" },
      { id: "date", label: "Delivery Date", emoji: "📆" },
      { id: "summary", label: "Summary", emoji: "🎉" },
    ];
  }
  return [
    { id: "product", label: "Product", emoji: "🛍️" },
    {
      id: "size",
      label: product === "cupcake" ? "Serving" : "Size",
      emoji: "📏",
    },
    { id: "date", label: "Delivery Date", emoji: "📆" },
    { id: "flavor", label: "Flavor", emoji: "🍰" },
    {
      id: "decorations",
      label: product === "cupcake" ? "Toppings" : "Decor",
      emoji: "✨",
    },
    { id: "summary", label: "Summary", emoji: "🎉" },
  ];
}
