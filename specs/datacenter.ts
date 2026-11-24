import type { TimelineSpec } from '@/lib/trasparenza/spec';

/**
 * La terza timeline: i data center in Italia.
 *
 * Non c'è IA né cybersicurezza in questo file. Le corsie sono le dimensioni
 * della vicenda — dall'infrastruttura fisica (energia, rete) alla percezione
 * pubblica — e le forme degli eventi restano le sei che il motore sa disegnare
 * (`EVENT_META`). Ciò che cambia è a quale corsia appartiene un pin, e questo
 * è dato: cambia lo spec, non `components/`.
 *
 * Tesi attive, nessuna curva di tono: le posizioni si leggono per claim, non
 * per umore. I ticker di mercato tracciano gli operatori quotati, non le big
 * tech (quelle stanno nella timeline dell'IA).
 */

export const datacenterSpec: TimelineSpec = {
  track: {
    id: 'datacenter',
    slug: 'datacenter',
    name: { it: 'Data center Italia', en: 'Data Centers Italy' },
    shortName: 'Data Center',
    period: { it: '2024 — oggi', en: '2024 — today' },
    intro: {
      it: 'La corsa ai data center in Italia letta su sette assi: energia, regolazione, territorio, politica, mercato, ambiente, opinione pubblica. Ogni segno è un fatto con la sua fonte.',
      en: 'The data centre race in Italy read along seven axes: energy, regulation, territory, politics, market, environment, public opinion. Every mark is a fact with its source.',
    },
    disclaimer: {
      it: 'Solo fatti con fonte primaria e link stabile (Gazzetta Ufficiale, ARERA, Terna, atti parlamentari, testate verificabili). Le dichiarazioni riportano una citazione verificabile. La vicinanza temporale non dimostra causalità.',
      en: 'Only facts with a primary source and stable link (Official Gazette, ARERA, Terna, parliamentary records, verifiable outlets). Statements include a verifiable quote. Temporal proximity does not prove causation.',
    },
    filterTypes: ['legislative', 'milestone', 'statement', 'meeting', 'spending', 'sanction'],
    peopleIds: [],
    showSentiment: false,
  },

  /** Ordine di lettura, dall'alto in basso: dalla risorsa fisica alla percezione. */
  lenses: [
    {
      key: 'energia',
      label: { it: 'Energia e rete', en: 'Energy & grid' },
      blurb: {
        it: 'Richieste a Terna, connessioni alla rete, piani di sviluppo, consumi stimati e reali.',
        en: 'Grid connection requests, Terna development plans, estimated and actual power consumption.',
      },
      color: '#f59e0b',
    },
    {
      key: 'regolazione',
      label: { it: 'Regolazione', en: 'Regulation' },
      blurb: {
        it: 'Decreti, DDL, leggi regionali, circolari ministeriali, delibere ARERA e ACN.',
        en: 'Decrees, bills, regional laws, ministerial circulars, ARERA and ACN resolutions.',
      },
      color: '#b3382c',
    },
    {
      key: 'territorio',
      label: { it: 'Territorio', en: 'Territory' },
      blurb: {
        it: 'Comitati, ricorsi, moratorie, accessi agli atti, manifestazioni.',
        en: 'Committees, appeals, moratoria, freedom-of-information requests, protests.',
      },
      color: '#16a34a',
    },
    {
      key: 'politica',
      label: { it: 'Politica', en: 'Politics' },
      blurb: {
        it: 'Interrogazioni parlamentari, audizioni, posizioni dei partiti — trasversali, non lineari.',
        en: 'Parliamentary questions, hearings, party positions — cross-cutting, not linear.',
      },
      color: '#7c3aed',
    },
    {
      key: 'mercato',
      label: { it: 'Mercato', en: 'Market' },
      blurb: {
        it: 'Annunci di nuovi progetti, fondi, operatori, stime (es. 83 progetti nel 2026-28 per 25,4 mld).',
        en: 'New project announcements, funding, operators, estimates (e.g. 83 projects in 2026-28 for €25.4bn).',
      },
      color: '#0f9d8f',
    },
    {
      key: 'ambiente',
      label: { it: 'Ambiente', en: 'Environment' },
      blurb: {
        it: 'Consumo di suolo, acqua, calore residuo, generatori diesel di emergenza.',
        en: 'Land use, water consumption, waste heat, emergency diesel generators.',
      },
      color: '#059669',
    },
    {
      key: 'opinione',
      label: { it: 'Opinione pubblica', en: 'Public opinion' },
      blurb: {
        it: 'Sondaggi, copertura mediatica, percezione nei social e nei territori.',
        en: 'Polls, media coverage, perception on social media and in local communities.',
      },
      color: '#6366f1',
    },
  ],

  eventTypes: ['legislative', 'milestone', 'statement', 'meeting', 'spending', 'sanction'].map(
    (key) => ({ key }),
  ),

  /** Nessuna curva di tono: si leggono le tesi, non l'umore. */
  sentimentTags: [],

  actors: [
    // Operatori / investitori
    { id: 'microsoft', name: 'Microsoft', shortName: 'Microsoft', color: '#00a4ef' },
    { id: 'google', name: 'Google', shortName: 'Google', color: '#4285f4' },
    { id: 'meta', name: 'Meta', shortName: 'Meta', color: '#0668e1' },
    { id: 'amazon', name: 'Amazon Web Services', shortName: 'AWS', color: '#ff9900' },
    { id: 'equinix', name: 'Equinix', shortName: 'Equinix', color: '#ed1c24' },
    { id: 'aruba', name: 'Aruba S.p.A.', shortName: 'Aruba', color: '#ff6600' },
    { id: 'stack-infra', name: 'Stack Infrastructure', shortName: 'Stack', color: '#1a1a2e' },
    { id: 'vantage', name: 'Vantage Data Centers', shortName: 'Vantage', color: '#00263a' },
    { id: 'qts', name: 'QTS Data Centers', shortName: 'QTS', color: '#0070c0' },
    { id: 'colt', name: 'Colt Data Centre Services', shortName: 'Colt DCS', color: '#e4002b' },
    { id: 'irideos', name: 'Irideos', shortName: 'Irideos', color: '#00205b' },
    { id: 'retelit', name: 'Retelit', shortName: 'Retelit', color: '#003366' },
    { id: 'cdp', name: 'Cassa Depositi e Prestiti', shortName: 'CDP', color: '#004c97' },
    // Istituzionali
    { id: 'terna', name: 'Terna', shortName: 'Terna', color: '#004d40' },
    { id: 'arera', name: 'ARERA', shortName: 'ARERA', color: '#1565c0' },
    { id: 'acn', name: 'Agenzia per la Cybersicurezza Nazionale', shortName: 'ACN', color: '#1a237e' },
    { id: 'mase', name: 'Ministero dell\'Ambiente', shortName: 'MASE', color: '#2e7d32' },
    { id: 'regione-lombardia', name: 'Regione Lombardia', shortName: 'Lombardia', color: '#00796b' },
    { id: 'regione-piemonte', name: 'Regione Piemonte', shortName: 'Piemonte', color: '#5d4037' },
    { id: 'regione-lazio', name: 'Regione Lazio', shortName: 'Lazio', color: '#c62828' },
    { id: 'comune-milano', name: 'Comune di Milano', shortName: 'Milano', color: '#d32f2f' },
    { id: 'comune-cornaredo', name: 'Comune di Cornaredo', shortName: 'Cornaredo', color: '#616161' },
    { id: 'comune-bresso', name: 'Comune di Bresso', shortName: 'Bresso', color: '#757575' },
    { id: 'politecnico', name: 'Politecnico di Milano', shortName: 'PoliMi', color: '#003865' },
  ],

  /** Nessuna persona tracciata per ora: i pin sono fatti e atti, non voci. */
  people: [],

  /**
   * Le tesi: le domande a cui le dichiarazioni rispondono. Aperte, da
   * popolare man mano che i pin con quote verificate entrano.
   */
  theses: [
    {
      id: 'hub-dc-italia',
      slug: 'hub-dc-italia',
      label: { it: 'Hub europeo', en: 'European hub' },
      claim: {
        it: 'L\'Italia deve diventare un polo europeo per i data center.',
        en: 'Italy should become a European hub for data centres.',
      },
      definition: {
        it: 'Supporta: vede i data center come opportunità strategica. Contrario: ritiene che i costi superino i benefici. Condizionato: sì, ma con vincoli.',
        en: 'Support: sees data centres as a strategic opportunity. Oppose: considers costs outweigh benefits. Conditional: yes, but with constraints.',
      },
      status: 'open',
      since: '2024-01-01',
    },
    {
      id: 'suolo-vs-sviluppo',
      slug: 'suolo-vs-sviluppo',
      label: { it: 'Suolo e sviluppo', en: 'Land vs. development' },
      claim: {
        it: 'Il consumo di suolo agricolo per i data center è accettabile se compensato.',
        en: 'Agricultural land consumption for data centres is acceptable if offset.',
      },
      definition: {
        it: 'Supporta: la compensazione basta. Contrario: nessuna compensazione giustifica il consumo. Condizionato: dipende da dove e come.',
        en: 'Support: offsets are enough. Oppose: no offset justifies the consumption. Conditional: depends on where and how.',
      },
      status: 'open',
      since: '2025-01-01',
    },
    {
      id: 'rete-adeguata',
      slug: 'rete-adeguata',
      label: { it: 'Rete elettrica', en: 'Power grid' },
      claim: {
        it: 'La rete elettrica italiana è in grado di reggere la domanda dei data center.',
        en: 'The Italian power grid can handle data centre demand.',
      },
      definition: {
        it: 'Supporta: con gli investimenti pianificati, sì. Contrario: la rete è già al limite. Condizionato: serve un piano straordinario.',
        en: 'Support: with planned investments, yes. Oppose: the grid is already at capacity. Conditional: an extraordinary plan is needed.',
      },
      status: 'open',
      since: '2025-01-01',
    },
    {
      id: 'acqua-sostenibile',
      slug: 'acqua-sostenibile',
      label: { it: 'Acqua', en: 'Water' },
      claim: {
        it: 'Il raffreddamento a acqua dei data center è sostenibile con le risorse idriche italiane.',
        en: 'Water cooling for data centres is sustainable with Italian water resources.',
      },
      definition: {
        it: 'Supporta: le tecniche moderne consumano poco. Contrario: ogni prelievo peggiora la crisi idrica. Condizionato: solo dove c\'è abbondanza.',
        en: 'Support: modern techniques use little. Oppose: every draw worsens the water crisis. Conditional: only where supply is abundant.',
      },
      status: 'open',
      since: '2025-06-01',
    },
  ],

  bands: [
    { kind: 'volume' },
    {
      kind: 'series',
      id: 'market',
      provider: 'yahoo',
      tickers: ['EQIX', 'DLR', 'QTS'],
    },
  ],

  /** Nessuna corsia dove l'attore è la storia: i pin sono fatti, non rilasci. */
  lensMarks: [],

  /** Nessun segno fisso di corsia. */
  lensGlyphs: {},

  /** Ogni pin dichiara la sua corsia; il ripiego copre le forme, per sicurezza. */
  lensFallback: {
    byEventType: { legislative: 'regolazione', spending: 'mercato', statement: 'politica' },
    default: 'energia',
  },
};

