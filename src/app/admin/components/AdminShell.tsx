'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, ShieldCheck } from 'lucide-react';

import { adminMutationHeaders } from '@/lib/admin/csrf';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST', headers: adminMutationHeaders() });
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-[#18D6BD]/18 bg-[#071625] text-[#F0FFFD]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <Link href="/admin/pages" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#18D6BD]/12">
              <ShieldCheck className="h-5 w-5 text-[#18D6BD]" />
            </span>
            <span className="font-semibold">VolioTek Admin</span>
          </Link>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg border border-[#18D6BD]/30 px-4 py-2 text-sm text-[#F0FFFD]/80 transition hover:text-[#18D6BD]"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </header>
      {children}
    </div>
  );
}
