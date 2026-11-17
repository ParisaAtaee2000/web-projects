import { NextResponse } from "next/server";
import { createWholesaleOrder } from "@/services/orders";
import type { WholesaleOrderDraft } from "@/types/order";

export async function POST(request: Request) {
  try {
    const draft = (await request.json()) as WholesaleOrderDraft;
    const order = await createWholesaleOrder(draft);
    return NextResponse.json({ data: order }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "ثبت سفارش ناموفق بود.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
