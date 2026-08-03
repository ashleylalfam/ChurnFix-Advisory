import React from 'react';
import { PRICING_PLANS } from '../../data/mockData';
import { NavigationPage } from '../../types';
import { Check, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';

interface PricingProps {
  onNavigate: (page: NavigationPage) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-950 text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
            TRANSPARENT VALUE-DRIVEN PRICING
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Invest in Revenue Protection. Guaranteed 3x ROI.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Every audit includes a strict 100% money-back guarantee: if we don't identify at least 3x the audit fee in recoverable recurring revenue, you pay nothing.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 flex flex-col justify-between relative border transition-all ${
                plan.popular
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-md">
                  MOST POPULAR AUDIT PACKAGE
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.tagline}</p>
                </div>

                <div className="py-4 border-y border-slate-800">
                  <div className="text-4xl font-extrabold text-white font-mono flex items-baseline gap-2">
                    {plan.price}
                    <span className="text-xs text-slate-400 font-sans font-normal">{plan.period}</span>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{plan.guarantee}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    What's Included:
                  </span>
                  <div className="space-y-2.5">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-800 space-y-3">
                <button
                  onClick={() => onNavigate('book-audit')}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-slate-500 text-center block">
                  {plan.idealFor}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">The ChurnFix 3x ROI Guarantee</h4>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                If our forensic transaction log audit fails to identify at least 3x the audit price ($7,350+) in recoverable annual recurring revenue, we will refund 100% of your audit fee on the spot.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('book-audit')}
            className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all border border-slate-700 shrink-0 cursor-pointer"
          >
            Claim Guaranteed Audit
          </button>
        </div>

      </div>
    </div>
  );
};
