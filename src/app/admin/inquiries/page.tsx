import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowRight, Inbox } from 'lucide-react';

import { AdminShell } from '../components/AdminShell';
import { getAdminSession } from '@/lib/server/auth';
import { listInquiries } from '@/lib/server/inquiries';

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function badgeClassName(status: string) {
  if (status === 'NEW') {
    return 'border-[#18D6BD]/40 bg-[#EDFAFA] text-[#071625]';
  }

  if (status === 'SPAM') {
    return 'border-red-200 bg-red-50 text-red-800';
  }

  return 'border-gray-200 bg-gray-50 text-gray-700';
}

export default async function AdminInquiriesPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  const inquiries = await listInquiries();

  return (
    <AdminShell>
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#07988D]">Lead management</p>
          <h1 className="mt-2 text-4xl font-semibold">Inquiries</h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Review demo requests and general contact submissions saved from the public website.
          </p>
        </div>

        {inquiries.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
            <Inbox className="mx-auto h-10 w-10 text-[#07988D]" />
            <h2 className="mt-4 text-xl font-semibold">No inquiries yet</h2>
            <p className="mt-2 text-gray-600">New demo and contact submissions will appear here.</p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm md:block">
              <table className="w-full border-collapse text-left">
                <thead className="bg-[#EDFAFA] text-sm text-[#071625]">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Type</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Name</th>
                    <th className="px-5 py-4 font-semibold">Email</th>
                    <th className="px-5 py-4 font-semibold">Company / Subject</th>
                    <th className="px-5 py-4 font-semibold">Created</th>
                    <th className="px-5 py-4 font-semibold" aria-label="Actions" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td className="px-5 py-4 text-sm font-semibold">{inquiry.type.replaceAll('_', ' ')}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeClassName(inquiry.status)}`}>
                          {inquiry.status.replaceAll('_', ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium">{inquiry.name}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{inquiry.email}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{inquiry.company || inquiry.subject || '-'}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{formatDate(inquiry.createdAt)}</td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/admin/inquiries/${inquiry.id}`}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#071625] px-4 py-2 text-sm font-semibold text-[#F0FFFD] transition hover:bg-[#0B2233]"
                        >
                          Open
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 md:hidden">
              {inquiries.map((inquiry) => (
                <article key={inquiry.id} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[#18D6BD]/30 bg-[#EDFAFA] px-3 py-1 text-xs font-semibold text-[#071625]">
                      {inquiry.type.replaceAll('_', ' ')}
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeClassName(inquiry.status)}`}>
                      {inquiry.status.replaceAll('_', ' ')}
                    </span>
                  </div>
                  <h2 className="mt-4 text-lg font-semibold">{inquiry.name}</h2>
                  <p className="mt-1 break-words text-sm text-gray-600">{inquiry.email}</p>
                  <p className="mt-3 text-sm text-gray-600">{inquiry.company || inquiry.subject || 'No company or subject'}</p>
                  <p className="mt-3 text-xs text-gray-500">{formatDate(inquiry.createdAt)}</p>
                  <Link
                    href={`/admin/inquiries/${inquiry.id}`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#071625] px-4 py-2.5 text-sm font-semibold text-[#F0FFFD]"
                  >
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}
      </main>
    </AdminShell>
  );
}
