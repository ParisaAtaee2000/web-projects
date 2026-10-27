interface HeroVisualProps { imageUrl?: string; }
export function HeroVisual({ imageUrl }: HeroVisualProps) {
  return <div className="hero-visual" aria-hidden="true">{imageUrl ? <img src={imageUrl} alt="" /> : <div className="hero-visual__asset-placeholder" />}<div className="hero-visual__shade"/><div className="hero-visual__glow"/></div>;
}
