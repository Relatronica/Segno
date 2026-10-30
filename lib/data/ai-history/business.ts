import type { TimelineEvent } from "../trasparenza";

/**
 * Lens: business. Money and structure: funding, IPOs, acquisitions, the labs themselves.
 *
 * Editorial rules for this file:
 * - Source must be first-party (company release, SEC/registry filing, official page)
 *   or an allowlisted wire service (Reuters, Bloomberg, FT, AP).
 * - The date is the public announcement date.
 * - No tone, no ranking: state the figures, the names, the amounts.
 */
export const businessEvents: TimelineEvent[] = [
  {
    id: "h-2015-12-11-openai-founded", date: "2015-12-11", type: "milestone", lens: "business", actorId: "openai",
    title: { it: "Fondazione di OpenAI", en: "OpenAI founded" },
    summary: {
      it: "OpenAI viene annunciata come organizzazione di ricerca senza scopo di lucro con l'obiettivo di sviluppare un'intelligenza artificiale a beneficio dell'umanità; tra i fondatori Elon Musk, Sam Altman e Greg Brockman.",
      en: "OpenAI is announced as a non-profit AI research company aiming to advance digital intelligence for the benefit of humanity; founders include Elon Musk, Sam Altman and Greg Brockman.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/introducing-openai/",
  },
  {
    id: "h-2021-05-28-anthropic-founded", date: "2021-05-28", type: "milestone", lens: "business", actorId: "anthropic",
    title: { it: "Fondazione di Anthropic", en: "Anthropic founded" },
    summary: {
      it: "Anthropic viene annunciata da ex ricercatori di OpenAI come azienda di ricerca e sicurezza sull'IA; contestualmente comunica un round Series A da 124 milioni di dollari.",
      en: "Anthropic is announced by former OpenAI researchers as an AI safety and research company; it discloses a $124 million Series A round at the same time.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/anthropic-raises-124-million-to-build-more-reliable-general-ai-systems",
  },
  {
    id: "h-2021-06-29-github-copilot", date: "2021-06-29", type: "milestone", lens: "business",
    title: { it: "GitHub Copilot: anteprima tecnica", en: "GitHub Copilot technical preview" },
    summary: {
      it: "GitHub lancia l'anteprima tecnica di Copilot, un assistente di programmazione che suggerisce righe e funzioni di codice, basato sul modello Codex di OpenAI.",
      en: "GitHub launches the technical preview of Copilot, a coding assistant that suggests lines and functions of code, based on OpenAI's Codex model.",
    },
    sourceLabel: { it: "GitHub", en: "GitHub" }, sourceUrl: "https://github.blog/2021-06-29-introducing-github-copilot-ai-pair-programmer/",
  },
  {
    id: "h-2023-05-30-nvidia-trillion", date: "2023-05-30", type: "milestone", lens: "business", actorId: "nvidia",
    title: { it: "Nvidia supera 1.000 miliardi di capitalizzazione", en: "Nvidia tops $1 trillion market cap" },
    summary: {
      it: "Nvidia diventa la prima azienda produttrice di semiconduttori a raggiungere in Borsa una capitalizzazione di 1.000 miliardi di dollari.",
      en: "Nvidia becomes the first chipmaker to reach a $1 trillion market capitalisation on the stock market.",
    },
    sourceLabel: { it: "Reuters", en: "Reuters" }, sourceUrl: "https://www.reuters.com/technology/nvidia-sets-eye-1-trillion-market-value-2023-05-30/",
  },
  {
    id: "h-2023-07-12-xai-founded", date: "2023-07-12", type: "milestone", lens: "business", actorId: "xai",
    title: { it: "Fondazione di xAI", en: "xAI founded" },
    summary: {
      it: "Elon Musk annuncia la nascita di xAI, azienda di intelligenza artificiale il cui obiettivo dichiarato è comprendere la vera natura dell'universo; la società era stata registrata in Nevada a marzo.",
      en: "Elon Musk announces xAI, an AI company whose stated goal is to understand the true nature of the universe; the firm had been incorporated in Nevada in March.",
    },
    sourceLabel: { it: "AP", en: "AP" }, sourceUrl: "https://apnews.com/article/elon-musk-artificial-intelligence-ai-xai-2e626553cf6333f642fb02fe247707ca",
  },
  {
    id: "h-2024-03-12-devin", date: "2024-03-12", type: "milestone", lens: "business",
    title: { it: "Cognition presenta Devin", en: "Cognition introduces Devin" },
    summary: {
      it: "La startup Cognition presenta Devin, un agente basato su IA descritto come ingegnere del software capace di pianificare ed eseguire compiti di programmazione.",
      en: "Startup Cognition introduces Devin, an AI agent described as a software engineer able to plan and execute programming tasks.",
    },
    sourceLabel: { it: "Cognition", en: "Cognition" }, sourceUrl: "https://www.cognition.ai/blog/introducing-devin",
  },
  {
    id: "h-2024-06-19-ssi-founded", date: "2024-06-19", type: "milestone", lens: "business",
    title: { it: "Fondazione di Safe Superintelligence Inc.", en: "Safe Superintelligence Inc. founded" },
    summary: {
      it: "Ilya Sutskever, Daniel Gross e Daniel Levy annunciano Safe Superintelligence Inc., laboratorio con un unico obiettivo e prodotto dichiarato: una superintelligenza sicura.",
      en: "Ilya Sutskever, Daniel Gross and Daniel Levy announce Safe Superintelligence Inc., a lab with a stated single goal and product: a safe superintelligence.",
    },
    sourceLabel: { it: "SSI", en: "SSI" }, sourceUrl: "https://ssi.inc/",
  },
  {
    id: "h-2025-01-21-stargate", date: "2025-01-21", type: "milestone", lens: "business", actorId: "openai",
    title: { it: "Progetto Stargate", en: "The Stargate Project" },
    summary: {
      it: "OpenAI, SoftBank, Oracle e MGX annunciano Stargate, iniziativa per costruire infrastrutture di data center negli Stati Uniti, con un investimento annunciato fino a 500 miliardi di dollari in quattro anni.",
      en: "OpenAI, SoftBank, Oracle and MGX announce Stargate, a venture to build data-centre infrastructure in the United States, with an announced investment of up to $500 billion over four years.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/announcing-the-stargate-project/",
  },
  {
    id: "h-2025-02-18-thinking-machines-lab", date: "2025-02-18", type: "milestone", lens: "business",
    title: { it: "Fondazione di Thinking Machines Lab", en: "Thinking Machines Lab founded" },
    summary: {
      it: "Mira Murati, ex CTO di OpenAI, annuncia la fondazione di Thinking Machines Lab insieme a ex ricercatori di OpenAI, tra cui John Schulman e Lilian Weng.",
      en: "Mira Murati, OpenAI's former CTO, announces the founding of Thinking Machines Lab with former OpenAI researchers including John Schulman and Lilian Weng.",
    },
    sourceLabel: { it: "Thinking Machines Lab", en: "Thinking Machines Lab" }, sourceUrl: "https://thinkingmachines.ai/",
  },
  {
    id: "h-2025-05-21-openai-io", date: "2025-05-21", type: "spending", lens: "business", actorId: "openai",
    amountEur: 5850000000,
    title: { it: "OpenAI acquisisce io", en: "OpenAI acquires io" },
    summary: {
      it: "OpenAI annuncia l'acquisizione di io, la società di hardware co-fondata da Jony Ive, in una transazione interamente in azioni valutata circa 6,5 miliardi di dollari.",
      en: "OpenAI announces the acquisition of io, the hardware company co-founded by Jony Ive, in an all-stock transaction valued at roughly $6.5 billion.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/sam-and-jony/",
  },
  {
    id: "h-2025-06-12-meta-scale-ai", date: "2025-06-12", type: "spending", lens: "business", actorId: "meta",
    amountEur: 12870000000,
    title: { it: "Meta investe 14,3 miliardi in Scale AI", en: "Meta invests $14.3 billion in Scale AI" },
    summary: {
      it: "Meta annuncia un investimento da 14,3 miliardi di dollari per una quota del 49% in Scale AI, valutando la società oltre 29 miliardi; il fondatore Alexandr Wang entra in Meta per guidare il nuovo team sulla superintelligenza.",
      en: "Meta announces a $14.3 billion investment for a 49% stake in Scale AI, valuing the company at over $29 billion; founder Alexandr Wang joins Meta to lead its new superintelligence team.",
    },
    sourceLabel: { it: "Scale AI", en: "Scale AI" }, sourceUrl: "https://www.scaleapi.com/blog/scale-ai-announces-next-phase-of-company-evolution",
  },
  {
    id: "h-2025-09-02-anthropic-series-f", date: "2025-09-02", type: "spending", lens: "business", actorId: "anthropic",
    amountEur: 11700000000,
    title: { it: "Anthropic: Series F da 13 miliardi di dollari", en: "Anthropic raises $13 billion Series F" },
    summary: {
      it: "Anthropic chiude un round Series F da 13 miliardi di dollari a una valutazione post-money di 183 miliardi, guidato da ICONIQ e co-guidato da Fidelity e Lightspeed.",
      en: "Anthropic closes a $13 billion Series F at a $183 billion post-money valuation, led by ICONIQ and co-led by Fidelity and Lightspeed.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/anthropic-raises-series-f-at-usd183b-post-money-valuation",
  },
  {
    id: "h-2025-09-22-nvidia-openai", date: "2025-09-22", type: "spending", lens: "business", actorId: "nvidia",
    amountEur: 90000000000,
    title: { it: "Nvidia investe fino a 100 miliardi in OpenAI", en: "Nvidia to invest up to $100 billion in OpenAI" },
    summary: {
      it: "Nvidia e OpenAI annunciano una partnership per dispiegare almeno 10 gigawatt di sistemi Nvidia; Nvidia intende investire fino a 100 miliardi di dollari in OpenAI in modo progressivo.",
      en: "Nvidia and OpenAI announce a partnership to deploy at least 10 gigawatts of Nvidia systems; Nvidia intends to invest up to $100 billion in OpenAI progressively.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/openai-nvidia-systems-partnership/",
  },
  {
    id: "h-2025-10-28-openai-restructuring", date: "2025-10-28", type: "milestone", lens: "business", actorId: "openai",
    title: { it: "OpenAI completa la riorganizzazione societaria", en: "OpenAI completes its restructuring" },
    summary: {
      it: "OpenAI annuncia il completamento della ricapitalizzazione: l'attività con scopo di lucro diventa OpenAI Group PBC, controllata dalla fondazione non-profit, e Microsoft ottiene una quota di circa il 27%.",
      en: "OpenAI announces the completion of its recapitalisation: the for-profit arm becomes OpenAI Group PBC, controlled by the non-profit Foundation, with Microsoft taking roughly a 27% stake.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/built-to-benefit-everyone/",
  },
  {
    id: "h-2026-01-08-zai-ipo", date: "2026-01-08", type: "milestone", lens: "business",
    title: { it: "Z.ai (Zhipu AI) si quota a Hong Kong", en: "Z.ai (Zhipu AI) lists in Hong Kong" },
    summary: {
      it: "La cinese Zhipu AI, che opera come Z.ai, debutta alla Borsa di Hong Kong: è la prima società quotata il cui core business sono i modelli linguistici di grandi dimensioni.",
      en: "Chinese firm Zhipu AI, trading as Z.ai, debuts on the Hong Kong Stock Exchange — the first listed company whose core business is large language models.",
    },
    sourceLabel: { it: "Financial Times (comunicato Z.ai)", en: "Financial Times (Z.ai release)" }, sourceUrl: "https://markets.ft.com/data/announce/detail?dockey=600-202601080341PR_NEWS_USPRX____CN59068-1",
  },
  {
    id: "h-2026-02-02-spacex-acquires-xai", date: "2026-02-02", type: "milestone", lens: "business", actorId: "xai",
    title: { it: "SpaceX acquisisce xAI", en: "SpaceX acquires xAI" },
    summary: {
      it: "SpaceX annuncia l'acquisizione di xAI con una transazione interamente in azioni; la società combinata viene valutata circa 1,25 trilioni di dollari.",
      en: "SpaceX announces the acquisition of xAI in an all-stock transaction; the combined company is reported to be valued at about $1.25 trillion.",
    },
    sourceLabel: { it: "Fortune", en: "Fortune" }, sourceUrl: "https://fortune.com/2026/02/02/elon-musk-spacex-xai-ipo-trillion/",
  },
  {
    id: "h-2026-03-24-openai-sora-shutdown", date: "2026-03-24", type: "milestone", lens: "business", actorId: "openai",
    title: { it: "OpenAI chiude l'app Sora", en: "OpenAI shuts down the Sora app" },
    summary: {
      it: "OpenAI annuncia la dismissione dell'app e del sito di Sora, il generatore video lanciato meno di un anno prima; l'app chiude ad aprile 2026 e l'API a settembre 2026.",
      en: "OpenAI announces the retirement of the Sora app and website, the video generator launched less than a year earlier; the app closes in April 2026 and the API in September 2026.",
    },
    sourceLabel: { it: "OpenAI Help Center", en: "OpenAI Help Center" }, sourceUrl: "https://help.openai.com/en/articles/20001152-what-to-know-about-the-sora-discontinuation",
  },
  {
    id: "h-2026-03-31-openai-122b", date: "2026-03-31", type: "spending", lens: "business", actorId: "openai",
    amountEur: 109800000000,
    title: { it: "OpenAI chiude un round da 122 miliardi di dollari", en: "OpenAI closes a $122 billion round" },
    summary: {
      it: "OpenAI annuncia la chiusura del proprio round di finanziamento con 122 miliardi di dollari di capitale impegnato, a una valutazione post-money di 852 miliardi.",
      en: "OpenAI announces the close of its funding round with $122 billion in committed capital, at an $852 billion post-money valuation.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/accelerating-the-next-phase-ai/",
  },
  {
    id: "h-2026-04-06-anthropic-30b-arr", date: "2026-04-06", type: "milestone", lens: "business", actorId: "anthropic",
    title: { it: "Anthropic: run-rate a 30 miliardi di dollari", en: "Anthropic hits a $30 billion run rate" },
    summary: {
      it: "Anthropic comunica che il proprio tasso di ricavi annualizzato ha superato i 30 miliardi di dollari, in crescita da circa 9 miliardi alla fine del 2025.",
      en: "Anthropic says its annualised revenue run rate has passed $30 billion, up from roughly $9 billion at the end of 2025.",
    },
    sourceLabel: { it: "VentureBeat", en: "VentureBeat" }, sourceUrl: "https://venturebeat.com/technology/anthropic-says-it-hit-a-30-billion-revenue-run-rate-after-crazy-80x-growth",
  },
  {
    id: "h-2026-05-04-anthropic-services-firm", date: "2026-05-04", type: "spending", lens: "business", actorId: "anthropic",
    amountEur: 1350000000,
    title: { it: "Anthropic lancia una società di servizi enterprise", en: "Anthropic launches an enterprise services firm" },
    summary: {
      it: "Anthropic, Blackstone, Hellman & Friedman e Goldman Sachs annunciano la costituzione di una nuova società di servizi dedicata all'adozione di Claude nelle operazioni delle imprese, con circa 1,5 miliardi di dollari di capitale.",
      en: "Anthropic, Blackstone, Hellman & Friedman and Goldman Sachs announce a new services firm to bring Claude into core business operations, with about $1.5 billion in capital.",
    },
    sourceLabel: { it: "Goldman Sachs", en: "Goldman Sachs" }, sourceUrl: "https://am.gs.com/en-sg/advisors/news/press-release/2026/anthropic-partners-with-blackstone-hf-and-goldman-sachs-ai-services",
  },
  {
    id: "h-2026-05-06-anthropic-spacex-compute", date: "2026-05-06", type: "milestone", lens: "business", actorId: "anthropic",
    title: { it: "Anthropic: accordo di calcolo con SpaceX", en: "Anthropic: compute deal with SpaceX" },
    summary: {
      it: "Anthropic annuncia un accordo per utilizzare tutta la capacità di calcolo del data center Colossus 1 di SpaceX, oltre 220.000 GPU Nvidia e più di 300 megawatt.",
      en: "Anthropic announces an agreement to use all the compute capacity at SpaceX's Colossus 1 data centre — more than 220,000 Nvidia GPUs and over 300 megawatts.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/higher-limits-spacex",
  },
  {
    id: "h-2026-05-11-openai-deployment-company", date: "2026-05-11", type: "milestone", lens: "business", actorId: "openai",
    title: { it: "OpenAI lancia la Deployment Company", en: "OpenAI launches the Deployment Company" },
    summary: {
      it: "OpenAI annuncia la OpenAI Deployment Company, una controllata partecipata con oltre 4 miliardi di dollari da 19 investitori, e l'acquisizione della società di consulenza Tomoro con circa 150 ingegneri.",
      en: "OpenAI announces the OpenAI Deployment Company, a majority-owned subsidiary backed by over $4 billion from 19 investors, and the acquisition of consultancy Tomoro with about 150 engineers.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/openai-launches-the-deployment-company/",
  },
  {
    id: "h-2026-05-19-karpathy-anthropic", date: "2026-05-19", type: "milestone", lens: "business", actorId: "anthropic",
    title: { it: "Karpathy entra in Anthropic", en: "Karpathy joins Anthropic" },
    summary: {
      it: "Andrej Karpathy, membro fondatore di OpenAI ed ex responsabile AI di Tesla, annuncia di essere entrato nel team di pre-training di Anthropic.",
      en: "Andrej Karpathy, an OpenAI founding member and former Tesla AI lead, announces he has joined Anthropic's pre-training team.",
    },
    sourceLabel: { it: "TechCrunch", en: "TechCrunch" }, sourceUrl: "https://techcrunch.com/2026/05/19/openai-co-founder-andrej-karpathy-joins-anthropics-pre-training-team/",
  },
  {
    id: "h-2026-05-20-spacex-ipo-filing", date: "2026-05-20", type: "milestone", lens: "business",
    title: { it: "SpaceX deposita il prospetto per l'IPO", en: "SpaceX files for its IPO" },
    summary: {
      it: "SpaceX deposita la dichiarazione di registrazione S-1 presso la SEC per quotarsi al Nasdaq con il ticker SPCX, in quella che si prospetta come la maggiore offerta pubblica della storia.",
      en: "SpaceX files its S-1 registration statement with the SEC to list on the Nasdaq under the ticker SPCX, in what is expected to be the largest IPO on record.",
    },
    sourceLabel: { it: "SEC (S-1 SpaceX)", en: "SEC (SpaceX S-1)" }, sourceUrl: "https://www.sec.gov/Archives/edgar/data/1181412/000162828026040610/spacexfwp.htm",
  },
  {
    id: "h-2026-05-28-anthropic-series-h", date: "2026-05-28", type: "spending", lens: "business", actorId: "anthropic",
    amountEur: 58500000000,
    title: { it: "Anthropic: Series H da 65 miliardi di dollari", en: "Anthropic raises $65 billion Series H" },
    summary: {
      it: "Anthropic annuncia un round Series H da 65 miliardi di dollari a una valutazione post-money di 965 miliardi, guidato da Altimeter, Dragoneer, Greenoaks e Sequoia.",
      en: "Anthropic announces a $65 billion Series H at a $965 billion post-money valuation, led by Altimeter, Dragoneer, Greenoaks and Sequoia.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/series-h",
  },
  {
    id: "h-2026-06-01-anthropic-s1-filing", date: "2026-06-01", type: "milestone", lens: "business", actorId: "anthropic",
    title: { it: "Anthropic deposita in forma riservata la bozza di S-1", en: "Anthropic confidentially submits a draft S-1" },
    summary: {
      it: "Anthropic deposita in forma riservata presso la SEC una bozza di dichiarazione di registrazione su modulo S-1 per una potenziale offerta pubblica iniziale.",
      en: "Anthropic confidentially submits a draft Form S-1 registration statement with the SEC for a proposed initial public offering.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/confidential-draft-s1-sec",
  },
  {
    id: "h-2026-06-08-openai-s1-filing", date: "2026-06-08", type: "milestone", lens: "business", actorId: "openai",
    title: { it: "OpenAI deposita in forma riservata la bozza di S-1", en: "OpenAI confidentially submits a draft S-1" },
    summary: {
      it: "OpenAI annuncia di aver depositato in forma riservata una bozza di S-1 presso la SEC, precisando di non aver ancora deciso i tempi dell'eventuale quotazione.",
      en: "OpenAI says it has confidentially submitted a draft S-1 with the SEC, adding that it has not decided on the timing of a possible listing.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/openai-submits-confidential-s-1/",
  },
  {
    id: "h-2026-06-11-prometheus-12b", date: "2026-06-11", type: "spending", lens: "business",
    amountEur: 10800000000,
    title: { it: "Prometheus raccoglie 12 miliardi di dollari", en: "Prometheus raises $12 billion" },
    summary: {
      it: "Prometheus, la startup di IA fisica co-fondata da Jeff Bezos e Vik Bajaj, esce dalla modalità riservata annunciando un round Series B da 12 miliardi di dollari a una valutazione di circa 41 miliardi.",
      en: "Prometheus, the physical-AI startup co-founded by Jeff Bezos and Vik Bajaj, emerges from stealth announcing a $12 billion Series B at a valuation of about $41 billion.",
    },
    sourceLabel: { it: "Semafor", en: "Semafor" }, sourceUrl: "https://www.semafor.com/article/06/11/2026/jeff-bezos-raises-12b-for-ai-that-builds-things",
  },
  {
    id: "h-2026-06-12-spacex-ipo", date: "2026-06-12", type: "milestone", lens: "business",
    title: { it: "SpaceX debutta in Borsa", en: "SpaceX goes public" },
    summary: {
      it: "Le azioni di SpaceX iniziano a essere negoziate al Nasdaq con il ticker SPCX; l'offerta raccoglie circa 75 miliardi di dollari, la maggiore nella storia dei listini statunitensi.",
      en: "SpaceX shares begin trading on the Nasdaq under the ticker SPCX; the offering raises about $75 billion, the largest in US market history.",
    },
    sourceLabel: { it: "SpaceX — Investor Relations", en: "SpaceX — Investor Relations" }, sourceUrl: "https://ir.spacex.com/updates/releases-details/2026/Space-Exploration-Technologies-Corp--Announces-Closing-of-Initial-Public-Offering-Including-Full-Exercise-of-Underwriters-Option-to-Purchase-Additional-Shares-2026-RgoR-Y1Vwh/default.aspx",
  },
  {
    id: "h-2026-06-19-john-jumper-anthropic", date: "2026-06-19", type: "milestone", lens: "business", actorId: "anthropic",
    title: { it: "John Jumper lascia DeepMind per Anthropic", en: "John Jumper leaves DeepMind for Anthropic" },
    summary: {
      it: "John Jumper, premio Nobel per la Chimica 2024 e co-creatore di AlphaFold, lascia Google DeepMind dopo quasi nove anni per entrare in Anthropic.",
      en: "John Jumper, 2024 Nobel laureate in Chemistry and co-creator of AlphaFold, leaves Google DeepMind after nearly nine years to join Anthropic.",
    },
    sourceLabel: { it: "Bloomberg", en: "Bloomberg" }, sourceUrl: "https://www.bloomberg.com/news/articles/2026-06-19/nobel-winner-john-jumper-to-leave-google-deepmind-for-anthropic",
  },
  {
    id: "h-2026-07-09-fidji-simo-steps-down", date: "2026-07-09", type: "milestone", lens: "business", actorId: "openai",
    title: { it: "Fidji Simo lascia il ruolo a tempo pieno in OpenAI", en: "Fidji Simo steps down at OpenAI" },
    summary: {
      it: "Fidji Simo, responsabile delle applicazioni e del business di OpenAI, annuncia di lasciare il ruolo a tempo pieno per diventare consulente part-time, citando la necessità di curare una malattia cronica.",
      en: "Fidji Simo, OpenAI's head of applications and business, announces she is leaving her full-time role to become a part-time advisor, citing a chronic illness.",
    },
    sourceLabel: { it: "TechCrunch", en: "TechCrunch" }, sourceUrl: "https://techcrunch.com/2026/07/09/fidji-simo-steps-down-from-openais-no-2-role/",
  },
  {
    id: "h-2026-08-05-hassabis-steps-aside", date: "2026-08-05", type: "milestone", lens: "business", actorId: "google",
    title: { it: "Hassabis lascia la guida operativa di Google DeepMind", en: "Hassabis steps back at Google DeepMind" },
    summary: {
      it: "Demis Hassabis lascia il ruolo di CEO di Google DeepMind per assumere la presidenza dell'unità e la carica di chief scientist di Alphabet; il CTO Koray Kavukcuoglu guida le attività quotidiane.",
      en: "Demis Hassabis gives up the Google DeepMind CEO role to become its chair and Alphabet's chief scientist; CTO Koray Kavukcuoglu takes over day-to-day operations.",
    },
    sourceLabel: { it: "Fortune", en: "Fortune" }, sourceUrl: "https://fortune.com/2026/08/05/demis-hassabis-steps-down-google-deepmind-ai-shakeup/",
  },
  {
    id: "h-2026-08-11-openai-exec-shakeup", date: "2026-08-11", type: "milestone", lens: "business", actorId: "openai",
    title: { it: "OpenAI: esce il COO Brad Lightcap", en: "OpenAI: COO Brad Lightcap exits" },
    summary: {
      it: "Brad Lightcap, a lungo COO di OpenAI, annuncia l'uscita per avviare una nuova attività; la sua partenza si aggiunge a una serie di cambi ai vertici in vista di un'eventuale quotazione.",
      en: "Brad Lightcap, OpenAI's long-serving COO, announces he is leaving to start something new; his exit adds to a series of executive changes ahead of a possible listing.",
    },
    sourceLabel: { it: "Fortune", en: "Fortune" }, sourceUrl: "https://fortune.com/2026/08/11/openai-exec-brad-lightcap-leaving-start-something-new/",
  },
  {
    id: "h-2026-08-17-anthropic-65b-run-rate", date: "2026-08-17", type: "milestone", lens: "business", actorId: "anthropic",
    title: { it: "Anthropic: run-rate a 65 miliardi di dollari", en: "Anthropic hits a $65 billion run rate" },
    summary: {
      it: "Anthropic comunica agli investitori che il proprio tasso di ricavi annualizzato ha raggiunto i 65 miliardi di dollari alla fine di luglio, più che raddoppiando rispetto alla cifra di aprile.",
      en: "Anthropic tells investors its annualised revenue reached $65 billion at the end of July, more than double its April figure.",
    },
    sourceLabel: { it: "CNBC", en: "CNBC" }, sourceUrl: "https://www.cnbc.com/2026/08/17/anthropic-says-annualized-revenue-climbed-to-65-billion-in-july.html",
  },
  {
    id: "h-2026-09-03-nvidia-hugging-face", date: "2026-09-03", type: "spending", lens: "business", actorId: "nvidia",
    amountEur: 11637000000,
    title: { it: "Nvidia acquisisce Hugging Face", en: "Nvidia to acquire Hugging Face" },
    summary: {
      it: "Nvidia annuncia un accordo per acquisire Hugging Face, la piattaforma di modelli e dataset open source, per 12,93 miliardi di dollari.",
      en: "Nvidia announces an agreement to acquire Hugging Face, the open-source model and dataset platform, for $12.93 billion.",
    },
    sourceLabel: { it: "NVIDIA", en: "NVIDIA" }, sourceUrl: "https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/",
  },
  {
    id: "h-2026-09-08-meta-muse", date: "2026-09-08", type: "milestone", lens: "business", actorId: "meta",
    title: { it: "Meta lancia Muse", en: "Meta launches Muse" },
    summary: {
      it: "Meta presenta Muse, un agente personale basato su IA che gira su una macchina virtuale dedicata e gestisce compiti come prenotazioni e compilazione di moduli.",
      en: "Meta introduces Muse, a personal AI agent running on a dedicated virtual machine that handles tasks such as bookings and form-filling.",
    },
    sourceLabel: { it: "Meta", en: "Meta" }, sourceUrl: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/",
  },
  {
    id: "h-2026-09-12-openai-ipo-delay", date: "2026-09-12", type: "milestone", lens: "business", actorId: "openai",
    title: { it: "OpenAI rinvia l'IPO almeno al 2027", en: "OpenAI pushes back its IPO" },
    summary: {
      it: "Sam Altman dichiara che OpenAI non si quoterà nel 2026, definendo l'attuale un momento poco adatto per un'offerta pubblica alla luce delle questioni di sicurezza.",
      en: "Sam Altman says OpenAI will not go public in 2026, calling the current moment an ill-advised one for an IPO given safety concerns.",
    },
    sourceLabel: { it: "Fortune", en: "Fortune" }, sourceUrl: "https://fortune.com/2026/09/12/sam-altman-openai-ipo-delay-ill-advised-moment-safety-concerns/",
  },
  {
    id: "h-2026-10-08-manus-500m", date: "2026-10-08", type: "spending", lens: "business",
    amountEur: 450000000,
    title: { it: "Manus raccoglie oltre 500 milioni di dollari", en: "Manus raises over $500 million" },
    summary: {
      it: "Butterfly Effect, società madre dell'agente IA Manus, annuncia un round di oltre 500 milioni di dollari guidato da Boyu Capital e IDG Capital.",
      en: "Butterfly Effect, parent of the Manus AI agent, announces a round of more than $500 million led by Boyu Capital and IDG Capital.",
    },
    sourceLabel: { it: "SiliconANGLE", en: "SiliconANGLE" }, sourceUrl: "https://siliconangle.com/2026/10/08/ai-agent-developer-manus-raises-500m-at-reported-4b-valuation/",
  },
  {
    id: "h-2026-10-20-openai-orchestra-bio", date: "2026-10-20", type: "milestone", lens: "business", actorId: "openai",
    title: { it: "OpenAI acquisisce Orchestra Bio", en: "OpenAI acquires Orchestra Bio" },
    summary: {
      it: "OpenAI annuncia l'acquisizione di Orchestra Bio, piattaforma che assiste le aziende biotech nella gestione dello sviluppo dei farmaci; i termini economici non sono stati resi noti.",
      en: "OpenAI announces the acquisition of Orchestra Bio, a platform that helps biopharma teams manage drug development; financial terms were not disclosed.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/openai-to-acquire-orchestra-bio/",
  },
  {
    id: "h-2026-10-26-anthropic-public-s1", date: "2026-10-26", type: "milestone", lens: "business", actorId: "anthropic",
    title: { it: "Anthropic deposita pubblicamente l'S-1 per il Nasdaq", en: "Anthropic files its public S-1 for the Nasdaq" },
    summary: {
      it: "Anthropic deposita pubblicamente presso la SEC il prospetto S-1 per la quotazione al Nasdaq Global Select Market con il ticker ANT; prezzo e numero di azioni non sono ancora indicati.",
      en: "Anthropic publicly files its Form S-1 with the SEC to list on the Nasdaq Global Select Market under the ticker ANT; price range and share count are not yet set.",
    },
    sourceLabel: { it: "CNBC", en: "CNBC" }, sourceUrl: "https://www.cnbc.com/2026/10/26/anthropic-ipo-live-updates-ai-s-1-filing.html",
  },
  {
    id: "h-2026-10-28-doj-hugging-face", date: "2026-10-28", type: "milestone", lens: "business", actorId: "nvidia",
    title: { it: "Il DOJ esamina l'acquisizione di Hugging Face", en: "DOJ reviews the Hugging Face deal" },
    summary: {
      it: "Il Dipartimento di Giustizia statunitense chiede informazioni sull'acquisizione di Hugging Face da parte di Nvidia, annunciata a settembre per 12,9 miliardi di dollari.",
      en: "The US Department of Justice seeks information on Nvidia's acquisition of Hugging Face, announced in September for $12.9 billion.",
    },
    sourceLabel: { it: "CNBC", en: "CNBC" }, sourceUrl: "https://www.cnbc.com/2026/10/28/doj-questions-nvidias-12point9-billion-hugging-face-deal.html",
  },
];
