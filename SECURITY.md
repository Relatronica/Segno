# Sicurezza

## Segnalare una vulnerabilità

Non aprire una issue pubblica.

Scrivi dal form su [segno.app/segnala](https://segno.app/segnala) e indica nell'oggetto "security". Descrivi il problema, i passi per riprodurlo e l'impatto che immagini. Rispondiamo prima di qualunque divulgazione pubblica; se non rispondiamo entro qualche giorno, sollecita sullo stesso canale.

## Superficie esposta

| Area | Note |
| --- | --- |
| `/api/pipeline/*` | protetta da `PIPELINE_SECRET`; legge feed RSS esterni |
| `/redazione` | protetta da `PIPELINE_SECRET`, esclusa da robots e sitemap |
| `/api/contact` | form pubblico, invia email con Resend |
| Netlify Blobs | store dei candidati e dei segnali in produzione |

Segreti attesi: `PIPELINE_SECRET`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Stanno solo nelle variabili d'ambiente: nessuno di questi valori è versionato, e nessun `.env` deve esserlo.

## Cosa non è un problema di sicurezza

- La timeline è pubblica e il codice è aperto per scelta: la repository è pubblica, non è una fuga di informazioni.
- Il dataset è citabile e riusabile sotto CC BY 4.0: la sua copia non è una violazione.
- Un errore nel dataset è una correzione, non una vulnerabilità: va segnalato dal form.
