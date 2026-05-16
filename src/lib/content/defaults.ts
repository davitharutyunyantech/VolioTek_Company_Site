import type { GenericPageContent, HomeContent, PageMetadata, PageSlug } from './schemas';

export type PageSeed = {
  slug: PageSlug;
  title: string;
  metadata: PageMetadata;
  content: unknown;
};

export const defaultHomeContent: HomeContent = {
  hero: {
    eyebrow: 'HIPAA-Compliant Infrastructure',
    title: 'The secure operations platform for regulated',
    highlightedTitle: 'healthcare teams',
    description:
      'VolioTek is the product we created for healthcare organizations that need private workflows, precise coordination, and regulatory confidence in one trusted system.',
    primaryAction: { label: 'Request Demo', href: '/request-demo' },
    secondaryAction: { label: 'View Capabilities', href: '#capabilities' },
    metrics: [
      { value: '100%', label: 'HIPAA Compliant' },
      { value: '24/7', label: 'Support Available' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
  },
  capabilities: {
    title: 'What VolioTek does',
    description:
      'A secure, scalable product for healthcare organizations that need precision, reliability, and regulatory confidence.',
    items: [
      {
        icon: 'Database',
        title: 'Healthcare Workflow Platform',
        description:
          'A structured product environment for coordinating clinical operations, administrative tasks, and regulated healthcare workflows.',
      },
      {
        icon: 'Lock',
        title: 'Private & Secure Infrastructure',
        description:
          'HIPAA-compliant architecture with end-to-end encryption, role-based access control, and complete audit trails.',
      },
      {
        icon: 'Activity',
        title: 'Real-Time Operations',
        description:
          'Monitor, track, and manage complex healthcare operations with real-time data synchronization and status updates.',
      },
      {
        icon: 'FileCheck',
        title: 'Compliance Documentation',
        description:
          'Automated compliance tracking, audit logging, and regulatory reporting built directly into the VolioTek product.',
      },
      {
        icon: 'Layers',
        title: 'Integration & Interoperability',
        description:
          'Seamless integration with existing EHR systems, third-party tools, and healthcare data standards (HL7, FHIR).',
      },
      {
        icon: 'Workflow',
        title: 'Operational Intelligence',
        description:
          'Analytics and insights that help healthcare teams make informed decisions and optimize operational efficiency.',
      },
    ],
  },
  security: {
    eyebrow: 'Enterprise-Grade Security',
    title: 'Security and privacy',
    highlightedTitle: 'by design',
    description:
      'The VolioTek platform includes security controls, regulatory safeguards, and operational protections as part of the core product.',
    items: [
      {
        icon: 'Shield',
        title: 'HIPAA Compliance',
        description:
          'Full HIPAA compliance with comprehensive BAAs, encrypted data at rest and in transit, and regular security audits.',
      },
      {
        icon: 'Lock',
        title: 'End-to-End Encryption',
        description:
          'AES-256 encryption for all data storage and TLS 1.3 for data transmission, ensuring complete privacy.',
      },
      {
        icon: 'Key',
        title: 'Access Control',
        description:
          'Granular role-based permissions, multi-factor authentication, and session management for every user.',
      },
      {
        icon: 'Eye',
        title: 'Complete Audit Trails',
        description:
          'Detailed logging of all system actions, data access, and modifications for compliance and accountability.',
      },
      {
        icon: 'FileCheck',
        title: 'Regular Security Testing',
        description:
          'Continuous vulnerability scanning, penetration testing, and security assessments by third-party experts.',
      },
      {
        icon: 'Server',
        title: 'Isolated Environments',
        description:
          'Private tenant isolation, secure network boundaries, and dedicated infrastructure for sensitive operations.',
      },
    ],
  },
  process: {
    title: 'How teams adopt VolioTek',
    description:
      'A practical onboarding path for healthcare organizations adopting a secure, compliant operations product.',
    steps: [
      {
        icon: 'MessageSquare',
        number: '01',
        title: 'Product Fit Review',
        description:
          'We review your operational workflows, regulatory needs, and team structure to confirm where VolioTek fits best.',
      },
      {
        icon: 'FileSearch',
        number: '02',
        title: 'Security & Compliance Alignment',
        description:
          'We map platform controls, access policies, audit requirements, and data boundaries to your operating environment.',
      },
      {
        icon: 'Code',
        number: '03',
        title: 'Configuration & Validation',
        description:
          'We configure the product around your teams, roles, workflows, and reporting needs, then validate the setup before rollout.',
      },
      {
        icon: 'Rocket',
        number: '04',
        title: 'Launch & Ongoing Support',
        description:
          'We help your team launch on VolioTek with monitoring, documentation, product updates, and ongoing technical support.',
      },
    ],
  },
  useCases: {
    title: 'Who we serve',
    description:
      'VolioTek serves healthcare organizations that need secure, reliable product infrastructure for regulated operations.',
    items: [
      {
        icon: 'Building2',
        title: 'Healthcare Providers',
        description:
          'A secure operations platform for hospitals, clinics, and healthcare facilities managing complex patient workflows and regulatory compliance.',
        highlights: ['Patient care coordination', 'Clinical workflow automation', 'Regulatory reporting'],
      },
      {
        icon: 'Users',
        title: 'Healthcare Technology Companies',
        description:
          'A private, compliant product layer for healthtech teams that need secure workflow coordination and healthcare data integration.',
        highlights: ['HIPAA-compliant platforms', 'Healthcare data integration', 'Scalable architecture'],
      },
      {
        icon: 'ClipboardCheck',
        title: 'Compliance & Operations Teams',
        description:
          'Specialized tools for compliance officers, operations managers, and administrative teams handling sensitive healthcare operations.',
        highlights: ['Audit management', 'Document control systems', 'Compliance tracking'],
      },
    ],
  },
  finalCta: {
    title: 'Ready to see VolioTek',
    highlightedTitle: 'in action?',
    description:
      'See how the platform supports regulated workflows, secure access, compliance visibility, and operational coordination for healthcare teams.',
    primaryAction: { label: 'Request Demo', href: '/request-demo' },
    secondaryAction: { label: 'Contact Us', href: '/contact' },
  },
};

const genericContent = (
  headline: string,
  highlightedText: string,
  description: string,
  sections: GenericPageContent['sections'] = [],
): GenericPageContent => ({
  headline,
  highlightedText,
  description,
  sections,
});

export const pageSeeds: PageSeed[] = [
  {
    slug: 'home',
    title: 'Home',
    metadata: {
      title: 'VolioTek | Secure Healthcare Operations Platform',
      description:
        'VolioTek helps regulated healthcare teams coordinate private workflows, security reviews, implementation planning, and operational accountability.',
      canonical: '/',
    },
    content: defaultHomeContent,
  },
  {
    slug: 'about',
    title: 'About',
    metadata: {
      title: 'About VolioTek | Healthcare Operations Software Company',
      description:
        'Learn about VolioTek, the company building secure healthcare operations software for teams that need privacy, accountability, and reliable execution.',
      canonical: '/about',
    },
    content: genericContent(
      'We build healthcare software for organizations that cannot treat trust as an afterthought.',
      'an afterthought.',
      'VolioTek is a product company focused on disciplined operations, protected information, and the practical realities of regulated healthcare work.',
      [
        {
          title: 'Why we exist',
          body:
            'Healthcare teams are asked to move quickly while protecting information, proving process, and coordinating work across many roles. We build VolioTek for that tension: fast enough for daily operations, deliberate enough for regulated environments.',
        },
        {
          title: 'Security before scale',
          body:
            'We design around protected data, least-privilege access, and operational accountability before expanding feature surface.',
        },
        {
          title: 'Built for working teams',
          body:
            'Our product decisions start with the people coordinating care operations, administrative work, compliance tasks, and leadership visibility.',
        },
        {
          title: 'Clear implementation',
          body:
            'We favor explicit workflows, readable controls, and documented decisions so customers understand how the system supports their environment.',
        },
      ],
    ),
  },
  {
    slug: 'contact',
    title: 'Contact',
    metadata: {
      title: 'Contact VolioTek | Healthcare Operations Software Demo',
      description:
        'Contact VolioTek to discuss secure healthcare operations software, implementation fit, privacy requirements, and demo scheduling for regulated teams.',
      canonical: '/contact',
    },
    content: genericContent(
      'Start the right product conversation before the demo.',
      'the demo.',
      'Tell us what your team is trying to coordinate, what needs to stay protected, and where VolioTek should fit into your operating model.',
      [
        {
          title: 'What happens next',
          body:
            'A product conversation usually starts with workflow scope, stakeholder needs, and review constraints. From there, we can schedule a focused demo or technical discussion.',
        },
        {
          title: 'Product inquiries',
          body:
            'For demo requests, operating questions, and first conversations about whether VolioTek matches your environment.',
        },
        {
          title: 'Implementation fit',
          body:
            'Share the workflows, access roles, integration points, and compliance constraints your team needs to account for.',
        },
        {
          title: 'Security review',
          body:
            'Route privacy, policy, and review questions to the team before a deeper technical or procurement discussion.',
        },
        {
          title: 'Helpful details to include',
          body:
            'Include which workflows need tighter coordination, current systems VolioTek should complement or replace, defined security and audit requirements, decision timeline, stakeholder group, and preferred demo format.',
        },
      ],
    ),
  },
  {
    slug: 'request-demo',
    title: 'Request Demo',
    metadata: {
      title: 'Request a VolioTek Demo | Healthcare Operations Software',
      description:
        'Request a focused VolioTek demo for regulated healthcare operations, workflow coordination, security review, and implementation planning.',
      canonical: '/request-demo',
    },
    content: genericContent(
      'See VolioTek in the context of your team.',
      'your team.',
      'Tell us what your organization needs to coordinate, protect, or review. We will prepare a focused product conversation around that operating reality.',
      [
        {
          title: 'What happens next',
          body:
            'We review your request, confirm the right discussion format, and follow up with scheduling details for a focused demo.',
        },
        {
          title: 'Demo request',
          body:
            'Share the operating context your team wants to evaluate. We use it to prepare a practical product conversation instead of a generic walkthrough.',
        },
        {
          title: 'Useful details for a better demo',
          body:
            'Include workflows to evaluate, current systems, security and audit requirements, decision timeline, stakeholder group, and preferred demo format.',
        },
      ],
    ),
  },
  {
    slug: 'documentation',
    title: 'Documentation',
    metadata: {
      title: 'Documentation | VolioTek Healthcare Operations Platform',
      description:
        'Explore VolioTek documentation for product evaluation, implementation planning, access control, workflow setup, and healthcare security review.',
      canonical: '/documentation',
    },
    content: genericContent(
      'Practical guidance for evaluating and adopting VolioTek.',
      'adopting VolioTek.',
      'Use these resources to prepare workflow scope, review questions, access models, and implementation details before a product conversation.',
      [
        {
          title: 'Evaluation guide',
          body:
            'Review the operating assumptions, stakeholder questions, and readiness signals that help teams decide whether VolioTek belongs in their environment.',
        },
        {
          title: 'Configuration model',
          body:
            'Understand how workspaces, roles, workflow stages, review checkpoints, and notification paths are typically mapped before launch.',
        },
        {
          title: 'Security review',
          body:
            'Prepare the questions your compliance, IT, and leadership teams will ask about protected data, auditability, and administrative control.',
        },
        {
          title: 'Integration planning',
          body:
            'Frame the systems, data handoffs, and import or export needs that should be discussed before implementation timelines are committed.',
        },
        {
          title: 'Preparation checklist',
          body:
            'List workflows needing stronger visibility, identify user roles, document source-of-truth systems, define required audit evidence, and prepare security, privacy, and procurement questions before the product discussion.',
        },
      ],
    ),
  },
  {
    slug: 'compliance',
    title: 'Compliance',
    metadata: {
      title: 'Compliance | VolioTek Healthcare Security',
      description:
        'Review VolioTek compliance positioning for healthcare operations, privacy programs, audit readiness, and security review workflows.',
      canonical: '/compliance',
    },
    content: genericContent(
      'Compliance support for regulated healthcare workflows.',
      'healthcare workflows.',
      'VolioTek helps healthcare teams evaluate platform safeguards, BAA readiness, access controls, and review documentation before sensitive workflows move into production.',
      [
        {
          title: 'Business Associate Agreement',
          body:
            'Eligible healthcare customers can request BAA review before any production workflow is configured to handle Protected Health Information.',
        },
        {
          title: 'Security questionnaire support',
          body:
            'Procurement, privacy, and IT teams can route review questions through VolioTek so answers are matched to the intended deployment scope.',
        },
        {
          title: 'Policy and data-handling context',
          body:
            'VolioTek can share product-specific context for access controls, logging, retention, vendors, and operational safeguards during evaluation.',
        },
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
      ],
    ),
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    metadata: {
      title: 'Privacy Policy | VolioTek',
      description:
        'Read the VolioTek privacy policy for information about data handling, privacy commitments, and contact details.',
      canonical: '/privacy-policy',
    },
    content: genericContent(
      'How VolioTek handles website information.',
      'website information.',
      'This policy explains what information may be collected through this website, how it is used, and how to contact us about privacy requests.',
      [
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
      ],
    ),
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    metadata: {
      title: 'Terms of Service | VolioTek',
      description:
        'Read the VolioTek terms of service for website usage and product conversation terms.',
      canonical: '/terms-of-service',
    },
    content: genericContent(
      'Terms for using the VolioTek website.',
      'VolioTek website.',
      'These terms govern public website use. Separate signed agreements control paid products and customer environments.',
      [
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
      ],
    ),
  },
  {
    slug: 'business-associate-agreement',
    title: 'Business Associate Agreement',
    metadata: {
      title: 'Business Associate Agreement | VolioTek',
      description:
        'Review VolioTek Business Associate Agreement information for healthcare organizations and regulated workflows.',
      canonical: '/business-associate-agreement',
    },
    content: genericContent(
      'BAA support for healthcare workflows involving PHI.',
      'involving PHI.',
      'VolioTek signs Business Associate Agreements with eligible healthcare customers before the product is used to create, receive, maintain, or transmit Protected Health Information.',
      [
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
      ],
    ),
  },
];

export function getDefaultSeed(slug: PageSlug) {
  return pageSeeds.find((page) => page.slug === slug) ?? pageSeeds[0];
}
