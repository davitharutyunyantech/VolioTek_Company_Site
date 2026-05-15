import { MessageSquare, FileSearch, Code, Rocket } from 'lucide-react';
import { MotionReveal } from './MotionReveal';
import type { HomeContent } from '@/lib/content/schemas';

const icons = {
  MessageSquare,
  FileSearch,
  Code,
  Rocket,
};

export function Process({ content }: { content: HomeContent['process'] }) {
  return (
    <section className="section-ambient section-ambient--soft relative overflow-hidden py-24 lg:py-32 bg-[#EDFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="process-heading text-center max-w-3xl mx-auto mb-16">
          <MotionReveal as="h2" threshold={0.08} variant="heading" className="text-4xl lg:text-5xl font-semibold text-[#071625] mb-6">
            {content.title}
          </MotionReveal>
          <MotionReveal as="p" delay={90} threshold={0.08} variant="heading" className="text-xl text-gray-600 leading-relaxed">
            {content.description}
          </MotionReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.steps.map((step, index) => {
            const Icon = icons[step.icon as keyof typeof icons] ?? MessageSquare;

            return (
            <MotionReveal key={index} delay={160 + index * 140} threshold={0.08} variant="card" className="process-step relative">
              <div className="motion-card bg-white p-8 rounded-lg border border-gray-200 hover:border-[#18D6BD]/50 transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-[#18D6BD]/10 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-[#07988D]" />
                </div>
                <div className="text-5xl font-bold text-[#18D6BD]/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-[#071625] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
