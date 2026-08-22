import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-[#090d16] text-slate-600 dark:text-slate-400 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">Career<span className="text-cyan-600 dark:text-cyan-400">AI</span></span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            An end-to-end placement preparation platform that helps computer science students analyze resumes, optimize ATS compatibility, practice AI mock interviews, and land tech jobs faster.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"><Twitter className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Platform Modules</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/upload" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Resume Upload & Parser</Link></li>
            <li><Link to="/ats-report" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">ATS Compatibility Scanner</Link></li>
            <li><Link to="/skill-gap" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Skill Gap Job Matcher</Link></li>
            <li><Link to="/interviews" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">AI Question Generator</Link></li>
            <li><Link to="/mock-interview" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">AI Mock Interview Simulator</Link></li>
            <li><Link to="/roadmap" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Personalized Roadmap</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Software Engineering</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#diagrams" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">System Architecture</a></li>
            <li><a href="#er-diagram" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Database ER Schema</a></li>
            <li><a href="#usecase" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Use Case Specifications</a></li>
            <li><a href="#security" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">JWT Security & OAuth2</a></li>
            <li><a href="#api" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">REST API Documentation</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Contact & Support</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> support@careerai.edu
          </p>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold block mb-1">Campus Placement Mode</span>
            <span>Supporting 150+ Partner Universities & Colleges</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <p>&copy; 2026 CareerAI. All software engineering principles & open-source design standards preserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link to="/about" className="hover:text-slate-800 dark:hover:text-slate-300">Privacy Policy</Link>
          <Link to="/about" className="hover:text-slate-800 dark:hover:text-slate-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
