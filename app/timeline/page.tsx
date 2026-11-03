import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { pages, SITE_URL } from '@/lib/seo';
import { parseMarketSnapshot } from '@/lib/data/market';
import { loadMarketSnapshot } from '@/lib/market/store';
import TrasparenzaContent from './TrasparenzaContent';

/** The band is weekly, so an hourly revalidation is already more than it needs;
    it only decides how long a refreshed snapshot waits before it is served. */
export const revalidate = 3600;

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

export default async function TimelinePage() {
  // Read here, not in the browser: the closes are third-party data that never
  // enters the repository, and the page ships its band already drawn.
  const snapshot = await loadMarketSnapshot();

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
      <TrasparenzaContent marketSeries={snapshot ? parseMarketSnapshot(snapshot) : undefined} />
    </>
  );
}
