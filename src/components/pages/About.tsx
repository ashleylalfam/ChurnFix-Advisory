import React from 'react';
import { FOUNDER_INFO } from '../../data/mockData';
import { NavigationPage } from '../../types';
import { ShieldCheck, Award, Target, Eye, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: NavigationPage) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-950 text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
            ABOUT CHURNFIX ADVISORY
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Meet the Founder & Payment Recovery Advisory Team
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            We are a boutique advisory firm built specifically for subscription SaaS businesses that refuse to let recoverable ARR bleed out through default gateway settings.
          </p>
        </div>

        {/* Founder Spotlight Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-5 relative">
            <div className="aspect-square rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-950 relative">
              <img
                src={FOUNDER_INFO.avatar}
                alt="Ashley Lalfam"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 text-xs">
                <div className="font-bold text-white text-sm">{FOUNDER_INFO.name}</div>
                <div className="text-emerald-400 font-medium">{FOUNDER_INFO.title}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              Lead Advisor & Specialist
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              "Most SaaS companies are losing 3% to 5% of their ARR to billing glitches, not product churn."
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {FOUNDER_INFO.bio}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Key Credentials & Track Record
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {FOUNDER_INFO.credentials.map((cred, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => onNavigate('book-audit')}
                className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Schedule Audit Walkthrough</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Our Mission</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {FOUNDER_INFO.mission}
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Our Vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To become the global standard in SaaS payment recovery and subscription billing health optimization, turning quiet financial leakage into visible, predictable expansion ARR.
            </p>
          </div>
        </div>

        {/* Core Guiding Principles */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
          <h3 className="text-xl font-bold text-white text-center">
            Our Core Operating Principles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-400">1. Evidence First</div>
              <p className="text-xs text-slate-400">
                We never make claims or changes without analyzing raw transaction logs and issuer decline codes first.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-cyan-400">2. Customer Respect</div>
              <p className="text-xs text-slate-400">
                Dunning shouldn't sound like a collection agency. We preserve brand equity with polite, friction-free communications.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-400">3. Measurable ROI</div>
              <p className="text-xs text-slate-400">
                Every audit comes with a guaranteed 3x ROI threshold in identified recoverable recurring revenue.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
