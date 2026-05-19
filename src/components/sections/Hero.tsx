import { motion } from 'motion/react';
import { ArrowRight, Hexagon } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 lg:pt-32 overflow-hidden bg-brand-base">
      {/* Cinematic Lighting effects - ultra subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(230,74,25,0.06)_0%,transparent_60%)] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay -z-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-brand-border to-transparent opacity-50" />

      <div className="container-wide grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10 w-full">
        {/* Left Content */}
        <div className="max-w-3xl lg:max-w-none flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-8 bg-brand-text-tertiary" />
            <span className="font-mono text-[11px] tracking-widest uppercase text-brand-text-secondary">Classified Protocol</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-bold mb-6 text-[3.5rem] leading-[1] md:text-[5.5rem] lg:text-[6.5rem] tracking-tighter"
          >
            Forge Your <br />
            <span className="text-gradient">Future Self.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-base md:text-lg text-brand-text-secondary leading-relaxed mb-10 max-w-lg"
          >
            Cognitive engineering for the high-performance elite. We build precision systems to automate focus, delete distraction, and install unbreakable discipline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Button 
              size="lg" 
              className="group w-full sm:w-auto"
              onClick={scrollToProducts}
            >
              Start Forging 
              <motion.span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">
                <ArrowRight size={18} />
              </motion.span>
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              View Architecture
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center gap-4 text-[11px] font-mono text-brand-text-tertiary uppercase tracking-wider"
          >
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/80" />
               System Online
             </div>
             <div className="w-px h-3 bg-brand-border" />
             <div>Encrypted v2.4</div>
          </motion.div>
        </div>

        {/* Minimal Geometric Visual */}
        <div className="hidden lg:flex relative items-center justify-center h-full min-h-[500px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative w-full aspect-square flex items-center justify-center"
          >
            {/* Soft backdrop glow */}
            <div className="absolute w-[60%] h-[60%] bg-brand-accent/5 rounded-full blur-[100px]" />

            {/* Core Element - Minimalist Node */}
            <div className="relative z-10 grid grid-cols-2 gap-8">
               <motion.div 
                 animate={{ y: [0, -10, 0] }} 
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="w-32 h-32 border border-brand-border/80 bg-brand-surface/40 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl relative"
               >
                 <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent rounded-2xl pointer-events-none" />
                 <Hexagon size={32} strokeWidth={1} className="text-brand-text-secondary" />
               </motion.div>

               <motion.div 
                 animate={{ y: [0, 10, 0] }} 
                 transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="w-32 h-32 border border-brand-accent/30 bg-brand-accent/5 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(230,74,25,0.1)] relative mt-16"
               >
                 <div className="absolute inset-0 bg-linear-to-b from-brand-accent/10 to-transparent rounded-2xl pointer-events-none" />
                 <Hexagon size={32} strokeWidth={1.5} className="text-brand-accent" />
               </motion.div>
            </div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full p-12 -z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
                d="M30 40 L70 60" 
                stroke="url(#gradient)" 
                strokeWidth="0.5" 
                fill="none" 
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#666666" />
                  <stop offset="100%" stopColor="#e64a19" />
                </linearGradient>
              </defs>
            </svg>

            {/* Framing Brackets */}
            <div className="absolute top-[10%] left-[10%] w-6 h-6 border-t border-l border-brand-text-tertiary/40" />
            <div className="absolute top-[10%] right-[10%] w-6 h-6 border-t border-r border-brand-text-tertiary/40" />
            <div className="absolute bottom-[10%] left-[10%] w-6 h-6 border-b border-l border-brand-text-tertiary/40" />
            <div className="absolute bottom-[10%] right-[10%] w-6 h-6 border-b border-r border-brand-text-tertiary/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
