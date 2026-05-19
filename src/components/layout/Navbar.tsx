import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Fingerprint } from 'lucide-react';
import { useScrolled } from '@/src/lib/hooks/useScrolled';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

export const Navbar = () => {
  const scrolled = useScrolled();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'Arsenal', href: '#products' },
    { name: 'Protocol', href: '#transformation' },
    { name: 'Intelligence', href: '#about' },
    { name: 'Debriefs', href: '#reviews' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(`#${section}`);
          return;
        }
      }
      if (scrollPosition < 500) setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const scrollToProducts = (e: React.MouseEvent) => {
    scrollToSection(e, '#products');
  };

  return (
    <nav className={cn(
      'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-premium',
      scrolled ? 'bg-[rgba(2,2,2,0.7)] backdrop-blur-2xl saturate-150 border-b border-brand-border py-3' : 'bg-transparent py-5'
    )}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded flex items-center justify-center bg-brand-surface border border-brand-border group-hover:border-brand-accent transition-colors duration-300">
             <Fingerprint size={16} className="text-white group-hover:text-brand-accent transition-colors duration-300" />
          </div>
          <span className="text-lg font-display font-medium tracking-tight text-white group-hover:text-brand-text-secondary transition-colors duration-300">DEEPFORGE</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={cn(
                "text-[13px] font-medium transition-all duration-300 relative group",
                activeSection === link.href ? "text-brand-accent" : "text-brand-text-secondary hover:text-white"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Button variant="secondary" size="sm" onClick={scrollToProducts}>
             Access System
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-brand-text-secondary hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[rgba(2,2,2,0.95)] backdrop-blur-3xl z-[60] flex flex-col p-6 border-b border-brand-border"
            style={{ height: '100dvh' }}
          >
            <div className="flex items-center justify-between mb-16 px-2">
               <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded flex items-center justify-center bg-brand-surface border border-brand-border">
                     <Fingerprint size={14} className="text-brand-accent" />
                  </div>
                  <span className="text-base font-display font-medium tracking-tight text-white">DEEPFORGE</span>
               </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-brand-text-secondary hover:text-white transition-colors p-2">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 px-4">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={cn(
                    "text-3xl font-display font-medium tracking-tight transition-colors py-2 border-b border-brand-border/50",
                    activeSection === link.href ? "text-brand-accent" : "text-brand-text-secondary hover:text-white"
                  )}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto p-4">
              <Button variant="primary" size="lg" className="w-full gap-2" onClick={scrollToProducts}>
                Init Protocol <ArrowRight size={18} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
