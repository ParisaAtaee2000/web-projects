import { Header, MobileNav } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Lookbook } from "@/components/home/Lookbook";
import { CategoryIndex } from "@/components/home/CategoryIndex";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WholesaleValue } from "@/components/home/WholesaleValue";
import { BrandStory } from "@/components/home/BrandStory";
import type { Metadata } from "next";
import { BRAND_NAME, SITE_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${BRAND_NAME} | تولید و فروش عمده پوشاک مردانه زمستانه`,
  description: `${BRAND_NAME} تولیدکننده و فروشنده عمده کاپشن، کت و پالتو مردانه زمستانه؛ خرید مستقیم با حداقل سفارش ۸ عدد.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${BRAND_NAME} | تولید و فروش عمده پوشاک مردانه زمستانه`,
    description: SITE_DESCRIPTION,
    type: "website",
  },
};

export default function HomePage(){
  return <main dir="rtl"><Header/><Hero/><Lookbook/><CategoryIndex/><FeaturedProducts/><WholesaleValue/><BrandStory/><Footer/><MobileNav/></main>;
}
