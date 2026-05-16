'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FileText, Inbox, LogOut, ShieldCheck } from 'lucide-react';

import { adminMutationHeaders } from '@/lib/admin/csrf';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const navItems = [
    { href: '/admin/pages', label: 'Pages', icon: FileText },
    { href: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
  ];

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST', headers: adminMutationHeaders() });
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-[#18D6BD]/18 bg-[#071625] text-[#F0FFFD]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <Link href="/admin/pages" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#18D6BD]/12">
              <ShieldCheck className="h-5 w-5 text-[#18D6BD]" />
            </span>
            <span className="font-semibold">VolioTek Admin</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <nav className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                      isActive
                        ? 'bg-[#18D6BD] text-[#071625]'
                        : 'border border-[#18D6BD]/24 text-[#F0FFFD]/80 hover:text-[#18D6BD]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-[#18D6BD]/30 px-4 py-2 text-sm text-[#F0FFFD]/80 transition hover:text-[#18D6BD]"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
