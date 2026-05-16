import { NextResponse } from 'next/server';

import {
  checkInquiryRateLimit,
  createInquiry,
  publicInquirySchema,
} from '@/lib/server/inquiries';

export const runtime = 'nodejs';

function getClientKey(request: Request, email?: string) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = request.headers.get('x-real-ip')?.trim();
  return `${forwardedFor || realIp || 'unknown'}:${email?.toLowerCase() || 'unknown'}`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = publicInquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the form fields.', issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ error: 'Unable to submit this request.' }, { status: 400 });
  }

  if (!checkInquiryRateLimit(getClientKey(request, parsed.data.email))) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429 },
    );
  }

  try {
    const inquiry = await createInquiry(parsed.data, request.headers.get('user-agent') ?? undefined);
    return NextResponse.json({ inquiryId: inquiry.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to submit this request.' },
      { status: 500 },
    );
  }
}
