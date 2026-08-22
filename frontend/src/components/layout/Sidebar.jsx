import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UploadCloud, 
  FileSearch, 
  Gauge, 
  Target, 
  Bot, 
  Mic, 
  Map, 
  User, 
  Settings as SettingsIcon, 
  ShieldAlert 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/upload', label: 'Resume Upload', icon: UploadCloud },
    { to: '/analysis', label: 'Resume Analysis', icon: FileSearch },
    { to: '/ats-report', label: 'ATS Report', icon: Gauge },
    { to: '/skill-gap', label: 'Skill Gap Analysis', icon: Target },
    { to: '/interviews', label: 'Interview Assistant', icon: Bot },
    { to: '/mock-interview', label: 'Mock Interview', icon: Mic },
    { to: '/roadmap', label: 'Learning Roadmap', icon: Map },
    { to: '/profile', label: 'My Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  if (user && user.role === 'admin') {
    navItems.push({ to: '/admin', label: 'Admin Portal', icon: ShieldAlert, highlight: true });
  }

  return (
    <aside className="w-64 glass-panel border-r border-slate-200 dark:border-slate-800/80 min-h-[calc(100vh-4rem)] p-4 hidden md:block shrink-0">
      <div className="mb-4 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Platform Modules
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-50 dark:bg-gradient-to-r dark:from-cyan-500/20 dark:to-blue-600/20 text-cyan-600 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30 shadow-sm dark:shadow-glow-cyan font-semibold'
                    : item.highlight
                    ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
