import { ArrowRight, Shield } from 'lucide-react';
import { CyberSecurityObjects } from './CyberSecurityObjects';
import { MotionReveal } from './MotionReveal';
import { SecurityMesh } from './SecurityMesh';
import type { HomeContent } from '@/lib/content/schemas';

export function Hero({ content }: { content: HomeContent['hero'] }) {
  return (
    <section className="section-ambient section-ambient--hero relative min-h-screen bg-[#071625] overflow-hidden">
      <SecurityMesh density="low" glowColor="#18D6BD" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#071625]/50 to-[#071625]" />
      <CyberSecurityObjects />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-4xl">
          <MotionReveal mode="load" className="inline-flex items-center space-x-2 px-4 py-2 bg-[#0B2233]/60 border border-[#18D6BD]/20 rounded-full mb-8">
            <Shield className="w-4 h-4 text-[#18D6BD]" />
            <span className="text-[#18D6BD] text-sm">{content.eyebrow}</span>
          </MotionReveal>

          <MotionReveal
            as="h1"
            mode="load"
            delay={90}
            className="text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#F0FFFD] leading-tight mb-6"
          >
            {content.title} <span className="text-[#18D6BD]">{content.highlightedTitle}</span>
          </MotionReveal>

          <MotionReveal mode="load" as="p" delay={180} className="text-xl lg:text-2xl text-[#F0FFFD]/70 leading-relaxed mb-10 max-w-2xl">
            {content.description}
          </MotionReveal>

          <MotionReveal mode="load" delay={270} className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              href={content.primaryAction.href}
              className="premium-button inline-flex items-center justify-center px-8 py-4 bg-[#18D6BD] text-[#071625] rounded-lg hover:bg-[#35EAD0] transition-all duration-200 shadow-xl shadow-[#18D6BD]/30 group"
            >
              {content.primaryAction.label}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={content.secondaryAction.href}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#18D6BD]/50 text-[#F0FFFD] rounded-lg hover:bg-[#18D6BD]/10 hover:border-[#18D6BD] transition-all duration-200"
            >
              {content.secondaryAction.label}
            </a>
          </MotionReveal>

          <MotionReveal mode="load" delay={360} className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-[#18D6BD]/20">
            {content.metrics.map((metric) => (
              <div key={metric.label} className="motion-metric">
                <div className="text-3xl font-semibold text-[#18D6BD] mb-1">{metric.value}</div>
                <div className="text-sm text-[#F0FFFD]/60">{metric.label}</div>
              </div>
            ))}
          </MotionReveal>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
