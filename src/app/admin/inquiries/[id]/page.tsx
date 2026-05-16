import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, Mail } from 'lucide-react';

import { InquiryStatusControl } from '../InquiryStatusControl';
import { AdminShell } from '../../components/AdminShell';
import { getAdminSession } from '@/lib/server/auth';
import { getInquiry } from '@/lib/server/inquiries';

type Params = {
  params: Promise<{ id: string }>;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#07988D]">{label}</dt>
      <dd className="mt-2 whitespace-pre-wrap break-words text-[#071625]">{value || '-'}</dd>
    </div>
  );
}

export default async function AdminInquiryDetailPage({ params }: Params) {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const inquiry = await getInquiry(id);

  if (!inquiry) {
    notFound();
  }

  const mailSubject = encodeURIComponent(
    inquiry.type === 'DEMO_REQUEST'
      ? 'Re: VolioTek demo request'
      : `Re: ${inquiry.subject || 'VolioTek inquiry'}`,
  );

  return (
    <AdminShell>
      <main className="mx-auto max-w-5xl px-6 py-10 lg:px-12">
        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#07988D] transition hover:text-[#071625]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to inquiries
        </Link>

        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#07988D]">
                {inquiry.type.replaceAll('_', ' ')}
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-[#071625]">{inquiry.name}</h1>
              <p className="mt-2 break-words text-gray-600">{inquiry.email}</p>
              <p className="mt-2 text-sm text-gray-500">Submitted {formatDate(inquiry.createdAt)}</p>
            </div>

            <a
              href={`mailto:${inquiry.email}?subject=${mailSubject}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#071625] px-5 py-3 font-semibold text-[#F0FFFD] transition hover:bg-[#0B2233]"
            >
              <Mail className="h-5 w-5" />
              Reply by email
            </a>
          </div>

          <div className="mt-8">
            <InquiryStatusControl inquiryId={inquiry.id} currentStatus={inquiry.status} />
          </div>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <DetailRow label="Company" value={inquiry.company} />
          <DetailRow label="Role" value={inquiry.role} />
          <DetailRow label="Subject" value={inquiry.subject} />
          <DetailRow label="Preferred contact time" value={inquiry.preferredContactTime} />
          <DetailRow label="Interest" value={inquiry.interest} />
          <DetailRow label="Source" value={inquiry.source} />
          <div className="sm:col-span-2">
            <DetailRow label="Message" value={inquiry.message} />
          </div>
        </dl>
      </main>
    </AdminShell>
  );
}
