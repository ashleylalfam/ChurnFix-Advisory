import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { PortalMessage } from '../../types';
import { getCurrentUser, UserAccount } from '../../services/auth';
import { getUserDataStore, saveUserDataStore, DEFAULT_WELCOME_MESSAGE } from '../../services/dataStorage';
import { Send, Sparkles, Bot, ShieldCheck, RefreshCw } from 'lucide-react';

interface MessagesViewProps {
  user?: UserAccount;
}

export const MessagesView: React.FC<MessagesViewProps> = ({ user: propUser }) => {
  const activeUser = propUser || getCurrentUser();
  const [messages, setMessages] = useState<PortalMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load user-isolated message data
  useEffect(() => {
    if (!activeUser) return;
    const store = getUserDataStore(activeUser);
    
    // Ensure clean state: if no messages exist or empty, set welcome message
    if (!store.messages || store.messages.length === 0) {
      setMessages([DEFAULT_WELCOME_MESSAGE]);
    } else {
      setMessages(store.messages);
    }
    setChatHistory(store.chatHistory || []);
  }, [activeUser?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeUser || sending) return;

    const userText = input.trim();
    setInput('');

    const userMsg: PortalMessage = {
      id: `msg-${Date.now()}`,
      sender: activeUser.contactName || 'You',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAdvisor: false
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setSending(true);

    // Save intermediate user message
    const store = getUserDataStore(activeUser);
    store.messages = updatedMessages;
    saveUserDataStore(activeUser.id, store);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: chatHistory,
          companyName: activeUser.companyName,
          gateway: activeUser.gateway,
          mrr: activeUser.mrr,
          churnRate: activeUser.involuntaryChurnRate
        })
      });

      const data = await res.json();
      const replyText = data.reply || data.response || "I have received your note. Let's analyze your retry timing and gateway webhook parameters.";

      const advisorReply: PortalMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'Ashley Lalfam (Founder)',
        role: 'SaaS Payment Recovery Specialist',
        avatar: '/ashley_lalfam.jpg',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAdvisor: true
      };

      const finalMessages = [...updatedMessages, advisorReply];
      const updatedHistory = [
        ...chatHistory,
        { role: 'user' as const, text: userText },
        { role: 'model' as const, text: replyText }
      ];

      setMessages(finalMessages);
      setChatHistory(updatedHistory);

      // Save to isolated user store
      store.messages = finalMessages;
      store.chatHistory = updatedHistory;
      saveUserDataStore(activeUser.id, store);

    } catch (err) {
      console.error('Error fetching AI response:', err);
      const fallbackReply: PortalMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'Ashley Lalfam (Founder)',
        role: 'SaaS Payment Recovery Specialist',
        avatar: '/ashley_lalfam.jpg',
        text: `Here is my recommendation for ${activeUser.companyName}:\n\n` +
          `**1. Retry Timing:** Replace daily retries on ${activeUser.gateway} with exponential backoff on days +1, +4, +9, +16.\n\n` +
          `**2. Card Updater:** Enable pre-expiration Account Automatic Card Updater webhooks to auto-refresh expired cards before decline events occur.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAdvisor: true
      };

      const finalMessages = [...updatedMessages, fallbackReply];
      setMessages(finalMessages);

      store.messages = finalMessages;
      saveUserDataStore(activeUser.id, store);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 h-[78vh] flex flex-col justify-between shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/ashley_lalfam.jpg"
              alt="Ashley Lalfam"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">Ashley Lalfam</div>
            <div className="text-xs text-blue-600 font-mono font-bold">Founder & Lead Advisory Specialist</div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-emerald-700 font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 block">
            ● Gemini Advisory Active
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Private Channel: {activeUser?.companyName || 'Client'}
          </span>
        </div>
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 sm:pr-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.isAdvisor ? 'justify-start' : 'justify-end'}`}
          >
            {m.isAdvisor && (
              <img
                src={m.avatar || '/ashley_lalfam.jpg'}
                alt={m.sender}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 border border-slate-200"
              />
            )}

            <div className={`max-w-xl p-4 rounded-2xl text-xs space-y-1.5 ${
              m.isAdvisor
                ? 'bg-slate-50 border border-slate-200 text-slate-800'
                : 'bg-blue-600 text-white font-medium shadow-xs'
            }`}>
              <div className="flex items-center justify-between gap-4 pb-1 border-b border-slate-200/50">
                <span className={`font-bold ${m.isAdvisor ? 'text-blue-700 font-mono' : 'text-white font-mono'}`}>
                  {m.sender}
                </span>
                <span className={`text-[10px] font-mono ${m.isAdvisor ? 'text-slate-400' : 'text-blue-100'}`}>
                  {m.timestamp}
                </span>
              </div>

              {m.isAdvisor ? (
                <div className="prose prose-xs max-w-none text-slate-700 leading-relaxed font-sans">
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
              )}
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex items-center gap-2 text-xs text-blue-600 font-mono italic p-3 rounded-2xl bg-blue-50 border border-blue-200 w-fit">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Ashley Lalfam is analyzing your payment query...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Form */}
      <form onSubmit={handleSend} className="pt-3 border-t border-slate-100 flex items-center gap-2 sm:gap-3 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask Ashley about ${activeUser?.gateway || 'Stripe'} decline codes, retries, or dunning emails...`}
          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
        />

        <button
          type="submit"
          disabled={!input.trim() || sending}
          className="py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
