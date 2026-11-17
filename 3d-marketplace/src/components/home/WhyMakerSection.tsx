import { BadgeCheck, Headset, PackageCheck, ShieldCheck, Tags } from "lucide-react";

const benefits = [
  { title: "قیمت‌های رقابتی", description: "با بهترین کیفیت", Icon: Tags },
  { title: "پشتیبانی فنی", description: "همراه شما در مسیر ساخت", Icon: Headset },
  { title: "تضمین اصالت کالا", description: "کیفیت و انتخاب مطمئن", Icon: BadgeCheck },
  { title: "بازگشت کالا", description: "طبق شرایط هر محصول", Icon: PackageCheck },
  { title: "پرداخت امن", description: "درگاه پرداخت مطمئن", Icon: ShieldCheck },
];

export function WhyMakerSection() {
  return (
    <section className="home-section why-maker-section" dir="rtl" aria-labelledby="why-maker-title">
      <div className="why-maker-band">
        <div className="why-maker-intro">
          <h2 id="why-maker-title">چرا ما؟</h2>
          <p>کیفیت، تنوع و اعتماد؛ سه اصل اصلی ماست.</p>
          <a href="/support">بیشتر بدانید <span aria-hidden="true">←</span></a>
        </div>
        {benefits.map(({ title, description, Icon }) => (
          <div className="why-maker-benefit" key={title}>
            <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
            <strong>{title}</strong>
            <small>{description}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
