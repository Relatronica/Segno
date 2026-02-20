import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import { resources, getResourceBySlug } from '@/lib/data/resources';
import ResourceDetailContent from './ResourceDetailContent';

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};

  return {
    title: resource.title.it,
    description: resource.description.it,
    alternates: { canonical: `${SITE_URL}/risorse/${resource.slug}` },
    openGraph: {
      title: `${resource.title.it} | Segno`,
      description: resource.description.it,
      type: 'article',
    },
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const categoryLabels: Record<string, string> = {
    guide: 'Guida',
    tools: 'Strumenti',
    research: 'Approfondimento',
    legal: 'Normativa',
  };

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: resource.title.it,
          description: resource.description.it,
          url: `${SITE_URL}/risorse/${resource.slug}`,
          articleSection: categoryLabels[resource.category] || resource.category,
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/segno_logo.png`,
            },
          },
          inLanguage: ['it', 'en'],
          isAccessibleForFree: true,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Risorse', item: `${SITE_URL}/risorse` },
            { '@type': 'ListItem', position: 3, name: resource.title.it, item: `${SITE_URL}/risorse/${resource.slug}` },
          ],
        }}
      />
      <ResourceDetailContent slug={slug} />
    </>
  );
}
