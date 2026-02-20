import type { Lesson } from '../courses';

export const alternativeEticheLessons: Lesson[] = [
  {
    id: 'alternative-etiche-1',
    slug: 'perche-cercare-alternative',
    title: {
      it: 'Perché cercare alternative',
      en: 'Why seek alternatives'
    },
    description: {
      it: 'I problemi con i monopoli Big Tech, l\'estrazione di dati e la perdita di controllo',
      en: 'The problems with Big Tech monopolies, data extraction and loss of control'
    },
    duration: '18 min',
    order: 1,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Il dominio dei Big Tech',
          en: 'Big Tech dominance'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Google, Meta, Amazon, Apple e Microsoft controllano collettivamente una porzione enorme della nostra vita digitale. Queste aziende non solo forniscono servizi, ma raccolgono quantità massicce di dati personali, influenzano le nostre percezioni attraverso algoritmi opachi, e detengono un potere economico e politico senza precedenti. Il loro modello di business si basa sulla sorveglianza: più dati raccolgono, più possono profilare e manipolare gli utenti per massimizzare i profitti.',
          en: 'Google, Meta, Amazon, Apple, and Microsoft collectively control a huge portion of our digital lives. These companies not only provide services, but collect massive amounts of personal data, influence our perceptions through opaque algorithms, and hold unprecedented economic and political power. Their business model is based on surveillance: the more data they collect, the more they can profile and manipulate users to maximize profits.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Questo controllo centralizzato crea vulnerabilità sistemiche. Quando miliardi di persone dipendono da poche piattaforme, un singolo punto di errore può avere conseguenze catastrofiche. Inoltre, questi monopoli soffocano l\'innovazione, eliminando la concorrenza e creando barriere all\'entrata per nuove aziende. Il risultato è un ecosistema digitale meno diversificato, meno resiliente e meno orientato agli interessi degli utenti.',
          en: 'This centralized control creates systemic vulnerabilities. When billions of people depend on a few platforms, a single point of failure can have catastrophic consequences. Moreover, these monopolies stifle innovation, eliminating competition and creating barriers to entry for new companies. The result is a less diversified, less resilient, and less user-oriented digital ecosystem.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Estrazione di dati e sorveglianza',
          en: 'Data extraction and surveillance'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il modello di business dei Big Tech si basa sulla raccolta e l\'analisi di dati personali. Ogni click, ogni ricerca, ogni interazione viene tracciata, analizzata e utilizzata per creare profili dettagliati degli utenti. Questi profili vengono poi utilizzati per pubblicità mirata, manipolazione comportamentale e vendita a terze parti. Gli utenti spesso non comprendono l\'entità della raccolta dati o come questi dati vengono utilizzati contro i loro interessi.',
          en: 'Big Tech\'s business model is based on collecting and analyzing personal data. Every click, every search, every interaction is tracked, analyzed, and used to create detailed user profiles. These profiles are then used for targeted advertising, behavioral manipulation, and sale to third parties. Users often don\'t understand the extent of data collection or how this data is used against their interests.'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Tracciamento cross-platform: i Big Tech tracciano gli utenti attraverso diversi servizi e siti web',
            en: 'Cross-platform tracking: Big Tech tracks users across different services and websites'
          },
          {
            it: 'Profiling comportamentale: creazione di profili psicologici dettagliati basati su comportamenti online',
            en: 'Behavioral profiling: creation of detailed psychological profiles based on online behaviors'
          },
          {
            it: 'Vendita di dati: i dati vengono venduti o condivisi con migliaia di terze parti',
            en: 'Data selling: data is sold or shared with thousands of third parties'
          },
          {
            it: 'Mancanza di trasparenza: gli utenti spesso non sanno quali dati vengono raccolti e come vengono utilizzati',
            en: 'Lack of transparency: users often don\'t know what data is collected and how it\'s used'
          }
        ]
      },
      {
        type: 'heading',
        content: {
          it: 'Perdita di controllo',
          en: 'Loss of control'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Quando utilizzi servizi Big Tech, cedi il controllo sui tuoi dati, sulla tua privacy e sulla tua esperienza digitale. Le piattaforme possono cambiare le loro politiche senza preavviso, possono censurare o rimuovere contenuti arbitrariamente, e possono chiudere account senza spiegazioni adeguate. Gli utenti diventano prodotti, non clienti, e i loro interessi sono secondari rispetto agli obiettivi di profitto delle aziende.',
          en: 'When you use Big Tech services, you cede control over your data, your privacy, and your digital experience. Platforms can change their policies without notice, can censor or remove content arbitrarily, and can close accounts without adequate explanations. Users become products, not customers, and their interests are secondary to companies\' profit goals.'
        }
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Il controllo centralizzato dei Big Tech rappresenta una minaccia per la democrazia, la privacy e l\'autonomia individuale. Cercare alternative non è solo una questione di preferenza personale, ma di libertà digitale.',
          en: 'Big Tech\'s centralized control represents a threat to democracy, privacy, and individual autonomy. Seeking alternatives is not just a matter of personal preference, but of digital freedom.'
        }
      }
    ]
  },
  {
    id: 'alternative-etiche-2',
    slug: 'email-e-cloud',
    title: {
      it: 'Email e cloud',
      en: 'Email and cloud'
    },
    description: {
      it: 'ProtonMail, Tutanota, Nextcloud e confronto con Gmail, Google Drive e iCloud',
      en: 'ProtonMail, Tutanota, Nextcloud and comparison with Gmail, Google Drive and iCloud'
    },
    duration: '22 min',
    order: 2,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Alternative alle email tradizionali',
          en: 'Alternatives to traditional email'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Gmail e altri servizi email tradizionali scansionano le tue email per pubblicità mirata e profilazione. Le alternative etiche come ProtonMail e Tutanota offrono crittografia end-to-end e non scansionano i contenuti delle email. ProtonMail, con sede in Svizzera, offre crittografia zero-knowledge, il che significa che nemmeno loro possono leggere le tue email. Tutanota, con sede in Germania, offre crittografia completa delle email e del calendario, con un\'interfaccia moderna e intuitiva.',
          en: 'Gmail and other traditional email services scan your emails for targeted advertising and profiling. Ethical alternatives like ProtonMail and Tutanota offer end-to-end encryption and don\'t scan email contents. ProtonMail, based in Switzerland, offers zero-knowledge encryption, meaning even they can\'t read your emails. Tutanota, based in Germany, offers complete encryption of emails and calendar, with a modern and intuitive interface.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Entrambi i servizi offrono versioni gratuite con limitazioni di spazio, e versioni a pagamento con più funzionalità. La migrazione da Gmail è relativamente semplice: puoi importare le tue email esistenti e reindirizzare le nuove email al nuovo indirizzo durante un periodo di transizione. La crittografia end-to-end significa che le tue comunicazioni sono protette anche se i server vengono compromessi.',
          en: 'Both services offer free versions with storage limitations, and paid versions with more features. Migration from Gmail is relatively simple: you can import your existing emails and redirect new emails to the new address during a transition period. End-to-end encryption means your communications are protected even if servers are compromised.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Alternative al cloud storage',
          en: 'Cloud storage alternatives'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Google Drive, Dropbox e iCloud offrono comodità ma a costo della privacy. Questi servizi possono accedere ai tuoi file, scansionarli per pubblicità, e sono vulnerabili a richieste governative di accesso. Nextcloud è un\'alternativa open source che puoi self-hostare o utilizzare tramite provider che rispettano la privacy. Nextcloud offre sincronizzazione file, condivisione, collaborazione su documenti, calendario, contatti e molto altro, tutto sotto il tuo controllo.',
          en: 'Google Drive, Dropbox, and iCloud offer convenience but at the cost of privacy. These services can access your files, scan them for advertising, and are vulnerable to government access requests. Nextcloud is an open source alternative that you can self-host or use through privacy-respecting providers. Nextcloud offers file synchronization, sharing, document collaboration, calendar, contacts, and much more, all under your control.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Nextcloud può essere installato sul tuo server o utilizzato tramite provider come Nextcloud.com o provider indipendenti. Offre funzionalità simili a Google Workspace ma con privacy e controllo dei dati. Per utenti meno tecnici, ci sono anche alternative commerciali come pCloud e Sync.com che offrono crittografia zero-knowledge senza la necessità di self-hosting.',
          en: 'Nextcloud can be installed on your server or used through providers like Nextcloud.com or independent providers. It offers features similar to Google Workspace but with privacy and data control. For less technical users, there are also commercial alternatives like pCloud and Sync.com that offer zero-knowledge encryption without the need for self-hosting.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Confronto pratico',
          en: 'Practical comparison'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Privacy: Gmail scansiona email per pubblicità; ProtonMail/Tutanota no',
            en: 'Privacy: Gmail scans emails for advertising; ProtonMail/Tutanota don\'t'
          },
          {
            it: 'Crittografia: Gmail crittografa solo in transito; alternative crittografano end-to-end',
            en: 'Encryption: Gmail encrypts only in transit; alternatives encrypt end-to-end'
          },
          {
            it: 'Controllo dati: Google controlla i tuoi dati; Nextcloud ti dà controllo completo',
            en: 'Data control: Google controls your data; Nextcloud gives you complete control'
          },
          {
            it: 'Costi: Gmail è gratuito ma vendi i tuoi dati; alternative hanno versioni gratuite limitate o costi mensili',
            en: 'Costs: Gmail is free but you sell your data; alternatives have limited free versions or monthly costs'
          }
        ]
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'La migrazione completa può richiedere tempo. Inizia con servizi critici come email e documenti importanti, poi espandi gradualmente.',
          en: 'Complete migration can take time. Start with critical services like email and important documents, then gradually expand.'
        }
      }
    ]
  },
  {
    id: 'alternative-etiche-3',
    slug: 'social-media-e-messaggistica',
    title: {
      it: 'Social media e messaggistica',
      en: 'Social media and messaging'
    },
    description: {
      it: 'Mastodon, Pixelfed, Signal, Matrix/Element e spiegazione del Fediverse',
      en: 'Mastodon, Pixelfed, Signal, Matrix/Element and explanation of the Fediverse'
    },
    duration: '25 min',
    order: 3,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Il Fediverse spiegato',
          en: 'The Fediverse explained'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il Fediverse è un insieme di piattaforme sociali decentralizzate e interconnesse che utilizzano il protocollo ActivityPub. A differenza di Facebook o Twitter, dove tutto è controllato da una singola azienda, il Fediverse è composto da migliaia di server indipendenti (chiamati "istanze") che possono comunicare tra loro. Puoi essere su un\'istanza Mastodon e seguire qualcuno su un\'altra istanza, proprio come puoi inviare un\'email da Gmail a Outlook.',
          en: 'The Fediverse is a collection of decentralized and interconnected social platforms that use the ActivityPub protocol. Unlike Facebook or Twitter, where everything is controlled by a single company, the Fediverse consists of thousands of independent servers (called "instances") that can communicate with each other. You can be on one Mastodon instance and follow someone on another instance, just like you can send an email from Gmail to Outlook.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Questa decentralizzazione significa che nessuna singola entità controlla il Fediverse. Se un\'istanza chiude o cambia politiche, puoi migrare il tuo account su un\'altra istanza mantenendo i tuoi follower e contenuti. Il Fediverse include Mastodon per microblogging (alternativa a Twitter), Pixelfed per foto (alternativa a Instagram), PeerTube per video (alternativa a YouTube), e Lemmy per forum (alternativa a Reddit).',
          en: 'This decentralization means no single entity controls the Fediverse. If one instance closes or changes policies, you can migrate your account to another instance while keeping your followers and content. The Fediverse includes Mastodon for microblogging (Twitter alternative), Pixelfed for photos (Instagram alternative), PeerTube for videos (YouTube alternative), and Lemmy for forums (Reddit alternative).'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Mastodon e Pixelfed',
          en: 'Mastodon and Pixelfed'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Mastodon è la piattaforma più popolare del Fediverse, con milioni di utenti attivi. Funziona in modo simile a Twitter ma senza algoritmi di engagement, pubblicità o tracciamento. Puoi scegliere un\'istanza che corrisponde ai tuoi interessi (tecnologia, arte, attivismo, ecc.) o creare la tua. L\'interfaccia è pulita e focalizzata sul contenuto, non sulla pubblicità. Pixelfed offre un\'esperienza simile a Instagram ma con controllo dei dati e senza algoritmi che manipolano la tua timeline.',
          en: 'Mastodon is the most popular platform in the Fediverse, with millions of active users. It works similarly to Twitter but without engagement algorithms, advertising, or tracking. You can choose an instance that matches your interests (technology, art, activism, etc.) or create your own. The interface is clean and focused on content, not advertising. Pixelfed offers an Instagram-like experience but with data control and without algorithms that manipulate your timeline.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Messaggistica sicura',
          en: 'Secure messaging'
        }
      },
      {
        type: 'text',
        content: {
          it: 'WhatsApp e Messenger appartengono a Meta e raccolgono metadati anche se i messaggi sono crittografati. Signal è l\'alternativa gold standard: crittografia end-to-end di default, open source, e raccoglie solo i metadati minimi necessari. Signal è supportato da una fondazione no-profit e non ha interessi commerciali nel raccogliere dati. Matrix/Element offre una soluzione ancora più decentralizzata: puoi self-hostare il tuo server o utilizzare server pubblici, e tutti possono comunicare tra loro indipendentemente dal server.',
          en: 'WhatsApp and Messenger belong to Meta and collect metadata even if messages are encrypted. Signal is the gold standard alternative: end-to-end encryption by default, open source, and collects only minimal necessary metadata. Signal is supported by a non-profit foundation and has no commercial interest in collecting data. Matrix/Element offers an even more decentralized solution: you can self-host your server or use public servers, and everyone can communicate with each other regardless of server.'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Signal: Messaggistica semplice e sicura, crittografia end-to-end, nessun tracciamento',
            en: 'Signal: Simple and secure messaging, end-to-end encryption, no tracking'
          },
          {
            it: 'Matrix/Element: Messaggistica decentralizzata, self-hostabile, interoperabile tra server',
            en: 'Matrix/Element: Decentralized messaging, self-hostable, interoperable between servers'
          },
          {
            it: 'Mastodon: Microblogging decentralizzato, nessun algoritmo, controllo dei dati',
            en: 'Mastodon: Decentralized microblogging, no algorithm, data control'
          },
          {
            it: 'Pixelfed: Condivisione foto decentralizzata, alternativa a Instagram',
            en: 'Pixelfed: Decentralized photo sharing, Instagram alternative'
          }
        ]
      },
      {
        type: 'callout',
        variant: 'info',
        content: {
          it: 'La curva di apprendimento per il Fediverse può essere inizialmente ripida, ma la comunità è generalmente molto accogliente e disponibile ad aiutare i nuovi utenti.',
          en: 'The learning curve for the Fediverse can be initially steep, but the community is generally very welcoming and willing to help new users.'
        }
      }
    ]
  },
  {
    id: 'alternative-etiche-4',
    slug: 'browser-ricerca-e-mappe',
    title: {
      it: 'Browser, ricerca e mappe',
      en: 'Browser, search and maps'
    },
    description: {
      it: 'Firefox, Brave, DuckDuckGo, OpenStreetMap e consigli pratici per la migrazione',
      en: 'Firefox, Brave, DuckDuckGo, OpenStreetMap and practical migration tips'
    },
    duration: '20 min',
    order: 4,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Alternative ai browser dominanti',
          en: 'Alternatives to dominant browsers'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Chrome domina il mercato dei browser con oltre il 60% della quota di mercato, ma appartiene a Google che traccia ogni tua attività online. Firefox, sviluppato dalla Mozilla Foundation no-profit, è un\'alternativa eccellente che rispetta la privacy. Firefox blocca i tracker di default, supporta estensioni per maggiore privacy, e il suo codice è open source. Brave è un\'altra alternativa che blocca tracker e pubblicità di default, offrendo anche un sistema di ricompense opzionale per i creatori di contenuti.',
          en: 'Chrome dominates the browser market with over 60% market share, but it belongs to Google which tracks your every online activity. Firefox, developed by the non-profit Mozilla Foundation, is an excellent privacy-respecting alternative. Firefox blocks trackers by default, supports extensions for greater privacy, and its code is open source. Brave is another alternative that blocks trackers and ads by default, also offering an optional rewards system for content creators.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'La migrazione da Chrome a Firefox è semplice: puoi importare segnalibri, password e cronologia. Firefox offre anche funzionalità avanzate come Container Tabs per isolare i login tra siti diversi, e Enhanced Tracking Protection che blocca tracker cross-site. Per maggiore privacy, puoi installare estensioni come uBlock Origin e Privacy Badger, e configurare Firefox per utilizzare DNS over HTTPS.',
          en: 'Migration from Chrome to Firefox is simple: you can import bookmarks, passwords, and history. Firefox also offers advanced features like Container Tabs to isolate logins between different sites, and Enhanced Tracking Protection that blocks cross-site trackers. For greater privacy, you can install extensions like uBlock Origin and Privacy Badger, and configure Firefox to use DNS over HTTPS.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Motori di ricerca rispettosi della privacy',
          en: 'Privacy-respecting search engines'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Google traccia ogni ricerca, costruisce profili dettagliati degli utenti e utilizza questi dati per pubblicità mirata. DuckDuckGo è un motore di ricerca che non traccia gli utenti, non costruisce profili, e non filtra i risultati in base alla cronologia di ricerca. Offre risultati di ricerca di qualità comparabili a Google ma senza la sorveglianza. Startpage è un\'altra alternativa che offre risultati Google ma attraverso un proxy che protegge la privacy.',
          en: 'Google tracks every search, builds detailed user profiles, and uses this data for targeted advertising. DuckDuckGo is a search engine that doesn\'t track users, doesn\'t build profiles, and doesn\'t filter results based on search history. It offers search results of quality comparable to Google but without surveillance. Startpage is another alternative that offers Google results but through a proxy that protects privacy.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Searx è un meta-motore di ricerca open source che aggrega risultati da vari motori di ricerca senza tracciare gli utenti. Puoi utilizzare istanze pubbliche di Searx o self-hostarne una tua. Per ricerche ancora più private, puoi utilizzare Tor Browser con motori di ricerca come DuckDuckGo o Searx, nascondendo completamente la tua identità online.',
          en: 'Searx is an open source meta-search engine that aggregates results from various search engines without tracking users. You can use public Searx instances or self-host your own. For even more private searches, you can use Tor Browser with search engines like DuckDuckGo or Searx, completely hiding your online identity.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Alternative alle mappe',
          en: 'Map alternatives'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Google Maps e Apple Maps tracciano la tua posizione e costruiscono profili dettagliati dei tuoi movimenti. OpenStreetMap (OSM) è un progetto collaborativo open source che crea mappe gratuite e modificabili. Le app come OsmAnd e Organic Maps utilizzano i dati di OpenStreetMap offrendo navigazione offline completa senza tracciamento. Queste app sono particolarmente utili per la navigazione offline, funzionando anche senza connessione internet.',
          en: 'Google Maps and Apple Maps track your location and build detailed profiles of your movements. OpenStreetMap (OSM) is a collaborative open source project that creates free and editable maps. Apps like OsmAnd and Organic Maps use OpenStreetMap data offering complete offline navigation without tracking. These apps are particularly useful for offline navigation, working even without internet connection.'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Firefox: Browser open source con protezione privacy integrata, alternativa a Chrome',
            en: 'Firefox: Open source browser with built-in privacy protection, Chrome alternative'
          },
          {
            it: 'DuckDuckGo: Motore di ricerca che non traccia, alternativa a Google',
            en: 'DuckDuckGo: Search engine that doesn\'t track, Google alternative'
          },
          {
            it: 'OpenStreetMap: Mappe collaborative open source, alternativa a Google Maps',
            en: 'OpenStreetMap: Collaborative open source maps, Google Maps alternative'
          },
          {
            it: 'OsmAnd/Organic Maps: App di navigazione basate su OSM con supporto offline',
            en: 'OsmAnd/Organic Maps: Navigation apps based on OSM with offline support'
          }
        ]
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'Configura Firefox come browser predefinito e DuckDuckGo come motore di ricerca predefinito per una migrazione immediata e semplice.',
          en: 'Set Firefox as default browser and DuckDuckGo as default search engine for an immediate and simple migration.'
        }
      }
    ]
  },
  {
    id: 'alternative-etiche-5',
    slug: 'sistemi-operativi-e-app',
    title: {
      it: 'Sistemi operativi e app',
      en: 'Operating systems and apps'
    },
    description: {
      it: 'Linux, GrapheneOS, F-Droid e app open source per dispositivi mobili',
      en: 'Linux, GrapheneOS, F-Droid and open source mobile apps'
    },
    duration: '22 min',
    order: 5,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Alternative ai sistemi operativi desktop',
          en: 'Desktop operating system alternatives'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Windows e macOS raccolgono dati di telemetria e limitano il controllo dell\'utente sul sistema. Linux offre completa libertà e controllo. Distribuzioni come Ubuntu, Fedora e Linux Mint sono user-friendly e possono sostituire Windows o macOS per la maggior parte degli utenti. Linux è gratuito, open source, e non raccoglie dati personali. La maggior parte del software necessario è disponibile per Linux, e molti sviluppatori stanno creando alternative open source a software proprietario.',
          en: 'Windows and macOS collect telemetry data and limit user control over the system. Linux offers complete freedom and control. Distributions like Ubuntu, Fedora, and Linux Mint are user-friendly and can replace Windows or macOS for most users. Linux is free, open source, and doesn\'t collect personal data. Most necessary software is available for Linux, and many developers are creating open source alternatives to proprietary software.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'La migrazione a Linux può sembrare intimidatoria, ma distribuzioni moderne come Ubuntu offrono un\'esperienza simile a Windows o macOS. Puoi provare Linux senza installarlo utilizzando una USB live, o installarlo in dual-boot accanto al tuo sistema operativo esistente. La comunità Linux è molto supportiva e ci sono risorse abbondanti online per aiutare con la migrazione.',
          en: 'Migration to Linux can seem intimidating, but modern distributions like Ubuntu offer an experience similar to Windows or macOS. You can try Linux without installing it using a live USB, or install it in dual-boot alongside your existing operating system. The Linux community is very supportive and there are abundant online resources to help with migration.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Sistemi operativi mobili',
          en: 'Mobile operating systems'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Android di Google e iOS di Apple raccolgono quantità massicce di dati. GrapheneOS è un sistema operativo Android open source e orientato alla privacy, progettato per dispositivi Pixel di Google. Rimuove tutti i servizi Google, migliora la sicurezza e offre maggiore controllo all\'utente. CalyxOS è un\'alternativa simile disponibile per più dispositivi. Entrambi offrono un\'esperienza Android familiare ma senza il tracciamento di Google.',
          en: 'Google\'s Android and Apple\'s iOS collect massive amounts of data. GrapheneOS is an open source, privacy-oriented Android operating system, designed for Google Pixel devices. It removes all Google services, improves security, and offers greater user control. CalyxOS is a similar alternative available for more devices. Both offer a familiar Android experience but without Google tracking.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'F-Droid e app open source',
          en: 'F-Droid and open source apps'
        }
      },
      {
        type: 'text',
        content: {
          it: 'F-Droid è un repository di app Android open source che rispettano la privacy. A differenza del Google Play Store, F-Droid verifica che le app siano open source e non contengano tracker o pubblicità. Offre migliaia di app per ogni esigenza: da app di produttività a giochi, da app di comunicazione a strumenti di sistema. Tutte le app sono gratuite e open source, garantendo trasparenza e controllo.',
          en: 'F-Droid is a repository of open source Android apps that respect privacy. Unlike the Google Play Store, F-Droid verifies that apps are open source and don\'t contain trackers or advertising. It offers thousands of apps for every need: from productivity apps to games, from communication apps to system tools. All apps are free and open source, ensuring transparency and control.'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Linux: Sistema operativo desktop open source, alternativa a Windows/macOS',
            en: 'Linux: Open source desktop operating system, Windows/macOS alternative'
          },
          {
            it: 'GrapheneOS: Android orientato alla privacy per dispositivi Pixel',
            en: 'GrapheneOS: Privacy-oriented Android for Pixel devices'
          },
          {
            it: 'CalyxOS: Android orientato alla privacy per più dispositivi',
            en: 'CalyxOS: Privacy-oriented Android for more devices'
          },
          {
            it: 'F-Droid: Repository di app Android open source senza tracker',
            en: 'F-Droid: Repository of open source Android apps without trackers'
          },
          {
            it: 'App open source: Alternative a quasi tutte le app proprietarie popolari',
            en: 'Open source apps: Alternatives to almost all popular proprietary apps'
          }
        ]
      },
      {
        type: 'callout',
        variant: 'info',
        content: {
          it: 'La migrazione completa a Linux o sistemi operativi mobili alternativi richiede più impegno, ma offre il massimo controllo e privacy. Inizia con app open source su sistemi esistenti prima di considerare la migrazione completa.',
          en: 'Complete migration to Linux or alternative mobile operating systems requires more commitment, but offers maximum control and privacy. Start with open source apps on existing systems before considering complete migration.'
        }
      }
    ]
  },
  {
    id: 'alternative-etiche-6',
    slug: 'la-tua-migrazione-digitale',
    title: {
      it: 'La tua migrazione digitale',
      en: 'Your digital migration'
    },
    description: {
      it: 'Piano passo-passo, approccio graduale, cosa prioritizzare e gestire gli effetti di rete',
      en: 'Step-by-step plan, gradual approach, what to prioritize and dealing with network effects'
    },
    duration: '20 min',
    order: 6,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Un approccio graduale',
          en: 'A gradual approach'
        }
      },
      {
        type: 'text',
        content: {
          it: 'La migrazione completa dai Big Tech può sembrare travolgente, ma non deve essere tutto o niente. Un approccio graduale è più sostenibile e meno stressante. Inizia identificando i servizi che usi più frequentemente e che contengono i dati più sensibili. Email e cloud storage sono spesso i punti di partenza migliori, seguiti da browser e motore di ricerca. Puoi mantenere alcuni servizi Big Tech per transizione mentre migri altri.',
          en: 'Complete migration from Big Tech can seem overwhelming, but it doesn\'t have to be all or nothing. A gradual approach is more sustainable and less stressful. Start by identifying the services you use most frequently and that contain the most sensitive data. Email and cloud storage are often the best starting points, followed by browser and search engine. You can keep some Big Tech services for transition while migrating others.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Non c\'è bisogno di migrare tutto in una volta. Prenditi il tempo necessario per familiarizzare con ogni nuovo servizio prima di passare al successivo. Questo ti permette di imparare le funzionalità, risolvere problemi e costruire fiducia nelle alternative. La migrazione è un processo, non un evento, e va bene fare passi indietro se necessario.',
          en: 'There\'s no need to migrate everything at once. Take the time needed to familiarize yourself with each new service before moving to the next. This allows you to learn features, troubleshoot issues, and build trust in alternatives. Migration is a process, not an event, and it\'s okay to take steps back if necessary.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Priorità di migrazione',
          en: 'Migration priorities'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Alta priorità: Email (contiene informazioni molto sensibili), Browser (traccia tutto), Motore di ricerca (profilazione)',
            en: 'High priority: Email (contains very sensitive information), Browser (tracks everything), Search engine (profiling)'
          },
          {
            it: 'Media priorità: Cloud storage (dati personali), Messaggistica (comunicazioni private), Social media (profilazione)',
            en: 'Medium priority: Cloud storage (personal data), Messaging (private communications), Social media (profiling)'
          },
          {
            it: 'Bassa priorità: Sistemi operativi (richiede più competenze), App specializzate (dipende dalle esigenze)',
            en: 'Low priority: Operating systems (requires more skills), Specialized apps (depends on needs)'
          }
        ]
      },
      {
        type: 'heading',
        content: {
          it: 'Gestire gli effetti di rete',
          en: 'Dealing with network effects'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Uno dei maggiori ostacoli alla migrazione sono gli effetti di rete: tutti usano WhatsApp, quindi devi usare WhatsApp per comunicare con loro. Questo è un problema reale, ma ci sono strategie per gestirlo. Per la messaggistica, puoi utilizzare Signal parallelamente a WhatsApp, invitando gradualmente i contatti importanti a migrare. Per i social media, puoi mantenere account su piattaforme tradizionali per rimanere in contatto mentre costruisci la tua presenza sul Fediverse.',
          en: 'One of the biggest obstacles to migration are network effects: everyone uses WhatsApp, so you must use WhatsApp to communicate with them. This is a real problem, but there are strategies to deal with it. For messaging, you can use Signal alongside WhatsApp, gradually inviting important contacts to migrate. For social media, you can maintain accounts on traditional platforms to stay in touch while building your presence on the Fediverse.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Non devi essere perfetto. Usare alcuni servizi Big Tech per necessità pratiche mentre migri altri è un compromesso ragionevole. L\'obiettivo è ridurre la dipendenza dai Big Tech, non eliminarla completamente dall\'oggi al domani. Ogni servizio migrato è un passo verso maggiore privacy e controllo.',
          en: 'You don\'t have to be perfect. Using some Big Tech services out of practical necessity while migrating others is a reasonable compromise. The goal is to reduce dependence on Big Tech, not eliminate it completely overnight. Every migrated service is a step toward greater privacy and control.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Piano di migrazione passo-passo',
          en: 'Step-by-step migration plan'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Settimana 1-2: Migra il browser (Firefox) e il motore di ricerca (DuckDuckGo)',
            en: 'Week 1-2: Migrate browser (Firefox) and search engine (DuckDuckGo)'
          },
          {
            it: 'Settimana 3-4: Configura email alternativa (ProtonMail/Tutanota) e inizia a reindirizzare',
            en: 'Week 3-4: Set up alternative email (ProtonMail/Tutanota) and start redirecting'
          },
          {
            it: 'Settimana 5-6: Migra file importanti su Nextcloud o alternativa cloud',
            en: 'Week 5-6: Migrate important files to Nextcloud or cloud alternative'
          },
          {
            it: 'Settimana 7-8: Installa Signal e invita contatti importanti a migrare',
            en: 'Week 7-8: Install Signal and invite important contacts to migrate'
          },
          {
            it: 'Mese 3+: Esplora Fediverse (Mastodon), considera migrazione sistemi operativi se appropriato',
            en: 'Month 3+: Explore Fediverse (Mastodon), consider operating system migration if appropriate'
          }
        ]
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'Ricorda: ogni passo conta. Non devi migrare tutto per vedere benefici. Anche migrare solo browser e motore di ricerca riduce significativamente il tracciamento.',
          en: 'Remember: every step counts. You don\'t have to migrate everything to see benefits. Even migrating only browser and search engine significantly reduces tracking.'
        }
      }
    ]
  }
];
