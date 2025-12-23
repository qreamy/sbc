import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call — Southbase",
  description:
    "Book a call with Southbase to discuss outbound strategy, qualification, and pipeline systems.",
};

export default function Book() {
  return (
    <main className="bg-neutral-950">
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <p className="text-xs tracking-[0.18em] uppercase text-white/50">Book</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
          Book a call
        </h1>
        <p className="mt-6 text-white/60 leading-relaxed">
          Share your goals and we’ll tell you if Southbase is a fit. If we’re not, we’ll still point you in the right direction.
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <form className="rounded-2xl border border-white/10 bg-white/5 p-8 grid gap-4">
            <label className="text-sm text-white/70">
              Name
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Your name"
                autoComplete="name"
              />
            </label>

            <label className="text-sm text-white/70">
              Email
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </label>

            <label className="text-sm text-white/70">
              Company
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Company name"
                autoComplete="organization"
              />
            </label>

            <label className="text-sm text-white/70">
              What are you trying to achieve?
              <textarea
                className="mt-2 min-h-[120px] w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Example: 20 qualified meetings/month for our closers. We sell to..."
              />
            </label>

            <button
              type="button"
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-white px-6 py-4 text-sm font-medium text-black hover:bg-white/90 transition"
            >
              Request call
            </button>

            <p className="text-xs text-white/40">
              This form is a simple placeholder (no backend yet).
            </p>
          </form>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-lg font-semibold tracking-tight">What happens next</h2>
            <ol className="mt-5 space-y-3 text-sm text-white/60">
              <li className="flex gap-3">
                <span className="mt-1 h-6 w-6 shrink-0 rounded-lg bg-white/10 border border-white/10 grid place-items-center text-xs text-white/70">
                  1
                </span>
                <span>We review your ICP, offer, and current outbound motion.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-6 w-6 shrink-0 rounded-lg bg-white/10 border border-white/10 grid place-items-center text-xs text-white/70">
                  2
                </span>
                <span>We share a clear recommendation (and whether we’re a fit).</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-6 w-6 shrink-0 rounded-lg bg-white/10 border border-white/10 grid place-items-center text-xs text-white/70">
                  3
                </span>
                <span>If aligned, we outline scope, launch plan, and reporting cadence.</span>
              </li>
            </ol>

            <div className="mt-8 rounded-xl border border-white/10 bg-black/30 p-5">
              <p className="text-xs text-white/50">
                Compliance note (placeholder): Outreach is executed with respectful practices and region-aware rules. This is not legal advice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
