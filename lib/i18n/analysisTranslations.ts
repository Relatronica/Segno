/**
 * English translations for analysis rules and contexts
 * This file contains translations for all rules in the knowledge base
 */

import type { Locale } from './translations';

export interface RuleTranslation {
  description: string;
  simpleExplanation?: string;
  mitigation?: string;
  mitigationSimple?: string;
}

export interface ContextTranslation {
  [key: string]: string | ((blocks: any[], connections: any[]) => string);
}

// Helper to find blocks by label (case-insensitive, partial match)
function findBlockByLabel(blocks: any[], labels: string[]): any {
  return blocks.find((b: any) => 
    labels.some(label => 
      b.label?.toLowerCase().includes(label.toLowerCase()) ||
      label.toLowerCase().includes(b.label?.toLowerCase() || '')
    )
  );
}

// Helper to check if a block matches any of the labels
function blockMatchesLabel(block: any, labels: string[]): boolean {
  return labels.some(label => 
    block.label?.toLowerCase().includes(label.toLowerCase()) ||
    label.toLowerCase().includes(block.label?.toLowerCase() || '')
  );
}

// Translations for all rules
const RULE_TRANSLATIONS: Record<string, RuleTranslation> = {
  'aiact-prohibited-biometric': {
    description: "The use of remote biometric identification systems 'in real-time' in publicly accessible spaces for law enforcement purposes is PROHIBITED.",
    simpleExplanation: "The law prohibits using systems that recognize people in real-time via face/fingerprint in public cameras. It's one of the few practices completely prohibited by the AI Act.",
    mitigation: "Remove real-time identification or limit it strictly to exceptional cases (terrorism, missing persons search).",
    mitigationSimple: "Don't use real-time facial recognition in public cameras. You can only use it for exceptional cases (terrorism) and you must have specific authorization."
  },
  'aiact-highrisk-biometric': {
    description: "Remote biometric identification systems (not real-time) are classified as HIGH RISK.",
    simpleExplanation: "Even if not real-time, recognizing people via face/fingerprint is considered high risk. You must follow precise rules: register the system in a European database, do quality tests, and allow controls.",
    mitigation: "Obligation to register in EU database, CE marking, and quality management system.",
    mitigationSimple: "You must register the system in a European database, do tests to verify it works well, and allow periodic controls."
  },
  'aiact-transparency-chat': {
    description: "Transparency obligation: people must be informed that they are interacting with an AI system.",
    simpleExplanation: "When someone talks to a chatbot, they must know they're talking to a machine, not a person. It's like when you buy something: you must know who you're buying from.",
    mitigation: "Insert a clear disclaimer in the user interface.",
    mitigationSimple: "Put a clear message that says 'You are talking to an artificial intelligence system' before the user starts using it."
  },
  'gdpr-data-transfer-usa': {
    description: "Transfer of personal data to US providers requires supplementary measures (SCC + Encryption) or is at risk of invalidation.",
    simpleExplanation: "If you put your users' data on US servers (like AWS, Google Cloud), you must protect it particularly because US laws allow the government to access data. If you don't protect it well, you risk fines.",
    mitigation: "Verify data location. Prefer providers with EU data centers or adopt BYOK encryption.",
    mitigationSimple: "Choose servers in Europe (Frankfurt, Dublin, Milan) instead of US ones. If you must use US servers, encrypt data and keep encryption keys yourself (BYOK - Bring Your Own Key)."
  },
  'gdpr-security-storage': {
    description: "Sensitive/biometric data must be stored on secure and encrypted infrastructures.",
    simpleExplanation: "Sensitive data (like fingerprints or health information) must be kept securely, with encryption. It's like putting important documents in a safe instead of an open drawer.",
    mitigation: "Use encrypted storage (AES-256) and verify that encryption keys are managed securely.",
    mitigationSimple: "Store sensitive data on encrypted servers. Use strong encryption and protect encryption keys."
  },
  'gdpr-automated-decision': {
    description: "Automated decisions that significantly affect individuals require human supervision and the right to contest.",
    simpleExplanation: "If a system makes important decisions about you (like rejecting a loan or job application), you have the right to have a person review it. You can't be subject to decisions made only by a machine.",
    mitigation: "Implement human-in-the-loop mechanisms for critical decisions. Provide clear process for contesting decisions.",
    mitigationSimple: "For important decisions, always have a person check before finalizing. Allow users to request human review."
  },
  'gdpr-special-categories': {
    description: "Processing of special categories of personal data (biometric, health) requires explicit consent or specific legal basis.",
    simpleExplanation: "Very sensitive data (health, religion, political opinions, biometrics) requires special protection. You need explicit consent or a very strong legal reason to use them.",
    mitigation: "Obtain explicit consent or demonstrate exceptional legal basis (medical necessity, public interest).",
    mitigationSimple: "For sensitive data, always ask for explicit consent. Explain clearly why you need it and how you'll protect it."
  },
  'gdpr-storage-limitation': {
    description: "Personal data must not be kept longer than necessary for the purposes for which they are processed.",
    simpleExplanation: "Don't keep data forever. Decide how long you need it (e.g., 1 year for CVs) and then delete it automatically. Like food expiration: when the date passes, you throw it away.",
    mitigation: "Define retention policies for each data type. Automate deletion after expiration.",
    mitigationSimple: "Set a time limit for each type of data. Delete automatically when time expires."
  },
  'gdpr-information-duty': {
    description: "Data subjects must be informed before data collection: who, what, why, for how long, rights.",
    simpleExplanation: "Before collecting someone's data, you must tell them clearly: who you are, what data you collect, why, how long you keep it, and what rights they have. It's like asking permission: you must explain what you need it for.",
    mitigation: "Provide clear privacy notice before data collection. Include all required information (Art. 13-14 GDPR).",
    mitigationSimple: "Before collecting data, clearly explain who you are, what you collect, why, and how long you keep it."
  },
  'gdpr-privacy-by-design': {
    description: "Data protection must be implemented by design and by default (privacy by design).",
    simpleExplanation: "Think about privacy from the start, like when building a house: it's easier to put security doors during construction than add them later. Collect only necessary data and make it hard to identify people.",
    mitigation: "Implement encryption, pseudonymization, and data minimization from the start.",
    mitigationSimple: "From the beginning, protect data with encryption. Collect only what you really need."
  },
  'gdpr-processing-record': {
    description: "High-risk processing requires a record of processing activities.",
    simpleExplanation: "If you process sensitive data or make automated decisions, you must keep a record of what you do. It's like a logbook: you write down what data you process and why.",
    mitigation: "Maintain a record of processing activities documenting all high-risk operations.",
    mitigationSimple: "Keep a written record of what data you process, why, and how you protect it."
  },
  'gdpr-dpia': {
    description: "High-risk processing requires a Data Protection Impact Assessment (DPIA) before starting.",
    simpleExplanation: "Before starting a risky project (like facial recognition or automated decisions), you must assess what could go wrong with data. It's like a safety check before building a house: you identify risks and plan how to avoid them.",
    mitigation: "Conduct DPIA before starting high-risk processing. Document risks and mitigation measures.",
    mitigationSimple: "Before starting, assess what risks exist for data. Write down how you'll prevent problems."
  },
  'aiact-highrisk-systems': {
    description: "High-risk AI systems require CE marking, quality management, user documentation, human supervision.",
    simpleExplanation: "If you use AI in sensitive sectors (healthcare, transport, education, HR, justice), you must follow precise rules: test that it works well, document how it works, allow human controls. It's like a car: you must have a certificate of conformity.",
    mitigation: "Verify if the system is classified as high-risk according to AI Act Annex III. If yes, implement quality management, user documentation, human supervision.",
    mitigationSimple: "Verify if your AI system is classified as high-risk. If yes, you must do quality tests, write documentation on how it works, and allow human controls. You might need CE marking."
  },
  'aiact-user-documentation': {
    description: "High-risk AI systems must provide clear user documentation explaining how the system works and its limits.",
    simpleExplanation: "If you use AI that makes important decisions, you must explain clearly to users how it works, what it can and cannot do, and what its limits are. It's like a manual: users must understand how to use it safely.",
    mitigation: "Provide clear user documentation explaining system functionality, limitations, and how to use it safely.",
    mitigationSimple: "Write clear instructions for users: explain how the system works, what it can do, and what its limits are."
  }
};

// Translations for context builders
const CONTEXT_TRANSLATIONS: Record<string, ContextTranslation> = {
  'aiact-prohibited-biometric': {
    'default': (blocks, connections) => {
      const biometric = findBlockByLabel(blocks, ['Analisi Biometrica', 'Bio Analysis', 'Biometrica']);
      const video = findBlockByLabel(blocks, ['Video', 'Immagini', 'Surveillance']);
      if (biometric && video) {
        // Check if there's data flow - simplified check
        const hasFlow = connections.some((c: any) => 
          (c.from === video.id && c.to === biometric.id) ||
          (video.type === 'input' && biometric.type === 'process')
        );
        return hasFlow 
          ? `Detected data flow: "${video.label}" → "${biometric.label}". Real-time biometric analysis on video feed is prohibited.`
          : `Detected blocks "${video.label}" and "${biometric.label}" but no confirmed data flow. Verify if they are used together.`;
      }
      return 'Detected biometric analysis system that could operate in real-time.';
    }
  },
  'gdpr-data-transfer-usa': {
    'default': (blocks, connections) => {
      const usaStorage = findBlockByLabel(blocks, ['Cloud', 'USA', 'US Storage', 'Trasferimento Extra-UE']);
      const hasPersonalData = blocks.some((b: any) => 
        b.type === 'input' && 
        b.config?.dataTypes?.some((dt: string) => 
          ['Personali', 'Biometrici', 'Sanitari', 'Identificativi'].includes(dt)
        )
      );
      
      if (usaStorage) {
        return hasPersonalData
          ? `Detected personal data transfer to "${usaStorage.label}". This configuration violates GDPR territoriality principle.`
          : `Detected US storage "${usaStorage.label}" but no personal data identified. Verify if personal data is transferred.`;
      }
      return 'Potential data transfer to extra-EU providers.';
    }
  },
  'gdpr-automated-decision': {
    'default': (blocks, connections) => {
      const decision = findBlockByLabel(blocks, ['Decisione Automatica']);
      const hasHumanLoop = blocks.some((b: any) => b.config?.humanInTheLoop);
      
      if (decision) {
        return hasHumanLoop
          ? `Detected block "${decision.label}" but a human supervision mechanism exists.`
          : `Detected block "${decision.label}" without human supervision. Automated decisions require human intervention.`;
      }
      return 'Detected system that makes automated decisions without human control.';
    }
  },
  'gdpr-special-categories': {
    'default': (blocks, connections) => {
      const specialDataBlocks = blocks.filter((b: any) => 
        b.config?.dataTypes?.some((dt: string) => ['Biometrici', 'Sanitari'].includes(dt))
      );
      if (specialDataBlocks.length > 0) {
        const labels = specialDataBlocks.map((b: any) => `"${b.label}"`).join(', ');
        return `Detected processing of special data (${labels}). This data requires explicit consent or specific legal basis.`;
      }
      return 'Detected processing of special categories of personal data.';
    }
  },
  'gdpr-security-storage': {
    'default': (blocks, connections) => {
      const biometricInput = blocks.find((b: any) => 
        b.type === 'input' && b.config?.dataTypes?.includes('Biometrici')
      );
      const storage = blocks.find((b: any) => b.type === 'storage');
      
      if (biometricInput && !storage) {
        return `Detected biometric data in "${biometricInput.label}" but missing explicit storage block. Sensitive data must be stored on secure infrastructures.`;
      }
      if (storage && !storage.config?.isEncrypted) {
        return `Detected storage "${storage.label}" without encryption. Biometric data requires encryption.`;
      }
      return 'Verify that sensitive data is stored on secure and encrypted infrastructures.';
    }
  },
  'aiact-highrisk-biometric': {
    'default': (blocks, connections) => {
      const biometric = findBlockByLabel(blocks, ['Analisi Biometrica', 'Bio Analysis', 'Biometrica']);
      if (biometric) {
        return `Detected biometric analysis system "${biometric.label}". Biometric systems are classified as high-risk by AI Act and require specific measures.`;
      }
      return 'Detected high-risk biometric analysis system.';
    }
  },
  'aiact-transparency-chat': {
    'default': (blocks, connections) => {
      const llm = findBlockByLabel(blocks, ['Chatbot LLM', 'LLM', 'LLM Model']);
      if (llm) {
        return `Detected chat system "${llm.label}" without clear indication it is an AI system. Users must know they are interacting with a machine.`;
      }
      return 'Detected chat system that might not inform users it is an AI system.';
    }
  },
  'gdpr-storage-limitation': {
    'default': (blocks, connections) => {
      const indefiniteBlocks = blocks.filter((b: any) => b.config?.retention === 'indefinite');
      if (indefiniteBlocks.length > 0) {
        const labels = indefiniteBlocks.map((b: any) => `"${b.label}"`).join(', ');
        return `Detected blocks with unlimited data retention (${labels}). GDPR requires defining a specific retention period.`;
      }
      return 'Detected system that stores data without defined time limit.';
    }
  },
  'gdpr-information-duty': {
    'default': (blocks, connections) => {
      const personalDataBlocks = blocks.filter((b: any) => 
        b.type === 'input' && 
        b.config?.dataTypes?.some((dt: string) => 
          ['Personali', 'Biometrici', 'Sanitari'].includes(dt)
        )
      );
      if (personalDataBlocks.length > 0) {
        const labels = personalDataBlocks.map((b: any) => `"${b.label}"`).join(', ');
        return `Detected processing of personal data (${labels}) but no privacy notice identified. Data subjects must be informed before collection.`;
      }
      return 'Detected processing of personal data without clear privacy notice.';
    }
  },
  'gdpr-privacy-by-design': {
    'default': (blocks, connections) => {
      const personalDataBlocks = blocks.filter((b: any) => 
        b.type === 'input' && 
        b.config?.dataTypes?.some((dt: string) => ['Personali'].includes(dt))
      );
      if (personalDataBlocks.length > 0) {
        const hasEncryption = blocks.some((b: any) => b.config?.isEncrypted);
        if (!hasEncryption) {
          return `Detected processing of personal data but no default protection measures implemented (e.g. encryption). GDPR requires privacy by design.`;
        }
      }
      return 'Verify that data protection measures are implemented by design.';
    }
  },
  'gdpr-processing-record': {
    'default': (blocks, connections) => {
      const specialDataBlocks = blocks.filter((b: any) => 
        b.config?.dataTypes?.some((dt: string) => 
          ['Biometrici', 'Sanitari'].includes(dt)
        )
      );
      if (specialDataBlocks.length > 0) {
        const labels = specialDataBlocks.map((b: any) => `"${b.label}"`).join(', ');
        return `Detected processing of special data (${labels}) but no processing record identified. GDPR requires keeping a record for high-risk processing.`;
      }
      return 'Detected high-risk processing without processing record.';
    }
  },
  'gdpr-dpia': {
    'default': (blocks, connections) => {
      const biometricBlock = findBlockByLabel(blocks, ['Analisi Biometrica', 'Biometrica']);
      const decisionBlock = findBlockByLabel(blocks, ['Decisione Automatica']);
      const hasHighRiskProcessing = 
        !!biometricBlock ||
        blocks.some((b: any) => b.config?.dataTypes?.includes('Biometrici') || b.config?.dataTypes?.includes('Sanitari')) ||
        (!!decisionBlock && !blocks.some((b: any) => b.config?.humanInTheLoop));
      
      if (hasHighRiskProcessing) {
        return 'Detected high-risk processing (biometric data, health data, or automated decisions) but no DPIA identified. GDPR requires an impact assessment before starting high-risk processing.';
      }
      return 'Detected high-risk processing. A DPIA (Data Protection Impact Assessment) is required.';
    }
  },
  'aiact-highrisk-systems': {
    'default': (blocks, connections) => {
      const highRiskBlocks = blocks.filter((b: any) => 
        blockMatchesLabel(b, ['Analisi Biometrica', 'Chatbot LLM', 'Decisione Automatica', 'LLM', 'RAG System'])
      );
      if (highRiskBlocks.length > 0) {
        const labels = highRiskBlocks.map((b: any) => `"${b.label}"`).join(', ');
        return `Detected high-risk AI systems (${labels}). These systems require CE marking, quality management and user documentation according to AI Act.`;
      }
      return 'Detected AI systems that could be classified as high-risk according to AI Act.';
    }
  },
  'aiact-user-documentation': {
    'default': (blocks, connections) => {
      const highRiskBlocks = blocks.filter((b: any) => 
        blockMatchesLabel(b, ['Analisi Biometrica', 'Decisione Automatica'])
      );
      if (highRiskBlocks.length > 0) {
        const labels = highRiskBlocks.map((b: any) => `"${b.label}"`).join(', ');
        return `Detected high-risk AI systems (${labels}) but no user documentation identified. AI Act requires clear documentation explaining how the system works and its limits.`;
      }
      return 'Detected high-risk AI system without user documentation.';
    }
  }
};

/**
 * Get translated rule text
 */
export function getRuleTranslation(ruleId: string, locale: Locale): RuleTranslation | null {
  if (locale === 'it') {
    return null; // Use Italian original
  }
  return RULE_TRANSLATIONS[ruleId] || null;
}

/**
 * Get translated context
 */
export function getContextTranslation(
  ruleId: string,
  locale: Locale,
  blocks: any[],
  connections: any[]
): string | null {
  if (locale === 'it') {
    return null; // Use Italian original
  }
  
  const translations = CONTEXT_TRANSLATIONS[ruleId];
  if (!translations) {
    return null;
  }
  
  // Always use default (which is now a function)
  if (translations['default']) {
    const translation = translations['default'];
    if (typeof translation === 'function') {
      return translation(blocks, connections);
    }
    return translation;
  }
  
  return null;
}

