import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/seo';
import StrumentiContent from './StrumentiContent';

export const metadata: Metadata = {
  title: 'Strumenti',
  description:
    'Risorse secondarie di consapevolezza digitale su Segno. Il cuore del progetto resta la timeline di trasparenza.',
  alternates: { canonical: `${SITE_URL}/strumenti` },
};

export default function StrumentiPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Strumenti — Segno',
          description: 'Risorse secondarie di consapevolezza digitale.',
          url: `${SITE_URL}/strumenti`,
        }}
      />
      <StrumentiContent />
    </>
  );
}
