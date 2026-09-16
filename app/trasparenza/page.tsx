import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/seo';
import TrasparenzaContent from './TrasparenzaContent';

export const metadata: Metadata = {
  title: 'Trasparenza',
  description:
    'Timeline interattiva: lobbying sull’AI Act e sentiment dei leader big tech sull’IA — citazioni, fonti e filtri sullo stesso asse.',
  alternates: { canonical: `${SITE_URL}/trasparenza` },
  openGraph: {
    title: 'Trasparenza | Segno',
    description:
      'Scegli un tema nella sidebar: AI Act o Sentiment IA. Pin, citazioni e fonti sullo stesso asse temporale.',
  },
};

export default function TrasparenzaPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Trasparenza — Segno',
          description:
            'Timeline interattiva sul lobbying delle grandi aziende tecnologiche e le leggi digitali europee.',
          url: `${SITE_URL}/trasparenza`,
        }}
      />
      <TrasparenzaContent />
    </>
  );
}
