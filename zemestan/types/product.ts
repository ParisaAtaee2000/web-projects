export type ProductCategory =
  | "jacket"
  | "coat"
  | "parka"
  | "leather"
  | "bomber";

export type ProductColor = "مشکی" | "زغالی" | "قهوه‌ای" | "سبز زیتونی";
export type ProductSize = "M" | "L" | "XL" | "XXL";

export type Product = {
  id: string;
  slug: string;
  name: string;
  code: string;
  category: ProductCategory;
  wholesalePrice: number;
  minWholesaleQuantity: number;
  quantityStep: number;
  stock: number;
  colors: ProductColor[];
  sizes: ProductSize[];
  material: string;
  season: string;
  fit: string;
  isActive: boolean;
};
