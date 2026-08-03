import React from 'react';
import { NavigationPage } from '../../types';
import { ShieldCheck, Mail, ArrowUpRight, Lock, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-sm">
      {/* Top Feature Bar */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-blue-400 text-xs font-extrabold">01</span>
              <span className="text-slate-200 text-xs font-bold uppercase tracking-wider">Risk & Loss Audit</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 text-xs font-extrabold">02</span>
              <span className="text-slate-200 text-xs font-bold uppercase tracking-wider">Smart Payment Recovery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 text-xs font-extrabold">03</span>
              <span className="text-slate-200 text-xs font-bold uppercase tracking-wider">Retention Advisory</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <span>SOC2 Type II & PCI-DSS Compliant Infrastructure</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                ChurnFix<span className="text-blue-500">Advisory</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Premium SaaS payment recovery consultancy helping subscription companies diagnose, recover, and prevent revenue lost to involuntary churn.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>PCI-DSS & SOC2 Gateway Compliance Standard</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Compatible with Stripe, Paddle, Chargebee & Recurly</span>
              </div>
            </div>
          </div>

          {/* Column 1: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-blue-400 transition-colors">
                  Payment Recovery Audit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-blue-400 transition-colors">
                  Smart Dunning Strategy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-blue-400 transition-colors">
                  Retry Logic Optimization
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-blue-400 transition-colors">
                  Card Updater Strategy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-blue-400 transition-colors">
                  Managed Recovery Retainer
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Company & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors">
                  About Founder Ashley Lalfam
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('case-studies')} className="hover:text-blue-400 transition-colors">
                  Client Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-blue-400 transition-colors">
                  Industries Served
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-blue-400 transition-colors">
                  Pricing & Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-blue-400 transition-colors">
                  Dunning Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Client Experience</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('portal')} className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <span>Client Portal Login</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('book-audit')} className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  <span>Book Free Audit</span>
                  <ArrowUpRight className="w-3 h-3 text-blue-400" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors">
                  Contact Advisory Team
                </button>
              </li>
            </ul>

            <div className="pt-3">
              <span className="text-xs text-slate-500 block mb-1">Direct Inquiries:</span>
              <a href="mailto:ashley@churnfix.com" className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> ashley@churnfix.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ChurnFix Advisory. All rights reserved. Founded by Ashley Lalfam.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('terms')} className="hover:text-slate-300 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 transition-colors">
              Security Standard
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
