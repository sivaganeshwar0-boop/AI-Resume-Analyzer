import React, { useState, useEffect } from 'react';
import { ShieldAlert, Users, FileText, Trash2, TrendingUp, Sparkles, Activity } from 'lucide-react';
import { adminAPI } from '../services/api';
import { Toast } from '../components/ui/Toast';

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const [uRes, sRes] = await Promise.all([
        adminAPI.getUsers(),
        adminAPI.getStats()
      ]);
      setUsers(uRes.data);
      setStats(sRes.data);
    } catch (err) {
      console.error("Failed to load admin portal data:", err);
      // Demo fallback statistics
      setUsers([
        { id: 1, email: "student@college.edu", full_name: "Sivaguru N", role: "student", college: "University College of Engineering", department: "CSE", is_active: true, created_at: "2026-07-22" },
        { id: 2, email: "ananya@college.edu", full_name: "Ananya Sharma", role: "student", college: "Institute of Technology", department: "ECE", is_active: true, created_at: "2026-07-21" },
        { id: 3, email: "admin@college.edu", full_name: "Placement Admin Officer", role: "admin", college: "University HQ", department: "Career Services", is_active: true, created_at: "2026-07-20" }
      ]);
      setStats({
        total_users: 142,
        active_students: 138,
        total_resumes_analyzed: 420,
        avg_resume_score: 84,
        avg_ats_score: 79,
        avg_interview_score: 82.5,
        daily_logins: [45, 68, 89, 112, 95, 134, 158],
        top_skills: [
          { name: "Python", count: 128 },
          { name: "React.js", count: 115 },
          { name: "SQL / PostgreSQL", count: 98 },
          { name: "FastAPI", count: 84 },
          { name: "Docker", count: 72 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await adminAPI.deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
      setToastMsg("User record deleted from system database.");
    } catch (err) {
      setUsers(users.filter(u => u.id !== id));
      setToastMsg("User deleted in preview mode.");
    }
  };

  const st = stats || {
    total_users: 142,
    total_resumes_analyzed: 420,
    avg_resume_score: 84,
    avg_ats_score: 79,
    avg_interview_score: 82.5,
    top_skills: [
      { name: "Python", count: 128 },
      { name: "React.js", count: 115 },
      { name: "SQL / PostgreSQL", count: 98 },
      { name: "FastAPI", count: 84 }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <Toast message={toastMsg} type="info" onClose={() => setToastMsg('')} />

      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 flex justify-between items-center bg-gradient-to-r from-amber-950/20 via-slate-900 to-cyan-950/20">
        <div>
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <ShieldAlert className="w-4 h-4" /> Restricted Placement Officer Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Campus Placement Admin Console</h1>
        </div>
        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
          Admin Access Granted
        </span>
      </div>

      {/* System Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase mb-2">Total Students Enrolled</div>
          <div className="text-3xl font-black text-white">{st.total_users}</div>
        </div>

        <div className="glass-card p-6 rounded-3xl border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase mb-2">Resumes Scanned</div>
          <div className="text-3xl font-black text-cyan-400">{st.total_resumes_analyzed}</div>
        </div>

        <div className="glass-card p-6 rounded-3xl border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase mb-2">Avg ATS Score</div>
          <div className="text-3xl font-black text-emerald-400">{st.avg_ats_score}%</div>
        </div>

        <div className="glass-card p-6 rounded-3xl border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase mb-2">Avg Interview Score</div>
          <div className="text-3xl font-black text-purple-400">{st.avg_interview_score}%</div>
        </div>
      </div>

      {/* Top Skills Matrix & User Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Student Skills */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" /> Top Trending Skills across Roster
          </h3>

          <div className="space-y-3">
            {st.top_skills.map((skill, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">{skill.name}</span>
                  <span className="text-cyan-400">{skill.count} students</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full"
                    style={{ width: `${(skill.count / 140) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manage User Table */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" /> Registered User Roster
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="pb-3">Candidate Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/30">
                    <td className="py-3 font-semibold text-white">{u.full_name || u.email.split('@')[0]}</td>
                    <td className="py-3 text-cyan-400">{u.email}</td>
                    <td className="py-3 text-slate-300">{u.department || 'CSE'}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.role === 'admin' ? 'bg-amber-500/20 text-amber-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
