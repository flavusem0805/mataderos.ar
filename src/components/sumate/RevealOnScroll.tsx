'use client';

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}

export function RevealOnScroll({ children, delayMs = 0, className = '' }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'pending' | 'shown'>('idle');

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === 'undefined') return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setState('shown');
      return;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setState('shown');
      return;
    }

    setState('pending');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState('shown');
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style = delayMs > 0 ? ({ '--reveal-delay': `${delayMs}ms` } as CSSProperties) : undefined;

  return (
    <div
      ref={ref}
      data-reveal={state === 'idle' ? undefined : state}
      style={style}
      className={`sumate-reveal ${className}`.trim()}
    >
      {children}
    </div>
  );
}
