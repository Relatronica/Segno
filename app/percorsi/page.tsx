import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import { courses } from '@/lib/data/lessons';
import PercorsiContent from './PercorsiContent';

export const metadata: Metadata = {
  title: 'Percorsi formativi sulla sovranità digitale',
  description:
    'Corsi strutturati per capire, difendere e rivendicare i tuoi diritti digitali. Privacy, GDPR, AI Act, attivismo digitale e alternative etiche.',
  alternates: { canonical: `${SITE_URL}/percorsi` },
  openGraph: {
    title: 'Percorsi formativi | Segno',
    description: 'Corsi strutturati per capire, difendere e rivendicare i tuoi diritti digitali.',
  },
};

export default function PercorsiPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Percorsi formativi sulla sovranità digitale',
          description: 'Corsi strutturati per la sovranità digitale.',
          url: `${SITE_URL}/percorsi`,
          numberOfItems: courses.length,
          itemListElement: courses.map((course, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Course',
              name: course.title.it,
              description: course.description.it,
              url: `${SITE_URL}/percorsi/${course.slug}`,
              provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
            },
          })),
        }}
      />
      <PercorsiContent />
    </>
  );
}
