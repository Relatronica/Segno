import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { listTimelines } from '@/lib/db/spec';
import { FLAGSHIP_NAME, TIMELINE_SLUG } from '@/lib/db/timeline';
import { pages, paths, SITE_NAME, SITE_URL } from '@/lib/seo';
import LabContent, { type LabEntry } from './LabContent';

/** Il registro cambia lentamente; stesso passo della timeline. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: pages.lab.title,
  description: pages.lab.description,
  alternates: { canonical: `${SITE_URL}${paths.lab}` },
  openGraph: {
    title: `${pages.lab.title} | ${SITE_NAME}`,
    description: pages.lab.description,
    url: `${SITE_URL}${paths.lab}`,
  },
};

/** La flagship vive alla rotta dedicata; le altre al loro slug. */
function entryHref(slug: string): string {
  return slug === TIMELINE_SLUG ? paths.timeline : paths.timelineBySlug(slug);
}

/**
 * L'indice delle timeline. Legge il registro dal database; se non è raggiungibile
 * (una build senza chiavi) mostra comunque la flagship, così la pagina non
 * scompare e l'errore non è silenzioso.
 */
export default async function LabPage() {
  const registry = await listTimelines().catch((error: unknown) => {
    console.warn('[lab] registry unreadable:', error);
    return null;
  });

  const entries: LabEntry[] = registry
    ? registry.map((timeline) => ({
        slug: timeline.slug,
        name: timeline.name,
        intro: timeline.intro,
        href: entryHref(timeline.slug),
        flagship: timeline.slug === TIMELINE_SLUG,
      }))
    : [
        {
          slug: TIMELINE_SLUG,
          name: FLAGSHIP_NAME,
          href: paths.timeline,
          flagship: true,
        },
      ];

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${pages.lab.title} | ${SITE_NAME}`,
          description: pages.lab.description,
          url: `${SITE_URL}${paths.lab}`,
          inLanguage: ['it', 'en'],
        }}
      />
      <LabContent entries={entries} registryReadable={registry !== null} />
    </>
  );
}
