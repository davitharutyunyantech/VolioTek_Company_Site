import { ArrowRight, BadgeCheck, ClipboardList, FileText, Scale } from 'lucide-react';

import { buildManagedMetadata } from '@/lib/content/metadata';
import { getPublishedPage } from '@/lib/content/store';
import { genericPageContentSchema } from '@/lib/content/schemas';
import { DetailList, FinalCta, HeroPanel, PageHero, PublicPageShell, SplitSection } from '../components/PublicPageBlocks';

const lastUpdated = 'May 15, 2026';

export function generateMetadata() {
  return buildManagedMetadata('terms-of-service');
}

const termsSections = [
  {
    title: 'Use of this website',
    body:
      'You may use this website for lawful business purposes, including learning about VolioTek and contacting our team. You may not interfere with the site, attempt unauthorized access, scrape at abusive volume, or use the site to transmit harmful code.',
  },
  {
    title: 'Product information',
    body:
      'Website content is provided for general informational purposes. Product capabilities, availability, security commitments, implementation scope, and support obligations are governed by written agreements with VolioTek, not by general website copy.',
  },
  {
    title: 'Intellectual property',
    body:
      'VolioTek names, logos, text, graphics, and other website materials are owned by VolioTek or its licensors. You may not copy, modify, or distribute them except as allowed by law or with written permission.',
  },
  {
    title: 'Third-party links',
    body:
      'This website may reference third-party services or resources. VolioTek is not responsible for third-party content, policies, security, or availability.',
  },
  {
    title: 'Disclaimers and limits',
    body:
      'The website is provided as available and without warranties to the fullest extent permitted by law. VolioTek is not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the website.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TermsOfService',
  name: 'Terms of Service | VolioTek',
  url: 'https://voliotek.com/terms-of-service',
  dateModified: '2026-05-15',
  description:
    'VolioTek website terms covering acceptable use, product information, intellectual property, third-party links, and disclaimers.',
  publisher: {
    '@type': 'Organization',
    name: 'VolioTek',
    url: 'https://voliotek.com',
    email: 'contact@voliotek.com',
  },
};

export default async function TermsOfServicePage() {
  const page = await getPublishedPage('terms-of-service');
  const content = genericPageContentSchema.parse(page.content);
  const managedSections = content.sections.length > 0 ? content.sections : termsSections;

  return (
    <PublicPageShell jsonLd={jsonLd}>
      <PageHero
        eyebrow="Terms of Service"
        EyebrowIcon={Scale}
        title={content.headline}
        description={content.description}
        gridClassName="lg:grid-cols-[1.02fr_0.98fr]"
      >
        <HeroPanel
          icon={ClipboardList}
          title="Current version"
          description={`Last updated ${lastUpdated}. Product subscriptions, support, security commitments, and implementation obligations are defined in signed agreements.`}
          action={{ href: '/privacy-policy', label: 'View privacy policy', icon: ArrowRight }}
        />
      </PageHero>

      <SplitSection
        title="Website terms"
        description="These terms explain permitted website use, ownership of public materials, and limits on relying on website content."
        columns="lg:grid-cols-[0.85fr_1.15fr]"
      >
        <DetailList items={managedSections} Icon={FileText} />
      </SplitSection>

      <FinalCta
        title={<>Questions about <span className="text-[#18D6BD]">these terms?</span></>}
        description="Send terms, contract, policy, or security review questions to the VolioTek team."
        primaryAction={{
          href: 'mailto:contact@voliotek.com?subject=VolioTek%20terms%20question',
          label: 'contact@voliotek.com',
          icon: ArrowRight,
        }}
        secondarySlot={(
          <div className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#18D6BD]/30 px-8 py-4 text-[#F0FFFD]/78">
            <BadgeCheck className="h-5 w-5 text-[#18D6BD]" />
            Last updated {lastUpdated}
          </div>
        )}
      />
    </PublicPageShell>
  );
}
