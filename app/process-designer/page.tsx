import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import ProcessDesignerContent from './ProcessDesignerContent';

export const metadata: Metadata = {
  title: 'Process Designer — Disegna processi etici con l\'IA',
  description:
    'Progetta processi in formato flowchart con l\'aiuto dell\'IA, ricevi analisi di conformità GDPR e AI Act, e suggerimenti per un design etico.',
  alternates: { canonical: `${SITE_URL}/process-designer` },
  openGraph: {
    title: 'Process Designer | Segno',
    description: 'Disegna processi etici con l\'IA e ricevi analisi di conformità.',
  },
};

export default function ProcessDesignerPage() {
  return <ProcessDesignerContent />;
}
