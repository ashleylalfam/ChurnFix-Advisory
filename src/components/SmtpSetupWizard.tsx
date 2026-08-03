import React, { useState, useEffect } from 'react';
import { Mail, Shield, CheckCircle2, AlertCircle, RefreshCw, Key, Server, Lock, Send, X } from 'lucide-react';

interface SmtpSetupWizardProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfigSaved?: () => void;
  title?: string;
}

export const SmtpSetupWizard: React.FC<SmtpSetupWizardProps> = ({
  isOpen = true,
  onClose,
  onConfigSaved,
  title = 'SMTP Email Server Setup Wizard',
}) => {
  const [host, setHost] = useState('smtp.gmail.com');
  const [port, setPort] = useState(587);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [encryption, setEncryption] = useState<'tls' | 'ssl' | 'none'>('tls');
  const [fromEmail, setFromEmail] = useState('ashleylalfam001@gmail.com');
  const [fromName, setFromName] = useState('ChurnFix Advisory');

  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    fetchSmtpStatus();
  }, []);

  const fetchSmtpStatus = async () => {
    try {
      const res = await fetch('/api/smtp/status');
      const data = await res.json();
      if (data.config) {
        if (data.config.host) setHost(data.config.host);
        if (data.config.port) setPort(data.config.port);
        if (data.config.user) setUser(data.config.user);
        if (data.config.encryption) setEncryption(data.config.encryption);
        if (data.config.fromEmail) setFromEmail(data.config.fromEmail);
        if (data.config.fromName) setFromName(data.config.fromName);
        setConfigured(data.configured);
      }
    } catch (err) {
      console.error('Failed to fetch SMTP status:', err);
    }
  };

  const applyPreset = (type: 'gmail' | 'sendgrid' | 'mailgun' | 'outlook') => {
    if (type === 'gmail') {
      setHost('smtp.gmail.com');
      setPort(587);
      setEncryption('tls');
      if (!fromEmail) setFromEmail('ashleylalfam001@gmail.com');
    } else if (type === 'sendgrid') {
      setHost('smtp.sendgrid.net');
      setPort(587);
      setEncryption('tls');
      setUser('apikey');
    } else if (type === 'mailgun') {
      setHost('smtp.mailgun.org');
      setPort(587);
      setEncryption('tls');
    } else if (type === 'outlook') {
      setHost('smtp.office365.com');
      setPort(587);
      setEncryption('tls');
    }
    setStatusMessage({ type: 'info', text: `Applied ${type.toUpperCase()} server defaults. Please enter your Username/Password.` });
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/smtp/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host,
          port,
          user,
          pass,
          encryption,
          fromEmail,
          fromName,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setStatusMessage({ type: 'error', text: data.message || 'Failed to connect to SMTP server.' });
      } else {
        setConfigured(true);
        setStatusMessage({ type: 'success', text: '✅ SMTP connection verified and saved! All form submissions will now deliver to ashleylalfam001@gmail.com.' });
        if (onConfigSaved) onConfigSaved();
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Server connection error.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSendTestEmail = async () => {
    setTesting(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/smtp/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetEmail: 'ashleylalfam001@gmail.com' }),
      });

      const data = await res.json();
      if (!data.success) {
        setStatusMessage({ type: 'error', text: data.message || 'Failed to dispatch test email.' });
      } else {
        setStatusMessage({ type: 'success', text: `🎉 Test email successfully delivered to ashleylalfam001@gmail.com!` });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error running test email delivery.' });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold font-mono">
          <Server className="w-3.5 h-3.5" />
          Production Email Routing
        </div>
        <h2 className="text-2xl font-extrabold text-white">{title}</h2>
        <p className="text-slate-400 text-xs">
          Configure your outbound SMTP credentials so all <strong className="text-emerald-400">Audit Requests</strong> and <strong className="text-cyan-300">Contact Messages</strong> are instantly emailed to <span className="font-mono text-white underline font-bold">ashleylalfam001@gmail.com</span>.
        </p>
      </div>

      {/* Quick Presets */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 block font-mono">Quick Presets:</label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyPreset('gmail')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 cursor-pointer"
          >
            Google / Gmail
          </button>
          <button
            type="button"
            onClick={() => applyPreset('sendgrid')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 cursor-pointer"
          >
            SendGrid
          </button>
          <button
            type="button"
            onClick={() => applyPreset('mailgun')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 cursor-pointer"
          >
            Mailgun
          </button>
          <button
            type="button"
            onClick={() => applyPreset('outlook')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 cursor-pointer"
          >
            Microsoft 365
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSaveConfig} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">SMTP Host Server *</label>
            <input
              type="text"
              required
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="e.g. smtp.gmail.com"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Port *</label>
            <input
              type="number"
              required
              value={port}
              onChange={(e) => setPort(Number(e.target.value))}
              placeholder="587"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">SMTP Username / Email *</label>
            <input
              type="text"
              required
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="you@company.com or Gmail address"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">SMTP Password / App Password *</label>
            <input
              type="password"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Encryption Type *</label>
            <select
              value={encryption}
              onChange={(e) => setEncryption(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="tls">TLS / STARTTLS (Port 587)</option>
              <option value="ssl">SSL / Direct (Port 465)</option>
              <option value="none">None / Plain (Port 25)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Sender From Email</label>
            <input
              type="email"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              placeholder="ashley@churnfix.com"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Sender Name</label>
            <input
              type="text"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              placeholder="ChurnFix Advisory"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                : statusMessage.type === 'error'
                ? 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                : 'bg-blue-950/60 border-blue-500/40 text-blue-200'
            }`}
          >
            {statusMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
            {statusMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
            {statusMessage.type === 'info' && <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}
            <span className="leading-relaxed">{statusMessage.text}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            <span>{loading ? 'Verifying SMTP Server...' : 'Save & Verify SMTP Credentials'}</span>
          </button>

          {configured && (
            <button
              type="button"
              onClick={handleSendTestEmail}
              disabled={testing}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-xs cursor-pointer flex items-center justify-center gap-2"
            >
              {testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>{testing ? 'Sending...' : 'Send Test Email to ashleylalfam001@gmail.com'}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
