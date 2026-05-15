import type { ReactNode } from 'react';

export const metadata = {
  title: 'VolioTek Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#F6FBFB] text-[#071625]">{children}</div>;
}
