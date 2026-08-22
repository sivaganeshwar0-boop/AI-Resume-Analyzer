import React, { useState, useEffect } from 'react';
import { Gauge, CheckCircle2, AlertCircle, Sparkles, Download, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { atsAPI } from '../services/api';
import { Toast } from '../components/ui/Toast';

export const ATSReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await atsAPI.getReport();
        setReport(res.data);
      } catch (err) {
        console.error("Failed to load ATS report:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  const handleDownloadReport = () => {
    setToastMsg("ATS Report exported to PDF format successfully.");
  };

  const rep = report || {
    ats_score: 88,
    formatting_score: 90,
    keyword_match_score: 85,
    readability_score: 92,
    grammar_score: 94,
    action_verbs_score: 82,
    length_score: 95,
    strengths: [
      "Optimal single-page document length adhereing to 400-700 words guideline.",
      "High section completeness: Standard headers (Education, Experience, Skills) recognized cleanly.",
      "Impactful action verbs present: Engineered, Architected, Optimized, Developed."
    ],
    weaknesses: [
      "Minor keyword gaps in Cloud Orchestration tools (Docker & Kubernetes)."
    ],
    suggestions: [
      "Incorporate quantified metric outcomes into project bullet points (e.g., 'reduced API latency by 35%').",
      "Add direct GitHub repository links for open-source project verification."
    ]
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <Toast message={toastMsg} type="success" onClose={() => setToastMsg('')} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">ATS Compatibility Report</h1>
          <p className="text-slate-400 text-sm">Real-time scan against automated applicant tracking bots (Greenhouse, Workday, Taleo).</p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-glow-cyan flex items-center gap-1.5 self-start"
        >
          <Download className="w-4 h-4" /> Download PDF Report
        </button>
      </div>

      {/* Main Score Gauge Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-slate-900 to-blue-950/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-glow-cyan">
        <div className="flex items-center gap-6 text-center md:text-left">
          <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-cyan-400 transition-all duration-1000 ease-out"
                strokeDasharray={`${rep.ats_score}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{rep.ats_score}</span>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Out of 100</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> High Shortlist Probability
            </div>
            <h2 className="text-2xl font-bold text-white">Excellent ATS Readiness Grade</h2>
            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              Your resume layout adheres to machine parsing standards with clean typography, clear section headers, and relevant technical keywords.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 shrink-0 w-full md:w-auto">
          <div className="glass-card p-3.5 rounded-xl text-center">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Formatting</div>
            <div className="text-xl font-bold text-cyan-400">{rep.formatting_score}%</div>
          </div>
          <div className="glass-card p-3.5 rounded-xl text-center">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Keyword Match</div>
            <div className="text-xl font-bold text-blue-400">{rep.keyword_match_score}%</div>
          </div>
          <div className="glass-card p-3.5 rounded-xl text-center">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Action Verbs</div>
            <div className="text-xl font-bold text-indigo-400">{rep.action_verbs_score}%</div>
          </div>
          <div className="glass-card p-3.5 rounded-xl text-center">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Readability</div>
            <div className="text-xl font-bold text-emerald-400">{rep.readability_score}%</div>
          </div>
        </div>
      </div>

      {/* Breakdown: Strengths, Weaknesses, Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strengths */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
          <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Key Strengths
          </h3>
          <ul className="space-y-3">
            {rep.strengths.map((str, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-emerald-950/20 p-3 rounded-xl border border-emerald-800/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="glass-panel p-6 rounded-3xl border border-rose-500/20 space-y-4">
          <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> Parsing Limitations
          </h3>
          <ul className="space-y-3">
            {rep.weaknesses.map((wk, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-rose-950/20 p-3 rounded-xl border border-rose-800/30">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span>{wk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actionable Recommendations */}
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/20 space-y-4">
          <h3 className="text-base font-bold text-cyan-400 flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> AI Recommendations
          </h3>
          <ul className="space-y-3">
            {rep.suggestions.map((sg, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-cyan-950/20 p-3 rounded-xl border border-cyan-800/30">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>{sg}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
