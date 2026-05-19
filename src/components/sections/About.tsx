import { motion } from 'motion/react';
import { Badge } from '@/src/components/ui/Badge';

export const About = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-brand-base border-y border-brand-border/30">
      <div className="absolute inset-0 bg-[#020202]">
         <div className="absolute top-1/2 left-0 w-full h-[500px] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_0%,transparent_60%)]" />
      </div>
      
      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex gap-4 mb-8 items-center">
              <Badge variant="outline" className="font-mono text-[11px] tracking-widest bg-transparent border-brand-text-tertiary/40 text-brand-text-secondary uppercase px-3 py-1">The Architecture</Badge>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-10 tracking-tight font-display leading-[1.05]">
              Not a Brand.<br />
              <span className="text-brand-text-secondary italic font-light lowercase text-[0.9em]">A Philosophy.</span>
            </h2>
            
            <div className="space-y-6 text-brand-text-secondary text-base lg:text-lg leading-relaxed max-w-xl font-normal">
              <p>
                DeepForge was built for one reason: most self-improvement content is entertainment dressed as transformation.
              </p>
              <p className="text-white font-medium border-l border-brand-accent/50 pl-5 my-8 tracking-wide">
                We build systems. Not motivation.
              </p>
              <p>
                Every product in the Arsenal is engineered with cognitive science, behavioral psychology, and brutal pragmatism. If it doesn't produce measurable results in your focus, output, or mental clarity — it gets scrapped.
              </p>
              <p>
                DeepForge is not for everyone. It is for those who are done performing productivity and ready to <span className="text-white font-medium">install it.</span>
              </p>
            </div>

            <div className="mt-12 md:mt-16 flex items-center gap-6 p-6 rounded-md border border-brand-border bg-[#050505] max-w-sm hover:border-brand-text-tertiary/40 transition-colors shadow-2xl">
              <div className="w-14 h-14 md:w-16 md:h-16 border border-brand-text-tertiary/20 bg-[#080808] flex items-center justify-center text-brand-text-secondary text-lg md:text-xl font-display font-medium relative">
                <div className="absolute -inset-1 border border-brand-text-tertiary/10 hover:rotate-90 transition-transform duration-[1.5s] ease-out rounded-sm" />
                DF
              </div>
              <div>
                <h4 className="font-medium text-lg uppercase tracking-tight text-white font-sans mb-1">Architect</h4>
                <p className="text-[11px] text-brand-text-tertiary font-mono tracking-widest uppercase">Performance Systems</p>
              </div>
            </div>
          </div>

          <div className="relative group order-1 lg:order-2">
             <motion.div
               whileHover={{ y: -5 }}
               transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
               className="bg-[#050505] border border-brand-border p-6 md:p-8 relative z-10 w-full mx-auto overflow-hidden shadow-2xl rounded-xl"
             >
                {/* Circuit board accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
                
                <div className="flex gap-3 mb-8 border-b border-brand-border/50 pb-4 justify-between items-center">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-text-tertiary/30" />
                    <div className="w-3 h-3 rounded-full bg-brand-text-tertiary/30" />
                    <div className="w-3 h-3 rounded-full bg-brand-text-secondary/50" />
                  </div>
                  <span className="font-mono text-[11px] text-brand-text-tertiary tracking-wider">kernel_v2.ts</span>
                </div>
                
                <div className="font-mono text-[13px] md:text-sm space-y-2 md:space-y-2.5 text-brand-text-tertiary leading-loose">
                  <p className="text-brand-text-secondary">protocol <span className="text-white">initialize_focus()</span> {'{'}</p>
                  <p className="pl-4">env.<span className="text-[#888888]">purge_distractions();</span></p>
                  <p className="pl-4">neuro.<span className="text-[#888888]">lock_dopamine_gates();</span></p>
                  <p className="pl-4">output.<span className="text-white">execute_deep_work(</span></p>
                  <p className="pl-8">duration: <span className="text-brand-text-secondary">'240m'</span>,</p>
                  <p className="pl-8">intensity: <span className="text-brand-text-primary">'MAX'</span></p>
                  <p className="pl-4"><span className="text-white">);</span></p>
                  <p className="text-brand-text-secondary">{'}'}</p>
                  <p className="mt-8 opacity-40"># Optimization complete.</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-brand-text-secondary">{'>>'}</span>
                    <span className="w-2 h-4 bg-brand-text-primary animate-pulse" />
                  </div>
                </div>
             </motion.div>
             
             {/* Offset hardware background */}
             <div className="absolute -top-4 -right-4 w-full h-full border border-brand-border/50 bg-[#080808] rounded-xl -z-10 group-hover:translate-x-2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75" />
             <div className="absolute -bottom-4 -left-4 w-full h-full border border-brand-border/30 bg-[#030303] rounded-xl -z-20 group-hover:-translate-x-2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </div>
        </div>
      </div>
    </section>
  );
};
