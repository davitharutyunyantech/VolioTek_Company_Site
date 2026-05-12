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

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = canvas.offsetWidth * pixelRatio;
      canvas.height = canvas.offsetHeight * pixelRatio;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

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

    const handleMotionPreferenceChange = () => {
      if (motionQuery.matches) {
        stop();
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        return;
      }

      resize();
      start(true);
    };

    const animate = () => {
      if (!isRunning) return;

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
      animationId = requestAnimationFrame(animate);
    };

    const handlePageShow = () => {
      stop();
      resize();
      start(true);
    };

    const handleFocus = () => {
      stop();
      resize();
      start(true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stop();
        return;
      }

      resize();
      stop();
      start(true);
    };

    const handleViewportChange: IntersectionObserverCallback = ([entry]) => {
      isInViewport = entry.isIntersecting;

      if (!isInViewport) {
        stop();
        return;
      }

      resize();
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
    window.addEventListener('pagehide', stop);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionQuery.addEventListener('change', handleMotionPreferenceChange);

    if (!motionQuery.matches && isInViewport) {
      start();
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('pagehide', stop);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionPreferenceChange);
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
