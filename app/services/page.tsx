import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — Southbase",
  description:
    "Outbound calling, lead qualification, scripts & offer testing, CRM handoff, reporting, and compliance-friendly outreach.",
};

export default function Services() {
  return (
    <main className="bg-neutral-950">
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <p className="text-xs tracking-[0.18em] uppercase text-white/50">Services</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-[-0.01em] leading-[0.95] font-[var(--font-general-sans)]">
          Outbound that converts — and scales.
        </h1>
        <p className="mt-6 max-w-2xl text-white/60 leading-relaxed">
          Everything required to generate qualified meetings and pipeline without spammy tactics.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Outbound calling",
              text: "Premium calling that prioritizes real conversations and qualification over raw volume.",
            },
            {
              title: "Lead qualification + scoring",
              text: "Structured criteria, scoring, and CRM notes so closers get context-rich handoffs.",
            },
            {
              title: "Scripts + objection handling",
              text: "Scripts built for your ICP, tested in-market, refined based on outcomes.",
            },
            {
              title: "Offer + messaging testing",
              text: "We test positioning and offers quickly to find what actually converts.",
            },
            {
              title: "Pipeline design + CRM handoff",
              text: "Stages, fields, tags, and handoff rules that keep your pipeline clean.",
            },
            {
              title: "Reporting + QA",
              text: "Weekly reporting, call reviews, and continuous optimization.",
            },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-lg font-semibold tracking-[-0.01em] leading-[1.15] font-[var(--font-general-sans)]">{s.title}</h2>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/book"
            className="no-underline inline-flex items-center justify-center rounded-xl bg-white px-7 py-4 text-sm font-medium text-black hover:bg-white/90 transition"
          >
            Book a Call
          </Link>
        </div>
      </section>
    </main>
  );
}
