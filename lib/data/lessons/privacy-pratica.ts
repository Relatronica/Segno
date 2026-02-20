import type { Lesson } from '../courses';

export const privacyPraticaLessons: Lesson[] = [
  {
    id: 'privacy-1',
    slug: 'perche-la-privacy-e-importante',
    title: {
      it: 'Perché la privacy è importante',
      en: 'Why privacy matters'
    },
    description: {
      it: 'Il valore della privacy, malintesi comuni ("non ho nulla da nascondere")',
      en: 'The value of privacy, common misconceptions ("I have nothing to hide")'
    },
    duration: '15 min',
    order: 1,
    content: [
      {
        type: 'heading',
        content: {
          it: 'La privacy è un diritto fondamentale',
          en: 'Privacy is a fundamental right'
        }
      },
      {
        type: 'text',
        content: {
          it: 'La privacy non riguarda solo nascondere qualcosa di negativo. È il diritto di controllare le informazioni su di te e decidere chi può accedervi e in quali circostanze. Proprio come chiudiamo le tende a casa nostra non perché abbiamo qualcosa da nascondere, ma perché vogliamo controllare chi può vedere dentro, la privacy digitale riguarda il controllo sulle nostre informazioni personali.',
          en: 'Privacy isn\'t just about hiding something negative. It\'s the right to control information about yourself and decide who can access it and under what circumstances. Just as we close curtains at home not because we have something to hide, but because we want to control who can see inside, digital privacy is about control over our personal information.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'La privacy è essenziale per l\'autonomia personale e la libertà di pensiero. Quando sai di essere osservato, modifichi il tuo comportamento - un fenomeno chiamato "effetto panopticon". Senza privacy, perdiamo la libertà di esplorare idee, fare domande imbarazzanti, o semplicemente essere noi stessi senza il giudizio degli altri.',
          en: 'Privacy is essential for personal autonomy and freedom of thought. When you know you\'re being watched, you modify your behavior - a phenomenon called the "panopticon effect". Without privacy, we lose the freedom to explore ideas, ask embarrassing questions, or simply be ourselves without others\' judgment.'
        }
      },
      {
        type: 'callout',
        variant: 'info',
        content: {
          it: 'La privacy è necessaria per la democrazia: permette alle persone di organizzarsi, dissentire e sfidare il potere senza paura di ritorsioni.',
          en: 'Privacy is necessary for democracy: it allows people to organize, dissent, and challenge power without fear of retaliation.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Il mito del "non ho nulla da nascondere"',
          en: 'The "I have nothing to hide" myth'
        }
      },
      {
        type: 'text',
        content: {
          it: 'La frase "non ho nulla da nascondere" è uno dei malintesi più comuni sulla privacy. Questo argomento ignora il fatto che la privacy non riguarda solo nascondere comportamenti illegali o imbarazzanti. Anche se non hai fatto nulla di sbagliato, hai comunque il diritto di controllare chi ha accesso alle tue informazioni personali.',
          en: 'The phrase "I have nothing to hide" is one of the most common misconceptions about privacy. This argument ignores the fact that privacy isn\'t just about hiding illegal or embarrassing behavior. Even if you haven\'t done anything wrong, you still have the right to control who has access to your personal information.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Inoltre, quello che consideri "normale" oggi potrebbe essere visto diversamente in futuro o in un contesto diverso. Le informazioni raccolte su di te possono essere utilizzate in modi che non puoi prevedere, compresi discriminazione, manipolazione o controllo sociale. La privacy protegge non solo il presente, ma anche il futuro.',
          en: 'Furthermore, what you consider "normal" today might be viewed differently in the future or in a different context. Information collected about you can be used in ways you can\'t predict, including discrimination, manipulation, or social control. Privacy protects not only the present, but also the future.'
        }
      },
      {
        type: 'quote',
        content: {
          it: 'Dire che non ti interessa la privacy perché non hai nulla da nascondere è come dire che non ti interessa la libertà di parola perché non hai nulla da dire.',
          en: 'Saying you don\'t care about privacy because you have nothing to hide is like saying you don\'t care about freedom of speech because you have nothing to say.'
        },
        author: 'Edward Snowden'
      },
      {
        type: 'text',
        content: {
          it: 'La privacy è anche una questione di potere e controllo. Quando le aziende e i governi raccolgono enormi quantità di dati su di te, creano uno squilibrio di potere. Tu sai poco o nulla su di loro, mentre loro sanno quasi tutto su di te. Questo squilibrio può essere sfruttato per manipolare le tue decisioni, influenzare il tuo comportamento e limitare la tua autonomia.',
          en: 'Privacy is also a matter of power and control. When companies and governments collect vast amounts of data about you, they create a power imbalance. You know little or nothing about them, while they know almost everything about you. This imbalance can be exploited to manipulate your decisions, influence your behavior, and limit your autonomy.'
        }
      }
    ]
  },
  {
    id: 'privacy-2',
    slug: 'valuta-esposizione-digitale',
    title: {
      it: 'Valuta la tua esposizione digitale',
      en: 'Assess your digital exposure'
    },
    description: {
      it: 'Audit dell\'impronta digitale, cosa sanno le aziende su di te',
      en: 'Digital footprint audit, what companies know about you'
    },
    duration: '20 min',
    order: 2,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Cosa è la tua impronta digitale',
          en: 'What is your digital footprint'
        }
      },
      {
        type: 'text',
        content: {
          it: 'La tua impronta digitale è l\'insieme di tutte le tracce che lasci online: post sui social media, ricerche su Google, acquisti online, app che usi, email che invii, e persino i siti che visiti senza interagire direttamente. Ogni azione digitale crea dati che vengono raccolti, archiviati e spesso condivisi con terze parti.',
          en: 'Your digital footprint is the collection of all traces you leave online: social media posts, Google searches, online purchases, apps you use, emails you send, and even sites you visit without directly interacting. Every digital action creates data that is collected, stored, and often shared with third parties.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Prima di poter proteggere la tua privacy, devi capire quanto sei esposto. Un audit della tua impronta digitale ti aiuta a identificare dove e come i tuoi dati vengono raccolti, chi li possiede e quali rischi corri.',
          en: 'Before you can protect your privacy, you need to understand how exposed you are. A digital footprint audit helps you identify where and how your data is collected, who owns it, and what risks you face.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Come fare un audit della tua privacy',
          en: 'How to do a privacy audit'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Elenca tutti i servizi che usi: social media, email, cloud storage, app bancarie, servizi di streaming',
            en: 'List all services you use: social media, email, cloud storage, banking apps, streaming services'
          },
          {
            it: 'Controlla le impostazioni di privacy: visita ogni servizio e rivedi cosa condividi e con chi',
            en: 'Check privacy settings: visit each service and review what you share and with whom'
          },
          {
            it: 'Scarica i tuoi dati: molti servizi permettono di scaricare una copia di tutti i dati che hanno su di te',
            en: 'Download your data: many services allow you to download a copy of all data they have about you'
          },
          {
            it: 'Cerca il tuo nome online: usa motori di ricerca per vedere cosa è pubblicamente disponibile su di te',
            en: 'Search your name online: use search engines to see what\'s publicly available about you'
          }
        ]
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'Google e Facebook offrono strumenti per scaricare tutti i tuoi dati. Prenditi il tempo per farlo - potresti rimanere sorpreso da quanto hanno raccolto.',
          en: 'Google and Facebook offer tools to download all your data. Take the time to do this - you might be surprised by how much they\'ve collected.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Cosa sanno le aziende su di te',
          en: 'What companies know about you'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Le aziende tecnologiche raccolgono informazioni su di te in modi che potresti non immaginare. Google traccia ogni ricerca, ogni video YouTube che guardi, ogni luogo che visiti (se usi Google Maps), e persino le email che ricevi e invii se usi Gmail. Facebook costruisce un profilo dettagliato basato su ciò che condividi, i post che ti piacciono, i siti che visiti con i loro tracker, e persino le foto in cui vieni taggato.',
          en: 'Technology companies collect information about you in ways you might not imagine. Google tracks every search, every YouTube video you watch, every place you visit (if you use Google Maps), and even emails you receive and send if you use Gmail. Facebook builds a detailed profile based on what you share, posts you like, sites you visit with their trackers, and even photos you\'re tagged in.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Amazon conosce le tue abitudini di acquisto, i tuoi interessi e persino cosa guardi su Prime Video. Apple traccia le tue app, i tuoi acquisti e la tua posizione se usi i servizi Apple. Queste aziende combinano questi dati per creare profili incredibilmente dettagliati che vengono utilizzati per pubblicità mirata, raccomandazioni e, in alcuni casi, venduti ad altre aziende.',
          en: 'Amazon knows your purchasing habits, interests, and even what you watch on Prime Video. Apple tracks your apps, purchases, and location if you use Apple services. These companies combine this data to create incredibly detailed profiles used for targeted advertising, recommendations, and, in some cases, sold to other companies.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Identificare i rischi',
          en: 'Identifying risks'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Dopo aver fatto l\'audit, identifica quali informazioni sono più sensibili e chi le possiede. Informazioni come la tua posizione in tempo reale, i tuoi dati finanziari, le tue comunicazioni private e i tuoi dati sanitari sono particolarmente sensibili e meritano protezione extra.',
          en: 'After doing the audit, identify which information is most sensitive and who owns it. Information like your real-time location, financial data, private communications, and health data are particularly sensitive and deserve extra protection.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Usa questa conoscenza per stabilire priorità: inizia proteggendo le informazioni più sensibili e poi espandi gradualmente le tue protezioni ad altre aree. Ricorda, l\'obiettivo non è la perfezione, ma il progresso continuo.',
          en: 'Use this knowledge to set priorities: start by protecting the most sensitive information and then gradually expand your protections to other areas. Remember, the goal isn\'t perfection, but continuous progress.'
        }
      }
    ]
  },
  {
    id: 'privacy-3',
    slug: 'browser-e-motori-ricerca',
    title: {
      it: 'Browser e motori di ricerca',
      en: 'Browsers and search engines'
    },
    description: {
      it: 'Firefox, Brave, Tor, DuckDuckGo, Startpage',
      en: 'Firefox, Brave, Tor, DuckDuckGo, Startpage'
    },
    duration: '25 min',
    order: 3,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Scegliere un browser rispettoso della privacy',
          en: 'Choosing a privacy-respecting browser'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il browser è la tua finestra sul web e la scelta che fai può avere un enorme impatto sulla tua privacy. Chrome, il browser più popolare, è di proprietà di Google e raccoglie enormi quantità di dati sui tuoi comportamenti online. Anche se Chrome è veloce e funzionale, ci sono alternative migliori per la privacy.',
          en: 'The browser is your window to the web, and the choice you make can have a huge impact on your privacy. Chrome, the most popular browser, is owned by Google and collects vast amounts of data on your online behaviors. Even though Chrome is fast and functional, there are better alternatives for privacy.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Firefox: privacy by default',
          en: 'Firefox: privacy by default'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Firefox è un browser open source sviluppato dalla Mozilla Foundation, un\'organizzazione senza scopo di lucro dedicata a un internet aperto e privato. Firefox blocca i tracker di terze parti per default, include protezioni anti-fingerprinting e non raccoglie dati personali per profitti pubblicitari.',
          en: 'Firefox is an open-source browser developed by the Mozilla Foundation, a nonprofit organization dedicated to an open and private internet. Firefox blocks third-party trackers by default, includes anti-fingerprinting protections, and doesn\'t collect personal data for advertising profits.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Firefox offre anche estensioni potenti come uBlock Origin e Privacy Badger che possono migliorare ulteriormente la tua privacy. È un\'ottima scelta per la maggior parte delle persone che vogliono un equilibrio tra privacy, funzionalità e compatibilità.',
          en: 'Firefox also offers powerful extensions like uBlock Origin and Privacy Badger that can further improve your privacy. It\'s an excellent choice for most people who want a balance between privacy, functionality, and compatibility.'
        }
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'Firefox Focus è una versione mobile di Firefox progettata specificamente per la privacy, con protezioni anti-tracciamento ancora più aggressive.',
          en: 'Firefox Focus is a mobile version of Firefox specifically designed for privacy, with even more aggressive anti-tracking protections.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Brave: privacy e velocità',
          en: 'Brave: privacy and speed'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Brave è un browser basato su Chromium (lo stesso motore di Chrome) ma con protezioni per la privacy integrate. Blocca automaticamente annunci e tracker, impedisce il fingerprinting e include anche una VPN integrata opzionale. Brave è veloce perché blocca i contenuti pubblicitari prima che vengano caricati.',
          en: 'Brave is a browser based on Chromium (the same engine as Chrome) but with built-in privacy protections. It automatically blocks ads and trackers, prevents fingerprinting, and also includes an optional built-in VPN. Brave is fast because it blocks advertising content before it\'s loaded.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Tor Browser: massima privacy',
          en: 'Tor Browser: maximum privacy'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Tor Browser è basato su Firefox ma instrada tutto il traffico attraverso la rete Tor, che nasconde la tua identità e posizione. Tor è particolarmente utile se hai bisogno di navigare in modo anonimo o accedere a contenuti bloccati nella tua regione. Tuttavia, può essere più lento di altri browser a causa del routing attraverso più nodi.',
          en: 'Tor Browser is based on Firefox but routes all traffic through the Tor network, which hides your identity and location. Tor is particularly useful if you need to browse anonymously or access content blocked in your region. However, it can be slower than other browsers due to routing through multiple nodes.'
        }
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Tor Browser è potente ma può attirare attenzione se usato in contesti dove l\'anonimato è sospetto. Usalo quando necessario, non per tutte le attività quotidiane.',
          en: 'Tor Browser is powerful but can attract attention if used in contexts where anonymity is suspicious. Use it when necessary, not for all daily activities.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Motori di ricerca privati',
          en: 'Private search engines'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Google traccia ogni ricerca che fai, costruendo un profilo dettagliato dei tuoi interessi, preoccupazioni e comportamenti. I motori di ricerca alternativi come DuckDuckGo e Startpage offrono risultati di ricerca senza tracciamento.',
          en: 'Google tracks every search you make, building a detailed profile of your interests, concerns, and behaviors. Alternative search engines like DuckDuckGo and Startpage offer search results without tracking.'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'DuckDuckGo: non traccia le ricerche, non raccoglie dati personali e offre risultati da molteplici fonti',
            en: 'DuckDuckGo: doesn\'t track searches, doesn\'t collect personal data, and offers results from multiple sources'
          },
          {
            it: 'Startpage: offre risultati di Google ma senza tracciamento, agendo come proxy tra te e Google',
            en: 'Startpage: offers Google results but without tracking, acting as a proxy between you and Google'
          },
          {
            it: 'Searx: un meta-motore di ricerca open source che aggrega risultati da molteplici fonti senza tracciamento',
            en: 'Searx: an open-source meta search engine that aggregates results from multiple sources without tracking'
          }
        ]
      },
      {
        type: 'text',
        content: {
          it: 'Passare a un motore di ricerca privato è uno dei cambiamenti più semplici e immediati che puoi fare per migliorare la tua privacy. La maggior parte dei motori di ricerca privati offre risultati comparabili a Google per ricerche generali, anche se potresti notare differenze per ricerche molto specifiche o locali.',
          en: 'Switching to a private search engine is one of the simplest and most immediate changes you can make to improve your privacy. Most private search engines offer results comparable to Google for general searches, though you might notice differences for very specific or local searches.'
        }
      }
    ]
  },
  {
    id: 'privacy-4',
    slug: 'email-sicura',
    title: {
      it: 'Email sicura',
      en: 'Secure email'
    },
    description: {
      it: 'ProtonMail, Tutanota, basi della crittografia email',
      en: 'ProtonMail, Tutanota, email encryption basics'
    },
    duration: '20 min',
    order: 4,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Perché l\'email tradizionale non è privata',
          en: 'Why traditional email isn\'t private'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Le email tradizionali come Gmail, Outlook e Yahoo Mail vengono archiviate in chiaro sui server delle aziende. Questo significa che i provider possono leggere tutto il contenuto delle tue email, analizzarle per pubblicità mirata e, in alcuni casi, consegnarle alle autorità quando richiesto. Anche se le email vengono trasmesse in modo crittografato tra il tuo dispositivo e il server, vengono decifrate e archiviate in chiaro sul server.',
          en: 'Traditional emails like Gmail, Outlook, and Yahoo Mail are stored in plain text on company servers. This means providers can read all your email content, analyze it for targeted advertising, and, in some cases, hand it over to authorities when requested. Even though emails are transmitted encrypted between your device and the server, they\'re decrypted and stored in plain text on the server.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Inoltre, i provider di email tradizionali raccolgono enormi quantità di metadati: chi invii email, quando le invii, da dove le invii, e con chi comunichi. Questi metadati possono rivelare molto sulla tua vita, anche senza leggere il contenuto delle email.',
          en: 'Additionally, traditional email providers collect vast amounts of metadata: who you email, when you send emails, where you send them from, and who you communicate with. This metadata can reveal a lot about your life, even without reading email content.'
        }
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Gmail analizza il contenuto delle tue email per mostrarti pubblicità mirata. Anche se Google ha smesso di farlo per le email personali, continua a farlo per le email aziendali.',
          en: 'Gmail analyzes your email content to show you targeted ads. Even though Google stopped doing this for personal emails, it continues to do so for business emails.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Crittografia end-to-end',
          en: 'End-to-end encryption'
        }
      },
      {
        type: 'text',
        content: {
          it: 'La crittografia end-to-end significa che solo tu e il destinatario possono leggere il contenuto delle email. Nemmeno il provider di email può decifrarle. Questo è diverso dalla crittografia in transito, che protegge solo i dati mentre viaggiano tra il tuo dispositivo e il server, ma non quando sono archiviati.',
          en: 'End-to-end encryption means that only you and the recipient can read the email content. Not even the email provider can decrypt them. This is different from encryption in transit, which only protects data while traveling between your device and the server, but not when stored.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Perché la crittografia end-to-end funzioni, entrambe le parti devono usare un servizio che la supporta o configurare manualmente la crittografia con strumenti come PGP. Tuttavia, anche se il destinatario non usa la crittografia end-to-end, usare un servizio email privato protegge comunque i tuoi dati dal provider.',
          en: 'For end-to-end encryption to work, both parties must use a service that supports it or manually configure encryption with tools like PGP. However, even if the recipient doesn\'t use end-to-end encryption, using a private email service still protects your data from the provider.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'ProtonMail: email crittografata',
          en: 'ProtonMail: encrypted email'
        }
      },
      {
        type: 'text',
        content: {
          it: 'ProtonMail è un servizio email svizzero che offre crittografia end-to-end per default. Le email tra utenti ProtonMail sono automaticamente crittografate, e puoi anche inviare email crittografate a utenti non-ProtonMail usando una password condivisa. ProtonMail non può leggere le tue email perché non ha accesso alle tue chiavi di crittografia.',
          en: 'ProtonMail is a Swiss email service that offers end-to-end encryption by default. Emails between ProtonMail users are automatically encrypted, and you can also send encrypted emails to non-ProtonMail users using a shared password. ProtonMail cannot read your emails because it doesn\'t have access to your encryption keys.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'ProtonMail offre un piano gratuito con spazio limitato e piani a pagamento con più funzionalità. Ha anche altri servizi come ProtonVPN e ProtonDrive che possono essere inclusi nei piani a pagamento. La sede in Svizzera offre protezioni legali aggiuntive per la privacy.',
          en: 'ProtonMail offers a free plan with limited space and paid plans with more features. It also has other services like ProtonVPN and ProtonDrive that can be included in paid plans. The Swiss headquarters offers additional legal privacy protections.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Tutanota: privacy completa',
          en: 'Tutanota: complete privacy'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Tutanota è un servizio email tedesco che crittografa non solo il contenuto delle email, ma anche i metadati come oggetto e destinatari. Tutto è crittografato end-to-end, incluso il calendario e i contatti. Tutanota ha un piano gratuito generoso e piani a pagamento accessibili.',
          en: 'Tutanota is a German email service that encrypts not only email content, but also metadata like subject and recipients. Everything is end-to-end encrypted, including calendar and contacts. Tutanota has a generous free plan and affordable paid plans.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Una caratteristica unica di Tutanota è che anche gli indirizzi email sono crittografati, rendendo molto difficile per chiunque (incluso Tutanota) vedere con chi stai comunicando. Il servizio è open source e sottoposto a audit di sicurezza regolari.',
          en: 'A unique feature of Tutanota is that even email addresses are encrypted, making it very difficult for anyone (including Tutanota) to see who you\'re communicating with. The service is open source and subject to regular security audits.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Altri servizi email privati',
          en: 'Other private email services'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Mailbox.org: servizio email tedesco con focus su privacy e sostenibilità',
            en: 'Mailbox.org: German email service with focus on privacy and sustainability'
          },
          {
            it: 'Posteo: servizio email ecologico e privato con sede in Germania',
            en: 'Posteo: ecological and private email service based in Germany'
          },
          {
            it: 'FastMail: servizio australiano con buone protezioni per la privacy (anche se non crittografia end-to-end)',
            en: 'FastMail: Australian service with good privacy protections (though not end-to-end encryption)'
          }
        ]
      },
      {
        type: 'text',
        content: {
          it: 'Quando scegli un servizio email privato, considera fattori come la giurisdizione (leggi del paese dove si trova), se è open source, se ha subito audit di sicurezza, e quali funzionalità offre. Ricorda che anche il miglior servizio email privato non può proteggerti se il destinatario usa Gmail o un servizio simile.',
          en: 'When choosing a private email service, consider factors like jurisdiction (laws of the country where it\'s located), whether it\'s open source, if it has undergone security audits, and what features it offers. Remember that even the best private email service can\'t protect you if the recipient uses Gmail or a similar service.'
        }
      }
    ]
  },
  {
    id: 'privacy-5',
    slug: 'messaggistica-privata',
    title: {
      it: 'Messaggistica privata',
      en: 'Private messaging'
    },
    description: {
      it: 'Signal, crittografia end-to-end, perché WhatsApp non basta',
      en: 'Signal, end-to-end encryption, why WhatsApp isn\'t enough'
    },
    duration: '18 min',
    order: 5,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Perché WhatsApp non è abbastanza',
          en: 'Why WhatsApp isn\'t enough'
        }
      },
      {
        type: 'text',
        content: {
          it: 'WhatsApp usa la crittografia end-to-end, il che significa che i messaggi sono crittografati durante la trasmissione. Tuttavia, WhatsApp è di proprietà di Facebook (Meta), che raccoglie enormi quantità di metadati: chi comunichi, quando comunichi, quanto spesso comunichi, e persino la tua posizione se la condividi.',
          en: 'WhatsApp uses end-to-end encryption, meaning messages are encrypted during transmission. However, WhatsApp is owned by Facebook (Meta), which collects vast amounts of metadata: who you communicate with, when you communicate, how often you communicate, and even your location if you share it.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Facebook può vedere i tuoi contatti WhatsApp, i gruppi a cui appartieni, quando sei online, e quando hai letto i messaggi. Questi metadati possono rivelare molto sulla tua vita sociale e sulle tue relazioni, anche senza leggere il contenuto dei messaggi. Inoltre, i backup di WhatsApp su iCloud o Google Drive non sono crittografati end-to-end.',
          en: 'Facebook can see your WhatsApp contacts, groups you belong to, when you\'re online, and when you\'ve read messages. This metadata can reveal a lot about your social life and relationships, even without reading message content. Additionally, WhatsApp backups on iCloud or Google Drive are not end-to-end encrypted.'
        }
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Anche se WhatsApp dice di non leggere i messaggi, i metadati che raccoglie sono sufficienti per costruire un profilo dettagliato di chi sei e con chi interagisci.',
          en: 'Even though WhatsApp says it doesn\'t read messages, the metadata it collects is enough to build a detailed profile of who you are and who you interact with.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Signal: il gold standard della privacy',
          en: 'Signal: the gold standard of privacy'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Signal è un\'app di messaggistica open source sviluppata dalla Signal Foundation, un\'organizzazione senza scopo di lucro. Signal raccoglie il minimo possibile: solo il tuo numero di telefono (necessario per il funzionamento) e la data di registrazione. Non raccoglie metadati, non ha accesso ai tuoi contatti, e non può vedere chi comunichi o quando.',
          en: 'Signal is an open-source messaging app developed by the Signal Foundation, a nonprofit organization. Signal collects the minimum possible: only your phone number (necessary for operation) and registration date. It doesn\'t collect metadata, doesn\'t have access to your contacts, and can\'t see who you communicate with or when.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Signal usa il protocollo Signal Protocol, considerato il più sicuro disponibile. Offre messaggi di testo, chiamate vocali e video, messaggi di gruppo, e funzionalità avanzate come messaggi che scompaiono automaticamente. Signal è gratuito, senza pubblicità, e finanziato da donazioni.',
          en: 'Signal uses the Signal Protocol, considered the most secure available. It offers text messages, voice and video calls, group messages, and advanced features like messages that disappear automatically. Signal is free, ad-free, and funded by donations.'
        }
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'Signal è così sicuro che è raccomandato da attivisti per i diritti umani, giornalisti e persino da Edward Snowden. Se è abbastanza sicuro per loro, è abbastanza sicuro per te.',
          en: 'Signal is so secure that it\'s recommended by human rights activists, journalists, and even Edward Snowden. If it\'s secure enough for them, it\'s secure enough for you.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Crittografia end-to-end spiegata',
          en: 'End-to-end encryption explained'
        }
      },
      {
        type: 'text',
        content: {
          it: 'La crittografia end-to-end significa che i messaggi vengono crittografati sul tuo dispositivo prima di essere inviati e possono essere decifrati solo dal dispositivo del destinatario. Nemmeno il provider del servizio può leggere i messaggi perché non ha accesso alle chiavi di crittografia.',
          en: 'End-to-end encryption means messages are encrypted on your device before being sent and can only be decrypted by the recipient\'s device. Not even the service provider can read the messages because it doesn\'t have access to the encryption keys.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Questo è diverso dalla crittografia in transito, che protegge i messaggi solo mentre viaggiano tra il tuo dispositivo e il server, ma il server può decifrarli e leggerli. Con la crittografia end-to-end, il server vede solo dati crittografati incomprensibili.',
          en: 'This is different from encryption in transit, which only protects messages while traveling between your device and the server, but the server can decrypt and read them. With end-to-end encryption, the server only sees incomprehensible encrypted data.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Altre app di messaggistica private',
          en: 'Other private messaging apps'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Element (Matrix): protocollo decentralizzato e open source, buono per team e comunità',
            en: 'Element (Matrix): decentralized and open-source protocol, good for teams and communities'
          },
          {
            it: 'Session: completamente anonimo, non richiede numero di telefono o email',
            en: 'Session: completely anonymous, doesn\'t require phone number or email'
          },
          {
            it: 'Threema: servizio svizzero a pagamento con focus sulla privacy e sicurezza',
            en: 'Threema: paid Swiss service with focus on privacy and security'
          },
          {
            it: 'Telegram: ha crittografia end-to-end solo per chat segrete, non per chat normali',
            en: 'Telegram: has end-to-end encryption only for secret chats, not for normal chats'
          }
        ]
      },
      {
        type: 'text',
        content: {
          it: 'Quando scegli un\'app di messaggistica, considera chi la sviluppa, cosa raccoglie, se è open source, e se i tuoi contatti la usano già. La migliore app di messaggistica privata è inutile se nessuno dei tuoi contatti la usa. Inizia con Signal e incoraggia i tuoi contatti più importanti a usarlo.',
          en: 'When choosing a messaging app, consider who develops it, what it collects, if it\'s open source, and if your contacts already use it. The best private messaging app is useless if none of your contacts use it. Start with Signal and encourage your most important contacts to use it.'
        }
      }
    ]
  },
  {
    id: 'privacy-6',
    slug: 'password-e-autenticazione',
    title: {
      it: 'Password e autenticazione',
      en: 'Passwords and authentication'
    },
    description: {
      it: 'Password manager, 2FA, passkey',
      en: 'Password managers, 2FA, passkeys'
    },
    duration: '22 min',
    order: 6,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Il problema delle password',
          en: 'The password problem'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Le password sono il metodo di autenticazione più comune, ma hanno molti problemi. Le persone tendono a riutilizzare password semplici su più account, rendendole vulnerabili. Se una password viene compromessa in una violazione di dati, tutti gli account che usano quella password sono a rischio.',
          en: 'Passwords are the most common authentication method, but they have many problems. People tend to reuse simple passwords across multiple accounts, making them vulnerable. If a password is compromised in a data breach, all accounts using that password are at risk.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Le violazioni di dati sono comuni e milioni di password vengono rubate ogni anno. Anche se un servizio crittografa le password, gli hacker possono usare attacchi di forza bruta o dizionario per decifrarle se sono deboli. La soluzione è usare password uniche, complesse e lunghe per ogni account.',
          en: 'Data breaches are common, and millions of passwords are stolen every year. Even if a service encrypts passwords, hackers can use brute force or dictionary attacks to crack them if they\'re weak. The solution is to use unique, complex, and long passwords for each account.'
        }
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Usare la stessa password su più account è come usare la stessa chiave per casa, auto e ufficio: se qualcuno la trova, ha accesso a tutto.',
          en: 'Using the same password across multiple accounts is like using the same key for home, car, and office: if someone finds it, they have access to everything.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Password manager: la soluzione',
          en: 'Password managers: the solution'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Un password manager è un\'applicazione che genera, archivia e inserisce automaticamente password complesse e uniche per ogni account. Devi ricordare solo una password principale (master password) che sblocca il password manager. Tutte le altre password sono crittografate e archiviate in modo sicuro.',
          en: 'A password manager is an application that generates, stores, and automatically fills complex and unique passwords for each account. You only need to remember one master password that unlocks the password manager. All other passwords are encrypted and stored securely.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'I password manager moderni sincronizzano le tue password tra tutti i tuoi dispositivi, si integrano con i browser per inserire automaticamente le password, e possono generare password complesse con un click. Alcuni possono anche avvisarti se una delle tue password è stata compromessa in una violazione di dati.',
          en: 'Modern password managers sync your passwords across all your devices, integrate with browsers to automatically fill passwords, and can generate complex passwords with one click. Some can also alert you if one of your passwords has been compromised in a data breach.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Password manager consigliati',
          en: 'Recommended password managers'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Bitwarden: open source, gratuito con funzionalità premium opzionali, sincronizzazione tra dispositivi',
            en: 'Bitwarden: open source, free with optional premium features, sync across devices'
          },
          {
            it: '1Password: a pagamento ma con ottima interfaccia e funzionalità avanzate come Travel Mode',
            en: '1Password: paid but with excellent interface and advanced features like Travel Mode'
          },
          {
            it: 'KeePass: completamente gratuito e open source, ma richiede configurazione manuale',
            en: 'KeePass: completely free and open source, but requires manual configuration'
          },
          {
            it: 'Proton Pass: del team di ProtonMail, integrato con altri servizi Proton',
            en: 'Proton Pass: from the ProtonMail team, integrated with other Proton services'
          }
        ]
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'Bitwarden è una scelta eccellente per iniziare: è gratuito, open source, facile da usare e ha tutte le funzionalità essenziali.',
          en: 'Bitwarden is an excellent choice to start: it\'s free, open source, easy to use, and has all essential features.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Autenticazione a due fattori (2FA)',
          en: 'Two-factor authentication (2FA)'
        }
      },
      {
        type: 'text',
        content: {
          it: 'L\'autenticazione a due fattori aggiunge un secondo livello di sicurezza oltre alla password. Anche se qualcuno ottiene la tua password, non può accedere al tuo account senza il secondo fattore, che di solito è un codice temporaneo generato da un\'app sul tuo telefono o inviato via SMS.',
          en: 'Two-factor authentication adds a second layer of security beyond the password. Even if someone gets your password, they can\'t access your account without the second factor, which is usually a temporary code generated by an app on your phone or sent via SMS.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Le app di autenticazione come Google Authenticator, Authy o l\'app integrata nel password manager sono più sicure degli SMS perché i codici SMS possono essere intercettati attraverso attacchi di SIM swapping. Dovresti abilitare il 2FA su tutti gli account importanti, specialmente email, banche e social media.',
          en: 'Authentication apps like Google Authenticator, Authy, or the app integrated into your password manager are more secure than SMS because SMS codes can be intercepted through SIM swapping attacks. You should enable 2FA on all important accounts, especially email, banks, and social media.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Passkey: il futuro dell\'autenticazione',
          en: 'Passkeys: the future of authentication'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Le passkey sono un nuovo standard di autenticazione che sostituisce le password con chiavi crittografiche. Usano la biometria (impronta digitale o riconoscimento facciale) o un PIN per sbloccare una chiave crittografica memorizzata sul tuo dispositivo. Le passkey sono più sicure delle password perché non possono essere rubate o indovinate.',
          en: 'Passkeys are a new authentication standard that replaces passwords with cryptographic keys. They use biometrics (fingerprint or facial recognition) or a PIN to unlock a cryptographic key stored on your device. Passkeys are more secure than passwords because they can\'t be stolen or guessed.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Le passkey stanno diventando sempre più comuni e sono supportate da molti servizi importanti come Google, Microsoft e Apple. Quando disponibili, sono generalmente più sicure e più facili da usare delle password tradizionali. Tuttavia, non tutti i servizi le supportano ancora.',
          en: 'Passkeys are becoming increasingly common and are supported by many important services like Google, Microsoft, and Apple. When available, they\'re generally more secure and easier to use than traditional passwords. However, not all services support them yet.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'La migliore strategia è combinare un password manager con 2FA e usare passkey quando disponibili. Questo ti dà sicurezza multipla: anche se un livello viene compromesso, gli altri ti proteggono ancora.',
          en: 'The best strategy is to combine a password manager with 2FA and use passkeys when available. This gives you multiple layers of security: even if one layer is compromised, the others still protect you.'
        }
      }
    ]
  },
  {
    id: 'privacy-7',
    slug: 'vpn-cosa-sono-quando-usarle',
    title: {
      it: 'VPN: cosa sono e quando usarle',
      en: 'VPN: what they are and when to use them'
    },
    description: {
      it: 'Come funzionano le VPN, scegliere un provider, limitazioni',
      en: 'How VPNs work, choosing a provider, limitations'
    },
    duration: '20 min',
    order: 7,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Cosa fa una VPN',
          en: 'What a VPN does'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Una VPN (Virtual Private Network) crea un tunnel crittografato tra il tuo dispositivo e un server VPN. Tutto il tuo traffico internet passa attraverso questo tunnel, nascondendo il tuo indirizzo IP reale e la tua posizione al sito web o servizio che stai visitando. Invece, vedono l\'indirizzo IP del server VPN.',
          en: 'A VPN (Virtual Private Network) creates an encrypted tunnel between your device and a VPN server. All your internet traffic passes through this tunnel, hiding your real IP address and location from the website or service you\'re visiting. Instead, they see the VPN server\'s IP address.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Le VPN sono utili per proteggere la tua privacy quando usi reti Wi-Fi pubbliche, accedi a contenuti bloccati geograficamente, o vuoi nascondere la tua attività online al tuo provider internet. Tuttavia, è importante capire cosa una VPN può e non può fare.',
          en: 'VPNs are useful for protecting your privacy when using public Wi-Fi networks, accessing geo-blocked content, or wanting to hide your online activity from your internet provider. However, it\'s important to understand what a VPN can and cannot do.'
        }
      },
      {
        type: 'callout',
        variant: 'info',
        content: {
          it: 'Una VPN protegge il tuo traffico dal tuo provider internet e dai siti che visiti, ma il provider VPN stesso può vedere tutto il tuo traffico. È cruciale scegliere un provider VPN affidabile.',
          en: 'A VPN protects your traffic from your internet provider and the sites you visit, but the VPN provider itself can see all your traffic. It\'s crucial to choose a trustworthy VPN provider.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Cosa una VPN NON può fare',
          en: 'What a VPN CANNOT do'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Non ti rende completamente anonimo: il provider VPN sa chi sei e cosa fai online',
            en: 'Doesn\'t make you completely anonymous: the VPN provider knows who you are and what you do online'
          },
          {
            it: 'Non protegge dai cookie e dal fingerprinting: i siti possono ancora tracciarti con questi metodi',
            en: 'Doesn\'t protect from cookies and fingerprinting: sites can still track you with these methods'
          },
          {
            it: 'Non crittografa tutto: solo il traffico tra te e il server VPN è crittografato',
            en: 'Doesn\'t encrypt everything: only traffic between you and the VPN server is encrypted'
          },
          {
            it: 'Non protegge se usi servizi che già conoscono la tua identità (come Google quando sei loggato)',
            en: 'Doesn\'t protect if you use services that already know your identity (like Google when logged in)'
          }
        ]
      },
      {
        type: 'text',
        content: {
          it: 'Le VPN sono uno strumento utile ma non una soluzione magica per la privacy. Dovrebbero essere usate insieme ad altre misure di protezione come browser privati, estensioni anti-tracciamento e servizi che rispettano la privacy.',
          en: 'VPNs are a useful tool but not a magic solution for privacy. They should be used together with other protective measures like private browsers, anti-tracking extensions, and privacy-respecting services.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Quando usare una VPN',
          en: 'When to use a VPN'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Su reti Wi-Fi pubbliche: proteggi i tuoi dati da potenziali intercettazioni',
            en: 'On public Wi-Fi networks: protect your data from potential interception'
          },
          {
            it: 'Quando vuoi nascondere la tua attività dal provider internet',
            en: 'When you want to hide your activity from your internet provider'
          },
          {
            it: 'Per accedere a contenuti bloccati geograficamente (con cautela legale)',
            en: 'To access geo-blocked content (with legal caution)'
          },
          {
            it: 'Quando viaggi in paesi con restrizioni internet',
            en: 'When traveling in countries with internet restrictions'
          }
        ]
      },
      {
        type: 'heading',
        content: {
          it: 'Scegliere un provider VPN',
          en: 'Choosing a VPN provider'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Non tutte le VPN sono uguali. Molte VPN "gratuite" guadagnano vendendo i tuoi dati o mostrando pubblicità. È importante scegliere un provider VPN che ha una politica "no-log" verificata, che significa che non registra la tua attività online.',
          en: 'Not all VPNs are equal. Many "free" VPNs make money by selling your data or showing ads. It\'s important to choose a VPN provider that has a verified "no-log" policy, meaning it doesn\'t record your online activity.'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'ProtonVPN: sviluppato dal team di ProtonMail, ha un piano gratuito limitato e piani a pagamento',
            en: 'ProtonVPN: developed by the ProtonMail team, has a limited free plan and paid plans'
          },
          {
            it: 'Mullvad: molto rispettoso della privacy, accetta pagamenti anonimi, sede in Svezia',
            en: 'Mullvad: very privacy-respecting, accepts anonymous payments, based in Sweden'
          },
          {
            it: 'IVPN: trasparente sulla privacy, sede a Gibilterra, buone prestazioni',
            en: 'IVPN: transparent about privacy, based in Gibraltar, good performance'
          },
          {
            it: 'NordVPN: popolare ma controlla attentamente la loro politica di privacy',
            en: 'NordVPN: popular but carefully check their privacy policy'
          }
        ]
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Evita VPN gratuite che non sono open source o che hanno modelli di business sospetti. Se un servizio è gratuito, probabilmente tu sei il prodotto.',
          en: 'Avoid free VPNs that aren\'t open source or have suspicious business models. If a service is free, you\'re probably the product.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Quando scegli una VPN, considera la giurisdizione (dove si trova l\'azienda), se è open source, se ha subito audit di sicurezza indipendenti, e se ha una politica no-log verificata. Leggi sempre i termini di servizio e la politica sulla privacy prima di iscriverti.',
          en: 'When choosing a VPN, consider jurisdiction (where the company is located), if it\'s open source, if it has undergone independent security audits, and if it has a verified no-log policy. Always read the terms of service and privacy policy before signing up.'
        }
      }
    ]
  },
  {
    id: 'privacy-8',
    slug: 'navigazione-anonima',
    title: {
      it: 'Navigazione anonima',
      en: 'Anonymous browsing'
    },
    description: {
      it: 'Tor, miti sulla navigazione privata, DNS-over-HTTPS',
      en: 'Tor, private browsing myths, DNS-over-HTTPS'
    },
    duration: '18 min',
    order: 8,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Il mito della "navigazione privata"',
          en: 'The "private browsing" myth'
        }
      },
      {
        type: 'text',
        content: {
          it: 'La modalità "navigazione privata" o "incognito" del tuo browser NON ti rende anonimo. Tutto quello che fa è impedire al browser di salvare la cronologia, i cookie e altri dati locali dopo aver chiuso la finestra. I siti che visiti, il tuo provider internet e il tuo datore di lavoro (se usi una rete aziendale) possono ancora vedere cosa fai online.',
          en: 'Your browser\'s "private browsing" or "incognito" mode does NOT make you anonymous. All it does is prevent the browser from saving history, cookies, and other local data after closing the window. The sites you visit, your internet provider, and your employer (if using a company network) can still see what you do online.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'La navigazione privata è utile per evitare che altri utenti dello stesso dispositivo vedano la tua cronologia, ma non protegge la tua privacy da siti web, provider internet o sorveglianza. Per una vera privacy online, hai bisogno di strumenti più avanzati.',
          en: 'Private browsing is useful for preventing other users of the same device from seeing your history, but it doesn\'t protect your privacy from websites, internet providers, or surveillance. For true online privacy, you need more advanced tools.'
        }
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Google ha pagato milioni di dollari in multe per pubblicità ingannevoli che suggerivano che la modalità incognito rendesse gli utenti invisibili online.',
          en: 'Google paid millions of dollars in fines for misleading ads suggesting that incognito mode made users invisible online.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Tor Browser: vera navigazione anonima',
          en: 'Tor Browser: true anonymous browsing'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Tor Browser è l\'unico modo per navigare veramente in modo anonimo. Instrada il tuo traffico attraverso una rete di server volontari chiamati "relay", crittografando i dati più volte. Ogni relay conosce solo il relay precedente e quello successivo, non la destinazione finale o l\'origine. Questo rende molto difficile tracciare il tuo traffico fino a te.',
          en: 'Tor Browser is the only way to truly browse anonymously. It routes your traffic through a network of volunteer servers called "relays", encrypting data multiple times. Each relay only knows the previous and next relay, not the final destination or origin. This makes it very difficult to trace your traffic back to you.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Tor è particolarmente utile per giornalisti, attivisti e persone che vivono in paesi con censura o sorveglianza. Tuttavia, Tor può essere più lento di un browser normale perché il traffico passa attraverso più nodi, e alcuni siti possono bloccare il traffico Tor.',
          en: 'Tor is particularly useful for journalists, activists, and people living in countries with censorship or surveillance. However, Tor can be slower than a normal browser because traffic passes through multiple nodes, and some sites may block Tor traffic.'
        }
      },
      {
        type: 'callout',
        variant: 'info',
        content: {
          it: 'Tor è legale nella maggior parte dei paesi e il suo uso è protetto come libertà di espressione. Tuttavia, alcuni paesi lo hanno bandito, quindi verifica le leggi locali.',
          en: 'Tor is legal in most countries and its use is protected as freedom of expression. However, some countries have banned it, so check local laws.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'DNS-over-HTTPS (DoH)',
          en: 'DNS-over-HTTPS (DoH)'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il DNS (Domain Name System) è il sistema che converte nomi di dominio come "google.com" in indirizzi IP. Tradizionalmente, le query DNS vengono inviate in chiaro, permettendo al tuo provider internet di vedere quali siti visiti. DNS-over-HTTPS crittografa queste query, impedendo al tuo provider di vedere quali domini stai visitando.',
          en: 'DNS (Domain Name System) is the system that converts domain names like "google.com" into IP addresses. Traditionally, DNS queries are sent in plain text, allowing your internet provider to see which sites you visit. DNS-over-HTTPS encrypts these queries, preventing your provider from seeing which domains you\'re visiting.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Molti browser moderni supportano DoH per default o permettono di configurarlo facilmente. Servizi DNS privati come Cloudflare (1.1.1.1) o Quad9 (9.9.9.9) offrono DoH e possono migliorare sia la privacy che le prestazioni rispetto ai DNS del tuo provider.',
          en: 'Many modern browsers support DoH by default or allow easy configuration. Private DNS services like Cloudflare (1.1.1.1) or Quad9 (9.9.9.9) offer DoH and can improve both privacy and performance compared to your provider\'s DNS.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Quando usare Tor vs VPN vs DoH',
          en: 'When to use Tor vs VPN vs DoH'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'DoH: per uso quotidiano, nasconde solo le query DNS dal provider internet',
            en: 'DoH: for daily use, only hides DNS queries from internet provider'
          },
          {
            it: 'VPN: per proteggere il traffico su reti pubbliche o nascondere la posizione',
            en: 'VPN: to protect traffic on public networks or hide location'
          },
          {
            it: 'Tor: quando hai bisogno di massimo anonimato, ad esempio per attività sensibili',
            en: 'Tor: when you need maximum anonymity, e.g., for sensitive activities'
          }
        ]
      },
      {
        type: 'text',
        content: {
          it: 'La maggior parte delle persone può iniziare con DoH per uso quotidiano e usare una VPN quando necessario. Tor dovrebbe essere riservato a situazioni dove l\'anonimato è critico, come quando si accede a informazioni sensibili o si comunica in contesti pericolosi.',
          en: 'Most people can start with DoH for daily use and use a VPN when needed. Tor should be reserved for situations where anonymity is critical, such as when accessing sensitive information or communicating in dangerous contexts.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Ricorda: nessuno strumento ti rende completamente anonimo se usi servizi che già conoscono la tua identità (come essere loggato su Google o Facebook). L\'anonimato richiede disciplina: non loggarti su servizi personali mentre usi Tor, usa Tor Browser invece di configurare Tor manualmente, e segui le best practice per la sicurezza.',
          en: 'Remember: no tool makes you completely anonymous if you use services that already know your identity (like being logged into Google or Facebook). Anonymity requires discipline: don\'t log into personal services while using Tor, use Tor Browser instead of configuring Tor manually, and follow security best practices.'
        }
      }
    ]
  },
  {
    id: 'privacy-9',
    slug: 'proteggere-smartphone',
    title: {
      it: 'Proteggere il tuo smartphone',
      en: 'Protecting your smartphone'
    },
    description: {
      it: 'Permessi delle app, tracciamento della posizione, impostazioni privacy del sistema operativo',
      en: 'App permissions, location tracking, OS privacy settings'
    },
    duration: '25 min',
    order: 9,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Il tuo smartphone sa tutto',
          en: 'Your smartphone knows everything'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il tuo smartphone è probabilmente il dispositivo più invasivo per la privacy che possiedi. Ha accesso alla tua posizione in tempo reale, alle tue chiamate, ai tuoi messaggi, alle tue foto, al tuo microfono e alla tua fotocamera. Le app che installi possono richiedere accesso a molte di queste funzionalità, spesso senza una buona ragione.',
          en: 'Your smartphone is probably the most privacy-invasive device you own. It has access to your real-time location, calls, messages, photos, microphone, and camera. Apps you install can request access to many of these features, often without a good reason.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Molte app raccolgono dati anche quando non le stai usando attivamente. Possono tracciare la tua posizione in background, accedere alla fotocamera o al microfono senza che tu lo sappia, e condividere dati con terze parti per pubblicità. È essenziale controllare e limitare i permessi delle app.',
          en: 'Many apps collect data even when you\'re not actively using them. They can track your location in the background, access the camera or microphone without you knowing, and share data with third parties for advertising. It\'s essential to check and limit app permissions.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Gestire i permessi delle app',
          en: 'Managing app permissions'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Sia iOS che Android permettono di controllare quali permessi ogni app può usare. Dovresti rivedere regolarmente questi permessi e revocare quelli non necessari. Chiediti sempre: questa app ha davvero bisogno di questo permesso per funzionare?',
          en: 'Both iOS and Android allow you to control which permissions each app can use. You should regularly review these permissions and revoke unnecessary ones. Always ask yourself: does this app really need this permission to function?'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Posizione: concedi solo quando necessario e usa "solo quando l\'app è aperta" invece di "sempre"',
            en: 'Location: grant only when necessary and use "only when app is open" instead of "always"'
          },
          {
            it: 'Fotocamera e microfono: concedi solo alle app che ne hanno davvero bisogno (foto, videochiamate)',
            en: 'Camera and microphone: grant only to apps that really need them (photos, video calls)'
          },
          {
            it: 'Contatti: molte app non hanno bisogno di accedere ai tuoi contatti',
            en: 'Contacts: many apps don\'t need access to your contacts'
          },
          {
            it: 'Notifiche: limita le notifiche push che possono essere usate per tracciamento',
            en: 'Notifications: limit push notifications that can be used for tracking'
          }
        ]
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'Su Android, puoi vedere quali app hanno accesso a quali permessi nelle impostazioni. Su iOS, vai su Impostazioni > Privacy e sicurezza per vedere tutti i permessi.',
          en: 'On Android, you can see which apps have access to which permissions in settings. On iOS, go to Settings > Privacy & Security to see all permissions.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Tracciamento della posizione',
          en: 'Location tracking'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il tracciamento della posizione è uno dei metodi più invasivi di raccolta dati. La tua posizione può rivelare dove vivi, dove lavori, dove vai in vacanza, quali negozi frequenti e molto altro. Molte app raccolgono dati di posizione anche quando non le stai usando.',
          en: 'Location tracking is one of the most invasive data collection methods. Your location can reveal where you live, where you work, where you go on vacation, which stores you frequent, and much more. Many apps collect location data even when you\'re not using them.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Dovresti disabilitare i servizi di localizzazione per la maggior parte delle app e abilitarli solo quando necessario. Su iOS, puoi usare "Preciso" o "Approssimativo" per limitare la precisione. Su Android, puoi vedere una cronologia di tutte le app che hanno acceduto alla tua posizione.',
          en: 'You should disable location services for most apps and enable them only when necessary. On iOS, you can use "Precise" or "Approximate" to limit accuracy. On Android, you can see a history of all apps that have accessed your location.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Impostazioni privacy iOS',
          en: 'iOS privacy settings'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Tracking delle app: disabilita "Consenti alle app di richiedere di tracciarti"',
            en: 'App tracking: disable "Allow apps to request to track you"'
          },
          {
            it: 'Analisi e miglioramenti: disabilita la condivisione di dati analitici con Apple',
            en: 'Analytics and improvements: disable sharing analytics data with Apple'
          },
          {
            it: 'Pubblicità: abilita "Limita pubblicità" per ridurre la pubblicità mirata',
            en: 'Advertising: enable "Limit ad tracking" to reduce targeted advertising'
          },
          {
            it: 'Localizzazione: rivedi e limita quali app possono accedere alla posizione',
            en: 'Location: review and limit which apps can access location'
          },
          {
            it: 'Safari: abilita "Previeni tracciamento cross-site" e "Nascondi indirizzo IP dal tracker"',
            en: 'Safari: enable "Prevent cross-site tracking" and "Hide IP address from trackers"'
          }
        ]
      },
      {
        type: 'heading',
        content: {
          it: 'Impostazioni privacy Android',
          en: 'Android privacy settings'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Pubblicità: resetta l\'ID pubblicitario e disabilita la pubblicità personalizzata',
            en: 'Advertising: reset advertising ID and disable personalized advertising'
          },
          {
            it: 'Servizi Google: rivedi quali servizi Google sono attivi e disabilita quelli non necessari',
            en: 'Google services: review which Google services are active and disable unnecessary ones'
          },
          {
            it: 'Permessi app: rivedi regolarmente i permessi di tutte le app',
            en: 'App permissions: regularly review permissions for all apps'
          },
          {
            it: 'Cronologia posizioni: disabilita la cronologia posizioni di Google',
            en: 'Location history: disable Google location history'
          },
          {
            it: 'Sincronizzazione: controlla cosa viene sincronizzato con il tuo account Google',
            en: 'Sync: control what\'s synced with your Google account'
          }
        ]
      },
      {
        type: 'heading',
        content: {
          it: 'App da evitare',
          en: 'Apps to avoid'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Alcune app sono particolarmente invasive per la privacy. App di social media come Facebook e Instagram raccolgono enormi quantità di dati. App di fitness e salute spesso tracciano la posizione e raccolgono dati sanitari sensibili. App di shopping possono tracciare le tue abitudini di acquisto e posizione.',
          en: 'Some apps are particularly privacy-invasive. Social media apps like Facebook and Instagram collect vast amounts of data. Fitness and health apps often track location and collect sensitive health data. Shopping apps can track your purchasing habits and location.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Considera alternative più rispettose della privacy quando possibile. Usa versioni web invece di app quando fattibile, o cerca alternative open source. Se devi usare un\'app invasiva, limita i permessi il più possibile e considera di usarla solo su un dispositivo separato.',
          en: 'Consider more privacy-respecting alternatives when possible. Use web versions instead of apps when feasible, or look for open-source alternatives. If you must use an invasive app, limit permissions as much as possible and consider using it only on a separate device.'
        }
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Le app preinstallate sul tuo telefono (bloatware) spesso raccolgono dati anche se non le usi mai. Se possibile, disabilitalle o rimuovile.',
          en: 'Pre-installed apps on your phone (bloatware) often collect data even if you never use them. If possible, disable or remove them.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Proteggere il tuo smartphone è un processo continuo. Rivedi regolarmente i permessi delle app, aggiorna il sistema operativo per le patch di sicurezza, e sii selettivo su quali app installi. Il tuo smartphone contiene informazioni molto sensibili - vale la pena prendersi il tempo per proteggerle.',
          en: 'Protecting your smartphone is an ongoing process. Regularly review app permissions, update the operating system for security patches, and be selective about which apps you install. Your smartphone contains very sensitive information - it\'s worth taking the time to protect it.'
        }
      }
    ]
  },
  {
    id: 'privacy-10',
    slug: 'costruire-routine-privacy',
    title: {
      it: 'Costruire la tua routine di privacy',
      en: 'Building your privacy routine'
    },
    description: {
      it: 'Abitudini quotidiane, threat model, approccio progressivo',
      en: 'Daily habits, threat model, progressive approach'
    },
    duration: '18 min',
    order: 10,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Privacy come processo, non destinazione',
          en: 'Privacy as a process, not a destination'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Proteggere la tua privacy non è qualcosa che fai una volta e poi dimentichi. È un processo continuo che richiede consapevolezza e abitudini regolari. Non devi diventare un esperto di sicurezza informatica o rinunciare completamente alla tecnologia moderna. L\'obiettivo è fare scelte consapevoli e implementare protezioni che funzionano per la tua vita.',
          en: 'Protecting your privacy isn\'t something you do once and then forget. It\'s a continuous process that requires awareness and regular habits. You don\'t have to become a cybersecurity expert or completely give up modern technology. The goal is to make conscious choices and implement protections that work for your life.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Inizia con piccoli cambiamenti che puoi mantenere a lungo termine. Passare a un motore di ricerca privato, installare un password manager, o rivedere le impostazioni di privacy di un account sono tutti passi significativi che non richiedono molto sforzo ma hanno un grande impatto.',
          en: 'Start with small changes you can maintain long-term. Switching to a private search engine, installing a password manager, or reviewing privacy settings on an account are all significant steps that don\'t require much effort but have a big impact.'
        }
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'La perfezione è il nemico del progresso. È meglio fare piccoli miglioramenti costanti che tentare di proteggere tutto in una volta e poi abbandonare.',
          en: 'Perfection is the enemy of progress. It\'s better to make small consistent improvements than to try to protect everything at once and then give up.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Capire il tuo threat model',
          en: 'Understanding your threat model'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Un threat model è un modo per identificare chi potrebbe voler accedere ai tuoi dati e perché. Non tutti hanno bisogno dello stesso livello di protezione. Un giornalista che lavora su storie sensibili ha bisogno di protezioni diverse da uno studente universitario che vuole semplicemente ridurre il tracciamento pubblicitario.',
          en: 'A threat model is a way to identify who might want to access your data and why. Not everyone needs the same level of protection. A journalist working on sensitive stories needs different protections than a college student who simply wants to reduce ad tracking.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Fai alcune domande: Chi potrebbe essere interessato ai miei dati? (aziende pubblicitarie, governi, criminali, datori di lavoro) Cosa vogliono fare con questi dati? (pubblicità mirata, sorveglianza, furto di identità) Quali sono le conseguenze se i miei dati vengono compromessi? (fastidio minore, perdita finanziaria, rischio fisico)',
          en: 'Ask some questions: Who might be interested in my data? (advertising companies, governments, criminals, employers) What do they want to do with this data? (targeted advertising, surveillance, identity theft) What are the consequences if my data is compromised? (minor annoyance, financial loss, physical risk)'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il tuo threat model determina quali protezioni sono prioritarie. Se il tuo principale interesse è ridurre il tracciamento pubblicitario, un browser privato e un motore di ricerca privato potrebbero essere sufficienti. Se stai proteggendo informazioni molto sensibili, potresti aver bisogno di crittografia end-to-end, Tor e altre protezioni avanzate.',
          en: 'Your threat model determines which protections are priorities. If your main concern is reducing ad tracking, a private browser and private search engine might be sufficient. If you\'re protecting very sensitive information, you might need end-to-end encryption, Tor, and other advanced protections.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Abitudini quotidiane di privacy',
          en: 'Daily privacy habits'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Usa un browser rispettoso della privacy per tutte le tue attività online quotidiane',
            en: 'Use a privacy-respecting browser for all your daily online activities'
          },
          {
            it: 'Rivedi le impostazioni di privacy di nuovi servizi prima di iscriverti',
            en: 'Review privacy settings of new services before signing up'
          },
          {
            it: 'Usa il password manager per generare password uniche per ogni account',
            en: 'Use password manager to generate unique passwords for each account'
          },
          {
            it: 'Abilita 2FA su account importanti non appena disponibile',
            en: 'Enable 2FA on important accounts as soon as available'
          },
          {
            it: 'Rivedi mensilmente i permessi delle app sul tuo smartphone',
            en: 'Monthly review of app permissions on your smartphone'
          },
          {
            it: 'Sii selettivo su cosa condividi sui social media',
            en: 'Be selective about what you share on social media'
          }
        ]
      },
      {
        type: 'heading',
        content: {
          it: 'Approccio progressivo',
          en: 'Progressive approach'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Invece di cercare di proteggere tutto in una volta, adotta un approccio progressivo. Inizia con le protezioni più semplici e ad alto impatto, poi aggiungi gradualmente protezioni più avanzate man mano che diventi più a tuo agio.',
          en: 'Instead of trying to protect everything at once, adopt a progressive approach. Start with the simplest and highest-impact protections, then gradually add more advanced protections as you become more comfortable.'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Settimana 1-2: Passa a un browser privato e un motore di ricerca privato',
            en: 'Week 1-2: Switch to a private browser and private search engine'
          },
          {
            it: 'Settimana 3-4: Installa un password manager e abilita 2FA su account importanti',
            en: 'Week 3-4: Install a password manager and enable 2FA on important accounts'
          },
          {
            it: 'Mese 2: Rivedi e aggiorna le impostazioni di privacy di tutti i tuoi account',
            en: 'Month 2: Review and update privacy settings on all your accounts'
          },
          {
            it: 'Mese 3: Considera alternative più private per email e messaggistica',
            en: 'Month 3: Consider more private alternatives for email and messaging'
          },
          {
            it: 'Ongoing: Continua a imparare e adattare le tue protezioni alle tue esigenze',
            en: 'Ongoing: Continue learning and adapting your protections to your needs'
          }
        ]
      },
      {
        type: 'heading',
        content: {
          it: 'Mantenere la motivazione',
          en: 'Staying motivated'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Proteggere la tua privacy può sembrare opprimente all\'inizio, ma ricorda che ogni piccolo passo conta. Non devi essere perfetto - anche ridurre il tracciamento del 50% è un miglioramento significativo. Celebra i piccoli successi e ricorda perché la privacy è importante per te.',
          en: 'Protecting your privacy can feel overwhelming at first, but remember that every small step counts. You don\'t have to be perfect - even reducing tracking by 50% is a significant improvement. Celebrate small successes and remember why privacy matters to you.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Connettiti con comunità di privacy online per supporto e consigli. Leggi regolarmente notizie sulla privacy per rimanere aggiornato sulle nuove minacce e protezioni. E ricorda: la privacy è un diritto fondamentale, non un privilegio. Hai il diritto di controllare i tuoi dati.',
          en: 'Connect with online privacy communities for support and advice. Regularly read privacy news to stay updated on new threats and protections. And remember: privacy is a fundamental right, not a privilege. You have the right to control your data.'
        }
      },
      {
        type: 'quote',
        content: {
          it: 'La privacy non riguarda avere qualcosa da nascondere. Riguarda avere qualcosa da proteggere. E tutti abbiamo qualcosa da proteggere.',
          en: 'Privacy isn\'t about having something to hide. It\'s about having something to protect. And we all have something to protect.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Inizia oggi. Non aspettare di essere perfetto. Ogni passo che fai verso una maggiore privacy è un passo verso una maggiore autonomia e controllo sulla tua vita digitale.',
          en: 'Start today. Don\'t wait to be perfect. Every step you take toward greater privacy is a step toward greater autonomy and control over your digital life.'
        }
      }
    ]
  }
];
