'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Bell, UserCircle2 } from 'lucide-react';

const navItems = [
  { name: 'Home',           href: '/' },
  { name: 'Safety Hub',     href: '/safety-hub' },
  { name: 'Routes',         href: '/route-safety' },
  { name: 'Area Scanner',   href: '/area-scanner' },
  { name: 'Emergency',      href: '/emergency' },
  { name: 'Digital Safety', href: '/digital-safety' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] bg-white transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand/Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#006a6a] rounded-lg flex items-center justify-center text-white shadow-sm">
             <Shield className="w-6 h-6 fill-current" />
          </div>
          <span className="text-xl font-bold text-[#1B2A49] tracking-tight">
            NaariSuraksha 360
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map(({ name, href }) => {
            const isActive = pathname === href;
            return (
              <Link 
                key={href} 
                href={href}
                className={`relative py-2 text-[13px] font-semibold transition-colors ${
                  isActive ? 'text-[#00A8A8]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {name}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00A8A8] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side Icons & CTA */}
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-slate-900 transition-colors">
            <Bell className="w-6 h-6 stroke-[1.5]" />
          </button>
          <button className="text-slate-400 hover:text-slate-900 transition-colors">
            <UserCircle2 className="w-7 h-7 stroke-[1.5]" />
          </button>
          <Link 
            href="/safety-hub"
            className="bg-[#00A8A8] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[#006a6a] transition-all active:scale-95"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}
