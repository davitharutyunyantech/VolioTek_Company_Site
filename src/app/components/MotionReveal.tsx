'use client';

import { ReactNode, useLayoutEffect, useRef } from 'react';

interface MotionRevealProps {
  children: ReactNode;
  as?: 'div' | 'section' | 'h1' | 'h2' | 'p';
  className?: string;
  delay?: number;
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
  mode?: 'scroll' | 'load';
  variant?: 'default' | 'heading' | 'card' | 'panel';
}

export function MotionReveal({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  once = true,
  rootMargin = '0px 0px -18% 0px',
  threshold = 0.12,
  mode = 'scroll',
  variant = 'default',
}: MotionRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (mode === 'load') return;

    const element = ref.current;
    if (!element) return;

    let observer: IntersectionObserver | null = null;
    let frameId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const reveal = () => {
      element.classList.remove('motion-reveal--pending');
      element.classList.add('motion-reveal--visible');
      observer?.unobserve(element);
    };

    const isElementInView = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

      return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= viewportHeight * 0.88 &&
        rect.left <= viewportWidth
      );
    };

    const syncVisibility = () => {
      if (element.classList.contains('motion-reveal--visible')) return;

      if (isElementInView()) {
        reveal();
      }
    };

    const scheduleSyncVisibility = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        syncVisibility();
        frameId = null;
      });
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      reveal();
      return;
    }

    if (!('IntersectionObserver' in window)) {
      reveal();
      return;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        reveal();

        if (once) {
          observer?.unobserve(entry.target);
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);
    syncVisibility();

    const syncAfterPageRestore = () => {
      scheduleSyncVisibility();

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        syncVisibility();
        timeoutId = null;
      }, 120);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        syncAfterPageRestore();
      }
    };

    window.addEventListener('pageshow', syncAfterPageRestore);
    window.addEventListener('focus', syncAfterPageRestore);
    window.addEventListener('scroll', scheduleSyncVisibility, { passive: true });
    window.addEventListener('resize', scheduleSyncVisibility);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer?.disconnect();
      window.removeEventListener('pageshow', syncAfterPageRestore);
      window.removeEventListener('focus', syncAfterPageRestore);
      window.removeEventListener('scroll', scheduleSyncVisibility);
      window.removeEventListener('resize', scheduleSyncVisibility);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [mode, once, rootMargin, threshold]);

  return (
    <Component
      ref={ref as never}
      className={`motion-reveal ${mode === 'load' ? 'motion-reveal--load' : 'motion-reveal--pending'} ${className}`}
      data-motion-delay={delay}
      data-motion-variant={variant}
    >
      {children}
    </Component>
  );
}
