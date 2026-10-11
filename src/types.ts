// ============================================================
// Bloom & Glow — Product Data Types
// ============================================================

export interface ProductVariant {
  id: string;
  name: string;
  priceModifier?: number; // Additive modifier to base price
}

export interface CustomizationOption {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea';
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  description: string;
  images: string[];
  price: number | null; // null = "Price on request"
  priceOnRequest: boolean;
  variants: ProductVariant[];
  customizationOptions: CustomizationOption[];
  available: boolean;
  comingSoon?: boolean;
  preparationTime?: string;
  tags?: string[];
  featured?: boolean;
  newArrival?: boolean;
}

export type ProductCategory =
  | 'bloomy-glow-shots'
  | 'solid-candles'
  | 'customised-layered'
  | 'bloom-light-candles'
  | 'bloomlit-diyas'
  | 'diwali-hampers'
  | 'raas-glow';

export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant | null;
  quantity: number;
  customizations: Record<string, string>;
}

export interface CartState {
  items: CartItem[];
  lastUpdated: number;
}
