import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { pages, SITE_URL } from '@/lib/seo';
import TrasparenzaContent from './TrasparenzaContent';

export const metadata: Metadata = {
  title: pages.trasparenza.title,
  description: pages.trasparenza.description,
  alternates: { canonical: `${SITE_URL}/trasparenza` },
  openGraph: {
    title: `${pages.trasparenza.title} | Segno`,
    description: pages.trasparenza.description,
    url: `${SITE_URL}/trasparenza`,
  },
};

export default function TrasparenzaPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${pages.trasparenza.title} — Segno`,
          description: pages.trasparenza.description,
          url: `${SITE_URL}/trasparenza`,
          isPartOf: { '@id': `${SITE_URL}/#website` },
        }}
      />
      <TrasparenzaContent />
    </>
  );
}
