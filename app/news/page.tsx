import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import NewsContent from './NewsContent';

export const metadata: Metadata = {
  title: 'News — Privacy, diritti digitali ed etica',
  description:
    'Le ultime notizie su privacy, diritti digitali, etica AI, GDPR e regolamentazione tecnologica.',
  alternates: { canonical: `${SITE_URL}/news` },
  openGraph: {
    title: 'News | Segno',
    description: 'Le ultime notizie su privacy, diritti digitali, etica e regolamentazione.',
  },
};

export default function NewsPage() {
  return <NewsContent />;
}
