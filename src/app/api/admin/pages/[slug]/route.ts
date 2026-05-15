import { NextResponse } from 'next/server';

import { getEditablePage, saveDraft } from '@/lib/content/store';
import { pageSlugSchema } from '@/lib/content/schemas';
import { requireAdminCsrf, requireAdminSession } from '@/lib/server/auth';

export const runtime = 'nodejs';

type Params = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  await requireAdminSession();
  const { slug } = await params;
  const parsedSlug = pageSlugSchema.parse(slug);

  return NextResponse.json({ page: await getEditablePage(parsedSlug) });
}

export async function PUT(request: Request, { params }: Params) {
  const session = await requireAdminCsrf(request);
  const { slug } = await params;
  const parsedSlug = pageSlugSchema.parse(slug);
  const body = (await request.json().catch(() => null)) as { metadata?: unknown; content?: unknown } | null;

  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  try {
    await saveDraft({
      slug: parsedSlug,
      metadata: body.metadata,
      content: body.content,
      userId: session.userId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save draft.' },
      { status: 400 },
    );
  }

  return NextResponse.json({ page: await getEditablePage(parsedSlug) });
}
