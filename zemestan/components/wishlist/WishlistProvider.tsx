"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "@/types/product";

type WishlistContextValue = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (product: Product) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const value = useMemo(() => ({
    ids,
    has: (id: string) => ids.includes(id),
    toggle: (product: Product) => setIds((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id]),
  }), [ids]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside WishlistProvider");
  return context;
}
