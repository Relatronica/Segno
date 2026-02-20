import type { Lesson } from '../courses';

export const dirittiDigitaliGdprLessons: Lesson[] = [
  {
    id: 'gdpr-intro',
    slug: 'introduzione-al-gdpr',
    title: {
      it: 'Introduzione al GDPR',
      en: 'Introduction to GDPR'
    },
    description: {
      it: 'Scopri cos\'è il GDPR, quando è entrato in vigore e a chi si applica',
      en: 'Discover what GDPR is, when it came into force, and who it applies to'
    },
    duration: '15 min',
    order: 1,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Cos\'è il GDPR',
          en: 'What is GDPR'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il Regolamento Generale sulla Protezione dei Dati (GDPR) è una normativa europea entrata in vigore il 25 maggio 2018. Rappresenta il quadro giuridico più completo al mondo per la protezione dei dati personali. Il GDPR sostituisce la precedente Direttiva sulla protezione dei dati del 1995, adeguandola alle sfide del mondo digitale moderno.',
          en: 'The General Data Protection Regulation (GDPR) is a European regulation that came into force on May 25, 2018. It represents the most comprehensive legal framework in the world for the protection of personal data. GDPR replaces the previous Data Protection Directive of 1995, adapting it to the challenges of the modern digital world.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'L\'obiettivo principale del GDPR è garantire che le persone abbiano il controllo sui propri dati personali e che le organizzazioni trattino questi dati in modo trasparente e responsabile. Stabilisce diritti chiari per gli individui e obblighi precisi per le organizzazioni che raccolgono, utilizzano o conservano dati personali.',
          en: 'The main objective of GDPR is to ensure that people have control over their personal data and that organizations process this data transparently and responsibly. It establishes clear rights for individuals and precise obligations for organizations that collect, use, or store personal data.'
        }
      },
      {
        type: 'callout',
        variant: 'info',
        content: {
          it: 'Il GDPR si applica a tutte le organizzazioni che trattano dati personali di cittadini dell\'UE, indipendentemente da dove si trovi l\'organizzazione. Questo significa che anche un\'azienda statunitense o asiatica deve rispettare il GDPR se tratta dati di cittadini europei.',
          en: 'GDPR applies to all organizations that process personal data of EU citizens, regardless of where the organization is located. This means that even a US or Asian company must comply with GDPR if it processes data of European citizens.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Chi è protetto dal GDPR',
          en: 'Who is protected by GDPR'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il GDPR protegge tutte le persone fisiche residenti nell\'Unione Europea, indipendentemente dalla loro cittadinanza. Se vivi in Italia, Francia, Germania o qualsiasi altro paese UE, i tuoi dati personali sono protetti dal GDPR. Questo include anche i dati di minori, per i quali il GDPR prevede protezioni speciali.',
          en: 'GDPR protects all natural persons residing in the European Union, regardless of their citizenship. If you live in Italy, France, Germany, or any other EU country, your personal data is protected by GDPR. This also includes data of minors, for whom GDPR provides special protections.'
        }
      }
    ]
  },
  {
    id: 'gdpr-principles',
    slug: 'i-principi-fondamentali',
    title: {
      it: 'I principi fondamentali',
      en: 'Fundamental principles'
    },
    description: {
      it: 'I sei principi fondamentali del GDPR: liceità, limitazione delle finalità, minimizzazione, accuratezza, limitazione della conservazione e integrità',
      en: 'The six fundamental principles of GDPR: lawfulness, purpose limitation, minimization, accuracy, storage limitation, and integrity'
    },
    duration: '20 min',
    order: 2,
    content: [
      {
        type: 'heading',
        content: {
          it: 'I sei principi del GDPR',
          en: 'The six principles of GDPR'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il GDPR si basa su sei principi fondamentali che devono guidare ogni trattamento di dati personali. Questi principi non sono solo linee guida, ma obblighi legali vincolanti. Ogni organizzazione deve dimostrare di rispettare questi principi in ogni fase del trattamento dei dati.',
          en: 'GDPR is based on six fundamental principles that must guide every processing of personal data. These principles are not just guidelines, but binding legal obligations. Every organization must demonstrate that it respects these principles at every stage of data processing.'
        }
      },
      {
        type: 'heading',
        content: {
          it: '1. Liceità, correttezza e trasparenza',
          en: '1. Lawfulness, fairness and transparency'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il trattamento deve essere lecito, corretto e trasparente nei confronti dell\'interessato. Questo significa che le organizzazioni devono avere una base giuridica valida per trattare i dati, devono farlo in modo equo e devono informare chiaramente le persone su come vengono utilizzati i loro dati.',
          en: 'Processing must be lawful, fair, and transparent to the data subject. This means that organizations must have a valid legal basis for processing data, must do so fairly, and must clearly inform people about how their data is used.'
        }
      },
      {
        type: 'heading',
        content: {
          it: '2. Limitazione delle finalità',
          en: '2. Purpose limitation'
        }
      },
      {
        type: 'text',
        content: {
          it: 'I dati devono essere raccolti per finalità determinate, esplicite e legittime. Non è possibile raccogliere dati per uno scopo e poi utilizzarli per un altro senza informare l\'interessato e ottenere un nuovo consenso. Questo principio impedisce l\'uso "creativo" dei dati oltre lo scopo originale.',
          en: 'Data must be collected for specified, explicit, and legitimate purposes. It is not possible to collect data for one purpose and then use it for another without informing the data subject and obtaining new consent. This principle prevents the "creative" use of data beyond the original purpose.'
        }
      },
      {
        type: 'heading',
        content: {
          it: '3. Minimizzazione dei dati',
          en: '3. Data minimization'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Le organizzazioni devono raccogliere solo i dati strettamente necessari per raggiungere lo scopo dichiarato. Non è lecito raccogliere dati "per sicurezza" o "perché potrebbero essere utili in futuro". Questo principio protegge la privacy limitando la quantità di informazioni raccolte.',
          en: 'Organizations must collect only the data strictly necessary to achieve the stated purpose. It is not lawful to collect data "for safety" or "because it might be useful in the future". This principle protects privacy by limiting the amount of information collected.'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Accuratezza: i dati devono essere accurati e aggiornati',
            en: 'Accuracy: data must be accurate and up to date'
          },
          {
            it: 'Limitazione della conservazione: i dati non possono essere conservati più a lungo del necessario',
            en: 'Storage limitation: data cannot be stored longer than necessary'
          },
          {
            it: 'Integrità e riservatezza: i dati devono essere protetti da accessi non autorizzati',
            en: 'Integrity and confidentiality: data must be protected from unauthorized access'
          }
        ]
      }
    ]
  },
  {
    id: 'gdpr-legal-bases',
    slug: 'le-basi-giuridiche-del-trattamento',
    title: {
      it: 'Le basi giuridiche del trattamento',
      en: 'Legal bases for processing'
    },
    description: {
      it: 'Le sei basi giuridiche che permettono il trattamento dei dati: consenso, contratto, obbligo legale, interessi vitali, interesse pubblico e interesse legittimo',
      en: 'The six legal bases that allow data processing: consent, contract, legal obligation, vital interests, public interest, and legitimate interest'
    },
    duration: '18 min',
    order: 3,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Quando è lecito trattare i dati',
          en: 'When it is lawful to process data'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il GDPR richiede che ogni trattamento di dati personali abbia una base giuridica valida. Non è sufficiente voler utilizzare i dati: deve esistere una delle sei basi giuridiche previste dal regolamento. La scelta della base giuridica corretta è fondamentale e determina anche quali diritti hai come interessato.',
          en: 'GDPR requires that every processing of personal data has a valid legal basis. It is not enough to want to use the data: one of the six legal bases provided by the regulation must exist. Choosing the correct legal basis is fundamental and also determines what rights you have as a data subject.'
        }
      },
      {
        type: 'heading',
        content: {
          it: '1. Consenso',
          en: '1. Consent'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il consenso è probabilmente la base giuridica più conosciuta. Deve essere libero, specifico, informato e inequivocabile. Questo significa che devi sapere esattamente a cosa stai dando il consenso, devi poterlo rifiutare senza conseguenze, e la tua azione deve dimostrare chiaramente che accetti il trattamento.',
          en: 'Consent is probably the most well-known legal basis. It must be free, specific, informed, and unambiguous. This means you must know exactly what you are consenting to, you must be able to refuse without consequences, and your action must clearly demonstrate that you accept the processing.'
        }
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Il consenso può essere revocato in qualsiasi momento. Se hai dato il consenso per ricevere newsletter, puoi ritirarlo quando vuoi e l\'organizzazione deve smettere immediatamente di utilizzare i tuoi dati per quello scopo.',
          en: 'Consent can be withdrawn at any time. If you have given consent to receive newsletters, you can withdraw it whenever you want and the organization must immediately stop using your data for that purpose.'
        }
      },
      {
        type: 'heading',
        content: {
          it: '2. Esecuzione di un contratto',
          en: '2. Performance of a contract'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Se hai stipulato un contratto con un\'organizzazione, questa può trattare i tuoi dati per adempiere agli obblighi contrattuali. Ad esempio, un negozio online può utilizzare il tuo indirizzo per spedirti il prodotto acquistato. In questo caso, non è necessario il consenso perché il trattamento è necessario per il contratto.',
          en: 'If you have entered into a contract with an organization, it can process your data to fulfill contractual obligations. For example, an online store can use your address to ship you the purchased product. In this case, consent is not necessary because processing is necessary for the contract.'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Obbligo legale: quando la legge richiede il trattamento (es. dichiarazione dei redditi)',
            en: 'Legal obligation: when the law requires processing (e.g., tax declaration)'
          },
          {
            it: 'Interessi vitali: per proteggere la vita o l\'incolumità fisica di una persona',
            en: 'Vital interests: to protect the life or physical safety of a person'
          },
          {
            it: 'Interesse pubblico: per compiti di interesse pubblico o esercizio di pubblici poteri',
            en: 'Public interest: for tasks in the public interest or exercise of public authority'
          },
          {
            it: 'Interesse legittimo: quando l\'organizzazione ha un interesse legittimo che non viola i tuoi diritti',
            en: 'Legitimate interest: when the organization has a legitimate interest that does not violate your rights'
          }
        ]
      }
    ]
  },
  {
    id: 'gdpr-access-right',
    slug: 'diritto-di-accesso',
    title: {
      it: 'Diritto di accesso',
      en: 'Right of access'
    },
    description: {
      it: 'Come richiedere i tuoi dati personali, cosa include una richiesta di accesso e i tempi di risposta previsti',
      en: 'How to request your personal data, what an access request includes, and expected response times'
    },
    duration: '15 min',
    order: 4,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Il tuo diritto di sapere',
          en: 'Your right to know'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il diritto di accesso è uno dei diritti più importanti del GDPR. Ti permette di sapere esattamente quali dati personali un\'organizzazione detiene su di te, come li utilizza, con chi li condivide e per quanto tempo li conserva. È il primo passo per esercitare controllo sui tuoi dati.',
          en: 'The right of access is one of the most important rights under GDPR. It allows you to know exactly what personal data an organization holds about you, how it uses it, who it shares it with, and how long it keeps it. It is the first step in exercising control over your data.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Cosa puoi richiedere',
          en: 'What you can request'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Quando eserciti il diritto di accesso, l\'organizzazione deve fornirti una copia dei tuoi dati personali in un formato strutturato e di uso comune. Deve anche informarti sulle finalità del trattamento, le categorie di dati trattati, i destinatari dei dati, il periodo di conservazione previsto e i tuoi diritti di opposizione, rettifica e cancellazione.',
          en: 'When you exercise the right of access, the organization must provide you with a copy of your personal data in a structured and commonly used format. It must also inform you about the purposes of processing, the categories of data processed, the recipients of the data, the expected retention period, and your rights to object, rectify, and erase.'
        }
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'La richiesta di accesso è gratuita nella maggior parte dei casi. Un\'organizzazione può addebitare un costo ragionevole solo se le richieste sono manifestamente infondate o eccessive, o se richiedi copie aggiuntive.',
          en: 'The access request is free in most cases. An organization can charge a reasonable fee only if requests are manifestly unfounded or excessive, or if you request additional copies.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Come fare una richiesta',
          en: 'How to make a request'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Puoi fare una richiesta di accesso in qualsiasi momento, per iscritto o verbalmente. Non è necessario utilizzare un formato specifico, ma è consigliabile inviare la richiesta via email o raccomandata per avere una prova. L\'organizzazione ha un mese di tempo per rispondere, che può essere esteso di altri due mesi per richieste complesse.',
          en: 'You can make an access request at any time, in writing or verbally. It is not necessary to use a specific format, but it is advisable to send the request by email or registered mail to have proof. The organization has one month to respond, which can be extended by another two months for complex requests.'
        }
      },
      {
        type: 'quote',
        content: {
          it: 'Il diritto di accesso è il fondamento di tutti gli altri diritti del GDPR. Senza sapere quali dati vengono trattati, non puoi esercitare efficacemente i tuoi diritti di rettifica, cancellazione o opposizione.',
          en: 'The right of access is the foundation of all other GDPR rights. Without knowing what data is being processed, you cannot effectively exercise your rights to rectification, erasure, or objection.'
        },
        author: 'Garante per la Protezione dei Dati Personali'
      }
    ]
  },
  {
    id: 'gdpr-rectification-erasure',
    slug: 'diritto-rettifica-cancellazione',
    title: {
      it: 'Diritto alla rettifica e cancellazione',
      en: 'Right to rectification and erasure'
    },
    description: {
      it: 'Come correggere dati errati e richiedere la cancellazione dei tuoi dati: il diritto all\'oblio e le sue limitazioni',
      en: 'How to correct incorrect data and request deletion of your data: the right to be forgotten and its limitations'
    },
    duration: '18 min',
    order: 5,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Diritto alla rettifica',
          en: 'Right to rectification'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Hai il diritto di ottenere la rettifica dei dati personali inesatti che ti riguardano senza indebito ritardo. Questo include anche il diritto di completare dati personali incompleti. Se il tuo indirizzo è cambiato, se il tuo nome è scritto male, o se qualsiasi altra informazione è errata, puoi richiedere la correzione.',
          en: 'You have the right to obtain the rectification of inaccurate personal data concerning you without undue delay. This also includes the right to have incomplete personal data completed. If your address has changed, if your name is misspelled, or if any other information is incorrect, you can request correction.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'L\'organizzazione deve rettificare i dati senza indebito ritardo e, se ha comunicato i dati ad altri, deve informarli della rettifica. Questo garantisce che le informazioni errate non continuino a circolare anche dopo la correzione.',
          en: 'The organization must rectify the data without undue delay and, if it has communicated the data to others, it must inform them of the rectification. This ensures that incorrect information does not continue to circulate even after correction.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Diritto alla cancellazione (diritto all\'oblio)',
          en: 'Right to erasure (right to be forgotten)'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il diritto alla cancellazione, spesso chiamato "diritto all\'oblio", ti permette di richiedere la cancellazione dei tuoi dati personali quando non sono più necessari, quando ritiri il consenso, quando i dati sono stati trattati illecitamente, o quando la cancellazione è necessaria per adempiere a un obbligo legale.',
          en: 'The right to erasure, often called the "right to be forgotten", allows you to request the deletion of your personal data when it is no longer necessary, when you withdraw consent, when the data has been processed unlawfully, or when erasure is necessary to comply with a legal obligation.'
        }
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Il diritto alla cancellazione non è assoluto. Un\'organizzazione può rifiutare la cancellazione se il trattamento è necessario per esercitare il diritto alla libertà di espressione, per adempiere a un obbligo legale, per motivi di interesse pubblico, o per stabilire, esercitare o difendere un diritto in sede giudiziaria.',
          en: 'The right to erasure is not absolute. An organization may refuse erasure if processing is necessary to exercise the right to freedom of expression, to comply with a legal obligation, for reasons of public interest, or to establish, exercise, or defend a right in court.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Quando si applica il diritto all\'oblio',
          en: 'When the right to be forgotten applies'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'I dati non sono più necessari rispetto alle finalità per cui sono stati raccolti',
            en: 'The data is no longer necessary for the purposes for which it was collected'
          },
          {
            it: 'Ritiri il consenso e non esiste altra base giuridica per il trattamento',
            en: 'You withdraw consent and no other legal basis for processing exists'
          },
          {
            it: 'I dati sono stati trattati illecitamente',
            en: 'The data has been processed unlawfully'
          },
          {
            it: 'La cancellazione è necessaria per adempiere a un obbligo legale',
            en: 'Erasure is necessary to comply with a legal obligation'
          }
        ]
      }
    ]
  },
  {
    id: 'gdpr-portability',
    slug: 'diritto-alla-portabilita',
    title: {
      it: 'Diritto alla portabilità',
      en: 'Right to data portability'
    },
    description: {
      it: 'Come ottenere i tuoi dati in un formato riutilizzabile e trasferirli ad un altro servizio',
      en: 'How to obtain your data in a reusable format and transfer it to another service'
    },
    duration: '15 min',
    order: 6,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Porta i tuoi dati con te',
          en: 'Take your data with you'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il diritto alla portabilità dei dati ti permette di ottenere i tuoi dati personali in un formato strutturato, di uso comune e leggibile da dispositivo automatico, e di trasmetterli a un altro titolare del trattamento. Questo diritto promuove la concorrenza e ti dà maggiore controllo, permettendoti di cambiare servizio senza perdere i tuoi dati.',
          en: 'The right to data portability allows you to obtain your personal data in a structured, commonly used, and machine-readable format, and to transmit it to another controller. This right promotes competition and gives you greater control, allowing you to change service without losing your data.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Quando si applica',
          en: 'When it applies'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il diritto alla portabilità si applica solo quando il trattamento si basa sul consenso o sull\'esecuzione di un contratto, e quando il trattamento è effettuato con mezzi automatizzati. Non si applica ai dati trattati su carta o quando il trattamento si basa su altre basi giuridiche come l\'obbligo legale.',
          en: 'The right to portability applies only when processing is based on consent or contract performance, and when processing is carried out by automated means. It does not apply to data processed on paper or when processing is based on other legal bases such as legal obligation.'
        }
      },
      {
        type: 'callout',
        variant: 'info',
        content: {
          it: 'I formati comuni per la portabilità includono CSV, JSON e XML. L\'organizzazione deve fornire i dati in un formato che sia facilmente utilizzabile da altri servizi. Se richiedi direttamente il trasferimento a un altro servizio, l\'organizzazione deve farlo quando tecnicamente possibile.',
          en: 'Common formats for portability include CSV, JSON, and XML. The organization must provide data in a format that is easily usable by other services. If you request direct transfer to another service, the organization must do so when technically feasible.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Esempi pratici',
          en: 'Practical examples'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Cambiare provider email: puoi scaricare tutti i tuoi contatti e messaggi',
            en: 'Changing email provider: you can download all your contacts and messages'
          },
          {
            it: 'Migrare da un social network a un altro: puoi trasferire le tue foto e post',
            en: 'Migrating from one social network to another: you can transfer your photos and posts'
          },
          {
            it: 'Cambiare app di fitness: puoi portare con te la tua cronologia di allenamenti',
            en: 'Changing fitness app: you can bring your workout history with you'
          },
          {
            it: 'Spostare dati bancari: puoi ottenere la tua cronologia transazioni in formato elettronico',
            en: 'Moving banking data: you can get your transaction history in electronic format'
          }
        ]
      }
    ]
  },
  {
    id: 'gdpr-objection',
    slug: 'diritto-di-opposizione',
    title: {
      it: 'Diritto di opposizione',
      en: 'Right to object'
    },
    description: {
      it: 'Come opporti al trattamento dei tuoi dati per marketing diretto, profilazione e decisioni automatizzate',
      en: 'How to object to processing of your data for direct marketing, profiling, and automated decision-making'
    },
    duration: '16 min',
    order: 7,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Opponiti al trattamento',
          en: 'Object to processing'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il diritto di opposizione ti permette di opporti al trattamento dei tuoi dati personali in determinate circostanze. Quando ti opponi, l\'organizzazione deve interrompere il trattamento a meno che non dimostri motivi legittimi imperiosi che prevalgono sui tuoi interessi, diritti e libertà.',
          en: 'The right to object allows you to object to the processing of your personal data in certain circumstances. When you object, the organization must stop processing unless it demonstrates compelling legitimate grounds that override your interests, rights, and freedoms.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Marketing diretto',
          en: 'Direct marketing'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Hai il diritto assoluto di opporti al trattamento dei tuoi dati per finalità di marketing diretto. Quando ti opponi al marketing diretto, l\'organizzazione deve immediatamente smettere di utilizzare i tuoi dati per questo scopo. Non può rifiutare la tua opposizione o richiedere giustificazioni.',
          en: 'You have an absolute right to object to the processing of your data for direct marketing purposes. When you object to direct marketing, the organization must immediately stop using your data for this purpose. It cannot refuse your objection or require justifications.'
        }
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'Molti servizi offrono un link "disiscriviti" nelle email di marketing. Cliccare su quel link è un modo semplice per esercitare il diritto di opposizione. L\'organizzazione deve rispettare la tua scelta immediatamente.',
          en: 'Many services offer an "unsubscribe" link in marketing emails. Clicking that link is a simple way to exercise the right to object. The organization must respect your choice immediately.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Profilazione e decisioni automatizzate',
          en: 'Profiling and automated decision-making'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Hai il diritto di non essere sottoposto a una decisione basata unicamente sul trattamento automatizzato, inclusa la profilazione, che produca effetti giuridici o che ti riguardi in modo significativo. Questo include decisioni su prestiti, assicurazioni, assunzioni o valutazioni di credito basate solo su algoritmi.',
          en: 'You have the right not to be subject to a decision based solely on automated processing, including profiling, that produces legal effects or significantly affects you. This includes decisions on loans, insurance, hiring, or credit assessments based solely on algorithms.'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Puoi richiedere l\'intervento umano nella decisione',
            en: 'You can request human intervention in the decision'
          },
          {
            it: 'Hai il diritto di esprimere la tua opinione',
            en: 'You have the right to express your opinion'
          },
          {
            it: 'Puoi contestare la decisione automatizzata',
            en: 'You can contest the automated decision'
          },
          {
            it: 'L\'organizzazione deve informarti quando usa decisioni automatizzate',
            en: 'The organization must inform you when it uses automated decisions'
          }
        ]
      }
    ]
  },
  {
    id: 'gdpr-consent',
    slug: 'il-consenso-informato',
    title: {
      it: 'Il consenso informato',
      en: 'Informed consent'
    },
    description: {
      it: 'Come riconoscere un consenso valido, identificare i dark pattern e proteggerti dalla manipolazione',
      en: 'How to recognize valid consent, identify dark patterns, and protect yourself from manipulation'
    },
    duration: '20 min',
    order: 8,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Cos\'è un consenso valido',
          en: 'What is valid consent'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il consenso GDPR deve essere libero, specifico, informato e inequivocabile. "Libero" significa che puoi rifiutare senza conseguenze negative. "Specifico" significa che devi sapere esattamente a cosa stai dando il consenso. "Informato" significa che devi avere tutte le informazioni necessarie. "Inequivocabile" significa che la tua azione deve dimostrare chiaramente l\'accettazione.',
          en: 'GDPR consent must be free, specific, informed, and unambiguous. "Free" means you can refuse without negative consequences. "Specific" means you must know exactly what you are consenting to. "Informed" means you must have all necessary information. "Unambiguous" means your action must clearly demonstrate acceptance.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Requisiti per il consenso',
          en: 'Requirements for consent'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Deve essere un\'azione positiva: un\'opzione pre-selezionata non è valida',
            en: 'It must be a positive action: a pre-selected option is not valid'
          },
          {
            it: 'Deve essere separato da altri termini: non può essere nascosto in un contratto',
            en: 'It must be separate from other terms: it cannot be hidden in a contract'
          },
          {
            it: 'Deve essere facile da ritirare quanto è stato dare',
            en: 'It must be as easy to withdraw as it was to give'
          },
          {
            it: 'Deve essere specifico per ogni finalità: un consenso generale non è valido',
            en: 'It must be specific for each purpose: general consent is not valid'
          }
        ]
      },
      {
        type: 'heading',
        content: {
          it: 'Dark pattern: riconoscerli e evitarli',
          en: 'Dark patterns: recognize and avoid them'
        }
      },
      {
        type: 'text',
        content: {
          it: 'I dark pattern sono interfacce progettate per manipolarti e farti fare scelte che non faresti consapevolmente. Nel contesto del GDPR, includono pulsanti "Accetta tutto" molto più grandi di "Rifiuta", opzioni pre-selezionate, richieste ripetute dopo il rifiuto, o messaggi che suggeriscono che il servizio non funzionerà senza il consenso quando invece è necessario solo per finalità opzionali.',
          en: 'Dark patterns are interfaces designed to manipulate you and make you make choices you would not make consciously. In the GDPR context, they include "Accept all" buttons much larger than "Reject", pre-selected options, repeated requests after refusal, or messages suggesting the service will not work without consent when it is actually only needed for optional purposes.'
        }
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Se un sito web usa dark pattern per ottenere il consenso, quel consenso non è valido secondo il GDPR. Puoi denunciare questi comportamenti al Garante per la Protezione dei Dati Personali.',
          en: 'If a website uses dark patterns to obtain consent, that consent is not valid under GDPR. You can report these behaviors to the Data Protection Authority.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Come proteggerti',
          en: 'How to protect yourself'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Leggi sempre attentamente cosa stai accettando. Preferisci le opzioni "Personalizza" o "Gestisci preferenze" invece di "Accetta tutto". Ricorda che puoi sempre ritirare il consenso. Se un servizio richiede il consenso per funzionare quando non dovrebbe, considera di utilizzare un servizio alternativo che rispetta meglio la tua privacy.',
          en: 'Always read carefully what you are accepting. Prefer "Customize" or "Manage preferences" options instead of "Accept all". Remember that you can always withdraw consent. If a service requires consent to work when it should not, consider using an alternative service that better respects your privacy.'
        }
      }
    ]
  },
  {
    id: 'gdpr-data-breach',
    slug: 'data-breach-cosa-fare',
    title: {
      it: 'Data breach: cosa fare',
      en: 'Data breach: what to do'
    },
    description: {
      it: 'Cosa sono i data breach, i tuoi diritti quando si verifica una violazione e i passi pratici da seguire',
      en: 'What data breaches are, your rights when a breach occurs, and practical steps to follow'
    },
    duration: '17 min',
    order: 9,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Cos\'è un data breach',
          en: 'What is a data breach'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Un data breach (violazione dei dati) è una violazione della sicurezza che comporta la distruzione, la perdita, la modifica, la divulgazione non autorizzata o l\'accesso accidentale ai dati personali. Questo può includere attacchi informatici, perdita di dispositivi, invio di email a destinatari sbagliati, o accessi non autorizzati ai sistemi.',
          en: 'A data breach is a security violation that involves the destruction, loss, alteration, unauthorized disclosure, or accidental access to personal data. This can include cyber attacks, device loss, sending emails to wrong recipients, or unauthorized access to systems.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Obblighi di notifica',
          en: 'Notification obligations'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Quando si verifica un data breach che può comportare un rischio per i diritti e le libertà delle persone, l\'organizzazione deve notificare l\'autorità di controllo competente entro 72 ore. Se il rischio è elevato, deve anche informare direttamente gli interessati senza indebito ritardo. La notifica deve spiegare la natura della violazione, i possibili effetti e le misure proposte.',
          en: 'When a data breach occurs that may pose a risk to people\'s rights and freedoms, the organization must notify the competent supervisory authority within 72 hours. If the risk is high, it must also directly inform the data subjects without undue delay. The notification must explain the nature of the breach, possible effects, and proposed measures.'
        }
      },
      {
        type: 'callout',
        variant: 'warning',
        content: {
          it: 'Se ricevi una notifica di data breach, non ignorarla. Anche se potrebbe sembrare solo un\'email fastidiosa, potrebbe indicare che i tuoi dati sono stati compromessi. Leggi attentamente le informazioni e segui le raccomandazioni dell\'organizzazione.',
          en: 'If you receive a data breach notification, do not ignore it. Even if it might seem like just an annoying email, it could indicate that your data has been compromised. Read the information carefully and follow the organization\'s recommendations.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Cosa fare se sei coinvolto',
          en: 'What to do if you are involved'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Cambia immediatamente le password degli account interessati',
            en: 'Immediately change passwords for affected accounts'
          },
          {
            it: 'Attiva l\'autenticazione a due fattori dove possibile',
            en: 'Enable two-factor authentication where possible'
          },
          {
            it: 'Monitora i tuoi account bancari e carte di credito per attività sospette',
            en: 'Monitor your bank accounts and credit cards for suspicious activity'
          },
          {
            it: 'Considera di congelare il tuo credito se sono stati compromessi dati finanziari',
            en: 'Consider freezing your credit if financial data has been compromised'
          },
          {
            it: 'Diffida di email o chiamate sospette che potrebbero essere tentativi di phishing',
            en: 'Be wary of suspicious emails or calls that could be phishing attempts'
          }
        ]
      },
      {
        type: 'heading',
        content: {
          it: 'I tuoi diritti',
          en: 'Your rights'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Hai il diritto di essere informato su qualsiasi data breach che possa influire negativamente sui tuoi diritti. Se un\'organizzazione non ti informa di una violazione quando dovrebbe, puoi presentare un reclamo all\'autorità di controllo. In alcuni casi, potresti anche avere diritto a un risarcimento se la violazione ti ha causato danni materiali o immateriali.',
          en: 'You have the right to be informed about any data breach that may adversely affect your rights. If an organization does not inform you of a breach when it should, you can file a complaint with the supervisory authority. In some cases, you may also be entitled to compensation if the breach has caused you material or immaterial damage.'
        }
      }
    ]
  },
  {
    id: 'gdpr-dpo-authorities',
    slug: 'dpo-autorita-garanti',
    title: {
      it: 'Il DPO e le autorità garanti',
      en: 'DPO and supervisory authorities'
    },
    description: {
      it: 'Il ruolo del Data Protection Officer, come presentare un reclamo e le autorità nazionali di controllo',
      en: 'The role of the Data Protection Officer, how to file a complaint, and national supervisory authorities'
    },
    duration: '16 min',
    order: 10,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Il Data Protection Officer (DPO)',
          en: 'The Data Protection Officer (DPO)'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il DPO è una figura professionale che alcune organizzazioni devono nominare per garantire il rispetto del GDPR. Le organizzazioni pubbliche, quelle che effettuano monitoraggio sistematico su larga scala, o quelle che trattano categorie particolari di dati su larga scala devono avere un DPO. Il DPO è il tuo punto di contatto per questioni relative alla protezione dei dati.',
          en: 'The DPO is a professional figure that some organizations must appoint to ensure GDPR compliance. Public organizations, those that carry out systematic large-scale monitoring, or those that process special categories of data on a large scale must have a DPO. The DPO is your point of contact for data protection matters.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Puoi contattare il DPO di un\'organizzazione per esercitare i tuoi diritti, fare domande sulla protezione dei dati, o presentare preoccupazioni. Il DPO deve essere indipendente e non può ricevere istruzioni su come svolgere i suoi compiti. Deve anche mantenere la riservatezza sulle questioni di cui viene a conoscenza.',
          en: 'You can contact an organization\'s DPO to exercise your rights, ask questions about data protection, or raise concerns. The DPO must be independent and cannot receive instructions on how to perform their duties. They must also maintain confidentiality on matters they become aware of.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Le autorità di controllo',
          en: 'Supervisory authorities'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Ogni paese dell\'UE ha un\'autorità di controllo indipendente responsabile dell\'applicazione del GDPR. In Italia, questa autorità è il Garante per la Protezione dei Dati Personali. Queste autorità hanno il potere di indagare sulle violazioni, imporre multe, e ordinare alle organizzazioni di conformarsi al GDPR.',
          en: 'Each EU country has an independent supervisory authority responsible for enforcing GDPR. In Italy, this authority is the Garante per la Protezione dei Dati Personali (Data Protection Authority). These authorities have the power to investigate violations, impose fines, and order organizations to comply with GDPR.'
        }
      },
      {
        type: 'callout',
        variant: 'info',
        content: {
          it: 'Puoi presentare un reclamo all\'autorità di controllo del tuo paese o del paese dove si trova l\'organizzazione che ha violato i tuoi diritti. Il reclamo è gratuito e può essere fatto online, per posta o di persona.',
          en: 'You can file a complaint with the supervisory authority of your country or the country where the organization that violated your rights is located. The complaint is free and can be made online, by mail, or in person.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Come presentare un reclamo',
          en: 'How to file a complaint'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Raccogli le prove: email, screenshot, documenti che dimostrano la violazione',
            en: 'Gather evidence: emails, screenshots, documents that demonstrate the violation'
          },
          {
            it: 'Descrivi chiaramente cosa è successo e quali diritti sono stati violati',
            en: 'Clearly describe what happened and which rights were violated'
          },
          {
            it: 'Indica l\'organizzazione coinvolta e i tuoi tentativi di risolvere la questione',
            en: 'Indicate the organization involved and your attempts to resolve the issue'
          },
          {
            it: 'Presenta il reclamo all\'autorità competente (puoi farlo online sul sito del Garante)',
            en: 'File the complaint with the competent authority (you can do it online on the Authority\'s website)'
          }
        ]
      },
      {
        type: 'quote',
        content: {
          it: 'Le autorità di controllo sono i guardiani del GDPR. Hanno il potere di proteggere i tuoi diritti e di garantire che le organizzazioni rispettino le regole. Non esitare a contattarle se ritieni che i tuoi diritti siano stati violati.',
          en: 'Supervisory authorities are the guardians of GDPR. They have the power to protect your rights and ensure that organizations respect the rules. Do not hesitate to contact them if you believe your rights have been violated.'
        }
      }
    ]
  },
  {
    id: 'gdpr-daily-life',
    slug: 'gdpr-vita-quotidiana',
    title: {
      it: 'GDPR nella vita quotidiana',
      en: 'GDPR in daily life'
    },
    description: {
      it: 'Come il GDPR ti protegge quando navighi online, usi app, social media e gestisci i cookie',
      en: 'How GDPR protects you when browsing online, using apps, social media, and managing cookies'
    },
    duration: '18 min',
    order: 11,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Cookie e banner di consenso',
          en: 'Cookies and consent banners'
        }
      },
      {
        type: 'text',
        content: {
          it: 'I banner dei cookie che vedi su quasi tutti i siti web sono una conseguenza diretta del GDPR e della direttiva ePrivacy. Questi banner ti permettono di scegliere quali cookie accettare. I cookie tecnici necessari per il funzionamento del sito non richiedono consenso, ma i cookie di tracciamento e pubblicità sì.',
          en: 'The cookie banners you see on almost all websites are a direct consequence of GDPR and the ePrivacy directive. These banners allow you to choose which cookies to accept. Technical cookies necessary for the website to function do not require consent, but tracking and advertising cookies do.'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Quando vedi un banner dei cookie, prenditi il tempo di leggere le opzioni. Spesso puoi scegliere "Personalizza" o "Gestisci preferenze" invece di "Accetta tutto". Questo ti dà più controllo sui tuoi dati e riduce il tracciamento non necessario.',
          en: 'When you see a cookie banner, take the time to read the options. Often you can choose "Customize" or "Manage preferences" instead of "Accept all". This gives you more control over your data and reduces unnecessary tracking.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Privacy policy e termini di servizio',
          en: 'Privacy policies and terms of service'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Il GDPR richiede che le organizzazioni ti informino chiaramente su come utilizzano i tuoi dati. Le privacy policy devono essere scritte in un linguaggio chiaro e comprensibile, non in gergo legale incomprensibile. Devono spiegare quali dati vengono raccolti, perché, per quanto tempo, e con chi vengono condivisi.',
          en: 'GDPR requires organizations to clearly inform you about how they use your data. Privacy policies must be written in clear and understandable language, not incomprehensible legal jargon. They must explain what data is collected, why, for how long, and with whom it is shared.'
        }
      },
      {
        type: 'callout',
        variant: 'tip',
        content: {
          it: 'Anche se le privacy policy possono essere lunghe, vale la pena leggere almeno le sezioni chiave: quali dati vengono raccolti, come vengono utilizzati, e quali sono i tuoi diritti. Molti servizi ora offrono versioni "in pillole" o riassunti per facilitare la comprensione.',
          en: 'Even though privacy policies can be long, it\'s worth reading at least the key sections: what data is collected, how it\'s used, and what your rights are. Many services now offer "in a nutshell" versions or summaries to facilitate understanding.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Social media e app',
          en: 'Social media and apps'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Quando usi social media o app, stai condividendo molti dati personali. Il GDPR ti dà il diritto di sapere cosa viene raccolto e di controllare come viene utilizzato. Puoi scaricare i tuoi dati da Facebook, Instagram, Twitter e molti altri servizi utilizzando le loro funzioni di esportazione dati.',
          en: 'When you use social media or apps, you are sharing a lot of personal data. GDPR gives you the right to know what is collected and to control how it is used. You can download your data from Facebook, Instagram, Twitter, and many other services using their data export functions.'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Controlla le impostazioni sulla privacy di ogni servizio che usi',
            en: 'Check the privacy settings of every service you use'
          },
          {
            it: 'Limita la condivisione dei dati quando possibile',
            en: 'Limit data sharing when possible'
          },
          {
            it: 'Usa le funzioni di download dati per vedere cosa viene raccolto',
            en: 'Use data download functions to see what is collected'
          },
          {
            it: 'Ricorda che puoi sempre richiedere la cancellazione dei tuoi dati',
            en: 'Remember that you can always request deletion of your data'
          }
        ]
      }
    ]
  },
  {
    id: 'gdpr-practical-guide',
    slug: 'esercitare-diritti-guida-pratica',
    title: {
      it: 'Esercitare i tuoi diritti: guida pratica',
      en: 'Exercising your rights: practical guide'
    },
    description: {
      it: 'Modelli di lettere, processo passo-passo e risorse utili per esercitare efficacemente i tuoi diritti GDPR',
      en: 'Template letters, step-by-step process, and useful resources to effectively exercise your GDPR rights'
    },
    duration: '20 min',
    order: 12,
    content: [
      {
        type: 'heading',
        content: {
          it: 'Preparati prima di fare una richiesta',
          en: 'Prepare before making a request'
        }
      },
      {
        type: 'text',
        content: {
          it: 'Prima di esercitare i tuoi diritti GDPR, identifica chiaramente cosa vuoi ottenere. Vuoi solo vedere i tuoi dati? Vuoi correggerli? Vuoi cancellarli? Vuoi opporti a un trattamento specifico? Avere un obiettivo chiaro ti aiuterà a formulare una richiesta efficace.',
          en: 'Before exercising your GDPR rights, clearly identify what you want to achieve. Do you just want to see your data? Do you want to correct it? Do you want to delete it? Do you want to object to specific processing? Having a clear goal will help you formulate an effective request.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Come fare una richiesta',
          en: 'How to make a request'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Trova il punto di contatto: cerca "privacy", "protezione dati", "DPO" o "GDPR" sul sito web',
            en: 'Find the contact point: look for "privacy", "data protection", "DPO" or "GDPR" on the website'
          },
          {
            it: 'Scrivi una richiesta chiara: indica quale diritto vuoi esercitare e perché',
            en: 'Write a clear request: indicate which right you want to exercise and why'
          },
          {
            it: 'Includi le informazioni necessarie: nome, email, e qualsiasi informazione che aiuti a identificare i tuoi dati',
            en: 'Include necessary information: name, email, and any information that helps identify your data'
          },
          {
            it: 'Conserva una copia della richiesta e della risposta',
            en: 'Keep a copy of the request and response'
          }
        ]
      },
      {
        type: 'heading',
        content: {
          it: 'Modello di richiesta di accesso',
          en: 'Access request template'
        }
      },
      {
        type: 'quote',
        content: {
          it: 'Oggetto: Richiesta di accesso ai dati personali ai sensi dell\'art. 15 GDPR\n\nGentile [Nome organizzazione],\n\nAi sensi dell\'articolo 15 del Regolamento Generale sulla Protezione dei Dati (GDPR), richiedo l\'accesso ai miei dati personali che la Vostra organizzazione detiene.\n\nIn particolare, richiedo:\n- Una copia di tutti i dati personali che mi riguardano\n- Informazioni sulle finalità del trattamento\n- Le categorie di dati personali trattati\n- I destinatari o le categorie di destinatari\n- Il periodo di conservazione previsto\n- I miei diritti di rettifica, cancellazione e opposizione\n\nLe mie informazioni per l\'identificazione: [Nome, Email, altri dati utili]\n\nResto in attesa di riscontro entro il termine di legge di 30 giorni.\n\nCordiali saluti,\n[Nome]',
          en: 'Subject: Request for access to personal data under Art. 15 GDPR\n\nDear [Organization name],\n\nUnder Article 15 of the General Data Protection Regulation (GDPR), I request access to my personal data held by your organization.\n\nIn particular, I request:\n- A copy of all personal data concerning me\n- Information on the purposes of processing\n- The categories of personal data processed\n- The recipients or categories of recipients\n- The expected retention period\n- My rights to rectification, erasure, and objection\n\nMy identification information: [Name, Email, other useful data]\n\nI await your response within the legal deadline of 30 days.\n\nBest regards,\n[Name]'
        }
      },
      {
        type: 'callout',
        variant: 'info',
        content: {
          it: 'Puoi adattare questo modello per altre richieste: cancellazione, rettifica, opposizione, portabilità. Ricorda di essere specifico su cosa vuoi ottenere e di includere tutte le informazioni necessarie per identificare i tuoi dati.',
          en: 'You can adapt this template for other requests: erasure, rectification, objection, portability. Remember to be specific about what you want to achieve and to include all necessary information to identify your data.'
        }
      },
      {
        type: 'heading',
        content: {
          it: 'Risorse utili',
          en: 'Useful resources'
        }
      },
      {
        type: 'list',
        items: [
          {
            it: 'Garante per la Protezione dei Dati Personali (Italia): www.garanteprivacy.it',
            en: 'Data Protection Authority (Italy): www.garanteprivacy.it'
          },
          {
            it: 'EDPB (European Data Protection Board): edpb.europa.eu',
            en: 'EDPB (European Data Protection Board): edpb.europa.eu'
          },
          {
            it: 'Generatori di richieste GDPR online: vari strumenti gratuiti disponibili',
            en: 'Online GDPR request generators: various free tools available'
          },
          {
            it: 'Guide del Garante: materiali informativi e FAQ sul sito ufficiale',
            en: 'Authority guides: informational materials and FAQs on the official website'
          }
        ]
      },
      {
        type: 'text',
        content: {
          it: 'Ricorda: esercitare i tuoi diritti GDPR non è complicato. Le organizzazioni hanno l\'obbligo legale di rispondere alle tue richieste. Se non ricevi risposta o se la risposta non è soddisfacente, puoi sempre presentare un reclamo all\'autorità di controllo. I tuoi diritti sono importanti e vale la pena esercitarli.',
          en: 'Remember: exercising your GDPR rights is not complicated. Organizations have a legal obligation to respond to your requests. If you do not receive a response or if the response is unsatisfactory, you can always file a complaint with the supervisory authority. Your rights are important and worth exercising.'
        }
      }
    ]
  }
];
