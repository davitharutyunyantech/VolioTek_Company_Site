/* eslint-disable @next/next/no-img-element -- next/image emits inline styles that violate the strict CSP for this 32px local logo. */
import Link from 'next/link';
import { Shield, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Capabilities', href: '/#capabilities' },
      { label: 'Security', href: '/#security' },
    ],
    resources: [
      { label: 'Documentation', href: '/documentation' },
      { label: 'Compliance', href: '/compliance' },
      { label: 'Support', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'BAA', href: '/business-associate-agreement' },
    ],
  };

  return (
    <footer id="contact" className="bg-[#0B1F2C] border-t border-[#18D6BD]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/brand/logo-header-transparent.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 shrink-0"
              />
              <span className="text-[#F0FFFD] font-semibold text-xl tracking-tight">
                VolioTek
              </span>
            </div>
            <p className="text-[#F0FFFD]/60 mb-6 max-w-md">
              A secure operations product for healthcare teams and regulated workflows, created and operated by VolioTek.
            </p>
            <div className="flex items-center space-x-2 text-[#18D6BD] text-sm">
              <Shield className="w-4 h-4" />
              <span>HIPAA Compliant</span>
            </div>
          </div>

          <div>
            <h4 className="text-[#F0FFFD] font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#F0FFFD]/60 hover:text-[#18D6BD] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#F0FFFD] font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#F0FFFD]/60 hover:text-[#18D6BD] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#F0FFFD] font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#F0FFFD]/60 hover:text-[#18D6BD] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#18D6BD]/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-[#F0FFFD]/60 text-sm">
              © {currentYear} VolioTek. All rights reserved.
            </div>
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-[#F0FFFD]/60">
              <a href="mailto:contact@voliotek.com" className="flex items-center hover:text-[#18D6BD] transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                contact@voliotek.com
              </a>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                San Francisco, CA
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
