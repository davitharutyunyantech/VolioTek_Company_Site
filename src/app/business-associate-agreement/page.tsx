import type { Metadata } from 'next';
import { ArrowRight, ClipboardCheck, FileText, LockKeyhole, ShieldCheck } from 'lucide-react';

import { DetailList, FinalCta, HeroPanel, PageHero, PublicPageShell, SplitSection } from '../components/PublicPageBlocks';

export const metadata: Metadata = {
  title: 'Business Associate Agreement | VolioTek',
  description:
    'VolioTek signs Business Associate Agreements with eligible healthcare customers before the platform is used to process Protected Health Information.',
  alternates: {
    canonical: '/business-associate-agreement',
  },
  openGraph: {
    title: 'Business Associate Agreement | VolioTek',
    description:
      'Information about requesting a Business Associate Agreement for eligible healthcare use of VolioTek.',
    url: '/business-associate-agreement',
    siteName: 'VolioTek',
    images: [
      {
        url: '/brand/banner-light.png',
        width: 1672,
        height: 941,
        alt: 'VolioTek brand banner',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Associate Agreement | VolioTek',
    description:
      'Request a Business Associate Agreement before using VolioTek to create, receive, maintain, or transmit PHI.',
    images: ['/brand/banner-light.png'],
  },
};

const baaDetails = [
  {
    title: 'Available for eligible healthcare customers',
    body:
      'VolioTek can enter into a Business Associate Agreement with covered entities and business associates that need to use the product for workflows involving Protected Health Information.',
  },
  {
    title: 'Required before PHI is processed',
    body:
      'Customers should not upload, transmit, or process PHI in VolioTek until the applicable customer agreement and BAA have been reviewed and signed by both parties.',
  },
  {
    title: 'Shared compliance responsibility',
    body:
      'VolioTek is responsible for the platform safeguards described in the signed agreement. Customers remain responsible for their own policies, workforce access, configuration choices, and operational use of the product.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Business Associate Agreement | VolioTek',
  url: 'https://voliotek.com/business-associate-agreement',
  description:
    'VolioTek signs Business Associate Agreements with eligible healthcare customers before the platform is used to process Protected Health Information.',
  publisher: {
    '@type': 'Organization',
    name: 'VolioTek',
    url: 'https://voliotek.com',
    email: 'contact@voliotek.com',
  },
};

export default function BusinessAssociateAgreementPage() {
  return (
    <PublicPageShell jsonLd={jsonLd}>
      <PageHero
        eyebrow="Business Associate Agreement"
        EyebrowIcon={FileText}
        title={<>BAA support for healthcare workflows <span className="text-[#18D6BD]">involving PHI.</span></>}
        description="VolioTek signs Business Associate Agreements with eligible healthcare customers before the product is used to create, receive, maintain, or transmit Protected Health Information."
      >
        <HeroPanel
          icon={ShieldCheck}
          title="Request a BAA before using PHI"
          description="If your team plans to use VolioTek with PHI, contact us so the BAA can be reviewed and signed before production use."
          action={{ href: 'mailto:contact@voliotek.com?subject=VolioTek%20BAA%20request', label: 'Request a BAA', icon: ArrowRight }}
        />
      </PageHero>

      <SplitSection
        title="Temporary BAA information"
        description="This page is informational while our legal language is being finalized. The signed agreement controls the actual terms and obligations."
        className="section-ambient--soft bg-[#EDFAFA]"
        columns="lg:grid-cols-[0.85fr_1.15fr]"
      >
        <DetailList items={baaDetails} Icon={LockKeyhole} />
      </SplitSection>

      <FinalCta
        title={<>Planning to use VolioTek <span className="text-[#18D6BD]">with PHI?</span></>}
        description="Start the BAA review before implementation so privacy, security, and contractual requirements are aligned before PHI is processed."
        primaryAction={{
          href: 'mailto:contact@voliotek.com?subject=VolioTek%20BAA%20request',
          label: 'Request a BAA',
          icon: ArrowRight,
        }}
        secondaryAction={{
          href: '/privacy-policy',
          label: 'View privacy policy',
          icon: ClipboardCheck,
          variant: 'secondary',
        }}
      />
    </PublicPageShell>
  );
}
