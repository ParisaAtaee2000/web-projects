import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { WishlistProvider } from "@/components/wishlist/WishlistProvider";

export const metadata: Metadata = {
  title: "زمستان | فروش عمده پوشاک مردانه زمستانه",
  description: "فروش عمده کت، کاپشن و پالتو مردانه از تولیدکننده با قیمت عمده و حداقل سفارش شفاف.",
  keywords: ["فروش عمده پوشاک مردانه", "کاپشن مردانه", "کت زمستانه", "زمستان"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eeece4",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>{children}</CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
