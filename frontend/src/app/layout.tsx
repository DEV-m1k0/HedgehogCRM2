import type { Metadata } from 'next';
import '@/styles/globals.css';
import { AppProviders } from '@/lib/providers/app-providers';

export const metadata: Metadata = {
  title: 'HedgehogCRM',
  description: 'CRM for education management',
  icons: { icon: '/brands/max.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
