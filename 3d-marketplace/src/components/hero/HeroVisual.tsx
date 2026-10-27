const DEFAULT_HERO_IMAGE = "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=2200";

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
