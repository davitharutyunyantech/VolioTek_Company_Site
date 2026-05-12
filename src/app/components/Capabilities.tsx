import { Database, Activity, FileCheck, Layers, Lock, Workflow } from 'lucide-react';
import { MotionReveal } from './MotionReveal';

export function Capabilities() {
  const capabilities = [
    {
      icon: Database,
      title: 'Healthcare Workflow Platform',
      description: 'A structured product environment for coordinating clinical operations, administrative tasks, and regulated healthcare workflows.',
    },
    {
      icon: Lock,
      title: 'Private & Secure Infrastructure',
      description: 'HIPAA-compliant architecture with end-to-end encryption, role-based access control, and complete audit trails.',
    },
    {
      icon: Activity,
      title: 'Real-Time Operations',
      description: 'Monitor, track, and manage complex healthcare operations with real-time data synchronization and status updates.',
    },
    {
      icon: FileCheck,
      title: 'Compliance Documentation',
      description: 'Automated compliance tracking, audit logging, and regulatory reporting built directly into the VolioTek product.',
    },
    {
      icon: Layers,
      title: 'Integration & Interoperability',
      description: 'Seamless integration with existing EHR systems, third-party tools, and healthcare data standards (HL7, FHIR).',
    },
    {
      icon: Workflow,
      title: 'Operational Intelligence',
      description: 'Analytics and insights that help healthcare teams make informed decisions and optimize operational efficiency.',
    },
  ];

  return (
    <section id="capabilities" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <MotionReveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#071625] mb-6">
            What VolioTek does
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            A secure, scalable product for healthcare organizations that need precision, reliability, and regulatory confidence.
          </p>
        </MotionReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <MotionReveal
              key={index}
              delay={index * 85}
              className="motion-card group p-8 bg-white border border-gray-200 rounded-lg hover:border-[#18D6BD]/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#EDFAFA] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#18D6BD]/10 transition-colors">
                <capability.icon className="w-6 h-6 text-[#07988D]" />
              </div>
              <h3 className="text-xl font-semibold text-[#071625] mb-3">
                {capability.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {capability.description}
              </p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
