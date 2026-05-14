import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import Script from 'next/script';

import '@/styles/index.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VolioTek',
  description: 'A secure operations platform for regulated healthcare teams.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`} suppressHydrationWarning>
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

                window.addEventListener('pageshow', syncAfterRestore);
                window.addEventListener('focus', syncAfterRestore);
                window.addEventListener('scroll', function () {
                  syncHeaderState();
                  scheduleSyncMotionReveal();
                }, { passive: true });
                window.addEventListener('resize', function () {
                  syncHeaderState();
                  scheduleSyncMotionReveal();
                });
                document.addEventListener('visibilitychange', function () {
                  if (document.visibilityState === 'visible') {
                    syncAfterRestore();
                  }
                });

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
      <body>{children}</body>
    </html>
  );
}
