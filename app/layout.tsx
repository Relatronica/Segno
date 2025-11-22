import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Segno - Costruisci il tuo scenario AI e scopri l'impatto",
  description: "Strumento per valutare i rischi e l'impatto dell'utilizzo e progettazione di sistemi AI. Scopri come proteggere i dati, rispettare GDPR e AI Act.",
  keywords: ["AI", "rischi AI", "GDPR", "AI Act", "privacy", "etica AI", "valutazione rischi"],
  openGraph: {
    title: "Segno - Valutazione Rischi AI",
    description: "Costruisci il tuo scenario AI e scopri l'impatto. Strumento per valutare rischi, privacy e conformità normativa.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Segno - Valutazione Rischi AI",
    description: "Costruisci il tuo scenario AI e scopri l'impatto",
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
        {children}
      </body>
    </html>
  );
}
