"use client";

import { createContext, useContext, useMemo, useReducer } from "react";
import type { Product } from "@/types/product";
import { getWholesalePackPrice } from "@/types/product";

type CartItem = {
  product: Product;
  packCount: number;
};

type State = { items: CartItem[] };
type Action =
  | { type: "add"; item: CartItem }
  | { type: "setPackCount"; id: string; packCount: number }
  | { type: "remove"; id: string }
  | { type: "clear" };

const initialState: State = { items: [] };

function clampPackCount(product: Product, packCount: number) {
  return Math.max(product.minWholesalePacks, Math.floor(packCount / product.quantityStep) * product.quantityStep);
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const existing = state.items.find((item) => item.product.id === action.item.product.id);
      if (!existing) return { items: [...state.items, action.item] };
      return {
        items: state.items.map((item) =>
          item === existing
            ? { ...item, packCount: clampPackCount(item.product, item.packCount + action.item.packCount) }
            : item,
        ),
      };
    }
    case "setPackCount":
      return {
        items: state.items
          .map((item) => (item.product.id === action.id ? { ...item, packCount: clampPackCount(item.product, action.packCount) } : item))
          .filter((item) => item.packCount > 0),
      };
    case "remove":
      return { items: state.items.filter((item) => item.product.id !== action.id) };
    case "clear":
      return initialState;
  }
}

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  packCount: number;
  subtotal: number;
  hasInvalidItems: boolean;
  addItem: (product: Product, packCount?: number) => void;
  setPackCount: (id: string, packCount: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo<CartContextValue>(() => {
    const subtotal = state.items.reduce((sum, item) => sum + getWholesalePackPrice(item.product) * item.packCount, 0);
    const packCount = state.items.reduce((sum, item) => sum + item.packCount, 0);
    const itemCount = state.items.reduce((sum, item) => sum + item.packCount * item.product.wholesalePackSize, 0);
    const hasInvalidItems = state.items.some((item) => item.packCount < item.product.minWholesalePacks);
    return {
      items: state.items,
      itemCount,
      packCount,
      subtotal,
      hasInvalidItems,
      addItem: (product, count = product.minWholesalePacks) => dispatch({ type: "add", item: { product, packCount: clampPackCount(product, count) } }),
      setPackCount: (id, count) => dispatch({ type: "setPackCount", id, packCount: count }),
      removeItem: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
