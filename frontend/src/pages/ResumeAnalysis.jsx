import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileJson, User, GraduationCap, Briefcase, FolderGit2, Award, Globe, Code, ArrowRight } from 'lucide-react';
import { resumeAPI } from '../services/api';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';

export const ResumeAnalysis = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rawView, setRawView] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await resumeAPI.getLatest();
        setAnalysisData(res.data);
      } catch (err) {
        console.error("Failed to load parsed analysis:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, []);

  if (loading) return <div className="max-w-5xl mx-auto p-6"><LoadingSkeleton rows={6} type="table" /></div>;

  const parsed = analysisData?.parsed_data || {
    name: "Sivaguru N",
    email: "student@college.edu",
    phone: "+91 9876543210",
    education: [{ institute: "University College of Engineering", degree: "B.Tech Computer Science", year: "2022-2026", grade: "8.8 CGPA" }],
    projects: [
      { title: "AI Powered Resume Analyzer", description: "Full stack preparation suite built with React and FastAPI.", tech_stack: ["React", "FastAPI", "PostgreSQL", "Tailwind CSS"] },
      { title: "Distributed Cache System", description: "High-performance LRU cache implementation in C++.", tech_stack: ["C++", "Multithreading", "Data Structures"] }
    ],
    skills: {
      "languages": ["Python", "JavaScript", "TypeScript", "C++", "SQL"],
      "frameworks": ["React", "FastAPI", "Node.js", "Express", "Tailwind CSS"],
      "cloud": ["Docker", "AWS", "Git"],
      "databases": ["PostgreSQL", "SQLite", "Redis"]
    },
    experience: [{ company: "Tech Global Inc", role: "Software Developer Intern", duration: "May 2025 - Jul 2025", description: "Built REST API endpoints processing 50k requests/day." }],
    achievements: ["National Hackathon Top 5 Rank", "Solved 350+ LeetCode problems"],
    certificates: ["AWS Certified Cloud Practitioner"],
    languages: ["English", "Hindi", "Tamil"]
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Parsed Resume Breakdown</h1>
          <p className="text-slate-400 text-sm">Structured JSON objects extracted by AI Parser Engine.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRawView(!rawView)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 glass-card hover:bg-slate-800 border border-slate-700/60 flex items-center gap-1.5"
          >
            <FileJson className="w-4 h-4 text-cyan-400" /> {rawView ? "Visual Cards View" : "Raw JSON View"}
          </button>
          <Link
            to="/ats-report"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-glow-cyan flex items-center gap-1.5"
          >
            View ATS Score <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {rawView ? (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
          <pre>{JSON.stringify(parsed, null, 2)}</pre>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Candidate Bio Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-lg">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{parsed.name}</h3>
                <p className="text-xs text-cyan-400">{parsed.email}</p>
                <p className="text-xs text-slate-400">{parsed.phone}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase">Languages Spoken</div>
              <div className="flex flex-wrap gap-1.5">
                {(parsed.languages || []).map((l, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-slate-300">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Skills Extracted */}
          <div className="md:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-cyan-400" /> Extracted Technical Categorization
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(parsed.skills || {}).map(([cat, items]) => (
                <div key={cat} className="glass-card p-4 rounded-2xl border-slate-800">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-2">{cat}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.isArray(items) && items.map((item, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Experience Grid */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-400" /> Education History
              </h3>
              {(parsed.education || []).map((edu, idx) => (
                <div key={idx} className="glass-card p-4 rounded-2xl">
                  <div className="text-sm font-bold text-white">{edu.degree}</div>
                  <div className="text-xs text-cyan-400">{edu.institute}</div>
                  <div className="text-xs text-slate-400 mt-1">{edu.year} | Grade: {edu.grade}</div>
                </div>
              ))}
            </div>

            {/* Work Experience */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" /> Professional Experience
              </h3>
              {(parsed.experience || []).map((exp, idx) => (
                <div key={idx} className="glass-card p-4 rounded-2xl space-y-1">
                  <div className="text-sm font-bold text-white">{exp.role}</div>
                  <div className="text-xs text-cyan-400">{exp.company} ({exp.duration})</div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="md:col-span-3 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-purple-400" /> Technical Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(parsed.projects || []).map((proj, idx) => (
                <div key={idx} className="glass-card p-4 rounded-2xl space-y-2">
                  <div className="text-sm font-bold text-white">{proj.title}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 pt-2">
                    {(proj.tech_stack || []).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
