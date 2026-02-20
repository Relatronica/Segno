import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import StackEticoContent from './StackEticoContent';

export const metadata: Metadata = {
  title: 'Stack Etico — Costruisci il tuo stack digitale',
  description:
    'Scegli i tuoi strumenti digitali, scopri il tuo punteggio di sovranità digitale e ricevi suggerimenti su alternative etiche e open source.',
  alternates: { canonical: `${SITE_URL}/stack-etico` },
  openGraph: {
    title: 'Stack Etico | Segno',
    description: 'Costruisci il tuo stack digitale etico e scopri il tuo punteggio di sovranità.',
  },
};

export default function StackEticoPage() {
  return <StackEticoContent />;
}
