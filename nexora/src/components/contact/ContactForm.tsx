import { useState } from 'react'
import { isApiConfigured } from '../../services/apiClient'
import { storefrontApi } from '../../services/storefrontApi'

export default function ContactForm() {
  const [feedback, setFeedback] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isApiConfigured()) {
      setFeedback('این پیش‌نمایش است؛ برای ارسال واقعی پیام باید API بک‌اند متصل شود.')
      return
    }
    const form = new FormData(event.currentTarget)
    setBusy(true)
    try {
      await storefrontApi.submitContactMessage({
        full_name: String(form.get('name') ?? ''),
        email: String(form.get('email') ?? ''),
        message: String(form.get('message') ?? ''),
      })
      setFeedback('پیام شما با موفقیت برای پشتیبانی ارسال شد.')
      event.currentTarget.reset()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'ارسال پیام ناموفق بود.')
    } finally { setBusy(false) }
  }

  return <form className="contact-form" onSubmit={handleSubmit}>
    <label>نام<input name="name" required placeholder="نام شما" /></label>
    <label>ایمیل<input name="email" required type="email" placeholder="name@example.com" /></label>
    <label>پیام<textarea name="message" required rows={4} placeholder="چطور می‌توانیم کمکت کنیم؟" /></label>
    <button type="submit" className="button button-primary" disabled={busy}>{busy ? 'در حال ارسال…' : 'ارسال پیام'}</button>
    {feedback && <p className="form-feedback" role="status">{feedback}</p>}
  </form>
}
