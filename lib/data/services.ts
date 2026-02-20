export type ServiceCategory =
  | 'social'
  | 'messaging'
  | 'productivity'
  | 'streaming'
  | 'ecommerce'
  | 'ai'
  | 'browser';

export type DataType =
  | 'location'
  | 'contacts'
  | 'messages'
  | 'photos'
  | 'voice'
  | 'documents'
  | 'code'
  | 'prompts'
  | 'generated_content'
  | 'browsing_history'
  | 'purchase_history'
  | 'biometrics'
  | 'usage_patterns'
  | 'search_history'
  | 'financial'
  | 'health'
  | 'calendar'
  | 'email_content'
  | 'files'
  | 'audio_recordings';

export type UsageFrequency = 'daily' | 'weekly' | 'rarely';

export type EthicalAlternative = {
  name: string;
  reason: { it: string; en: string };
};

export type RelatedContent = {
  type: 'course' | 'resource' | 'glossary';
  slug: string;
};

export type DigitalService = {
  id: string;
  name: string;
  icon: string;
  category: ServiceCategory;
  companyOwner: string;
  privacyScore: number;
  dataCollected: DataType[];
  trainingUsage: boolean;
  thirdPartySharing: string[];
  ethicalAlternatives: EthicalAlternative[];
  relatedContent: RelatedContent[];
};

export const serviceCategories: {
  id: ServiceCategory;
  label: { it: string; en: string };
  icon: string;
  description: { it: string; en: string };
}[] = [
  {
    id: 'social',
    label: { it: 'Social Media', en: 'Social Media' },
    icon: 'Users',
    description: {
      it: 'Le piattaforme dove condividi la tua vita online',
      en: 'The platforms where you share your online life',
    },
  },
  {
    id: 'messaging',
    label: { it: 'Messaggistica', en: 'Messaging' },
    icon: 'MessageCircle',
    description: {
      it: 'Le app che usi per comunicare ogni giorno',
      en: 'The apps you use to communicate every day',
    },
  },
  {
    id: 'productivity',
    label: { it: 'Email & Produttività', en: 'Email & Productivity' },
    icon: 'Mail',
    description: {
      it: 'Gli strumenti per email, documenti e lavoro',
      en: 'Your tools for email, documents and work',
    },
  },
  {
    id: 'streaming',
    label: { it: 'Streaming & Media', en: 'Streaming & Media' },
    icon: 'Play',
    description: {
      it: 'Musica, video e contenuti in streaming',
      en: 'Music, video and streaming content',
    },
  },
  {
    id: 'ecommerce',
    label: { it: 'E-commerce & Servizi', en: 'E-commerce & Services' },
    icon: 'ShoppingCart',
    description: {
      it: 'Dove compri online e ordini servizi',
      en: 'Where you shop online and order services',
    },
  },
  {
    id: 'ai',
    label: { it: 'Intelligenza Artificiale', en: 'Artificial Intelligence' },
    icon: 'Brain',
    description: {
      it: 'Chatbot, assistenti e strumenti IA che usi',
      en: 'Chatbots, assistants and AI tools you use',
    },
  },
  {
    id: 'browser',
    label: { it: 'Browser & Sistema Operativo', en: 'Browser & OS' },
    icon: 'Monitor',
    description: {
      it: 'Il software di base con cui navighi e lavori',
      en: 'The base software you browse and work with',
    },
  },
];

export const digitalServices: DigitalService[] = [
  // ── Social Media ──
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'Camera',
    category: 'social',
    companyOwner: 'Meta',
    privacyScore: 8,
    dataCollected: ['location', 'contacts', 'photos', 'messages', 'usage_patterns', 'biometrics', 'browsing_history'],
    trainingUsage: true,
    thirdPartySharing: ['Meta', 'Advertisers', 'Data Brokers'],
    ethicalAlternatives: [
      { name: 'Pixelfed', reason: { it: 'Alternativa federata e open source', en: 'Federated and open-source alternative' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'privacy-pratica' },
      { type: 'glossary', slug: 'profilazione' },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'Music',
    category: 'social',
    companyOwner: 'ByteDance',
    privacyScore: 9,
    dataCollected: ['location', 'contacts', 'biometrics', 'usage_patterns', 'browsing_history', 'voice', 'photos'],
    trainingUsage: true,
    thirdPartySharing: ['ByteDance', 'Advertisers', 'Data Brokers'],
    ethicalAlternatives: [
      { name: 'PeerTube', reason: { it: 'Piattaforma video decentralizzata', en: 'Decentralized video platform' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'privacy-pratica' },
      { type: 'glossary', slug: 'capitalismo-sorveglianza' },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'Users',
    category: 'social',
    companyOwner: 'Meta',
    privacyScore: 9,
    dataCollected: ['location', 'contacts', 'messages', 'photos', 'usage_patterns', 'browsing_history', 'financial', 'biometrics'],
    trainingUsage: true,
    thirdPartySharing: ['Meta', 'Advertisers', 'Data Brokers', 'Political Campaigns'],
    ethicalAlternatives: [
      { name: 'Mastodon', reason: { it: 'Social federato, senza pubblicità', en: 'Federated social, ad-free' } },
      { name: 'Friendica', reason: { it: 'Rete sociale decentralizzata', en: 'Decentralized social network' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'fondamenti-sovranita-digitale' },
      { type: 'resource', slug: 'sorveglianza-capitalismo' },
    ],
  },
  {
    id: 'x-twitter',
    name: 'X / Twitter',
    icon: 'AtSign',
    category: 'social',
    companyOwner: 'X Corp',
    privacyScore: 8,
    dataCollected: ['location', 'contacts', 'messages', 'usage_patterns', 'browsing_history'],
    trainingUsage: true,
    thirdPartySharing: ['X Corp', 'Advertisers', 'xAI'],
    ethicalAlternatives: [
      { name: 'Mastodon', reason: { it: 'Microblogging federato e open source', en: 'Federated and open-source microblogging' } },
      { name: 'Bluesky', reason: { it: 'Protocollo aperto e decentralizzato', en: 'Open and decentralized protocol' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'attivismo-digitale' },
    ],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'Briefcase',
    category: 'social',
    companyOwner: 'Microsoft',
    privacyScore: 7,
    dataCollected: ['contacts', 'messages', 'usage_patterns', 'browsing_history', 'location'],
    trainingUsage: true,
    thirdPartySharing: ['Microsoft', 'Advertisers', 'Recruiters'],
    ethicalAlternatives: [
      { name: 'Owncast', reason: { it: 'Self-hosted per networking professionale', en: 'Self-hosted for professional networking' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'privacy-pratica' },
    ],
  },
  {
    id: 'reddit',
    name: 'Reddit',
    icon: 'MessageSquare',
    category: 'social',
    companyOwner: 'Reddit Inc',
    privacyScore: 6,
    dataCollected: ['usage_patterns', 'browsing_history', 'location', 'messages'],
    trainingUsage: true,
    thirdPartySharing: ['Reddit Inc', 'Advertisers', 'AI Companies'],
    ethicalAlternatives: [
      { name: 'Lemmy', reason: { it: 'Alternativa federata a Reddit', en: 'Federated Reddit alternative' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'alternative-etiche' },
    ],
  },
  {
    id: 'threads',
    name: 'Threads',
    icon: 'Hash',
    category: 'social',
    companyOwner: 'Meta',
    privacyScore: 8,
    dataCollected: ['location', 'contacts', 'usage_patterns', 'browsing_history', 'biometrics'],
    trainingUsage: true,
    thirdPartySharing: ['Meta', 'Advertisers'],
    ethicalAlternatives: [
      { name: 'Mastodon', reason: { it: 'Microblogging federato', en: 'Federated microblogging' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'privacy-pratica' },
    ],
  },

  // ── Messaggistica ──
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'MessageCircle',
    category: 'messaging',
    companyOwner: 'Meta',
    privacyScore: 6,
    dataCollected: ['contacts', 'location', 'usage_patterns', 'messages'],
    trainingUsage: false,
    thirdPartySharing: ['Meta'],
    ethicalAlternatives: [
      { name: 'Signal', reason: { it: 'Crittografia end-to-end, nessun dato condiviso', en: 'End-to-end encryption, no shared data' } },
    ],
    relatedContent: [
      { type: 'glossary', slug: 'crittografia-end-to-end' },
      { type: 'course', slug: 'privacy-pratica' },
    ],
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'Send',
    category: 'messaging',
    companyOwner: 'Telegram FZ-LLC',
    privacyScore: 5,
    dataCollected: ['contacts', 'messages', 'usage_patterns', 'location', 'files'],
    trainingUsage: false,
    thirdPartySharing: ['Telegram FZ-LLC'],
    ethicalAlternatives: [
      { name: 'Signal', reason: { it: 'Crittografia di default su tutte le chat', en: 'Default encryption on all chats' } },
      { name: 'Element/Matrix', reason: { it: 'Protocollo aperto e decentralizzato', en: 'Open and decentralized protocol' } },
    ],
    relatedContent: [
      { type: 'glossary', slug: 'crittografia-end-to-end' },
    ],
  },
  {
    id: 'signal',
    name: 'Signal',
    icon: 'Shield',
    category: 'messaging',
    companyOwner: 'Signal Foundation',
    privacyScore: 1,
    dataCollected: ['usage_patterns'],
    trainingUsage: false,
    thirdPartySharing: [],
    ethicalAlternatives: [],
    relatedContent: [
      { type: 'glossary', slug: 'crittografia-end-to-end' },
      { type: 'course', slug: 'alternative-etiche' },
    ],
  },
  {
    id: 'messenger',
    name: 'Messenger',
    icon: 'MessageCircle',
    category: 'messaging',
    companyOwner: 'Meta',
    privacyScore: 8,
    dataCollected: ['contacts', 'messages', 'location', 'usage_patterns', 'photos', 'voice'],
    trainingUsage: true,
    thirdPartySharing: ['Meta', 'Advertisers'],
    ethicalAlternatives: [
      { name: 'Signal', reason: { it: 'Privacy reale, non solo promessa', en: 'Real privacy, not just promised' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'privacy-pratica' },
    ],
  },

  // ── Email & Produttività ──
  {
    id: 'gmail',
    name: 'Gmail',
    icon: 'Mail',
    category: 'productivity',
    companyOwner: 'Google',
    privacyScore: 7,
    dataCollected: ['email_content', 'contacts', 'usage_patterns', 'location', 'calendar'],
    trainingUsage: true,
    thirdPartySharing: ['Google', 'Advertisers'],
    ethicalAlternatives: [
      { name: 'ProtonMail', reason: { it: 'Email crittografata, server in Svizzera', en: 'Encrypted email, servers in Switzerland' } },
      { name: 'Tutanota', reason: { it: 'Email crittografata, open source', en: 'Encrypted email, open source' } },
    ],
    relatedContent: [
      { type: 'resource', slug: 'come-proteggere-email' },
      { type: 'course', slug: 'privacy-pratica' },
    ],
  },
  {
    id: 'outlook',
    name: 'Outlook',
    icon: 'Mail',
    category: 'productivity',
    companyOwner: 'Microsoft',
    privacyScore: 6,
    dataCollected: ['email_content', 'contacts', 'calendar', 'usage_patterns', 'files'],
    trainingUsage: true,
    thirdPartySharing: ['Microsoft', 'Advertisers'],
    ethicalAlternatives: [
      { name: 'ProtonMail', reason: { it: 'Privacy-first, zero accesso ai tuoi dati', en: 'Privacy-first, zero access to your data' } },
    ],
    relatedContent: [
      { type: 'resource', slug: 'come-proteggere-email' },
    ],
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    icon: 'HardDrive',
    category: 'productivity',
    companyOwner: 'Google',
    privacyScore: 7,
    dataCollected: ['documents', 'files', 'usage_patterns', 'contacts'],
    trainingUsage: true,
    thirdPartySharing: ['Google'],
    ethicalAlternatives: [
      { name: 'Nextcloud', reason: { it: 'Cloud self-hosted, pieno controllo', en: 'Self-hosted cloud, full control' } },
      { name: 'Proton Drive', reason: { it: 'Cloud crittografato end-to-end', en: 'End-to-end encrypted cloud' } },
    ],
    relatedContent: [
      { type: 'glossary', slug: 'portabilita-dati' },
      { type: 'course', slug: 'alternative-etiche' },
    ],
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    icon: 'HardDrive',
    category: 'productivity',
    companyOwner: 'Dropbox Inc',
    privacyScore: 5,
    dataCollected: ['files', 'documents', 'usage_patterns'],
    trainingUsage: true,
    thirdPartySharing: ['Dropbox Inc', 'OpenAI'],
    ethicalAlternatives: [
      { name: 'Nextcloud', reason: { it: 'Alternativa open source e self-hosted', en: 'Open-source and self-hosted alternative' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'alternative-etiche' },
    ],
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: 'FileText',
    category: 'productivity',
    companyOwner: 'Notion Labs',
    privacyScore: 5,
    dataCollected: ['documents', 'files', 'usage_patterns', 'contacts'],
    trainingUsage: false,
    thirdPartySharing: ['Notion Labs', 'AWS'],
    ethicalAlternatives: [
      { name: 'Logseq', reason: { it: 'Note open source e local-first', en: 'Open-source and local-first notes' } },
      { name: 'Obsidian', reason: { it: 'Note locali, i tuoi file restano tuoi', en: 'Local notes, your files stay yours' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'alternative-etiche' },
    ],
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: 'Hash',
    category: 'productivity',
    companyOwner: 'Salesforce',
    privacyScore: 6,
    dataCollected: ['messages', 'files', 'usage_patterns', 'contacts'],
    trainingUsage: true,
    thirdPartySharing: ['Salesforce'],
    ethicalAlternatives: [
      { name: 'Element/Matrix', reason: { it: 'Chat di team decentralizzata e crittografata', en: 'Decentralized and encrypted team chat' } },
      { name: 'Rocket.Chat', reason: { it: 'Open source e self-hosted', en: 'Open source and self-hosted' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'alternative-etiche' },
    ],
  },

  // ── Streaming & Media ──
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'Play',
    category: 'streaming',
    companyOwner: 'Google',
    privacyScore: 8,
    dataCollected: ['usage_patterns', 'browsing_history', 'search_history', 'location', 'voice'],
    trainingUsage: true,
    thirdPartySharing: ['Google', 'Advertisers'],
    ethicalAlternatives: [
      { name: 'PeerTube', reason: { it: 'Video decentralizzato e senza tracciamento', en: 'Decentralized video without tracking' } },
      { name: 'Invidious', reason: { it: 'Frontend YouTube senza tracciamento', en: 'YouTube frontend without tracking' } },
    ],
    relatedContent: [
      { type: 'glossary', slug: 'profilazione' },
      { type: 'resource', slug: 'sorveglianza-capitalismo' },
    ],
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: 'Music',
    category: 'streaming',
    companyOwner: 'Spotify AB',
    privacyScore: 6,
    dataCollected: ['usage_patterns', 'location', 'contacts', 'voice'],
    trainingUsage: false,
    thirdPartySharing: ['Spotify AB', 'Advertisers', 'Record Labels'],
    ethicalAlternatives: [
      { name: 'Funkwhale', reason: { it: 'Streaming musicale federato', en: 'Federated music streaming' } },
    ],
    relatedContent: [
      { type: 'glossary', slug: 'profilazione' },
    ],
  },
  {
    id: 'netflix',
    name: 'Netflix',
    icon: 'Tv',
    category: 'streaming',
    companyOwner: 'Netflix Inc',
    privacyScore: 5,
    dataCollected: ['usage_patterns', 'location', 'financial'],
    trainingUsage: false,
    thirdPartySharing: ['Netflix Inc'],
    ethicalAlternatives: [],
    relatedContent: [
      { type: 'glossary', slug: 'profilazione' },
    ],
  },
  {
    id: 'twitch',
    name: 'Twitch',
    icon: 'Tv',
    category: 'streaming',
    companyOwner: 'Amazon',
    privacyScore: 6,
    dataCollected: ['usage_patterns', 'messages', 'financial', 'location', 'voice'],
    trainingUsage: false,
    thirdPartySharing: ['Amazon', 'Advertisers'],
    ethicalAlternatives: [
      { name: 'Owncast', reason: { it: 'Streaming live self-hosted', en: 'Self-hosted live streaming' } },
    ],
    relatedContent: [],
  },

  // ── E-commerce & Servizi ──
  {
    id: 'amazon',
    name: 'Amazon',
    icon: 'ShoppingCart',
    category: 'ecommerce',
    companyOwner: 'Amazon',
    privacyScore: 8,
    dataCollected: ['purchase_history', 'browsing_history', 'location', 'financial', 'voice', 'usage_patterns', 'contacts'],
    trainingUsage: true,
    thirdPartySharing: ['Amazon', 'Sellers', 'Advertisers', 'AWS'],
    ethicalAlternatives: [
      { name: 'Negozi locali online', reason: { it: 'Supporta l\'economia locale', en: 'Support the local economy' } },
    ],
    relatedContent: [
      { type: 'resource', slug: 'sorveglianza-capitalismo' },
      { type: 'course', slug: 'fondamenti-sovranita-digitale' },
    ],
  },
  {
    id: 'ebay',
    name: 'eBay',
    icon: 'ShoppingCart',
    category: 'ecommerce',
    companyOwner: 'eBay Inc',
    privacyScore: 5,
    dataCollected: ['purchase_history', 'browsing_history', 'financial', 'location'],
    trainingUsage: false,
    thirdPartySharing: ['eBay Inc', 'PayPal', 'Advertisers'],
    ethicalAlternatives: [],
    relatedContent: [],
  },
  {
    id: 'deliveroo',
    name: 'Deliveroo',
    icon: 'Bike',
    category: 'ecommerce',
    companyOwner: 'Deliveroo plc',
    privacyScore: 6,
    dataCollected: ['location', 'purchase_history', 'financial', 'usage_patterns', 'contacts'],
    trainingUsage: false,
    thirdPartySharing: ['Deliveroo plc', 'Restaurants', 'Payment Providers'],
    ethicalAlternatives: [],
    relatedContent: [
      { type: 'glossary', slug: 'profilazione' },
    ],
  },
  {
    id: 'uber',
    name: 'Uber',
    icon: 'Car',
    category: 'ecommerce',
    companyOwner: 'Uber Technologies',
    privacyScore: 7,
    dataCollected: ['location', 'financial', 'contacts', 'usage_patterns'],
    trainingUsage: false,
    thirdPartySharing: ['Uber Technologies', 'Drivers', 'Advertisers'],
    ethicalAlternatives: [],
    relatedContent: [
      { type: 'glossary', slug: 'profilazione' },
    ],
  },

  // ── Intelligenza Artificiale ──
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: 'Brain',
    category: 'ai',
    companyOwner: 'OpenAI',
    privacyScore: 7,
    dataCollected: ['prompts', 'documents', 'code', 'usage_patterns', 'files', 'generated_content'],
    trainingUsage: true,
    thirdPartySharing: ['OpenAI', 'Microsoft'],
    ethicalAlternatives: [
      { name: 'Ollama + modelli locali', reason: { it: 'IA locale, nessun dato inviato a terzi', en: 'Local AI, no data sent to third parties' } },
      { name: 'HuggingChat', reason: { it: 'Open source con modelli aperti', en: 'Open source with open models' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'intelligenza-artificiale-etica' },
      { type: 'glossary', slug: 'ai-act' },
      { type: 'resource', slug: 'ai-act-sintesi' },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: 'Sparkles',
    category: 'ai',
    companyOwner: 'Google',
    privacyScore: 8,
    dataCollected: ['prompts', 'documents', 'code', 'usage_patterns', 'email_content', 'files', 'generated_content'],
    trainingUsage: true,
    thirdPartySharing: ['Google'],
    ethicalAlternatives: [
      { name: 'Ollama + modelli locali', reason: { it: 'IA completamente offline', en: 'Fully offline AI' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'intelligenza-artificiale-etica' },
      { type: 'glossary', slug: 'ai-act' },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: 'Bot',
    category: 'ai',
    companyOwner: 'Anthropic',
    privacyScore: 5,
    dataCollected: ['prompts', 'documents', 'code', 'usage_patterns', 'files'],
    trainingUsage: false,
    thirdPartySharing: ['Anthropic'],
    ethicalAlternatives: [
      { name: 'Ollama + modelli locali', reason: { it: 'IA locale per massima privacy', en: 'Local AI for maximum privacy' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'intelligenza-artificiale-etica' },
      { type: 'glossary', slug: 'ai-act' },
    ],
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    icon: 'Code',
    category: 'ai',
    companyOwner: 'Microsoft',
    privacyScore: 7,
    dataCollected: ['code', 'prompts', 'usage_patterns', 'files'],
    trainingUsage: true,
    thirdPartySharing: ['Microsoft', 'OpenAI'],
    ethicalAlternatives: [
      { name: 'Codeium', reason: { it: 'AI coding con opzioni di privacy migliori', en: 'AI coding with better privacy options' } },
      { name: 'TabbyML', reason: { it: 'AI coding self-hosted e open source', en: 'Self-hosted open-source AI coding' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'intelligenza-artificiale-etica' },
      { type: 'glossary', slug: 'open-source' },
    ],
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    icon: 'Image',
    category: 'ai',
    companyOwner: 'Midjourney Inc',
    privacyScore: 6,
    dataCollected: ['prompts', 'generated_content', 'usage_patterns'],
    trainingUsage: true,
    thirdPartySharing: ['Midjourney Inc'],
    ethicalAlternatives: [
      { name: 'Stable Diffusion (locale)', reason: { it: 'Genera immagini sul tuo computer', en: 'Generate images on your computer' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'intelligenza-artificiale-etica' },
    ],
  },
  {
    id: 'dall-e',
    name: 'DALL-E',
    icon: 'Image',
    category: 'ai',
    companyOwner: 'OpenAI',
    privacyScore: 6,
    dataCollected: ['prompts', 'generated_content', 'usage_patterns'],
    trainingUsage: true,
    thirdPartySharing: ['OpenAI', 'Microsoft'],
    ethicalAlternatives: [
      { name: 'Stable Diffusion (locale)', reason: { it: 'Generazione immagini offline', en: 'Offline image generation' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'intelligenza-artificiale-etica' },
    ],
  },
  {
    id: 'alexa',
    name: 'Alexa',
    icon: 'Mic',
    category: 'ai',
    companyOwner: 'Amazon',
    privacyScore: 9,
    dataCollected: ['voice', 'audio_recordings', 'location', 'usage_patterns', 'contacts', 'purchase_history', 'prompts'],
    trainingUsage: true,
    thirdPartySharing: ['Amazon', 'Third-party Skills', 'Advertisers'],
    ethicalAlternatives: [
      { name: 'Mycroft', reason: { it: 'Assistente vocale open source e privato', en: 'Open-source and private voice assistant' } },
      { name: 'Home Assistant', reason: { it: 'Domotica locale senza cloud', en: 'Local home automation without cloud' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'intelligenza-artificiale-etica' },
      { type: 'course', slug: 'privacy-pratica' },
    ],
  },
  {
    id: 'siri',
    name: 'Siri',
    icon: 'Mic',
    category: 'ai',
    companyOwner: 'Apple',
    privacyScore: 4,
    dataCollected: ['voice', 'usage_patterns', 'location', 'prompts'],
    trainingUsage: false,
    thirdPartySharing: ['Apple'],
    ethicalAlternatives: [
      { name: 'Mycroft', reason: { it: 'Assistente vocale completamente locale', en: 'Fully local voice assistant' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'intelligenza-artificiale-etica' },
    ],
  },
  {
    id: 'google-assistant',
    name: 'Google Assistant',
    icon: 'Mic',
    category: 'ai',
    companyOwner: 'Google',
    privacyScore: 8,
    dataCollected: ['voice', 'audio_recordings', 'location', 'usage_patterns', 'contacts', 'calendar', 'search_history', 'prompts'],
    trainingUsage: true,
    thirdPartySharing: ['Google', 'Third-party Actions'],
    ethicalAlternatives: [
      { name: 'Mycroft', reason: { it: 'Assistente vocale open source', en: 'Open-source voice assistant' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'intelligenza-artificiale-etica' },
      { type: 'course', slug: 'privacy-pratica' },
    ],
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    icon: 'PenTool',
    category: 'ai',
    companyOwner: 'Grammarly Inc',
    privacyScore: 7,
    dataCollected: ['documents', 'usage_patterns', 'email_content', 'prompts'],
    trainingUsage: true,
    thirdPartySharing: ['Grammarly Inc'],
    ethicalAlternatives: [
      { name: 'LanguageTool', reason: { it: 'Open source con opzione self-hosted', en: 'Open source with self-hosted option' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'intelligenza-artificiale-etica' },
      { type: 'course', slug: 'alternative-etiche' },
    ],
  },

  // ── Browser & OS ──
  {
    id: 'chrome',
    name: 'Google Chrome',
    icon: 'Globe',
    category: 'browser',
    companyOwner: 'Google',
    privacyScore: 8,
    dataCollected: ['browsing_history', 'search_history', 'location', 'usage_patterns', 'contacts', 'financial'],
    trainingUsage: true,
    thirdPartySharing: ['Google', 'Advertisers'],
    ethicalAlternatives: [
      { name: 'Firefox', reason: { it: 'Open source, fondazione non-profit', en: 'Open source, non-profit foundation' } },
      { name: 'Brave', reason: { it: 'Blocca tracciamento per design', en: 'Blocks tracking by design' } },
      { name: 'Tor Browser', reason: { it: 'Massimo anonimato nella navigazione', en: 'Maximum browsing anonymity' } },
    ],
    relatedContent: [
      { type: 'resource', slug: 'browser-privacy' },
      { type: 'course', slug: 'privacy-pratica' },
    ],
  },
  {
    id: 'safari',
    name: 'Safari',
    icon: 'Globe',
    category: 'browser',
    companyOwner: 'Apple',
    privacyScore: 4,
    dataCollected: ['browsing_history', 'usage_patterns', 'location'],
    trainingUsage: false,
    thirdPartySharing: ['Apple'],
    ethicalAlternatives: [
      { name: 'Firefox', reason: { it: 'Più trasparente e open source', en: 'More transparent and open source' } },
    ],
    relatedContent: [
      { type: 'resource', slug: 'browser-privacy' },
    ],
  },
  {
    id: 'firefox',
    name: 'Firefox',
    icon: 'Globe',
    category: 'browser',
    companyOwner: 'Mozilla Foundation',
    privacyScore: 2,
    dataCollected: ['usage_patterns'],
    trainingUsage: false,
    thirdPartySharing: [],
    ethicalAlternatives: [],
    relatedContent: [
      { type: 'resource', slug: 'browser-privacy' },
      { type: 'course', slug: 'alternative-etiche' },
      { type: 'glossary', slug: 'open-source' },
    ],
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: 'Monitor',
    category: 'browser',
    companyOwner: 'Microsoft',
    privacyScore: 7,
    dataCollected: ['usage_patterns', 'location', 'browsing_history', 'voice', 'files', 'biometrics'],
    trainingUsage: true,
    thirdPartySharing: ['Microsoft', 'Advertisers'],
    ethicalAlternatives: [
      { name: 'Linux (Ubuntu, Fedora)', reason: { it: 'Sistema operativo libero e open source', en: 'Free and open-source operating system' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'alternative-etiche' },
      { type: 'glossary', slug: 'open-source' },
    ],
  },
  {
    id: 'android',
    name: 'Android',
    icon: 'Smartphone',
    category: 'browser',
    companyOwner: 'Google',
    privacyScore: 7,
    dataCollected: ['location', 'contacts', 'usage_patterns', 'browsing_history', 'voice', 'photos', 'biometrics'],
    trainingUsage: true,
    thirdPartySharing: ['Google', 'Advertisers', 'OEM Manufacturers'],
    ethicalAlternatives: [
      { name: 'GrapheneOS', reason: { it: 'Android senza Google, massima privacy', en: 'Android without Google, maximum privacy' } },
      { name: '/e/OS', reason: { it: 'Android degooglizzato e facile da usare', en: 'Degoogled Android, easy to use' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'privacy-pratica' },
      { type: 'course', slug: 'alternative-etiche' },
    ],
  },
  {
    id: 'ios',
    name: 'iOS',
    icon: 'Smartphone',
    category: 'browser',
    companyOwner: 'Apple',
    privacyScore: 4,
    dataCollected: ['location', 'usage_patterns', 'biometrics', 'contacts', 'photos'],
    trainingUsage: false,
    thirdPartySharing: ['Apple'],
    ethicalAlternatives: [
      { name: 'GrapheneOS', reason: { it: 'Alternativa mobile realmente libera', en: 'Truly free mobile alternative' } },
    ],
    relatedContent: [
      { type: 'course', slug: 'fondamenti-sovranita-digitale' },
    ],
  },
];
