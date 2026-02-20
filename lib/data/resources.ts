import type { ContentBlock } from './courses';

export type Resource = {
  id: string;
  slug: string;
  title: { it: string; en: string };
  description: { it: string; en: string };
  category: 'guide' | 'tools' | 'research' | 'legal';
  icon: string;
  readTime: string;
  content: ContentBlock[];
};

export const resources: Resource[] = [
  {
    id: '1',
    slug: 'come-proteggere-email',
    title: {
      it: 'Come proteggere la tua email',
      en: 'How to protect your email',
    },
    description: {
      it: 'Guida pratica per passare a un provider email sicuro e criptato, con confronto tra le migliori alternative.',
      en: 'Practical guide to switching to a secure and encrypted email provider, with a comparison of the best alternatives.',
    },
    category: 'guide',
    icon: 'Mail',
    readTime: '8 min',
    content: [
      {
        type: 'text',
        content: {
          it: 'La tua email è al centro della tua identità digitale: è collegata ai tuoi account social, bancari, sanitari e professionali. Eppure, la maggior parte delle persone usa un provider email che legge, analizza e monetizza il contenuto dei propri messaggi. È arrivato il momento di cambiare.',
          en: 'Your email is at the center of your digital identity: it\'s connected to your social, banking, health and professional accounts. Yet, most people use an email provider that reads, analyzes and monetizes the content of their messages. It\'s time to change.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Perché cambiare provider email?', en: 'Why switch email provider?' },
      },
      {
        type: 'text',
        content: {
          it: 'I grandi provider come Gmail e Outlook offrono servizi gratuiti, ma il costo reale è la tua privacy. Google, ad esempio, analizza le tue email per costruire un profilo pubblicitario dettagliato. Anche se il contenuto dei messaggi non viene più letto direttamente per gli annunci, i metadati (chi scrivi, quando, quanto spesso) vengono raccolti e utilizzati.',
          en: 'Major providers like Gmail and Outlook offer free services, but the real cost is your privacy. Google, for example, analyzes your emails to build a detailed advertising profile. Even though message content is no longer directly read for ads, metadata (who you write to, when, how often) is collected and used.',
        },
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Anche se non hai "nulla da nascondere", la tua email contiene ricevute, conversazioni private, documenti sensibili e link di reset password. Un provider non sicuro è una vulnerabilità per tutta la tua vita digitale.',
          en: 'Even if you have "nothing to hide", your email contains receipts, private conversations, sensitive documents and password reset links. An insecure provider is a vulnerability for your entire digital life.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Le migliori alternative', en: 'The best alternatives' },
      },
      {
        type: 'list',
        items: [
          { it: 'ProtonMail — Crittografia end-to-end, server in Svizzera, open source. Il piano gratuito include 1 GB di spazio e 150 messaggi al giorno. È l\'opzione più completa per la maggior parte degli utenti.', en: 'ProtonMail — End-to-end encryption, servers in Switzerland, open source. The free plan includes 1 GB of space and 150 messages per day. It\'s the most complete option for most users.' },
          { it: 'Tutanota (ora Tuta) — Crittografia end-to-end, server in Germania, open source. Crittografa anche l\'oggetto delle email, cosa che ProtonMail non fa. Piano gratuito disponibile.', en: 'Tutanota (now Tuta) — End-to-end encryption, servers in Germany, open source. Also encrypts email subjects, which ProtonMail doesn\'t do. Free plan available.' },
          { it: 'Posteo — Provider tedesco indipendente, alimentato al 100% da energia verde. Costo di 1€ al mese, nessun dato personale richiesto per la registrazione.', en: 'Posteo — Independent German provider, 100% green energy powered. Cost of €1 per month, no personal data required for registration.' },
          { it: 'Disroot — Servizio gestito da una comunità no-profit, con email, cloud e altri strumenti. Completamente gratuito e basato su software libero.', en: 'Disroot — Service run by a non-profit community, with email, cloud and other tools. Completely free and based on free software.' },
        ],
      },
      {
        type: 'heading',
        content: { it: 'Come migrare senza stress', en: 'How to migrate stress-free' },
      },
      {
        type: 'list',
        items: [
          { it: 'Crea il nuovo account e inizia a usarlo per le nuove registrazioni.', en: 'Create your new account and start using it for new registrations.' },
          { it: 'Aggiorna gli account più importanti (banca, lavoro, social) uno alla volta.', en: 'Update your most important accounts (bank, work, social) one at a time.' },
          { it: 'Imposta un inoltro automatico dal vecchio al nuovo account.', en: 'Set up automatic forwarding from the old to the new account.' },
          { it: 'Dopo 3-6 mesi, controlla se ricevi ancora email importanti sul vecchio account.', en: 'After 3-6 months, check if you still receive important emails on the old account.' },
          { it: 'Quando sei pronto, elimina il vecchio account o disattivalo.', en: 'When you\'re ready, delete or deactivate the old account.' },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'Non hai bisogno di migrare tutto in un giorno. Inizia usando il nuovo provider per le cose nuove, poi migra gradualmente. La cosa più importante è fare il primo passo.',
          en: 'You don\'t need to migrate everything in one day. Start using the new provider for new things, then migrate gradually. The most important thing is to take the first step.',
        },
      },
    ],
  },
  {
    id: '2',
    slug: 'browser-privacy',
    title: {
      it: 'I migliori browser per la privacy',
      en: 'Best browsers for privacy',
    },
    description: {
      it: 'Analisi dei browser che rispettano la tua privacy: Firefox, Brave, Tor e le configurazioni consigliate.',
      en: 'Analysis of browsers that respect your privacy: Firefox, Brave, Tor and recommended configurations.',
    },
    category: 'tools',
    icon: 'Globe',
    readTime: '10 min',
    content: [
      {
        type: 'text',
        content: {
          it: 'Il browser è la tua finestra sul mondo digitale, e anche il punto dove avviene la maggior parte del tracciamento. Ogni sito che visiti, ogni ricerca che fai, ogni clic lascia una traccia. La buona notizia è che scegliere il browser giusto può ridurre enormemente la quantità di dati che le aziende raccolgono su di te.',
          en: 'The browser is your window to the digital world, and also where most tracking happens. Every site you visit, every search you make, every click leaves a trace. The good news is that choosing the right browser can enormously reduce the amount of data companies collect about you.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Perché Chrome è un problema', en: 'Why Chrome is a problem' },
      },
      {
        type: 'text',
        content: {
          it: 'Google Chrome detiene oltre il 60% del mercato browser e ha un conflitto di interessi fondamentale: Google guadagna dalla pubblicità, che si basa sul tracciamento. Chrome invia a Google la cronologia di navigazione, le ricerche, e persino cosa scrivi nelle barre degli indirizzi, il tutto collegato al tuo account Google.',
          en: 'Google Chrome holds over 60% of the browser market and has a fundamental conflict of interest: Google earns from advertising, which relies on tracking. Chrome sends Google your browsing history, searches, and even what you type in address bars, all linked to your Google account.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Le alternative consigliate', en: 'Recommended alternatives' },
      },
      {
        type: 'list',
        items: [
          { it: 'Firefox — Il browser open source di Mozilla, una fondazione no-profit. Include protezione anti-tracciamento integrata, blocca i cookie di terze parti e non invia dati a nessuna azienda pubblicitaria. È il miglior compromesso tra privacy e usabilità.', en: 'Firefox — The open source browser from Mozilla, a non-profit foundation. Includes built-in anti-tracking protection, blocks third-party cookies and doesn\'t send data to any advertising company. It\'s the best compromise between privacy and usability.' },
          { it: 'Brave — Basato su Chromium ma con un blocco pubblicitario integrato e protezione anti-fingerprinting. Blocca tracciatori e pubblicità per default. Ha un proprio sistema di ricompense (BAT) che è opzionale.', en: 'Brave — Based on Chromium but with a built-in ad blocker and anti-fingerprinting protection. Blocks trackers and ads by default. Has its own rewards system (BAT) which is optional.' },
          { it: 'Tor Browser — Il massimo livello di anonimato. Fa passare il tuo traffico attraverso più server crittografati, rendendo quasi impossibile risalire alla tua identità. Più lento, ma essenziale per chi ha bisogno di protezione forte.', en: 'Tor Browser — The highest level of anonymity. Routes your traffic through multiple encrypted servers, making it nearly impossible to trace your identity. Slower, but essential for those who need strong protection.' },
          { it: 'LibreWolf — Un fork di Firefox con configurazioni di privacy già ottimizzate. Rimuove la telemetria di Mozilla e include uBlock Origin preinstallato.', en: 'LibreWolf — A Firefox fork with already optimized privacy settings. Removes Mozilla telemetry and includes pre-installed uBlock Origin.' },
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        content: {
          it: 'Qualunque browser tu scelga, installa sempre un\'estensione come uBlock Origin per bloccare pubblicità e tracciatori aggiuntivi.',
          en: 'Whichever browser you choose, always install an extension like uBlock Origin to block additional ads and trackers.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Configurazioni consigliate', en: 'Recommended settings' },
      },
      {
        type: 'list',
        items: [
          { it: 'Disattiva i cookie di terze parti in tutti i browser.', en: 'Disable third-party cookies in all browsers.' },
          { it: 'Usa un motore di ricerca alternativo: DuckDuckGo, Startpage o SearXNG.', en: 'Use an alternative search engine: DuckDuckGo, Startpage or SearXNG.' },
          { it: 'Attiva la protezione DNS-over-HTTPS (DoH) nelle impostazioni.', en: 'Enable DNS-over-HTTPS (DoH) protection in settings.' },
          { it: 'Cancella regolarmente cookie e dati di navigazione, o configura il browser per farlo automaticamente alla chiusura.', en: 'Regularly clear cookies and browsing data, or configure the browser to do it automatically on close.' },
        ],
      },
    ],
  },
  {
    id: '3',
    slug: 'gdpr-guida-pratica',
    title: {
      it: 'GDPR: guida pratica ai tuoi diritti',
      en: 'GDPR: practical guide to your rights',
    },
    description: {
      it: 'Tutto quello che devi sapere sui tuoi diritti secondo il GDPR: come richiedere i tuoi dati, come cancellarli e come segnalare violazioni.',
      en: 'Everything you need to know about your rights under GDPR: how to request your data, delete it and report violations.',
    },
    category: 'legal',
    icon: 'FileText',
    readTime: '15 min',
    content: [
      {
        type: 'text',
        content: {
          it: 'Il GDPR (General Data Protection Regulation) è il regolamento europeo sulla protezione dei dati, in vigore dal 25 maggio 2018. Non è solo una legge per le aziende: è un insieme di diritti concreti che ogni cittadino europeo può esercitare. Questa guida ti spiega come farlo nella pratica.',
          en: 'The GDPR (General Data Protection Regulation) is the European data protection regulation, in force since May 25, 2018. It\'s not just a law for companies: it\'s a set of concrete rights that every European citizen can exercise. This guide explains how to do it in practice.',
        },
      },
      {
        type: 'heading',
        content: { it: 'I tuoi diritti fondamentali', en: 'Your fundamental rights' },
      },
      {
        type: 'list',
        items: [
          { it: 'Diritto di accesso (Art. 15) — Puoi chiedere a qualsiasi azienda quali dati ha su di te, come li usa e con chi li condivide.', en: 'Right of access (Art. 15) — You can ask any company what data it has about you, how it uses it and who it shares it with.' },
          { it: 'Diritto alla cancellazione (Art. 17) — Il "diritto all\'oblio". Puoi chiedere che i tuoi dati vengano eliminati quando non sono più necessari.', en: 'Right to erasure (Art. 17) — The "right to be forgotten". You can request that your data be deleted when it\'s no longer necessary.' },
          { it: 'Diritto alla portabilità (Art. 20) — Puoi richiedere i tuoi dati in un formato leggibile per trasferirli a un altro servizio.', en: 'Right to data portability (Art. 20) — You can request your data in a readable format to transfer it to another service.' },
          { it: 'Diritto di opposizione (Art. 21) — Puoi opporti al trattamento dei tuoi dati per marketing diretto o profilazione.', en: 'Right to object (Art. 21) — You can object to the processing of your data for direct marketing or profiling.' },
          { it: 'Diritto alla rettifica (Art. 16) — Puoi chiedere la correzione di dati inesatti che ti riguardano.', en: 'Right to rectification (Art. 16) — You can request the correction of inaccurate data about you.' },
        ],
      },
      {
        type: 'heading',
        content: { it: 'Come fare una richiesta DSAR', en: 'How to make a DSAR request' },
      },
      {
        type: 'text',
        content: {
          it: 'Una DSAR (Data Subject Access Request) è una richiesta formale per ottenere tutti i dati che un\'azienda ha raccolto su di te. Ecco come procedere:',
          en: 'A DSAR (Data Subject Access Request) is a formal request to obtain all the data a company has collected about you. Here\'s how to proceed:',
        },
      },
      {
        type: 'list',
        items: [
          { it: 'Cerca la sezione "Privacy" o "Protezione dati" nel sito dell\'azienda.', en: 'Look for the "Privacy" or "Data Protection" section on the company\'s website.' },
          { it: 'Invia un\'email al DPO (Data Protection Officer) specificando che stai esercitando il diritto di accesso ai sensi dell\'Art. 15 del GDPR.', en: 'Send an email to the DPO (Data Protection Officer) specifying that you are exercising your right of access under Art. 15 of the GDPR.' },
          { it: 'L\'azienda ha 30 giorni per rispondere. Se non risponde, puoi presentare un reclamo all\'Autorità Garante per la protezione dei dati.', en: 'The company has 30 days to respond. If it doesn\'t respond, you can file a complaint with the Data Protection Authority.' },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'Siti come datarequests.org offrono template di email pronti per fare richieste DSAR a centinaia di aziende, in italiano e in altre lingue.',
          en: 'Sites like datarequests.org offer ready-made email templates to make DSAR requests to hundreds of companies, in many languages.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Come segnalare una violazione', en: 'How to report a violation' },
      },
      {
        type: 'text',
        content: {
          it: 'Se un\'azienda non rispetta i tuoi diritti o tratta i tuoi dati in modo illegittimo, puoi presentare un reclamo al Garante della Privacy (in Italia) o all\'autorità equivalente nel tuo Paese. Il reclamo è gratuito e può essere presentato anche online.',
          en: 'If a company does not respect your rights or processes your data illegally, you can file a complaint with the Privacy Authority (in Italy, the Garante) or the equivalent authority in your country. The complaint is free and can also be submitted online.',
        },
      },
    ],
  },
  {
    id: '4',
    slug: 'password-manager',
    title: {
      it: 'Guida ai password manager',
      en: 'Password manager guide',
    },
    description: {
      it: 'Perché usare un password manager è essenziale e quale scegliere: Bitwarden, KeePass e alternative.',
      en: 'Why using a password manager is essential and which one to choose: Bitwarden, KeePass and alternatives.',
    },
    category: 'tools',
    icon: 'KeyRound',
    readTime: '7 min',
    content: [
      {
        type: 'text',
        content: {
          it: 'Il 65% delle persone riutilizza la stessa password su più siti. Questo significa che se un singolo servizio viene violato, tutti gli altri account con la stessa password sono compromessi. Un password manager risolve questo problema generando e salvando password uniche e complesse per ogni servizio.',
          en: '65% of people reuse the same password across multiple sites. This means that if a single service is breached, all other accounts with the same password are compromised. A password manager solves this by generating and storing unique, complex passwords for every service.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Come funziona', en: 'How it works' },
      },
      {
        type: 'text',
        content: {
          it: 'Un password manager è come una cassaforte digitale: ricordi solo una password principale (master password) e il manager si occupa di tutto il resto. Genera password casuali, le compila automaticamente nei siti e le sincronizza tra i tuoi dispositivi.',
          en: 'A password manager is like a digital safe: you only remember one master password and the manager takes care of everything else. It generates random passwords, auto-fills them on websites and syncs them across your devices.',
        },
      },
      {
        type: 'heading',
        content: { it: 'I migliori password manager', en: 'The best password managers' },
      },
      {
        type: 'list',
        items: [
          { it: 'Bitwarden — Open source, gratuito per uso personale, con sincronizzazione cloud. Il codice è verificabile e la crittografia è end-to-end. La scelta migliore per la maggior parte delle persone.', en: 'Bitwarden — Open source, free for personal use, with cloud sync. The code is auditable and encryption is end-to-end. The best choice for most people.' },
          { it: 'KeePassXC — Completamente offline, open source, i dati restano solo sul tuo dispositivo. Perfetto per chi vuole il massimo controllo. Richiede gestione manuale della sincronizzazione.', en: 'KeePassXC — Completely offline, open source, data stays only on your device. Perfect for those who want maximum control. Requires manual sync management.' },
          { it: 'Proton Pass — Dalla famiglia ProtonMail, integrato nell\'ecosistema Proton. Crittografia end-to-end e piano gratuito generoso.', en: 'Proton Pass — From the ProtonMail family, integrated in the Proton ecosystem. End-to-end encryption and generous free plan.' },
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Evita i password manager proprietari integrati nei browser (Chrome Password Manager, iCloud Keychain). Funzionano, ma ti vincolano a un ecosistema e i dati non sono sempre crittografati end-to-end.',
          en: 'Avoid proprietary password managers built into browsers (Chrome Password Manager, iCloud Keychain). They work, but lock you into an ecosystem and data isn\'t always end-to-end encrypted.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Come iniziare', en: 'How to get started' },
      },
      {
        type: 'list',
        items: [
          { it: 'Scegli un password manager e crea una master password forte (almeno 4 parole casuali).', en: 'Choose a password manager and create a strong master password (at least 4 random words).' },
          { it: 'Installa l\'estensione per il browser e l\'app sul telefono.', en: 'Install the browser extension and the phone app.' },
          { it: 'Ogni volta che accedi a un sito, salva la password nel manager.', en: 'Every time you log into a site, save the password in the manager.' },
          { it: 'Gradualmente, cambia le password più importanti con quelle generate dal manager.', en: 'Gradually, change your most important passwords with ones generated by the manager.' },
        ],
      },
    ],
  },
  {
    id: '5',
    slug: 'sorveglianza-capitalismo',
    title: {
      it: 'Il capitalismo della sorveglianza, spiegato',
      en: 'Surveillance capitalism, explained',
    },
    description: {
      it: 'Cos\'è il capitalismo della sorveglianza, come funziona e perché dovrebbe preoccuparti. Basato sul lavoro di Shoshana Zuboff.',
      en: 'What surveillance capitalism is, how it works and why it should concern you. Based on Shoshana Zuboff\'s work.',
    },
    category: 'research',
    icon: 'Eye',
    readTime: '12 min',
    content: [
      {
        type: 'text',
        content: {
          it: 'Nel 2019, la sociologa Shoshana Zuboff ha pubblicato "Il capitalismo della sorveglianza", un libro che ha cambiato il modo in cui comprendiamo il rapporto tra Big Tech e la nostra vita quotidiana. In questa risorsa riassumiamo i concetti chiave e le implicazioni per la tua vita digitale.',
          en: 'In 2019, sociologist Shoshana Zuboff published "The Age of Surveillance Capitalism", a book that changed how we understand the relationship between Big Tech and our daily lives. In this resource we summarize the key concepts and implications for your digital life.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Cos\'è il capitalismo della sorveglianza?', en: 'What is surveillance capitalism?' },
      },
      {
        type: 'text',
        content: {
          it: 'È un modello economico in cui le aziende tecnologiche raccolgono dati comportamentali degli utenti — non solo ciò che condividi volontariamente, ma come ti muovi, cosa guardi, quanto tempo ti fermi su un contenuto, il tuo tono di voce — e li trasformano in previsioni sul tuo comportamento futuro. Queste previsioni vengono vendute come "futures comportamentali" a chiunque voglia influenzare le tue azioni: pubblicitari, partiti politici, assicurazioni.',
          en: 'It\'s an economic model where tech companies collect users\' behavioral data — not just what you voluntarily share, but how you move, what you look at, how long you spend on content, your tone of voice — and turn them into predictions about your future behavior. These predictions are sold as "behavioral futures" to anyone who wants to influence your actions: advertisers, political parties, insurance companies.',
        },
      },
      {
        type: 'quote',
        content: {
          it: 'L\'esperienza umana è la materia prima gratuita che viene tradotta in dati comportamentali.',
          en: 'Human experience is the free raw material that is translated into behavioral data.',
        },
        author: 'Shoshana Zuboff',
      },
      {
        type: 'heading',
        content: { it: 'Come funziona nella pratica', en: 'How it works in practice' },
      },
      {
        type: 'list',
        items: [
          { it: 'Estrazione: ogni interazione digitale viene registrata e analizzata. Un "mi piace" non è solo un gesto: è un dato comportamentale prezioso.', en: 'Extraction: every digital interaction is recorded and analyzed. A "like" is not just a gesture: it\'s a valuable behavioral data point.' },
          { it: 'Analisi: algoritmi sofisticati trasformano i dati grezzi in modelli predittivi sul tuo comportamento, le tue emozioni, le tue vulnerabilità.', en: 'Analysis: sophisticated algorithms transform raw data into predictive models about your behavior, emotions, vulnerabilities.' },
          { it: 'Vendita: queste previsioni vengono vendute in mercati pubblicitari in tempo reale, dove gli inserzionisti "scommettono" su chi ha più probabilità di cliccare, comprare, votare.', en: 'Sales: these predictions are sold in real-time advertising markets, where advertisers "bet" on who is most likely to click, buy, vote.' },
          { it: 'Modifica: il passo più preoccupante. Le piattaforme non si limitano a prevedere il comportamento: lo modellano attraverso notifiche, feed personalizzati e dark pattern.', en: 'Modification: the most concerning step. Platforms don\'t just predict behavior: they shape it through notifications, personalized feeds and dark patterns.' },
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        content: {
          it: 'Il prodotto non sei tu — come spesso si dice. Il prodotto è il cambiamento del tuo comportamento. Tu sei la materia prima.',
          en: 'The product isn\'t you — as is often said. The product is the change in your behavior. You are the raw material.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Cosa puoi fare', en: 'What you can do' },
      },
      {
        type: 'text',
        content: {
          it: 'La consapevolezza è il primo passo. Sapere come funziona il sistema ti permette di fare scelte più informate: quali servizi usare, quali dati condividere, come configurare la tua privacy. Non si tratta di disconnettersi completamente, ma di riprendere il controllo.',
          en: 'Awareness is the first step. Knowing how the system works allows you to make more informed choices: which services to use, what data to share, how to configure your privacy. It\'s not about completely disconnecting, but about taking back control.',
        },
      },
    ],
  },
  {
    id: '6',
    slug: 'ai-act-sintesi',
    title: {
      it: 'AI Act europeo: sintesi e impatto',
      en: 'European AI Act: summary and impact',
    },
    description: {
      it: 'Una panoramica chiara dell\'AI Act: classificazione dei rischi, obblighi e cosa cambia per cittadini e aziende.',
      en: 'A clear overview of the AI Act: risk classification, obligations and what changes for citizens and companies.',
    },
    category: 'legal',
    icon: 'Landmark',
    readTime: '14 min',
    content: [
      {
        type: 'text',
        content: {
          it: 'L\'AI Act è il primo regolamento al mondo che disciplina in modo organico l\'intelligenza artificiale. Approvato dall\'Unione Europea nel 2024, stabilisce regole chiare su come i sistemi IA possono essere sviluppati, distribuiti e utilizzati. Ecco cosa devi sapere.',
          en: 'The AI Act is the world\'s first regulation that comprehensively governs artificial intelligence. Approved by the European Union in 2024, it establishes clear rules on how AI systems can be developed, deployed and used. Here\'s what you need to know.',
        },
      },
      {
        type: 'heading',
        content: { it: 'La classificazione per livelli di rischio', en: 'Risk-level classification' },
      },
      {
        type: 'text',
        content: {
          it: 'L\'AI Act classifica i sistemi di intelligenza artificiale in quattro livelli di rischio, ciascuno con obblighi diversi:',
          en: 'The AI Act classifies AI systems into four risk levels, each with different obligations:',
        },
      },
      {
        type: 'list',
        items: [
          { it: 'Rischio inaccettabile — Sistemi vietati: social scoring, manipolazione subliminale, sorveglianza biometrica di massa. Questi sistemi non possono essere usati nell\'UE.', en: 'Unacceptable risk — Banned systems: social scoring, subliminal manipulation, mass biometric surveillance. These systems cannot be used in the EU.' },
          { it: 'Rischio alto — Sistemi soggetti a obblighi stringenti: IA usata in sanità, istruzione, giustizia, accesso al credito, reclutamento. Devono essere trasparenti, documentati e sottoposti a valutazione.', en: 'High risk — Systems subject to strict obligations: AI used in healthcare, education, justice, credit access, recruitment. Must be transparent, documented and assessed.' },
          { it: 'Rischio limitato — Sistemi con obblighi di trasparenza: chatbot, deepfake, contenuti generati da IA. L\'utente deve sapere che sta interagendo con un\'IA.', en: 'Limited risk — Systems with transparency obligations: chatbots, deepfakes, AI-generated content. Users must know they are interacting with AI.' },
          { it: 'Rischio minimo — Nessun obbligo specifico: filtri spam, videogiochi con IA, raccomandazioni musicali.', en: 'Minimal risk — No specific obligations: spam filters, AI video games, music recommendations.' },
        ],
      },
      {
        type: 'heading',
        content: { it: 'Cosa cambia per i cittadini', en: 'What changes for citizens' },
      },
      {
        type: 'list',
        items: [
          { it: 'Diritto a sapere quando un\'IA prende decisioni che ti riguardano.', en: 'Right to know when AI makes decisions that affect you.' },
          { it: 'Divieto di social scoring e sorveglianza biometrica di massa.', en: 'Ban on social scoring and mass biometric surveillance.' },
          { it: 'Obbligo di etichettare i contenuti generati da IA (deepfake, immagini, testi).', en: 'Obligation to label AI-generated content (deepfakes, images, texts).' },
          { it: 'Possibilità di presentare reclami alle autorità nazionali.', en: 'Ability to file complaints with national authorities.' },
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        content: {
          it: 'L\'AI Act entrerà pienamente in vigore in modo graduale tra il 2025 e il 2027. Alcune disposizioni, come il divieto di sistemi a rischio inaccettabile, sono già operative.',
          en: 'The AI Act will come fully into force gradually between 2025 and 2027. Some provisions, such as the ban on unacceptable risk systems, are already operational.',
        },
      },
    ],
  },
  {
    id: '7',
    slug: 'vpn-come-scegliere',
    title: {
      it: 'VPN: come scegliere quella giusta',
      en: 'VPN: how to choose the right one',
    },
    description: {
      it: 'Cosa fa davvero una VPN, quando è utile e quali sono le migliori opzioni per proteggere la tua connessione.',
      en: 'What a VPN really does, when it\'s useful and what are the best options to protect your connection.',
    },
    category: 'tools',
    icon: 'Shield',
    readTime: '9 min',
    content: [
      {
        type: 'text',
        content: {
          it: 'Le VPN sono spesso pubblicizzate come la soluzione a tutti i problemi di privacy online. La realtà è più sfumata: una VPN è uno strumento utile, ma non è una bacchetta magica. Questa guida ti aiuta a capire quando e come usarla.',
          en: 'VPNs are often advertised as the solution to all online privacy problems. Reality is more nuanced: a VPN is a useful tool, but it\'s not a magic wand. This guide helps you understand when and how to use it.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Cosa fa una VPN', en: 'What a VPN does' },
      },
      {
        type: 'list',
        items: [
          { it: 'Cripta il traffico tra il tuo dispositivo e il server VPN, impedendo al tuo ISP di vedere cosa fai online.', en: 'Encrypts traffic between your device and the VPN server, preventing your ISP from seeing what you do online.' },
          { it: 'Nasconde il tuo indirizzo IP reale ai siti web che visiti.', en: 'Hides your real IP address from the websites you visit.' },
          { it: 'Ti permette di aggirare restrizioni geografiche su contenuti e servizi.', en: 'Allows you to bypass geographic restrictions on content and services.' },
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Una VPN NON ti rende anonimo. Se accedi con il tuo account Google, Google sa comunque chi sei. La VPN protegge solo il "tunnel" di connessione, non la tua identità sui siti.',
          en: 'A VPN does NOT make you anonymous. If you log in with your Google account, Google still knows who you are. The VPN only protects the connection "tunnel", not your identity on websites.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Le migliori VPN per la privacy', en: 'Best VPNs for privacy' },
      },
      {
        type: 'list',
        items: [
          { it: 'Mullvad — Nessun account necessario, pagamento anonimo possibile (anche in contanti). Non conserva log. La scelta più orientata alla privacy.', en: 'Mullvad — No account needed, anonymous payment possible (even cash). No logs kept. The most privacy-oriented choice.' },
          { it: 'ProtonVPN — Dalla stessa azienda di ProtonMail. Piano gratuito disponibile, no log, server in Svizzera. Ottimo per chi già usa l\'ecosistema Proton.', en: 'ProtonVPN — From the same company as ProtonMail. Free plan available, no logs, servers in Switzerland. Great for those already using the Proton ecosystem.' },
          { it: 'IVPN — Audit indipendenti, trasparenza radicale, nessun log. Simile a Mullvad nella filosofia.', en: 'IVPN — Independent audits, radical transparency, no logs. Similar to Mullvad in philosophy.' },
        ],
      },
    ],
  },
  {
    id: '8',
    slug: 'crittografia-per-tutti',
    title: {
      it: 'Crittografia per tutti: guida essenziale',
      en: 'Encryption for everyone: essential guide',
    },
    description: {
      it: 'Cos\'è la crittografia, come protegge i tuoi dati e come assicurarti che i tuoi strumenti la usino correttamente.',
      en: 'What encryption is, how it protects your data and how to make sure your tools use it correctly.',
    },
    category: 'guide',
    icon: 'Lock',
    readTime: '11 min',
    content: [
      {
        type: 'text',
        content: {
          it: 'La crittografia è la tecnologia che rende i tuoi messaggi, file e dati illeggibili a chiunque non sia il destinatario previsto. È la base di tutta la sicurezza digitale moderna, eppure pochi capiscono davvero come funziona e come assicurarsi che i propri strumenti la usino correttamente.',
          en: 'Encryption is the technology that makes your messages, files and data unreadable to anyone who isn\'t the intended recipient. It\'s the foundation of all modern digital security, yet few people truly understand how it works and how to ensure their tools use it correctly.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Crittografia end-to-end vs in transito', en: 'End-to-end vs in-transit encryption' },
      },
      {
        type: 'text',
        content: {
          it: 'La differenza è cruciale. La crittografia "in transito" protegge i dati mentre viaggiano (come HTTPS), ma il fornitore del servizio può comunque leggere i tuoi dati sui suoi server. La crittografia "end-to-end" (E2E) fa sì che solo tu e il destinatario possiate leggere il contenuto — nemmeno il fornitore può accedervi.',
          en: 'The difference is crucial. "In-transit" encryption protects data while it travels (like HTTPS), but the service provider can still read your data on its servers. "End-to-end" (E2E) encryption means only you and the recipient can read the content — not even the provider can access it.',
        },
      },
      {
        type: 'callout',
        variant: 'info',
        content: {
          it: 'WhatsApp usa crittografia end-to-end per i messaggi, ma raccoglie comunque metadati (chi scrivi, quando, quanto spesso). La crittografia protegge il contenuto, non necessariamente i metadati.',
          en: 'WhatsApp uses end-to-end encryption for messages, but still collects metadata (who you write to, when, how often). Encryption protects content, not necessarily metadata.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Come verificare la crittografia', en: 'How to verify encryption' },
      },
      {
        type: 'list',
        items: [
          { it: 'Messaggistica: Signal è il gold standard. WhatsApp usa E2E ma i metadati vanno a Meta. Telegram NON usa E2E di default (solo nelle "chat segrete").', en: 'Messaging: Signal is the gold standard. WhatsApp uses E2E but metadata goes to Meta. Telegram does NOT use E2E by default (only in "secret chats").' },
          { it: 'Email: ProtonMail e Tuta offrono E2E. Gmail usa solo crittografia in transito — Google può leggere le tue email.', en: 'Email: ProtonMail and Tuta offer E2E. Gmail only uses in-transit encryption — Google can read your emails.' },
          { it: 'Cloud: Proton Drive e Tresorit offrono E2E. Google Drive e Dropbox criptano in transito ma possono accedere ai tuoi file.', en: 'Cloud: Proton Drive and Tresorit offer E2E. Google Drive and Dropbox encrypt in transit but can access your files.' },
          { it: 'Dispositivi: attiva la crittografia del disco (FileVault su Mac, BitLocker su Windows, crittografia nativa su iOS/Android).', en: 'Devices: enable disk encryption (FileVault on Mac, BitLocker on Windows, native encryption on iOS/Android).' },
        ],
      },
    ],
  },
  {
    id: '9',
    slug: 'cloud-sovrano',
    title: {
      it: 'Cloud sovrano: alternative a Google Drive',
      en: 'Sovereign cloud: alternatives to Google Drive',
    },
    description: {
      it: 'Come scegliere un servizio cloud che rispetti la tua privacy e ti dia il pieno controllo sui tuoi file.',
      en: 'How to choose a cloud service that respects your privacy and gives you full control over your files.',
    },
    category: 'tools',
    icon: 'HardDrive',
    readTime: '8 min',
    content: [
      {
        type: 'text',
        content: {
          it: 'Foto, documenti, backup: sempre più aspetti della nostra vita sono nel cloud. Ma "cloud" significa semplicemente "il computer di qualcun altro". Quando carichi i tuoi file su Google Drive, Dropbox o iCloud, stai affidando i tuoi dati a un\'azienda che può accedervi, analizzarli e, in alcuni casi, usarli per addestrare modelli di IA.',
          en: 'Photos, documents, backups: more and more aspects of our lives are in the cloud. But "cloud" simply means "someone else\'s computer". When you upload your files to Google Drive, Dropbox or iCloud, you are entrusting your data to a company that can access, analyze, and in some cases use them to train AI models.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Le alternative', en: 'The alternatives' },
      },
      {
        type: 'list',
        items: [
          { it: 'Nextcloud — La soluzione open source per eccellenza. Puoi installarla su un tuo server o usare un provider di fiducia. Offre file, calendario, contatti, videoconferenza e molto altro.', en: 'Nextcloud — The open source solution par excellence. You can install it on your own server or use a trusted provider. Offers files, calendar, contacts, video conferencing and much more.' },
          { it: 'Proton Drive — Cloud crittografato end-to-end dalla stessa azienda di ProtonMail. Semplice da usare, con app per tutti i dispositivi.', en: 'Proton Drive — End-to-end encrypted cloud from the same company as ProtonMail. Simple to use, with apps for all devices.' },
          { it: 'Tresorit — Cloud crittografato E2E con focus aziendale. Ottimo per professionisti che devono condividere documenti sensibili.', en: 'Tresorit — E2E encrypted cloud with business focus. Great for professionals who need to share sensitive documents.' },
          { it: 'Syncthing — Sincronizzazione peer-to-peer senza nessun server intermedio. I tuoi file viaggiano direttamente tra i tuoi dispositivi.', en: 'Syncthing — Peer-to-peer sync without any intermediate server. Your files travel directly between your devices.' },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'Se non vuoi gestire un tuo server Nextcloud, molti provider europei offrono hosting Nextcloud gestito a pochi euro al mese (Hetzner, Disroot, The Good Cloud).',
          en: 'If you don\'t want to manage your own Nextcloud server, many European providers offer managed Nextcloud hosting for a few euros per month (Hetzner, Disroot, The Good Cloud).',
        },
      },
    ],
  },
  {
    id: '10',
    slug: 'social-media-salute-mentale',
    title: {
      it: 'Social media e salute mentale: cosa dice la ricerca',
      en: 'Social media and mental health: what the research says',
    },
    description: {
      it: 'Una panoramica basata sulla ricerca dell\'impatto dei social media sulla salute mentale, con focus su adolescenti e strategie di difesa.',
      en: 'A research-based overview of the impact of social media on mental health, with focus on adolescents and defense strategies.',
    },
    category: 'research',
    icon: 'HeartPulse',
    readTime: '13 min',
    content: [
      {
        type: 'text',
        content: {
          it: 'La relazione tra social media e salute mentale è uno dei temi più dibattuti della nostra epoca. Studi recenti mostrano correlazioni preoccupanti, soprattutto tra gli adolescenti. Questa risorsa riassume le evidenze scientifiche principali.',
          en: 'The relationship between social media and mental health is one of the most debated topics of our time. Recent studies show concerning correlations, especially among adolescents. This resource summarizes the main scientific evidence.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Cosa dice la ricerca', en: 'What the research says' },
      },
      {
        type: 'list',
        items: [
          { it: 'L\'uso intensivo dei social è correlato a maggiore ansia, depressione e disturbi del sonno, soprattutto negli adolescenti (fonte: APA, 2023).', en: 'Heavy social media use is correlated with higher anxiety, depression and sleep disorders, especially in adolescents (source: APA, 2023).' },
          { it: 'I feed algoritmici amplificano contenuti polarizzanti e emotivamente carichi, creando una distorsione nella percezione della realtà.', en: 'Algorithmic feeds amplify polarizing and emotionally charged content, creating a distortion in the perception of reality.' },
          { it: 'Il design di queste piattaforme sfrutta meccanismi di ricompensa variabile (come le slot machine) per massimizzare il tempo di permanenza.', en: 'The design of these platforms exploits variable reward mechanisms (like slot machines) to maximize time spent.' },
          { it: 'Il confronto sociale costante (filtri, vite "perfette") è collegato a minore autostima e insoddisfazione corporea.', en: 'Constant social comparison (filters, "perfect" lives) is linked to lower self-esteem and body dissatisfaction.' },
        ],
      },
      {
        type: 'heading',
        content: { it: 'Strategie di difesa', en: 'Defense strategies' },
      },
      {
        type: 'list',
        items: [
          { it: 'Disattiva le notifiche non essenziali e imposta limiti di tempo giornalieri.', en: 'Disable non-essential notifications and set daily time limits.' },
          { it: 'Usa feed cronologici anziché algoritmici dove possibile.', en: 'Use chronological feeds instead of algorithmic ones where possible.' },
          { it: 'Considera alternative come Mastodon o Pixelfed, che non usano algoritmi di engagement.', en: 'Consider alternatives like Mastodon or Pixelfed, which don\'t use engagement algorithms.' },
          { it: 'Fai "pulizia" periodica: elimina account e app che non usi più o che ti causano stress.', en: 'Do periodic "cleaning": delete accounts and apps you no longer use or that cause you stress.' },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'Il problema non è la tecnologia in sé, ma il modello di business. Le piattaforme che guadagnano dalla tua attenzione sono incentivate a renderti dipendente. Piattaforme senza pubblicità non hanno questo incentivo.',
          en: 'The problem isn\'t technology itself, but the business model. Platforms that profit from your attention are incentivized to make you addicted. Platforms without advertising don\'t have this incentive.',
        },
      },
    ],
  },
  {
    id: '11',
    slug: 'dsar-template',
    title: {
      it: 'Template DSAR: richiedi i tuoi dati',
      en: 'DSAR template: request your data',
    },
    description: {
      it: 'Template pronti per richiedere i tuoi dati personali alle aziende, con istruzioni passo-passo per ogni piattaforma.',
      en: 'Ready-made templates to request your personal data from companies, with step-by-step instructions for each platform.',
    },
    category: 'legal',
    icon: 'FileSearch',
    readTime: '6 min',
    content: [
      {
        type: 'text',
        content: {
          it: 'Il GDPR ti dà il diritto di sapere esattamente quali dati un\'azienda ha raccolto su di te. Questo diritto si esercita attraverso una DSAR (Data Subject Access Request). Ecco come farlo concretamente per le piattaforme più comuni.',
          en: 'The GDPR gives you the right to know exactly what data a company has collected about you. This right is exercised through a DSAR (Data Subject Access Request). Here\'s how to do it concretely for the most common platforms.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Come fare una richiesta', en: 'How to make a request' },
      },
      {
        type: 'list',
        items: [
          { it: 'Google: vai su takeout.google.com per scaricare tutti i tuoi dati. Per una richiesta formale, contatta il DPO a data-protection-office@google.com.', en: 'Google: go to takeout.google.com to download all your data. For a formal request, contact the DPO at data-protection-office@google.com.' },
          { it: 'Meta (Facebook/Instagram): Impostazioni > Il tuo account > Scarica le tue informazioni. Preparati: il file può essere enorme.', en: 'Meta (Facebook/Instagram): Settings > Your account > Download your information. Be prepared: the file can be enormous.' },
          { it: 'Amazon: Richiedi i tuoi dati dalla pagina "Privacy". I tempi di risposta possono essere fino a 30 giorni.', en: 'Amazon: Request your data from the "Privacy" page. Response times can be up to 30 days.' },
          { it: 'Spotify: Account > Privacy > Scarica i tuoi dati. Include la cronologia di ascolto completa e i dati di inferenza.', en: 'Spotify: Account > Privacy > Download your data. Includes complete listening history and inference data.' },
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        content: {
          it: 'Quando ricevi i tuoi dati, analizzali con attenzione. Spesso scoprirai che l\'azienda ha raccolto molto più di quanto pensassi: cronologie dettagliate, dati di posizione, inferenze sulla tua personalità.',
          en: 'When you receive your data, analyze it carefully. You\'ll often discover that the company has collected much more than you thought: detailed histories, location data, inferences about your personality.',
        },
      },
    ],
  },
  {
    id: '12',
    slug: 'ia-generativa-privacy',
    title: {
      it: 'IA generativa e privacy: cosa sapere',
      en: 'Generative AI and privacy: what to know',
    },
    description: {
      it: 'Come ChatGPT, Gemini e altri modelli IA trattano i tuoi dati, i rischi per la privacy e come proteggerti.',
      en: 'How ChatGPT, Gemini and other AI models handle your data, privacy risks and how to protect yourself.',
    },
    category: 'research',
    icon: 'Brain',
    readTime: '10 min',
    content: [
      {
        type: 'text',
        content: {
          it: 'L\'IA generativa è diventata parte della vita quotidiana di milioni di persone. Ma ogni prompt che invii, ogni documento che carichi, ogni conversazione che hai con un chatbot crea dati che vengono raccolti e, in molti casi, usati per addestrare i modelli successivi. Ecco cosa devi sapere per proteggere la tua privacy.',
          en: 'Generative AI has become part of the daily lives of millions of people. But every prompt you send, every document you upload, every conversation you have with a chatbot creates data that is collected and, in many cases, used to train future models. Here\'s what you need to know to protect your privacy.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Il problema del training', en: 'The training problem' },
      },
      {
        type: 'text',
        content: {
          it: 'La maggior parte dei servizi IA usa le conversazioni degli utenti per migliorare i propri modelli. Questo significa che informazioni personali, codice proprietario, dati sensibili che condividi nei prompt possono diventare parte del "sapere" del modello — e potenzialmente emergere nelle risposte ad altri utenti.',
          en: 'Most AI services use user conversations to improve their models. This means personal information, proprietary code, sensitive data you share in prompts can become part of the model\'s "knowledge" — and potentially surface in responses to other users.',
        },
      },
      {
        type: 'heading',
        content: { it: 'Come proteggerti', en: 'How to protect yourself' },
      },
      {
        type: 'list',
        items: [
          { it: 'ChatGPT: vai in Settings > Data controls > disattiva "Improve the model for everyone". Questo impedisce l\'uso delle tue conversazioni per il training.', en: 'ChatGPT: go to Settings > Data controls > disable "Improve the model for everyone". This prevents the use of your conversations for training.' },
          { it: 'Gemini: le conversazioni sono usate per il training per default. Puoi disattivarlo nelle impostazioni attività di Google, ma questo limita alcune funzionalità.', en: 'Gemini: conversations are used for training by default. You can disable it in Google Activity settings, but this limits some features.' },
          { it: 'Claude: Anthropic non usa le conversazioni della versione a pagamento per il training. Per la versione gratuita, il training opt-out è disponibile nelle impostazioni.', en: 'Claude: Anthropic does not use paid version conversations for training. For the free version, training opt-out is available in settings.' },
          { it: 'Alternativa locale: usa Ollama con modelli open source (Llama, Mistral) per avere un\'IA completamente offline. Nessun dato lascia il tuo computer.', en: 'Local alternative: use Ollama with open source models (Llama, Mistral) to have a completely offline AI. No data leaves your computer.' },
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Regola d\'oro: non inserire mai in un chatbot IA informazioni che non saresti disposto a rendere pubbliche. Tratta ogni prompt come un messaggio potenzialmente visibile.',
          en: 'Golden rule: never enter information into an AI chatbot that you wouldn\'t be willing to make public. Treat every prompt as a potentially visible message.',
        },
      },
    ],
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}
