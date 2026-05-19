import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Loader2, CheckCircle2, Fingerprint } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

const SOCIAL_LINKS = [
  {
    name: 'X',
    href: 'https://x.com/AbinetNahum',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/forge.deep/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'Threads',
    href: 'https://www.threads.com/@forge.deep',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M10 4.5c1.1-.3 2.2-.5 3.3-.5 5 0 9 4 9 9s-4 9-9 9c-1.1 0-2.2-.2-3.3-.5" />
        <path d="M10 14.5c.3.3.7.5 1 .5 1.1 0 2-.9 2-2s-.9-2-2-2c-.3 0-.7.2-1 .5" />
        <path d="M10 4.5C6.3 5.5 4 8.5 4 12.5c0 4.5 3.5 8 8 8 1.1 0 2.2-.2 3.3-.5" />
        <path d="M10 4.5V10c0 1.1.9 2 2 2" />
      </svg>
    ),
  },
];

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer_newsletter' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('[Footer] Subscription error:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <footer className="bg-brand-base border-t border-brand-border/50 pt-20 md:pt-32 pb-10 md:pb-12">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.5fr] gap-12 md:gap-16 lg:gap-20 mb-20 md:mb-24">
          <div className="max-w-sm">
            <a href="/" className="flex items-center gap-3 mb-6 md:mb-8 group">
              <div className="w-9 h-9 relative flex items-center justify-center border border-brand-border rounded-md bg-brand-surface shadow-md">
                 <Fingerprint size={20} className="text-brand-text-secondary group-hover:text-brand-text-primary transition-colors" />
              </div>
              <span className="text-xl font-display font-medium tracking-tight text-brand-text-primary uppercase group-hover:text-white transition-colors">DEEPFORGE</span>
            </a>
            <p className="text-brand-text-secondary mb-8 leading-relaxed text-[15px] font-normal">
              Forge Your Mind. Command Your Life. Precision performance systems for the disciplined elite.
            </p>
            <nav aria-label="Social media links" className="flex gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${link.name}`}
                  className="w-10 h-10 rounded-md border border-brand-border flex items-center justify-center text-brand-text-tertiary hover:border-brand-text-secondary hover:text-brand-text-primary hover:bg-[#111] shadow-xs transition-all duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </nav>
          </div>

          {/* Links Column */}
          <div className="grid grid-cols-2 gap-8 md:gap-10">
            <div className="space-y-6">
              <h4 className="text-[11px] uppercase tracking-widest text-brand-text-tertiary">Navigate</h4>
              <ul className="space-y-4 text-[14px]">
                {['Products', 'About', 'Reviews', 'FAQ'].map((link) => (
                  <li key={link}>
                     <a href={`#${link.toLowerCase()}`} className="text-brand-text-secondary hover:text-brand-text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[11px] uppercase tracking-widest text-brand-text-tertiary">Legal</h4>
              <ul className="space-y-4 text-[14px]">
                {['Privacy', 'Terms', 'Refunds'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-brand-text-secondary hover:text-brand-text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-2 lg:col-span-1 max-w-md">
            <h4 className="text-[11px] uppercase tracking-widest text-brand-text-tertiary mb-6">Stay Sharp</h4>
            <p className="text-[14px] text-brand-text-secondary mb-8 leading-relaxed">
              Weekly insights on focus, discipline, and mental performance.
            </p>
            
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-brand-text-secondary bg-[#111] p-4 rounded-md border border-brand-border"
              >
                <CheckCircle2 size={20} />
                <span className="text-[12px] font-medium font-mono uppercase tracking-widest">Encrypted Data Sent.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    className="flex-grow bg-[#050505] border border-brand-border rounded-md px-4 py-2.5 text-[14px] focus:outline-none focus:border-brand-text-secondary focus:bg-[#0a0a0a] disabled:opacity-50 transition-all text-white font-mono placeholder:text-brand-text-tertiary"
                  />
                  <Button 
                    size="sm" 
                    variant="secondary"
                    className="px-6 py-2.5 rounded-md"
                    isLoading={status === 'loading'}
                    type="submit"
                  >
                    Join
                  </Button>
                </div>
                {status === 'error' && (
                  <p className="text-[11px] text-brand-danger font-mono mt-1" role="alert">
                    {errorMessage}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-brand-text-tertiary text-center md:text-left font-mono uppercase tracking-widest">
            © 2026 DEEPFORGE LABS. All systems online.
          </p>
          <nav aria-label="Secondary social links" className="flex gap-6 md:gap-8">
             {SOCIAL_LINKS.map(link => (
               <a 
                 key={link.name}
                 href={link.href} 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-[11px] uppercase tracking-widest text-brand-text-tertiary hover:text-brand-text-primary transition-colors font-mono"
               >
                 {link.name}
               </a>
             ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
