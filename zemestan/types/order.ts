import type { ProductColor, ProductSize } from "@/types/product";

export type WholesaleOrderItem = {
  productId: string;
  productCode: string;
  productName: string;
  color: ProductColor;
  size: ProductSize;
  quantity: number;
  unitPrice: number;
};

export type ShippingMethod = "postal";

export type WholesaleOrderDraft = {
  customerName: string;
  storeName: string;
  phone: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
  notes?: string;
  shippingMethod: ShippingMethod;
  items: WholesaleOrderItem[];
};

export type WholesaleOrder = WholesaleOrderDraft & {
  id: string;
  status: "draft" | "submitted" | "processing" | "completed" | "cancelled";
  subtotal: number;
  shippingCost: number | null;
  total: number;
  createdAt: string;
};
