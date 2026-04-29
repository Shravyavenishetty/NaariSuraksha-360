'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Navigation, 
  Search, 
  Fingerprint, 
  TrafficCone, 
  Scan,
  LayoutGrid,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

// ─── Sub-components ──────────────────────────────────────────────────────────

const ActionCard = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 group cursor-pointer">
    <div className="w-12 h-12 bg-[#00A8A8]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00A8A8] group-hover:text-white transition-colors">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">{title}</h3>
    <p className="text-[13px] text-slate-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

const RiskBar = ({ label, value, color, level, isCritical }: { label: string; value: string; color: string; level: string; isCritical?: boolean }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
      <span className="text-slate-400">{label}</span>
      <span className={isCritical ? 'text-rose-500' : 'text-[#00A8A8]'}>{level} ({value})</span>
    </div>
    <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden relative">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: value }}
        transition={{ duration: 1 }}
        className={`h-full rounded-full ${isCritical ? 'bg-rose-500' : 'bg-gradient-to-r from-[#00A8A8] to-[#1B2A49]'}`}
      />
      <span className={`absolute inset-0 flex items-center justify-end px-3 text-[9px] font-black uppercase ${isCritical ? 'text-white' : 'text-slate-400 opacity-40'}`}>
        {level}
      </span>
    </div>
  </div>
);

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function SafetyHub() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-20">
      
      <main className="max-w-7xl mx-auto px-8 pt-16 space-y-10">
        
        {/* ── TOP SECTION: OVERVIEW & SOS ─────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Safety Index Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-8 border border-slate-50 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="72" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                <motion.circle 
                  cx="80" cy="80" r="72" fill="none" stroke="#00A8A8" strokeWidth="10" 
                  strokeDasharray="452" strokeDashoffset="82" strokeLinecap="round"
                  initial={{ strokeDashoffset: 452 }}
                  animate={{ strokeDashoffset: 82 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black text-slate-900 leading-none tracking-tighter">8.2</span>
                <span className="text-[9px] font-black text-[#00A8A8] mt-1 uppercase tracking-[0.2em]">Low Risk</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-5">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#00A8A8]/10 text-[#00A8A8] rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" /> Verified Area
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Updated 2 mins ago</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                <span className="text-rose-500">📍</span> Kondapur, Hyderabad
              </h1>
              <p className="text-slate-400 font-medium text-[14px] leading-relaxed max-w-lg">
                This area currently has a high safety rating. Visibility is clear and active patrols are within a 500m radius.
              </p>
              <div className="flex gap-6 pt-1">
                <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-[#00A8A8] gap-2">
                  <MapPin className="w-4 h-4" /> Safe Zones Nearby
                </div>
                <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-[#00A8A8] gap-2">
                  <Shield className="w-4 h-4" /> Verified Safe Point
                </div>
              </div>
            </div>
          </div>

          {/* Emergency SOS Card */}
          <div className="lg:col-span-4 bg-rose-50/50 rounded-2xl p-8 border border-rose-100 flex flex-col items-center justify-center text-center space-y-5">
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 0px rgba(225, 29, 72, 0)",
                  "0 0 0 15px rgba(225, 29, 72, 0.15)",
                  "0 0 0 0px rgba(225, 29, 72, 0)"
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 bg-rose-600 rounded-full flex items-center justify-center shadow-xl"
            >
               <AlertTriangle className="w-10 h-10 text-white" />
            </motion.div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-rose-900 tracking-tight">Emergency SOS</h3>
              <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">Press for 3 seconds to alert contacts</p>
            </div>
          </div>
        </section>

        {/* ── QUICK ACTIONS ────────────────────────────────────────── */}
        <section className="space-y-8">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ActionCard icon={Navigation} title="SafeRoute" desc="Find the most populated and well-lit paths to your destination." />
            <ActionCard icon={Scan} title="Area Scanner" desc="Get real-time safety stats and incidents for your current location." />
            <ActionCard icon={AlertTriangle} title="Emergency Mode" desc="One-tap lock, audio recording, and live location streaming." />
            <ActionCard icon={Fingerprint} title="Digital Safety" desc="Monitor device security and control data privacy settings." />
          </div>
        </section>

        {/* ── LIVE STATUS & BREAKDOWN ──────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Safety Status */}
          <div className="bg-white rounded-3xl p-8 border border-slate-50 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-[#00A8A8] uppercase tracking-[0.3em] mb-1">Live Updates</p>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Live Safety Status</h2>
              </div>
              <button className="text-[10px] font-black text-[#00A8A8] uppercase tracking-widest hover:underline">View Map</button>
            </div>
            <div className="space-y-4">
              <StatusItem border="border-indigo-500" title="Moderate Traffic + Low Visibility" desc="Hitech City Road - Expect delays and street light maintenance." icon={TrafficCone} />
              <StatusItem border="border-rose-500" title="Recent Incident Reported" desc="Gachibowli Circle - 800m away. Avoid walking alone in the subway." icon={AlertTriangle} />
              <StatusItem border="border-[#00A8A8]" title="Safe Haven Zone" desc="Inorbit Mall Area - High density of verified safe locations." icon={CheckCircle} />
            </div>
          </div>

          {/* Risk Breakdown */}
          <div className="bg-white rounded-3xl p-8 border border-slate-50 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-8">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Risk Breakdown</h2>
            <div className="space-y-6">
              <RiskBar label="Weather Risk" value="15%" color="text-[#00A8A8]" level="Low" />
              <RiskBar label="Time Risk" value="45%" color="text-[#00A8A8]" level="Moderate" />
              <RiskBar label="Area Risk" value="22%" color="text-[#00A8A8]" level="Low" />
              <RiskBar label="Incident Risk" value="10%" color="text-rose-500" level="Critical" isCritical />
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl flex items-start gap-3">
              <Info className="w-4 h-4 text-slate-400 mt-0.5" />
              <p className="text-[10px] font-medium text-slate-400 leading-relaxed">
                Risk factors are calculated based on real-time crime data, urban lighting, and crowd density.
              </p>
            </div>
          </div>
        </section>

        {/* ── RECENT ACTIVITY ──────────────────────────────────────── */}
        <section className="bg-white rounded-3xl border border-slate-50 shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recent Safety Checks</h2>
          </div>
          <div className="divide-y divide-slate-50 px-8 pb-10">
            <ActivityRow icon={Navigation} title="Route Tracking: Office to Home" desc="Duration: 45m • Completed Safely" time="2 hours ago" />
            <ActivityRow icon={Scan} title="Area Scan: Jubilee Hills" desc="Safety Rating: 9.1/10" time="Yesterday, 8:30 PM" />
            
            <div className="pt-10 text-center">
              <button className="text-[11px] font-black text-[#00A8A8] uppercase tracking-[0.2em] hover:underline">View All Activity</button>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function StatusItem({ border, title, desc, icon: Icon }: any) {
  return (
    <div className={`p-4 bg-slate-50/50 rounded-xl border-l-4 ${border} flex gap-4`}>
       <div className={border.replace('border-', 'text-')}>
          <Icon className="w-5 h-5" />
       </div>
       <div>
          <p className="text-sm font-bold text-slate-900">{title}</p>
          <p className="text-[11px] font-medium text-slate-400">{desc}</p>
       </div>
    </div>
  );
}

function ActivityRow({ icon: Icon, title, desc, time }: any) {
  return (
    <div className="py-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors cursor-pointer group px-2 rounded-xl">
      <div className="flex items-center gap-6">
        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 tracking-tight">{title}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{desc}</p>
        </div>
      </div>
      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{time}</span>
    </div>
  );
}
