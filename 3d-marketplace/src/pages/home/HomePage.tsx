import { Hero } from "../../components/hero/Hero";
import { CategorySection } from "../../components/categories/CategorySection";
import "./home.css";

export function HomePage() {
  return (
    <main className="home-page" dir="rtl">
      <Hero />
      <CategorySection />
    </main>
  );
}
