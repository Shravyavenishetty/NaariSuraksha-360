'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield,
  Map as MapIcon,
  Scan,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
  Activity,
  Navigation,
  Search,
  CheckCircle,
  LayoutGrid
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// ─── Animation Variants ─────────────────────────────────────────────────────

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ─── Sub-components ──────────────────────────────────────────────────────────

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center text-center">
    <span className="text-white text-2xl md:text-3xl font-black mb-1 tracking-tighter">{value}</span>
    <span className="text-indigo-200/50 text-[9px] font-black uppercase tracking-[0.25em]">{label}</span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, colorClass, iconColor }: { icon: any; title: string; desc: string; colorClass: string; iconColor: string }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-500 border border-slate-50 flex flex-col h-full group"
  >
    <div className={`w-10 h-10 ${colorClass} ${iconColor} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
      <Icon className="w-4 h-4" />
    </div>
    <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight">{title}</h3>
    <p className="text-slate-500 text-[12px] leading-relaxed mb-4 flex-grow font-medium">{desc}</p>
    <Link href="#" className="text-[#00A8A8] font-black text-[10px] flex items-center gap-1.5 group/link uppercase tracking-wider">
      Explore
      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);

const StepItem = ({ number, icon: Icon, title, desc }: { number: string; icon: any; title: string; desc: string }) => (
  <div className="flex-1 flex flex-col items-center relative z-10 group">
    <div className="w-16 h-16 rounded-full bg-[#1B2A49] text-white flex items-center justify-center shadow-lg relative group-hover:scale-110 transition-transform">
      <div className="flex flex-col items-center">
        <Icon className="w-4 h-4 mb-0.5 opacity-40 group-hover:opacity-100 transition-opacity" />
        <span className="font-bold text-base leading-none">{number}</span>
      </div>
    </div>
    <h4 className="text-lg font-bold text-slate-900 mt-6 mb-2 tracking-tight">{title}</h4>
    <p className="text-slate-400 text-[13px] max-w-[200px] font-medium leading-relaxed">{desc}</p>
  </div>
);

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="bg-[#f8f9ff] min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-white via-slate-50 to-indigo-50/20 overflow-hidden pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="flex flex-col items-start space-y-6"
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-block py-1.5 px-4 rounded-full bg-[#00A8A8]/10 text-[#00A8A8] text-[9px] font-black uppercase tracking-[0.2em]"
            >
              Trusted by 10k+ women
            </motion.span>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] tracking-tighter"
            >
              Navigate Safely. <br />
              Anywhere. Anytime.
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-base text-slate-500 font-medium max-w-md leading-relaxed"
            >
              Real-time protection for travel, location, and digital safety. Our AI ensures you stay protected every step of the way.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <Link href="/safety-hub" className="bg-[#1B2A49] text-white px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-900/10 hover:bg-[#1B2A49]/90 transition-all active:scale-95">
                Start Safety Check
              </Link>
              <Link href="#features" className="text-slate-900 px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all active:scale-95">
                Explore Features
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="absolute w-[120%] h-[120%] bg-indigo-500/5 rounded-full blur-[100px] -z-10" />
            <div className="relative">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0rG9K37MC1E1Urae4sJL0WahpLTxAUrjg9O7gR1als03nIZD4JvprmEc1DHjjbRDfQNFgRxKLsYL00GkzjILaj_9OEteica2P15bOQjsbL1O8S2musk2jH7oH9vUqDwcwr4Y19Cr3SGfmsYeQZxNVzLsgr3p5uBZXia7iQhPjXv9ISx5kmKqpEh5NnC-kf_fSV3xssGe6N7nliqnr9-7fy-8a3fjdLe4bTSchkRoas0dKidTnOL5cw6iNnGDDMGU8a9V5Lgtfl9M"
                alt="Safety Illustration"
                width={440}
                height={440}
                className="drop-shadow-2xl"
                priority
              />

              {/* Floating Preview Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 -left-8 bg-white p-5 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-slate-50 flex items-center gap-4"
              >
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-500 rounded-full blur-[4px]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest leading-none">Smart Feature Preview</p>
                  <p className="text-xs font-black text-[#1B2A49] tracking-tight">Safety Score: 8.2 — Low Risk Area</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS SECTION ────────────────────────────────────────── */}
      <section className="bg-[#1B2A49] py-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="10K+" label="Users Protected" />
            <StatItem value="25K+" label="Safe Routes" />
            <StatItem value="5K+" label="Alerts Handled" />
            <StatItem value="100+" label="Cities Covered" />
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ─────────────────────────────────────── */}
      <section id="features" className="py-32 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl font-bold text-[#1B2A49] tracking-tight">Everything You Need for Complete Safety</h2>
            <div className="w-12 h-1 bg-[#00A8A8] mx-auto rounded-full" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <FeatureCard
              icon={MapIcon} title="SafeRoute" colorClass="bg-[#00A8A8]/10" iconColor="text-[#00A8A8]"
              desc="AI-powered pathfinding that prioritizes well-lit and populated areas for your walk."
            />
            <FeatureCard
              icon={Search} title="Area Scanner" colorClass="bg-sky-50" iconColor="text-sky-500"
              desc="Real-time safety score of your current surroundings based on live incident reports."
            />
            <FeatureCard
              icon={AlertTriangle} title="Emergency Mode" colorClass="bg-rose-50" iconColor="text-rose-500"
              desc="One-tap SOS that alerts authorities and your emergency contacts with live video feed."
            />
            <FeatureCard
              icon={ShieldCheck} title="Digital Safety" colorClass="bg-emerald-50" iconColor="text-emerald-500"
              desc="Protect your identity and data while browsing or using social platforms securely."
            />
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 text-center space-y-16">
          <h2 className="text-3xl font-black text-[#1B2A49] tracking-tight">Simple. Fast. Reliable.</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-[32px] left-1/2 -translate-x-1/2 w-[50%] h-[2px] bg-slate-100 border-t-2 border-dashed border-indigo-100/50 z-0" />

            <StepItem
              number="1" icon={LayoutGrid} title="Location Input"
              desc="Enter your destination or current whereabouts."
            />
            <StepItem
              number="2" icon={Activity} title="Analysis"
              desc="Our AI scans crowdsourced data and incident logs."
            />
            <StepItem
              number="3" icon={CheckCircle} title="Recommendation"
              desc="Get the safest path or immediate guidance."
            />
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────────────────── */}
      <section className="py-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-[#00A8A8] to-[#1B2A49] p-12 md:p-16 rounded-[2.5rem] text-center relative overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-black text-white tracking-tight">
              Start Your Safety Journey Today
            </h2>
            <p className="text-white/80 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
              Join thousands of women who navigate the world with confidence and peace of mind.
            </p>
            <div className="pt-4">
              <Link href="/safety-hub" className="inline-flex bg-white text-[#1B2A49] px-8 py-3 rounded-xl font-black text-sm hover:bg-slate-50 transition-all group active:scale-95 items-center gap-2 shadow-lg">
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-1 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#00A8A8] rounded-lg text-white shadow-lg">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tighter">NaariSuraksha 360</span>
            </div>
            <div className="space-y-4">
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                © 2024 NaariSuraksha 360. Empowering Women through Safety and Technology.
              </p>
            </div>
          </div>

          <FooterColumn title="Resources" links={['Help Center', 'Safety Guide', 'Community Guidelines']} />
          <FooterColumn title="Company" links={['About Us', 'Careers', 'Contact']} />
          <FooterColumn title="Legal" links={['Privacy Policy', 'Terms of Service']} />
        </div>
      </footer>
    </div>
  );
}

// ─── Footer Helper ──────────────────────────────────────────────────────────

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="space-y-8">
      <h5 className="font-bold text-slate-900 text-xs uppercase tracking-[0.2em]">{title}</h5>
      <nav className="flex flex-col gap-5">
        {links.map(link => (
          <Link key={link} href="#" className="text-slate-500 hover:text-[#00A8A8] transition-colors text-sm font-medium">
            {link}
          </Link>
        ))}
      </nav>
    </div>
  );
}
