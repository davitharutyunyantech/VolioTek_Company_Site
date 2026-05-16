import type { Prisma } from '@/generated/prisma/client';

import { getDefaultSeed, pageSeeds } from './defaults';
import {
  metadataSchema,
  pageSlugSchema,
  validatePageContent,
  type PageMetadata,
  type PageSlug,
} from './schemas';
import { getPrisma } from '../server/prisma';

export type EditablePage = {
  id: string;
  slug: PageSlug;
  title: string;
  status: 'DRAFT' | 'PUBLISHED' | 'UNPUBLISHED' | 'ARCHIVED';
  metadata: PageMetadata;
  content: unknown;
  draftVersion: number;
  publishedVersion: number | null;
  updatedAt: string;
};

function toJson(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

export async function getPublishedPage(slug: PageSlug) {
  const seed = getDefaultSeed(slug);
  const prisma = getPrisma();

  if (!prisma) {
    return seed;
  }

  const page = await prisma.sitePage
    .findUnique({
      where: { slug },
      include: { publishedRevision: true },
    })
    .catch(() => null);

  if (!page) {
    return seed;
  }

  if (page.status !== 'PUBLISHED' || !page.publishedRevision) {
    return null;
  }

  const metadata = metadataSchema.safeParse(page.publishedRevision.metadata);
  const content = validatePageContent(slug, page.publishedRevision.content);

  if (!metadata.success || !content.success) {
    return seed;
  }

  return {
    slug,
    title: page.title,
    metadata: metadata.data,
    content: content.data,
  };
}

export async function listEditablePages(): Promise<EditablePage[]> {
  const prisma = getPrisma();

  if (!prisma) {
    return pageSeeds.map((page, index) => ({
      id: page.slug,
      slug: page.slug,
      title: page.title,
      status: 'DRAFT',
      metadata: page.metadata,
      content: page.content,
      draftVersion: 1,
      publishedVersion: null,
      updatedAt: new Date(index).toISOString(),
    }));
  }

  const pages = await prisma.sitePage.findMany({
    orderBy: { slug: 'asc' },
    include: { draftRevision: true, publishedRevision: true },
  });

  return pages.map((page) => {
    const slug = pageSlugSchema.parse(page.slug);
    const seed = getDefaultSeed(slug);
    const revision = page.draftRevision ?? page.publishedRevision;

    return {
      id: page.id,
      slug,
      title: page.title,
      status: page.status,
      metadata: metadataSchema.parse(revision?.metadata ?? seed.metadata),
      content: revision?.content ?? seed.content,
      draftVersion: page.draftRevision?.version ?? 0,
      publishedVersion: page.publishedRevision?.version ?? null,
      updatedAt: page.updatedAt.toISOString(),
    };
  });
}

export async function getEditablePage(slug: PageSlug): Promise<EditablePage> {
  const page = (await listEditablePages()).find((item) => item.slug === slug);

  if (!page) {
    throw new Error('Page not found');
  }

  return page;
}

export async function ensureSeedPages() {
  const prisma = getPrisma();

  if (!prisma) {
    throw new Error('DATABASE_URL is required to seed content.');
  }

  for (const seed of pageSeeds) {
    const existing = await prisma.sitePage.findUnique({
      where: { slug: seed.slug },
      include: { draftRevision: true, publishedRevision: true },
    });

    if (existing) {
      continue;
    }

    await prisma.$transaction(async (tx) => {
      const page = await tx.sitePage.create({
        data: {
          slug: seed.slug,
          title: seed.title,
          status: 'PUBLISHED',
        },
      });
      const revision = await tx.pageRevision.create({
        data: {
          pageId: page.id,
          version: 1,
          metadata: toJson(seed.metadata),
          content: toJson(seed.content),
        },
      });

      await tx.sitePage.update({
        where: { id: page.id },
        data: {
          draftRevisionId: revision.id,
          publishedRevisionId: revision.id,
        },
      });
    });
  }
}

export async function saveDraft({
  slug,
  metadata,
  content,
  userId,
}: {
  slug: PageSlug;
  metadata: unknown;
  content: unknown;
  userId: string;
}) {
  const metadataResult = metadataSchema.safeParse(metadata);
  const contentResult = validatePageContent(slug, content);

  if (!metadataResult.success || !contentResult.success) {
    throw new Error('Invalid page content.');
  }

  const prisma = getPrisma();

  if (!prisma) {
    throw new Error('DATABASE_URL is required to save content.');
  }

  const seed = getDefaultSeed(slug);
  const page = await prisma.sitePage.upsert({
    where: { slug },
    create: { slug, title: seed.title, status: 'DRAFT' },
    update: {},
    include: { revisions: { orderBy: { version: 'desc' }, take: 1 } },
  });

  if (page.status === 'ARCHIVED') {
    throw new Error('Archived pages must be restored before editing.');
  }

  const nextVersion = (page.revisions[0]?.version ?? 0) + 1;

  const revision = await prisma.pageRevision.create({
    data: {
      pageId: page.id,
      version: nextVersion,
      metadata: toJson(metadataResult.data),
      content: toJson(contentResult.data),
      createdById: userId,
    },
  });

  await prisma.sitePage.update({
    where: { id: page.id },
    data: {
      draftRevisionId: revision.id,
      status: page.publishedRevisionId ? page.status : 'DRAFT',
    },
  });

  await prisma.auditEvent.create({
    data: {
      action: 'DRAFT_SAVE',
      pageId: page.id,
      userId,
      detail: toJson({ version: nextVersion }),
    },
  });

  return revision;
}

export async function publishPage(slug: PageSlug, userId: string) {
  const prisma = getPrisma();

  if (!prisma) {
    throw new Error('DATABASE_URL is required to publish content.');
  }

  const page = await prisma.sitePage.findUnique({
    where: { slug },
    include: { draftRevision: true },
  });

  if (!page?.draftRevision) {
    throw new Error('Draft revision not found.');
  }

  if (page.status === 'ARCHIVED') {
    throw new Error('Archived pages must be restored before publishing.');
  }

  await prisma.sitePage.update({
    where: { id: page.id },
    data: {
      status: 'PUBLISHED',
      publishedRevisionId: page.draftRevision.id,
    },
  });

  await prisma.auditEvent.create({
    data: {
      action: 'PUBLISH',
      pageId: page.id,
      userId,
      detail: toJson({ version: page.draftRevision.version }),
    },
  });
}

export async function unpublishPage(slug: PageSlug, userId: string) {
  const prisma = getPrisma();

  if (!prisma) {
    throw new Error('DATABASE_URL is required to unpublish content.');
  }

  const page = await prisma.sitePage.update({
    where: { slug },
    data: { status: 'UNPUBLISHED', publishedRevisionId: null },
  });

  await prisma.auditEvent.create({
    data: { action: 'UNPUBLISH', pageId: page.id, userId },
  });
}

export async function archivePage(slug: PageSlug, userId: string) {
  const prisma = getPrisma();

  if (!prisma) {
    throw new Error('DATABASE_URL is required to archive content.');
  }

  const page = await prisma.sitePage.update({
    where: { slug },
    data: { status: 'ARCHIVED', publishedRevisionId: null },
  });

  await prisma.auditEvent.create({
    data: { action: 'ARCHIVE', pageId: page.id, userId },
  });
}

export async function restorePage(slug: PageSlug, userId: string) {
  const prisma = getPrisma();

  if (!prisma) {
    throw new Error('DATABASE_URL is required to restore content.');
  }

  const page = await prisma.sitePage.findUnique({
    where: { slug },
    include: { draftRevision: true },
  });

  if (!page?.draftRevision) {
    throw new Error('Draft revision not found.');
  }

  await prisma.sitePage.update({
    where: { id: page.id },
    data: {
      status: 'PUBLISHED',
      publishedRevisionId: page.draftRevision.id,
    },
  });

  await prisma.auditEvent.create({
    data: {
      action: 'RESTORE',
      pageId: page.id,
      userId,
      detail: toJson({ version: page.draftRevision.version, status: 'PUBLISHED' }),
    },
  });
}
