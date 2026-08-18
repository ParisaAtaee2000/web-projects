import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "کت زمستان | پوشاک مردانه عمده",
  description: "فروش عمده کاپشن، کت و پوشاک زمستانه مردانه از تولیدکننده.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
