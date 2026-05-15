import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, FileText, LockKeyhole, ShieldCheck, Users } from 'lucide-react';

import { Checklist, FinalCta, IconCardGrid, PageHero, PublicPageShell, SectionIntro, SplitSection } from '../components/PublicPageBlocks';

export const metadata: Metadata = {
  title: 'About VolioTek | Healthcare Operations Software Company',
  description:
    'Learn about VolioTek, the company building secure healthcare operations software for teams that need privacy, accountability, and reliable execution.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About VolioTek',
    description:
      'VolioTek builds secure healthcare operations software with a focus on privacy, accountability, and dependable implementation.',
    url: '/about',
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
    title: 'About VolioTek',
    description:
      'The company behind secure healthcare operations software for privacy-conscious teams.',
    images: ['/brand/banner-light.png'],
  },
};

const principles = [
  {
    icon: ShieldCheck,
    title: 'Security before scale',
    body:
      'We design around protected data, least-privilege access, and operational accountability before expanding feature surface.',
  },
  {
    icon: Users,
    title: 'Built for working teams',
    body:
      'Our product decisions start with the people coordinating care operations, administrative work, compliance tasks, and leadership visibility.',
  },
  {
    icon: FileText,
    title: 'Clear implementation',
    body:
      'We favor explicit workflows, readable controls, and documented decisions so customers understand how the system supports their environment.',
  },
];

const operatingFocus = [
  'Sensitive healthcare workflows where privacy and traceability matter.',
  'Cross-functional operations that require shared context without loose access.',
  'Implementation paths that respect existing systems, policies, and team roles.',
  'Long-term product stewardship after launch, not one-time handoff.',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About VolioTek',
  url: 'https://voliotek.com/about',
  description:
    'Information about VolioTek, the company building secure healthcare operations software for privacy-conscious teams.',
  publisher: {
    '@type': 'Organization',
    name: 'VolioTek',
    url: 'https://voliotek.com',
    email: 'contact@voliotek.com',
    logo: 'https://voliotek.com/brand/logo-header-transparent.png',
  },
  mainEntity: {
    '@type': 'Organization',
    name: 'VolioTek',
    url: 'https://voliotek.com',
    email: 'contact@voliotek.com',
    description:
      'VolioTek builds secure healthcare operations software with a focus on privacy, accountability, and dependable implementation.',
  },
};

export default function AboutPage() {
  return (
    <PublicPageShell jsonLd={jsonLd}>
      <PageHero
        eyebrow="About VolioTek"
        EyebrowIcon={LockKeyhole}
        title={<>We build healthcare software for organizations that cannot treat trust as <span className="text-[#18D6BD]">an afterthought.</span></>}
        description="VolioTek is a product company focused on disciplined operations, protected information, and the practical realities of regulated healthcare work."
        overlayClassName="from-transparent via-[#071625]/40 to-[#071625]"
      />

      <SplitSection
        title="Why we exist"
        description="Healthcare teams are asked to move quickly while protecting information, proving process, and coordinating work across many roles. We build VolioTek for that tension: fast enough for daily operations, deliberate enough for regulated environments."
        columns="lg:grid-cols-[0.95fr_1.05fr]"
      >
        <Checklist items={operatingFocus} Icon={CheckCircle2} />
      </SplitSection>

      <section className="section-ambient section-ambient--soft relative overflow-hidden bg-[#EDFAFA] py-24 lg:py-32">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <SectionIntro
            title="How we make product decisions"
            description="Our work is shaped by the constraints healthcare operators actually live with: privacy obligations, audit needs, adoption risk, and the cost of unclear systems."
            align="center"
          />
          <IconCardGrid items={principles} />
        </div>
      </section>

      <FinalCta
        title={<>Work with a team that treats implementation as part of <span className="text-[#18D6BD]">the product.</span></>}
        description="Talk with us about your operating model, security requirements, and what your team needs to coordinate with confidence."
        primaryAction={{ href: '/#demo', label: 'Request Demo', icon: ArrowRight }}
        secondaryAction={{ href: '/contact', label: 'Contact Us', variant: 'secondary' }}
      />
    </PublicPageShell>
  );
}
