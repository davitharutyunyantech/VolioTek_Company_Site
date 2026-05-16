import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CalendarClock, CheckCircle2, ClipboardCheck } from 'lucide-react';

import { buildManagedMetadata } from '@/lib/content/metadata';
import { getPublishedPage } from '@/lib/content/store';
import { genericPageContentSchema } from '@/lib/content/schemas';
import { InquiryForm } from '../components/InquiryForm';
import { Checklist, HeroPanel, HighlightedText, PageHero, PublicPageShell, SplitSection } from '../components/PublicPageBlocks';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export function generateMetadata() {
  return buildManagedMetadata('request-demo');
}

const preparationItems = [
  'The care, admin, or reporting workflows your team wants to evaluate.',
  'Current systems VolioTek should complement or replace.',
  'Security, audit, and access-control requirements already defined.',
  'Decision timeline, stakeholder group, and preferred demo format.',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Request a VolioTek demo',
  url: 'https://voliotek.com/request-demo',
  description:
    'Request a focused VolioTek demo for regulated healthcare operations and implementation planning.',
};

export default async function RequestDemoPage() {
  const page = await getPublishedPage('request-demo');

  if (!page) {
    notFound();
  }

  const content = genericPageContentSchema.parse(page.content);

  return (
    <PublicPageShell jsonLd={jsonLd}>
      <PageHero
        eyebrow="Request Demo"
        EyebrowIcon={CalendarClock}
        title={<HighlightedText text={content.headline} highlight={content.highlightedText} />}
        description={content.description}
      >
        <HeroPanel
          icon={ClipboardCheck}
          title="What happens next"
          description="We review your request, confirm the right discussion format, and follow up with scheduling details for a focused demo."
          action={{ href: '/contact', label: 'General contact instead', icon: ArrowRight, variant: 'secondary' }}
        />
      </PageHero>

      <section className="section-ambient section-ambient--light relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:px-12">
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#07988D]">Demo request</p>
            <h2 className="mt-3 text-4xl font-semibold text-[#071625] lg:text-5xl">
              Keep the first conversation practical.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Demo requests are routed separately from general contact messages so product conversations can start with the right context.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center rounded-lg border border-[#18D6BD]/40 px-5 py-3 font-semibold text-[#071625] transition hover:border-[#18D6BD] hover:bg-[#EDFAFA]"
            >
              Need something else?
              <ArrowRight className="ml-2 h-5 w-5 text-[#07988D]" />
            </Link>
          </div>

          <InquiryForm mode="demo" source="request_demo_page" />
        </div>
      </section>

      <SplitSection
        title="Useful details for a better demo"
        description="The more specific the operating context, the easier it is to avoid a generic walkthrough."
        className="section-ambient--soft bg-[#EDFAFA]"
      >
        <Checklist items={preparationItems} Icon={CheckCircle2} />
      </SplitSection>
    </PublicPageShell>
  );
}
