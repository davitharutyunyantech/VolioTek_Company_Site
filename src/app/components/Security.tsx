import { Shield, Lock, Key, Eye, FileCheck, Server } from 'lucide-react';
import { MotionReveal } from './MotionReveal';
import { SecurityMesh } from './SecurityMesh';

export function Security() {
  const securityPrinciples = [
    {
      icon: Shield,
      title: 'HIPAA Compliance',
      description: 'Full HIPAA compliance with comprehensive BAAs, encrypted data at rest and in transit, and regular security audits.',
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'AES-256 encryption for all data storage and TLS 1.3 for data transmission, ensuring complete privacy.',
    },
    {
      icon: Key,
      title: 'Access Control',
      description: 'Granular role-based permissions, multi-factor authentication, and session management for every user.',
    },
    {
      icon: Eye,
      title: 'Complete Audit Trails',
      description: 'Detailed logging of all system actions, data access, and modifications for compliance and accountability.',
    },
    {
      icon: FileCheck,
      title: 'Regular Security Testing',
      description: 'Continuous vulnerability scanning, penetration testing, and security assessments by third-party experts.',
    },
    {
      icon: Server,
      title: 'Isolated Environments',
      description: 'Private tenant isolation, secure network boundaries, and dedicated infrastructure for sensitive operations.',
    },
  ];

  return (
    <section id="security" className="section-ambient section-ambient--dark relative py-24 lg:py-32 bg-[#0B1F2C] overflow-hidden">
      <SecurityMesh density="low" glowColor="#18D6BD" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionReveal variant="heading" className="inline-flex items-center space-x-2 px-4 py-2 bg-[#0B2233]/60 border border-[#18D6BD]/20 rounded-full mb-6">
            <Shield className="w-4 h-4 text-[#18D6BD]" />
            <span className="text-[#18D6BD] text-sm">Enterprise-Grade Security</span>
          </MotionReveal>
          <MotionReveal as="h2" delay={90} variant="heading" className="text-4xl lg:text-5xl font-semibold text-[#F0FFFD] mb-6">
            Security and privacy by design
          </MotionReveal>
          <MotionReveal as="p" delay={180} variant="heading" className="text-xl text-[#F0FFFD]/70 leading-relaxed">
            The VolioTek platform includes security controls, regulatory safeguards, and operational protections as part of the core product.
          </MotionReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityPrinciples.map((principle, index) => (
            <MotionReveal
              key={index}
              delay={index * 85}
              variant="card"
              className="motion-card motion-card--dark group p-8 bg-[#0B2233]/40 backdrop-blur-sm border border-[#18D6BD]/20 rounded-lg hover:bg-[#0B2233]/60 hover:border-[#18D6BD]/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#18D6BD]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#18D6BD]/20 transition-colors">
                <principle.icon className="w-6 h-6 text-[#18D6BD]" />
              </div>
              <h3 className="text-xl font-semibold text-[#F0FFFD] mb-3">
                {principle.title}
              </h3>
              <p className="text-[#F0FFFD]/70 leading-relaxed">
                {principle.description}
              </p>
            </MotionReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
