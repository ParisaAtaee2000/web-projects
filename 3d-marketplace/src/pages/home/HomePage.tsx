import { Hero } from "../../components/hero/Hero";
import { CategorySection } from "../../components/categories/CategorySection";
import { FeaturedProductsSection } from "../../components/home/FeaturedProductsSection";
import { MakerSpotlightSection } from "../../components/home/MakerSpotlightSection";
import { CustomOrderSection } from "../../components/home/CustomOrderSection";
import "../../components/home/home-sections.css";
import "./home.css";

export function HomePage() {
  return (
    <main className="home-page" dir="rtl">
      <Hero />
      <CategorySection />
      <FeaturedProductsSection />
      <MakerSpotlightSection />
      <CustomOrderSection />
    </main>
  );
}
