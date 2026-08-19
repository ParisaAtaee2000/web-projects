import { products } from "@/data/products";
import { Header, MobileNav } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { InventorySection } from "@/components/product/InventorySection";
import { notFound } from "next/navigation";
import type { Product } from "@/types/product";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item: Product) => item.slug === slug);
  if (!product) notFound();

  return (
    <main dir="rtl">
      <Header />
      <section className="container product-layout">
        <ProductGallery />
        <ProductInfo product={product} />
      </section>
      <InventorySection product={product} />
      <section id="details" className="container section">
        <div className="section-head"><div><div className="section-kicker">PRODUCT DETAILS</div><h2 className="section-title">مشخصات محصول</h2></div></div>
        <div className="detail-grid">
          <div className="detail-cell"><strong>کد محصول</strong><span>{product.code}</span></div>
          <div className="detail-cell"><strong>حداقل سفارش</strong><span>{product.minWholesaleQuantity.toLocaleString("fa-IR")} عدد</span></div>
          <div className="detail-cell"><strong>جنس</strong><span>{product.material}</span></div>
          <div className="detail-cell"><strong>فیت</strong><span>{product.fit}</span></div>
          <div className="detail-cell"><strong>فصل</strong><span>{product.season}</span></div>
          <div className="detail-cell"><strong>سایزبندی</strong><span>L / XL / 2XL / 3XL</span></div>
        </div>
      </section>
      <Footer />
      <MobileNav />
    </main>
  );
}
