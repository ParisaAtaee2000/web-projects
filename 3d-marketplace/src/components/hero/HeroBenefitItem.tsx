import type { LucideIcon } from "lucide-react";
export function HeroBenefitItem({title,description,Icon}:{title:string;description:string;Icon:LucideIcon}) { return <div className="hero-benefit"><span className="hero-benefit__icon"><Icon size={18} strokeWidth={1.5}/></span><span className="hero-benefit__copy"><strong>{title}</strong><small>{description}</small></span></div>; }
