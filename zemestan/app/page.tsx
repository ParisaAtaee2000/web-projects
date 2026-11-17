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
  title: `${BRAND_NAME} | پوشاک مردانه زمستانه برای خرید عمده`,
  description: `مدل‌های زمستانه مردانه برای فروشگاه‌ها و بوتیک‌ها؛ خرید عمده کاپشن، کت و پالتو با شرایط روشن و جین ۸تایی.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${BRAND_NAME} | پوشاک مردانه زمستانه برای خرید عمده`,
    description: SITE_DESCRIPTION,
    type: "website",
  },
};

export default function HomePage(){
  return <main dir="rtl"><Header/><Hero/><Lookbook/><CategoryIndex/><FeaturedProducts/><WholesaleValue/><BrandStory/><Footer/><MobileNav/></main>;
}
