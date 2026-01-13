import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Southbase — Försäljning som fungerar i praktiken",
  description:
    "Southbase driver försäljning på uppdrag för nordiska bolag – från genomförande till optimering. Boka ett samtal.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Southbase — Försäljning som fungerar i praktiken",
    description:
      "Southbase driver försäljning på uppdrag för nordiska bolag – från genomförande till optimering. Boka ett samtal.",
    type: "website",
    locale: "sv_SE",
    siteName: "Southbase",
    images: [
      {
        url: "/icon.svg",
        width: 499,
        height: 500,
        alt: "Southbase",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Southbase — Försäljning som fungerar i praktiken",
    description:
      "Southbase driver försäljning på uppdrag för nordiska bolag – från genomförande till optimering.",
    images: ["/icon.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={inter.variable}>
      <body className="font-[var(--font-inter)]">
        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-lg focus:bg-neutral-900 focus:px-4 focus:py-3 focus:text-white no-underline"
        >
          Hoppa till innehåll
        </a>

        <Navigation />

        <main id="innehall">{children}</main>

        <footer className="relative overflow-hidden bg-neutral-800">
          {/* Nano Tech Background */}
          <div className="pointer-events-none absolute inset-0 z-0">
            {/* Primary Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px',
              }}
            />
            
            {/* Secondary Grid - Larger scale */}
            <div 
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
                `,
                backgroundSize: '96px 96px',
              }}
            />
            
            {/* Diagonal Tech Lines */}
            <div 
              className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 1px,
                    rgba(255,255,255,0.25) 1px,
                    rgba(255,255,255,0.25) 2px
                  ),
                  repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 1px,
                    rgba(255,255,255,0.2) 1px,
                    rgba(255,255,255,0.2) 2px
                  )
                `,
                backgroundSize: '40px 40px',
              }}
            />
            
            {/* Horizontal accent lines */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            {/* Vertical accent lines */}
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/15 to-transparent" />
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/15 to-transparent" />
            <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/15 to-transparent" />
            
            {/* Dot pattern */}
            <div 
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-16">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-16">
              {/* Brand Column */}
              <div className="flex-1 max-w-md">
                <Link href="/" className="inline-block mb-4 no-underline">
                  <Image
                    src="/logos/logga.svg"
                    alt="Southbase"
                    width={150}
                    height={50}
                    className="h-10 w-auto md:h-12 brightness-0 invert"
                    priority
                  />
                </Link>
                <p className="text-sm leading-relaxed text-neutral-200">
                  Vi driver försäljning på uppdrag för nordiska bolag — med struktur, kvalitet och tydlig uppföljning.
                </p>
              </div>

              {/* Contact Column */}
              <div className="md:text-right">
                <p className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-4">
                  Kontakt
                </p>
                <div className="flex flex-col gap-3 md:items-end">
                  <a
                    href="mailto:contact@southbase.se"
                    className="text-sm text-neutral-200 hover:text-white transition-colors duration-200 no-underline"
                  >
                    contact@southbase.se
                  </a>
                  
                  <a
                    href="https://www.linkedin.com/company/southbase-consulting-ab/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group no-underline inline-flex items-center gap-2 text-sm text-neutral-200 hover:text-white transition-colors duration-200 w-fit"
                    aria-label="Följ oss på LinkedIn"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-neutral-300 group-hover:text-[#0077b5] transition-colors duration-200"
                    >
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-neutral-700/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-neutral-300">
              <span>© {new Date().getFullYear()} Southbase Consulting AB</span>
              <span>Helsingborg, Sverige</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
