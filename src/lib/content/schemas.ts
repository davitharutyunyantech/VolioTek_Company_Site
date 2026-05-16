import { z } from 'zod';

export const pageSlugSchema = z.enum([
  'home',
  'about',
  'contact',
  'request-demo',
  'documentation',
  'compliance',
  'privacy-policy',
  'terms-of-service',
  'business-associate-agreement',
]);

export type PageSlug = z.infer<typeof pageSlugSchema>;

export const metadataSchema = z.object({
  title: z.string().min(3).max(140),
  description: z.string().min(20).max(320),
  canonical: z.string().min(1).max(120),
});

const actionSchema = z.object({
  label: z.string().min(1).max(80),
  href: z.string().min(1).max(240),
});

const metricSchema = z.object({
  value: z.string().min(1).max(24),
  label: z.string().min(1).max(80),
});

const cardSchema = z.object({
  icon: z.string().min(1).max(48),
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(500),
  highlights: z.array(z.string().min(1).max(120)).optional(),
});

const stepSchema = z.object({
  icon: z.string().min(1).max(48),
  number: z.string().min(1).max(8),
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(500),
});

export const homeContentSchema = z.object({
  hero: z.object({
    eyebrow: z.string().min(1).max(120),
    title: z.string().min(1).max(220),
    highlightedTitle: z.string().min(1).max(80),
    description: z.string().min(20).max(500),
    primaryAction: actionSchema,
    secondaryAction: actionSchema,
    metrics: z.array(metricSchema).min(1).max(4),
  }),
  capabilities: z.object({
    title: z.string().min(1).max(160),
    description: z.string().min(20).max(500),
    items: z.array(cardSchema).min(1).max(9),
  }),
  security: z.object({
    eyebrow: z.string().min(1).max(120),
    title: z.string().min(1).max(160),
    highlightedTitle: z.string().min(1).max(80),
    description: z.string().min(20).max(500),
    items: z.array(cardSchema).min(1).max(9),
  }),
  process: z.object({
    title: z.string().min(1).max(160),
    description: z.string().min(20).max(500),
    steps: z.array(stepSchema).min(1).max(6),
  }),
  useCases: z.object({
    title: z.string().min(1).max(160),
    description: z.string().min(20).max(500),
    items: z.array(cardSchema).min(1).max(6),
  }),
  finalCta: z.object({
    title: z.string().min(1).max(160),
    highlightedTitle: z.string().min(1).max(80),
    description: z.string().min(20).max(500),
    primaryAction: actionSchema,
    secondaryAction: actionSchema,
  }),
});

export type PageMetadata = z.infer<typeof metadataSchema>;
export type HomeContent = z.infer<typeof homeContentSchema>;

export const genericPageContentSchema = z.object({
  headline: z.string().min(1).max(220),
  highlightedText: z.string().max(120).optional().default(''),
  description: z.string().min(20).max(700),
  sections: z
    .array(
      z.object({
        title: z.string().min(1).max(180),
        body: z.string().min(1).max(1800),
      }),
    )
    .min(0)
    .max(12),
});

export type GenericPageContent = z.infer<typeof genericPageContentSchema>;

export const pageContentSchemaBySlug = {
  home: homeContentSchema,
  about: genericPageContentSchema,
  contact: genericPageContentSchema,
  'request-demo': genericPageContentSchema,
  documentation: genericPageContentSchema,
  compliance: genericPageContentSchema,
  'privacy-policy': genericPageContentSchema,
  'terms-of-service': genericPageContentSchema,
  'business-associate-agreement': genericPageContentSchema,
} satisfies Record<PageSlug, z.ZodType>;

export function validatePageContent(slug: PageSlug, content: unknown) {
  return pageContentSchemaBySlug[slug].safeParse(content);
}
