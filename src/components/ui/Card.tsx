import { ReactNode, HTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  hoverGlow?: boolean;
}

export const Card = ({ children, className, hoverGlow = true, ...props }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={hoverGlow ? { y: -4, borderColor: 'var(--color-brand-text-tertiary)', boxShadow: '0 12px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' } : {}}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative bg-[#0d0d0c] border border-brand-border rounded-xl overflow-hidden transition-colors shadow-2xl',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-linear-to-b from-white/[0.02] to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};
