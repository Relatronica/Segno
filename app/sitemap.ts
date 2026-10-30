import type { MetadataRoute } from 'next';
import { SITE_URL, paths } from '@/lib/seo';
import {
  listCuratedEventIds,
  listPersonSlugs,
  listPublishedEventIds,
  listThemeSlugs,
} from '@/lib/trasparenza/resolve';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const publishedIds = await listPublishedEventIds();
  const eventIds = [...new Set([...listCuratedEventIds(), ...publishedIds])];

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    {
      url: `${SITE_URL}${paths.timeline}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    ...listThemeSlugs().map((slug) => ({
      url: `${SITE_URL}${paths.timelineTema(slug)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/segnala`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}${paths.chiSiamo}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...listPersonSlugs().map((id) => ({
      url: `${SITE_URL}${paths.timelinePersona(id)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...eventIds.map((id) => ({
      url: `${SITE_URL}${paths.timelineEvento(id)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
