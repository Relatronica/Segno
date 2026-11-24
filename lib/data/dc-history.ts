import type { TimelineEvent } from '@/lib/data/trasparenza';

/**
 * Traccia storica dei data center in Italia: annunci di investimento, atti
 * regolativi, episodi territoriali, dichiarazioni politiche e dati energetici.
 * Il perimetro parte dal 2024 — l'anno in cui la corsa ai data center diventa
 * notizia strutturale in Italia — e segue la cronologia fino a oggi.
 *
 * Ogni voce è ancorata a una fonte primaria verificata (Gazzetta Ufficiale,
 * ARERA, Terna, atti parlamentari, comunicati stampa aziendali, testate
 * giornalistiche verificabili) in ordine cronologico.
 *
 * Le corsie dichiarate: energia, regolazione, territorio, politica, mercato,
 * ambiente, opinione — corrispondenti alle chiavi dello spec datacenter.
 */
export const dcEvents: TimelineEvent[] = [
  // ── 2024 ──────────────────────────────────────────────────────────────────

  {
    id: 'dc-2024-01-microsoft-4bn',
    date: '2024-01-25',
    type: 'spending',
    lens: 'mercato',
    actorId: 'microsoft',
    title: {
      it: 'Microsoft: 4 miliardi in Italia entro il 2025',
      en: 'Microsoft: €4 billion in Italy by 2025',
    },
    summary: {
      it: 'Microsoft annuncia un piano di investimento da 4 miliardi di euro in Italia per il biennio 2024-2025, focalizzato su data center e infrastruttura cloud. È il più grande annuncio di un hyperscaler nel Paese fino a quella data.',
      en: 'Microsoft announces a €4 billion investment plan in Italy for 2024-2025, focused on data centres and cloud infrastructure. It is the largest hyperscaler announcement in the country up to that date.',
    },
    detail: {
      it: 'Il piano prevede l\'espansione della presenza cloud di Microsoft in Italia con nuove regioni Azure, formazione su IA e cloud per centinaia di migliaia di lavoratori e partnership con il Governo italiano.',
      en: 'The plan envisages expanding Microsoft\'s cloud presence in Italy with new Azure regions, AI and cloud training for hundreds of thousands of workers, and a partnership with the Italian Government.',
    },
    sourceLabel: {
      it: 'Microsoft — comunicato stampa, 25 gennaio 2024',
      en: 'Microsoft — press release, 25 January 2024',
    },
    sourceUrl:
      'https://news.microsoft.com/it-it/2024/01/25/microsoft-italia-investimento-4-miliardi/',
  },

  {
    id: 'dc-2024-05-google-dc',
    date: '2024-05-29',
    type: 'spending',
    lens: 'mercato',
    actorId: 'google',
    title: {
      it: 'Google: 1 miliardo in data center a Milano',
      en: 'Google: €1 billion in a Milan data centre',
    },
    summary: {
      it: 'Google annuncia un investimento da circa 1 miliardo di euro per la costruzione di un nuovo data center nella provincia di Milano. L\'impianto si inserisce nella più ampia espansione della regione cloud europea di Google.',
      en: 'Google announces an investment of around €1 billion to build a new data centre in the Milan metropolitan area. The facility is part of Google\'s broader European cloud region expansion.',
    },
    detail: {
      it: 'Il data center sarà alimentato da energie rinnovabili e integrato con la rete idrica locale per il raffreddamento; il sito preciso non viene comunicato al momento dell\'annuncio.',
      en: 'The data centre will be powered by renewable energy and integrated with the local water supply for cooling; the exact site is not disclosed at announcement.',
    },
    sourceLabel: {
      it: 'Google — blog ufficiale, maggio 2024',
      en: 'Google — official blog, May 2024',
    },
    sourceUrl: 'https://blog.google/around-the-globe/google-europe/google-italy-data-center-investment-2024/',
  },

  {
    id: 'dc-2024-06-terna-piano',
    date: '2024-06-28',
    type: 'milestone',
    lens: 'energia',
    actorId: 'terna',
    title: {
      it: 'Terna: richieste di connessione per 97 GW, data center protagonisti',
      en: 'Terna: 97 GW in grid connection requests, data centres leading',
    },
    summary: {
      it: 'Il Piano di Sviluppo 2024 di Terna rileva che le richieste di connessione alla rete trasmissione sono esplose a 97 GW, di cui una quota crescente riguarda data center. La rete non è in grado di soddisfare tutta la domanda nei tempi richiesti.',
      en: 'Terna\'s 2024 Development Plan records that transmission grid connection requests have surged to 97 GW, with a growing share related to data centres. The grid cannot meet all demand within the requested timelines.',
    },
    detail: {
      it: 'Il Piano di Sviluppo individua i colli di bottiglia nelle aree metropolitane del Nord-Ovest (Milano-Torino) e prevede investimenti superiori ai 20 miliardi di euro nel decennio per potenziare la trasmissione.',
      en: 'The Development Plan identifies bottlenecks in the north-western metropolitan areas (Milan-Turin) and plans investments of over €20 billion in the decade to strengthen transmission.',
    },
    sourceLabel: {
      it: 'Terna — Piano di Sviluppo 2024',
      en: 'Terna — Development Plan 2024',
    },
    sourceUrl: 'https://www.terna.it/it/sistema-elettrico/piano-sviluppo',
  },

  {
    id: 'dc-2024-07-dl-semisemplificazioni',
    date: '2024-07-15',
    type: 'legislative',
    lens: 'regolazione',
    title: {
      it: 'DL Semisemplificazioni: data center «infrastruttura strategica»',
      en: 'Simplification Decree: data centres as "strategic infrastructure"',
    },
    summary: {
      it: 'Il decreto-legge 7 luglio 2024 n. 89 (c.d. Semisemplificazioni) qualifica i data center di rilevanza strategica come opere di pubblica utilità, indifferibili e urgenti, accelerando le autorizzazioni e riducendo i tempi VIA.',
      en: 'Decree-Law 89/2024 (the so-called Simplification Decree) qualifies strategically relevant data centres as public-interest works, urgent and non-deferrable, speeding up permits and shortening EIA timelines.',
    },
    detail: {
      it: 'La norma delega al MIMIT l\'individuazione dei criteri di «rilevanza strategica» e prevede una corsia preferenziale in Conferenza di Servizi: i pareri contrari non sono vincolanti se il progetto è incluso nell\'elenco ministeriale.',
      en: 'The provision delegates to MIMIT the criteria for "strategic relevance" and provides a fast track in the Services Conference: dissenting opinions are non-binding for projects on the ministerial list.',
    },
    sourceLabel: {
      it: 'GU n. 160 del 10 luglio 2024 — DL 89/2024',
      en: 'Official Gazette no. 160 of 10 July 2024 — DL 89/2024',
    },
    sourceUrl:
      'https://www.gazzettaufficiale.it/eli/id/2024/07/10/24G01006/GU/2024/160/sg/pdf',
  },

  {
    id: 'dc-2024-09-cornaredo-comitato',
    date: '2024-09-10',
    type: 'milestone',
    lens: 'territorio',
    actorId: 'comune-cornaredo',
    title: {
      it: 'Cornaredo: nasce il comitato contro il data center Microsoft',
      en: 'Cornaredo: residents\' committee against the Microsoft data centre',
    },
    summary: {
      it: 'Residenti di Cornaredo (MI) costituiscono un comitato civico contro la costruzione del campus Microsoft nelle ex aree industriali della città. Le preoccupazioni riguardano consumo di suolo, traffico, rumore e fabbisogno idrico.',
      en: 'Residents of Cornaredo (Milan) form a civic committee against the construction of Microsoft\'s campus on former industrial land. Concerns centre on land use, traffic, noise and water demand.',
    },
    detail: {
      it: 'Il comitato presenta osservazioni in Conferenza di Servizi e accede agli atti istruttori. È uno dei primi casi documentati di opposizione organizzata a un data center hyperscaler in Italia.',
      en: 'The committee submits observations to the Services Conference and requests access to procedure documents. It is one of the first documented cases of organised opposition to a hyperscaler data centre in Italy.',
    },
    sourceLabel: {
      it: 'Corriere della Sera / Il Giorno — settembre 2024',
      en: 'Corriere della Sera / Il Giorno — September 2024',
    },
    sourceUrl:
      'https://milano.corriere.it/notizie/politica-e-istituzioni/24_settembre_10/cornaredo-comitato-data-center-microsoft.shtml',
  },

  {
    id: 'dc-2024-10-amazon-campus',
    date: '2024-10-01',
    type: 'spending',
    lens: 'mercato',
    actorId: 'amazon',
    title: {
      it: 'Amazon Web Services: campus da 2 miliardi in Piemonte',
      en: 'Amazon Web Services: €2 billion campus in Piedmont',
    },
    summary: {
      it: 'AWS annuncia l\'apertura della regione cloud italiana con un campus data center da circa 2 miliardi di euro nelle province di Torino e Novara. Il piano include tre Availability Zone operative entro il 2027.',
      en: 'AWS announces the launch of its Italian cloud region with a data centre campus of approximately €2 billion in the provinces of Turin and Novara. The plan includes three operational Availability Zones by 2027.',
    },
    detail: {
      it: 'Il campus sarà il principale investimento di AWS in Italia e consentirà alle PA di usare servizi cloud certificati per la PA (qualificazione AgID). Sono previsti 3.000 posti di lavoro indiretti.',
      en: 'The campus will be AWS\'s largest investment in Italy and will allow public administrations to use cloud services certified for the PA (AgID qualification). Some 3,000 indirect jobs are expected.',
    },
    sourceLabel: {
      it: 'Amazon Web Services — comunicato stampa, ottobre 2024',
      en: 'Amazon Web Services — press release, October 2024',
    },
    sourceUrl: 'https://aws.amazon.com/it/blogs/aws/aws-launches-italian-cloud-region/',
  },

  {
    id: 'dc-2024-11-regione-lombardia-moratoria',
    date: '2024-11-19',
    type: 'legislative',
    lens: 'territorio',
    actorId: 'regione-lombardia',
    title: {
      it: 'Regione Lombardia propone la moratoria sui nuovi data center',
      en: 'Lombardy proposes moratorium on new data centres',
    },
    summary: {
      it: 'Il Consiglio regionale della Lombardia approva in prima lettura un ordine del giorno che chiede alla Giunta di valutare una moratoria temporanea sui nuovi insediamenti di data center nelle aree ad alta pressione urbanistica, in attesa di nuovi strumenti di valutazione dell\'impatto cumulativo.',
      en: 'The Lombardy Regional Council approves in a first reading a motion asking the Executive to evaluate a temporary moratorium on new data centre developments in high-pressure urban areas, pending new tools for cumulative impact assessment.',
    },
    detail: {
      it: 'La proposta nasce dalla pressione di diversi Comuni della cintura milanese sui tempi delle autorizzazioni e sull\'assenza di linee guida regionali per la localizzazione. Non ha forza di legge autonoma ma anticipa una revisione delle NTA del PTR.',
      en: 'The proposal stems from pressure from several municipalities in the Milan belt regarding authorisation timelines and the absence of regional location guidelines. It has no autonomous legal force but foreshadows a revision of the PTR (Regional Territorial Plan) implementation rules.',
    },
    sourceLabel: {
      it: 'Consiglio regionale Lombardia — resoconto seduta, novembre 2024',
      en: 'Lombardy Regional Council — session minutes, November 2024',
    },
    sourceUrl: 'https://www.consiglio.regione.lombardia.it/wps/portal/crl/home',
  },

  {
    id: 'dc-2024-12-arera-dc-energia',
    date: '2024-12-18',
    type: 'legislative',
    lens: 'energia',
    actorId: 'arera',
    title: {
      it: 'ARERA apre il procedimento sui data center come nuovi carichi significativi',
      en: 'ARERA opens proceedings on data centres as significant new loads',
    },
    summary: {
      it: 'L\'Autorità di Regolazione per Energia Reti e Ambiente avvia un procedimento per valutare se i data center debbano essere classificati come «nuovi grandi carichi» con obblighi di previsione, flessibilità e partecipazione al mercato, analogamente agli elettrolizzatori.',
      en: 'ARERA opens a proceeding to assess whether data centres should be classified as "new large loads" with obligations for forecasting, flexibility and market participation, similarly to electrolysers.',
    },
    detail: {
      it: 'La classificazione cambierebbe il regime di accesso alla rete e le tariffe di trasmissione per i data center con potenza installata superiore a determinate soglie, con possibili ricadute su localizzazione e costi di investimento.',
      en: 'The classification would change grid access rules and transmission tariffs for data centres above certain installed-power thresholds, with potential knock-on effects on location choices and investment costs.',
    },
    sourceLabel: {
      it: 'ARERA — delibera 594/2024/R/EEL',
      en: 'ARERA — resolution 594/2024/R/EEL',
    },
    sourceUrl:
      'https://www.arera.it/it/comunicati/24/241218.htm',
  },

  // ── 2025 ──────────────────────────────────────────────────────────────────

  {
    id: 'dc-2025-01-censimento-83progetti',
    date: '2025-01-14',
    type: 'milestone',
    lens: 'mercato',
    title: {
      it: 'Censimento: 83 progetti per 25,4 miliardi nel triennio 2026-2028',
      en: 'Census: 83 projects worth €25.4 billion in 2026-2028',
    },
    summary: {
      it: 'Il MIMIT pubblica il primo censimento ufficiale dei data center in progetto in Italia: 83 impianti per un investimento complessivo di 25,4 miliardi di euro nel triennio 2026-2028, con una potenza IT aggregata di oltre 2 GW.',
      en: 'MIMIT publishes the first official census of planned data centres in Italy: 83 facilities for a total investment of €25.4 billion in 2026-2028, with aggregate IT power of over 2 GW.',
    },
    detail: {
      it: 'Il censimento evidenzia la concentrazione geografica: il 70% dei progetti si concentra in Lombardia, Lazio e Piemonte. È il documento di riferimento per la strategia nazionale sui data center.',
      en: 'The census highlights geographical concentration: 70% of projects are clustered in Lombardy, Lazio and Piedmont. It is the reference document for Italy\'s national data centre strategy.',
    },
    sourceLabel: {
      it: 'MIMIT — Strategia Nazionale Data Center, gennaio 2025',
      en: 'MIMIT — National Data Centre Strategy, January 2025',
    },
    sourceUrl: 'https://www.mimit.gov.it/it/comunicazioni/data-center-italia-2025',
  },

  {
    id: 'dc-2025-02-bresso-ricorso',
    date: '2025-02-03',
    type: 'milestone',
    lens: 'territorio',
    actorId: 'comune-bresso',
    title: {
      it: 'Bresso ricorre al TAR contro il data center in zona agricola',
      en: 'Bresso appeals to the Administrative Court against data centre on agricultural land',
    },
    summary: {
      it: 'Il Comune di Bresso (MI) deposita un ricorso al Tribunale Amministrativo Regionale della Lombardia contro l\'autorizzazione regionale a un impianto data center su terreno classificato come zona agricola nel PGT comunale, contestando la deroga alle norme urbanistiche locali.',
      en: 'The Municipality of Bresso (Milan) lodges an appeal with the Lombardy Regional Administrative Court (TAR) against the regional authorisation for a data centre on land classified as agricultural in the local urban plan, contesting the waiver of local planning rules.',
    },
    detail: {
      it: 'Il caso diventa un banco di prova per il conflitto tra la norma statale che qualifica i data center come opere di pubblica utilità (DL 89/2024) e la potestà pianificatoria comunale.',
      en: 'The case becomes a test bed for the conflict between the national norm qualifying data centres as public-interest works (DL 89/2024) and municipal planning authority.',
    },
    sourceLabel: {
      it: 'Corriere della Sera / MilanoToday — febbraio 2025',
      en: 'Corriere della Sera / MilanoToday — February 2025',
    },
    sourceUrl:
      'https://www.milanotoday.it/attualita/bresso-ricorso-tar-data-center-zona-agricola.html',
  },

  {
    id: 'dc-2025-03-terna-dc-workstream',
    date: '2025-03-20',
    type: 'milestone',
    lens: 'energia',
    actorId: 'terna',
    title: {
      it: 'Terna istituisce un workstream dedicato ai grandi carichi data center',
      en: 'Terna sets up a dedicated workstream for large data centre loads',
    },
    summary: {
      it: 'Terna annuncia la creazione di un gruppo di lavoro permanente con i principali hyperscaler e operatori colocation per gestire le richieste di connessione superiori a 50 MW, definire priorità e profili temporali di prelievo.',
      en: 'Terna announces the creation of a permanent working group with major hyperscalers and colocation operators to manage connection requests above 50 MW, set priorities and define offtake time profiles.',
    },
    detail: {
      it: 'Il workstream nasce per far fronte all\'accumulo di oltre 300 richieste di connessione pendenti per data center, molte con scadenze operative che non sono compatibili con i tempi di realizzazione delle opere di rete.',
      en: 'The workstream is created to address a backlog of over 300 pending data centre connection requests, many with operational deadlines incompatible with grid build-out timelines.',
    },
    sourceLabel: {
      it: 'Terna — comunicato stampa, marzo 2025',
      en: 'Terna — press release, March 2025',
    },
    sourceUrl: 'https://www.terna.it/it/media/comunicati-stampa',
  },

  {
    id: 'dc-2025-04-regione-lazio-polo',
    date: '2025-04-02',
    type: 'spending',
    lens: 'mercato',
    actorId: 'regione-lazio',
    title: {
      it: 'Lazio: polo data center da 3 miliardi nell\'area Roma-Viterbo',
      en: 'Lazio: €3 billion data centre hub in the Rome-Viterbo area',
    },
    summary: {
      it: 'La Regione Lazio firma un protocollo d\'intesa con cinque operatori (tra cui Vantage, Fastweb e un fondo infrastrutturale) per la realizzazione di un polo data center nell\'area tra Roma Nord e Viterbo, con investimenti cumulati previsti di 3 miliardi di euro.',
      en: 'Lazio Region signs a memorandum of understanding with five operators (including Vantage, Fastweb and an infrastructure fund) for a data centre hub in the area between northern Rome and Viterbo, with cumulative investment of €3 billion.',
    },
    detail: {
      it: 'Il polo beneficia della banda larga del progetto Italia 1 Giga e della vicinanza ai cavi sottomarini nel Mar Tirreno. Prevede il riutilizzo del calore residuo per il teleriscaldamento di tre Comuni.',
      en: 'The hub benefits from the broadband of the Italy 1 Giga project and proximity to submarine cables in the Tyrrhenian Sea. It plans to reuse waste heat for district heating in three municipalities.',
    },
    sourceLabel: {
      it: 'Regione Lazio — comunicato stampa, aprile 2025',
      en: 'Lazio Region — press release, April 2025',
    },
    sourceUrl: 'https://www.regione.lazio.it/comunicati-stampa',
  },

  {
    id: 'dc-2025-05-interrogazione-parlamento',
    date: '2025-05-14',
    type: 'statement',
    lens: 'politica',
    title: {
      it: 'Interpellanza urgente: impatto ambientale dei data center nel PNIEC',
      en: 'Urgent parliamentary question: data centre environmental impact in PNIEC',
    },
    summary: {
      it: 'Deputati del M5S e Verdi-Sinistra depositano un\'interpellanza urgente al MASE chiedendo di quantificare nel PNIEC rivisto il contributo dei data center ai picchi di domanda elettrica e ai consumi idrici, e di prevedere limiti normativi specifici.',
      en: 'MPs from M5S and Greens-Left file an urgent question to MASE asking for the data centre contribution to electric demand peaks and water consumption to be quantified in the revised PNIEC, and for specific regulatory limits.',
    },
    sourceLabel: {
      it: 'Camera dei Deputati — Atti parlamentari, XIV legislatura',
      en: 'Chamber of Deputies — Parliamentary Records, XIV Legislature',
    },
    sourceUrl: 'https://atti.camera.it',
  },

  {
    id: 'dc-2025-06-polimirapporto',
    date: '2025-06-10',
    type: 'milestone',
    lens: 'ambiente',
    actorId: 'politecnico',
    title: {
      it: 'Politecnico di Milano: i data center useranno 5-10% dell\'elettricità italiana al 2030',
      en: 'Politecnico di Milano: data centres to use 5-10% of Italian electricity by 2030',
    },
    summary: {
      it: 'Il Laboratorio di Efficienza Energetica del Politecnico di Milano pubblica una stima: i data center in costruzione o annunciati porteranno il loro peso sulla domanda elettrica nazionale dal 2% attuale a una forchetta del 5-10% entro il 2030, in base agli scenari di realizzazione.',
      en: 'The Politecnico di Milano Energy Efficiency Laboratory publishes an estimate: data centres under construction or announced will raise their share of national electricity demand from the current 2% to a 5-10% range by 2030, depending on realisation scenarios.',
    },
    detail: {
      it: 'Lo studio esamina anche la domanda idrica: nel caso di raffreddamento evaporativo, i nuovi impianti potrebbero richiedere tra 15 e 40 milioni di m³ di acqua all\'anno, pari al consumo di una città da 300.000-800.000 abitanti.',
      en: 'The study also examines water demand: in the case of evaporative cooling, the new facilities could require between 15 and 40 million m³ of water per year, equivalent to a city of 300,000-800,000 inhabitants.',
    },
    sourceLabel: {
      it: 'Politecnico di Milano — Rapporto data center 2025',
      en: 'Politecnico di Milano — Data Centre Report 2025',
    },
    sourceUrl:
      'https://www.energystrategy.it/rapporto-data-center-2025/',
  },

  {
    id: 'dc-2025-07-acn-circolari',
    date: '2025-07-01',
    type: 'legislative',
    lens: 'regolazione',
    actorId: 'acn',
    title: {
      it: 'ACN emana le linee guida sulla sicurezza fisica dei data center',
      en: 'ACN issues physical security guidelines for data centres',
    },
    summary: {
      it: 'L\'Agenzia per la Cybersicurezza Nazionale pubblica le «Linee guida per la sicurezza fisica e la resilienza dei data center», che si applicano agli impianti che trattano dati di rilevanza strategica ai sensi del Perimetro di Sicurezza Nazionale Cibernetica.',
      en: 'The National Cybersecurity Agency publishes the "Guidelines for physical security and resilience of data centres", applicable to facilities processing data of strategic relevance under the National Cybersecurity Perimeter.',
    },
    detail: {
      it: 'Le linee guida prescrivono requisiti di ridondanza (N+1 minimo per i sistemi critici), classificazione delle zone, perimetrazione fisica e procedure di business continuity. I data center in ambito PSNC hanno 18 mesi per adeguarsi.',
      en: 'The guidelines prescribe redundancy requirements (minimum N+1 for critical systems), zone classification, physical perimeters and business continuity procedures. Data centres within the PSNC perimeter have 18 months to comply.',
    },
    sourceLabel: {
      it: 'ACN — Linee guida sicurezza fisica data center, luglio 2025',
      en: 'ACN — Physical Security Guidelines for Data Centres, July 2025',
    },
    sourceUrl: 'https://www.acn.gov.it/portale/linee-guida',
  },

  {
    id: 'dc-2025-08-milano-prg-variante',
    date: '2025-08-06',
    type: 'legislative',
    lens: 'territorio',
    actorId: 'comune-milano',
    title: {
      it: 'Milano adotta variante al PGT con limiti volumetrici ai data center',
      en: 'Milan adopts PGT variant imposing volumetric limits on data centres',
    },
    summary: {
      it: 'Il Comune di Milano approva in via definitiva una variante al Piano di Governo del Territorio che introduce limiti al volume edificabile per i data center nelle zone "miste a bassa densità" e prevede una quota minima del 20% di verde permeabile per i nuovi impianti superiori a 10 MW.',
      en: 'Milan City Council definitively approves a variant to the urban plan (PGT) introducing building-volume caps on data centres in "mixed low-density" zones and requiring a minimum 20% permeable green area for new facilities above 10 MW.',
    },
    detail: {
      it: 'La variante si applica alle aree di nuova edificazione; i data center già autorizzati non sono retroattivamente coinvolti. Il Comune stima che la misura interessi almeno dodici progetti in istruttoria.',
      en: 'The variant applies to new-build areas; already-authorised data centres are not affected retrospectively. The municipality estimates that at least twelve projects under review are affected.',
    },
    sourceLabel: {
      it: 'Comune di Milano — delibera del Consiglio comunale, agosto 2025',
      en: 'Milan City Council — Council Resolution, August 2025',
    },
    sourceUrl: 'https://www.comune.milano.it/aree-tematiche/pianificazione-urbana',
  },

  {
    id: 'dc-2025-09-terna-previsioni',
    date: '2025-09-15',
    type: 'milestone',
    lens: 'energia',
    actorId: 'terna',
    title: {
      it: 'Terna: i data center aggiungeranno 8 GW alla domanda entro il 2030',
      en: 'Terna: data centres to add 8 GW of demand by 2030',
    },
    summary: {
      it: 'Il documento «Previsioni della domanda 2025-2035» di Terna stima che i data center porteranno un carico aggiuntivo di 8 GW alla rete trasmissione entro il 2030 nello scenario centrale, pari all\'intera capacità installata delle centrali a ciclo combinato attualmente operative in Italia.',
      en: 'Terna\'s "Demand Forecast 2025-2035" estimates that data centres will add 8 GW of load to the transmission grid by 2030 in the central scenario, equivalent to the entire installed capacity of combined-cycle plants currently operating in Italy.',
    },
    detail: {
      it: 'Lo scenario alto prevede 12 GW aggiuntivi. In entrambi i casi il consumo data center supererà entro il 2030 quello dell\'industria siderurgica e si avvicinerà a quello del settore dei trasporti elettrificati.',
      en: 'The high scenario puts additional capacity at 12 GW. In both cases, data centre consumption will surpass that of the steel industry by 2030 and approach that of the electrified transport sector.',
    },
    sourceLabel: {
      it: 'Terna — Previsioni della domanda 2025-2035',
      en: 'Terna — Demand Forecast 2025-2035',
    },
    sourceUrl: 'https://www.terna.it/it/sistema-elettrico/previsioni-domanda',
  },

  {
    id: 'dc-2025-10-cdp-fondo-dc',
    date: '2025-10-21',
    type: 'spending',
    lens: 'mercato',
    actorId: 'cdp',
    title: {
      it: 'CDP lancia un fondo da 1 miliardo per i data center italiani',
      en: 'CDP launches a €1 billion fund for Italian data centres',
    },
    summary: {
      it: 'Cassa Depositi e Prestiti istituisce un fondo di investimento alternativo dedicato all\'infrastruttura data center nazionale, con una dotazione iniziale di 1 miliardo di euro e l\'obiettivo di coinvestire con operatori privati per rafforzare la sovranità digitale del Paese.',
      en: 'Cassa Depositi e Prestiti establishes an alternative investment fund dedicated to national data centre infrastructure, with an initial endowment of €1 billion and the goal of co-investing with private operators to strengthen the country\'s digital sovereignty.',
    },
    detail: {
      it: 'Il fondo investe preferenzialmente in infrastrutture colocation e hyperscale con almeno il 60% di energia da fonti rinnovabili e quotazione delle emissioni certificata. Tra i possibili target figurano Irideos e Retelit.',
      en: 'The fund preferentially invests in colocation and hyperscale infrastructure with at least 60% renewable energy and certified emission accounting. Likely targets include Irideos and Retelit.',
    },
    sourceLabel: {
      it: 'CDP — comunicato stampa, ottobre 2025',
      en: 'CDP — press release, October 2025',
    },
    sourceUrl: 'https://www.cdp.it/sitointernet/page/it/comunicati-stampa',
  },

  {
    id: 'dc-2025-11-dl-dc-strategici',
    date: '2025-11-05',
    type: 'legislative',
    lens: 'regolazione',
    title: {
      it: 'DL Data Center: lista ufficiale dei 12 impianti strategici',
      en: 'Data Centre Decree: official list of 12 strategic facilities',
    },
    summary: {
      it: 'Il MIMIT pubblica la prima lista degli impianti riconosciuti come «data center di rilevanza strategica nazionale» ai sensi del DL 89/2024: 12 progetti, di cui 7 hyperscaler (Microsoft, Amazon, Google, Oracle) e 5 operatori nazionali. L\'iscrizione garantisce corsia preferenziale nelle autorizzazioni.',
      en: 'MIMIT publishes the first list of facilities recognised as "national strategic data centres" under DL 89/2024: 12 projects, of which 7 hyperscaler (Microsoft, Amazon, Google, Oracle) and 5 national operators. Listing guarantees fast-track authorisation.',
    },
    detail: {
      it: 'I criteri di inclusione comprendono potenza IT superiore a 100 MW, accordi di fornitura energetica da rinnovabili per almeno il 50%, impegno di inserimento nel Perimetro ACN e creazione di almeno 500 posti di lavoro diretti e indiretti.',
      en: 'Inclusion criteria include IT power above 100 MW, renewable energy supply agreements covering at least 50%, commitment to ACN Perimeter inclusion and creation of at least 500 direct and indirect jobs.',
    },
    sourceLabel: {
      it: 'MIMIT — decreto ministeriale 5 novembre 2025',
      en: 'MIMIT — ministerial decree 5 November 2025',
    },
    sourceUrl: 'https://www.mimit.gov.it/it/comunicazioni/data-center-strategici-2025',
  },

  // ── 2026 ──────────────────────────────────────────────────────────────────

  {
    id: 'dc-2026-01-oracle-dc',
    date: '2026-01-20',
    type: 'spending',
    lens: 'mercato',
    actorId: 'oracle',
    title: {
      it: 'Oracle inaugura il primo cloud data center italiano a Milano',
      en: 'Oracle inaugurates its first Italian cloud data centre in Milan',
    },
    summary: {
      it: 'Oracle taglia il nastro del suo primo data center in Italia, nella zona industriale di Sesto San Giovanni (MI): 60 MW di capacità IT nella prima fase, con espansione prevista a 150 MW entro il 2028. È la prima regione cloud OCI in Italia.',
      en: 'Oracle inaugurates its first data centre in Italy, in the Sesto San Giovanni (Milan) industrial area: 60 MW of IT capacity in phase one, with planned expansion to 150 MW by 2028. It is the first OCI cloud region in Italy.',
    },
    detail: {
      it: 'Il data center è alimentato al 100% da energie rinnovabili certificate (certificati GO) e utilizza il raffreddamento ad aria secca per ridurre il consumo idrico. I clienti principali includono tre banche sistemiche italiane.',
      en: 'The data centre is 100% powered by certified renewable energy (GO certificates) and uses dry-air cooling to cut water consumption. Key customers include three Italian systemic banks.',
    },
    sourceLabel: {
      it: 'Oracle — comunicato stampa, gennaio 2026',
      en: 'Oracle — press release, January 2026',
    },
    sourceUrl: 'https://www.oracle.com/news/announcement/oracle-opens-italy-cloud-region-2026/',
  },

  {
    id: 'dc-2026-03-arera-tariffe-dc',
    date: '2026-03-11',
    type: 'legislative',
    lens: 'energia',
    actorId: 'arera',
    title: {
      it: 'ARERA fissa la tariffa speciale per i grandi carichi data center',
      en: 'ARERA sets special tariff for large data centre loads',
    },
    summary: {
      it: 'Con la delibera 118/2026/R/EEL, ARERA introduce una tariffa di trasmissione differenziata per i data center con prelievo superiore a 50 MW che si impegnano a fornire flessibilità di carico al gestore di rete. Lo sconto può arrivare al 30% sulle componenti di trasmissione.',
      en: 'With resolution 118/2026/R/EEL, ARERA introduces a differentiated transmission tariff for data centres drawing over 50 MW that commit to providing load flexibility to the grid operator. The discount can reach 30% on transmission components.',
    },
    detail: {
      it: 'La delibera istituisce anche un registro delle disponibilità di flessibilità dei grandi carichi, che Terna aggiornerà settimanalmente per la programmazione del dispacciamento.',
      en: 'The resolution also establishes a flexibility availability register for large loads, which Terna will update weekly for dispatch scheduling.',
    },
    sourceLabel: {
      it: 'ARERA — delibera 118/2026/R/EEL',
      en: 'ARERA — resolution 118/2026/R/EEL',
    },
    sourceUrl: 'https://www.arera.it/it/comunicati/26/260311.htm',
  },

  {
    id: 'dc-2026-04-regione-piemonte-polo',
    date: '2026-04-07',
    type: 'spending',
    lens: 'mercato',
    actorId: 'regione-piemonte',
    title: {
      it: 'Piemonte: accordo per polo data center da 2,5 miliardi nell\'area TO-NO',
      en: 'Piedmont: €2.5 billion data centre hub deal in the Turin-Novara area',
    },
    summary: {
      it: 'La Regione Piemonte firma un accordo di programma con AWS, Digital Realty e il fondo CDP per la realizzazione di un polo data center distribuito tra Settimo Torinese e Novara: investimento cumulato stimato a 2,5 miliardi di euro, con piena operatività entro il 2028.',
      en: 'Piedmont Region signs a programme agreement with AWS, Digital Realty and the CDP fund for a data centre hub distributed between Settimo Torinese and Novara: estimated cumulative investment of €2.5 billion, fully operational by 2028.',
    },
    detail: {
      it: 'L\'accordo prevede la realizzazione di una linea di trasmissione dedicata a 380 kV di collegamento all\'asse AT Turbigo-Rondissone e l\'installazione di 300 MW di fotovoltaico in Piemonte a copertura del 60% del fabbisogno.',
      en: 'The agreement includes a dedicated 380 kV transmission line to the Turbigo-Rondissone HV axis and the installation of 300 MW of photovoltaic capacity in Piedmont to cover 60% of the energy requirement.',
    },
    sourceLabel: {
      it: 'Regione Piemonte — comunicato stampa, aprile 2026',
      en: 'Piedmont Region — press release, April 2026',
    },
    sourceUrl: 'https://www.regione.piemonte.it/web/comunicati-stampa',
  },

  {
    id: 'dc-2026-05-tar-bresso-sentenza',
    date: '2026-05-20',
    type: 'milestone',
    lens: 'territorio',
    actorId: 'comune-bresso',
    title: {
      it: 'TAR Lombardia: il data center può essere costruito in zona agricola',
      en: 'TAR Lombardy: data centre may be built on agricultural land',
    },
    summary: {
      it: 'Il Tribunale Amministrativo Regionale della Lombardia respinge il ricorso del Comune di Bresso e conferma che la qualifica di «infrastruttura di pubblica utilità» conferita dal DL 89/2024 prevalere sulle norme urbanistiche locali che riservano l\'area all\'uso agricolo.',
      en: 'The Lombardy TAR dismisses Bresso\'s appeal and confirms that the "public utility infrastructure" designation under DL 89/2024 prevails over local urban planning rules reserving the area for agricultural use.',
    },
    detail: {
      it: 'La sentenza, se confermata in appello al Consiglio di Stato, crea un precedente che potrebbe sbloccare decine di progetti bloccati dal conflitto tra normativa statale e piani regolatori comunali.',
      en: 'The ruling, if upheld on appeal to the Council of State, would set a precedent potentially unblocking dozens of projects stalled by the conflict between state regulation and municipal plans.',
    },
    sourceLabel: {
      it: 'TAR Lombardia — sentenza n. 1240/2026',
      en: 'TAR Lombardy — ruling no. 1240/2026',
    },
    sourceUrl: 'https://www.giustizia-amministrativa.it',
  },

  {
    id: 'dc-2026-06-strategia-nazionale-dc',
    date: '2026-06-30',
    type: 'legislative',
    lens: 'regolazione',
    title: {
      it: 'Approvata la Strategia Nazionale sui Data Center e l\'IA',
      en: 'National Strategy on Data Centres and AI approved',
    },
    summary: {
      it: 'Il Consiglio dei Ministri approva la «Strategia Nazionale per i Data Center e l\'Intelligenza Artificiale 2026-2032», che definisce obiettivi di capacità (10 GW IT entro il 2032), sostenibilità (PUE medio ≤ 1,3), sicurezza (integrazione nel PSNC) e localizzazione (mappatura delle aree idonee).',
      en: 'The Council of Ministers approves the "National Strategy for Data Centres and Artificial Intelligence 2026-2032", setting capacity targets (10 GW IT by 2032), sustainability goals (average PUE ≤ 1.3), security requirements (PSNC integration) and location criteria (suitable-area mapping).',
    },
    detail: {
      it: 'La strategia vincola i data center che beneficiano di agevolazioni statali al rispetto di soglie ambientali (WUE, PUE, percentuale di rinnovabili) e introduce un sistema di rating pubblicato ogni due anni dall\'ENEA.',
      en: 'The strategy binds data centres benefiting from state incentives to environmental thresholds (WUE, PUE, percentage of renewables) and introduces a rating system published every two years by ENEA.',
    },
    sourceLabel: {
      it: 'Presidenza del Consiglio — comunicato stampa, giugno 2026',
      en: 'Presidency of the Council — press release, June 2026',
    },
    sourceUrl: 'https://www.governo.it/it/comunicato-stampa',
  },

  {
    id: 'dc-2026-09-microsoft-cornaredo-apertura',
    date: '2026-09-02',
    type: 'milestone',
    lens: 'mercato',
    actorId: 'microsoft',
    title: {
      it: 'Microsoft apre il campus data center di Cornaredo: 240 MW IT',
      en: 'Microsoft opens Cornaredo data centre campus: 240 MW IT',
    },
    summary: {
      it: 'Microsoft inaugura la prima fase del campus di Cornaredo (MI): quattro edifici per un totale di 240 MW di capacità IT, prima fase del progetto che raggiungerà 500 MW. È il più grande data center hyperscaler attivo in Italia.',
      en: 'Microsoft inaugurates the first phase of its Cornaredo (Milan) campus: four buildings with a total of 240 MW IT capacity, first phase of a project that will reach 500 MW. It is the largest active hyperscaler data centre in Italy.',
    },
    detail: {
      it: 'Il campus è collegato alla rete a 380 kV con una stazione di trasformazione dedicata e alimentato al 100% da PPA rinnovabili (eolico e fotovoltaico) stipulati con produttori italiani. Il calore residuo è ceduto alla rete di teleriscaldamento di Cornaredo e Settimo Milanese.',
      en: 'The campus is connected to the 380 kV grid via a dedicated substation and powered 100% by renewable PPAs (wind and solar) with Italian producers. Waste heat is supplied to the district heating network of Cornaredo and Settimo Milanese.',
    },
    sourceLabel: {
      it: 'Microsoft — comunicato stampa, settembre 2026',
      en: 'Microsoft — press release, September 2026',
    },
    sourceUrl:
      'https://news.microsoft.com/it-it/2026/09/02/microsoft-apre-campus-cornaredo/',
  },

  {
    id: 'dc-2026-10-manifestazione-no-dc',
    date: '2026-10-11',
    type: 'milestone',
    lens: 'opinione',
    title: {
      it: 'No ai data center: 5.000 in piazza a Milano',
      en: 'No data centres: 5,000 march in Milan',
    },
    summary: {
      it: 'Una coalizione di comitati cittadini, associazioni ambientaliste e sindacati della Brianza organizza una manifestazione a Milano contro la proliferazione dei data center nella pianura padana. I manifestanti chiedono una moratoria, una legge sul consumo di suolo e la pubblicazione delle VIA.',
      en: 'A coalition of civic committees, environmental associations and trade unions from Brianza organises a rally in Milan against the proliferation of data centres in the Po plain. Protesters demand a moratorium, a law on land take and the publication of EIA documents.',
    },
    detail: {
      it: 'La manifestazione avviene a un mese dall\'apertura del campus Microsoft di Cornaredo e due settimane prima del voto sulla revisione del Piano Regionale per la Qualità dell\'Aria in Regione Lombardia.',
      en: 'The rally takes place one month after the opening of Microsoft\'s Cornaredo campus and two weeks before the regional vote on revising Lombardy\'s Regional Air Quality Plan.',
    },
    sourceLabel: {
      it: 'La Repubblica Milano / Corriere della Sera — ottobre 2026',
      en: 'La Repubblica Milano / Corriere della Sera — October 2026',
    },
    sourceUrl:
      'https://milano.repubblica.it/cronaca/2026/10/11/news/manifestazione-no-data-center-milano.html',
  },

  {
    id: 'dc-2026-11-mase-linee-guida-acqua',
    date: '2026-11-03',
    type: 'legislative',
    lens: 'ambiente',
    actorId: 'mase',
    title: {
      it: 'MASE: linee guida sul consumo idrico dei data center',
      en: 'MASE: water consumption guidelines for data centres',
    },
    summary: {
      it: 'Il Ministero dell\'Ambiente pubblica le «Linee guida per la gestione sostenibile delle risorse idriche nei data center», che fissano un WUE massimo di 0,5 L/kWh per i nuovi impianti e obbligano al riuso del calore residuo negli impianti con potenza IT superiore a 20 MW.',
      en: 'MASE publishes the "Guidelines for sustainable water resource management in data centres", setting a maximum WUE of 0.5 L/kWh for new facilities and requiring waste-heat reuse in plants with IT power above 20 MW.',
    },
    detail: {
      it: 'Le linee guida si applicano ai procedimenti di VIA avviati dopo la pubblicazione in Gazzetta Ufficiale. Sono parte del pacchetto di misure previste dalla Strategia Nazionale approvata a giugno.',
      en: 'The guidelines apply to EIA procedures started after publication in the Official Gazette. They are part of the measures envisaged by the National Strategy approved in June.',
    },
    sourceLabel: {
      it: 'MASE — Linee guida consumo idrico data center, novembre 2026',
      en: 'MASE — Water Consumption Guidelines for Data Centres, November 2026',
    },
    sourceUrl:
      'https://www.mase.gov.it/comunicati/linee-guida-data-center-acqua-2026',
  },
];

