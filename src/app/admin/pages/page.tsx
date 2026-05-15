import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Edit3 } from 'lucide-react';

import { AdminShell } from '../components/AdminShell';
import { listEditablePages } from '@/lib/content/store';
import { getAdminSession } from '@/lib/server/auth';

export default async function AdminPagesPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  const pages = await listEditablePages();

  return (
    <AdminShell>
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#07988D]">Content management</p>
          <h1 className="mt-2 text-4xl font-semibold">Website pages</h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Edit draft content, publish approved revisions, or unpublish pages from the public site.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead className="bg-[#EDFAFA] text-sm text-[#071625]">
              <tr>
                <th className="px-5 py-4 font-semibold">Page</th>
                <th className="px-5 py-4 font-semibold">Slug</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Versions</th>
                <th className="px-5 py-4 font-semibold">Updated</th>
                <th className="px-5 py-4 font-semibold" aria-label="Actions" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pages.map((page) => (
                <tr key={page.slug}>
                  <td className="px-5 py-4 font-medium">{page.title}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{page.slug}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full border border-[#18D6BD]/30 bg-[#EDFAFA] px-3 py-1 text-xs font-semibold text-[#071625]">
                      {page.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    Draft {page.draftVersion || '-'} / Published {page.publishedVersion ?? '-'}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(page.updatedAt))}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/pages/${page.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#071625] px-4 py-2 text-sm font-semibold text-[#F0FFFD] transition hover:bg-[#0B2233]"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </AdminShell>
  );
}
