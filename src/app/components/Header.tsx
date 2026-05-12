'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let frameId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const syncScrollState = () => {
      handleScroll();

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        handleScroll();

        frameId = requestAnimationFrame(() => {
          handleScroll();
          frameId = null;
        });
      });

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 150);
    };

    syncScrollState();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('load', syncScrollState);
    window.addEventListener('pageshow', syncScrollState);
    window.addEventListener('resize', syncScrollState);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', syncScrollState);
      window.removeEventListener('pageshow', syncScrollState);
      window.removeEventListener('resize', syncScrollState);

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const navItems = [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Security', href: '#security' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#071625]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#18D6BD] rounded flex items-center justify-center">
                <span className="text-[#071625] font-bold text-lg">V</span>
              </div>
              <span className="text-[#F0FFFD] font-semibold text-xl tracking-tight">
                VolioTek
              </span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[#F0FFFD]/80 hover:text-[#18D6BD] transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#contact"
              className="px-6 py-2.5 border border-[#18D6BD]/50 text-[#18D6BD] rounded-lg hover:bg-[#18D6BD]/10 transition-all duration-200"
            >
              Contact Us
            </a>
            <a
              href="#demo"
              className="premium-button inline-flex items-center justify-center px-6 py-2.5 bg-[#18D6BD] text-[#071625] rounded-lg hover:bg-[#35EAD0] transition-all duration-200 shadow-lg shadow-[#18D6BD]/20"
            >
              Request Demo
            </a>
          </div>

          <button
            className="md:hidden text-[#F0FFFD]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-[#0B1F2C] border-t border-[#18D6BD]/20">
          <nav className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-[#F0FFFD]/80 hover:text-[#18D6BD] transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <a
                href="#contact"
                className="block text-center px-6 py-2.5 border border-[#18D6BD]/50 text-[#18D6BD] rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </a>
              <a
                href="#demo"
                className="premium-button block text-center px-6 py-2.5 bg-[#18D6BD] text-[#071625] rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Request Demo
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
