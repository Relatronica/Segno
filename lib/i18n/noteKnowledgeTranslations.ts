/**
 * English translations for note knowledge content
 * This file contains translations for the most common notes/risks
 * More translations can be added gradually
 */

import type { KnowledgeTranslation } from './knowledgeTranslations';

// Translations for common note labels
export const NOTE_KNOWLEDGE_EN: Record<string, Partial<KnowledgeTranslation>> = {
  'Supervisione Umana': {
    simpleExplanation: 'Don\'t let the machine decide alone. A person must always be able to control and correct important choices.',
    question: 'If the system makes a decision about you (e.g. rejects a loan), is there someone who checks it? Can you request a review?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'Right not to be subject to decisions based solely on automated processing',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Define a human review process for high-impact decisions. Document who, when and how intervenes.',
    risk: 'Without supervision, system errors can have serious consequences without possibility of correction.',
    example: 'A credit scoring system that automatically rejects loans without possibility of human appeal violates GDPR.',
    whatYouCanDo: [
      'Read the service terms to see if there is human review',
      'Ask the provider how you can contest automatic decisions',
      'Exercise your GDPR right (Art. 22) not to be subject to automatic-only decisions'
    ],
    redFlags: [
      'The system decides everything automatically without possibility of appeal',
      'There\'s no way to talk to a person if something goes wrong',
      'You weren\'t informed that decisions are automatic'
    ],
  },
  'Perimetro Consenso': {
    simpleExplanation: 'Consent is like a contract: it must be clear, free (not forced) and can be canceled when you want.',
    question: 'When you agreed to use this system, did you know exactly what they would do with your data? Can you say "no" when you want?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 6-7',
      requirement: 'Consent must be explicit, documented and revocable at any time',
      url: 'https://gdpr-info.eu/art-7-gdpr/'
    },
    bestPractice: 'Use clear language, separate consents for different purposes, make revocation easy. Avoid pre-ticked boxes.',
    risk: 'Invalid consents make the entire processing unlawful, with fines up to 4% of turnover.',
    example: 'A site that pre-selects "I accept cookies" without possibility of refusal does not have valid consent.',
  },
  'Privacy by Design': {
    simpleExplanation: 'Think about privacy from the start, like when building a house: it\'s easier to put security doors during construction than to add them later. Collect only necessary data and make it difficult to identify people.',
    question: 'How much personal data are you sharing? Does the system collect only what\'s needed or more? Is your data protected (hard to identify)?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 25',
      requirement: 'Privacy by design: data protection from design, minimization, pseudonymization',
      url: 'https://gdpr-info.eu/art-25-gdpr/'
    },
    bestPractice: 'Collect only strictly necessary data. Separate identifiers from sensitive data. Use tokens instead of direct IDs.',
    risk: 'Collecting excess data increases attack surface and GDPR violations.',
    example: 'Instead of saving "Mario Rossi, 35 years old, diabetic", save "ID_ABC123, risk_category_3" (pseudonymized).',
  },
  'Sicurezza Informatica': {
    simpleExplanation: 'Protect data like jewels in a safe: lock it (encryption) and control who enters (access).',
    question: 'Where is your data stored? Is it protected (like a safe)? What happens if someone steals it? Have you ever asked the provider how they protect your data?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Appropriate technical and organizational measures: encryption, pseudonymization, regular tests',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'End-to-end encryption, role-based access (RBAC), continuous monitoring, annual penetration tests.',
    risk: 'Security breaches can expose sensitive data, cause reputational damage and GDPR fines.',
    example: 'An unencrypted database with weak passwords can be compromised in minutes by attackers.',
  },
  'Controllo Accessi e Audit': {
    simpleExplanation: 'Like in an office, not everyone can access everything. Only those who need it can see certain data. And every access is logged (like a visitor log): who, when, what they did.',
    question: 'Do you know who can see your data? How many people have access? Can you know who looked at your data and when?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Access traceability, limit access to those who need it',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Principle of least privilege. Log all accesses with timestamp, IP, action. Periodic reviews.',
    risk: 'Uncontrolled access allows internal data breaches. Without audit trail, impossible to investigate incidents.',
  },
  'Comitato Etico': {
    simpleExplanation: 'A diverse group of people (legal, technical, citizen representatives) that checks the system is fair and doesn\'t discriminate against anyone. Like a board of directors for ethics.',
    question: 'Do you know who checks the system is fair? Are there diverse people (not just technicians) who verify it?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 14',
      requirement: 'High-risk systems must have governance and human supervision',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Include ethics, legal, technology experts and representatives of affected communities. Documented periodic meetings.',
    risk: 'Technical-only committees may overlook social impacts and discrimination.',
  },
  'DPO (Data Protection Officer)': {
    simpleExplanation: 'The person responsible for data protection in the organization. Like an internal consultant who helps you respect privacy and warns you if you\'re doing something wrong. Mandatory for public bodies and large companies.',
    question: 'Do you know who is responsible for protecting your data in this organization? Can you contact them for privacy concerns?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 37-39',
      requirement: 'Mandatory for public bodies or large-scale processing of sensitive data',
      url: 'https://gdpr-info.eu/art-37-gdpr/'
    },
    bestPractice: 'DPO must be independent, have legal/technical skills and direct access to top management.',
    risk: 'DPO without independence or adequate skills cannot effectively perform their role.',
  },
  'Consenso Esplicito': {
    simpleExplanation: 'For very sensitive data (health, religion, political opinions) an even clearer and aware consent is needed. But remember: you can also use other legal bases (like "medical necessity" for a hospital).',
    question: 'Did you give consent for very sensitive data (health, religion)? Was it clear and can you revoke it when you want?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 9(2)',
      requirement: 'For sensitive data explicit consent OR other legal basis (e.g. medical necessity) required',
      url: 'https://gdpr-info.eu/art-9-gdpr/'
    },
    bestPractice: 'For health data, also consider "medical necessity" or "public interest" as alternatives to consent.',
    risk: 'Consent as sole legal basis is fragile: if revoked, all processing must stop.',
  },
  'Consenso Registrazione': {
    simpleExplanation: 'If you record conversations (calls, voice chats), you must say so BEFORE starting and give the option to refuse. Like when a call center tells you "this call will be recorded".',
    question: 'Do users know they are being recorded? Can they refuse?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'Obligation to inform BEFORE collection: who, what, why, for how long',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Clear information before recording. Option "listen only without recording" when possible.',
    risk: 'Hidden recordings or without consent are unlawful and may result in criminal penalties.',
  },
  'Audit Trail': {
    simpleExplanation: 'It\'s like the system activity log: who did what, when and why. Needed to prove you\'re respecting the rules and understand what happened if something goes wrong. Like security cameras in a store.',
    question: 'If something goes wrong with your data, can you trace who did what? Is there a log of all operations?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(2)',
      requirement: 'Accountability: demonstrate compliance, track all operations',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Immutable logs, kept for legal period, accessible only to DPO/auditor. Include: who, what, when, why.',
    risk: 'Without audit trail, impossible to demonstrate GDPR compliance or investigate incidents.',
  },
  'Audit Trail Completo': {
    simpleExplanation: 'Don\'t just log who enters, but also who modifies, copies or deletes data. Like a complete log of all activities, not just accesses.',
    question: 'Do logs also include data and configuration changes?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(2)',
      requirement: 'Accountability: demonstrate compliance, track all operations',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Track: accesses, data modifications, configuration changes, exports, deletions. Keep for 7-10 years.',
    risk: 'Incomplete logs make it impossible to reconstruct events or demonstrate compliance.',
  },
  'Supervisione Transfer': {
    simpleExplanation: 'When you move data outside Europe, make sure it\'s protected as if it were still here. Rules travel with data.',
    question: 'Is your data saved in Europe or abroad? Do you know what risks saving it outside the EU (e.g. United States) entails?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 44-49 (Schrems II)',
      requirement: 'Extra-EU transfers require SCC + supplementary measures or risk invalidation',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Verify country adequacy (e.g. UK post-Brexit). Use SCC + end-to-end encryption. Consider EU data residency.',
    risk: 'Transfers to USA without supplementary measures have been invalidated by Schrems II. Risk of fines.',
    example: 'Google Analytics transfers data to USA: many EU sites have removed it or adopted EU proxy.',
  },
  'Conservazione e Cancellazione': {
    simpleExplanation: 'Don\'t keep data forever. Decide how long you need it (e.g. 1 year for CVs) and then delete it automatically. Like when freeing space on your phone: you delete old photos you don\'t need anymore.',
    question: 'How long is your data kept? What happens after? Is it automatically deleted?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(e)',
      requirement: 'Limitation: keep only for time necessary for purposes',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Define retention policy by data type. Automate deletion after expiration. Document exceptions.',
    risk: 'Keeping data beyond necessary violates GDPR and increases attack surface.',
    example: 'Data of non-hired candidates: keep max 1 year, then automatic deletion.',
  },
  'Backup e Ripristino': {
    simpleExplanation: 'Having a backup copy of data (like making a photocopy of something important). But be careful: backups must also be protected (encrypted) and you must be able to restore them (don\'t trust they work, test them!).',
    question: 'What happens if your data is lost? Are there backups? Are they protected?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Technical measures for integrity and availability: backup, disaster recovery',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Regular automated backups, encrypted, tested restore procedures, off-site copies.',
    risk: 'Without backups, data loss can be permanent. Unencrypted backups are vulnerable to breaches.',
    example: 'Ransomware attack: if backups are encrypted and tested, you can restore without paying.',
  },
  'DPIA (Data Protection Impact Assessment)': {
    simpleExplanation: 'A document that analyzes risks to privacy before starting a project. Like a safety check before building a house: you identify risks and plan how to avoid them.',
    question: 'Has a privacy impact assessment been done for this system? Do you know what risks it identifies?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 35',
      requirement: 'DPIA mandatory for high-risk processing (systematic monitoring, sensitive data, automated decisions)',
      url: 'https://gdpr-info.eu/art-35-gdpr/'
    },
    bestPractice: 'Conduct DPIA before starting high-risk projects. Document risks and mitigation measures. Review periodically.',
    risk: 'Processing without required DPIA violates GDPR. Fines up to 2% of turnover.',
    example: 'Facial recognition system in public space: requires DPIA before implementation.',
  },
  'Linee Guida Legali': {
    simpleExplanation: 'Written rules and procedures that explain how to respect privacy and laws. Like a manual that tells you what to do and what not to do.',
    question: 'Are there written guidelines on how to handle data? Are they clear and accessible?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 24',
      requirement: 'Controller must implement appropriate technical and organizational measures',
      url: 'https://gdpr-info.eu/art-24-gdpr/'
    },
    bestPractice: 'Document policies and procedures. Regular training. Clear responsibilities. Periodic reviews.',
    risk: 'Lack of documented procedures makes it difficult to demonstrate compliance.',
    example: 'Organization without data handling guidelines: difficult to prove GDPR compliance.',
  },
  'Revisioni Periodiche': {
    simpleExplanation: 'Regular checks to verify that everything is working correctly and that rules are being respected. Like a car inspection: you check periodically to make sure everything is safe.',
    question: 'Are there regular checks to verify the system respects privacy? How often?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(2)',
      requirement: 'Accountability: demonstrate ongoing compliance',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Annual compliance reviews. Regular security audits. Update procedures based on findings.',
    risk: 'Without periodic reviews, compliance issues may go unnoticed until an incident occurs.',
    example: 'Annual GDPR compliance review: identifies issues before they become violations.',
  },
  'Norme e Verifiche Legali': {
    simpleExplanation: 'Legal checks to ensure the system complies with all applicable laws and regulations. Like a legal audit: lawyers check that everything is correct.',
    question: 'Have legal experts verified the system complies with laws? Are there legal reviews?',
    regulation: {
      name: 'GDPR & AI Act',
      article: 'Various',
      requirement: 'Compliance with GDPR, AI Act, and other applicable regulations',
      url: 'https://gdpr-info.eu/'
    },
    bestPractice: 'Regular legal reviews. Stay updated on regulatory changes. Document compliance measures.',
    risk: 'Non-compliance can result in fines, legal action, and reputational damage.',
    example: 'Legal review before launching AI system: identifies compliance issues early.',
  },
  'Consumo di Energia': {
    simpleExplanation: 'AI systems consume a lot of energy, especially large models. This has environmental impact. Consider using more efficient models or optimizing usage.',
    question: 'Do you know how much energy the system consumes? Have you considered environmental impact?',
    regulation: {
      name: 'AI Act & Environmental',
      article: 'Various',
      requirement: 'Consider environmental impact of AI systems',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Monitor energy consumption. Use efficient models. Optimize training and inference. Consider carbon footprint.',
    risk: 'High energy consumption increases costs and environmental impact.',
    example: 'Large LLM training consumes as much energy as a small city. Consider smaller, efficient models.',
  },
  'Impatto sulla Società': {
    simpleExplanation: 'AI systems can affect society in many ways: they can create jobs or eliminate them, change how people interact, or affect social dynamics. Consider these impacts.',
    question: 'How does this system affect society? Does it create or eliminate jobs? Does it change how people interact?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 4',
      requirement: 'Consider social and economic impacts of AI systems',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Assess social impacts. Engage with affected communities. Monitor for unintended consequences.',
    risk: 'Negative social impacts can lead to public backlash, regulatory scrutiny, and reputational damage.',
    example: 'Automated hiring system that discriminates: negative social impact and legal issues.',
  },
  'Influenza su Policy Pubbliche': {
    simpleExplanation: 'AI systems used in public services can influence public policies and decisions. This must be transparent and accountable.',
    question: 'Is this system used in public services? Is its influence on policies transparent?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 5',
      requirement: 'Transparency and accountability for AI in public services',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Transparent use of AI in public services. Public consultation. Accountability mechanisms.',
    risk: 'Non-transparent use of AI in public services can undermine trust and democracy.',
    example: 'AI system used for public policy decisions without transparency: undermines public trust.',
  },
  'Dipendenze Geopolitiche': {
    simpleExplanation: 'Many digital infrastructures (cloud, data centers, chips) depend on a few countries or global actors. If geopolitical relations change or crises erupt, critical services may suddenly stop.',
    question: 'Does the system depend on technologies or infrastructures concentrated in a few countries (e.g. chip production, extra-EU cloud)? What happens if those resources become less available?',
    regulation: {
      name: 'EU Digital Strategy',
      article: 'Resilience and digital sovereignty',
      requirement: 'Reduce critical dependencies on extra-EU providers and increase resilience of digital infrastructures',
      url: 'https://digital-strategy.ec.europa.eu/'
    },
    bestPractice: 'Map geopolitical dependency points (cloud providers, hardware supply chain, third-party platforms) and plan local or European alternatives.',
    risk: 'Geopolitical crises (conflicts, sanctions, trade blocks) can interrupt essential services, impacting citizens, businesses and public administrations.',
    example: 'A city that bases essential services only on an extra-EU cloud without a plan B may suddenly lose its platform in case of sanctions or blocks.',
    whatYouCanDo: [
      'Identify critical system providers (cloud, chips, platforms) and where they are located.',
      'Evaluate European or on-premises alternatives for the most critical services.',
      'Include geopolitical resilience as a criterion in tenders and contracts with providers.'
    ],
    redFlags: [
      'Dependence on a single large extra-EU provider without alternatives.',
      'Absence of geopolitical risk analysis in infrastructure choices.',
      'Contracts that don\'t provide continuity plans in case of international crises.'
    ],
  },
  'Supply Chain Critica': {
    simpleExplanation: 'System operation can depend on long and fragile supply chains (e.g. hardware components produced in a few regions). A crisis at one point in the chain can block everything.',
    question: 'Have you assessed whether there are "bottlenecks" in the technological supply chain (e.g. chips, sensors, data centers)?',
    regulation: {
      name: 'EU Chips Act / Supply chain resilience',
      article: 'Reduction of critical dependencies',
      requirement: 'Improve resilience of supply chains for strategic components (such as semiconductors)',
      url: 'https://digital-strategy.ec.europa.eu/en/policies/european-chips-act'
    },
    bestPractice: 'Map the end-to-end supply chain (hardware, services, maintenance) and identify single points of failure.',
    risk: 'A crisis in one region (e.g. semiconductor producers) can slow down or block upgrades, maintenance or scaling of the system.',
    example: 'Interruptions in chip production have already slowed delivery of critical hardware (servers, sensors, IoT devices) for years.',
    whatYouCanDo: [
      'Identify hardware/software components that have few global suppliers.',
      'Plan strategic stocks or agreements with multiple suppliers for critical components.',
      'Link technology choices to the city/organization\'s operational continuity plans.'
    ],
    redFlags: [
      'Dependence on a single critical hardware manufacturer without alternatives.',
      'No analysis of replacement or repair times in case of supply blocks.',
      'Absence of dialogue between IT and those responsible for risk management/operational continuity.'
    ],
  },
  'Stabilità Istituzionale & Fiducia': {
    simpleExplanation: 'AI and digital systems that manage public services or sensitive data influence citizens\' trust in institutions. If perceived as opaque, unfair or easily manipulated, they undermine democratic legitimacy.',
    question: 'Does the way you use AI and data strengthen or weaken trust in institutions and public decisions?',
    regulation: {
      name: 'AI Act / EU fundamental values',
      article: 'Transparency, non-discrimination, rights protection',
      requirement: 'Ensure that systems with high public impact are transparent, explainable and non-discriminatory',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Involve citizens and vulnerable stakeholders in design; openly communicate limits, risks and benefits; provide clear channels to contest decisions.',
    risk: 'Opaque or perceived-unfair systems can fuel mistrust, protests and political polarization.',
    example: 'Resource allocation or territorial scoring systems used without clear explanations have triggered protests and loss of trust in several cities.',
    whatYouCanDo: [
      'Assess which AI-supported decisions have sensitive political or social impacts.',
      'Design explanation mechanisms accessible even to non-experts.',
      'Plan public consultation moments (consultations, assemblies, tests with local communities).'
    ],
    redFlags: [
      'High-impact decisions made by opaque systems without possibility of contestation.',
      'Lack of understandable explanations for citizens and stakeholders.',
      'Absence of structured channels for complaints, contestations or human review.'
    ],
  },
  'Impatto sulla Fiducia Pubblica': {
    simpleExplanation: 'Public trust in AI systems is important. If people don\'t trust the system, they won\'t use it or will resist it. Build trust through transparency, accountability, and good practices.',
    question: 'Do people trust this system? What can be done to increase trust?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 13',
      requirement: 'Transparency and explainability to build trust',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Transparent communication. Explainable decisions. Accountability. Engage with users and stakeholders.',
    risk: 'Loss of public trust can lead to system rejection, regulatory action, and reputational damage.',
    example: 'AI system with transparency issues: loses public trust and faces regulatory scrutiny.',
  },
  'Buffer Volatile': {
    simpleExplanation: 'Temporary data (like computer memory when processing something) must be deleted immediately after use. Like deleting temporary notes after reading them. Don\'t leave traces in memory.',
    question: 'Is temporary data deleted immediately after use?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(e)',
      requirement: 'Limitation: keep data only for necessary time',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Temporary buffers must be deleted immediately after processing. Don\'t save sensitive data in cache.',
    risk: 'Uncleared buffers may expose sensitive data in case of memory dump or attacks.',
  },
  'Prompt Guard': {
    simpleExplanation: 'Protect the chatbot from malicious input. Like a spam filter: some users might try to make it say wrong things or reveal private information. Check everything that enters the system.',
    question: 'Do you have filters to prevent prompt injection and harmful output?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'High-risk systems must have security and robustness controls',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Validate user input, filter prompt injection, limit output to safe contexts. Monitor abuse attempts.',
    risk: 'Prompt injection can generate harmful content, expose training data, or bypass security controls.',
    example: 'A chatbot that accepts any input can be manipulated to generate offensive content or sensitive information.',
  },
  'Dataset Ombra': {
    simpleExplanation: 'The dataset (data used to train AI) must be documented: where does it come from? Is it updated? Are there biases? Like when buying ingredients to cook: you must know what you\'re using and where it comes from.',
    question: 'What information was this system trained on? Could it contain biases or outdated data? Where does this data come from?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'High-risk systems must document training datasets and their characteristics',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Document: data origin, pre-processing, known biases, limits. Keep dataset updated and representative.',
    risk: 'Outdated or biased datasets can produce discriminatory or inaccurate decisions.',
  },
  'Monitoraggio Modelli': {
    simpleExplanation: 'AI models aren\'t perfect forever. They can get worse over time (like a car that wears out). You must regularly check they still work well. If they make errors, you must know immediately and fix them.',
    question: 'How do you know if the system is giving you wrong information? Who checks it always works well? Have you ever received wrong answers?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 15',
      requirement: 'High-risk systems must have continuous monitoring and updates',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Monitor accuracy, drift, production performance. Automatic alerts for anomalies. Periodic retraining.',
    risk: 'Unmonitored models can degrade over time, producing wrong decisions without anyone noticing.',
  },
  'Crittografia Dati': {
    simpleExplanation: 'Encrypting data means transforming it into a code that only those with the key can read. Like putting a letter in a safe: even if someone steals it, they can\'t read it without the key. Do it both when data is at rest (stored) and in transit (traveling).',
    question: 'Is your data protected (encrypted) both when saved and when traveling over the internet? Have you ever asked how it\'s protected?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Appropriate technical measures: encryption of personal data',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'AES-256 for data at rest, TLS 1.3 for data in transit. Separate key management (HSM or managed services).',
    risk: 'Unencrypted data is vulnerable to data breaches. Weak encryption can be broken.',
    example: 'A database with passwords in plain text exposed online can be compromised in seconds.',
  },
  'Sicurezza Rafforzata': {
    simpleExplanation: 'Don\'t rely on a single protection. Use multiple layers of security: like a house with lock, alarm, gates and guard. If one layer fails, others still protect. Firewall, monitoring, strong authentication: every layer counts.',
    question: 'Have you implemented multi-layer security? How do you detect attacks?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Appropriate technical and organizational measures for data security',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Defense in depth: firewall, IDS/IPS, WAF, multi-factor authentication, network segmentation, continuous monitoring.',
    risk: 'Insufficient security exposes to data breaches, ransomware, unauthorized access.',
  },
  'Monitoraggio Intrusioni': {
    simpleExplanation: 'Do you have a system that alerts you if someone is trying to enter your system? Like a burglar alarm: if someone tries to force the door, the siren sounds. And when it sounds, you must have a plan to respond immediately.',
    question: 'How do you detect intrusion attempts? Do you have a response plan?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Measures to ensure security: detection and response to incidents',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'IDS/IPS, SIEM, log analysis, automatic alerts. Tested incident response plan. Notify authorities within 72h if data breach.',
    risk: 'Undetected intrusions can cause prolonged data breaches, with greater damage and more severe fines.',
  },
  'Perimetro BYOK': {
    simpleExplanation: 'Encryption keys: do you manage them or entrust them to the cloud provider? BYOK (Bring Your Own Key) means you control the keys. More secure but more complex. If keys are from the provider and the provider is compromised, your data is also at risk.',
    question: 'Do you manage encryption keys or entrust them to the provider?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Appropriate technical measures for security, including key control',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'BYOK (Bring Your Own Key) gives more control but requires expertise. Evaluate security vs complexity trade-off.',
    risk: 'Keys managed by provider may be exposed if provider is compromised.',
  },
  'Politica di Retention': {
    simpleExplanation: 'Decide how long to keep each type of data (e.g. CV: 1 year, browsing data: 13 months). Then automatically delete them when time expires. Like food expiration: when the date passes, you throw it away. Document the rules and review them yearly.',
    question: 'Have you defined retention times for each type of data? Is it documented?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(e)',
      requirement: 'Limitation: keep data only for time necessary for purposes',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Clear policy for each data category. Automate deletion. Documented exceptions. Annual review.',
    risk: 'Keeping data beyond necessary violates GDPR and increases risk of data breach.',
    example: 'Web browsing data: keep max 13 months (cookies), then automatic deletion.',
  },
  'Diritto all\'Oblio': {
    simpleExplanation: 'If a person asks you to delete their data, you must do it within 30 days. But be careful: you must delete it EVERYWHERE (main database, backups, cache, third-party systems). Like when someone asks to remove a photo: you must find it wherever it was shared, not just from one place.',
    question: 'Can you ask them to delete all your data? What happens when you make this request? Are they deleted everywhere (even backups)?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 17',
      requirement: 'Right to erasure: data must be deleted without undue delay',
      url: 'https://gdpr-info.eu/art-17-gdpr/'
    },
    bestPractice: 'Clear process for requests. Deletion within 30 days. Check backups, cache, third-party systems. Document.',
    risk: 'Not respecting right to erasure can cause fines and reputational damage.',
    example: 'User requests deletion but data remains in unencrypted backups: GDPR violation.',
  },
  'Cancellazione Automatica': {
    simpleExplanation: 'Don\'t delete data manually: it\'s too easy to forget or make mistakes. Set up automatic deletions when time expires. But test them regularly: don\'t trust they work, test them! Like checking that the alarm clock really works.',
    question: 'Is data automatically deleted at expiration? Is it tested?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(e)',
      requirement: 'Limitation: keep only for necessary time',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Automatic jobs for deletion. Regular tests. Log all deletions. Documented exceptions.',
    risk: 'Manual deletion is error-prone. Obsolete data can accumulate.',
  },
  'Minimizzazione Dati': {
    simpleExplanation: 'Collect only data you really need. Don\'t ask for everything "for security". Like when you go to buy bread: the shopkeeper doesn\'t need to know where you live or what job you do. For each data ask yourself: is it really necessary?',
    question: 'Does the system ask you for a lot of personal data? Are they all really necessary or do they ask for more than needed?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(c)',
      requirement: 'Minimization: data must be adequate, relevant and limited to what is necessary',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'For each data ask: is it really necessary? Can I use less sensitive data? Review periodically.',
    risk: 'Collecting excess data increases attack surface, complexity and risk of violations.',
    example: 'For authentication, email is sufficient. No need to also ask for date of birth or full address.',
  },
  'Pseudonimizzazione': {
    simpleExplanation: 'Instead of saving "Mario Rossi, diabetic", save "ID_ABC123, risk_category_3" and keep the name in a separate protected place. So if someone steals the data, they don\'t know who Mario Rossi is. But the keys to trace back to identity must be well protected, otherwise it\'s useless.',
    question: 'Have you separated identifiers from sensitive data? Are keys protected?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 4(5) & Art. 25',
      requirement: 'Pseudonymization as technical measure to protect data',
      url: 'https://gdpr-info.eu/art-4-gdpr/'
    },
    bestPractice: 'Separate pseudonym IDs from sensitive data. Mapping keys in separate encrypted system. Limit access.',
    risk: 'Poorly implemented pseudonymization offers false security. If keys are accessible, pseudonymization is useless.',
    example: 'Instead of "Mario Rossi, diabetic", use "ID_ABC123" + separate table with mapping (protected).',
  },
  'Anonimizzazione': {
    simpleExplanation: 'Truly anonymizing data is very difficult. Even if you remove names and surnames, you can often trace back to people by combining other data (age, city, gender, etc.). If data can be re-identified, it\'s still "personal data" and GDPR rules apply. Always verify that anonymization is really effective.',
    question: 'Is data truly anonymous or can it be re-identified?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 4(5)',
      requirement: 'Anonymous data is not personal data and is not subject to GDPR',
      url: 'https://gdpr-info.eu/art-4-gdpr/'
    },
    bestPractice: 'True anonymization is difficult. Consider k-anonymity, l-diversity, differential privacy. Test re-identification.',
    risk: '"Anonymized" data that can be re-identified is still personal data and subject to GDPR.',
    example: 'Dataset with "age, ZIP code, gender" can be re-identified with other public datasets. More robust anonymization needed.',
  },
  'Controllo Accessi': {
    simpleExplanation: 'Not everyone should see everything. An accountant doesn\'t need to see health data. A programmer shouldn\'t see banking data. Give everyone only the minimum access necessary for their work. Like in an office: not everyone has keys to all rooms.',
    question: 'How many people can see your data? Only those who really need it or others too? Have you ever asked who has access?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Limit access to those who need it for processing purposes',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'RBAC (Role-Based Access Control), principle of least privilege, periodic access reviews, immediate revocation when no longer needed.',
    risk: 'Too broad access allows internal data breaches. Employees can see data not necessary for their work.',
  },
  'Gestione Permessi': {
    simpleExplanation: 'Permissions must be managed centrally and updated automatically. When an employee changes role or leaves, their access must be revoked immediately. Like when you return keys when changing house: the ex-tenant must no longer enter.',
    question: 'How do you manage permissions? Are they updated when roles change?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Measures to limit access to those who need it',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Centralized permission management system. Automatic revocation when employee leaves. Quarterly reviews.',
    risk: 'Outdated permissions allow unauthorized access. Ex-employees may still access.',
  },
  'Log Accessi': {
    simpleExplanation: 'Log who accesses data, when and what they do. Like a visitor log: every access is tracked. Logs must be kept for years and unmodifiable (immutable). If something goes wrong, you can see who was there and what they did.',
    question: 'Are all accesses tracked? Are logs immutable and kept?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Access traceability for accountability',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Log every access: who, what, when, IP, action. Immutable logs, kept for legal period. Alerts on suspicious access.',
    risk: 'Without logs, impossible to investigate data breaches or demonstrate compliance.',
  },
  'Tracciabilità Operazioni': {
    simpleExplanation: 'Track ALL operations on data, not just accesses: also who modifies, who deletes, who exports. Like a complete log of everything that happens. If someone modifies or deletes data, you must know who it was and when.',
    question: 'Are all data operations tracked? Does it include modifications and deletions?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(2)',
      requirement: 'Accountability: demonstrate compliance, track all operations',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Track: creation, read, modification, deletion, export, sharing. Immutable logs, kept for 7-10 years.',
    risk: 'Without traceability, impossible to reconstruct events, investigate incidents or demonstrate compliance.',
  },
  'Human-in-the-Loop': {
    simpleExplanation: 'It means a person controls the system\'s important decisions. It\'s not enough for the human to "always approve without looking". They must really verify and can change the decision. Like a supervisor who checks work done by the machine, not who signs automatically.',
    question: 'When the system makes a decision, is there always a person who really checks it? Or do they just sign automatically?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'Right not to be subject to decisions based solely on automated processing',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Clearly define when human intervention is needed. Documented process. Training for operators. Monitor effectiveness.',
    risk: 'Formal human-in-the-loop (human always approves without verifying) doesn\'t satisfy GDPR.',
  },
  'Review Decisioni Critiche': {
    simpleExplanation: 'Important decisions (loan rejection, hiring, access to services) must be reviewed by a person. The user has the right to request human review. Like when you ask for a second medical opinion: you have the right to have it checked by someone else.',
    question: 'If the system rejects something important for you (e.g. loan, hiring), can you ask a person to review it? How do you do it?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'Right to contest and review automated decisions',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Mandatory review for high-impact decisions (e.g. loan rejection, hiring). Clear and accessible process.',
    risk: 'Critical decisions without review can cause discrimination or serious uncorrected errors.',
  },
  'Ridondanza Locale': {
    simpleExplanation: 'Don\'t keep all backups only in cloud. Also keep local copies (in your company). Why? If the cloud provider has problems (e.g. service interruption), your cloud backups aren\'t accessible. Like having copies of important documents both in cloud and in the drawer: if internet doesn\'t work, you still have local copies.',
    question: 'Do you have local backups in addition to cloud ones? Are they synchronized?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Measures to ensure data availability and integrity',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Multiple backups, geographically distributed. Regular restore tests. Local redundancy for operational continuity.',
    risk: 'Only cloud backups: if provider has problems, data not accessible. Untested backups may fail when needed.',
  },
  'Notifier Trasparenza': {
    simpleExplanation: 'You must clearly tell users they\'re interacting with an AI system, not a person. It\'s mandatory. You can\'t make a chatbot pass as human. Like when you go to the supermarket: if you buy "fake" food, it must be clearly written on the package.',
    question: 'Did you know you were talking with an AI system and not a person? Was it clearly told to you?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 50',
      requirement: 'Transparency obligation: inform users they interact with AI',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Clear and visible disclaimer. Explain system limits. Provide information on how it works.',
    risk: 'Users who don\'t know they\'re interacting with AI may make choices based on false expectations.',
    example: 'Chatbot that presents itself as human violates AI Act. Must clearly say "I am an AI assistant".',
  },
  'Filtro Bias': {
    simpleExplanation: 'Bias means prejudices in the system. AI might discriminate against groups of people (e.g. women, minorities) even if you don\'t want to. You must test the system with different people and see if it works the same for everyone. If not, fix it. Like when you take a test: it must be fair for everyone, not just some.',
    question: 'Have you ever noticed the system works differently for different people? Do you think it might discriminate against someone?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'High-risk systems must be designed to avoid discrimination',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Test with diverse datasets. Monitor performance for demographic groups. Regular bias audits. Retraining if needed.',
    risk: 'Undetected bias can cause illegal discrimination, reputational damage and fines.',
    example: 'Hiring system that penalizes women or ethnic minority candidates violates anti-discrimination laws.',
  },
  'Validazione Qualità': {
    simpleExplanation: 'Check image/video quality BEFORE processing them. If quality is low (blurry image, dark video), the system might make errors or discriminate. Reject insufficient quality input. Like when you check the photo is well done before using it for an ID document.',
    question: 'How do you evaluate quality of processed images/videos? What do you do if quality is low?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'High-risk systems must have quality and robustness controls',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Validate input quality before processing. Reject insufficient quality input. Alerts for suspicious input.',
    risk: 'Processing low-quality input can produce wrong or discriminatory results.',
  },
  'Validazione Alert': {
    simpleExplanation: 'When the system detects an anomaly and sends an "alert", you must verify it\'s true. Too many false alarms (like a burglar alarm that goes off for a cat) make everyone ignore alarms, even real ones. A person must check before acting.',
    question: 'How do you verify alerts are true positives and not false alarms?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'High-risk systems must be accurate and robust',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Human validation of alerts before action. Monitor false positive rate. Adjust thresholds if needed.',
    risk: 'Too many false positives cause "alert fatigue" and may make real problems be ignored.',
  },
  'Trascrizione Sicura': {
    simpleExplanation: 'If you transform audio into text (transcription), delete the original audio immediately after. Keep only the text and protect it with encryption. Why keep the audio? It only increases risk. Like when you dictate a letter to a secretary: destroy the tape, keep only the written text.',
    question: 'Are audio recordings deleted after transcription? Is transcription encrypted?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(e) & Art. 32',
      requirement: 'Limitation and security: keep only necessary, protect data',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Delete original audio after transcription. Encrypt transcriptions. Keep only necessary text.',
    risk: 'Keeping original audio increases attack surface. Unencrypted transcriptions may expose sensitive conversations.',
  },
  'Preferenze Utente': {
    simpleExplanation: 'Users must be able to control how their data is used. Create a simple dashboard where they can choose: what to share, with whom, for how long. Like social network privacy settings: the user must be able to decide.',
    question: 'Can users control how their data is used?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 7(3)',
      requirement: 'Right to withdraw consent and control data processing',
      url: 'https://gdpr-info.eu/art-7-gdpr/'
    },
    bestPractice: 'User dashboard to manage preferences. Clear options: what to share, with whom, for how long. Easy to use.',
    risk: 'Users without control feel privacy violated, may withdraw consent or file complaints.',
  },
  'Accesso Controllato': {
    simpleExplanation: 'Dashboards with data must be protected. Who can access? Only those who really need it. And use aggregated data (statistics) when possible, not individual data. Like when showing sales statistics: you don\'t show customer names, but only totals.',
    question: 'Who can access the dashboard? Is data aggregated or individual?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Limit access to those who need it',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Dashboard with aggregated data when possible. Individual access only if necessary. Strong authentication.',
    risk: 'Dashboard with individual data accessible to too many people increases risk of data breach.',
  },
  'Controllo Trasferimenti': {
    simpleExplanation: 'When you move data outside Europe (e.g. from EU servers to US servers), you must verify it\'s legal. Requires a special contract (SCC) and encryption. Non-compliant transfers can be blocked and cause fines. Like when shipping something abroad: you must have the right documentation.',
    question: 'Have you verified data transfers are compliant? Do you have SCC?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 44-49',
      requirement: 'Extra-EU transfers require adequate safeguards (SCC, BCR, etc.)',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Verify data destination. Use SCC for transfers. End-to-end encryption. Document everything.',
    risk: 'Non-compliant transfers can be invalidated, causing fines and service interruption.',
  },
  'Backup Automatico': {
    simpleExplanation: 'Make backup copies automatically every day. Don\'t do manual backups: it\'s too easy to forget them. But copies must be tested regularly (at least once a month). Why? Because if they don\'t work when you need them, they\'re useless. Like testing insurance: you must be sure it really works.',
    question: 'Are backups automatic? Are they tested? Where are they kept?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Measures to ensure availability: regular backups',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Daily automatic backups, kept separately, encrypted, tested monthly. Clear retention policy.',
    risk: 'Manual backups may be forgotten. Untested backups may fail when needed.',
  },
  'Disaster Recovery': {
    simpleExplanation: 'Do you have a plan for when a disaster happens (fire, cyber attack, blackout)? What do you do? How long does it take to restore? Where are backups? Who to call? This plan must be written, tested regularly and known by the whole team. Like an evacuation plan: you must know what to do when something happens.',
    question: 'Do you have a disaster recovery plan? Is it tested? What is RTO/RPO?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Measures to ensure data and service availability',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Documented plan, tested semiannually. RTO (Recovery Time Objective) and RPO (Recovery Point Objective) defined. Trained team.',
    risk: 'Without tested plan, in case of disaster (fire, cyber attack) data may be lost or system inaccessible for days.',
  },
  'Piano Continuità': {
    simpleExplanation: 'How do you ensure service continues even if something happens? Do you have backup systems (redundancy)? What happens if a server breaks? Do you have a team that knows how to respond? The plan must ensure that even during an incident, service continues (or resumes quickly).',
    question: 'How do you ensure operational continuity in case of incidents?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Measures to ensure data and service availability',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Business continuity plan, redundant systems, automatic failover, response team, communication with stakeholders.',
    risk: 'Without plan, incidents can cause prolonged interruptions, data loss, reputational damage.',
  },
  'Gestione Cookie': {
    simpleExplanation: 'Non-essential cookies (tracking, advertising) require consent. Users must be able to easily refuse (not just accept). The banner must be clear and the "Refuse all" button must be as easy to find as "Accept". Essential cookies (site functionality) don\'t require consent.',
    question: 'Can users refuse non-essential cookies? Is consent valid?',
    regulation: {
      name: 'GDPR & ePrivacy',
      article: 'Art. 5(3) ePrivacy & Art. 6 GDPR',
      requirement: 'Non-essential cookies require consent. Refusal must be as easy as acceptance',
      url: 'https://gdpr-info.eu/art-6-gdpr/'
    },
    bestPractice: 'Clear cookie banner. "Refuse all" as prominent as "Accept". Essential cookies only without consent.',
    risk: 'Invalid cookie consent can cause GDPR violations and fines.',
    example: 'Site with pre-ticked "Accept cookies" and hidden "Refuse" button: invalid consent.',
  },
  'Perimetro Biometria': {
    simpleExplanation: 'Biometric data (face, fingerprint, voice) is special: you can\'t change it like a password. To use it you need a very strong legal basis or explicit consent. Always ask yourself: is it really necessary? Isn\'t a badge or PIN enough?',
    question: 'Are you using biometric data (facial recognition, fingerprints)? Is it really necessary or could they use a less invasive alternative? Did you give explicit consent?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 9(2)',
      requirement: 'Biometric data are special categories: explicit consent or exceptional legal basis required',
      url: 'https://gdpr-info.eu/art-9-gdpr/'
    },
    bestPractice: 'Assess if biometrics is really necessary. Consider less invasive alternatives. Document legal basis.',
    risk: 'Biometric processing without valid legal basis is unlawful. Fines up to 4% of turnover.',
    example: 'Facial recognition for office access: assess if badge or PIN are sufficient.',
  },
  'Accordi & SLA': {
    simpleExplanation: 'When using external providers (e.g. cloud, services), you must have clear contracts that include GDPR obligations, security and availability. Don\'t rely only on "trust": put everything in writing. If the provider doesn\'t comply with GDPR, you are also responsible.',
    question: 'Do you have clear contracts with providers? Do SLAs include security and GDPR compliance?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 28',
      requirement: 'Contracts with processors must include security and compliance obligations',
      url: 'https://gdpr-info.eu/art-28-gdpr/'
    },
    bestPractice: 'DPA (Data Processing Agreement) with all providers. Clear SLAs on security, availability, compliance. Periodic audits.',
    risk: 'Providers without adequate contracts may not comply with GDPR, causing shared liability.',
  },
  'Accountability Pubblica': {
    simpleExplanation: 'Who is responsible if the system makes a mistake? It must be clear. If the system makes an error that harms someone, is there someone who answers? Who? How do you contact them? Publish who manages the system and who is responsible. Like when you go to a hospital: if something goes wrong, you know who is responsible.',
    question: 'Who is responsible for the system\'s decisions? Is it clear?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 14',
      requirement: 'High-risk systems must have governance and accountability',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Clearly define responsibilities. Publish who manages the system. Channels for complaints and accountability.',
    risk: 'Without clear accountability, errors or damages may not be attributed, victims without compensation.',
  },
  'Bias Algoritmici': {
    simpleExplanation: 'Biases in the system can discriminate against groups of people even if you don\'t want to. Example: hiring system that penalizes female candidates or minorities. You must test the system with different people and see if it works the same for everyone. If it discriminates, you must correct it. Like a school test: it must be fair for everyone.',
    question: 'Have you tested the system for bias? How do you detect and correct them?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Systems must avoid discrimination and bias',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Test with diverse datasets. Regular bias audits. Monitor performance by groups. Retraining if necessary.',
    risk: 'Undetected bias can cause illegal discrimination, harm to individuals and groups, loss of trust.',
    example: 'Loan system that systematically penalizes ethnic minorities violates anti-discrimination laws.',
  },
  'Consumo Energetico Training': {
    simpleExplanation: 'Training a large AI model consumes ENORMOUS energy: as much as thousands of homes. Before training a model from scratch, consider pre-trained models you can adapt (more efficient) or smaller models. Like when traveling: you don\'t buy a new car every time, sometimes you take the one you already have.',
    question: 'How much energy is needed to train the model? Have you considered alternatives?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 60',
      requirement: 'Document environmental impact, including energy consumption',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Measure actual consumption. Consider pre-trained models, transfer learning, quantization. Use renewable energy.',
    risk: 'Training huge models can consume as much as thousands of homes for months. Significant environmental impact.',
    example: 'GPT-3 training: ~1.3 GWh (equivalent to 120 homes for a year). Smaller models can be 100-1000x more efficient.',
  },
  'Decisioni Automatiche': {
    simpleExplanation: 'Automated decisions are those made entirely by a system without human intervention. You have the right to know when a decision is automated and to request human review. Like when a machine grades your test: you have the right to ask a teacher to review it.',
    question: 'Are decisions about you made automatically? Can you request human review?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'Right not to be subject to decisions based solely on automated processing',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Inform users when decisions are automated. Provide clear process for requesting human review. Document all automated decisions.',
    risk: 'Automated decisions without human review can cause errors, discrimination, and violate GDPR.',
    example: 'If a loan system automatically rejects you and you can\'t talk to anyone or request a review, the system violates GDPR. You have the right to human review.',
    whatYouCanDo: [
      'Read the terms of use to see if you can contest decisions',
      'Ask the provider how to appeal automated decisions',
      'Exercise your GDPR right (Art. 22) not to be subject to automated-only decisions',
      'Request human review if the decision seems unfair'
    ],
    redFlags: [
      'The system decides everything automatically without possibility of appeal',
      'There\'s no way to talk to a person if something goes wrong',
      'You weren\'t informed that decisions are automated',
      'You can\'t request an explanation of the decision'
    ],
  },
  'Disparità di Accesso': {
    simpleExplanation: 'The system must work for EVERYONE, not just those with advanced smartphones or who know how to use computers. Think of people with visual disabilities, elderly, those with only a basic phone, those who don\'t speak your language. If the system requires advanced technology, you exclude many people. Design to be accessible to all.',
    question: 'Can everyone use the system? What is needed to access it?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'High-risk systems must be accessible',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Inclusive design, support for disabilities, multilingual interfaces, access even without advanced smartphone/computer.',
    risk: 'Inaccessible systems exclude people with disabilities, elderly, those with limited technology.',
    example: 'System requiring smartphone app excludes those with only basic phone or who don\'t know how to use smartphones.',
  },
  'Emissioni CO2 Stimate': {
    simpleExplanation: 'Every kWh of energy produces carbon dioxide (CO2) that contributes to climate change. Calculate how many emissions your system produces (training + use) and try to reduce them: use renewable energy, efficient models, servers with low impact. Like when you calculate the carbon footprint of a trip.',
    question: 'Have you calculated the system\'s carbon footprint? How do you reduce it?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 60',
      requirement: 'Document environmental impact',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Calculate emissions (training + inference). Use data centers with renewable energy. Optimize models for efficiency.',
    risk: 'AI systems can have significant carbon footprint, contributing to climate change.',
  },
  'Energia Inferenza Real-time': {
    simpleExplanation: 'How much does the system consume when in use (inference)? Not only during training, but every time someone uses it. With thousands of simultaneous users, it can consume a lot of energy. Use efficient and optimized models. Like when choosing a light bulb: LED consumes less than a normal one.',
    question: 'How much does the system consume in production? Is it optimized?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 60',
      requirement: 'Document environmental impact',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Measure consumption in production. Use quantized models, edge computing when possible. Monitor and optimize continuously.',
    risk: 'Unoptimized inference can consume a lot of energy, especially with many simultaneous users.',
  },
  'Esclusione Digitale': {
    simpleExplanation: 'Who might be excluded? People without internet, without smartphones, with little familiarity with technology. Provide alternatives: phone channel, human assistance, physical offices. Don\'t force everyone to use only digital. Some people need to talk to a real person.',
    question: 'Who might be excluded from the system? How do you include them?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Systems must be accessible and not discriminate',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Identify groups at risk of exclusion. Provide alternatives (e.g. phone channel, human assistance). Monitor access.',
    risk: 'Digital exclusion can perpetuate existing inequalities, excluding those with fewer digital skills or resources.',
  },
  'Esposizione Dati Lavoro': {
    simpleExplanation: 'Work data (salary, performance, health) is sensitive. If exposed, it can cause discrimination or harm. Protect it like personal data: encryption, access control, clear retention policies. Like when you keep work documents in a locked drawer.',
    question: 'How are your work data protected? Who can access them?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Appropriate technical and organizational measures to protect data',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Encrypt work data. Limit access to those who need it. Clear retention policy. Regular audits.',
    risk: 'Exposed work data can cause discrimination, harm to employees, GDPR violations.',
    example: 'If you share a document with customer information with ChatGPT, you\'re potentially violating data confidentiality and GDPR. The company could face legal problems.',
    whatYouCanDo: [
      'Always verify with your company if it\'s allowed to use AI systems for work data',
      'Only use tools approved by the company',
      'Don\'t share confidential data without authorization',
      'Read company policies on privacy and data security'
    ],
    redFlags: [
      'You share work data with AI systems without authorization',
      'You don\'t know if your company allows AI use for confidential data',
      'You use public AI tools for company documents without verifying',
      'You haven\'t read company privacy policies'
    ],
  },
  'Fiducia dei Cittadini': {
    simpleExplanation: 'Trust is built with honesty and transparency. If you hide errors or explain poorly, you lose it. And once lost, it\'s hard to recover. Be honest about system limitations, admit errors, respond to concerns. Like a relationship: trust is built over time with honest behavior.',
    question: 'How do you build and maintain trust in the system?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 13-14',
      requirement: 'Transparency, explainability, governance to build trust',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Communicate honestly about limitations and errors. Allow feedback. Respond to concerns. Show continuous improvements.',
    risk: 'Lost trust is hard to recover. Hidden errors or opaque communication destroy public trust.',
  },
  'Impatto su Comunità Vulnerabili': {
    simpleExplanation: 'Think about vulnerable groups: refugees, homeless, disabled, elderly, minorities. The system might impact them differently or discriminate without wanting to. Involve representatives of these communities when designing and testing the system. Ask them: does this work for you? Is there something that excludes you?',
    question: 'How does the system impact vulnerable groups? Have you involved representatives?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Systems must avoid discrimination and be accessible',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Involve representatives of vulnerable communities in design and testing. Monitor specific impacts. Adjust if necessary.',
    risk: 'Systems not tested with vulnerable communities can cause unintentional discrimination or exclusion.',
  },
  'Impronta Carbonio Infrastruttura': {
    simpleExplanation: 'Don\'t think only about the AI model\'s consumption. Also think about the servers that host it, data center cooling, hardware production. Choose providers that use renewable energy and are efficient. Like when buying a car: you don\'t just look at consumption, but also how much it pollutes to produce it.',
    question: 'Have you considered the environmental impact of servers and data centers?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 60',
      requirement: 'Document complete environmental impact',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Consider data center consumption, cooling, hardware production. Prefer providers with renewable energy and efficiency.',
    risk: 'Cloud infrastructure can have significant environmental impact if not managed efficiently.',
  },
  'Licenze & Attribution': {
    simpleExplanation: 'When you use data, models or code from others, you must respect their license. Always check licenses BEFORE using. Some are free (open source), others require payment or attribution (mentioning who created them). Violating licenses can be expensive: fines or obligation to remove everything.',
    question: 'Have you verified licenses of data and models used? Do you respect required attribution?',
    regulation: {
      name: 'Copyright',
      article: 'Various',
      requirement: 'Respect licenses of data, models, code used',
      url: 'https://creativecommons.org/licenses/'
    },
    bestPractice: 'Check licenses before using. Document attributions. Respect conditions (e.g. open source, commercial use).',
    risk: 'Violating licenses can cause lawsuits, fines, obligation to remove system.',
  },
  'Mancanza Trasparenza': {
    simpleExplanation: 'If the system doesn\'t explain how it works or why it makes certain decisions, it\'s a "black box". You have the right to understand. Like when you take a test: you have the right to know why you got a certain grade.',
    question: 'Does the system explain how it works? Can you understand its decisions?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 13',
      requirement: 'High-risk systems must be transparent and explainable',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Provide clear explanations of how the system works. Show main factors in decisions. Allow contestation.',
    risk: 'Lack of transparency undermines trust, makes it difficult to contest errors, can hide bias.',
    example: 'If a recommendation system always suggests the same things without explaining why, or a credit scoring system rejects you without saying which criteria it uses, there\'s no transparency.',
    whatYouCanDo: [
      'Ask the provider for explanations on how the system works',
      'Read the terms of use and available documentation',
      'Request information on decisions the system makes about you',
      'Don\'t use systems that don\'t explain how they work'
    ],
    redFlags: [
      'The system is a "black box": you don\'t know how it works',
      'You don\'t get explanations when you ask how it works',
      'Explanations are too technical or incomprehensible',
      'The provider refuses to explain how the system works'
    ],
  },
  'Messaggi ai cittadini': {
    simpleExplanation: 'Messages you send to citizens must be clear and understandable for everyone, not just experts. Avoid technical jargon, use simple language, explain as if talking to an ordinary person. Test with real people: do they understand? If they don\'t, rephrase. Like when explaining something to a child: you use simple words.',
    question: 'Are messages clear and understandable? Do they avoid technicalities?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 13',
      requirement: 'Information must be understandable to users',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Simple language, avoid technical jargon. Test comprehensibility with real users. Provide concrete examples.',
    risk: 'Incomprehensible messages can confuse users, cause wrong choices, undermine trust.',
  },
  'Privacy Dati': {
    simpleExplanation: 'Your personal data is valuable and must be protected. When you share it with an AI system, you have the right to know how it\'s used, where it\'s stored and who can access it. If your data is stolen or misused, it can cause you problems.',
    question: 'Do you know how your personal data is used? Have you read the privacy notice? Can you ask for it to be deleted?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14 & Art. 17',
      requirement: 'You have the right to know how your data is used and to request deletion',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Always read the privacy notice before sharing data. Only use services that allow you to control and delete your data.',
    risk: 'If you share data without knowing how it\'s used, it could be sold, misused or end up in the wrong hands.',
    example: 'If you share your name and email with ChatGPT without reading the privacy policy, that data can be used by OpenAI to improve the system or shared with third parties.',
    whatYouCanDo: [
      'Always read the privacy notice before sharing personal data',
      'Ask the service provider to delete your data if you no longer want to use it',
      'Only use services that allow you to control your data',
      'Don\'t share more data than necessary: always evaluate if it\'s really necessary'
    ],
    redFlags: [
      'You haven\'t read the privacy notice before sharing data',
      'The service doesn\'t allow you to delete your data',
      'You don\'t know who can access your data',
      'The privacy notice is unclear or too technical'
    ],
  },
  'Dati di Lavoro': {
    simpleExplanation: 'Work data (business documents, customer information, etc.) is often confidential. When you share it with an AI system, you\'re potentially violating confidentiality. You must verify with your company if it\'s allowed. Work data often ends up on US servers, where it may be accessible to others.',
    question: 'Does your company allow you to share work data with AI systems? Have you checked company policies?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32 & Art. 28',
      requirement: 'Business data must be protected. Sharing with providers requires specific agreements',
      url: 'https://gdpr-info.eu/art-28-gdpr/'
    },
    bestPractice: 'Verify with your boss or company IT if you can use AI systems for work data. Only use company-approved tools.',
    risk: 'Sharing work data with unauthorized AI systems can violate confidentiality and cause legal problems.',
    example: 'If you share a document with customer information with ChatGPT, you\'re potentially violating data confidentiality.',
    whatYouCanDo: [
      'Always verify with your company if it\'s allowed to use AI systems for work data',
      'Only use tools approved by the company',
      'Don\'t share confidential data without authorization',
      'Read company policies on privacy and data security'
    ],
    redFlags: [
      'You share work data with AI systems without authorization',
      'You don\'t know if your company allows AI use for confidential data',
      'You use public AI tools for company documents without verifying',
      'You haven\'t read company privacy policies'
    ],
  },
  'Rischio Discriminazione': {
    simpleExplanation: 'The system might treat different groups of people differently, even unintentionally. This is discrimination. You must test the system to ensure it works fairly for everyone. Like a test: it must be fair for all, not just some.',
    question: 'Have you tested if the system discriminates against certain groups?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Systems must avoid discrimination',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Test with diverse groups. Monitor for discrimination. Regular audits. Correct if discrimination is found.',
    risk: 'Unchecked discrimination can cause legal violations, harm to individuals, loss of trust.',
    example: 'A CV screening system that automatically rejects candidates with foreign names discriminates unfairly. A loan system that more often rejects people from certain ethnic groups is discriminatory.',
    whatYouCanDo: [
      'If you think you\'ve been discriminated against, ask the provider for explanations',
      'Contact the DPO (Data Protection Officer) of the organization',
      'You can contact the data protection authority (in Italy: Garante Privacy)',
      'Document situations where you think you\'ve been discriminated against'
    ],
    redFlags: [
      'The system seems to treat certain groups of people differently',
      'You don\'t get explanations when you ask why you were rejected/excluded',
      'You\'ve noticed discrimination patterns (e.g. always rejected for loans)',
      'The system doesn\'t monitor or verify for bias'
    ],
  },
  'Sostituzione Lavoro Umano': {
    simpleExplanation: 'If the system replaces people in work, assess how many jobs are at risk. And create a plan: worker retraining, gradual transition, support. Don\'t just fire everyone. People have the right to be helped to find a new job or learn new skills.',
    question: 'How many jobs are at risk? Do you have a transition plan?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 60',
      requirement: 'Document social and economic impacts',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Assess impact on jobs. Plan retraining, gradual transition, support for affected workers.',
    risk: 'Job replacement without transition can cause unemployment, social tensions, opposition to the system.',
  },
  'Tabella Scoring': {
    simpleExplanation: 'How is the score calculated? What counts more? What counts less? It must be explained clearly. And the person must be able to contest: "Why do I have this score? What can I do to improve it?". Like when you ask for explanations on a school grade.',
    question: 'If the system gives you a score, do you understand how it was calculated? What counts more? Can you contest it if it seems wrong?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'Right to contest and explanation of automated decisions',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Explain scoring criteria. Allow access to data used. Provide contestation mechanism. Human review available.',
    risk: 'Opaque scoring can hide bias or errors. Without contestation, errors cannot be corrected.',
  },
  'Trasparenza Decisionale': {
    simpleExplanation: 'Can you explain why the system made a certain decision? People have the right to know. You can\'t just say "it\'s the AI" and that\'s it. You must explain what factors it considered (e.g. "the score is low because you have few years of experience"). Like when you ask a teacher why you got a 6: they must explain.',
    question: 'If the system makes a decision about you, does it explain it? Do you understand why it decided that way or do they just tell you "it\'s the AI"?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 13',
      requirement: 'High-risk systems must be transparent and explainable',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Provide understandable explanations of decisions. Show main factors. Allow contestation.',
    risk: 'Opaque decisions undermine trust, make it difficult to contest errors, can hide bias.',
  },
};

/**
 * Translate note knowledge from Italian to English
 * Returns English translation if available, otherwise returns null (will use Italian fallback)
 */
export function translateNoteKnowledge(
  knowledge: any,
  noteLabel: string
): any | null {
  const translation = NOTE_KNOWLEDGE_EN[noteLabel];
  if (translation) {
    return {
      ...knowledge,
      ...translation,
      regulation: translation.regulation || knowledge.regulation,
      whatYouCanDo: translation.whatYouCanDo || knowledge.whatYouCanDo,
      redFlags: translation.redFlags || knowledge.redFlags,
    };
  }
  
  // No translation available, return null to use Italian fallback
  return null;
}

