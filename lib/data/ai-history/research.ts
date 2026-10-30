import type { TimelineEvent } from "../trasparenza";

/**
 * Lens: research. Papers and results that changed how the field works.
 *
 * Editorial rules for this file:
 * - Source must be the primary publication (arXiv, Nature, the lab's own
 *   research blog, the conference page). Wikis, news round-ups and SEO pages
 *   are not accepted.
 * - The date is the publication date of the paper/result, never a coverage date.
 * - No tone, no ranking, no "revolutionary": state what was shown.
 */
export const researchEvents: TimelineEvent[] = [
  {
    id: "h-2013-01-16-word2vec", date: "2013-01-16", type: "milestone", lens: "research", actorId: "google",
    title: { it: "Efficient Estimation of Word Representations in Vector Space", en: "Efficient Estimation of Word Representations in Vector Space" },
    summary: {
      it: "Mikolov e colleghi propongono due architetture, CBOW e skip-gram, per calcolare rappresentazioni vettoriali continue delle parole da grandi corpora; i vettori catturano regolarità semantiche e sintattiche misurate con compiti di analogia.",
      en: "Mikolov and colleagues propose two architectures, CBOW and skip-gram, for computing continuous word vectors from large corpora; the vectors capture semantic and syntactic regularities measured through analogy tasks.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/1301.3781",
  },
  {
    id: "h-2014-06-10-gan", date: "2014-06-10", type: "milestone", lens: "research",
    title: { it: "Generative Adversarial Networks", en: "Generative Adversarial Networks" },
    summary: {
      it: "Goodfellow e colleghi propongono un addestramento con due reti in competizione: un generatore produce campioni e un discriminatore distingue i campioni reali da quelli generati, mentre entrambi vengono aggiornati insieme.",
      en: "Goodfellow and colleagues propose a training scheme with two competing networks: a generator produces samples while a discriminator distinguishes real from generated samples, both updated together.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/1406.2661",
  },
  {
    id: "h-2015-11-09-tensorflow", date: "2015-11-09", type: "milestone", lens: "research", actorId: "google",
    title: { it: "TensorFlow: smarter machine learning, for everyone", en: "TensorFlow: smarter machine learning, for everyone" },
    summary: {
      it: "Google rilascia in open source TensorFlow, un sistema di calcolo per l'apprendimento automatico sviluppato dal team Google Brain; descrive i calcoli come grafi di flusso di dati ed è distribuito su più piattaforme, dai telefoni ai cluster di GPU.",
      en: "Google open-sources TensorFlow, a machine-learning computation system built by the Google Brain team; it represents computations as dataflow graphs and is distributed across platforms, from phones to GPU clusters.",
    },
    sourceLabel: { it: "Google", en: "Google" }, sourceUrl: "https://blog.google/innovation-and-ai/products/tensorflow-smarter-machine-learning-for/",
  },
  {
    id: "h-2015-12-10-resnet", date: "2015-12-10", type: "milestone", lens: "research", actorId: "microsoft",
    title: { it: "Deep Residual Learning for Image Recognition", en: "Deep Residual Learning for Image Recognition" },
    summary: {
      it: "He e colleghi introducono le connessioni residue, che riformulano l'apprendimento come riferimento a una mappatura identitaria e permettono di addestrare reti convoluzionali molto profonde; una rete da 152 strati si classifica prima in ILSVRC 2015.",
      en: "He and colleagues introduce residual connections, which reformulate learning as a reference to an identity mapping and make very deep convolutional networks trainable; a 152-layer network ranks first in ILSVRC 2015.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/1512.03385",
  },
  {
    id: "h-2016-01-27-alphago", date: "2016-01-27", type: "milestone", lens: "research", actorId: "google",
    title: { it: "Mastering the game of Go with deep neural networks and tree search", en: "Mastering the game of Go with deep neural networks and tree search" },
    summary: {
      it: "DeepMind combina reti neurali convoluzionali, una rete di policy e una di valore, con la ricerca ad albero Monte Carlo; il sistema batte il campione europeo Fan Hui per 5 a 0 nel gioco del Go.",
      en: "DeepMind combines convolutional neural networks, a policy network and a value network, with Monte Carlo tree search; the system beats European champion Fan Hui 5-0 at Go.",
    },
    sourceLabel: { it: "Nature", en: "Nature" }, sourceUrl: "https://www.nature.com/articles/nature16961",
  },
  {
    id: "h-2017-01-19-pytorch", date: "2017-01-19", type: "milestone", lens: "research", actorId: "meta",
    title: { it: "PyTorch, a Python-first deep learning framework", en: "PyTorch, a Python-first deep learning framework" },
    summary: {
      it: "Facebook AI Research rende pubblico PyTorch, una libreria di deep learning che combina un'interfaccia Python con il motore di calcolo di Torch; i grafi di calcolo vengono costruiti in modo dinamico durante l'esecuzione anziché essere definiti in anticipo.",
      en: "Facebook AI Research publicly releases PyTorch, a deep learning library combining a Python interface with the Torch compute engine; computation graphs are built dynamically at runtime rather than being defined in advance.",
    },
    sourceLabel: { it: "PyTorch", en: "PyTorch" }, sourceUrl: "https://pytorch.org/blog/a-year-in/",
  },
  {
    id: "h-2017-01-23-moe", date: "2017-01-23", type: "milestone", lens: "research", actorId: "google",
    title: { it: "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer", en: "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer" },
    summary: {
      it: "Shazeer e colleghi propongono uno strato a miscela di esperti con gating sparso: una rete di gating seleziona pochi esperti per ogni esempio, aumentando di molto il numero di parametri a fronte di un costo di calcolo contenuto.",
      en: "Shazeer and colleagues propose a sparsely-gated mixture-of-experts layer: a gating network selects a few experts per example, greatly increasing parameter count at limited compute cost.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/1701.06538",
  },
  {
    id: "h-2017-06-12-attention", date: "2017-06-12", type: "milestone", lens: "research", actorId: "google",
    title: { it: "Attention Is All You Need", en: "Attention Is All You Need" },
    summary: {
      it: "Vaswani e colleghi propongono il Transformer, un'architettura di rete per sequenze basata solo su meccanismi di attenzione, senza ricorrenza né convoluzioni.",
      en: "Vaswani and colleagues propose the Transformer, a sequence architecture based solely on attention mechanisms, without recurrence or convolutions.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/1706.03762",
  },
  {
    id: "h-2017-06-12-rlhf", date: "2017-06-12", type: "milestone", lens: "research", actorId: "openai",
    title: { it: "Deep reinforcement learning from human preferences", en: "Deep reinforcement learning from human preferences" },
    summary: {
      it: "Christiano e colleghi addestrano agenti di reinforcement learning a partire da confronti tra brevi segmenti di comportamento espressi da valutatori umani, invece che da una funzione di ricompensa definita a mano; il metodo impara una funzione di ricompensa e la usa per addestrare una policy su compiti simulati.",
      en: "Christiano and colleagues train reinforcement-learning agents from comparisons between short behaviour segments expressed by human evaluators, instead of a hand-specified reward function; the method learns a reward function and uses it to train a policy on simulated tasks.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/1706.03741",
  },
  {
    id: "h-2017-07-20-ppo", date: "2017-07-20", type: "milestone", lens: "research", actorId: "openai",
    title: { it: "Proximal Policy Optimization Algorithms", en: "Proximal Policy Optimization Algorithms" },
    summary: {
      it: "Schulman e colleghi propongono un algoritmo di policy gradient che alterna il campionamento dei dati e l'ottimizzazione di una funzione obiettivo con un vincolo di aggiornamento limitato, senza una regione di fiducia esplicita; riportano prestazioni paragonabili o migliori dei metodi precedenti su compiti di controllo.",
      en: "Schulman and colleagues propose a policy-gradient algorithm that alternates sampling data and optimising an objective with a clipped update constraint, without an explicit trust region; they report performance comparable to or better than prior methods on control tasks.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/1707.06347",
  },
  {
    id: "h-2017-10-19-alphago-zero", date: "2017-10-19", type: "milestone", lens: "research", actorId: "google",
    title: { it: "Mastering the game of Go without human knowledge", en: "Mastering the game of Go without human knowledge" },
    summary: {
      it: "DeepMind addestra AlphaGo Zero solo tramite auto-gioco, senza partite umane né conoscenza del dominio oltre alle regole; il sistema batte le versioni precedenti di AlphaGo per 100 partite a 0.",
      en: "DeepMind trains AlphaGo Zero only through self-play, without human games or domain knowledge beyond the rules; the system defeats earlier AlphaGo versions 100-0.",
    },
    sourceLabel: { it: "Nature", en: "Nature" }, sourceUrl: "https://www.nature.com/articles/nature24270",
  },
  {
    id: "h-2018-10-11-bert", date: "2018-10-11", type: "milestone", lens: "research", actorId: "google",
    title: { it: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", en: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding" },
    summary: {
      it: "Devlin e colleghi presentano BERT, un encoder Transformer pre-addestrato con due compiti, predizione di parole mascherate e della frase successiva, a partire dal contesto bidirezionale; il modello viene poi adattato ai singoli compiti con un fine-tuning aggiuntivo.",
      en: "Devlin and colleagues present BERT, a Transformer encoder pre-trained with two tasks, masked-word prediction and next-sentence prediction, from bidirectional context; the model is then adapted to individual tasks with an extra fine-tuning step.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/1810.04805",
  },
  {
    id: "h-2020-01-23-scaling-laws", date: "2020-01-23", type: "milestone", lens: "research", actorId: "openai",
    title: { it: "Scaling Laws for Neural Language Models", en: "Scaling Laws for Neural Language Models" },
    summary: {
      it: "Kaplan e colleghi misurano come la perdita di un modello linguistico diminuisca come legge di potenza al crescere di dimensione del modello, dati e calcolo di addestramento, con andamenti che coprono più di sette ordini di grandezza.",
      en: "Kaplan and colleagues measure how language-model loss falls as a power law with model size, dataset size and training compute, with trends spanning more than seven orders of magnitude.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2001.08361",
  },
  {
    id: "h-2020-05-22-rag", date: "2020-05-22", type: "milestone", lens: "research", actorId: "meta",
    title: { it: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", en: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" },
    summary: {
      it: "Lewis e colleghi combinano un modello generativo pre-addestrato con un retriever di documenti addestrato insieme; le risposte sono condizionate su passaggi recuperati da un indice per compiti ad alta intensità di conoscenza.",
      en: "Lewis and colleagues combine a pre-trained generative model with a jointly trained document retriever; answers are conditioned on passages retrieved from an index for knowledge-intensive tasks.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2005.11401",
  },
  {
    id: "h-2020-06-19-ddpm", date: "2020-06-19", type: "milestone", lens: "research",
    title: { it: "Denoising Diffusion Probabilistic Models", en: "Denoising Diffusion Probabilistic Models" },
    summary: {
      it: "Ho, Jain e Abbeel addestrano un modello latente che impara a invertire un processo di diffusione, aggiungendo e rimuovendo rumore gaussiano; il metodo produce risultati di sintesi di immagini su CIFAR10 e LSUN.",
      en: "Ho, Jain and Abbeel train a latent model that learns to reverse a diffusion process, adding and removing Gaussian noise; the method produces image synthesis results on CIFAR10 and LSUN.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2006.11239",
  },
  {
    id: "h-2020-12-23-muzero", date: "2020-12-23", type: "milestone", lens: "research", actorId: "google",
    title: { it: "Mastering Atari, Go, chess and shogi by planning with a learned model", en: "Mastering Atari, Go, chess and shogi by planning with a learned model" },
    summary: {
      it: "DeepMind presenta MuZero, un agente che impara un modello della dinamica dell'ambiente e pianifica con la ricerca ad albero Monte Carlo senza ricevere le regole del gioco; ottiene risultati allo stato dell'arte su Atari, Go, scacchi e shogi.",
      en: "DeepMind presents MuZero, an agent that learns a model of the environment's dynamics and plans with Monte Carlo tree search without being given the game rules; it reaches state-of-the-art results on Atari, Go, chess and shogi.",
    },
    sourceLabel: { it: "Nature", en: "Nature" }, sourceUrl: "https://www.nature.com/articles/s41586-020-03051-4",
  },
  {
    id: "h-2021-01-11-switch-transformer", date: "2021-01-11", type: "milestone", lens: "research", actorId: "google",
    title: { it: "Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity", en: "Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity" },
    summary: {
      it: "Fedus, Zoph e Shazeer semplificano il routing della miscela di esperti instradando ogni token a un solo esperto; con questa architettura addestrano modelli fino a mille miliardi di parametri.",
      en: "Fedus, Zoph and Shazeer simplify mixture-of-experts routing by sending each token to a single expert; with this design they train models up to one trillion parameters.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2101.03961",
  },
  {
    id: "h-2021-02-26-clip", date: "2021-02-26", type: "milestone", lens: "research", actorId: "openai",
    title: { it: "Learning Transferable Visual Models From Natural Language Supervision", en: "Learning Transferable Visual Models From Natural Language Supervision" },
    summary: {
      it: "Radford e colleghi addestrano un encoder di immagini e uno di testo a prevedere quali didascalie corrispondono a quali immagini su 400 milioni di coppie; il modello riconosce categorie visive senza esempi specifici per il compito.",
      en: "Radford and colleagues train an image and a text encoder to predict which captions match which images across 400 million pairs; the model recognises visual categories without task-specific examples.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2103.00020",
  },
  {
    id: "h-2021-06-17-lora", date: "2021-06-17", type: "milestone", lens: "research", actorId: "microsoft",
    title: { it: "LoRA: Low-Rank Adaptation of Large Language Models", en: "LoRA: Low-Rank Adaptation of Large Language Models" },
    summary: {
      it: "Hu e colleghi congelano i pesi del modello e addestrano matrici di rango ridotto in parallelo a quelli; il numero di parametri addestrabili si riduce di ordini di grandezza.",
      en: "Hu and colleagues freeze the model weights and train low-rank matrices in parallel to them; the number of trainable parameters drops by orders of magnitude.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2106.09685",
  },
  {
    id: "h-2021-07-15-alphafold", date: "2021-07-15", type: "milestone", lens: "research", actorId: "google",
    title: { it: "Highly accurate protein structure prediction with AlphaFold", en: "Highly accurate protein structure prediction with AlphaFold" },
    summary: {
      it: "Jumper e colleghi presentano AlphaFold, una rete neurale che predice strutture proteiche con accuratezza atomica; il sistema ottiene prestazioni vicine a quelle sperimentali nella valutazione CASP14.",
      en: "Jumper and colleagues present AlphaFold, a neural network that predicts protein structures with atomic accuracy; the system performs close to experimental accuracy in the CASP14 assessment.",
    },
    sourceLabel: { it: "Nature", en: "Nature" }, sourceUrl: "https://www.nature.com/articles/s41586-021-03819-2",
  },
  {
    id: "h-2022-01-28-chain-of-thought", date: "2022-01-28", type: "milestone", lens: "research", actorId: "google",
    title: { it: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models", en: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" },
    summary: {
      it: "Wei e colleghi mostrano che includere nel prompt esempi con passaggi intermedi di ragionamento migliora le prestazioni di modelli linguistici di grande scala su problemi aritmetici, di senso comune e simbolici.",
      en: "Wei and colleagues show that including worked reasoning steps in the prompt improves the performance of large language models on arithmetic, commonsense and symbolic problems.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2201.11903",
  },
  {
    id: "h-2022-03-04-instructgpt", date: "2022-03-04", type: "milestone", lens: "research", actorId: "openai",
    title: { it: "Training language models to follow instructions with human feedback", en: "Training language models to follow instructions with human feedback" },
    summary: {
      it: "Ouyang e colleghi addestrano un modello con feedback umano: dimostrazioni, un modello di ricompensa addestrato su confronti tra risposte e ottimizzazione con PPO; gli annotatori preferiscono le sue risposte a quelle di GPT-3 da 175 miliardi di parametri.",
      en: "Ouyang and colleagues train a model with human feedback: demonstrations, a reward model trained on answer comparisons, and PPO optimisation; annotators prefer its answers to those of 175B-parameter GPT-3.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2203.02155",
  },
  {
    id: "h-2022-03-29-chinchilla", date: "2022-03-29", type: "milestone", lens: "research", actorId: "google",
    title: { it: "Training Compute-Optimal Large Language Models", en: "Training Compute-Optimal Large Language Models" },
    summary: {
      it: "Hoffmann e colleghi stimano che, a budget di calcolo fisso, dimensione del modello e numero di token di addestramento vadano fatti crescere in proporzione simile; il modello Chinchilla da 70 miliardi di parametri supera Gopher da 280 miliardi.",
      en: "Hoffmann and colleagues estimate that, at a fixed compute budget, model size and training tokens should grow in similar proportion; the 70B-parameter Chinchilla outperforms the 280B-parameter Gopher.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2203.15556",
  },
  {
    id: "h-2022-05-12-gato", date: "2022-05-12", type: "milestone", lens: "research", actorId: "google",
    title: { it: "A Generalist Agent", en: "A Generalist Agent" },
    summary: {
      it: "DeepMind presenta Gato, una singola rete con gli stessi pesi addestrata su centinaia di compiti; serializza dati di testo, immagini, giochi e controllo robotico in un'unica sequenza e produce in output testo, comandi o azioni a seconda del contesto.",
      en: "DeepMind presents Gato, a single network with the same weights trained on hundreds of tasks; it serialises text, image, game and robotic-control data into a flat sequence and outputs text, commands or actions depending on context.",
    },
    sourceLabel: { it: "DeepMind", en: "DeepMind" }, sourceUrl: "https://www.deepmind.com/blog/a-generalist-agent",
  },
  {
    id: "h-2022-05-27-flashattention", date: "2022-05-27", type: "milestone", lens: "research",
    title: { it: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness", en: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness" },
    summary: {
      it: "Dao e colleghi propongono un algoritmo di attenzione esatto che usa il tiling per ridurre le letture e scritture di memoria tra la HBM e la SRAM della GPU; riportano esecuzione più rapida e minore occupazione di memoria.",
      en: "Dao and colleagues propose an exact attention algorithm that uses tiling to reduce memory reads and writes between GPU HBM and SRAM; they report faster execution and lower memory use.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2205.14135",
  },
  {
    id: "h-2022-06-29-minerva", date: "2022-06-29", type: "milestone", lens: "research", actorId: "google",
    title: { it: "Solving Quantitative Reasoning Problems with Language Models", en: "Solving Quantitative Reasoning Problems with Language Models" },
    summary: {
      it: "Google Research presenta Minerva, un modello addestrato su dati scientifici e matematici e valutato facendogli produrre passaggi intermedi; risolve problemi quantitativi a livello di competizioni universitarie e di livello olimpico.",
      en: "Google Research presents Minerva, a model trained on scientific and mathematical data and evaluated by having it produce intermediate steps; it solves quantitative problems at university-competition and olympiad level.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2206.14858",
  },
  {
    id: "h-2022-07-28-alphafold-database", date: "2022-07-28", type: "milestone", lens: "research", actorId: "google",
    title: { it: "AlphaFold releases predicted structures for nearly 200 million proteins", en: "AlphaFold releases predicted structures for nearly 200 million proteins" },
    summary: {
      it: "DeepMind ed EMBL-EBI pubblicano in accesso aperto le strutture predette di circa 200 milioni di proteine, coprendo quasi tutte le sequenze catalogate note; i dati sono resi disponibili attraverso l'AlphaFold DB.",
      en: "DeepMind and EMBL-EBI openly release predicted structures for around 200 million proteins, covering nearly all known catalogued sequences; the data are made available through the AlphaFold DB.",
    },
    sourceLabel: { it: "DeepMind", en: "DeepMind" }, sourceUrl: "https://www.deepmind.com/discover/blog/alphafold-transforms-biology-for-millions-around-the-world/",
  },
  {
    id: "h-2022-09-14-toy-models-superposition", date: "2022-09-14", type: "milestone", lens: "research", actorId: "anthropic",
    title: { it: "Toy Models of Superposition", en: "Toy Models of Superposition" },
    summary: {
      it: "Anthropic studia con modelli ridotti perché le reti rappresentino più caratteristiche di quante dimensioni abbiano a disposizione, sovrapponendole in direzioni non ortogonali; descrive il fenomeno come un cambiamento di fase e ne analizza la geometria.",
      en: "Anthropic studies with small models why networks represent more features than they have dimensions, overlapping them along non-orthogonal directions; it describes the phenomenon as a phase change and analyses its geometry.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://transformer-circuits.pub/2022/toy_model/index.html",
  },
  {
    id: "h-2022-12-15-constitutional-ai", date: "2022-12-15", type: "milestone", lens: "research", actorId: "anthropic",
    title: { it: "Constitutional AI: Harmlessness from AI Feedback", en: "Constitutional AI: Harmlessness from AI Feedback" },
    summary: {
      it: "Anthropic descrive un metodo in cui un modello critica e rivede le proprie risposte in base a un insieme di principi scritti, e un modello di preferenza addestrato su queste valutazioni guida l'addestramento.",
      en: "Anthropic describes a method in which a model critiques and revises its own answers against a written set of principles, and a preference model trained on these judgements drives the training.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2212.08073",
  },
  {
    id: "h-2023-03-06-palm-e", date: "2023-03-06", type: "milestone", lens: "research", actorId: "google",
    title: { it: "PaLM-E: An Embodied Multimodal Language Model", en: "PaLM-E: An Embodied Multimodal Language Model" },
    summary: {
      it: "Google presenta PaLM-E, un modello linguistico multimodale che incorpora le osservazioni sensoriali di un robot come vettori di input; il sistema esegue compiti di manipolazione e pianificazione senza addestramento specifico per ogni attività.",
      en: "Google presents PaLM-E, a multimodal language model that embeds a robot's sensor observations as input vectors; the system performs manipulation and planning tasks without task-specific training.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2303.03378",
  },
  {
    id: "h-2023-04-07-generative-agents", date: "2023-04-07", type: "milestone", lens: "research",
    title: { it: "Generative Agents: Interactive Simulacra of Human Behavior", en: "Generative Agents: Interactive Simulacra of Human Behavior" },
    summary: {
      it: "Park e colleghi costruiscono agenti basati su modelli linguistici che conservano memoria degli eventi, riflettono e pianificano le proprie azioni; in un ambiente simulato riproducono comportamenti sociali come organizzare una festa a partire da poche indicazioni iniziali.",
      en: "Park and colleagues build language-model-based agents that store memories of events, reflect and plan their actions; in a simulated environment they reproduce social behaviour such as organising a party from a few initial prompts.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2304.03442",
  },
  {
    id: "h-2023-05-25-voyager", date: "2023-05-25", type: "milestone", lens: "research", actorId: "nvidia",
    title: { it: "Voyager: An Open-Ended Embodied Agent with Large Language Models", en: "Voyager: An Open-Ended Embodied Agent with Large Language Models" },
    summary: {
      it: "NVIDIA presenta Voyager, un agente che gioca a Minecraft in modo continuo usando un modello linguistico per generare obiettivi, scrivere codice e accumulare una libreria di abilità riutilizzabili; migliora le proprie prestazioni man mano che esplora l'ambiente.",
      en: "NVIDIA presents Voyager, an agent that plays Minecraft continuously, using a language model to generate goals, write code and accumulate a library of reusable skills; it improves its performance as it explores the environment.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2305.16291",
  },
  {
    id: "h-2023-05-29-dpo", date: "2023-05-29", type: "milestone", lens: "research",
    title: { it: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model", en: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model" },
    summary: {
      it: "Rafailov e colleghi formulano l'allineamento alle preferenze come un problema di classificazione risolto direttamente sul modello linguistico, senza addestrare un modello di ricompensa separato né usare reinforcement learning; il metodo è chiamato Direct Preference Optimization.",
      en: "Rafailov and colleagues formulate preference alignment as a classification problem solved directly on the language model, without training a separate reward model or using reinforcement learning; the method is called Direct Preference Optimization.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2305.18290",
  },
  {
    id: "h-2023-07-27-adversarial-attacks", date: "2023-07-27", type: "milestone", lens: "research",
    title: { it: "Universal and Transferable Adversarial Attacks on Aligned Language Models", en: "Universal and Transferable Adversarial Attacks on Aligned Language Models" },
    summary: {
      it: "Zou e colleghi generano automaticamente suffissi di prompt che inducono modelli linguistici allineati a produrre contenuti dannosi; i suffissi trovati su modelli open source si trasferiscono anche a modelli commerciali.",
      en: "Zou and colleagues automatically generate prompt suffixes that induce aligned language models to produce harmful content; suffixes found on open-source models also transfer to commercial models.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2307.15043",
  },
  {
    id: "h-2023-10-04-monosemanticity", date: "2023-10-04", type: "milestone", lens: "research", actorId: "anthropic",
    title: { it: "Towards Monosemanticity: Decomposing Language Models With Dictionary Learning", en: "Towards Monosemanticity: Decomposing Language Models With Dictionary Learning" },
    summary: {
      it: "Anthropic applica un autoencoder sparso alle attivazioni di un Transformer a singolo strato per estrarre caratteristiche interpretabili molto più numerose dei singoli neuroni; ciascuna caratteristica si attiva su pattern di testo riconoscibili.",
      en: "Anthropic applies a sparse autoencoder to the activations of a one-layer Transformer to extract far more interpretable features than individual neurons; each feature activates on recognisable text patterns.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://transformer-circuits.pub/2023/monosemantic-features/index.html",
  },
  {
    id: "h-2023-12-01-mamba", date: "2023-12-01", type: "milestone", lens: "research",
    title: { it: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces", en: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces" },
    summary: {
      it: "Gu e Dao propongono un modello a spazi di stato selettivi che scala linearmente con la lunghezza della sequenza senza attenzione; il paper riporta una velocità di inferenza superiore a quella dei Transformer e una scalatura lineare con la lunghezza.",
      en: "Gu and Dao propose a selective state-space model that scales linearly with sequence length without attention; the paper reports higher inference throughput than Transformers and linear scaling with length.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2312.00752",
  },
  {
    id: "h-2024-01-17-alphageometry", date: "2024-01-17", type: "milestone", lens: "research", actorId: "google",
    title: { it: "Solving olympiad geometry without human demonstrations", en: "Solving olympiad geometry without human demonstrations" },
    summary: {
      it: "Trinh e colleghi presentano AlphaGeometry, un sistema neuro-simbolico che combina un modello linguistico addestrato su dati sintetici con un motore di deduzione simbolica; risolve 25 dei 30 problemi di geometria olimpionica del test.",
      en: "Trinh and colleagues present AlphaGeometry, a neuro-symbolic system combining a language model trained on synthetic data with a symbolic deduction engine; it solves 25 of 30 olympiad geometry test problems.",
    },
    sourceLabel: { it: "Nature", en: "Nature" }, sourceUrl: "https://www.nature.com/articles/s41586-023-06747-5",
  },
  {
    id: "h-2024-12-20-o3-arc", date: "2024-12-20", type: "milestone", lens: "research", actorId: "openai",
    title: { it: "OpenAI o3 breakthrough score on ARC-AGI", en: "OpenAI o3 breakthrough score on ARC-AGI" },
    summary: {
      it: "Nel giorno conclusivo dei '12 giorni di OpenAI', l'azienda presenta il modello di ragionamento o3; su ARC-AGI raggiunge il 75,7% nella valutazione semi-privata entro il limite di calcolo pubblico e l'87,5% in una configurazione ad alto calcolo.",
      en: "On the final day of OpenAI's '12 Days' announcements, the company presents the o3 reasoning model; on ARC-AGI it scores 75.7% on the semi-private evaluation within the public compute limit and 87.5% in a high-compute configuration.",
    },
    sourceLabel: { it: "ARC Prize", en: "ARC Prize" }, sourceUrl: "https://arcprize.org/blog/oai-o3-pub-breakthrough",
  },
  {
    id: "h-2025-03-19-metr-long-tasks", date: "2025-03-19", type: "milestone", lens: "research",
    title: { it: "Measuring AI Ability to Complete Long Software Tasks", en: "Measuring AI Ability to Complete Long Software Tasks" },
    summary: {
      it: "METR propone di misurare le capacità dei modelli in base alla durata dei compiti che riescono a completare, usando l'orizzonte temporale al 50% di successo; stima che questo orizzonte raddoppi circa ogni sette mesi dal 2019.",
      en: "METR proposes measuring model capabilities by the length of tasks they can complete, using the 50% success time horizon; it estimates that this horizon has doubled roughly every seven months since 2019.",
    },
    sourceLabel: { it: "METR", en: "METR" }, sourceUrl: "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/",
  },
  {
    id: "h-2025-07-19-imo-gold", date: "2025-07-19", type: "milestone", lens: "research", actorId: "google",
    title: { it: "Gold-medal performance at the International Mathematical Olympiad", en: "Gold-medal performance at the International Mathematical Olympiad" },
    summary: {
      it: "DeepMind annuncia che una versione avanzata di Gemini Deep Think risolve cinque dei sei problemi dell'IMO 2025 in linguaggio naturale entro il tempo previsto, totalizzando 35 punti, la soglia da medaglia d'oro; nella stessa giornata anche OpenAI riporta lo stesso punteggio.",
      en: "DeepMind announces that an advanced version of Gemini Deep Think solves five of the six IMO 2025 problems in natural language within the time limit, scoring 35 points, the gold-medal threshold; the same day OpenAI also reports the same score.",
    },
    sourceLabel: { it: "DeepMind", en: "DeepMind" }, sourceUrl: "https://deepmind.google/discover/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/",
  },
  {
    id: "h-2025-11-13-ai-espionage", date: "2025-11-13", type: "milestone", lens: "research", actorId: "anthropic",
    title: { it: "Disrupting an AI-orchestrated cyber espionage campaign", en: "Disrupting an AI-orchestrated cyber espionage campaign" },
    summary: {
      it: "Anthropic riferisce di aver individuato e contrastato un'operazione di spionaggio informatico in cui un gruppo sostenuto da uno Stato ha usato il proprio modello per eseguire gran parte delle azioni offensive, prendendo di mira circa trenta obiettivi.",
      en: "Anthropic reports that it detected and disrupted a cyber-espionage operation in which a state-sponsored group used its model to carry out much of the offensive activity, targeting around thirty entities.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/disrupting-AI-espionage",
  },
  {
    id: "h-2026-01-29-metr-time-horizon-1-1", date: "2026-01-29", type: "milestone", lens: "research",
    title: { it: "Time Horizon 1.1", en: "Time Horizon 1.1" },
    summary: {
      it: "METR pubblica una revisione delle proprie stime sull'orizzonte temporale dei modelli, estendendo il set di compiti da 170 a 228 e migrando l'infrastruttura di valutazione; le nuove stime ricadono in gran parte negli intervalli di confidenza precedenti.",
      en: "METR publishes a revision of its model time-horizon estimates, extending the task suite from 170 to 228 and migrating the evaluation infrastructure; the new estimates largely fall within the previous confidence intervals.",
    },
    sourceLabel: { it: "METR", en: "METR" }, sourceUrl: "https://metr.org/blog/2026-1-29-time-horizon-1-1/",
  },
  {
    id: "h-2026-05-20-unit-distance", date: "2026-05-20", type: "milestone", lens: "research", actorId: "openai",
    title: { it: "An OpenAI model has disproved a central conjecture in discrete geometry", en: "An OpenAI model has disproved a central conjecture in discrete geometry" },
    summary: {
      it: "OpenAI riferisce che un proprio modello interno ha confutato la congettura di Erdős sul problema delle distanze unitarie, costruendo una famiglia infinita di configurazioni con un miglioramento polinomiale rispetto alla griglia quadrata; la dimostrazione è stata verificata da matematici esterni.",
      en: "OpenAI reports that an internal model disproved Erdős's conjecture on the unit distance problem, constructing an infinite family of configurations with a polynomial improvement over the square grid; the proof was checked by external mathematicians.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/model-disproves-discrete-geometry-conjecture/",
  },
  {
    id: "h-2026-07-19-jacobian-conjecture", date: "2026-07-19", type: "milestone", lens: "research",
    title: { it: "A counterexample to the Jacobian conjecture", en: "A counterexample to the Jacobian conjecture" },
    summary: {
      it: "Il matematico Levent Alpöge annuncia una mappa polinomiale esplicita che confuta la congettura jacobiana in dimensione tre, formulata nel 1939; il risultato, ottenuto con l'aiuto di un modello AI, viene verificato indipendentemente e in seguito esteso a dimensioni superiori.",
      en: "Mathematician Levent Alpöge announces an explicit polynomial map that disproves the Jacobian conjecture in dimension three, stated in 1939; the result, obtained with the help of an AI model, is independently checked and later extended to higher dimensions.",
    },
    sourceLabel: { it: "arXiv", en: "arXiv" }, sourceUrl: "https://arxiv.org/abs/2608.00222",
  },
  {
    id: "h-2026-08-06-bacteriophages", date: "2026-08-06", type: "milestone", lens: "research",
    title: { it: "Generative design of bacteriophages with genome language models", en: "Generative design of bacteriophages with genome language models" },
    summary: {
      it: "Un gruppo di Stanford, Arc Institute e Broad Institute usa i modelli genomici Evo 1 ed Evo 2 per progettare genomi completi di batteriofagi a partire dal fago ΦX174; dopo sintesi e test, 16 dei virus generati infettano efficacemente E. coli.",
      en: "A team from Stanford, the Arc Institute and the Broad Institute uses the genome models Evo 1 and Evo 2 to design complete bacteriophage genomes starting from phage ΦX174; after synthesis and testing, 16 of the generated viruses successfully infect E. coli.",
    },
    sourceLabel: { it: "Science", en: "Science" }, sourceUrl: "https://www.science.org/doi/10.1126/science.aec2657",
  },
  {
    id: "h-2026-08-26-hf-incident-investigation", date: "2026-08-26", type: "milestone", lens: "research",
    title: { it: "Independent investigation of the OpenAI / Hugging Face incident", en: "Independent investigation of the OpenAI / Hugging Face incident" },
    summary: {
      it: "METR pubblica un'indagine indipendente sul comportamento di agenti durante un episodio di sicurezza: circa 1200 agenti destinati a restare isolati hanno trovato un canale di comunicazione non previsto scambiandosi oltre 70.000 messaggi, e circa 700 hanno poi preso parte all'attacco ai sistemi di Hugging Face.",
      en: "METR publishes an independent investigation into agents' behaviour during a security incident: around 1,200 agents meant to remain isolated found an unplanned communication channel, exchanging over 70,000 messages, and about 700 then took part in the attack on Hugging Face's systems.",
    },
    sourceLabel: { it: "METR", en: "METR" }, sourceUrl: "https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/",
  },
  {
    id: "h-2026-09-04-fermat", date: "2026-09-04", type: "milestone", lens: "research", actorId: "anthropic",
    title: { it: "Formalizing Fermat's Last Theorem", en: "Formalizing Fermat's Last Theorem" },
    summary: {
      it: "Anthropic riferisce che un proprio modello ha prodotto, in gran parte in autonomia, la prima dimostrazione completa dell'Ultimo teorema di Fermat verificata da un assistente di dimostrazione, in Lean; il lavoro ha richiesto circa 13 milioni di righe di codice e circa 29.500 teoremi intermedi.",
      en: "Anthropic reports that one of its models produced, largely autonomously, the first complete proof of Fermat's Last Theorem verified by a proof assistant, in Lean; the work required roughly 13 million lines of code and about 29,500 intermediate theorems.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/research/formalizing-fermats-last-theorem",
  },
  {
    id: "h-2026-09-08-navier-stokes", date: "2026-09-08", type: "milestone", lens: "research", actorId: "openai",
    title: { it: "On the Navier–Stokes Millennium Prize Problem", en: "On the Navier–Stokes Millennium Prize Problem" },
    summary: {
      it: "OpenAI rende pubblica una soluzione del problema di esistenza e regolarità delle equazioni di Navier-Stokes, uno dei problemi del millennio; il sistema interno mostra che un fluido inizialmente regolare può sviluppare una singolarità in tempo finito, con una formalizzazione in Lean a corredo.",
      en: "OpenAI publishes a solution to the Navier–Stokes existence and smoothness problem, one of the Millennium Prize Problems; the internal system shows that an initially smooth fluid can develop a singularity in finite time, with a Lean formalisation included.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/navier-stokes-solution/",
  },
  {
    id: "h-2026-09-09-cyber-incidents-assessment", date: "2026-09-09", type: "milestone", lens: "research", actorId: "anthropic",
    title: { it: "An alignment assessment of recent cybersecurity incidents", en: "An alignment assessment of recent cybersecurity incidents" },
    summary: {
      it: "Anthropic pubblica una valutazione di allineamento su quattro episodi in cui propri modelli hanno ottenuto accesso non autorizzato a sistemi reali di terze parti durante valutazioni di sicurezza informatica; il documento descrive il comportamento dei modelli e amplia lo scrutinio delle trascrizioni di valutazione.",
      en: "Anthropic publishes an alignment assessment of four incidents in which its models gained unauthorised access to real third-party systems during cybersecurity evaluations; the report describes the models' behaviour and broadens the review of evaluation transcripts.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents",
  },
  {
    id: "h-2026-09-17-pace-of-ai-development", date: "2026-09-17", type: "milestone", lens: "research", actorId: "anthropic",
    title: { it: "Measuring the pace of AI development inside frontier labs", en: "Measuring the pace of AI development inside frontier labs" },
    summary: {
      it: "Anthropic delinea tre misure per osservare il ritmo dello sviluppo di IA nei laboratori di frontiera — quanto della ricerca e sviluppo è svolto dall'IA stessa, quanto sono supervisionate le azioni degli agenti e come viene allocato il calcolo — e ne fornisce un'istantanea interna: ad agosto 2026 il modello Claude guida circa il 26% del lavoro di R&S dell'azienda, contro meno dell'1% a febbraio.",
      en: "Anthropic outlines three measurements for tracking the pace of AI development in frontier labs — how much R&D is performed by AI itself, how well agents' actions are overseen, and how compute is allocated — and gives an internal snapshot: as of August 2026 Claude leads about 26% of the company's AI R&D work, up from under 1% in February.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/institute/measuring-pace-of-ai-development",
  },
  {
    id: "h-2026-09-23-art-enzyme-system", date: "2026-09-23", type: "milestone", lens: "research", actorId: "anthropic",
    title: { it: "Claude discovers a novel enzyme system with CRISPR-like repeats", en: "Claude discovers a novel enzyme system with CRISPR-like repeats" },
    summary: {
      it: "Anthropic condivide risultati preliminari in cui un agente basato su Claude ha individuato in modo autonomo un sistema enzimatico non descritto, associato a una serie di ripetizioni di DNA simile a CRISPR; la funzione del sistema non è ancora nota e i risultati sono in preprint.",
      en: "Anthropic shares early results in which a Claude-based agent autonomously identified a previously undescribed enzyme system, associated with an array of DNA repeats reminiscent of CRISPR; the system's function is not yet known and the results are in preprint.",
    },
    sourceLabel: { it: "Anthropic", en: "Anthropic" }, sourceUrl: "https://www.anthropic.com/news/claude-discovers-novel-enzyme-system",
  },
  {
    id: "h-2026-09-25-dns-chatbot-incident", date: "2026-09-25", type: "milestone", lens: "research", actorId: "openai",
    title: { it: "An agent used DNS to reach an external chatbot", en: "An agent used DNS to reach an external chatbot" },
    summary: {
      it: "OpenAI documenta un episodio in cui un modello interno di ricerca, durante un addestramento, ha sfruttato un filtro DNS insufficiente per raggiungere via internet un servizio chatbot esterno e porgli delle richieste; il caso è riportato nella pagina dei report di disallineamento dell'azienda.",
      en: "OpenAI documents an episode in which an internal research model, during training, exploited insufficient DNS filtering to reach an external chatbot service over the internet and send it requests; the case is reported on the company's misalignment-reports page.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://alignment.openai.com/misalignment-reports/an-agent-used-dns-to-reach-an-external-chatbot",
  },
  {
    id: "h-2026-09-26-hugging-face-incident", date: "2026-09-26", type: "milestone", lens: "research", actorId: "openai",
    title: { it: "The Hugging Face incident and the road ahead", en: "The Hugging Face incident and the road ahead" },
    summary: {
      it: "OpenAI pubblica un resoconto di un episodio avvenuto durante valutazioni interne di sicurezza informatica, in cui modelli hanno aggirato i controlli di isolamento dal web e compromesso parti della propria infrastruttura di ricerca e dei sistemi di Hugging Face; il documento descrive le cause e le misure correttive.",
      en: "OpenAI publishes an account of an episode during internal cybersecurity evaluations in which models bypassed internet-isolation controls and compromised parts of its own research infrastructure and Hugging Face's systems; the document describes the causes and corrective measures.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/hugging-face-incident-and-the-road-ahead/",
  },
  {
    id: "h-2026-10-06-openai-math", date: "2026-10-06", type: "milestone", lens: "research", actorId: "openai",
    title: { it: "Sharing progress in mathematics", en: "Sharing progress in mathematics" },
    summary: {
      it: "OpenAI rende pubblici diversi risultati matematici prodotti dal proprio modello interno di frontiera; per definire pratiche di condivisione, l'azienda riferisce di aver consultato un gruppo consultivo indipendente su matematica e intelligenza artificiale.",
      en: "OpenAI publishes several mathematical results produced by its internal frontier model; to set sharing practices, the company says it consulted an independent advisory group on mathematics and artificial intelligence.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/sharing-ai-progress-in-mathematics/",
  },
  {
    id: "h-2026-10-26-openai-science", date: "2026-10-26", type: "milestone", lens: "research", actorId: "openai",
    title: { it: "Working with academic communities to build scientific understanding", en: "Working with academic communities to build scientific understanding" },
    summary: {
      it: "OpenAI annuncia tre nuovi risultati in matematica, informatica e fisica: la congettura del local smoothing in analisi armonica, l'Ipotesi del Tempo Esponenziale nella teoria della complessità e una prova di esistenza per teorie quantistiche di campo, inclusa la cromodinamica quantistica; i risultati sono condivisi come dati di ricerca grezzi, in attesa di verifica indipendente.",
      en: "OpenAI announces three new results in mathematics, computer science and physics: the local smoothing conjecture in harmonic analysis, the Exponential Time Hypothesis in complexity theory, and an existence proof for quantum field theories including quantum chromodynamics; the results are shared as raw research data, pending independent review.",
    },
    sourceLabel: { it: "OpenAI", en: "OpenAI" }, sourceUrl: "https://openai.com/index/building-scientific-understanding-with-academic-communities/",
  },
];
