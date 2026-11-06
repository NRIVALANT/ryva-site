import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CtaMobile } from "@/components/layout/cta-mobile";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { estIndexable } from "@/lib/indexation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: site.titre,
  description: site.description,
  robots: estIndexable()
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.langue}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Sur mobile, le bas de page réserve la hauteur de la barre CTA fixe (0,75 + 2,75 + 0,75 rem). */}
      <body className="flex min-h-full flex-col pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href={`#${site.idContenu}`}
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-action focus:px-4 focus:py-3 focus:text-marque-noir"
        >
          {ui.evitement}
        </a>
        <Header />
        <main id={site.idContenu} className="flex-1">
          {children}
        </main>
        <Footer />
        <CtaMobile />
      </body>
    </html>
  );
}
