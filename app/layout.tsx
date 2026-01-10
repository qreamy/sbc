import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
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
                Kontakta oss
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
