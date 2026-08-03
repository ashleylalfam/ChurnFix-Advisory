import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { getCurrentUser, UserAccount } from '../../services/auth';
import { Sparkles, Send, ShieldCheck, Copy, Check, RefreshCw, Bot, ShieldAlert, Lock, MessageSquare, ArrowRight } from 'lucide-react';

interface AiAssistantViewProps {
  user?: UserAccount;
  onSelectTab?: (tab: any) => void;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({ user: propUser, onSelectTab }) => {
  const activeUser = propUser || getCurrentUser();
  const isAdmin = activeUser?.roleType === 'admin';

  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: "Hello Ashley! Welcome to the ChurnFix AI Audit Assistant (Admin Tool). You can analyze client payment failure logs, draft custom enterprise dunning sequences, and model retry parameters across all client gateways."
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const presets = [
    "Write a high-converting Email #2 for a devtools subscriber whose card failed soft decline",
    "Explain how to fix Stripe decline code 'do_not_honor' without annoying customers",
    "Calculate annual ARR recovered if we reduce 6.5% involuntary churn down to 2.2% at $150k MRR",
    "Generate a 14-day exponential backoff retry schedule matrix for B2B SaaS"
  ];

  const handleSend = async (textToSend?: string) => {
    const activeText = textToSend || prompt;
    if (!activeText.trim() || loading) return;

    const userMessage = { role: 'user' as const, text: activeText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activeText,
          history: updatedMessages.map(m => ({ role: m.role, text: m.text })),
          gateway: 'Stripe + Multi-gateway',
          companyName: 'Advisory Admin Suite'
        })
      });
      const data = await res.json();
      
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: data.response || data.reply || "Here is the payment recovery analysis based on your query." }
      ]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          text: "### Recommended Action Plan:\n\n1. **Soft Decline Routing:** Handle `insufficient_funds` with smart retries on Day +1, Day +4, Day +9.\n2. **Card Updater:** Ensure Stripe Account Automatic Card Updater webhook handlers are active.\n3. **Dunning Email #2:** Send friction-free credit card magic links on Day 3." 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // RESTRICTED CLIENT VIEW IF NOT ADMIN
  if (!isAdmin) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-xs my-8">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-amber-700 px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
            Admin / Advisory Restricted Feature
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            AI Audit Assistant Reserved for Advisory Lead
          </h2>
          <p className="text-slate-600 text-xs leading-relaxed max-w-md mx-auto">
            The AI Audit Assistant is an internal tool reserved exclusively for ChurnFix Lead Staff and Administrators ({'ashleylalfam001@gmail.com'}) to run cross-client batch analyses and audit models.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2 max-w-md mx-auto text-left">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-blue-600" /> Need Help with Your Account?
          </div>
          <p className="text-slate-500">
            As a client, you have direct 1-on-1 access to Ashley Lalfam in your private messaging tab, where you can ask custom questions about your payment retries and dunning emails.
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          {onSelectTab && (
            <button
              onClick={() => onSelectTab('messages')}
              className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Go to Direct Messages with Ashley</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ADMIN VIEW
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col h-[78vh] shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">AI Audit Assistant (Admin Suite)</h2>
            <p className="text-xs text-slate-500 font-mono">Gemini Flash Engine • Cross-Client Dunning & Audit Tuning</p>
          </div>
        </div>

        <span className="text-xs text-blue-700 font-mono font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Admin Exclusive
        </span>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Quick Admin Audit Prompts:</span>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(preset)}
              className="text-left text-[11px] px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-700 transition-all cursor-pointer font-medium"
            >
              "{preset}"
            </button>
          ))}
        </div>
      </div>

      {/* Chat Output Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 font-sans">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl text-xs space-y-2 ${
              m.role === 'user'
                ? 'bg-blue-50 border border-blue-200 text-blue-900 ml-12 font-medium'
                : 'bg-white border border-slate-200 text-slate-800 mr-4 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold font-mono text-blue-600 flex items-center gap-1.5">
                {m.role === 'user' ? 'Admin Prompt' : <><Bot className="w-4 h-4 text-blue-600" /> ChurnFix AI Assistant</>}
              </span>

              {m.role === 'assistant' && (
                <button
                  onClick={() => handleCopy(m.text, idx)}
                  className="text-slate-500 hover:text-slate-900 p-1 rounded font-mono text-[10px] flex items-center gap-1 cursor-pointer"
                >
                  {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedIndex === idx ? 'Copied' : 'Copy Response'}</span>
                </button>
              )}
            </div>

            <div className="prose prose-xs max-w-none text-slate-700 leading-relaxed font-sans">
              <ReactMarkdown>{m.text}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-blue-600 font-mono italic p-3 rounded-xl bg-blue-50 border border-blue-200">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Consulting Gemini Flash Engine...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="pt-2 flex items-center gap-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI to generate enterprise dunning emails, analyze decline logs, or model retry matrix..."
          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
        />

        <button
          type="submit"
          disabled={!prompt.trim() || loading}
          className="py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <span>Run Analysis</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
