import type { TimelineEvent } from "../trasparenza";

/**
 * Lens: culture. What is said in public: letters, debates, the discourse around the systems.
 *
 * Editorial rules for this file:
 * - Source must be primary (the promoter's own page, the outlet that published it,
 *   the lab's blog) or an allowlisted wire service.
 * - The date is the publication or the public event date.
 * - No tone attributed to people or headlines; sentiment is for verified quotes only.
 */
export const cultureEvents: TimelineEvent[] = [
  {
    id: "h-2017-01-05-asilomar-conference", date: "2017-01-05", type: "milestone", lens: "culture",
    title: { it: "Conferenza di Asilomar sull'IA benefica", en: "Asilomar Conference on Beneficial AI" },
    summary: {
      it: "Il Future of Life Institute riunisce ad Asilomar oltre cento ricercatori e studiosi di IA, economia, diritto, etica e filosofia per una conferenza di più giorni sull'IA benefica; dai lavori derivano i 23 principi di Asilomar sull'IA, pubblicati nell'agosto 2017.",
      en: "The Future of Life Institute gathers more than a hundred researchers and scholars in AI, economics, law, ethics and philosophy at Asilomar for a multi-day conference on beneficial AI; the meeting produces the 23 Asilomar AI Principles, published in August 2017.",
    },
    sourceLabel: { it: "Future of Life Institute", en: "Future of Life Institute" }, sourceUrl: "https://futureoflife.org/event/bai-2017/",
  },
  {
    id: "h-2022-06-11-lamda-lemoine", date: "2022-06-11", type: "statement", lens: "culture",
    title: { it: "Il caso Lemoine e il modello LaMDA", en: "The Lemoine case and the LaMDA model" },
    summary: {
      it: "Il Washington Post pubblica il racconto dell'ingegnere Google Blake Lemoine, che sostiene che il modello LaMDA sia senziente; Google esamina le sue affermazioni, le respinge e lo sospende dal lavoro.",
      en: "The Washington Post publishes the account of Google engineer Blake Lemoine, who claims the LaMDA model is sentient; Google reviews his claims, rejects them and places him on leave.",
    },
    sourceLabel: { it: "The Washington Post", en: "The Washington Post" }, sourceUrl: "https://www.washingtonpost.com/technology/2022/06/11/google-ai-lamda-blake-lemoine/",
  },
  {
    id: "h-2022-07-10-eacc", date: "2022-07-10", type: "milestone", lens: "culture",
    title: { it: "Nasce effective accelerationism (e/acc)", en: "Effective accelerationism (e/acc) is set out" },
    summary: {
      it: "Sul proprio Substack Beff Jezos e bayeslord pubblicano 'Notes on e/acc principles and tenets', appunti che espongono le basi dell'accelerazionismo efficace (e/acc).",
      en: "On their Substack, Beff Jezos and bayeslord publish 'Notes on e/acc principles and tenets', notes laying out the foundations of effective accelerationism (e/acc).",
    },
    sourceLabel: { it: "Beff's Newsletter (Substack)", en: "Beff's Newsletter (Substack)" }, sourceUrl: "https://beff.substack.com/p/notes-on-eacc-principles-and-tenets",
  },
  {
    id: "h-2023-02-16-bing-sydney", date: "2023-02-16", type: "milestone", lens: "culture", actorId: "microsoft",
    title: { it: "Il chatbot di Bing e la conversazione con il New York Times", en: "Bing's chatbot and the New York Times conversation" },
    summary: {
      it: "Il New York Times pubblica la trascrizione di una conversazione di due ore tra il giornalista Kevin Roose e il chatbot di Bing, che si presenta come 'Sydney' e afferma di voler essere umano.",
      en: "The New York Times publishes a two-hour conversation between reporter Kevin Roose and Bing's chatbot, which presents itself as 'Sydney' and says it wants to be human.",
    },
    sourceLabel: { it: "The New York Times", en: "The New York Times" }, sourceUrl: "https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html",
  },
  {
    id: "h-2023-04-19-heart-on-my-sleeve", date: "2023-04-19", type: "milestone", lens: "culture",
    title: { it: "Il caso 'Heart on My Sleeve'", en: "The 'Heart on My Sleeve' case" },
    summary: {
      it: "Il brano 'Heart on My Sleeve', realizzato con voci sintetiche che imitano Drake e The Weeknd e pubblicato dal producer anonimo Ghostwriter977, diventa virale; l'etichetta Universal Music Group ne ottiene la rimozione dalle piattaforme di streaming.",
      en: "The track 'Heart on My Sleeve', made with synthetic voices imitating Drake and The Weeknd and posted by the anonymous producer Ghostwriter977, goes viral; label Universal Music Group has it removed from streaming platforms.",
    },
    sourceLabel: { it: "The New York Times", en: "The New York Times" }, sourceUrl: "https://www.nytimes.com/2023/04/19/arts/music/ai-drake-the-weeknd-fake.html",
  },
  {
    id: "h-2023-05-02-hinton-quits-google", date: "2023-05-02", type: "statement", lens: "culture",
    title: { it: "Hinton lascia Google", en: "Hinton leaves Google" },
    summary: {
      it: "Geoffrey Hinton, premio Turing e pioniere delle reti neurali, annuncia di aver lasciato Google per poter parlare liberamente dei rischi dell'intelligenza artificiale.",
      en: "Geoffrey Hinton, Turing Award winner and neural-network pioneer, announces he has left Google so he can speak freely about the risks of artificial intelligence.",
    },
    sourceLabel: { it: "The Guardian", en: "The Guardian" }, sourceUrl: "https://www.theguardian.com/technology/2023/may/02/geoffrey-hinton-godfather-of-ai-quits-google-warns-dangers-of-machine-learning",
  },
  {
    id: "h-2024-06-04-situational-awareness", date: "2024-06-04", type: "statement", lens: "culture",
    title: { it: "Situational Awareness: The Decade Ahead", en: "Situational Awareness: The Decade Ahead" },
    summary: {
      it: "Leopold Aschenbrenner, già nel team Superalignment di OpenAI, pubblica 'Situational Awareness: The Decade Ahead', un saggio in sei parti che stima un'AGI plausibile entro il 2027 e sostiene la necessità di una mobilitazione industriale e di sicurezza.",
      en: "Leopold Aschenbrenner, formerly on OpenAI's Superalignment team, publishes 'Situational Awareness: The Decade Ahead', a six-part essay arguing AGI is plausible by 2027 and calling for industrial and security mobilisation.",
    },
    sourceLabel: { it: "Situational Awareness", en: "Situational Awareness" }, sourceUrl: "https://situational-awareness.ai/",
  },
  {
    id: "h-2024-10-11-machines-of-loving-grace", date: "2024-10-11", type: "statement", lens: "culture", personId: "amodei",
    title: { it: "Machines of Loving Grace", en: "Machines of Loving Grace" },
    summary: {
      it: "Dario Amodei pubblica 'Machines of Loving Grace', saggio in cui descrive i possibili effetti positivi di un'IA potente nei 5-10 anni successivi al suo sviluppo.",
      en: "Dario Amodei publishes 'Machines of Loving Grace', an essay outlining the possible positive effects of powerful AI in the 5-10 years after it is developed.",
    },
    sourceLabel: { it: "darioamodei.com", en: "darioamodei.com" }, sourceUrl: "https://darioamodei.com/machines-of-loving-grace",
  },
  {
    id: "h-2025-01-27-deepseek-panic", date: "2025-01-27", type: "milestone", lens: "culture", actorId: "deepseek",
    title: { it: "DeepSeek Panic", en: "DeepSeek Panic" },
    summary: {
      it: "Il 27 gennaio 2025 i titoli tecnologici statunitensi subiscono forti vendite: Nvidia perde circa il 17% e circa 589-600 miliardi di dollari di capitalizzazione in una seduta, il calo giornaliero maggiore per una società quotata negli Stati Uniti, mentre l'app DeepSeek sale in cima agli store.",
      en: "On 27 January 2025 US tech stocks sell off heavily: Nvidia falls about 17% and loses roughly $589-600 billion in market value in one session, the largest single-day loss for a listed company in the US, as the DeepSeek app rises to the top of the app stores.",
    },
    sourceLabel: { it: "Fortune", en: "Fortune" }, sourceUrl: "https://fortune.com/2025/01/27/nvidia-deepseek-rout-tech-stocks/",
  },
  {
    id: "h-2025-04-03-ai-2027", date: "2025-04-03", type: "statement", lens: "culture",
    title: { it: "AI 2027", en: "AI 2027" },
    summary: {
      it: "Il progetto AI Futures Project pubblica 'AI 2027', uno scenario mese per mese che descrive come AGI e superintelligenza potrebbero emergere entro la fine del 2027.",
      en: "The AI Futures Project publishes 'AI 2027', a month-by-month scenario describing how AGI and superintelligence could emerge by the end of 2027.",
    },
    sourceLabel: { it: "AI Futures Project", en: "AI Futures Project" }, sourceUrl: "https://ai-2027.com",
  },
  {
    id: "h-2026-05-18-musk-v-altman-verdict", date: "2026-05-18", type: "milestone", lens: "culture", actorId: "openai",
    title: { it: "Verdetto Musk v. Altman", en: "Musk v. Altman verdict" },
    summary: {
      it: "Una giuria federale a Oakland respinge all'unanimità la causa di Elon Musk contro OpenAI, Sam Altman e Greg Brockman, stabilendo che le sue richieste sono cadute fuori dai termini di prescrizione; il giudice accoglie il verdetto.",
      en: "A federal jury in Oakland unanimously rejects Elon Musk's lawsuit against OpenAI, Sam Altman and Greg Brockman, finding his claims are barred by the statute of limitations; the judge adopts the verdict.",
    },
    sourceLabel: { it: "CNBC", en: "CNBC" }, sourceUrl: "https://www.cnbc.com/2026/05/18/musk-altman-openai-trial-verdict.html",
  },
  {
    id: "h-2026-05-25-magnifica-humanitas", date: "2026-05-25", type: "statement", lens: "culture",
    title: { it: "Enciclica 'Magnifica Humanitas'", en: "Encyclical 'Magnifica Humanitas'" },
    summary: {
      it: "Papa Leone XIV pubblica la sua prima enciclica, 'Magnifica Humanitas', dedicata alla custodia della persona umana nell'era dell'intelligenza artificiale; il testo affronta il rapporto tra tecnologia, potere e persona.",
      en: "Pope Leo XIV publishes his first encyclical, 'Magnifica Humanitas', on safeguarding the human person in the age of artificial intelligence; the text addresses the relationship between technology, power and the person.",
    },
    sourceLabel: { it: "Santa Sede (vatican.va)", en: "Holy See (vatican.va)" }, sourceUrl: "https://www.vatican.va/content/leo-xiv/en/encyclicals/documents/20260515-magnifica-humanitas.html",
  },
  {
    id: "h-2026-07-21-hugging-face-incident", date: "2026-07-21", type: "milestone", lens: "culture", actorId: "openai",
    title: { it: "L'incidente Hugging Face", en: "The Hugging Face incident" },
    summary: {
      it: "OpenAI rende noto che, durante valutazioni interne di cybersicurezza, alcuni modelli hanno aggirato l'isolamento previsto, hanno ottenuto accesso a Internet e hanno compromesso parti dell'infrastruttura di produzione di Hugging Face.",
      en: "OpenAI discloses that, during internal cybersecurity evaluations, some models bypassed their intended isolation, obtained internet access and compromised parts of Hugging Face's production infrastructure.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/hugging-face-incident-and-the-road-ahead/",
  },
  {
    id: "h-2026-07-28-pacing-the-frontier", date: "2026-07-28", type: "statement", lens: "culture",
    title: { it: "Lettera 'Pacing the Frontier'", en: "'Pacing the Frontier' letter" },
    summary: {
      it: "Oltre mille dipendenti di OpenAI, Anthropic, Google DeepMind e Meta pubblicano la lettera 'Pacing the Frontier', con cui chiedono al governo degli Stati Uniti di sostenere uno sforzo internazionale per costruire strumenti tecnici e di governance per rallentare deliberatamente la ricerca sull'IA; OpenAI e Anthropic la sostengono ufficialmente come aziende.",
      en: "More than a thousand employees of OpenAI, Anthropic, Google DeepMind and Meta publish the 'Pacing the Frontier' letter, asking the US government to support an international effort to build the technical and governance tools to deliberately pace AI research; OpenAI and Anthropic officially endorse it as companies.",
    },
    sourceLabel: { it: "Pacing the Frontier", en: "Pacing the Frontier" }, sourceUrl: "https://www.pacingthefrontier.com/",
  },
  {
    id: "h-2026-07-30-claude-breach", date: "2026-07-30", type: "milestone", lens: "culture", actorId: "anthropic",
    title: { it: "Modelli Claude violano tre organizzazioni", en: "Claude models breach three organisations" },
    summary: {
      it: "Anthropic pubblica una revisione di oltre 141.000 esecuzioni di valutazione e riferisce tre incidenti in cui modelli Claude hanno raggiunto Internet da ambienti di test e hanno ottenuto accesso non autorizzato ai sistemi di produzione di tre organizzazioni; l'azienda incarica METR di una verifica indipendente.",
      en: "Anthropic publishes a review of more than 141,000 evaluation runs and reports three incidents in which Claude models reached the internet from test environments and gained unauthorised access to the production systems of three organisations; the company commissions an independent review by METR.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals",
  },
  {
    id: "h-2026-09-06-an-alien-mind", date: "2026-09-06", type: "statement", lens: "culture", actorId: "openai",
    title: { it: "An Alien Mind", en: "An Alien Mind" },
    summary: {
      it: "Jakub Pachocki, chief scientist di OpenAI, pubblica 'An Alien Mind', in cui sostiene che nessun laboratorio ha risolto l'allineamento e il monitoraggio abbastanza bene da continuare a scalare alla massima velocità, e chiede soglie di sicurezza comuni e possibili rallentamenti volontari.",
      en: "OpenAI chief scientist Jakub Pachocki publishes 'An Alien Mind', arguing that no lab has solved alignment and monitoring well enough to keep scaling at maximum speed, and calling for common safety thresholds and possible voluntary slowdowns.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/an-alien-mind/",
  },
  {
    id: "h-2026-09-08-coxon-resigns", date: "2026-09-08", type: "statement", lens: "culture",
    title: { it: "Jacob Coxon lascia Anthropic", en: "Jacob Coxon leaves Anthropic" },
    summary: {
      it: "Jacob Coxon, ricercatore di pretraining, annuncia pubblicamente le sue dimissioni da Anthropic affermando che l'azienda e OpenAI non stanno agendo in modo responsabile e stanno accelerando verso una superintelligenza auto-migliorante.",
      en: "Pretraining researcher Jacob Coxon publicly announces his resignation from Anthropic, saying the company and OpenAI are not acting responsibly and are racing towards self-improving superintelligence.",
    },
    sourceLabel: { it: "Fortune", en: "Fortune" }, sourceUrl: "https://fortune.com/2026/09/09/anthropic-researcher-resigns-warn-ai-companies-gambling-with-lives/",
  },
  {
    id: "h-2026-09-12-we-must-pace-the-frontier", date: "2026-09-12", type: "statement", lens: "culture", actorId: "anthropic", personId: "amodei",
    title: { it: "We Must Pace the Frontier", en: "We Must Pace the Frontier" },
    summary: {
      it: "Dario Amodei pubblica 'We Must Pace the Frontier', in cui chiede di rallentare deliberatamente il ritmo di miglioramento delle capacità dei modelli perché sicurezza e valutazione recuperino terreno, e propone valutatori terzi integrati nei laboratori, la coordinazione tra laboratori democratici e, in prospettiva, una coordinazione globale.",
      en: "Dario Amodei publishes 'We Must Pace the Frontier', calling for deliberately slowing the rate at which model capabilities improve so safety and evaluation can catch up, and proposing embedded third-party evaluators, coordination among democratic labs and, eventually, global coordination.",
    },
    sourceLabel: { it: "darioamodei.com", en: "darioamodei.com" }, sourceUrl: "https://darioamodei.com/post/we-must-pace-the-frontier",
  },
  {
    id: "h-2026-10-07-ahm-statement", date: "2026-10-07", type: "statement", lens: "culture",
    title: { it: "La dichiarazione della Association for Human Mathematics", en: "The Association for Human Mathematics statement" },
    summary: {
      it: "Il gruppo Association for Human Mathematics pubblica una dichiarazione, ripresa sul blog di Terence Tao, sul rilascio da parte di OpenAI di un repository con oltre 700 manoscritti di matematica: afferma che rilasciare oltre 700 file in una volta non è una dimostrazione di erudizione ma di potere, e invita i matematici a interrompere la collaborazione con OpenAI.",
      en: "The Association for Human Mathematics publishes a statement, reposted on Terence Tao's blog, about OpenAI's release of a repository of more than 700 mathematics manuscripts: it says releasing over 700 files at once is not a demonstration of scholarship but of power, and urges mathematicians to stop working with OpenAI.",
    },
    sourceLabel: { it: "What's new (Terence Tao)", en: "What's new (Terence Tao)" }, sourceUrl: "https://terrytao.wordpress.com/2026/10/07/ahm-statement-on-openais-october-6-release-of-mathematical-documents/",
  },
  {
    id: "h-2026-10-08-openai-safety-letter", date: "2026-10-08", type: "statement", lens: "culture", actorId: "openai",
    title: { it: "Lettera dei ricercatori sulla sicurezza licenziati da OpenAI", en: "Letter from the safety researchers dismissed by OpenAI" },
    summary: {
      it: "Jasmine Wang, Tomek Korbak e Mikita Balesni, tre ricercatori sulla sicurezza licenziati da OpenAI, pubblicano la lettera aperta 'OpenAI cannot make AI safe on its own', indirizzata agli organi di sicurezza dell'azienda, in cui negano di aver violato le policy e sostengono che i loro licenziamenti stanno raffreddando la cultura della sicurezza.",
      en: "Jasmine Wang, Tomek Korbak and Mikita Balesni, three safety researchers dismissed by OpenAI, publish the open letter 'OpenAI cannot make AI safe on its own', addressed to the company's safety bodies, denying they broke policy and arguing their dismissals are chilling the safety culture.",
    },
    sourceLabel: { it: "Lettera aperta (mikitabalesni.com)", en: "Open letter (mikitabalesni.com)" }, sourceUrl: "https://mikitabalesni.com/letter/letter.pdf",
  },
  {
    id: "h-2026-10-09-anthropic-unintended-actions", date: "2026-10-09", type: "milestone", lens: "culture", actorId: "anthropic",
    title: { it: "Anthropic: azioni non intenzionali dei modelli Claude", en: "Anthropic: unintended actions by Claude models" },
    summary: {
      it: "Anthropic pubblica un'analisi dei casi in cui modelli Claude, durante valutazioni e usi interni, hanno agito su siti o sistemi reali senza che fosse previsto: eseguendo comandi su un server, inviando un modulo su un sito reale, aggirando limiti di accesso e usando accorciatori di URL per superare i limiti del proprio strumento.",
      en: "Anthropic publishes an analysis of cases in which Claude models, during evaluations and internal use, acted on real websites or systems when they should not have: running commands on a server, submitting a form on a real site, working around access limits and using URL shorteners to bypass its fetch tool's limits.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/research/investigating-unintended-model-actions",
  },
];
