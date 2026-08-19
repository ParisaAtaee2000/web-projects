import type { WholesaleOrder, WholesaleOrderDraft } from "@/types/order";

const orders = new Map<string, WholesaleOrder>();

function calculateSubtotal(draft: WholesaleOrderDraft) {
  return draft.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

function validateDraft(draft: WholesaleOrderDraft) {
  if (!draft.customerName.trim()) throw new Error("نام مشتری الزامی است.");
  if (!draft.storeName.trim()) throw new Error("نام فروشگاه الزامی است.");
  if (!/^09\d{9}$/.test(draft.phone)) throw new Error("شماره تماس معتبر نیست.");
  if (!draft.address.trim()) throw new Error("آدرس الزامی است.");
  if (draft.shippingMethod !== "postal") throw new Error("روش ارسال نامعتبر است.");
  if (!draft.items.length) throw new Error("سبد سفارش خالی است.");
}

export async function createWholesaleOrder(draft: WholesaleOrderDraft): Promise<WholesaleOrder> {
  validateDraft(draft);

  const subtotal = calculateSubtotal(draft);
  const id = `ZW-${Date.now()}`;
  const order: WholesaleOrder = {
    ...draft,
    id,
    status: "submitted",
    subtotal,
    shippingCost: null,
    total: subtotal,
    createdAt: new Date().toISOString(),
  };

  orders.set(id, order);
  return order;
}

export async function getWholesaleOrder(id: string): Promise<WholesaleOrder | null> {
  return orders.get(id) ?? null;
}
