import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://upstatesportsandplay.com';
  return ['/', '/grand-prix', '/events', '/request-quote', '/privacy'].map(path => ({
    url: `${base}${path}`,
    changeFrequency: 'monthly',
  }));
}
