import Link from 'next/link';
import { ArrowRight, FileText, Home, LifeBuoy, ShieldCheck } from 'lucide-react';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SecurityMesh } from './components/SecurityMesh';

const recoveryLinks = [
  {
    href: '/',
    label: 'Home',
    description: 'Return to the VolioTek overview.',
    icon: Home,
  },
  {
    href: '/documentation',
    label: 'Documentation',
    description: 'Review product evaluation and implementation guidance.',
    icon: FileText,
  },
  {
    href: '/compliance',
    label: 'Compliance',
    description: 'Find security review and BAA readiness information.',
    icon: ShieldCheck,
  },
  {
    href: '/contact',
    label: 'Contact',
    description: 'Ask us for the right product or security resource.',
    icon: LifeBuoy,
  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="section-ambient section-ambient--hero relative overflow-hidden bg-[#071625] pt-32 pb-20 lg:pt-40 lg:pb-28">
          <SecurityMesh density="low" glowColor="#18D6BD" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#071625]/42 to-[#071625]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#18D6BD]/20 bg-[#0B2233]/60 px-4 py-2">
                <span className="font-mono text-sm text-[#18D6BD]">404</span>
                <span className="text-sm text-[#18D6BD]">Page not found</span>
              </div>

              <h1 className="mt-8 text-5xl font-semibold leading-tight text-[#F0FFFD] lg:text-6xl xl:text-7xl">
                This VolioTek page is not available.
              </h1>

              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-[#F0FFFD]/70 lg:text-2xl">
                The link may have changed, or the page may no longer exist. Use the paths below to continue reviewing VolioTek.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/"
                  className="premium-button inline-flex items-center justify-center rounded-lg bg-[#18D6BD] px-8 py-4 text-[#071625] shadow-xl shadow-[#18D6BD]/30 transition-all duration-200 hover:bg-[#35EAD0]"
                >
                  Go home
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-[#18D6BD]/50 px-8 py-4 text-[#F0FFFD] transition-all duration-200 hover:border-[#18D6BD] hover:bg-[#18D6BD]/10"
                >
                  Contact VolioTek
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-ambient section-ambient--light relative overflow-hidden bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {recoveryLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm shadow-[#071625]/5 transition-all duration-200 hover:border-[#18D6BD]/50"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#18D6BD]/10">
                    <item.icon className="h-5 w-5 text-[#07988D]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#071625]">{item.label}</h2>
                  <p className="mt-3 leading-relaxed text-gray-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
