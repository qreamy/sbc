import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Sora } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], display: "swap", variable: "--font-sora" });

export const metadata: Metadata = {
  title: "Southbase — Försäljning som fungerar i praktiken",
  description:
    "Southbase driver försäljning på uppdrag för nordiska bolag – från genomförande till optimering. Boka ett samtal.",
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="
        relative text-sm font-medium text-neutral-600 transition
        hover:text-neutral-900
        after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0
        after:bg-neutral-900 after:transition-all after:duration-300
        hover:after:w-full
      "
    >
      {children}
    </a>
  );
}

function BrandMark() {
  return (
    <span
      className="
        font-[var(--font-sora)]
        font-semibold tracking-tight
        text-[30px] sm:text-[32px]
        text-neutral-900
      "
      aria-label="Southbase"
    >
      southbase<span className="text-neutral-900">.</span>
    </span>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-[var(--font-inter)]">
        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-lg focus:bg-neutral-900 focus:px-4 focus:py-3 focus:text-white no-underline"
        >
          Hoppa till innehåll
        </a>

        <header className="sticky top-0 z-50 border-b sb-hairline bg-white/80 backdrop-blur transition-shadow hover:shadow-[0_10px_30px_-20px_rgba(0,0,0,0.15)]">
          <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            {/* Brand */}
            <Link href="/" className="no-underline inline-flex items-center">
              <div className="relative">
                <BrandMark />
                {/* subtle underline accent on hover */}
                <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-neutral-900/30 transition-all duration-300 group-hover:w-full" />
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-7">
              <NavLink href="#vad">Vad vi gör</NavLink>
              <NavLink href="#for-vilka">För vilka</NavLink>
              <NavLink href="#upplagg">Upplägg</NavLink>

              {/* Premium CTA */}
              <Link
                href="/book"
                className="
                  group relative inline-flex items-center gap-2
                  rounded-full bg-neutral-900 px-5 py-2
                  text-sm font-medium text-white
                  shadow-[0_12px_30px_-15px_rgba(0,0,0,0.6)]
                  transition-all duration-300
                  hover:bg-neutral-800 hover:shadow-[0_16px_40px_-18px_rgba(0,0,0,0.7)]
                  active:scale-[0.98]
                  overflow-hidden
                "
              >
                {/* subtle shine */}
                <span
                  className="
                    pointer-events-none absolute inset-0 opacity-0
                    bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.18),transparent)]
                    translate-x-[-60%]
                    transition-all duration-700
                    group-hover:opacity-100 group-hover:translate-x-[60%]
                  "
                />
                <span className="relative">Boka ett samtal</span>
                <span className="relative transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>

            {/* Mobile CTA */}
            <div className="md:hidden">
              <Link
                href="/book"
                className="
                  inline-flex items-center gap-2
                  rounded-full bg-neutral-900 px-4 py-2
                  text-sm font-medium text-white
                  shadow-sm transition
                  hover:bg-neutral-800
                  active:scale-[0.98]
                "
              >
                Boka <span className="opacity-80">→</span>
              </Link>
            </div>
          </nav>
        </header>

        <main id="innehall">{children}</main>

        <footer className="border-t sb-hairline">
          <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <p className="font-semibold tracking-tight">Southbase</p>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                Vi driver försäljning på uppdrag för nordiska bolag — med struktur, kvalitet och tydlig uppföljning.
              </p>
              <p className="mt-4 text-xs text-neutral-500">
                © {new Date().getFullYear()} Southbase
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/book"
                className="
                  no-underline inline-flex items-center justify-center rounded-full
                  bg-neutral-900 px-7 py-3 text-sm font-medium text-white
                  hover:bg-neutral-800 transition
                "
              >
                Boka ett samtal
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
