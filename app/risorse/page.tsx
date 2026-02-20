import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import RisorseContent from './RisorseContent';

export const metadata: Metadata = {
  title: 'Risorse — Guide, strumenti e approfondimenti',
  description:
    'Guide pratiche, strumenti e approfondimenti per navigare il mondo digitale con consapevolezza. Proteggere email, browser, password e molto altro.',
  alternates: { canonical: `${SITE_URL}/risorse` },
  openGraph: {
    title: 'Risorse | Segno',
    description: 'Guide, strumenti e approfondimenti per la sovranità digitale.',
  },
};

export default function RisorsePage() {
  return <RisorseContent />;
}
