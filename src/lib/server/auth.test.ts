import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createSessionToken, hashPassword, parseSessionToken, verifyPassword } from './auth';

test('password hashes verify the original password only', () => {
  const hash = hashPassword('correct horse battery staple');

  assert.equal(verifyPassword('correct horse battery staple', hash), true);
  assert.equal(verifyPassword('wrong password', hash), false);
});

test('session token parses signed payload', () => {
  const token = createSessionToken({ userId: 'user_1', email: 'admin@example.com', csrf: 'csrf-token' });
  const payload = parseSessionToken(token);

  assert.equal(payload?.userId, 'user_1');
  assert.equal(payload?.email, 'admin@example.com');
  assert.equal(payload?.csrf, 'csrf-token');
});

test('session token rejects tampering', () => {
  const token = createSessionToken({ userId: 'user_1', email: 'admin@example.com', csrf: 'csrf-token' });
  const [payload] = token.split('.');

  assert.equal(parseSessionToken(`${payload}.bad-signature`), null);
});
