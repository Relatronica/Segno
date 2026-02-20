export type ToolCategory =
  | 'browser' | 'search' | 'email' | 'messaging' | 'cloud'
  | 'social' | 'maps' | 'ai' | 'password' | 'vpn'
  | 'os' | 'videoconference' | 'notes';

export type StackTool = {
  id: string;
  name: string;
  category: ToolCategory;
  company: string;
  privacyScore: number;
  isEthical: boolean;
  openSource: boolean;
  description: { it: string; en: string };
};

export type CategoryMeta = {
  id: ToolCategory;
  name: { it: string; en: string };
  colorClass: string;
};

export const categories: CategoryMeta[] = [
  { id: 'browser', name: { it: 'Browser', en: 'Browser' }, colorClass: 'bg-blue-500/10 text-blue-600' },
  { id: 'search', name: { it: 'Motore di ricerca', en: 'Search Engine' }, colorClass: 'bg-amber-500/10 text-amber-600' },
  { id: 'email', name: { it: 'Email', en: 'Email' }, colorClass: 'bg-rose-500/10 text-rose-600' },
  { id: 'messaging', name: { it: 'Messaggistica', en: 'Messaging' }, colorClass: 'bg-green-500/10 text-green-600' },
  { id: 'cloud', name: { it: 'Cloud Storage', en: 'Cloud Storage' }, colorClass: 'bg-cyan-500/10 text-cyan-600' },
  { id: 'social', name: { it: 'Social Media', en: 'Social Media' }, colorClass: 'bg-purple-500/10 text-purple-600' },
  { id: 'maps', name: { it: 'Mappe', en: 'Maps' }, colorClass: 'bg-emerald-500/10 text-emerald-600' },
  { id: 'ai', name: { it: 'Assistente IA', en: 'AI Assistant' }, colorClass: 'bg-violet-500/10 text-violet-600' },
  { id: 'password', name: { it: 'Password Manager', en: 'Password Manager' }, colorClass: 'bg-orange-500/10 text-orange-600' },
  { id: 'vpn', name: { it: 'VPN', en: 'VPN' }, colorClass: 'bg-indigo-500/10 text-indigo-600' },
  { id: 'os', name: { it: 'Sistema Operativo', en: 'Operating System' }, colorClass: 'bg-slate-500/10 text-slate-600' },
  { id: 'videoconference', name: { it: 'Videoconferenza', en: 'Video Conferencing' }, colorClass: 'bg-sky-500/10 text-sky-600' },
  { id: 'notes', name: { it: 'Note & Documenti', en: 'Notes & Docs' }, colorClass: 'bg-teal-500/10 text-teal-600' },
];

export const tools: StackTool[] = [
  // ── Browser ──
  { id: 'chrome', name: 'Google Chrome', category: 'browser', company: 'Google', privacyScore: 3, isEthical: false, openSource: false, description: { it: 'Il browser più usato al mondo, ma con tracciamento pervasivo.', en: 'The most used browser, but with pervasive tracking.' } },
  { id: 'firefox', name: 'Mozilla Firefox', category: 'browser', company: 'Mozilla', privacyScore: 8, isEthical: true, openSource: true, description: { it: 'Browser open source con forte attenzione alla privacy.', en: 'Open source browser with strong focus on privacy.' } },
  { id: 'brave', name: 'Brave', category: 'browser', company: 'Brave Software', privacyScore: 8, isEthical: true, openSource: true, description: { it: 'Browser con blocco tracker e ads integrato.', en: 'Browser with built-in tracker and ad blocking.' } },
  { id: 'safari', name: 'Safari', category: 'browser', company: 'Apple', privacyScore: 6, isEthical: false, openSource: false, description: { it: 'Buona privacy di base, ma ecosistema chiuso.', en: 'Good base privacy, but closed ecosystem.' } },
  { id: 'tor', name: 'Tor Browser', category: 'browser', company: 'Tor Project', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'Massima anonimità online tramite rete Tor.', en: 'Maximum anonymity via the Tor network.' } },
  { id: 'vivaldi', name: 'Vivaldi', category: 'browser', company: 'Vivaldi Technologies', privacyScore: 7, isEthical: true, openSource: false, description: { it: 'Browser personalizzabile con buone protezioni privacy.', en: 'Customizable browser with good privacy protections.' } },
  { id: 'mullvad-browser', name: 'Mullvad Browser', category: 'browser', company: 'Mullvad / Tor Project', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Browser anti-fingerprinting basato su Tor Browser.', en: 'Anti-fingerprinting browser based on Tor Browser.' } },

  // ── Search ──
  { id: 'google-search', name: 'Google Search', category: 'search', company: 'Google', privacyScore: 2, isEthical: false, openSource: false, description: { it: 'Motore dominante, profila ogni tua ricerca.', en: 'Dominant engine, profiles every search you make.' } },
  { id: 'duckduckgo', name: 'DuckDuckGo', category: 'search', company: 'DuckDuckGo Inc.', privacyScore: 8, isEthical: true, openSource: false, description: { it: 'Ricerche senza tracciamento né profili utente.', en: 'Searches without tracking or user profiles.' } },
  { id: 'startpage', name: 'Startpage', category: 'search', company: 'Startpage BV', privacyScore: 8, isEthical: true, openSource: false, description: { it: 'Risultati Google senza il tracciamento di Google.', en: 'Google results without Google tracking.' } },
  { id: 'brave-search', name: 'Brave Search', category: 'search', company: 'Brave Software', privacyScore: 9, isEthical: true, openSource: false, description: { it: 'Indice indipendente, nessun tracciamento.', en: 'Independent index, no tracking.' } },
  { id: 'ecosia', name: 'Ecosia', category: 'search', company: 'Ecosia GmbH', privacyScore: 7, isEthical: true, openSource: false, description: { it: 'Motore di ricerca che pianta alberi, buona privacy.', en: 'Search engine that plants trees, good privacy.' } },
  { id: 'searxng', name: 'SearXNG', category: 'search', company: 'Community / Self-hosted', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'Metaricerca open source, self-hostabile, zero tracciamento.', en: 'Open source metasearch, self-hostable, zero tracking.' } },
  { id: 'mojeek', name: 'Mojeek', category: 'search', company: 'Mojeek Ltd.', privacyScore: 9, isEthical: true, openSource: false, description: { it: 'Indice di ricerca indipendente, con sede nel Regno Unito.', en: 'Independent search index, based in the UK.' } },

  // ── Email ──
  { id: 'gmail', name: 'Gmail', category: 'email', company: 'Google', privacyScore: 3, isEthical: false, openSource: false, description: { it: 'Email gratuita, ma scansiona i contenuti per la pubblicità.', en: 'Free email, but scans content for advertising.' } },
  { id: 'outlook', name: 'Outlook', category: 'email', company: 'Microsoft', privacyScore: 4, isEthical: false, openSource: false, description: { it: 'Email integrata nell\'ecosistema Microsoft.', en: 'Email integrated in the Microsoft ecosystem.' } },
  { id: 'protonmail', name: 'Proton Mail', category: 'email', company: 'Proton AG', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'Email con crittografia end-to-end, sede in Svizzera.', en: 'End-to-end encrypted email, based in Switzerland.' } },
  { id: 'tuta', name: 'Tuta', category: 'email', company: 'Tuta GmbH', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Email crittografata open source, sede in Germania.', en: 'Open source encrypted email, based in Germany.' } },
  { id: 'posteo', name: 'Posteo', category: 'email', company: 'Posteo e.K.', privacyScore: 9, isEthical: true, openSource: false, description: { it: 'Email green e privata, pagamento anonimo, sede in Germania.', en: 'Green and private email, anonymous payment, based in Germany.' } },
  { id: 'mailfence', name: 'Mailfence', category: 'email', company: 'ContactOffice Group', privacyScore: 8, isEthical: true, openSource: false, description: { it: 'Email sicura con crittografia OpenPGP integrata.', en: 'Secure email with built-in OpenPGP encryption.' } },

  // ── Messaging ──
  { id: 'whatsapp', name: 'WhatsApp', category: 'messaging', company: 'Meta', privacyScore: 4, isEthical: false, openSource: false, description: { it: 'Crittografia E2E, ma condivide metadati con Meta.', en: 'E2E encryption, but shares metadata with Meta.' } },
  { id: 'telegram', name: 'Telegram', category: 'messaging', company: 'Telegram FZ-LLC', privacyScore: 5, isEthical: false, openSource: false, description: { it: 'Cloud-based, E2E solo nelle chat segrete.', en: 'Cloud-based, E2E only in secret chats.' } },
  { id: 'signal', name: 'Signal', category: 'messaging', company: 'Signal Foundation', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'Lo standard d\'oro per la messaggistica privata.', en: 'The gold standard for private messaging.' } },
  { id: 'element', name: 'Element (Matrix)', category: 'messaging', company: 'Element / Matrix.org', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Messaggistica decentralizzata e federata.', en: 'Decentralized and federated messaging.' } },
  { id: 'threema', name: 'Threema', category: 'messaging', company: 'Threema GmbH', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Messaggistica svizzera, non richiede numero di telefono.', en: 'Swiss messaging, no phone number required.' } },
  { id: 'session', name: 'Session', category: 'messaging', company: 'OPTF', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Messaggistica anonima, decentralizzata, senza metadati.', en: 'Anonymous, decentralized messaging, no metadata.' } },
  { id: 'briar', name: 'Briar', category: 'messaging', company: 'Briar Project', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'Messaggistica P2P, funziona anche senza internet via Bluetooth.', en: 'P2P messaging, works without internet via Bluetooth.' } },

  // ── Cloud ──
  { id: 'google-drive', name: 'Google Drive', category: 'cloud', company: 'Google', privacyScore: 3, isEthical: false, openSource: false, description: { it: 'Cloud integrato con l\'ecosistema Google.', en: 'Cloud integrated with the Google ecosystem.' } },
  { id: 'dropbox', name: 'Dropbox', category: 'cloud', company: 'Dropbox Inc.', privacyScore: 4, isEthical: false, openSource: false, description: { it: 'Cloud popolare, senza crittografia E2E.', en: 'Popular cloud, without E2E encryption.' } },
  { id: 'icloud', name: 'iCloud', category: 'cloud', company: 'Apple', privacyScore: 6, isEthical: false, openSource: false, description: { it: 'Cloud Apple con Advanced Data Protection opzionale.', en: 'Apple cloud with optional Advanced Data Protection.' } },
  { id: 'proton-drive', name: 'Proton Drive', category: 'cloud', company: 'Proton AG', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'Cloud con crittografia end-to-end.', en: 'Cloud with end-to-end encryption.' } },
  { id: 'nextcloud', name: 'Nextcloud', category: 'cloud', company: 'Nextcloud GmbH', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'Cloud self-hosted, massimo controllo sui dati.', en: 'Self-hosted cloud, maximum data control.' } },
  { id: 'tresorit', name: 'Tresorit', category: 'cloud', company: 'Tresorit AG', privacyScore: 9, isEthical: true, openSource: false, description: { it: 'Cloud E2E svizzero, conforme GDPR e zero-knowledge.', en: 'Swiss E2E cloud, GDPR compliant and zero-knowledge.' } },

  // ── Social ──
  { id: 'instagram', name: 'Instagram', category: 'social', company: 'Meta', privacyScore: 2, isEthical: false, openSource: false, description: { it: 'Social visuale con tracciamento e profilazione massiva.', en: 'Visual social with massive tracking and profiling.' } },
  { id: 'twitter', name: 'X (Twitter)', category: 'social', company: 'X Corp.', privacyScore: 3, isEthical: false, openSource: false, description: { it: 'Microblogging con raccolta dati e algoritmi opachi.', en: 'Microblogging with data collection and opaque algorithms.' } },
  { id: 'threads', name: 'Threads', category: 'social', company: 'Meta', privacyScore: 2, isEthical: false, openSource: false, description: { it: 'Social Meta con raccolta dati estensiva.', en: 'Meta social with extensive data collection.' } },
  { id: 'linkedin', name: 'LinkedIn', category: 'social', company: 'Microsoft', privacyScore: 3, isEthical: false, openSource: false, description: { it: 'Social professionale, raccoglie molti dati di carriera.', en: 'Professional social, collects extensive career data.' } },
  { id: 'mastodon', name: 'Mastodon', category: 'social', company: 'Mastodon gGmbH', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Social decentralizzato e federato, senza pubblicità.', en: 'Decentralized and federated social, ad-free.' } },
  { id: 'bluesky', name: 'Bluesky', category: 'social', company: 'Bluesky PBC', privacyScore: 7, isEthical: true, openSource: true, description: { it: 'Social con protocollo AT aperto e decentralizzato.', en: 'Social with open, decentralized AT Protocol.' } },
  { id: 'pixelfed', name: 'Pixelfed', category: 'social', company: 'Pixelfed / Community', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Alternativa federata a Instagram, senza pubblicità.', en: 'Federated Instagram alternative, ad-free.' } },
  { id: 'lemmy', name: 'Lemmy', category: 'social', company: 'Lemmy / Community', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Alternativa federata a Reddit, open source.', en: 'Federated Reddit alternative, open source.' } },

  // ── Maps ──
  { id: 'google-maps', name: 'Google Maps', category: 'maps', company: 'Google', privacyScore: 2, isEthical: false, openSource: false, description: { it: 'Mappe eccellenti, ma traccia ogni spostamento.', en: 'Excellent maps, but tracks your every movement.' } },
  { id: 'apple-maps', name: 'Apple Maps', category: 'maps', company: 'Apple', privacyScore: 6, isEthical: false, openSource: false, description: { it: 'Buona privacy, ma ecosistema chiuso.', en: 'Good privacy, but closed ecosystem.' } },
  { id: 'here-wego', name: 'HERE WeGo', category: 'maps', company: 'HERE Technologies', privacyScore: 5, isEthical: false, openSource: false, description: { it: 'Mappe offline con navigazione, privacy media.', en: 'Offline maps with navigation, moderate privacy.' } },
  { id: 'osm', name: 'OpenStreetMap', category: 'maps', company: 'OSM Foundation', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'Mappe collaborative, libere e senza tracciamento.', en: 'Collaborative, free maps without tracking.' } },
  { id: 'organic-maps', name: 'Organic Maps', category: 'maps', company: 'Organic Maps OÜ', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'Mappe offline basate su OSM, privacy totale.', en: 'Offline maps based on OSM, total privacy.' } },
  { id: 'osmand', name: 'OsmAnd', category: 'maps', company: 'OsmAnd BV', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Navigazione offline avanzata basata su OSM.', en: 'Advanced offline navigation based on OSM.' } },

  // ── AI ──
  { id: 'chatgpt', name: 'ChatGPT', category: 'ai', company: 'OpenAI', privacyScore: 3, isEthical: false, openSource: false, description: { it: 'IA potente, dati possono essere usati per l\'addestramento.', en: 'Powerful AI, data may be used for training.' } },
  { id: 'gemini', name: 'Google Gemini', category: 'ai', company: 'Google', privacyScore: 3, isEthical: false, openSource: false, description: { it: 'IA di Google, integrata con i servizi Google.', en: 'Google AI, integrated with Google services.' } },
  { id: 'claude', name: 'Claude', category: 'ai', company: 'Anthropic', privacyScore: 6, isEthical: false, openSource: false, description: { it: 'IA con focus sulla sicurezza, non addestra sui tuoi dati.', en: 'Safety-focused AI, doesn\'t train on your data.' } },
  { id: 'perplexity', name: 'Perplexity', category: 'ai', company: 'Perplexity AI', privacyScore: 4, isEthical: false, openSource: false, description: { it: 'IA per ricerca, raccoglie dati di navigazione e query.', en: 'AI search, collects browsing data and queries.' } },
  { id: 'mistral', name: 'Mistral (Le Chat)', category: 'ai', company: 'Mistral AI', privacyScore: 7, isEthical: true, openSource: true, description: { it: 'IA europea con modelli open source, sede in Francia.', en: 'European AI with open source models, based in France.' } },
  { id: 'ollama', name: 'Ollama (Locale)', category: 'ai', company: 'Self-hosted', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'IA locale sul tuo computer, nessun dato esce.', en: 'Local AI on your computer, no data leaves.' } },
  { id: 'lm-studio', name: 'LM Studio', category: 'ai', company: 'LM Studio / Self-hosted', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'Interfaccia per eseguire modelli IA in locale.', en: 'Interface to run AI models locally.' } },

  // ── Password Manager ──
  { id: 'lastpass', name: 'LastPass', category: 'password', company: 'LastPass / GoTo', privacyScore: 3, isEthical: false, openSource: false, description: { it: 'Password manager popolare, ma con gravi violazioni passate.', en: 'Popular password manager, but with serious past breaches.' } },
  { id: '1password', name: '1Password', category: 'password', company: 'AgileBits Inc.', privacyScore: 7, isEthical: false, openSource: false, description: { it: 'Password manager premium, buona sicurezza, codice chiuso.', en: 'Premium password manager, good security, closed source.' } },
  { id: 'bitwarden', name: 'Bitwarden', category: 'password', company: 'Bitwarden Inc.', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Password manager open source, auditato, self-hostabile.', en: 'Open source password manager, audited, self-hostable.' } },
  { id: 'keepass', name: 'KeePass', category: 'password', company: 'Community', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'Password manager offline e locale, zero cloud.', en: 'Offline, local password manager, zero cloud.' } },
  { id: 'proton-pass', name: 'Proton Pass', category: 'password', company: 'Proton AG', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Password manager E2E di Proton, con alias email.', en: 'Proton E2E password manager with email aliases.' } },

  // ── VPN ──
  { id: 'nordvpn', name: 'NordVPN', category: 'vpn', company: 'Nord Security', privacyScore: 6, isEthical: false, openSource: false, description: { it: 'VPN popolare e veloce, ma codice chiuso.', en: 'Popular and fast VPN, but closed source.' } },
  { id: 'expressvpn', name: 'ExpressVPN', category: 'vpn', company: 'Kape Technologies', privacyScore: 5, isEthical: false, openSource: false, description: { it: 'VPN veloce, proprietà discussa (Kape Technologies).', en: 'Fast VPN, controversial ownership (Kape Technologies).' } },
  { id: 'mullvad-vpn', name: 'Mullvad VPN', category: 'vpn', company: 'Mullvad VPN AB', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'VPN anonima, nessun account richiesto, pagamento in contanti.', en: 'Anonymous VPN, no account required, accepts cash payment.' } },
  { id: 'protonvpn', name: 'Proton VPN', category: 'vpn', company: 'Proton AG', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'VPN svizzera open source con piano gratuito.', en: 'Swiss open source VPN with free tier.' } },
  { id: 'ivpn', name: 'IVPN', category: 'vpn', company: 'IVPN Limited', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'VPN trasparente e auditata, nessun log.', en: 'Transparent and audited VPN, no logs.' } },

  // ── Operating System ──
  { id: 'windows', name: 'Windows', category: 'os', company: 'Microsoft', privacyScore: 2, isEthical: false, openSource: false, description: { it: 'Sistema operativo dominante con telemetria estensiva.', en: 'Dominant OS with extensive telemetry.' } },
  { id: 'macos', name: 'macOS', category: 'os', company: 'Apple', privacyScore: 6, isEthical: false, openSource: false, description: { it: 'Buona privacy di base, ma ecosistema chiuso.', en: 'Good base privacy, but closed ecosystem.' } },
  { id: 'ubuntu', name: 'Ubuntu', category: 'os', company: 'Canonical', privacyScore: 8, isEthical: true, openSource: true, description: { it: 'Linux user-friendly, buona privacy, alcune telemetrie opt-in.', en: 'User-friendly Linux, good privacy, some opt-in telemetry.' } },
  { id: 'fedora', name: 'Fedora', category: 'os', company: 'Red Hat / Community', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Linux all\'avanguardia, nessuna telemetria, community-driven.', en: 'Cutting-edge Linux, no telemetry, community-driven.' } },
  { id: 'tails', name: 'Tails', category: 'os', company: 'Tails Project', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'OS live per l\'anonimato, non lascia tracce sul computer.', en: 'Live OS for anonymity, leaves no traces on the computer.' } },

  // ── Video Conferencing ──
  { id: 'zoom', name: 'Zoom', category: 'videoconference', company: 'Zoom Communications', privacyScore: 4, isEthical: false, openSource: false, description: { it: 'Videoconferenza popolare con problemi di privacy storici.', en: 'Popular video conferencing with historical privacy issues.' } },
  { id: 'google-meet', name: 'Google Meet', category: 'videoconference', company: 'Google', privacyScore: 4, isEthical: false, openSource: false, description: { it: 'Videoconferenza integrata nell\'ecosistema Google.', en: 'Video conferencing integrated in the Google ecosystem.' } },
  { id: 'ms-teams', name: 'Microsoft Teams', category: 'videoconference', company: 'Microsoft', privacyScore: 4, isEthical: false, openSource: false, description: { it: 'Videoconferenza aziendale, raccoglie dati di utilizzo.', en: 'Enterprise video conferencing, collects usage data.' } },
  { id: 'jitsi', name: 'Jitsi Meet', category: 'videoconference', company: '8x8 / Community', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Videoconferenza open source, self-hostabile, senza account.', en: 'Open source video conferencing, self-hostable, no account needed.' } },
  { id: 'bigbluebutton', name: 'BigBlueButton', category: 'videoconference', company: 'Community', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Piattaforma open source per lezioni e conferenze online.', en: 'Open source platform for online classes and conferences.' } },

  // ── Notes & Documents ──
  { id: 'google-docs', name: 'Google Docs', category: 'notes', company: 'Google', privacyScore: 3, isEthical: false, openSource: false, description: { it: 'Documenti cloud di Google, dati usati per profilazione.', en: 'Google cloud docs, data used for profiling.' } },
  { id: 'notion', name: 'Notion', category: 'notes', company: 'Notion Labs', privacyScore: 4, isEthical: false, openSource: false, description: { it: 'Workspace potente ma cloud-only, senza crittografia E2E.', en: 'Powerful workspace but cloud-only, no E2E encryption.' } },
  { id: 'obsidian', name: 'Obsidian', category: 'notes', company: 'Obsidian / Dynalist', privacyScore: 8, isEthical: true, openSource: false, description: { it: 'Note in locale con file Markdown, sync opzionale.', en: 'Local notes with Markdown files, optional sync.' } },
  { id: 'cryptpad', name: 'CryptPad', category: 'notes', company: 'XWiki SAS', privacyScore: 10, isEthical: true, openSource: true, description: { it: 'Suite collaborativa E2E, zero-knowledge, self-hostabile.', en: 'E2E collaborative suite, zero-knowledge, self-hostable.' } },
  { id: 'standard-notes', name: 'Standard Notes', category: 'notes', company: 'Standard Notes Ltd.', privacyScore: 9, isEthical: true, openSource: true, description: { it: 'Note crittografate E2E, semplici e sicure.', en: 'E2E encrypted notes, simple and secure.' } },
];

export function getToolsByCategory(category: ToolCategory): StackTool[] {
  return tools.filter((t) => t.category === category);
}

export function getToolById(id: string): StackTool | undefined {
  return tools.find((t) => t.id === id);
}

export function getCategoryMeta(id: ToolCategory): CategoryMeta {
  return categories.find((c) => c.id === id)!;
}

export function buildEmptySelections(): Record<ToolCategory, string | null> {
  return Object.fromEntries(categories.map((c) => [c.id, null])) as Record<ToolCategory, string | null>;
}

export function calculateSovereigntyScore(
  selectedTools: Record<ToolCategory, string | null>,
): number {
  const selected = Object.values(selectedTools).filter(Boolean) as string[];
  if (selected.length === 0) return 0;

  const selectedObjs = selected.map((id) => getToolById(id)).filter(Boolean) as StackTool[];
  const avg = selectedObjs.reduce((sum, t) => sum + t.privacyScore, 0) / selectedObjs.length;

  return Math.round((avg / 10) * 100);
}

export function getScoreLabel(score: number): 'poor' | 'fair' | 'good' | 'excellent' {
  if (score <= 25) return 'poor';
  if (score <= 50) return 'fair';
  if (score <= 75) return 'good';
  return 'excellent';
}

export function getScoreColor(score: number): string {
  if (score <= 25) return 'text-red-500';
  if (score <= 50) return 'text-amber-500';
  if (score <= 75) return 'text-emerald-500';
  return 'text-green-500';
}

export function getScoreStrokeColor(score: number): string {
  if (score <= 25) return '#ef4444';
  if (score <= 50) return '#f59e0b';
  if (score <= 75) return '#10b981';
  return '#22c55e';
}

export function getPrivacyColor(privacyScore: number): string {
  if (privacyScore <= 3) return 'text-red-500 bg-red-500/10';
  if (privacyScore <= 6) return 'text-amber-500 bg-amber-500/10';
  if (privacyScore <= 8) return 'text-emerald-500 bg-emerald-500/10';
  return 'text-green-500 bg-green-500/10';
}

export function getBestEthicalAlternative(category: ToolCategory): StackTool | undefined {
  return getToolsByCategory(category)
    .filter((t) => t.isEthical)
    .sort((a, b) => b.privacyScore - a.privacyScore)[0];
}
