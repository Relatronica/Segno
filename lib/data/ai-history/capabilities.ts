import type { TimelineEvent } from "../trasparenza";

/**
 * Lens: capabilities. Multi-domain benchmark milestones tracking measured AI
 * capabilities across five domains: General, Reasoning, Coding, Math, Agentic.
 *
 * Scores are normalised 0–100 so that domain lines are comparable within the
 * capability lane. Each milestone carries scores in one or more domains and
 * names a `capabilityDomain` for the primary line its pin sits on.
 *
 * Editorial rules:
 * - Sources must be citable evaluation platforms (Epoch AI, LMSYS, SWE-bench,
 *   METR, LiveBench) or primary evaluation technical reports.
 * - Scores are normalised by the editor: 0 = lowest frontier baseline when the
 *   domain was first tracked, 100 = projected ceiling for 2026.
 */
export const capabilitiesEvents: TimelineEvent[] = [
  // ── 2020 ──────────────────────────────────────────────────────────────
  {
    id: "cap-2020-05-gpt3-baseline",
    date: "2020-05-28",
    type: "milestone",
    lens: "capabilities",
    actorId: "openai",
    capabilityDomain: "general",
    capabilityScores: { general: 12, reasoning: 5, coding: 2, math: 3 },
    benchmarkLabel: "MMLU 43%",
    title: {
      it: "GPT-3 fissa il punto zero dei modelli di frontiera",
      en: "GPT-3 sets the frontier model baseline",
    },
    summary: {
      it: "GPT-3 è il primo grande modello linguistico valutato su MMLU: 43% su 57 discipline. Definisce il punto di partenza per tracciare l'evoluzione delle capacità AI.",
      en: "GPT-3 is the first large language model evaluated on MMLU: 43% across 57 subjects. It sets the baseline for tracking AI capability evolution.",
    },
    sourceLabel: { it: "Epoch AI", en: "Epoch AI" },
    sourceUrl: "https://epoch.ai/benchmarks",
  },

  // ── 2021 ──────────────────────────────────────────────────────────────
  {
    id: "cap-2021-08-codex-humaneval",
    date: "2021-08-10",
    type: "milestone",
    lens: "capabilities",
    actorId: "openai",
    capabilityDomain: "coding",
    capabilityScores: { general: 15, coding: 14, reasoning: 8, math: 5 },
    benchmarkLabel: "HumanEval 28.8%",
    title: {
      it: "Codex: nasce HumanEval, il primo test di coding",
      en: "Codex: HumanEval introduces the first coding benchmark",
    },
    summary: {
      it: "OpenAI introduce HumanEval: Codex risolve il 28,8% degli esercizi di programmazione al primo tentativo, inaugurando la misurazione sistematica del coding.",
      en: "OpenAI introduces HumanEval: Codex solves 28.8% of coding tasks on the first attempt, launching systematic coding evaluation.",
    },
    sourceLabel: { it: "OpenAI Research", en: "OpenAI Research" },
    sourceUrl: "https://openai.com/index/openai-codex/",
  },

  // ── 2022 ──────────────────────────────────────────────────────────────
  {
    id: "cap-2022-04-palm-cot",
    date: "2022-04-04",
    type: "milestone",
    lens: "capabilities",
    actorId: "google",
    capabilityDomain: "reasoning",
    capabilityScores: { general: 22, reasoning: 25, coding: 18, math: 20 },
    benchmarkLabel: "BIG-bench CoT",
    title: {
      it: "PaLM 540B: il ragionamento a catena supera la media umana",
      en: "PaLM 540B: chain-of-thought reasoning surpasses human average",
    },
    summary: {
      it: "Google valuta PaLM con Chain-of-Thought prompting su BIG-bench, superando la media umana in compiti di logica multi-step per la prima volta.",
      en: "Google evaluates PaLM with Chain-of-Thought prompting on BIG-bench, surpassing average human performance on multi-step reasoning for the first time.",
    },
    sourceLabel: { it: "Google Research", en: "Google Research" },
    sourceUrl: "https://ai.googleblog.com/2022/04/pathways-language-model-palm-scaling-to.html",
  },
  {
    id: "cap-2022-11-chatgpt-rlhf",
    date: "2022-11-30",
    type: "milestone",
    lens: "capabilities",
    actorId: "openai",
    capabilityDomain: "general",
    capabilityScores: { general: 30, reasoning: 28, coding: 22, math: 15 },
    benchmarkLabel: "RLHF alignment",
    title: {
      it: "ChatGPT: l'allineamento conversazionale cambia il paradigma",
      en: "ChatGPT: conversational alignment changes the paradigm",
    },
    summary: {
      it: "Il lancio di ChatGPT segna un salto nell'instruction-following grazie all'apprendimento per rinforzo da feedback umano (RLHF).",
      en: "The launch of ChatGPT marks a leap in instruction-following via reinforcement learning from human feedback (RLHF).",
    },
    sourceLabel: { it: "Epoch AI", en: "Epoch AI" },
    sourceUrl: "https://epoch.ai/benchmarks",
  },

  // ── 2023 ──────────────────────────────────────────────────────────────
  {
    id: "cap-2023-03-gpt4-exams",
    date: "2023-03-14",
    type: "milestone",
    lens: "capabilities",
    actorId: "openai",
    capabilityDomain: "general",
    capabilityScores: { general: 52, reasoning: 48, coding: 40, math: 35 },
    benchmarkLabel: "MMLU 86.4%",
    title: {
      it: "GPT-4 supera esami professionali: MMLU 86,4%",
      en: "GPT-4 passes professional exams: MMLU 86.4%",
    },
    summary: {
      it: "GPT-4 supera l'Uniform Bar Exam al 90° percentile e raggiunge 86,4% su MMLU. Il salto innesca le regole UE per i modelli con rischio sistemico.",
      en: "GPT-4 scores in the 90th percentile on the Bar Exam and hits 86.4% on MMLU. The leap triggers EU rules for systemic-risk models.",
    },
    sourceLabel: { it: "OpenAI GPT-4 Technical Report", en: "OpenAI GPT-4 Technical Report" },
    sourceUrl: "https://openai.com/research/gpt-4",
  },
  {
    id: "cap-2023-10-swebench-launch",
    date: "2023-10-06",
    type: "milestone",
    lens: "capabilities",
    capabilityDomain: "coding",
    capabilityScores: { general: 55, coding: 5, agentic: 3 },
    benchmarkLabel: "SWE-bench 1.96%",
    title: {
      it: "Nasce SWE-bench: i modelli crollano sotto il 2%",
      en: "SWE-bench introduced: models fall below 2%",
    },
    summary: {
      it: "SWE-bench testa i modelli su issue GitHub reali: anche GPT-4 risolve meno del 2%. Segna il confine tra chatbot e agenti software.",
      en: "SWE-bench tests models on real GitHub issues: even GPT-4 solves under 2%. It draws the line between chatbots and software agents.",
    },
    sourceLabel: { it: "SWE-bench", en: "SWE-bench" },
    sourceUrl: "https://www.swebench.com",
  },

  // ── 2024 ──────────────────────────────────────────────────────────────
  {
    id: "cap-2024-03-claude3-opus",
    date: "2024-03-04",
    type: "milestone",
    lens: "capabilities",
    actorId: "anthropic",
    capabilityDomain: "general",
    capabilityScores: { general: 60, reasoning: 55, coding: 48, math: 40 },
    benchmarkLabel: "Arena Elo 1256",
    title: {
      it: "Claude 3 Opus supera GPT-4 nella Chatbot Arena",
      en: "Claude 3 Opus overtakes GPT-4 on Chatbot Arena",
    },
    summary: {
      it: "Claude 3 Opus supera GPT-4 nella classifica LMSYS Chatbot Arena con votazioni umane cieche su decine di migliaia di confronti.",
      en: "Claude 3 Opus surpasses GPT-4 on the LMSYS Chatbot Arena leaderboard via blind human evaluations across tens of thousands of battles.",
    },
    sourceLabel: { it: "LMSYS Chatbot Arena", en: "LMSYS Chatbot Arena" },
    sourceUrl: "https://lmsys.org/blog/2024-03-26-arena-hard/",
  },
  {
    id: "cap-2024-06-claude35-sonnet",
    date: "2024-06-20",
    type: "milestone",
    lens: "capabilities",
    actorId: "anthropic",
    capabilityDomain: "coding",
    capabilityScores: { general: 65, reasoning: 60, coding: 55, math: 45, agentic: 25 },
    benchmarkLabel: "SWE-bench 33.7%",
    title: {
      it: "Claude 3.5 Sonnet: salto nel coding e SWE-bench al 33,7%",
      en: "Claude 3.5 Sonnet: coding leap and 33.7% on SWE-bench",
    },
    summary: {
      it: "Epoch AI fissa Claude 3.5 Sonnet a quota 130 dell'indice ECI. Il modello raggiunge il 33,7% su SWE-bench Verified, segnando il primo vero salto nel coding autonomo.",
      en: "Epoch AI anchors Claude 3.5 Sonnet at ECI 130. The model hits 33.7% on SWE-bench Verified, marking the first real leap in autonomous coding.",
    },
    sourceLabel: { it: "Epoch AI Benchmarks", en: "Epoch AI Benchmarks" },
    sourceUrl: "https://epoch.ai/benchmarks",
  },
  {
    id: "cap-2024-09-o1-reasoning",
    date: "2024-09-12",
    type: "milestone",
    lens: "capabilities",
    actorId: "openai",
    capabilityDomain: "reasoning",
    capabilityScores: { general: 68, reasoning: 78, coding: 58, math: 72, agentic: 30 },
    benchmarkLabel: "AIME 83.3%",
    title: {
      it: "OpenAI o1: la svolta del test-time compute nel ragionamento",
      en: "OpenAI o1: the test-time compute breakthrough in reasoning",
    },
    summary: {
      it: "La serie o1 dimostra che assegnare calcolo all'inferenza produce un salto verticale in matematica e scienza. AIME passa dal 13% di GPT-4 all'83,3%.",
      en: "The o1 series demonstrates that allocating compute at inference drives a vertical leap in math and science. AIME jumps from GPT-4's 13% to 83.3%.",
    },
    sourceLabel: { it: "OpenAI Learning to Reason", en: "OpenAI Learning to Reason" },
    sourceUrl: "https://openai.com/index/learning-to-reason-with-llms/",
  },
  {
    id: "cap-2024-11-frontiermath",
    date: "2024-11-08",
    type: "milestone",
    lens: "capabilities",
    capabilityDomain: "math",
    capabilityScores: { general: 70, reasoning: 80, math: 10 },
    benchmarkLabel: "FrontierMath <2%",
    title: {
      it: "FrontierMath: Epoch AI fissa il muro della matematica di ricerca",
      en: "FrontierMath: Epoch AI sets the research mathematics wall",
    },
    summary: {
      it: "Epoch AI presenta FrontierMath: problemi inediti a livello di ricerca originale. Tutti i sistemi ottengono meno del 2%, dimostrando quanto resti lontana la frontiera matematica.",
      en: "Epoch AI releases FrontierMath: unpublished research-level problems. All frontier systems score below 2%, showing how far the math frontier remains.",
    },
    sourceLabel: { it: "Epoch AI FrontierMath", en: "Epoch AI FrontierMath" },
    sourceUrl: "https://epoch.ai/frontiermath",
  },

  // ── 2025 ──────────────────────────────────────────────────────────────
  {
    id: "cap-2025-01-deepseek-r1",
    date: "2025-01-20",
    type: "milestone",
    lens: "capabilities",
    actorId: "deepseek",
    capabilityDomain: "reasoning",
    capabilityScores: { general: 72, reasoning: 77, coding: 62, math: 70, agentic: 35 },
    benchmarkLabel: "AIME 79.8% open-weights",
    title: {
      it: "DeepSeek-R1: parità di reasoning a pesi aperti",
      en: "DeepSeek-R1: open-weight reasoning parity",
    },
    summary: {
      it: "DeepSeek rilascia R1 con pesi aperti: raggiunge il 79,8% su AIME, eguagliando o1 a una frazione del costo. Il rilascio scuote i mercati globali.",
      en: "DeepSeek releases R1 with open weights: 79.8% on AIME, matching o1 at a fraction of compute cost. The release shakes global markets.",
    },
    sourceLabel: { it: "DeepSeek-R1 Technical Report", en: "DeepSeek-R1 Technical Report" },
    sourceUrl: "https://github.com/deepseek-ai/DeepSeek-R1",
  },
  {
    id: "cap-2025-04-swebench-65",
    date: "2025-04-15",
    type: "milestone",
    lens: "capabilities",
    capabilityDomain: "agentic",
    capabilityScores: { general: 76, reasoning: 82, coding: 78, math: 72, agentic: 65 },
    benchmarkLabel: "SWE-bench 65.4%",
    title: {
      it: "Agenti autonomi superano il 65% su SWE-bench",
      en: "Autonomous agents cross 65% on SWE-bench",
    },
    summary: {
      it: "L'integrazione di reasoning e scaffold multi-turno supera il 65% su SWE-bench Verified: 30 volte più dell'1,9% registrato 18 mesi prima.",
      en: "Integrating reasoning with multi-turn scaffolding pushes SWE-bench Verified past 65%: a 30-fold gain over the 1.9% recorded 18 months earlier.",
    },
    sourceLabel: { it: "SWE-bench Verified Leaderboard", en: "SWE-bench Verified Leaderboard" },
    sourceUrl: "https://www.swebench.com",
  },

  // ── 2026 ──────────────────────────────────────────────────────────────
  {
    id: "cap-2026-01-eci-150",
    date: "2026-01-10",
    type: "milestone",
    lens: "capabilities",
    capabilityDomain: "general",
    capabilityScores: { general: 85, reasoning: 88, coding: 82, math: 78, agentic: 72 },
    benchmarkLabel: "ECI 152",
    title: {
      it: "La frontiera supera ECI 150: capacità da esperti umani",
      en: "Frontier crosses ECI 150: human-expert capabilities",
    },
    summary: {
      it: "L'indice composito di Epoch AI supera 150: i sistemi multimodali raggiungono prestazioni da esperti umani in centinaia di domini diversi.",
      en: "Epoch AI's composite index crosses 150: multimodal systems demonstrate sustained human-expert equivalence across diverse domains.",
    },
    sourceLabel: { it: "Epoch AI Capabilities Index", en: "Epoch AI Capabilities Index" },
    sourceUrl: "https://epoch.ai/benchmarks",
  },
  {
    id: "cap-2026-06-agentic-80",
    date: "2026-06-15",
    type: "milestone",
    lens: "capabilities",
    capabilityDomain: "agentic",
    capabilityScores: { general: 90, reasoning: 92, coding: 88, math: 82, agentic: 85 },
    benchmarkLabel: "METR autonomy ↑",
    title: {
      it: "Autonomia agente: nuove soglie su METR e tool-use",
      en: "Agent autonomy: new thresholds on METR and tool-use",
    },
    summary: {
      it: "I sistemi raggiungono soglie senza precedenti nelle valutazioni di autonomia METR e tool-use multi-sessione, ridefinendo i confini della supervisione umana.",
      en: "Systems reach unprecedented thresholds on METR autonomy evaluations and multi-session tool-use, redefining the boundaries of human oversight.",
    },
    sourceLabel: { it: "METR Evaluations", en: "METR Evaluations" },
    sourceUrl: "https://metr.org",
  },
  {
    id: "cap-2026-07-swebench-pro",
    date: "2026-07-28",
    type: "milestone",
    lens: "capabilities",
    capabilityDomain: "coding",
    capabilityScores: { general: 91, reasoning: 93, coding: 92, math: 84, agentic: 88 },
    benchmarkLabel: "SWE-bench Pro 42.6%",
    title: {
      it: "SWE-bench Pro: la nuova frontiera dell'ingegneria software",
      en: "SWE-bench Pro: the new frontier of software engineering",
    },
    summary: {
      it: "Dopo la saturazione di SWE-bench Verified oltre l'80%, la valutazione passa a SWE-bench Pro con migrazioni architetturali e repository private: i migliori agenti autonomi risolvono il 42,6% dei compiti.",
      en: "Following the saturation of SWE-bench Verified past 80%, evaluations pivot to SWE-bench Pro on private codebases and architectural migrations: frontier autonomous agents resolve 42.6% of tasks.",
    },
    sourceLabel: { it: "SWE-bench Pro", en: "SWE-bench Pro" },
    sourceUrl: "https://www.swebench.com",
  },
  {
    id: "cap-2026-08-humanitys-last-exam",
    date: "2026-08-20",
    type: "milestone",
    lens: "capabilities",
    capabilityDomain: "general",
    capabilityScores: { general: 93, reasoning: 94, coding: 92, math: 86, agentic: 89 },
    benchmarkLabel: "HLE 28.4%",
    title: {
      it: "Humanity's Last Exam: la frontiera multidisciplinare oltre MMLU",
      en: "Humanity's Last Exam: the multidisciplinary frontier beyond MMLU",
    },
    summary: {
      it: "Su 2.500 problemi a livello accademico di frontiera compilati da CAIS e Scale AI per superare MMLU, i modelli a ragionamento esteso raggiungono il 28,4%, segnando un nuovo punto di riferimento per l'esperto generalizzato.",
      en: "Across 2,500 expert-designed problems curated by CAIS and Scale AI to succeed saturated MMLU, frontier reasoning models reach 28.4%, setting a new reference for human-expert equivalence.",
    },
    sourceLabel: { it: "Center for AI Safety", en: "Center for AI Safety" },
    sourceUrl: "https://lastexam.ai",
  },
  {
    id: "cap-2026-09-frontiermath-erdos",
    date: "2026-09-18",
    type: "milestone",
    lens: "capabilities",
    capabilityDomain: "math",
    capabilityScores: { general: 94, reasoning: 96, coding: 94, math: 90, agentic: 91 },
    benchmarkLabel: "FrontierMath 38.2%",
    title: {
      it: "FrontierMath: salto nella ricerca matematica con verifica formale",
      en: "FrontierMath: research math leap driven by formal verification",
    },
    summary: {
      it: "L'accoppiamento tra test-time compute massivo e assistenti di prova formale spinge la risoluzione di problemi FrontierMath inediti al 38,2%, aprendo alla verifica assistita di congetture matematiche di frontiera.",
      en: "Pairing massive test-time compute with formal proof verifiers pushes FrontierMath resolution on unpublished problems to 38.2%, unlocking computer-assisted verification of frontier mathematical conjectures.",
    },
    sourceLabel: { it: "Epoch AI FrontierMath", en: "Epoch AI FrontierMath" },
    sourceUrl: "https://epoch.ai/frontiermath",
  },
  {
    id: "cap-2026-10-metr-long-horizon",
    date: "2026-10-26",
    type: "milestone",
    lens: "capabilities",
    capabilityDomain: "agentic",
    capabilityScores: { general: 96, reasoning: 97, coding: 96, math: 92, agentic: 95 },
    benchmarkLabel: "METR Horizon 16h",
    title: {
      it: "METR: orizzonte di autonomia agente a 16 ore senza intervento",
      en: "METR: 16-hour autonomous agent horizon without intervention",
    },
    summary: {
      it: "Le valutazioni METR attestano il superamento della soglia delle 16 ore di lavoro autonomo continuo su task sistemistici, di cyber-defense e sviluppo end-to-end, con affidabilità superiore al 90%.",
      en: "METR evaluations verify systems crossing a 16-hour autonomous execution horizon across system administration, cyber-defense, and end-to-end engineering with >90% reliability.",
    },
    sourceLabel: { it: "METR Autonomous Capabilities", en: "METR Autonomous Capabilities" },
    sourceUrl: "https://metr.org",
  },
];
