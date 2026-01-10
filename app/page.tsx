"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

/* ================= TYPEWRITER ================= */
type TypeStep = {
  text: string;
  speedMs: number;
  startDelayMs: number;
};

function useTypewriter(step: TypeStep) {
  const { text, speedMs, startDelayMs } = step;
  const [out, setOut] = useState("");

  useEffect(() => {
    let mounted = true;
    let t0: number | undefined;
    let i = 0;

    const start = window.setTimeout(() => {
      t0 = window.setInterval(() => {
        if (!mounted) return;
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length && t0) window.clearInterval(t0);
      }, speedMs);
    }, startDelayMs);

    return () => {
      mounted = false;
      window.clearTimeout(start);
      if (t0) window.clearInterval(t0);
    };
  }, [text, speedMs, startDelayMs]);

  return out;
}

/* ================= INTERACTIONS (NO LIBS) ================= */
function useInView<T extends Element>(opts?: IntersectionObserverInit) {
  const [inView, setInView] = useState(false);
  const ref = React.useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, opts ?? { threshold: 0.15 });

    io.observe(el);
    return () => io.disconnect();
  }, [opts]);

  return { ref, inView };
}

function Reveal({
  children,
  delayMs = 0,
  y = 14,
}: {
  children: React.ReactNode;
  delayMs?: number;
  y?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delayMs}ms`,
        transform: inView ? "translateY(0px)" : `translateY(${y}px)`,
        opacity: inView ? 1 : 0,
      }}
      className="transition-[transform,opacity] duration-700 ease-out will-change-transform"
    >
      {children}
    </div>
  );
}

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [style, setStyle] = useState<React.CSSProperties>({ transform: "none" });

  return (
    <div
      className={["group relative", className].join(" ")}
      style={style}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;

        setStyle({
          transform: `perspective(900px) rotateX(${(-py * 5).toFixed(
            2
          )}deg) rotateY(${(px * 7).toFixed(2)}deg) translateY(-2px)`,
        });
      }}
      onMouseLeave={() => setStyle({ transform: "none" })}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(700px_circle_at_50%_0%,rgba(0,0,0,0.09),transparent_58%)]" />
      {children}
    </div>
  );
}

/* ================= PAGE ================= */
type LogoItem = {
  src: string;
  alt: string;
  scale?: number;
};

export default function HomePage() {
  /* ---------------- HERO DATA ---------------- */
  const logos = useMemo<LogoItem[]>(
    () => [
      { src: "/logos/sst_net.png", alt: "SST NET", scale: 1 },
      { src: "/logos/movi_motors.png", alt: "Movi Motors", scale: 1.4 },
      { src: "/logos/hantverkskollen.png", alt: "Hantverkskollen", scale: 1.15 },
      { src: "/logos/cercino.png", alt: "Cercino", scale: 1 },
    ],
    []
  );

  const line1Text = "Försäljning som känns professionell";
  const line2Text = "— och levererar över tid.";
  const paragraphText =
    "Southbase tar operativt ansvar för telefonbaserad försäljning — med struktur, kvalitet och tydlig uppföljning.";

  const line1 = useTypewriter({ text: line1Text, speedMs: 34, startDelayMs: 220 });
  const line2 = useTypewriter({
    text: line2Text,
    speedMs: 26,
    startDelayMs: 220 + 34 * line1Text.length + 220,
  });
  
  // Calculate when typewriter finishes for line2, then add delay for fade-in
  const typewriterFinishTime = 220 + 34 * line1Text.length + 220 + 26 * line2Text.length;
  const paragraphFadeInDelay = typewriterFinishTime + 300; // 300ms after typewriter finishes
  
  const [paragraphVisible, setParagraphVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setParagraphVisible(true);
    }, paragraphFadeInDelay);
    return () => clearTimeout(timer);
  }, [paragraphFadeInDelay]);

  const marqueeItems = useMemo(() => [...logos, ...logos], [logos]);


  return (
    <main className="text-neutral-900">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden min-h-[100svh]">
        {/* Background Layer - unified surface */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Background Image */}
          <Image
            src="/hero-background.jpg"
            alt=""
            fill
            priority
            quality={85}
            className="object-cover z-0"
            style={{ opacity: 0.5 }}
            sizes="100vw"
          />
          
          {/* Subtle overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/50 to-white/40 z-[1]" />
          
          {/* Soft vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)] z-[2]" />
        </div>

        {/* Content Layer - with padding-top to avoid navbar */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-28 sm:pt-32 lg:pt-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mt-8">
              <h1 className="text-balance text-4xl font-bold tracking-[-0.01em] leading-[0.95] sm:text-6xl max-w-2xl mx-auto font-[var(--font-general-sans)]">
                <span className="text-neutral-900">{line1}</span>
                <span className="block text-neutral-600 mt-1">{line2}</span>
              </h1>

              <p
                className={`mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-neutral-700 sm:text-lg transition-opacity duration-700 ease-out ${
                  paragraphVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                {paragraphText}
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/* Primary CTA - Dark Frosted */}
              <a
                href="/book"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2"
                style={{
                  background: 'rgba(0, 0, 0, 0.55)',
                  backdropFilter: 'blur(12px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(12px) saturate(140%)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.55)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                }}
              >
                Boka ett samtal
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>

              {/* Secondary CTA - Light Frosted */}
              <a
                href="#vad"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold text-neutral-900 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.55)',
                  backdropFilter: 'blur(12px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(12px) saturate(140%)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.70)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.55)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                }}
              >
                Se hur vi jobbar
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>
            </div>

            {/* LOGO MARQUEE */}
            <div className="mt-16">
              <div className="mx-auto max-w-5xl rounded-3xl border border-neutral-200/80 bg-white/80 backdrop-blur-sm px-8 py-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.20)]">
                <div className="relative overflow-hidden">
                  <div className="sb-ticker flex w-max items-center gap-20 pr-20">
                    {marqueeItems.map((logo, idx) => (
                      <div key={`${logo.alt}-${idx}`} className="relative flex h-12 items-center justify-center flex-shrink-0">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={120}
                          height={48}
                          className="h-12 w-auto opacity-70 transition-opacity duration-300 hover:opacity-100 object-contain pointer-events-none"
                          style={{
                            transform: logo.scale ? `scale(${logo.scale})` : undefined,
                            transformOrigin: "center center",
                            maxHeight: "48px",
                          }}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <style>{`
                  @keyframes sb-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  .sb-ticker { 
                    animation: sb-marquee 35s linear infinite; 
                    will-change: transform;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    transform: translate3d(0, 0, 0);
                    -webkit-transform: translate3d(0, 0, 0);
                    perspective: 1000px;
                    -webkit-perspective: 1000px;
                  }
                  .sb-ticker:hover { animation-play-state: paused; }
                  @media (prefers-reduced-motion: reduce) {
                    .sb-ticker { animation: none !important; }
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>

        {/* Smooth fade to next section - matches Vad gör vi background exactly */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[20]"
          style={{
            height: 'clamp(200px, 35vh, 480px)',
            background: 'linear-gradient(to bottom, rgba(250,250,250,0) 0%, rgba(250,250,250,0.4) 30%, rgba(250,250,250,0.7) 60%, rgba(250,250,250,0.9) 85%, rgb(250,250,250) 100%)',
          }}
        />
      </section>

      {/* ================= VAD VI GÖR ================= */}
      <WhatWeDoSection />
    </main>
  );
}

/* ================= WHAT WE DO SECTION ================= */
type ServiceItem = {
  number: string;
  title: string;
  description: string;
};

function ServiceBlock({ service, index }: { service: ServiceItem; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3, rootMargin: '-100px 0px' });
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="relative transition-all duration-700 ease-out"
      style={{
        opacity: isActive ? 1 : 0.4,
        transform: isActive ? 'translateY(0)' : 'translateY(4px)',
        transitionDelay: `${index * 80}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Vertical axis line behind numbers */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.06) 10%, rgba(0,0,0,0.06) 90%, transparent 100%)',
          opacity: isActive ? 1 : 0.3,
          transition: 'opacity 700ms ease-out',
        }}
      />
      
      {/* Tiny left marker on hover */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full transition-all duration-200"
        style={{
          background: isHovered ? 'rgba(0,0,0,0.4)' : 'transparent',
          transform: isHovered ? 'translateY(-50%) translateX(-2px)' : 'translateY(-50%) translateX(0)',
        }}
      />

      <div 
        className="py-8 border-b border-neutral-200/40 transition-colors duration-200 cursor-default"
        style={{
          backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.025)' : 'transparent',
          paddingLeft: '24px',
        }}
      >
        <div className="flex items-start gap-8">
          <div className="flex-shrink-0 pt-1" style={{ width: '40px' }}>
            <span className="text-xs font-medium text-neutral-300 font-mono">
              {service.number}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 leading-[1.15] font-[var(--font-general-sans)] tracking-[-0.02em]">
              {service.title}
            </h3>
            <p className="text-base text-neutral-500 leading-[1.7] font-light max-w-lg" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatWeDoSection() {
  const services: ServiceItem[] = [
    {
      number: "01",
      title: "Projektledning",
      description: "Operativt ansvar från start till mål. Vi driver försäljningen hela vägen.",
    },
    {
      number: "02",
      title: "Process & struktur",
      description: "Tydliga, mätbara processer som skapar transparens och förutsägbarhet.",
    },
    {
      number: "03",
      title: "Tillväxt & erbjudande",
      description: "Optimering av erbjudande, positionering och försäljningsstrategi.",
    },
    {
      number: "04",
      title: "Sälj & kundresa",
      description: "Helhetssyn på kundresan – från första kontakt till långsiktig affär.",
    },
  ];

  const { ref: titleRef, inView: titleInView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const { ref: textRef, inView: textInView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section id="vad" className="relative bg-neutral-50 overflow-hidden py-24 sm:py-32">
      {/* Large typographic background - intentional framing with "EXECUTION" */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute"
          style={{ 
            left: '50%',
            top: '50%',
            transform: 'translateX(-48%) translateY(-50%)',
            filter: 'blur(0.5px)',
          }}
        >
          <span 
            className="block text-[400px] sm:text-[520px] lg:text-[640px] font-normal text-neutral-900 whitespace-nowrap font-[var(--font-general-sans)]"
            style={{ 
              opacity: 0.055, 
              letterSpacing: '-0.015em',
              fontWeight: 300,
            }}
          >
            EXECUTION
          </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left Column - Headline & Intro */}
          <div className="space-y-10">
            <div
              ref={titleRef}
              className="transition-all duration-700 ease-out"
              style={{
                opacity: titleInView ? 1 : 0,
                transform: titleInView ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.94] max-w-[32rem] font-[var(--font-general-sans)]">
                <span className="text-neutral-900 block tracking-[-0.03em]">Vi bygger försäljning</span>
                <span className="block text-neutral-900 mt-2 tracking-[-0.03em]">som håller</span>
                <span className="block text-neutral-500 mt-2 tracking-[-0.02em] font-semibold">över tid.</span>
              </h2>
            </div>

            <div
              ref={textRef}
              className="transition-all duration-700 ease-out delay-100"
              style={{
                opacity: textInView ? 1 : 0,
                transform: textInView ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              <p className="text-lg leading-[1.7] max-w-[50ch]" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                Southbase tar operativt ansvar för försäljning – från struktur och process till ledarskap och genomförande.
              </p>
            </div>

            {/* Premium editorial CTA */}
            <div
              className="mt-14 transition-all duration-700 ease-out delay-200"
              style={{
                opacity: textInView ? 1 : 0,
                transform: textInView ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              <a
                href="/services"
                className="group flex items-center gap-4 text-lg font-medium text-neutral-600 transition-all duration-300 hover:text-neutral-900"
              >
                <div 
                  className="w-px bg-neutral-300 transition-all duration-300 group-hover:bg-neutral-900"
                  style={{ height: '36px' }}
                />
                <span className="relative">
                  Läs mer om vårt upplägg
                  <span 
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-900 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                    style={{ 
                      transform: 'scaleX(0)', 
                      transformOrigin: 'left',
                      opacity: 0,
                    }}
                  />
                </span>
                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right Column - Framework list */}
          <div className="relative pt-2">
            <div className="pl-12 md:pl-16">
              {services.map((service, index) => (
                <ServiceBlock key={service.number} service={service} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 