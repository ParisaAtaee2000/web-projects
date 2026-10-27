# لایهٔ اتصال به API

این پوشه زیرساخت عمومی درخواست‌های HTTP فرانت‌اند را فراهم می‌کند؛ قرارداد endpointها و مدل پاسخ بک‌اند عمداً در این مرحله تعریف نشده‌اند.

## تنظیم آدرس بک‌اند

1. از فایل \`.env.example\` یک فایل محلی با نام \`.env.local\` بسازید.
2. پس از توافق با توسعه‌دهندهٔ بک‌اند، مقدار \`VITE_API_BASE_URL\` را تنظیم کنید.
3. پس از تغییر فایل env، سرور Vite را دوباره اجرا کنید.

متغیرهایی با پیشوند \`VITE_\` داخل bundle سمت مرورگر قرار می‌گیرند؛ بنابراین هیچ secret، رمز یا کلید خصوصی در آن‌ها قرار ندهید.

## استفاده

\`\`\`ts
import { apiRequest, ApiError } from "../lib/api/httpClient";

interface ExampleResponse {
  id: string;
}

// مسیر زیر صرفاً نمونهٔ نحوهٔ استفاده است، نه endpoint توافق‌شدهٔ پروژه.
const result = await apiRequest<ExampleResponse>("/example", {
  method: "GET",
  query: { page: 1, active: true },
});

// برای ارسال JSON:
await apiRequest<ExampleResponse>("/example", {
  method: "POST",
  body: { title: "Example" },
});

// خطاهای HTTP با status و body اصلی پاسخ در دسترس‌اند.
try {
  await apiRequest<ExampleResponse>("/example");
} catch (error) {
  if (error instanceof ApiError) {
    console.error(error.status, error.message, error.requestId);
  } else {
    // خطاهای شبکه/مرورگر را نیز جداگانه مدیریت کنید.
    throw error;
  }
}
\`\`\`

## رفتارهای فعلی

- query params با حذف مقادیر null/undefined ساخته می‌شوند؛ آرایه‌ها به صورت کلیدهای تکراری می‌فرستند.
- بدنه‌های ساده به JSON تبدیل می‌شوند؛ \`FormData\` و بدنه‌های باینری دست‌کاری نمی‌شوند.
- پاسخ 204 و 205 به \`undefined\` تبدیل می‌شود.
- در پاسخ ناموفق، \`ApiError\` شامل status، body و در صورت وجود \`X-Request-ID\` است.
- سیاست احراز هویت، refresh token، شکل DTOها و endpointها تا توافق جداگانه تعیین نشده‌اند.
