import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { EventDetailPanel } from '@/components/trasparenza/EventDetailPanel';
import { lobbyPeople } from '@/lib/data/trasparenza';
import { SITE_URL, paths } from '@/lib/seo';
import { resolveEventById } from '@/lib/trasparenza/resolve';

/** Published pins move with the newsroom pipeline: refresh often. */
export const revalidate = 60;

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const resolved = await resolveEventById(id);
  if (!resolved) return { title: 'Punto non trovato' };

  const title = resolved.event.title.it;
  const description = resolved.event.summary.it;
  const url = `${SITE_URL}${paths.timelineEvento(resolved.event.id)}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | Segno`, description, url, type: 'article' },
  };
}

export default async function TrasparenzaEventPage({ params }: PageProps) {
  const { id } = await params;
  const resolved = await resolveEventById(id);
  if (!resolved) notFound();

  const { event, theme } = resolved;
  const url = `${SITE_URL}${paths.timelineEvento(event.id)}`;
  const person = event.personId
    ? lobbyPeople.find((p) => p.id === event.personId)
    : undefined;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: event.title.it,
          description: event.summary.it,
          datePublished: event.date,
          url,
          inLanguage: 'it',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          publisher: { '@id': `${SITE_URL}/#publisher` },
          citation: event.sourceUrl,
          articleSection: theme ? theme.name.it : 'Sentiment',
          about: person
            ? { '@type': 'Person', name: person.name, url: `${SITE_URL}${paths.timelinePersona(person.id)}` }
            : undefined,
        }}
      />
      <EventDetailPanel
        event={event}
        theme={theme ? { slug: theme.slug, name: theme.name } : null}
      />
    </>
  );
}
