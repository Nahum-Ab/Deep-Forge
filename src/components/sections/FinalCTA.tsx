import { motion } from 'motion/react';
import { ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export const FinalCTA = () => {
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
    <section className="py-32 md:py-48 relative overflow-hidden bg-[#020202] border-t border-brand-border">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[50vh] bg-[radial-gradient(ellipse_at_bottom,rgba(230,74,25,0.06)_0%,transparent_50%)] -z-10" />
      
      {/* Subtle grid framing */}
      <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-brand-text-tertiary/20 pointer-events-none" />
      <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-brand-text-tertiary/20 pointer-events-none" />
      <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-brand-text-tertiary/20 pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-brand-text-tertiary/20 pointer-events-none" />
      
      <div className="container-tight text-center relative z-10 w-full flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="w-full"
        >
          <div className="inline-flex justify-center items-center gap-3 mb-10">
            <span className="font-mono text-[11px] tracking-widest text-brand-text-secondary uppercase">Action Required</span>
            <div className="w-6 h-[1px] bg-brand-text-tertiary" />
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tighter uppercase font-display leading-[1.05]">
            The Window<br className="sm:hidden" /> Is <span className="text-brand-text-secondary">Open.</span>
          </h2>
          <p className="text-brand-text-secondary text-lg md:text-xl mb-12 max-w-2xl mx-auto px-4 font-normal">
            Every day you delay costs you exactly what you're trying to build.
          </p>
          
          <div className="flex flex-col items-center gap-8 md:gap-10 px-4 mt-8 w-full">
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-10 py-4 text-base font-medium relative overflow-hidden group shadow-[0_4px_14px_0_rgba(230,74,25,0.39)] hover:shadow-[0_6px_20px_rgba(230,74,25,0.23)] border border-brand-accent/0 hover:border-brand-accent transition-all duration-300 ease-premium bg-brand-accent text-white"
              onClick={scrollToProducts}
            >
              Init Purchase Protocol
              <ArrowRight className="ml-2.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" size={18} />
            </Button>
            
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 pt-6 border-t border-brand-border/40 max-w-md mx-auto w-full">
              <span className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-brand-text-secondary font-mono">
                <Lock size={12} className="text-brand-accent" /> Instant Access
              </span>
              <span className="hidden sm:block w-[1px] h-3 bg-brand-border" />
              <span className="text-[11px] tracking-widest text-brand-text-tertiary uppercase font-mono">Encrypted</span>
              <span className="hidden sm:block w-[1px] h-3 bg-brand-border" />
              <span className="text-[11px] tracking-widest text-brand-text-tertiary uppercase font-mono">Verified</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
