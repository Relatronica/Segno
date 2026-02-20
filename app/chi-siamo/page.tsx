import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import ChiSiamoContent from './ChiSiamoContent';

export const metadata: Metadata = {
  title: 'Chi siamo',
  description:
    'Scopri la missione, i valori e le persone dietro Segno. Lavoriamo per un digitale più giusto, trasparente e rispettoso dei diritti.',
  alternates: { canonical: `${SITE_URL}/chi-siamo` },
  openGraph: {
    title: 'Chi siamo | Segno',
    description: 'Scopri la missione, i valori e le persone dietro Segno.',
  },
};

export default function ChiSiamoPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'Chi siamo — Segno',
          description: 'La missione, i valori e le persone dietro Segno.',
          url: `${SITE_URL}/chi-siamo`,
          mainEntity: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
            description:
              'Piattaforma per la consapevolezza e la sovranità digitale.',
            foundingDate: '2024',
            parentOrganization: {
              '@type': 'Organization',
              name: 'Relatronica',
              url: 'https://relatronica.com',
            },
          },
        }}
      />
      <ChiSiamoContent />
    </>
  );
}
