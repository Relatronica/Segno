import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { pages, SITE_URL } from '@/lib/seo';
import { parseMarketSnapshot } from '@/lib/data/market';
import { loadMarketSnapshot } from '@/lib/market/store';
import { loadPublicTimeline } from '@/lib/db/public';
import { TimelineSpecProvider } from '@/components/trasparenza/TimelineSpecProvider';
import { aiSpec } from '@/specs/ai';
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
  // The live pins come from the same database the client re-fetches from, so
  // the first paint already carries the corrections and the manual pins. A
  // build without the service key — CI, a preview — still renders: it falls
  // back to the bundled base and the client picks the pins up on mount.
  const timeline = await loadPublicTimeline().catch((error: unknown) => {
    console.warn('[timeline] Postgres unreadable, serving the bundled base:', error);
    return undefined;
  });

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
      <TimelineSpecProvider spec={aiSpec}>
        <TrasparenzaContent
          marketSeries={snapshot ? parseMarketSnapshot(snapshot) : undefined}
          initialTimeline={timeline}
        />
      </TimelineSpecProvider>
    </>
  );
}
