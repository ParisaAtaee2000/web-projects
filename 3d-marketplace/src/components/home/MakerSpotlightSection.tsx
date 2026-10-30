import { ArrowLeft, BadgeCheck } from "lucide-react";
import { ROUTES } from "../../app/router/routeNames";

const makers = [
  { name: "PixelCraft", description: "خالق مدل", initials: "P", tone: "violet" },
  { name: "VoidStudio", description: "طراح سه‌بعدی", initials: "V", tone: "blue" },
  { name: "RoboMaker", description: "سازنده قطعات", initials: "R", tone: "pink" },
  { name: "TechPrint", description: "فروشنده حرفه‌ای", initials: "T", tone: "orange" },
  { name: "Artemis3D", description: "طراح و سازنده", initials: "A", tone: "green" },
];

export function MakerSpotlightSection() {
  return (
    <section className="home-section makers-spotlight" id="makers" dir="rtl" aria-label="جامعه سازندگان Maker">
      <div className="maker-community">
        <div className="maker-community__feature">
          <div className="maker-community__feature-copy">
            <h2>به جامعه سازندگان بپیوندید</h2>
            <p>محصولات خود را به نمایش بگذارید و سفارش اختصاصی بگیرید.</p>
            <a href={ROUTES.sellerRegister}>
              شروع کنید <ArrowLeft size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="maker-community__list">
          <div className="maker-community__list-head">
            <h2>سازندگان برتر</h2>
            <a href={ROUTES.makers}>مشاهده همه <ArrowLeft size={13} aria-hidden="true" /></a>
          </div>
          <div className="maker-community__avatars">
            {makers.map((maker) => (
              <a className="maker-community__person" href={ROUTES.makers} key={maker.name}>
                <span className={"maker-community__avatar maker-community__avatar--" + maker.tone}>
                  {maker.initials}
                  <i><BadgeCheck size={11} aria-hidden="true" /></i>
                </span>
                <strong>{maker.name}</strong>
                <small>{maker.description}</small>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
