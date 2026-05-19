import { ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'outline' | 'solid' | 'glow';
}

export const Badge = ({ children, className, variant = 'outline' }: BadgeProps) => {
  const variants = {
    outline: 'border border-brand-border text-brand-text-secondary',
    solid: 'bg-brand-surface-raised text-brand-text-primary',
    glow: 'border border-white/20 text-white shadow-glow',
  };

  return (
    <span className={cn(
      'px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
