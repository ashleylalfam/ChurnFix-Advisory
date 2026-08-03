import React, { useState } from 'react';
import { Settings, CheckCircle2, ShieldCheck, Key, Lock, CreditCard, Mail } from 'lucide-react';
import { SmtpSetupWizard } from '../SmtpSetupWizard';

export const SettingsView: React.FC = () => {
  const [integrations, setIntegrations] = useState({
    stripe: true,
    chargebee: false,
    paddle: false,
    cardUpdaterWebhook: true,
    dunningEmailServer: true
  });

  const toggle = (key: keyof typeof integrations) => {
    setIntegrations({ ...integrations, [key]: !integrations[key] });
  };

  return (
    <div className="space-y-8">
      {/* Existing Settings Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Settings className="w-3.5 h-3.5" />
            Integration & Portal Settings
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Gateway Connections & Webhooks</h2>
          <p className="text-slate-500 text-xs mt-1">
            Manage your connected billing gateways, read-only transaction log sync, and portal security options.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono border-b border-slate-100 pb-2">
            Connected Payment Gateways
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="text-sm font-bold text-slate-900">Stripe Billing API (Read-Only)</div>
                  <div className="text-xs text-slate-500">Restricted key connected • Decline events syncing</div>
                </div>
              </div>

              <button
                onClick={() => toggle('stripe')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border cursor-pointer transition-colors ${
                  integrations.stripe ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {integrations.stripe ? 'Connected' : 'Disconnected'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-cyan-600" />
                <div>
                  <div className="text-sm font-bold text-slate-900">Chargebee Subscription Sync</div>
                  <div className="text-xs text-slate-500">Connect Chargebee account for multi-gateway routing</div>
                </div>
              </div>

              <button
                onClick={() => toggle('chargebee')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border cursor-pointer transition-colors ${
                  integrations.chargebee ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {integrations.chargebee ? 'Connected' : 'Connect'}
              </button>
            </div>
          </div>

          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono border-b border-slate-100 pb-2 pt-4">
            Automated Webhook Sync
          </h3>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-900">Automatic Card Updater Webhook Endpoint</div>
              <span className="text-xs text-blue-600 font-mono font-bold">Active</span>
            </div>
            <code className="block p-2 rounded bg-white border border-slate-200 text-[11px] font-mono text-blue-700 overflow-x-auto">
              https://api.churnfix.com/v1/webhooks/card-updater/whsec_908129381023912
            </code>
          </div>
        </div>
      </div>

      {/* Embedded SMTP Setup Wizard */}
      <SmtpSetupWizard title="Production SMTP Email Delivery Settings" />
    </div>
  );
};
