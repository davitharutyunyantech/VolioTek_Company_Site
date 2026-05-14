'use client';

import Image from 'next/image';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const isMobileMenuOpenRef = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const setSyncedMobileMenuOpen = useCallback((nextIsOpen: boolean) => {
    isMobileMenuOpenRef.current = nextIsOpen;
    setIsMobileMenuOpen(nextIsOpen);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setSyncedMobileMenuOpen(false);
  }, [setSyncedMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setSyncedMobileMenuOpen(!isMobileMenuOpenRef.current);
  }, [setSyncedMobileMenuOpen]);

  useLayoutEffect(() => {
    let frameId: number | null = null;
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];

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

      timeoutIds.push(
        setTimeout(handleScroll, 0),
        setTimeout(handleScroll, 80),
        setTimeout(handleScroll, 180),
        setTimeout(handleScroll, 360),
      );
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        syncScrollState();
      }
    };

    syncScrollState();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('load', syncScrollState);
    window.addEventListener('pageshow', syncScrollState);
    window.addEventListener('focus', syncScrollState);
    window.addEventListener('resize', syncScrollState);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', syncScrollState);
      window.removeEventListener('pageshow', syncScrollState);
      window.removeEventListener('focus', syncScrollState);
      window.removeEventListener('resize', syncScrollState);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  useLayoutEffect(() => {
    const resetMobileMenuAfterRestore = () => {
      setSyncedMobileMenuOpen(false);
    };

    window.addEventListener('pageshow', resetMobileMenuAfterRestore);
    window.addEventListener('popstate', resetMobileMenuAfterRestore);

    return () => {
      window.removeEventListener('pageshow', resetMobileMenuAfterRestore);
      window.removeEventListener('popstate', resetMobileMenuAfterRestore);
    };
  }, [setSyncedMobileMenuOpen]);

  useLayoutEffect(() => {
    document.documentElement.toggleAttribute('data-mobile-menu-open', isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  useLayoutEffect(() => {
    const handleGlobalMobileMenuStateChange = (event: Event) => {
      const nextIsOpen = Boolean((event as CustomEvent<{ isOpen?: boolean }>).detail?.isOpen);
      isMobileMenuOpenRef.current = nextIsOpen;
      setIsMobileMenuOpen(nextIsOpen);
    };

    window.addEventListener('mobile-menu-state-change', handleGlobalMobileMenuStateChange);

    return () => {
      window.removeEventListener('mobile-menu-state-change', handleGlobalMobileMenuStateChange);
    };
  }, []);

  useLayoutEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useLayoutEffect(() => {
    const button = mobileMenuButtonRef.current;

    if (!button) {
      return undefined;
    }

    const handleButtonClick = (event: MouseEvent) => {
      event.preventDefault();
      toggleMobileMenu();
    };

    button.addEventListener('click', handleButtonClick);

    return () => {
      button.removeEventListener('click', handleButtonClick);
    };
  }, [toggleMobileMenu]);

  const navItems = [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Security', href: '#security' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header
      data-site-header
      className={`site-header fixed top-0 left-0 right-0 z-50 overflow-visible transition-all duration-300 ${
        isScrolled ? 'bg-[#071625]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-3" aria-label="VolioTek home">
              <Image
                src="/brand/logo-header-transparent.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 shrink-0"
                priority
              />
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
            ref={mobileMenuButtonRef}
            type="button"
            data-mobile-menu-button
            className="mobile-menu-button relative z-[70] inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#F0FFFD] transition-[background-color,transform] duration-300 ease-out hover:bg-[#18D6BD]/10 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu
              size={24}
              aria-hidden="true"
              data-mobile-menu-icon="open"
              className="absolute transition-[opacity,transform] duration-300 ease-out"
            />
            <X
              size={24}
              aria-hidden="true"
              data-mobile-menu-icon="close"
              className="absolute transition-[opacity,transform] duration-300 ease-out"
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        data-mobile-menu-open={isMobileMenuOpen}
        aria-hidden={!isMobileMenuOpen}
        className="mobile-menu-panel absolute left-0 right-0 top-full z-[60] overflow-hidden border-t border-[#18D6BD]/20 bg-[#0B1F2C] shadow-2xl shadow-[#071625]/40 transition-[max-height,opacity,transform] duration-300 ease-out md:hidden"
      >
        <nav className="px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block text-[#F0FFFD]/80 hover:text-[#18D6BD] transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 space-y-3">
            <a
              href="#contact"
              className="block text-center px-6 py-2.5 border border-[#18D6BD]/50 text-[#18D6BD] rounded-lg"
              onClick={closeMobileMenu}
            >
              Contact Us
            </a>
            <a
              href="#demo"
              className="premium-button block text-center px-6 py-2.5 bg-[#18D6BD] text-[#071625] rounded-lg"
              onClick={closeMobileMenu}
            >
              Request Demo
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
