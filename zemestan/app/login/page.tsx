"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    login(String(form.get("email") ?? ""));
    router.push("/account");
  };

  return <main dir="rtl" className="auth-page"><div className="auth-card"><div className="section-kicker">ACCOUNT / LOGIN</div><h1>ورود به حساب</h1><p>برای مشاهده سفارش‌ها، علاقه‌مندی‌ها و اطلاعات فروشگاه وارد شوید.</p><form onSubmit={submit} className="auth-form"><label>ایمیل<input name="email" type="email" required placeholder="you@store.com" /></label><label>رمز عبور<input name="password" type="password" required placeholder="••••••••" /></label><button className="btn primary" type="submit">ورود</button></form><div className="auth-links"><Link href="/register">حساب ندارید؟ ثبت‌نام کنید</Link><Link href="/">بازگشت به فروشگاه</Link></div></div></main>;
}
