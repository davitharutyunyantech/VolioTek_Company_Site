import { Shield, Lock, Key, Eye, FileCheck, Server } from 'lucide-react';
import { MotionReveal } from './MotionReveal';
import { SecurityMesh } from './SecurityMesh';
import type { HomeContent } from '@/lib/content/schemas';

const icons = {
  Shield,
  Lock,
  Key,
  Eye,
  FileCheck,
  Server,
};

export function Security({ content }: { content: HomeContent['security'] }) {
  return (
    <section id="security" className="section-ambient section-ambient--dark relative py-24 lg:py-32 bg-[#0B1F2C] overflow-hidden">
      <SecurityMesh density="low" glowColor="#18D6BD" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionReveal variant="heading" className="inline-flex items-center space-x-2 px-4 py-2 bg-[#0B2233]/60 border border-[#18D6BD]/20 rounded-full mb-6">
            <Shield className="w-4 h-4 text-[#18D6BD]" />
            <span className="text-[#18D6BD] text-sm">{content.eyebrow}</span>
          </MotionReveal>
          <MotionReveal as="h2" delay={90} variant="heading" className="text-4xl lg:text-5xl font-semibold text-[#F0FFFD] mb-6">
            {content.title} <span className="text-[#18D6BD]">{content.highlightedTitle}</span>
          </MotionReveal>
          <MotionReveal as="p" delay={180} variant="heading" className="text-xl text-[#F0FFFD]/70 leading-relaxed">
            {content.description}
          </MotionReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((principle, index) => {
            const Icon = icons[principle.icon as keyof typeof icons] ?? Shield;

            return (
            <MotionReveal
              key={principle.title}
              delay={index * 85}
              variant="card"
              className="motion-card motion-card--dark group p-8 bg-[#0B2233]/40 backdrop-blur-sm border border-[#18D6BD]/20 rounded-lg hover:bg-[#0B2233]/60 hover:border-[#18D6BD]/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#18D6BD]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#18D6BD]/20 transition-colors">
                <Icon className="w-6 h-6 text-[#18D6BD]" />
              </div>
              <h3 className="text-xl font-semibold text-[#F0FFFD] mb-3">
                {principle.title}
              </h3>
              <p className="text-[#F0FFFD]/70 leading-relaxed">
                {principle.description}
              </p>
            </MotionReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
