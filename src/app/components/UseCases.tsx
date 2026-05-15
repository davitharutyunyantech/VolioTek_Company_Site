import { Building2, Users, ClipboardCheck } from 'lucide-react';
import { MotionReveal } from './MotionReveal';
import type { HomeContent } from '@/lib/content/schemas';

const icons = {
  Building2,
  Users,
  ClipboardCheck,
};

export function UseCases({ content }: { content: HomeContent['useCases'] }) {
  return (
    <section className="section-ambient section-ambient--light relative overflow-hidden py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionReveal as="h2" variant="heading" className="text-4xl lg:text-5xl font-semibold text-[#071625] mb-6">
            {content.title}
          </MotionReveal>
          <MotionReveal as="p" delay={90} variant="heading" className="text-xl text-gray-600 leading-relaxed">
            {content.description}
          </MotionReveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {content.items.map((useCase, index) => {
            const Icon = icons[useCase.icon as keyof typeof icons] ?? Building2;

            return (
            <MotionReveal
              key={useCase.title}
              delay={index * 100}
              variant="card"
              className="motion-card group bg-white border border-gray-200 rounded-lg p-8 hover:border-[#18D6BD]/50 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#EDFAFA] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#18D6BD]/10 transition-colors">
                <Icon className="w-7 h-7 text-[#07988D]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#071625] mb-4">
                {useCase.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {useCase.description}
              </p>
              <ul className="space-y-2">
                {(useCase.highlights ?? []).map((highlight) => (
                  <li key={highlight} className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-[#18D6BD] rounded-full mr-3" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
