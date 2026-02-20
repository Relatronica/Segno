import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { courses } from '@/lib/data/lessons';
import { resources } from '@/lib/data/resources';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/percorsi`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/risorse`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/glossario`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/mappa-digitale`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/stack-etico`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/news`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/chi-siamo`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${SITE_URL}/percorsi/${course.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const lessonPages: MetadataRoute.Sitemap = courses.flatMap((course) =>
    course.lessons.map((lesson) => ({
      url: `${SITE_URL}/percorsi/${course.slug}/${lesson.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  );

  const resourcePages: MetadataRoute.Sitemap = resources.map((resource) => ({
    url: `${SITE_URL}/risorse/${resource.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...coursePages, ...lessonPages, ...resourcePages];
}
