import type { Metadata } from 'next';
import SegnalaContent from './SegnalaContent';

export const metadata: Metadata = {
  title: 'Segnala',
  description:
    'Segnala un errore, una fonte mancante o proponi un contributo alla timeline di Segno.',
};

export default function SegnalaPage() {
  return <SegnalaContent />;
}
