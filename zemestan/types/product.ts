export type ProductCategory = "jacket" | "coat" | "parka" | "leather" | "bomber" | "raincoat";

export type ProductColor = "مشکی" | "زغالی" | "قهوه‌ای" | "سبز زیتونی" | "شتری";
export type ProductSize = "L" | "XL" | "2XL" | "3XL";

export type InventoryVariant = {
  color: ProductColor;
  size: ProductSize;
  stock: number;
};

export type WholesaleUnit = "jean";

export type Product = {
  id: string;
  slug: string;
  name: string;
  code: string;
  category: ProductCategory;
  wholesalePrice: number;
  wholesaleUnit: WholesaleUnit;
  wholesalePackSize: 8;
  minWholesalePacks: 1;
  wholesalePackLabel: string;
  allowsVariantSelection: false;
  quantityStep: 1;
  colors: ProductColor[];
  sizes: ProductSize[];
  variants: InventoryVariant[];
  material: string;
  season: string;
  fit: string;
  isActive: boolean;
};

export function getVariantStock(product: Product, color: ProductColor, size: ProductSize): number {
  return product.variants.find((variant) => variant.color === color && variant.size === size)?.stock ?? 0;
}

export function getColorSizeMatrix(product: Product, color: ProductColor) {
  return product.sizes.map((size) => ({ size, stock: getVariantStock(product, color, size) }));
}

export function getWholesalePackPrice(product: Product): number {
  return product.wholesalePrice * product.wholesalePackSize;
}
