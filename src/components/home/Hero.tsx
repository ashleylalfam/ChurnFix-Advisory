import React from 'react';
import { ArrowUpRight, ShieldCheck, CheckCircle2, TrendingUp, RefreshCw, Lock, Sparkles, DollarSign } from 'lucide-react';
import { NavigationPage } from '../../types';

interface HeroProps {
  onNavigate: (page: NavigationPage) => void;
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onScrollToCalculator }) => {
  return (
    <section className="relative bg-white text-slate-900 overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-100">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-50/80 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100/80 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Payment Recovery Specialist</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
              Stop Leaving <span className="text-blue-600">Revenue</span> on the Table.
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl font-normal">
              Involuntary churn is costing high-growth SaaS companies up to 10% of their MRR. We audit, recover, and optimize your billing lifecycle with smart retry rules and high-converting dunning.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('book-audit')}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Start Your Free Audit</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onScrollToCalculator}
                className="border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span>Calculate Loss</span>
              </button>
            </div>

            {/* Trust Bullet List */}
            <div className="pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>$24M+ Total MRR Recovered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>120+ Audited SaaS Engines</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>100% ROI Guarantee</span>
              </div>
            </div>

            {/* Client Logo Strip */}
            <div className="pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Trusted by Revenue Leaders at</p>
              <div className="flex flex-wrap gap-6 items-center opacity-60">
                <div className="text-lg font-black italic tracking-wider text-slate-700">VOLTA</div>
                <div className="text-lg font-bold text-slate-700">StreamLine</div>
                <div className="text-lg font-extrabold text-slate-700">SAASIFY</div>
                <div className="text-lg font-medium italic font-serif text-slate-700">CloudPulse</div>
              </div>
            </div>

          </div>

          {/* Right Column: Portal Preview (Dashboard Mockup Window) */}
          <div className="lg:col-span-5 relative">
            <div className="w-full bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col relative overflow-hidden">
              {/* Mock Window Controls */}
              <div className="h-12 border-b border-slate-100 flex items-center px-4 justify-between bg-slate-50/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Client Portal — DevTech Inc.</div>
                <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center">
                  <Lock className="w-3 h-3 text-slate-400" />
                </div>
              </div>

              <div className="p-6 flex flex-col gap-5">
                {/* Stat Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="text-xs text-blue-600 font-bold uppercase mb-1">Recovered Revenue</div>
                    <div className="text-2xl font-extrabold text-slate-900">$42,840.00</div>
                    <div className="text-[10px] text-blue-600 font-medium mt-1">+12.4% from last month</div>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                    <div className="text-xs text-emerald-700 font-bold uppercase mb-1">Recovery Success Rate</div>
                    <div className="text-2xl font-extrabold text-slate-900">78.2%</div>
                    <div className="text-[10px] text-emerald-600 font-medium mt-1">Industry leading efficiency</div>
                  </div>
                </div>

                {/* Simulated Chart Bars */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                    <span>Monthly Recovery Trend</span>
                    <span className="text-blue-600 font-bold">+68% Recovered</span>
                  </div>
                  <div className="flex justify-between items-end h-20 gap-2">
                    <div className="w-full bg-slate-200 rounded-t-md h-[40%]" />
                    <div className="w-full bg-slate-200 rounded-t-md h-[65%]" />
                    <div className="w-full bg-blue-500 rounded-t-md h-[85%]" />
                    <div className="w-full bg-slate-200 rounded-t-md h-[55%]" />
                    <div className="w-full bg-slate-200 rounded-t-md h-[75%]" />
                    <div className="w-full bg-blue-300 rounded-t-md h-[95%]" />
                    <div className="w-full bg-blue-600 rounded-t-md h-[100%]" />
                  </div>
                </div>

                {/* Recent Recovery Table Activity */}
                <div className="border border-slate-100 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 p-2.5 text-[10px] font-bold text-slate-500 grid grid-cols-3 border-b border-slate-100">
                    <span>RECOVERY ITEM</span>
                    <span>STATUS</span>
                    <span className="text-right">VALUE</span>
                  </div>
                  <div className="p-2.5 text-[11px] grid grid-cols-3 border-b border-slate-50 items-center">
                    <span className="font-medium text-slate-800">Sub_8921_Premium</span>
                    <span className="text-blue-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Recovered
                    </span>
                    <span className="text-right font-mono font-bold text-slate-900">$2,400</span>
                  </div>
                  <div className="p-2.5 text-[11px] grid grid-cols-3 border-b border-slate-50 items-center">
                    <span className="font-medium text-slate-800">Sub_1204_Enterprise</span>
                    <span className="text-amber-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Processing
                    </span>
                    <span className="text-right font-mono font-bold text-slate-900">$12,500</span>
                  </div>
                  <div className="p-2.5 text-[11px] grid grid-cols-3 items-center">
                    <span className="font-medium text-slate-800">Sub_5531_Basic</span>
                    <span className="text-blue-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Recovered
                    </span>
                    <span className="text-right font-mono font-bold text-slate-900">$490</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
