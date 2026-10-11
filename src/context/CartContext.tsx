// ============================================================
// Bloom & Glow — Cart Context & State Management
// ============================================================

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { CartItem, CartState, Product, ProductVariant } from '../types';

const STORAGE_KEY = 'bloom-and-glow-cart';

// ── Actions ──────────────────────────────────────────────────

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; variant: ProductVariant | null; quantity: number; customizations: Record<string, string> } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variantId: string | null } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; variantId: string | null; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

// ── Initial State ────────────────────────────────────────────

function loadCartFromStorage(): CartState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as CartState;
      return parsed;
    }
  } catch {
    // Corrupted data; start fresh
  }
  return { items: [], lastUpdated: Date.now() };
}

const initialState: CartState = loadCartFromStorage();

// ── Reducer ──────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, variant, quantity, customizations } = action.payload;
      const existingIndex = state.items.findIndex(
        item => item.product.id === product.id && (item.variant?.id ?? null) === (variant?.id ?? null)
      );

      let newItems: CartItem[];
      if (existingIndex >= 0) {
        newItems = state.items.map((item, i) =>
          i === existingIndex
            ? { ...item, quantity: item.quantity + quantity, customizations: { ...item.customizations, ...customizations } }
            : item
        );
      } else {
        newItems = [...state.items, { product, variant, quantity, customizations }];
      }

      return { items: newItems, lastUpdated: Date.now() };
    }

    case 'REMOVE_ITEM': {
      const { productId, variantId } = action.payload;
      return {
        items: state.items.filter(
          item => !(item.product.id === productId && (item.variant?.id ?? null) === variantId)
        ),
        lastUpdated: Date.now(),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, variantId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          items: state.items.filter(
            item => !(item.product.id === productId && (item.variant?.id ?? null) === variantId)
          ),
          lastUpdated: Date.now(),
        };
      }
      return {
        items: state.items.map(item =>
          item.product.id === productId && (item.variant?.id ?? null) === variantId
            ? { ...item, quantity }
            : item
        ),
        lastUpdated: Date.now(),
      };
    }

    case 'CLEAR_CART':
      return { items: [], lastUpdated: Date.now() };

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────

interface CartContextType {
  state: CartState;
  addItem: (product: Product, variant: ProductVariant | null, quantity: number, customizations?: Record<string, string>) => void;
  removeItem: (productId: string, variantId: string | null) => void;
  updateQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  hasUnpricedItems: boolean;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

// ── Provider ─────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isCartOpen, setCartOpen] = React.useState(false);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage full or unavailable
    }
  }, [state]);

  const addItem = useCallback(
    (product: Product, variant: ProductVariant | null, quantity: number, customizations: Record<string, string> = {}) => {
      if (!product.available) return;
      if (quantity <= 0) return;
      dispatch({ type: 'ADD_ITEM', payload: { product, variant, quantity, customizations } });
    },
    []
  );

  const removeItem = useCallback((productId: string, variantId: string | null) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId } });
  }, []);

  const updateQuantity = useCallback((productId: string, variantId: string | null, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, variantId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  // Only sum prices for items that have a set price
  const subtotal = state.items.reduce((sum, item) => {
    if (item.product.price === null) return sum;
    const variantMod = item.variant?.priceModifier ?? 0;
    return sum + (item.product.price + variantMod) * item.quantity;
  }, 0);

  const hasUnpricedItems = state.items.some(item => item.product.priceOnRequest);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        hasUnpricedItems,
        isCartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
