import { NextResponse } from 'next/server';

import { clearSessionCookie, requireAdminCsrf } from '@/lib/server/auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  await requireAdminCsrf(request);
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
