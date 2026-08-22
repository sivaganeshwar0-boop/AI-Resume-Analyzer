import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, GraduationCap, Github, Linkedin, Globe, Edit3, Award, FolderGit2, Check, X } from 'lucide-react';
import { profileAPI } from '../services/api';
import { Toast } from '../components/ui/Toast';

export const Profile = () => {
  const { profile, setProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || 'Sivaguru N',
    college: profile?.college || 'University College of Engineering',
    department: profile?.department || 'Computer Science & Engineering',
    year: profile?.year || '4th Year (Final)',
    phone: profile?.phone || '+91 9876543210',
    github_url: profile?.github_url || 'https://github.com/sivaguru',
    linkedin_url: profile?.linkedin_url || 'https://linkedin.com/in/sivaguru',
    portfolio_url: profile?.portfolio_url || 'https://sivaguru.dev',
  });
  const [toastMsg, setToastMsg] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await profileAPI.updateProfile(formData);
      setProfile(res.data);
      setToastMsg("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setToastMsg("Profile updated locally.");
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <Toast message={toastMsg} type="success" onClose={() => setToastMsg('')} />

      {/* Header Profile Card */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 shadow-glow-cyan">
            <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center font-black text-3xl text-cyan-400">
              {formData.full_name.charAt(0)}
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{formData.full_name}</h1>
            <p className="text-xs font-semibold text-cyan-400 flex items-center justify-center md:justify-start gap-1.5">
              <GraduationCap className="w-4 h-4" /> {formData.department} • {formData.year}
            </p>
            <p className="text-xs text-slate-400">{formData.college}</p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700/80 flex items-center gap-2"
        >
          <Edit3 className="w-4 h-4 text-cyan-400" /> Edit Profile Details
        </button>
      </div>

      {/* Social Links & Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact & Portfolio Links */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Profiles</h3>
          
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3 text-slate-300">
              <Phone className="w-4 h-4 text-cyan-400" /> {formData.phone}
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Github className="w-4 h-4 text-cyan-400" />
              <a href={formData.github_url} target="_blank" rel="noreferrer" className="hover:underline truncate">{formData.github_url}</a>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Linkedin className="w-4 h-4 text-cyan-400" />
              <a href={formData.linkedin_url} target="_blank" rel="noreferrer" className="hover:underline truncate">{formData.linkedin_url}</a>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Globe className="w-4 h-4 text-cyan-400" />
              <a href={formData.portfolio_url} target="_blank" rel="noreferrer" className="hover:underline truncate">{formData.portfolio_url}</a>
            </div>
          </div>
        </div>

        {/* Technical Competencies */}
        <div className="md:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Verified Engineering Skills</h3>
          <div className="flex flex-wrap gap-2">
            {["Python", "JavaScript", "TypeScript", "React.js", "FastAPI", "PostgreSQL", "SQLite", "Docker", "Tailwind CSS", "REST APIs", "Git & GitHub", "System Design"].map((sk) => (
              <span key={sk} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                {sk}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Projects & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Featured Projects */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-cyan-400" /> Featured Projects
          </h3>

          <div className="space-y-3">
            <div className="glass-card p-4 rounded-2xl space-y-1">
              <div className="text-sm font-bold text-white">AI Powered Resume Analyzer</div>
              <p className="text-xs text-slate-400">Full stack placement suite built with React and FastAPI.</p>
            </div>
            <div className="glass-card p-4 rounded-2xl space-y-1">
              <div className="text-sm font-bold text-white">High Throughput Cache Engine</div>
              <p className="text-xs text-slate-400">Multithreaded LRU cache in C++ with zero memory leaks.</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> Certifications & Credentials
          </h3>

          <div className="space-y-3">
            <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">AWS Certified Cloud Practitioner</div>
                <div className="text-xs text-slate-400">Amazon Web Services • Issued 2025</div>
              </div>
              <Award className="w-5 h-5 text-amber-400" />
            </div>

            <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">Meta Front-End Developer Professional</div>
                <div className="text-xs text-slate-400">Meta / Coursera • Issued 2025</div>
              </div>
              <Award className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 max-w-lg w-full space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Edit Academic & Social Profile</h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl glass-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">College</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-1/2 py-2.5 rounded-xl font-bold bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
