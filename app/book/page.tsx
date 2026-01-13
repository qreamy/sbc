import type { Metadata } from "next";
import FAQ from "./FAQ";

export const metadata: Metadata = {
  title: "Boka ett samtal — Southbase",
  description:
    "Boka ett samtal med Southbase för att diskutera er försäljningsstrategi, kvalificering och pipeline-system.",
};

export default function Book() {
  return (
    <main className="relative overflow-hidden bg-white min-h-screen">
      {/* Enhanced Nano Tech Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Primary Grid Pattern - More visible */}
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
          }}
        />
        
        {/* Secondary Grid - Larger scale */}
        <div 
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)
            `,
            backgroundSize: '96px 96px',
          }}
        />
        
        {/* Diagonal Tech Lines - More visible */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 1px,
                rgba(0,0,0,0.2) 1px,
                rgba(0,0,0,0.2) 2px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 1px,
                rgba(0,0,0,0.15) 1px,
                rgba(0,0,0,0.15) 2px
              )
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Stronger horizontal accent lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-500/60 to-transparent" />
        <div className="absolute top-1/5 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-400/45 to-transparent" />
        <div className="absolute top-2/5 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-400/45 to-transparent" />
        <div className="absolute top-3/5 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-400/45 to-transparent" />
        <div className="absolute top-4/5 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-400/45 to-transparent" />
        
        {/* Stronger vertical accent lines */}
        <div className="absolute top-0 left-1/5 w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-400/40 to-transparent" />
        <div className="absolute top-0 left-2/5 w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-400/40 to-transparent" />
        <div className="absolute top-0 left-3/5 w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-400/40 to-transparent" />
        <div className="absolute top-0 left-4/5 w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-400/40 to-transparent" />
        
        {/* Enhanced corner accents - Larger and more visible */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-neutral-300/40 via-neutral-200/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-neutral-300/40 via-neutral-200/20 to-transparent" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-neutral-200/25 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-neutral-200/25 to-transparent" />
        
        {/* Dot pattern - More visible */}
        <div 
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Additional subtle pattern - Hexagonal feel */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                30deg,
                transparent,
                transparent 10px,
                rgba(0,0,0,0.1) 10px,
                rgba(0,0,0,0.1) 11px
              ),
              repeating-linear-gradient(
                -30deg,
                transparent,
                transparent 10px,
                rgba(0,0,0,0.1) 10px,
                rgba(0,0,0,0.1) 11px
              )
            `,
          }}
        />
      </div>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.05] font-[var(--font-general-sans)] text-neutral-900"
            style={{
              background: 'linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(38, 38, 38) 40%, rgb(115, 115, 115) 80%, rgb(163, 163, 163) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <span className="block">Boka ett</span>
            <span className="block">introduktionssamtal</span>
          </h1>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-neutral-200/60 bg-white shadow-sm overflow-hidden">
            {/* Cal.com Embed */}
            <div className="w-full">
              <iframe
                src="https://cal.com/leo-nisses-gagner-uewpxc/30min"
                title="Boka ett introduktionssamtal"
                className="w-full border-0"
                style={{ height: '750px' }}
                allow="camera; microphone; geolocation"
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ />
      </section>
    </main>
  );
}
