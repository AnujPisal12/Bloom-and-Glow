// ============================================================
// Bloom & Glow — Product Catalog Data
// ============================================================
// This file serves as the centralized product database.
// Products can be added, edited, or removed here without
// changing any presentation components.
// ============================================================

import { Product, CategoryInfo, ProductCategory } from '../types';
import { assetUrl } from '../utils/assets';

// Placeholder image generator — creates a branded SVG placeholder
// Replace these with actual product photos for production
function placeholderImage(name: string, hue: number = 25): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="hsl(${hue}, 30%, 92%)"/>
    <circle cx="300" cy="240" r="120" fill="hsl(${hue}, 40%, 85%)" opacity="0.7"/>
    <circle cx="300" cy="240" r="80" fill="hsl(${hue}, 45%, 78%)" opacity="0.6"/>
    <ellipse cx="300" cy="360" rx="100" ry="20" fill="hsl(${hue}, 30%, 88%)"/>
    <rect x="295" y="140" width="10" height="30" rx="5" fill="hsl(${hue}, 60%, 70%)"/>
    <ellipse cx="300" cy="138" rx="6" ry="10" fill="hsl(40, 90%, 65%)" opacity="0.8"/>
    <text x="300" y="480" text-anchor="middle" font-family="Inter, sans-serif" font-size="18" fill="hsl(${hue}, 40%, 40%)" font-weight="500">${name}</text>
    <text x="300" y="510" text-anchor="middle" font-family="Allura, cursive" font-size="22" fill="hsl(${hue}, 35%, 55%)">Bloom &amp; Glow</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// ============================================================
// Category Definitions
// ============================================================

const rawCategories: CategoryInfo[] = [
  {
    slug: 'bloomy-glow-shots',
    name: 'Bloomy Glow Shots',
    description: 'Miniature candle shots in vibrant colors and sparkling accents, perfect for gifting and cozy corners.',
    image: '/images/products/bloomy_glow_solid.jpg',
  },
  {
    slug: 'solid-candles',
    name: 'Solid Candles',
    description: 'Classic solid candles crafted with rich fragrances and vibrant, warm tones.',
    image: '/images/products/bloomy_glow_solid.jpg',
  },
  {
    slug: 'customised-layered',
    name: 'Customised & Layered Candle Designs',
    description: 'Handcrafted layered candles with personalized color gradations and custom designs.',
    image: '/images/products/bloomy_glow_layered.jpg',
  },
  {
    slug: 'bloom-light-candles',
    name: 'Bloom Light Candles',
    description: 'Signature glass votive candles featuring delicate hand-molded wax floral embeds.',
    image: '/images/products/bloom_light_tray.jpg',
  },
  {
    slug: 'bloomlit-diyas',
    name: 'Bloomlit Diyas',
    description: 'Hand-decorated artisanal diyas with golden scalloped rims, tassels, and scented wax.',
    image: '/images/products/bloomlit_diyas_scalloped.jpg',
  },
  {
    slug: 'diwali-hampers',
    name: 'Diwali Hampers',
    description: 'Festive curated hampers featuring 1 pair big diya, 1 pair matka diya, and a scented candle.',
    image: '/images/products/diwali_hamper_boxes.jpg',
  },
  {
    slug: 'raas-glow',
    name: 'Raas Glow',
    description: 'Festive Navratri collection — Gujarati mirror embroidery, cowrie shells, pearl-bordered cups, and Indian sweet candles (coming soon).',
    image: '/images/products/raas_glow_mirror_cups.jpg',
  },
];

export const categories: CategoryInfo[] = rawCategories.map(c => ({
  ...c,
  image: assetUrl(c.image),
}));

// ============================================================
// Product Catalog
// ============================================================

const rawProducts: Product[] = [
  // ── Bloomy Glow Shots ──────────────────────────────────────
  {
    id: 'bgs-001',
    name: 'Rose Petal Glow Shot',
    slug: 'rose-petal-glow-shot',
    category: 'bloomy-glow-shots',
    description: 'A delicate miniature candle shot infused with dried rose petals and a soft floral fragrance. Perfect as a thoughtful gift or intimate ambient light.',
    images: ['/images/products/bloomy_glow_solid.jpg', '/images/products/bloomy_glow_layered.jpg', '/images/catalog/bloomy_glow_shots_catalog.jpg'],
    price: 149,
    priceOnRequest: false,
    variants: [
      { id: 'bgs-001-pink', name: 'Blush Pink' },
      { id: 'bgs-001-ivory', name: 'Ivory White' },
      { id: 'bgs-001-lavender', name: 'Soft Lavender' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['bestseller', 'gift'],
    featured: true,
    newArrival: false,
  },
  {
    id: 'bgs-002',
    name: 'Citrus Burst Glow Shot',
    slug: 'citrus-burst-glow-shot',
    category: 'bloomy-glow-shots',
    description: 'A zesty miniature candle shot with citrus essential oils and a bright, uplifting aroma in a sleek glass votive.',
    images: ['/images/products/bloomy_glow_solid.jpg', '/images/catalog/bloomy_glow_shots_catalog.jpg'],
    price: 149,
    priceOnRequest: false,
    variants: [
      { id: 'bgs-002-lemon', name: 'Lemon Yellow' },
      { id: 'bgs-002-orange', name: 'Tangerine' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['fresh', 'gift'],
    newArrival: true,
  },
  {
    id: 'bgs-003',
    name: 'Vanilla Dream Glow Shot',
    slug: 'vanilla-dream-glow-shot',
    category: 'bloomy-glow-shots',
    description: 'A warm, comforting miniature candle with creamy vanilla fragrance and subtle golden shimmer.',
    images: ['/images/products/bloomy_glow_solid.jpg', '/images/catalog/bloomy_glow_shots_catalog.jpg'],
    price: 149,
    priceOnRequest: false,
    variants: [
      { id: 'bgs-003-cream', name: 'Warm Cream' },
      { id: 'bgs-003-caramel', name: 'Golden Caramel' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['cozy'],
    newArrival: false,
  },
  {
    id: 'bgs-004',
    name: 'Jasmine Moonlight Glow Shot',
    slug: 'jasmine-moonlight-glow-shot',
    category: 'bloomy-glow-shots',
    description: 'An enchanting miniature candle with rich jasmine fragrance and handcrafted colored wax layers.',
    images: ['/images/products/bloomy_glow_layered.jpg', '/images/catalog/bloomy_glow_shots_catalog.jpg'],
    price: 169,
    priceOnRequest: false,
    variants: [
      { id: 'bgs-004-white', name: 'Pure White' },
      { id: 'bgs-004-pearl', name: 'Pearl' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['premium', 'gift'],
    newArrival: true,
  },

  // ── Solid Candles ──────────────────────────────────────────
  {
    id: 'sc-001',
    name: 'Solid Glass Candle Shot',
    slug: 'classic-pillar-candle',
    category: 'solid-candles',
    description: 'A classic solid candle poured in an elegant flared glass shot, with a clean, extended burn time and premium fragrance.',
    images: ['/images/products/bloomy_glow_solid.jpg', '/images/catalog/bloomy_glow_shots_catalog.jpg'],
    price: 199,
    priceOnRequest: false,
    variants: [
      { id: 'sc-001-ivory', name: 'Golden Sun' },
      { id: 'sc-001-taupe', name: 'Blush Coral' },
      { id: 'sc-001-sage', name: 'Sage Green' },
      { id: 'sc-001-blush', name: 'Ivory White' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['classic', 'home'],
    featured: true,
  },
  {
    id: 'sc-002',
    name: 'Golden Glow Solid Candle',
    slug: 'rustic-cube-candle',
    category: 'solid-candles',
    description: 'Hand-poured solid candle infused with vibrant yellow wax and fine sparkle accents for an uplifting room ambiance.',
    images: ['/images/products/bloomy_glow_solid.jpg', '/images/catalog/bloomy_glow_shots_catalog.jpg'],
    price: 249,
    priceOnRequest: false,
    variants: [
      { id: 'sc-002-natural', name: 'Natural Gold' },
      { id: 'sc-002-charcoal', name: 'Sunset Orange' },
      { id: 'sc-002-terracotta', name: 'Terracotta' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['modern', 'decor'],
  },
  {
    id: 'sc-003',
    name: 'Sparkle Dusk Solid Candle',
    slug: 'sphere-glow-candle',
    category: 'solid-candles',
    description: 'A shimmering solid candle crafted with fine celestial sparkle on top and soothing fragrance.',
    images: ['/images/products/bloomy_glow_solid.jpg', '/images/catalog/bloomy_glow_shots_catalog.jpg'],
    price: 249,
    priceOnRequest: false,
    variants: [
      { id: 'sc-003-pearl', name: 'Rose Sparkle' },
      { id: 'sc-003-bronze', name: 'Golden Glow' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['unique', 'decor'],
    newArrival: true,
  },

  // ── Customised & Layered Candle Designs ────────────────────
  {
    id: 'cl-001',
    name: 'Customised Layered Design Candle',
    slug: 'sunset-gradient-candle',
    category: 'customised-layered',
    description: 'A stunning multi-layered handcrafted candle with custom color transitions (blue, coral, sunny yellow) and a sparkling star-dust wax topping.',
    images: ['/images/products/bloomy_glow_layered.jpg', '/images/catalog/bloomy_glow_shots_catalog.jpg'],
    price: 349,
    priceOnRequest: false,
    variants: [
      { id: 'cl-001-warm', name: 'Tri-Color Sunrise (Yellow, Coral, Berry)' },
      { id: 'cl-001-cool', name: 'Ocean Twilight (Navy, Sky Blue, Shimmer)' },
    ],
    customizationOptions: [
      {
        id: 'cl-001-fragrance',
        label: 'Choose Fragrance',
        type: 'select',
        options: ['Vanilla Bean', 'French Lavender', 'Sandalwood', 'Rose Bloom', 'Unscented'],
      },
      {
        id: 'cl-001-message',
        label: 'Custom Message / Tag (optional)',
        type: 'text',
        placeholder: 'e.g., Happy Birthday / Made with Love',
      },
    ],
    available: true,
    preparationTime: '2–3 business days',
    tags: ['custom', 'premium', 'layered'],
    featured: true,
  },
  {
    id: 'cl-002',
    name: 'Glitter Horizon Layered Candle',
    slug: 'marble-swirl-candle',
    category: 'customised-layered',
    description: 'Bespoke hand-poured glass shot with rich dual-tone layers topped with sparkling cosmetic-grade wax glitter.',
    images: ['/images/products/bloomy_glow_layered.jpg', '/images/catalog/bloomy_glow_shots_catalog.jpg'],
    price: 299,
    priceOnRequest: false,
    variants: [
      { id: 'cl-002-classic', name: 'Midnight Blue & Silver' },
      { id: 'cl-002-rose', name: 'Crimson & Golden Yellow' },
    ],
    customizationOptions: [
      {
        id: 'cl-002-fragrance',
        label: 'Choose Fragrance',
        type: 'select',
        options: ['Ocean Breeze', 'White Tea', 'Jasmine', 'Vanilla'],
      },
    ],
    available: true,
    preparationTime: '2–3 business days',
    tags: ['luxury', 'custom'],
  },
  {
    id: 'cl-003',
    name: 'Custom Bespoke Layered Candle',
    slug: 'personalised-photo-candle',
    category: 'customised-layered',
    description: 'Design your own custom candle! Choose your color palette, glitter finish, and personalized message card for wedding favors or celebrations.',
    images: ['/images/products/bloomy_glow_layered.jpg', '/images/catalog/bloomy_glow_shots_catalog.jpg'],
    price: null,
    priceOnRequest: true,
    variants: [],
    customizationOptions: [
      {
        id: 'cl-003-desc',
        label: 'Describe your custom color & occasion preferences',
        type: 'textarea',
        placeholder: 'Tell us about your event theme, colors, and required quantity...',
        required: true,
      },
    ],
    available: true,
    preparationTime: '3–5 business days',
    tags: ['bespoke', 'gift'],
    newArrival: true,
  },

  // ── Bloom Light Candles ────────────────────────────────────
  {
    id: 'bl-001',
    name: 'Bloom Light Floral Votive Candle',
    slug: 'bloom-jar-candle',
    category: 'bloom-light-candles',
    description: 'An enchanting handcrafted glass votive candle with pure white soy wax topped with a hand-sculpted golden flower wax embed that illuminates as it melts.',
    images: ['/images/products/bloom_light_tray.jpg', '/images/products/bloom_light_hand.jpg', '/images/catalog/bloom_light_catalog.jpg'],
    price: 299,
    priceOnRequest: false,
    variants: [
      { id: 'bl-001-rose', name: 'Blossom Flower Embed' },
      { id: 'bl-001-star', name: 'Star Flower Embed' },
      { id: 'bl-001-heart', name: 'Petal Heart Embed' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['botanical', 'bestseller'],
    featured: true,
  },
  {
    id: 'bl-002',
    name: 'Bloom Light Ambient Set of 2',
    slug: 'mosaic-light-candle',
    category: 'bloom-light-candles',
    description: 'Pair of Bloom Light candles featuring artistic flower embeds, ideal for bedside tables, romantic dinners, and festival decor.',
    images: ['/images/products/bloom_light_hand.jpg', '/images/products/bloom_light_tray.jpg', '/images/catalog/bloom_light_catalog.jpg'],
    price: 549,
    priceOnRequest: false,
    variants: [
      { id: 'bl-002-multi', name: 'Amber Glow Duo' },
      { id: 'bl-002-pastel', name: 'Floral Garden Duo' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['statement', 'decor'],
  },
  {
    id: 'bl-003',
    name: 'Bloom Light Celebration Set (Pack of 6)',
    slug: 'terrazzo-bloom-candle',
    category: 'bloom-light-candles',
    description: 'Complete set of 6 Bloom Light floral candles arranged for centerpieces and festival parties. Ambient, fragrant, and handcrafted with care.',
    images: ['/images/products/bloom_light_tray.jpg', '/images/catalog/bloom_light_catalog.jpg'],
    price: 1399,
    priceOnRequest: false,
    variants: [
      { id: 'bl-003-blush', name: 'Assorted Floral Embeds' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['party', 'festive'],
    newArrival: true,
  },

  // ── Bloomlit Diyas ─────────────────────────────────────────
  {
    id: 'bd-001',
    name: 'Bloomlit Diya with Tassel & Gold Trim',
    slug: 'traditional-bloom-diya',
    category: 'bloomlit-diyas',
    description: 'Authentic handcrafted festive diya with intricate scalloped golden rim, shimmering gold dust wax, and festive bright tassel detailing.',
    images: ['/images/products/bloomlit_diyas_tassel.jpg', '/images/products/bloomlit_diyas_scalloped.jpg', '/images/catalog/bloomlit_diyas_catalog.jpg'],
    price: 199,
    priceOnRequest: false,
    variants: [
      { id: 'bd-001-gold', name: 'Golden Rim with Yellow Tassel' },
      { id: 'bd-001-red', name: 'Golden Rim with Crimson Tassel' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['festive', 'traditional'],
    featured: true,
  },
  {
    id: 'bd-002',
    name: 'Bloomlit Golden Scalloped Diya (Pair)',
    slug: 'lotus-petal-diya',
    category: 'bloomlit-diyas',
    description: 'Pair of artisanal golden scalloped rim diyas poured with organic wax, dried botanical petals, and fine golden shimmer. A Diwali centerpiece favorite.',
    images: ['/images/products/bloomlit_diyas_scalloped.jpg', '/images/products/bloomlit_diyas_tassel.jpg', '/images/catalog/bloomlit_diyas_catalog.jpg'],
    price: 249,
    priceOnRequest: false,
    variants: [
      { id: 'bd-002-white', name: 'Gold Foil & Petal Fill' },
      { id: 'bd-002-pastel', name: 'Pure Gold Sparkle' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['diwali', 'pooja'],
    newArrival: true,
  },
  {
    id: 'bd-003',
    name: 'Bloomlit Royal Diya Set (Pack of 4)',
    slug: 'floating-bloom-diya-set',
    category: 'bloomlit-diyas',
    description: 'Set of 4 handcrafted Diwali diyas with ornate golden borders and wax filling. Perfect for pooja mandirs, rangoli highlights, and festive gifting.',
    images: ['/images/products/bloomlit_diyas_scalloped.jpg', '/images/catalog/bloomlit_diyas_catalog.jpg'],
    price: 449,
    priceOnRequest: false,
    variants: [
      { id: 'bd-003-warm', name: 'Assorted Golden Scalloped' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['set', 'traditional'],
  },

  // ── Diwali Hampers ─────────────────────────────────────────
  {
    id: 'dh-001',
    name: 'Bloom & Glow Signature Diwali Hamper',
    slug: 'festive-essentials-hamper',
    category: 'diwali-hampers',
    description: 'Our bestselling festive gift hamper in a floral window box. Includes 1 pair of handcrafted big diya, 1 pair of decorated matka diya, and 1 scented candle, packed with sparkling shred filler and a handwritten greeting card.',
    images: ['/images/products/diwali_hamper_boxes.jpg', '/images/products/diwali_hamper_contents.jpg', '/images/products/diwali_hamper_bulk.jpg', '/images/catalog/diwali_hampers_catalog.jpg'],
    price: 649,
    priceOnRequest: false,
    variants: [
      { id: 'dh-001-classic', name: 'Full Hamper (1 Pair Big Diya + 1 Pair Matka Diya + Scented Candle)' },
      { id: 'dh-001-premium', name: 'Deluxe Hamper (with Extra Scented Shot)', priceModifier: 150 },
    ],
    customizationOptions: [
      {
        id: 'dh-001-note',
        label: 'Handwritten Gift Note',
        type: 'textarea',
        placeholder: 'Add custom note: e.g. Wishing you a glowy & bloomy Diwali...',
      },
    ],
    available: true,
    preparationTime: '2–3 business days',
    tags: ['gift', 'diwali', 'bestseller'],
    featured: true,
  },
  {
    id: 'dh-002',
    name: 'Custom Corporate & Bulk Diwali Hamper',
    slug: 'grand-celebration-hamper',
    category: 'diwali-hampers',
    description: 'Premium curated gift hampers designed for corporate gifting, family celebrations, and wedding favors. For bulk orders, prices are customized as per quantity and requirements.',
    images: ['/images/products/diwali_hamper_bulk.jpg', '/images/products/diwali_hamper_boxes.jpg', '/images/catalog/bulk_orders_catalog.jpg'],
    price: null,
    priceOnRequest: true,
    variants: [],
    customizationOptions: [
      {
        id: 'dh-002-pref',
        label: 'Bulk Order Requirements',
        type: 'textarea',
        placeholder: 'Specify estimated quantity, required delivery date, and customization preferences...',
        required: true,
      },
    ],
    available: true,
    preparationTime: '3–7 business days',
    tags: ['luxury', 'corporate', 'bulk'],
  },
  {
    id: 'dh-003',
    name: 'Bloom & Glow Deluxe Diya & Candle Gift Box',
    slug: 'mini-bloom-box',
    category: 'diwali-hampers',
    description: 'Charming festive presentation box with handcrafted gold-scalloped diyas and an artisan scented candle.',
    images: ['/images/products/diwali_hamper_contents.jpg', '/images/products/diwali_hamper_boxes.jpg', '/images/catalog/diwali_hampers_catalog.jpg'],
    price: 499,
    priceOnRequest: false,
    variants: [
      { id: 'dh-003-floral', name: 'Signature Packaging' },
    ],
    customizationOptions: [
      {
        id: 'dh-003-note',
        label: 'Gift Message (optional)',
        type: 'text',
        placeholder: 'e.g., Wishing you a sparkling Diwali!',
      },
    ],
    available: true,
    tags: ['compact', 'gift'],
    newArrival: true,
  },

  // ── Raas Glow ──────────────────────────────────────────────
  {
    id: 'rg-001',
    name: 'Raas Glow Kutchi Mirror Work Candle Cups (Set of 2)',
    slug: 'mirror-work-candle',
    category: 'raas-glow',
    description: 'Festive Navratri candles wrapped in authentic Kutchi mirror embroidery, real cowrie shells, and pearls, poured with shimmering scented coral wax.',
    images: ['/images/products/raas_glow_mirror_cups.jpg', '/images/products/raas_glow_mirror_detail.jpg', '/images/catalog/raas_glow_catalog.jpg'],
    price: 499,
    priceOnRequest: false,
    variants: [
      { id: 'rg-001-coral', name: 'Coral Shimmer Wax' },
      { id: 'rg-001-gold', name: 'Golden Glow Wax' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['navratri', 'mirror-work', 'bestseller'],
    featured: true,
  },
  {
    id: 'rg-002',
    name: 'Raas Glow Pearl Border Diya Cups (Set of 6)',
    slug: 'garba-night-glow-candle',
    category: 'raas-glow',
    description: 'Set of 6 vibrant glass candle cups adorned with delicate pearl borders and sparkling organic wax in festive tones (orange, emerald, red, peach, gold, and white).',
    images: ['/images/products/raas_glow_pearl_cups.jpg', '/images/products/raas_glow_festive_spread.jpg', '/images/catalog/raas_glow_catalog.jpg'],
    price: 699,
    priceOnRequest: false,
    variants: [
      { id: 'rg-002-multi', name: 'Vibrant Multi-Color Set (6 Pcs)' },
    ],
    customizationOptions: [],
    available: true,
    tags: ['pearls', 'festive', 'traditional'],
    featured: true,
    newArrival: true,
  },
  {
    id: 'rg-003',
    name: 'Artisan Mithai / Indian Sweets Candle Box',
    slug: 'artisan-mithai-candle-box',
    category: 'raas-glow',
    description: 'Delightfully realistic handcrafted Indian sweet candles in a rustic kraft gift box with natural shred filler! Includes 2 Kaju Katli candles with real silver leaf (vark), 1 textured Motichoor Laddu candle, and 1 festive Gujiya candle. (Coming Soon — Not launched yet! Register early interest via WhatsApp).',
    images: ['/images/products/mithai_sweet_candles_box.jpg', '/images/products/raas_glow_festive_spread.jpg', '/images/catalog/raas_glow_catalog.jpg'],
    price: 549,
    priceOnRequest: false,
    variants: [
      { id: 'rg-003-box', name: 'Assorted Mithai Box (4 Pieces)' },
    ],
    customizationOptions: [],
    available: false,
    comingSoon: true,
    tags: ['mithai', 'festive', 'coming soon', 'gift', 'indian sweets'],
    featured: true,
    newArrival: false,
  },
];

export const products: Product[] = rawProducts.map(p => ({
  ...p,
  images: p.images.map(img => assetUrl(img)),
}));

// ============================================================
// Lookbook Catalog Slides (from original brand catalog)
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
    id: 'catalog-1',
    title: 'Bloomy Glow Shots',
    subtitle: 'Layered & Solid Handcrafted Candle Shots',
    categorySlug: 'bloomy-glow-shots',
    image: '/images/catalog/bloomy_glow_shots_catalog.jpg',
  },
  {
    id: 'catalog-2',
    title: 'Bloom Light Candles',
    subtitle: 'Ambient Floral Embed Glass Votives',
    categorySlug: 'bloom-light-candles',
    image: '/images/catalog/bloom_light_catalog.jpg',
  },
  {
    id: 'catalog-3',
    title: "Bloomlit Diya's",
    subtitle: 'Handcrafted Festive Diyas with Scalloped Rims & Tassels',
    categorySlug: 'bloomlit-diyas',
    image: '/images/catalog/bloomlit_diyas_catalog.jpg',
  },
  {
    id: 'catalog-4',
    title: 'Diwali Hampers',
    subtitle: '1 Pair Big Diya + 1 Pair Matka Diya + Scented Candle',
    categorySlug: 'diwali-hampers',
    image: '/images/catalog/diwali_hampers_catalog.jpg',
  },
  {
    id: 'catalog-5',
    title: 'Raas Glow Collection',
    subtitle: 'Navratri Special Mirror Work, Cowrie Shells & Pearl Diyas',
    categorySlug: 'raas-glow',
    image: '/images/catalog/raas_glow_catalog.jpg',
  },
  {
    id: 'catalog-6',
    title: 'Bulk & Corporate Orders',
    subtitle: 'Prices discussed as per custom requirements',
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
  return products.find(p => p.slug === slug || (slug === 'rangoli-candle-set' && p.id === 'rg-003'));
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
