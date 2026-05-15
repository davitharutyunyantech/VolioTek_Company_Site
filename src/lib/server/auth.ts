import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

import { getPrisma } from './prisma';

const SESSION_COOKIE = 'voliotek_admin_session';
const CSRF_COOKIE = 'voliotek_admin_csrf';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  userId: string;
  email: string;
  csrf: string;
  exp: number;
};

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? 'development-admin-session-secret-change-me';
}

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString('base64url');
}

function signPayload(encodedPayload: string) {
  return createHmac('sha256', getSecret())
    .update(encodedPayload)
    .digest('base64url');
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('base64url');
  const hash = pbkdf2Sync(password, salt, 210_000, 32, 'sha256').toString('base64url');
  return `pbkdf2_sha256$210000$${salt}$${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [algorithm, iterationsValue, salt, hash] = storedHash.split('$');

  if (algorithm !== 'pbkdf2_sha256' || !iterationsValue || !salt || !hash) {
    return false;
  }

  const iterations = Number(iterationsValue);
  const candidate = pbkdf2Sync(password, salt, iterations, 32, 'sha256');
  const expected = Buffer.from(hash, 'base64url');

  return expected.length === candidate.length && timingSafeEqual(expected, candidate);
}

export function createSessionToken(payload: Omit<SessionPayload, 'exp'>) {
  const sessionPayload: SessionPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const encodedPayload = base64Url(JSON.stringify(sessionPayload));
  return `${encodedPayload}.${signPayload(encodedPayload)}`;
}

export function parseSessionToken(token?: string): SessionPayload | null {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature || signPayload(encodedPayload) !== signature) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as SessionPayload;

    if (!payload.userId || !payload.email || !payload.csrf || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(payload: Omit<SessionPayload, 'exp' | 'csrf'>) {
  const cookieStore = await cookies();
  const csrf = randomBytes(24).toString('base64url');

  cookieStore.set(SESSION_COOKIE, createSessionToken({ ...payload, csrf }), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
  });
  cookieStore.set(CSRF_COOKIE, csrf, {
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  cookieStore.delete(CSRF_COOKIE);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return parseSessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}

export async function requireAdminCsrf(request: Request) {
  const session = await requireAdminSession();
  const csrfHeader = request.headers.get('x-csrf-token');

  if (!csrfHeader || csrfHeader !== session.csrf) {
    throw new Error('Invalid CSRF token');
  }

  return session;
}

export async function authenticateAdmin(email: string, password: string) {
  const prisma = getPrisma();

  if (!prisma) {
    return null;
  }

  const user = await prisma.adminUser.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return null;
  }

  return { id: user.id, email: user.email, name: user.name };
}
