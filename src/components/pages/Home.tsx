import React, { useRef } from 'react';
import { NavigationPage } from '../../types';
import { Hero } from '../home/Hero';
import { HiddenProblem } from '../home/HiddenProblem';
import { HowItWorks } from '../home/HowItWorks';
import { RevenueCalculator } from '../home/RevenueCalculator';
import { CaseStudiesSection } from '../home/CaseStudiesSection';
import { TestimonialsSection } from '../home/TestimonialsSection';
import { FAQSection } from '../home/FAQSection';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: NavigationPage) => void;
  onSelectBookingWithData?: (mrr: number, churn: number, gateway: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onSelectBookingWithData }) => {
  const calculatorRef = useRef<HTMLDivElement>(null);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookFromCalculator = (mrr: number, churn: number, gateway: string) => {
    if (onSelectBookingWithData) {
      onSelectBookingWithData(mrr, churn, gateway);
    }
    onNavigate('book-audit');
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero */}
      <Hero onNavigate={onNavigate} onScrollToCalculator={scrollToCalculator} />

      {/* 2. Hidden Revenue Problem */}
      <HiddenProblem onNavigate={onNavigate} />

      {/* 3. How ChurnFix Works */}
      <HowItWorks onNavigate={onNavigate} />

      {/* 4. Interactive Calculator Container */}
      <section ref={calculatorRef} className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevenueCalculator onBookAudit={handleBookFromCalculator} />
        </div>
      </section>

      {/* 5. Case Studies */}
      <CaseStudiesSection onNavigate={onNavigate} />

      {/* 6. Testimonials */}
      <TestimonialsSection />

      {/* 7. FAQ */}
      <FAQSection />

      {/* 8. Final High-Conversion CTA Banner */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            100% ROI Guaranteed Payment Recovery Audit
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Stop Letting Recoverable Revenue Slip Through Default Payment Retries
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            In 60 minutes, Founder Ashley Lalfam will walk you through your gateway's exact decline codes and provide a bulletproof roadmap to protect your ARR.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('book-audit')}
              className="w-full sm:w-auto py-4 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Your Free Payment Recovery Audit</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('case-studies')}
              className="w-full sm:w-auto py-4 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-base transition-all cursor-pointer"
            >
              Read Full Client Case Studies
            </button>
          </div>

          <div className="pt-6 text-xs text-slate-500 font-mono">
            No long-term commitments • PCI-DSS Compliant • Works with Stripe, Chargebee, Paddle & Recurly
          </div>
        </div>
      </section>
    </div>
  );
};
