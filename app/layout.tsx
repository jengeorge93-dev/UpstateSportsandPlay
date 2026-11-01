import './globals.css';
import { Header, Footer } from '../components/Site';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://upstatesportsandplay.com'),
  title: {
    default: 'Kids Party Rentals in Upstate SC | Upstate Sports & Play Co.',
    template: '%s | Upstate Sports & Play Co.',
  },
  description: 'Mobile Mini Grand Prix racing parties for kids ages 3–8 in Spartanburg, Greenville and Upstate SC. Starting at $495. Request an event date for February 2027 or later.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Upstate Sports & Play Co.',
    locale: 'en_US',
    title: 'Kids Party Rentals in Upstate SC | Upstate Sports & Play Co.',
    description: 'Mini Grand Prix racing parties and mobile event entertainment for children ages 3–8 in Spartanburg, Greenville and surrounding Upstate SC.',
    url: '/',
    images: [{ url: '/images/mini-grand-prix-outdoor.webp', width: 1200, height: 630, alt: 'Mini Grand Prix inflatable racing track with small ride-on cars' }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><Header />{children}<Footer /><Analytics /></body></html>;
}
