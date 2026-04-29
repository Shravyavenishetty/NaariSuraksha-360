'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Mail,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lock,
  ArrowRight,
  Key,
  Shield,
  Smartphone,
  Verified,
  ShieldAlert,
} from 'lucide-react';
import { motion } from 'framer-motion';

// ─── Sub-components ──────────────────────────────────────────────────────────

const MetricBar = ({ label, value, color, level }: { label: string; value: string; color: string; level: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
      <span className="text-slate-400">{label}</span>
      <span className={color}>{level}</span>
    </div>
    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: value }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={`h-full ${color.replace('text-', 'bg-')} rounded-full`}
      />
    </div>
  </div>
);

const SignalCard = ({ icon: Icon, title, desc, tag, color, border, bgColor, tagColor }: any) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className={`bg-white rounded-2xl p-4 flex gap-4 items-start shadow-[0_10px_40px_rgba(0,0,0,0.03)] border ${border} ${color} transition-all duration-300 group`}
  >
    <div className={`p-3 ${bgColor} ${tagColor} rounded-lg`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <span className={`inline-block ${tagColor.replace('text-', 'bg-')} text-white text-[9px] font-black px-2 py-0.5 rounded-full mb-1 uppercase tracking-widest`}>
        {tag}
      </span>
      <h4 className="text-sm font-bold text-slate-900">{title}</h4>
      <p className="text-[11px] text-slate-400 font-medium mt-1 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

import axios from 'axios';

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function DigitalSafety() {
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);

  const handleScan = async () => {
    if (!inputValue.trim()) return;
    setLoading(true);
    try {
      const endpoint = mode === 'email' ? 'validate-email' : 'validate-phone';
      const payload = mode === 'email' ? { email: inputValue } : { phone: inputValue };
      
      const response = await axios.post(`http://localhost:5000/api/digital/${endpoint}`, payload);
      setValidationResult(response.data);
      setScore(response.data.score ?? 0);
    } catch (error) {
      console.error('Validation error:', error);
      setScore(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Component mounted - no initial mock scan anymore
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-20">

      <main className="max-w-7xl mx-auto px-8 pt-16 space-y-12">

        {/* ── CENTRAL INPUT AREA ───────────────────────────────────── */}
        <section className="max-w-2xl mx-auto text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-tight">
              Digital Safety Scanner
            </h1>
            <p className="text-slate-400 font-medium text-sm leading-relaxed px-4">
              Check if your email or phone has been compromised or exhibits suspicious patterns.
            </p>
          </div>

          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-300">
              {mode === 'email' ? <Mail className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleScan()}
              placeholder={mode === 'email' ? 'Enter email address...' : 'Enter phone number...'}
              className="w-full h-16 pl-14 pr-44 bg-white border-0 rounded-[2rem] focus:ring-4 focus:ring-[#00A8A8]/5 transition-all shadow-[0_8px_30px_rgba(27,42,73,0.06)] font-bold text-slate-900"
            />
            <div className="absolute inset-y-2 right-2 flex items-center gap-2">
              <button
                onClick={() => setMode(mode === 'email' ? 'phone' : 'email')}
                className="h-full px-5 text-[#00A8A8] hover:bg-[#00A8A8]/5 rounded-2xl transition-colors active:scale-95 text-[10px] font-black uppercase tracking-[0.2em]"
              >
                {mode === 'email' ? 'Phone' : 'Email'}
              </button>
              <button 
                onClick={handleScan}
                disabled={loading}
                className="h-full px-8 bg-[#00A8A8] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#006a6a] transition-all active:scale-95 shadow-xl shadow-[#00A8A8]/20 disabled:opacity-50"
              >
                {loading ? 'Scanning...' : 'Scan'}
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT COLUMN: RESULT OVERVIEW ─────────────────────────── */}
          <div className="lg:col-span-8 space-y-8">

            {/* Main Score Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-50 shadow-sm flex flex-col md:flex-row items-center gap-8 group">
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="58" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                  <motion.circle
                    cx="64" cy="64" r="58" fill="none" stroke={score > 8 ? "#00A8A8" : score > 5 ? "#F59E0B" : "#EF4444"} strokeWidth="8"
                    strokeDasharray={364}
                    initial={{ strokeDashoffset: 364 }}
                    animate={{ strokeDashoffset: 364 - (score / 10) * 364 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-slate-900 tracking-tighter">{(score || 0).toFixed(1)}</span>
                  <span className={`text-[8px] font-black mt-0.5 uppercase tracking-[0.2em] ${score > 8 ? "text-[#00A8A8]" : "text-amber-500"}`}>
                    {score > 8 ? "Secure" : score > 5 ? "Warn" : "Risk"}
                  </span>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-2">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Digital Profile</h2>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 ${score > 5 ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"} rounded-full text-[9px] font-black uppercase tracking-widest border`}>
                      {score > 5 ? "Verified Safe" : "Risk Detected"}
                    </span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Checked just now</span>
                  </div>
                </div>
                <p className="text-slate-500 font-medium text-[15px] leading-relaxed">
                  {validationResult?.message || "Scan an email or phone number to see detailed digital safety insights and breach history."}
                </p>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-50 rounded-xl">
                  <Verified className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Based on real-time breach databases</span>
                </div>
              </div>
            </div>

            {/* Breach / Risk Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F0FDF4] rounded-3xl p-8 border border-green-100 shadow-[0_10px_40px_rgba(34,197,94,0.03)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500 rounded-lg text-white">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-green-900 uppercase tracking-widest">Breach Status</span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className={`text-4xl font-black ${score > 7 ? "text-green-600" : "text-rose-600"}`}>
                    {score > 7 ? "Clean" : score > 5 ? "Warn" : "Breach"}
                  </span>
                </div>
                <p className="text-[13px] text-green-800/60 font-medium leading-relaxed">
                  {score > 7 ? "No data leaks found in major global breach databases." : "Potential exposure detected in third-party records."}
                </p>
              </div>

              <div className="bg-[#0B1C30] rounded-3xl p-8 border border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-400 rounded-lg text-white">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-slate-100 uppercase tracking-widest">Risk Factor</span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className={`text-4xl font-black ${score > 7 ? "text-emerald-400" : score > 5 ? "text-amber-400" : "text-rose-400"}`}>
                    {score ? (10 - score).toFixed(1) : "0.0"}
                  </span>
                  <span className="text-slate-500 text-sm font-bold">/ 10</span>
                </div>
                <p className="text-[13px] text-slate-400 font-medium leading-relaxed">
                  {score > 7 ? "Minimal exposure detected. Digital footprint is secure." : "Increased risk profile due to validation irregularities."}
                </p>
              </div>
            </div>

            {/* Dark Recommendations */}
            <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -right-8 -top-8 opacity-5">
                <Lock className="w-48 h-48" />
              </div>
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#00A8A8] rounded-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-[10px] font-black text-[#00A8A8] uppercase tracking-[0.2em]">Security Protocol</h3>
                </div>
                <p className="text-[15px] font-medium text-slate-300 leading-relaxed italic">
                  "Enable two-factor authentication on all critical accounts. Use a password manager and rotate credentials every 90 days to maintain a clean digital profile."
                </p>
                <button className="w-full bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-2xl transition-all border border-white/10">
                  Read Full Security Guide
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: SIGNALS ────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-8">

            {/* Metric Breakdown */}
            <div className="bg-white rounded-3xl p-8 border border-slate-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] space-y-8">
              <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Validation Integrity</h3>
              <div className="space-y-6">
                <MetricBar 
                  label="Format Accuracy" 
                  value={validationResult?.checks?.format_valid ? "100%" : "20%"} 
                  color={validationResult?.checks?.format_valid ? "text-[#00A8A8]" : "text-rose-500"} 
                  level={validationResult?.checks?.format_valid ? "Perfect" : "Invalid"} 
                />
                <MetricBar 
                  label="Domain Trust" 
                  value={validationResult?.checks?.is_disposable === false ? "95%" : "30%"} 
                  color={validationResult?.checks?.is_disposable === false ? "text-[#00A8A8]" : "text-amber-500"} 
                  level={validationResult?.checks?.is_disposable === false ? "High" : "Low"} 
                />
                <MetricBar 
                  label="Security Risk" 
                  value={score > 7 ? "10%" : "70%"} 
                  color={score > 7 ? "text-[#00A8A8]" : "text-rose-500"} 
                  level={score > 7 ? "Minimal" : "Elevated"} 
                />
              </div>
            </div>

            {/* Security Signals */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] px-2">Security Signals</h3>
              <div className="space-y-3">
                <SignalCard
                  icon={validationResult?.checks?.smtp_valid !== false ? CheckCircle : AlertTriangle} 
                  tag={validationResult?.checks?.smtp_valid !== false ? "Verified" : "Failed"} 
                  title="SMTP Handshake"
                  desc={validationResult?.checks?.smtp_valid !== false ? "Mail server response confirmed." : "Could not verify server connectivity."}
                  color={validationResult?.checks?.smtp_valid !== false ? "text-[#00A8A8]" : "text-rose-500"} 
                  border="border-slate-50" 
                  bgColor={validationResult?.checks?.smtp_valid !== false ? "bg-teal-50" : "bg-rose-50"} 
                  tagColor={validationResult?.checks?.smtp_valid !== false ? "text-[#00A8A8]" : "text-rose-500"}
                />
                <SignalCard
                  icon={validationResult?.checks?.is_disposable === false ? Shield : AlertTriangle} 
                  tag={validationResult?.checks?.is_disposable === false ? "Safe" : "Warning"} 
                  title="Persistence"
                  desc={validationResult?.checks?.is_disposable === false ? "Permanent account detected." : "Temporary/Disposable account."}
                  color="text-slate-400" 
                  border="border-slate-100" 
                  bgColor="bg-slate-50" 
                  tagColor="text-slate-400"
                />
                <SignalCard
                  icon={score > 8 ? Lock : ShieldAlert} 
                  tag={score > 8 ? "Secure" : "Alert"} 
                  title="Breach Status"
                  desc={score > 8 ? "No public breach records found." : "Entry found in known data leaks."}
                  color={score > 8 ? "text-indigo-600" : "text-rose-600"} 
                  border="border-indigo-100" 
                  bgColor={score > 8 ? "bg-indigo-50" : "bg-rose-50"} 
                  tagColor={score > 8 ? "text-indigo-600" : "text-rose-600"}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
