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

type Track = "operativt" | "utbildning";

export default function HomePage() {
  /* mörkblå accent */
  const accent = "8 48 80";

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

  /* ---------------- VAD VI GÖR ---------------- */
  const [active, setActive] = useState<Track>("operativt");
  const [lastActive, setLastActive] = useState<Track>("operativt");
  const [swapDir, setSwapDir] = useState<"left" | "right">("right");

  useEffect(() => {
    if (active !== lastActive) {
      setSwapDir(active === "operativt" ? "left" : "right");
      setLastActive(active);
    }
  }, [active, lastActive]);

  const details = useMemo(
    () => ({
      operativt: {
        kicker: "DONE-FOR-YOU",
        tag: "Operativt",
        title: "Vi gör försäljningen åt er.",
        desc:
          "Operativt ansvar: prospektering, outreach, samtal och uppföljning — med spårbarhet och kvalitetskontroll.",
        bullets: [
          ["Leverans", "Samtal + uppföljning"],
          ["Kvalitet", "QA + coaching"],
          ["Uppföljning", "Veckovis rapport"],
        ] as [string, string][],
        panelTitle: "Så ser leveransen ut",
        steps: [
          ["Setup", "Målgrupp, erbjudande, öppningar, invändningar och definition av “bra lead”."],
          ["Produktion", "Samtal + uppföljning drivs i vardagen. Varje kontakt får nästa steg."],
          ["Förbättring", "QA på samtal, coaching och justeringar veckovis."],
        ] as [string, string][],
        micro: "Vanligast när ni vill få fart snabbt utan att bygga team internt.",
      },
      utbildning: {
        kicker: "DONE-WITH-YOU",
        tag: "Utbildning",
        title: "Vi lär ert team sälja bättre.",
        desc:
          "Träning, manus, invändningshantering och struktur i pipeline — så att ni kan äga resultatet internt.",
        bullets: [
          ["Kompetens", "Samtalsteknik"],
          ["Material", "Manus + öppningar"],
          ["Ledning", "Rutin + uppföljning"],
        ] as [string, string][],
        panelTitle: "Upplägg för team",
        steps: [
          ["Baslinje", "Lyssning på samtal + tydlig standard för vad som är “bra”."],
          ["Träning", "Öppningar, kvalificering, invändningar. Rollspel som sitter i vardagen."],
          ["Coachloop", "Kort coaching varje vecka + fokusområden som håller utvecklingen i sig."],
        ] as [string, string][],
        micro: "Bästa när ni redan har säljare – men vill höja nivå och kvalitet snabbt.",
      },
    }),
    []
  );

  const a = details[active];

  // ======= shared styles (tunnare active outline) =======
  const cardBase =
    "group relative w-full overflow-hidden rounded-[28px] border bg-white p-9 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))]/25";

  const cardShadow =
    "shadow-[0_12px_40px_-28px_rgba(0,0,0,0.20)] hover:-translate-y-0.5 hover:shadow-[0_28px_90px_-60px_rgba(0,0,0,0.20)]";

  // Tunn blå outline (inte för tjock)
  const cardActive =
    "border-[rgb(var(--accent))]/35 shadow-[0_14px_44px_-34px_rgba(8,48,80,0.16)]";

  const cardInactive = "border-neutral-200/80";

  const badgeActive =
    "border-[rgb(var(--accent))]/30 bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))]";
  const badgeInactive = "border-neutral-200/80 bg-white text-neutral-600";

  return (
    <main className="bg-white text-neutral-900">
      <style jsx global>{`
        :root {
          --accent: ${accent};
        }
      `}</style>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          {/* Background Image */}
          <div className="relative h-full w-full">
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
          </div>
          {/* Light overlay to ensure text readability */}
          <div className="absolute inset-0 bg-white/60 z-[1]" />
          <div className="absolute inset-0 z-[2] opacity-[0.10] [background-image:radial-gradient(rgba(0,0,0,0.25)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute -top-40 left-1/2 h-[540px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.06),rgba(0,0,0,0)_70%)] blur-3xl z-[2]" />
          <div className="absolute -bottom-44 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.05),rgba(0,0,0,0)_70%)] blur-3xl z-[2]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-20 sm:pt-24 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-medium tracking-[0.22em] text-neutral-500">
              NORDISK SÄLJPARTNER
            </p>
            <div className="mx-auto mt-3 h-px w-16 bg-neutral-200" />

            <div className="mt-8">
              <h1 className="text-balance text-4xl font-semibold tracking-[-0.02em] leading-[1.05] sm:text-6xl">
                <span>{line1}</span>
                <span className="block text-neutral-500">{line2}</span>
              </h1>

              <p
                className={`mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-neutral-700 sm:text-lg transition-opacity duration-700 ease-out ${
                  paragraphVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                {paragraphText}
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/book"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[rgb(var(--accent))] px-7 text-sm font-medium text-white shadow-[0_14px_34px_-18px_rgba(8,48,80,0.55)] transition hover:opacity-95 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))]/30"
              >
                Boka ett samtal
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>

              <a
                href="#vad"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-neutral-200/80 bg-white px-7 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50 hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))]/30"
              >
                Se hur vi jobbar
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>
            </div>

            {/* LOGO MARQUEE */}
            <div className="mt-14">
              <div className="mx-auto max-w-5xl rounded-3xl border border-neutral-200/80 bg-white px-8 py-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.30),0_0_0_1px_rgba(8,48,80,0.08)]">
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
                  .sb-ticker img {
                    display: block;
                    max-width: none;
                  }
                  @media (prefers-reduced-motion: reduce) {
                    .sb-ticker { animation: none !important; }
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>

        {/* Fade to next section (till #fafafa) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-72 z-[20]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(250,250,250,0) 0%, rgba(250,250,250,0.4) 40%, rgba(250,250,250,0.7) 70%, rgba(250,250,250,0.85) 85%, rgb(250,250,250) 100%)",
          }}
        />
      </section>

      {/* ================= VAD VI GÖR ================= */}
      <section id="vad" className="relative bg-[#fafafa]">

        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 sm:pt-40 sm:pb-24">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="text-[11px] font-medium tracking-[0.22em] text-neutral-500">VAD VI GÖR</p>
                <div className="mt-3 h-px w-16 bg-neutral-200" />

                <h2 className="mt-8 text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
                  Välj spår — så får ni tydlig kontroll på{" "}
                  <span className="text-[rgb(var(--accent))]">resultatet.</span>
                </h2>

                <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-neutral-700 sm:text-lg">
                  Klicka på ett spår. Det du ser under byts direkt — med en mjuk animation — så det känns
                  självklart vad som ingår.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Cards */}
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal delayMs={60}>
              <TiltCard>
                <button
                  type="button"
                  onClick={() => setActive("operativt")}
                  className={[cardBase, cardShadow, active === "operativt" ? cardActive : cardInactive].join(" ")}
                >
                  {/* Active indicator with gradient */}
                  <div
                    className={[
                      "pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[rgb(var(--accent))] to-[rgb(var(--accent))]/60 transition-all duration-300",
                      active === "operativt" ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  />
                  {/* Subtle gradient overlay when active */}
                  {active === "operativt" && (
                    <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-[0.03] bg-[rgb(var(--accent))]" />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium tracking-widest text-neutral-500">{details.operativt.kicker}</p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">{details.operativt.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-700">{details.operativt.desc}</p>
                    </div>

                    <span
                      className={[
                        "rounded-full border px-3 py-1 text-xs transition",
                        active === "operativt" ? badgeActive : badgeInactive,
                      ].join(" ")}
                    >
                      {details.operativt.tag}
                    </span>
                  </div>

                  <div className="mt-8 space-y-4">
                    {details.operativt.bullets.map(([k, v], idx) => (
                      <div key={k} className="group/item">
                        <div className="flex items-start justify-between gap-6">
                          <p className="text-sm text-neutral-600 transition-colors group-hover/item:text-neutral-700">{k}</p>
                          <p className="text-sm font-medium text-neutral-900">{v}</p>
                        </div>
                        {idx !== details.operativt.bullets.length - 1 && (
                          <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-neutral-200/70 to-transparent" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-900">
                    Visa detaljer <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </div>
                </button>
              </TiltCard>
            </Reveal>

            <Reveal delayMs={120}>
              <TiltCard>
                <button
                  type="button"
                  onClick={() => setActive("utbildning")}
                  className={[cardBase, cardShadow, active === "utbildning" ? cardActive : cardInactive].join(" ")}
                >
                  {/* Active indicator with gradient */}
                  <div
                    className={[
                      "pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[rgb(var(--accent))] to-[rgb(var(--accent))]/60 transition-all duration-300",
                      active === "utbildning" ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  />
                  {/* Subtle gradient overlay when active */}
                  {active === "utbildning" && (
                    <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-[0.03] bg-[rgb(var(--accent))]" />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium tracking-widest text-neutral-500">{details.utbildning.kicker}</p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">{details.utbildning.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-700">{details.utbildning.desc}</p>
                    </div>

                    <span
                      className={[
                        "rounded-full border px-3 py-1 text-xs transition",
                        active === "utbildning" ? badgeActive : badgeInactive,
                      ].join(" ")}
                    >
                      {details.utbildning.tag}
                    </span>
                  </div>

                  <div className="mt-8 space-y-4">
                    {details.utbildning.bullets.map(([k, v], idx) => (
                      <div key={k} className="group/item">
                        <div className="flex items-start justify-between gap-6">
                          <p className="text-sm text-neutral-600 transition-colors group-hover/item:text-neutral-700">{k}</p>
                          <p className="text-sm font-medium text-neutral-900">{v}</p>
                        </div>
                        {idx !== details.utbildning.bullets.length - 1 && (
                          <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-neutral-200/70 to-transparent" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-900">
                    Visa detaljer <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </div>
                </button>
              </TiltCard>
            </Reveal>
          </div>

          {/* Details panel */}
          <Reveal delayMs={140}>
            <div className="relative mt-12 rounded-[28px] border border-neutral-200/80 bg-white/80 backdrop-blur p-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.20),0_0_0_1px_rgba(8,48,80,0.04)] sm:p-10">
              {/* Subtle accent line at top */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent))]/20 to-transparent" />
              <div
                key={active}
                className={[
                  "sb-swap will-change-transform",
                  swapDir === "left" ? "sb-swap-left" : "sb-swap-right",
                ].join(" ")}
              >
                <p className="text-xs font-medium tracking-widest text-neutral-500">{a.kicker}</p>

                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <h4 className="text-balance text-2xl font-semibold tracking-tight text-neutral-900">{a.panelTitle}</h4>
                  <span className="text-sm text-neutral-600">{a.micro}</span>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                  {a.steps.map(([t, p], i) => (
                    <div key={t} className="group relative rounded-2xl border border-neutral-200/80 bg-white p-6 transition-all duration-300 hover:border-[rgb(var(--accent))]/30 hover:shadow-md">
                      {/* Number badge with accent color */}
                      <div className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[rgb(var(--accent))]/10 text-xs font-semibold text-[rgb(var(--accent))] transition-colors group-hover:bg-[rgb(var(--accent))]/15">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="text-sm font-semibold text-neutral-900">{t}</p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-20 h-px w-full bg-neutral-200/70" />
        </div>
      </section>

      {/* page-level keyframes */}
      <style>{`
        @keyframes sb-swap-left {
          0% { opacity: 0; transform: translateX(-14px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes sb-swap-right {
          0% { opacity: 0; transform: translateX(14px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .sb-swap-left { animation: sb-swap-left 320ms ease-out both; }
        .sb-swap-right { animation: sb-swap-right 320ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .sb-swap-left, .sb-swap-right { animation: none !important; }
        }
      `}</style>
    </main>
  );
} 