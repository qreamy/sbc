"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

function NavAnchor({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="no-underline text-sm text-neutral-600 hover:text-neutral-900 transition"
    >
      {children}
    </a>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC to close + lock body scroll
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        document.removeEventListener("keydown", onKeyDown);
      };
    }

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-50",
        "bg-white/70 backdrop-blur-xl",
        "border-b",
        scrolled ? "border-neutral-200/70 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.35)]" : "border-transparent",
      ].join(" ")}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="no-underline inline-flex items-center gap-3">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 bg-white text-sm font-semibold">
            S
            <span className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)]" />
          </span>
          <span className="font-semibold tracking-tight">Southbase</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          <NavAnchor href="#vad">Vad vi gör</NavAnchor>
          <NavAnchor href="#for-vilka">För vilka</NavAnchor>
          <NavAnchor href="#upplagg">Upplägg</NavAnchor>

          <Link
            href="/book"
            className="no-underline group inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
            Boka ett samtal
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/book"
            className="no-underline inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
            Boka
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Öppna meny"
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 transition"
          >
            <span className="sr-only">Meny</span>
            <div className="grid gap-1">
              <span className="h-0.5 w-5 bg-neutral-900 rounded" />
              <span className="h-0.5 w-5 bg-neutral-900 rounded" />
              <span className="h-0.5 w-5 bg-neutral-900 rounded" />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
          <div
            ref={panelRef}
            className="absolute right-3 top-3 w-[min(92vw,380px)] rounded-3xl border border-neutral-200 bg-white p-4 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-between px-2 py-1">
              <p className="text-sm font-semibold tracking-tight">Meny</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 transition"
                aria-label="Stäng meny"
              >
                ✕
              </button>
            </div>

            <div className="mt-2 grid gap-2">
              <a
                href="#vad"
                onClick={() => setOpen(false)}
                className="no-underline rounded-2xl px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition"
              >
                Vad vi gör
              </a>
              <a
                href="#for-vilka"
                onClick={() => setOpen(false)}
                className="no-underline rounded-2xl px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition"
              >
                För vilka
              </a>
              <a
                href="#upplagg"
                onClick={() => setOpen(false)}
                className="no-underline rounded-2xl px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition"
              >
                Upplägg
              </a>
            </div>

            <div className="mt-3 px-2">
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="no-underline group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
                Boka ett samtal
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
