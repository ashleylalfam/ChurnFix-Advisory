import React, { useState } from 'react';
import { AuditBookingForm, NavigationPage } from '../../types';
import { ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Calendar, DollarSign, Lock, AlertCircle, RefreshCw, Settings } from 'lucide-react';
import { SmtpSetupWizard } from '../SmtpSetupWizard';

interface BookAuditProps {
  onNavigate: (page: NavigationPage) => void;
  prefilledData?: { mrr: number; churn: number; gateway: string } | null;
}

export const BookAudit: React.FC<BookAuditProps> = ({ onNavigate, prefilledData }) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showSmtpWizard, setShowSmtpWizard] = useState<boolean>(false);

  const [form, setForm] = useState<AuditBookingForm>({
    fullName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    website: '',
    subscriptionPlatform: 'Stripe Billing',
    mrrRange: prefilledData ? `$${prefilledData.mrr.toLocaleString()}/mo` : '$50k - $250k / month',
    monthlyActiveCustomers: '500 - 2,500 subscribers',
    currentGateway: prefilledData?.gateway || 'Stripe Billing',
    estimatedInvoluntaryChurn: prefilledData ? `${prefilledData.churn.toFixed(1)}%` : '3.0% - 5.0%',
    primaryPainPoint: 'High credit card decline rates & expired cards',
    notes: '',
  });

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const now = new Date();
    const payload = {
      ...form,
      dateSubmitted: now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      timeSubmitted: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }),
    };

    try {
      const res = await fetch('/api/audit-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.smtpConfigured === false) {
          setErrorMsg(data.message || 'SMTP Email is not configured. Please complete SMTP setup to enable automated email delivery to ashleylalfam001@gmail.com.');
          setShowSmtpWizard(true);
        } else {
          setErrorMsg(data.message || data.error || 'Failed to dispatch email via SMTP. Please try again or verify SMTP server.');
        }
        return;
      }

      setBookingId(data.bookingId || `AUD-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'A network error occurred while submitting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            Guaranteed Payment Recovery Audit
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Book Your Payment Recovery Audit
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Uncover lost recurring revenue, diagnose soft declines, and get a custom 3x ROI recovery roadmap within 48 hours.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Progress Bar */}
          {!submitted && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className={step >= 1 ? 'text-emerald-400 font-bold' : ''}>1. Company & Contact</span>
                <span className={step >= 2 ? 'text-emerald-400 font-bold' : ''}>2. Payment Architecture</span>
                <span className={step >= 3 ? 'text-emerald-400 font-bold' : ''}>3. Review & Submit</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Error Message & Retry Banner */}
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs space-y-3">
              <div className="flex items-start gap-2.5 font-bold text-rose-300">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div>Form Delivery Alert</div>
                  <p className="font-normal text-rose-200 text-xs mt-1 leading-relaxed">{errorMsg}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowSmtpWizard(!showSmtpWizard)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{showSmtpWizard ? 'Hide SMTP Wizard' : 'Configure SMTP Email Credentials'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Embedded SMTP Setup Wizard if toggled or required */}
          {showSmtpWizard && (
            <div className="border-b border-slate-800 pb-6">
              <SmtpSetupWizard
                onClose={() => setShowSmtpWizard(false)}
                onConfigSaved={() => setErrorMsg(null)}
                title="Configure SMTP Credentials to Receive Audit Requests"
              />
            </div>
          )}

          {/* Submission Success State */}
          {submitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  AUDIT CONFIRMATION ID: <span className="text-emerald-400 font-bold">{bookingId}</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Audit Request Sent Successfully!
                </h2>
                <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
                  Your details have been automatically emailed to <strong className="text-emerald-400">ashleylalfam001@gmail.com</strong>. Founder Ashley Lalfam will conduct a preliminary review for <strong className="text-emerald-400">{form.companyName || 'your company'}</strong> and respond to <strong className="text-cyan-300">{form.email}</strong> shortly.
                </p>
              </div>

              {/* Summary Details */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="text-white">{form.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="text-cyan-300">{form.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="text-slate-300">{form.phoneNumber || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">MRR Range:</span>
                  <span className="text-emerald-400">{form.mrrRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Gateway:</span>
                  <span className="text-cyan-300">{form.currentGateway}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivered To:</span>
                  <span className="text-emerald-400 font-bold">ashleylalfam001@gmail.com</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onNavigate('portal')}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md cursor-pointer"
                >
                  Access Client Portal Dashboard
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm cursor-pointer"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={step === 3 ? handleFinalSubmit : handleNextStep} className="space-y-6">
              
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                    Step 1: Contact & Company Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="e.g. Marcus Vance"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. marcus@devtech.io"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        placeholder="e.g. DevTech Inc."
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phoneNumber || ''}
                        onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                        placeholder="e.g. +1 (555) 234-5678"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Website URL *</label>
                    <input
                      type="text"
                      required
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      placeholder="e.g. devtech.io"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                    Step 2: Subscription & Payment Processor Architecture
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Subscription / Billing Platform</label>
                      <select
                        value={form.subscriptionPlatform || 'Stripe Billing'}
                        onChange={(e) => setForm({ ...form, subscriptionPlatform: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Stripe Billing">Stripe Billing</option>
                        <option value="Chargebee">Chargebee</option>
                        <option value="Paddle">Paddle</option>
                        <option value="Recurly">Recurly</option>
                        <option value="Zuora">Zuora</option>
                        <option value="Custom In-House Engine">Custom In-House Engine</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Current Payment Processor / Gateway *</label>
                      <select
                        value={form.currentGateway}
                        onChange={(e) => setForm({ ...form, currentGateway: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Stripe">Stripe</option>
                        <option value="Adyen">Adyen</option>
                        <option value="Authorize.Net">Authorize.Net</option>
                        <option value="Braintree / PayPal">Braintree / PayPal</option>
                        <option value="Checkout.com">Checkout.com</option>
                        <option value="Multi-Gateway Matrix">Multi-Gateway Matrix</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Current MRR Range *</label>
                      <select
                        value={form.mrrRange}
                        onChange={(e) => setForm({ ...form, mrrRange: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Under $20k / month">Under $20,000 / month</option>
                        <option value="$20k - $50k / month">$20,000 – $50,000 / month</option>
                        <option value="$50k - $250k / month">$50,000 – $250,000 / month</option>
                        <option value="$250k - $1M / month">$250,000 – $1,000,000 / month</option>
                        <option value="$1M+ / month">$1,000,000+ / month</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly Active Customers / Subscribers</label>
                      <select
                        value={form.monthlyActiveCustomers || '500 - 2,500 subscribers'}
                        onChange={(e) => setForm({ ...form, monthlyActiveCustomers: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Under 500 subscribers">Under 500 subscribers</option>
                        <option value="500 - 2,500 subscribers">500 – 2,500 subscribers</option>
                        <option value="2,500 - 10,000 subscribers">2,500 – 10,000 subscribers</option>
                        <option value="10,000+ subscribers">10,000+ subscribers</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Involuntary Churn Rate</label>
                    <select
                      value={form.estimatedInvoluntaryChurn}
                      onChange={(e) => setForm({ ...form, estimatedInvoluntaryChurn: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Under 2.0%">Under 2.0% (Healthy)</option>
                      <option value="2.0% - 4.0%">2.0% – 4.0% (Average SaaS)</option>
                      <option value="4.0% - 8.0%">4.0% – 8.0% (High Revenue Leakage)</option>
                      <option value="8.0%+">8.0%+ (Critical)</option>
                      <option value="Not sure / Need audit to tell">Not sure (Need audit to determine)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Payment Recovery Goal</label>
                    <select
                      value={form.primaryPainPoint}
                      onChange={(e) => setForm({ ...form, primaryPainPoint: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="High credit card decline rates & expired cards">High decline rates & expired cards</option>
                      <option value="Rigid default gateway retry schedules failing">Default gateway retry schedules failing</option>
                      <option value="Low dunning email click & card update rates">Low dunning email conversion rates</option>
                      <option value="International bank authorization soft declines">International bank soft declines</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                    Step 3: Review Details & Additional Notes
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Additional Notes or Specific Billing Questions</label>
                    <textarea
                      rows={3}
                      value={form.notes || ''}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Any specific gateway error codes, soft decline patterns, or questions for Ashley Lalfam..."
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="text-xs font-bold text-emerald-400 font-mono uppercase pb-1 border-b border-slate-900">
                      Summary of Audit Submission
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span className="text-slate-400">Company & Contact:</span>
                      <span className="text-white font-bold">{form.companyName} ({form.fullName})</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span className="text-slate-400">Work Email:</span>
                      <span className="text-cyan-300 font-mono">{form.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span className="text-slate-400">Phone Number:</span>
                      <span className="text-slate-300 font-mono">{form.phoneNumber || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span className="text-slate-400">MRR Range & Subscribers:</span>
                      <span className="text-emerald-400 font-mono font-bold">{form.mrrRange} ({form.monthlyActiveCustomers})</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-900 pb-1.5">
                      <span className="text-slate-400">Platform & Gateway:</span>
                      <span className="text-white font-mono">{form.subscriptionPlatform} / {form.currentGateway}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Inbox:</span>
                      <span className="text-emerald-400 font-bold">ashleylalfam001@gmail.com</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      100% Money-Back 3x ROI Protection
                    </div>
                    <p>
                      By submitting this audit request, you are covered by our guarantee: if we do not uncover at least 3x the audit fee in recoverable recurring revenue, your audit fee is 100% refunded.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-800 cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  disabled={loading}
                  className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
                >
                  {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
                  <span>{loading ? 'Sending Email via SMTP...' : step === 3 ? 'Confirm & Book Free Audit' : 'Continue to Next Step'}</span>
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
