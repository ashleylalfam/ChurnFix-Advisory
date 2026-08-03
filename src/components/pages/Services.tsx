import React, { useState } from 'react';
import { SERVICES } from '../../data/mockData';
import { NavigationPage } from '../../types';
import { SearchCheck, MailCheck, RefreshCw, CreditCard, Cpu, ShieldCheck, Check, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesProps {
  onNavigate: (page: NavigationPage) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);

  const selectedService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  const getIcon = (name: string) => {
    switch(name) {
      case 'SearchCheck': return <SearchCheck className="w-6 h-6" />;
      case 'MailCheck': return <MailCheck className="w-6 h-6" />;
      case 'RefreshCw': return <RefreshCw className="w-6 h-6" />;
      case 'CreditCard': return <CreditCard className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      default: return <ShieldCheck className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
            ADVISORY & IMPLEMENTATION OFFERINGS
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            End-to-End SaaS Payment Recovery Solutions
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            From forensic decline code audits to automated card updater webhooks and friction-free dunning sequences.
          </p>
        </div>

        {/* Services Tabs / Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Service List */}
          <div className="lg:col-span-5 space-y-3">
            {SERVICES.map((s) => {
              const isSelected = s.id === selectedServiceId;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedServiceId(s.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className={`p-3 rounded-xl shrink-0 ${isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                    {getIcon(s.iconName)}
                  </div>
                  <div>
                    <h3 className={`font-bold text-base ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {s.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed View */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                    {getIcon(selectedService.iconName)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedService.title}</h2>
                    <span className="text-xs text-cyan-400 font-mono font-semibold">Expected Impact: {selectedService.expectedRoi}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedService.fullDesc}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Core Deliverables & Specifications
                </h4>
                <div className="space-y-2">
                  {selectedService.deliverables.map((d, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                <span className="font-semibold text-slate-400 block">Ideal For:</span>
                <span className="text-slate-200">{selectedService.targetAudience}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400 font-mono">
                100% Backed by ChurnFix Advisory ROI Guarantee
              </span>
              <button
                onClick={() => onNavigate('book-audit')}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request {selectedService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
