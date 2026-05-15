import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MotionReveal } from './MotionReveal';
import { SecurityMesh } from './SecurityMesh';

export function FinalCTA() {
  return (
    <section id="demo" className="section-ambient section-ambient--cta relative py-24 lg:py-32 bg-[#071625] overflow-hidden">
      <SecurityMesh density="low" glowColor="#18D6BD" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <MotionReveal as="h2" variant="heading" className="text-4xl lg:text-5xl font-semibold text-[#F0FFFD] mb-6">
          Ready to see VolioTek <span className="text-[#18D6BD]">in action?</span>
        </MotionReveal>
        <MotionReveal as="p" delay={90} variant="heading" className="text-xl text-[#F0FFFD]/70 leading-relaxed mb-10 max-w-2xl mx-auto">
          See how the platform supports regulated workflows, secure access, compliance visibility, and operational coordination for healthcare teams.
        </MotionReveal>

        <MotionReveal delay={180} variant="panel" className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#demo"
            className="premium-button inline-flex items-center justify-center px-8 py-4 bg-[#18D6BD] text-[#071625] rounded-lg hover:bg-[#35EAD0] transition-all duration-200 shadow-xl shadow-[#18D6BD]/30 group"
          >
            Request Demo
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#18D6BD]/50 text-[#F0FFFD] rounded-lg hover:bg-[#18D6BD]/10 hover:border-[#18D6BD] transition-all duration-200"
          >
            Contact Us
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}
