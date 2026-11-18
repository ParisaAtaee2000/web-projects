import { useState } from 'react'
import { Icon } from '../ui/Icon'
import { isApiConfigured } from '../../services/apiClient'
import { storefrontApi } from '../../services/storefrontApi'

export default function NewsletterSection() {
  const [feedback, setFeedback] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isApiConfigured()) {
      setFeedback('این پیش‌نمایش است؛ عضویت واقعی پس از اتصال API فعال می‌شود.')
      return
    }
    const form = new FormData(event.currentTarget)
    setBusy(true)
    try {
      await storefrontApi.subscribeNewsletter({ email: String(form.get('email') ?? ''), consent: true })
      setFeedback('عضویت شما با موفقیت ثبت شد.')
      event.currentTarget.reset()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'ثبت ایمیل ناموفق بود.')
    } finally { setBusy(false) }
  }

  return <section className="newsletter wrap" id="contact" data-reveal>
    <img src="/assets/newsletter-plane.jpg" alt="" />
    <div className="newsletter-copy"><h2>با ما در ارتباط باشید</h2><p>برای دریافت جدیدترین تخفیف‌ها و مطالب، ایمیل خود را وارد کنید.</p></div>
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <Icon name="mail" size={17} />
      <input name="email" type="email" required placeholder="ایمیل شما" aria-label="ایمیل شما" />
      <button type="submit" disabled={busy}>{busy ? '…' : 'عضویت'}</button>
      <label className="newsletter-consent"><input name="consent" type="checkbox" required /> با دریافت ایمیل‌های نکسورا موافقم.</label>
    </form>
    {feedback && <p className="newsletter-feedback" role="status">{feedback}</p>}
  </section>
}
