import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import { glossaryTerms } from '@/lib/data/glossary';
import GlossarioContent from './GlossarioContent';

export const metadata: Metadata = {
  title: 'Glossario della sovranità digitale',
  description:
    'Tutti i concetti chiave della sovranità digitale spiegati in modo chiaro: GDPR, AI Act, crittografia, open source, privacy e molto altro.',
  alternates: { canonical: `${SITE_URL}/glossario` },
  openGraph: {
    title: 'Glossario della sovranità digitale | Segno',
    description: 'I concetti chiave della sovranità digitale, spiegati in modo chiaro.',
  },
};

export default function GlossarioPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          name: 'Glossario della sovranità digitale',
          description: 'Concetti chiave della sovranità digitale.',
          url: `${SITE_URL}/glossario`,
          publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          hasDefinedTerm: glossaryTerms.map((term) => ({
            '@type': 'DefinedTerm',
            name: term.term.it,
            description: term.definition.it,
            inDefinedTermSet: `${SITE_URL}/glossario`,
          })),
        }}
      />
      <GlossarioContent />
    </>
  );
}
