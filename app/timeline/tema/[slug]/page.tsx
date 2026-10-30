import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, paths } from '@/lib/seo';
import { resolveThemeBySlug } from '@/lib/trasparenza/resolve';
import { ThemeDetail } from './ThemeDetail';

/** Published pins move with the newsroom pipeline: refresh often. */
export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveThemeBySlug(slug);
  if (!resolved) return { title: 'Tema non trovato' };

  const { theme } = resolved;
  const url = `${SITE_URL}${paths.timelineTema(theme.slug)}`;

  return {
    title: theme.name.it,
    description: theme.intro.it,
    alternates: { canonical: url },
    openGraph: {
      title: `${theme.name.it} | Segno`,
      description: theme.intro.it,
      url,
      type: 'website',
    },
  };
}

export default async function TrasparenzaTemaPage({ params }: PageProps) {
  const { slug } = await params;
  const resolved = await resolveThemeBySlug(slug);
  if (!resolved) notFound();

  const { theme, events, people } = resolved;
  const url = `${SITE_URL}${paths.timelineTema(theme.slug)}`;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${theme.name.it} — Segno`,
          description: theme.intro.it,
          url,
          inLanguage: 'it',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: events.length,
            itemListElement: events.slice(0, 25).map((event, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${SITE_URL}${paths.timelineEvento(event.id)}`,
              name: event.title.it,
            })),
          },
        }}
      />
      <ThemeDetail
        theme={{
          slug: theme.slug,
          name: theme.name,
          shortName: theme.shortName,
          period: theme.period,
          intro: theme.intro,
          disclaimer: theme.disclaimer,
        }}
        events={events}
        people={people}
      />
    </>
  );
}
