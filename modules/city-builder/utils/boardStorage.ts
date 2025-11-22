/**
 * Board Storage Module
 * Gestisce il salvataggio e caricamento della board in formato protetto
 * Il file salvato è cifrato e può essere letto solo dalla webapp
 */

import { ScenarioBlock, Connection, UserProfile } from '@/store/useAppStore';

// Chiave di cifratura embedded nell'app
// Questa chiave viene usata per XOR cipher - non è sicurezza vera ma rende il file non leggibile direttamente
const ENCRYPTION_KEY = 'segno-board-v1-2024';
const FILE_MAGIC = 'SEGNO'; // Magic number per identificare i file validi
const FILE_VERSION = 1;

export type BoardData = {
  version: number;
  magic: string;
  user: UserProfile | null;
  scenarioBlocks: ScenarioBlock[];
  connections: Connection[];
  timestamp: number;
};

/**
 * Cifra i dati usando XOR cipher semplice
 * Non è crittografia forte, ma rende il file non leggibile direttamente
 */
function encrypt(data: string, key: string): string {
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    const charCode = data.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    result.push(charCode ^ keyCharCode);
  }
  // Converti in stringa base64 - usa chunking per evitare problemi con array grandi
  const bytes = new Uint8Array(result);
  const chunkSize = 8192; // Chunk size sicuro per String.fromCharCode
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

/**
 * Decifra i dati usando XOR cipher
 */
function decrypt(encryptedData: string, key: string): string {
  try {
    // Decodifica da base64
    const decoded = atob(encryptedData);
    const bytes = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
      bytes[i] = decoded.charCodeAt(i);
    }
    
    // Decifra usando XOR
    const result: number[] = [];
    for (let i = 0; i < bytes.length; i++) {
      const keyCharCode = key.charCodeAt(i % key.length);
      result.push(bytes[i] ^ keyCharCode);
    }
    
    // Converti risultato in stringa usando chunking per evitare problemi con array grandi
    const resultBytes = new Uint8Array(result);
    const chunkSize = 8192;
    let decrypted = '';
    for (let i = 0; i < resultBytes.length; i += chunkSize) {
      const chunk = resultBytes.subarray(i, i + chunkSize);
      decrypted += String.fromCharCode(...chunk);
    }
    
    return decrypted;
  } catch (error) {
    throw new Error('Errore nella decifratura del file. Il file potrebbe essere corrotto o non essere un file Segno valido.');
  }
}

/**
 * Salva la board in un file cifrato
 */
export function saveBoardToFile(
  scenarioBlocks: ScenarioBlock[],
  connections: Connection[],
  user: UserProfile | null
): void {
  try {
    // Prepara i dati da salvare
    const boardData: BoardData = {
      version: FILE_VERSION,
      magic: FILE_MAGIC,
      user,
      scenarioBlocks,
      connections,
      timestamp: Date.now(),
    };

    // Converti in JSON
    const jsonData = JSON.stringify(boardData, null, 0); // Compact format
    
    // Cifra i dati
    const encrypted = encrypt(jsonData, ENCRYPTION_KEY);
    
    // Aggiungi header identificativo (non cifrato, per validazione rapida)
    const fileContent = `${FILE_MAGIC}:${FILE_VERSION}:${encrypted}`;
    
    // Crea blob e scarica
    const blob = new Blob([fileContent], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Genera nome file con timestamp
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0];
    const timeStr = date.toTimeString().split(' ')[0].replace(/:/g, '-');
    link.download = `segno-board-${dateStr}-${timeStr}.segno`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Errore nel salvataggio della board:', error);
    throw new Error('Impossibile salvare la board. Riprova.');
  }
}

/**
 * Carica la board da un file cifrato
 */
export async function loadBoardFromFile(file: File): Promise<BoardData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        
        if (!content || typeof content !== 'string') {
          throw new Error('File vuoto o non valido');
        }
        
        // Estrai header e dati cifrati
        const parts = content.split(':');
        if (parts.length < 3) {
          throw new Error('Formato file non valido');
        }
        
        const magic = parts[0];
        const version = parseInt(parts[1], 10);
        const encrypted = parts.slice(2).join(':'); // Nel caso ci siano altri ':' nei dati
        
        // Valida magic number
        if (magic !== FILE_MAGIC) {
          throw new Error('Il file non è un file Segno valido. Il file potrebbe essere corrotto o di un formato diverso.');
        }
        
        // Valida versione (potresti aggiungere migrazione versioni in futuro)
        if (version !== FILE_VERSION) {
          throw new Error(`Versione file non supportata. Versione file: ${version}, versione supportata: ${FILE_VERSION}`);
        }
        
        // Decifra i dati
        const decrypted = decrypt(encrypted, ENCRYPTION_KEY);
        
        // Parse JSON
        const boardData: BoardData = JSON.parse(decrypted);
        
        // Valida struttura
        if (!boardData.scenarioBlocks || !Array.isArray(boardData.scenarioBlocks)) {
          throw new Error('Struttura dati non valida: scenarioBlocks mancante o non valido');
        }
        
        if (!boardData.connections || !Array.isArray(boardData.connections)) {
          throw new Error('Struttura dati non valida: connections mancante o non valido');
        }
        
        resolve(boardData);
      } catch (error) {
        if (error instanceof Error) {
          reject(error);
        } else {
          reject(new Error('Errore sconosciuto durante il caricamento del file'));
        }
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Errore nella lettura del file'));
    };
    
    reader.readAsText(file);
  });
}

/**
 * Valida se un file è un file Segno valido (senza decifrarlo completamente)
 */
export function isValidSegnoFile(file: File): boolean {
  // Controlla estensione
  if (!file.name.toLowerCase().endsWith('.segno')) {
    return false;
  }
  
  // Controlla tipo MIME o dimensione (opzionale)
  // Per ora accettiamo solo file .segno
  return true;
}

