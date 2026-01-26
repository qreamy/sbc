import type { Metadata } from "next";
import GlassButton from "../components/GlassButton";

export const metadata: Metadata = {
  title: "Case Studies — Southbase",
  description:
    "Preview examples of outbound systems built by Southbase (placeholders you can replace with real results).",
};

export default function CaseStudies() {
  return (
    <main className="bg-neutral-950">
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <p className="text-xs tracking-[0.18em] uppercase text-white/50">Case studies</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-[-0.01em] leading-[0.95] font-[var(--font-general-sans)]">
          Proof you can swap with real results.
        </h1>
        <p className="mt-6 max-w-2xl text-white/60 leading-relaxed">
          These are placeholders for now. Replace with your client logos, metrics, screenshots, and quotes.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-lg font-semibold tracking-[-0.01em] leading-[1.15] font-[var(--font-general-sans)]">
              B2B SaaS — Qualified meetings engine (Placeholder)
            </h2>
            <ul className="mt-5 space-y-2 text-sm text-white/60">
              <li>• ICP + list strategy</li>
              <li>• Script + offer testing</li>
              <li>• Qualification scoring + CRM handoff</li>
              <li>• Weekly reporting + iteration</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-lg font-semibold tracking-[-0.01em] leading-[1.15] font-[var(--font-general-sans)]">
              Professional services — Compliance-first outbound (Placeholder)
            </h2>
            <ul className="mt-5 space-y-2 text-sm text-white/60">
              <li>• Targeting + messaging refinement</li>
              <li>• Objection handling + call QA</li>
              <li>• Clean handoffs to closers</li>
              <li>• Conversion-focused optimization</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <GlassButton
            href="/book"
            variant="light"
            className="group no-underline inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2"
          >
            Book a Call
            <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </GlassButton>
        </div>
      </section>
    </main>
  );
}
