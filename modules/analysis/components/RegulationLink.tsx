'use client';

import { ExternalLink } from 'lucide-react';
import { getRegulationUrl } from '../utils/regulationUrls';
import { Regulation } from '../utils/knowledgeBase';

interface RegulationLinkProps {
  regulation: Regulation;
  article: string;
}

/**
 * Componente per mostrare un link cliccabile alla documentazione normativa
 * Sempre mostra il link, anche se non trova l'articolo specifico (usa fallback generico)
 */
export function RegulationLink({ regulation, article }: RegulationLinkProps) {
  // Prova a ottenere l'URL specifico per l'articolo
  let url = getRegulationUrl(regulation, article);
  
  // Fallback a URL generico se non trova l'articolo specifico
  if (!url) {
    if (regulation === 'GDPR') {
      url = 'https://gdpr-info.eu/';
    } else if (regulation === 'AI_ACT') {
      url = 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066';
    } else if (regulation === 'COPYRIGHT') {
      url = 'https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32019L0790';
    } else {
      url = '#';
    }
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 hover:text-blue-900 transition-all duration-200 border border-blue-200 shadow-sm hover:shadow-md group"
      title={`Vai alla documentazione normativa ufficiale: ${article}`}
      onClick={(e) => {
        // Previeni la navigazione se l'URL è solo '#'
        if (url === '#') {
          e.preventDefault();
        }
      }}
    >
      <span>{article}</span>
      <ExternalLink className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    </a>
  );
}

