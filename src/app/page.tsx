import type { Metadata } from 'next';

import App from './App';

export const metadata: Metadata = {
  title: 'VolioTek | Secure Healthcare Operations Platform',
  description:
    'VolioTek helps regulated healthcare teams coordinate private workflows, security reviews, implementation planning, and operational accountability.',
  alternates: {
    canonical: '/',
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
    title: 'VolioTek | Secure Healthcare Operations Platform',
    description:
      'Secure healthcare operations software for regulated teams that need private workflows, implementation discipline, and operational accountability.',
    url: '/',
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
    title: 'VolioTek | Secure Healthcare Operations Platform',
    description:
      'Secure healthcare operations software for regulated teams that need private workflows and operational accountability.',
    images: ['/brand/banner-light.png'],
  },
};

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

export default function Page() {
  return (
    <>
      <App />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
