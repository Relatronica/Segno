import type { Metadata } from 'next';
import RedazioneContent from './RedazioneContent';

export const metadata: Metadata = {
  title: 'Redazione',
  robots: { index: false, follow: false },
};

export default function RedazionePage() {
  return <RedazioneContent />;
}
