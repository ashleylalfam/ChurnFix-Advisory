import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp, ShieldCheck, DollarSign, AlertTriangle, Sparkles } from 'lucide-react';

interface RevenueCalculatorProps {
  onBookAudit?: (mrr: number, churn: number, gateway: string) => void;
}

export const RevenueCalculator: React.FC<RevenueCalculatorProps> = ({ onBookAudit }) => {
  const [mrr, setMrr] = useState<number>(100000);
  const [involuntaryChurnRate, setInvoluntaryChurnRate] = useState<number>(4.2);
  const [gateway, setGateway] = useState<string>('Stripe Billing');

  // Calculations
  const monthlyLostMrr = (mrr * (involuntaryChurnRate / 100));
  const annualLostRevenue = monthlyLostMrr * 12;
  const estimatedRecoveryPercentage = 0.62; // 62% average recovery
  const monthlyRecoveredMrr = monthlyLostMrr * estimatedRecoveryPercentage;
  const annualRecoveredRevenue = monthlyRecoveredMrr * 12;
  const threeYearCumulativeRecovery = annualRecoveredRevenue * 3;

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 text-slate-900 shadow-xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50/80 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2 uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              Interactive ROI Estimator
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Calculate Your Recoverable Subscription Revenue
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              See how much monthly recurring revenue is slipping through default gateway payment retries.
            </p>
          </div>
          <div className="hidden lg:block text-right">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">Industry Benchmark</span>
            <span className="text-sm font-bold text-blue-600">Avg. 55-75% Recovery Success</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* MRR Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-slate-800">
                  Current Monthly Recurring Revenue (MRR)
                </label>
                <span className="text-lg font-bold text-blue-600 font-mono">
                  ${mrr.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="5000"
                value={mrr}
                onChange={(e) => setMrr(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                <span>$10k</span>
                <span>$250k</span>
                <span>$500k</span>
                <span>$1M+</span>
              </div>
            </div>

            {/* Involuntary Churn Rate Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-slate-800">
                  Estimated Involuntary Churn Rate (%)
                </label>
                <span className="text-lg font-bold text-blue-600 font-mono">
                  {involuntaryChurnRate.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.1"
                value={involuntaryChurnRate}
                onChange={(e) => setInvoluntaryChurnRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1% (Low)</span>
                <span>4.2% (SaaS Avg)</span>
                <span>10% (Critical)</span>
              </div>
            </div>

            {/* Gateway Selection */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                Primary Billing Gateway
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Stripe Billing', 'Chargebee', 'Paddle', 'Recurly'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setGateway(item)}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      gateway === item
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Micro alert note */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                At <strong>{involuntaryChurnRate.toFixed(1)}%</strong> involuntary churn, your company is silently losing <strong className="text-amber-800 font-bold">${Math.round(monthlyLostMrr).toLocaleString()} in MRR</strong> every single month to expired cards and soft bank declines.
              </p>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-slate-900 text-white border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-blue-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  Estimated Recovery Metrics
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono font-bold">
                  {gateway}
                </span>
              </div>

              {/* Big Stat */}
              <div>
                <span className="text-slate-400 text-sm font-medium block">
                  Estimated Monthly Recovered Revenue
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono mt-1 flex items-baseline gap-2">
                  +${Math.round(monthlyRecoveredMrr).toLocaleString()}
                  <span className="text-xs font-normal text-slate-400 font-sans">/ month</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Based on ChurnFix’s 62% average recovery framework.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">Annual MRR Protected</span>
                  <span className="text-lg font-bold text-white font-mono mt-0.5 block">
                    +${Math.round(annualRecoveredRevenue).toLocaleString()}
                  </span>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800">
                  <span className="text-xs text-slate-400 block font-medium">3-Year Cumulative LTV</span>
                  <span className="text-lg font-bold text-blue-400 font-mono mt-0.5 block">
                    +${Math.round(threeYearCumulativeRecovery).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero engineering overhead • 100% ROI guarantee on Payment Recovery Audit</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-4 border-t border-slate-800">
              <button
                onClick={() => onBookAudit?.(mrr, involuntaryChurnRate, gateway)}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Book Audit to Recover +${Math.round(monthlyRecoveredMrr).toLocaleString()}/mo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
