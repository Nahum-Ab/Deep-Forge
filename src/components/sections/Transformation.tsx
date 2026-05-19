import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

export const Transformation = () => {
  const beforeStates = [
    "Constantly distracted",
    "No control over dopamine",
    "Plans without execution",
    "Addicted to short-form content",
    "Brain fog every morning",
    "Zero identity, zero discipline"
  ];

  const afterStates = [
    "Laser-focused for 4+ hours daily",
    "Dopamine under command",
    "Systems that execute themselves",
    "Deep reading, deep thinking",
    "Cognitive clarity from 5am",
    "Forged identity, unbreakable discipline"
  ];

  return (
    <section id="transformation" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-base" />
      <div className="absolute top-0 right-0 w-[50vw] h-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.015)_0%,transparent_60%)] pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex justify-center items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 bg-brand-text-tertiary rounded-full animate-pulse" />
            <span className="font-mono text-[11px] tracking-widest text-brand-text-secondary uppercase">Psychological Shift</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            System <span className="text-brand-text-secondary">Upgrade.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-0 items-stretch max-w-6xl mx-auto">
          {/* Before Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#030303] border border-brand-border/50 p-8 md:p-12 lg:p-16 relative overflow-hidden group shadow-xl rounded-xl lg:rounded-r-none lg:rounded-l-xl z-20"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.01)_50%,transparent_75%)] bg-[length:100%_100%] group-hover:bg-[length:200%_200%] transition-all duration-1000 ease-in-out pointer-events-none" />
            
            <h3 className="text-xl md:text-2xl font-medium text-brand-text-tertiary mb-10 flex items-center gap-4 border-b border-brand-border/50 pb-6 font-display uppercase tracking-widest">
              <span className="font-mono text-[11px] tracking-widest opacity-40">V1.0</span> The Current State
            </h3>
            <ul className="space-y-6 relative z-10">
              {beforeStates.map((state, i) => (
                <li key={i} className="flex gap-4 items-start text-brand-text-secondary text-sm md:text-[15px] font-normal leading-relaxed opacity-60">
                  <X className="text-brand-text-tertiary shrink-0 mt-0.5 opacity-40" size={18} strokeWidth={1.5} />
                  {state}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Center Divider/Icon */}
          <div className="relative py-4 lg:py-0 lg:px-0 flex items-center justify-center -mx-4 lg:mx-0 z-30 pointer-events-none">
            <div className="absolute lg:inset-y-0 lg:w-[1px] inset-x-0 h-[1px] bg-brand-border" />
            
            <div className="relative z-10 w-14 h-14 rounded-full bg-brand-base border border-brand-text-tertiary/30 flex items-center justify-center shadow-xl">
               <div className="w-6 h-6 flex flex-col justify-between">
                 <div className="w-full h-[1px] bg-brand-text-secondary/50 group-hover:bg-brand-text-primary transition-colors" />
                 <div className="w-full h-[1px] bg-brand-text-secondary/80 group-hover:bg-brand-text-primary transition-colors" />
                 <div className="w-full h-[1px] bg-brand-text-secondary/50 group-hover:bg-brand-text-primary transition-colors" />
               </div>
            </div>
          </div>

          {/* After Panel */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bg-[#080808] border border-brand-border/80 p-8 md:p-12 lg:p-16 h-full shadow-2xl relative overflow-hidden rounded-xl lg:rounded-l-none lg:rounded-r-xl z-20 group"
          >
            {/* Top right corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-brand-text-secondary opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40" />
            
            <h3 className="text-xl md:text-2xl font-medium text-brand-text-primary mb-10 flex items-center gap-4 border-b border-brand-text-tertiary/30 pb-6 font-display uppercase tracking-widest">
              <span className="font-mono text-[11px] tracking-widest text-brand-text-secondary">V2.4</span> The Forged State
            </h3>
            <ul className="space-y-6 relative z-10">
              {afterStates.map((state, i) => (
                <li key={i} className="flex gap-4 items-start text-brand-text-primary text-sm md:text-[15px] font-medium leading-relaxed">
                  <Check className="text-brand-text-primary shrink-0 mt-0.5" size={18} strokeWidth={2} />
                  {state}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-24 md:mt-32 text-center w-full">
          <div className="inline-flex flex-col items-center">
            <motion.blockquote
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-4xl font-display uppercase font-medium tracking-tight text-brand-text-secondary leading-[1.2] max-w-4xl mx-auto"
            >
              "You don't need more motivation.<br/>
              <span className="text-white">You need a better <span className="text-brand-text-secondary italic font-light">system</span>.</span>"
            </motion.blockquote>
            <div className="w-px h-16 bg-brand-text-tertiary/30 mt-12" />
          </div>
        </div>
      </div>
    </section>
  );
};
