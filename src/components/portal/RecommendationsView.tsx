import React, { useState } from 'react';
import { INITIAL_RECOMMENDATIONS } from '../../data/mockData';
import { AuditRecommendation } from '../../types';
import { CheckSquare, Clock, AlertCircle, ArrowUpRight, DollarSign, Filter } from 'lucide-react';

export const RecommendationsView: React.FC = () => {
  const [recs, setRecs] = useState<AuditRecommendation[]>(INITIAL_RECOMMENDATIONS);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const toggleStatus = (id: string) => {
    setRecs(recs.map(r => {
      if (r.id === id) {
        const nextStatus = r.status === 'Implemented' ? 'Pending' : r.status === 'In Progress' ? 'Implemented' : 'In Progress';
        return { ...r, status: nextStatus as any };
      }
      return r;
    }));
  };

  const filtered = recs.filter(r => filterCategory === 'All' || r.category === filterCategory);

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Actionable Recovery Recommendations</h2>
          <p className="text-xs text-slate-500 mt-1">
            Click status badges to cycle item status between Pending, In Progress, and Implemented.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Retry Logic', 'Dunning Sequence', 'Card Updater', 'Billing UX'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-blue-300 transition-all shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2.5 py-1 rounded font-mono font-bold ${
                  item.impact === 'Critical' ? 'bg-red-50 text-red-700 border border-red-200' :
                  item.impact === 'High' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                  'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {item.impact} Priority
                </span>

                <span className="text-xs text-slate-500 font-mono font-medium">{item.category}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-blue-600 font-bold">
                  Estimated MRR: {item.estimatedRecovery}
                </span>

                {/* Interactive Status Switcher Badge */}
                <button
                  onClick={() => toggleStatus(item.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border cursor-pointer transition-all ${
                    item.status === 'Implemented' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    item.status === 'In Progress' ? 'bg-cyan-50 text-cyan-800 border-cyan-200' :
                    'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {item.status} (Click to toggle)
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
            <p className="text-slate-600 text-xs leading-relaxed">{item.description}</p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Technical Effort: {item.effort}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
