import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MotionReveal } from './MotionReveal';
import { SecurityMesh } from './SecurityMesh';
import type { HomeContent } from '@/lib/content/schemas';

export function FinalCTA({ content }: { content: HomeContent['finalCta'] }) {
  return (
    <section id="demo" className="section-ambient section-ambient--cta relative py-24 lg:py-32 bg-[#071625] overflow-hidden">
      <SecurityMesh density="low" glowColor="#18D6BD" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <MotionReveal as="h2" variant="heading" className="text-4xl lg:text-5xl font-semibold text-[#F0FFFD] mb-6">
          {content.title} <span className="text-[#18D6BD]">{content.highlightedTitle}</span>
        </MotionReveal>
        <MotionReveal as="p" delay={90} variant="heading" className="text-xl text-[#F0FFFD]/70 leading-relaxed mb-10 max-w-2xl mx-auto">
          {content.description}
        </MotionReveal>

        <MotionReveal delay={180} variant="panel" className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={content.primaryAction.href}
            className="premium-button inline-flex items-center justify-center px-8 py-4 bg-[#18D6BD] text-[#071625] rounded-lg hover:bg-[#35EAD0] transition-all duration-200 shadow-xl shadow-[#18D6BD]/30 group"
          >
            {content.primaryAction.label}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href={content.secondaryAction.href}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#18D6BD]/50 text-[#F0FFFD] rounded-lg hover:bg-[#18D6BD]/10 hover:border-[#18D6BD] transition-all duration-200"
          >
            {content.secondaryAction.label}
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}
