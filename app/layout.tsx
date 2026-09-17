import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { FaviconHandler } from "@/components/FaviconHandler";
import { DocumentLang } from "@/components/DocumentLang";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
} from "@/lib/seo";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Segno",
  },
  description: SITE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  authors: [{ name: "Relatronica", url: "https://relatronica.com" }],
  creator: "Relatronica",
  publisher: "Relatronica",
  category: "transparency",
  icons: {
    icon: "/segno_logo.png",
    apple: "/segno_logo.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "it_IT",
    alternateLocale: "en_US",
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
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
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                name: SITE_NAME,
                url: SITE_URL,
                description: SITE_DESCRIPTION,
                inLanguage: ["it", "en"],
                publisher: { "@id": `${SITE_URL}/#publisher` },
              },
              {
                "@type": "Organization",
                "@id": `${SITE_URL}/#publisher`,
                name: "Relatronica",
                url: "https://relatronica.com",
                logo: {
                  "@type": "ImageObject",
                  url: `${SITE_URL}/segno_logo.png`,
                },
              },
            ],
          }}
        />
      </head>
      <body className={`${sourceSans.variable} ${sourceSerif.variable} ${plexMono.variable} antialiased`}>
        <FaviconHandler />
        <DocumentLang />
        <div className="flex min-h-dvh flex-col">
          <Navbar />
          <main className="flex min-h-0 flex-1 flex-col">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
