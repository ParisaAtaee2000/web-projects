const STORAGE_KEY = "makera-demo-favorites";
const FAVORITES_EVENT = "makera-favorites-updated";

export function readFavoriteIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteId(id: string) {
  if (typeof window === "undefined") return;
  const current = readFavoriteIds();
  const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  } catch {
    // Do not break browsing when storage is unavailable.
  }
}

export function subscribeToFavorites(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(FAVORITES_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(FAVORITES_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
