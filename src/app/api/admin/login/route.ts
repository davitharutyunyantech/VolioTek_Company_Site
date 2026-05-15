import { NextResponse } from 'next/server';

import { authenticateAdmin, setSessionCookie } from '@/lib/server/auth';
import { checkLoginRateLimit, clearLoginRateLimit, getLoginRateLimitKey } from '@/lib/server/login-rate-limit';
import { getPrisma } from '@/lib/server/prisma';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password ?? '';
  const prisma = getPrisma();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const rateLimitKey = getLoginRateLimitKey(request, email);
  const rateLimit = checkLoginRateLimit(rateLimitKey);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many sign-in attempts. Try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const admin = await authenticateAdmin(email, password).catch(() => 'database-unavailable' as const);

  if (admin === 'database-unavailable') {
    return NextResponse.json({ error: 'Admin database is unavailable.' }, { status: 503 });
  }

  if (!admin) {
    await prisma?.auditEvent.create({
      data: {
        action: 'LOGIN_FAILED',
        detail: { email },
      },
    });
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  clearLoginRateLimit(rateLimitKey);
  await setSessionCookie({ userId: admin.id, email: admin.email });
  await prisma?.auditEvent.create({
    data: {
      action: 'LOGIN',
      userId: admin.id,
    },
  });

  return NextResponse.json({ admin });
}
