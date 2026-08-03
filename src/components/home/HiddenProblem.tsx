import React from 'react';
import { AlertCircle, CreditCard, Clock, Ban, ShieldAlert, ArrowRight } from 'lucide-react';
import { NavigationPage } from '../../types';

interface HiddenProblemProps {
  onNavigate: (page: NavigationPage) => void;
}

export const HiddenProblem: React.FC<HiddenProblemProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-slate-50 text-slate-900 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5" />
            The Hidden Revenue Leak
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Why 40% of Your Churned Customers Never Wanted to Leave
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Most SaaS founders lump all customer churn into product dissatisfaction. In reality, up to 40% of churned accounts are victims of silent billing failures.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          
          {/* Card 1: Voluntary Churn */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 relative shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-slate-100 text-slate-500">
                <Ban className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-slate-100 text-slate-600">
                VOLUNTARY CHURN
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900">
              Customer Explicitly Cancels
            </h3>
            
            <p className="text-sm text-slate-600 leading-relaxed">
              The user actively logs into settings, clicks "Cancel Subscription", selects a cancellation reason (e.g. "Too expensive", "Missing feature"), and stops using your SaaS.
            </p>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Requires product roadmap changes & feature development</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Takes months of user research & onboarding overhauls</span>
              </div>
            </div>
          </div>

          {/* Card 2: Involuntary Churn (Highlighted) */}
          <div className="bg-blue-50/60 border-2 border-blue-600 rounded-2xl p-6 sm:p-8 space-y-4 relative shadow-xl shadow-blue-100">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-blue-600 text-white">
                INVOLUNTARY CHURN (RECOVERABLE)
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900">
              Billing Gateway Fails Silently
            </h3>
            
            <p className="text-sm text-slate-700 leading-relaxed">
              The customer loves your product, relies on it daily, and wants to stay subscribed. But their credit card expires, a bank issues a soft authorization decline, or default retries fail.
            </p>

            <div className="pt-4 border-t border-blue-200 space-y-2 text-xs text-blue-900 font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Can be fixed in days with ChurnFix Advisory</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>50%–75% of lost MRR can be recovered without coding</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Root Causes Grid */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <h3 className="text-xl font-bold text-center text-slate-900 mb-8">
            The 4 Main Drivers of Involuntary SaaS Churn
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm mb-3">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-base">Expired Credit Cards</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Credit cards expire every 3 years. That means ~3% of your active paying customer base gets a new card every single month.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm mb-3">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-base">Soft Bank Declines</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Temporary bank authorization freezes, daily corporate credit card spending limits, or fraud risk false positives.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm mb-3">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-base">Rigid Retry Timing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Default gateway settings retry failed charges on consecutive days (Day 1, 2, 3) before bank accounts clear or payroll settles.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm mb-3">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-base">High-Friction Dunning</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Forcing busy corporate buyers to remember passwords or navigate complex login screens just to update a credit card.
              </p>
            </div>

          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('book-audit')}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              <span>Stop losing revenue to involuntary churn—Get a Payment Recovery Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
