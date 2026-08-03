import React, { useState } from 'react';
import { CASE_STUDIES } from '../../data/mockData';
import { NavigationPage } from '../../types';
import { Building2, ArrowUpRight, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

interface CaseStudiesProps {
  onNavigate: (page: NavigationPage) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onNavigate }) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(CASE_STUDIES[0]);

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
            VERIFIED CASE STUDIES
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Real Involuntary Churn Recovery Metrics
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            See exactly how we diagnosed payment failure codes and implemented smart retries for leading subscription SaaS companies.
          </p>
        </div>

        {/* Selected Case Study Spotlight */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {selectedCaseStudy.clientName}
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedCaseStudy.stage}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedCaseStudy.title}
              </h2>
            </div>

            <div className="text-left md:text-right shrink-0">
              <span className="text-xs text-slate-400 font-mono uppercase block">Total Recovered</span>
              <span className="text-3xl font-black text-emerald-400 font-mono">{selectedCaseStudy.mrrRecovered}</span>
            </div>
          </div>

          {/* Grid Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
                The Involuntary Churn Challenge
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
                {selectedCaseStudy.challenge}
              </p>

              <div className="pt-2 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Advisory Strategy & Implementation
                </h4>
                <div className="space-y-2">
                  {selectedCaseStudy.solution.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Key Quantified Results
                </h3>
                <div className="space-y-3">
                  {selectedCaseStudy.results.map((res, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-sm font-bold text-white font-mono flex items-center justify-between">
                      <span>{res}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 space-y-3">
                <p className="text-slate-300 text-sm italic">
                  "{selectedCaseStudy.quote}"
                </p>
                <div className="text-xs font-bold text-white">
                  — {selectedCaseStudy.authorName}, <span className="text-slate-400 font-normal">{selectedCaseStudy.authorRole}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study List Switcher */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Select Case Study:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((cs) => (
              <button
                key={cs.id}
                onClick={() => setSelectedCaseStudy(cs)}
                className={`text-left p-6 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  selectedCaseStudy.id === cs.id
                    ? 'bg-slate-900 border-emerald-500'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold">{cs.clientName}</span>
                  <span className="text-slate-400">{cs.gateway}</span>
                </div>
                <h4 className="font-bold text-white text-sm line-clamp-2">{cs.title}</h4>
                <div className="text-xs text-emerald-400 font-mono font-bold pt-2 border-t border-slate-800">
                  {cs.mrrRecovered}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
