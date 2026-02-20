import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import { courses, getLessonBySlug } from '@/lib/data/lessons';
import LessonContent from './LessonContent';

export function generateStaticParams() {
  return courses.flatMap((course) =>
    course.lessons.map((lesson) => ({
      slug: course.slug,
      lessonSlug: lesson.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const result = getLessonBySlug(slug, lessonSlug);
  if (!result) return {};

  const { course, lesson } = result;

  return {
    title: `${lesson.title.it} — ${course.title.it}`,
    description: lesson.description.it,
    alternates: { canonical: `${SITE_URL}/percorsi/${course.slug}/${lesson.slug}` },
    openGraph: {
      title: `${lesson.title.it} | Segno`,
      description: lesson.description.it,
      type: 'article',
    },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const { slug, lessonSlug } = await params;
  const result = getLessonBySlug(slug, lessonSlug);
  if (!result) notFound();

  const { course, lesson } = result;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: lesson.title.it,
          description: lesson.description.it,
          url: `${SITE_URL}/percorsi/${course.slug}/${lesson.slug}`,
          learningResourceType: 'lesson',
          educationalLevel: course.difficulty,
          timeRequired: `PT${lesson.duration.replace(' min', 'M').replace('min', 'M')}`,
          isPartOf: {
            '@type': 'Course',
            name: course.title.it,
            url: `${SITE_URL}/percorsi/${course.slug}`,
          },
          provider: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
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
            { '@type': 'ListItem', position: 2, name: 'Percorsi', item: `${SITE_URL}/percorsi` },
            { '@type': 'ListItem', position: 3, name: course.title.it, item: `${SITE_URL}/percorsi/${course.slug}` },
            { '@type': 'ListItem', position: 4, name: lesson.title.it, item: `${SITE_URL}/percorsi/${course.slug}/${lesson.slug}` },
          ],
        }}
      />
      <LessonContent slug={slug} lessonSlug={lessonSlug} />
    </>
  );
}
