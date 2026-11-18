import { useState } from 'react'
import { Icon } from '../ui/Icon'

export default function NewsletterSection() {
  const [feedback, setFeedback] = useState('')

  return <section className="newsletter wrap" id="contact" data-reveal>
    <img src="/assets/newsletter-plane.jpg" alt="" />
    <div className="newsletter-copy"><h2>با ما در ارتباط باشید</h2><p>برای دریافت جدیدترین تخفیف‌ها و مطالب، ایمیل خود را وارد کنید.</p></div>
    <form className="newsletter-form" onSubmit={event => { event.preventDefault(); setFeedback('این پیش‌نمایش است؛ ایمیل شما هنوز ثبت نشده است.') }}>
      <Icon name="mail" size={17} /><input name="email" type="email" required placeholder="ایمیل شما" aria-label="ایمیل شما" /><button type="submit">عضویت</button>
    </form>
    {feedback && <p className="newsletter-feedback" role="status">{feedback}</p>}
  </section>
}
