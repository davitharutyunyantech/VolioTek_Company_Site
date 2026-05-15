import type { Metadata } from 'next';
import { ArrowRight, BadgeCheck, ClipboardList, LockKeyhole, ShieldCheck } from 'lucide-react';

import { DetailList, FinalCta, HeroPanel, PageHero, PublicPageShell, SplitSection } from '../components/PublicPageBlocks';

const lastUpdated = 'May 15, 2026';

export const metadata: Metadata = {
  title: 'Privacy Policy | VolioTek',
  description:
    'Read the VolioTek Privacy Policy for website information collection, data use, service providers, retention, security, and privacy contact details.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | VolioTek',
    description:
      'VolioTek privacy information covering website inquiries, contact details, analytics, vendors, retention, security, and privacy requests.',
    url: '/privacy-policy',
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
    title: 'Privacy Policy | VolioTek',
    description:
      'Privacy practices for the VolioTek website, business inquiries, service providers, and privacy requests.',
    images: ['/brand/banner-light.png'],
  },
};

const privacySections = [
  {
    title: 'Information we collect',
    body:
      'We may collect business contact details, messages submitted through email or forms, basic website analytics, and technical information needed to operate and protect our website. We do not ask visitors to submit patient records through this website.',
  },
  {
    title: 'How we use information',
    body:
      'We use information to respond to inquiries, evaluate product fit, schedule conversations, maintain website reliability, improve our content, and protect against misuse or unauthorized activity.',
  },
  {
    title: 'Sharing and service providers',
    body:
      'We may share limited information with vendors that help us host, secure, analyze, or communicate through the website. We do not sell personal information. Customer production data is handled under the applicable customer agreement and, when required, a business associate agreement.',
  },
  {
    title: 'Security and retention',
    body:
      'We apply administrative, technical, and organizational safeguards appropriate to the information involved. We keep information only as long as needed for the purposes described here, legal requirements, security needs, or legitimate business records.',
  },
  {
    title: 'Your choices',
    body:
      'You may contact us to request access, correction, deletion, or other privacy assistance related to information you have provided to VolioTek, subject to identity verification and applicable law.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'PrivacyPolicy',
  name: 'Privacy Policy | VolioTek',
  url: 'https://voliotek.com/privacy-policy',
  dateModified: '2026-05-15',
  description:
    'VolioTek privacy information covering website inquiries, contact details, analytics, vendors, retention, security, and privacy requests.',
  publisher: {
    '@type': 'Organization',
    name: 'VolioTek',
    url: 'https://voliotek.com',
    email: 'contact@voliotek.com',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PublicPageShell jsonLd={jsonLd}>
      <PageHero
        eyebrow="Privacy Policy"
        EyebrowIcon={ShieldCheck}
        title={<>How VolioTek handles <span className="text-[#18D6BD]">website information.</span></>}
        description="This policy explains what information may be collected through this website, how it is used, and how to contact us about privacy requests."
        gridClassName="lg:grid-cols-[1.02fr_0.98fr]"
      >
        <HeroPanel
          icon={ClipboardList}
          title="Current version"
          description={`Last updated ${lastUpdated}. Customer production data is governed by the applicable customer agreement and any required business associate agreement.`}
          action={{ href: '/terms-of-service', label: 'View terms', icon: ArrowRight }}
        />
      </PageHero>

      <SplitSection
        title="Privacy details"
        description="This policy applies to information collected through the VolioTek website and direct business inquiries."
        className="section-ambient--soft bg-[#EDFAFA]"
        columns="lg:grid-cols-[0.85fr_1.15fr]"
      >
        <DetailList items={privacySections} Icon={LockKeyhole} />
      </SplitSection>

      <FinalCta
        title={<>Privacy questions <span className="text-[#18D6BD]">or requests?</span></>}
        description="Contact VolioTek for access, correction, deletion, security, or policy questions related to information you provided."
        primaryAction={{
          href: 'mailto:contact@voliotek.com?subject=VolioTek%20privacy%20question',
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
