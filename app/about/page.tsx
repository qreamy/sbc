import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Southbase",
  description:
    "Southbase is a premium outbound sales partner that builds systems for predictable pipeline.",
};

export default function About() {
  return (
    <main className="bg-neutral-950">
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="font-semibold tracking-[-0.01em] leading-[1.15] font-[var(--font-general-sans)]">How we think</h2>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Outbound is a product. It needs positioning, QA, instrumentation, and iteration —
              not just activity.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="font-semibold tracking-[-0.01em] leading-[1.15] font-[var(--font-general-sans)]">How we operate</h2>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Weekly reporting, call reviews, script refinements, list hygiene, and conversion-based decisions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
