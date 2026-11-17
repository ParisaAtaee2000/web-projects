import { products } from "@/data/catalog";
import type { Product } from "@/types/product-model";

export type ProductQuery = {
  q?: string;
  category?: Product["category"] | "";
  limit?: number;
};

const normalize = (value: string) => value.trim().toLocaleLowerCase("fa-IR");

export async function listProducts(query: ProductQuery = {}): Promise<Product[]> {
  const q = normalize(query.q ?? "");
  const filtered = products.filter((product) => {
    const haystack = normalize(`${product.name} ${product.code} ${product.categoryLabel}`);
    const matchesQuery = !q || haystack.includes(q);
    const matchesCategory = !query.category || product.category === query.category;
    return matchesQuery && matchesCategory;
  });

  return typeof query.limit === "number" ? filtered.slice(0, query.limit) : filtered;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getProductByCode(code: string): Promise<Product | null> {
  return products.find((product) => product.code === code) ?? null;
}
