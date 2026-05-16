import { NextResponse } from 'next/server';

import { listInquiries } from '@/lib/server/inquiries';
import { requireAdminSession } from '@/lib/server/auth';

export const runtime = 'nodejs';

export async function GET() {
  await requireAdminSession();
  return NextResponse.json({ inquiries: await listInquiries() });
}
