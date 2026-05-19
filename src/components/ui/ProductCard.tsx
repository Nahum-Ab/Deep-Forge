import React, { MouseEvent } from 'react';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { GumroadProduct } from '@/src/types';

interface ProductCardProps {
  product: GumroadProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const purchaseUrl = product.short_url;

  const isValidGumroadUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    try {
      const parsed = new URL(url);
      return parsed.hostname.toLowerCase().includes('gumroad.com');
    } catch {
      return false;
    }
  };

  const hasValidUrl = isValidGumroadUrl(purchaseUrl);

  const handleRedirect = (e: MouseEvent) => {
    if (e) e.stopPropagation();
    if (hasValidUrl && purchaseUrl) {
      window.open(purchaseUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const IconComponent = LucideIcons.Archive;

  // Custom styling elements to create depth
  return (
    <Card 
      className={`relative flex flex-col group h-full transition-all duration-500 bg-[#0A0A0A] ${hasValidUrl ? 'cursor-pointer hover:bg-[#111111] hover:border-brand-text-secondary/30' : 'opacity-80'}`}
      onClick={hasValidUrl ? handleRedirect : undefined}
    >
      {/* Decorative corner accents - very subtle */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-text-tertiary/20 group-hover:border-brand-accent/40 transition-colors duration-500 z-20 rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-text-tertiary/20 group-hover:border-brand-accent/40 transition-colors duration-500 z-20 rounded-tr-xl" />
      
      {/* Soft overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-b from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl" />

      <div className="h-56 relative overflow-hidden bg-[#050505] flex items-center justify-center border-b border-brand-border p-1.5">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
        
        {product.preview_url ? (
          <img 
            src={product.preview_url} 
            alt={product.name} 
            className={`w-full h-full object-cover rounded-lg transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${hasValidUrl ? 'group-hover:scale-[1.03]' : ''}`}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <motion.div
            whileHover={hasValidUrl ? { scale: 1.05 } : undefined}
            className="relative z-10 text-brand-text-tertiary group-hover:text-brand-text-secondary transition-colors duration-500"
          >
            <IconComponent size={48} strokeWidth={1} />
          </motion.div>
        )}
        
        <div className="absolute top-4 right-4 z-10 backdrop-blur-xl bg-black/50 px-3 py-1.5 rounded-md border border-white/10 font-mono text-[11px] text-white tracking-wider shadow-xl">
          {product.formatted_price}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start mb-5">
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-brand-border bg-brand-base/50 text-brand-text-secondary px-2.5 py-1 rounded-sm shadow-sm">{product.tags?.[0] || 'Asset'}</Badge>
        </div>

        <h3 className="text-xl font-display font-medium mb-3 tracking-tight group-hover:text-brand-text-primary text-brand-text-primary/90 transition-colors duration-300">
          {product.name}
        </h3>
        
        <div 
          className="text-brand-text-secondary text-[14px] mb-8 leading-relaxed flex-grow line-clamp-3 font-normal"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />

        <div className="mt-auto pt-5 border-t border-brand-border/50">
          {hasValidUrl ? (
            <div className="flex items-center text-[12px] font-mono text-brand-text-secondary group-hover:text-brand-accent transition-colors duration-300">
              <span className="flex-grow tracking-widest uppercase">Acquire Asset</span>
              <LucideIcons.ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </div>
          ) : (
            <div className="flex items-center text-[12px] font-mono text-brand-danger opacity-60">
              <span className="flex-grow tracking-widest uppercase">Classified / Unavailable</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
