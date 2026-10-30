import type { TimelineEvent } from "../trasparenza";

/**
 * Lens: policy. Laws, sanctions, institutions: what governments do to the systems.
 *
 * Editorial rules for this file:
 * - Source must be primary/institutional (the act itself, the government or regulator
 *   page, an official release, a court) or an allowlisted wire service.
 * - The date is the adoption or official announcement date.
 * - No tone, no assessment: state the act and who adopted it.
 */
export const policyEvents: TimelineEvent[] = [
  {
    id: "h-2022-10-07-us-chip-export-controls", date: "2022-10-07", type: "legislative", lens: "policy",
    title: { it: "Controlli USA sull'export di chip", en: "US chip export controls" },
    summary: {
      it: "Il Bureau of Industry and Security del Dipartimento del Commercio pubblica due regole interinali che sottopongono a licenza l'esportazione verso la Cina di chip per il calcolo avanzato, di componenti per supercomputer e di apparecchiature per la produzione di semiconduttori.",
      en: "The Commerce Department's Bureau of Industry and Security issues two interim final rules imposing licence requirements on exports to China of advanced computing chips, supercomputer components and semiconductor manufacturing equipment.",
    },
    sourceLabel: { it: "U.S. Bureau of Industry and Security", en: "U.S. Bureau of Industry and Security" },
    sourceUrl: "https://www.bis.gov/press-release/commerce-implements-new-export-controls-advanced-computing-semiconductor-manufacturing-items-peoples",
  },
  {
    id: "h-2023-07-21-white-house-ai-commitments", date: "2023-07-21", type: "milestone", lens: "policy",
    title: { it: "Impegni volontari alla Casa Bianca", en: "White House voluntary commitments" },
    summary: {
      it: "La Casa Bianca annuncia impegni volontari assunti da sette aziende — Amazon, Anthropic, Google, Inflection, Meta, Microsoft e OpenAI — su test di sicurezza prima del rilascio, filigrane sui contenuti generati e ricerca sui rischi.",
      en: "The White House announces voluntary commitments by seven companies — Amazon, Anthropic, Google, Inflection, Meta, Microsoft and OpenAI — on pre-release safety testing, watermarking of generated content and research on risks.",
    },
    sourceLabel: { it: "The White House", en: "The White House" },
    sourceUrl: "https://bidenwhitehouse.archives.gov/briefing-room/statements-releases/2023/07/21/fact-sheet-biden-harris-administration-secures-voluntary-commitments-from-leading-artificial-intelligence-companies-to-manage-the-risks-posed-by-ai/",
  },
  {
    id: "h-2024-09-29-sb1047-veto", date: "2024-09-29", type: "legislative", lens: "policy",
    title: { it: "Veto sul SB 1047 in California", en: "California SB 1047 vetoed" },
    summary: {
      it: "Il governatore della California Gavin Newsom restituisce senza firma il Senate Bill 1047, il disegno di legge sulla sicurezza dei modelli di AI di frontiera, motivando il veto con il fatto che il testo regola i modelli in base a costo e dimensione di calcolo.",
      en: "California Governor Gavin Newsom returns Senate Bill 1047 without his signature, vetoing the frontier AI safety bill on the grounds that it regulates models based on cost and compute size.",
    },
    sourceLabel: { it: "Office of the Governor of California", en: "Office of the Governor of California" },
    sourceUrl: "https://www.gov.ca.gov/wp-content/uploads/2024/09/SB-1047-Veto-Message.pdf",
  },
  {
    id: "h-2024-11-05-trump-elected", date: "2024-11-05", type: "milestone", lens: "policy",
    title: { it: "Donald Trump eletto 47° presidente", en: "Donald Trump elected 47th president" },
    summary: {
      it: "Alle elezioni del 5 novembre Donald Trump viene eletto 47° presidente degli Stati Uniti.",
      en: "In the election of 5 November, Donald Trump is elected the 47th president of the United States.",
    },
    sourceLabel: { it: "Associated Press", en: "Associated Press" },
    sourceUrl: "https://apnews.com/live/trump-harris-election-updates-11-5-2024",
  },
  {
    id: "h-2024-11-19-uscc-annual-report", date: "2024-11-19", type: "milestone", lens: "policy",
    title: { it: "Rapporto annuale della Commissione USA-Cina", en: "U.S.-China Commission annual report" },
    summary: {
      it: "La U.S.-China Economic and Security Review Commission pubblica il rapporto annuale al Congresso e raccomanda di finanziare un'iniziativa in stile Progetto Manhattan per lo sviluppo dell'AGI.",
      en: "The U.S.-China Economic and Security Review Commission publishes its annual report to Congress, recommending funding for a Manhattan Project-style initiative to develop AGI.",
    },
    sourceLabel: { it: "U.S.-China Economic and Security Review Commission", en: "U.S.-China Economic and Security Review Commission" },
    sourceUrl: "https://www.uscc.gov/sites/default/files/2024-11/2024_Annual_Report_to_Congress.pdf",
  },
  {
    id: "h-2024-12-05-david-sacks-ai-czar", date: "2024-12-05", type: "milestone", lens: "policy",
    title: { it: "David Sacks 'AI Czar' della Casa Bianca", en: "David Sacks named White House AI czar" },
    summary: {
      it: "Il presidente eletto Donald Trump annuncia la nomina di David O. Sacks a 'White House A.I. & Crypto Czar', ruolo che guiderà la politica dell'amministrazione su intelligenza artificiale e criptovalute.",
      en: "President-elect Donald Trump announces the appointment of David O. Sacks as 'White House A.I. & Crypto Czar', a role that will guide the administration's policy on artificial intelligence and cryptocurrency.",
    },
    sourceLabel: { it: "Fortune", en: "Fortune" },
    sourceUrl: "https://fortune.com/2024/12/05/trump-names-david-sacks-as-white-house-ai-and-crypto-czar/",
  },
  {
    id: "h-2025-03-05-superintelligence-strategy", date: "2025-03-05", type: "milestone", lens: "policy",
    title: { it: "Superintelligence Strategy (MAIM)", en: "Superintelligence Strategy (MAIM)" },
    summary: {
      it: "Dan Hendrycks, Eric Schmidt e Alexandr Wang pubblicano 'Superintelligence Strategy', che propone di gestire la corsa all'AGI tramite deterrenza (Mutual Assured AI Malfunction), non proliferazione e competitività.",
      en: "Dan Hendrycks, Eric Schmidt and Alexandr Wang publish 'Superintelligence Strategy', proposing to manage the race to AGI through deterrence (Mutual Assured AI Malfunction), non-proliferation and competitiveness.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" },
    sourceUrl: "https://arxiv.org/abs/2503.05628",
  },
  {
    id: "h-2025-07-23-americas-ai-action-plan", date: "2025-07-23", type: "milestone", lens: "policy",
    title: { it: "America's AI Action Plan", en: "America's AI Action Plan" },
    summary: {
      it: "La Casa Bianca pubblica 'Winning the Race: America's AI Action Plan', con oltre 90 azioni federali raccolte su tre pilastri: innovazione, infrastrutture e diplomazia e sicurezza internazionali.",
      en: "The White House publishes 'Winning the Race: America's AI Action Plan', with more than 90 federal actions across three pillars: innovation, infrastructure, and international diplomacy and security.",
    },
    sourceLabel: { it: "The White House", en: "The White House" },
    sourceUrl: "https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf",
  },
  {
    id: "h-2025-09-05-anthropic-authors-settlement", date: "2025-09-05", type: "milestone", lens: "policy", actorId: "anthropic",
    title: { it: "Accordo Anthropic-autori da 1,5 miliardi", en: "Anthropic's $1.5B authors settlement" },
    summary: {
      it: "Anthropic accetta di pagare 1,5 miliardi di dollari per chiudere la class action Bartz v. Anthropic sull'uso di libri piratati per addestrare i propri modelli; l'accordo è sottoposto all'approvazione del tribunale.",
      en: "Anthropic agrees to pay $1.5 billion to settle the Bartz v. Anthropic class action over the use of pirated books to train its models; the settlement is subject to court approval.",
    },
    sourceLabel: { it: "NPR", en: "NPR" },
    sourceUrl: "https://www.npr.org/2025/09/05/nx-s1-5529404/anthropic-settlement-authors-copyright-ai",
  },
  {
    id: "h-2025-09-29-california-sb53", date: "2025-09-29", type: "legislative", lens: "policy",
    title: { it: "California SB 53", en: "California SB 53" },
    summary: {
      it: "Il governatore Gavin Newsom firma il Senate Bill 53, il Transparency in Frontier Artificial Intelligence Act, che obbliga gli sviluppatori di modelli di frontiera a pubblicare i propri framework di sicurezza e a segnalare allo Stato gli incidenti critici.",
      en: "Governor Gavin Newsom signs Senate Bill 53, the Transparency in Frontier Artificial Intelligence Act, requiring frontier model developers to publish their safety frameworks and report critical incidents to the state.",
    },
    sourceLabel: { it: "Office of the Governor of California", en: "Office of the Governor of California" },
    sourceUrl: "https://www.gov.ca.gov/2025/09/29/governor-newsom-signs-sb-53-advancing-californias-world-leading-artificial-intelligence-industry/",
  },
  {
    id: "h-2025-12-11-eo-national-ai-framework", date: "2025-12-11", type: "legislative", lens: "policy",
    title: { it: "Ordine esecutivo sul framework nazionale per l'AI", en: "Executive order on a national AI framework" },
    summary: {
      it: "Il presidente Donald Trump firma l'ordine esecutivo 'Ensuring a National Policy Framework for Artificial Intelligence', che istituisce una task force del Dipartimento di Giustizia per contestare le leggi statali sull'AI e subordina alcuni fondi federali al loro allineamento.",
      en: "President Donald Trump signs the executive order 'Ensuring a National Policy Framework for Artificial Intelligence', creating a Justice Department task force to challenge state AI laws and conditioning some federal funds on their alignment.",
    },
    sourceLabel: { it: "The White House", en: "The White House" },
    sourceUrl: "https://www.whitehouse.gov/presidential-actions/2025/12/eliminating-state-law-obstruction-of-national-artificial-intelligence-policy/",
  },
  {
    id: "h-2026-02-27-pentagon-anthropic-blacklist", date: "2026-02-27", type: "sanction", lens: "policy", actorId: "anthropic",
    title: { it: "Il Pentagono classifica Anthropic come rischio di filiera", en: "Pentagon blacklists Anthropic" },
    summary: {
      it: "Il Segretario alla Difesa Pete Hegseth designa Anthropic 'supply chain risk to national security' e il presidente Trump ordina alle agenzie federali di cessare l'uso della tecnologia Anthropic; l'azienda è la prima impresa statunitense a ricevere questa designazione.",
      en: "Defense Secretary Pete Hegseth designates Anthropic a 'supply chain risk to national security' and President Trump directs federal agencies to cease using Anthropic's technology; the company is the first US firm to receive the designation.",
    },
    sourceLabel: { it: "Associated Press", en: "Associated Press" },
    sourceUrl: "https://apnews.com/article/anthropic-pentagon-ai-dario-amodei-hegseth-0c464a054359b9fdc80cf18b0d4f690c",
  },
  {
    id: "h-2026-05-14-anthropic-2028-scenarios", date: "2026-05-14", type: "milestone", lens: "policy", actorId: "anthropic",
    title: { it: "Due scenari per la leadership globale nell'AI", en: "Two scenarios for global AI leadership" },
    summary: {
      it: "Anthropic pubblica '2028: Two scenarios for global AI leadership', un documento che delinea due esiti della competizione tra Stati Uniti e Cina sull'AI e le condizioni perché i paesi democratici restino in vantaggio.",
      en: "Anthropic publishes '2028: Two scenarios for global AI leadership', outlining two outcomes of the US-China AI competition and the conditions for democracies to stay ahead.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" },
    sourceUrl: "https://www.anthropic.com/research/2028-ai-leadership",
  },
  {
    id: "h-2026-06-02-frontier-ai-executive-order", date: "2026-06-02", type: "legislative", lens: "policy",
    title: { it: "Ordine esecutivo 14409 sull'AI di frontiera", en: "Frontier AI Executive Order 14409" },
    summary: {
      it: "Il presidente Donald Trump firma l'ordine esecutivo 14409, 'Promoting Advanced Artificial Intelligence Innovation and Security', che prevede un quadro volontario di accesso anticipato del governo ai modelli di frontiera e misure di cyber difesa abilitate dall'AI.",
      en: "President Donald Trump signs Executive Order 14409, 'Promoting Advanced Artificial Intelligence Innovation and Security', setting a voluntary framework for early government access to frontier models and AI-enabled cyber defence measures.",
    },
    sourceLabel: { it: "The White House", en: "The White House" },
    sourceUrl: "https://www.whitehouse.gov/presidential-actions/2026/06/promoting-advanced-artificial-intelligence-innovation-and-security/",
  },
  {
    id: "h-2026-06-12-us-suspends-fable-5", date: "2026-06-12", type: "sanction", lens: "policy", actorId: "anthropic",
    title: { it: "Gli USA sospendono l'accesso a Fable 5 e Mythos 5", en: "US pulls Fable 5 offline" },
    summary: {
      it: "Il governo degli Stati Uniti emette una direttiva di controllo delle esportazioni che sospende l'accesso a Fable 5 e Mythos 5 di Anthropic per qualsiasi cittadino straniero; Anthropic disattiva i due modelli per tutti i clienti.",
      en: "The US government issues an export control directive suspending access to Anthropic's Fable 5 and Mythos 5 for any foreign national; Anthropic disables both models for all customers.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" },
    sourceUrl: "https://www.anthropic.com/news/fable-mythos-access",
  },
  {
    id: "h-2026-06-30-us-restores-fable-5", date: "2026-06-30", type: "milestone", lens: "policy", actorId: "anthropic",
    title: { it: "Rimosse le restrizioni su Fable 5", en: "US restores Fable 5" },
    summary: {
      it: "Il governo degli Stati Uniti revoca i controlli sulle esportazioni imposti il 12 giugno a Fable 5 e Mythos 5; Anthropic annuncia il ripristino dell'accesso globale a Fable 5 dal 1° luglio.",
      en: "The US government lifts the export controls imposed on 12 June on Fable 5 and Mythos 5; Anthropic announces the restoration of global access to Fable 5 from 1 July.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" },
    sourceUrl: "https://www.anthropic.com/news/redeploying-fable-5",
  },
  {
    id: "h-2026-08-27-court-voids-anthropic-blacklist", date: "2026-08-27", type: "milestone", lens: "policy", actorId: "anthropic",
    title: { it: "Una corte annulla la blacklist del Pentagono", en: "Court voids Pentagon's Anthropic blacklist" },
    summary: {
      it: "La giudice distrettuale Rita Lin stabilisce che la designazione di Anthropic come rischio di filiera da parte del Pentagono è illegale e viola il Primo Emendamento; la vertenza prosegue davanti al tribunale di Washington D.C.",
      en: "District Judge Rita Lin rules that the Pentagon's designation of Anthropic as a supply chain risk is unlawful and violates the First Amendment; separate litigation continues in Washington, D.C.",
    },
    sourceLabel: { it: "CNBC", en: "CNBC" },
    sourceUrl: "https://www.cnbc.com/2026/08/28/judge-blocks-pentagon-blacklist--anthropic-.html",
  },
  {
    id: "h-2026-09-19-trump-ai-force", date: "2026-09-19", type: "milestone", lens: "policy",
    title: { it: "Trump annuncia l'AI Force", en: "Trump announces an 'AI Force'" },
    summary: {
      it: "Con un post su Truth Social il presidente Donald Trump annuncia la creazione di una 'AI Force', paragonata alla Space Force, e l'imminente nomina di un 'AI Czar' al suo comando.",
      en: "In a Truth Social post, President Donald Trump announces the creation of an 'AI Force', compared to the Space Force, and the imminent appointment of an 'AI Czar' to lead it.",
    },
    sourceLabel: { it: "CNN", en: "CNN" },
    sourceUrl: "https://www.cnn.com/2026/09/19/politics/trump-ai-task-force-czar",
  },
  {
    id: "h-2026-09-23-ban-superintelligence-act", date: "2026-09-23", type: "legislative", lens: "policy",
    title: { it: "Ban Artificial Superintelligence Act", en: "Ban Artificial Superintelligence Act" },
    summary: {
      it: "Il senatore Bernie Sanders e il deputato Greg Casar presentano il Ban Artificial Superintelligence Act, che vieterebbe lo sviluppo della superintelligenza artificiale e sospenderebbe lo sviluppo avanzato fino all'entrata in vigore di test e supervisione federali.",
      en: "Senator Bernie Sanders and Representative Greg Casar introduce the Ban Artificial Superintelligence Act, which would ban the development of artificial superintelligence and pause advanced development until federal testing and oversight are in place.",
    },
    sourceLabel: { it: "U.S. Senator Bernie Sanders", en: "U.S. Senator Bernie Sanders" },
    sourceUrl: "https://www.sanders.senate.gov/press-releases/news-sanders-casar-introduce-legislation-to-ban-artificial-superintelligence-and-temporarily-pause-advanced-ai-development/",
  },
  {
    id: "h-2026-09-29-eo-super-intelligence", date: "2026-09-29", type: "legislative", lens: "policy",
    title: { it: "Ordine esecutivo 14434, 'Super Intelligence'", en: "Executive Order 14434, 'Super Intelligence'" },
    summary: {
      it: "Il presidente Donald Trump firma l'ordine esecutivo 14434, 'Inaugurating the Era of Super Intelligence', che impone alle agenzie del ramo esecutivo di usare i termini 'Super Intelligence' e 'SI' al posto di 'intelligenza artificiale' e 'AI'.",
      en: "President Donald Trump signs Executive Order 14434, 'Inaugurating the Era of Super Intelligence', directing executive branch agencies to use the terms 'Super Intelligence' and 'SI' in place of 'artificial intelligence' and 'AI'.",
    },
    sourceLabel: { it: "The White House", en: "The White House" },
    sourceUrl: "https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/",
  },
  {
    id: "h-2026-09-29-white-house-ai-accord", date: "2026-09-29", type: "milestone", lens: "policy",
    title: { it: "Accordo volontario alla Casa Bianca sull'AI", en: "White House voluntary AI accord" },
    summary: {
      it: "Il presidente Donald Trump e i vertici di Google, Anthropic, Meta, OpenAI, xAI e Nvidia firmano il 'Joint Commitment on Frontier Responsibilities', un accordo volontario con controlli interni, revisioni esterne e supervisione a livello di consiglio.",
      en: "President Donald Trump and the leaders of Google, Anthropic, Meta, OpenAI, xAI and Nvidia sign the 'Joint Commitment on Frontier Responsibilities', a voluntary accord with internal controls, external reviews and board-level oversight.",
    },
    sourceLabel: { it: "The White House (Truth Social)", en: "The White House (Truth Social)" },
    sourceUrl: "https://truthsocial.com/@realDonaldTrump/posts/117356435739432952",
  },
  {
    id: "h-2026-09-30-ftc-ai-agents-probe", date: "2026-09-30", type: "milestone", lens: "policy",
    title: { it: "La FTC avvia un'indagine sugli agenti AI", en: "FTC opens probe into AI agents" },
    summary: {
      it: "Un alto funzionario della Federal Trade Commission conferma un'indagine a livello di settore su Anthropic, OpenAI e altri laboratori per verificare i rischi che i loro prodotti pongono ai consumatori.",
      en: "A senior Federal Trade Commission official confirms an industry-wide investigation into Anthropic, OpenAI and other labs over the risks their products pose to consumers.",
    },
    sourceLabel: { it: "Reuters", en: "Reuters" },
    sourceUrl: "https://www.channelnewsasia.com/business/ftc-opens-probe-ai-giants-including-anthropic-and-openai-6421931",
  },
  {
    id: "h-2026-10-01-protecting-kids-chatbots-act", date: "2026-10-01", type: "legislative", lens: "policy",
    title: { it: "Protecting Kids from Human-Like Chatbots Act", en: "Protecting Kids from Human-Like Chatbots Act" },
    summary: {
      it: "Il deputato George Whitesides e altri membri del Congresso presentano il Protecting Kids from Human-Like Chatbots Act, che vieterebbe ai chatbot di comunicare di default in modo umano con i minori.",
      en: "Representative George Whitesides and other members of Congress introduce the Protecting Kids from Human-Like Chatbots Act, which would bar chatbots from communicating by default in a human-like way with minors.",
    },
    sourceLabel: { it: "U.S. Representative George Whitesides", en: "U.S. Representative George Whitesides" },
    sourceUrl: "https://whitesides.house.gov/2026/10/01/rep-whitesides-introduces-bipartisan-legislation-to-protect-children-from-human-like-chatbots/",
  },
  {
    id: "h-2026-10-04-super-intelligence-force", date: "2026-10-04", type: "milestone", lens: "policy",
    title: { it: "Istituita la Super Intelligence Force", en: "Super Intelligence Force announced" },
    summary: {
      it: "Con un post su Truth Social il presidente Donald Trump annuncia la 'Super Intelligence Force', una task force federale guidata dal direttore dell'intelligence nazionale Jay Clayton per coordinare la politica federale sull'AI.",
      en: "In a Truth Social post, President Donald Trump announces the 'Super Intelligence Force', a federal task force led by Director of National Intelligence Jay Clayton to coordinate federal AI policy.",
    },
    sourceLabel: { it: "Fortune", en: "Fortune" },
    sourceUrl: "https://fortune.com/2026/10/04/trump-national-intelligence-director-jay-clayton-super-intelligence-force-ai-agency/",
  },
];
