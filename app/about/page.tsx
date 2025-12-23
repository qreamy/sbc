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
        <p className="text-xs tracking-[0.18em] uppercase text-white/50">About</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
          Premium outbound, done properly.
        </h1>
        <p className="mt-6 text-white/60 leading-relaxed">
          Southbase exists to replace low-quality “dialing” with a real outbound system:
          clear targeting, compliant execution, tight qualification, and measurable iteration.
          We protect your brand, respect prospects, and build pipeline your sales team can trust.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="font-semibold tracking-tight">How we think</h2>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Outbound is a product. It needs positioning, QA, instrumentation, and iteration —
              not just activity.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="font-semibold tracking-tight">How we operate</h2>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Weekly reporting, call reviews, script refinements, list hygiene, and conversion-based decisions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
