import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eastern Table | طعم اصیل شرق',
  description: 'رستوران شرقی با تجربه‌ای مدرن از طعم‌های اصیل.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fa" dir="rtl"><body>{children}</body></html>;
}
