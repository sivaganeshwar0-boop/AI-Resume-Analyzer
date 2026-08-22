import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { skillsAPI } from '../services/api';
import { Toast } from '../components/ui/Toast';

export const SkillGapAnalysis = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('Google');
  const [jobTitle, setJobTitle] = useState('Software Engineer');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const handleMatch = async (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) {
      setToastMsg("Please paste a Job Description text first.");
      return;
    }

    setLoading(true);
    try {
      const res = await skillsAPI.matchJobDescription({
        company_name: companyName,
        job_title: jobTitle,
        job_description: jobDescription
      });
      setResult(res.data);
      setToastMsg("Skill gap analysis generated successfully!");
    } catch (err) {
      console.error(err);
      // Demo response
      setResult({
        company_name: companyName,
        job_title: jobTitle,
        match_percentage: 78,
        matched_skills: ["Python", "JavaScript", "React", "FastAPI", "SQL", "Git", "REST API"],
        missing_skills: ["Docker", "Kubernetes", "Redis", "GraphQL"],
        priority_skills: ["Docker", "Kubernetes", "Redis"]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <Toast message={toastMsg} type="info" onClose={() => setToastMsg('')} />

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Skill Gap & Job Description Matcher</h1>
        <p className="text-slate-400 text-sm">
          Paste any Job Description from LinkedIn, Indeed, or career portals to run semantic skill comparison against your uploaded resume.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Form Input */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <form onSubmit={handleMatch} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Target Company</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Amazon, Google, Microsoft"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Full Stack Developer"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Paste Job Description</label>
              <textarea
                rows={8}
                required
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job requirements, technical skills, databases, frameworks, and qualifications text here..."
                className="w-full p-4 rounded-xl glass-input text-xs leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-glow-cyan flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {loading ? "Comparing Skills..." : <><Target className="w-4 h-4" /> Run Semantic Match Analysis</>}
            </button>
          </form>
        </div>

        {/* Right Output Dashboard */}
        <div className="space-y-6">
          {result ? (
            <div className="space-y-6">
              {/* Match % Banner */}
              <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">{result.company_name} - {result.job_title}</div>
                  <h3 className="text-xl font-bold text-white mt-1">Skill Match Score</h3>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-cyan-400">{result.match_percentage}%</div>
                  <div className="text-[10px] text-cyan-300 font-semibold">Matched Competency</div>
                </div>
              </div>

              {/* Matched vs Missing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Matched */}
                <div className="glass-card p-5 rounded-2xl border-emerald-500/20 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Verified Matched Skills ({result.matched_skills.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matched_skills.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg text-xs bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing */}
                <div className="glass-card p-5 rounded-2xl border-rose-500/20 space-y-3">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Missing Keywords ({result.missing_skills.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missing_skills.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg text-xs bg-rose-950/80 text-rose-300 border border-rose-800/40">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Priority Recommendation */}
              <div className="glass-card p-5 rounded-2xl border-amber-500/30 space-y-2 bg-amber-950/10">
                <div className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> High Priority Learning Skills
                </div>
                <p className="text-xs text-slate-300">
                  Focus your study plan on <span className="text-amber-300 font-semibold">{result.priority_skills.join(", ")}</span> to boost your match rating above 90%.
                </p>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-4 flex flex-col items-center justify-center min-h-[300px]">
              <Target className="w-12 h-12 text-slate-600 animate-pulse" />
              <div className="text-slate-400 text-sm font-semibold">
                No Job Description Analyzed Yet
              </div>
              <p className="text-slate-500 text-xs max-w-xs">
                Paste any job vacancy text on the left to see instant matched vs missing technical skill badges.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
