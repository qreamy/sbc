"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    // Check initial position
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-300 ${
        isAtTop ? "border-b border-neutral-200" : ""
      }`}
      role="banner"
    >
      {/* Background that cuts off - Transparent */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 100%)',
          backdropFilter: 'blur(12px) saturate(140%)',
          WebkitBackdropFilter: 'blur(12px) saturate(140%)',
        }}
      />
      
      <nav
        className="relative flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-3 sm:py-4 max-w-7xl mx-auto"
      >
        {/* Logo - Left */}
        <Link
          href="/"
          className="flex-shrink-0 no-underline"
          aria-label="Southbase startsida"
        >
          <Image
            src="/southbase.png"
            alt="Southbase"
            width={280}
            height={88}
            className="h-12 w-auto md:h-14"
            priority
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Navigation Links + CTA */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
          <Link
            href="/#vad"
            className="group relative inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors duration-300 no-underline"
          >
            <span className="hidden sm:inline">Vad gör vi</span>
            <span className="sm:hidden">Vad gör vi</span>
            <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:translate-x-0.5 opacity-60 group-hover:opacity-100 hidden sm:inline" aria-hidden="true">→</span>
            <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-300 origin-left transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
          </Link>
          
          {/* CTA Button - Apple style with glass effect */}
          <Link
            href="/book"
            className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 whitespace-nowrap"
            style={{
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.75)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}
          >
            <span className="hidden md:inline">Boka ett introduktionsamtal</span>
            <span className="md:hidden">Boka samtal</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 hidden sm:inline" aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
