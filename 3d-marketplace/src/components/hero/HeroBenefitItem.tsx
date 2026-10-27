import type { LucideIcon } from "lucide-react";

interface HeroBenefitItemProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export function HeroBenefitItem({
  title,
  description,
  Icon,
}: HeroBenefitItemProps) {
  return (
    <div className="hero-benefit">
      <span className="hero-benefit__icon" aria-hidden="true">
        <Icon size={19} strokeWidth={1.7} />
      </span>
      <span className="hero-benefit__copy">
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
    </div>
  );
}
