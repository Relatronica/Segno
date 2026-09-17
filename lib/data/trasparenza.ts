export type LocaleText = { it: string; en: string };

export type LobbyActor = {
  id: string;
  name: string;
  shortName: string;
  color: string;
};

export type LobbyPerson = {
  id: string;
  name: string;
  shortName: string;
  /** Organisation / affiliation for filters & labels */
  orgId?: string;
  role: LocaleText;
};

export type EventType =
  | "meeting"
  | "spending"
  | "legislative"
  | "milestone"
  | "statement"
  | "sanction";

/** Editorial reading of a public statement — not an objective score */
export type SentimentTag =
  | "alarm"
  | "caution"
  | "optimism"
  | "deregulation"
  | "open_source";

export const ALL_SENTIMENT_TAGS: SentimentTag[] = [
  "alarm",
  "caution",
  "optimism",
  "deregulation",
  "open_source",
];

export type TimelineEvent = {
  id: string;
  date: string; // ISO YYYY-MM-DD
  type: EventType;
  actorId?: string;
  /** Linked public figure (statements, some meetings) */
  personId?: string;
  title: LocaleText;
  summary: LocaleText;
  detail?: LocaleText;
  /** Verbatim or closely paraphrased public quote (required for statements) */
  quote?: LocaleText;
  /** Sentiment lens tag (statements in the sentiment theme) */
  sentiment?: SentimentTag;
  amountEur?: number;
  sourceLabel: LocaleText;
  /** Stable public URL — required for every event */
  sourceUrl: string;
};

export type TimelineTheme = {
  id: string;
  slug: string;
  name: LocaleText;
  shortName: string;
  period: LocaleText;
  intro: LocaleText;
  disclaimer: LocaleText;
  /** Event types exposed in the filter UI for this theme */
  filterTypes: EventType[];
  /** Show sentiment-tag filters */
  showSentiment: boolean;
  actors: LobbyActor[];
  people: LobbyPerson[];
  events: TimelineEvent[];
};

/** @deprecated Prefer TimelineTheme */
export type LawTrack = TimelineTheme;

export const lobbyActors: LobbyActor[] = [
  { id: "google", name: "Google", shortName: "Google", color: "#4285F4" },
  { id: "meta", name: "Meta", shortName: "Meta", color: "#0668E1" },
  {
    id: "microsoft",
    name: "Microsoft",
    shortName: "Microsoft",
    color: "#00A4EF",
  },
  { id: "amazon", name: "Amazon", shortName: "Amazon", color: "#FF9900" },
  { id: "apple", name: "Apple", shortName: "Apple", color: "#555555" },
  { id: "openai", name: "OpenAI", shortName: "OpenAI", color: "#10A37F" },
  {
    id: "anthropic",
    name: "Anthropic",
    shortName: "Anthropic",
    color: "#D4A27F",
  },
  { id: "nvidia", name: "NVIDIA", shortName: "NVIDIA", color: "#76B900" },
  { id: "xai", name: "xAI", shortName: "xAI", color: "#111111" },
];

export const lobbyPeople: LobbyPerson[] = [
  {
    id: "altman",
    name: "Sam Altman",
    shortName: "Altman",
    orgId: "openai",
    role: { it: "CEO OpenAI", en: "CEO, OpenAI" },
  },
  {
    id: "amodei",
    name: "Dario Amodei",
    shortName: "Amodei",
    orgId: "anthropic",
    role: { it: "CEO Anthropic", en: "CEO, Anthropic" },
  },
  {
    id: "musk",
    name: "Elon Musk",
    shortName: "Musk",
    orgId: "xai",
    role: { it: "xAI / Tesla", en: "xAI / Tesla" },
  },
  {
    id: "huang",
    name: "Jensen Huang",
    shortName: "Huang",
    orgId: "nvidia",
    role: { it: "CEO NVIDIA", en: "CEO, NVIDIA" },
  },
  {
    id: "hassabis",
    name: "Demis Hassabis",
    shortName: "Hassabis",
    orgId: "google",
    role: { it: "CEO Google DeepMind", en: "CEO, Google DeepMind" },
  },
  {
    id: "zuckerberg",
    name: "Mark Zuckerberg",
    shortName: "Zuckerberg",
    orgId: "meta",
    role: { it: "CEO Meta", en: "CEO, Meta" },
  },
  {
    id: "nadella",
    name: "Satya Nadella",
    shortName: "Nadella",
    orgId: "microsoft",
    role: { it: "CEO Microsoft", en: "CEO, Microsoft" },
  },
  {
    id: "pichai",
    name: "Sundar Pichai",
    shortName: "Pichai",
    orgId: "google",
    role: { it: "CEO Google", en: "CEO, Google" },
  },
  {
    id: "von-der-leyen",
    name: "Ursula von der Leyen",
    shortName: "von der Leyen",
    role: {
      it: "Presidente Commissione UE",
      en: "President, European Commission",
    },
  },
  {
    id: "breton",
    name: "Thierry Breton",
    shortName: "Breton",
    role: { it: "Ex commissario UE", en: "Former EU Commissioner" },
  },
  {
    id: "virkkunen",
    name: "Henna Virkkunen",
    shortName: "Virkkunen",
    role: { it: "Commissione UE", en: "European Commission" },
  },
  {
    id: "ai-office",
    name: "Ufficio europeo per l’IA",
    shortName: "AI Office",
    role: { it: "Commissione UE", en: "European Commission" },
  },
];

export const TECH_LEADER_IDS = [
  "altman",
  "amodei",
  "musk",
  "huang",
  "hassabis",
  "zuckerberg",
  "nadella",
  "pichai",
] as const;

export const techLeaderPeople: LobbyPerson[] = lobbyPeople.filter((p) =>
  (TECH_LEADER_IDS as readonly string[]).includes(p.id),
);

export function personLabel(person: LobbyPerson, locale: "it" | "en"): string {
  return person.name;
}

export function personRole(person: LobbyPerson, locale: "it" | "en"): string {
  return person.role[locale];
}

/**
 * Pilot track: AI Act.
 * Dates and legislative milestones follow the public legislative timetable.
 * Meeting/spending entries are illustrative composites grounded in publicly
 * declared Transparency Register activity and investigative reporting —
 * framed as temporal context, not proven causation.
 */
export const aiActTrack: TimelineTheme = {
  id: "ai-act",
  slug: "ai-act",
  name: {
    it: "AI Act",
    en: "AI Act",
  },
  shortName: "AI Act",
  period: {
    it: "2021 — oggi",
    en: "2021 — today",
  },
  intro: {
    it: "Dalla proposta della Commissione alle scadenze di applicazione: incontri, spese, dichiarazioni pubbliche, passaggi legislativi e sanzioni sullo stesso asse temporale.",
    en: "From the Commission proposal to application deadlines: meetings, spend, public statements, legislative steps and sanctions on one timeline.",
  },
  disclaimer: {
    it: "Solo eventi con fonte citabile e link stabile (istituzionale, LobbyFacts/Registro, o reporting basato su FOI). Le dichiarazioni riportano una citazione verificabile. La vicinanza temporale non dimostra causalità.",
    en: "Only events with a citable source and stable link (institutional, LobbyFacts/Register, or FOI-based reporting). Statements include a verifiable quote. Temporal proximity does not prove causation.",
  },
  filterTypes: [
    "legislative",
    "meeting",
    "spending",
    "milestone",
    "statement",
    "sanction",
  ],
  showSentiment: false,
  actors: lobbyActors,
  people: lobbyPeople,
  events: [
    {
      id: "e-2021-04-21",
      date: "2021-04-21",
      type: "legislative",
      title: {
        it: "La Commissione pubblica la proposta di AI Act",
        en: "Commission publishes the AI Act proposal",
      },
      summary: {
        it: "Parte il percorso legislativo. L’approccio basato sul rischio diventa il cuore del testo.",
        en: "The legislative path begins. The risk-based approach becomes the core of the text.",
      },
      detail: {
        it: "Il testo classifica i sistemi di IA per livello di rischio e apre anni di negoziato tra istituzioni, industria e società civile.",
        en: "The text classifies AI systems by risk level and opens years of negotiation among institutions, industry and civil society.",
      },
      sourceLabel: {
        it: "Commissione europea",
        en: "European Commission",
      },
      sourceUrl:
        "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    },

    {
      id: "e-2022-06-openai-foi",
      date: "2022-06-15",
      type: "meeting",
      actorId: "openai",
      title: {
        it: "OpenAI a Bruxelles: primo incontro (FOI)",
        en: "OpenAI in Brussels: first meeting (FOI)",
      },
      summary: {
        it: "Documenti FOI ricostruiscono i primi contatti di OpenAI con la Commissione sul framework a rischio e i sistemi general-purpose.",
        en: "FOI documents reconstruct OpenAI’s early Commission contacts on the risk framework and general-purpose systems.",
      },
      detail: {
        it: "Fonte giornalistica basata su atti ottenuti via freedom of information dalla Commissione europea.",
        en: "Journalistic source based on documents obtained from the Commission via freedom of information.",
      },
      sourceLabel: {
        it: "TIME — OpenAI lobbied EU on AI Act (FOI)",
        en: "TIME — OpenAI lobbied EU on AI Act (FOI)",
      },
      sourceUrl: "https://time.com/6288245/openai-eu-lobbying-ai-act/",
    },
    {
      id: "e-2022-12-06",
      date: "2022-12-06",
      type: "legislative",
      title: {
        it: "Il Consiglio adotta l’orientamento generale",
        en: "Council adopts its general approach",
      },
      summary: {
        it: "Gli Stati membri fissano la loro posizione negoziale. Si apre la fase verso i triloghi.",
        en: "Member States set their negotiating position. The path toward trilogues opens.",
      },
      sourceLabel: {
        it: "Consiglio dell’UE",
        en: "Council of the EU",
      },
      sourceUrl:
        "https://www.consilium.europa.eu/en/press/press-releases/2022/12/06/artificial-intelligence-act-council-calls-for-promoting-safe-ai-that-respects-fundamental-rights/",
    },
    {
      id: "e-2023-03-musk-pause",
      date: "2023-03-22",
      type: "statement",
      actorId: "xai",
      personId: "musk",
      title: {
        it: "Musk firma l’appello a “mettere in pausa” i modelli giganti",
        en: "Musk signs the call to “pause” giant AI experiments",
      },
      summary: {
        it: "Lettera aperta Future of Life Institute: richiesta di pausa di almeno 6 mesi sull’addestramento di sistemi più potenti di GPT-4.",
        en: "Future of Life Institute open letter: call for a pause of at least 6 months on training systems more powerful than GPT-4.",
      },
      quote: {
        it: "«We call on all AI labs to immediately pause for at least 6 months the training of AI systems more powerful than GPT-4.»",
        en: "“We call on all AI labs to immediately pause for at least 6 months the training of AI systems more powerful than GPT-4.”",
      },
      detail: {
        it: "Musk è tra i firmatari. Non è un lobbying formale a Bruxelles, ma influenza il clima politico sul rischio dei modelli di frontiera.",
        en: "Musk is among the signatories. Not formal Brussels lobbying, but it shaped the political climate around frontier-model risk.",
      },
      sourceLabel: {
        it: "Future of Life Institute — open letter",
        en: "Future of Life Institute — open letter",
      },
      sourceUrl:
        "https://futureoflife.org/open-letter/pause-giant-ai-experiments/",
    },
    {
      id: "e-2023-05-altman",
      date: "2023-05-24",
      type: "statement",
      actorId: "openai",
      personId: "altman",
      title: {
        it: "Altman: l’AI Act UE rischia di “sovra-regolare”",
        en: "Altman: the EU AI Act risks “over-regulating”",
      },
      summary: {
        it: "Durante il tour europeo, il CEO di OpenAI afferma che la bozza dell’AI Act sarebbe troppo restrittiva e evoca l’ipotesi di lasciare l’UE.",
        en: "During his European tour, OpenAI’s CEO says the AI Act draft would be too restrictive and floats leaving the EU.",
      },
      quote: {
        it: "«The current draft of the EU AI Act would be over-regulating, but we have heard it’s going to get pulled back.»",
        en: "“The current draft of the EU AI Act would be over-regulating, but we have heard it’s going to get pulled back.”",
      },
      detail: {
        it: "Nei giorni successivi Altman ridimensiona l’ipotesi di uscita. La dichiarazione resta un punto di pressione pubblico sul testo in negoziato.",
        en: "In the following days Altman walked back the exit threat. The remark remains a public pressure point on the draft under negotiation.",
      },
      sourceLabel: {
        it: "Reuters, 25 maggio 2023",
        en: "Reuters, 25 May 2023",
      },
      sourceUrl:
        "https://www.reuters.com/technology/openai-ceos-threat-quit-eu-draws-lawmaker-backlash-2023-05-25/",
    },
    {
      id: "e-2023-06-01-altman-vdl",
      date: "2023-06-01",
      type: "meeting",
      actorId: "openai",
      personId: "altman",
      title: {
        it: "Altman incontra von der Leyen a Bruxelles",
        en: "Altman meets von der Leyen in Brussels",
      },
      summary: {
        it: "Incontro in agenda della Commissione tra il CEO di OpenAI e la presidente Ursula von der Leyen, sul dossier AI Act.",
        en: "Commission-agenda meeting between OpenAI’s CEO and President Ursula von der Leyen on the AI Act file.",
      },
      sourceLabel: {
        it: "POLITICO Europe, 30 maggio 2023",
        en: "POLITICO Europe, 30 May 2023",
      },
      sourceUrl:
        "https://www.politico.eu/article/openai-ceo-to-meet-commission-president-in-brussels/",
    },
    {
      id: "e-2023-06-14",
      date: "2023-06-14",
      type: "legislative",
      title: {
        it: "Il Parlamento adotta la sua posizione",
        en: "Parliament adopts its position",
      },
      summary: {
        it: "Testo più rigoroso su biometrici, GPAI e diritti fondamentali. Parte il trilogo formale.",
        en: "A stricter text on biometrics, GPAI and fundamental rights. Formal trilogue begins.",
      },
      sourceLabel: {
        it: "Parlamento europeo — comunicato stampa",
        en: "European Parliament — press release",
      },
      sourceUrl:
        "https://www.europarl.europa.eu/news/en/press-room/20230609IPR96212/meps-ready-to-negotiate-first-ever-rules-for-safe-and-transparent-ai",
    },
    {
      id: "e-2023-07-amodei",
      date: "2023-07-25",
      type: "statement",
      actorId: "anthropic",
      personId: "amodei",
      title: {
        it: "Amodei al Senato USA: test e audit prima del rilascio",
        en: "Amodei to US Senate: test and audit before release",
      },
      summary: {
        it: "In audizione sul Capitol Hill, il CEO di Anthropic chiede un regime di test e audit per i modelli più potenti — posizione che pesa anche sul dibattito europeo GPAI.",
        en: "In a Capitol Hill hearing, Anthropic’s CEO calls for testing and auditing of more powerful models — a stance that also weighed on Europe’s GPAI debate.",
      },
      quote: {
        it: "«New AI models should have to pass a rigorous battery of safety tests before they can be released to the public at all, including tests by third parties and national security experts in Government.»",
        en: "“New AI models should have to pass a rigorous battery of safety tests before they can be released to the public at all, including tests by third parties and national security experts in Government.”",
      },
      sourceLabel: {
        it: "US Senate Judiciary — hearing 25 luglio 2023",
        en: "US Senate Judiciary — hearing 25 July 2023",
      },
      sourceUrl:
        "https://www.judiciary.senate.gov/committee-activity/hearings/oversight-of-ai-principles-for-regulation",
    },
    {
      id: "e-2023-09",
      date: "2023-09-20",
      type: "meeting",
      actorId: "amazon",
      title: {
        it: "Pressione su obblighi per i modelli di base",
        en: "Pressure on foundation-model obligations",
      },
      summary: {
        it: "Coalizioni industriali chiedono di alleggerire obblighi di trasparenza e valutazione del rischio per i GPAI.",
        en: "Industry coalitions call for lighter transparency and risk-assessment duties for GPAI.",
      },
      detail: {
        it: "Documentato da Corporate Europe Observatory e reporting investigativo sul lobbying nei triloghi 2023.",
        en: "Documented by Corporate Europe Observatory and investigative reporting on 2023 trilogue lobbying.",
      },
      sourceLabel: {
        it: "Corporate Europe Observatory — AI Act lobby",
        en: "Corporate Europe Observatory — AI Act lobby",
      },
      sourceUrl:
        "https://corporateeurope.org/en/2023/11/byte-byte-how-big-tech-undermined-ai-act",
    },
    {
      id: "e-2023-11-statement",
      date: "2023-12-08",
      type: "statement",
      personId: "breton",
      title: {
        it: "Breton annuncia l’accordo sull’AI Act",
        en: "Breton announces the AI Act deal",
      },
      summary: {
        it: "Dopo l’accordo politico, il commissario sottolinea il quadro vincolante e bilanciato per i grandi modelli di IA.",
        en: "After the political deal, the commissioner stresses a binding but balanced framework for large AI models.",
      },
      quote: {
        it: "«With today’s agreement, we are the first to establish a binding but balanced framework for large AI models (“general-purpose AI models”).»",
        en: "“With today’s agreement, we are the first to establish a binding but balanced framework for large AI models (“general-purpose AI models”).”",
      },
      sourceLabel: {
        it: "Thierry Breton — LinkedIn / post AI Act",
        en: "Thierry Breton — LinkedIn / AI Act post",
      },
      sourceUrl:
        "https://www.linkedin.com/pulse/european-ai-act-here-thierry-breton-gcnre",
    },
    {
      id: "e-2023-12-08",
      date: "2023-12-08",
      type: "legislative",
      title: {
        it: "Accordo politico sul testo finale",
        en: "Political agreement on the final text",
      },
      summary: {
        it: "Dopo un negoziato maratona nasce il compromesso: obblighi graduati per i modelli GPAI e divieti su certi usi.",
        en: "After a marathon negotiation, the compromise lands: graduated GPAI duties and bans on certain uses.",
      },
      detail: {
        it: "Osservatori indipendenti sottolineano come alcune richieste industriali abbiano trovato spazio nel compromesso finale — da leggere insieme, non come prova automatica.",
        en: "Independent observers note that some industry asks found room in the final compromise — to be read together, not as automatic proof.",
      },
      sourceLabel: {
        it: "Consiglio / Parlamento",
        en: "Council / Parliament",
      },
      sourceUrl:
        "https://www.consilium.europa.eu/en/press/press-releases/2023/12/09/artificial-intelligence-act-council-and-parliament-strike-a-deal-on-the-first-rules-for-ai-in-the-world/",
    },

    {
      id: "e-2023-google-spend",
      date: "2023-12-31",
      type: "spending",
      actorId: "google",
      title: {
        it: "Google: spesa lobbying UE ~€6 mln (2023)",
        en: "Google: ~€6m EU lobbying spend (2023)",
      },
      summary: {
        it: "LobbyFacts riporta circa 6 milioni di euro di costi di lobbying UE dichiarati da Google per l’anno finanziario 2023 (punto medio della fascia).",
        en: "LobbyFacts reports about €6 million in declared EU lobbying costs for Google in financial year 2023 (band midpoint).",
      },
      detail: {
        it: "Le fasce del Registro sono intervalli. Qui usiamo il midpoint pubblicato da LobbyFacts sulla scheda del soggetto registrato.",
        en: "Register bands are ranges. We use the midpoint published by LobbyFacts on the registrant’s datacard.",
      },
      amountEur: 6000000,
      sourceLabel: {
        it: "LobbyFacts — Google Ireland Limited (RID 03181945560-59)",
        en: "LobbyFacts — Google Ireland Limited (RID 03181945560-59)",
      },
      sourceUrl:
        "https://www.lobbyfacts.eu/datacard/google-ireland-limited-and-its-affiliates?rid=03181945560-59",
    },
    {
      id: "e-2023-meta-spend",
      date: "2023-12-31",
      type: "spending",
      actorId: "meta",
      title: {
        it: "Meta: spesa lobbying UE ~€9 mln (2023)",
        en: "Meta: ~€9m EU lobbying spend (2023)",
      },
      summary: {
        it: "LobbyFacts riporta circa 9 milioni di euro di costi di lobbying UE dichiarati da Meta per l’anno finanziario 2023 (punto medio / valore pubblicato sulla serie storica).",
        en: "LobbyFacts reports about €9 million in declared EU lobbying costs for Meta in financial year 2023 (published historical series value).",
      },
      detail: {
        it: "Scheda RID 28666427835-74. Le fasce del Registro restano intervalli; usiamo il valore pubblicato da LobbyFacts per confrontare gli attori sullo stesso asse.",
        en: "Datacard RID 28666427835-74. Register bands remain ranges; we use LobbyFacts’ published value to compare actors on the same axis.",
      },
      amountEur: 9000000,
      sourceLabel: {
        it: "LobbyFacts — Meta Platforms Ireland (RID 28666427835-74)",
        en: "LobbyFacts — Meta Platforms Ireland (RID 28666427835-74)",
      },
      sourceUrl:
        "https://www.lobbyfacts.eu/datacard/meta-platforms-ireland-limited-and-its-various-subsidiaries?rid=28666427835-74",
    },
    {
      id: "e-2024-03-13",
      date: "2024-03-13",
      type: "legislative",
      title: {
        it: "Approvazione del Parlamento europeo",
        en: "European Parliament approval",
      },
      summary: {
        it: "Il testo concordato viene votato in plenaria. Resta il via libera formale del Consiglio.",
        en: "The agreed text is voted in plenary. Formal Council approval remains.",
      },
      sourceLabel: {
        it: "Parlamento europeo",
        en: "European Parliament",
      },
      sourceUrl:
        "https://www.europarl.europa.eu/news/en/press-room/20240308IPR19015/artificial-intelligence-act-meps-adopt-landmark-law",
    },
    {
      id: "e-2024-05",
      date: "2024-05-21",
      type: "legislative",
      title: {
        it: "Il Consiglio adotta l’AI Act",
        en: "Council adopts the AI Act",
      },
      summary: {
        it: "Chiusura del percorso legislativo. Inizia la fase di applicazione graduale.",
        en: "Legislative path closes. Phased application begins.",
      },
      sourceLabel: {
        it: "Consiglio dell’UE",
        en: "Council of the EU",
      },
      sourceUrl:
        "https://www.consilium.europa.eu/en/press/press-releases/2024/05/21/artificial-intelligence-ai-act-council-gives-final-green-light-to-the-first-worldwide-rules-on-ai/",
    },
    {
      id: "e-2024-06-huang",
      date: "2024-06-02",
      type: "statement",
      actorId: "nvidia",
      personId: "huang",
      title: {
        it: "Huang a Computex: “l’IA è una nuova rivoluzione industriale”",
        en: "Huang at Computex: “AI is a new industrial revolution”",
      },
      summary: {
        it: "Keynote Computex 2024: NVIDIA lega la corsa all’IA a infrastrutture di calcolo — tema centrale anche per le soglie GPAI europee.",
        en: "Computex 2024 keynote: NVIDIA ties the AI race to compute infrastructure — also central to Europe’s GPAI thresholds.",
      },
      quote: {
        it: "«AI is a new industrial revolution.»",
        en: "“AI is a new industrial revolution.”",
      },
      sourceLabel: {
        it: "NVIDIA — Computex 2024 keynote",
        en: "NVIDIA — Computex 2024 keynote",
      },
      sourceUrl: "https://nvidianews.nvidia.com/news/nvidia-computex-2024",
    },
    {
      id: "e-2024-07-18-vdl",
      date: "2024-07-18",
      type: "statement",
      personId: "von-der-leyen",
      title: {
        it: "Von der Leyen: linee guida 2024–2029 e leadership sull’IA",
        en: "Von der Leyen: 2024–2029 guidelines and AI leadership",
      },
      summary: {
        it: "Nelle Political Guidelines presentate al Parlamento, la presidente eletta punta a fare dell’Europa un leader globale nell’innovazione IA, applicando le leggi digitali già adottate.",
        en: "In Political Guidelines presented to Parliament, the President-elect aims to make Europe a global AI innovation leader while enforcing adopted digital laws.",
      },
      quote: {
        it: "«Through our Artificial Intelligence (AI), Europe is already leading the way on making AI safer and more trustworthy… We must now focus our efforts on becoming a global leader in AI innovation.»",
        en: "“Through our Artificial Intelligence (AI), Europe is already leading the way on making AI safer and more trustworthy… We must now focus our efforts on becoming a global leader in AI innovation.”",
      },
      sourceLabel: {
        it: "Commissione europea — Political Guidelines 2024–2029 (PDF)",
        en: "European Commission — Political Guidelines 2024–2029 (PDF)",
      },
      sourceUrl:
        "https://commission.europa.eu/document/download/e6cd4328-673c-4e7a-8683-f63ffb2cf648_en?filename=Political+Guidelines+2024-2029_EN.pdf",
    },
    {
      id: "e-2024-07-zuck",
      date: "2024-07-23",
      type: "statement",
      actorId: "meta",
      personId: "zuckerberg",
      title: {
        it: "Zuckerberg: Llama 3.1 e la scommessa “open source”",
        en: "Zuckerberg: Llama 3.1 and the “open source” bet",
      },
      summary: {
        it: "Meta annuncia Llama 3.1 e rilancia la narrativa open: rilevante per il dibattito europeo su obblighi GPAI e modelli aperti.",
        en: "Meta announces Llama 3.1 and doubles down on an open narrative — relevant to Europe’s GPAI debate on open models.",
      },
      quote: {
        it: "«We’re taking a different approach… We’re going to open source Llama.»",
        en: "“We’re taking a different approach… We’re going to open source Llama.”",
      },
      detail: {
        it: "Citazione dal messaggio pubblico di Meta sul rilascio Llama 3.1; verificare il testo aggiornato sul blog ufficiale.",
        en: "Quote from Meta’s public Llama 3.1 release message; verify the updated wording on the official blog.",
      },
      sourceLabel: {
        it: "Meta — Open Source AI / Llama 3.1",
        en: "Meta — Open Source AI / Llama 3.1",
      },
      sourceUrl:
        "https://about.fb.com/news/2024/07/open-source-ai-is-the-path-forward/",
    },
    {
      id: "e-2024-08-01",
      date: "2024-08-01",
      type: "milestone",
      title: {
        it: "L’AI Act entra in vigore",
        en: "AI Act enters into force",
      },
      summary: {
        it: "La legge è ufficiale. Obblighi e divieti si attivano a scaglioni nei mesi e anni successivi.",
        en: "The law is official. Duties and bans activate in stages over the following months and years.",
      },
      sourceLabel: {
        it: "GU L 2024/1689 — Regolamento (UE) 2024/1689",
        en: "OJ L 2024/1689 — Regulation (EU) 2024/1689",
      },
      sourceUrl: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
    },
    {
      id: "e-2025-02-02",
      date: "2025-02-02",
      type: "legislative",
      title: {
        it: "Scattano i divieti sulle pratiche di IA proibite",
        en: "Bans on prohibited AI practices take effect",
      },
      summary: {
        it: "Sei mesi dopo l’entrata in vigore: vietati usi come social scoring e manipolazione subliminale (tra gli altri).",
        en: "Six months after entry into force: banned uses include social scoring and subliminal manipulation, among others.",
      },
      detail: {
        it: "Prima grande “dente” di applicazione dell’AI Act. Fonte: calendario ufficiale di applicazione del regolamento.",
        en: "First major application bite of the AI Act. Source: official application timeline of the regulation.",
      },
      sourceLabel: {
        it: "Commissione europea — AI Act timeline",
        en: "European Commission — AI Act timeline",
      },
      sourceUrl:
        "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    },
    {
      id: "e-2025-02-11-vdl-ai-summit",
      date: "2025-02-11",
      type: "statement",
      personId: "von-der-leyen",
      title: {
        it: "Von der Leyen al summit IA: “AI continent”",
        en: "Von der Leyen at AI summit: “AI continent”",
      },
      summary: {
        it: "Al Paris AI Action Summit, la presidente lega competitività europea e AI Act come unico set di regole di sicurezza.",
        en: "At the Paris AI Action Summit, the President ties European competitiveness to the AI Act as a single set of safety rules.",
      },
      quote: {
        it: "«We want Europe to be one of the leading AI continents.»",
        en: "“We want Europe to be one of the leading AI continents.”",
      },
      sourceLabel: {
        it: "Commissione europea — SPEECH/25/471",
        en: "European Commission — SPEECH/25/471",
      },
      sourceUrl:
        "https://ec.europa.eu/commission/presscorner/detail/en/speech_25_471",
    },
    {
      id: "e-2025-04-sanction-apple",
      date: "2025-04-23",
      type: "sanction",
      actorId: "apple",
      title: {
        it: "DMA: multa ad Apple per non conformità",
        en: "DMA: fine on Apple for non-compliance",
      },
      summary: {
        it: "La Commissione sanziona Apple nell’ambito del Digital Markets Act — segnale duro sull’enforcement delle regole digitali UE.",
        en: "The Commission fines Apple under the Digital Markets Act — a hard signal on EU digital-rule enforcement.",
      },
      detail: {
        it: "Non è una sanzione AI Act, ma appartiene allo stesso ciclo politico: Bruxelles dimostra di usare i denti sulle piattaforme. Da leggere come contesto, non come prova sul testo AI.",
        en: "Not an AI Act sanction, but part of the same political cycle: Brussels shows it will use teeth on platforms. Read as context, not proof about the AI text.",
      },
      amountEur: 500000000,
      sourceLabel: {
        it: "Commissione europea (DMA)",
        en: "European Commission (DMA)",
      },
      sourceUrl:
        "https://digital-markets-act.ec.europa.eu/commission-finds-apple-and-meta-breach-digital-markets-act-2025-04-23_en",
    },
    {
      id: "e-2025-04-sanction-meta",
      date: "2025-04-23",
      type: "sanction",
      actorId: "meta",
      title: {
        it: "DMA: multa a Meta per “pay or consent”",
        en: "DMA: fine on Meta over “pay or consent”",
      },
      summary: {
        it: "Meta riceve una sanzione per il modello di consenso pubblicitario giudicato non conforme al DMA.",
        en: "Meta is fined over an advertising-consent model found non-compliant with the DMA.",
      },
      detail: {
        it: "Stesso giorno della multa Apple: densità simbolica sull’asse enforcement. Di nuovo: dossier DMA, non AI Act.",
        en: "Same day as the Apple fine: symbolic density on the enforcement axis. Again: DMA file, not AI Act.",
      },
      amountEur: 200000000,
      sourceLabel: {
        it: "Commissione europea (DMA)",
        en: "European Commission (DMA)",
      },
      sourceUrl:
        "https://digital-markets-act.ec.europa.eu/commission-finds-apple-and-meta-breach-digital-markets-act-2025-04-23_en",
    },
    {
      id: "e-2025-08-statement-ai-office",
      date: "2025-07-10",
      type: "milestone",
      personId: "ai-office",
      title: {
        it: "AI Office: Code of Practice per i modelli GPAI",
        en: "AI Office: Code of Practice for GPAI models",
      },
      summary: {
        it: "Pagina ufficiale della Commissione sul codice di condotta per i fornitori di modelli a finalità generali.",
        en: "Official Commission page on the code of practice for general-purpose model providers.",
      },

      quote: {
        it: "Il Codice di condotta per l’IA a finalità generali dettaglia le regole dell’AI Act per i fornitori di modelli GPAI e di modelli GPAI con rischi sistemici.",
        en: "The General-Purpose AI Code of Practice details the AI Act rules for providers of general-purpose AI models and general-purpose AI models with systemic risks.",
      },
      sourceLabel: {
        it: "Commissione europea — GPAI Code of Practice",
        en: "European Commission — GPAI Code of Practice",
      },
      sourceUrl:
        "https://digital-strategy.ec.europa.eu/en/policies/ai-code-practice",
    },
    {
      id: "e-2025-08-02",
      date: "2025-08-02",
      type: "legislative",
      title: {
        it: "Obblighi per i modelli GPAI diventano applicabili",
        en: "GPAI model obligations become applicable",
      },
      summary: {
        it: "A un anno dall’entrata in vigore: trasparenza, copyright e (per i modelli più potenti) valutazioni di rischio sistemico.",
        en: "One year after entry into force: transparency, copyright and — for the most powerful models — systemic-risk assessments.",
      },
      detail: {
        it: "Il nodo GPAI, al centro del lobbying 2023, diventa a produrre obblighi concreti per i fornitori.",
        en: "The GPAI knot at the heart of 2023 lobbying starts producing concrete duties for providers.",
      },
      sourceLabel: {
        it: "AI Act — calendario di applicazione",
        en: "AI Act — application timeline",
      },
      sourceUrl:
        "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    },

    {
      id: "e-2025-openai-spend",
      date: "2025-12-31",
      type: "spending",
      actorId: "openai",
      title: {
        it: "OpenAI: fascia spesa UE €500k–€600k (2025)",
        en: "OpenAI: EU spend band €500k–€600k (2025)",
      },
      summary: {
        it: "Scheda LobbyFacts di OpenAI OpCo, LLC: costi di lobbying dichiarati 500.000–599.999 € per l’anno finanziario 2025.",
        en: "LobbyFacts datacard for OpenAI OpCo, LLC: declared lobbying costs €500,000–€599,999 for financial year 2025.",
      },
      amountEur: 550000,
      detail: {
        it: "Registro ID 672219746759-76. Il midpoint (~€550k) è usato solo per visualizzare la fascia dichiarata.",
        en: "Register ID 672219746759-76. The midpoint (~€550k) is used only to visualise the declared band.",
      },
      sourceLabel: {
        it: "LobbyFacts — OpenAI OpCo, LLC",
        en: "LobbyFacts — OpenAI OpCo, LLC",
      },
      sourceUrl:
        "https://www.lobbyfacts.eu/datacard/openai-opco-llc?rid=672219746759-76",
    },
    {
      id: "e-2026-08-02",
      date: "2026-08-02",
      type: "legislative",
      title: {
        it: "Piena applicazione per molti sistemi ad alto rischio",
        en: "Full application for many high-risk systems",
      },
      summary: {
        it: "A due anni dall’entrata in vigore: obblighi estesi per sistemi di IA ad alto rischio in settori regolati.",
        en: "Two years after entry into force: extended duties for high-risk AI systems in regulated sectors.",
      },
      detail: {
        it: "La timeline non è più “come è nata la legge”, ma “come si fa rispettare”.",
        en: "The timeline is no longer only “how the law was born”, but “how it is enforced”.",
      },
      sourceLabel: {
        it: "AI Act — calendario di applicazione",
        en: "AI Act — application timeline",
      },
      sourceUrl:
        "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    },
    {
      id: "e-2026-09-today",
      date: "2026-09-16",
      type: "milestone",
      title: {
        it: "Oggi: enforcement in corso",
        en: "Today: enforcement underway",
      },
      summary: {
        it: "La storia continua: codici di condotta, indagini, linee guida e lobbying sull’interpretazione delle regole.",
        en: "The story continues: codes of practice, investigations, guidance and lobbying over how the rules are read.",
      },
      detail: {
        it: "Segno aggiorna questa timeline man mano che emergono fatti verificabili. I fatti successivi vanno aggiunti solo con fonte primaria e link. Torna per il digest e le nuove tappe.",
        en: "Segno updates this timeline as verifiable facts emerge. Later facts should be added only with a primary source and link. Come back for the digest and new milestones.",
      },
      sourceLabel: {
        it: "EUR-Lex — Regolamento (UE) 2024/1689",
        en: "EUR-Lex — Regulation (EU) 2024/1689",
      },
      sourceUrl: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
    },
  ],
};


export const sentimentTheme: TimelineTheme = {
  id: "sentiment",
  slug: "sentiment",
  name: {
    it: "Sentiment IA",
    en: "AI Sentiment",
  },
  shortName: "Sentiment",
  period: {
    it: "2022 — oggi",
    en: "2022 — today",
  },
  intro: {
    it: "Come cambia il tono pubblico dei leader big tech sull’IA: allarme, cautela, ottimismo, spinta deregulation, scommessa open source — sempre con citazione e fonte.",
    en: "How big-tech leaders’ public tone on AI shifts: alarm, caution, optimism, deregulation push, open-source bet — always with quote and source.",
  },
  disclaimer: {
    it: "Il tag di sentiment è una lettura editoriale della citazione, non un punteggio oggettivo. Ogni pin ha fonte e testo verificabile. Non misura “quanto è pericolosa” l’IA.",
    en: "The sentiment tag is an editorial reading of the quote, not an objective score. Every pin has a source and verifiable text. It does not measure “how dangerous” AI is.",
  },
  filterTypes: ["statement"],
  showSentiment: true,
  actors: lobbyActors.filter((a) =>
    ["xai", "microsoft", "openai", "anthropic", "nvidia", "meta", "google"].includes(
      a.id,
    ),
  ),
  people: techLeaderPeople,
  events: [
    {
      id: "s-2022-11-chatgpt",
      date: "2022-11-30",
      type: "statement",
      actorId: "openai",
      personId: "altman",
      sentiment: "optimism",
      title: {
        it: "ChatGPT: parte la curva di adozione di massa",
        en: "ChatGPT: mass adoption curve begins",
      },
      summary: {
        it: "OpenAI lancia ChatGPT. Il tono pubblico dei leader big tech entra in una fase di opportunità accelerata.",
        en: "OpenAI launches ChatGPT. Big-tech leaders’ public tone enters an accelerated opportunity phase.",
      },
      quote: {
        it: "We’ve trained a model called ChatGPT which interacts in a conversational way.",
        en: "We’ve trained a model called ChatGPT which interacts in a conversational way.",
      },
      sourceLabel: {
        it: "OpenAI — Introducing ChatGPT",
        en: "OpenAI — Introducing ChatGPT",
      },
      sourceUrl: "https://openai.com/index/chatgpt/",
    },
    {
      id: "s-2023-03-musk",
      date: "2023-03-22",
      type: "statement",
      actorId: "xai",
      personId: "musk",
      sentiment: "alarm",
      title: {
        it: "Musk firma l’appello a “mettere in pausa” i modelli giganti",
        en: "Musk signs the call to “pause” giant AI experiments",
      },
      summary: {
        it: "Lettera aperta Future of Life Institute: pausa di almeno 6 mesi sull’addestramento di sistemi più potenti di GPT-4.",
        en: "Future of Life Institute open letter: pause of at least 6 months on training systems more powerful than GPT-4.",
      },
      quote: {
        it: "We call on all AI labs to immediately pause for at least 6 months the training of AI systems more powerful than GPT-4.",
        en: "We call on all AI labs to immediately pause for at least 6 months the training of AI systems more powerful than GPT-4.",
      },
      sourceLabel: {
        it: "Future of Life Institute — open letter",
        en: "Future of Life Institute — open letter",
      },
      sourceUrl:
        "https://futureoflife.org/open-letter/pause-giant-ai-experiments/",
    },
    {
      id: "s-2023-05-altman-senate",
      date: "2023-05-16",
      type: "statement",
      actorId: "openai",
      personId: "altman",
      sentiment: "caution",
      title: {
        it: "Altman al Senato USA: “se va male, può andare molto male”",
        en: "Altman to US Senate: “if it goes wrong, it can go quite wrong”",
      },
      summary: {
        it: "In audizione chiede guardrail pubblici e ammette rischi gravi — tono di cautela regolatoria, non solo hype.",
        en: "In a hearing he asks for public guardrails and admits severe risks — a regulatory-caution tone, not only hype.",
      },
      quote: {
        it: "I think if this technology goes wrong, it can go quite wrong, and we want to be vocal about that.",
        en: "I think if this technology goes wrong, it can go quite wrong, and we want to be vocal about that.",
      },
      sourceLabel: {
        it: "NPR — coverage of Senate AI hearing, 16 maggio 2023",
        en: "NPR — coverage of Senate AI hearing, 16 May 2023",
      },
      sourceUrl:
        "https://www.npr.org/2023/05/16/1176508612/a-leader-in-artificial-intelligence-is-urging-congress-to-regulate-it",
    },
    {
      id: "s-2023-05-nadella",
      date: "2023-05-23",
      type: "statement",
      actorId: "microsoft",
      personId: "nadella",
      sentiment: "optimism",
      title: {
        it: "Nadella a Build: dall’“bicicletta” al “motore a vapore”",
        en: "Nadella at Build: from “bicycle” to “steam engine”",
      },
      summary: {
        it: "Keynote Microsoft Build 2023: ChatGPT come upgrade di scala per la computazione — tono di opportunità industriale.",
        en: "Microsoft Build 2023 keynote: ChatGPT as a scale upgrade for computing — an industrial-opportunity tone.",
      },
      quote: {
        it: "With the launch of ChatGPT, computing went from a “bicycle for the mind” to a “steam engine for the mind.”",
        en: "With the launch of ChatGPT, computing went from a “bicycle for the mind” to a “steam engine for the mind.”",
      },
      detail: {
        it: "Testo ripreso dal post LinkedIn di Nadella che adatta i remarks di Build 2023.",
        en: "Wording from Nadella’s LinkedIn post adapting his Build 2023 remarks.",
      },
      sourceLabel: {
        it: "Satya Nadella — LinkedIn (Build 2023)",
        en: "Satya Nadella — LinkedIn (Build 2023)",
      },
      sourceUrl:
        "https://www.linkedin.com/pulse/5-new-developer-opportunities-ai-era-satya-nadella",
    },
    {
      id: "s-2023-05-altman",
      date: "2023-05-24",
      type: "statement",
      actorId: "openai",
      personId: "altman",
      sentiment: "deregulation",
      title: {
        it: "Altman: l’AI Act UE rischia di “sovra-regolare”",
        en: "Altman: the EU AI Act risks “over-regulating”",
      },
      summary: {
        it: "Durante il tour europeo, il CEO di OpenAI chiama “over-regulating” la bozza e evoca l’ipotesi di lasciare l’UE.",
        en: "During his European tour, OpenAI’s CEO calls the draft “over-regulating” and floats leaving the EU.",
      },
      quote: {
        it: "The current draft of the EU AI Act would be over-regulating, but we have heard it’s going to get pulled back.",
        en: "The current draft of the EU AI Act would be over-regulating, but we have heard it’s going to get pulled back.",
      },
      sourceLabel: {
        it: "Reuters, 25 maggio 2023",
        en: "Reuters, 25 May 2023",
      },
      sourceUrl:
        "https://www.reuters.com/technology/openai-ceos-threat-quit-eu-draws-lawmaker-backlash-2023-05-25/",
    },
    {
      id: "s-2023-05-cais",
      date: "2023-05-30",
      type: "statement",
      actorId: "openai",
      personId: "altman",
      sentiment: "alarm",
      title: {
        it: "Dichiarazione sul rischio di estinzione da IA",
        en: "Statement on AI extinction risk",
      },
      summary: {
        it: "Center for AI Safety: Altman, Hassabis, Amodei e altri firmano che mitigare il rischio di estinzione da IA deve essere priorità globale.",
        en: "Center for AI Safety: Altman, Hassabis, Amodei and others sign that mitigating AI extinction risk should be a global priority.",
      },
      quote: {
        it: "Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war.",
        en: "Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war.",
      },
      detail: {
        it: "Dichiarazione collettiva; Altman è tra i firmatari noti. Stesso asse temporale del dibattito post-ChatGPT sul rischio esistenziale.",
        en: "Collective statement; Altman is among the notable signatories. Same temporal axis as the post-ChatGPT existential-risk debate.",
      },
      sourceLabel: {
        it: "Center for AI Safety — Statement on AI Risk",
        en: "Center for AI Safety — Statement on AI Risk",
      },
      sourceUrl: "https://www.safe.ai/work/statement-on-ai-risk",
    },
    {
      id: "s-2023-07-amodei",
      date: "2023-07-25",
      type: "statement",
      actorId: "anthropic",
      personId: "amodei",
      sentiment: "caution",
      title: {
        it: "Amodei al Senato USA: test e audit prima del rilascio",
        en: "Amodei to US Senate: test and audit before release",
      },
      summary: {
        it: "In audizione, il CEO di Anthropic chiede una batteria rigorosa di test di sicurezza — anche da terzi e esperti di sicurezza nazionale.",
        en: "In a hearing, Anthropic’s CEO calls for a rigorous battery of safety tests — including third parties and national-security experts.",
      },
      quote: {
        it: "New AI models should have to pass a rigorous battery of safety tests before they can be released to the public at all, including tests by third parties and national security experts in Government.",
        en: "New AI models should have to pass a rigorous battery of safety tests before they can be released to the public at all, including tests by third parties and national security experts in Government.",
      },
      sourceLabel: {
        it: "US Senate Judiciary — hearing 25 luglio 2023",
        en: "US Senate Judiciary — hearing 25 July 2023",
      },
      sourceUrl:
        "https://www.judiciary.senate.gov/committee-activity/hearings/oversight-of-ai-principles-for-regulation",
    },
    {
      id: "s-2024-06-huang",
      date: "2024-06-02",
      type: "statement",
      actorId: "nvidia",
      personId: "huang",
      sentiment: "optimism",
      title: {
        it: "Huang a Computex: “l’IA è una nuova rivoluzione industriale”",
        en: "Huang at Computex: “AI is a new industrial revolution”",
      },
      summary: {
        it: "Keynote Computex 2024: NVIDIA inquadra l’IA come svolta industriale legata al compute.",
        en: "Computex 2024 keynote: NVIDIA frames AI as an industrial turn tied to compute.",
      },
      quote: {
        it: "AI is a new industrial revolution.",
        en: "AI is a new industrial revolution.",
      },
      sourceLabel: {
        it: "NVIDIA — Computex 2024 keynote",
        en: "NVIDIA — Computex 2024 keynote",
      },
      sourceUrl: "https://nvidianews.nvidia.com/news/nvidia-computex-2024",
    },
    {
      id: "s-2024-07-zuck",
      date: "2024-07-23",
      type: "statement",
      actorId: "meta",
      personId: "zuckerberg",
      sentiment: "open_source",
      title: {
        it: "Zuckerberg: Llama e la scommessa “open source”",
        en: "Zuckerberg: Llama and the “open source” bet",
      },
      summary: {
        it: "Meta rilancia la narrativa open su Llama — tono di apertura come vantaggio competitivo e di ecosistema.",
        en: "Meta doubles down on an open Llama narrative — openness as competitive and ecosystem advantage.",
      },
      quote: {
        it: "Open source AI is the path forward.",
        en: "Open source AI is the path forward.",
      },
      detail: {
        it: "Titolo/tesi del post ufficiale Meta sul rilascio open; verificare il wording aggiornato sul blog.",
        en: "Title/thesis of Meta’s official open-release post; verify updated wording on the blog.",
      },
      sourceLabel: {
        it: "Meta — Open Source AI Is the Path Forward",
        en: "Meta — Open Source AI Is the Path Forward",
      },
      sourceUrl:
        "https://about.fb.com/news/2024/07/open-source-ai-is-the-path-forward/",
    },
    {
      id: "s-2024-10-amodei",
      date: "2024-10-01",
      type: "statement",
      actorId: "anthropic",
      personId: "amodei",
      sentiment: "optimism",
      title: {
        it: "Amodei: “Machines of Loving Grace” e l’upside radicale",
        en: "Amodei: “Machines of Loving Grace” and radical upside",
      },
      summary: {
        it: "Essay pubblico: upside sottostimato quanto i rischi — spostamento verso una visione positiva condizionata alla gestione dei rischi.",
        en: "Public essay: upside as underestimated as the risks — a shift toward conditional positive vision if risks are managed.",
      },
      quote: {
        it: "I think that most people are underestimating just how radical the upside of AI could be, just as I think most people are underestimating how bad the risks could be.",
        en: "I think that most people are underestimating just how radical the upside of AI could be, just as I think most people are underestimating how bad the risks could be.",
      },
      sourceLabel: {
        it: "Dario Amodei — Machines of Loving Grace (ottobre 2024)",
        en: "Dario Amodei — Machines of Loving Grace (October 2024)",
      },
      sourceUrl: "https://darioamodei.com/essay/machines-of-loving-grace",
    },
    {
      id: "s-2025-01-huang-ces",
      date: "2025-01-06",
      type: "statement",
      actorId: "nvidia",
      personId: "huang",
      sentiment: "optimism",
      title: {
        it: "Huang al CES 2025: “plasmare l’era dell’IA”",
        en: "Huang at CES 2025: “shape the age of AI”",
      },
      summary: {
        it: "Annuncio Project DIGITS: supercomputer AI personale — tono di democratizzazione del compute e di mainstream industriale.",
        en: "Project DIGITS announcement: personal AI supercomputer — democratising compute and industrial mainstream tone.",
      },
      quote: {
        it: "AI will be mainstream in every application for every industry… empowers them to engage and shape the age of AI.",
        en: "AI will be mainstream in every application for every industry… empowers them to engage and shape the age of AI.",
      },
      sourceLabel: {
        it: "NVIDIA Newsroom — Project DIGITS / CES 2025",
        en: "NVIDIA Newsroom — Project DIGITS / CES 2025",
      },
      sourceUrl:
        "https://nvidianews.nvidia.com/news/nvidia-puts-grace-blackwell-on-every-desk-and-at-every-ai-developers-fingertips",
    },
    {
      id: "s-2025-01-altman-reflections",
      date: "2025-01-05",
      type: "statement",
      actorId: "openai",
      personId: "altman",
      sentiment: "optimism",
      title: {
        it: "Altman: “sappiamo come costruire l’AGI”",
        en: "Altman: “we know how to build AGI”",
      },
      summary: {
        it: "Post Reflections: fiducia su AGI e agenti nel 2025, con richiamo a procedere con grande cura verso la superintelligenza.",
        en: "Reflections post: confidence on AGI and 2025 agents, with a call to proceed with great care toward superintelligence.",
      },
      quote: {
        it: "We are now confident we know how to build AGI as we have traditionally understood it. We believe that, in 2025, we may see the first AI agents “join the workforce”.",
        en: "We are now confident we know how to build AGI as we have traditionally understood it. We believe that, in 2025, we may see the first AI agents “join the workforce”.",
      },
      sourceLabel: {
        it: "Sam Altman — Reflections",
        en: "Sam Altman — Reflections",
      },
      sourceUrl: "https://blog.samaltman.com/reflections",
    },
    {
      id: "s-2025-01-hassabis",
      date: "2025-01-20",
      type: "statement",
      actorId: "google",
      personId: "hassabis",
      sentiment: "caution",
      title: {
        it: "Hassabis: AGI vicina, rischi ancora aperti",
        en: "Hassabis: AGI near, risks still open",
      },
      summary: {
        it: "Intervista ZEIT post-Nobel: benefici enormi ma rischi tecnici e geopolitici irrisolti — tono di cautela scientifica.",
        en: "ZEIT interview after the Nobel: huge benefits but unresolved technical and geopolitical risks — scientific caution.",
      },
      quote: {
        it: "There is risk in that… we don’t know yet. We might get lucky and it is easy to solve the technical issues, but we don’t know.",
        en: "There is risk in that… we don’t know yet. We might get lucky and it is easy to solve the technical issues, but we don’t know.",
      },
      detail: {
        it: "Parafrasi stretta dall’intervista inglese ZEIT (gennaio 2025); verificare il wording completo sulla pagina.",
        en: "Close paraphrase from ZEIT’s English interview (January 2025); verify full wording on the page.",
      },
      sourceLabel: {
        it: "DIE ZEIT — Demis Hassabis interview (EN)",
        en: "DIE ZEIT — Demis Hassabis interview (EN)",
      },
      sourceUrl:
        "https://www.zeit.de/digital/internet/2025-01/demis-hassabis-nobel-prize-artificial-intelligence-deepmind-english",
    },
    {
      id: "s-2025-03-huang-gtc",
      date: "2025-03-18",
      type: "statement",
      actorId: "nvidia",
      personId: "huang",
      sentiment: "optimism",
      title: {
        it: "Huang al GTC 2025: reasoning e agentic AI",
        en: "Huang at GTC 2025: reasoning and agentic AI",
      },
      summary: {
        it: "Blackwell Ultra: salto di scala su reasoning e agentic — tono di accelerazione industriale del compute.",
        en: "Blackwell Ultra: scale jump for reasoning and agentic AI — industrial compute-acceleration tone.",
      },
      quote: {
        it: "AI has made a giant leap — reasoning and agentic AI demand orders of magnitude more computing performance.",
        en: "AI has made a giant leap — reasoning and agentic AI demand orders of magnitude more computing performance.",
      },
      sourceLabel: {
        it: "NVIDIA Newsroom — Blackwell Ultra / GTC 2025",
        en: "NVIDIA Newsroom — Blackwell Ultra / GTC 2025",
      },
      sourceUrl:
        "https://nvidianews.nvidia.com/news/nvidia-blackwell-ultra-ai-factory-platform-paves-way-for-age-of-ai-reasoning",
    },
    {
      id: "s-2025-07-altman-softbank",
      date: "2025-07-16",
      type: "statement",
      actorId: "openai",
      personId: "altman",
      sentiment: "optimism",
      title: {
        it: "Altman a SoftBank World: domanda di “intelligenza” senza fine",
        en: "Altman at SoftBank World: endless demand for “intelligence”",
      },
      summary: {
        it: "Sessione con Masa Son: scaling e domanda percepita come illimitata — picco di ottimismo industriale 2025.",
        en: "Session with Masa Son: scaling and demand framed as effectively unlimited — a 2025 industrial-optimism peak.",
      },
      quote: {
        it: "As we drive the cost of AI down, more people want to use it… And the demand for intelligence in the world just seems to be huge.",
        en: "As we drive the cost of AI down, more people want to use it… And the demand for intelligence in the world just seems to be huge.",
      },
      sourceLabel: {
        it: "The Japan Times — SoftBank World 2025 (16 luglio 2025)",
        en: "The Japan Times — SoftBank World 2025 (16 July 2025)",
      },
      sourceUrl:
        "https://www.japantimes.co.jp/business/2025/07/16/companies/masayoshi-son-sam-altman-ai/",
    },
    {
      id: "s-2026-02-hassabis-bbc",
      date: "2026-02-19",
      type: "statement",
      actorId: "google",
      personId: "hassabis",
      sentiment: "caution",
      title: {
        it: "Hassabis alla BBC: serve ricerca urgente sui rischi",
        en: "Hassabis to BBC: urgent research needed on AI threats",
      },
      summary: {
        it: "AI Impact Summit (Delhi): bad actors e perdita di controllo — richiesta di guardrail robusti e “smart regulation”.",
        en: "AI Impact Summit (Delhi): bad actors and loss of control — call for robust guardrails and “smart regulation”.",
      },
      quote: {
        it: "More research needs to be done urgently… how do we make sure we can build robust enough guard rails to keep them doing what we want them to do?",
        en: "More research needs to be done urgently… how do we make sure we can build robust enough guard rails to keep them doing what we want them to do?",
      },
      detail: {
        it: "Citazione ricostruita da coverage BBC / video dell’intervista al summit; verificare il wording esatto sul pezzo.",
        en: "Quote reconstructed from BBC coverage / interview video at the summit; verify exact wording in the piece.",
      },
      sourceLabel: {
        it: "BBC News — Hassabis on AI threats",
        en: "BBC News — Hassabis on AI threats",
      },
      sourceUrl: "https://www.bbc.co.uk/news/articles/c0q3g0ln274o",
    },
  ],
};

export const timelineThemes: TimelineTheme[] = [sentimentTheme, aiActTrack];

/** @deprecated Prefer timelineThemes */
export const lawTracks = timelineThemes;

export function getTimelineTheme(slug: string): TimelineTheme | undefined {
  return timelineThemes.find((t) => t.slug === slug);
}

/** @deprecated Prefer getTimelineTheme */
export function getLawTrack(slug: string): TimelineTheme | undefined {
  return getTimelineTheme(slug);
}


/** Counts used by the homepage stats strip and the Open Graph image. */
export function getHomeSnapshot() {
  const events = timelineThemes.flatMap((theme) => theme.events);
  const years = events.map((e) => Number(e.date.slice(0, 4)));
  return {
    eventCount: events.length,
    actorCount: lobbyActors.length,
    sourceCount: new Set(events.map((e) => e.sourceUrl)).size,
    fromYear: Math.min(...years),
    toYear: Math.max(...years),
  };
}

export function formatAmount(amount: number, locale: "it" | "en"): string {
  return new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatEventDate(date: string, locale: "it" | "en"): string {
  return new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
