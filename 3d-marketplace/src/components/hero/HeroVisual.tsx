interface HeroVisualProps {
  imageUrl?: string;
}

export function HeroVisual({ imageUrl = "/images/hero-3d-printer.svg" }: HeroVisualProps) {
  return (
    <div className="hero-visual" aria-hidden="true">
      <img
        className="hero-visual__image"
        src={imageUrl}
        alt=""
        fetchPriority="high"
        decoding="async"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
      <div className="hero-visual__shade" />
      <div className="hero-visual__glow" />
    </div>
  );
}
