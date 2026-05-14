'use client';

import { useEffect, useRef } from 'react';

interface SecurityMeshProps {
  density?: 'low' | 'medium' | 'high';
  glowColor?: string;
}

export function SecurityMesh({ density = 'medium', glowColor = '#18D6BD' }: SecurityMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number | null = null;
    let isRunning = false;
    let isInViewport = false;
    let lastFrameTime = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let pixelRatio = 1;
    let restoreTimeoutId: ReturnType<typeof setTimeout> | null = null;
    const frameInterval = 1000 / 20;

    const resize = (force = false) => {
      const nextPixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
      const nextWidth = Math.round(canvas.offsetWidth * nextPixelRatio);
      const nextHeight = Math.round(canvas.offsetHeight * nextPixelRatio);

      if (!force && nextWidth === canvasWidth && nextHeight === canvasHeight && nextPixelRatio === pixelRatio) {
        return;
      }

      canvasWidth = nextWidth;
      canvasHeight = nextHeight;
      pixelRatio = nextPixelRatio;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const isCanvasInViewport = () => {
      const rect = canvas.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

      return (
        rect.bottom >= -160 &&
        rect.right >= 0 &&
        rect.top <= viewportHeight + 160 &&
        rect.left <= viewportWidth
      );
    };

    const syncViewportState = () => {
      isInViewport = isCanvasInViewport();
    };

    const handleResize = () => {
      resize();
      syncViewportState();
      start(true);
    };

    resize(true);
    window.addEventListener('resize', handleResize);

    const nodeCount = density === 'low' ? 14 : density === 'high' ? 36 : 26;
    const maxDistance = 142;
    const maxDistanceSquared = maxDistance * maxDistance;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
    }));

    const stop = () => {
      isRunning = false;

      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const clearRestoreTimeout = () => {
      if (restoreTimeoutId !== null) {
        clearTimeout(restoreTimeoutId);
        restoreTimeoutId = null;
      }
    };

    const handleMotionPreferenceChange = () => {
      if (motionQuery.matches) {
        stop();
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        return;
      }

      resize();
      syncViewportState();
      start(true);
    };

    const animate = (time = 0) => {
      if (!isRunning) return;

      if (time - lastFrameTime < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      lastFrameTime = time;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${glowColor}40`;
        ctx.fill();

        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8);
        gradient.addColorStop(0, `${glowColor}20`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < maxDistanceSquared) {
            const distance = Math.sqrt(distanceSquared);
            const opacity = (1 - distance / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `${glowColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    const start = (force = false) => {
      if (
        isRunning ||
        motionQuery.matches ||
        !isInViewport ||
        (!force && document.visibilityState === 'hidden')
      ) {
        return;
      }

      isRunning = true;
      lastFrameTime = 0;
      animationId = requestAnimationFrame(animate);
    };

    const restore = (delay = 0) => {
      clearRestoreTimeout();

      if (delay > 0) {
        restoreTimeoutId = setTimeout(() => {
          restoreTimeoutId = null;
          resize();
          syncViewportState();
          start(true);
        }, delay);
        return;
      }

      resize();
      syncViewportState();
      start(true);
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      restore(event.persisted ? 180 : 0);
    };

    const handlePageHide = () => {
      clearRestoreTimeout();
      stop();
    };

    const handleFocus = () => {
      restore();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        clearRestoreTimeout();
        stop();
        return;
      }

      resize();
      syncViewportState();
      start(true);
    };

    const handleViewportChange: IntersectionObserverCallback = ([entry]) => {
      isInViewport = entry.isIntersecting;

      if (!isInViewport) {
        stop();
        return;
      }

      start(true);
    };

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(handleViewportChange, { rootMargin: '160px 0px' })
      : null;

    if (observer) {
      observer.observe(canvas);
    } else {
      isInViewport = true;
    }

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionQuery.addEventListener('change', handleMotionPreferenceChange);

    syncViewportState();
    start();

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionPreferenceChange);
      clearRestoreTimeout();
      stop();
    };
  }, [density, glowColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
    />
  );
}
