import { motion } from 'motion/react';
import { Star, MessageSquareQuote } from 'lucide-react';
import { testimonials } from '@/src/lib/data/mock';
import { Badge } from '@/src/components/ui/Badge';
import { Card } from '@/src/components/ui/Card';
import { cn } from '@/src/lib/utils';

export const Testimonials = () => {
  return (
    <section id="reviews" className="section-padding bg-brand-base relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[800px] h-[60vw] max-h-[800px] border-[1px] border-brand-text-tertiary/5 rounded-full -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] max-w-[600px] h-[40vw] max-h-[600px] border-[1px] border-brand-text-tertiary/10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_0%,transparent_50%)] -z-10" />

      <div className="container-wide">
        <div className="text-center mb-16 md:mb-24">
          <Badge variant="outline" className="mb-6 font-mono tracking-widest text-[11px] text-brand-text-secondary bg-brand-surface border-brand-border uppercase px-3 py-1">Debriefs</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-display leading-[1.1]">
            Field <span className="text-brand-text-secondary">Reports.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto cursor-pointer">
          {testimonials.map((review, i) => (
            <Card key={review.id} className="p-8 md:p-10 flex flex-col group bg-[#040404] hover:bg-[#070707] border-brand-border/40 hover:border-brand-text-tertiary/40 transition-colors duration-500 relative overflow-hidden shadow-xl hover:shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              {/* Animated hover gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.02)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute top-4 right-6 md:right-8 text-brand-text-tertiary/10 group-hover:text-brand-text-tertiary/30 transition-colors pointer-events-none duration-500">
                <MessageSquareQuote size={48} strokeWidth={1} />
              </div>
              
              <div className="flex gap-1.5 text-brand-text-tertiary mb-8 relative z-10 group-hover:text-brand-accent transition-colors duration-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              <p className="text-brand-text-secondary text-[14px] md:text-[15px] leading-relaxed mb-10 relative z-10 font-normal group-hover:text-brand-text-primary transition-colors">
                "{review.content}"
              </p>

              <div className="mt-auto flex items-center gap-4 relative z-10 pt-6 border-t border-brand-border/30">
                <div className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded bg-brand-surface border border-brand-border/50 flex items-center justify-center text-brand-text-primary font-medium text-sm md:text-base group-hover:border-brand-text-tertiary/40 transition-colors duration-500"
                )}>
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-medium text-brand-text-primary text-sm leading-tight font-sans tracking-tight">{review.name}</h4>
                  <p className="text-[11px] text-brand-text-tertiary font-mono tracking-widest uppercase mt-1">
                    {review.role}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Row */}
        <div className="mt-24 md:mt-32 pt-12 md:pt-16 border-t border-brand-border/30 flex flex-wrap justify-center gap-x-12 md:gap-x-20 gap-y-8 md:gap-y-10">
          {['Indie Hackers', 'Notion Creators', 'Product Hunt', 'Medium', 'Substack'].map((brand) => (
            <span key={brand} className="text-[11px] font-medium tracking-widest uppercase font-mono text-brand-text-tertiary hover:text-brand-text-secondary transition-colors cursor-default">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
