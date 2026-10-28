export interface CartProduct {
  id: string;
  title: string;
  maker: string;
  price: number;
  image: string;
  alt: string;
  categoryLabel: string;
}

export interface CartItem extends CartProduct {
  quantity: number;
}

const STORAGE_KEY = "makera-demo-cart";
const CART_EVENT = "makera-cart-updated";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CartItem =>
      item && typeof item.id === "string" &&
      typeof item.title === "string" &&
      typeof item.price === "number" &&
      typeof item.quantity === "number" &&
      item.quantity > 0,
    );
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event(CART_EVENT));
  } catch {
    // The UI remains usable in-memory when browser storage is unavailable.
  }
}

export function addToCart(product: CartProduct) {
  const cart = readCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    saveCart(cart.map((item) => item.id === product.id
      ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
      : item));
    return;
  }
  saveCart([...cart, { ...product, quantity: 1 }]);
}

export function setCartQuantity(productId: string, quantity: number) {
  if (quantity < 1) {
    saveCart(readCart().filter((item) => item.id !== productId));
    return;
  }
  saveCart(readCart().map((item) => item.id === productId
    ? { ...item, quantity: Math.min(Math.floor(quantity), 99) }
    : item));
}

export function removeFromCart(productId: string) {
  saveCart(readCart().filter((item) => item.id !== productId));
}

export function clearCart() {
  saveCart([]);
}

export function subscribeToCart(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CART_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CART_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function parseLocalizedPrice(value: string) {
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  const arabic = "٠١٢٣٤٥٦٧٨٩";
  const western = value
    .replace(/[۰-۹]/g, (digit) => String(persian.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabic.indexOf(digit)))
    .replace(/[^0-9]/g, "");
  return Number(western) || 0;
}
