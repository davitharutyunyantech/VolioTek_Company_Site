import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Mail,
  MapPin,
  MessageSquareText,
  ShieldCheck,
} from 'lucide-react';

import { buildManagedMetadata } from '@/lib/content/metadata';
import { getPublishedPage } from '@/lib/content/store';
import { genericPageContentSchema } from '@/lib/content/schemas';
import { ManagedContentSections } from '../components/ManagedContentSections';
import { Checklist, FinalCta, HeroPanel, IconCardGrid, PageHero, PublicPageShell, SectionIntro, SplitSection } from '../components/PublicPageBlocks';

export function generateMetadata() {
  return buildManagedMetadata('contact');
}

const contactChannels = [
  {
    icon: Mail,
    title: 'Product inquiries',
    body:
      'For demo requests, operating questions, and first conversations about whether VolioTek matches your environment.',
    cta: 'contact@voliotek.com',
    href: 'mailto:contact@voliotek.com?subject=VolioTek%20product%20inquiry',
  },
  {
    icon: ClipboardCheck,
    title: 'Implementation fit',
    body:
      'Share the workflows, access roles, integration points, and compliance constraints your team needs to account for.',
    cta: 'Send context',
    href: 'mailto:contact@voliotek.com?subject=VolioTek%20implementation%20fit',
  },
  {
    icon: ShieldCheck,
    title: 'Security review',
    body:
      'Route privacy, policy, and review questions to the team before a deeper technical or procurement discussion.',
    cta: 'Start review',
    href: 'mailto:contact@voliotek.com?subject=VolioTek%20security%20review',
  },
];

const preparationItems = [
  'Which care, admin, or reporting workflows need tighter coordination.',
  'Current systems your team expects VolioTek to complement or replace.',
  'Security, audit, and access-control requirements that are already defined.',
  'Decision timeline, stakeholder group, and preferred demo format.',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact VolioTek',
  url: 'https://voliotek.com/contact',
  description:
    'Contact VolioTek for healthcare operations software demos, implementation fit, and security review questions.',
  mainEntity: {
    '@type': 'Organization',
    name: 'VolioTek',
    url: 'https://voliotek.com',
    email: 'contact@voliotek.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
  },
};

export default async function ContactPage() {
  const page = await getPublishedPage('contact');
  const content = genericPageContentSchema.parse(page.content);

  return (
    <PublicPageShell jsonLd={jsonLd}>
      <PageHero
        eyebrow="Contact VolioTek"
        EyebrowIcon={MessageSquareText}
        title={content.headline}
        description={content.description}
      >
        <HeroPanel
          icon={CalendarClock}
          title="What happens next"
          description="A product conversation usually starts with workflow scope, stakeholder needs, and review constraints. From there, we can schedule a focused demo or technical discussion."
          action={{ href: 'mailto:contact@voliotek.com?subject=VolioTek%20demo%20request', label: 'Request a conversation', icon: ArrowRight }}
        />
      </PageHero>

      <ManagedContentSections content={content} fallbackTitle="Current contact details" fallbackDescription="These sections are managed from the admin panel and published separately from drafts." />

      <section className="section-ambient section-ambient--light relative overflow-hidden bg-white py-24 lg:py-32">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <SectionIntro
            title="Choose the best starting point"
            description="Send enough context for us to route the conversation correctly. Short notes are fine when the workflow is still being defined."
          />
          <IconCardGrid items={contactChannels} />
        </div>
      </section>

      <SplitSection
        title="Helpful details to include"
        description="Clear context helps us keep the first discussion practical and relevant to your team rather than generic."
        className="section-ambient--soft bg-[#EDFAFA]"
      >
        <Checklist items={preparationItems} Icon={CheckCircle2} />
      </SplitSection>

      <FinalCta
        title={<>Reach the VolioTek <span className="text-[#18D6BD]">team directly.</span></>}
        description="Use email for product, implementation, or review questions. We will route the conversation based on the context you provide."
        primaryAction={{
          href: 'mailto:contact@voliotek.com?subject=VolioTek%20contact',
          label: 'contact@voliotek.com',
          icon: ArrowRight,
        }}
        secondarySlot={(
          <div className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#18D6BD]/30 px-8 py-4 text-[#F0FFFD]/78">
            <MapPin className="h-5 w-5 text-[#18D6BD]" />
            San Francisco, CA
          </div>
        )}
      />
    </PublicPageShell>
  );
}
