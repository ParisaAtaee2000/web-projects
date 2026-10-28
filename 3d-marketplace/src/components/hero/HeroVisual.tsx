interface HeroVisualProps {
  imageUrl?: string;
}

const referenceHeroImage =
  "https://images.pexels.com/photos/19588197/pexels-photo-19588197.jpeg?auto=compress&cs=tinysrgb&w=1600";

export function HeroVisual({ imageUrl = referenceHeroImage }: HeroVisualProps) {
  return (
    <div className="hero-visual" aria-hidden="true">
      <img
        className="hero-visual__image"
        src={imageUrl}
        alt=""
        fetchPriority="high"
        decoding="async"
        onError={(event) => {
          const image = event.currentTarget;
          if (image.dataset.fallback !== "true") {
            image.dataset.fallback = "true";
            image.src = "/images/hero-3d-printer.svg";
          }
        }}
      />
      <div className="hero-visual__shade" />
      <div className="hero-visual__glow" />
    </div>
  );
}
