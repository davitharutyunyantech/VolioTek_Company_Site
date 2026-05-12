import { ArrowRight } from 'lucide-react';
import { MotionReveal } from './MotionReveal';
import { SecurityMesh } from './SecurityMesh';

export function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#071625] overflow-hidden">
      <SecurityMesh density="low" glowColor="#18D6BD" />

      <MotionReveal className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl lg:text-5xl font-semibold text-[#F0FFFD] mb-6">
          Ready to see VolioTek in action?
        </h2>
        <p className="text-xl text-[#F0FFFD]/70 leading-relaxed mb-10 max-w-2xl mx-auto">
          See how the platform supports regulated workflows, secure access, compliance visibility, and operational coordination for healthcare teams.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#demo"
            className="premium-button inline-flex items-center justify-center px-8 py-4 bg-[#18D6BD] text-[#071625] rounded-lg hover:bg-[#35EAD0] transition-all duration-200 shadow-xl shadow-[#18D6BD]/30 group"
          >
            Request Demo
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#18D6BD]/50 text-[#F0FFFD] rounded-lg hover:bg-[#18D6BD]/10 hover:border-[#18D6BD] transition-all duration-200"
          >
            Contact Us
          </a>
        </div>
      </MotionReveal>
    </section>
  );
}
