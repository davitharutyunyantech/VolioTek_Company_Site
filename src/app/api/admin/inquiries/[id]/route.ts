import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getInquiry, inquiryStatusSchema, updateInquiryStatus } from '@/lib/server/inquiries';
import { requireAdminCsrf, requireAdminSession } from '@/lib/server/auth';

export const runtime = 'nodejs';

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  await requireAdminSession();
  const { id } = await params;
  return NextResponse.json({ inquiry: await getInquiry(id) });
}

export async function PATCH(request: Request, { params }: Params) {
  await requireAdminCsrf(request);
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = z.object({ status: inquiryStatusSchema }).safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid inquiry status.' }, { status: 400 });
  }

  try {
    return NextResponse.json({ inquiry: await updateInquiryStatus(id, parsed.data.status) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to update inquiry.' },
      { status: 400 },
    );
  }
}
