'use client';

import { ReactNode, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/utils/cn';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FadeInProps = {
  children: ReactNode;
  vars?: gsap.TweenVars;
  start?: string;
  className?: string;
  targetChildren?: boolean;
};

export const FadeIn = (props: FadeInProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const target = props.targetChildren
      ? containerRef.current?.children
      : containerRef.current;

    if (!target) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(target, {
        opacity: 0,
        y: 60,
      });

      gsap.to(target, {
        duration: 0.8,
        opacity: 1,
        ease: 'power3.out',
        y: 0,
        stagger: 0.2,
        ...props.vars,
        scrollTrigger: {
          trigger: containerRef.current,
          start: props.start ?? 'top 50%',
        },
      });
    });
  });

  return (
    <div ref={containerRef} className={cn(props.className)}>
      {props.children}
    </div>
  );
};
