'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  MapPin,
  Phone,
  ShieldAlert,
  CheckCircle,
  Mic,
  AlertTriangle,
} from 'lucide-react';

// ─── Sub-components ──────────────────────────────────────────────────────────

const PlaceCard = ({
  icon, name, distance, tag, featured,
}: {
  icon: string; name: string; distance: string; tag: string; featured?: boolean;
}) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className={`flex items-start gap-4 p-4 rounded-2xl transition-all cursor-pointer group ${
      featured
        ? 'bg-[#006a6a]/5 border-2 border-[#006a6a]/30 shadow-[0_0_20px_rgba(0,106,106,0.08)]'
        : 'bg-white border border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-teal-50'
    }`}
  >
    <div className={`p-3 rounded-lg text-xl shrink-0 ${featured ? 'bg-[#006a6a]/10' : 'bg-slate-50'}`}>
      {icon}
    </div>
    <div className="flex-grow space-y-1">
      <div className="flex justify-between items-start">
        <h4 className="text-sm font-black text-slate-900 tracking-tight">{name}</h4>
        <span className="text-[10px] font-black text-[#00A8A8] uppercase tracking-[0.2em]">{distance}</span>
      </div>
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
        featured ? 'bg-[#006a6a]/10 text-[#006a6a]' : 'bg-slate-50 text-slate-400'
      }`}>
        {tag}
      </span>
    </div>
  </motion.div>
);

const ProtocolItem = ({
  emoji, label, desc, labelColor,
}: {
  emoji: string; label: string; desc: string; labelColor: string;
}) => (
  <li className="flex gap-4 items-start bg-white/5 p-3 rounded-xl">
    <span className="text-xl shrink-0">{emoji}</span>
    <div>
      <p className={`text-[10px] font-black mb-1 uppercase tracking-[0.3em] ${labelColor}`}>{label}</p>
      <p className="text-[13px] text-slate-300 font-medium leading-relaxed">{desc}</p>
    </div>
  </li>
);

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Emergency() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-20">

      {/* Alert Banner */}
      <div className="bg-[#006a6a] text-white py-2.5 px-4 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className="font-black text-[10px] uppercase tracking-[0.3em]">
            Help is on the way — Follow the guidance below — Stay calm
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 pt-8 space-y-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT COLUMN ──────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-8">

            {/* SOS + Hero Card */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center gap-10">
              {/* SOS Button */}
              <div className="flex flex-col items-center gap-6 shrink-0">
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 0 0px rgba(186,26,26,0)',
                      '0 0 0 28px rgba(186,26,26,0.12)',
                      '0 0 0 0px rgba(186,26,26,0)',
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-40 h-40 rounded-full bg-[#ba1a1a] flex flex-col items-center justify-center text-white border-[8px] border-[#ffdad6] cursor-pointer active:scale-95 transition-transform duration-150 relative"
                >
                  <span className="text-2xl font-black uppercase tracking-widest">SOS</span>
                  <span className="text-[8px] font-black mt-0.5 uppercase tracking-[0.2em]">I'm in danger</span>
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#ba1a1a] text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                    Alert sent 3 sec ago
                  </div>
                </motion.div>

                <div className="w-40 space-y-1.5 mt-2">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: ['33%', '100%', '33%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="h-full bg-[#ba1a1a] rounded-full"
                    />
                  </div>
                  <p className="text-[9px] text-[#ba1a1a] font-black uppercase tracking-[0.2em] text-center">
                    Press &amp; Hold 3 Seconds
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-tight">Emergency Companion</h1>
                  <span className="px-3 py-1 bg-rose-50 text-rose-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-rose-100 w-fit">
                    SOS Active
                  </span>
                </div>
                <p className="text-slate-500 font-medium text-[15px] leading-relaxed">
                  Immediate assistance is one hold away. Your location is being shared with emergency contacts and local authorities.
                </p>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-50 rounded-xl">
                  <ShieldAlert className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Authorities notified in real-time</span>
                </div>
              </div>
            </div>

            {/* Live Map Implementation */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
              <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-[#00A8A8]/10 rounded-lg">
                    <MapPin className="w-3 h-3 text-[#00A8A8]" />
                  </div>
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Live Location Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Status</span>
                </div>
              </div>
              <div className="h-[340px] bg-slate-100 relative overflow-hidden group">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src="https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=17.3850,78.4867&zoom=14"
                  allowFullScreen
                  className="opacity-80 grayscale-[0.5]"
                ></iframe>
                
                {/* User marker overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <motion.div
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-[#006a6a]/40"
                  />
                  <div className="w-10 h-10 bg-[#006a6a] rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>

                <div className="absolute bottom-5 left-6 bg-white/90 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-10">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Real-time coordinates synced</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ─────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-8">

            {/* Nearby Safe Places */}
            <div className="bg-white rounded-3xl p-8 border border-slate-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] space-y-6">
              <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Nearby Safe Places</h3>
              <div className="space-y-3">
                <PlaceCard icon="🚔" name="Central Police Station" distance="450m" tag="Open 24/7 · CCTV" featured />
                <PlaceCard icon="🏥" name="City General Hospital" distance="1.2km" tag="Emergency Ward Active" />
                <PlaceCard icon="🚇" name="Metro Station — Gate 4" distance="800m" tag="CISF Guarded · Lit" />
              </div>
            </div>

            {/* Protocols — Dark Card matching Area Scanner's dark recommendation card */}
            <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -right-8 -top-8 opacity-5">
                <Shield className="w-48 h-48" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#00A8A8] rounded-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-[10px] font-black text-[#00A8A8] uppercase tracking-[0.2em]">Safety Protocol</h3>
                </div>
                <ul className="space-y-3">
                  <ProtocolItem emoji="🏃" label="Move quickly" labelColor="text-[#79F6F5]"
                    desc="Head toward crowded areas or well-lit storefronts immediately." />
                  <ProtocolItem emoji="🚫" label="Avoid danger" labelColor="text-rose-400"
                    desc="Steer clear of dark alleys, isolated parks, or construction zones." />
                  <ProtocolItem emoji="📱" label="Stay alert" labelColor="text-[#79F6F5]"
                    desc="Stay on a call or keep your phone visible to deter threats." />
                  <ProtocolItem emoji="🛡️" label="Seek partners" labelColor="text-[#79F6F5]"
                    desc="Look for businesses with 'Suraksha Partner' stickers for refuge." />
                </ul>
                <button className="w-full bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-2xl transition-all border border-white/10">
                  Read Full Safety Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="bg-white/95 border-t border-slate-100 sticky bottom-0 z-40 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.06)] mt-8">
        <div className="max-w-7xl mx-auto px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#006a6a]/10 border border-[#006a6a]/10">
              <div className="w-2 h-2 bg-[#006a6a] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-[#006a6a] uppercase tracking-widest">Location Shared</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-50 border border-rose-100">
              <div className="w-2 h-2 bg-[#ba1a1a] rounded-full animate-ping" />
              <span className="text-[10px] font-black text-[#ba1a1a] uppercase tracking-widest">Authorities Alerted</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-100">
              <Mic className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recording...</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[10px] text-slate-400 hover:text-[#ba1a1a] transition-colors px-4 py-2 font-black uppercase tracking-[0.3em]">
              Cancel Alert
            </button>
            <button className="bg-[#ba1a1a] text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-rose-900/20 hover:bg-red-700 active:scale-95 transition-all flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Contact Guardian
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
