/**
 * Translations for questions and actions in the city builder
 * These are dynamic content that needs to be translated based on keys
 */

import type { Locale } from './translations';

export type QuestionKey = 
  | 'q1-info-type'
  | 'q2-health-financial'
  | 'q3-how-works'
  | 'q4-media-analysis'
  | 'q5-suggestions'
  | 'q6-storage'
  | 'q7-output'
  | 'q8-protection'
  | 'q9-risks'
  | 'uq1-which-tool'
  | 'uq2-what-for'
  | 'uq3-what-share'
  | 'uq4-where-saved'
  | 'uq5-what-worries';

export type ActionKey = 
  | 'input-personal' | 'input-video' | 'input-location' | 'input-behavioral' | 'input-audio' | 'input-public' | 'input-operational' | 'input-partner'
  | 'input-health' | 'input-financial'
  | 'process-llm' | 'process-rag' | 'process-automation' | 'process-modelops'
  | 'process-biometric' | 'process-vision' | 'process-audio'
  | 'process-recommendation' | 'process-anomaly'
  | 'storage-eu' | 'storage-us' | 'storage-onprem'
  | 'output-decision' | 'output-chat' | 'output-notification' | 'output-dashboard' | 'output-export' | 'output-public'
  | 'risk-security' | 'risk-access' | 'risk-retention' | 'risk-privacy' | 'risk-backup'
  | 'impact-energy' | 'impact-social' | 'impact-political' | 'risk-oversight' | 'risk-compliance'
  | 'use-chatgpt' | 'use-gemini' | 'use-claude' | 'use-copilot' | 'use-midjourney' | 'use-translation' | 'use-voice' | 'use-other'
  | 'use-case-email' | 'use-case-documents' | 'use-case-code' | 'use-case-research' | 'use-case-creative' | 'use-case-translation-case' | 'use-case-meetings' | 'use-case-personal'
  | 'input-work' | 'input-personal-user' | 'input-sensitive' | 'input-others' | 'input-public-user'
  | 'storage-cloud-usa' | 'storage-cloud-eu' | 'storage-cloud-unknown' | 'storage-local-user'
  | 'risk-privacy-user' | 'risk-work' | 'risk-bias-user' | 'risk-decisions' | 'risk-transparency';

interface QuestionTranslations {
  label: string;
}

interface ActionTranslations {
  title: string;
  description: string;
}

const questionTranslations: Record<Locale, Record<QuestionKey, QuestionTranslations>> = {
  it: {
    'q1-info-type': { label: 'Che tipo di informazioni raccogli?' },
    'q2-health-financial': { label: 'Raccogli dati sanitari o finanziari?' },
    'q3-how-works': { label: 'Come funziona il sistema che usi?' },
    'q4-media-analysis': { label: 'Analizzi immagini, video o audio?' },
    'q5-suggestions': { label: 'Il sistema suggerisce o rileva anomalie?' },
    'q6-storage': { label: 'Dove conservi i dati?' },
    'q7-output': { label: 'Come vengono utilizzati i risultati?' },
    'q8-protection': { label: 'Chi può vedere i tuoi dati e come sono protetti?' },
    'q9-risks': { label: 'Quali rischi ti preoccupano di più?' },
    'uq1-which-tool': { label: 'Quale strumento AI stai usando?' },
    'uq2-what-for': { label: 'Per cosa lo usi?' },
    'uq3-what-share': { label: 'Che tipo di informazioni condividi?' },
    'uq4-where-saved': { label: 'Dove viene salvato quello che condividi?' },
    'uq5-what-worries': { label: 'Quali rischi ti preoccupano di più?' },
  },
  en: {
    'q1-info-type': { label: 'What type of information do you collect?' },
    'q2-health-financial': { label: 'Do you collect health or financial data?' },
    'q3-how-works': { label: 'How does the system you use work?' },
    'q4-media-analysis': { label: 'Do you analyze images, video or audio?' },
    'q5-suggestions': { label: 'Does the system suggest or detect anomalies?' },
    'q6-storage': { label: 'Where do you store the data?' },
    'q7-output': { label: 'How are the results used?' },
    'q8-protection': { label: 'Who can see your data and how is it protected?' },
    'q9-risks': { label: 'What risks concern you most?' },
    'uq1-which-tool': { label: 'Which AI tool are you using?' },
    'uq2-what-for': { label: 'What do you use it for?' },
    'uq3-what-share': { label: 'What type of information do you share?' },
    'uq4-where-saved': { label: 'Where is what you share saved?' },
    'uq5-what-worries': { label: 'What risks concern you most?' },
  },
};

const actionTranslations: Record<Locale, Record<ActionKey, ActionTranslations>> = {
  it: {
    'input-personal': { title: 'Dati delle persone', description: 'Informazioni su clienti, cittadini o utenti: nomi, email, indirizzi, numeri di telefono, dati anagrafici.' },
    'input-video': { title: 'Video e riconoscimento biometrico', description: 'Riprese video, foto per riconoscimento facciale, impronte digitali, scansioni corporee.' },
    'input-location': { title: 'Dati di localizzazione', description: 'Posizione GPS, geolocalizzazione, tracciamento spostamenti, dati di movimento.' },
    'input-behavioral': { title: 'Dati comportamentali', description: 'Come le persone navigano su internet, cosa preferiscono, profili di comportamento e interessi.' },
    'input-audio': { title: 'Registrazioni audio', description: 'Registrazioni di chiamate, conversazioni vocali, assistenti vocali, call center.' },
    'input-public': { title: 'Dati pubblici e informazioni dal web', description: 'Dati aperti, informazioni da siti web, social network, notizie online.' },
    'input-operational': { title: 'Dati tecnici e sensori', description: 'Informazioni da macchinari, dispositivi connessi, sensori, log di sistema.' },
    'input-partner': { title: 'Dati da altre aziende', description: 'Informazioni acquistate o ricevute da fornitori esterni, altre organizzazioni.' },
    'input-health': { title: 'Dati sanitari', description: 'Cartelle cliniche, dati medici, informazioni su salute e malattie, dispositivi medici connessi.' },
    'input-financial': { title: 'Dati finanziari', description: 'Informazioni bancarie, conti correnti, transazioni, dati di pagamento, credit scoring.' },
    'process-llm': { title: 'Chatbot che risponde alle domande', description: 'Sistemi che rispondono a domande, generano testi, conversano come ChatGPT.' },
    'process-rag': { title: 'Ricerca intelligente nei documenti', description: 'Sistemi che cercano informazioni in grandi archivi di documenti e rispondono a domande specifiche.' },
    'process-automation': { title: 'Calcoli e classificazioni automatiche', description: 'Sistemi che applicano regole predefinite, calcolano punteggi o classificano automaticamente.' },
    'process-modelops': { title: 'Sistema che impara da esempi', description: 'Sistemi che imparano da esempi per migliorare le loro prestazioni nel tempo.' },
    'process-biometric': { title: 'Riconoscimento di identità', description: 'Sistemi che identificano persone attraverso volti, impronte o altre caratteristiche fisiche.' },
    'process-vision': { title: 'Analisi immagini e video', description: 'Sistemi che riconoscono oggetti, scene, qualità delle immagini, analisi di contenuti visivi.' },
    'process-audio': { title: 'Elaborazione audio e voce', description: 'Sistemi che trasformano la voce in testo, analizzano il tono e le emozioni nelle registrazioni vocali.' },
    'process-recommendation': { title: 'Sistemi di raccomandazione', description: 'Sistemi che suggeriscono prodotti, contenuti o azioni personalizzate basate sulle preferenze.' },
    'process-anomaly': { title: 'Rilevamento anomalie e frodi', description: 'Sistemi che identificano comportamenti sospetti, transazioni anomale o tentativi di frode.' },
    'storage-eu': { title: 'Server in Europa', description: 'I dati vengono salvati su computer e server situati in paesi dell\'Unione Europea.' },
    'storage-us': { title: 'Server fuori dall\'Europa', description: 'I dati vengono salvati o trasferiti su server situati in paesi al di fuori dell\'Unione Europea.' },
    'storage-onprem': { title: 'Server propri o dispositivi locali', description: 'I dati vengono salvati su computer di proprietà dell\'organizzazione o su dispositivi sul campo.' },
    'output-decision': { title: 'Decisioni automatiche', description: 'Il sistema prende decisioni in modo automatico, ad esempio approva o rifiuta una richiesta.' },
    'output-chat': { title: 'Interfaccia di chat o report', description: 'Le informazioni vengono mostrate tramite chat, documenti o dashboard per essere consultate.' },
    'output-notification': { title: 'Notifiche e avvisi automatici', description: 'Il sistema invia messaggi, email o notifiche push per comunicare risultati o avvisi.' },
    'output-dashboard': { title: 'Dashboard analitiche', description: 'Visualizzazioni grafiche dei dati, statistiche, indicatori di performance e metriche.' },
    'output-export': { title: 'Export e integrazioni con altri sistemi', description: 'Esportazione dei dati, connessioni con altri software o organizzazioni tramite interfacce tecniche.' },
    'output-public': { title: 'Servizi pubblici o API', description: 'Le informazioni vengono pubblicate su portali pubblici o condivise con altre organizzazioni tramite interfacce tecniche.' },
    'risk-security': { title: 'Dati protetti (cifrati)', description: 'I dati sono protetti come in una cassaforte: solo chi ha la chiave può leggerli. Protezione contro tentativi di furto.' },
    'risk-access': { title: 'Controllo di chi accede', description: 'Solo alcune persone possono vedere i dati. Viene registrato chi accede, quando e cosa fa.' },
    'risk-retention': { title: 'Dati cancellati automaticamente', description: 'I dati vengono conservati solo per il tempo necessario e poi cancellati automaticamente. Hai diritto a chiederne la cancellazione.' },
    'risk-privacy': { title: 'Raccolta minima e dati anonimi', description: 'Vengono raccolti solo i dati necessari. I dati sensibili vengono resi difficili da identificare (anonimizzati).' },
    'risk-backup': { title: 'Copie di sicurezza', description: 'Ci sono copie di sicurezza dei dati. Cosa succede se i dati vengono persi? Come vengono ripristinati?' },
    'impact-energy': { title: 'Consumo di energia e impatto ambientale', description: 'Quanta energia elettrica usa il sistema e quali sono le emissioni di anidride carbonica prodotte.' },
    'impact-social': { title: 'Esclusione o discriminazione', description: 'Il sistema funziona per tutti o esclude alcune persone? Effetti su posti di lavoro e accessibilità.' },
    'impact-political': { title: 'Fiducia e trasparenza', description: 'Come viene costruita la fiducia? Le decisioni sono trasparenti? Ci sono pregiudizi nascosti nel sistema?' },
    'risk-oversight': { title: 'Controllo umano delle decisioni', description: 'C\'è sempre qualcuno che controlla le decisioni del sistema? Puoi chiedere una revisione umana?' },
    'risk-compliance': { title: 'Conformità alle leggi', description: 'Il sistema rispetta le leggi (GDPR, AI Act)? Viene verificato regolarmente?' },
    'use-chatgpt': { title: 'ChatGPT', description: 'Uso ChatGPT per scrivere email, testi, risposte o generare contenuti.' },
    'use-gemini': { title: 'Google Gemini', description: 'Uso Gemini per analizzare documenti, rispondere domande o generare contenuti.' },
    'use-claude': { title: 'Claude (Anthropic)', description: 'Uso Claude per lavorare con documenti, codici o conversazioni complesse.' },
    'use-copilot': { title: 'GitHub Copilot / Microsoft Copilot', description: 'Uso Copilot per scrivere codice o generare contenuti in Microsoft 365.' },
    'use-midjourney': { title: 'Midjourney / DALL-E', description: 'Uso strumenti AI per generare immagini, foto o arte.' },
    'use-translation': { title: 'Traduzione automatica', description: 'Uso strumenti AI per tradurre testi o conversazioni.' },
    'use-voice': { title: 'Assistenti vocali AI', description: 'Uso Alexa, Siri, Google Assistant o altri assistenti vocali.' },
    'use-other': { title: 'Altro strumento AI', description: 'Uso altri strumenti di intelligenza artificiale non elencati qui.' },
    'use-case-email': { title: 'Scrivere email e messaggi', description: 'Uso AI per aiutarmi a scrivere email professionali o personali.' },
    'use-case-documents': { title: 'Analizzare o revisionare documenti', description: 'Uso AI per leggere, riassumere o correggere documenti aziendali.' },
    'use-case-code': { title: 'Scrivere codice', description: 'Uso AI per aiutarmi a programmare o debuggare codice.' },
    'use-case-research': { title: 'Fare ricerche e informazioni', description: 'Uso AI per cercare informazioni, rispondere a domande o studiare.' },
    'use-case-creative': { title: 'Creare contenuti (testi, immagini)', description: 'Uso AI per generare testi creativi, immagini o altri contenuti.' },
    'use-case-translation-case': { title: 'Tradurre testi o comunicare', description: 'Uso AI per tradurre lingue o comunicare con persone di altre lingue.' },
    'use-case-meetings': { title: 'Trascrivere o riassumere riunioni', description: 'Uso AI per trascrivere chiamate, riunioni o generare riassunti.' },
    'use-case-personal': { title: 'Uso personale e hobby', description: 'Uso AI per attività personali, hobby o curiosità.' },
    'input-work': { title: 'Informazioni di lavoro', description: 'Condivido dati aziendali, documenti professionali, informazioni su clienti o colleghi.' },
    'input-personal-user': { title: 'Dati personali', description: 'Condivido il mio nome, email, indirizzo o altre informazioni personali.' },
    'input-sensitive': { title: 'Informazioni sensibili', description: 'Condivido dati sanitari, finanziari, password o informazioni molto private.' },
    'input-others': { title: 'Dati di altre persone', description: 'Condivido informazioni su clienti, colleghi, amici o familiari.' },
    'input-public-user': { title: 'Solo informazioni pubbliche', description: 'Uso solo informazioni già pubbliche o generali, nessun dato personale.' },
    'storage-cloud-usa': { title: 'Su server americani (Stati Uniti)', description: 'Lo strumento salva i dati su server negli USA (es. ChatGPT, Gemini).' },
    'storage-cloud-eu': { title: 'Su server europei', description: 'I dati vengono salvati in Europa (più protetto dalle leggi GDPR).' },
    'storage-cloud-unknown': { title: 'Non lo so / Non l\'ho controllato', description: 'Non ho verificato dove vengono salvati i dati.' },
    'storage-local-user': { title: 'Solo sul mio computer/dispositivo', description: 'Uso strumenti locali che non inviano dati su internet.' },
    'risk-privacy-user': { title: 'I miei dati personali rubati o usati male', description: 'Temo che i miei dati vengano rubati, venduti o usati senza il mio consenso.' },
    'risk-work': { title: 'Informazioni di lavoro esposte', description: 'Preoccupato che dati aziendali o informazioni confidenziali finiscano nelle mani sbagliate.' },
    'risk-bias-user': { title: 'Essere discriminato o escluso', description: 'Preoccupato che il sistema possa prendere decisioni ingiuste o discriminatorie su di me.' },
    'risk-decisions': { title: 'Decisioni automatiche sbagliate su di me', description: 'Temo che il sistema prenda decisioni importanti per me senza che possa controllarle.' },
    'risk-transparency': { title: 'Non capire cosa fa il sistema', description: 'Preoccupato di non capire come funziona e perché fa certe scelte.' },
  },
  en: {
    'input-personal': { title: 'People\'s data', description: 'Information about customers, citizens or users: names, emails, addresses, phone numbers, personal details.' },
    'input-video': { title: 'Video and biometric recognition', description: 'Video recordings, photos for facial recognition, fingerprints, body scans.' },
    'input-location': { title: 'Location data', description: 'GPS position, geolocation, movement tracking, motion data.' },
    'input-behavioral': { title: 'Behavioral data', description: 'How people browse the internet, what they prefer, behavior profiles and interests.' },
    'input-audio': { title: 'Audio recordings', description: 'Call recordings, voice conversations, voice assistants, call centers.' },
    'input-public': { title: 'Public data and web information', description: 'Open data, information from websites, social networks, online news.' },
    'input-operational': { title: 'Technical data and sensors', description: 'Information from machinery, connected devices, sensors, system logs.' },
    'input-partner': { title: 'Data from other companies', description: 'Information purchased or received from external suppliers, other organizations.' },
    'input-health': { title: 'Health data', description: 'Medical records, medical data, health and disease information, connected medical devices.' },
    'input-financial': { title: 'Financial data', description: 'Banking information, current accounts, transactions, payment data, credit scoring.' },
    'process-llm': { title: 'Chatbot that answers questions', description: 'Systems that answer questions, generate texts, converse like ChatGPT.' },
    'process-rag': { title: 'Intelligent document search', description: 'Systems that search for information in large document archives and answer specific questions.' },
    'process-automation': { title: 'Automatic calculations and classifications', description: 'Systems that apply predefined rules, calculate scores or classify automatically.' },
    'process-modelops': { title: 'System that learns from examples', description: 'Systems that learn from examples to improve their performance over time.' },
    'process-biometric': { title: 'Identity recognition', description: 'Systems that identify people through faces, fingerprints or other physical characteristics.' },
    'process-vision': { title: 'Image and video analysis', description: 'Systems that recognize objects, scenes, image quality, visual content analysis.' },
    'process-audio': { title: 'Audio and voice processing', description: 'Systems that transform voice into text, analyze tone and emotions in voice recordings.' },
    'process-recommendation': { title: 'Recommendation systems', description: 'Systems that suggest products, content or personalized actions based on preferences.' },
    'process-anomaly': { title: 'Anomaly and fraud detection', description: 'Systems that identify suspicious behavior, anomalous transactions or fraud attempts.' },
    'storage-eu': { title: 'Servers in Europe', description: 'Data is saved on computers and servers located in European Union countries.' },
    'storage-us': { title: 'Servers outside Europe', description: 'Data is saved or transferred to servers located in countries outside the European Union.' },
    'storage-onprem': { title: 'Own servers or local devices', description: 'Data is saved on organization-owned computers or field devices.' },
    'output-decision': { title: 'Automatic decisions', description: 'The system makes decisions automatically, for example approves or rejects a request.' },
    'output-chat': { title: 'Chat interface or report', description: 'Information is displayed through chat, documents or dashboards for consultation.' },
    'output-notification': { title: 'Notifications and automatic alerts', description: 'The system sends messages, emails or push notifications to communicate results or alerts.' },
    'output-dashboard': { title: 'Analytical dashboards', description: 'Graphical data visualizations, statistics, performance indicators and metrics.' },
    'output-export': { title: 'Export and integrations with other systems', description: 'Data export, connections with other software or organizations through technical interfaces.' },
    'output-public': { title: 'Public services or APIs', description: 'Information is published on public portals or shared with other organizations through technical interfaces.' },
    'risk-security': { title: 'Protected data (encrypted)', description: 'Data is protected like in a safe: only those with the key can read it. Protection against theft attempts.' },
    'risk-access': { title: 'Access control', description: 'Only some people can see the data. It is recorded who accesses, when and what they do.' },
    'risk-retention': { title: 'Automatically deleted data', description: 'Data is kept only for the necessary time and then automatically deleted. You have the right to request deletion.' },
    'risk-privacy': { title: 'Minimal collection and anonymous data', description: 'Only necessary data is collected. Sensitive data is made difficult to identify (anonymized).' },
    'risk-backup': { title: 'Backup copies', description: 'There are backup copies of the data. What happens if data is lost? How is it restored?' },
    'impact-energy': { title: 'Energy consumption and environmental impact', description: 'How much electricity the system uses and what carbon dioxide emissions are produced.' },
    'impact-social': { title: 'Exclusion or discrimination', description: 'Does the system work for everyone or exclude some people? Effects on jobs and accessibility.' },
    'impact-political': { title: 'Trust and transparency', description: 'How is trust built? Are decisions transparent? Are there hidden biases in the system?' },
    'risk-oversight': { title: 'Human oversight of decisions', description: 'Is there always someone checking the system\'s decisions? Can you request human review?' },
    'risk-compliance': { title: 'Legal compliance', description: 'Does the system comply with laws (GDPR, AI Act)? Is it regularly verified?' },
    'use-chatgpt': { title: 'ChatGPT', description: 'I use ChatGPT to write emails, texts, answers or generate content.' },
    'use-gemini': { title: 'Google Gemini', description: 'I use Gemini to analyze documents, answer questions or generate content.' },
    'use-claude': { title: 'Claude (Anthropic)', description: 'I use Claude to work with documents, code or complex conversations.' },
    'use-copilot': { title: 'GitHub Copilot / Microsoft Copilot', description: 'I use Copilot to write code or generate content in Microsoft 365.' },
    'use-midjourney': { title: 'Midjourney / DALL-E', description: 'I use AI tools to generate images, photos or art.' },
    'use-translation': { title: 'Automatic translation', description: 'I use AI tools to translate texts or conversations.' },
    'use-voice': { title: 'AI voice assistants', description: 'I use Alexa, Siri, Google Assistant or other voice assistants.' },
    'use-other': { title: 'Other AI tool', description: 'I use other artificial intelligence tools not listed here.' },
    'use-case-email': { title: 'Write emails and messages', description: 'I use AI to help me write professional or personal emails.' },
    'use-case-documents': { title: 'Analyze or review documents', description: 'I use AI to read, summarize or correct business documents.' },
    'use-case-code': { title: 'Write code', description: 'I use AI to help me program or debug code.' },
    'use-case-research': { title: 'Do research and information', description: 'I use AI to search for information, answer questions or study.' },
    'use-case-creative': { title: 'Create content (texts, images)', description: 'I use AI to generate creative texts, images or other content.' },
    'use-case-translation-case': { title: 'Translate texts or communicate', description: 'I use AI to translate languages or communicate with people of other languages.' },
    'use-case-meetings': { title: 'Transcribe or summarize meetings', description: 'I use AI to transcribe calls, meetings or generate summaries.' },
    'use-case-personal': { title: 'Personal use and hobbies', description: 'I use AI for personal activities, hobbies or curiosity.' },
    'input-work': { title: 'Work information', description: 'I share business data, professional documents, information about customers or colleagues.' },
    'input-personal-user': { title: 'Personal data', description: 'I share my name, email, address or other personal information.' },
    'input-sensitive': { title: 'Sensitive information', description: 'I share health data, financial data, passwords or very private information.' },
    'input-others': { title: 'Other people\'s data', description: 'I share information about customers, colleagues, friends or family members.' },
    'input-public-user': { title: 'Only public information', description: 'I only use information that is already public or general, no personal data.' },
    'storage-cloud-usa': { title: 'On US servers (United States)', description: 'The tool saves data on servers in the USA (e.g. ChatGPT, Gemini).' },
    'storage-cloud-eu': { title: 'On European servers', description: 'Data is saved in Europe (more protected by GDPR laws).' },
    'storage-cloud-unknown': { title: 'I don\'t know / I haven\'t checked', description: 'I haven\'t verified where the data is saved.' },
    'storage-local-user': { title: 'Only on my computer/device', description: 'I use local tools that don\'t send data over the internet.' },
    'risk-privacy-user': { title: 'My personal data stolen or misused', description: 'I fear that my data will be stolen, sold or used without my consent.' },
    'risk-work': { title: 'Work information exposed', description: 'Concerned that business data or confidential information will fall into the wrong hands.' },
    'risk-bias-user': { title: 'Being discriminated against or excluded', description: 'Concerned that the system may make unfair or discriminatory decisions about me.' },
    'risk-decisions': { title: 'Wrong automatic decisions about me', description: 'I fear that the system will make important decisions for me without me being able to control them.' },
    'risk-transparency': { title: 'Not understanding what the system does', description: 'Concerned about not understanding how it works and why it makes certain choices.' },
  },
};

export function getQuestionTranslation(locale: Locale, key: QuestionKey): string {
  return questionTranslations[locale][key]?.label || key;
}

export function getActionTranslation(locale: Locale, key: ActionKey): ActionTranslations {
  return actionTranslations[locale][key] || { title: key, description: '' };
}

