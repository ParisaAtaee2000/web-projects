import { useState } from "react";

const HERO_IMAGES = [
  "https://images.pexels.com/photos/33977799/pexels-photo-33977799.jpeg?cs=srgb&dl=pexels-jakubzerdzicki-33977799.jpg&fm=jpg",
  "https://images.pexels.com/photos/19871842/pexels-photo-19871842.jpeg?auto=compress&cs=tinysrgb&w=2200",
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
