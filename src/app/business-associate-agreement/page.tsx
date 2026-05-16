import { notFound } from 'next/navigation';
import { ArrowRight, ClipboardCheck, FileText, LockKeyhole, ShieldCheck } from 'lucide-react';

import { buildManagedMetadata } from '@/lib/content/metadata';
import { getPublishedPage } from '@/lib/content/store';
import { genericPageContentSchema } from '@/lib/content/schemas';
import { DetailList, FinalCta, HeroPanel, HighlightedText, PageHero, PublicPageShell, SplitSection } from '../components/PublicPageBlocks';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export function generateMetadata() {
  return buildManagedMetadata('business-associate-agreement');
}

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

export default async function BusinessAssociateAgreementPage() {
  const page = await getPublishedPage('business-associate-agreement');

  if (!page) {
    notFound();
  }

  const content = genericPageContentSchema.parse(page.content);
  const managedSections = content.sections.length > 0 ? content.sections : baaDetails;

  return (
    <PublicPageShell jsonLd={jsonLd}>
      <PageHero
        eyebrow="Business Associate Agreement"
        EyebrowIcon={FileText}
        title={<HighlightedText text={content.headline} highlight={content.highlightedText} />}
        description={content.description}
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
        <DetailList items={managedSections} Icon={LockKeyhole} />
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
