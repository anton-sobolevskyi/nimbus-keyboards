import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type BoundedProps = {
  as?: 'section' | 'footer';
  fullWidth?: boolean;
  className?: string;
  innerClassName?: string;
  children?: ReactNode;
};

export function Bounded({
  as: Comp = 'section',
  fullWidth = false,
  className,
  innerClassName,
  children,
}: BoundedProps) {
  return (
    <Comp
      className={cn(
        'px-6 py-10 md:py-20 [.header+&]:pt-44 [.header+&]:md:pt-32',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto w-full',
          { 'max-w-7xl': !fullWidth },
          innerClassName,
        )}
      >
        {children}
      </div>
    </Comp>
  );
}
