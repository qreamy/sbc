import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import Navigation from "./components/Navigation";
import LoadingScreen from "./components/LoadingScreen";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Southbase — Försäljning som fungerar i praktiken",
  description:
    "Southbase tar operativt ansvar för telefonbaserad försäljning för nordiska bolag. Vi driver, strukturerar och levererar – med mätbar pipeline, veckorapport och tydlig ansvarsfördelning. Boka ett samtal.",
  keywords: ["försäljning", "sälj", "B2B försäljning", "telefonförsäljning", "försäljningskonsult", "Sverige"],
  authors: [{ name: "Southbase Consulting AB" }],
  creator: "Southbase Consulting AB",
  publisher: "Southbase Consulting AB",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Southbase — Försäljning som fungerar i praktiken",
    description:
      "Southbase tar operativt ansvar för telefonbaserad försäljning för nordiska bolag. Vi driver, strukturerar och levererar – med mätbar pipeline, veckorapport och tydlig ansvarsfördelning.",
    type: "website",
    locale: "sv_SE",
    siteName: "Southbase",
    url: "https://southbase.se",
    images: [
      {
        url: "/favicon-96x96.png",
        width: 96,
        height: 96,
        alt: "Southbase logotyp",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Southbase — Försäljning som fungerar i praktiken",
    description:
      "Southbase tar operativt ansvar för telefonbaserad försäljning för nordiska bolag. Vi driver, strukturerar och levererar.",
    images: ["/favicon-96x96.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={inter.variable}>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="Southbase" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Southbase Consulting AB",
              "url": "https://southbase.se",
              "logo": "https://southbase.se/logos/logga.svg",
              "description": "Southbase tar operativt ansvar för telefonbaserad försäljning för nordiska bolag.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Helsingborg",
                "addressCountry": "SE"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "contact@southbase.se",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.linkedin.com/company/southbase-consulting-ab"
              ]
            })
          }}
        />
      </head>
      <body className="font-[var(--font-inter)]">
        <LoadingScreen />
        
        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-lg focus:bg-neutral-900 focus:px-4 focus:py-3 focus:text-white no-underline"
        >
          Hoppa till innehåll
        </a>

        <Navigation />

        <main id="innehall">{children}</main>

        <footer className="relative overflow-hidden bg-white">
          {/* Subtle background pattern for white background */}
          <div className="pointer-events-none absolute inset-0 z-0">
            {/* Primary Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 sm:gap-12 md:gap-16">
              {/* Brand Column */}
              <div className="flex-1 max-w-md">
                <Link href="/" className="block mb-3 sm:mb-4 no-underline -ml-1 sm:-ml-2 md:-ml-3">
                  <Image
                    src="/logos/logga.svg"
                    alt="Southbase"
                    width={200}
                    height={67}
                    className="h-12 sm:h-14 md:h-16 w-auto"
                    priority
                  />
                </Link>
                <p className="text-xs sm:text-sm leading-relaxed text-neutral-600">
                  Vi driver försäljning på uppdrag för nordiska bolag — med struktur, kvalitet och tydlig uppföljning.
                </p>
              </div>

              {/* Contact Column */}
              <div className="md:text-right md:pt-4">
                <p className="text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-3 sm:mb-4">
                  Kontakt
                </p>
                <div className="flex flex-col gap-2 sm:gap-3 md:items-end">
                  <a
                    href="mailto:contact@southbase.se"
                    className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors duration-200 no-underline"
                  >
                    contact@southbase.se
                  </a>
                  
                  <a
                    href="https://www.linkedin.com/company/southbase-consulting-ab/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group no-underline inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900 transition-colors duration-200 w-fit"
                    aria-label="Följ oss på LinkedIn"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-neutral-600 group-hover:text-[#0077b5] transition-colors duration-200"
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
            <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-neutral-500">
              <span>© {new Date().getFullYear()} Southbase Consulting AB</span>
              <span>Helsingborg, Sverige</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
