import { JsonLd } from '@/components/JsonLd';
import { getHomeSnapshot } from '@/lib/data/trasparenza';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo';
import HomeContent from './HomeContent';

export default function Home() {
  const snapshot = getHomeSnapshot();

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Dataset',
          name: `${SITE_NAME} — Timeline regole digitali UE`,
          description: SITE_DESCRIPTION,
          url: SITE_URL,
          creator: {
            '@type': 'Organization',
            name: 'Relatronica',
            url: 'https://relatronica.com',
          },
          temporalCoverage: `${snapshot.fromYear}/${snapshot.toYear}`,
          variableMeasured: [
            `${snapshot.eventCount} eventi in timeline`,
            `${snapshot.actorCount} aziende`,
            `${snapshot.sourceCount} fonti citabili`,
          ],
          isAccessibleForFree: true,
          inLanguage: ['it', 'en'],
        }}
      />
      <HomeContent />
    </>
  );
}
