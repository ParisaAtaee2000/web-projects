import { products as sourceProducts } from "@/data/products";
import type { Product as LegacyProduct, ProductColor as LegacyColor } from "@/types/product-model";

const colorValues: Record<string, string> = {
  "مشکی": "#20221e",
  "زغالی": "#4b4940",
  "قهوه‌ای": "#5a4632",
  "سبز زیتونی": "#35412f",
};

const categoryLabels: Record<string, string> = {
  parka: "پارکا و کاپشن",
  coat: "پالتو کلاسیک",
  leather: "کت چرم",
  bomber: "بمبر و اسپرت",
  raincoat: "بارانی و اورکت",
  jacket: "کت مردانه",
};

export const products: LegacyProduct[] = sourceProducts.map((product) => ({
  name: product.name,
  code: product.code,
  slug: product.slug,
  category: product.category,
  categoryLabel: categoryLabels[product.category] ?? product.category,
  price: product.wholesalePrice,
  moq: product.minWholesaleQuantity,
  isNew: product.id === "p-1001",
  colors: product.colors.map<LegacyColor>((name) => ({ name, value: colorValues[name] ?? "#4b4940" })),
  sizes: product.sizes,
}));

export const categories = [
  { label: "پارکا و کاپشن", value: "parka" },
  { label: "پالتو کلاسیک", value: "coat" },
  { label: "کت چرم", value: "leather" },
  { label: "بمبر و اسپرت", value: "bomber" },
  { label: "بارانی و اورکت", value: "raincoat" },
] as const;
