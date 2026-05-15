import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { AdminShell } from '../../components/AdminShell';
import { PageEditor } from './PageEditor';
import { getEditablePage } from '@/lib/content/store';
import { pageSlugSchema } from '@/lib/content/schemas';
import { getAdminSession } from '@/lib/server/auth';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function AdminPageEditorPage({ params }: Props) {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  const { slug } = await params;
  const page = await getEditablePage(pageSlugSchema.parse(slug));

  return (
    <AdminShell>
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        <Link href="/admin/pages" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#07988D]">
          <ArrowLeft className="h-4 w-4" />
          Back to pages
        </Link>
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#07988D]">{page.status}</p>
          <h1 className="mt-2 text-4xl font-semibold">{page.title}</h1>
          <p className="mt-3 text-gray-600">
            Draft version {page.draftVersion || '-'} / published version {page.publishedVersion ?? '-'}
          </p>
        </div>
        <PageEditor page={page} />
      </main>
    </AdminShell>
  );
}
