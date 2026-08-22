import React, { useState, useEffect } from 'react';
import { Map, CheckCircle2, Circle, Sparkles, BookOpen, Layers } from 'lucide-react';
import { roadmapAPI } from '../services/api';
import { Toast } from '../components/ui/Toast';

export const LearningRoadmap = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await roadmapAPI.getCurrent();
        setRoadmap(res.data);
      } catch (err) {
        console.error("Failed to fetch roadmap:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, []);

  const rm = roadmap || {
    title: "Personalized Placement Preparation Roadmap",
    target_role: "Full Stack Engineer",
    progress_percentage: 33,
    weekly_modules: [
      { week: 1, title: "Advanced Data Structures & Algorithms", topics: ["Arrays & HashMaps", "Binary Search & Dynamic Programming", "Two Pointers"], completed: true },
      { week: 2, title: "Backend API Engineering & Database ORM", topics: ["FastAPI & Pydantic Validation", "SQLAlchemy Async & Postgres", "JWT Auth Middleware"], completed: true },
      { week: 3, title: "Database Optimization & SQL Mastery", topics: ["PostgreSQL Indexing & Execution Plans", "Redis Cache Invalidation", "Asyncpg Driver Tuning"], completed: false },
      { week: 4, title: "Modern Frontend Architecture & State", topics: ["React 18 & Custom Hooks", "Tailwind CSS & Glassmorphism", "State Optimization"], completed: false },
      { week: 5, title: "Containerization & Cloud Infrastructure", topics: ["Docker multi-stage builds", "AWS EC2 & S3 Deployment", "CI/CD GitHub Actions"], completed: false },
      { week: 6, title: "System Design & Campus Mock Interviews", topics: ["Load Balancers & Rate Limiting", "Mock Technical Rounds", "Portfolio & Resume Polish"], completed: false }
    ]
  };

  const toggleModule = (idx) => {
    const updated = { ...rm };
    updated.weekly_modules[idx].completed = !updated.weekly_modules[idx].completed;
    const completedCnt = updated.weekly_modules.filter(m => m.completed).length;
    updated.progress_percentage = Math.round((completedCnt / updated.weekly_modules.length) * 100);
    setRoadmap(updated);
    setToastMsg("Roadmap progress updated!");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <Toast message={toastMsg} type="info" onClose={() => setToastMsg('')} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Map className="w-4 h-4" /> AI Generated Learning Timeline
          </div>
          <h1 className="text-2xl font-extrabold text-white">{rm.title}</h1>
          <p className="text-xs text-slate-400 mt-1">Targeting: <span className="text-cyan-300 font-semibold">{rm.target_role}</span></p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-3xl font-black text-cyan-400">{rm.progress_percentage}%</div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Curriculum Complete</div>
        </div>
      </div>

      {/* Week Timeline Cards */}
      <div className="space-y-4">
        {rm.weekly_modules.map((mod, idx) => (
          <div
            key={idx}
            className={`glass-panel p-6 rounded-3xl border transition-all duration-200 ${
              mod.completed ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-slate-800 hover:border-cyan-500/30'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleModule(idx)}
                  className="mt-1 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {mod.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-600" />
                  )}
                </button>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
                      Week {mod.week}
                    </span>
                    <h3 className={`text-base font-bold ${mod.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                      {mod.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {mod.topics.map((t, i) => (
                      <span key={i} className="px-3 py-1 rounded-xl text-xs bg-slate-800/80 text-slate-300 border border-slate-700/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
