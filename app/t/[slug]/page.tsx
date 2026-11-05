import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { TimelineSpecProvider } from '@/components/trasparenza/TimelineSpecProvider';
import { parseMarketSnapshot } from '@/lib/data/market';
import { loadPublicTimeline } from '@/lib/db/public';
import { loadTimelineSpec } from '@/lib/db/spec';
import { loadMarketSnapshot } from '@/lib/market/store';
import { SITE_URL, paths } from '@/lib/seo';
import TrasparenzaContent from '@/app/timeline/TrasparenzaContent';

/** Same cadence as the flagship: the market band is weekly, the pins move slower. */
export const revalidate = 3600;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const spec = await loadTimelineSpec(slug).catch(() => null);
  if (!spec) return { title: 'Timeline' };

  const title = `${spec.track.name.it} — Timeline`;
  const description = spec.track.intro.it;
  const url = `${SITE_URL}/t/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | Segno`, description, url },
  };
}

/**
 * Any timeline in the registry, addressed by slug. The engine is the same one
 * the flagship runs; only the spec and the content under it change. A timeline
 * lives in Postgres, so a slug the registry does not hold is a 404.
 */
export default async function TimelineBySlugPage({ params }: PageProps) {
  const { slug } = await params;

  // The spec is the timeline's identity: with no axes there is no page to draw.
  const spec = await loadTimelineSpec(slug).catch((error: unknown) => {
    console.warn(`[t/${slug}] spec unreadable:`, error);
    return null;
  });
  if (!spec || spec.lenses.length === 0) notFound();

  // The content degrades on its own: a build without the service key still
  // draws the lanes and the client picks the pins up on mount.
  const timeline = await loadPublicTimeline(slug).catch((error: unknown) => {
    console.warn(`[t/${slug}] Postgres unreadable, drawing the spec alone:`, error);
    return undefined;
  });

  // The market band is one global snapshot; only read it for timelines that
  // actually draw a series, so a second timeline does not pay for the flagship's.
  const needsMarket = spec.bands.some((band) => band.kind === 'series');
  const snapshot = needsMarket ? await loadMarketSnapshot() : null;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${spec.track.name.it} — Segno`,
          description: spec.track.intro.it,
          url: `${SITE_URL}/t/${slug}`,
          isPartOf: { '@id': `${SITE_URL}/#website` },
        }}
      />
      <TimelineSpecProvider spec={spec}>
        <TrasparenzaContent
          marketSeries={snapshot ? parseMarketSnapshot(snapshot) : undefined}
          initialTimeline={timeline}
          eventBase={paths.timelineBySlug(slug)}
        />
      </TimelineSpecProvider>
    </>
  );
}
