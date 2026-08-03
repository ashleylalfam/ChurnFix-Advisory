import React, { useState } from 'react';
import { ClientProfile } from '../../types';
import { UserAccount, authenticateUser, registerUser, requestPasswordReset, resetUserPassword, ADMIN_CREDENTIALS } from '../../services/auth';
import { ShieldCheck, Lock, UserCheck, ArrowRight, UserPlus, KeyRound, AlertCircle, CheckCircle2, Building2, Sparkles } from 'lucide-react';

interface ClientLoginProps {
  onLogin: (user: UserAccount) => void;
}

export const ClientLogin: React.FC<ClientLoginProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  
  // Sign in state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  // Sign up state
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpContactName, setSignUpContactName] = useState('');
  const [signUpCompanyName, setSignUpCompanyName] = useState('');
  const [signUpGateway, setSignUpGateway] = useState('Stripe Billing');
  const [signUpMrr, setSignUpMrr] = useState('75000');
  const [signUpChurn, setSignUpChurn] = useState('4.2');

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotCode, setForgotCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStep, setResetStep] = useState<1 | 2>(1);

  // Status/Error messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const res = authenticateUser(signInEmail, signInPassword);
    if (res.success && res.user) {
      onLogin(res.user);
    } else {
      setErrorMessage(res.error || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!signUpEmail || !signUpPassword || !signUpCompanyName || !signUpContactName) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const res = registerUser({
      email: signUpEmail,
      password: signUpPassword,
      contactName: signUpContactName,
      companyName: signUpCompanyName,
      gateway: signUpGateway,
      mrr: parseFloat(signUpMrr) || 50000,
      involuntaryChurnRate: parseFloat(signUpChurn) || 4.5
    });

    if (res.success && res.user) {
      setSuccessMessage('Account created successfully! Redirecting to workspace...');
      setTimeout(() => {
        onLogin(res.user!);
      }, 800);
    } else {
      setErrorMessage(res.error || 'Registration failed.');
    }
  };

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const res = requestPasswordReset(forgotEmail);
    if (res.success) {
      setSuccessMessage(res.message);
      setResetStep(2);
      if (res.resetCode) {
        setForgotCode(res.resetCode);
      }
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const res = resetUserPassword(forgotEmail, forgotCode, newPassword);
    if (res.success) {
      setSuccessMessage(res.message);
      setTimeout(() => {
        setMode('signin');
        setSignInEmail(forgotEmail);
        setSignInPassword(newPassword);
        setResetStep(1);
      }, 1500);
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-[85vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            ChurnFix Client Portal
          </h2>
          <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
            Isolated SaaS advisory portal for audit reports, dunning retry strategies, and direct advisory messages with Ashley Lalfam.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-slate-200/60 p-1 rounded-2xl">
          <button
            onClick={() => { setMode('signin'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'signin' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => { setMode('signup'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'signup' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>

          <button
            onClick={() => { setMode('forgot'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'forgot' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Reset Password</span>
          </button>
        </div>

        {/* Alert Messages */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* SIGN IN FORM */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
              <input
                type="email"
                required
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-mono transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[11px] text-blue-600 hover:underline cursor-pointer font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                required
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white font-mono transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In to Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* SIGN UP FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={signUpContactName}
                  onChange={(e) => setSignUpContactName(e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={signUpCompanyName}
                  onChange={(e) => setSignUpCompanyName(e.target.value)}
                  placeholder="e.g. Acme SaaS Inc."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
              <input
                type="email"
                required
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-mono transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-mono transition-colors"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Billing Gateway</label>
                <select
                  value={signUpGateway}
                  onChange={(e) => setSignUpGateway(e.target.value)}
                  className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                >
                  <option value="Stripe Billing">Stripe</option>
                  <option value="Chargebee">Chargebee</option>
                  <option value="Paddle">Paddle</option>
                  <option value="Recurly">Recurly</option>
                  <option value="Braintree">Braintree</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">MRR ($ USD)</label>
                <input
                  type="number"
                  value={signUpMrr}
                  onChange={(e) => setSignUpMrr(e.target.value)}
                  placeholder="50000"
                  className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Churn Rate %</label>
                <input
                  type="number"
                  step="0.1"
                  value={signUpChurn}
                  onChange={(e) => setSignUpChurn(e.target.value)}
                  placeholder="4.5"
                  className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Register Private Client Account</span>
              <UserPlus className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <form onSubmit={resetStep === 1 ? handleRequestReset : handleResetPasswordSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="ashleylalfam001@gmail.com or name@company.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-mono transition-colors"
              />
            </div>

            {resetStep === 2 && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Reset Code</label>
                  <input
                    type="text"
                    required
                    value={forgotCode}
                    onChange={(e) => setForgotCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-mono transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new secure password"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-mono transition-colors"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{resetStep === 1 ? 'Send Reset Request' : 'Set New Password'}</span>
              <KeyRound className="w-4 h-4" />
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-xs text-slate-500 hover:text-blue-600 cursor-pointer font-medium"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}

        {/* Security Badge */}
        <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5 font-medium">
          <Lock className="w-3.5 h-3.5 text-blue-600" />
          <span>Isolated User Data Engine • Session Encryption • PCI-DSS Compliant</span>
        </div>

      </div>
    </div>
  );
};
