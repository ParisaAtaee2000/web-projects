import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./mobile.css";
import "@/components/layout/mobile-ui-fixes.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { WishlistProvider } from "@/components/wishlist/WishlistProvider";
import { BRAND_ENGLISH, BRAND_EXPERIENCE, BRAND_NAME, SITE_DESCRIPTION, getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND_NAME} | پوشاک مردانه و فروش عمده`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: BRAND_NAME,
  authors: [{ name: BRAND_NAME }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  keywords: ["اچ عطایی", "اِچ عطایی", "H Atayi", "فروش عمده پوشاک مردانه", "کاپشن مردانه عمده", "کت مردانه عمده", "پالتو مردانه عمده", "کاپشن زمستانه مردانه", "پوشاک زمستانه مردانه"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteUrl,
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} | پوشاک مردانه و فروش عمده`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} | پوشاک مردانه و فروش عمده`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eeece4",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    alternateName: BRAND_ENGLISH,
    description: `${BRAND_EXPERIENCE}. ${SITE_DESCRIPTION}`,
    url: siteUrl,
  };

  return (
    <html lang="fa" dir="rtl">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>{children}</CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
