// ============================================================
// Bloom & Glow — Product Catalog Data
// ============================================================

import { Product, CategoryInfo, ProductCategory } from '../types';
import { assetUrl } from '../utils/assets';

// ============================================================
// Category Definitions
// ============================================================

const rawCategories: CategoryInfo[] = [
  {
    slug: 'solid-candles',
    name: 'Solid Candles',
    description: 'Handmade glass shot candles — solid, vibrant, and fragranced. ₹119 each.',
    image: '/images/products/bloomy_glow_seven_overhead.jpg',
  },
  {
    slug: 'layered-candles',
    name: 'Layered Candles',
    description: 'Beautifully handcrafted layered and customised candle designs. ₹149 each.',
    image: '/images/products/bloomy_glow_layered.jpg',
  },
  {
    slug: 'traditional-diya',
    name: 'Traditional Diya',
    description: 'Handcrafted festive diyas with golden scalloped rims. 1 Pair ₹59 • 2 Pairs ₹119 • 3 Pairs ₹169.',
    image: '/images/products/bloomlit_diyas_festive.jpg',
  },
  {
    slug: 'diwali-hampers',
    name: 'Diwali Hamper',
    description: 'Big & matka diya pairs + scented candle in a festive gift hamper. ₹349 each.',
    image: '/images/products/diwali_hamper_boxes.jpg',
  },
  {
    slug: 'raas-glow',
    name: 'Raas Glow — Navratri Collection',
    description: 'Festive Navratri collection — ₹219 per pair. 🎉 FESTIVE OFFER: BUY 9 PAIRS for ₹1699 (was ₹1999 — just ₹189/pair)!',
    image: '/images/products/raas_glow_mirror_cups.jpg',
  },
  {
    slug: 'sweet-box',
    name: 'Sweet Box',
    description: 'Gift-ready handmade candle box — Indian sweets crafted in wax. ₹119 each.',
    image: '/images/products/mithai_sweet_candles_box.jpg',
  },
];

export const categories: CategoryInfo[] = rawCategories.map(c => ({
  ...c,
  image: assetUrl(c.image),
}));

// ============================================================
// Product Catalog — 6 Products Only
// ============================================================

const rawProducts: Product[] = [

  // ── 1. Solid Candles ───────────────────────────────────────
  {
    id: 'sc-001',
    name: 'Solid Candles',
    slug: 'solid-candles',
    category: 'solid-candles',
    description: 'Handmade glass shot candles poured with vibrant solid wax in a range of colours and fragrances. Each candle is carefully crafted for a long, clean burn with a premium scent.',
    images: [
      '/images/products/bloomy_glow_seven_overhead.jpg',
      '/images/products/bloomy_glow_solid.jpg',
      '/images/products/bloomy_glow_assorted_shots.jpg',
      '/images/products/bloomy_glow_gift_set.jpg',
      '/images/products/bloomy_glow_hand_wrapped.jpg',
    ],
    price: 119,
    priceOnRequest: false,
    variants: [
      { id: 'sc-001-1', name: '1 Candle' },
      { id: 'sc-001-3', name: 'Set of 3', priceModifier: 238 },
      { id: 'sc-001-5', name: 'Set of 5', priceModifier: 476 },
    ],
    customizationOptions: [],
    available: true,
    tags: ['bestseller', 'solid', 'gift'],
    featured: true,
    newArrival: false,
  },

  // ── 2. Layered Candles ─────────────────────────────────────
  {
    id: 'cl-001',
    name: 'Layered Candles',
    slug: 'layered-candles',
    category: 'layered-candles',
    description: 'Stunningly handcrafted layered and customised candle designs with multi-colour wax layers, glitter finishes, and fragrance of your choice. Every piece is unique and made to order.',
    images: [
      '/images/products/bloomy_glow_layered.jpg',
      '/images/products/bloomy_glow_seven_diagonal.jpg',
      '/images/products/bloomy_glow_assorted_shots.jpg',
      '/images/products/bloomy_glow_packaging.jpg',
      '/images/products/bloomy_glow_angle_flatlay.jpg',
    ],
    price: 149,
    priceOnRequest: false,
    variants: [
      { id: 'cl-001-1', name: '1 Candle' },
      { id: 'cl-001-3', name: 'Set of 3', priceModifier: 298 },
      { id: 'cl-001-5', name: 'Set of 5', priceModifier: 596 },
    ],
    customizationOptions: [
      {
        id: 'cl-001-fragrance',
        label: 'Choose Fragrance',
        type: 'select',
        options: ['Vanilla Bean', 'French Lavender', 'Sandalwood', 'Rose Bloom', 'Jasmine', 'Unscented'],
      },
      {
        id: 'cl-001-colors',
        label: 'Preferred Colours (optional)',
        type: 'text',
        placeholder: 'e.g., Blue & Gold, Red & Black, Pastel shades…',
      },
    ],
    available: true,
    preparationTime: '2–3 business days',
    tags: ['layered', 'custom', 'premium'],
    featured: true,
    newArrival: false,
  },

  // ── 3. Traditional Diya ────────────────────────────────────
  {
    id: 'td-001',
    name: 'Traditional Diya',
    slug: 'traditional-diya',
    category: 'traditional-diya',
    description: 'Handcrafted traditional festive diyas with intricate golden scalloped rims, shimmering gold dust wax, and festive tassel detailing. Light up your festive moments — perfect for Diwali, pooja, and home décor.',
    images: [
      '/images/products/bloomlit_diyas_festive.jpg',
      '/images/products/bloomlit_diyas_tassel.jpg',
      '/images/products/bloomlit_diyas_scalloped.jpg',
      '/images/catalog/traditional_diya_poster.jpg',
    ],
    price: 59,
    priceOnRequest: false,
    variants: [
      { id: 'td-001-1pair', name: '1 Pair (2 Diyas) — ₹59' },
      { id: 'td-001-2pair', name: '2 Pairs (4 Diyas) — ₹119', priceModifier: 60 },
      { id: 'td-001-3pair', name: '3 Pairs (6 Diyas) — ₹169', priceModifier: 110 },
    ],
    customizationOptions: [],
    available: true,
    tags: ['traditional', 'diya', 'festive', 'diwali'],
    featured: true,
    newArrival: false,
  },

  // ── 4. Diwali Hamper ───────────────────────────────────────
  {
    id: 'dh-001',
    name: 'Diwali Hamper',
    slug: 'diwali-hamper',
    category: 'diwali-hampers',
    description: 'Our bestselling Diwali gift hamper — includes big & matka diya pairs + a scented candle, beautifully packed with sparkling shred filler and a handwritten greeting card. Perfect for gifting to family, friends, and colleagues.',
    images: [
      '/images/products/diwali_hamper_boxes.jpg',
      '/images/products/diwali_hamper_contents.jpg',
      '/images/products/diwali_hamper_bulk.jpg',
      '/images/products/bloomy_glow_hand_wrapped.jpg',
      '/images/catalog/official_price_list.jpg',
    ],
    price: 349,
    priceOnRequest: false,
    variants: [
      { id: 'dh-001-std', name: 'Standard Hamper' },
    ],
    customizationOptions: [
      {
        id: 'dh-001-note',
        label: 'Handwritten Gift Note (optional)',
        type: 'textarea',
        placeholder: 'e.g., Wishing you a glowy & bloomy Diwali…',
      },
    ],
    available: true,
    preparationTime: '2–3 business days',
    tags: ['diwali', 'hamper', 'gift', 'bestseller'],
    featured: true,
    newArrival: false,
  },

  // ── 5. Raas Glow — Navratri Collection ────────────────────
  {
    id: 'rg-001',
    name: 'Raas Glow — Navratri Collection',
    slug: 'raas-glow',
    category: 'raas-glow',
    description: 'Festive Navratri collection candle cups wrapped in authentic Kutchi mirror embroidery, real cowrie shells, and pearls, poured with shimmering scented wax. Festive Offer: Buy 9 pairs for just ₹1699 (was ₹1999 — save ₹300)!',
    images: [
      '/images/products/raas_glow_mirror_cups.jpg',
      '/images/products/raas_glow_mirror_detail.jpg',
      '/images/products/raas_glow_pearl_cups.jpg',
      '/images/products/raas_glow_festive_spread.jpg',
      '/images/catalog/official_price_list.jpg',
    ],
    price: 219,
    priceOnRequest: false,
    variants: [
      { id: 'rg-001-1pair', name: '1 Pair — ₹219' },
      { id: 'rg-001-9pair', name: '🎉 Festive Offer: 9 Pairs — ₹1699 (Save ₹272!)', priceModifier: 1480 },
    ],
    customizationOptions: [],
    available: true,
    tags: ['navratri', 'festive', 'raas glow', 'mirror work', 'bestseller'],
    featured: true,
    newArrival: false,
  },

  // ── 6. Sweet Box (Coming Soon) ─────────────────────────────
  {
    id: 'sb-001',
    name: 'Sweet Box',
    slug: 'sweet-box',
    category: 'sweet-box',
    description: 'Gift-ready handmade candle box crafted to look like authentic Indian sweets — includes realistic Kaju Katli candles with silver leaf, Motichoor Laddu candle, and Gujiya candle. A unique and delightful gift that surprises everyone!',
    images: [
      '/images/products/mithai_sweet_candles_box.jpg',
      '/images/catalog/official_price_list.jpg',
    ],
    price: 119,
    priceOnRequest: false,
    variants: [
      { id: 'sb-001-box', name: 'Gift-Ready Sweet Box' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['sweet box', 'gift', 'indian sweets', 'mithai'],
    featured: true,
    newArrival: false,
  },
];

export const products: Product[] = rawProducts.map(p => ({
  ...p,
  images: p.images.map(img => assetUrl(img)),
}));

// ============================================================
// Lookbook Catalog Slides
// ============================================================

export interface LookbookSlide {
  id: string;
  title: string;
  subtitle: string;
  categorySlug: ProductCategory;
  image: string;
}

const rawCatalogLookbook: LookbookSlide[] = [
  {
    id: 'catalog-price-list',
    title: 'Official Price List',
    subtitle: 'Solid Candles ₹119 • Layered ₹149 • Hampers ₹349 • Sweet Box ₹119 • Raas Glow ₹219/pair',
    categorySlug: 'solid-candles',
    image: '/images/catalog/official_price_list.jpg',
  },
  {
    id: 'catalog-traditional-diya',
    title: 'Traditional Diya',
    subtitle: 'Light up festive moments: 1 Pair ₹59 • 2 Pairs ₹119 • 3 Pairs ₹169',
    categorySlug: 'traditional-diya',
    image: '/images/catalog/traditional_diya_poster.jpg',
  },
  {
    id: 'catalog-raas-glow',
    title: 'Raas Glow Collection',
    subtitle: 'Navratri Special — ₹219/pair • Buy 9 pairs for ₹1699',
    categorySlug: 'raas-glow',
    image: '/images/catalog/raas_glow_catalog.jpg',
  },
  {
    id: 'catalog-diwali-hampers',
    title: 'Diwali Hampers',
    subtitle: 'Big & Matka Diya Pairs + Scented Candle — ₹349',
    categorySlug: 'diwali-hampers',
    image: '/images/catalog/diwali_hampers_catalog.jpg',
  },
  {
    id: 'catalog-bulk',
    title: 'Bulk & Corporate Orders',
    subtitle: 'Price discussed as per your requirements',
    categorySlug: 'diwali-hampers',
    image: '/images/catalog/bulk_orders_catalog.jpg',
  },
];

export const catalogLookbook: LookbookSlide[] = rawCatalogLookbook.map(s => ({
  ...s,
  image: assetUrl(s.image),
}));

// ============================================================
// Helper Functions
// ============================================================

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getNewArrivals(): Product[] {
  return products.filter(p => p.newArrival);
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categories.find(c => c.slug === slug);
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}
