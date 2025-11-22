import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FaviconHandler } from "@/components/FaviconHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Segno - Costruisci il tuo scenario AI e scopri l'impatto",
  description: "Strumento per valutare i rischi e l'impatto dell'utilizzo e progettazione di sistemi AI. Scopri come proteggere i dati, rispettare GDPR e AI Act.",
  keywords: ["AI", "rischi AI", "GDPR", "AI Act", "privacy", "etica AI", "valutazione rischi"],
  icons: {
    icon: '/segno_logo.png',
    apple: '/segno_logo.png',
  },
  openGraph: {
    title: "Segno - Valutazione Rischi AI",
    description: "Costruisci il tuo scenario AI e scopri l'impatto. Strumento per valutare rischi, privacy e conformità normativa.",
    type: "website",
    images: ['/segno_logo.png'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Segno - Valutazione Rischi AI",
    description: "Costruisci il tuo scenario AI e scopri l'impatto",
    images: ['/segno_logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FaviconHandler />
        {children}
      </body>
    </html>
  );
}
