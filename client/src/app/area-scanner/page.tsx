'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
      Loading Map...
    </div>
  ),
});
import { 
  MapPin, 
  Search, 
  Navigation, 
  ShieldCheck, 
  Sun, 
  Moon, 
  AlertTriangle, 
  ShieldAlert, 
  Info,
  CheckCircle,
  Bell,
  User,
  Zap,
  TrendingUp,
  Map as MapIcon,
  Shield,
  Activity,
  Lightbulb,
  ShieldEllipsis
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        transition={{ duration: 1, ease: "easeOut" }}
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

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function AreaScanner() {
  const [score, setScore] = useState(0);
  const [locationInput, setLocationInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [safetyData, setSafetyData] = useState<any>(null);

  const fetchSafetyStatus = async (city?: string) => {
    setLoading(true);
    try {
      const url = city 
        ? `http://localhost:5000/api/safety/status?city=${encodeURIComponent(city)}`
        : 'http://localhost:5000/api/safety/status';
      
      const response = await axios.get(url);
      setSafetyData(response.data);
      setScore(response.data.score ?? 0);
    } catch (error) {
      console.error('Error fetching safety status:', error);
      setScore(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSafetyStatus();
  }, []);

  const handleScan = () => {
    if (locationInput.trim()) {
      fetchSafetyStatus(locationInput);
    }
  };

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 10) * circumference;

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-20">
      
      <main className="max-w-7xl mx-auto px-8 pt-16 space-y-12">
        
        {/* ── CENTRAL SEARCH AREA ───────────────────────────────────── */}
        <section className="max-w-2xl mx-auto text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-tight">
              Area Safety Scanner
            </h1>
            <p className="text-slate-400 font-medium text-sm leading-relaxed px-4">
              Scan your immediate surroundings or any location to get real-time safety insights and risk assessments.
            </p>
          </div>

          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-300">
              <MapPin className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleScan()}
              placeholder="Enter location or street name..."
              className="w-full h-16 pl-14 pr-44 bg-white border-0 rounded-[2rem] focus:ring-4 focus:ring-[#00A8A8]/5 transition-all shadow-[0_8px_30px_rgba(27,42,73,0.06)] font-bold text-slate-900"
            />
            <div className="absolute inset-y-2 right-2 flex items-center gap-2">
              <button className="h-full px-5 text-[#00A8A8] hover:bg-[#00A8A8]/5 rounded-2xl transition-colors active:scale-95">
                <Navigation className="w-5 h-5" />
              </button>
              <button 
                onClick={handleScan}
                disabled={loading}
                className="h-full px-8 bg-[#00A8A8] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#006a6a] transition-all active:scale-95 shadow-xl shadow-[#00A8A8]/20 disabled:opacity-50"
              >
                {loading ? 'Scanning...' : 'Scan Area'}
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT COLUMN: SAFETY OVERVIEW ────────────────────────── */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Main Score Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-50 shadow-sm flex flex-col md:flex-row items-center gap-8 group">
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="58" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                  <motion.circle 
                    cx="64" cy="64" r="58" fill="none" stroke={score > 7 ? "#22C55E" : score > 4 ? "#F59E0B" : "#EF4444"} strokeWidth="8" 
                    strokeDasharray={364}
                    initial={{ strokeDashoffset: 364 }}
                    animate={{ strokeDashoffset: 364 - (score / 10) * 364 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-slate-900 tracking-tighter">{(score || 0).toFixed(1)}</span>
                  <span className={`text-[8px] font-black mt-0.5 uppercase tracking-[0.2em] ${score > 7 ? "text-emerald-500" : score > 4 ? "text-amber-500" : "text-rose-500"}`}>
                    {safetyData?.label || 'Analyzing...'}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-2">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    {safetyData?.location.city || 'Detecting Location...'}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                      Live Updates
                    </span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Updated just now</span>
                  </div>
                </div>
                <p className="text-slate-500 font-medium text-[15px] leading-relaxed">
                  Overall safety is {safetyData?.label?.toLowerCase() || 'being calculated'}. {safetyData?.newsCount > 5 ? "Recent news reports suggest increased caution in this area." : "No significant incidents reported recently."} Crowds are {safetyData?.isNight ? "low" : "moderate"}.
                </p>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-50 rounded-xl">
                  <Info className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Based on {safetyData?.newsCount || 0} local news data points
                  </span>
                </div>
              </div>
            </div>

            {/* Day/Night Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F0FDF4] rounded-3xl p-8 border border-green-100 shadow-[0_10px_40px_rgba(34,197,94,0.03)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500 rounded-lg text-white">
                    <Sun className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-green-900 uppercase tracking-widest">Daytime Safety</span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black text-green-600">8.9</span>
                  <span className="text-green-700/40 text-sm font-bold">/ 10</span>
                </div>
                <p className="text-[13px] text-green-800/60 font-medium leading-relaxed">High activity and active patrolling make this area safe during 6 AM - 6 PM.</p>
              </div>

              <div className="bg-[#0B1C30] rounded-3xl p-8 border border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-400 rounded-lg text-white">
                    <Moon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-slate-100 uppercase tracking-widest">Nighttime Safety</span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black text-rose-500">
                    {safetyData?.isNight ? score.toFixed(1) : (score - 2).toFixed(1)}
                  </span>
                  <span className="text-slate-500 text-sm font-bold">/ 10</span>
                </div>
                <p className="text-[13px] text-slate-400 font-medium leading-relaxed">Reduced lighting and lower footfall increase potential risks. Use main roads only.</p>
              </div>
            </div>

            {/* Real Map Implementation */}
            <div className="bg-slate-200 rounded-[2.5rem] h-[350px] relative overflow-hidden group shadow-inner border border-slate-100">
              {safetyData ? (
                <LeafletMap
                  lat={safetyData.location.lat}
                  lng={safetyData.location.lng}
                  zoom={15}
                  markerLabel={safetyData.location.city || 'Current Location'}
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  Initializing Live Map...
                </div>
              )}
              
              {/* Overlay Chip */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-[1000]">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Live Area Tracking Active</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: INSIGHTS ──────────────────────────────── */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Metric Breakdown */}
            <div className="bg-white rounded-3xl p-8 border border-slate-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] space-y-8">
              <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Metric Breakdown</h3>
              <div className="space-y-6">
                <MetricBar 
                  label="Incident Risk" 
                  value={`${((safetyData?.newsCount || 0) / 12 * 100).toFixed(0)}%`} 
                  color="text-rose-500" 
                  level={(safetyData?.newsCount || 0) > 8 ? "Critical" : (safetyData?.newsCount || 0) > 4 ? "Moderate" : "Low"} 
                />
                <MetricBar 
                  label="Weather Factor" 
                  value="85%" 
                  color="text-[#00A8A8]" 
                  level={safetyData?.weather?.condition || "Clear"} 
                />
                <MetricBar 
                  label="Time Context" 
                  value={safetyData?.isNight ? "40%" : "90%"} 
                  color="text-amber-500" 
                  level={safetyData?.isNight ? "Night" : "Day"} 
                />
              </div>
            </div>

            {/* Safety Signals */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] px-2">Live Signals</h3>
              <div className="space-y-3">
                <SignalCard 
                  icon={ShieldAlert} tag="Alert" title="Theft Incident" desc="Reported 2 hours ago near Metro Station Gate 2."
                  color="text-rose-600" border="border-rose-100/50" bgColor="bg-rose-50" tagColor="text-rose-500"
                />
                <SignalCard 
                  icon={CheckCircle} tag="Clear" title="Police Presence" desc="Active patrolling reported near Central Mall."
                  color="text-[#00A8A8]" border="border-teal-50" bgColor="bg-teal-50" tagColor="text-[#00A8A8]"
                />
                <SignalCard 
                  icon={Lightbulb} tag="Update" title="Street Light Check" desc="85% of street lights active in residential blocks."
                  color="text-slate-400" border="border-slate-100" bgColor="bg-slate-50" tagColor="text-slate-400"
                />
              </div>
            </div>

            {/* Expert Recommendations */}
            <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -right-8 -top-8 opacity-5">
                <Shield className="w-48 h-48" />
              </div>
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#00A8A8] rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-[10px] font-black text-[#00A8A8] uppercase tracking-[0.2em]">Safety Protocol</h3>
                </div>
                <p className="text-[15px] font-medium text-slate-300 leading-relaxed italic">
                  "Avoid the North-Eastern lane after 9 PM due to poor lighting. Use the 'Share Trip' feature if traveling alone through this sector."
                </p>
                <button className="w-full bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-2xl transition-all border border-white/10">
                  Read Full Safety Guide
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Floating SOS Button */}
      <motion.button 
        animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0 0px rgba(225,29,72,0)", "0 0 0 20px rgba(225,29,72,0.15)", "0 0 0 0px rgba(225,29,72,0)"] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="fixed bottom-10 right-10 z-[100] w-20 h-20 bg-rose-600 rounded-full flex items-center justify-center text-white shadow-2xl group"
      >
        <span className="text-xl font-black">SOS</span>
        <div className="absolute right-24 bg-rose-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl">
          Emergency SOS
        </div>
      </motion.button>

    </div>
  );
}
