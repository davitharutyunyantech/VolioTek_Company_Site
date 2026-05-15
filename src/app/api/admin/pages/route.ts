import { NextResponse } from 'next/server';

import { listEditablePages } from '@/lib/content/store';
import { requireAdminSession } from '@/lib/server/auth';

export const runtime = 'nodejs';

export async function GET() {
  await requireAdminSession();
  return NextResponse.json({ pages: await listEditablePages() });
}
