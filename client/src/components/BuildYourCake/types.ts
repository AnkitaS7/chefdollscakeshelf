export type ProductType = "cake" | "cupcake" | "brownie" | "cookietin";

export type StepId =
  | "product"
  | "size"
  | "date"
  | "flavor"
  | "frosting"
  | "decorations"
  | "summary";

export interface StepConfig {
  id: StepId;
  label: string;
  emoji: string;
}

export interface SizeOption {
  label: string;
  serves: string;
  price: number; // base price for this size (plain cake, before flavor) — also used as "from" indicator
  kg?: number; // weight multiplier for cakes (0.5/1/1.5/2); used with FlavorOption.pricePerKg
  emoji: string;
}

export interface FlavorOption {
  label: string;
  emoji: string;
  color: string;
  pricePerKg?: number; // cake price for 1kg of this flavor; total = pricePerKg × size.kg
}

export interface FrostingOption {
  label: string;
  emoji: string;
}

export interface OrderState {
  product: ProductType | null;
  size: SizeOption | null;
  deliveryDate: string; // ISO date string "YYYY-MM-DD"
  flavor: FlavorOption | null;
  frosting: FrostingOption | null;
  decorations: string[];
  addons: string[];
  message: string;
  customCardMessage: string;
}
