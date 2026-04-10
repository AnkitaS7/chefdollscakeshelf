export type ProductType = "cake" | "cupcake" | "brownie";

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
  price: number;
  emoji: string;
}

export interface FlavorOption {
  label: string;
  emoji: string;
  color: string;
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
