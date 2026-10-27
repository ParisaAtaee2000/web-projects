export type ProductKind = "printed" | "printer" | "material" | "accessory" | "digital-file";
export interface Product {
  id: string | number;
  name: string;
  maker: string;
  price: string;
  category: string;
  kind: ProductKind;
  image: string;
  tag?: string;
}
