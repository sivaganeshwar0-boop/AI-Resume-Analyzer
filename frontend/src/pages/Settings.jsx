import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings as SettingsIcon, Sun, Moon, Key, Cpu, Shield, Bell } from 'lucide-react';
import { Toast } from '../components/ui/Toast';

export const Settings = () => {
  const { darkMode, toggleDarkMode } = useAuth();
  const [selectedModel, setSelectedModel] = useState('OpenAI GPT-4o-mini');
  const [apiKey, setApiKey] = useState('');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setToastMsg("Settings and AI Model preference updated!");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <Toast message={toastMsg} type="success" onClose={() => setToastMsg('')} />

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">System Settings & LLM Configuration</h1>
        <p className="text-slate-400 text-sm">
          Customize UI aesthetics, active AI model integrations, and security notification triggers.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Dark Mode Theme */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              {darkMode ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />} UI Theme Mode
            </div>
            <p className="text-xs text-slate-400">Switch between dark glassmorphism and modern light mode.</p>
          </div>
          <button
            type="button"
            onClick={toggleDarkMode}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${
              darkMode ? 'bg-cyan-600' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Pluggable LLM Selection */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" /> AI LLM Integration Provider
            </h3>
            <p className="text-xs text-slate-400">
              Select which AI provider powers your resume parser, ATS recommendations, and mock interview simulator.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'OpenAI GPT-4o-mini', name: 'OpenAI GPT-4o (Default)', badge: 'Active Cloud' },
              { id: 'Anthropic Claude 3.5', name: 'Anthropic Claude 3.5 Sonnet', badge: 'Pluggable API' },
              { id: 'Google Gemini 1.5 Pro', name: 'Google Gemini 1.5 Pro', badge: 'Pluggable API' },
              { id: 'Local Ollama Fallback', name: 'Local Offline NLP Engine', badge: 'Zero Config' },
            ].map((model) => (
              <div
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                  selectedModel === model.id
                    ? 'border-cyan-500 bg-cyan-950/30 text-white shadow-glow-cyan'
                    : 'border-slate-800 glass-card text-slate-300'
                }`}
              >
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span>{model.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                    {model.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-cyan-400" /> Custom API Key (Optional Override)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-proj-..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" /> Placement Scan Email Digest
            </div>
            <p className="text-xs text-slate-400">Receive weekly summary reports on skill gaps and readiness progress.</p>
          </div>
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={() => setEmailAlerts(!emailAlerts)}
            className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-glow-cyan text-sm"
        >
          Save Configuration Preferences
        </button>
      </form>
    </div>
  );
};
