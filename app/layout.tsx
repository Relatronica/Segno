import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FaviconHandler } from "@/components/FaviconHandler";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Segno — Sovranità digitale",
    template: "%s | Segno",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "sovranità digitale",
    "privacy",
    "diritti digitali",
    "GDPR",
    "AI Act",
    "etica digitale",
    "consapevolezza digitale",
    "attivismo digitale",
    "open source",
    "protezione dati",
  ],
  authors: [{ name: "Relatronica", url: "https://relatronica.com" }],
  creator: "Relatronica",
  icons: {
    icon: "/segno_logo.png",
    apple: "/segno_logo.png",
  },
  openGraph: {
    title: "Segno — Sovranità digitale",
    description: "Consapevolezza, conoscenza e strumenti per la sovranità digitale.",
    type: "website",
    locale: "it_IT",
    alternateLocale: "en_US",
    siteName: SITE_NAME,
    images: [
      {
        url: "/segno_logo.png",
        width: 512,
        height: 512,
        alt: "Segno — Sovranità digitale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Segno — Sovranità digitale",
    description: "Consapevolezza, conoscenza e strumenti per la sovranità digitale.",
    images: ["/segno_logo.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <head>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            inLanguage: ["it", "en"],
            publisher: {
              "@type": "Organization",
              name: "Relatronica",
              url: "https://relatronica.com",
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/segno_logo.png`,
              },
            },
          }}
        />
      </head>
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
