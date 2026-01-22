"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
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
  x = 0,
  scale = 1,
  opacity = true,
}: {
  children: React.ReactNode;
  delayMs?: number;
  y?: number;
  x?: number;
  scale?: number;
  opacity?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (prefersReducedMotion) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delayMs}ms`,
        transform: inView 
          ? `translateY(0px) translateX(0px) scale(${scale})` 
          : `translateY(${y}px) translateX(${x}px) scale(${scale * 0.95})`,
        opacity: opacity ? (inView ? 1 : 0) : 1,
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
    <main className="text-neutral-900" role="main">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden min-h-[100svh]">
        {/* Background Layer - unified surface */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Background Image - more subtle and atmospheric with parallax */}
          <div 
            className="absolute inset-0 z-0 transition-transform duration-[20s] ease-out"
            style={{
              transform: 'translateY(0)',
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width;
              const y = (e.clientY - rect.top) / rect.height;
              e.currentTarget.style.transform = `translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Image
              src="/hero-background.jpeg"
              alt=""
              fill
              priority
              quality={90}
              className="object-cover z-0"
              style={{ opacity: 0.42, filter: 'grayscale(100%)' }}
              sizes="100vw"
            />
          </div>
          
          {/* Enhanced overlay for improved contrast and legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/65 to-white/50 z-[1]" />
          
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.2)_40%,rgba(255,255,255,0.3)_70%,rgba(255,255,255,0.4)_100%)] z-[2]" />
          
          {/* Soft vignette for focus */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_0%,rgba(0,0,0,0.02)_60%,rgba(0,0,0,0.04)_100%)] z-[3]" />
        </div>

        {/* Content Layer - with padding-top to avoid navbar */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-32 pt-32 sm:pt-40 lg:pt-48">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal delayMs={100} y={20}>
              <div className="mt-4">
              {/* Primary headline - unmistakably primary and confident */}
              <h1 className="text-balance text-5xl font-semibold tracking-[-0.02em] leading-[1.05] sm:text-7xl lg:text-8xl max-w-4xl mx-auto font-[var(--font-general-sans)] mb-5">
                <span className="text-neutral-900 block">{line1}</span>
                {/* Secondary line - increased size for better balance */}
                <span className="block text-neutral-500 mt-4 text-5xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.015em] leading-[1.08]">{line2}</span>
              </h1>

              {/* Descriptive paragraph - improved contrast */}
              <p
                className={`mx-auto mt-10 max-w-2xl text-pretty text-base leading-[1.75] text-neutral-800 sm:text-lg transition-opacity duration-700 ease-out ${
                  paragraphVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                {paragraphText}
              </p>
            </div>
            </Reveal>

            {/* CTAs with improved spacing and premium treatment */}
            <Reveal delayMs={800} y={15}>
            <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4">
              {/* Primary CTA - More decisive and premium */}
              <a
                href="/book"
                className="group relative inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4"
                style={{
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.85)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.75)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                Boka ett samtal
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>

              {/* Secondary CTA - Text link style for clear hierarchy */}
              <a
                href="#vad"
                className="group relative inline-flex items-center gap-2 text-base font-medium text-neutral-600 transition-colors duration-300 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/50 focus-visible:ring-offset-4"
              >
                <span>Se hur vi jobbar</span>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 opacity-60 group-hover:opacity-100" aria-hidden="true">→</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-300 origin-left transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
              </a>
            </div>
            </Reveal>

            {/* LOGO MARQUEE - Improved visibility with subtle label */}
            <Reveal delayMs={600} y={20}>
              <div className="mt-16">
                <Reveal delayMs={650} y={10}>
                  <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider text-center mb-6">
                    Vi arbetar med
                  </p>
                </Reveal>
                <div className="mx-auto max-w-5xl rounded-3xl border border-neutral-200 bg-white/95 backdrop-blur-sm px-8 py-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.20)] transition-all duration-700 hover:shadow-[0_24px_72px_-40px_rgba(0,0,0,0.25)] hover:scale-[1.01]">
                <div className="relative overflow-hidden">
                  <div className="sb-ticker flex w-max items-center gap-20 pr-20">
                    {marqueeItems.map((logo, idx) => (
                      <div key={`${logo.alt}-${idx}`} className="relative flex h-12 items-center justify-center flex-shrink-0">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={120}
                          height={48}
                          className="h-12 w-auto opacity-85 transition-opacity duration-300 hover:opacity-100 object-contain pointer-events-none"
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
            </Reveal>
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

      {/* ================= OM OSS ================= */}
      <AboutUsSection />
    </main>
  );
}

/* ================= WHAT WE DO SECTION ================= */
type ServiceItem = {
  number: string;
  title: string;
  description: string;
};

function ServiceBlock({ service, index, isLast }: { service: ServiceItem; index: number; isLast?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25, rootMargin: '-80px 0px' });
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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
      className="relative transition-all duration-800 ease-out"
      style={prefersReducedMotion ? {} : {
        opacity: isActive ? 1 : 0.35,
        transform: isActive ? 'translateY(0) translateX(0)' : 'translateY(20px) translateX(-8px)',
        transitionDelay: `${index * 120}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Vertical guide line - more refined, stop before last item */}
      {!isLast && (
        <div 
          className="absolute left-[21px] top-0 bottom-0 w-[1px]"
          style={prefersReducedMotion ? {
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.04) 8%, rgba(0,0,0,0.04) 92%, transparent 100%)',
            opacity: isActive ? 1 : 0.25,
          } : {
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.04) 8%, rgba(0,0,0,0.04) 92%, transparent 100%)',
            opacity: isActive ? 1 : 0.25,
            transform: isActive ? 'scaleY(1)' : 'scaleY(0.3)',
            transformOrigin: 'top',
            transition: 'opacity 800ms ease-out, transform 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: `${index * 120}ms`,
          }}
        />
      )}
      
      {/* Deliberate number marker - systemized */}
      <div
        className="absolute left-0 top-9 w-12 flex items-center justify-start"
      >
        <span 
          className="text-xs font-semibold font-mono tracking-[0.08em] transition-all duration-300"
          style={{
            color: isHovered ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.25)',
            fontSize: '12px',
            letterSpacing: '0.12em',
          }}
        >
          {service.number}
        </span>
      </div>

      {/* Content block - clearer structure with enhanced hover */}
      <div 
        className={`py-10 transition-all duration-500 ease-out cursor-default rounded-xl ${isLast ? '' : 'border-b border-neutral-200/35'}`}
        style={{
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
          transform: isHovered ? 'translateX(8px) scale(1.01)' : 'translateX(0) scale(1)',
          paddingLeft: isHovered ? '72px' : '68px',
          marginLeft: '0',
          boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.03)' : 'none',
        }}
      >
        <div className="flex items-start gap-0">
          <div className="flex-1 max-w-[540px]">
            {/* Heading - stronger contrast */}
            <h3 
              className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-neutral-900 mb-4 leading-[1.18] font-[var(--font-general-sans)] tracking-[-0.025em] transition-colors duration-300"
              style={{
                color: isHovered ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.9)',
              }}
            >
              {service.title}
            </h3>
            {/* Description - improved contrast and more compelling */}
            <p 
              className="text-[15px] sm:text-base leading-[1.75] font-normal max-w-lg transition-colors duration-300 text-neutral-700"
              style={{ 
                color: isHovered ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.7)',
                lineHeight: '1.75',
              }}
            >
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatWeDoSection() {
  const { ref: sectionRef, inView: sectionInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const { ref: bgTextRef, inView: bgTextInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  
  const bgText = "DRIVE";
  
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
    <section 
      id="vad" 
      ref={sectionRef}
      className="relative bg-neutral-50 overflow-hidden py-16 sm:py-20 transition-opacity duration-1000"
      style={{
        opacity: sectionInView ? 1 : 0.7,
      }}
    >
      {/* Large typographic background - intentional framing */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          ref={bgTextRef}
          className="absolute left-1/2 top-1/2"
          style={{ 
            transform: 'translate(-50%, -50%)',
            filter: 'blur(1px)',
          }}
        >
          <style>{`
            @keyframes bg-text-reveal {
              0% { 
                clip-path: inset(0 100% 0 0);
              }
              100% { 
                clip-path: inset(0 0% 0 0);
              }
            }
            @keyframes bg-text-pulse {
              0%, 100% { 
                opacity: 0.08; 
              }
              50% { 
                opacity: 0.12; 
              }
            }
            .bg-text-hidden {
              clip-path: inset(0 100% 0 0);
            }
            .bg-text-animated {
              clip-path: inset(0 100% 0 0);
              animation: bg-text-reveal 1s steps(5, end) 0.5s forwards, bg-text-pulse 8s ease-in-out 2s infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .bg-text-animated,
              .bg-text-hidden {
                animation: none !important;
                clip-path: inset(0 0% 0 0) !important;
                opacity: 0.08 !important;
              }
            }
          `}</style>
          <span 
            className={`block text-[400px] sm:text-[520px] lg:text-[640px] font-normal text-neutral-900 whitespace-nowrap font-[var(--font-general-sans)] select-none ${bgTextInView ? 'bg-text-animated' : 'bg-text-hidden'}`}
            style={{ 
              opacity: 0.08,
              letterSpacing: '-0.015em',
              fontWeight: 300,
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          >
            {bgText}
          </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column - Bold narrative & positioning */}
          <div className="space-y-8 md:sticky md:top-24 md:max-h-[calc(100vh-8rem)]">
            <div
              ref={titleRef}
              className="transition-all duration-1000 ease-out"
              style={{
                opacity: titleInView ? 1 : 0,
                transform: titleInView ? 'translateY(0) translateX(0)' : 'translateY(20px) translateX(-10px)',
              }}
            >
              <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[4.5rem] font-semibold leading-[0.95] max-w-[36rem] font-[var(--font-general-sans)]">
                <span className="text-neutral-900 block tracking-[-0.03em] mb-1">Vi bygger försäljning</span>
                <span className="block text-neutral-900 mt-1 tracking-[-0.03em]">som håller</span>
                <span className="block text-neutral-500 mt-2 tracking-[-0.03em] font-semibold">över tid.</span>
              </h2>
            </div>

            <div
              ref={textRef}
              className="transition-all duration-1000 ease-out delay-200"
              style={{
                opacity: textInView ? 1 : 0,
                transform: textInView ? 'translateY(0) translateX(0)' : 'translateY(20px) translateX(-10px)',
              }}
            >
              <p className="text-lg sm:text-xl leading-[1.75] max-w-[52ch] font-normal text-neutral-800">
                Southbase tar operativt ansvar för försäljning – från struktur och process till ledarskap och genomförande.
              </p>
            </div>

            {/* Premium editorial CTA - refined */}
            <div
              className="pt-2 transition-all duration-1000 ease-out delay-400"
              style={{
                opacity: textInView ? 1 : 0,
                transform: textInView ? 'translateY(0) translateX(0)' : 'translateY(20px) translateX(-10px)',
              }}
            >
              <a
                href="/services"
                className="group relative inline-flex items-center gap-4 text-base font-medium text-neutral-600 transition-colors duration-300 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2"
              >
                <div 
                  className="w-[1px] bg-neutral-300 transition-all duration-300 group-hover:bg-neutral-900 group-hover:w-[2px]"
                  style={{ height: '40px' }}
                />
                <span className="relative pb-0.5 inline-block">
                  Läs mer om vårt upplägg
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900 origin-left transition-all duration-400 ease-out scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-100" />
                </span>
                <span className="text-xl transition-all duration-300 group-hover:translate-x-1.5 opacity-70 group-hover:opacity-100">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right Column - Structured, scannable delivery */}
          <div className="relative pt-1">
            <div className="pl-0 md:pl-4">
              {services.map((service, index) => (
                <ServiceBlock 
                  key={service.number} 
                  service={service} 
                  index={index} 
                  isLast={index === services.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= OM OSS SECTION ================= */
function AboutUsSection() {
  const { ref: imageRef, inView: imageInView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const { ref: contentRef, inView: contentInView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const { ref: sectionRef, inView: sectionInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section 
      ref={sectionRef}
      className="relative bg-white overflow-hidden transition-opacity duration-1000"
      aria-labelledby="about-us-heading"
      style={{
        opacity: sectionInView ? 1 : 0.7,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 sm:py-24 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Image - spans 6 columns, larger visual anchor */}
          <div 
            ref={imageRef}
            className="lg:col-span-6 relative order-2 lg:order-1"
            style={prefersReducedMotion ? {} : {
              opacity: imageInView ? 1 : 0,
              transform: imageInView ? 'translateY(0) translateX(0) scale(1)' : 'translateY(40px) translateX(-20px) scale(0.95)',
              transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl sm:rounded-3xl transition-transform duration-700 hover:scale-[1.02] group" style={{ filter: 'grayscale(100%)' }}>
              <Image
                src="/P1013091.jpg"
                alt="Team och människor bakom Southbase"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  objectPosition: 'center',
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 700px"
                quality={95}
                priority={false}
              />
              
              {/* Subtle gradient overlay for depth */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.03) 100%)',
                }}
              />

              {/* Refined border and shadow */}
              <div 
                className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
                style={{
                  border: '2px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: `
                    inset 0 1px 0 rgba(255, 255, 255, 0.8),
                    0 2px 4px rgba(0, 0, 0, 0.04),
                    0 8px 24px rgba(0, 0, 0, 0.03),
                    0 24px 64px rgba(0, 0, 0, 0.02)
                  `,
                }}
              />
            </div>
          </div>

          {/* Content - spans 6 columns, offset right */}
          <div 
            ref={contentRef}
            className="lg:col-span-6 order-1 lg:order-2 space-y-10"
            style={prefersReducedMotion ? {} : {
              opacity: contentInView ? 1 : 0,
              transform: contentInView ? 'translateY(0) translateX(0)' : 'translateY(40px) translateX(20px)',
              transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            }}
          >
            {/* Headline - matches process section size */}
            <h2 
              id="about-us-heading"
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[4.5rem] font-semibold leading-[0.95] tracking-[-0.03em] font-[var(--font-general-sans)] text-neutral-900"
            >
              <Reveal delayMs={300} y={15}>
                <span className="block tracking-[-0.03em] mb-1">Vi tar operativt</span>
              </Reveal>
              <Reveal delayMs={450} y={15}>
                <span className="block text-neutral-500 mt-2 tracking-[-0.03em] font-semibold text-5xl sm:text-6xl lg:text-7xl xl:text-[4.5rem]">ansvar.</span>
              </Reveal>
            </h2>

            {/* Body copy - flowing, editorial with credibility points */}
            <div className="space-y-6 pt-4">
              <Reveal delayMs={600} y={12}>
                <p className="text-lg sm:text-xl leading-[1.75] font-normal text-neutral-800 max-w-[52ch]">
                  När ni väljer att arbeta med oss tar vi operativt ansvar för försäljningen. Vi driver, strukturerar och levererar – från första samtal till långsiktig affär.
                </p>
              </Reveal>
              
              <Reveal delayMs={750} y={12}>
                <p className="text-lg sm:text-xl leading-[1.75] font-normal text-neutral-800 max-w-[52ch]">
                  Vi har byggt och drivit försäljning i flera år. Vi vet vad som fungerar, vad som inte gör det, och när det är dags att justera. Det är den erfarenheten ni får.
                </p>
              </Reveal>

              {/* Credibility points - enhanced with subtle visual markers */}
              <div className="space-y-4 pt-2">
                <Reveal delayMs={900} y={10}>
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-100 group-hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center mt-0.5 group-hover:scale-110">
                      <span className="text-[10px] font-semibold text-neutral-600 transition-transform duration-300 group-hover:scale-110">✓</span>
                    </div>
                    <p className="text-base sm:text-lg leading-[1.7] font-normal text-neutral-800 max-w-[48ch]">
                      <strong className="font-semibold text-neutral-900">Mätbar pipeline</strong> – Tydlig uppföljning av leads, konverteringar och resultat.
                    </p>
                  </div>
                </Reveal>
                <Reveal delayMs={1050} y={10}>
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-100 group-hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center mt-0.5 group-hover:scale-110">
                      <span className="text-[10px] font-semibold text-neutral-600 transition-transform duration-300 group-hover:scale-110">✓</span>
                    </div>
                    <p className="text-base sm:text-lg leading-[1.7] font-normal text-neutral-800 max-w-[48ch]">
                      <strong className="font-semibold text-neutral-900">Veckorapport</strong> – Regelbunden kommunikation om framsteg och justeringar.
                    </p>
                  </div>
                </Reveal>
                <Reveal delayMs={1200} y={10}>
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-100 group-hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center mt-0.5 group-hover:scale-110">
                      <span className="text-[10px] font-semibold text-neutral-600 transition-transform duration-300 group-hover:scale-110">✓</span>
                    </div>
                    <p className="text-base sm:text-lg leading-[1.7] font-normal text-neutral-800 max-w-[48ch]">
                      <strong className="font-semibold text-neutral-900">Tydlig ansvarsfördelning</strong> – Vem gör vad, när och hur det mäts.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* CTA - integrated with content flow */}
            <Reveal delayMs={1350} y={10}>
              <div className="pt-8 mt-8 border-t border-neutral-200/50">
                <a
                  href="/book"
                  className="group relative inline-flex items-center gap-4 text-base font-medium text-neutral-600 transition-all duration-300 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2"
                >
                <div 
                  className="w-[1px] bg-neutral-300 transition-all duration-300 group-hover:bg-neutral-900 group-hover:w-[2px]"
                  style={{ height: '40px' }}
                  aria-hidden="true"
                />
                <span className="relative pb-0.5 inline-block">
                  Boka ett samtal
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900 origin-left transition-all duration-400 ease-out scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-100" />
                </span>
                <span className="text-xl transition-all duration-300 group-hover:translate-x-1.5 opacity-70 group-hover:opacity-100" aria-hidden="true">
                  →
                </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
