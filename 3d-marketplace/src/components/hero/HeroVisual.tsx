const DEFAULT_HERO_IMAGE = "https://images.unsplash.com/photo-1760446410955-86c0446b9be2?auto=format&fit=crop&fm=jpg&q=85&w=2200";

interface HeroVisualProps { imageUrl?: string; }

export function HeroVisual({ imageUrl = DEFAULT_HERO_IMAGE }: HeroVisualProps) {
  return (
    <div className="hero-visual" aria-hidden="true">
      <img src={imageUrl} alt="" fetchPriority="high" />
      <div className="hero-visual__shade" />
      <div className="hero-visual__glow" />
    </div>
  );
}
