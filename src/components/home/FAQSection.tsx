import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'Difference & Value',
      question: 'How is ChurnFix Advisory different from dunning software apps?',
      answer: 'Dunning software tools only send automated templated emails after a payment fails. They do not fix the underlying gateway decline codes, issuer settlement retry windows, pre-expiration card updater webhooks, or 3DS step-up authentication. ChurnFix is a specialized advisory platform built by subscription billing engineers that addresses both the technical billing layer and the dunning communications with a guaranteed 3x ROI.'
    },
    {
      category: 'Audit & Timeline',
      question: 'How long does the Payment Recovery Audit take?',
      answer: 'Our forensic audit takes 2 to 4 business days once we receive read-only access to your gateway transaction logs or exported CSV logs. We then present a comprehensive executive breakdown and engineering implementation blueprint during a 60-minute strategy call.'
    },
    {
      category: 'Security & Compliance',
      question: 'Is our customer payment data secure?',
      answer: 'Absolutely. We operate under strict PCI-DSS guidelines and SOC2 security standards. We never touch or store raw credit card numbers or sensitive customer credentials. We only analyze anonymized transaction metadata decline codes (e.g. soft decline vs hard decline, card expiration dates, retry attempt timestamps).'
    },
    {
      category: 'Gateway Compatibility',
      question: 'Which billing gateways and subscription management platforms do you support?',
      answer: 'We specialize in Stripe Billing, Chargebee, Paddle, Recurly, and Braintree. We also work with custom in-house subscription engines running on Postgres/MySQL billing queues.'
    },
    {
      category: 'ROI Guarantee',
      question: 'How does the 100% ROI Guarantee work?',
      answer: 'It is simple: if our Payment Recovery Audit does not identify at least 3x the audit cost in recoverable annual recurring revenue, we issue an immediate, no-questions-asked 100% refund.'
    },
    {
      category: 'Engineering Effort',
      question: 'How much developer bandwidth is required from our team?',
      answer: 'Minimal to zero. For most SaaS platforms, gateway retry logic and card updater settings can be updated directly within your Stripe or Chargebee admin settings. For custom magic-link dunning modals, we provide turnkey React components and webhook code snippets.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base">
            Everything you need to know about payment recovery, involuntary churn, and our advisory guarantee.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono font-bold text-blue-600 px-2.5 py-0.5 rounded bg-blue-50 border border-blue-100">
                      {faq.category}
                    </span>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-lg bg-slate-100 text-slate-500 transition-transform ${isOpen ? 'rotate-180 text-blue-600 bg-blue-50' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <div className="text-sm font-bold text-slate-900">Have a specific technical question?</div>
              <div className="text-xs text-slate-500">Ask Ashley Lalfam directly or schedule a 15-minute quick chat.</div>
            </div>
          </div>
          <a
            href="mailto:ashley@churnfix.com"
            className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold hover:bg-blue-100 transition-colors"
          >
            ashley@churnfix.com
          </a>
        </div>

      </div>
    </section>
  );
};
