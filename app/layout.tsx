import './globals.css';
import './natural-styles.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Personalize Online — Personalized Songs for Peace, Healing & Gratitude',
  description: 'Handcrafted personal songs made just for you. Choose your need and style, listen in under a minute. No apps required.',
  icons: [{ rel: 'icon', url: '/assets/favicon.svg' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://personalize-online.com'),
  openGraph: {
    title: 'Personalize Online — Personalized Songs for Peace, Healing & Gratitude',
    description: 'Handcrafted personal songs made just for you. Choose your need and style, listen in under a minute.',
    type: 'website',
    images: ['/assets/og-image.svg'],
    siteName: 'Personalize Online'
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#7C8471',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
