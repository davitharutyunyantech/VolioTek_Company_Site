import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPublishedPage } from './store';
import type { PageSlug } from './schemas';

export async function buildManagedMetadata(slug: PageSlug, imageAlt = 'VolioTek brand banner'): Promise<Metadata> {
  const page = await getPublishedPage(slug);

  if (!page) {
    notFound();
  }

  return {
    title: page.metadata.title,
    description: page.metadata.description,
    alternates: {
      canonical: page.metadata.canonical,
    },
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
          alt: imageAlt,
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
