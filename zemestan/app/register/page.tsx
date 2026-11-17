"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    register({ name: String(form.get("name") ?? ""), email: String(form.get("email") ?? ""), storeName: String(form.get("storeName") ?? "") });
    router.push("/account");
  };
  return <main dir="rtl" className="auth-page"><div className="auth-card"><div className="section-kicker">ACCOUNT / REGISTER</div><h1>ساخت حساب عمده</h1><p>اطلاعات فروشگاه را ثبت کنید تا سفارش‌ها و علاقه‌مندی‌ها در حساب شما نگه‌داری شوند.</p><form onSubmit={submit} className="auth-form"><label>نام و نام خانوادگی<input name="name" required /></label><label>نام فروشگاه<input name="storeName" required /></label><label>ایمیل<input name="email" type="email" required /></label><label>رمز عبور<input name="password" type="password" required /></label><button className="btn primary" type="submit">ساخت حساب</button></form><div className="auth-links"><Link href="/login">قبلاً ثبت‌نام کرده‌اید؟ ورود</Link><Link href="/">بازگشت به فروشگاه</Link></div></div></main>;
}
