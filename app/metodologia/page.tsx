import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import MetodologiaContent from './MetodologiaContent';

export const metadata: Metadata = {
  title: 'Metodologia',
  description:
    'Scopri come Segno calcola i punteggi di privacy, etica e sovranità digitale.',
  alternates: { canonical: `${SITE_URL}/metodologia` },
  openGraph: {
    title: 'Metodologia | Segno',
    description: 'Scopri come Segno calcola i punteggi di privacy, etica e sovranità digitale.',
  },
};

export default function MetodologiaPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'Metodologia — Segno',
          description: 'Come calcoliamo i punteggi e valutiamo i rischi su Segno.',
          url: `${SITE_URL}/metodologia`,
        }}
      />
      <MetodologiaContent />
    </>
  );
}
