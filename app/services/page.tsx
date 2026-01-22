"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

function useInView<T extends Element>(opts?: IntersectionObserverInit) {
  const [inView, setInView] = useState(false);
  const ref = useRef<T | null>(null);

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
  y = 20,
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

function ServiceCard({ 
  number, 
  title, 
  description, 
  details, 
  index 
}: { 
  number: string; 
  title: string; 
  description: string; 
  details: string[]; 
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      {/* Subtle hover glow */}
      <div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 0, 0, 0.04), transparent 60%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* Clean card */}
      <div
        className="relative rounded-2xl border border-neutral-200 bg-white p-8 lg:p-10 transition-all duration-500"
        style={{
          transform: isHovered 
            ? `translateY(-4px) scale(1.01)` 
            : 'translateY(0) scale(1)',
          boxShadow: isHovered 
            ? '0 12px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)' 
            : '0 2px 8px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.02)',
        }}
      >
        {/* Number and Title */}
        <div className="flex items-start gap-6 mb-6">
          <span className="text-xs font-semibold font-mono tracking-[0.12em] text-neutral-400 transition-colors duration-300 group-hover:text-neutral-600">
            {number}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-[-0.025em] font-[var(--font-general-sans)] text-neutral-900 transition-colors duration-300">
            {title}
          </h2>
        </div>

        {/* Description */}
        <p className="text-lg sm:text-xl leading-[1.75] font-normal text-neutral-800 max-w-2xl mb-8">
          {description}
        </p>

        {/* Details grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {details.map((detail, detailIndex) => (
            <div
              key={detailIndex}
              className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 transition-all duration-300 group-hover:bg-neutral-100/50"
              style={{
                transform: isHovered ? `translateX(${detailIndex % 2 === 0 ? '2px' : '-2px'})` : 'translateX(0)',
                transitionDelay: `${detailIndex * 30}ms`,
              }}
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center mt-0.5 group-hover:bg-neutral-300 transition-colors duration-300">
                <span className="text-[10px] font-semibold text-neutral-600">✓</span>
              </div>
              <p className="text-sm leading-relaxed text-neutral-700">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const services = [
    {
      number: "01",
      title: "Projektledning",
      description: "Vi tar operativt ansvar från första dag till mål. Inga halvmesyrer – vi driver försäljningen hela vägen och levererar resultat ni kan mäta.",
      details: [
        "Operativt ansvar från start till mål",
        "Tydlig projektplanering och uppföljning",
        "Kontinuerlig optimering baserat på data",
        "Transparent kommunikation om framsteg",
      ],
    },
    {
      number: "02",
      title: "Process & struktur",
      description: "Tydliga, mätbara processer som skapar transparens och förutsägbarhet. Ni vet alltid var ni står, vad som händer härnäst, och hur framstegen mäts.",
      details: [
        "Mätbara processer med tydliga KPI:er",
        "Strukturerad leadhantering och uppföljning",
        "Automatiserad rapportering och analys",
        "Kontinuerlig processförbättring",
      ],
    },
    {
      number: "03",
      title: "Tillväxt & erbjudande",
      description: "Optimering av erbjudande, positionering och försäljningsstrategi baserat på vad som faktiskt fungerar. Vi testar, mäter och justerar kontinuerligt.",
      details: [
        "A/B-testning av erbjudanden och budskap",
        "Optimering av positionering och värdeerbjudande",
        "Strategisk prissättning och paketering",
        "Marknadsanalys och konkurrentinsikter",
      ],
    },
    {
      number: "04",
      title: "Sälj & kundresa",
      description: "Helhetssyn på kundresan – från första kontakt till långsiktig affär. Vi bygger relationer som håller, inte bara enstaka affärer.",
      details: [
        "Strukturerad kundresa från lead till kund",
        "Personlig och kvalitativ säljprocess",
        "Långsiktigt kundvärde och retention",
        "Kontinuerlig kundfeedback och förbättring",
      ],
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section - Shortened */}
      <section className="relative overflow-hidden bg-neutral-50 py-16 sm:py-20 md:py-24">
        {/* Background Image Layer - only in hero section */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/IMG_1532.jpg"
            alt=""
            fill
            priority
            quality={90}
            className="object-cover z-0"
            style={{ opacity: 0.42, filter: 'grayscale(100%)' }}
            sizes="100vw"
          />
          
          {/* Enhanced overlay for improved contrast and legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/65 to-white/50 z-[1]" />
          
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.2)_40%,rgba(255,255,255,0.3)_70%,rgba(255,255,255,0.4)_100%)] z-[2]" />
          
          {/* Soft vignette for focus */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_0%,rgba(0,0,0,0.02)_60%,rgba(0,0,0,0.04)_100%)] z-[3]" />
          
          {/* Fade to white at bottom of hero - will continue behind first service card */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[4]"
            style={{
              height: 'clamp(300px, 40vh, 500px)',
              background: 'linear-gradient(to bottom, rgba(250,250,250,0) 0%, rgba(250,250,250,0.3) 25%, rgba(250,250,250,0.6) 50%, rgba(250,250,250,0.85) 75%, rgb(250,250,250) 100%)',
            }}
          />
        </div>

        {/* Content Layer - shortened */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal delayMs={100} y={20}>
              <div>
                {/* Headline - all same font size */}
                <h1 className="text-balance text-5xl font-semibold tracking-[-0.02em] leading-[1.05] sm:text-7xl lg:text-8xl max-w-4xl mx-auto font-[var(--font-general-sans)]">
                  <span className="text-neutral-900 block">Vi bygger försäljning som håller</span>
                  <span className="block text-neutral-900 mt-3">över tid.</span>
                </h1>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Grid - fade continues behind first card */}
      <section className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-white">
        {/* Fade overlay that extends from hero section behind first service card */}
        <div
          className="pointer-events-none absolute inset-x-0 z-0"
          style={{
            top: '-clamp(300px, 40vh, 500px)',
            height: 'clamp(600px, 70vh, 900px)',
            background: 'linear-gradient(to bottom, rgba(250,250,250,0) 0%, rgba(250,250,250,0.2) 20%, rgba(250,250,250,0.5) 45%, rgba(250,250,250,0.8) 70%, rgb(250,250,250) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="space-y-12 sm:space-y-16">
            {services.map((service, index) => (
              <Reveal key={service.number} delayMs={index * 150} y={30}>
                <ServiceCard
                  number={service.number}
                  title={service.title}
                  description={service.description}
                  details={service.details}
                  index={index}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="bg-neutral-50 py-20 sm:py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <Reveal delayMs={0} y={20}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-[-0.03em] font-[var(--font-general-sans)] text-neutral-900 max-w-3xl mb-16">
              Så fungerar det
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                number: "1",
                title: "Mätbar pipeline",
                description: "Tydlig uppföljning av leads, konverteringar och resultat. Ni ser alltid var ni står och vad som händer härnäst.",
              },
              {
                number: "2",
                title: "Veckorapport",
                description: "Regelbunden kommunikation om framsteg och justeringar. Transparent och tydlig rapportering varje vecka.",
              },
              {
                number: "3",
                title: "Tydlig ansvarsfördelning",
                description: "Vem gör vad, när och hur det mäts. Inga gråzoner – bara tydlighet och ansvar.",
              },
            ].map((item, index) => (
              <Reveal key={index} delayMs={index * 100} y={30}>
                <div className="group relative p-8 rounded-2xl border border-neutral-200 bg-white transition-all duration-500 hover:border-neutral-300 hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-lg font-bold">{item.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-neutral-700">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <Reveal delayMs={0} y={30}>
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-[-0.03em] font-[var(--font-general-sans)] text-neutral-900">
                Redo att bygga försäljning som håller?
              </h2>
              <p className="text-lg sm:text-xl leading-[1.75] font-normal text-neutral-800 max-w-2xl mx-auto">
                Låt oss diskutera hur vi kan hjälpa er att bygga en försäljning som levererar resultat över tid.
              </p>
              <div className="pt-4">
                <Link
                  href="/book"
                  className="group relative inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4"
                  style={{
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.95)';
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.85)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  Boka ett samtal
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
