import { useState } from "react";

const HERO_IMAGES = [
  "https://images.pexels.com/photos/33977799/pexels-photo-33977799.jpeg?cs=srgb&dl=pexels-jakubzerdzicki-33977799.jpg&fm=jpg",
  "https://images.unsplash.com/photo-1758387933125-5ac945b4e2cd?auto=format&fit=crop&w=1800&q=80",
];

interface HeroVisualProps {
  imageUrl?: string;
}

export function HeroVisual({ imageUrl }: HeroVisualProps) {
  const imageSources = imageUrl ? [imageUrl, ...HERO_IMAGES] : HERO_IMAGES;
  const [sourceIndex, setSourceIndex] = useState(0);
  const imageSource = imageSources[sourceIndex];

  return (
    <div className="hero-visual" aria-hidden="true">
      {imageSource && (
        <img
          className="hero-visual__image"
          src={imageSource}
          alt=""
          fetchPriority="high"
          decoding="async"
          onError={() => setSourceIndex((current) => current + 1)}
        />
      )}
      <div className="hero-visual__shade" />
      <div className="hero-visual__glow" />
    </div>
  );
}
