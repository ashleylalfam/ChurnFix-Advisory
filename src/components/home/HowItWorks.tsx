import React from 'react';
import { Search, Cpu, RefreshCw, BarChart3, CheckCircle2, ArrowRight } from 'lucide-react';
import { NavigationPage } from '../../types';

interface HowItWorksProps {
  onNavigate: (page: NavigationPage) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Forensic Payment Audit',
      desc: 'We analyze 6 to 24 months of historical subscription transaction logs across Stripe, Paddle, or Chargebee to uncover soft declines, card expiration patterns, and uncollected invoices.',
      icon: Search,
      highlight: 'Identifies $ per month in recoverable MRR'
    },
    {
      num: '02',
      title: 'Custom Recovery Blueprint',
      desc: 'We map out a custom Smart Retry schedule aligned with card issuer network behavior, pre-expiration card updater webhooks, and friction-free dunning email copy.',
      icon: Cpu,
      highlight: 'Tailored for B2B or B2C subscription models'
    },
    {
      num: '03',
      title: 'Zero-Overhead Configuration',
      desc: 'We directly configure your gateway retry settings or provide your engineering team with exact step-by-step webhook integration specs and copy templates.',
      icon: RefreshCw,
      highlight: 'Zero downtime • No code refactoring needed'
    },
    {
      num: '04',
      title: 'Real-Time MRR Protection',
      desc: 'Access your secure Client Portal to monitor recovered MRR, view decline code improvements, access recommendation matrices, and chat directly with Founder Ashley Lalfam.',
      icon: BarChart3,
      highlight: '100% ROI Guarantee on all audits'
    }
  ];

  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">
            THE CHURNFIX METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            How We Turn Failed Payment Retries Into Predictable ARR
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            A battle-tested 4-step framework designed to eliminate involuntary churn without bothering your customers or requiring weeks of developer effort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={step.num}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black font-mono text-blue-600">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-blue-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    {step.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-xl font-bold text-white">Ready to inspect your gateway decline logs?</h4>
            <p className="text-slate-400 text-sm mt-1">Book a free payment recovery audit with Ashley Lalfam. Backed by a 3x ROI guarantee.</p>
          </div>
          <button
            onClick={() => onNavigate('book-audit')}
            className="py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-lg shadow-blue-200 whitespace-nowrap cursor-pointer flex items-center gap-2"
          >
            <span>Book Free Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
