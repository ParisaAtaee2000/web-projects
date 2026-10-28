import { Hero } from "../../components/hero/Hero";
import { CategorySection } from "../../components/categories/CategorySection";
import { FeaturedProductsSection } from "../../components/home/FeaturedProductsSection";
import { MakerSpotlightSection } from "../../components/home/MakerSpotlightSection";
import { CustomOrderSection } from "../../components/home/CustomOrderSection";
import { WhyMakerSection } from "../../components/home/WhyMakerSection";
import { Sidebar } from "../../components/sidebar/Sidebar";
import "../../components/home/home-sections.css";
import "./home.css";

export function HomePage() {
  return (
    <main className="home-page" dir="rtl">
      <div className="home-hero-layout">
        <Sidebar />
        <Hero />
      </div>
      <CategorySection />
      <FeaturedProductsSection />
      <MakerSpotlightSection />
      <CustomOrderSection />
      <WhyMakerSection />
    </main>
  );
}
