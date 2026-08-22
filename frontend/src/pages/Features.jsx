import React from 'react';
import { Link } from 'react-router-dom';
import { UploadCloud, Gauge, Target, Bot, Mic, Map, ShieldAlert, BarChart3, FileJson, CheckCircle } from 'lucide-react';

export const Features = () => {
  const featuresList = [
    { icon: UploadCloud, title: "Multi-Format Resume Parser", desc: "Supports PDF & DOCX text extraction with automated JSON schema conversion." },
    { icon: Gauge, title: "ATS Score Scanner", desc: "0-100 ATS compatibility gauge with formatting, readability, & action verb metrics." },
    { icon: Target, title: "Job Description Matcher", desc: "Paste any JD to highlight matched skills, missing technical keywords, and match %." },
    { icon: Bot, title: "Custom AI Question Generator", desc: "Generates HR, Technical, System Design, and Coding questions for target company & role." },
    { icon: Mic, title: "AI Mock Interview Simulator", desc: "Evaluates typed answers in real-time for confidence, grammar, tech accuracy, & comms." },
    { icon: Map, title: "Personalized Learning Roadmap", desc: "Generates week-by-week study milestones targeting identified skill gaps." },
    { icon: BarChart3, title: "Placement Readiness Index", desc: "Synthesizes resume, ATS, interview scores, and GitHub presence into a single index." },
    { icon: FileJson, title: "Structured Data Extraction", desc: "Extracts personal info, projects, skills, education, and certificates into JSON." },
    { icon: ShieldAlert, title: "Campus Admin Analytics", desc: "Enables placement officers to track student stats, top skills, and login metrics." },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold text-white">Platform <span className="text-cyan-400">Features</span></h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          A comprehensive suite built to streamline every stage of your software engineering career preparation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuresList.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{f.desc}</p>
              </div>
              <div className="pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" /> Fully Integrated
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-6">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-glow-cyan hover:opacity-90 transition-opacity"
        >
          Get Started For Free
        </Link>
      </div>
    </div>
  );
};
