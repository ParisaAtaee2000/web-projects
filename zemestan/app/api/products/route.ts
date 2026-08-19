import { NextResponse } from "next/server";
import { listProducts } from "@/services/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const limitValue = Number(searchParams.get("limit"));
  const limit = Number.isFinite(limitValue) && limitValue > 0 ? limitValue : undefined;

  const products = await listProducts({ q, category: category as never, limit });
  return NextResponse.json({ data: products, meta: { count: products.length } });
}
