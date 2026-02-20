import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FaviconHandler } from "@/components/FaviconHandler";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Segno — Sovranità digitale",
    template: "%s | Segno",
  },
  description: "Piattaforma per la consapevolezza e la sovranità digitale. Percorsi formativi, risorse e strumenti per difendere i tuoi diritti nel mondo digitale.",
  keywords: ["sovranità digitale", "privacy", "diritti digitali", "GDPR", "AI Act", "etica digitale", "consapevolezza digitale", "attivismo digitale"],
  icons: {
    icon: '/segno_logo.png',
    apple: '/segno_logo.png',
  },
  openGraph: {
    title: "Segno — Sovranità digitale",
    description: "Consapevolezza, conoscenza e strumenti per la sovranità digitale.",
    type: "website",
    images: ['/segno_logo.png'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Segno — Sovranità digitale",
    description: "Consapevolezza, conoscenza e strumenti per la sovranità digitale.",
    images: ['/segno_logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <FaviconHandler />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
