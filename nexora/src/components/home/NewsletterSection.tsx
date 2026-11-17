import { Icon } from '../ui/Icon'

export default function NewsletterSection() {
  return <section className="newsletter wrap" id="contact" data-reveal>
    <img src="/assets/newsletter-plane.jpg" alt="" />
    <div className="newsletter-copy"><h2>با ما در ارتباط باشید</h2><p>برای دریافت جدیدترین تخفیف‌ها و مطالب، ایمیل خود را وارد کنید.</p></div>
    <form className="newsletter-form" onSubmit={event => event.preventDefault()}>
      <Icon name="mail" size={17} /><input type="email" placeholder="ایمیل شما" aria-label="ایمیل شما" /><button type="submit">عضویت</button>
    </form>
  </section>
}
