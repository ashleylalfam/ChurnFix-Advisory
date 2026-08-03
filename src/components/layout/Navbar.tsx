import React, { useState } from 'react';
import { NavigationPage } from '../../types';
import { ShieldCheck, Menu, X, ArrowUpRight, User, ChevronRight } from 'lucide-react';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  isLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, isLoggedIn }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: NavigationPage }[] = [
    { label: 'Services', page: 'services' },
    { label: 'Industries', page: 'industries' },
    { label: 'Case Studies', page: 'case-studies' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Resources', page: 'resources' },
    { label: 'About', page: 'about' },
    { label: 'FAQ', page: 'faq' },
  ];

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 text-slate-900 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                ChurnFix<span className="text-blue-600">Advisory</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest -mt-1 font-mono">
                Payment Recovery
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  currentPage === item.page
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('portal')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full border transition-all cursor-pointer ${
                currentPage === 'portal'
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>{isLoggedIn ? 'Client Portal' : 'Client Login'}</span>
            </button>

            <button
              onClick={() => handleNavClick('book-audit')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-200 cursor-pointer"
            >
              <span>Book Audit</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1 py-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                  currentPage === item.page
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => handleNavClick('portal')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-blue-600" />
              <span>{isLoggedIn ? 'Access Portal' : 'Client Login'}</span>
            </button>

            <button
              onClick={() => handleNavClick('book-audit')}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-200"
            >
              <span>Book Free Audit</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
