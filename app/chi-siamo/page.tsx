import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { pages, paths, SITE_NAME, SITE_URL } from '@/lib/seo';
import ChiSiamoContent from './ChiSiamoContent';

export const metadata: Metadata = {
  title: pages.chiSiamo.title,
  description: pages.chiSiamo.description,
  alternates: { canonical: `${SITE_URL}${paths.chiSiamo}` },
  openGraph: {
    title: `${pages.chiSiamo.title} | Segno`,
    description: pages.chiSiamo.description,
    url: `${SITE_URL}${paths.chiSiamo}`,
  },
};

export default function ChiSiamoPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: `${pages.chiSiamo.title} | ${SITE_NAME}`,
          description: pages.chiSiamo.description,
          url: `${SITE_URL}${paths.chiSiamo}`,
          inLanguage: ['it', 'en'],
          mainEntity: {
            '@type': 'Organization',
            name: 'Relatronica',
            url: 'https://relatronica.com',
          },
        }}
      />
      <ChiSiamoContent />
    </>
  );
}
