import type { TimelineEvent } from '@/lib/data/trasparenza';

/**
 * Traccia di storia della cybersicurezza: attacchi su larga scala, vulnerabilità
 * critiche, attori statuali sanzionati, difese collettive e regole europee, dal
 * 2016 a oggi. Ogni voce è ancorata a una fonte primaria verificata (CISA/FBI,
 * IC3, DOJ/Treasury, EUR-Lex, Commissione europea, NVD/MSRC, Openwall), in
 * ordine cronologico.
 */
export const cyberEvents: TimelineEvent[] = [
  {
    id: "cyber-2016-nis",
    date: "2016-07-06",
    type: "legislative",
    lens: "politica",
    actorId: "eu",
    title: {
      it: "Direttiva NIS: prime regole UE sulla cybersicurezza",
      en: "NIS Directive: first EU cybersecurity rules",
    },
    summary: {
      it: "Il Parlamento e il Consiglio UE adottano la Direttiva (UE) 2016/1148 (NIS), primo quadro europeo comune per la sicurezza delle reti e dei sistemi informativi degli operatori di servizi essenziali.",
      en: "The EU Parliament and Council adopt Directive (EU) 2016/1148 (NIS), the first common European framework for the security of network and information systems of essential service operators.",
    },
    detail: {
      it: "Obbligava gli Stati membri a designare autorità nazionali e CSIRT e a individuare gli operatori di servizi essenziali in settori come energia, trasporti e sanità.",
      en: "It required member states to designate national authorities and CSIRTs and to identify operators of essential services in sectors such as energy, transport and health.",
    },
    sourceLabel: {
      it: "EUR-Lex — Direttiva (UE) 2016/1148",
      en: "EUR-Lex — Directive (EU) 2016/1148",
    },
    sourceUrl: "https://eur-lex.europa.eu/eli/dir/2016/1148/oj",
  },
  {
    id: "cyber-2017-wannacry",
    date: "2017-05-12",
    type: "milestone",
    lens: "attacchi",
    actorId: "europol",
    title: {
      it: "WannaCry: ransomware globale via EternalBlue",
      en: "WannaCry: global ransomware via EternalBlue",
    },
    summary: {
      it: "Il ransomware WannaCry si diffonde in oltre 150 Paesi sfruttando l’exploit EternalBlue (MS17-010), bloccando centinaia di migliaia di sistemi tra cui il servizio sanitario britannico.",
      en: "The WannaCry ransomware spreads to over 150 countries by exploiting the EternalBlue flaw (MS17-010), locking up hundreds of thousands of systems including the UK health service.",
    },
    detail: {
      it: "Il Centro europeo contro il crimine informatico (EC3) di Europol coordinò il supporto operativo internazionale; la diffusione raggiunse più di 230.000 computer.",
      en: "Europol’s European Cybercrime Centre (EC3) coordinated international operational support; the outbreak reached more than 230,000 computers.",
    },
    sourceLabel: {
      it: "Europol — European Cybercrime Centre (EC3)",
      en: "Europol — European Cybercrime Centre (EC3)",
    },
    sourceUrl: "https://www.europol.europa.eu/wannacry-ransomware",
  },
  {
    id: "cyber-2018-meltdown-spectre",
    date: "2018-01-03",
    type: "milestone",
    lens: "vulnerabilita",
    actorId: "projectzero",
    title: {
      it: "Meltdown e Spectre: falle nelle CPU",
      en: "Meltdown and Spectre: CPU flaws",
    },
    summary: {
      it: "Google Project Zero rende pubbliche tre varianti di attacco side-channel — Meltdown e Spectre — capaci di leggere memoria privilegiata su processori Intel, AMD e ARM.",
      en: "Google Project Zero discloses three side-channel attack variants — Meltdown and Spectre — able to read privileged memory on Intel, AMD and ARM processors.",
    },
    detail: {
      it: "Varianti CVE-2017-5753, CVE-2017-5715 e CVE-2017-5754: il difetto nasce dall’esecuzione speculativa ed è legato al design hardware, non a un singolo software.",
      en: "Variants CVE-2017-5753, CVE-2017-5715 and CVE-2017-5754: the flaw stems from speculative execution and is bound to hardware design, not to a single piece of software.",
    },
    sourceLabel: {
      it: "Google Project Zero — Reading privileged memory with a side-channel",
      en: "Google Project Zero — Reading privileged memory with a side-channel",
    },
    sourceUrl:
      "https://googleprojectzero.blogspot.com/2018/01/reading-privileged-memory-with-side.html",
  },
  {
    id: "cyber-2018-notpetya",
    date: "2018-02-15",
    type: "milestone",
    lens: "attacchi",
    actorId: "sandworm",
    title: {
      it: "Il Regno Unito attribuisce NotPetya alla Russia",
      en: "UK attributes NotPetya to Russia",
    },
    summary: {
      it: "Il governo britannico (FCO e NCSC) attribuisce l’attacco distruttivo NotPetya del giugno 2017 all’esercito russo: primo atto di attribuzione pubblica e formale di un attacco di Stato.",
      en: "The UK government (FCO and NCSC) attributes the destructive NotPetya attack of June 2017 to the Russian military: the first public, formal attribution of a state attack.",
    },
    detail: {
      it: "NotPetya prese di mira i settori finanziario, energetico e governativo ucraini, poi dilagò in Europa; il NCSC valutò la Russia responsabile «quasi certamente».",
      en: "NotPetya targeted Ukrainian financial, energy and government sectors, then spread across Europe; the NCSC assessed Russia was “almost certainly” responsible.",
    },
    sourceLabel: {
      it: "GOV.UK — Foreign & Commonwealth Office / NCSC",
      en: "GOV.UK — Foreign & Commonwealth Office / NCSC",
    },
    sourceUrl:
      "https://www.gov.uk/government/news/foreign-office-minister-condemns-russia-for-notpetya-attacks",
  },
  {
    id: "cyber-2019-ofac-lazarus",
    date: "2019-09-13",
    type: "sanction",
    lens: "attori",
    actorId: "lazarus",
    title: {
      it: "OFAC sanziona il gruppo Lazarus",
      en: "OFAC sanctions the Lazarus Group",
    },
    summary: {
      it: "Il Tesoro USA (OFAC) sanziona tre gruppi di hacking nordcoreani — Lazarus Group, Bluenoroff e Andariel — come entità controllate dal governo della RPDC ai sensi dell’E.O. 13722.",
      en: "The US Treasury (OFAC) sanctions three North Korean hacking groups — Lazarus Group, Bluenoroff and Andariel — as entities controlled by the DPRK government under E.O. 13722.",
    },
    detail: {
      it: "Prima designazione sanzionatoria per nome di elementi informatici nordcoreani; il Lazarus Group era stato legato al ransomware WannaCry e all’attacco a Sony Pictures.",
      en: "The first sanctions designation by name of North Korean cyber elements; the Lazarus Group had been linked to the WannaCry ransomware and the Sony Pictures attack.",
    },
    sourceLabel: {
      it: "US Treasury — OFAC press release sm774",
      en: "US Treasury — OFAC press release sm774",
    },
    sourceUrl: "https://home.treasury.gov/news/press-releases/sm774",
  },
  {
    id: "cyber-2020-zerologon",
    date: "2020-08-11",
    type: "milestone",
    lens: "vulnerabilita",
    actorId: "microsoft",
    title: {
      it: "Zerologon: escalation nei domain controller",
      en: "Zerologon: escalation in domain controllers",
    },
    summary: {
      it: "Microsoft pubblica l’aggiornamento per CVE-2020-1472 (Zerologon), una falla critica nel protocollo Netlogon che consente di assumere il controllo di un domain controller Windows senza credenziali.",
      en: "Microsoft releases the fix for CVE-2020-1472 (Zerologon), a critical flaw in the Netlogon protocol that allows taking over a Windows domain controller without credentials.",
    },
    detail: {
      it: "Richiede solo l’accesso di rete al domain controller; CISA emanò una direttiva di emergenza che impose la mitigazione immediata delle istanze esposte.",
      en: "It requires only network access to the domain controller; CISA issued an emergency directive ordering immediate mitigation of exposed instances.",
    },
    sourceLabel: {
      it: "Microsoft MSRC — CVE-2020-1472",
      en: "Microsoft MSRC — CVE-2020-1472",
    },
    sourceUrl: "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2020-1472",
  },
  {
    id: "cyber-2020-apt41",
    date: "2020-09-16",
    type: "sanction",
    lens: "attori",
    actorId: "apt41",
    title: {
      it: "Il DOJ incrimina gli attaccanti di APT41",
      en: "DOJ indicts APT41 hackers",
    },
    summary: {
      it: "Il Dipartimento di Giustizia USA rende nota l’incriminazione di sette imputati, tra cui cinque cittadini cinesi del gruppo APT41, per intrusioni informatiche ai danni di oltre 100 vittime nel mondo.",
      en: "The US Department of Justice announces the indictment of seven defendants, including five Chinese nationals of the APT41 group, for computer intrusions against more than 100 victims worldwide.",
    },
    detail: {
      it: "Due indagati furono arrestati in Malesia; gli altri cinque sono latitanti in Cina. Il gruppo è tracciato anche come Barium, Winnti e Wicked Panda.",
      en: "Two defendants were arrested in Malaysia; the other five are fugitives in China. The group is also tracked as Barium, Winnti and Wicked Panda.",
    },
    sourceLabel: {
      it: "US DOJ — Office of Public Affairs",
      en: "US DOJ — Office of Public Affairs",
    },
    sourceUrl:
      "https://www.justice.gov/opa/pr/seven-international-cyber-defendants-including-apt41-actors-charged-connection-computer",
  },
  {
    id: "cyber-2020-sandworm",
    date: "2020-10-19",
    type: "sanction",
    lens: "attori",
    actorId: "sandworm",
    title: {
      it: "Il DOJ incrimina sei ufficiali del GRU (Sandworm)",
      en: "DOJ indicts six GRU (Sandworm) officers",
    },
    summary: {
      it: "Il DOJ incrimina sei ufficiali dell’unità 74455 del GRU russo (Sandworm) per il dispiegamento di malware distruttivo, tra cui NotPetya, che causò perdite per quasi un miliardo di dollari.",
      en: "The DOJ indicts six officers of Russian GRU unit 74455 (Sandworm) for deploying destructive malware, including NotPetya, which caused nearly one billion dollars in losses.",
    },
    detail: {
      it: "Le accuse riguardano anche gli attacchi alla rete elettrica ucraina, l’interferenza nelle elezioni francesi e il danneggiamento delle Olimpiadi invernali 2018.",
      en: "The charges also cover attacks on Ukraine’s power grid, interference in the French elections and disruption of the 2018 Winter Olympics.",
    },
    sourceLabel: {
      it: "US DOJ — Office of Public Affairs",
      en: "US DOJ — Office of Public Affairs",
    },
    sourceUrl:
      "https://www.justice.gov/opa/pr/six-russian-gru-officers-charged-connection-worldwide-deployment-destructive-malware-and",
  },
  {
    id: "cyber-2020-solarwinds",
    date: "2020-12-17",
    type: "milestone",
    lens: "attacchi",
    actorId: "cisa",
    title: {
      it: "SolarWinds: compromissione della supply chain",
      en: "SolarWinds: supply-chain compromise",
    },
    summary: {
      it: "CISA pubblica l’advisory AA20-352A sulla compromissione della catena di fornitura di SolarWinds Orion da parte di un attore APT, intrusione estesa ad agenzie federali e infrastrutture critiche.",
      en: "CISA releases advisory AA20-352A on the supply-chain compromise of SolarWinds Orion by an APT actor, an intrusion that reached federal agencies and critical infrastructure.",
    },
    detail: {
      it: "L’accesso iniziale avvenne tramite una DLL malevola in SolarWinds Orion almeno da marzo 2020; nell’aprile 2021 gli USA attribuirono l’attività all’SVR russo.",
      en: "Initial access came through a malicious DLL in SolarWinds Orion from at least March 2020; in April 2021 the US attributed the activity to Russia’s SVR.",
    },
    sourceLabel: {
      it: "CISA — Advisory AA20-352A",
      en: "CISA — Advisory AA20-352A",
    },
    sourceUrl: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a",
  },
  {
    id: "cyber-2021-proxylogon",
    date: "2021-03-02",
    type: "milestone",
    lens: "vulnerabilita",
    actorId: "microsoft",
    title: {
      it: "ProxyLogon: falle in Microsoft Exchange",
      en: "ProxyLogon: flaws in Microsoft Exchange",
    },
    summary: {
      it: "Microsoft pubblica le patch per CVE-2021-26855 e le altre falle di Exchange Server raccolte sotto il nome ProxyLogon, sfruttate attivamente contro la posta di organizzazioni di tutto il mondo.",
      en: "Microsoft releases patches for CVE-2021-26855 and the other Exchange Server flaws grouped as ProxyLogon, actively exploited against organisations’ mail servers worldwide.",
    },
    detail: {
      it: "CVE-2021-26855 è una falsificazione di richiesta lato server con punteggio base 9,1; lo sfruttamento fu attribuito a un gruppo sostenuto dalla Cina (Hafnium).",
      en: "CVE-2021-26855 is a server-side request forgery with a base score of 9.1; the exploitation was attributed to a China-backed group (Hafnium).",
    },
    sourceLabel: {
      it: "Microsoft MSRC — CVE-2021-26855",
      en: "Microsoft MSRC — CVE-2021-26855",
    },
    sourceUrl: "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-26855",
  },
  {
    id: "cyber-2021-colonial",
    date: "2021-05-10",
    type: "milestone",
    lens: "attacchi",
    actorId: "darkside",
    title: {
      it: "Colonial Pipeline: ransomware DarkSide",
      en: "Colonial Pipeline: DarkSide ransomware",
    },
    summary: {
      it: "L’FBI conferma che il ransomware DarkSide è responsabile della compromissione delle reti di Colonial Pipeline, che impose la chiusura temporanea del principale oleodotto statunitense.",
      en: "The FBI confirms that DarkSide ransomware is responsible for the compromise of Colonial Pipeline’s networks, which forced a temporary shutdown of the main US oil pipeline.",
    },
    detail: {
      it: "L’oleodotto trasportava circa il 45% del carburante consumato sulla costa orientale USA; l’azienda pagò circa 75 bitcoin di riscatto, in parte recuperati dal DOJ.",
      en: "The pipeline carried roughly 45% of fuel consumed on the US East Coast; the company paid about 75 bitcoin in ransom, partly recovered later by the DOJ.",
    },
    sourceLabel: {
      it: "FBI — Statement on Compromise of Colonial Pipeline Networks",
      en: "FBI — Statement on Compromise of Colonial Pipeline Networks",
    },
    sourceUrl:
      "https://www.fbi.gov/news/press-releases/fbi-statement-on-compromise-of-colonial-pipeline-networks",
  },
  {
    id: "cyber-2021-kev",
    date: "2021-11-03",
    type: "milestone",
    lens: "difese",
    actorId: "cisa",
    title: {
      it: "CISA lancia il catalogo KEV",
      en: "CISA launches the KEV catalog",
    },
    summary: {
      it: "CISA istituisce il catalogo delle vulnerabilità sfruttate in natura (Known Exploited Vulnerabilities), riferimento autorevole per dare priorità alla mitigazione delle falle già attaccate.",
      en: "CISA establishes the Known Exploited Vulnerabilities catalog, the authoritative reference for prioritising the mitigation of flaws already exploited in the wild.",
    },
    detail: {
      it: "La direttiva operativa BOD 22-01 collegata obbliga le agenzie federali USA a correggere le voci del catalogo entro scadenze fisse.",
      en: "The linked Binding Operational Directive BOD 22-01 requires US federal agencies to remediate catalogued entries by fixed deadlines.",
    },
    sourceLabel: {
      it: "CISA — Known Exploited Vulnerabilities Catalog",
      en: "CISA — Known Exploited Vulnerabilities Catalog",
    },
    sourceUrl: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
  },
  {
    id: "cyber-2021-log4shell",
    date: "2021-12-10",
    type: "milestone",
    lens: "vulnerabilita",
    title: {
      it: "Log4Shell: vulnerabilità critica in Log4j",
      en: "Log4Shell: critical flaw in Log4j",
    },
    summary: {
      it: "Viene resa pubblica CVE-2021-44228 (Log4Shell), una vulnerabilità di esecuzione di codice da remoto nella libreria Java Log4j presente in milioni di applicazioni.",
      en: "CVE-2021-44228 (Log4Shell) is disclosed, a remote code execution vulnerability in the Java library Log4j present in millions of applications.",
    },
    detail: {
      it: "Punteggio CVSS base 10,0 (critico), sfruttabile senza autenticazione tramite richieste JNDI controllate dall’attaccante.",
      en: "Base CVSS score 10.0 (critical), exploitable without authentication via attacker-controlled JNDI lookups.",
    },
    sourceLabel: {
      it: "NVD — CVE-2021-44228",
      en: "NVD — CVE-2021-44228",
    },
    sourceUrl: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228",
  },
  {
    id: "cyber-2022-spring4shell",
    date: "2022-04-01",
    type: "milestone",
    lens: "vulnerabilita",
    title: {
      it: "Spring4Shell: RCE in Spring Framework",
      en: "Spring4Shell: RCE in Spring Framework",
    },
    summary: {
      it: "NVD registra CVE-2022-22965 (Spring4Shell), una vulnerabilità di esecuzione di codice da remoto in Spring Framework quando l’applicazione gira su Apache Tomcat come deployment WAR.",
      en: "NVD records CVE-2022-22965 (Spring4Shell), a remote code execution vulnerability in Spring Framework when an application runs on Apache Tomcat as a WAR deployment.",
    },
    detail: {
      it: "Punteggio CVSS base 9,8; le applicazioni deployate come Spring Boot executable JAR non erano vulnerabili.",
      en: "Base CVSS score 9.8; applications deployed as a Spring Boot executable JAR were not vulnerable.",
    },
    sourceLabel: {
      it: "NVD — CVE-2022-22965",
      en: "NVD — CVE-2022-22965",
    },
    sourceUrl: "https://nvd.nist.gov/vuln/detail/CVE-2022-22965",
  },
  {
    id: "cyber-2022-nis2",
    date: "2022-12-14",
    type: "legislative",
    lens: "politica",
    actorId: "eu",
    title: {
      it: "NIS2: nuovo quadro UE sulla cybersicurezza",
      en: "NIS2: new EU cybersecurity framework",
    },
    summary: {
      it: "Viene adottata la Direttiva (UE) 2022/2555 (NIS2), che amplia gli obblighi di cybersicurezza a più settori, introduce requisiti di gestione del rischio e un regime sanzionatorio armonizzato.",
      en: "Directive (EU) 2022/2555 (NIS2) is adopted, extending cybersecurity duties to more sectors, adding risk-management requirements and a harmonised sanctions regime.",
    },
    detail: {
      it: "Sostituisce la direttiva NIS del 2016 ed estende l’ambito a migliaia di entità; il recepimento negli Stati membri era dovuto entro il 17 ottobre 2024.",
      en: "It replaces the 2016 NIS Directive and extends scope to thousands of entities; member states were due to transpose it by 17 October 2024.",
    },
    sourceLabel: {
      it: "EUR-Lex — Direttiva (UE) 2022/2555",
      en: "EUR-Lex — Directive (EU) 2022/2555",
    },
    sourceUrl: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj",
  },
  {
    id: "cyber-2023-moveit",
    date: "2023-06-07",
    type: "milestone",
    lens: "attacchi",
    actorId: "cl0p",
    title: {
      it: "MOVEit: Cl0p sfrutta una zero-day",
      en: "MOVEit: Cl0p exploits a zero-day",
    },
    summary: {
      it: "CISA e i partner pubblicano l’advisory AA23-158A sullo sfruttamento da parte del gruppo Cl0p della vulnerabilità CVE-2023-34362 in MOVEit Transfer, con esfiltrazione di dati su larga scala.",
      en: "CISA and partners publish advisory AA23-158A on the Cl0p group’s exploitation of CVE-2023-34362 in MOVEit Transfer, with large-scale data exfiltration.",
    },
    detail: {
      it: "Il difetto era un’iniezione SQL in MOVEit Transfer; numerose organizzazioni e decine di milioni di cartelle risultarono compromesse.",
      en: "The flaw was a SQL injection in MOVEit Transfer; numerous organisations and tens of millions of folders were compromised.",
    },
    sourceLabel: {
      it: "CISA — Advisory AA23-158A",
      en: "CISA — Advisory AA23-158A",
    },
    sourceUrl: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-158a",
  },
  {
    id: "cyber-2023-libwebp",
    date: "2023-09-12",
    type: "milestone",
    lens: "vulnerabilita",
    title: {
      it: "Libwebp: overflow heap in Chrome e librerie",
      en: "Libwebp: heap overflow in Chrome and libraries",
    },
    summary: {
      it: "NVD registra CVE-2023-4863, un heap buffer overflow in libwebp sfruttabile con una pagina HTML malevola, che coinvolse sia Chrome sia innumerevoli applicazioni che usano la libreria.",
      en: "NVD records CVE-2023-4863, a heap buffer overflow in libwebp exploitable via a malicious HTML page, affecting both Chrome and countless applications using the library.",
    },
    detail: {
      it: "Punteggio CVSS base 8,8; la falla riguarda la decodifica delle immagini WebP ed è sfruttabile da remoto tramite browser.",
      en: "Base CVSS score 8.8; the flaw lies in WebP image decoding and is remotely exploitable through the browser.",
    },
    sourceLabel: {
      it: "NVD — CVE-2023-4863",
      en: "NVD — CVE-2023-4863",
    },
    sourceUrl: "https://nvd.nist.gov/vuln/detail/CVE-2023-4863",
  },
  {
    id: "cyber-2023-citrixbleed",
    date: "2023-10-10",
    type: "milestone",
    lens: "vulnerabilita",
    title: {
      it: "CitrixBleed: furto di sessioni da NetScaler",
      en: "CitrixBleed: session theft from NetScaler",
    },
    summary: {
      it: "Citrix pubblica il bollettino per CVE-2023-4966 (CitrixBleed), una divulgazione di informazioni nei dispositivi NetScaler ADC e Gateway che consente di aggirare l’MFA e dirottare le sessioni.",
      en: "Citrix issues the bulletin for CVE-2023-4966 (CitrixBleed), an information disclosure in NetScaler ADC and Gateway devices that allows bypassing MFA and hijacking sessions.",
    },
    detail: {
      it: "Punteggio CVSS 9,4; lo sfruttamento è stato osservato in campagne di ransomware, tra cui quelle del gruppo LockBit, per eludere l’autenticazione a più fattori.",
      en: "CVSS score 9.4; exploitation was observed in ransomware campaigns, including by the LockBit group, to bypass multi-factor authentication.",
    },
    sourceLabel: {
      it: "Citrix — Security Bulletin CTX579459",
      en: "Citrix — Security Bulletin CTX579459",
    },
    sourceUrl:
      "https://support.citrix.com/article/CTX579459/netscaler-adc-and-netscaler-gateway-security-bulletin-for-cve20234966-and-cve20234967",
  },
  {
    id: "cyber-2024-lockbit-cronos",
    date: "2024-02-20",
    type: "milestone",
    lens: "difese",
    actorId: "lockbit",
    title: {
      it: "Operation Cronos: smantellato LockBit",
      en: "Operation Cronos: LockBit taken down",
    },
    summary: {
      it: "La National Crime Agency britannica, con Europol e partner internazionali, assume il controllo dell’infrastruttura del gruppo ransomware LockBit nell’operazione Cronos.",
      en: "The UK National Crime Agency, with Europol and international partners, seizes control of the LockBit ransomware group’s infrastructure in Operation Cronos.",
    },
    detail: {
      it: "Furono sequestrati 28 server e oltre 1.000 chiavi di decifratura; due affiliati arrestati e oltre 200 portafogli di criptovalute congelati.",
      en: "Twenty-eight servers and over 1,000 decryption keys were seized; two affiliates were arrested and more than 200 cryptocurrency wallets frozen.",
    },
    sourceLabel: {
      it: "UK National Crime Agency — Operation Cronos",
      en: "UK National Crime Agency — Operation Cronos",
    },
    sourceUrl:
      "https://www.nationalcrimeagency.gov.uk/news/nca-leads-international-investigation-targeting-worlds-most-harmful-ransomware-group",
  },
  {
    id: "cyber-2024-change-healthcare",
    date: "2024-02-21",
    type: "milestone",
    lens: "attacchi",
    title: {
      it: "Change Healthcare: paralisi dei rimborsi USA",
      en: "Change Healthcare: US claims system paralysed",
    },
    summary: {
      it: "UnitedHealth rivela che la sua unità Change Healthcare ha subito un attacco ransomware (gruppo BlackCat/ALPHV), con conseguenze nazionali sui rimborsi assicurativi e sulle farmacie.",
      en: "UnitedHealth discloses that its unit Change Healthcare suffered a ransomware attack (BlackCat/ALPHV group), with nationwide consequences for insurance claims and pharmacies.",
    },
    detail: {
      it: "Secondo il Congressional Research Service l’accesso avvenne con credenziali rubate; l’azienda pagò circa 22 milioni di dollari in bitcoin, con costi stimati oltre 1,5 miliardi.",
      en: "Per the Congressional Research Service, access came through stolen credentials; the company paid about $22 million in bitcoin, with costs estimated above $1.5 billion.",
    },
    sourceLabel: {
      it: "Congressional Research Service — IN12330",
      en: "Congressional Research Service — IN12330",
    },
    sourceUrl:
      "https://www.congress.gov/crs_external_products/IN/PDF/IN12330/IN12330.6.pdf",
  },
  {
    id: "cyber-2024-xz",
    date: "2024-03-29",
    type: "milestone",
    lens: "vulnerabilita",
    title: {
      it: "XZ Utils: backdoor nella catena di fornitura",
      en: "XZ Utils: supply-chain backdoor",
    },
    summary: {
      it: "Andres Freund segnala sulla lista Openwall oss-security una backdoor nel ramo upstream di xz/liblzma, progettata per compromettere i server SSH: un caso esemplare di rischio nella manutenzione open source.",
      en: "Andres Freund reports to the Openwall oss-security list a backdoor in the upstream xz/liblzma tree, designed to compromise SSH servers: a textbook case of open-source maintenance risk.",
    },
    detail: {
      it: "Interessava le versioni 5.6.0 e 5.6.1 (CVE-2024-3094); la backdoor fu introdotta da un manutentore che aveva guadagnato la fiducia del progetto nel tempo.",
      en: "It affected versions 5.6.0 and 5.6.1 (CVE-2024-3094); the backdoor was introduced by a maintainer who had gained the project’s trust over time.",
    },
    sourceLabel: {
      it: "Openwall — oss-security (29 mar 2024)",
      en: "Openwall — oss-security (29 Mar 2024)",
    },
    sourceUrl: "https://www.openwall.com/lists/oss-security/2024/03/29/4",
  },
  {
    id: "cyber-2024-pager",
    date: "2024-09-17",
    type: "milestone",
    lens: "attacchi",
    title: {
      it: "Libano: esplosione simultanea di cercapersone",
      en: "Lebanon: simultaneous pager explosions",
    },
    summary: {
      it: "Centinaia di cercapersone usati da Hezbollah esplodono quasi simultaneamente in Libano e in Siria, causando almeno nove morti e migliaia di feriti; il giorno dopo un secondo attacco colpì i walkie-talkie.",
      en: "Hundreds of pagers used by Hezbollah explode almost simultaneously across Lebanon and in Syria, killing at least nine people and injuring thousands; a second wave hit walkie-talkies the next day.",
    },
    detail: {
      it: "L’operazione, con dispositivi attivati da remoto, è un caso di manipolazione della catena di fornitura hardware; Hezbollah e il governo libanese attribuirono l’attacco a Israele.",
      en: "The operation, using remotely triggered devices, is a case of hardware supply-chain tampering; Hezbollah and the Lebanese government blamed Israel for the attack.",
    },
    sourceLabel: {
      it: "AP News — Lebanon pager explosions",
      en: "AP News — Lebanon pager explosions",
    },
    sourceUrl:
      "https://apnews.com/article/lebanon-hezbollah-israel-exploding-pagers-8893a09816410959b6fe94aec124461b",
  },
  {
    id: "cyber-2024-cra",
    date: "2024-10-23",
    type: "legislative",
    lens: "politica",
    actorId: "eu",
    title: {
      it: "Cyber Resilience Act: sicurezza dei prodotti digitali",
      en: "Cyber Resilience Act: security of digital products",
    },
    summary: {
      it: "Viene adottato il Regolamento (UE) 2024/2847 (Cyber Resilience Act), che impone requisiti di cybersicurezza per i prodotti con elementi digitali immessi sul mercato UE lungo tutto il ciclo di vita.",
      en: "Regulation (EU) 2024/2847 (Cyber Resilience Act) is adopted, imposing cybersecurity requirements on products with digital elements placed on the EU market throughout their lifecycle.",
    },
    detail: {
      it: "Introduce obblighi per i produttori, un regime di conformità e di notifica delle vulnerabilità; la piena applicazione è prevista dal dicembre 2027.",
      en: "It introduces duties for manufacturers, a conformity regime and vulnerability reporting; full application is expected from December 2027.",
    },
    sourceLabel: {
      it: "EUR-Lex — Regolamento (UE) 2024/2847",
      en: "EUR-Lex — Regulation (EU) 2024/2847",
    },
    sourceUrl: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj",
  },
  {
    id: "cyber-2024-salt-typhoon",
    date: "2024-11-13",
    type: "milestone",
    lens: "attacchi",
    actorId: "cisa",
    title: {
      it: "Salt Typhoon: spionaggio nelle telecomunicazioni",
      en: "Salt Typhoon: espionage in telecommunications",
    },
    summary: {
      it: "FBI e CISA pubblicano una dichiarazione congiunta sullo spionaggio informatico cinese nelle infrastrutture di telecomunicazione statunitensi, con furto di metadati e intercettazione di comunicazioni private.",
      en: "The FBI and CISA publish a joint statement on Chinese cyber espionage in US telecommunications infrastructure, with theft of metadata and interception of private communications.",
    },
    detail: {
      it: "L’attività, attribuita ad attori legati alla RPC (Salt Typhoon), compromise le reti di più operatori telefonici statunitensi e informazioni soggette a richieste delle forze dell’ordine.",
      en: "The activity, attributed to PRC-linked actors (Salt Typhoon), compromised the networks of multiple US telecom carriers and information subject to law-enforcement requests.",
    },
    sourceLabel: {
      it: "CISA/FBI — Joint Statement (13 nov 2024)",
      en: "CISA/FBI — Joint Statement (13 Nov 2024)",
    },
    sourceUrl:
      "https://www.cisa.gov/news-events/news/joint-statement-fbi-and-cisa-peoples-republic-china-prc-targeting-commercial-telecommunications",
  },
  {
    id: "cyber-2025-ivanti-csa",
    date: "2025-01-22",
    type: "milestone",
    lens: "vulnerabilita",
    actorId: "cisa",
    title: {
      it: "Ivanti CSA: vulnerabilità concatenate e sfruttate",
      en: "Ivanti CSA: chained vulnerabilities exploited",
    },
    summary: {
      it: "CISA e FBI pubblicano un advisory congiunto sullo sfruttamento, nel settembre 2024, di quattro vulnerabilità nelle appliance Ivanti Cloud Service, concatenate per ottenere l’accesso e spostarsi lateralmente.",
      en: "CISA and the FBI publish a joint advisory on the September 2024 exploitation of four vulnerabilities in Ivanti Cloud Service Appliances, chained to gain access and move laterally.",
    },
    detail: {
      it: "Le falle sono CVE-2024-8963 (bypass amministrativo), CVE-2024-9379 (SQL injection) e CVE-2024-8190 e CVE-2024-9380 (esecuzione di codice da remoto).",
      en: "The flaws are CVE-2024-8963 (administrative bypass), CVE-2024-9379 (SQL injection) and CVE-2024-8190 and CVE-2024-9380 (remote code execution).",
    },
    sourceLabel: {
      it: "CISA/FBI — Advisory AA25-022A",
      en: "CISA/FBI — Advisory AA25-022A",
    },
    sourceUrl: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa25-022a",
  },
  {
    id: "cyber-2025-bybit",
    date: "2025-02-26",
    type: "statement",
    lens: "attori",
    actorId: "lazarus",
    title: {
      it: "FBI attribuisce il furto Bybit alla Corea del Nord",
      en: "FBI attributes the Bybit theft to North Korea",
    },
    summary: {
      it: "L’FBI attribuisce alla Corea del Nord il furto di circa 1,5 miliardi di dollari in criptovalute dalla piattaforma Bybit, avvenuto il 21 febbraio 2025, e battezza l’attività «TraderTraitor».",
      en: "The FBI attributes the theft of about $1.5 billion in cryptocurrency from the Bybit exchange, on 21 February 2025, to North Korea, naming the activity “TraderTraitor”.",
    },
    detail: {
      it: "È il più grande furto di criptovalute documentato fino ad allora; l’FBI pubblica 51 indirizzi Ethereum riconducibili al riciclaggio e chiede agli operatori di bloccarne le transazioni.",
      en: "It is the largest documented cryptocurrency theft up to that point; the FBI publishes 51 Ethereum addresses tied to the laundering and asks operators to block their transactions.",
    },
    sourceLabel: {
      it: "FBI/IC3 — PSA I-022625 (26 feb 2025)",
      en: "FBI/IC3 — PSA I-022625 (26 Feb 2025)",
    },
    sourceUrl: "https://www.ic3.gov/PSA/2025/PSA250226",
  },
  {
    id: "cyber-2025-toolshell",
    date: "2025-07-19",
    type: "milestone",
    lens: "vulnerabilita",
    actorId: "microsoft",
    title: {
      it: "ToolShell: esecuzione di codice in SharePoint",
      en: "ToolShell: code execution in SharePoint",
    },
    summary: {
      it: "Microsoft pubblica una patch fuori ciclo per CVE-2025-53770, una vulnerabilità critica di esecuzione di codice da remoto in SharePoint Server, sfruttata attivamente contro istanze on-premise.",
      en: "Microsoft releases an out-of-band patch for CVE-2025-53770, a critical remote code execution vulnerability in SharePoint Server, actively exploited against on-premises instances.",
    },
    detail: {
      it: "Punteggio CVSS 9,8 e debolezza CWE-502 (deserializzazione di dati non attendibili); CISA la aggiunge al catalogo KEV, imponendo la correzione alle agenzie federali entro il 21 luglio 2025.",
      en: "CVSS score 9.8 and CWE-502 (deserialization of untrusted data); CISA adds it to the KEV catalog, requiring federal agencies to patch by 21 July 2025.",
    },
    sourceLabel: {
      it: "Microsoft MSRC — CVE-2025-53770",
      en: "Microsoft MSRC — CVE-2025-53770",
    },
    sourceUrl: "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-53770",
  },
  {
    id: "cyber-2025-oracle-ebs",
    date: "2025-10-05",
    type: "milestone",
    lens: "vulnerabilita",
    title: {
      it: "Oracle E-Business Suite: zero-day sfruttata da Cl0p",
      en: "Oracle E-Business Suite: zero-day exploited by Cl0p",
    },
    summary: {
      it: "NVD registra CVE-2025-61882, una vulnerabilità critica di esecuzione di codice da remoto in Oracle E-Business Suite, sfruttata senza autenticazione da un attore che rivendica l’affiliazione al gruppo Cl0p.",
      en: "NVD records CVE-2025-61882, a critical remote code execution vulnerability in Oracle E-Business Suite, exploited without authentication by an actor claiming affiliation with the Cl0p group.",
    },
    detail: {
      it: "Punteggio CVSS 9,8 e debolezza CWE-287 (autenticazione impropria); Oracle rilascia una patch fuori ciclo e CISA inserisce la falla nel catalogo KEV il 6 ottobre 2025.",
      en: "CVSS score 9.8 and CWE-287 (improper authentication); Oracle releases an out-of-band patch and CISA adds the flaw to the KEV catalog on 6 October 2025.",
    },
    sourceLabel: {
      it: "NVD — CVE-2025-61882",
      en: "NVD — CVE-2025-61882",
    },
    sourceUrl: "https://nvd.nist.gov/vuln/detail/CVE-2025-61882",
  },
  {
    id: "cyber-2026-eu-package",
    date: "2026-01-20",
    type: "legislative",
    lens: "politica",
    actorId: "eu",
    title: {
      it: "Pacchetto UE: Cybersecurity Act 2 ed emendamenti a NIS2",
      en: "EU package: Cybersecurity Act 2 and NIS2 amendments",
    },
    summary: {
      it: "La Commissione europea propone un pacchetto sulla cibersicurezza: una revisione del Cybersecurity Act (CSA2) sulla sicurezza della filiera ICT e modifiche mirate alla direttiva NIS2.",
      en: "The European Commission proposes a cybersecurity package: a revision of the Cybersecurity Act (CSA2) on ICT supply-chain security and targeted amendments to the NIS2 Directive.",
    },
    detail: {
      it: "Il CSA2 introduce un quadro di sicurezza della filiera per 18 settori critici e rafforza ENISA; gli emendamenti a NIS2 semplificano la conformità per decine di migliaia di imprese e aggiungono una categoria di «small mid-cap».",
      en: "CSA2 introduces a supply-chain security framework for 18 critical sectors and reinforces ENISA; the NIS2 amendments simplify compliance for tens of thousands of companies and add a small mid-cap category.",
    },
    sourceLabel: {
      it: "Commissione europea — Comunicato IP/26/105",
      en: "European Commission — Press release IP/26/105",
    },
    sourceUrl: "https://ec.europa.eu/commission/presscorner/detail/en/ip_26_105",
  },
  {
    id: "cyber-2026-iran-plc",
    date: "2026-04-07",
    type: "milestone",
    lens: "attacchi",
    title: {
      it: "Iran: attacchi ai controllori industriali statunitensi",
      en: "Iran: attacks on US industrial controllers",
    },
    summary: {
      it: "CISA, FBI e partner avvertono che attori affiliati all’Iran stanno colpendo dispositivi operativi connessi a Internet, tra cui i controllori logici programmabili (PLC), in diversi settori critici statunitensi.",
      en: "CISA, the FBI and partners warn that Iranian-affiliated actors are targeting internet-connected operational technology, including programmable logic controllers (PLCs), across several US critical sectors.",
    },
    detail: {
      it: "Gli attacchi hanno causato interruzioni operative e perdite economiche, manipolando file di progetto e i dati mostrati su HMI e SCADA; l’aggiornamento di luglio 2026 estende l’allerta ai PLC Rockwell, Schneider e Siemens.",
      en: "The attacks caused operational disruption and financial loss by manipulating project files and the data shown on HMIs and SCADA; the July 2026 update extends the warning to Rockwell, Schneider and Siemens PLCs.",
    },
    sourceLabel: {
      it: "CISA — Advisory AA26-097A",
      en: "CISA — Advisory AA26-097A",
    },
    sourceUrl: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-097a",
  },
  {
    id: "cyber-2026-integrity-tech",
    date: "2026-10-08",
    type: "milestone",
    lens: "attacchi",
    actorId: "integritytech",
    title: {
      it: "Attori cinesi: scansione automatica e intrusione manuale",
      en: "Chinese actors: automated scanning and hands-on intrusion",
    },
    summary: {
      it: "CISA, FBI, NSA e agenzie di sei Paesi pubblicano un advisory congiunto su attori legati al governo cinese, abilitati dal gruppo Integrity Technology, che rubano dati sensibili dalle infrastrutture critiche.",
      en: "CISA, the FBI, the NSA and agencies from six countries publish a joint advisory on Chinese government-linked actors, enabled by the Integrity Technology Group, stealing sensitive data from critical infrastructure.",
    },
    detail: {
      it: "Combinano scansione automatica, botnet su larga scala e sfruttamento manuale su server Microsoft Exchange, con persistenza tramite VPN ed esfiltrazione di posta e credenziali.",
      en: "They combine automated scanning, large-scale botnets and hands-on exploitation of Microsoft Exchange servers, with persistence via VPN and exfiltration of mail and credentials.",
    },
    sourceLabel: {
      it: "CISA — Advisory AA26-281A",
      en: "CISA — Advisory AA26-281A",
    },
    sourceUrl: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-281a",
  },
  {
    id: "cyber-2026-beyondtrust",
    date: "2026-10-16",
    type: "milestone",
    lens: "difese",
    actorId: "cisa",
    title: {
      it: "CISA ordina la patch per BeyondTrust Remote Support",
      en: "CISA orders patching of BeyondTrust Remote Support",
    },
    summary: {
      it: "CISA segnala lo sfruttamento attivo di CVE-2026-102764, un bypass critico di autenticazione in BeyondTrust Remote Support usato per ottenere l’accesso iniziale e stabilire persistenza.",
      en: "CISA flags the active exploitation of CVE-2026-102764, a critical authentication bypass in BeyondTrust Remote Support used to gain initial access and establish persistence.",
    },
    detail: {
      it: "La vulnerabilità riguarda le versioni 26.2.3 e precedenti; l’agenzia la aggiunge al catalogo KEV e chiede la correzione delle istanze esposte entro il 19 ottobre 2026.",
      en: "The flaw affects versions 26.2.3 and earlier; the agency adds it to the KEV catalog and requires exposed instances to be remediated by 19 October 2026.",
    },
    sourceLabel: {
      it: "CISA — Alert (16 ott 2026)",
      en: "CISA — Alert (16 Oct 2026)",
    },
    sourceUrl:
      "https://www.cisa.gov/news-events/alerts/2026/10/16/cisa-urges-patching-critical-vulnerability-beyondtrust-remote-support",
  },
  {
    id: "cyber-2026-safepay",
    date: "2026-10-20",
    type: "milestone",
    lens: "attacchi",
    actorId: "safepay",
    title: {
      it: "SafePay: ransomware sulle infrastrutture critiche",
      en: "SafePay: ransomware on critical infrastructure",
    },
    summary: {
      it: "CISA, FBI, Secret Service e partner internazionali pubblicano un advisory congiunto sul gruppo ransomware SafePay, tra i più attivi del 2026, con almeno 600 vittime in più settori critici.",
      en: "CISA, the FBI, the Secret Service and international partners publish a joint advisory on the SafePay ransomware group, among the most active of 2026, with at least 600 victims across critical sectors.",
    },
    detail: {
      it: "Attivo dal 2024, il gruppo sfrutta vulnerabilità note in dispositivi Cisco ASA/FTD, Veeam Backup & Replication e SonicWall SonicOS, tutte presenti nel catalogo KEV.",
      en: "Active since 2024, the group exploits known flaws in Cisco ASA/FTD devices, Veeam Backup & Replication and SonicWall SonicOS, all listed in the KEV catalog.",
    },
    sourceLabel: {
      it: "CISA — Advisory AA26-293A",
      en: "CISA — Advisory AA26-293A",
    },
    sourceUrl: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-293a",
  },
  {
    id: "cyber-2026-binance",
    date: "2026-10-31",
    type: "statement",
    lens: "attori",
    actorId: "lazarus",
    title: {
      it: "Binance: 6 miliardi rubati, l’FBI accusa la Corea del Nord",
      en: "Binance: $6 billion stolen, FBI blames North Korea",
    },
    summary: {
      it: "L’FBI attribuisce alla Corea del Nord il furto di oltre 6 miliardi di dollari in criptovalute dalla piattaforma Binance, avvenuto il 29 ottobre 2026, e battezza l’attività «TraderTraitor».",
      en: "The FBI attributes the theft of more than $6 billion in cryptocurrency from the Binance exchange, on 29 October 2026, to North Korea, naming the activity “TraderTraitor”.",
    },
    detail: {
      it: "È il più grande furto di criptovalute mai documentato, circa quattro volte quello di Bybit del febbraio 2025. Con il Secret Service e l’IRS-CI, l’FBI pubblica oltre 600 indirizzi — in gran parte Ethereum — riconducibili al riciclaggio e chiede agli operatori di bloccarne le transazioni.",
      en: "It is the largest cryptocurrency theft ever documented, about four times the February 2025 Bybit heist. With the Secret Service and IRS-CI, the FBI publishes over 600 addresses — mostly Ethereum — tied to the laundering and asks operators to block their transactions.",
    },
    sourceLabel: {
      it: "FBI — Cyber Alert (31 ott 2026)",
      en: "FBI — Cyber Alert (31 Oct 2026)",
    },
    sourceUrl:
      "https://www.fbi.gov/investigate/cyber/alerts/2026/north-korea-responsible-for-6-billion-binance-attack",
  },
];
