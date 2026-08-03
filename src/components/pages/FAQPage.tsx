import React from 'react';
import { FAQSection } from '../home/FAQSection';
import { NavigationPage } from '../../types';
import { ArrowRight } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-950 text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <FAQSection />

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl font-bold text-white">Still have questions about involuntary churn?</h3>
          <p className="text-slate-400 text-sm">
            We are always happy to answer specific technical queries regarding your gateway setup.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 cursor-pointer"
            >
              Contact Us
            </button>
            <button
              onClick={() => onNavigate('book-audit')}
              className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
            >
              <span>Book Payment Recovery Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
