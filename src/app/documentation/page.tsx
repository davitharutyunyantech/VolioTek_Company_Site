import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  ClipboardList,
  FileKey2,
  KeyRound,
  Network,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UsersRound,
} from 'lucide-react';

import { buildManagedMetadata } from '@/lib/content/metadata';
import { getPublishedPage } from '@/lib/content/store';
import { genericPageContentSchema } from '@/lib/content/schemas';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ManagedContentSections } from '../components/ManagedContentSections';
import { MotionReveal } from '../components/MotionReveal';
import { SecurityMesh } from '../components/SecurityMesh';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export function generateMetadata() {
  return buildManagedMetadata('documentation', 'VolioTek documentation');
}

const docSections = [
  {
    icon: ClipboardList,
    title: 'Evaluation guide',
    description:
      'Review the operating assumptions, stakeholder questions, and readiness signals that help teams decide whether VolioTek belongs in their environment.',
    items: ['Workflow scope', 'Stakeholder map', 'Pilot readiness'],
  },
  {
    icon: SlidersHorizontal,
    title: 'Configuration model',
    description:
      'Understand how workspaces, roles, workflow stages, review checkpoints, and notification paths are typically mapped before launch.',
    items: ['Workspace structure', 'Role mapping', 'Operational routing'],
  },
  {
    icon: ShieldCheck,
    title: 'Security review',
    description:
      'Prepare the questions your compliance, IT, and leadership teams will ask about protected data, auditability, and administrative control.',
    items: ['Access control', 'Audit evidence', 'Policy alignment'],
  },
  {
    icon: Network,
    title: 'Integration planning',
    description:
      'Frame the systems, data handoffs, and import or export needs that should be discussed before implementation timelines are committed.',
    items: ['System inventory', 'Data boundaries', 'Handoff design'],
  },
];

const implementationSteps = [
  {
    label: '01',
    title: 'Define the operational surface',
    description:
      'Identify the workflows, departments, records, approvals, and exceptions that need a clearer system of coordination.',
  },
  {
    label: '02',
    title: 'Map access around real roles',
    description:
      'Translate clinical, administrative, leadership, and external participant needs into practical permissions and review paths.',
  },
  {
    label: '03',
    title: 'Validate evidence needs',
    description:
      'Clarify what leaders, compliance reviewers, and operators need to see later: status history, ownership, changes, and supporting context.',
  },
  {
    label: '04',
    title: 'Plan launch conditions',
    description:
      'Set a controlled first-use scope, support path, acceptance criteria, and the conditions for expanding across teams.',
  },
];

const reviewerGuides = [
  {
    icon: UsersRound,
    title: 'Operations leaders',
    description:
      'Use the documentation to identify adoption scope, responsible teams, exception handling, and the signals that show the workflow is improving.',
  },
  {
    icon: FileKey2,
    title: 'Compliance reviewers',
    description:
      'Focus on data handling, audit expectations, access policy, administrative control, and the documents needed for procurement review.',
  },
  {
    icon: KeyRound,
    title: 'Technical evaluators',
    description:
      'Prepare integration questions, identity assumptions, environment boundaries, data migration needs, and support expectations.',
  },
];

const checklist = [
  'List the workflows that need stronger visibility or accountability.',
  'Identify which user roles should create, review, approve, or only observe work.',
  'Document current systems that should remain the source of truth.',
  'Define what audit history or reporting evidence must be available.',
  'Prepare security, privacy, and procurement questions before the product discussion.',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'VolioTek Documentation',
  name: 'VolioTek Documentation',
  url: 'https://voliotek.com/documentation',
  description:
    'Implementation-oriented documentation for evaluating, configuring, and operating VolioTek in regulated healthcare environments.',
  publisher: {
    '@type': 'Organization',
    name: 'VolioTek',
    url: 'https://voliotek.com',
  },
  about: [
    'Healthcare operations software',
    'Security review',
    'Implementation planning',
    'Access control',
    'Workflow configuration',
  ],
};

export default async function DocumentationPage() {
  const page = await getPublishedPage('documentation');

  if (!page) {
    notFound();
  }

  const content = genericPageContentSchema.parse(page.content);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="section-ambient section-ambient--hero relative overflow-hidden bg-[#071625] pt-32 pb-20 lg:pt-40 lg:pb-28">
          <SecurityMesh density="medium" glowColor="#18D6BD" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071625]/10 via-[#071625]/48 to-[#071625]" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-end">
              <div className="max-w-4xl">
                <MotionReveal mode="load" className="inline-flex items-center gap-2 rounded-full border border-[#18D6BD]/20 bg-[#0B2233]/60 px-4 py-2">
                  <BookOpenText className="h-4 w-4 text-[#18D6BD]" />
                  <span className="text-sm text-[#18D6BD]">Documentation</span>
                </MotionReveal>

                <MotionReveal
                  as="h1"
                  mode="load"
                  delay={90}
                  className="mt-8 max-w-4xl text-5xl font-semibold leading-tight text-[#F0FFFD] lg:text-6xl xl:text-7xl"
                >
                  {content.headline}
                </MotionReveal>

                <MotionReveal
                  as="p"
                  mode="load"
                  delay={180}
                  className="mt-6 max-w-2xl text-xl leading-relaxed text-[#F0FFFD]/70 lg:text-2xl"
                >
                  {content.description}
                </MotionReveal>
              </div>

              <MotionReveal
                mode="load"
                delay={270}
                variant="panel"
                className="motion-panel rounded-lg border border-[#18D6BD]/24 bg-[#0B2233]/72 p-6 shadow-2xl shadow-black/20 backdrop-blur"
              >
                <div className="flex items-center justify-between gap-4 border-b border-[#18D6BD]/16 pb-5">
                  <div>
                    <p className="font-mono text-xs text-[#18D6BD]">DOC INDEX</p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#F0FFFD]">Start with the review path</h2>
                  </div>
                  <Search className="h-6 w-6 shrink-0 text-[#18D6BD]" />
                </div>
                <div className="mt-5 grid gap-3">
                  {['Product fit', 'Implementation scope', 'Security questions', 'Launch checklist'].map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-lg border border-[#18D6BD]/14 bg-[#071625]/36 px-4 py-3">
                      <span className="text-[#F0FFFD]/78">{item}</span>
                      <CheckCircle2 className="h-4 w-4 text-[#18D6BD]" />
                    </div>
                  ))}
                </div>
              </MotionReveal>
            </div>
          </div>
        </section>

        <ManagedContentSections content={content} fallbackTitle="Current documentation details" fallbackDescription="These sections are managed from the admin panel and published separately from drafts." />

        <section className="section-ambient section-ambient--light relative overflow-hidden bg-white py-24 lg:py-32">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-14 max-w-3xl">
              <MotionReveal as="h2" variant="heading" className="text-4xl font-semibold text-[#071625] lg:text-5xl">
                Choose the documentation path that matches your review.
              </MotionReveal>
              <MotionReveal as="p" delay={90} variant="heading" className="mt-6 text-xl leading-relaxed text-gray-600">
                Each section is written for teams preparing a decision, not for passive browsing. Start where your current blocker is clearest.
              </MotionReveal>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {docSections.map((section, index) => (
                <MotionReveal
                  key={section.title}
                  delay={index * 85}
                  variant="card"
                  className="motion-card rounded-lg border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-[#18D6BD]/50"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#18D6BD]/10">
                    <section.icon className="h-6 w-6 text-[#07988D]" />
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold text-[#071625]">{section.title}</h3>
                  <p className="leading-relaxed text-gray-600">{section.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <span key={item} className="rounded-lg border border-[#18D6BD]/20 bg-[#EDFAFA] px-3 py-1.5 text-sm text-[#0B1F2C]">
                        {item}
                      </span>
                    ))}
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-ambient section-ambient--soft relative overflow-hidden bg-[#EDFAFA] py-24 lg:py-32">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div>
                <MotionReveal as="h2" variant="heading" className="text-4xl font-semibold text-[#071625] lg:text-5xl">
                  A cleaner implementation conversation starts before configuration.
                </MotionReveal>
                <MotionReveal as="p" delay={90} variant="heading" className="mt-6 text-xl leading-relaxed text-gray-600">
                  The documentation is organized around decisions teams need to make early, when workflow clarity and review discipline still have the most leverage.
                </MotionReveal>
              </div>

              <div className="grid gap-5">
                {implementationSteps.map((step, index) => (
                  <MotionReveal
                    key={step.title}
                    delay={index * 85}
                    variant="panel"
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm shadow-[#071625]/5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#071625] font-mono text-sm text-[#18D6BD]">
                        {step.label}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#071625]">{step.title}</h3>
                        <p className="mt-2 leading-relaxed text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </MotionReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-ambient section-ambient--dark relative overflow-hidden bg-[#0B1F2C] py-24 lg:py-32">
          <SecurityMesh density="low" glowColor="#35EAD0" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <MotionReveal as="h2" variant="heading" className="text-4xl font-semibold text-[#F0FFFD] lg:text-5xl">
                Built for different reviewers in the <span className="text-[#18D6BD]">same decision.</span>
              </MotionReveal>
              <MotionReveal as="p" delay={90} variant="heading" className="mt-6 text-xl leading-relaxed text-[#F0FFFD]/68">
                Product adoption in regulated operations rarely belongs to one person. The page gives each reviewer a concrete starting point.
              </MotionReveal>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {reviewerGuides.map((guide, index) => (
                <MotionReveal
                  key={guide.title}
                  delay={index * 85}
                  variant="card"
                  className="motion-card motion-card--dark rounded-lg border border-[#18D6BD]/18 bg-[#0B2233]/62 p-8 transition-all duration-300"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#18D6BD]/10">
                    <guide.icon className="h-6 w-6 text-[#18D6BD]" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-[#F0FFFD]">{guide.title}</h3>
                  <p className="leading-relaxed text-[#F0FFFD]/66">{guide.description}</p>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-ambient section-ambient--light relative overflow-hidden bg-white py-24 lg:py-32">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <MotionReveal as="h2" variant="heading" className="text-4xl font-semibold text-[#071625] lg:text-5xl">
                  Preparation checklist
                </MotionReveal>
                <MotionReveal as="p" delay={90} variant="heading" className="mt-6 text-xl leading-relaxed text-gray-600">
                  Bring these answers into a demo or technical review to keep the discussion specific to your operating environment.
                </MotionReveal>
                <MotionReveal delay={180} variant="panel" className="mt-8">
                  <Link
                    href="/contact"
                    className="premium-button inline-flex items-center justify-center rounded-lg bg-[#18D6BD] px-7 py-3.5 text-[#071625] shadow-lg shadow-[#18D6BD]/20 transition-all duration-200 hover:bg-[#35EAD0]"
                  >
                    Discuss implementation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </MotionReveal>
              </div>

              <MotionReveal delay={160} variant="panel" className="grid gap-4">
                {checklist.map((item) => (
                  <div key={item} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm shadow-[#071625]/5">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#07988D]" />
                    <p className="leading-relaxed text-gray-700">{item}</p>
                  </div>
                ))}
              </MotionReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
