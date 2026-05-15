import { NextResponse } from 'next/server';

import { getPublishedPage } from '@/lib/content/store';
import { pageSlugSchema } from '@/lib/content/schemas';

export const runtime = 'nodejs';

type Params = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const parsedSlug = pageSlugSchema.parse(slug);

  return NextResponse.json({ page: await getPublishedPage(parsedSlug) });
}
