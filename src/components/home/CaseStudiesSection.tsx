import React from 'react';
import { CASE_STUDIES } from '../../data/mockData';
import { NavigationPage } from '../../types';
import { ArrowUpRight, TrendingUp, CheckCircle2, Building2 } from 'lucide-react';

interface CaseStudiesSectionProps {
  onNavigate: (page: NavigationPage) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">
              MEASURABLE RESULTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
              Proven Revenue Recovery for Scaling SaaS
            </h2>
            <p className="text-slate-600 text-base max-w-2xl mt-2">
              Explore how subscription leaders eliminated involuntary churn and protected recurring ARR with ChurnFix Advisory.
            </p>
          </div>

          <button
            onClick={() => onNavigate('case-studies')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-sm font-bold transition-all border border-slate-300 shadow-xs cursor-pointer self-start md:self-auto"
          >
            <span>View All Case Studies</span>
            <ArrowUpRight className="w-4 h-4 text-blue-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-mono">
                    {cs.gateway}
                  </span>
                  <span className="text-xs font-bold text-blue-600 font-mono">
                    {cs.timeframe} Setup
                  </span>
                </div>

                <div className="pt-2">
                  <div className="text-2xl font-black text-blue-600 font-mono">
                    {cs.mrrRecovered}
                  </div>
                  <span className="text-xs text-slate-500 block font-medium">Monthly Recurring Revenue Recovered</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {cs.title}
                </h3>

                <p className="text-xs text-slate-600 italic line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  "{cs.quote}"
                </p>

                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Decline Rate Before:</span>
                    <span className="text-red-600 font-mono font-bold">{cs.failureRateBefore}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Decline Rate After:</span>
                    <span className="text-blue-600 font-mono font-bold">{cs.failureRateAfter}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{cs.authorName}</div>
                  <div className="text-[11px] text-slate-500">{cs.authorRole}, {cs.clientName}</div>
                </div>
                <button
                  onClick={() => onNavigate('case-studies')}
                  className="p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
