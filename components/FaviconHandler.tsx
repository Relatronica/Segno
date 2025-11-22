'use client';

import { useEffect } from 'react';

export function FaviconHandler() {
  useEffect(() => {
    // Funzione per aggiornare il favicon in base al tema
    const updateFavicon = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // In dark mode usa la versione bianca (segno_logo_white.png), in light mode usa la nera (segno_logo.png)
      const newHref = isDark ? '/segno_logo_white.png' : '/segno_logo.png';
      
      // Cerca tutti i possibili link favicon (Next.js può usarli in modi diversi)
      // Cerca anche per href che contiene 'icon'
      const allLinks = document.querySelectorAll('link[rel*="icon"], link[href*="icon"]');
      
      let favicon: HTMLLinkElement | null = null;
      
      // Cerca il link favicon principale
      for (const link of Array.from(allLinks)) {
        const rel = (link as HTMLLinkElement).rel;
        if (rel === 'icon' || rel === 'shortcut icon' || rel.includes('icon')) {
          favicon = link as HTMLLinkElement;
          break;
        }
      }
      
      // Se non trovato, cerca per href
      if (!favicon) {
        for (const link of Array.from(allLinks)) {
          const href = (link as HTMLLinkElement).href;
          if (href.includes('icon') || href.includes('favicon')) {
            favicon = link as HTMLLinkElement;
            break;
          }
        }
      }
      
      if (favicon) {
        // Rimuovi il vecchio link per forzare il refresh
        const oldHref = favicon.href;
        favicon.remove();
        
        // Crea un nuovo link con l'href corretto
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.type = 'image/png';
        // Aggiungi timestamp per bypassare la cache
        const url = new URL(newHref, window.location.origin);
        url.searchParams.set('v', Date.now().toString());
        newLink.href = url.toString();
        document.head.appendChild(newLink);
        
        // Dopo un breve delay, aggiorna con URL pulito
        setTimeout(() => {
          const cleanLink = document.querySelector(`link[rel='icon']`) as HTMLLinkElement;
          if (cleanLink && cleanLink.href !== newHref) {
            cleanLink.href = newHref;
          }
        }, 200);
      } else {
        // Crea il link se non esiste
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = newHref;
        document.head.appendChild(link);
      }
      
      // Aggiorna anche apple-touch-icon se presente
      const appleIcon = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
      if (appleIcon) {
        appleIcon.href = newHref;
      }
    };

    // Esegui immediatamente e poi con un piccolo delay per assicurarsi che il DOM sia pronto
    updateFavicon();
    const timeoutId = setTimeout(updateFavicon, 200);

    // Ascolta i cambiamenti del tema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Usa addEventListener (standard moderno)
    const handleChange = () => {
      updateFavicon();
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback per browser più vecchi
      mediaQuery.addListener(handleChange);
    }

    return () => {
      clearTimeout(timeoutId);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return null;
}

