import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { stats } from '@/src/lib/data/mock';

const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const target = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      const totalFrames = duration * 60;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = end * progress;
        
        if (frame === totalFrames) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(currentCount);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {target % 1 === 0 ? Math.floor(count) : count.toFixed(1)}
      <span className="text-brand-text-secondary">{suffix}</span>
    </span>
  );
};

export const StatsBar = () => {
  return (
    <div className="bg-[#030302] border-y border-brand-border/50 py-12 md:py-16 relative overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none opacity-30" />
      
      <div className="container-wide grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 md:gap-12 text-center relative z-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="relative group flex flex-col items-center">
            {/* Corner brackets */}
            <div className="absolute top-0 left-4 w-4 h-4 border-t border-l border-brand-text-tertiary/10 group-hover:border-brand-text-tertiary/40 transition-colors duration-500" />
            <div className="absolute top-0 right-4 w-4 h-4 border-t border-r border-brand-text-tertiary/10 group-hover:border-brand-text-tertiary/40 transition-colors duration-500" />
            <div className="absolute bottom-0 left-4 w-4 h-4 border-b border-l border-brand-text-tertiary/10 group-hover:border-brand-text-tertiary/40 transition-colors duration-500" />
            <div className="absolute bottom-0 right-4 w-4 h-4 border-b border-r border-brand-text-tertiary/10 group-hover:border-brand-text-tertiary/40 transition-colors duration-500" />
            
            <div className="py-4 px-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-medium text-brand-text-primary mb-2 block font-display">
                <Counter value={stat.value} />
              </div>
              <div className="text-[11px] md:text-xs uppercase tracking-widest text-brand-text-tertiary font-mono">
                {stat.label}
              </div>
            </div>
            
            {idx < stats.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-6 md:-right-8 h-8 w-[1px] bg-brand-border -translate-y-1/2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
