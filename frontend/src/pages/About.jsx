import React from 'react';
import { ShieldCheck, Cpu, Code2, Database, Layers, Sparkles } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          Software Architecture & Engineering
        </span>
        <h1 className="text-4xl font-extrabold text-white">About <span className="text-cyan-400">CareerAI</span></h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-sm leading-relaxed">
          CareerAI is an enterprise-grade placement preparation suite engineered with Python FastAPI, React, PostgreSQL, and LLM integrations. Designed to provide transparent ATS evaluation and actionable career guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Pluggable LLM Architecture</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Designed around an abstract <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">AIService</code> interface. OpenAI GPT-4o models serve as the primary provider with automatic fallback heuristics if offline.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Dual Database Engine</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Full support for PostgreSQL in production and zero-config SQLite async during local development via SQLAlchemy 2.0 ORM.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Enterprise Security</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Passwords hashed with salted Bcrypt. Requests authenticated with standard OAuth2 JWT bearer tokens. Strict input and file validation defenses enforced.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Clean Architecture Principles</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Strict separation of concerns across Controllers/Routers, Domain Services, Data Repositories, Pydantic Schemas, and React Components following SOLID principles.
          </p>
        </div>
      </div>
    </div>
  );
};
