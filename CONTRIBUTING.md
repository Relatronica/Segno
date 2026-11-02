# Contribuire a Segno

Segno è codice e dataset insieme. Le due cose si contribuiscono in modo diverso, e le due licenze sono diverse.

## Setup

```bash
npm install
npm run dev
```

Prima di aprire una pull request:

```bash
npm run lint
npm run type-check
npm run build
```

## Contributi al dataset

Il dataset curato è in `lib/data/`. Ogni evento richiede:

- `sourceUrl` valido — fonte primaria o testata citabile, mai un aggregatore;
- una citazione testuale verificabile, quando l'evento entra nella curva di tono;
- il tono (`sentiment`) solo sulla citazione, mai sul titolo che la riassume.

Un evento senza fonte non entra. Se un dato è incerto, meglio lasciarlo fuori e aprire una issue che lo segnali.

Per correzioni, fonti mancanti o nuovi dati c'è anche il form su `/segnala`: va bene usarlo al posto di una pull request.

## Contributi al codice

Sono benvenuti bug fix, accessibilità, prestazioni e i test che oggi mancano. Per cambi su interfaccia o struttura apri prima una issue: il progetto ha una direzione visiva precisa e preferisce discuterla prima di rivedere il codice.

## DCO — firma obbligatoria

Ogni commit deve avere un `Signed-off-by`:

```bash
git commit -s -m "Fix timeline scrub on touch devices"
```

Il `-s` aggiunge al messaggio:

```
Signed-off-by: Nome Cognome <email@example.com>
```

Firmare significa che hai il diritto di inviare quel contributo e che accetti di rilasciarlo con le licenze del progetto. Non serve un CLA separato: la firma mantiene la possibilità, per il progetto, di riusare il proprio codice in futuro, incluso il relicensing. Le pull request senza firma vengono chiuse, non corrette a mano.

## Licenze dei contributi

- Codice → [AGPL-3.0-or-later](LICENSE)
- Dati, citazioni e testi → [CC BY 4.0](LICENSE-CONTENT)

Non inserire immagini, font o dataset di terzi senza licenza compatibile e senza attribuzione documentata nel file. Le immagini senza provenienza dichiarata vengono rifiutate.

## Questioni di sicurezza

Non aprire issue pubbliche: vedi [SECURITY.md](SECURITY.md).
