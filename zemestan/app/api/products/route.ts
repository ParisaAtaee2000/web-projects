import { NextResponse } from "next/server";
import { listProducts } from "@/services/products";
import type { ProductCategory } from "@/types/product-model";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const rawCategory = searchParams.get("category") ?? "";
  const category = rawCategory as ProductCategory | "";
  const limitValue = Number(searchParams.get("limit"));
  const limit = Number.isFinite(limitValue) && limitValue > 0 ? limitValue : undefined;

  const products = await listProducts({ q, category, limit });
  return NextResponse.json({ data: products, meta: { count: products.length } });
}
