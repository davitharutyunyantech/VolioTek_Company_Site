import assert from 'node:assert/strict';
import { test } from 'node:test';

import { defaultHomeContent, pageSeeds } from './defaults';
import { homeContentSchema, metadataSchema, pageSlugSchema, validatePageContent } from './schemas';

test('home content default passes validation', () => {
  assert.equal(homeContentSchema.safeParse(defaultHomeContent).success, true);
});

test('all seeded pages have valid metadata and content', () => {
  for (const seed of pageSeeds) {
    assert.equal(pageSlugSchema.safeParse(seed.slug).success, true);
    assert.equal(metadataSchema.safeParse(seed.metadata).success, true);
    assert.equal(validatePageContent(seed.slug, seed.content).success, true);
  }
});

test('invalid home content fails validation', () => {
  const result = validatePageContent('home', {
    hero: {
      eyebrow: '',
    },
  });

  assert.equal(result.success, false);
});
