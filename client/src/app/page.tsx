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
    <span className="text-white text-4xl md:text-[40px] font-bold mb-1 tracking-tight">{value}</span>
    <span className="text-indigo-200/60 text-[10px] font-bold uppercase tracking-[0.2em]">{label}</span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, colorClass, iconColor }: { icon: any; title: string; desc: string; colorClass: string; iconColor: string }) => (
  <motion.div 
    variants={fadeInUp}
    className="bg-white p-10 rounded-[2rem] shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 border border-slate-50 flex flex-col h-full group"
  >
    <div className={`w-16 h-16 ${colorClass} ${iconColor} rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110`}>
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-500 text-[15px] leading-relaxed mb-10 flex-grow font-medium">{desc}</p>
    <Link href="#" className="text-[#00A8A8] font-bold text-sm flex items-center gap-2 group/link">
      Learn more 
      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);

const StepItem = ({ number, icon: Icon, title, desc }: { number: string; icon: any; title: string; desc: string }) => (
  <div className="flex-1 flex flex-col items-center relative z-10">
    <div className="w-24 h-24 rounded-full bg-[#1B2A49] text-white flex items-center justify-center shadow-2xl relative group">
      <div className="flex flex-col items-center">
        <Icon className="w-6 h-6 mb-1 opacity-40 group-hover:opacity-100 transition-opacity" />
        <span className="font-bold text-xl">{number}</span>
      </div>
    </div>
    <h4 className="text-xl font-bold text-slate-900 mt-8 mb-3 tracking-tight">{title}</h4>
    <p className="text-slate-400 text-sm max-w-[200px] font-medium leading-relaxed">{desc}</p>
  </div>
);

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="bg-[#f8f9ff] min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-white via-slate-50 to-indigo-50/20 overflow-hidden pt-40 pb-32">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <motion.div 
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="z-10 space-y-10"
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-block py-2 px-5 rounded-full bg-[#00A8A8]/10 text-[#00A8A8] text-[10px] font-black uppercase tracking-[0.2em]"
            >
              Trusted by 10k+ women
            </motion.span>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tighter"
            >
              Navigate Safely. <br />
              Anywhere. Anytime.
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-[17px] text-slate-500 font-medium max-w-lg leading-relaxed"
            >
              Real-time protection for travel, location, and digital safety.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/safety-hub" className="bg-[#006a6a] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#004f4f] shadow-xl shadow-[#00A8A8]/10 transition-all flex items-center justify-center">
                Start Safety Check
              </Link>
              <Link href="#features" className="bg-slate-50 text-slate-600 border border-slate-100 px-8 py-4 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all flex items-center justify-center">
                Explore Features
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center items-center"
          >
            <div className="absolute w-[120%] h-[120%] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />
            <div className="relative">
               <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0rG9K37MC1E1Urae4sJL0WahpLTxAUrjg9O7gR1als03nIZD4JvprmEc1DHjjbRDfQNFgRxKLsYL00GkzjILaj_9OEteica2P15bOQjsbL1O8S2musk2jH7oH9vUqDwcwr4Y19Cr3SGfmsYeQZxNVzLsgr3p5uBZXia7iQhPjXv9ISx5kmKqpEh5NnC-kf_fSV3xssGe6N7nliqnr9-7fy-8a3fjdLe4bTSchkRoas0dKidTnOL5cw6iNnGDDMGU8a9V5Lgtfl9M"
                alt="Safety Illustration"
                width={480}
                height={480}
                className="rounded-[2rem] shadow-none aspect-square object-cover"
                priority
              />

              {/* Floating Preview Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 -left-12 bg-white p-6 rounded-[2rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.12)] border border-slate-50 flex items-center gap-5 hidden md:flex"
              >
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full blur-[6px]" />
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Smart Feature Preview</p>
                  <p className="text-[15px] font-bold text-[#1B2A49] tracking-tight">Safety Score: 8.2 — Low Risk Area</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS SECTION ────────────────────────────────────────── */}
      <section className="bg-[#1B2A49] py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
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
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-8 text-center space-y-20">
          <h2 className="text-3xl font-bold text-[#1B2A49] tracking-tight">Simple. Fast. Reliable.</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-[48px] left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-slate-100 border-t-2 border-dashed border-indigo-100 z-0" />
            
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
      <section className="py-32 px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-gradient-to-br from-[#00A8A8] to-[#1B2A49] p-20 md:p-32 rounded-[4rem] text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              Start Your Safety <br /> Journey Today
            </h2>
            <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Join thousands of women who navigate the world with confidence and peace of mind.
            </p>
            <Link href="/safety-hub" className="inline-flex bg-white text-[#1B2A49] px-14 py-5 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all group active:scale-95 items-center gap-3 shadow-xl">
              Get Started
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
            </Link>
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
