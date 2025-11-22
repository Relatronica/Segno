export type WikiArticle = {
  id: string;
  title: string;
  category: 'Legal' | 'Tech' | 'Ethical';
  summary: string;
  content: string; // Markdown supported
  relatedTerms: string[];
};

export const WIKI_ARTICLES: WikiArticle[] = [
  {
    id: 'ai-act-basics',
    title: 'AI Act: I Fondamentali',
    category: 'Legal',
    summary: 'La prima legge al mondo sull\'intelligenza artificiale spiegata semplice.',
    content: `
# Che cos'è l'AI Act?
L'AI Act è il regolamento europeo che classifica l'intelligenza artificiale in base al rischio:

1. **Rischio Inaccettabile (Vietato):** Social scoring, manipolazione subliminale, biometria in tempo reale in spazi pubblici (salvo eccezioni).
2. **Alto Rischio (Regolato):** AI in sanità, trasporti, istruzione, HR, giustizia. Richiede marcatura CE, log, supervisione umana.
3. **Rischio Limitato (Trasparenza):** Chatbot, Deepfake. Obbligo di dire "Sono una AI".
4. **Rischio Minimo (Libero):** Filtri spam, videogiochi.

## Perché ti riguarda?
Se sviluppi o usi AI in Europa, devi sapere in quale categoria ricade il tuo software per evitare multe fino al 7% del fatturato globale.
    `,
    relatedTerms: ['biometrics', 'auto-decision', 'llm', 'Chatbot LLM', 'Analisi Biometrica', 'Decisione Automatica']
  },
  {
    id: 'gdpr-schrems-ii',
    title: 'Trasferimento Dati USA (Schrems II)',
    category: 'Legal',
    summary: 'Perché non puoi semplicemente salvare i dati dei tuoi clienti su server americani.',
    content: `
# Il Problema "Cloud USA"
Nel 2020, la Corte di Giustizia UE ha invalidato il "Privacy Shield" (sentenza Schrems II).

## Cosa significa?
Le leggi di sorveglianza USA (FISA 702) permettono alla NSA/FBI di accedere ai dati sui server americani (Google, AWS, Microsoft) senza mandato del giudice. Questo viola i diritti fondamentali europei.

## Cosa devi fare?
1. **Data Residency:** Scegliere server fisicamente in UE (Francoforte, Dublino, Milano).
2. **Encryption:** Se usi server USA, i dati devono essere cifrati e tu devi tenere la chiave (BYOK).
3. **SCC:** Firmare le Clausole Contrattuali Standard.
    `,
    relatedTerms: ['cloud-usa', 'Cloud Server (USA)', 'on-prem', 'On-Premise']
  },
  {
    id: 'gdpr-art-22',
    title: 'GDPR Art. 22: Decisioni Automatiche',
    category: 'Legal',
    summary: 'Il diritto a non essere giudicati da un algoritmo senza controllo umano.',
    content: `
# Il Diritto alla Supervisione Umana
L'Art. 22 del GDPR vieta le decisioni basate **unicamente** sul trattamento automatizzato che producono effetti giuridici o impattano significativamente sulla persona.

## Cosa significa in pratica?
Se un sistema AI:
- Rifiuta un mutuo
- Scarta un CV
- Determina l'accesso a un servizio pubblico

**Deve esserci sempre un umano che controlla e può modificare la decisione.**

## Eccezioni
Il divieto non si applica se:
- La decisione è necessaria per un contratto
- C'è consenso esplicito
- È autorizzata dalla legge (es. prevenzione frodi)

## Best Practice
Anche se non obbligatorio, implementa sempre "Human in the Loop" per decisioni critiche.
    `,
    relatedTerms: ['auto-decision', 'Decisione Automatica', 'hitl', 'Human in the Loop']
  },
  {
    id: 'gdpr-art-9',
    title: 'GDPR Art. 9: Dati Biometrici e Sanitari',
    category: 'Legal',
    summary: 'Perché i dati biometrici sono "categoria speciale" e richiedono protezione extra.',
    content: `
# Categorie Particolari di Dati
L'Art. 9 del GDPR vieta il trattamento di dati che rivelano:
- Origine razziale/etnica
- Opinioni politiche
- Credenze religiose
- **Dati biometrici** (volto, impronta, voce)
- **Dati sanitari**

## Perché sono speciali?
Questi dati sono **intrinsecamente sensibili** e non possono essere "cambiati" come una password. Se compromessi, l'impatto è permanente.

## Quando puoi usarli?
Solo se:
1. **Consenso esplicito** dell'interessato
2. **Necessità legale** (es. identificazione per sicurezza)
3. **Interessi vitali** (es. emergenza medica)

## Obblighi Extra
- **DPIA obbligatoria** (Data Protection Impact Assessment)
- **Cifratura end-to-end**
- **Log di accesso** dettagliati
- **Notifica violazione** entro 72 ore
    `,
    relatedTerms: ['biometrics', 'Analisi Biometrica', 'Dati Personali']
  },
  {
    id: 'rag-explained',
    title: 'RAG (Retrieval Augmented Generation)',
    category: 'Tech',
    summary: 'Come far studiare i tuoi documenti a ChatGPT senza allucinazioni.',
    content: `
# Oltre il copia-incolla
I modelli come GPT-4 non sanno nulla della tua azienda. Se gli chiedi "Quanto ferie ho?", inventano.

## Come funziona il RAG?
1. **Retrieval (Recupero):** Il sistema cerca nel tuo manuale PDF la sezione "Ferie".
2. **Augmentation (Arricchimento):** Incolla quel testo nel prompt segreto dell'AI.
3. **Generation:** L'AI risponde usando SOLO quelle informazioni.

È il modo più sicuro per usare LLM in azienda riducendo le "allucinazioni".

## Componenti Tecnici
- **Vector Database:** Archivia i documenti come "vettori" (numeri) per ricerca semantica
- **Embedding Model:** Trasforma testo in vettori
- **LLM:** Genera la risposta finale

## Vantaggi Compliance
- I dati restano nella tua infrastruttura
- Tracciabilità: sai da quale documento viene la risposta
- Meno rischio di allucinazioni
    `,
    relatedTerms: ['rag', 'RAG / Embedding', 'vectordb', 'Vector Database', 'llm', 'Chatbot LLM']
  },
  {
    id: 'llm-transparency',
    title: 'Trasparenza AI: Quando Dire "Sono una AI"',
    category: 'Legal',
    summary: 'L\'obbligo di informare gli utenti che stanno interagendo con una macchina.',
    content: `
# AI Act Art. 50: Obbligo di Trasparenza
Se usi un sistema AI che interagisce con persone, devi informarle che stanno parlando con una macchina.

## Quando si applica?
- **Chatbot** su siti web
- **Assistenti vocali** (Alexa, Siri)
- **Avatar virtuali** che simulano persone reali
- **Deepfake** o contenuti generati

## Come comunicarlo?
Non serve un banner gigante, ma deve essere:
- **Chiaro:** "Stai parlando con un assistente AI"
- **Visibile:** Non nascosto nei termini di servizio
- **Accessibile:** Anche per utenti con disabilità

## Perché è importante?
Gli utenti hanno diritto a sapere se stanno interagendo con un umano o una macchina per prendere decisioni informate.
    `,
    relatedTerms: ['llm', 'Chatbot LLM', 'Interfaccia Chat']
  },
  {
    id: 'human-in-the-loop',
    title: 'Human in the Loop: La Supervisione Umana',
    category: 'Ethical',
    summary: 'Perché l\'AI deve sempre avere un "capo umano" per decisioni importanti.',
    content: `
# Non Lasciare l'AI da Sola
"Human in the Loop" significa che un essere umano **controlla e approva** le decisioni dell'AI prima che diventino definitive.

## Quando è Obbligatorio?
- **GDPR Art. 22:** Decisioni automatiche con effetti giuridici
- **AI Act:** Sistemi ad alto rischio (sanità, trasporti, HR)
- **Best Practice:** Qualsiasi decisione che impatta la vita delle persone

## Come Implementarlo?
1. **Pre-Review:** L'AI propone, l'umano decide
2. **Post-Review:** L'AI decide, l'umano può annullare
3. **Hybrid:** L'AI gestisce casi semplici, l'umano i complessi

## Esempi Pratici
- **HR:** L'AI filtra CV, ma un recruiter fa il colloquio finale
- **Sanità:** L'AI suggerisce diagnosi, ma il medico conferma
- **Finanza:** L'AI calcola il rischio, ma un analista approva il prestito
    `,
    relatedTerms: ['hitl', 'Human in the Loop', 'auto-decision', 'Decisione Automatica']
  },
  {
    id: 'vector-database',
    title: 'Vector Database: La Memoria dell\'AI',
    category: 'Tech',
    summary: 'Come funzionano i database che permettono all\'AI di "ricordare" i tuoi documenti.',
    content: `
# Oltre il Database Tradizionale
Un Vector Database non salva testo, ma **rappresentazioni numeriche** (vettori) che catturano il "significato" delle parole.

## Come Funziona?
1. **Embedding:** Un modello AI trasforma "Quanto ferie ho?" in un vettore di 1536 numeri
2. **Storage:** Il vettore viene salvato nel database insieme al documento originale
3. **Search:** Quando cerchi, confronti i vettori (non le parole) per trovare documenti "simili nel significato"

## Vantaggi
- **Ricerca Semantica:** Trova "vacanze" anche se cerchi "ferie"
- **Multilingua:** Funziona anche tra lingue diverse
- **Scalabile:** Gestisce milioni di documenti

## Esempi di Uso
- **RAG Systems:** Chatbot aziendali che rispondono basandosi su manuali interni
- **Ricerca Documentale:** Trovare documenti per concetto, non per parola chiave
- **Raccomandazioni:** "Documenti simili a questo"
    `,
    relatedTerms: ['vectordb', 'Vector Database', 'rag', 'RAG / Embedding']
  },
  {
    id: 'data-residency',
    title: 'Data Residency: Dove Risiedono i Tuoi Dati?',
    category: 'Legal',
    summary: 'La differenza tra Cloud UE, USA e On-Premise dal punto di vista legale.',
    content: `
# La Geografia dei Dati
Dove fisicamente risiedono i tuoi dati determina quali leggi si applicano e quali rischi corri.

## Cloud Server (UE)
✅ **Vantaggi:**
- Dati sotto giurisdizione GDPR
- Nessun trasferimento extra-UE
- Conformità automatica con Schrems II

⚠️ **Considerazioni:**
- Costi leggermente superiori
- Alcuni servizi potrebbero non essere disponibili

## Cloud Server (USA)
❌ **Rischi:**
- FISA 702 permette accesso governativo senza mandato
- Privacy Shield invalidato (Schrems II)
- Richiede misure supplementari (SCC + Encryption)

✅ **Se devi usarlo:**
- Cifratura end-to-end con chiavi in UE (BYOK)
- Clausole Contrattuali Standard (SCC)
- Data Processing Agreement con provider

## On-Premise
✅ **Massimo Controllo:**
- Dati fisicamente nella tua azienda
- Nessun trasferimento
- Conformità totale GDPR

⚠️ **Svantaggi:**
- Costi infrastruttura
- Manutenzione interna
- Scalabilità limitata
    `,
    relatedTerms: ['cloud-usa', 'Cloud Server (USA)', 'Cloud Server (UE)', 'on-prem', 'On-Premise']
  }
];
