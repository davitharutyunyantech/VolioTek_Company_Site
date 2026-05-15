type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const attempts = new Map<string, RateLimitEntry>();

export function getLoginRateLimitKey(request: Request, email: string) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = request.headers.get('x-real-ip')?.trim();
  const ip = forwardedFor || realIp || 'unknown';

  return `${ip}:${email.toLowerCase()}`;
}

export function checkLoginRateLimit(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;

  if (entry.count > MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function clearLoginRateLimit(key: string) {
  attempts.delete(key);
}
