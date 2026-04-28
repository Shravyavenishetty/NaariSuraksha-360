'use client';

import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Zap, 
  ArrowRight, 
  AlertTriangle,
  Lightbulb,
  Shield,
  ArrowUpDown,
  Search,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Sub-components ──────────────────────────────────────────────────────────

const RouteOption = ({ route, active, onClick }: any) => (
  <motion.div 
    whileHover={{ y: -4 }}
    onClick={onClick}
    className={`p-5 rounded-2xl cursor-pointer transition-all border-2 ${
      active 
        ? 'bg-teal-50/50 border-[#22C55E] shadow-lg ring-4 ring-[#22C55E]/5' 
        : 'bg-white border-slate-100 opacity-70 hover:opacity-100'
    }`}
  >
    <div className="flex justify-between items-start mb-3">
      <div>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          route.type === 'Safe' ? 'bg-[#22C55E] text-white' : 'bg-slate-100 text-slate-500'
        }`}>
          {route.label}
        </span>
        <h4 className="text-lg font-bold text-slate-900 mt-2 tracking-tight">{route.name}</h4>
      </div>
      <div className="text-right">
        <div className={`text-3xl font-black ${route.color} flex items-center justify-end gap-1`}>
          {route.score} <span className="text-[12px] text-slate-400 font-medium">/10</span>
        </div>
        <span className={`text-[9px] font-black uppercase tracking-tighter ${route.color}`}>
          {route.status}
        </span>
      </div>
    </div>
    
    <div className="flex gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
      <span className="flex items-center gap-1"><Navigation className="w-3 h-3" /> {route.dist}</span>
      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {route.time}</span>
    </div>

    {active && (
      <div className="flex flex-wrap gap-2">
        {route.tags.map((tag: string) => (
          <span key={tag} className="flex items-center gap-1 bg-white border border-[#22C55E]/20 px-2 py-1 rounded text-[10px] text-[#22C55E] font-black uppercase tracking-tighter">
            <CheckCircle2 className="w-3 h-3" /> {tag}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function SafeRoute() {
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState('A');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const routes = [
    { id: 'A', type: 'Safe', label: 'Route A (Safest)', name: 'Via Central Ave', score: '9.2', status: '🟢 EXCELLENT SAFE', dist: '4.2 km', time: '12 mins', color: 'text-[#22C55E]', tags: ['Well-lit streets', 'High Patrols'] },
    { id: 'B', type: 'Fast', label: 'Route B (Faster)', name: 'Via Express Link', score: '6.8', status: '🟡 MODERATE', dist: '3.8 km', time: '8 mins', color: 'text-amber-500', tags: [] },
    { id: 'C', type: 'Risk', label: 'Route C (Risky)', name: 'Via Old Industrial Rd', score: '3.4', status: '🔴 RISKY AREA', dist: '5.1 km', time: '15 mins', color: 'text-rose-500', tags: [] }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-20">
      
      {/* ── ANALYZING OVERLAY ────────────────────────────────────── */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 border-4 border-[#00A8A8] border-t-transparent rounded-full animate-spin mb-6" />
            <p className="text-[#00A8A8] font-black uppercase tracking-[0.3em] text-xs">Analyzing safest routes...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-[calc(100vh-160px)]">
        
        {/* ── SIDEBAR: PLAN JOURNEY ────────────────────────────────── */}
        <section className="lg:col-span-4 flex flex-col gap-8 h-full overflow-y-auto pr-2 custom-scrollbar">
          
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-50 space-y-8">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Plan Your Journey</h2>
              <div className="text-right">
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-1">Preference</span>
                <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg">
                  <span className="text-[9px] font-black text-[#00A8A8] px-2">SAFETY</span>
                  <div className="w-8 h-4 bg-[#00A8A8] rounded-full relative">
                    <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 relative">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Starting point</label>
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 group focus-within:border-[#00A8A8] transition-all">
                  <Navigation className="w-5 h-5 text-[#00A8A8] mr-4" />
                  <input className="bg-transparent border-none focus:ring-0 w-full font-bold text-slate-900 text-sm" value="Current Location" readOnly />
                </div>
              </div>

              <div className="absolute right-6 top-[54%] -translate-y-1/2 z-10">
                <button className="bg-white border border-slate-100 shadow-xl p-2.5 rounded-full hover:scale-110 active:scale-95 transition-transform text-[#00A8A8]">
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination</label>
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 group focus-within:border-rose-500 transition-all">
                  <MapPin className="w-5 h-5 text-rose-500 mr-4" />
                  <input className="bg-transparent border-none focus:ring-0 w-full font-bold text-slate-900 text-sm" value="Downtown Plaza" readOnly />
                </div>
              </div>

              <button className="w-full bg-[#00A8A8] hover:bg-[#006a6a] text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl mt-4 shadow-2xl shadow-[#00A8A8]/20 active:scale-[0.98] transition-all">
                Update Route
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Available Routes</h3>
              <span className="text-[9px] font-bold text-slate-300 bg-white px-2 py-1 rounded-md border border-slate-50">14:32:10</span>
            </div>
            
            <div className="space-y-4">
              {routes.map(r => (
                <RouteOption 
                  key={r.id} 
                  route={r} 
                  active={selectedRoute === r.id} 
                  onClick={() => setSelectedRoute(r.id)} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── MAIN VIEW: INTERACTIVE MAP ──────────────────────────── */}
        <section className="lg:col-span-8 flex flex-col h-full relative group">
          
          <div className="relative flex-grow bg-slate-100 rounded-[2.5rem] overflow-hidden border border-slate-50 shadow-inner">
            {/* Map Image Backdrop */}
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1yYgQlvCrgroir7IstOJD08mboKm5d8DQ31Jl8Mjy3ycSuDpXdH-BMA3RARP-qHzrz7S3UpzizteH-g79a5oiZNnphKkaqL6ahC1h808zULKp5vDzBcjHdodbmUiqGwqWLeRIuhd2DIM8IHMIYZwWvjtzykiBoTnH_bczn1aFNw_-ZRJIslpFDnkA_b9Pn54EmqX0d462d1WC69uKQGmKLI2whbg5C3y2F0_kjgQO5jVhRW_qtvwK64yqF2ILjit8dNrkZNDPReM"
              alt="City Map"
              className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
            />

            {/* SVG Overlay Routes */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 800 600">
                {/* Route C (Risky) */}
                <path d="M100,500 L200,450 L350,480 L600,400" fill="none" stroke="#cbd5e1" strokeDasharray="8 4" strokeWidth="4" opacity={selectedRoute === 'C' ? 1 : 0.4} />
                {/* Route B (Moderate) */}
                <path d="M100,500 L300,400 L500,450 L600,400" fill="none" stroke="#cbd5e1" strokeWidth="6" opacity={selectedRoute === 'B' ? 1 : 0.4} />
                
                {/* Route A (Active Green) */}
                <motion.path 
                  d="M100,500 L150,300 L400,250 L600,400" 
                  fill="none" 
                  stroke="#22C55E" 
                  strokeWidth="12" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  strokeOpacity="0.8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                />
                <path d="M100,500 L150,300 L400,250 L600,400" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.5" />

                {/* Markers */}
                <g transform="translate(100, 500)">
                  <circle r="12" fill="#3B82F6" opacity="0.2" className="animate-ping" />
                  <circle r="6" fill="#3B82F6" stroke="white" strokeWidth="2" />
                </g>
                <g transform="translate(600, 400)">
                  <path d="M0 -12 C-5 -12 -8 -8 -8 -4 C-8 2 0 12 0 12 C0 12 8 2 8 -4 C 8 -8 5 -12 0 -12" fill="#EF4444" stroke="white" strokeWidth="1" />
                </g>
              </svg>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20">
              <h5 className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">Map Legend</h5>
              <div className="space-y-4">
                <LegendItem color="bg-[#22C55E]" label="Safe Route" active />
                <LegendItem color="bg-amber-400 opacity-40" label="Moderate Risk" />
                <LegendItem color="bg-rose-500 opacity-40" label="High Risk" />
              </div>
            </div>

            {/* Recommendation Box */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="absolute bottom-6 right-6 md:w-[320px] bg-white/90 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/50 shadow-2xl space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="bg-[#22C55E] p-2 rounded-xl shadow-lg shadow-green-500/30">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-black text-[#22C55E] text-[11px] uppercase tracking-tight">Recommended: Route A</h4>
                  </div>
                  <p className="text-slate-900 text-[12px] font-bold leading-relaxed">
                    Safe to travel – low incidents & high visibility.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <p className="text-[9px] font-black text-[#00A8A8] uppercase tracking-[0.2em]">Why this route?</p>
                <ul className="space-y-2">
                  <WhyPoint text="Low incident reports" />
                  <WhyPoint text="Well-lit roads" />
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* SOS FAB */}
      <motion.button 
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 0 0px rgba(225, 29, 72, 0)",
            "0 0 0 20px rgba(225, 29, 72, 0.2)",
            "0 0 0 0px rgba(225, 29, 72, 0)"
          ]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed right-10 bottom-10 z-[150] w-20 h-20 bg-rose-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-rose-500/40 group overflow-hidden"
      >
        <span className="text-xl font-black relative z-10">SOS</span>
        <span className="absolute right-24 bg-rose-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl">SOS Emergency</span>
      </motion.button>

    </div>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function LegendItem({ color, label, active }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-3.5 h-3.5 rounded-full ${color} ${active ? 'shadow-[0_0_8px_rgba(34,197,94,0.6)]' : ''}`} />
      <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-slate-900' : 'text-slate-300'}`}>{label}</span>
    </div>
  );
}

function WhyPoint({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
      <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
      {text}
    </li>
  );
}
