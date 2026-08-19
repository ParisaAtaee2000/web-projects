export type ProductCategory = "parka" | "coat" | "leather" | "bomber" | "raincoat";
export type ProductColor = { name: string; value: string };
export type ProductSize = "M" | "L" | "XL" | "XXL";

export type Product = {
  name: string;
  code: string;
  slug: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  moq: number;
  isNew?: boolean;
  colors: ProductColor[];
  sizes: ProductSize[];
};