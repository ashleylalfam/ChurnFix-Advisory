import React from 'react';
import { BarChart3, TrendingUp, PieChart, AlertCircle, CheckCircle2 } from 'lucide-react';

export const RevenueInsightsView: React.FC = () => {
  const failureReasons = [
    { label: 'Expired Credit/Debit Card', pct: 42, mrr: '$17,850', color: 'bg-blue-600' },
    { label: 'Insufficient Funds / Debit Limit', pct: 28, mrr: '$11,900', color: 'bg-cyan-600' },
    { label: 'Issuer Soft Decline (Do Not Honor)', pct: 18, mrr: '$7,650', color: 'bg-amber-600' },
    { label: '3DS Step-Up Authentication Required', pct: 8, mrr: '$3,400', color: 'bg-indigo-600' },
    { label: 'Other Gateway Errors', pct: 4, mrr: '$1,700', color: 'bg-slate-400' }
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Summary Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            Payment Failure Analytics
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Decline Reason & Recovery Breakdown</h2>
          <p className="text-slate-500 text-xs mt-1">
            Categorized breakdown of all failed billing events analyzed over the last 90 transaction cycles.
          </p>
        </div>

        {/* Decline Reason Progress Bars */}
        <div className="space-y-4 pt-2">
          {failureReasons.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-800 font-bold">{item.label}</span>
                <span className="text-blue-600 font-bold">{item.pct}% ({item.mrr}/mo)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className={`h-full ${item.color}`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retry Success Rate Curve Comparison */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <h3 className="text-lg font-bold text-slate-900">Retry Success Rate Comparison</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-red-600 font-bold">Default Gateway Retries</span>
              <span className="text-slate-500 font-medium">Fixed 24hr Intervals</span>
            </div>
            <div className="text-3xl font-black text-red-600 font-mono">18.4%</div>
            <p className="text-xs text-slate-600">
              Retrying cards immediately during the same hour triggers bank rate limits and soft decline lockouts.
            </p>
          </div>

          <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-blue-700 font-bold">ChurnFix Smart Retry Schedule</span>
              <span className="text-blue-600 font-bold">Exponential Backoff</span>
            </div>
            <div className="text-3xl font-black text-blue-600 font-mono">68.2%</div>
            <p className="text-xs text-slate-700">
              Timing retries to align with bi-weekly salary cycles and corporate budget resets recovers over 3.7x more transactions.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
