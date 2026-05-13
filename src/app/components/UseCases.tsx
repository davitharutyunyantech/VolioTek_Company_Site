import { Building2, Users, ClipboardCheck } from 'lucide-react';
import { MotionReveal } from './MotionReveal';

export function UseCases() {
  const useCases = [
    {
      icon: Building2,
      title: 'Healthcare Providers',
      description: 'A secure operations platform for hospitals, clinics, and healthcare facilities managing complex patient workflows and regulatory compliance.',
      highlights: ['Patient care coordination', 'Clinical workflow automation', 'Regulatory reporting'],
    },
    {
      icon: Users,
      title: 'Healthcare Technology Companies',
      description: 'A private, compliant product layer for healthtech teams that need secure workflow coordination and healthcare data integration.',
      highlights: ['HIPAA-compliant platforms', 'Healthcare data integration', 'Scalable architecture'],
    },
    {
      icon: ClipboardCheck,
      title: 'Compliance & Operations Teams',
      description: 'Specialized tools for compliance officers, operations managers, and administrative teams handling sensitive healthcare operations.',
      highlights: ['Audit management', 'Document control systems', 'Compliance tracking'],
    },
  ];

  return (
    <section className="section-ambient section-ambient--light relative overflow-hidden py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionReveal as="h2" variant="heading" className="text-4xl lg:text-5xl font-semibold text-[#071625] mb-6">
            Who we serve
          </MotionReveal>
          <MotionReveal as="p" delay={90} variant="heading" className="text-xl text-gray-600 leading-relaxed">
            VolioTek serves healthcare organizations that need secure, reliable product infrastructure for regulated operations.
          </MotionReveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <MotionReveal
              key={index}
              delay={index * 100}
              variant="card"
              className="motion-card group bg-white border border-gray-200 rounded-lg p-8 hover:border-[#18D6BD]/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#EDFAFA] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#18D6BD]/10 transition-colors">
                <useCase.icon className="w-7 h-7 text-[#07988D]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#071625] mb-4">
                {useCase.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {useCase.description}
              </p>
              <ul className="space-y-2">
                {useCase.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-[#18D6BD] rounded-full mr-3" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
