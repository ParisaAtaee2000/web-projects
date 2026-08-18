"use client";

import { createContext, useContext, useMemo, useReducer } from "react";
import type { Product, ProductColor, ProductSize } from "@/types/product";

type CartItem = {
  product: Product;
  quantity: number;
  color: ProductColor;
  size: ProductSize;
};

type State = { items: CartItem[] };
type Action =
  | { type: "add"; item: CartItem }
  | { type: "setQuantity"; id: string; quantity: number }
  | { type: "remove"; id: string }
  | { type: "clear" };

const initialState: State = { items: [] };

function clampQuantity(product: Product, quantity: number) {
  const min = product.minWholesaleQuantity;
  const step = product.quantityStep;
  if (quantity < min) return min;
  return min + Math.floor((quantity - min) / step) * step;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const existing = state.items.find(
        (item) =>
          item.product.id === action.item.product.id &&
          item.color === action.item.color &&
          item.size === action.item.size,
      );
      if (!existing) return { items: [...state.items, action.item] };
      return {
        items: state.items.map((item) =>
          item === existing
            ? { ...item, quantity: clampQuantity(item.product, item.quantity + action.item.quantity) }
            : item,
        ),
      };
    }
    case "setQuantity":
      return {
        items: state.items
          .map((item) =>
            item.product.id === action.id
              ? { ...item, quantity: Math.min(clampQuantity(item.product, action.quantity), item.product.stock) }
              : item,
          )
          .filter((item) => item.quantity > 0),
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
  subtotal: number;
  hasInvalidItems: boolean;
  addItem: (product: Product, color: ProductColor, size: ProductSize, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo<CartContextValue>(() => {
    const subtotal = state.items.reduce((sum, item) => sum + item.product.wholesalePrice * item.quantity, 0);
    const hasInvalidItems = state.items.some((item) => item.quantity < item.product.minWholesaleQuantity);
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    return {
      items: state.items,
      itemCount,
      subtotal,
      hasInvalidItems,
      addItem: (product, color, size, quantity = product.minWholesaleQuantity) =>
        dispatch({ type: "add", item: { product, color, size, quantity: clampQuantity(product, quantity) } }),
      setQuantity: (id, quantity) => dispatch({ type: "setQuantity", id, quantity }),
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
