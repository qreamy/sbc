import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Boka ett samtal — Southbase",
  description:
    "Boka ett samtal med Southbase för att diskutera er försäljningsstrategi, kvalificering och pipeline-system.",
};

export default function Book() {
  return (
    <main className="relative overflow-hidden bg-white">
      {/* Background Image */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <Image 
            src="/book-background.jpg"
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
        <div className="absolute inset-0 bg-white/40 z-[1]" />
        <div className="absolute inset-0 z-[2] opacity-[0.10] [background-image:radial-gradient(rgba(0,0,0,0.25)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute -top-40 left-1/2 h-[540px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.06),rgba(0,0,0,0)_70%)] blur-3xl z-[2]" />
        <div className="absolute -bottom-44 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.05),rgba(0,0,0,0)_70%)] blur-3xl z-[2]" />
      </div>

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.18em] uppercase text-neutral-500">Boka</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-[-0.01em] leading-[0.95] text-neutral-900 font-[var(--font-general-sans)]">
            Boka ett samtal
          </h1>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            Dela dina mål så berättar vi om Southbase är rätt för er. Om vi inte är det, pekar vi er ändå i rätt riktning.
          </p>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <ContactForm />
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
