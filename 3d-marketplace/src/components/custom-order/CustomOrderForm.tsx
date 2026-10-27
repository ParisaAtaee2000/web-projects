import { useState, type FormEvent } from "react";
import type { CustomOrderRequest } from "../../types/order";
interface CustomOrderFormProps { onSubmit?: (request: CustomOrderRequest) => void; }
export function CustomOrderForm({ onSubmit }: CustomOrderFormProps) {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const request = { name: String(data.get("name") ?? ""), contact: String(data.get("contact") ?? ""), description: String(data.get("description") ?? "") };
    onSubmit?.(request);
    setSubmitted(true);
  }
  if (submitted) return <p role="status">درخواست شما در رابط کاربری ثبت شد؛ اتصال به سرور هنوز لازم است.</p>;
  return <form onSubmit={handleSubmit}><label>نام<input name="name" required /></label><label>راه ارتباطی<input name="contact" required /></label><label>توضیحات سفارش<textarea name="description" required /></label><button type="submit">ثبت درخواست</button></form>;
}
