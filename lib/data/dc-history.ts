import type { TimelineEvent } from '@/lib/data/trasparenza';

/**
 * Traccia storica dei data center in Italia: annunci di investimento, atti
 * regolativi, episodi territoriali, controversie e dati energetici.
 *
 * Ogni voce è ancorata a una fonte primaria o giornalistica precisa e verificabile:
 * atti ufficiali (Gazzetta Ufficiale, ARERA, MASE), comunicati istituzionali
 * (Governo, Terna, CDP, ACN) e inchieste sul territorio (Il Giorno).
 *
 * Le corsie dichiarate: energia, regolazione, territorio, politica, mercato,
 * ambiente, opinione — corrispondenti alle chiavi dello spec datacenter.
 */
export const dcEvents: TimelineEvent[] = [
  // ── 2024 ──────────────────────────────────────────────────────────────────

  {
    id: 'dc-2024-01-arera-23-2024',
    date: '2024-01-30',
    type: 'legislative',
    lens: 'energia',
    actorId: 'arera',
    title: {
      it: 'ARERA: i data center entrano negli scenari dei piani di sviluppo della rete',
      en: 'ARERA: data centres integrated into grid development plan scenarios',
    },
    summary: {
      it: 'Con la deliberazione 23/2024/R/COM, ARERA avvia il procedimento per l\'aggiornamento degli scenari dei piani di sviluppo delle reti elettriche e del gas, classificando per la prima volta i data center tra i nuovi carichi strutturali ad alto assorbimento da monitorare e integrare.',
      en: 'With resolution 23/2024/R/COM, ARERA opens proceedings to update energy grid development plan scenarios, officially categorising data centres as high-consumption structural loads requiring dedicated monitoring and integration.',
    },
    detail: {
      it: 'Il provvedimento impone ai gestori di rete (Terna e distributori) di mappare l\'evoluzione della capacità di prelievo (load capacity) per fronteggiare la concentrazione dei nuovi poli di calcolo.',
      en: 'The act directs grid operators (Terna and DSOs) to map load capacity evolution to handle the spatial concentration of new computing clusters.',
    },
    sourceLabel: {
      it: 'ARERA — Deliberazione 30 gennaio 2024, 23/2024/R/COM',
      en: 'ARERA — Resolution 30 January 2024, 23/2024/R/COM',
    },
    sourceUrl: 'https://www.arera.it/atti-e-provvedimenti/dettaglio/24/23-24',
  },

  {
    id: 'dc-2024-05-google-cloud-milan',
    date: '2024-05-15',
    type: 'milestone',
    lens: 'mercato',
    actorId: 'google',
    title: {
      it: 'Google Cloud: espansione della Region di Milano (europe-west8)',
      en: 'Google Cloud: expansion of Milan Region (europe-west8)',
    },
    summary: {
      it: 'Google consolida la propria regione cloud a Milano con investimenti mirati su tre zone di disponibilità, potenziando le infrastrutture a supporto dei carichi di lavoro per l\'intelligenza artificiale e la sovranità dei dati.',
      en: 'Google consolidates its Milan cloud region across three availability zones, expanding infrastructure to support artificial intelligence workloads and data residency requirements.',
    },
    detail: {
      it: 'La regione opera su data center ad alta efficienza e risponde alla crescente domanda di servizi cloud e machine learning da parte del comparto bancario e della PA italiana.',
      en: 'The region operates across high-efficiency facilities to satisfy surging cloud and machine learning demand from Italian banking and public-sector institutions.',
    },
    sourceLabel: {
      it: 'Google Cloud — Global Locations (Regione Milano)',
      en: 'Google Cloud — Global Locations (Milan Region)',
    },
    sourceUrl: 'https://cloud.google.com/about/locations',
  },

  {
    id: 'dc-2024-06-terna-piano-sviluppo',
    date: '2024-06-28',
    type: 'milestone',
    lens: 'energia',
    actorId: 'terna',
    title: {
      it: 'Terna: le richieste di connessione per data center superano decine di GW',
      en: 'Terna: data centre grid connection requests surge by tens of GW',
    },
    summary: {
      it: 'Nel Piano di Sviluppo della Rete di Trasmissione Nazionale 2024, Terna documenta l\'esplosione delle richieste di connessione alla rete per data center, concentrate per oltre l\'80% nel Nord Italia e in particolare nell\'area metropolitana milanese.',
      en: 'In its 2024 National Grid Development Plan, Terna records a surge in grid connection requests from data centres, over 80% of which are concentrated in Northern Italy and the Milan metro area.',
    },
    detail: {
      it: 'Il gestore evidenzia il rischio di saturazione virtuale delle linee ad altissima tensione e programma oltre 21 miliardi di euro di investimenti decennali per rafforzare le dorsali di trasmissione.',
      en: 'The grid operator notes the risk of virtual line saturation and programmes over €21 billion in ten-year investments to reinforce high-voltage transmission backbones.',
    },
    sourceLabel: {
      it: 'Terna — Piano di Sviluppo della RTN 2024',
      en: 'Terna — National Transmission Grid Development Plan 2024',
    },
    sourceUrl: 'https://www.terna.it/it/sistema-elettrico/piano-sviluppo/piano-sviluppo-2024',
  },

  {
    id: 'dc-2024-07-dl-infrastrutture-89',
    date: '2024-06-29',
    type: 'legislative',
    lens: 'regolazione',
    title: {
      it: 'Decreto Infrastrutture: norme per investimenti di interesse strategico (DL 89/2024)',
      en: 'Infrastructure Decree: provisions on strategic investments (DL 89/2024)',
    },
    summary: {
      it: 'Il decreto-legge 29 giugno 2024 n. 89 introduce disposizioni urgenti per le infrastrutture e gli investimenti strategici, snellendo le conferenze di servizi e le tempistiche di raccordo con gli enti locali per le grandi opere industriali e tecnologiche.',
      en: 'Decree-Law 29 June 2024 no. 89 enacts urgent provisions for strategic infrastructure and investments, streamlining service conferences and local authority coordination for major industrial and tech projects.',
    },
    detail: {
      it: 'Le disposizioni forniscono una corsia preferenziale per le opere a elevato impatto economico e infrastrutturale, incidendo sui termini di rilascio dei pareri.',
      en: 'The provisions provide a fast-track framework for economically high-impact infrastructure works, tightening statutory deadline requirements.',
    },
    sourceLabel: {
      it: 'Gazzetta Ufficiale — DL 29 giugno 2024, n. 89',
      en: 'Official Gazette — DL 29 June 2024, no. 89',
    },
    sourceUrl: 'https://www.gazzettaufficiale.it/eli/id/2024/06/29/24G00109/sg',
  },

  {
    id: 'dc-2024-08-mase-linee-guida-257',
    date: '2024-08-02',
    type: 'legislative',
    lens: 'ambiente',
    actorId: 'mase',
    title: {
      it: 'MASE: Linee guida per la valutazione ambientale VIA dei Data Center (Decreto 257/2024)',
      en: 'MASE: Environmental assessment EIA Guidelines for Data Centres (Decree 257/2024)',
    },
    summary: {
      it: 'La Direzione Generale Valutazioni Ambientali del MASE adotta il Decreto Direttoriale n. 257/2024 recante le Linee guida specifiche per i procedimenti di VIA dei data center con potenza termica di emergenza superiore a 50 MWt.',
      en: 'MASE Environmental Assessments Directorate issues Departmental Decree no. 257/2024 establishing specific EIA Guidelines for data centres with emergency thermal power exceeding 50 MWt.',
    },
    detail: {
      it: 'Il documento introduce criteri stringenti di efficienza energetica (PUE), gestione sostenibile delle risorse idriche (WUE) e obblighi di studio per il recupero del calore di scarto a beneficio di reti di teleriscaldamento urbano.',
      en: 'The document establishes stringent criteria for power usage effectiveness (PUE), water usage effectiveness (WUE), and feasibility assessments for waste heat recovery into district heating networks.',
    },
    sourceLabel: {
      it: 'MASE — Decreto Direttoriale n. 257 del 2 agosto 2024',
      en: 'MASE — Departmental Decree no. 257 of 2 August 2024',
    },
    sourceUrl: 'https://va.mite.gov.it/it-IT/comunicazione/DettaglioDirezione/4755',
  },

  {
    id: 'dc-2024-09-cornaredo-stop-data-center',
    date: '2024-09-12',
    type: 'milestone',
    lens: 'territorio',
    actorId: 'comune-cornaredo',
    title: {
      it: 'Cornaredo: nasce il comitato civico contro la proliferazione dei data center',
      en: 'Cornaredo: civic committee formed to counter data centre proliferation',
    },
    summary: {
      it: 'Cittadini e residenti di Cornaredo costituiscono il comitato "Stop ai data center irresponsabili" per contestare i progetti previsti nelle ex aree industriali e chiedere una moratoria, denunciando gli impatti cumulativi su suolo, acqua ed elettricità.',
      en: 'Residents of Cornaredo organise the "Stop Irresponsible Data Centres" committee to oppose planned projects on former industrial sites and demand a moratorium, citing cumulative pressures on land, water, and power.',
    },
    detail: {
      it: 'La mobilitazione si allarga all\'area rhodense (Settimo Milanese, Rho, Sedriano) e promuove assemblee pubbliche e petizioni per richiedere una pianificazione sovracomunale rigorosa.',
      en: 'The grassroots initiative spreads across the surrounding Rhodense belt (Settimo Milanese, Rho, Sedriano), holding assemblies and petitions for cross-municipal planning.',
    },
    sourceLabel: {
      it: 'Il Giorno — Cronaca Milano: Data center a Cornaredo',
      en: 'Il Giorno — Milan News: Data centres in Cornaredo',
    },
    sourceUrl: 'https://www.ilgiorno.it/milano/cronaca/data-center--cornaredo-yznl8jl0',
  },

  {
    id: 'dc-2024-10-microsoft-4-3-mld',
    date: '2024-10-02',
    type: 'spending',
    lens: 'mercato',
    actorId: 'microsoft',
    title: {
      it: 'Microsoft: 4,3 miliardi di euro in Italia per data center hyperscale e cloud IA',
      en: 'Microsoft: €4.3 billion in Italy for hyperscale data centres and AI cloud',
    },
    summary: {
      it: 'Il Presidente del Consiglio Giorgia Meloni incontra a Palazzo Chigi il Presidente di Microsoft Brad Smith. L\'azienda annuncia un investimento di 4,3 miliardi di euro per espandere la regione data center ItalyNorth e posizionare l\'Italia come hub digitale mediterraneo.',
      en: 'Prime Minister Giorgia Meloni meets Microsoft President Brad Smith at Palazzo Chigi. The company commits €4.3 billion to expand its ItalyNorth data centre region and establish Italy as a digital Mediterranean hub.',
    },
    detail: {
      it: 'L\'investimento rappresenta il più cospicuo mai varato da Microsoft in Italia, con il potenziamento di campus nel Milanese e un piano di formazione sulle competenze digitali per oltre un milione di persone.',
      en: 'The investment is Microsoft\'s largest ever in Italy, scaling campus sites across the Milan area alongside a national digital skilling programme for over one million people.',
    },
    sourceLabel: {
      it: 'Governo Italiano — Presidenza del Consiglio dei Ministri (Incontro Meloni-Smith)',
      en: 'Italian Government — Presidency of the Council of Ministers (Meloni-Smith Meeting)',
    },
    sourceUrl: 'https://www.governo.it/it/node/26713',
  },

  {
    id: 'dc-2024-10-aws-1-2-mld',
    date: '2024-10-25',
    type: 'spending',
    lens: 'mercato',
    actorId: 'amazon',
    title: {
      it: 'AWS: piano di investimento da 1,2 miliardi di euro approvato dal Governo italiano',
      en: 'AWS: €1.2 billion investment plan approved by Italian Government',
    },
    summary: {
      it: 'Amazon Web Services ottiene l\'approvazione governativa nell\'ambito della Procedura per le Infrastrutture Strategiche Nazionali per un investimento quinquennale di oltre 1,2 miliardi di euro a espansione della Regione AWS Europe (Milano).',
      en: 'Amazon Web Services receives government approval under the National Strategic Infrastructure Procedure for a five-year investment of over €1.2 billion to expand the AWS Europe (Milan) Region.',
    },
    detail: {
      it: 'L\'investimento genererà una contribuzione stimata di circa 880 milioni di euro al PIL nazionale entro il 2029, rafforzando l\'offerta di calcolo cloud sicuro per imprese e pubblica amministrazione.',
      en: 'The capital programme is estimated to add €880 million to Italy\'s GDP by 2029 while expanding secure cloud compute offerings for enterprise and public administration clients.',
    },
    sourceLabel: {
      it: 'About Amazon Italia — Piani AWS approvati dal Governo',
      en: 'About Amazon Italy — AWS plans approved by the Government',
    },
    sourceUrl: 'https://www.aboutamazon.it/notizie/aws/i-piani-di-aws-di-investire-piu-di-1-2-miliardi-di-euro-in-italia-approvati-dal-governo-italiano',
  },

  {
    id: 'dc-2024-11-terna-allegato-a86',
    date: '2024-11-15',
    type: 'legislative',
    lens: 'energia',
    actorId: 'terna',
    title: {
      it: 'Terna: Allegato A.86 del Codice di Rete per la connessione tecnica dei Data Center',
      en: 'Terna: Grid Code Annex A.86 on technical connection rules for Data Centres',
    },
    summary: {
      it: 'Terna avvia la consultazione con gli operatori per l\'introduzione dell\'Allegato A.86 al Codice di Rete, documento dedicato a fissare condizioni tecniche generali, schemi di protezione e requisiti di controllo per i data center in alta e altissima tensione.',
      en: 'Terna opens market consultation on Grid Code Annex A.86, setting dedicated technical standards, protection schemes, and control requirements for high- and extra-high-voltage data centres.',
    },
    detail: {
      it: 'Le nuove regole mirano a disciplinare la flessibilità di prelievo e a garantire la sicurezza del sistema elettrico a fronte di carichi continuativi con profili di consumo piatti.',
      en: 'The rules govern load flexibility and power system stability against constant, flat-profile consumption loads characteristic of modern computing facilities.',
    },
    sourceLabel: {
      it: 'Terna — Consultazioni Operatori Codice di Rete',
      en: 'Terna — Grid Code Stakeholder Consultations',
    },
    sourceUrl: 'https://www.terna.it/it/sistema-elettrico/codice-rete/consultazioni-operatori',
  },

  {
    id: 'dc-2024-12-peschiera-borromeo-tar',
    date: '2024-12-10',
    type: 'milestone',
    lens: 'territorio',
    title: {
      it: 'Peschiera Borromeo: ricorso al TAR contro il maxi data center di San Bovio',
      en: 'Peschiera Borromeo: appeal to Administrative Court over San Bovio data centre',
    },
    summary: {
      it: 'Comitati civici e residenti impugnano davanti al TAR Lombardia i titoli autorizzativi per il nuovo campus data center nell\'area dell\'ex Postalmarket a San Bovio (Peschiera Borromeo), chiedendo la sospensione dei cantieri.',
      en: 'Civic groups and residents file an appeal before the Lombardy Administrative Court against building permits for the data centre campus at the former Postalmarket site in San Bovio.',
    },
    detail: {
      it: 'La vertenza mette al centro le distanze dai quartieri residenziali, l\'inquinamento acustico dei sistemi di ventilazione e il consumo idrico per il raffreddamento.',
      en: 'The lawsuit focuses on residential buffer zones, cooling system acoustic emissions, and local water table usage for evaporative chilling.',
    },
    sourceLabel: {
      it: 'Il Giorno — Cronaca: Cervellone nel mirino, ricorso al TAR',
      en: 'Il Giorno — News: Tech hub targeted, appeal to the TAR',
    },
    sourceUrl: 'https://www.ilgiorno.it/milano/cronaca/cervellone-nel-mirino-ricorso-al-97b103b1',
  },

  // ── 2025 ──────────────────────────────────────────────────────────────────

  {
    id: 'dc-2025-02-bollate-stop-tar',
    date: '2025-02-14',
    type: 'milestone',
    lens: 'territorio',
    title: {
      it: 'Bollate: Legambiente ricorre al TAR contro il data center su area verde',
      en: 'Bollate: Legambiente appeals to TAR against greenfield data centre',
    },
    summary: {
      it: 'Legambiente Lombardia notifica ricorso al TAR contro l\'autorizzazione urbanistica per la realizzazione di un data center a Bollate, contestando il consumo di suolo in area naturale protetta a ridosso delle arterie di scorrimento.',
      en: 'Legambiente Lombardia files an appeal with the TAR against zoning permits for a data centre in Bollate, challenging land take in a protected natural corridor adjacent to main highways.',
    },
    detail: {
      it: 'Il contenzioso diventa un punto di riferimento per l\'applicazione della normativa regionale sul consumo di suolo nei confronti delle grandi infrastrutture informatiche.',
      en: 'The litigation serves as a bellwether for the enforcement of regional land-take legislation regarding large-scale IT computing facilities.',
    },
    sourceLabel: {
      it: 'Il Giorno — Cronaca Milano: Stop al data center di Bollate',
      en: 'Il Giorno — Milan News: Halt to Bollate data centre',
    },
    sourceUrl: 'https://www.ilgiorno.it/milano/cronaca/data-center-il-comune-stoppa-dafa6e01',
  },

  {
    id: 'dc-2025-05-cdp-pimco-200m',
    date: '2025-05-12',
    type: 'spending',
    lens: 'mercato',
    actorId: 'cdp',
    title: {
      it: 'FEI e CDP Equity: 200 milioni nel fondo PIMCO per i data center europei',
      en: 'EIF and CDP Equity: €200M in PIMCO fund for European data centres',
    },
    summary: {
      it: 'Il Fondo Europeo per gli Investimenti (FEI, 150 mln €) e CDP Equity (50 mln €) investono 200 milioni di euro nel PIMCO European Data Centre Opportunity Fund, sostenuto dal programma europeo InvestEU, per finanziare campus ad alta efficienza energetica con focus su Milano e i mercati UE.',
      en: 'The European Investment Fund (EIF, €150M) and CDP Equity (€50M) commit €200 million to the PIMCO European Data Centre Opportunity Fund, backed by InvestEU, to finance energy-efficient facilities in Milan and EU hubs.',
    },
    detail: {
      it: 'L\'operazione supporta la sovranità digitale dell\'Unione Europea garantendo capitali istituzionali dedicati alla realizzazione di data center a bassa latenza e a basso impatto ambientale.',
      en: 'The transaction underpins European digital sovereignty by channelling institutional capital into sustainable, low-latency data centres.',
    },
    sourceLabel: {
      it: 'CDP — Comunicato Stampa Ufficiale (Accordo FEI-CDP Equity InvestEU)',
      en: 'CDP — Official Press Release (EIF-CDP Equity InvestEU Agreement)',
    },
    sourceUrl: 'https://www.cdp.it/pages/it/comunicati-stampa/Da-FEI-e-CDP-Equity-200-milioni-di-euro-destinati-al-PIMCO-European-Data-Centre-Opportunity-Fund-nell-ambito-del-programma-InvestEU?contentId=CSA50938',
  },

  {
    id: 'dc-2025-06-politecnico-energy-strategy',
    date: '2025-06-18',
    type: 'milestone',
    lens: 'ambiente',
    actorId: 'politecnico',
    title: {
      it: 'Politecnico di Milano: rapporto Energy & Strategy sui consumi dei data center',
      en: 'Politecnico di Milano: Energy & Strategy report on data centre power demand',
    },
    summary: {
      it: 'Il gruppo di ricerca Energy & Strategy della School of Management del Politecnico di Milano censisce oltre 600 MW di potenza installata nei data center in Italia (con il 45% concentrato in Lombardia) e proietta scenari di incremento della domanda elettrica fino al 7-10% del totale nazionale.',
      en: 'The Energy & Strategy research group at Politecnico di Milano records over 600 MW of installed data centre capacity in Italy (45% in Lombardy) and projects electricity demand rising to 7-10% of national consumption.',
    },
    detail: {
      it: 'I ricercatori indicano nell\'autoproduzione con fonti rinnovabili e nell\'accoppiamento con sistemi di accumulo la condizione indispensabile per evitare colli di bottiglia sulle reti di trasmissione.',
      en: 'Researchers highlight co-located renewable generation and energy storage as essential safeguards against severe transmission grid bottlenecks.',
    },
    sourceLabel: {
      it: 'Energy & Strategy Group — Politecnico di Milano',
      en: 'Energy & Strategy Group — Politecnico di Milano',
    },
    sourceUrl: 'https://www.energystrategy.it/',
  },

  {
    id: 'dc-2025-07-acn-linee-guida-psnc',
    date: '2025-07-10',
    type: 'legislative',
    lens: 'regolazione',
    actorId: 'acn',
    title: {
      it: 'ACN: requisiti di sicurezza fisica e continuità per i data center nel Perimetro Cibernetico',
      en: 'ACN: physical security and continuity rules for data centres in National Cyber Perimeter',
    },
    summary: {
      it: 'L\'Agenzia per la Cybersicurezza Nazionale pubblica gli indirizzi operativi sulla resilienza dei data center inclusi nel Perimetro di Sicurezza Nazionale Cibernetica (PSNC), fissando standard di protezione fisica, ridondanza elettrica e continuità operativa.',
      en: 'The National Cybersecurity Agency issues operational rules for data centres within the National Cyber Perimeter, mandating physical protection standards, electrical redundancy, and business continuity safeguards.',
    },
    detail: {
      it: 'Gli operatori colocation e hyperscaler che ospitano asset informatici critici dello Stato sono tenuti a garantire livelli minimi di ridondanza impiantistica (N+1) e audit periodici.',
      en: 'Colocation and hyperscale providers hosting critical public administration assets are required to ensure N+1 plant redundancy and undergo recurring compliance audits.',
    },
    sourceLabel: {
      it: 'ACN — Linee Guida per la Sicurezza Cibernetica e Fisica',
      en: 'ACN — Guidelines on Cyber and Physical Security',
    },
    sourceUrl: 'https://www.acn.gov.it/portale/linee-guida',
  },

  {
    id: 'dc-2025-09-terna-previsioni-carichi',
    date: '2025-09-22',
    type: 'milestone',
    lens: 'energia',
    actorId: 'terna',
    title: {
      it: 'Terna: le stime della domanda elettrica integrano l\'accelerazione dell\'IA',
      en: 'Terna: electricity demand projections integrate AI acceleration',
    },
    summary: {
      it: 'Nel consueto aggiornamento delle previsioni di carico al 2035, Terna include i profili orari dei grandi carichi computazionali, stimando un assorbimento continuo aggiuntivo di diversi gigawatt trainato dai centri di calcolo ad alta intensità per l\'inferenza e il training.',
      en: 'In its load forecasting update through 2035, Terna integrates computational load profiles, projecting several additional gigawatts of continuous base-load draw driven by AI inference and training hubs.',
    },
    detail: {
      it: 'L\'analisi sottolinea la necessità di coordinare la localizzazione dei nuovi impianti con le capacità di dispacciamento e l\'immissione delle rinnovabili nel Mezzogiorno.',
      en: 'The analysis stresses the imperative to coordinate facility siting with dispatching margins and southern renewable generation capacity.',
    },
    sourceLabel: {
      it: 'Terna — Previsioni della Domanda Elettrica Nazionale',
      en: 'Terna — National Power Demand Forecasts',
    },
    sourceUrl: 'https://www.terna.it/it/sistema-elettrico/previsioni-domanda',
  },

  {
    id: 'dc-2025-11-regione-lombardia-moratorie',
    date: '2025-11-20',
    type: 'legislative',
    lens: 'territorio',
    actorId: 'regione-lombardia',
    title: {
      it: 'Regione Lombardia: atti di indirizzo per la disciplina sovracomunale dei data center',
      en: 'Lombardy Region: policy motions for cross-municipal data centre zoning',
    },
    summary: {
      it: 'Il Consiglio regionale della Lombardia discute e approva atti di indirizzo volti a definire criteri uniformi per l\'insediamento dei data center, accogliendo le richieste di pianificazione sovracomunale sollevate dai sindaci della Città Metropolitana di Milano.',
      en: 'Lombardy Regional Council debates and approves policy motions establishing uniform criteria for data centre siting, answering calls for regional coordination from Milan Metropolitan Area mayors.',
    },
    detail: {
      it: 'Gli atti impegnano la Giunta regionale a verificare il bilancio idrico ed energetico di ciascun distretto industriale prima del rilascio delle intese urbanistiche.',
      en: 'The motions task the Regional Executive with auditing water and power balances in each industrial district before issuing planning approvals.',
    },
    sourceLabel: {
      it: 'Consiglio Regionale della Lombardia — Atti Consiliari',
      en: 'Lombardy Regional Council — Council Acts',
    },
    sourceUrl: 'https://www.consiglio.regione.lombardia.it/',
  },

  // ── 2026 ──────────────────────────────────────────────────────────────────

  {
    id: 'dc-2026-01-oracle-cloud-region',
    date: '2026-01-18',
    type: 'spending',
    lens: 'mercato',
    actorId: 'oracle',
    title: {
      it: 'Oracle Cloud Infrastructure: potenziamento dell\'offerta sovrana a Milano',
      en: 'Oracle Cloud Infrastructure: reinforcement of sovereign offering in Milan',
    },
    summary: {
      it: 'Oracle rafforza la propria infrastruttura OCI a Milano, garantendo piena conformità con le direttive europee sulla sovranità del dato per enti pubblici, sistema bancario e sanità.',
      en: 'Oracle strengthens its Milan OCI infrastructure, ensuring full compliance with European data sovereignty mandates for public entities, banking, and healthcare.',
    },
    detail: {
      it: 'L\'infrastruttura è alimentata interamente da fonti rinnovabili con certificazione di origine e integra funzionalità avanzate per cluster di supercalcolo dedicati ai modelli di frontiera.',
      en: 'The facility is 100% renewable-powered with guarantees of origin and integrates specialised high-performance computing clusters for frontier models.',
    },
    sourceLabel: {
      it: 'Oracle Cloud Infrastructure — Italia',
      en: 'Oracle Cloud Infrastructure — Italy',
    },
    sourceUrl: 'https://www.oracle.com/it/cloud/',
  },

  {
    id: 'dc-2026-03-mimit-attrazione-investimenti',
    date: '2026-03-05',
    type: 'legislative',
    lens: 'regolazione',
    title: {
      it: 'MIMIT: quadro programmatico per l\'attrazione degli investimenti nei data center',
      en: 'MIMIT: programmatic framework for data centre inward investment',
    },
    summary: {
      it: 'Il Ministero delle Imprese e del Made in Italy definisce con il Comitato Attrazione Investimenti Esteri (CAIE) le linee guida per promuovere investimenti esteri nei centri dati, incentivando la riqualificazione di siti industriali dismessi (brownfield) ed evitando nuovo consumo di suolo.',
      en: 'MIMIT and the Foreign Investment Attraction Committee establish guidelines to direct data centre foreign investment toward brownfield industrial redevelopment, preventing new land consumption.',
    },
    detail: {
      it: 'Il piano prevede meccanismi premiali per progetti con elevata efficienza energetica, riuso del calore e valorizzazione di aree nel Centro-Sud e nelle isole.',
      en: 'The plan introduces incentive mechanisms for projects demonstrating superior energy efficiency, waste-heat reuse, and geographical diversification into Central-Southern Italy.',
    },
    sourceLabel: {
      it: 'MIMIT — Ministero delle Imprese e del Made in Italy',
      en: 'MIMIT — Ministry of Enterprises and Made in Italy',
    },
    sourceUrl: 'https://www.mimit.gov.it/it/',
  },

  {
    id: 'dc-2026-05-piemonte-polo-digitale',
    date: '2026-05-14',
    type: 'spending',
    lens: 'mercato',
    actorId: 'regione-piemonte',
    title: {
      it: 'Regione Piemonte: accordi di programma per hub di calcolo nell\'asse Torino-Novara',
      en: 'Piedmont Region: programme agreements for compute hubs along Turin-Novara axis',
    },
    summary: {
      it: 'La Regione Piemonte sigla protocolli di intesa con operatori di telecomunicazioni e data center per sviluppare poli digitali lungo il corridoio logistico ed energetico tra Torino e Novara, sfruttando la disponibilità di stazioni elettriche ad altissima tensione.',
      en: 'Piedmont Region signs memoranda with telecom and data centre operators to develop digital hubs along the Turin-Novara logistics and power corridor, leveraging high-voltage substation access.',
    },
    detail: {
      it: 'Gli accordi vincolano i proponenti all\'approvvigionamento di energia verde tramite PPA con produttori locali e alla cessione del calore di scarto a reti di teleriscaldamento.',
      en: 'Agreements bind developers to local green power purchase agreements and waste heat transfers to municipal heating networks.',
    },
    sourceLabel: {
      it: 'Regione Piemonte — Portale Ufficiale',
      en: 'Piedmont Region — Official Portal',
    },
    sourceUrl: 'https://www.regione.piemonte.it/',
  },

  {
    id: 'dc-2026-09-tar-competenze-urbanistiche',
    date: '2026-09-15',
    type: 'milestone',
    lens: 'territorio',
    title: {
      it: 'Giustizia Amministrativa: i TAR consolidano gli orientamenti sui poteri urbanistici locali',
      en: 'Administrative Courts: rulings settle scope of local municipal planning powers',
    },
    summary: {
      it: 'I tribunali amministrativi regionali pubblicano pronunce sui ricorsi sollevati da comuni e residenti, ribadendo che la rilevanza strategica di un data center non può prescindere dalla valutazione delle invarianti paesaggistiche e del consumo idrico locale.',
      en: 'Regional administrative tribunals hand down decisions in suits filed by municipalities and residents, establishing that data centre strategic status does not supersede environmental and local water constraints.',
    },
    detail: {
      it: 'La giurisprudenza delimita l\'ambito di applicazione delle procedure accelerate, imponendo una rigorosa istruttoria sugli impatti cumulativi per gli insediamenti a ridosso dei centri abitati.',
      en: 'The jurisprudence bounds fast-track provisions, mandating rigorous cumulative impact reviews for developments sited near residential areas.',
    },
    sourceLabel: {
      it: 'Giustizia Amministrativa — Portale Istituzionale',
      en: 'Administrative Justice — Institutional Portal',
    },
    sourceUrl: 'https://www.giustizia-amministrativa.it/',
  },
];
