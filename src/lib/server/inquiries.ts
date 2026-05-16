import { z } from 'zod';

import { InquiryStatus, InquiryType } from '@/generated/prisma/enums';
import { getPrisma } from './prisma';

const optionalTextSchema = z
  .string()
  .trim()
  .max(2_000)
  .optional()
  .transform((value) => (value ? value : undefined));

const baseInquirySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters.').max(120),
  email: z.string().trim().email('Enter a valid email address.').max(180),
  message: optionalTextSchema,
  source: z.string().trim().max(160).optional(),
  honeypot: z.string().trim().max(200).optional(),
});

export const publicInquirySchema = z.discriminatedUnion('type', [
  baseInquirySchema.extend({
    type: z.literal('demo_request'),
    company: z.string().trim().min(2, 'Company is required.').max(160),
    role: z.string().trim().min(2, 'Role is required.').max(120),
    interest: z.string().trim().min(4, 'Tell us what you want to see.').max(500),
    preferredContactTime: optionalTextSchema,
    subject: optionalTextSchema,
  }),
  baseInquirySchema.extend({
    type: z.literal('contact'),
    subject: z.string().trim().min(3, 'Subject is required.').max(180),
    company: optionalTextSchema,
    role: optionalTextSchema,
    interest: optionalTextSchema,
    preferredContactTime: optionalTextSchema,
  }),
]);

export const inquiryStatusSchema = z.enum([
  InquiryStatus.NEW,
  InquiryStatus.CONTACTED,
  InquiryStatus.SCHEDULED,
  InquiryStatus.CLOSED,
  InquiryStatus.SPAM,
]);

export type PublicInquiryInput = z.infer<typeof publicInquirySchema>;

const rateLimitWindowMs = 15 * 60 * 1000;
const maxSubmissionsPerWindow = 5;

const globalForInquiryRateLimit = globalThis as unknown as {
  inquiryRateLimit?: Map<string, { count: number; resetAt: number }>;
};

function getRateLimitStore() {
  globalForInquiryRateLimit.inquiryRateLimit ??= new Map();
  return globalForInquiryRateLimit.inquiryRateLimit;
}

export function checkInquiryRateLimit(key: string) {
  const now = Date.now();
  const store = getRateLimitStore();
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return true;
  }

  if (existing.count >= maxSubmissionsPerWindow) {
    return false;
  }

  existing.count += 1;
  return true;
}

export async function createInquiry(input: PublicInquiryInput, userAgent?: string) {
  const prisma = getPrisma();

  if (!prisma) {
    throw new Error('Database is not configured.');
  }

  return prisma.inquiry.create({
    data: {
      type: input.type === 'demo_request' ? InquiryType.DEMO_REQUEST : InquiryType.CONTACT,
      name: input.name,
      email: input.email.toLowerCase(),
      company: input.company,
      role: input.role,
      subject: input.subject,
      message: input.message,
      interest: input.interest,
      preferredContactTime: input.preferredContactTime,
      source: input.source,
      userAgent,
    },
  });
}

export async function listInquiries() {
  const prisma = getPrisma();

  if (!prisma) {
    return [];
  }

  return prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
  });
}

export async function getInquiry(id: string) {
  const prisma = getPrisma();

  if (!prisma) {
    return null;
  }

  return prisma.inquiry.findUnique({ where: { id } });
}

export async function updateInquiryStatus(id: string, status: z.infer<typeof inquiryStatusSchema>) {
  const prisma = getPrisma();

  if (!prisma) {
    throw new Error('Database is not configured.');
  }

  return prisma.inquiry.update({
    where: { id },
    data: { status },
  });
}
