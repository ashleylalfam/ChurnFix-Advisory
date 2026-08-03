import React from 'react';
import { NavigationPage } from '../../types';
import { Terminal, Building2, Layers, GraduationCap, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';

interface IndustriesProps {
  onNavigate: (page: NavigationPage) => void;
}

export const Industries: React.FC<IndustriesProps> = ({ onNavigate }) => {
  const industries = [
    {
      icon: Terminal,
      title: 'Developer Tools & API Infrastructure',
      subtitle: 'High usage velocity, virtual credit cards & corporate debit limits',
      painPoint: 'Developers frequently use temporary virtual card numbers or corporate cards with strict monthly limits. Default retries trigger fraud blocks.',
      solution: 'We configure soft decline retry windows matched to corporate budget resets and build 1-click in-app card update modals so dev teams stay unlocked.',
      metric: '76% decline reduction'
    },
    {
      icon: Building2,
      title: 'B2B Enterprise Workflow SaaS',
      subtitle: 'Multiple stakeholders, procurement processes & invoice delays',
      painPoint: 'Invoices sent to end users get stuck in corporate accounting departments. Accounts get locked out unfairly before procurement can process payments.',
      solution: 'We implement 14-day grace periods and B2B escalation dunning sequences sent directly to AP contacts with downloadable PDF invoices.',
      metric: '55% dunning email conversion'
    },
    {
      icon: Rocket,
      title: 'Series A & B High-Growth Scale-ups',
      subtitle: '$50k to $500k MRR expanding rapidly across international markets',
      painPoint: 'Cross-border currency settlement fees and international bank authorization declines quietly drain top-line ARR growth.',
      solution: 'We optimize multi-currency settlement retry parameters and regional issuer network authorizations to maximize international card approval rates.',
      metric: '+$42.5k avg. recovered MRR'
    },
    {
      icon: GraduationCap,
      title: 'EdTech & Consumer Subscriptions',
      subtitle: 'High credit card turnover, consumer debit cards & annual renewals',
      painPoint: 'Consumer debit cards expire rapidly (~30% annual turnover) and annual subscriptions fail at high rates when cards aren\'t updated beforehand.',
      solution: 'We set up pre-expiration card updater webhooks 30 days before annual renewals hit, ensuring seamless uninterrupted renewals.',
      metric: '80% card expiration churn prevented'
    }
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            TAILORED INDUSTRY STRATEGIES
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Payment Recovery Built for Your Specific SaaS Model
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Different subscription models face distinct billing failure patterns. We customize retry schedules and dunning workflows to match your buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((ind, idx) => {
            const IconComp = ind.icon;
            return (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {ind.metric}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white">{ind.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 font-mono">{ind.subtitle}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                      <span className="text-red-400 font-semibold block mb-1">Common Industry Failure Point:</span>
                      <p className="text-slate-300">{ind.painPoint}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                      <span className="text-emerald-400 font-semibold block mb-1">ChurnFix Advisory Solution:</span>
                      <p className="text-slate-300">{ind.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onNavigate('book-audit')}
                    className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Audit for {ind.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
