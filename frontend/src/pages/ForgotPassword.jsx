import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { authAPI } from '../services/api';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400">
          <ArrowLeft className="w-4 h-4" /> Back to Sign In
        </Link>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Reset Password</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Enter your academic email address. We will dispatch a secure one-time reset token link.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-cyan-400 mx-auto" />
            <h4 className="font-bold text-white text-sm">Verification Link Sent!</h4>
            <p className="text-xs text-slate-300">
              We have dispatched a verification email to <span className="text-cyan-400 font-medium">{email}</span>. Check your inbox or spam folder.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Registered Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-glow-cyan text-sm disabled:opacity-50"
            >
              {loading ? "Sending..." : "Dispatch Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
