import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call — Southbase",
  description:
    "Book a call with Southbase to discuss outbound strategy, qualification, and pipeline systems.",
};

export default function Book() {
  return (
    <main className="relative overflow-hidden bg-white">
      {/* Background Image */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img 
          src="/book-background.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover z-0"
          style={{ opacity: 0.5 }}
        />
        {/* Light overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/40 z-[1]" />
        <div className="absolute inset-0 z-[2] opacity-[0.10] [background-image:radial-gradient(rgba(0,0,0,0.25)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute -top-40 left-1/2 h-[540px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.06),rgba(0,0,0,0)_70%)] blur-3xl z-[2]" />
        <div className="absolute -bottom-44 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.05),rgba(0,0,0,0)_70%)] blur-3xl z-[2]" />
      </div>

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.18em] uppercase text-neutral-500">Boka</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
            Boka ett samtal
          </h1>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            Dela dina mål så berättar vi om Southbase är rätt för er. Om vi inte är det, pekar vi er ändå i rätt riktning.
          </p>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <form className="rounded-2xl border border-neutral-200/80 bg-white/70 backdrop-blur p-8 md:p-10 grid gap-6 shadow-[0_18px_60px_-45px_rgba(0,0,0,0.18)]">
            <label className="text-sm font-medium text-neutral-900">
              Namn
              <input
                className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 focus:border-[rgb(var(--accent))]/50"
                placeholder="Ditt namn"
                autoComplete="name"
              />
            </label>

            <label className="text-sm font-medium text-neutral-900">
              E-post
              <input
                className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 focus:border-[rgb(var(--accent))]/50"
                placeholder="du@foretag.se"
                autoComplete="email"
              />
            </label>

            <label className="text-sm font-medium text-neutral-900">
              Företag
              <input
                className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 focus:border-[rgb(var(--accent))]/50"
                placeholder="Företagsnamn"
                autoComplete="organization"
              />
            </label>

            <label className="text-sm font-medium text-neutral-900">
              Vad vill ni uppnå?
              <textarea
                className="mt-2 min-h-[120px] w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/30 focus:border-[rgb(var(--accent))]/50"
                placeholder="Beskriv dina mål och vad ni försöker uppnå..."
              />
            </label>

            <button
              type="button"
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-[rgb(var(--accent))] px-6 py-3 text-sm font-medium text-white hover:bg-[rgb(var(--accent))]/90 transition"
            >
              Skicka förfrågan
            </button>
          </form>
        </div>
      </section>

      {/* Fade to footer */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 z-[5]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(250,250,250,0) 0%, rgba(250,250,250,0.4) 40%, rgba(250,250,250,0.6) 70%, rgba(250,250,250,0.8) 90%, rgb(250,250,250) 100%)",
        }}
      />
    </main>
  );
}
