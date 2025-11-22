# Guida al Deploy su Netlify

## 📋 Checklist Pre-Deploy

### 1. File di Configurazione
- ✅ `netlify.toml` creato e configurato
- ✅ `next.config.ts` ottimizzato per produzione
- ✅ `.gitignore` include `.env*` e `.next/`

### 2. Build Locale
Prima di pubblicare, testa il build localmente:
```bash
npm run build
npm start
```

Verifica che:
- Il build completi senza errori
- L'applicazione funzioni correttamente in modalità produzione
- Le API routes funzionino (es. `/api/news`)

### 3. Variabili d'Ambiente
**Nota**: Attualmente non ci sono variabili d'ambiente necessarie. L'API RSS funziona senza chiavi.

Se in futuro aggiungerai variabili d'ambiente:
1. Vai su Netlify Dashboard → Site settings → Environment variables
2. Aggiungi le variabili necessarie
3. Crea un file `.env.example` nel repository (senza valori sensibili)

## 🚀 Deploy su Netlify

### Metodo 1: Deploy da Git (Consigliato)

1. **Prepara il Repository**
   - Assicurati che tutto il codice sia committato e pushato su GitHub/GitLab/Bitbucket

2. **Connetti Netlify al Repository**
   - Vai su [Netlify](https://app.netlify.com)
   - Clicca "Add new site" → "Import an existing project"
   - Connetti il tuo repository Git
   - Netlify rileverà automaticamente le impostazioni da `netlify.toml`

3. **Configurazione Build** (se necessario)
   - Build command: `npm run build` (già configurato in `netlify.toml`)
   - Publish directory: `.next` (già configurato in `netlify.toml`)
   - Node version: `20` (già configurato in `netlify.toml`)

4. **Deploy**
   - Clicca "Deploy site"
   - Netlify eseguirà automaticamente il build e il deploy

### Metodo 2: Deploy Manuale (Netlify CLI)

1. **Installa Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Inizializza il sito**
   ```bash
   netlify init
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## ⚙️ Configurazioni Post-Deploy

### 1. Custom Domain (Opzionale)
- Vai su Site settings → Domain management
- Aggiungi il tuo dominio personalizzato
- Segui le istruzioni per configurare i DNS

### 2. SSL Certificate
- Netlify fornisce automaticamente certificati SSL gratuiti
- Viene attivato automaticamente dopo il primo deploy

### 3. Branch Deploys
- Netlify può deployare automaticamente ogni branch
- Utile per preview di feature branches
- Configurabile in Site settings → Build & deploy → Branch deploys

### 4. Environment Variables (se necessario in futuro)
- Site settings → Environment variables
- Aggiungi variabili per produzione, staging, etc.

## 🔍 Verifica Post-Deploy

Dopo il deploy, verifica:

1. **Homepage**
   - ✅ Carica correttamente
   - ✅ Onboarding funziona
   - ✅ Navigazione tra moduli funziona

2. **API Routes**
   - ✅ `/api/news` restituisce dati correttamente
   - ✅ Headers di cache sono presenti

3. **Performance**
   - ✅ Pagina carica velocemente
   - ✅ Assets statici sono cached
   - ✅ Immagini si caricano correttamente

4. **Mobile**
   - ✅ Layout responsive funziona
   - ✅ Touch interactions funzionano

5. **SEO**
   - ✅ Meta tags sono presenti (verifica con view-source)
   - ✅ Open Graph tags funzionano
   - ✅ Favicon è visibile

## 🐛 Troubleshooting

### Build Fallisce

**Errore: "Module not found"**
- Verifica che `package.json` includa tutte le dipendenze
- Esegui `npm install` localmente e verifica che funzioni

**Errore: "TypeScript errors"**
- Esegui `npx tsc --noEmit` localmente
- Risolvi tutti gli errori TypeScript prima del deploy

**Errore: "Out of memory"**
- Aumenta il limite di memoria in `netlify.toml`:
  ```toml
  [build.environment]
    NODE_OPTIONS = "--max-old-space-size=4096"
  ```

### API Routes Non Funzionano

**Timeout su `/api/news`**
- L'API RSS potrebbe richiedere più tempo
- Considera di aumentare il timeout in Netlify Functions settings
- Oppure implementa caching più aggressivo

**CORS Errors**
- Verifica che le richieste vengano fatte dallo stesso dominio
- Se necessario, aggiungi headers CORS in `next.config.ts`

### Performance Issues

**Lighthouse Score Basso**
- Verifica che gli assets statici siano cached correttamente
- Controlla che le immagini siano ottimizzate
- Considera di implementare lazy loading per componenti pesanti

## 📊 Monitoring

### Netlify Analytics (Opzionale)
- Attiva Netlify Analytics per monitorare traffico e performance
- Disponibile nel piano Pro o come addon

### Error Tracking
Considera di integrare:
- **Sentry**: Per error tracking
- **LogRocket**: Per session replay
- **Google Analytics**: Per analytics base

## 🔄 Continuous Deployment

Netlify supporta automaticamente:
- ✅ Deploy automatico su push a `main`/`master`
- ✅ Preview deploys per ogni PR
- ✅ Deploy notifications (email, Slack, etc.)

Configurabile in: Site settings → Build & deploy → Continuous Deployment

## 📝 Note Importanti

1. **Next.js 16 su Netlify**
   - Usa il plugin ufficiale `@netlify/plugin-nextjs`
   - Supporta automaticamente SSR, API routes, e ISR
   - Non serve configurazione aggiuntiva per routing

2. **Cache**
   - Gli assets statici sono cached automaticamente
   - Le API routes hanno cache configurata in `app/api/news/route.ts`
   - Netlify CDN gestisce automaticamente la distribuzione

3. **Limiti**
   - Funzioni serverless: 10s timeout (gratuito), 26s (Pro)
   - Build time: 15 minuti (gratuito), illimitato (Pro)
   - Bandwidth: 100GB/mese (gratuito), 1TB (Pro)

## ✅ Checklist Finale

Prima di considerare il deploy completo:

- [ ] Build locale funziona: `npm run build && npm start`
- [ ] Lint passa: `npm run lint`
- [ ] TypeScript compila: `npx tsc --noEmit`
- [ ] Testato su mobile/tablet
- [ ] API routes funzionano
- [ ] Console logs rimossi (vedi `PRODUCTION_CHECKLIST.md`)
- [ ] Meta tags verificati
- [ ] Favicon presente
- [ ] Nessun errore in console browser
- [ ] Performance accettabile (Lighthouse > 70)

## 🎉 Pronto per il Deploy!

Una volta completata la checklist, sei pronto per pubblicare su Netlify. Il file `netlify.toml` è già configurato correttamente per Next.js 16.

Buon deploy! 🚀

