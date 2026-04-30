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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchStatus = async (city?: string) => {
    setLoading(true);
    try {
      const url = city 
        ? `http://localhost:5000/api/safety/status?city=${encodeURIComponent(city)}`
        : 'http://localhost:5000/api/safety/status';
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching safety status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchStatus(searchQuery);
    }
  };

  // Calculate SVG dash offset based on score (0-10)
  // Total circumference is 452 (2 * PI * 72)
  const score = data?.score || 0;
  const dashOffset = 452 - (score / 10) * 452;

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center font-black text-slate-300 uppercase tracking-[0.5em] text-xs">
        Syncing Global Safety Data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-20">
      <main className="max-w-7xl mx-auto px-8 pt-10 space-y-10">
        
        {/* Search Bar */}
        <section className="flex justify-center">
          <form onSubmit={handleSearch} className="w-full max-w-2xl relative group">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city or area safety status..."
              className="w-full bg-white border border-slate-100 px-8 py-5 rounded-3xl shadow-lg focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent outline-none font-bold text-slate-700 transition-all pl-16"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-[#00A8A8] transition-colors" />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#00A8A8] text-white px-6 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#008a8a] transition-colors">
              Analyze
            </button>
          </form>
        </section>

        {/* ── TOP SECTION: OVERVIEW & SOS ─────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Safety Index Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-8 border border-slate-50 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="72" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                <motion.circle 
                  cx="80" cy="80" r="72" fill="none" 
                  stroke={data?.color === 'red' ? '#EF4444' : data?.color === 'yellow' ? '#FBBF24' : '#00A8A8'} 
                  strokeWidth="10" 
                  strokeDasharray="452" 
                  strokeDashoffset={dashOffset} 
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 452 }}
                  animate={{ strokeDashoffset: dashOffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black text-slate-900 leading-none tracking-tighter">{data?.score || '0.0'}</span>
                <span className={`text-[9px] font-black mt-1 uppercase tracking-[0.2em] ${data?.color === 'red' ? 'text-rose-500' : data?.color === 'yellow' ? 'text-amber-500' : 'text-[#00A8A8]'}`}>
                  {data?.label || 'Calculating'}
                </span>
              </div>
            </div>
            
            <div className="flex-1 space-y-5">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#00A8A8]/10 text-[#00A8A8] rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" /> Live Analysis
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Updated {new Date().toLocaleTimeString()}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                <span className="text-rose-500">📍</span> {data?.location?.city || 'Detecting...'}
              </h1>
              <p className="text-slate-400 font-medium text-[14px] leading-relaxed max-w-lg">
                {data?.label === 'High Risk' 
                  ? 'Caution: Multiple incidents or high risk factors detected in this area. Stay alert and use SafeRoute.' 
                  : `This area is currently rated as ${data?.label}. Visibility is ${data?.weather?.condition} and conditions are stable.`}
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
              <StatusItem border={data?.weather?.code > 0 ? "border-amber-500" : "border-[#00A8A8]"} title={`Weather: ${data?.weather?.temp}°C - ${data?.weather?.condition}`} desc="Conditions are clear for safe movement." icon={TrafficCone} />
              <StatusItem border={data?.isNight ? "border-indigo-500" : "border-[#00A8A8]"} title={data?.isNight ? "Night Time Protocol" : "Daylight Mode Active"} desc={data?.isNight ? "Street lights active. Visibility depends on urban infrastructure." : "Full visibility. Natural light available."} icon={Scan} />
              <StatusItem border={data?.newsCount > 5 ? "border-rose-500" : "border-[#00A8A8]"} title={`${data?.newsCount} Recent Incidents`} desc={`Reports gathered from verified digital news sources in the last 48 hours.`} icon={AlertTriangle} />
            </div>
          </div>

          {/* Risk Breakdown */}
          <div className="bg-white rounded-3xl p-8 border border-slate-50 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-8">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Risk Breakdown</h2>
            <div className="space-y-6">
              <RiskBar label="Weather Risk" value={`${data?.factors?.weatherRisk * 10}%`} color="text-[#00A8A8]" level={data?.factors?.weatherRisk > 7 ? 'High' : (data?.factors?.weatherRisk > 3 ? 'Moderate' : 'Low')} />
              <RiskBar label="Time Risk" value={`${data?.factors?.timeRisk * 10}%`} color="text-[#00A8A8]" level={data?.factors?.timeRisk > 7 ? 'High' : 'Low'} />
              <RiskBar label="Area Risk" value={`${data?.factors?.contextRisk * 10}%`} color="text-[#00A8A8]" level={data?.factors?.contextRisk > 7 ? 'High' : 'Low'} />
              <RiskBar label="Incident Risk" value={`${data?.factors?.newsRisk * 10}%`} color="text-rose-500" level={data?.factors?.newsRisk > 7 ? 'Critical' : 'Low'} isCritical={data?.factors?.newsRisk > 7} />
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
