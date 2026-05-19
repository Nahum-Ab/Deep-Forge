import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/src/lib/utils';

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-brand-accent hover:bg-brand-secondary shadow-[0_4px_14px_0_rgba(230,74,25,0.39)] hover:shadow-[0_6px_20px_rgba(230,74,25,0.23)] text-white font-medium border border-transparent hover:border-brand-accent transition-all duration-300 ease-premium',
      secondary: 'bg-brand-surface border border-brand-border hover:border-brand-text-secondary hover:bg-brand-surface-raised text-brand-text-primary shadow-sm hover:shadow-md transition-all duration-300 ease-premium',
      ghost: 'bg-transparent border border-transparent text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-surface transition-colors duration-200 ease-out',
      link: 'bg-transparent text-brand-accent hover:text-brand-secondary hover:underline underline-offset-4 p-0 transition-colors duration-200',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm min-h-[40px]',
      md: 'px-5 py-2.5 text-sm min-h-[44px]',
      lg: 'px-8 py-3.5 text-base min-h-[48px]',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: variant === 'link' ? 1 : 1.01 }}
        whileTap={{ scale: variant === 'link' ? 1 : 0.98 }}
        className={cn(
          'inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-sans rounded-md select-none',
          variants[variant],
          variant !== 'link' && sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Processing...</span>
          </div>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
