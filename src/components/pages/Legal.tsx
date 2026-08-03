import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

interface LegalProps {
  type: 'privacy' | 'terms';
}

export const Legal: React.FC<LegalProps> = ({ type }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-2 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>LEGAL & COMPLIANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Last Updated: August 2, 2026 • ChurnFix Advisory
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
          {isPrivacy ? (
            <>
              <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
              <p>
                ChurnFix Advisory collects contact information (name, email, company website) and subscription transaction metadata logs provided by clients for payment recovery audits.
              </p>

              <h2 className="text-lg font-bold text-white">2. Use of Anonymized Transaction Logs</h2>
              <p>
                When performing a Payment Recovery Audit, ChurnFix Advisory only inspects anonymized decline codes, card type tokens, and retry timestamp metadata. We strictly do not collect, store, or process raw credit card numbers or sensitive Primary Account Numbers (PAN).
              </p>

              <h2 className="text-lg font-bold text-white">3. Data Security & Confidentiality</h2>
              <p>
                All client transaction logs, audit reports, and portal communications are encrypted in transit via TLS 1.3 and at rest using AES-256 encryption aligned with PCI-DSS Level 1 standards.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-white">1. Advisory Services & Scope</h2>
              <p>
                ChurnFix Advisory provides subscription billing audit, retry logic optimization, card updater strategy, and dunning advisory services.
              </p>

              <h2 className="text-lg font-bold text-white">2. 100% 3x ROI Guarantee Terms</h2>
              <p>
                If a Payment Recovery Audit does not identify at least 3x the audit fee in recoverable annual recurring revenue, ChurnFix Advisory will issue a full 100% refund of the audit fee upon request.
              </p>

              <h2 className="text-lg font-bold text-white">3. Intellectual Property & Portal Access</h2>
              <p>
                All audit report documents, dunning email templates, and portal dashboards delivered to clients remain the exclusive property of the client upon full payment.
              </p>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
