# SOLE Shoes — WordPress + WooCommerce

قالب فروشگاه کفش **SOLE** بر اساس آخرین UI پروژه طراحی‌شده در این گفتگو.

## نصب

1. پوشه `shoe-store` را به مسیر `wp-content/themes/` منتقل کنید.
2. در پیشخوان WordPress از **نمایش → پوسته‌ها**، قالب **SOLE Shoes** را فعال کنید.
3. افزونه **WooCommerce** را نصب و فعال کنید.
4. صفحات WooCommerce را با Setup Wizard بسازید و صفحه فروشگاه را تعیین کنید.
5. از **نمایش → فهرست‌ها** منوی `primary` را تنظیم کنید؛ اگر منو ساخته نشود، قالب منوی پیش‌فرض خود را نشان می‌دهد.
6. چند محصول با تصویر شاخص، قیمت و موجودی در WooCommerce ایجاد کنید.
7. صفحه اصلی سایت را روی یک صفحه ثابت تنظیم کنید تا `front-page.php` اجرا شود.

## ساختار

- `front-page.php` — صفحه اصلی طراحی‌شده
- `header.php` / `footer.php` — هدر و فوتر
- `functions.php` — پشتیبانی WordPress و WooCommerce
- `style.css` — UI و Responsive
- `woocommerce.php` — اتصال صفحات WooCommerce به پوسته
- `index.php`, `page.php`, `single.php` — fallbackهای WordPress
- `assets/js/theme.js` — reveal animation و تعاملات

## نکته

این قالب برای اتصال به فروشگاه واقعی WooCommerce آماده شده است؛ سبد خرید، پرداخت، حساب کاربری، محصولات، قیمت و موجودی توسط WooCommerce مدیریت می‌شوند.
