import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { FaviconHandler } from "@/components/FaviconHandler";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

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
    default: "Segno — Chi influenza le regole digitali in Europa",
    template: "%s | Segno",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "trasparenza",
    "lobbying",
    "AI Act",
    "DSA",
    "DMA",
    "GDPR",
    "big tech",
    "Registro trasparenza UE",
    "diritti digitali",
    "sovranità digitale",
  ],
  authors: [{ name: "Relatronica", url: "https://relatronica.com" }],
  creator: "Relatronica",
  icons: {
    icon: "/segno_logo.png",
    apple: "/segno_logo.png",
  },
  openGraph: {
    title: "Segno — Chi influenza le regole digitali in Europa",
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "it_IT",
    alternateLocale: "en_US",
    siteName: SITE_NAME,
    images: [
      {
        url: "/segno_logo.png",
        width: 512,
        height: 512,
        alt: "Segno — Chi influenza le regole digitali in Europa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Segno — Chi influenza le regole digitali in Europa",
    description: SITE_DESCRIPTION,
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
      <body className={`${sourceSans.variable} ${sourceSerif.variable} ${plexMono.variable} antialiased`}>
        <FaviconHandler />
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
