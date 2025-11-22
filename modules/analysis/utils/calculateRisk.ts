import { ScenarioBlock, Connection } from '@/store/useAppStore';
import { KNOWLEDGE_BASE, Rule } from './knowledgeBase';
import { buildFindingContext, getAffectedBlocks } from './riskHelpers';

export type RiskAssessment = {
  level: 'low' | 'medium' | 'high' | 'critical';
  score: number; // 0-100
  findings: Array<{
    rule: Rule;
    context: string;
    affectedBlocks: ScenarioBlock[];
  }>;
  summary: {
    totalBlocks: number;
    totalConnections: number;
    violationsCount: number;
    mitigationsCount: number;
  };
  error?: string; // Errore di validazione se presente
};

/**
 * Calcola il punteggio di rischio basato su violazioni e mitigazioni
 * Utilizza logica corretta: separa calcolo violazioni da mitigazioni correlate
 */
function calculateRiskScore(
  findings: Array<{ rule: Rule }>,
  blocks: ScenarioBlock[]
): number {
  let score = 0;
  
  // Calcola score per violazioni
  findings.forEach(finding => {
    switch (finding.rule.severity) {
      case 'prohibited':
        // Prohibited = sempre critico, usa max invece di additivo
        score = Math.max(score, 95);
        break;
      case 'high_risk':
        score += 35;
        break;
      case 'obligation':
        score += 12;
        break;
      case 'best_practice':
        // Best practices non alzano il rischio
        break;
    }
  });
  
  // Applica mitigazioni SOLO se correlate alle violazioni
  findings.forEach(finding => {
    const affectedBlocks = getAffectedBlocks(finding.rule, blocks);
    
    // Verifica se ci sono mitigazioni correlate
    affectedBlocks.forEach(block => {
      if (block.config?.isEncrypted) {
        // Cifratura mitiga problemi di storage/trasferimento
        if (finding.rule.id.includes('storage') || 
            finding.rule.id.includes('transfer') ||
            finding.rule.id.includes('security')) {
          score -= 8;
        }
      }
      
      if (block.config?.humanInTheLoop) {
        // Human-in-the-loop mitiga decisioni automatizzate
        if (finding.rule.id.includes('automated-decision') ||
            finding.rule.id.includes('decision')) {
          score -= 10;
        }
      }
    });
  });
  
  // Normalizzazione
  score = Math.max(0, Math.min(score, 100));
  
  return score;
}

/**
 * Determina il livello di rischio basato sullo score
 */
function calculateRiskLevel(score: number, hasProhibited: boolean): RiskAssessment['level'] {
  if (hasProhibited || score >= 90) return 'critical';
  if (score > 60) return 'high';
  if (score > 30) return 'medium';
  return 'low';
}

/**
 * Valida i blocchi prima dell'analisi
 * Verifica che i dati siano corretti e completi
 */
function validateBlocks(blocks: ScenarioBlock[], connections: Connection[]): { valid: boolean; error?: string } {
  if (!Array.isArray(blocks)) {
    return { valid: false, error: 'I blocchi devono essere un array' };
  }
  
  if (!Array.isArray(connections)) {
    return { valid: false, error: 'Le connessioni devono essere un array' };
  }
  
  // Verifica che ogni blocco abbia i campi necessari
  for (const block of blocks) {
    if (!block || typeof block !== 'object') {
      return { valid: false, error: 'Blocco non valido: formato errato' };
    }
    
    if (!block.id || !block.type || !block.label) {
      return { valid: false, error: `Blocco non valido: mancano campi obbligatori (id, type, label)` };
    }
    
    // Posizione può essere opzionale o avere valori 0 (che è falsy)
    if (block.position !== undefined) {
      if (typeof block.position !== 'object' || block.position === null) {
        return { valid: false, error: `Blocco ${block.id}: posizione non valida` };
      }
      // Permetti anche x: 0 e y: 0 come valori validi
      if (block.position.x === undefined || block.position.y === undefined) {
        return { valid: false, error: `Blocco ${block.id}: posizione incompleta` };
      }
    }
  }
  
  // Verifica che le connessioni facciano riferimento a blocchi esistenti (solo se ci sono blocchi)
  if (blocks.length > 0 && connections.length > 0) {
    const blockIds = new Set(blocks.map(b => b.id).filter(Boolean));
    for (const conn of connections) {
      if (!conn || !conn.from || !conn.to) {
        continue; // Skip connessioni invalide invece di fallire
      }
      if (!blockIds.has(conn.from) || !blockIds.has(conn.to)) {
        // Warning invece di errore - potrebbe essere che i blocchi non sono ancora stati caricati
        console.warn(`Connessione con riferimenti a blocchi inesistenti: ${conn.from} -> ${conn.to}`);
      }
    }
  }
  
  return { valid: true };
}

export function calculateRisk(blocks: ScenarioBlock[] = [], connections: Connection[] = []): RiskAssessment {
  // Validazione input più permissiva - solo se ci sono errori gravi
  if (!blocks || !Array.isArray(blocks)) {
    return {
      level: 'low',
      score: 0,
      findings: [],
      summary: {
        totalBlocks: 0,
        totalConnections: connections?.length || 0,
        violationsCount: 0,
        mitigationsCount: 0
      },
      error: 'Blocchi non validi: fornire un array di blocchi'
    };
  }
  
  if (!connections || !Array.isArray(connections)) {
    return {
      level: 'low',
      score: 0,
      findings: [],
      summary: {
        totalBlocks: blocks.length,
        totalConnections: 0,
        violationsCount: 0,
        mitigationsCount: 0
      },
      error: 'Connessioni non valide: fornire un array di connessioni'
    };
  }
  
  // Filtra blocchi non validi invece di fallire completamente
  const validBlocks = blocks.filter(block => 
    block && 
    block.id && 
    block.type && 
    block.label
  );
  
  if (validBlocks.length === 0 && blocks.length > 0) {
    return {
      level: 'low',
      score: 0,
      findings: [],
      summary: {
        totalBlocks: blocks.length,
        totalConnections: connections.length,
        violationsCount: 0,
        mitigationsCount: 0
      },
      error: 'Nessun blocco valido trovato. Verifica che i blocchi abbiano id, type e label.'
    };
  }
  
  // Usa solo blocchi validi per l'analisi
  const blocksToAnalyze = validBlocks.length > 0 ? validBlocks : blocks;

  const findings: RiskAssessment['findings'] = [];
  let hasProhibitedViolation = false;

  // Fase 1: Valutazione basata sulla Knowledge Base
  KNOWLEDGE_BASE.forEach(rule => {
    try {
      if (rule.trigger(blocksToAnalyze, connections)) {
        // Rileva se è prohibited per calcolo livello
        if (rule.severity === 'prohibited') {
          hasProhibitedViolation = true;
        }
        
        // Costruisci context specifico e descrittivo
        const context = buildFindingContext(rule, blocksToAnalyze, connections);
        const affectedBlocks = getAffectedBlocks(rule, blocksToAnalyze);
        
        // Aggiungi finding con context e blocchi interessati
        findings.push({
          rule,
          context,
          affectedBlocks
        });
      }
    } catch (error) {
      // Ignora errori in trigger individuali, continua con le altre regole
      console.warn(`Errore nel trigger della regola ${rule.id}:`, error);
    }
  });

  // Fase 2: Ordina findings per severità (prohibited → high_risk → obligation → best_practice)
  const severityOrder: Record<string, number> = { 
    prohibited: 0, 
    high_risk: 1, 
    obligation: 2, 
    best_practice: 3 
  };
  
  findings.sort((a, b) => {
    const orderA = severityOrder[a.rule.severity] ?? 999;
    const orderB = severityOrder[b.rule.severity] ?? 999;
    return orderA - orderB;
  });

  // Fase 3: Calcola score con mitigazioni correlate
  const score = calculateRiskScore(findings, blocksToAnalyze);
  
  // Fase 4: Determina livello di rischio
  const level = calculateRiskLevel(score, hasProhibitedViolation);
  
  // Fase 5: Conta mitigazioni implementate
  const mitigationsCount = blocksToAnalyze.filter(b => 
    b.config?.isEncrypted || b.config?.humanInTheLoop
  ).length;

  return {
    level,
    score,
    findings,
    summary: {
      totalBlocks: blocksToAnalyze.length,
      totalConnections: connections.length,
      violationsCount: findings.length,
      mitigationsCount
    }
  };
}

