export type OrderStatus = "draft" | "submitted" | "accepted" | "in-production" | "shipped" | "completed" | "cancelled";
export interface CustomOrderRequest {
  name: string;
  contact: string;
  description: string;
  referenceUrl?: string;
  material?: string;
  quantity?: number;
}
