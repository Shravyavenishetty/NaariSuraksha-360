'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Emergency() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .sos-pulse {
            box-shadow: 0 0 0 0 rgba(186, 26, 26, 0.8), 0 0 0 0 rgba(186, 26, 26, 0.4);
            animation: pulse-red-complex 1.2s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }
        @keyframes pulse-red-complex {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(186, 26, 26, 0.8), 0 0 0 0 rgba(186, 26, 26, 0.4); }
            50% { transform: scale(1.02); box-shadow: 0 0 0 30px rgba(186, 26, 26, 0), 0 0 0 50px rgba(186, 26, 26, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(186, 26, 26, 0), 0 0 0 0 rgba(186, 26, 26, 0); }
        }
        .map-pulse {
            animation: map-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes map-ping {
            75%, 100% { transform: scale(2.5); opacity: 0; }
        }
        .path-draw {
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
            animation: draw 3s linear forwards infinite;
        }
        @keyframes draw {
            to { stroke-dashoffset: 0; }
        }
      `}</style>

      <div className="bg-[#f8f9ff] font-['Manrope'] text-[#0b1c30] min-h-screen flex flex-col">
        {/* New Reassuring Alert Banner */}
        <div className="bg-[#006a6a] text-white py-3 px-4 shadow-md z-40 relative rounded-xl mb-6">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
            <span className="material-symbols-outlined animate-bounce">support_agent</span>
            <span className="font-bold text-sm md:text-base tracking-wide">Help is on the way. Follow the guidance below. Stay calm.</span>
          </div>
        </div>

        <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-6 flex flex-col md:grid md:grid-cols-12 gap-4">
          {/* Left Column: SOS & Map */}
          <section className="md:col-span-7 flex flex-col gap-6">
            {/* High Urgency SOS Area */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-[#bbc9c8]/30 flex flex-col items-center justify-center text-center">
              <div className="mb-3">
                <h1 className="text-xl font-bold text-[#0b1c30] mb-0.5">Emergency Companion</h1>
                <p className="text-sm text-[#3c4949] max-w-xs">Immediate assistance is one hold away. Our team is standing by.</p>
              </div>
              <div className="relative group cursor-pointer active:scale-95 transition-transform duration-150">
                {/* SOS Pulse Animation */}
                <div className="sos-pulse w-44 h-44 rounded-full bg-[#ba1a1a] flex flex-col items-center justify-center text-white border-[8px] border-[#ffdad6] relative">
                  <span className="material-symbols-outlined text-4xl mb-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                  <span className="text-2xl font-bold uppercase tracking-widest">SOS</span>
                  <span className="text-[9px] mt-0.5">I'M IN DANGER</span>
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#ba1a1a] text-white px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest">
                    Alert sent 3 sec ago
                  </div>
                </div>
                {/* Interaction Hint */}
                <div className="mt-8 flex flex-col items-center">
                  <div className="w-44 h-1.5 bg-[#e5eeff] rounded-full overflow-hidden mb-2 border border-[#bbc9c8]/20">
                    <div className="h-full bg-[#ba1a1a] w-1/3 group-active:w-full transition-all duration-[3000ms] ease-linear"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-xs animate-bounce">touch_app</span>
                    <p className="text-[10px] text-[#ba1a1a] font-bold uppercase tracking-wider">Press & Hold for 3 Seconds</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-xl shadow-sm border border-[#bbc9c8]/30 overflow-hidden">
              <div className="px-4 py-4 border-b border-[#bbc9c8]/20 flex justify-between items-center bg-white">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006a6a]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  <span className="text-sm font-semibold">Live Location: Active</span>
                </div>
                <span className="text-xs text-[#3c4949] flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> Accuracy: 5 meters
                </span>
              </div>
              <div className="h-[400px] bg-[#e5eeff] relative overflow-hidden">
                <img alt="Map background" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCErPNJTG5FKf3cKJO9WbNMSnFNmPls96pR2E0OjzSTZf83BLZAYdFy_iZaRX2OeNCXfnvNKt6wAmlqvq6wNivTcJ49K7LkEamp4Xj5D2yjxp6PwGbArC_qmPpnuexuPZ6GwXXw2OXMo2hPgYDAHLyyKJ9ILMcVrKsBAzK1Ns7oT6dgc7W0_RQfGCkyh-Dt6H_kLgn4eyhU4zNwBCL41Vh2KOpVA4OUikgj6m0QMndazHJ7qtRoljGUu3c52YFTjSnW-sbzLAj6fYI" />
                {/* Path Highlight Overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 400">
                  <defs>
                    <marker id="arrowhead" markerHeight="7" markerWidth="7" orient="auto" refX="5" refY="3.5">
                      <polygon fill="#006a6a" points="0 0, 7 3.5, 0 7"></polygon>
                    </marker>
                  </defs>
                  <path className="path-draw" d="M 400 200 L 450 150 L 480 100" fill="none" markerEnd="url(#arrowhead)" stroke="#006a6a" strokeDasharray="8,6" strokeLinecap="round" strokeWidth="4"></path>
                </svg>
                <div className="absolute top-[80px] left-[480px] -translate-x-1/2 -translate-y-1/2 bg-[#006a6a] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1.5 z-20">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_police</span>
                  Central Police Station (450m)
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-10 h-10 bg-[#006a6a] rounded-full border-4 border-white shadow-xl relative flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full map-pulse bg-[#006a6a]/40"></div>
                    <div className="absolute inset-0 rounded-full map-pulse bg-[#006a6a]/20" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-3 h-3 bg-white rounded-full shadow-inner"></div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur p-3 rounded-lg shadow-xl border border-[#006a6a]/30 z-20">
                  <p className="text-xs text-[#0b1c30] font-bold">You are here</p>
                  <p className="text-[10px] text-[#3c4949]">Connaught Place, Block E</p>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Safety Info & Protocols */}
          <section className="md:col-span-5 flex flex-col gap-6">
            {/* Nearby Safe Places */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-[#bbc9c8]/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Nearby Safe Places</h3>
                <span className="material-symbols-outlined text-sm text-[#3c4949]">filter_list</span>
              </div>
              <div className="flex flex-col gap-4">
                {/* Highlighted Place 1 */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#006a6a]/5 border-2 border-[#006a6a]/30 shadow-[0_0_15px_rgba(0,168,168,0.1)] transition-all cursor-pointer relative">
                  <div className="absolute -top-2 -right-2 bg-[#006a6a] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter border border-white">
                    Nearest Safe Point
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-[#006a6a]/10 flex items-center justify-center text-[#006a6a]">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_police</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-[#0b1c30]">Central Police Station</h4>
                      <span className="text-xs text-[#006a6a] font-bold">450m</span>
                    </div>
                    <p className="text-xs text-[#3c4949] mb-2">Open 24/7 • High Security</p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#006a6a]/10 text-[#006a6a] text-[10px] font-bold uppercase tracking-wide">
                      <span className="material-symbols-outlined text-[12px]">videocam</span> CCTV Monitored
                    </span>
                  </div>
                </div>
                {/* Place 2 */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#eff4ff] border border-transparent hover:border-[#00a8a8] transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-[#c8d7ff]/30 flex items-center justify-center text-[#505e80]">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-semibold text-[#0b1c30]">City General Hospital</h4>
                      <span className="text-xs text-[#006a6a] font-bold">1.2km</span>
                    </div>
                    <p className="text-xs text-[#3c4949] mb-2">Emergency Ward Active</p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#006a6a]/10 text-[#006a6a] text-[10px] font-bold uppercase tracking-wide">
                      <span className="material-symbols-outlined text-[12px]">verified_user</span> Safe Zone
                    </span>
                  </div>
                </div>
                {/* Place 3 */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#eff4ff] border border-transparent hover:border-[#00a8a8] transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-[#d3e4fe] flex items-center justify-center text-[#0b1c30]">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>subway</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-semibold text-[#0b1c30]">Metro Station - Gate 4</h4>
                      <span className="text-xs text-[#006a6a] font-bold">800m</span>
                    </div>
                    <p className="text-xs text-[#3c4949] mb-2">CISF Guarded • Brightly Lit</p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#006a6a]/10 text-[#006a6a] text-[10px] font-bold uppercase tracking-wide">
                      <span className="material-symbols-outlined text-[12px]">group</span> Crowded Area
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Protocols Section */}
            <div className="bg-[#1B2A49] text-white rounded-xl p-5 shadow-lg border-l-4 border-[#006a6a]">
              <div className="flex items-center gap-2 mb-3 text-[#79F6F5]">
                <span className="material-symbols-outlined text-lg">security</span>
                <h3 className="text-lg font-semibold">Immediate Safety Protocols</h3>
              </div>
              <ul className="flex flex-col gap-4">
                <li className="flex gap-4 items-start bg-white/5 p-3 rounded-lg">
                  <span className="text-xl">🏃</span>
                  <div>
                    <p className="text-sm font-semibold text-[#006a6a] mb-1">Move quickly</p>
                    <p className="text-sm text-white/80">Head toward crowded areas or well-lit storefronts immediately.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start bg-white/5 p-3 rounded-lg">
                  <span className="text-xl">🚫</span>
                  <div>
                    <p className="text-sm font-semibold text-[#ba1a1a] mb-1">Avoid danger</p>
                    <p className="text-sm text-white/80">Steer clear of dark alleys, isolated parks, or construction zones.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start bg-white/5 p-3 rounded-lg">
                  <span className="text-xl">📱</span>
                  <div>
                    <p className="text-sm font-semibold text-[#006a6a] mb-1">Stay alert</p>
                    <p className="text-sm text-white/80">Stay on a call or keep your phone visible to deter potential threats.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start bg-white/5 p-3 rounded-lg">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <p className="text-sm font-semibold text-[#006a6a] mb-1">Look for partners</p>
                    <p className="text-sm text-white/80">Seek businesses with 'Suraksha Partner' stickers for immediate refuge.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </main>

        {/* Bottom Status Bar */}
        <footer className="bg-white/95 border-t-2 border-[#ba1a1a]/20 sticky bottom-0 z-40 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-wrap items-center justify-center md:justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#006a6a]/10 border border-[#006a6a]/30 shadow-sm">
                <span className="w-2.5 h-2.5 bg-[#006a6a] rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-[#006a6a] uppercase tracking-wider">Location Shared</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ba1a1a]/10 border border-[#ba1a1a]/30 shadow-sm">
                <span className="w-2.5 h-2.5 bg-[#ba1a1a] rounded-full animate-ping"></span>
                <span className="text-xs font-bold text-[#ba1a1a] uppercase tracking-wider">Authorities Alerted</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b1c30]/5 border border-[#0b1c30]/20">
                <span className="material-symbols-outlined text-[18px] text-[#0b1c30]">mic</span>
                <span className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">Recording...</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm text-[#3c4949] hover:text-[#ba1a1a] transition-colors px-4 py-2 font-bold underline underline-offset-4 decoration-2">
                Cancel Alert
              </button>
              <button className="bg-[#ba1a1a] text-white px-8 py-3 rounded-full font-bold text-sm shadow-xl hover:bg-red-700 active:scale-95 transition-all flex items-center gap-2 ring-4 ring-[#ba1a1a]/20">
                <span className="material-symbols-outlined">call</span>
                Contact Guardian
              </button>
            </div>
          </div>
        </footer>

        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-6 bg-white/90 backdrop-blur-xl border-t border-slate-200/50 shadow-[0_-4px_20px_rgba(27,42,73,0.08)]">
          <a className="flex flex-col items-center justify-center text-[#006a6a] bg-[#006a6a]/10 rounded-xl px-4 py-1.5 font-bold text-[11px]" href="#">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
            <span>Emergency</span>
          </a>
          <a className="flex flex-col items-center justify-center text-slate-500 px-4 py-1.5 font-semibold text-[11px]" href="#">
            <span className="material-symbols-outlined">distance</span>
            <span>Places</span>
          </a>
          <a className="flex flex-col items-center justify-center text-slate-500 px-4 py-1.5 font-semibold text-[11px]" href="#">
            <span className="material-symbols-outlined">hub</span>
            <span>Circle</span>
          </a>
          <a className="flex flex-col items-center justify-center text-slate-500 px-4 py-1.5 font-semibold text-[11px]" href="#">
            <span className="material-symbols-outlined">person</span>
            <span>Account</span>
          </a>
        </nav>
      </div>
    </>
  );
}
