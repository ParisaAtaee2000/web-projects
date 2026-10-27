import { ArrowLeft, CirclePlay } from "lucide-react";
export function HeroActions() { return <div className="hero-actions"><a className="hero-button hero-button--primary" href="/products">مشاهده محصولات <ArrowLeft size={15}/></a><a className="hero-button hero-button--secondary" href="/about">درباره ما <CirclePlay size={15}/></a></div>; }
