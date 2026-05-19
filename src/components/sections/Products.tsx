import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { GumroadProduct } from '@/src/types';
import { ProductCard } from '@/src/components/ui/ProductCard';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';

const PRODUCTS_PER_PAGE = 12;

export const Products = () => {
  const [products, setProducts] = useState<GumroadProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: `Server responded with ${response.status}` };
        }
        throw new Error(errorData.message || errorData.error || 'Failed to sync with arsenal catalog');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      const isNetworkError = err instanceof TypeError && err.message === 'Failed to fetch';
      setError(isNetworkError ? 'Network connectivity lost or server is unreachable.' : (err instanceof Error ? err.message : 'Unknown synchronization error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRefresh = () => {
    fetchProducts();
  };

  const getGridClass = (count: number) => {
    if (count === 1 || count === 2) return 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto';
    if (count === 3 || count === 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  const displayedProducts = products.slice(0, page * PRODUCTS_PER_PAGE);
  const hasMore = displayedProducts.length < products.length;

  return (
    <section id="products" className="section-padding relative bg-[#020202] border-y border-brand-border">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="container-wide relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-3 mb-8">
            <Badge variant="outline" className="tracking-widest uppercase text-[11px] bg-brand-surface border-brand-border text-brand-text-secondary px-3 py-1">Secure Vault</Badge>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Digital <span className="text-brand-text-secondary">Assets.</span>
          </h2>
          <p className="text-brand-text-secondary max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Stop performing productivity. Install it. Our systems are engineered using cognitive science and brutal pragmatism.
          </p>
        </div>

        {error && products.length === 0 && !loading && (
          <div className="max-w-xl mx-auto mb-16 p-6 rounded-md border border-brand-danger/20 bg-brand-danger/5 flex items-start gap-4 shadow-xl">
            <AlertCircle className="text-brand-danger shrink-0 mt-0.5" size={18} />
            <div>
              <h4 className="text-sm font-medium text-brand-danger tracking-tight mb-1">Synchronization Issue</h4>
              <p className="text-[13px] text-brand-text-secondary font-mono">
                ERR_CODE: {error}
              </p>
            </div>
          </div>
        )}

        {loading && products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <Loader2 className="animate-spin text-brand-text-tertiary" size={32} />
            <p className="text-brand-text-secondary font-mono text-[11px] tracking-widest uppercase animate-pulse">Establishing Connection...</p>
          </div>
        ) : (
          <>
            <div className={`grid gap-6 lg:gap-8 ${getGridClass(displayedProducts.length)}`}>
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {hasMore && (
              <div className="mt-20 flex justify-center">
                <Button 
                  variant="secondary" 
                  onClick={() => setPage(p => p + 1)}
                  className="px-8 bg-brand-base border-brand-border text-brand-text-primary hover:border-brand-text-secondary hover:bg-brand-surface transition-colors"
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}

        {error && (
          <div className="mt-20 flex justify-center">
            <Button variant="ghost" onClick={handleRefresh} className="text-[11px] tracking-widest font-mono text-brand-text-secondary bg-brand-surface border border-brand-border hover:border-brand-text-tertiary">
              REINITIALIZE SYNC
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
