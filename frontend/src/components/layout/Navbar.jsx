import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Sun, Moon, LogOut, User as UserIcon, LayoutDashboard, Menu, X, Rocket } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, darkMode, toggleDarkMode } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-glow-cyan text-white group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-600 dark:from-white dark:via-slate-100 dark:to-cyan-400 bg-clip-text text-transparent">
                Career<span className="text-cyan-600 dark:text-cyan-400">AI</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest text-cyan-600 dark:text-cyan-400/90 px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/40">
                Placement Suite
              </span>
            </div>
          </Link>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">About</Link>
            <Link to="/features" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Features</Link>
            <Link to="/pricing" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Pricing</Link>
            {user && (
              <Link to="/dashboard" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-cyan-600 dark:text-cyan-300 font-semibold">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
            )}
            {user && user.role === 'admin' && (
              <Link to="/admin" className="text-amber-600 dark:text-amber-400 hover:text-amber-500 font-semibold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30">
                Admin Panel
              </Link>
            )}
          </nav>

          {/* Action controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200 shadow-sm"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 hover:bg-slate-200 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700/60 transition-all"
                >
                  <UserIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{user.email.split('@')[0]}</span>
                </Link>
                <button
                  onClick={() => { logout(); navigate('/login'); }}
                  className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-glow-cyan transition-all duration-300 flex items-center gap-1.5"
                >
                  <Rocket className="w-4 h-4" /> Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-200">Home</Link>
          <Link to="/about" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-200">About</Link>
          <Link to="/features" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-200">Features</Link>
          <Link to="/pricing" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-200">Pricing</Link>
          {user && (
            <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block py-2 text-cyan-400 font-semibold">Dashboard</Link>
          )}
          {user ? (
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <Link to="/profile" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-slate-300">My Profile</Link>
              <button onClick={() => { logout(); setMobileOpen(false); }} className="text-sm font-medium text-rose-400">Logout</button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block w-full text-center py-2 text-sm font-semibold text-slate-200 bg-slate-800 rounded-lg">Sign In</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="block w-full text-center py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
