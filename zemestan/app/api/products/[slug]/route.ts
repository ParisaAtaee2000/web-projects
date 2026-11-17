import { NextResponse } from "next/server";
import { getProductBySlug } from "@/services/products";

type Props = { params: Promise<{ slug: string }> };

export async function GET(_: Request, { params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ error: "محصول پیدا نشد." }, { status: 404 });
  }

  return NextResponse.json({ data: product });
}
