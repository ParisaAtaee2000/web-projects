import type { Metadata } from "next";
import { products } from "@/data/products";
import { Header, MobileNav } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { InventorySection } from "@/components/product/InventorySection";
import { notFound } from "next/navigation";
import type { Product } from "@/types/product";
import { BRAND_NAME, absoluteUrl } from "@/lib/seo";
import { getWholesalePackPrice } from "@/types/product";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item: Product) => item.slug === slug);
  if (!product) return {};

  const title = `${product.name} | خرید عمده جین ۸تایی | ${BRAND_NAME}`;
  const description = `${product.name} با کد ${product.code} از ${BRAND_NAME}. فروش عمده فقط به‌صورت جین ۸تایی با ترکیب کامل رنگ و سایز؛ حداقل سفارش ۱ جین.`;
  const canonical = absoluteUrl(`/product/${product.slug}`);

  return {
    title,
    description,
    alternates: { canonical },
    keywords: [product.name, product.code, "جین ۸تایی", "خرید عمده", "کاپشن مردانه عمده", "پوشاک مردانه زمستانه", BRAND_NAME],
    openGraph: { title, description, url: canonical, type: "website", siteName: BRAND_NAME },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item: Product) => item.slug === slug);
  if (!product) notFound();

  const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    category: product.category,
    material: product.material,
    brand: { "@type": "Brand", name: BRAND_NAME },
    description: `${product.name} برای فروش عمده به‌صورت جین ۸تایی با ترکیب کامل رنگ و سایز.`,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/product/${product.slug}`),
      priceCurrency: "IRR",
      price: getWholesalePackPrice(product) * 10,
      availability: totalStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: BRAND_NAME },
    },
  };

  return (
    <main dir="rtl">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <section className="container product-layout">
        <ProductGallery />
        <ProductInfo product={product} />
      </section>
      <InventorySection product={product} />
      <section id="details" className="container section">
        <div className="section-head"><div><div className="section-kicker">PRODUCT DETAILS</div><h2 className="section-title">مشخصات محصول</h2></div></div>
        <div className="detail-grid">
          <div className="detail-cell"><strong>کد محصول</strong><span>{product.code}</span></div>
          <div className="detail-cell"><strong>واحد فروش عمده</strong><span>جین ۸تایی</span></div>
          <div className="detail-cell"><strong>حداقل سفارش</strong><span>۱ جین = ۸ عدد</span></div>
          <div className="detail-cell"><strong>جنس</strong><span>{product.material}</span></div>
          <div className="detail-cell"><strong>فیت</strong><span>{product.fit}</span></div>
          <div className="detail-cell"><strong>فصل</strong><span>{product.season}</span></div>
          <div className="detail-cell"><strong>سایزبندی داخل جین</strong><span>L / XL / 2XL / 3XL</span></div>
          <div className="detail-cell"><strong>انتخاب رنگ و سایز</strong><span>امکان انتخاب جداگانه ندارد؛ ترکیب جین ثابت است.</span></div>
        </div>
      </section>
      <Footer />
      <MobileNav />
    </main>
  );
}
