import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Building2, Zap } from 'lucide-react';

export const Pricing = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 text-xs font-semibold uppercase">
          Demo Pricing Options
        </span>
        <h1 className="text-4xl font-extrabold text-white">Simple & <span className="text-cyan-400">Transparent</span> Tiers</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          All core features are currently unlocked for demonstration purposes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Student Plan */}
        <div className="glass-card p-8 rounded-3xl border-slate-700/60 flex flex-col justify-between">
          <div>
            <div className="text-lg font-bold text-white mb-2">Student Basic</div>
            <p className="text-slate-400 text-xs mb-6">Essential tools for single resume scanning.</p>
            <div className="text-4xl font-extrabold text-white mb-6">$0 <span className="text-xs text-slate-400 font-normal">/ month</span></div>

            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> 3 Resume ATS Scans</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Basic Skill Gap Matching</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> 5 Mock Interview Questions</li>
            </ul>
          </div>
          <Link to="/register" className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-center font-bold text-sm text-slate-200">
            Sign Up Free
          </Link>
        </div>

        {/* Pro Placement Suite */}
        <div className="glass-card p-8 rounded-3xl border-cyan-500/40 relative flex flex-col justify-between bg-gradient-to-b from-cyan-950/20 to-slate-900/60 shadow-glow-cyan">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider">
            Most Popular
          </div>
          <div>
            <div className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              Pro Engineer <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            </div>
            <p className="text-slate-400 text-xs mb-6">Full placement readiness suite with AI Simulator.</p>
            <div className="text-4xl font-extrabold text-white mb-6">$19 <span className="text-xs text-slate-400 font-normal">/ month</span></div>

            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Unlimited Resume Uploads & ATS Reports</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Unlimited Job Description Skill Matching</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> AI Mock Interview Voice/Text Evaluator</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Personalized Weekly Learning Roadmap</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Placement Readiness Index Score</li>
            </ul>
          </div>
          <Link to="/register" className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-center font-bold text-sm text-white shadow-glow-cyan">
            Start Pro Trial
          </Link>
        </div>

        {/* Campus Enterprise */}
        <div className="glass-card p-8 rounded-3xl border-slate-700/60 flex flex-col justify-between">
          <div>
            <div className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              Campus Enterprise <Building2 className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-slate-400 text-xs mb-6">For Universities, Colleges, & Training Institutes.</p>
            <div className="text-4xl font-extrabold text-white mb-6">Custom</div>

            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Dedicated Placement Admin Portal</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Department-wide Skill Analytics</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Bulk Student Roster Management</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Custom LLM API Key Integration</li>
            </ul>
          </div>
          <Link to="/register" className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-center font-bold text-sm text-slate-200">
            Contact Placement Office
          </Link>
        </div>
      </div>
    </div>
  );
};
