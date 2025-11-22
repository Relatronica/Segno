# Analisi delle Domande - Orientamento Utente vs Progettista

## 🎯 Obiettivo del Sistema
**Far capire alle persone i rischi dell'utilizzo dell'IA**

L'obiettivo non è formare tecnici che progettano sistemi AI, ma **educare utenti finali** su cosa significa utilizzare sistemi AI e quali rischi comportano.

---

## 📋 Analisi delle Domande Attuali

### 1. Domande in CITY_ACTION_GROUPS (City Builder)

Queste sono le domande mostrate quando l'utente costruisce lo scenario:

#### ✅ Buone (orientate all'utente)
- "Che tipo di informazioni raccogli?" 
- "Dove conservi i dati?"
- "Come vengono utilizzati i risultati?"

#### ⚠️ Problematiche (troppo tecniche)
- "Come analizzi queste informazioni?" → presuppone conoscenze tecniche
- "Come proteggi i dati e chi può accedervi?" → richiede competenze di sicurezza informatica
- "Quali controlli e impatti vuoi monitorare?" → troppo astratta

#### ❌ Critiche (orientate al progettista)
- "Addestramento di modelli di intelligenza artificiale" → chi USA l'IA non addestra modelli
- "Crittografia dei dati, protezione degli accessi" → dettagli tecnici per chi implementa

---

### 2. Domande in noteKnowledge.ts (Note sui Blocchi Rischio)

Queste appaiono quando l'utente clicca su un blocco di rischio:

#### ❌ TUTTE ORIENTATE AL PROGETTISTA

**Esempi critici**:

1. **"Chi verifica le decisioni del sistema? Con quale frequenza?"**
   - ✅ Problema: Un utente finale che USA un chatbot non può decidere chi verifica
   - ❌ Questa è una domanda per chi PROGETTA il sistema
   - ✨ Dovrebbe essere: "Quando usi un chatbot, chi controlla le sue risposte?"

2. **"Hai minimizzato i dati raccolti? Usato pseudonimizzazione?"**
   - ✅ Problema: L'utente che USA l'IA spesso non ha controllo su questo
   - ❌ Questa è una domanda per chi RACCOGLIE i dati
   - ✨ Dovrebbe essere: "Sai quali dati il sistema raccoglie su di te?"

3. **"I dati sono cifrati? Chi ha accesso? Come rilevi intrusioni?"**
   - ✅ Problema: Domanda per IT Security / DevOps
   - ❌ L'utente finale non sa rispondere a questa
   - ✨ Dovrebbe essere: "Sai dove vengono salvati i tuoi dati? Sono protetti?"

4. **"Hai documentato origine e contenuto del dataset? È aggiornato?"**
   - ✅ Problema: Chiara domanda per Data Scientist / ML Engineer
   - ❌ L'utente finale non addestra modelli
   - ✨ Dovrebbe essere: "Sai su quali dati è stato addestrato il sistema che usi?"

5. **"Come rilevi quando il modello si degrada o produce output errati?"**
   - ✅ Problema: Domanda per ML Ops / Data Engineer
   - ❌ L'utente finale non monitora modelli
   - ✨ Dovrebbe essere: "Come fai a capire se il sistema ti sta dando informazioni sbagliate?"

---

## 🔍 Problema Fondamentale

### Persona Attuale (sbagliata)
- **Chi**: Progettista/Developer/Security Officer
- **Ruolo**: Progetta, implementa, mantiene sistemi AI
- **Conoscenze**: Tecniche (ML, sicurezza, compliance)
- **Potere**: Può modificare il sistema

### Persona Target (corretta)
- **Chi**: Utente finale / Cittadino / Dipendente / Consumatore
- **Ruolo**: USA sistemi AI (chatbot, raccomandazioni, ricerca)
- **Conoscenze**: Base, non tecniche
- **Potere**: Limitato, spesso solo può scegliere se usare o meno

---

## 💡 Raccomandazioni: Riformulare le Domande

### Principio Guida
**Le domande devono aiutare l'utente a:**
1. ✅ Capire COSA sta facendo quando usa l'IA
2. ✅ Identificare QUANDO ci sono rischi
3. ✅ Sapere COME proteggersi
4. ✅ Comprendere quali DIRITTI ha

**NON devono:**
- ❌ Chiedere come implementare sicurezza
- ❌ Richiedere competenze tecniche
- ❌ Presupporre controllo sul sistema

---

### Domande da Riformulare (noteKnowledge.ts)

#### Esempio 1: Supervisione Umana

**❌ ATTUALE** (per progettista):
```
"Chi verifica le decisioni del sistema? Con quale frequenza?"
```

**✅ PROPOSTA** (per utente):
```
"Quando il sistema prende una decisione su di te (es. approvare un prestito), c'è qualcuno che la controlla? Come puoi chiedere una revisione?"
```

**Oppure, più semplice**:
```
"Se il sistema sbaglia, puoi chiedere a una persona di rivedere la decisione?"
```

---

#### Esempio 2: Privacy by Design

**❌ ATTUALE** (per progettista):
```
"Hai minimizzato i dati raccolti? Usato pseudonimizzazione?"
```

**✅ PROPOSTA** (per utente):
```
"Quanti dati personali stai condividendo? Il sistema raccoglie solo quello che serve o anche di più?"
```

**Oppure**:
```
"Conosci quali dati vengono salvati su di te? Potresti chiedere che ne raccolgano meno?"
```

---

#### Esempio 3: Sicurezza Informatica

**❌ ATTUALE** (per progettista):
```
"I dati sono cifrati? Chi ha accesso? Come rilevi intrusioni?"
```

**✅ PROPOSTA** (per utente):
```
"Dove vengono salvati i tuoi dati? Sono protetti? Cosa succede se qualcuno li ruba?"
```

**Oppure**:
```
"Hai mai chiesto al fornitore del servizio come protegge i tuoi dati?"
```

---

#### Esempio 4: Dataset Ombra

**❌ ATTUALE** (per progettista):
```
"Hai documentato origine e contenuto del dataset? È aggiornato?"
```

**✅ PROPOSTA** (per utente):
```
"Su quali informazioni è stato addestrato questo sistema? Potrebbero contenere pregiudizi o dati obsoleti?"
```

**Oppure, più semplice**:
```
"Da dove vengono le informazioni che il sistema usa per funzionare? Potrebbero essere incomplete o sbagliate?"
```

---

#### Esempio 5: Monitoraggio Modelli

**❌ ATTUALE** (per progettista):
```
"Come rilevi quando il modello si degrada o produce output errati?"
```

**✅ PROPOSTA** (per utente):
```
"Come fai a capire se il sistema ti sta dando informazioni sbagliate? Chi controlla che funzioni sempre bene?"
```

**Oppure**:
```
"Hai mai ricevuto risposte sbagliate dal sistema? Come le hai verificate?"
```

---

#### Esempio 6: Consenso

**❌ ATTUALE** (per progettista):
```
"Il consenso è libero, specifico, informato e revocabile?"
```

**✅ PROPOSTA** (per utente):
```
"Quando hai accettato di usare questo sistema, sapevi esattamente cosa avrebbero fatto con i tuoi dati? Puoi dire "no" quando vuoi?"
```

**Oppure**:
```
"Capisci cosa stai dando in cambio quando accetti di usare questo servizio? Puoi smettere quando vuoi?"
```

---

#### Esempio 7: Trasferimento Extra-UE

**❌ ATTUALE** (per progettista):
```
"Hai verificato che il paese destinatario abbia protezioni adeguate?"
```

**✅ PROPOSTA** (per utente):
```
"I tuoi dati vengono salvati in Europa o all'estero? Sai quali rischi comporta salvarli fuori dall'UE?"
```

**Oppure**:
```
"Quando hai dato i tuoi dati, sapevi che potrebbero finire su server negli Stati Uniti o in altri paesi?"
```

---

## 📝 Domande Alternative per CITY_ACTION_GROUPS

### ❌ Attuale: "Come proteggi i dati e chi può accedervi?"

**✅ Proposta 1** (più semplice):
```
"DOMANDA: Chi può vedere i tuoi dati?"
```

**✅ Proposta 2** (orientata all'utente):
```
"DOMANDA: Hai controllo su chi accede ai tuoi dati?"
```

**Azioni proposte**:
- "Non lo so / Non ho controllo" → Aggiunge rischio alto
- "Solo io e il fornitore del servizio" → Aggiunge controllo base
- "Persone specifiche che autorizzo" → Aggiunge controllo avanzato

---

### ❌ Attuale: "Come analizzi queste informazioni?"

**✅ Proposta** (meno tecnica):
```
"DOMANDA: Come funziona il sistema che usi?"
```

**Azioni proposte**:
- "Un chatbot che risponde alle mie domande"
- "Un sistema che suggerisce contenuti (come Netflix)"
- "Un sistema che analizza documenti per me"
- "Un sistema che prende decisioni automatiche"

---

### ❌ Attuale: "Quali controlli e impatti vuoi monitorare?"

**✅ Proposta**:
```
"DOMANDA: Quali rischi ti preoccupano di più?"
```

**Azioni proposte**:
- "Che i miei dati vengano rubati o usati male"
- "Che il sistema prenda decisioni sbagliate su di me"
- "Che qualcuno mi discrimini o mi escluda"
- "Che il sistema consumi troppa energia"
- "Che nessuno controlli cosa fa il sistema"

---

## 🎯 Categorie di Domande per Utenti Finali

### 1. **Consapevolezza** ("Cosa sto facendo?")
- "Che tipo di informazioni sto dando al sistema?"
- "Sapete dove vanno a finire i miei dati?"
- "Cosa fa esattamente questo sistema?"

### 2. **Rischi** ("Cosa può andare storto?")
- "Cosa succede se il sistema sbaglia?"
- "I miei dati sono al sicuro?"
- "Posso essere discriminato da questo sistema?"

### 3. **Diritti** ("Cosa posso fare?")
- "Posso dire no quando voglio?"
- "Posso chiedere che cancellino i miei dati?"
- "Posso contestare una decisione automatica?"

### 4. **Controllo** ("Chi ha il potere?")
- "Chi controlla questo sistema?"
- "Chi può vedere i miei dati?"
- "Chi risponde se qualcosa va storto?"

---

## 🔄 Struttura Proposta per noteKnowledge.ts

Invece di domande tecniche, usare:

### Formato: "Cosa significa per te?"

```typescript
'Supervisione Umana': {
  simpleExplanation: 'Non lasciare che sia solo la macchina a decidere...',
  
  // ❌ RIMUOVERE: question tecnica
  // question: 'Chi verifica le decisioni del sistema? Con quale frequenza?',
  
  // ✅ AGGIUNGERE: domande per utente finale
  userQuestions: [
    "Se il sistema prende una decisione su di te (es. rifiuta un prestito), c'è qualcuno che la controlla?",
    "Puoi chiedere che una persona umana riveda la decisione?",
    "Hai mai provato a contestare una decisione automatica?"
  ],
  
  // ✅ AGGIUNGERE: cosa fare
  whatYouCanDo: [
    "Leggere le condizioni del servizio per vedere se c'è revisione umana",
    "Chiedere al fornitore come puoi contestare decisioni automatiche",
    "Esercitare il tuo diritto GDPR (Art. 22) di non essere soggetto a decisioni solo automatiche"
  ],
  
  // ✅ AGGIUNGERE: quando è un problema
  redFlags: [
    "Il sistema decide tutto automaticamente senza possibilità di appello",
    "Non c'è modo di parlare con una persona se qualcosa va storto",
    "Non ti hanno informato che le decisioni sono automatiche"
  ],
  
  // Mantenere regolamento per riferimento
  regulation: { ... }
}
```

---

## 📊 Matrice: Attuale vs Proposta

| Categoria | Attuale (Progettista) | Proposta (Utente Finale) |
|-----------|----------------------|-------------------------|
| **Chi** | Chi progetta il sistema | Chi usa il sistema |
| **Focus** | Come implementare | Cosa significa per me |
| **Linguaggio** | Tecnico (cifratura, pseudonimizzazione) | Semplice (dati protetti, dati anonimi) |
| **Azione** | Configurare controlli | Capire rischi e diritti |
| **Domande** | "Come fai X?" | "Cosa significa per te X?" |
| **Obiettivo** | Compliance tecnica | Consapevolezza e empowerment |

---

## ✅ Checklist per Nuove Domande

Prima di aggiungere una domanda, chiediti:

- [ ] Un utente NON tecnico può rispondere?
- [ ] La domanda aiuta a capire un RISCHIO?
- [ ] Usa linguaggio semplice?
- [ ] Si concentra su "cosa significa per me" non "come implementare"?
- [ ] Aiuta a prendere decisioni informate?
- [ ] Non presuppone controllo tecnico sul sistema?

---

## 🚀 Prossimi Passi

1. **Riformulare noteKnowledge.ts** 
   - Convertire domande da tecniche a orientate utente
   - Aggiungere sezioni `userQuestions`, `whatYouCanDo`, `redFlags`

2. **Rivedere CITY_ACTION_GROUPS**
   - Semplificare domande tecniche
   - Aggiungere opzioni per utenti senza controllo tecnico

3. **Testare con utenti reali**
   - Verificare che utenti NON tecnici capiscano
   - Misurare se aumentano consapevolezza rischi

4. **Aggiungere strumenti di empowerment**
   - Non solo "sai che c'è un rischio" ma "cosa puoi fare"
   - Link a diritti GDPR in linguaggio semplice
   - Template per chiedere informazioni ai fornitori

---

**Data Analisi**: 2024  
**Stato**: ⚠️ Richiede Riformulazione Domande
