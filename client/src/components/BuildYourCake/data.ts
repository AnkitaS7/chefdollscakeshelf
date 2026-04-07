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
];

// Cake
export const CAKE_SIZES: SizeOption[] = [
  { label: "6 inch", serves: "Serves 8–10", price: 800, emoji: "🎂" },
  { label: "8 inch", serves: "Serves 12–15", price: 1200, emoji: "🎂" },
  { label: "10 inch", serves: "Serves 18–22", price: 1800, emoji: "🎂" },
  { label: "2-Tier", serves: "Serves 25–30", price: 2800, emoji: "🎂" },
];

export const CAKE_FLAVORS: FlavorOption[] = [
  { label: "Vanilla Bean", emoji: "🍦", color: "oklch(0.95 0.03 80)" },
  { label: "Chocolate Truffle", emoji: "🍫", color: "oklch(0.40 0.08 40)" },
  { label: "Strawberry", emoji: "🍓", color: "oklch(0.75 0.12 10)" },
  { label: "Red Velvet", emoji: "❤️", color: "oklch(0.55 0.15 15)" },
  { label: "Lemon Zest", emoji: "🍋", color: "oklch(0.90 0.12 95)" },
  { label: "Butterscotch", emoji: "🧈", color: "oklch(0.85 0.1 70)" },
];

export const CAKE_FROSTINGS: FrostingOption[] = [
  { label: "Whipped Cream", emoji: "🤍" },
  { label: "Buttercream", emoji: "💛" },
  { label: "Fondant", emoji: "🌸" },
  { label: "Ganache", emoji: "🍫" },
];

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

export const CUPCAKE_FROSTINGS: FrostingOption[] = [
  { label: "Swirl Buttercream", emoji: "💛" },
  { label: "Whipped Cream", emoji: "🤍" },
  { label: "Cream Cheese", emoji: "🧀" },
  { label: "Ganache Drip", emoji: "🍫" },
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

export function getSteps(product: ProductType | null): StepConfig[] {
  if (product === "brownie") {
    return [
      { id: "product", label: "Product", emoji: "🛍️" },
      { id: "size", label: "Quantity", emoji: "📦" },
      { id: "decorations", label: "Add-ons", emoji: "✨" },
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
    { id: "flavor", label: "Flavor", emoji: "🍰" },
    { id: "frosting", label: "Frosting", emoji: "🎂" },
    {
      id: "decorations",
      label: product === "cupcake" ? "Toppings" : "Decor",
      emoji: "✨",
    },
    { id: "summary", label: "Summary", emoji: "🎉" },
  ];
}
