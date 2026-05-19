import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
  productName: string;
}

export const EmailCaptureModal = ({ isOpen, onClose, onSuccess, productName }: EmailCaptureModalProps) => {
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
        body: JSON.stringify({ 
          email: email.trim(), 
          source: `access_${productName.toLowerCase().replace(/\s+/g, '_')}` 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      setStatus('success');
      onSuccess(email);

      setTimeout(() => {
        onClose();
        setStatus('idle');
        setEmail('');
      }, 2000);
    } catch (err) {
      console.error('[Modal] Registration error:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Connection failed. Check your internet.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-base/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-glow"
          >
            <button
              onClick={onClose}
              disabled={status === 'loading'}
              className="absolute top-4 right-4 text-brand-text-tertiary hover:text-white transition-colors disabled:opacity-30"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <Badge variant="outline" className="mb-6">Registration Required</Badge>
              <h3 className="text-2xl font-bold mb-2 text-white">Access {productName}</h3>
              <p className="text-brand-text-secondary text-sm mb-8 leading-relaxed">
                Join 4,200+ builders. Register your email to receive product updates, exclusive mental performance systems, and release notifications.
              </p>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                    <CheckCircle2 className="text-white" size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-white">Welcome to the elite.</h4>
                  <p className="text-brand-text-secondary text-sm">Check your inbox for the Forge Protocol.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-tertiary" size={18} />
                    <input
                      type="email"
                      required
                      placeholder="Enter your elite email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === 'loading'}
                      className="w-full bg-brand-surface-raised border border-brand-border rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-white transition-colors disabled:opacity-50"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12"
                    isLoading={status === 'loading'}
                    disabled={status === 'loading'}
                  >
                    Register & Continue
                  </Button>

                  {status === 'error' && (
                    <p className="text-xs text-brand-danger text-center animate-pulse" role="alert">
                      {errorMessage}
                    </p>
                  )}
                </form>
              )}

              <div className="mt-8 pt-8 border-t border-brand-border flex items-center gap-3 text-[10px] text-brand-text-tertiary uppercase tracking-widest">
                <ShieldCheck size={14} className="text-white" />
                <span>Zero Spam. Only Performance.</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
