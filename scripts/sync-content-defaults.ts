import { pageSeeds } from '../src/lib/content/defaults';
import { getPrisma } from '../src/lib/server/prisma';

type GenericContent = {
  headline?: string;
  description?: string;
  sections?: unknown[];
};

function isEmptyOrPlaceholderContent(currentContent: unknown, seedContent: unknown) {
  const current = currentContent as GenericContent;
  const seed = seedContent as GenericContent;

  if (!Array.isArray(current.sections) || !Array.isArray(seed.sections)) {
    return false;
  }

  if (current.sections.length === 0) {
    return true;
  }

  return current.headline === seed.headline && current.description === seed.description && current.sections.length === 0;
}

function toJson(value: unknown) {
  return JSON.parse(JSON.stringify(value));
}

async function main() {
  const prisma = getPrisma();

  if (!prisma) {
    throw new Error('DATABASE_URL is required to sync content defaults.');
  }

  let updated = 0;

  for (const seed of pageSeeds) {
    if (seed.slug === 'home') {
      continue;
    }

    const page = await prisma.sitePage.findUnique({
      where: { slug: seed.slug },
      include: { draftRevision: true, publishedRevision: true, revisions: { orderBy: { version: 'desc' }, take: 1 } },
    });

    const currentRevision = page?.draftRevision ?? page?.publishedRevision;

    if (!page || !currentRevision || !isEmptyOrPlaceholderContent(currentRevision.content, seed.content)) {
      continue;
    }

    const nextVersion = (page.revisions[0]?.version ?? currentRevision.version) + 1;
    const revision = await prisma.pageRevision.create({
      data: {
        pageId: page.id,
        version: nextVersion,
        metadata: toJson(seed.metadata),
        content: toJson(seed.content),
      },
    });

    await prisma.sitePage.update({
      where: { id: page.id },
      data: {
        draftRevisionId: revision.id,
        publishedRevisionId: page.publishedRevisionId ? revision.id : page.publishedRevisionId,
        status: page.publishedRevisionId ? 'PUBLISHED' : page.status,
      },
    });

    updated += 1;
  }

  console.log(`Synced managed defaults for ${updated} page(s).`);
}

main()
  .finally(async () => {
    await getPrisma()?.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
