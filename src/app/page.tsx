import type { Metadata } from 'next';

import App from './App';
import { getPublishedPage } from '@/lib/content/store';
import { homeContentSchema } from '@/lib/content/schemas';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublishedPage('home');

  return {
    title: page.metadata.title,
    description: page.metadata.description,
    alternates: {
      canonical: page.metadata.canonical,
    },
    keywords: [
      'healthcare operations platform',
      'secure healthcare software',
      'regulated healthcare workflows',
      'HIPAA operations software',
      'healthcare workflow coordination',
      'VolioTek',
    ],
    openGraph: {
      title: page.metadata.title,
      description: page.metadata.description,
      url: page.metadata.canonical,
      siteName: 'VolioTek',
      images: [
        {
          url: '/brand/banner-light.png',
          width: 1672,
          height: 941,
          alt: 'VolioTek secure healthcare operations platform',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metadata.title,
      description: page.metadata.description,
      images: ['/brand/banner-light.png'],
    },
  };
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VolioTek',
    url: 'https://voliotek.com',
    email: 'contact@voliotek.com',
    logo: 'https://voliotek.com/brand/logo-header-transparent.png',
    image: 'https://voliotek.com/brand/banner-light.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VolioTek',
    url: 'https://voliotek.com',
    publisher: {
      '@type': 'Organization',
      name: 'VolioTek',
      url: 'https://voliotek.com',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'VolioTek',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://voliotek.com',
    description:
      'A secure operations platform for regulated healthcare teams coordinating private workflows, implementation planning, and operational accountability.',
    publisher: {
      '@type': 'Organization',
      name: 'VolioTek',
      url: 'https://voliotek.com',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Regulated healthcare teams',
    },
  },
];

export default async function Page() {
  const page = await getPublishedPage('home');
  const content = homeContentSchema.parse(page.content);

  return (
    <>
      <App content={content} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
