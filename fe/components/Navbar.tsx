"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '../lib/api';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await api.auth.login({ email: "coord@golden.edu", password: "coord123" });
      router.push('/workspace');
    } catch (err) {
      console.error('Login failed:', err);
      // For demo purposes, we can still redirect
      router.push('/workspace');
    }
  };

  return (
    <header className="h-[78px] md:h-[94px] flex items-center bg-white/97 border-b border-[#f0f2f5] z-50 sticky top-0">
      <div className="w-full max-w-[1380px] xl:max-w-[1648px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-3 md:gap-8">
        
        {/* Brand */}
        <Link href="#home" className="inline-flex items-center gap-2 md:gap-[11px] text-[20px] sm:text-[22px] md:text-[25px] font-[760] tracking-[-0.9px] whitespace-nowrap">
          <span className="w-[39px] h-[39px] sm:w-[43px] sm:h-[43px] md:w-[49px] md:h-[49px] rounded-xl md:rounded-[11px] bg-[#8b0028] flex items-center justify-center text-white shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-[20px] h-[20px] md:w-[25px] md:h-[25px]">
              <path d="M12 2.5 21 5v6.4c0 5.1-3.7 8.7-9 10.7-5.3-2-9-5.6-9-10.7V5l9-2.5Z" fill="currentColor" />
              <path d="M12 7.3v8.1M7.95 11.35h8.1" stroke="#8b0028" strokeWidth="2.15" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-[#111a2e]">Organ<span className="text-[#8b0028]">Trust</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center justify-center gap-[28px] xl:gap-[56px] mx-auto">
          <Link href="#how-it-works" className="text-[#4e5d74] text-[16px] font-[560] hover:text-[#8b0028] transition-colors duration-200">How it works</Link>
          <Link href="#features" className="text-[#4e5d74] text-[16px] font-[560] hover:text-[#8b0028] transition-colors duration-200">Features</Link>
          <Link href="#security" className="text-[#4e5d74] text-[16px] font-[560] hover:text-[#8b0028] transition-colors duration-200">Security</Link>
          <Link href="#documentation" className="text-[#4e5d74] text-[16px] font-[560] hover:text-[#8b0028] transition-colors duration-200">Documentation</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3.5 md:gap-[35px] whitespace-nowrap ml-auto lg:ml-0">
          <a href="#" onClick={handleSignIn} className="hidden md:block text-[16px] font-[620] text-[#34445e] hover:text-[#8b0028]">
            Sign in
          </a>
          <a href="#" onClick={handleSignIn} className="min-h-[43px] md:min-h-[50px] min-w-[99px] sm:min-w-[114px] md:min-w-[152px] inline-flex items-center justify-center rounded-full bg-[#8b0028] text-white font-[690] px-[12px] sm:px-[17px] md:px-[29px] text-[13px] sm:text-[14px] md:text-[16px] shadow-[0_8px_17px_rgba(72,0,24,0.12)] hover:-translate-y-[2px] hover:bg-[#760020] hover:shadow-[0_11px_22px_rgba(72,0,24,0.19)] transition-all duration-200">
            Get started
          </a>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden flex items-center justify-center w-[44px] h-[42px] border border-[#dfe7f0] rounded-[10px] bg-white text-[#111a2e]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isMobileMenuOpen ? (
                 <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                 <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[78px] md:top-[94px] left-0 right-0 p-[18px_24px_24px] bg-white border-b border-[#dfe7f0] flex flex-col gap-[19px] shadow-[0_14px_22px_rgba(15,23,42,0.05)]">
          <Link href="#how-it-works" className="text-[#4e5d74] text-[16px] font-[560]" onClick={() => setIsMobileMenuOpen(false)}>How it works</Link>
          <Link href="#features" className="text-[#4e5d74] text-[16px] font-[560]" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
          <Link href="#security" className="text-[#4e5d74] text-[16px] font-[560]" onClick={() => setIsMobileMenuOpen(false)}>Security</Link>
          <Link href="#documentation" className="text-[#4e5d74] text-[16px] font-[560]" onClick={() => setIsMobileMenuOpen(false)}>Documentation</Link>
          <a href="#" onClick={handleSignIn} className="text-[#34445e] text-[16px] font-[620] md:hidden">Sign in</a>
        </div>
      )}
    </header>
  );
}
