import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { pages, SITE_URL } from '@/lib/seo';
import TrasparenzaContent from './TrasparenzaContent';

export const metadata: Metadata = {
  title: pages.timeline.title,
  description: pages.timeline.description,
  alternates: { canonical: `${SITE_URL}/timeline` },
  openGraph: {
    title: `${pages.timeline.title} | Segno`,
    description: pages.timeline.description,
    url: `${SITE_URL}/timeline`,
  },
};

export default function TimelinePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${pages.timeline.title} — Segno`,
          description: pages.timeline.description,
          url: `${SITE_URL}/timeline`,
          isPartOf: { '@id': `${SITE_URL}/#website` },
        }}
      />
      <TrasparenzaContent />
    </>
  );
}
