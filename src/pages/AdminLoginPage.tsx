import React, { useState } from 'react';
import { Lock, Key, ArrowLeft, ArrowRight, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { verifyAdminPassword } from '../utils/auth';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess, onBackToHome }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError('');

    try {
      const isValid = await verifyAdminPassword(password);
      if (isValid) {
        onSuccess();
      } else {
        setError('Incorrect passcode. Please verify credentials.');
      }
    } catch {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-cream flex flex-col justify-between selection:bg-beacon selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-beacon/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-beacon to-transparent" />

      {/* Top Navbar */}
      <header className="px-6 sm:px-12 py-6 flex items-center justify-between border-b border-white/10 relative z-10 backdrop-blur-md bg-black/30">
        <div className="flex items-center gap-3">
          <img
            src="/assets/lighthouse_monogram.svg"
            alt="Dolapo Olutoye Monogram"
            className="w-7 h-7 filter invert opacity-90"
          />
          <span className="font-serif text-lg tracking-tight text-white font-medium">
            Dolapo Olutoye
          </span>
          <span className="text-white/20">·</span>
          <span className="font-mono text-xs text-beacon uppercase tracking-wider font-semibold">
            Editorial Studio
          </span>
        </div>

        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-accent hover:text-beacon transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Website</span>
        </button>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-surface/90 border border-surface-border shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          
          {/* Subtle Top Glow */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-beacon/20 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-beacon/10 border border-beacon/30 flex items-center justify-center mx-auto mb-4 text-beacon shadow-lg shadow-beacon/10">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-2">
              Admin Authentication
            </h1>
            <p className="text-xs sm:text-sm text-stone-accent leading-relaxed">
              Enter your encrypted passcode to access the thought leadership CMS, publish essays, and manage live articles.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-accent mb-2">
                Master Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter passcode"
                  className="w-full bg-surface-elevated border border-surface-border focus:border-beacon rounded-xl px-4 py-3 text-sm text-cream placeholder:text-stone-accent/60 outline-none transition-colors pr-10 font-mono tracking-wider"
                />
                <Key className="w-4 h-4 text-stone-accent absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-beacon hover:bg-beacon-light text-black font-semibold text-xs sm:text-sm font-mono uppercase tracking-widest btn-press shadow-xl shadow-beacon/25 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Unlock Editorial Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-white/10 text-center">
            <p className="text-[11px] font-mono text-stone-driftwood">
              Protected via SHA-256 Web Cryptography
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-5 text-center border-t border-white/10 text-xs font-mono text-stone-driftwood relative z-10">
        <span>The Dolapo Olutoye Editorial CMS // Secure Port</span>
      </footer>
    </div>
  );
};
