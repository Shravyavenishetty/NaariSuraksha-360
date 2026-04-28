'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ShieldAlert, 
  Lock, 
  ArrowRight,
  Globe,
  Key,
  Shield,
  Zap,
  Smartphone,
  Verified
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Sub-components ──────────────────────────────────────────────────────────

const LogItem = ({ label, status }: { label: string; status: 'success' | 'error' | 'warning' }) => (
  <li className="flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 transition-colors">
    <span className="text-sm font-medium text-slate-700">{label}</span>
    {status === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-50" />}
    {status === 'error' && <XCircle className="w-5 h-5 text-rose-500 fill-rose-50" />}
    {status === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500 fill-amber-50" />}
  </li>
);

const AnalysisCard = ({ icon: Icon, title, desc, emoji }: any) => (
  <div className="flex gap-5 p-5 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-110 transition-transform">
      <span className="text-xl">{emoji}</span>
    </div>
    <div className="space-y-1">
      <p className="font-bold text-slate-900">{title}</p>
      <p className="text-[13px] text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function DigitalSafety() {
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setScore(9.2), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-20 font-['Manrope']">
      
      <main className="max-w-7xl mx-auto px-8 pt-24 space-y-16">
        
        {/* ── HERO & INPUT SECTION ────────────────────────────────── */}
        <section className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-tight">
              Secure Your Digital Presence
            </h1>
            <p className="text-slate-400 font-medium text-sm leading-relaxed">
              Check if your email or phone number has been compromised or exhibits suspicious patterns.
            </p>
          </div>

          <div className="w-full bg-white/70 backdrop-blur-2xl p-5 rounded-xl shadow-sm border border-white flex flex-col space-y-5">
            {/* Mode Toggle */}
            <div className="flex bg-slate-100 rounded-2xl p-1.5 self-center">
              <button 
                onClick={() => setMode('email')}
                className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  mode === 'email' ? 'bg-white shadow-sm text-[#00A8A8]' : 'text-slate-400 hover:text-[#00A8A8]'
                }`}
              >
                Email
              </button>
              <button 
                onClick={() => setMode('phone')}
                className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  mode === 'phone' ? 'bg-white shadow-sm text-[#00A8A8]' : 'text-slate-400 hover:text-[#00A8A8]'
                }`}
              >
                Phone Number
              </button>
            </div>

            {/* Input Field */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                {mode === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#00A8A8] transition-colors">
                  {mode === 'email' ? <Mail className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
                </div>
                <input 
                  type="text" 
                  placeholder={mode === 'email' ? 'example@safety.com' : '+91 XXXXX XXXXX'}
                  className="w-full h-16 pl-14 pr-6 bg-slate-50 border-0 focus:ring-4 focus:ring-[#00A8A8]/5 rounded-[1.5rem] text-sm font-bold text-slate-900 transition-all"
                />
              </div>
            </div>

            <button className="w-full bg-[#00A8A8] text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-[1.5rem] shadow-2xl shadow-[#00A8A8]/20 hover:bg-[#006a6a] active:scale-[0.98] transition-all">
              Check Safety
            </button>
          </div>
        </section>

        {/* ── RESULTS BENTO GRID ───────────────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Main Result Card */}
          <div className="lg:col-span-8 bg-white border border-teal-100 rounded-xl p-6 shadow-sm relative overflow-hidden group bg-gradient-to-br from-white to-teal-50/20">
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
              <ShieldCheck className="w-64 h-64 text-[#00A8A8]" />
            </div>
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#00A8A8] rounded-lg">
                  <Shield className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[9px] font-black text-[#00A8A8] uppercase tracking-[0.3em]">Safety Scan Complete</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-4">
                  <motion.h2 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-black text-[#00A8A8] tracking-tighter"
                  >
                    {score.toFixed(1)}
                  </motion.h2>
                  <span className="text-3xl font-black text-slate-200">/ 10</span>
                </div>
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-emerald-50 text-emerald-600 rounded-full font-black text-[10px] uppercase tracking-widest border border-emerald-100 shadow-sm">
                  <CheckCircle className="w-4 h-4" /> LOW RISK
                </div>
              </div>

              <div className="pt-6 space-y-2">
                <p className="text-3xl font-black text-slate-900 tracking-tight">
                  Your digital footprint is <span className="text-[#00A8A8]">likely safe</span>.
                </p>
                <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">
                  No active compromises or malicious associations found for this identity in our security databases.
                </p>
              </div>
            </div>
          </div>

          {/* Validation Logs */}
          <div className="lg:col-span-4 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-50 space-y-6">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Validation Logs</h3>
            <ul className="space-y-1">
              <LogItem label="Format Valid" status="success" />
              <LogItem label="Domain Exists" status="success" />
              <LogItem label="Disposable Email" status="error" />
              <LogItem label="Suspicious Pattern" status="warning" />
              <LogItem label="SMTP Reachable" status="success" />
            </ul>
          </div>

          {/* Deep Risk Analysis */}
          <div className="lg:col-span-6 bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-50 space-y-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Deep Risk Analysis</h3>
            <div className="space-y-4">
              <AnalysisCard 
                emoji="🌐" title="Domain Reputation" 
                desc="Email uses a highly reputable domain with strict security protocols and high trust score." 
              />
              <AnalysisCard 
                emoji="🔐" title="Breach History" 
                desc="No known data breaches found in global security databases for this specific entry." 
              />
            </div>
          </div>

          {/* Proactive Measures */}
          <div className="lg:col-span-6 bg-[#1b2a49] text-white rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden flex flex-col justify-center">
            <div className="absolute -bottom-10 -right-10 text-white/5">
              <Lock className="w-64 h-64" />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#00A8A8] rounded-2xl shadow-xl shadow-[#00A8A8]/20">
                  <Verified className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-[#79F6F5] tracking-tight">Proactive Measures</h3>
              </div>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#00A8A8]/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#79F6F5]" />
                  </div>
                  <p className="text-slate-300 font-medium leading-relaxed">Always verify sender identity before clicking links or downloading attachments.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#00A8A8]/20 flex items-center justify-center shrink-0 mt-1">
                    <Key className="w-3.5 h-3.5 text-[#79F6F5]" />
                  </div>
                  <p className="text-slate-300 font-medium leading-relaxed">Enable two-factor authentication (2FA) on all critical platforms and use a password manager.</p>
                </li>
              </ul>

              <button className="inline-flex items-center gap-3 px-8 py-4 bg-[#00A8A8] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#006a6a] transition-all group shadow-xl shadow-[#00A8A8]/20">
                Learn Digital Defense
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </main>

    </div>
  );
}
