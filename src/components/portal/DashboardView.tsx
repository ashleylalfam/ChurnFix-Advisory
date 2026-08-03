import React from 'react';
import { ClientProfile, PortalTab } from '../../types';
import { TrendingUp, ShieldCheck, CheckSquare, Clock, ArrowRight, DollarSign, AlertCircle, Sparkles } from 'lucide-react';

interface DashboardViewProps {
  profile: ClientProfile;
  onSelectTab: (tab: PortalTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ profile, onSelectTab }) => {
  return (
    <div className="space-y-8">
      
      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Total Recovered MRR</span>
          <div className="text-3xl font-black text-blue-600 font-mono">
            +${profile.recoveredMrr.toLocaleString()}
            <span className="text-xs font-normal text-slate-500 font-sans"> / mo</span>
          </div>
          <span className="text-[11px] text-blue-700 font-mono block font-bold">+14.8% net ARR protection</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Identified Opportunity</span>
          <div className="text-3xl font-black text-slate-900 font-mono">
            ${profile.potentialMrr.toLocaleString()}
            <span className="text-xs font-normal text-slate-500 font-sans"> / mo</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">From soft declines & expired cards</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Involuntary Churn Rate</span>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {profile.involuntaryChurnRate}%
          </div>
          <span className="text-[11px] text-blue-600 font-mono font-bold">Reduced from 9.8% before audit</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Billing Gateway</span>
          <div className="text-xl font-bold text-slate-900 font-mono mt-1">
            {profile.gateway}
          </div>
          <span className="text-[11px] text-slate-500">Account Card Updater Active</span>
        </div>

      </div>

      {/* Audit Progress & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Action Items & Status */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Priority Recovery Roadmap</h3>
              <p className="text-xs text-slate-500">Action items identified during your payment audit</p>
            </div>

            <button
              onClick={() => onSelectTab('recommendations')}
              className="text-xs text-blue-600 font-mono font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Items</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold">Implemented</span>
                <div className="font-bold text-slate-900 text-sm">Enable Stripe Account Card Updater Webhooks</div>
                <div className="text-slate-500">Estimated Recovered MRR: +$18,500/mo</div>
              </div>
              <CheckSquare className="w-5 h-5 text-blue-600 shrink-0" />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-mono font-bold">In Progress</span>
                <div className="font-bold text-slate-900 text-sm">Exponential Backoff Smart Retry Schedule</div>
                <div className="text-slate-500">Estimated Recovered MRR: +$14,200/mo</div>
              </div>
              <Clock className="w-5 h-5 text-cyan-600 shrink-0" />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold">Pending Setup</span>
                <div className="font-bold text-slate-900 text-sm">Deploy Magic-Link Payment Update UX</div>
                <div className="text-slate-500">Estimated Recovered MRR: +$9,800/mo</div>
              </div>
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            </div>
          </div>
        </div>

        {/* Right: Quick Tools & Advisor Notes */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AI Quick Audit Assistant Card */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 font-mono">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>AI PAYMENT RECOVERY ASSISTANT</span>
            </div>

            <h4 className="text-base font-bold text-slate-900">
              Generate Custom Dunning Email or Ask Gemini AI About Decline Codes
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed">
              Use our server-side Gemini API tool to craft contextual dunning email copy or optimize retry parameters for {profile.gateway}.
            </p>

            <button
              onClick={() => onSelectTab('ai-assistant')}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch AI Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Upload Payment Log Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900">Upload New Payment CSV Log</h4>
            <p className="text-xs text-slate-500">
              Upload your latest Stripe or Chargebee decline export for instant AI analysis.
            </p>
            <button
              onClick={() => onSelectTab('audit-reports')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Upload CSV File</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
