import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Code2, Users, Briefcase, Cpu, ArrowRight, Sparkles } from 'lucide-react';
import { interviewAPI } from '../services/api';

export const InterviewAssistant = () => {
  const [company, setCompany] = useState('Google');
  const [role, setRole] = useState('Full Stack Software Engineer');
  const [experienceLevel, setExperienceLevel] = useState('Entry Level (0-2 Yrs)');
  const [loading, setLoading] = useState(false);
  const [questionsData, setQuestionsData] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await interviewAPI.generateQuestions({
        company,
        role,
        experience_level: experienceLevel
      });
      setQuestionsData(res.data);
    } catch (err) {
      console.error(err);
      // Demo response
      setQuestionsData({
        company,
        role,
        experience_level: experienceLevel,
        questions: {
          technical: [
            `Explain how you would design a high-throughput API gateway for ${company}'s ${role} platform.`,
            `How do you handle database connection pooling and asynchronous queries in Python / FastAPI?`,
            `Describe how virtual DOM reconciliation works in React 18.`
          ],
          hr: [
            `Why do you specifically want to join ${company} as a ${role}?`,
            `Tell me about a time you handled a tight project deadline under pressure.`
          ],
          behavioral: [
            `Describe a situation where you had a technical disagreement with a teammate. How did you resolve it?`
          ],
          project: [
            `Walk me through the architecture of your top full-stack project. What trade-offs did you make?`
          ],
          coding: [
            `Implement a thread-safe LRU Cache with O(1) time complexity.`,
            `Find the maximum subarray sum (Kadane's Algorithm).`
          ]
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">AI Interview Question Generator</h1>
        <p className="text-slate-400 text-sm">
          Select target company, job title, and experience level to generate tailored interview questions across 5 core categories.
        </p>
      </div>

      {/* Selector Form */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Target Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Job Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Experience Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
            >
              <option value="Entry Level (0-2 Yrs)">Entry Level (0-2 Yrs)</option>
              <option value="Mid Level (2-5 Yrs)">Mid Level (2-5 Yrs)</option>
              <option value="Senior Level (5+ Yrs)">Senior Level (5+ Yrs)</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-glow-cyan text-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {loading ? "Generating..." : <><Bot className="w-4 h-4" /> Generate Questions</>}
            </button>
          </div>
        </form>
      </div>

      {/* Generated Categories Grid */}
      {questionsData && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">
              Generated Questions for <span className="text-cyan-400">{questionsData.company}</span> ({questionsData.role})
            </h3>
            <Link
              to="/mock-interview"
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center gap-1"
            >
              Practice in AI Mock Simulator <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical Questions */}
            <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 space-y-3">
              <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Technical & System Design Questions
              </h4>
              <ul className="space-y-2">
                {questionsData.questions.technical.map((q, idx) => (
                  <li key={idx} className="glass-card p-3 rounded-xl text-xs text-slate-200 border-slate-800">
                    <span className="text-cyan-400 font-bold mr-1 font-mono">Q{idx + 1}.</span> {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* HR Questions */}
            <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-3">
              <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4" /> HR & Motivational Questions
              </h4>
              <ul className="space-y-2">
                {questionsData.questions.hr.map((q, idx) => (
                  <li key={idx} className="glass-card p-3 rounded-xl text-xs text-slate-200 border-slate-800">
                    <span className="text-cyan-400 font-bold mr-1 font-mono">Q{idx + 1}.</span> {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Project & Deep Dives */}
            <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 space-y-3">
              <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Project Architecture Questions
              </h4>
              <ul className="space-y-2">
                {questionsData.questions.project.map((q, idx) => (
                  <li key={idx} className="glass-card p-3 rounded-xl text-xs text-slate-200 border-slate-800">
                    <span className="text-indigo-400 font-bold mr-1 font-mono">Q{idx + 1}.</span> {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Coding Challenge */}
            <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 space-y-3">
              <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Algorithmic Coding Challenge
              </h4>
              <ul className="space-y-2">
                {questionsData.questions.coding.map((q, idx) => (
                  <li key={idx} className="glass-card p-3 rounded-xl text-xs text-slate-200 border-slate-800">
                    <span className="text-purple-400 font-bold mr-1 font-mono">Q{idx + 1}.</span> {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
