import React, { useState } from 'react';
import { Mail, Clock, ShieldCheck, Send, CheckCircle2, AlertCircle, Settings, RefreshCw } from 'lucide-react';
import { SmtpSetupWizard } from '../SmtpSetupWizard';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'General Payment Advisory Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showSmtpWizard, setShowSmtpWizard] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.smtpConfigured === false) {
          setErrorMsg(data.message || 'SMTP Email is not configured. Please complete SMTP server setup.');
          setShowSmtpWizard(true);
        } else {
          setErrorMsg(data.message || data.error || 'Failed to dispatch email via SMTP. Please try again.');
        }
        return;
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Network error occurred while sending message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Contact ChurnFix Advisory
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Have a question about payment recovery, dunning emails, or gateway integrations? Reach out to Ashley Lalfam directly.
          </p>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs space-y-3 max-w-4xl mx-auto">
            <div className="flex items-start gap-2.5 font-bold text-rose-300">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div>Email Delivery Error</div>
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
                <span>{showSmtpWizard ? 'Hide SMTP Wizard' : 'Configure SMTP Email Setup'}</span>
              </button>
            </div>
          </div>
        )}

        {/* SMTP Wizard modal/section if needed */}
        {showSmtpWizard && (
          <div className="max-w-4xl mx-auto">
            <SmtpSetupWizard
              onClose={() => setShowSmtpWizard(false)}
              onConfigSaved={() => setErrorMsg(null)}
              title="Configure SMTP Server to Enable Contact Form Delivery"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Direct Founder Contact</h3>
              <p className="text-xs text-slate-400">
                All form submissions are delivered directly via SMTP to <strong className="text-emerald-400">ashleylalfam001@gmail.com</strong>.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Direct Email:</div>
                  <a href="mailto:ashleylalfam001@gmail.com" className="font-mono text-cyan-300 font-bold hover:underline">
                    ashleylalfam001@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Advisory Response Hours:</div>
                  <div className="text-slate-200 font-medium">Monday – Friday: 08:00 – 18:00 EST</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Security & Compliance:</div>
                  <div className="text-slate-200 font-medium">PCI-DSS Level 1 Gateway Partner Protocol</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <span className="font-bold text-white block">Client Portal Access:</span>
              <p>Existing clients can send encrypted portal messages directly inside their Dashboard tab.</p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-8">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you for reaching out. Your message was automatically emailed to <strong className="text-emerald-400">ashleylalfam001@gmail.com</strong>. Ashley Lalfam will respond to <strong className="text-cyan-300">{form.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-white">Send Us a Direct Note</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                      placeholder="e.g. marcus@company.com"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Website</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="e.g. DevTech Inc. (devtech.io)"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="e.g. Soft Decline Consultation"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">How can we help? *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your current gateway, MRR, or payment failure questions..."
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>{loading ? 'Delivering via SMTP...' : 'Send Message to Ashley'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
