import type { Metadata } from 'next';
import Script from 'next/script';

import { DeploymentMigrationProbe } from './components/DeploymentMigrationProbe';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@/styles/index.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://voliotek.com'),
  title: 'VolioTek',
  description: 'A secure operations platform for regulated healthcare teams.',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        url: '/brand/app-icon-dark-header.png',
        sizes: '160x160',
        type: 'image/png',
      },
      {
        url: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: 'VolioTek',
    description: 'A secure operations platform for regulated healthcare teams.',
    url: '/',
    siteName: 'VolioTek',
    images: [
      {
        url: '/brand/banner-light.png',
        width: 1672,
        height: 941,
        alt: 'VolioTek',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VolioTek',
    description: 'A secure operations platform for regulated healthcare teams.',
    images: ['/brand/banner-light.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="motion-reveal-recovery"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var frameId = 0;
                var timeoutId = 0;

                function syncHeaderState() {
                  document.documentElement.toggleAttribute('data-page-scrolled', window.scrollY > 20);
                }

                function setMobileMenuOpen(isOpen) {
                  var button = document.querySelector('[data-mobile-menu-button]');
                  var menu = document.getElementById('mobile-menu');

                  document.documentElement.toggleAttribute('data-mobile-menu-open', isOpen);

                  if (button) {
                    button.setAttribute('aria-expanded', String(isOpen));
                  }

                  if (menu) {
                    menu.setAttribute('aria-hidden', String(!isOpen));
                    menu.setAttribute('data-mobile-menu-open', String(isOpen));
                  }

                  window.dispatchEvent(new CustomEvent('mobile-menu-state-change', { detail: { isOpen: isOpen } }));
                }

                function toggleMobileMenu() {
                  setMobileMenuOpen(!document.documentElement.hasAttribute('data-mobile-menu-open'));
                }

                function revealElement(element) {
                  element.classList.remove('motion-reveal--pending');
                  element.classList.add('motion-reveal--visible');
                }

                function isElementInView(element) {
                  var rect = element.getBoundingClientRect();
                  var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
                  var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

                  return (
                    rect.bottom >= 0 &&
                    rect.right >= 0 &&
                    rect.top <= viewportHeight * 0.9 &&
                    rect.left <= viewportWidth
                  );
                }

                function syncMotionReveal() {
                  var elements = document.querySelectorAll('.motion-reveal--pending:not(.motion-reveal--load)');

                  for (var index = 0; index < elements.length; index += 1) {
                    if (isElementInView(elements[index])) {
                      revealElement(elements[index]);
                    }
                  }
                }

                function scheduleSyncMotionReveal() {
                  if (frameId) {
                    window.cancelAnimationFrame(frameId);
                  }

                  frameId = window.requestAnimationFrame(function () {
                    frameId = 0;
                    syncMotionReveal();
                  });
                }

                function syncAfterRestore() {
                  syncHeaderState();
                  setMobileMenuOpen(false);
                  scheduleSyncMotionReveal();

                  if (timeoutId) {
                    window.clearTimeout(timeoutId);
                  }

                  timeoutId = window.setTimeout(function () {
                    timeoutId = 0;
                    syncHeaderState();
                    syncMotionReveal();
                  }, 160);
                }

                function pauseMotionAfterRestore(event) {
                  if (!event || !event.persisted) {
                    return;
                  }

                  document.documentElement.setAttribute('data-page-restored', 'true');

                  window.setTimeout(function () {
                    document.documentElement.removeAttribute('data-page-restored');
                  }, 1200);
                }

                function handleVisibilityChange() {
                  if (document.visibilityState === 'visible') {
                    syncAfterRestore();
                  }
                }

                document.addEventListener('click', function (event) {
                  var button = event.target && event.target.closest ? event.target.closest('[data-mobile-menu-button]') : null;
                  var menuLink = event.target && event.target.closest ? event.target.closest('#mobile-menu a') : null;

                  if (button) {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleMobileMenu();
                    return;
                  }

                  if (menuLink) {
                    setMobileMenuOpen(false);
                  }
                }, true);
                window.addEventListener('pageshow', syncAfterRestore);
                window.addEventListener('pageshow', pauseMotionAfterRestore);
                window.addEventListener('focus', syncAfterRestore);
                window.addEventListener('scroll', function () {
                  syncHeaderState();
                  scheduleSyncMotionReveal();
                }, { passive: true });
                window.addEventListener('resize', function () {
                  syncHeaderState();
                  scheduleSyncMotionReveal();
                });
                document.addEventListener('visibilitychange', handleVisibilityChange);

                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', syncAfterRestore, { once: true });
                } else {
                  syncAfterRestore();
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <DeploymentMigrationProbe />
      </body>
    </html>
  );
}
