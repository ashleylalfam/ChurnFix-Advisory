import React from 'react';
import { Download, FileText, ShieldCheck, Code, CheckCircle2 } from 'lucide-react';

export const DownloadsView: React.FC = () => {
  const downloads = [
    {
      title: 'DevTech Inc. Forensic Payment Audit Report (PDF)',
      type: 'Executive PDF Report',
      size: '4.2 MB',
      date: 'Aug 1, 2026',
      desc: 'Full 18-page breakdown of gateway decline codes, issuer settlement timing, and recommended retry matrices.'
    },
    {
      title: 'B2B Dunning Email Templates (5-Step Sequence)',
      type: 'Copywriting Asset Pack',
      size: '1.1 MB',
      date: 'Aug 1, 2026',
      desc: 'High-converting polite dunning sequences with embedded magic link placeholders and AP contact escalation copy.'
    },
    {
      title: 'Stripe Automatic Card Updater Webhook Handler Code Snippet',
      type: 'TypeScript / React Code',
      size: '245 KB',
      date: 'Jul 28, 2026',
      desc: 'Plug-and-play Node.js/Express webhook listener that updates card expiration dates before billing cycles execute.'
    },
    {
      title: 'Magic-Link Modal React Component Pack',
      type: 'React / Tailwind Component',
      size: '680 KB',
      date: 'Jul 28, 2026',
      desc: 'Zero-friction in-app modal allowing users to update payment details without logging in.'
    }
  ];

  const handleDownload = (title: string) => {
    alert(`Downloading ${title}... File generated for DevTech Inc.`);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
          <Download className="w-3.5 h-3.5" />
          Client Deliverables
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Audit Reports & Code Resources</h2>
        <p className="text-slate-500 text-xs mt-1">
          Download your custom audit documentation, turnkey dunning email sequences, and webhook integration snippets.
        </p>
      </div>

      <div className="space-y-4">
        {downloads.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-300 transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                  {item.type}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">• {item.size} • {item.date}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600">{item.desc}</p>
            </div>

            <button
              onClick={() => handleDownload(item.title)}
              className="py-2.5 px-4 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 text-blue-600 font-mono font-bold text-xs transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download File</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
