'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SafetyGaugeProps {
  score: number;
  label: string;
  color: string;
}

export default function SafetyGauge({ score, label, color }: SafetyGaugeProps) {
  const strokeColor = color === 'red' ? '#e11d48' : color === 'yellow' ? '#f59e0b' : '#10b981';
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * score) / 10;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-56 h-56 flex items-center justify-center">
        <svg viewBox="0 0 224 224" className="w-full h-full -rotate-90">
          {/* Background Track */}
          <circle 
            cx="112" cy="112" r={radius} 
            stroke="#f1f5f9" 
            strokeWidth="14" fill="none" 
          />
          
          {/* Progress Arc */}
          <motion.circle
            cx="112" cy="112" r={radius}
            stroke={strokeColor}
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline gap-1">
            <span className="text-6xl font-black text-slate-900 tracking-tighter">{score}</span>
            <span className="text-sm font-bold text-slate-300">/ 10</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Safety Index</span>
        </div>
      </div>

      <div className="mt-8">
        <div 
          className="inline-flex px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border"
          style={{ 
            backgroundColor: `${strokeColor}10`,
            color: strokeColor,
            borderColor: `${strokeColor}20`
          }}
        >
          {label} Protocol
        </div>
      </div>
    </div>
  );
}
