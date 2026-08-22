import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  UploadCloud, 
  Gauge, 
  Bot, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Award,
  Users,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-grid-pattern">
      {/* Background Glows */}
      <div className="glow-orb-1 top-10 -left-20" />
      <div className="glow-orb-2 top-96 right-0" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-glow-cyan">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            Next-Gen Campus Placement Preparation Platform
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Land Your Dream Job <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              Faster & With AI Confidence
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 mb-10 leading-relaxed font-normal">
            Analyze your resume against ATS bots, identify critical skill gaps for target job descriptions, practice AI-evaluated mock interviews, and track your overall Placement Readiness Index.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/upload"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 shadow-glow-cyan transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-5 h-5" /> Upload Resume
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-slate-200 glass-panel hover:bg-slate-800/80 border border-slate-700/80 hover:border-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Try Live Demo <ArrowRight className="w-5 h-5 text-cyan-400" />
            </Link>
          </div>
        </motion.div>

        {/* Animated Platform Illustration Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto rounded-3xl p-4 sm:p-8 glass-panel border border-cyan-500/20 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            <div className="glass-card p-5 rounded-2xl border-emerald-500/20">
              <div className="text-xs text-slate-400 uppercase font-semibold mb-1">ATS Match Score</div>
              <div className="text-3xl font-extrabold text-emerald-400">92 / 100</div>
              <div className="mt-2 text-xs text-emerald-300/80 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Parsed cleanly by Workday & Greenhouse
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border-cyan-500/20">
              <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Placement Readiness</div>
              <div className="text-3xl font-extrabold text-cyan-400">88%</div>
              <div className="mt-2 text-xs text-cyan-300/80 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> High likelihood of campus shortlist
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border-blue-500/20">
              <div className="text-xs text-slate-400 uppercase font-semibold mb-1">AI Mock Interview</div>
              <div className="text-3xl font-extrabold text-blue-400">4.8 / 5.0</div>
              <div className="mt-2 text-xs text-blue-300/80 flex items-center gap-1">
                <Bot className="w-3.5 h-3.5" /> Strong technical answer structure
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border-purple-500/20">
              <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Skill Gaps Identified</div>
              <div className="text-3xl font-extrabold text-purple-400">2 Missing</div>
              <div className="mt-2 text-xs text-purple-300/80 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Docker & GraphQL added to roadmap
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Platform Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Everything You Need For <span className="text-cyan-400">Placement Success</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Not just a simple chatbot. A fully engineered software platform designed for computer science graduates and job seekers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-3xl relative">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
              <Gauge className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">ATS Compatibility Scanner</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Scans formatting, active action verbs, keyword density, and section layout to generate an exact 0-100 ATS readiness gauge.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Action verb extraction</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Single-page length check</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Strengths & Weaknesses breakdown</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-3xl relative">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Job Description Matcher</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Paste any JD from Google, Microsoft, or startups. Instantly compare your resume skills to find missing technical competencies.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Semantic skill comparison</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Priority missing skills list</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Direct learning roadmap links</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-3xl relative">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Mock Interview Simulator</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Practice role-specific technical and HR interview questions. Get real-time scoring on grammar, technical accuracy, and confidence.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Company & role customized</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Improved sample answers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Performance metrics radar</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 glass-panel border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-extrabold text-white mb-1">98%</div>
            <div className="text-xs text-cyan-400 uppercase tracking-wider font-semibold">ATS Shortlist Rate</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-white mb-1">3.2x</div>
            <div className="text-xs text-cyan-400 uppercase tracking-wider font-semibold">Faster Interview Prep</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-white mb-1">15,000+</div>
            <div className="text-xs text-cyan-400 uppercase tracking-wider font-semibold">Resumes Parsed</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-white mb-1">150+</div>
            <div className="text-xs text-cyan-400 uppercase tracking-wider font-semibold">Campus Partners</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white mb-3">Student Success Stories</h2>
          <p className="text-slate-400 text-sm">Hear how candidates landed full-time software engineering roles using CareerAI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              "The ATS report pointed out that my resume was missing key action verbs and contained multi-column tables that bots couldn't parse. Fixed it in 10 minutes and got 4 interview calls!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center border border-cyan-500/30">
                AS
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Ananya Sharma</div>
                <div className="text-xs text-slate-400">Software Engineer @ FinTech Corp</div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              "The AI mock interview simulator was unreal. It asked exact technical questions about FastAPI and System Design that came up in my actual Amazon interview round!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-300 font-bold flex items-center justify-center border border-blue-500/30">
                RV
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Rohan Verma</div>
                <div className="text-xs text-slate-400">Backend Intern @ CloudScale</div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              "Pasting the job description to get a list of missing skills allowed me to focus my preparation on Docker and Redis. The Placement Readiness score gave me total confidence."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center border border-indigo-500/30">
                PK
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Priya Patel</div>
                <div className="text-xs text-slate-400">Full Stack Developer @ HealthTech</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
