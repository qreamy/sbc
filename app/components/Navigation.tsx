"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus trap - focus first link when opened
      setTimeout(() => {
        const firstLink = dropdownRef.current?.querySelector("a");
        firstLink?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  // Handle smooth scroll with header offset
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
      if (!link) return;

      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const id = href.slice(1);
        const element = document.getElementById(id);
        if (element) {
          const headerHeight = 100; // Match HEADER_OFFSET
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[50] flex justify-center pt-4 transition-all duration-300 ${
        isScrolled ? "pt-3" : "pt-4"
      }`}
      role="banner"
    >
      <nav
        className={`
          relative
          flex items-center justify-between gap-4
          rounded-full
          border border-black/6
          transition-all duration-300
          ${isScrolled ? "px-4 py-2" : "px-5 py-2.5"}
        `}
        style={{ 
          maxWidth: "calc(100vw - 2rem)",
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(12px) saturate(140%)',
          WebkitBackdropFilter: 'blur(12px) saturate(140%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Logo - Left */}
        <Link
          href="/"
          className="flex-shrink-0 no-underline"
          onClick={() => setIsOpen(false)}
          aria-label="Southbase startsida"
        >
          <Image
            src="/logos/logga.svg"
            alt="Southbase"
            width={150}
            height={50}
            className="h-10 w-auto md:h-12"
            priority
          />
        </Link>

        {/* Hamburger - Center */}
        <div className="flex-1 flex justify-center">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-neutral-700 hover:text-neutral-900 transition-colors rounded-full hover:bg-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2"
            aria-label="Öppna meny"
            aria-expanded={isOpen}
            aria-controls="dropdown-menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* CTA Button - Right (Dark Glassmorphism) */}
        <Link
          href="/book"
          className={`
            flex-shrink-0
            inline-flex items-center gap-2
            rounded-full
            text-white
            font-medium
            transition-all duration-200
            hover:bg-black/65 active:scale-[0.98]
            border border-white/12
            font-[var(--font-general-sans)]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2
            ${isScrolled ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-sm"}
          `}
          style={{
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(10px) saturate(120%)',
            WebkitBackdropFilter: 'blur(10px) saturate(120%)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.55)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
          }}
          onClick={() => setIsOpen(false)}
        >
          Boka ett samtal
          <span className="text-white" aria-hidden="true">→</span>
        </Link>

        {/* Dropdown Menu - Separate rounded box below pill (Offmenu style) */}
        <div
          ref={dropdownRef}
          id="dropdown-menu"
          role="menu"
          className={`
            absolute top-full left-0 right-0
            w-full
            rounded-3xl
            border border-black/6
            overflow-hidden
            transition-all duration-200 ease-out
            ${isOpen ? "opacity-100 translate-y-0 visible mt-2" : "opacity-0 -translate-y-1 invisible pointer-events-none"}
          `}
          style={{
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(12px) saturate(140%)',
            WebkitBackdropFilter: 'blur(12px) saturate(140%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
          }}
        >
          <div className="py-1.5">
            <Link
              href="/#vad"
              className="block px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-black/4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-inset"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              Vad gör vi
            </Link>
            <div className="h-px bg-black/6 mx-2" />
            <Link
              href="/about"
              className="block px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-black/4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-inset"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              Om oss
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
