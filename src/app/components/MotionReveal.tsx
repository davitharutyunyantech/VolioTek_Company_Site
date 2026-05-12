'use client';

import { ReactNode, useLayoutEffect, useRef } from 'react';

interface MotionRevealProps {
  children: ReactNode;
  as?: 'div' | 'section' | 'h1' | 'h2' | 'p';
  className?: string;
  delay?: number;
  threshold?: number;
  mode?: 'scroll' | 'load';
}

export function MotionReveal({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  threshold = 0.16,
  mode = 'scroll',
}: MotionRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (mode === 'load') return;

    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!('IntersectionObserver' in window)) return;

    element.classList.add('motion-reveal--pending');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        element.classList.remove('motion-reveal--pending');
        element.classList.add('motion-reveal--visible');
        observer.unobserve(entry.target);
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [mode, threshold]);

  return (
    <Component
      ref={ref as never}
      className={`motion-reveal ${mode === 'load' ? 'motion-reveal--load' : ''} ${className}`}
      data-motion-delay={delay}
    >
      {children}
    </Component>
  );
}
