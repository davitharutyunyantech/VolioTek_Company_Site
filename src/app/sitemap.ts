import type { MetadataRoute } from 'next';

const siteUrl = 'https://voliotek.com';
const contentLastModified = new Date('2026-05-15');

const routes = [
  {
    path: '',
    priority: 1,
    changeFrequency: 'monthly',
  },
  {
    path: '/documentation',
    priority: 0.85,
    changeFrequency: 'monthly',
  },
  {
    path: '/compliance',
    priority: 0.85,
    changeFrequency: 'monthly',
  },
  {
    path: '/contact',
    priority: 0.75,
    changeFrequency: 'monthly',
  },
  {
    path: '/request-demo',
    priority: 0.78,
    changeFrequency: 'monthly',
  },
  {
    path: '/about',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    path: '/business-associate-agreement',
    priority: 0.65,
    changeFrequency: 'yearly',
  },
  {
    path: '/privacy-policy',
    priority: 0.45,
    changeFrequency: 'yearly',
  },
  {
    path: '/terms-of-service',
    priority: 0.45,
    changeFrequency: 'yearly',
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: contentLastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
