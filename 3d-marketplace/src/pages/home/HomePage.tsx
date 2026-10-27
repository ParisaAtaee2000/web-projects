import { AppShell } from "../../components/layout/AppShell";
import { Hero } from "../../components/hero/Hero";
import { CategorySection } from "../../components/categories/CategorySection";
import "./home.css";

export function HomePage() {
  return (
    <AppShell>
      <div className="home-page">
        <Hero />
        <CategorySection />
      </div>
    </AppShell>
  );
}
