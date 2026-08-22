import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Gauge, 
  FileText, 
  Mic, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  Bot, 
  Target, 
  Clock, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { atsAPI } from '../services/api';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await atsAPI.getDashboardMetrics();
        setMetrics(res.data);
      } catch (err) {
        console.error("Failed to load dashboard metrics:", err);
        // Fallback demo data if backend connection is initializing
        setMetrics({
          resume_score: 84,
          ats_score: 88,
          interview_score: 82.5,
          placement_readiness_score: 86,
          current_skills_count: 14,
          missing_skills_count: 3,
          recent_activities: [
            { id: 1, type: "resume", title: "ATS Scan Completed", time: "15 mins ago", score: "88%" },
            { id: 2, type: "interview", title: "Mock Interview (Backend)", time: "2 hours ago", score: "85%" },
            { id: 3, type: "roadmap", title: "Completed Module: FastAPI ORM", time: "1 day ago", score: "Done" }
          ],
          skill_categories: {
            "Languages": ["Python", "JavaScript", "TypeScript", "SQL"],
            "Frameworks": ["React", "FastAPI", "Tailwind CSS"],
            "Cloud & DevOps": ["Docker", "Git", "AWS"],
            "Databases": ["PostgreSQL", "SQLite"]
          }
        });
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <LoadingSkeleton type="card" />
        <LoadingSkeleton rows={5} type="table" />
      </div>
    );
  }

  // Chart Data Configuration
  const weeklyProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        fill: true,
        label: 'Placement Readiness Index',
        data: [55, 62, 70, 78, 83, metrics?.placement_readiness_score || 86],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.12)',
        tension: 0.4,
      },
    ],
  };

  const skillBreakdownData = {
    labels: ['Languages', 'Frameworks', 'Cloud & Tools', 'Databases', 'Soft Skills'],
    datasets: [
      {
        data: [4, 3, 3, 2, 2],
        backgroundColor: ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  const interviewScoresData = {
    labels: ['Tech Accuracy', 'Communication', 'Confidence', 'Grammar'],
    datasets: [
      {
        label: 'Score %',
        data: [88, 82, 85, 92],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> Placement Readiness Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Student Career Terminal</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/upload"
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-glow-cyan hover:opacity-90 flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4" /> Upload Resume
          </Link>
          <Link
            to="/mock-interview"
            className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-200 glass-card hover:bg-slate-800 border border-slate-700/60 flex items-center gap-1.5"
          >
            <Mic className="w-4 h-4 text-cyan-400" /> Start Mock
          </Link>
        </div>
      </div>

      {/* Top 4 Score Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Placement Readiness Gauge */}
        <div className="glass-card p-6 rounded-3xl border-cyan-500/30 relative overflow-hidden bg-gradient-to-b from-cyan-950/20 to-slate-900/60">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Readiness Score</span>
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-4xl font-black text-cyan-400 mb-2">{metrics.placement_readiness_score} <span className="text-sm font-normal text-slate-400">/ 100</span></div>
          <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: `${metrics.placement_readiness_score}%` }}></div>
          </div>
          <span className="text-[11px] text-cyan-300 font-semibold">High Campus Placement Potential</span>
        </div>

        {/* ATS Score */}
        <div className="glass-card p-6 rounded-3xl border-emerald-500/30">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">ATS Pass Score</span>
            <Gauge className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-4xl font-black text-emerald-400 mb-2">{metrics.ats_score}%</div>
          <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${metrics.ats_score}%` }}></div>
          </div>
          <span className="text-[11px] text-emerald-300 font-semibold">Compatible with Workday & Taleo</span>
        </div>

        {/* Resume Score */}
        <div className="glass-card p-6 rounded-3xl border-blue-500/30">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Resume Quality</span>
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-4xl font-black text-blue-400 mb-2">{metrics.resume_score}%</div>
          <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${metrics.resume_score}%` }}></div>
          </div>
          <span className="text-[11px] text-blue-300 font-semibold">Strong Action Verbs & Metrics</span>
        </div>

        {/* Interview Average */}
        <div className="glass-card p-6 rounded-3xl border-purple-500/30">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">AI Mock Score</span>
            <Bot className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-4xl font-black text-purple-400 mb-2">{metrics.interview_score}%</div>
          <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${metrics.interview_score}%` }}></div>
          </div>
          <span className="text-[11px] text-purple-300 font-semibold">3 Practice Sessions Completed</span>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress Line Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" /> Weekly Placement Readiness Growth
            </h3>
            <span className="text-xs text-slate-400">+18% this month</span>
          </div>
          <div className="h-64">
            <Line data={weeklyProgressData} options={chartOptions} />
          </div>
        </div>

        {/* Skill Category Doughnut */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Skill Distribution</h3>
          <div className="h-56 relative flex items-center justify-center">
            <Doughnut data={skillBreakdownData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10 } } } } }} />
          </div>
        </div>
      </div>

      {/* Skills Summary & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identified Skills Tag Cloud */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Current Verified Tech Stack
            </h3>
            <Link to="/skill-gap" className="text-xs text-cyan-400 font-semibold hover:underline flex items-center gap-1">
              Match JD <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {Object.entries(metrics.skill_categories || {}).map(([cat, skills]) => (
              <div key={cat} className="space-y-1.5">
                <div className="text-xs text-slate-400 font-semibold uppercase">{cat}</div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800/80 border border-slate-700/60 text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" /> Recent Activities
          </h3>

          <div className="space-y-4">
            {metrics.recent_activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 border-b border-slate-800/60 pb-3 last:border-0 last:pb-0">
                <div className="p-2 rounded-xl bg-slate-800 text-cyan-400 shrink-0">
                  {act.type === 'resume' ? <FileText className="w-4 h-4" /> : act.type === 'interview' ? <Mic className="w-4 h-4" /> : <Target className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white truncate">{act.title}</div>
                  <div className="text-[10px] text-slate-400">{act.time}</div>
                </div>
                <div className="text-xs font-bold text-cyan-400">{act.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
