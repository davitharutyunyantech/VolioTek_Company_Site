import { MessageSquare, FileSearch, Code, Rocket } from 'lucide-react';
import { MotionReveal } from './MotionReveal';

export function Process() {
  const steps = [
    {
      icon: MessageSquare,
      number: '01',
      title: 'Product Fit Review',
      description: 'We review your operational workflows, regulatory needs, and team structure to confirm where VolioTek fits best.',
    },
    {
      icon: FileSearch,
      number: '02',
      title: 'Security & Compliance Alignment',
      description: 'We map platform controls, access policies, audit requirements, and data boundaries to your operating environment.',
    },
    {
      icon: Code,
      number: '03',
      title: 'Configuration & Validation',
      description: 'We configure the product around your teams, roles, workflows, and reporting needs, then validate the setup before rollout.',
    },
    {
      icon: Rocket,
      number: '04',
      title: 'Launch & Ongoing Support',
      description: 'We help your team launch on VolioTek with monitoring, documentation, product updates, and ongoing technical support.',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#EDFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <MotionReveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#071625] mb-6">
            How teams adopt VolioTek
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            A practical onboarding path for healthcare organizations adopting a secure, compliant operations product.
          </p>
        </MotionReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <MotionReveal key={index} delay={index * 100} className="process-step relative">
              <div className="motion-card bg-white p-8 rounded-lg border border-gray-200 hover:border-[#18D6BD]/50 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-[#18D6BD]/10 rounded-lg flex items-center justify-center mb-6">
                  <step.icon className="w-6 h-6 text-[#07988D]" />
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
          ))}
        </div>
      </div>
    </section>
  );
}
