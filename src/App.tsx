/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from '@/src/components/layout/Navbar';
import { ScrollProgress } from '@/src/components/layout/ScrollProgress';
import { CustomCursor } from '@/src/components/layout/CustomCursor';
import { Hero } from '@/src/components/sections/Hero';
import { StatsBar } from '@/src/components/sections/StatsBar';
import { Products } from '@/src/components/sections/Products';
import { Transformation } from '@/src/components/sections/Transformation';
import { Testimonials } from '@/src/components/sections/Testimonials';
import { About } from '@/src/components/sections/About';
import { FinalCTA } from '@/src/components/sections/FinalCTA';
import { Footer } from '@/src/components/sections/Footer';
import { ErrorBoundary } from '@/src/components/layout/ErrorBoundary';

export default function App() {
  return (
    <main className="relative bg-brand-base min-h-screen selection:bg-brand-text-primary selection:text-brand-base">
      <ErrorBoundary>
        <ScrollProgress />
        <CustomCursor />
        <Navbar />

        <div className="relative z-10">
          <Hero />
          <StatsBar />
          <ErrorBoundary>
            <Products />
          </ErrorBoundary>
          <ErrorBoundary>
            <Transformation />
          </ErrorBoundary>
          <ErrorBoundary>
            <Testimonials />
          </ErrorBoundary>
          <ErrorBoundary>
            <About />
          </ErrorBoundary>
          <ErrorBoundary>
            <FinalCTA />
          </ErrorBoundary>
          <Footer />
        </div>

        {/* Persistent background scan lines effect */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,255,255,0.06))] bg-[size:100%_2px,3px_100%]" />
        
        {/* Noise overlay for texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[101] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </ErrorBoundary>
    </main>
  );
}


