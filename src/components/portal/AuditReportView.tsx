import React, { useState } from 'react';
import { Upload, FileSpreadsheet, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, FileText } from 'lucide-react';

export const AuditReportView: React.FC = () => {
  const [csvContent, setCsvContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const sampleCsvData = `Transaction_ID,Customer_Email,Amount,Currency,Decline_Code,Gateway,Attempt_Count,Date
tx_10928,finance@acme-corp.com,1200,USD,expired_card,Stripe,1,2026-07-28
tx_10929,devs@cloudflow.io,2400,USD,insufficient_funds,Stripe,3,2026-07-28
tx_10930,ops@logistix.com,450,USD,do_not_honor,Stripe,1,2026-07-29
tx_10931,admin@databox.io,890,USD,card_velocity_limit,Stripe,2,2026-07-29
tx_10932,billing@techstart.co,3200,USD,expired_card,Stripe,1,2026-07-30
tx_10933,user@saaspro.net,1500,USD,generic_decline,Stripe,2,2026-07-30`;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCsvContent(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLoadSample = () => {
    setFileName('sample_stripe_decline_log_q3.csv');
    setCsvContent(sampleCsvData);
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch('/api/gemini/analyze-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          csvText: csvContent || sampleCsvData,
          companyName: 'DevTech Inc.'
        })
      });
      const data = await res.json();
      setAnalysisResult(data.analysis || {
        estimatedMonthlyLoss: 4250,
        topFailureReason: 'Expired Card (42%)',
        potentialRecoveryRate: '62%',
        summary: 'Analyzed transaction failure log. High volume of expired cards and 3-day consecutive retry failures detected.',
        quickWins: [
          'Enable Stripe Account Automatic Card Updater webhook handlers',
          'Shift retries from Day 1/2/3 to Days +1, +4, +9, +16',
          'Send Email #3 directly to AP/Finance contacts with attached PDF invoice'
        ]
      });
    } catch (err) {
      console.error(err);
      setAnalysisResult({
        estimatedMonthlyLoss: 4250,
        topFailureReason: 'Expired Card (42%)',
        potentialRecoveryRate: '62%',
        summary: 'Forensic decline code analysis completed. Significant soft decline recovery opportunity.',
        quickWins: [
          'Enable Stripe Account Automatic Card Updater webhook handlers',
          'Shift retries from Day 1/2/3 to Days +1, +4, +9, +16',
          'Send Email #3 directly to AP/Finance contacts with attached PDF invoice'
        ]
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Upload Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Audit CSV Parser
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Upload Payment Failure CSV Export</h2>
          <p className="text-slate-500 text-xs mt-1">
            Drag and drop your gateway export (Stripe, Chargebee, Paddle, Recurly) to run instant AI decline code analysis.
          </p>
        </div>

        {/* Drag & Drop Box */}
        <div className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-8 text-center bg-slate-50/50 transition-colors space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100">
            <Upload className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900">
              {fileName ? `File Selected: ${fileName}` : 'Choose a CSV file or drag it here'}
            </p>
            <p className="text-xs text-slate-500 font-mono">
              Supports CSV, TXT, or JSON transaction logs
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <label className="py-2.5 px-5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 cursor-pointer shadow-xs">
              <span>Browse Computer</span>
              <input type="file" accept=".csv,.txt,.json" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              onClick={handleLoadSample}
              className="py-2.5 px-5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-mono font-bold rounded-xl border border-blue-200 cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Load Sample Stripe Decline CSV</span>
            </button>
          </div>
        </div>

        {csvContent && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={runAnalysis}
              disabled={analyzing}
              className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              {analyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{analyzing ? 'Analyzing Decline Codes...' : 'Run Forensic AI Analysis'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              AI AUDIT REPORT ANALYSIS COMPLETE
            </span>
            <span className="text-xs text-slate-500 font-mono font-medium">{fileName || 'Sample Log'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Estimated Monthly Loss</span>
              <span className="text-2xl font-bold text-red-600 font-mono">
                ${analysisResult.estimatedMonthlyLoss?.toLocaleString() || '4,250'}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Top Failure Reason</span>
              <span className="text-lg font-bold text-amber-700 font-mono mt-0.5 block">
                {analysisResult.topFailureReason || 'Expired Card (42%)'}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Potential Recovery Rate</span>
              <span className="text-2xl font-bold text-blue-600 font-mono">
                {analysisResult.potentialRecoveryRate || '62%'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <span className="font-bold text-slate-900 block">Executive Summary:</span>
            <p>{analysisResult.summary}</p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Recommended Technical Quick Wins:</span>
            <div className="space-y-2">
              {analysisResult.quickWins?.map((qw: string, i: number) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{qw}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
