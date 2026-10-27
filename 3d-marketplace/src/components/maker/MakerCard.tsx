import type { Maker } from "../../types/maker";
export function MakerCard({ maker }: { maker: Maker }) {
  return <article className="maker-card"><h3>{maker.name}</h3><p>{maker.specialty}</p>{maker.location && <small>{maker.location}</small>}</article>;
}
