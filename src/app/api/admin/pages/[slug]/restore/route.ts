import { NextResponse } from 'next/server';

import { restorePage } from '@/lib/content/store';
import { pageSlugSchema } from '@/lib/content/schemas';
import { requireAdminCsrf } from '@/lib/server/auth';

export const runtime = 'nodejs';

type Params = {
  params: Promise<{ slug: string }>;
};

export async function POST(request: Request, { params }: Params) {
  const session = await requireAdminCsrf(request);
  const { slug } = await params;
  await restorePage(pageSlugSchema.parse(slug), session.userId);
  return NextResponse.json({ ok: true });
}
