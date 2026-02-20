import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import { courses, getCourseBySlug } from '@/lib/data/lessons';
import CourseDetailContent from './CourseDetailContent';

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};

  return {
    title: course.title.it,
    description: course.longDescription?.it || course.description.it,
    alternates: { canonical: `${SITE_URL}/percorsi/${course.slug}` },
    openGraph: {
      title: `${course.title.it} | Segno`,
      description: course.description.it,
      type: 'website',
    },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const difficultyMap: Record<string, string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: course.title.it,
          description: course.longDescription?.it || course.description.it,
          url: `${SITE_URL}/percorsi/${course.slug}`,
          provider: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
          },
          educationalLevel: difficultyMap[course.difficulty] || course.difficulty,
          numberOfLessons: course.lessonsCount,
          timeRequired: `PT${course.duration.replace('h', 'H').replace('min', 'M')}`,
          inLanguage: ['it', 'en'],
          isAccessibleForFree: true,
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'Online',
            courseWorkload: course.duration,
          },
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
          ],
        }}
      />
      <CourseDetailContent slug={slug} />
    </>
  );
}
