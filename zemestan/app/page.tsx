import { Header, MobileNav } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Lookbook } from "@/components/home/Lookbook";
import { CategoryIndex } from "@/components/home/CategoryIndex";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WholesaleValue } from "@/components/home/WholesaleValue";
import { BrandStory } from "@/components/home/BrandStory";

export default function HomePage(){
  return <main dir="rtl"><Header/><Hero/><Lookbook/><CategoryIndex/><FeaturedProducts/><WholesaleValue/><BrandStory/><Footer/><MobileNav/></main>;
}
