import { AppShell } from "../../components/layout/AppShell";
import { Hero } from "../../components/hero/Hero";
import "./home.css";

export function HomePage() {
  return <AppShell><div className="home-page"><Hero/><div className="home-page__below-fold" aria-hidden="true"/></div></AppShell>;
}
