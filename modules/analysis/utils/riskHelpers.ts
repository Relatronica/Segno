/**
 * Utility functions for risk analysis
 * Provides normalized matching, data flow verification, and context building
 */

import { ScenarioBlock, Connection } from '@/store/useAppStore';
import { getContextTranslation } from '@/lib/i18n/analysisTranslations';
import { useAppStore } from '@/store/useAppStore';
import type { Locale } from '@/lib/i18n/translations';

/**
 * Normalizza una label per matching flessibile
 * Rimuove spazi multipli, converte in lowercase, rimuove parentesi opzionali
 */
export function normalizeLabel(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[()]/g, '') // Rimuove parentesi
    .replace(/[-\/]/g, ' '); // Normalizza separatori
}

/**
 * Verifica se una label matcha un pattern o più pattern
 * Supporta matching flessibile (contains) o esatto
 */
export function matchesLabel(
  block: ScenarioBlock,
  patterns: string | string[],
  exact = false
): boolean {
  const normalizedBlockLabel = normalizeLabel(block.label);
  const patternArray = Array.isArray(patterns) ? patterns : [patterns];

  return patternArray.some(pattern => {
    const normalizedPattern = normalizeLabel(pattern);
    if (exact) {
      return normalizedBlockLabel === normalizedPattern;
    }
    return normalizedBlockLabel.includes(normalizedPattern) ||
           normalizedPattern.includes(normalizedBlockLabel);
  });
}

/**
 * Verifica se esiste un percorso indiretto tra due blocchi
 * Usa path finding ricorsivo per trovare flussi dati attraverso blocchi intermedi
 * DEFINITA PRIMA per essere disponibile quando chiamata
 */
function hasIndirectFlowHelper(
  blocks: ScenarioBlock[],
  connections: Connection[],
  fromId: string,
  toId: string,
  visited: Set<string> = new Set<string>()
): boolean {
  // Se siamo arrivati alla destinazione, c'è un percorso
  if (fromId === toId) return true;
  
  // Evita cicli infiniti
  if (visited.has(fromId)) return false;
  
  // Crea una nuova copia del set visited per evitare mutazioni
  const newVisited = new Set(visited);
  newVisited.add(fromId);
  
  // Trova tutte le connessioni uscenti da questo blocco
  const outgoingConnections = connections.filter(c => c.from === fromId);
  
  // Per ogni connessione, verifica ricorsivamente se porta alla destinazione
  return outgoingConnections.some(conn => 
    hasIndirectFlowHelper(blocks, connections, conn.to, toId, newVisited)
  );
}

/**
 * Verifica se esiste un flusso di dati tra blocchi
 * Controlla connessioni dirette o indirette tra tipi di blocchi
 */
export function hasDataFlow(
  blocks: ScenarioBlock[],
  connections: Connection[],
  fromTypes: string | string[],
  toTypes: string | string[]
): boolean {
  const fromTypeArray = Array.isArray(fromTypes) ? fromTypes : [fromTypes];
  const toTypeArray = Array.isArray(toTypes) ? toTypes : [toTypes];

  const fromBlocks = blocks.filter(b => fromTypeArray.includes(b.type));
  const toBlocks = blocks.filter(b => toTypeArray.includes(b.type));

  if (fromBlocks.length === 0 || toBlocks.length === 0) {
    return false;
  }

  // Verifica connessioni dirette
  const hasDirectConnection = connections.some(conn => {
    const fromBlock = fromBlocks.find(b => b.id === conn.from);
    const toBlock = toBlocks.find(b => b.id === conn.to);
    return fromBlock && toBlock;
  });

  if (hasDirectConnection) return true;

  // Verifica connessioni indirette usando path finding
  return fromBlocks.some(fromBlock => 
    toBlocks.some(toBlock => 
      hasIndirectFlowHelper(blocks, connections, fromBlock.id, toBlock.id)
    )
  );
}

/**
 * Verifica se un blocco di un tipo specifico riceve dati da un altro tipo
 */
export function receivesFromType(
  blocks: ScenarioBlock[],
  connections: Connection[],
  targetType: string,
  sourceTypes: string | string[]
): boolean {
  const targetBlocks = blocks.filter(b => b.type === targetType);
  const sourceTypeArray = Array.isArray(sourceTypes) ? sourceTypes : [sourceTypes];

  if (targetBlocks.length === 0) return false;

  return targetBlocks.some(targetBlock => {
    const incomingConnections = connections.filter(c => c.to === targetBlock.id);
    
    return incomingConnections.some(conn => {
      const sourceBlock = blocks.find(b => b.id === conn.from);
      return sourceBlock && sourceTypeArray.includes(sourceBlock.type);
    });
  });
}

/**
 * Verifica se un blocco di un tipo specifico invia dati a un altro tipo
 */
export function sendsToType(
  blocks: ScenarioBlock[],
  connections: Connection[],
  sourceType: string,
  targetTypes: string | string[]
): boolean {
  const sourceBlocks = blocks.filter(b => b.type === sourceType);
  const targetTypeArray = Array.isArray(targetTypes) ? targetTypes : [targetTypes];

  if (sourceBlocks.length === 0) return false;

  return sourceBlocks.some(sourceBlock => {
    const outgoingConnections = connections.filter(c => c.from === sourceBlock.id);
    
    return outgoingConnections.some(conn => {
      const targetBlock = blocks.find(b => b.id === conn.to);
      return targetBlock && targetTypeArray.includes(targetBlock.type);
    });
  });
}

/**
 * Trova blocchi che corrispondono a pattern di label
 */
export function findBlocksByLabel(
  blocks: ScenarioBlock[],
  patterns: string | string[]
): ScenarioBlock[] {
  const patternArray = Array.isArray(patterns) ? patterns : [patterns];
  return blocks.filter(b => matchesLabel(b, patternArray));
}

/**
 * Costruisce un context descrittivo per un finding
 * Identifica i blocchi coinvolti e il tipo di violazione
 */
export function buildFindingContext(
  rule: { id: string; description: string },
  blocks: ScenarioBlock[],
  connections: Connection[],
  locale?: Locale
): string {
  const currentLocale = locale || useAppStore.getState().locale;
  
  // Try to get translated context first
  if (currentLocale === 'en') {
    const translatedContext = getContextTranslation(rule.id, currentLocale, blocks, connections);
    if (translatedContext) {
      return translatedContext;
    }
  }
  
  // Context specifici basati sul tipo di regola (Italian fallback)
  const ruleContexts: Record<string, (blocks: ScenarioBlock[], connections: Connection[]) => string> = {
    'aiact-prohibited-biometric': (b, c) => {
      const biometric = findBlocksByLabel(b, ['Analisi Biometrica'])[0];
      const video = findBlocksByLabel(b, ['Video', 'Immagini'])[0];
      if (biometric && video) {
        const hasFlow = hasDataFlow(b, c, 'input', 'process');
        return hasFlow 
          ? `Rilevato flusso di dati: "${video.label}" → "${biometric.label}". L'analisi biometrica in tempo reale su feed video è vietata.`
          : `Rilevati blocchi "${video.label}" e "${biometric.label}" ma non c'è flusso di dati confermato. Verificare se sono utilizzati insieme.`;
      }
      return 'Rilevato sistema di analisi biometrica che potrebbe operare in tempo reale.';
    },
    
    'gdpr-data-transfer-usa': (b, c) => {
      const usaStorage = findBlocksByLabel(b, ['Cloud', 'USA', 'US Storage'])[0];
      const hasPersonalData = b.some(bl => 
        bl.type === 'input' && 
        (bl.config?.dataTypes?.some((dt: string) => 
          ['Personali', 'Biometrici', 'Sanitari', 'Identificativi'].includes(dt)
        ))
      );
      
      if (usaStorage) {
        return hasPersonalData
          ? `Rilevato trasferimento dati personali verso "${usaStorage.label}". Questa configurazione viola il principio di territorialità GDPR.`
          : `Rilevato storage USA "${usaStorage.label}" ma non sono stati identificati dati personali. Verificare se vengono trasferiti dati personali.`;
      }
      return 'Potenziale trasferimento dati verso provider extra-UE.';
    },
    
    'gdpr-automated-decision': (b, c) => {
      const decision = findBlocksByLabel(b, ['Decisione Automatica'])[0];
      const hasHumanLoop = b.some(bl => bl.config?.humanInTheLoop);
      
      if (decision) {
        return hasHumanLoop
          ? `Rilevato blocco "${decision.label}" ma esiste un meccanismo di supervisione umana.`
          : `Rilevato blocco "${decision.label}" senza supervisione umana. Le decisioni automatizzate richiedono intervento umano.`;
      }
      return 'Rilevato sistema che prende decisioni automatizzate senza controllo umano.';
    },
    
    'gdpr-special-categories': (b, c) => {
      const specialDataBlocks = b.filter(bl => 
        bl.config?.dataTypes?.some((dt: string) => 
          ['Biometrici', 'Sanitari'].includes(dt)
        )
      );
      
      if (specialDataBlocks.length > 0) {
        const labels = specialDataBlocks.map(bl => `"${bl.label}"`).join(', ');
        return `Rilevato trattamento di dati speciali (${labels}). Questi dati richiedono consenso esplicito o base giuridica specifica.`;
      }
      return 'Rilevato trattamento di categorie particolari di dati personali.';
    },
    
    'gdpr-security-storage': (b, c) => {
      const biometricInput = b.find(bl => 
        bl.type === 'input' && bl.config?.dataTypes?.includes('Biometrici')
      );
      const storage = b.find(bl => bl.type === 'storage');
      
      if (biometricInput && !storage) {
        return `Rilevati dati biometrici in "${biometricInput.label}" ma manca un blocco di storage esplicito. I dati sensibili devono essere archiviati su infrastrutture sicure.`;
      }
      if (storage && !storage.config?.isEncrypted) {
        return `Rilevato storage "${storage.label}" senza cifratura. I dati biometrici richiedono cifratura.`;
      }
      return 'Verificare che i dati sensibili siano archiviati su infrastrutture sicure e cifrate.';
    },
    
    'aiact-highrisk-biometric': (b, c) => {
      const biometric = findBlocksByLabel(b, ['Analisi Biometrica', 'Bio Analysis'])[0];
      if (biometric) {
        return `Rilevato sistema di analisi biometrica "${biometric.label}". I sistemi biometrici sono classificati ad alto rischio dall'AI Act e richiedono misure specifiche.`;
      }
      return 'Rilevato sistema di analisi biometrica ad alto rischio.';
    },
    
    'aiact-transparency-chat': (b, c) => {
      const llm = findBlocksByLabel(b, ['Chatbot LLM', 'LLM'])[0];
      if (llm) {
        return `Rilevato sistema di chat "${llm.label}" senza indicazione chiara che sia un sistema AI. Gli utenti devono sapere che stanno interagendo con una macchina.`;
      }
      return 'Rilevato sistema di chat che potrebbe non informare gli utenti che è un sistema AI.';
    },
    
    'gdpr-storage-limitation': (b, c) => {
      const indefiniteBlocks = b.filter(bl => bl.config?.retention === 'indefinite');
      if (indefiniteBlocks.length > 0) {
        const labels = indefiniteBlocks.map(bl => `"${bl.label}"`).join(', ');
        return `Rilevati blocchi con conservazione dati illimitata (${labels}). Il GDPR richiede di definire un periodo di conservazione specifico.`;
      }
      return 'Rilevato sistema che conserva dati senza limite di tempo definito.';
    },
    
    'gdpr-information-duty': (b, c) => {
      const personalDataBlocks = b.filter(bl => 
        bl.type === 'input' && 
        bl.config?.dataTypes?.some((dt: string) => 
          ['Personali', 'Biometrici', 'Sanitari'].includes(dt)
        )
      );
      
      if (personalDataBlocks.length > 0) {
        const labels = personalDataBlocks.map(bl => `"${bl.label}"`).join(', ');
        return `Rilevato trattamento di dati personali (${labels}) ma non è stata identificata un'informativa privacy. Gli interessati devono essere informati prima della raccolta.`;
      }
      return 'Rilevato trattamento di dati personali senza informativa privacy chiara.';
    },
    
    'gdpr-privacy-by-design': (b, c) => {
      const personalDataBlocks = b.filter(bl => 
        bl.type === 'input' && 
        bl.config?.dataTypes?.some((dt: string) => 
          ['Personali'].includes(dt)
        )
      );
      
      if (personalDataBlocks.length > 0) {
        const hasEncryption = b.some(bl => bl.config?.isEncrypted);
        if (!hasEncryption) {
          return `Rilevato trattamento di dati personali ma non sono state implementate misure di protezione di default (es. cifratura). Il GDPR richiede privacy by design.`;
        }
      }
      return 'Verificare che siano implementate misure di protezione dati fin dalla progettazione.';
    },
    
    'gdpr-processing-record': (b, c) => {
      const specialDataBlocks = b.filter(bl => 
        bl.config?.dataTypes?.some((dt: string) => 
          ['Biometrici', 'Sanitari'].includes(dt)
        )
      );
      
      if (specialDataBlocks.length > 0) {
        const labels = specialDataBlocks.map(bl => `"${bl.label}"`).join(', ');
        return `Rilevato trattamento di dati speciali (${labels}) ma non è stato identificato un registro dei trattamenti. Il GDPR richiede di tenere un registro per trattamenti ad alto rischio.`;
      }
      return 'Rilevato trattamento ad alto rischio senza registro dei trattamenti.';
    },
    
    'gdpr-dpia': (b, c) => {
      const hasHighRiskProcessing = 
        findBlocksByLabel(b, ['Analisi Biometrica', 'Biometrica']).length > 0 ||
        b.some(bl => bl.config?.dataTypes?.includes('Biometrici') || bl.config?.dataTypes?.includes('Sanitari')) ||
        (findBlocksByLabel(b, ['Decisione Automatica']).length > 0 && !b.some(bl => bl.config?.humanInTheLoop));
      
      if (hasHighRiskProcessing) {
        return 'Rilevato trattamento ad alto rischio (dati biometrici, sanitari, o decisioni automatizzate) ma non è stata identificata una DPIA. Il GDPR richiede una valutazione d\'impatto prima di avviare trattamenti ad alto rischio.';
      }
      return 'Rilevato trattamento ad alto rischio. È necessaria una DPIA (Data Protection Impact Assessment).';
    },
    
    'aiact-highrisk-systems': (b, c) => {
      const highRiskBlocks = findBlocksByLabel(b, ['Analisi Biometrica', 'Chatbot LLM', 'Decisione Automatica']);
      if (highRiskBlocks.length > 0) {
        const labels = highRiskBlocks.map(bl => `"${bl.label}"`).join(', ');
        return `Rilevati sistemi AI ad alto rischio (${labels}). Questi sistemi richiedono marcatura CE, gestione qualità e documentazione utente secondo l'AI Act.`;
      }
      return 'Rilevati sistemi AI che potrebbero essere classificati ad alto rischio secondo l\'AI Act.';
    },
    
    'aiact-user-documentation': (b, c) => {
      const highRiskBlocks = findBlocksByLabel(b, ['Analisi Biometrica', 'Decisione Automatica']);
      if (highRiskBlocks.length > 0) {
        const labels = highRiskBlocks.map(bl => `"${bl.label}"`).join(', ');
        return `Rilevati sistemi AI ad alto rischio (${labels}) ma non è stata identificata documentazione utente. L'AI Act richiede documentazione chiara che spiega come funziona il sistema e quali sono i suoi limiti.`;
      }
      return 'Rilevato sistema AI ad alto rischio senza documentazione utente.';
    }
  };

  // Usa context specifico se disponibile, altrimenti generico
  const contextBuilder = ruleContexts[rule.id];
  if (contextBuilder) {
    return contextBuilder(blocks, connections);
  }

  // Context generico ma descrittivo
  return 'Rilevato nella configurazione attuale dello scenario. Verificare che siano rispettati i requisiti normativi.';
}

/**
 * Trova i blocchi coinvolti in una violazione
 */
export function getAffectedBlocks(
  rule: { id: string },
  blocks: ScenarioBlock[]
): ScenarioBlock[] {
  // Logica specifica per ogni regola
  const affectedBlockFinders: Record<string, (blocks: ScenarioBlock[]) => ScenarioBlock[]> = {
    'aiact-prohibited-biometric': (b) => 
      findBlocksByLabel(b, ['Analisi Biometrica', 'Bio Analysis', 'Biometrica', 'Video', 'Immagini', 'Surveillance']),
    
    'aiact-highrisk-biometric': (b) => 
      findBlocksByLabel(b, ['Analisi Biometrica', 'Bio Analysis', 'Biometrica']),
    
    'aiact-transparency-chat': (b) => 
      findBlocksByLabel(b, ['Chatbot LLM', 'LLM', 'LLM Model', 'RAG System']),
    
    'aiact-highrisk-systems': (b) => 
      findBlocksByLabel(b, ['Analisi Biometrica', 'Chatbot LLM', 'Decisione Automatica', 'LLM', 'RAG System']),
    
    'aiact-user-documentation': (b) => 
      findBlocksByLabel(b, ['Analisi Biometrica', 'Decisione Automatica']),
    
    'gdpr-data-transfer-usa': (b) => 
      findBlocksByLabel(b, ['Cloud', 'USA', 'US Storage', 'Trasferimento Extra-UE']),
    
    'gdpr-security-storage': (b) => 
      b.filter(bl => bl.type === 'storage' || 
        (bl.type === 'input' && bl.config?.dataTypes?.some((dt: string) => 
          ['Biometrici'].includes(dt)
        ))
      ),
    
    'gdpr-special-categories': (b) => 
      b.filter(bl => bl.config?.dataTypes?.some((dt: string) => 
        ['Biometrici', 'Sanitari'].includes(dt)
      )),
    
    'gdpr-automated-decision': (b) => 
      findBlocksByLabel(b, ['Decisione Automatica']),
    
    'gdpr-storage-limitation': (b) => 
      b.filter(bl => bl.config?.retention === 'indefinite'),
    
    'gdpr-information-duty': (b) => 
      b.filter(bl => 
        bl.type === 'input' && 
        bl.config?.dataTypes?.some((dt: string) => 
          ['Personali', 'Biometrici', 'Sanitari', 'Identificativi'].includes(dt)
        )
      ),
    
    'gdpr-privacy-by-design': (b) => 
      b.filter(bl => 
        bl.type === 'input' && 
        bl.config?.dataTypes?.some((dt: string) => 
          ['Personali'].includes(dt)
        )
      ),
    
    'gdpr-processing-record': (b) => 
      b.filter(bl => 
        bl.config?.dataTypes?.some((dt: string) => 
          ['Biometrici', 'Sanitari'].includes(dt)
        )
      ),
    
    'gdpr-dpia': (b) => 
      b.filter(bl => 
        matchesLabel(bl, ['Analisi Biometrica', 'Biometrica']) ||
        bl.config?.dataTypes?.some((dt: string) => 
          ['Biometrici', 'Sanitari'].includes(dt)
        ) ||
        (matchesLabel(bl, ['Decisione Automatica']) && !blocks.some(b2 => b2.config?.humanInTheLoop))
      ),
  };

  const finder = affectedBlockFinders[rule.id];
  return finder ? finder(blocks) : [];
}

