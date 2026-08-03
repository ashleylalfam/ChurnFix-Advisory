import React from 'react';
import { TESTIMONIALS } from '../../data/mockData';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">
            TRUST & FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Trusted by SaaS Founders & Revenue Leaders
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Real feedback from operators who used ChurnFix Advisory to protect subscription revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-6 relative shadow-xs hover:border-blue-300 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-blue-700 font-mono px-2.5 py-1 rounded bg-blue-50 border border-blue-200">
                    {item.metric}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-slate-200" />

                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900">{item.name}</div>
                  <div className="text-xs text-slate-500">{item.role}, <span className="text-slate-800 font-semibold">{item.company}</span></div>
                </div>
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
