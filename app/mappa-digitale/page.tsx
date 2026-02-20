import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import MappaDigitaleContent from './MappaDigitaleContent';

export const metadata: Metadata = {
  title: 'Mappa Digitale — Scopri la tua impronta digitale',
  description:
    'Analizza i servizi digitali che usi ogni giorno, scopri chi raccoglie i tuoi dati e trova alternative etiche che rispettano la tua privacy.',
  alternates: { canonical: `${SITE_URL}/mappa-digitale` },
  openGraph: {
    title: 'Mappa Digitale | Segno',
    description: 'Scopri la tua impronta digitale e riprendi il controllo.',
  },
};

export default function MappaDigitalePage() {
  return <MappaDigitaleContent />;
}
