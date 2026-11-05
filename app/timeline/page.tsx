import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { pages, SITE_URL } from '@/lib/seo';
import { parseMarketSnapshot } from '@/lib/data/market';
import { loadMarketSnapshot } from '@/lib/market/store';
import { loadPublicTimeline } from '@/lib/db/public';
import { loadTimelineSpec } from '@/lib/db/spec';
import { TIMELINE_SLUG } from '@/lib/db/timeline';
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

  // The spec — lenses, forms, tags, people, theses — now lives in Postgres;
  // `specs/ai.ts` is only the seed source. Unreadable or unseeded (a timeline
  // row with no axes yet), the bundled spec keeps the page drawing.
  const loadedSpec = await loadTimelineSpec(TIMELINE_SLUG).catch((error: unknown) => {
    console.warn('[timeline] spec unreadable, serving the bundled spec:', error);
    return null;
  });
  const spec = loadedSpec && loadedSpec.lenses.length > 0 ? loadedSpec : aiSpec;

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
      <TimelineSpecProvider spec={spec}>
        <TrasparenzaContent
          marketSeries={snapshot ? parseMarketSnapshot(snapshot) : undefined}
          initialTimeline={timeline}
        />
      </TimelineSpecProvider>
    </>
  );
}
