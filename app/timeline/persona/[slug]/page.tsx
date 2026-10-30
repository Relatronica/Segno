import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, paths } from '@/lib/seo';
import { resolvePersonBySlug } from '@/lib/trasparenza/resolve';
import { PersonDetail } from './PersonDetail';

/** Published pins move with the newsroom pipeline: refresh often. */
export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolvePersonBySlug(slug);
  if (!resolved) return { title: 'Protagonista non trovato' };

  const { person, events } = resolved;
  const description =
    events[0]?.summary.it ??
    `${person.name} — ${person.role.it}. Tracce e dichiarazioni sulla timeline di Segno.`;
  const url = `${SITE_URL}${paths.timelinePersona(person.id)}`;

  return {
    title: person.name,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${person.name} | Segno`, description, url, type: 'profile' },
  };
}

export default async function TrasparenzaPersonaPage({ params }: PageProps) {
  const { slug } = await params;
  const resolved = await resolvePersonBySlug(slug);
  if (!resolved) notFound();

  const { person, events } = resolved;
  const url = `${SITE_URL}${paths.timelinePersona(person.id)}`;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url,
          inLanguage: 'it',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          mainEntity: {
            '@type': 'Person',
            name: person.name,
            jobTitle: person.role.it,
            url,
          },
          hasPart: events.slice(0, 20).map((event) => ({
            '@type': 'Article',
            headline: event.title.it,
            datePublished: event.date,
            url: `${SITE_URL}${paths.timelineEvento(event.id)}`,
            citation: event.sourceUrl,
          })),
        }}
      />
      <PersonDetail person={person} events={events} />
    </>
  );
}
