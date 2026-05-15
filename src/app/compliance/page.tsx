import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileLock2,
  FileText,
  KeyRound,
  ListChecks,
  LockKeyhole,
  Mail,
  ScrollText,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';

import { buildManagedMetadata } from '@/lib/content/metadata';
import { getPublishedPage } from '@/lib/content/store';
import { genericPageContentSchema } from '@/lib/content/schemas';
import { ManagedContentSections } from '../components/ManagedContentSections';
import { DetailList, FinalCta, HeroPanel, IconCardGrid, PageHero, PublicPageShell, SectionIntro, SplitSection } from '../components/PublicPageBlocks';
import { MotionReveal } from '../components/MotionReveal';

const reviewMaterials = [
  {
    icon: FileText,
    title: 'Business Associate Agreement',
    body:
      'Eligible healthcare customers can request BAA review before any production workflow is configured to handle Protected Health Information.',
    href: '/business-associate-agreement',
    cta: 'View BAA information',
  },
  {
    icon: ListChecks,
    title: 'Security questionnaire support',
    body:
      'Procurement, privacy, and IT teams can route review questions through VolioTek so answers are matched to the intended deployment scope.',
    href: 'mailto:contact@voliotek.com?subject=VolioTek%20security%20questionnaire',
    cta: 'Send a questionnaire',
  },
  {
    icon: ScrollText,
    title: 'Policy and data-handling context',
    body:
      'VolioTek can share product-specific context for access controls, logging, retention, vendors, and operational safeguards during evaluation.',
    href: 'mailto:contact@voliotek.com?subject=VolioTek%20compliance%20documentation',
    cta: 'Request documentation',
  },
];

const safeguards = [
  {
    icon: LockKeyhole,
    title: 'Protected data paths',
    body:
      'Encryption, secure transport, and controlled storage patterns are used to reduce exposure across sensitive operational workflows.',
  },
  {
    icon: KeyRound,
    title: 'Access boundaries',
    body:
      'Role-aware access, administrative controls, and reviewable permissions help teams limit who can reach regulated information.',
  },
  {
    icon: ClipboardCheck,
    title: 'Reviewable activity',
    body:
      'Operational events are designed to support traceability, internal review, and investigation when teams need evidence of system use.',
  },
  {
    icon: FileLock2,
    title: 'Evaluation controls',
    body:
      'Security and compliance review happens before sensitive production use, so contractual and operational requirements can be aligned early.',
  },
];

const responsibilityItems = [
  {
    title: 'VolioTek platform responsibilities',
    body:
      'Platform safeguards, access-control capabilities, product security practices, and the controls described in signed customer agreements.',
  },
  {
    title: 'Customer operating responsibilities',
    body:
      'User provisioning, workforce policies, local procedures, configuration decisions, training, and use of the product inside the customer environment.',
  },
  {
    title: 'Joint review before PHI use',
    body:
      'Both sides should confirm workflow scope, contracting, and BAA requirements before Protected Health Information is processed in VolioTek.',
  },
];

const faqs = [
  {
    question: 'Can VolioTek sign a BAA?',
    answer:
      'VolioTek can review and sign a Business Associate Agreement with eligible healthcare customers before applicable PHI workflows begin.',
  },
  {
    question: 'Should PHI be sent through the public website?',
    answer:
      'No. Product, legal, and security questions should be sent without patient records or other PHI unless a signed agreement says otherwise.',
  },
  {
    question: 'Where should security review questions go?',
    answer:
      'Send review questions to contact@voliotek.com with the intended workflow, deployment scope, and any required due-diligence format.',
  },
];

export function generateMetadata() {
  return buildManagedMetadata('compliance');
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Compliance Review | VolioTek',
    url: 'https://voliotek.com/compliance',
    description:
      'Compliance and security review information for healthcare teams evaluating VolioTek for regulated workflows.',
    publisher: {
      '@type': 'Organization',
      name: 'VolioTek',
      url: 'https://voliotek.com',
      email: 'contact@voliotek.com',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://voliotek.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compliance Review',
        item: 'https://voliotek.com/compliance',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  },
];

export default async function CompliancePage() {
  const page = await getPublishedPage('compliance');
  const content = genericPageContentSchema.parse(page.content);

  return (
    <PublicPageShell jsonLd={jsonLd}>
      <PageHero
        eyebrow="Compliance Review"
        EyebrowIcon={BadgeCheck}
        title={content.headline}
        description={content.description}
      >
        <HeroPanel
          icon={ShieldCheck}
          title="Start with review scope"
          description="Send the intended workflow, data type, user roles, and due-diligence format so VolioTek can route the right compliance conversation."
          action={{ href: 'mailto:contact@voliotek.com?subject=VolioTek%20compliance%20review', label: 'Request compliance review', icon: ArrowRight }}
        />
      </PageHero>

      <ManagedContentSections content={content} fallbackTitle="Current compliance details" fallbackDescription="These sections are managed from the admin panel and published separately from drafts." />

      <section className="section-ambient section-ambient--light relative overflow-hidden bg-white py-24 lg:py-32">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <SectionIntro
            title="Review materials"
            description="Use this page as the starting point for legal, privacy, security, and procurement review. Final obligations are governed by signed agreements."
          />
          <IconCardGrid items={reviewMaterials} />
        </div>
      </section>

      <section className="section-ambient section-ambient--soft relative overflow-hidden bg-[#EDFAFA] py-24 lg:py-32">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div>
                <MotionReveal as="h2" variant="heading" className="text-4xl font-semibold text-[#071625] lg:text-5xl">
                  Safeguards reviewers usually ask about
                </MotionReveal>
                <MotionReveal as="p" delay={90} variant="heading" className="mt-6 text-xl leading-relaxed text-gray-600">
                  VolioTek keeps review conversations tied to concrete controls, operational evidence, and the customer environment being evaluated.
                </MotionReveal>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {safeguards.map((item, index) => (
                  <MotionReveal
                    key={item.title}
                    delay={index * 80}
                    variant="card"
                    className="motion-card rounded-lg border border-gray-200 bg-white p-6 shadow-sm shadow-[#071625]/5"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#18D6BD]/10">
                      <item.icon className="h-5 w-5 text-[#07988D]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#071625]">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-gray-600">{item.body}</p>
                  </MotionReveal>
                ))}
              </div>
            </div>
          </div>
      </section>

      <SplitSection
        title="Shared responsibility"
        description="Compliance depends on both the product controls and the way each organization configures, governs, and operates its workflows."
        columns="lg:grid-cols-[0.82fr_1.18fr]"
      >
        <DetailList items={responsibilityItems} Icon={UsersRound} />
      </SplitSection>

      <FinalCta
        title={<>Route compliance questions <span className="text-[#18D6BD]">before implementation.</span></>}
        description="Early review helps confirm BAA timing, data scope, access expectations, and documentation needs before regulated workflows go live."
        primaryAction={{
          href: 'mailto:contact@voliotek.com?subject=VolioTek%20compliance%20review',
          label: 'contact@voliotek.com',
          icon: ArrowRight,
        }}
        secondaryAction={{
          href: '/privacy-policy',
          label: 'View privacy policy',
          icon: Mail,
          variant: 'secondary',
        }}
      />
    </PublicPageShell>
  );
}
