# Segno - Valutazione Rischi AI

Strumento interattivo per valutare i rischi e l'impatto dell'utilizzo e progettazione di sistemi AI. Scopri come proteggere i dati, rispettare GDPR e AI Act.

## 🎯 Caratteristiche

- **Onboarding Interattivo**: Guida passo-passo per definire il tuo scenario AI
- **City Builder**: Visualizza il tuo sistema AI come una città interattiva
- **Analisi Rischi**: Valutazione automatica dei rischi e conformità normativa
- **Wiki Integrata**: Documentazione su GDPR, AI Act e best practices
- **News Panel**: Aggiornamenti in tempo reale su AI, privacy e regolamentazione

## 🚀 Getting Started

### Prerequisiti

- Node.js 20 o superiore
- npm, yarn, pnpm o bun

### Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser per vedere l'applicazione.

### Script Disponibili

```bash
# Sviluppo
npm run dev

# Build di produzione
npm run build

# Avvia server di produzione
npm start

# Lint
npm run lint

# Type check
npm run type-check
```

## 📁 Struttura del Progetto

```
Segno/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Componenti UI riutilizzabili
│   └── ui/               # Componenti base (shadcn/ui)
├── modules/              # Moduli principali dell'applicazione
│   ├── onboarding/       # Modulo onboarding
│   ├── city-builder/     # Builder interattivo
│   ├── analysis/         # Analisi rischi
│   └── wiki/            # Wiki integrata
├── store/                # Zustand store (state management)
├── lib/                  # Utility functions
└── docs/                 # Documentazione
```

## 🛠️ Tecnologie

- **Next.js 16** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Framer Motion** - Animazioni
- **Radix UI** - Componenti accessibili
- **RSS Parser** - Feed news

## 📚 Documentazione

Documentazione dettagliata disponibile in `/docs`:

- [Production Checklist](./docs/PRODUCTION_CHECKLIST.md) - Checklist pre-deploy
- [Netlify Deploy Guide](./docs/NETLIFY_DEPLOY.md) - Guida al deploy su Netlify
- [News Panel Setup](./docs/NEWS_PANEL_SETUP.md) - Configurazione news panel
- [Risk Analysis](./docs/RISK_ANALYSIS_REVIEW.md) - Documentazione analisi rischi

## 🚀 Deploy

### Netlify (Consigliato)

Il progetto è configurato per il deploy su Netlify. Vedi [NETLIFY_DEPLOY.md](./docs/NETLIFY_DEPLOY.md) per istruzioni dettagliate.

**Quick Deploy:**
1. Connetti il repository a Netlify
2. Netlify rileverà automaticamente le impostazioni da `netlify.toml`
3. Il deploy partirà automaticamente

### Altri Provider

Il progetto può essere deployato su qualsiasi provider che supporta Next.js:
- Vercel
- AWS Amplify
- Railway
- Render

## 🤝 Contribuire

1. Fork del repository
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 License

Questo progetto è privato.

## 🔗 Link Utili

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [GDPR](https://gdpr.eu)
- [EU AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)

---

Costruito con ❤️ per aiutare a valutare i rischi dell'AI
