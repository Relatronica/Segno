import type { TimelineSpec } from '@/lib/trasparenza/spec';

/**
 * La seconda timeline: la cybersicurezza.
 *
 * Non c'è IA in questo file. Le corsie sono le fasi di un incidente — la falla,
 * l'attacco, l'attore, la difesa, la regola — e le forme degli eventi restano le
 * sei che il motore sa disegnare (`EVENT_META`). Ciò che cambia è a quale corsia
 * appartiene un pin, e questo è dato: cambia lo spec, non `components/`.
 */

export const cybersecuritySpec: TimelineSpec = {
  track: {
    id: 'cybersecurity',
    slug: 'cybersecurity',
    name: { it: 'Cybersicurezza', en: 'Cybersecurity' },
    shortName: 'Cyber',
    period: { it: '2016 — oggi', en: '2016 — today' },
    intro: {
      it: 'Le tappe della cybersicurezza lette per fasi: la vulnerabilità, l’attacco, l’attore, la difesa e la regola. Ogni segno è un fatto con la sua fonte.',
      en: 'Cybersecurity milestones read by phase: the flaw, the attack, the actor, the defence and the rule. Every mark is a fact with its source.',
    },
    disclaimer: {
      it: 'Solo fatti con fonte primaria e link stabile (agenzie, autorità, registri CVE, EUR-Lex). L’attribuzione di un attacco è quella ufficiale dell’autorità che la firma: la vicinanza temporale non dimostra causalità.',
      en: 'Only facts with a primary source and a stable link (agencies, authorities, CVE records, EUR-Lex). An attack’s attribution is the official one of the authority that signs it: temporal proximity does not prove causation.',
    },
    filterTypes: ['milestone', 'legislative', 'sanction', 'meeting', 'spending', 'statement'],
    peopleIds: [],
    showSentiment: false,
  },

  /** Ordine di lettura, dall’alto in basso: dalla falla alla regola. */
  lenses: [
    {
      key: 'vulnerabilita',
      label: { it: 'Vulnerabilità', en: 'Vulnerabilities' },
      blurb: {
        it: 'Le falle sfruttabili: difetti di prodotto e di filiera resi pubblici con un CVE.',
        en: 'Exploitable flaws: product and supply-chain defects disclosed with a CVE.',
      },
      color: '#d97706',
    },
    {
      key: 'attacchi',
      label: { it: 'Attacchi', en: 'Attacks' },
      blurb: {
        it: 'Gli incidenti su larga scala: ransomware, spionaggio e sabotaggio, con la loro attribuzione ufficiale.',
        en: 'Large-scale incidents: ransomware, espionage and sabotage, with their official attribution.',
      },
      color: '#b3382c',
    },
    {
      key: 'attori',
      label: { it: 'Attori', en: 'Actors' },
      blurb: {
        it: 'I gruppi dietro gli attacchi, quando un’autorità li nomina: sanzioni, incriminazioni, attribuzioni.',
        en: 'The groups behind the attacks, once an authority names them: sanctions, indictments, attributions.',
      },
      color: '#7c3aed',
    },
    {
      key: 'difese',
      label: { it: 'Difese', en: 'Defences' },
      blurb: {
        it: 'Le risposte: cataloghi di vulnerabilità sfruttate, operazioni congiunte, smantellamenti.',
        en: 'The responses: exploited-vulnerability catalogs, joint operations, takedowns.',
      },
      color: '#0f9d8f',
    },
    {
      key: 'politica',
      label: { it: 'Politica', en: 'Policy' },
      blurb: {
        it: 'Le regole del gioco: direttive, regolamenti e gli obblighi che ne discendono.',
        en: 'The rules of the game: directives, regulations and the duties that follow.',
      },
      color: '#3b6fe0',
    },
  ],

  eventTypes: ['milestone', 'legislative', 'sanction', 'meeting', 'spending', 'statement'].map(
    (key) => ({ key }),
  ),

  /** Nessuna curva di tono: questa timeline legge fatti, non dichiarazioni. */
  sentimentTags: [],

  actors: [
    { id: 'cisa', name: 'Cybersecurity and Infrastructure Security Agency', shortName: 'CISA', color: '#1d4ed8' },
    { id: 'fbi', name: 'Federal Bureau of Investigation', shortName: 'FBI', color: '#1e3a8a' },
    { id: 'europol', name: 'Europol', shortName: 'Europol', color: '#0f766e' },
    { id: 'ncsc', name: 'UK National Cyber Security Centre', shortName: 'NCSC', color: '#334155' },
    { id: 'nca', name: 'UK National Crime Agency', shortName: 'NCA', color: '#475569' },
    { id: 'doj', name: 'US Department of Justice', shortName: 'DOJ', color: '#7c2d12' },
    { id: 'ofac', name: 'US Treasury — OFAC', shortName: 'OFAC', color: '#0f766e' },
    { id: 'eu', name: 'Unione europea', shortName: 'UE', color: '#3b6fe0' },
    { id: 'microsoft', name: 'Microsoft', shortName: 'Microsoft', color: '#00a4ef' },
    { id: 'projectzero', name: 'Google Project Zero', shortName: 'Project Zero', color: '#4285f4' },
    { id: 'lazarus', name: 'Lazarus Group', shortName: 'Lazarus', color: '#991b1b' },
    { id: 'apt41', name: 'APT41', shortName: 'APT41', color: '#7c2d12' },
    { id: 'sandworm', name: 'Sandworm', shortName: 'Sandworm', color: '#581c87' },
    { id: 'lockbit', name: 'LockBit', shortName: 'LockBit', color: '#831843' },
    { id: 'cl0p', name: 'Cl0p', shortName: 'Cl0p', color: '#7f1d1d' },
    { id: 'darkside', name: 'DarkSide', shortName: 'DarkSide', color: '#7f1d1d' },
    { id: 'safepay', name: 'SafePay', shortName: 'SafePay', color: '#9f1239' },
    {
      id: 'integritytech',
      name: 'Integrity Technology Group',
      shortName: 'Integrity Tech',
      color: '#b45309',
    },
  ],

  /** Nessuna figura pubblica tracciata: i pin parlano di fatti, non di persone. */
  people: [],

  /** Nessuna tesi: senza citazioni verificate non ci sono letture da registrare. */
  theses: [],

  bands: [{ kind: 'volume' }],

  /** Ogni pin dichiara la sua corsia; il ripiego copre le forme, per sicurezza. */
  lensFallback: {
    byEventType: { legislative: 'politica', sanction: 'attori' },
    default: 'attacchi',
  },
};
