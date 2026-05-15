import { Database, Activity, FileCheck, Layers, Lock, Workflow } from 'lucide-react';
import { MotionReveal } from './MotionReveal';
import type { HomeContent } from '@/lib/content/schemas';

const icons = {
  Database,
  Activity,
  FileCheck,
  Layers,
  Lock,
  Workflow,
};

export function Capabilities({ content }: { content: HomeContent['capabilities'] }) {
  return (
    <section id="capabilities" className="section-ambient section-ambient--light relative overflow-hidden py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionReveal as="h2" variant="heading" className="text-4xl lg:text-5xl font-semibold text-[#071625] mb-6">
            {content.title}
          </MotionReveal>
          <MotionReveal as="p" delay={90} variant="heading" className="text-xl text-gray-600 leading-relaxed">
            {content.description}
          </MotionReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((capability, index) => {
            const Icon = icons[capability.icon as keyof typeof icons] ?? Database;

            return (
            <MotionReveal
              key={capability.title}
              delay={index * 85}
              variant="card"
              className="motion-card group p-8 bg-white border border-gray-200 rounded-lg hover:border-[#18D6BD]/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#EDFAFA] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#18D6BD]/10 transition-colors">
                <Icon className="w-6 h-6 text-[#07988D]" />
              </div>
              <h3 className="text-xl font-semibold text-[#071625] mb-3">
                {capability.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {capability.description}
              </p>
            </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
