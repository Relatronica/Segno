import type { Metadata } from 'next';
import { pages, SITE_URL } from '@/lib/seo';
import SegnalaContent from './SegnalaContent';

export const metadata: Metadata = {
  title: pages.segnala.title,
  description: pages.segnala.description,
  alternates: { canonical: `${SITE_URL}/segnala` },
  openGraph: {
    title: `${pages.segnala.title} | Segno`,
    description: pages.segnala.description,
    url: `${SITE_URL}/segnala`,
  },
};

export default function SegnalaPage() {
  return <SegnalaContent />;
}
