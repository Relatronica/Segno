import type { TimelineEvent } from "../trasparenza";

/**
 * Lens: models. Releases and versions of the systems themselves.
 *
 * Editorial rules for this file:
 * - Source must be first-party (the lab that shipped it) or an allowlisted
 *   wire service. Aggregators, wikis and SEO pages are not accepted.
 * - The date is the public announcement or release date, never a review date.
 * - No tone, no ranking, no "most powerful ever" unless the lab itself claims
 *   it and the claim is attributed.
 */
export const modelEvents: TimelineEvent[] = [
  {
    id: "h-2018-06-11-gpt-1", date: "2018-06-11", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-1", en: "GPT-1" },
    summary: {
      it: "OpenAI presenta un Transformer decoder-only da 117 milioni di parametri: pre-addestramento generativo non supervisionato e poi fine-tuning per singolo compito.",
      en: "OpenAI presents a 117M-parameter decoder-only Transformer: unsupervised generative pre-training, then per-task fine-tuning.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/language-unsupervised/",
  },
  {
    id: "h-2019-02-14-gpt-2", date: "2019-02-14", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-2", en: "GPT-2" },
    summary: {
      it: "OpenAI annuncia GPT-2 (1,5 miliardi di parametri) e ne rilascia solo la versione ridotta, motivando la scelta con il rischio di uso improprio.",
      en: "OpenAI announces GPT-2 (1.5B parameters) and releases only the small version, citing misuse risk.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/better-language-models/",
  },
  {
    id: "h-2020-05-28-gpt-3", date: "2020-05-28", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-3", en: "GPT-3" },
    summary: {
      it: "OpenAI pubblica GPT-3, 175 miliardi di parametri, e mostra che il modello svolge compiti nuovi senza fine-tuning, con pochi esempi nel prompt.",
      en: "OpenAI publishes GPT-3, 175B parameters, showing the model performs new tasks from a few prompt examples without fine-tuning.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/language-models-are-few-shot-learners/",
  },
  {
    id: "h-2021-01-05-dall-e", date: "2021-01-05", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "DALL·E", en: "DALL·E" },
    summary: {
      it: "OpenAI mostra DALL·E, variante di GPT-3 da 12 miliardi di parametri che genera immagini da descrizioni testuali.",
      en: "OpenAI shows DALL·E, a 12B-parameter GPT-3 variant that generates images from text descriptions.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/dall-e/",
  },
  {
    id: "h-2021-08-10-codex", date: "2021-08-10", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "Codex", en: "Codex" },
    summary: {
      it: "OpenAI rilascia Codex, modello da 12 miliardi di parametri che traduce linguaggio naturale in codice e alimenta GitHub Copilot.",
      en: "OpenAI releases Codex, a 12B-parameter model translating natural language into code and powering GitHub Copilot.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/openai-codex/",
  },
  {
    id: "h-2022-04-04-palm", date: "2022-04-04", type: "milestone", lens: "models", actorId: "google",
    title: { it: "PaLM", en: "PaLM" },
    summary: {
      it: "Google annuncia PaLM, modello denso da 540 miliardi di parametri addestrato con il sistema Pathways.",
      en: "Google announces PaLM, a 540B-parameter dense model trained with the Pathways system.",
    },
    sourceLabel: { it: "Google AI Blog", en: "Google AI Blog" }, sourceUrl: "https://ai.googleblog.com/2022/04/pathways-language-model-palm-scaling-to.html",
  },
  {
    id: "h-2022-04-06-dall-e-2", date: "2022-04-06", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "DALL·E 2", en: "DALL·E 2" },
    summary: {
      it: "OpenAI annuncia DALL·E 2, generazione testo-immagine a 1024×1024 pixel, con accesso inizialmente limitato.",
      en: "OpenAI announces DALL·E 2, text-to-image generation at 1024×1024, with initially limited access.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/dall-e-2/",
  },
  {
    id: "h-2022-08-22-stable-diffusion", date: "2022-08-22", type: "milestone", lens: "models", actorId: "stability",
    title: { it: "Stable Diffusion, rilascio pubblico", en: "Stable Diffusion, public release" },
    summary: {
      it: "Stability AI pubblica i pesi di Stable Diffusion con licenza OpenRAIL-M: la generazione di immagini diventa eseguibile in locale.",
      en: "Stability AI publishes Stable Diffusion weights under OpenRAIL-M, making image generation runnable locally.",
    },
    sourceLabel: { it: "Stability AI", en: "Stability AI" }, sourceUrl: "https://stability.ai/blog/stable-diffusion-public-release",
  },
  {
    id: "h-2022-09-21-whisper", date: "2022-09-21", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "Whisper", en: "Whisper" },
    summary: {
      it: "OpenAI rende open source Whisper, modello di riconoscimento vocale addestrato su 680.000 ore di audio multilingue.",
      en: "OpenAI open-sources Whisper, a speech recognition model trained on 680,000 hours of multilingual audio.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/whisper/",
  },
  {
    id: "h-2022-11-30-chatgpt", date: "2022-11-30", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "ChatGPT", en: "ChatGPT" },
    summary: {
      it: "OpenAI apre ChatGPT come anteprima di ricerca gratuita: un’interfaccia conversazionale su un modello della famiglia GPT-3.5.",
      en: "OpenAI opens ChatGPT as a free research preview: a conversational interface over a GPT-3.5 family model.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/chatgpt/",
  },
  {
    id: "h-2023-02-06-bard", date: "2023-02-06", type: "milestone", lens: "models", actorId: "google",
    title: { it: "Bard", en: "Bard" },
    summary: {
      it: "Google annuncia Bard, servizio conversazionale sperimentale basato su una versione leggera di LaMDA.",
      en: "Google announces Bard, an experimental conversational service built on a lightweight LaMDA version.",
    },
    sourceLabel: { it: "Google", en: "Google" }, sourceUrl: "https://blog.google/technology/ai/bard-google-ai-search-updates/",
  },
  {
    id: "h-2023-02-07-bing-copilot", date: "2023-02-07", type: "milestone", lens: "models", actorId: "microsoft",
    title: { it: "Bing con IA", en: "AI-powered Bing" },
    summary: {
      it: "Microsoft lancia in anteprima una versione di Bing e Edge con un assistente generativo, presentato come copilota per il web.",
      en: "Microsoft previews Bing and Edge with a generative assistant, presented as a copilot for the web.",
    },
    sourceLabel: { it: "Microsoft", en: "Microsoft" }, sourceUrl: "https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-bing-and-edge-your-copilot-for-the-web/",
  },
  {
    id: "h-2023-02-24-llama-1", date: "2023-02-24", type: "milestone", lens: "models", actorId: "meta",
    title: { it: "LLaMA 1", en: "LLaMA 1" },
    summary: {
      it: "Meta distribuisce a ricercatori una famiglia di modelli base fino a 65 miliardi di parametri, con licenza di sola ricerca.",
      en: "Meta gives researchers a foundation model family up to 65B parameters, under a research-only licence.",
    },
    sourceLabel: { it: "Meta AI", en: "Meta AI" }, sourceUrl: "https://ai.meta.com/blog/large-language-model-llama-meta-ai/",
  },
  {
    id: "h-2023-03-14-claude-1", date: "2023-03-14", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude", en: "Claude" },
    summary: {
      it: "Anthropic lancia Claude via chat e API, con la versione più leggera Claude Instant.",
      en: "Anthropic launches Claude via chat and API, plus the lighter Claude Instant.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/introducing-claude",
  },
  {
    id: "h-2023-03-14-gpt-4", date: "2023-03-14", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-4", en: "GPT-4" },
    summary: {
      it: "OpenAI annuncia GPT-4, modello multimodale che accetta testo e immagini; nella scheda tecnica dichiara risultati di livello professionale su esami simulati.",
      en: "OpenAI announces GPT-4, a multimodal model accepting text and images; the technical report claims professional-level results on simulated exams.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/gpt-4/",
  },
  {
    id: "h-2023-07-11-claude-2", date: "2023-07-11", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude 2", en: "Claude 2" },
    summary: {
      it: "Anthropic pubblica Claude 2 con risposte più lunghe e un sito in beta pubblica, estendendo l’accesso a Stati Uniti e Regno Unito.",
      en: "Anthropic ships Claude 2 with longer responses and a public beta site, extending access to the US and UK.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-2",
  },
  {
    id: "h-2023-07-18-llama-2", date: "2023-07-18", type: "milestone", lens: "models", actorId: "meta",
    title: { it: "Llama 2", en: "Llama 2" },
    summary: {
      it: "Meta e Microsoft rilasciano Llama 2, famiglia aperta da 7 a 70 miliardi di parametri, con uso commerciale consentito.",
      en: "Meta and Microsoft release Llama 2, an open family from 7B to 70B parameters, allowing commercial use.",
    },
    sourceLabel: { it: "Meta", en: "Meta" }, sourceUrl: "https://about.fb.com/news/2023/07/llama-2/",
  },
  {
    id: "h-2023-09-20-dall-e-3", date: "2023-09-20", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "DALL·E 3", en: "DALL·E 3" },
    summary: {
      it: "OpenAI annuncia DALL·E 3, integrato nativamente in ChatGPT e con maggiore fedeltà al prompt.",
      en: "OpenAI announces DALL·E 3, built natively into ChatGPT with improved prompt fidelity.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/dall-e-3/",
  },
  {
    id: "h-2023-09-27-mistral-7b", date: "2023-09-27", type: "milestone", lens: "models", actorId: "mistral",
    title: { it: "Mistral 7B", en: "Mistral 7B" },
    summary: {
      it: "Mistral AI rilascia Mistral 7B con licenza Apache 2.0: un modello da 7,3 miliardi di parametri che nei test della società supera Llama 2 13B.",
      en: "Mistral AI releases Mistral 7B under Apache 2.0: a 7.3B-parameter model that beats Llama 2 13B on the company’s own benchmarks.",
    },
    sourceLabel: { it: "Mistral AI", en: "Mistral AI" }, sourceUrl: "https://mistral.ai/news/announcing-mistral-7b/",
  },
  {
    id: "h-2023-11-03-grok-1", date: "2023-11-03", type: "milestone", lens: "models", actorId: "xai",
    title: { it: "Grok-1", en: "Grok-1" },
    summary: {
      it: "xAI annuncia Grok, il suo primo modello conversazionale, distribuito a un numero ristretto di utenti negli Stati Uniti.",
      en: "xAI announces Grok, its first conversational model, seeded to a small set of users in the United States.",
    },
    sourceLabel: { it: "xAI", en: "xAI" }, sourceUrl: "https://x.ai/blog/grok",
  },
  {
    id: "h-2023-12-06-gemini-1", date: "2023-12-06", type: "milestone", lens: "models", actorId: "google",
    title: { it: "Gemini 1.0", en: "Gemini 1.0" },
    summary: {
      it: "Google annuncia Gemini 1.0, prima famiglia nativamente multimodale, nelle taglie Ultra, Pro e Nano.",
      en: "Google announces Gemini 1.0, its first natively multimodal family, in Ultra, Pro and Nano sizes.",
    },
    sourceLabel: { it: "Google", en: "Google" }, sourceUrl: "https://blog.google/technology/ai/google-gemini-ai/",
  },
  {
    id: "h-2023-12-11-mixtral-8x7b", date: "2023-12-11", type: "milestone", lens: "models", actorId: "mistral",
    title: { it: "Mixtral 8x7B", en: "Mixtral 8x7B" },
    summary: {
      it: "Mistral AI pubblica Mixtral 8x7B con licenza Apache 2.0: architettura a esperti sparsi che nei test della società supera Llama 2 70B.",
      en: "Mistral AI releases Mixtral 8x7B under Apache 2.0: a sparse mixture-of-experts architecture beating Llama 2 70B on the company’s own benchmarks.",
    },
    sourceLabel: { it: "Mistral AI", en: "Mistral AI" }, sourceUrl: "https://mistral.ai/news/mixtral-of-experts",
  },
  {
    id: "h-2024-02-15-gemini-1-5", date: "2024-02-15", type: "milestone", lens: "models", actorId: "google",
    title: { it: "Gemini 1.5", en: "Gemini 1.5" },
    summary: {
      it: "Google annuncia Gemini 1.5 e una finestra di contesto fino a un milione di token.",
      en: "Google announces Gemini 1.5 and a context window of up to one million tokens.",
    },
    sourceLabel: { it: "Google", en: "Google" }, sourceUrl: "https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/",
  },
  {
    id: "h-2024-02-15-sora-preview", date: "2024-02-15", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "Sora, anteprima", en: "Sora, preview" },
    summary: {
      it: "OpenAI presenta Sora, modello testo-video capace di generare fino a un minuto di video, come anteprima di ricerca.",
      en: "OpenAI reveals Sora, a text-to-video model generating up to one minute of footage, as a research preview.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/video-generation-models-as-world-simulators/",
  },
  {
    id: "h-2024-02-26-mistral-large", date: "2024-02-26", type: "milestone", lens: "models", actorId: "mistral",
    title: { it: "Mistral Large e Le Chat", en: "Mistral Large and Le Chat" },
    summary: {
      it: "Mistral AI lancia Mistral Large e l’assistente Le Chat, con distribuzione tramite Azure.",
      en: "Mistral AI launches Mistral Large and the Le Chat assistant, with distribution through Azure.",
    },
    sourceLabel: { it: "Mistral AI", en: "Mistral AI" }, sourceUrl: "https://mistral.ai/news/mistral-large/",
  },
  {
    id: "h-2024-03-04-claude-3", date: "2024-03-04", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude 3", en: "Claude 3" },
    summary: {
      it: "Anthropic annuncia Claude 3 nelle versioni Haiku, Sonnet e Opus, tutte multimodali con visione.",
      en: "Anthropic announces Claude 3 in Haiku, Sonnet and Opus tiers, all multimodal with vision.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-3-family",
  },
  {
    id: "h-2024-04-18-llama-3", date: "2024-04-18", type: "milestone", lens: "models", actorId: "meta",
    title: { it: "Llama 3", en: "Llama 3" },
    summary: {
      it: "Meta rilascia Llama 3 nelle taglie 8B e 70B.",
      en: "Meta releases Llama 3 in 8B and 70B sizes.",
    },
    sourceLabel: { it: "Meta AI", en: "Meta AI" }, sourceUrl: "https://ai.meta.com/blog/meta-llama-3/",
  },
  {
    id: "h-2024-05-13-gpt-4o", date: "2024-05-13", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-4o", en: "GPT-4o" },
    summary: {
      it: "OpenAI annuncia GPT-4o: un solo modello per audio, visione e testo in tempo reale, disponibile anche senza abbonamento.",
      en: "OpenAI announces GPT-4o: one model for audio, vision and text in real time, available without a subscription.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/hello-gpt-4o/",
  },
  {
    id: "h-2024-05-14-veo-imagen-3", date: "2024-05-14", type: "milestone", lens: "models", actorId: "google",
    title: { it: "Veo e Imagen 3", en: "Veo and Imagen 3" },
    summary: {
      it: "Google annuncia Veo, modello di generazione video a 1080p, insieme al modello di immagini Imagen 3.",
      en: "Google announces Veo, a 1080p video generation model, together with the Imagen 3 image model.",
    },
    sourceLabel: { it: "Google", en: "Google" }, sourceUrl: "https://blog.google/technology/ai/google-generative-ai-veo-imagen-3/",
  },
  {
    id: "h-2024-06-20-claude-3-5-sonnet", date: "2024-06-20", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude 3.5 Sonnet", en: "Claude 3.5 Sonnet" },
    summary: {
      it: "Anthropic lancia Claude 3.5 Sonnet, con prestazioni dichiarate superiori a Claude 3 Opus a costo inferiore, e la funzione Artifacts.",
      en: "Anthropic launches Claude 3.5 Sonnet, claimed to outperform Claude 3 Opus at lower cost, plus the Artifacts feature.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-3-5-sonnet",
  },
  {
    id: "h-2024-07-23-llama-3-1", date: "2024-07-23", type: "milestone", lens: "models", actorId: "meta",
    title: { it: "Llama 3.1 405B", en: "Llama 3.1 405B" },
    summary: {
      it: "Meta rilascia Llama 3.1 fino a 405 miliardi di parametri, con contesto da 128.000 token.",
      en: "Meta releases Llama 3.1 up to 405B parameters, with a 128K-token context.",
    },
    sourceLabel: { it: "Meta AI", en: "Meta AI" }, sourceUrl: "https://ai.meta.com/blog/meta-llama-3-1/",
  },
  {
    id: "h-2024-09-12-openai-o1", date: "2024-09-12", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "OpenAI o1", en: "OpenAI o1" },
    summary: {
      it: "OpenAI introduce o1-preview e o1-mini, una serie di modelli che elaborano una catena di ragionamento prima di rispondere.",
      en: "OpenAI introduces o1-preview and o1-mini, a model series that works through a reasoning chain before answering.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/introducing-openai-o1-preview/",
  },
  {
    id: "h-2024-10-22-claude-3-5-computer-use", date: "2024-10-22", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Nuovo Claude 3.5 Sonnet e computer use", en: "New Claude 3.5 Sonnet and computer use" },
    summary: {
      it: "Anthropic aggiorna Claude 3.5 Sonnet, presenta Claude 3.5 Haiku e introduce in via sperimentale computer use, la funzione con cui il modello controlla cursore e tastiera.",
      en: "Anthropic updates Claude 3.5 Sonnet, introduces Claude 3.5 Haiku and ships computer use experimentally, letting the model control cursor and keyboard.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/3-5-models-and-computer-use",
  },
  {
    id: "h-2024-12-09-sora-turbo", date: "2024-12-09", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "Sora Turbo", en: "Sora Turbo" },
    summary: {
      it: "OpenAI rende disponibile Sora Turbo su sora.com per gli utenti ChatGPT Plus e Pro negli Stati Uniti e in gran parte dei paesi.",
      en: "OpenAI makes Sora Turbo available at sora.com to ChatGPT Plus and Pro users in the US and most countries.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/sora-is-here/",
  },
  {
    id: "h-2024-12-11-gemini-2", date: "2024-12-11", type: "milestone", lens: "models", actorId: "google",
    title: { it: "Gemini 2.0", en: "Gemini 2.0" },
    summary: {
      it: "Google DeepMind presenta Gemini 2.0 Flash, con output nativo di immagini e audio e uso di strumenti.",
      en: "Google DeepMind introduces Gemini 2.0 Flash, with native image and audio output and tool use.",
    },
    sourceLabel: { it: "Google", en: "Google" }, sourceUrl: "https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/",
  },
  {
    id: "h-2024-12-16-veo-2", date: "2024-12-16", type: "milestone", lens: "models", actorId: "google",
    title: { it: "Veo 2", en: "Veo 2" },
    summary: {
      it: "Google DeepMind annuncia Veo 2, modello di generazione video con risoluzione fino a 4K e maggiore aderenza alla fisica, insieme a una nuova versione di Imagen 3.",
      en: "Google DeepMind announces Veo 2, a video generation model up to 4K resolution with improved physical realism, alongside an updated Imagen 3.",
    },
    sourceLabel: { it: "Google", en: "Google" }, sourceUrl: "https://blog.google/technology/google-labs/video-image-generation-update-december-2024/",
  },
  {
    id: "h-2024-12-26-deepseek-v3", date: "2024-12-26", type: "milestone", lens: "models", actorId: "deepseek",
    title: { it: "DeepSeek-V3", en: "DeepSeek-V3" },
    summary: {
      it: "DeepSeek rilascia V3: 671 miliardi di parametri con architettura a esperti, 37 miliardi attivi per token, pesi aperti.",
      en: "DeepSeek releases V3: 671B parameters with a mixture-of-experts architecture, 37B active per token, open weights.",
    },
    sourceLabel: { it: "DeepSeek", en: "DeepSeek" }, sourceUrl: "https://www.deepseek.com/en/news/deepseek-v3/",
  },
  {
    id: "h-2025-01-20-deepseek-r1", date: "2025-01-20", type: "milestone", lens: "models", actorId: "deepseek",
    title: { it: "DeepSeek-R1", en: "DeepSeek-R1" },
    summary: {
      it: "DeepSeek pubblica R1, modello di ragionamento con pesi aperti e licenza MIT, con risultati dichiarati vicini a OpenAI o1.",
      en: "DeepSeek publishes R1, an open-weights reasoning model under the MIT licence, claimed competitive with OpenAI o1.",
    },
    sourceLabel: { it: "DeepSeek", en: "DeepSeek" }, sourceUrl: "https://www.deepseek.com/en/news/deepseek-r1/",
  },
  {
    id: "h-2025-01-23-operator", date: "2025-01-23", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "OpenAI Operator", en: "OpenAI Operator" },
    summary: {
      it: "OpenAI presenta in anteprima di ricerca Operator, agente basato su un modello Computer-Using Agent che esegue compiti sul web tramite un browser proprio.",
      en: "OpenAI previews Operator, an agent built on a Computer-Using Agent model that carries out web tasks through its own browser.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/introducing-operator/",
  },
  {
    id: "h-2025-01-31-o3-mini", date: "2025-01-31", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "o3-mini", en: "o3-mini" },
    summary: {
      it: "OpenAI rilascia o3-mini, primo modello di ragionamento accessibile anche agli utenti gratuiti di ChatGPT.",
      en: "OpenAI releases o3-mini, the first reasoning model available to free ChatGPT users.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/openai-o3-mini/",
  },
  {
    id: "h-2025-02-02-deep-research", date: "2025-02-02", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "OpenAI deep research", en: "OpenAI deep research" },
    summary: {
      it: "OpenAI rilascia deep research, modalità basata su un modello o3 ottimizzato per condurre ricerche web multi-passo e restituire report con fonti.",
      en: "OpenAI releases deep research, a mode powered by an o3 model tuned to run multi-step web research and return sourced reports.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/introducing-deep-research/",
  },
  {
    id: "h-2025-02-17-grok-3", date: "2025-02-17", type: "milestone", lens: "models", actorId: "xai",
    title: { it: "Grok 3", en: "Grok 3" },
    summary: {
      it: "xAI presenta Grok 3 e Grok 3 mini, addestrati sul cluster Colossus.",
      en: "xAI introduces Grok 3 and Grok 3 mini, trained on the Colossus cluster.",
    },
    sourceLabel: { it: "xAI", en: "xAI" }, sourceUrl: "https://x.ai/news/grok-3",
  },
  {
    id: "h-2025-02-24-claude-3-7-sonnet", date: "2025-02-24", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude 3.7 Sonnet", en: "Claude 3.7 Sonnet" },
    summary: {
      it: "Anthropic lancia Claude 3.7 Sonnet, primo modello ibrido con ragionamento esteso configurabile, insieme a Claude Code.",
      en: "Anthropic launches Claude 3.7 Sonnet, its first hybrid model with configurable extended thinking, alongside Claude Code.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-3-7-sonnet",
  },
  {
    id: "h-2025-02-27-gpt-4-5", date: "2025-02-27", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-4.5", en: "GPT-4.5" },
    summary: {
      it: "OpenAI rilascia in anteprima GPT-4.5, il suo modello conversazionale più grande fino a quel momento.",
      en: "OpenAI releases a research preview of GPT-4.5, its largest conversational model at the time.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/introducing-gpt-4-5/",
  },
  {
    id: "h-2025-03-25-gemini-2-5-pro", date: "2025-03-25", type: "milestone", lens: "models", actorId: "google",
    title: { it: "Gemini 2.5 Pro", en: "Gemini 2.5 Pro" },
    summary: {
      it: "Google DeepMind rilascia Gemini 2.5 Pro Experimental, modello con ragionamento dichiarato in cima alla classifica LMArena al lancio.",
      en: "Google DeepMind releases Gemini 2.5 Pro Experimental, a reasoning model claimed top of the LMArena leaderboard at launch.",
    },
    sourceLabel: { it: "Google", en: "Google" }, sourceUrl: "https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/",
  },
  {
    id: "h-2025-04-05-llama-4", date: "2025-04-05", type: "milestone", lens: "models", actorId: "meta",
    title: { it: "Llama 4", en: "Llama 4" },
    summary: {
      it: "Meta rilascia Llama 4 Scout e Maverick, modelli multimodali a esperti con contesto fino a 10 milioni di token.",
      en: "Meta releases Llama 4 Scout and Maverick, multimodal mixture-of-experts models with up to 10M-token context.",
    },
    sourceLabel: { it: "Meta AI", en: "Meta AI" }, sourceUrl: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/",
  },
  {
    id: "h-2025-04-14-gpt-4-1", date: "2025-04-14", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-4.1", en: "GPT-4.1" },
    summary: {
      it: "OpenAI lancia GPT-4.1, mini e nano solo via API, con contesto fino a un milione di token.",
      en: "OpenAI launches GPT-4.1, mini and nano via API only, with up to a 1M-token context.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/gpt-4-1/",
  },
  {
    id: "h-2025-04-16-o3", date: "2025-04-16", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "o3 e o4-mini", en: "o3 and o4-mini" },
    summary: {
      it: "OpenAI rilascia o3 e o4-mini, con accesso completo agli strumenti nelle risposte.",
      en: "OpenAI releases o3 and o4-mini, with full tool access inside their answers.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/introducing-o3-and-o4-mini/",
  },
  {
    id: "h-2025-04-29-qwen3", date: "2025-04-29", type: "milestone", lens: "models", actorId: "qwen",
    title: { it: "Qwen3", en: "Qwen3" },
    summary: {
      it: "Alibaba pubblica Qwen3, famiglia a pesi aperti che unisce ragionamento e risposta rapida in un unico modello, con varianti dense e a esperti.",
      en: "Alibaba releases Qwen3, an open-weights family that unifies reasoning and fast response in one model, with dense and mixture-of-experts variants.",
    },
    sourceLabel: { it: "Qwen", en: "Qwen" }, sourceUrl: "https://qwenlm.github.io/blog/qwen3/",
  },
  {
    id: "h-2025-05-20-veo-3", date: "2025-05-20", type: "milestone", lens: "models", actorId: "google",
    title: { it: "Veo 3", en: "Veo 3" },
    summary: {
      it: "Google annuncia Veo 3 al I/O: genera video con audio e dialogo sincronizzati.",
      en: "Google announces Veo 3 at I/O: it generates video with synchronised audio and dialogue.",
    },
    sourceLabel: { it: "Google", en: "Google" }, sourceUrl: "https://blog.google/innovation-and-ai/products/generative-media-models-io-2025/",
  },
  {
    id: "h-2025-05-22-claude-4", date: "2025-05-22", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Opus 4 e Sonnet 4", en: "Claude Opus 4 and Sonnet 4" },
    summary: {
      it: "Anthropic introduce Claude Opus 4 e Claude Sonnet 4, modelli ibridi orientati a codice, agenti e ragionamento.",
      en: "Anthropic introduces Claude Opus 4 and Claude Sonnet 4, hybrid models aimed at coding, agents and reasoning.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-4",
  },
  {
    id: "h-2025-07-09-grok-4", date: "2025-07-09", type: "milestone", lens: "models", actorId: "xai",
    title: { it: "Grok 4", en: "Grok 4" },
    summary: {
      it: "xAI annuncia Grok 4, modello di ragionamento che usa calcolo aggiuntivo in fase di inferenza e accesso a strumenti, presentato in una diretta.",
      en: "xAI announces Grok 4, a reasoning model using extra test-time compute and tool access, presented in a livestream.",
    },
    sourceLabel: { it: "xAI", en: "xAI" }, sourceUrl: "https://x.ai/news/grok-4",
  },
  {
    id: "h-2025-07-11-kimi-k2", date: "2025-07-11", type: "milestone", lens: "models",
    title: { it: "Kimi K2", en: "Kimi K2" },
    summary: {
      it: "Moonshot AI pubblica Kimi K2, modello a esperti da mille miliardi di parametri (32 miliardi attivi) con pesi aperti e addestramento orientato agli agenti.",
      en: "Moonshot AI releases Kimi K2, a one-trillion-parameter mixture-of-experts model (32B active) with open weights, trained for agentic use.",
    },
    sourceLabel: { it: "Moonshot AI", en: "Moonshot AI" }, sourceUrl: "https://moonshotai.github.io/Kimi-K2/",
  },
  {
    id: "h-2025-08-05-gpt-oss", date: "2025-08-05", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "gpt-oss", en: "gpt-oss" },
    summary: {
      it: "OpenAI pubblica gpt-oss-120b e gpt-oss-20b, modelli di ragionamento a pesi aperti con licenza Apache 2.0.",
      en: "OpenAI publishes gpt-oss-120b and gpt-oss-20b, open-weights reasoning models under the Apache 2.0 licence.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/introducing-gpt-oss/",
  },
  {
    id: "h-2025-08-05-genie-3", date: "2025-08-05", type: "milestone", lens: "models", actorId: "google",
    title: { it: "Genie 3", en: "Genie 3" },
    summary: {
      it: "Google DeepMind presenta Genie 3, modello di mondo che genera ambienti interattivi a 720p e 24 fotogrammi al secondo, esplorabili in tempo reale.",
      en: "Google DeepMind introduces Genie 3, a world model generating interactive environments at 720p and 24 frames per second, explorable in real time.",
    },
    sourceLabel: { it: "Google DeepMind", en: "Google DeepMind" }, sourceUrl: "https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/",
  },
  {
    id: "h-2025-08-07-gpt-5", date: "2025-08-07", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-5", en: "GPT-5" },
    summary: {
      it: "OpenAI lancia GPT-5, un sistema unico con ragionamento integrato, disponibile a tutti gli utenti ChatGPT e via API.",
      en: "OpenAI launches GPT-5, a single system with built-in reasoning, available to all ChatGPT users and via API.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/introducing-gpt-5/",
  },
  {
    id: "h-2025-09-29-claude-sonnet-4-5", date: "2025-09-29", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Sonnet 4.5", en: "Claude Sonnet 4.5" },
    summary: {
      it: "Anthropic rilascia Claude Sonnet 4.5, orientato a codice e agenti, con miglioramenti dichiarati nell'uso del computer e nei compiti di lunga durata.",
      en: "Anthropic releases Claude Sonnet 4.5, aimed at coding and agents, with claimed gains in computer use and long-horizon tasks.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-sonnet-4-5",
  },
  {
    id: "h-2025-09-30-sora-2", date: "2025-09-30", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "Sora 2", en: "Sora 2" },
    summary: {
      it: "OpenAI rilascia Sora 2 con dialogo sincronizzato in una nuova app dedicata.",
      en: "OpenAI releases Sora 2 with synchronised dialogue in a new standalone app.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/sora-2/",
  },
  {
    id: "h-2025-11-12-gpt-5-1", date: "2025-11-12", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-5.1", en: "GPT-5.1" },
    summary: {
      it: "OpenAI aggiorna la serie GPT-5 con GPT-5.1 Instant e Thinking.",
      en: "OpenAI updates the GPT-5 series with GPT-5.1 Instant and Thinking.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/gpt-5-1/",
  },
  {
    id: "h-2025-11-18-gemini-3", date: "2025-11-18", type: "milestone", lens: "models", actorId: "google",
    title: { it: "Gemini 3 Pro", en: "Gemini 3 Pro" },
    summary: {
      it: "Google rilascia in anteprima Gemini 3 Pro nei suoi prodotti, con la modalità di ragionamento Deep Think.",
      en: "Google previews Gemini 3 Pro across its products, with a Deep Think reasoning mode.",
    },
    sourceLabel: { it: "Google", en: "Google" }, sourceUrl: "https://blog.google/products/gemini/gemini-3/",
  },
  {
    id: "h-2025-11-24-claude-opus-4-5", date: "2025-11-24", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Opus 4.5", en: "Claude Opus 4.5" },
    summary: {
      it: "Anthropic rilascia Claude Opus 4.5, orientato a codice, agenti e uso del computer, a costo inferiore.",
      en: "Anthropic releases Claude Opus 4.5, aimed at coding, agents and computer use, at lower cost.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-opus-4-5",
  },
  {
    id: "h-2025-12-11-gpt-5-2", date: "2025-12-11", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-5.2", en: "GPT-5.2" },
    summary: {
      it: "OpenAI rilascia GPT-5.2, orientato al lavoro professionale e ad agenti con esecuzione lunga.",
      en: "OpenAI releases GPT-5.2, aimed at professional work and long-running agents.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/introducing-gpt-5-2/",
  },
  {
    id: "h-2026-01-12-claude-cowork", date: "2026-01-12", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Cowork", en: "Claude Cowork" },
    summary: {
      it: "Anthropic lancia in anteprima Cowork, interfaccia che estende Claude Code ai compiti d'ufficio non di programmazione, con accesso a file e applicazioni.",
      en: "Anthropic previews Cowork, an interface extending Claude Code to non-coding office work, with access to files and applications.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://claude.com/blog/cowork-research-preview",
  },
  {
    id: "h-2026-02-05-claude-opus-4-6", date: "2026-02-05", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Opus 4.6", en: "Claude Opus 4.6" },
    summary: {
      it: "Anthropic rilascia Claude Opus 4.6, orientato a codice, agenti e compiti lunghi, con contesto esteso.",
      en: "Anthropic releases Claude Opus 4.6, aimed at coding, agents and long tasks, with an extended context.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-opus-4-6",
  },
  {
    id: "h-2026-02-05-gpt-5-3-codex", date: "2026-02-05", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-5.3-Codex", en: "GPT-5.3-Codex" },
    summary: {
      it: "OpenAI rilascia GPT-5.3-Codex, modello orientato alla programmazione agentica e integrato in Codex.",
      en: "OpenAI releases GPT-5.3-Codex, a model aimed at agentic programming and integrated into Codex.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/introducing-gpt-5-3-codex/",
  },
  {
    id: "h-2026-02-12-glm-5", date: "2026-02-12", type: "milestone", lens: "models",
    title: { it: "GLM-5", en: "GLM-5" },
    summary: {
      it: "Z.ai (Zhipu AI) pubblica GLM-5, modello a esperti da 744 miliardi di parametri (40 miliardi attivi) con pesi aperti e licenza MIT.",
      en: "Z.ai (Zhipu AI) releases GLM-5, a 744B-parameter mixture-of-experts model (40B active) with open weights under the MIT licence.",
    },
    sourceLabel: { it: "Z.ai", en: "Z.ai" }, sourceUrl: "https://z.ai/blog/glm-5",
  },
  {
    id: "h-2026-02-19-gemini-3-1-pro", date: "2026-02-19", type: "milestone", lens: "models", actorId: "google",
    title: { it: "Gemini 3.1 Pro", en: "Gemini 3.1 Pro" },
    summary: {
      it: "Google rilascia Gemini 3.1 Pro, aggiornamento della serie Gemini 3 orientato a compiti complessi di ragionamento e codice.",
      en: "Google releases Gemini 3.1 Pro, a Gemini 3 series update aimed at complex reasoning and coding tasks.",
    },
    sourceLabel: { it: "Google", en: "Google" }, sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/",
  },
  {
    id: "h-2026-03-05-gpt-5-4", date: "2026-03-05", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-5.4", en: "GPT-5.4" },
    summary: {
      it: "OpenAI rilascia GPT-5.4 nelle versioni Thinking e Pro, con uso nativo del computer tramite interfaccia grafica.",
      en: "OpenAI releases GPT-5.4 in Thinking and Pro versions, with native computer use through a graphical interface.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/introducing-gpt-5-4/",
  },
  {
    id: "h-2026-04-07-claude-mythos-preview", date: "2026-04-07", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Mythos, anteprima", en: "Claude Mythos, preview" },
    summary: {
      it: "Anthropic presenta in anteprima Claude Mythos, modello orientato alla sicurezza informatica, nell'ambito del progetto Glasswing.",
      en: "Anthropic previews Claude Mythos, a model focused on cybersecurity, as part of the Glasswing project.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://red.anthropic.com/2026/mythos-preview/",
  },
  {
    id: "h-2026-04-08-muse-spark", date: "2026-04-08", type: "milestone", lens: "models", actorId: "meta",
    title: { it: "Muse Spark", en: "Muse Spark" },
    summary: {
      it: "Meta presenta Muse Spark, primo modello dei Meta Superintelligence Labs, in distribuzione in alcuni prodotti dell'azienda.",
      en: "Meta introduces Muse Spark, the first model from Meta Superintelligence Labs, rolling out across some of the company's products.",
    },
    sourceLabel: { it: "Meta", en: "Meta" }, sourceUrl: "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/",
  },
  {
    id: "h-2026-04-16-claude-opus-4-7", date: "2026-04-16", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Opus 4.7", en: "Claude Opus 4.7" },
    summary: {
      it: "Anthropic rilascia Claude Opus 4.7, con miglioramenti dichiarati su codice, agenti e compiti di lunga durata.",
      en: "Anthropic releases Claude Opus 4.7, with claimed improvements in coding, agents and long-horizon tasks.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-opus-4-7",
  },
  {
    id: "h-2026-04-23-gpt-5-5", date: "2026-04-23", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-5.5", en: "GPT-5.5" },
    summary: {
      it: "OpenAI rilascia GPT-5.5, con una versione Pro, orientato a ragionamento, codice e agenti.",
      en: "OpenAI releases GPT-5.5, plus a Pro version, aimed at reasoning, coding and agents.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/introducing-gpt-5-5/",
  },
  {
    id: "h-2026-04-24-deepseek-v4", date: "2026-04-24", type: "milestone", lens: "models", actorId: "deepseek",
    title: { it: "DeepSeek-V4, anteprima", en: "DeepSeek-V4, preview" },
    summary: {
      it: "DeepSeek pubblica in anteprima la famiglia V4, con le varianti Pro e Flash a esperti, pesi aperti con licenza MIT e contesto fino a un milione di token.",
      en: "DeepSeek previews the V4 family, with mixture-of-experts Pro and Flash variants, open weights under the MIT licence and up to a 1M-token context.",
    },
    sourceLabel: { it: "DeepSeek", en: "DeepSeek" }, sourceUrl: "https://deepseek.com/en/news/v4-preview/",
  },
  {
    id: "h-2026-05-19-gemini-3-5-flash", date: "2026-05-19", type: "milestone", lens: "models", actorId: "google",
    title: { it: "Gemini 3.5 Flash", en: "Gemini 3.5 Flash" },
    summary: {
      it: "Google annuncia al I/O 2026 Gemini 3.5 Flash, primo modello della serie 3.5, orientato a velocità ed esecuzione di azioni.",
      en: "Google announces Gemini 3.5 Flash at I/O 2026, the first model in the 3.5 series, aimed at speed and action execution.",
    },
    sourceLabel: { it: "Google", en: "Google" }, sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
  },
  {
    id: "h-2026-05-28-claude-opus-4-8", date: "2026-05-28", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Opus 4.8", en: "Claude Opus 4.8" },
    summary: {
      it: "Anthropic rilascia Claude Opus 4.8, aggiornamento della serie Opus 4 orientato a codice e agenti.",
      en: "Anthropic releases Claude Opus 4.8, an Opus 4 series update aimed at coding and agents.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-opus-4-8",
  },
  {
    id: "h-2026-06-09-claude-fable-5-mythos-5", date: "2026-06-09", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Fable 5 e Mythos 5", en: "Claude Fable 5 and Mythos 5" },
    summary: {
      it: "Anthropic annuncia Claude Fable 5 e Claude Mythos 5, due versioni dello stesso modello: la prima con salvaguardie complete, la seconda riservata ai difensori informatici tramite il progetto Glasswing.",
      en: "Anthropic announces Claude Fable 5 and Claude Mythos 5, two versions of the same model: the first fully safeguarded, the second restricted to cyberdefenders through Project Glasswing.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-fable-5-mythos-5",
  },
  {
    id: "h-2026-06-30-claude-sonnet-5", date: "2026-06-30", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Sonnet 5", en: "Claude Sonnet 5" },
    summary: {
      it: "Anthropic rilascia Claude Sonnet 5, modello predefinito per i piani gratuiti e Pro su claude.ai.",
      en: "Anthropic releases Claude Sonnet 5, the default model for Free and Pro plans on claude.ai.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-sonnet-5",
  },
  {
    id: "h-2026-07-09-gpt-5-6", date: "2026-07-09", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-5.6", en: "GPT-5.6" },
    summary: {
      it: "OpenAI rende disponibili GPT-5.6 in tre configurazioni, Sol, Terra e Luna, con un contesto condiviso da circa un milione di token.",
      en: "OpenAI makes GPT-5.6 available in three configurations, Sol, Terra and Luna, sharing a context of about one million tokens.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/gpt-5-6/",
  },
  {
    id: "h-2026-07-16-kimi-k3", date: "2026-07-16", type: "milestone", lens: "models",
    title: { it: "Kimi K3", en: "Kimi K3" },
    summary: {
      it: "Moonshot AI annuncia Kimi K3, modello a esperti di scala molto ampia, con pesi aperti pubblicati nei giorni successivi.",
      en: "Moonshot AI announces Kimi K3, a very large mixture-of-experts model, with open weights published in the following days.",
    },
    sourceLabel: { it: "Moonshot AI", en: "Moonshot AI" }, sourceUrl: "https://www.kimi.com/news/kimi-k3",
  },
  {
    id: "h-2026-07-24-claude-opus-5", date: "2026-07-24", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Opus 5", en: "Claude Opus 5" },
    summary: {
      it: "Anthropic rilascia Claude Opus 5, nuovo vertice della famiglia Claude per codice, agenti e ragionamento.",
      en: "Anthropic releases Claude Opus 5, the new top of the Claude family for coding, agents and reasoning.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-opus-5",
  },
  {
    id: "h-2026-09-01-claude-fable-5-1-mythos-5-1", date: "2026-09-01", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Fable 5.1 e Mythos 5.1", en: "Claude Fable 5.1 and Mythos 5.1" },
    summary: {
      it: "Anthropic aggiorna le linee Fable e Mythos con le versioni 5.1.",
      en: "Anthropic updates the Fable and Mythos lines with 5.1 versions.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/claude-fable-and-mythos-5-1",
  },
  {
    id: "h-2026-09-03-gpt-6-astra", date: "2026-09-03", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-6 Astra", en: "GPT-6 Astra" },
    summary: {
      it: "OpenAI annuncia GPT-6 Astra, modello presentato con una scheda di sistema e in distribuzione iniziale a un numero limitato di organizzazioni.",
      en: "OpenAI announces GPT-6 Astra, introduced with a system card and initially rolling out to a limited set of organisations.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/gpt-6-astra/",
  },
  {
    id: "h-2026-09-10-deepseek-v4-1-flash", date: "2026-09-10", type: "milestone", lens: "models", actorId: "deepseek",
    title: { it: "DeepSeek-V4.1-Flash", en: "DeepSeek-V4.1-Flash" },
    summary: {
      it: "DeepSeek rilascia V4.1-Flash, modello a esperti da 552 miliardi di parametri con attivazione ridotta per token.",
      en: "DeepSeek releases V4.1-Flash, a 552B-parameter mixture-of-experts model with reduced activation per token.",
    },
    sourceLabel: { it: "DeepSeek", en: "DeepSeek" }, sourceUrl: "https://www.deepseek.com/en/news/deepseek-v4-1-flash/",
  },
  {
    id: "h-2026-09-22-claude-opus-5-5", date: "2026-09-22", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Opus 5.5", en: "Claude Opus 5.5" },
    summary: {
      it: "Anthropic rilascia Claude Opus 5.5, aggiornamento della serie Opus 5.",
      en: "Anthropic releases Claude Opus 5.5, an update to the Opus 5 series.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/claude-opus-5-5",
  },
  {
    id: "h-2026-09-28-claude-sonnet-5-5", date: "2026-09-28", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Sonnet 5.5", en: "Claude Sonnet 5.5" },
    summary: {
      it: "Anthropic rilascia Claude Sonnet 5.5, aggiornamento della serie Sonnet 5.",
      en: "Anthropic releases Claude Sonnet 5.5, an update to the Sonnet 5 series.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-sonnet-5-5",
  },
  {
    id: "h-2026-09-29-gpt-6-1-sol", date: "2026-09-29", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-6.1 Sol", en: "GPT-6.1 Sol" },
    summary: {
      it: "Al DevDay OpenAI presenta GPT-6.1 Sol, aggiornamento di GPT-6 Sol con prestazioni dichiarate vicine a GPT-6 Astra a un costo per token ridotto.",
      en: "At DevDay OpenAI introduces GPT-6.1 Sol, an update to GPT-6 Sol with performance claimed close to GPT-6 Astra at a lower cost per token.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/introducing-gpt-6-1-sol/",
  },
  {
    id: "h-2026-10-07-gpt-6", date: "2026-10-07", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-6 e Intelligent UI", en: "GPT-6 and Intelligent UI" },
    summary: {
      it: "OpenAI avvia il rilascio di GPT-6 nelle varianti Sol e Luna a tutti gli utenti ChatGPT, insieme a una nuova interfaccia chiamata Intelligent UI.",
      en: "OpenAI begins rolling out GPT-6 in Sol and Luna variants to all ChatGPT users, together with a new interface called Intelligent UI.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/gpt-6-for-everyone/",
  },
  {
    id: "h-2026-10-07-claude-haiku-5-5", date: "2026-10-07", type: "milestone", lens: "models", actorId: "anthropic",
    title: { it: "Claude Haiku 5.5", en: "Claude Haiku 5.5" },
    summary: {
      it: "Anthropic rilascia Claude Haiku 5.5, modello piccolo della famiglia Claude 5.5 pensato per compiti ad alto volume e a basso costo.",
      en: "Anthropic releases Claude Haiku 5.5, the small model of the Claude 5.5 family, built for high-volume, low-cost tasks.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/claude-haiku-5-5",
  },
  {
    id: "h-2026-10-13-gemini-4-argon", date: "2026-10-13", type: "milestone", lens: "models", actorId: "google",
    title: { it: "Gemini 4 Argon", en: "Gemini 4 Argon" },
    summary: {
      it: "Google annuncia Gemini 4 Argon, primo modello della serie Gemini 4, reso disponibile tramite API, app e ricerca.",
      en: "Google announces Gemini 4 Argon, the first model in the Gemini 4 series, made available through the API, the app and Search.",
    },
    sourceLabel: { it: "Google", en: "Google" }, sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/",
  },
  {
    id: "h-2026-10-26-gpt-6-1-terra", date: "2026-10-26", type: "milestone", lens: "models", actorId: "openai",
    title: { it: "GPT-6.1 Terra", en: "GPT-6.1 Terra" },
    summary: {
      it: "OpenAI rilascia GPT-6.1 Terra, variante intermedia tra Sol e Luna con uso veloce ed efficace del computer.",
      en: "OpenAI releases GPT-6.1 Terra, a middle tier between Sol and Luna with fast and effective computer use.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/products/release-notes/",
  },
  {
    id: "h-2026-10-28-gemini-4-carbon", date: "2026-10-28", type: "milestone", lens: "models", actorId: "google",
    title: { it: "Gemini 4 Carbon", en: "Gemini 4 Carbon" },
    summary: {
      it: "Google annuncia Gemini 4 Carbon, modello orientato a compiti agentici di lunga durata e alla sicurezza informatica, con accesso iniziale riservato ai difensori tramite il programma Fairwind.",
      en: "Google announces Gemini 4 Carbon, a model aimed at long-horizon agentic tasks and cybersecurity, with initial access limited to defenders through the Fairwind programme.",
    },
    sourceLabel: { it: "Google", en: "Google" }, sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/",
  },
];
