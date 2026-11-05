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
    id: "cyber-2017-industroyer",
    date: "2017-06-12",
    type: "milestone",
    lens: "attacchi",
    actorId: "cisa",
    title: {
      it: "CrashOverride (Industroyer): malware per la rete elettrica",
      en: "CrashOverride (Industroyer): malware for the power grid",
    },
    summary: {
      it: "CISA e il NCCIC pubblicano l’alert TA17-163A sul malware CrashOverride (Industroyer), una piattaforma costruita per comandare direttamente gli interruttori delle sottostazioni elettriche, usata contro l’infrastruttura critica ucraina.",
      en: "CISA and the NCCIC publish alert TA17-163A on the CrashOverride (Industroyer) malware, a platform built to command power-substation switches directly, used against Ukrainian critical infrastructure.",
    },
    detail: {
      it: "È il primo malware documentato capace di parlare nativamente i protocolli industriali (IEC 60870-5-101, IEC 61850) senza bisogno di un exploit: il codice sa comandare i dispositivi di campo. Nel dicembre 2016 una sua variante causò un blackout a Kyiv.",
      en: "It is the first malware documented to speak industrial protocols natively (IEC 60870-5-101, IEC 61850) without needing an exploit: the code can command field devices. In December 2016 a variant of it caused a blackout in Kyiv.",
    },
    sourceLabel: {
      it: "CISA — Alert TA17-163A",
      en: "CISA — Alert TA17-163A",
    },
    sourceUrl: "https://www.cisa.gov/news-events/alerts/2017/06/12/crashoverride-malware",
  },
  {
    id: "cyber-2017-krack",
    date: "2017-10-16",
    type: "milestone",
    lens: "vulnerabilita",
    title: {
      it: "KRACK: la reinstallazione delle chiavi in WPA2",
      en: "KRACK: key reinstallation in WPA2",
    },
    summary: {
      it: "Vengono rese pubbliche una serie di vulnerabilità nel four-way handshake del Wi-Fi protetto (WPA2): la principale, CVE-2017-13077, consente a un attaccante nella portata radio di reinstallare una chiave già in uso e decifrare il traffico.",
      en: "A set of vulnerabilities in the WPA2 four-way handshake is disclosed: the main one, CVE-2017-13077, lets an attacker within radio range reinstall a key already in use and decrypt traffic.",
    },
    detail: {
      it: "Non è un difetto di un singolo prodotto ma del protocollo WPA2 stesso, quindi riguarda praticamente ogni dispositivo Wi-Fi; la risposta arrivò come aggiornamenti firmware coordinati tra i produttori.",
      en: "It is not a flaw in a single product but in the WPA2 protocol itself, so it affects virtually every Wi-Fi device; the response came as coordinated firmware updates across vendors.",
    },
    sourceLabel: {
      it: "NVD — CVE-2017-13077",
      en: "NVD — CVE-2017-13077",
    },
    sourceUrl: "https://nvd.nist.gov/vuln/detail/CVE-2017-13077",
  },
  {
    id: "cyber-2017-mirai",
    date: "2017-12-13",
    type: "sanction",
    lens: "attori",
    actorId: "doj",
    title: {
      it: "Il DOJ annuncia i patteggiamenti dei creatori di Mirai",
      en: "DOJ announces guilty pleas of the Mirai creators",
    },
    summary: {
      it: "Il Dipartimento di Giustizia annuncia i patteggiamenti di Paras Jha, Josiah White e Dalton Norman, autori del botnet Mirai che nell’ottobre 2016 mise fuori uso ampie zone di internet con un attacco DDoS alla società DNS Dyn.",
      en: "The Department of Justice announces the guilty pleas of Paras Jha, Josiah White and Dalton Norman, authors of the Mirai botnet that in October 2016 knocked large parts of the internet offline with a DDoS attack on the DNS provider Dyn.",
    },
    detail: {
      it: "Mirai infettava centinaia di migliaia di dispositivi IoT con credenziali di fabbrica, poi li usava per colpire Dyn e i servizi che ne dipendevano (Twitter, Netflix, Reddit). Jha pubblicò il codice sorgente nell’autunno 2016, moltiplicando le varianti.",
      en: "Mirai infected hundreds of thousands of IoT devices using factory credentials, then used them to hit Dyn and the services relying on it (Twitter, Netflix, Reddit). Jha released the source code in autumn 2016, multiplying its variants.",
    },
    sourceLabel: {
      it: "US DOJ — Office of Public Affairs",
      en: "US DOJ — Office of Public Affairs",
    },
    sourceUrl:
      "https://www.justice.gov/opa/pr/justice-department-announces-charges-and-guilty-pleas-three-computer-crime-cases-involving",
  },
  {
    id: "cyber-2017-triton",
    date: "2017-12-18",
    type: "milestone",
    lens: "attacchi",
    actorId: "cisa",
    title: {
      it: "Triton (HatMan): colpiti i sistemi di sicurezza industriale",
      en: "Triton (HatMan): industrial safety systems targeted",
    },
    summary: {
      it: "CISA e il NCCIC pubblicano il report MAR-17-352-01 sul malware HatMan (Triton/TRISIS), che ha preso di mira i controller di sicurezza Schneider Electric Triconex di un impianto petrolchimico, riscrivendone il firmware in memoria.",
      en: "CISA and the NCCIC publish report MAR-17-352-01 on the HatMan (Triton/TRISIS) malware, which targeted the Schneider Electric Triconex safety controllers of a petrochemical plant, rewriting their firmware in memory.",
    },
    detail: {
      it: "È il primo caso noto di malware pensato per manipolare i sistemi strumentati di sicurezza (SIS), la barriera che dovrebbe fermare un incidente industriale: un attacco che non ruba dati ma minaccia vite.",
      en: "It is the first known case of malware designed to manipulate safety instrumented systems (SIS), the barrier meant to stop an industrial accident: an attack that does not steal data but threatens lives.",
    },
    sourceLabel: {
      it: "CISA — Malware Analysis Report MAR-17-352-01",
      en: "CISA — Malware Analysis Report MAR-17-352-01",
    },
    sourceUrl:
      "https://www.cisa.gov/sites/default/files/documents/MAR-17-352-01%20HatMan%E2%80%94Safety%20System%20Targeted%20Malware_S508C.pdf",
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
    id: "cyber-2018-cisa-act",
    date: "2018-11-16",
    type: "legislative",
    lens: "politica",
    actorId: "cisa",
    title: {
      it: "CISA Act: nasce l’agenzia federale USA",
      en: "CISA Act: the US federal agency is born",
    },
    summary: {
      it: "Il presidente firma il Cybersecurity and Infrastructure Security Agency Act (Public Law 115-278), che eleva la protezione delle infrastrutture critiche a un’agenzia autonoma del Dipartimento della Sicurezza Interna: nasce CISA.",
      en: "The President signs the Cybersecurity and Infrastructure Security Agency Act (Public Law 115-278), elevating critical-infrastructure protection into a standalone agency within the Department of Homeland Security: CISA is born.",
    },
    detail: {
      it: "Trasforma il National Protection and Programs Directorate in un’agenzia operativa, con un direttore nominato dal presidente e confermato dal Senato.",
      en: "It turns the National Protection and Programs Directorate into an operational agency, with a director nominated by the President and confirmed by the Senate.",
    },
    sourceLabel: {
      it: "govinfo — Public Law 115-278",
      en: "govinfo — Public Law 115-278",
    },
    sourceUrl: "https://www.govinfo.gov/content/pkg/PLAW-115publ278/pdf/PLAW-115publ278.pdf",
  },
  {
    id: "cyber-2019-eu-cybersecurity-act",
    date: "2019-04-17",
    type: "legislative",
    lens: "politica",
    actorId: "eu",
    title: {
      it: "Cybersecurity Act: certificazione UE e nuovo mandato ENISA",
      en: "Cybersecurity Act: EU certification and a new ENISA mandate",
    },
    summary: {
      it: "Il Parlamento e il Consiglio adottano il Regolamento (UE) 2019/881 (Cybersecurity Act), che dà a ENISA un mandato permanente e istituisce il quadro europeo di certificazione della cybersicurezza per prodotti, servizi e processi ICT.",
      en: "The Parliament and Council adopt Regulation (EU) 2019/881 (Cybersecurity Act), giving ENISA a permanent mandate and establishing the European cybersecurity certification framework for ICT products, services and processes.",
    },
    detail: {
      it: "Sostituisce il regolamento del 2013 sull’agenzia; la certificazione è volontaria e organizzata in schemi con livelli di garanzia crescenti.",
      en: "It replaces the 2013 regulation on the agency; certification is voluntary and organised in schemes with increasing levels of assurance.",
    },
    sourceLabel: {
      it: "EUR-Lex — Regolamento (UE) 2019/881",
      en: "EUR-Lex — Regulation (EU) 2019/881",
    },
    sourceUrl: "https://eur-lex.europa.eu/eli/reg/2019/881/oj",
  },
  {
    id: "cyber-2019-bluekeep",
    date: "2019-05-14",
    type: "milestone",
    lens: "vulnerabilita",
    actorId: "microsoft",
    title: {
      it: "BlueKeep: esecuzione di codice «wormable» via RDP",
      en: "BlueKeep: “wormable” code execution via RDP",
    },
    summary: {
      it: "Microsoft pubblica le patch per CVE-2019-0708 (BlueKeep), una vulnerabilità di esecuzione di codice da remoto nei Servizi Desktop Remoto di Windows, sfruttabile prima dell’autenticazione e senza interazione dell’utente.",
      en: "Microsoft releases patches for CVE-2019-0708 (BlueKeep), a remote code execution vulnerability in Windows Remote Desktop Services, exploitable before authentication and without user interaction.",
    },
    detail: {
      it: "È «wormable»: un malware che la sfrutta può propagarsi da un computer all’altro senza azione dell’utente. Microsoft e CISA lanciarono appelli straordinari alla patch, anche per i sistemi fuori supporto.",
      en: "It is “wormable”: malware exploiting it can spread from computer to computer without user action. Microsoft and CISA issued extraordinary calls to patch, including for out-of-support systems.",
    },
    sourceLabel: {
      it: "Microsoft MSRC — CVE-2019-0708",
      en: "Microsoft MSRC — CVE-2019-0708",
    },
    sourceUrl: "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2019-0708",
  },
  {
    id: "cyber-2019-equifax",
    date: "2019-07-22",
    type: "sanction",
    lens: "politica",
    title: {
      it: "Equifax: 575 milioni di dollari di multa per la violazione dei dati",
      en: "Equifax: $575 million penalty over the data breach",
    },
    summary: {
      it: "La FTC, il CFPB e 50 Stati raggiungono un accordo da 575 milioni di dollari — fino a 700 — con Equifax per la violazione del 2017 che espose i dati personali di circa 147 milioni di persone.",
      en: "The FTC, the CFPB and 50 states reach a $575 million settlement — up to $700 million — with Equifax over the 2017 breach that exposed the personal data of about 147 million people.",
    },
    detail: {
      it: "La FTC contestò a Equifax di non aver adottato misure di sicurezza ragionevoli e di aver usato uno strumento di scansione delle vulnerabilità che non copriva il difetto poi sfruttato.",
      en: "The FTC alleged Equifax failed to take reasonable security steps and used a vulnerability-scanning tool that did not cover the flaw later exploited.",
    },
    sourceLabel: {
      it: "FTC — Comunicato stampa (22 lug 2019)",
      en: "FTC — Press release (22 Jul 2019)",
    },
    sourceUrl:
      "https://www.ftc.gov/news-events/news/press-releases/2019/07/equifax-pay-575-million-part-settlement-ftc-cfpb-states-related-2017-data-breach",
  },
  {
    id: "cyber-2019-capital-one",
    date: "2019-08-28",
    type: "milestone",
    lens: "attacchi",
    actorId: "doj",
    title: {
      it: "Capital One: violati i dati di 100 milioni di clienti",
      en: "Capital One: data of 100 million customers breached",
    },
    summary: {
      it: "Il Dipartimento di Giustizia (Distretto Ovest di Washington) annuncia l’incriminazione di Paige A. Thompson per l’intrusione nei dati di Capital One e di oltre 30 altre organizzazioni, sottratti da account di cloud storage mal configurati.",
      en: "The Department of Justice (Western District of Washington) announces the indictment of Paige A. Thompson for intruding into the data of Capital One and more than 30 other organisations, taken from misconfigured cloud storage accounts.",
    },
    detail: {
      it: "Thompson, ex dipendente di un fornitore cloud, sfruttò un firewall mal configurato; i dati riguardavano circa 100 milioni di candidature a carte di credito.",
      en: "Thompson, a former cloud-provider employee, exploited a misconfigured firewall; the data concerned about 100 million credit-card applications.",
    },
    sourceLabel: {
      it: "US DOJ — Western District of Washington",
      en: "US DOJ — Western District of Washington",
    },
    sourceUrl:
      "https://www.justice.gov/usao-wdwa/pr/former-seattle-tech-worker-indicted-federal-charges-wire-fraud-and-computer-data-theft",
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
    id: "cyber-2021-emotet",
    date: "2021-01-27",
    type: "milestone",
    lens: "difese",
    actorId: "europol",
    title: {
      it: "Emotet: smantellato il botnet più pericoloso",
      en: "Emotet: the most dangerous botnet dismantled",
    },
    summary: {
      it: "Un’operazione internazionale coordinata da Europol ed Eurojust assume il controllo dell’infrastruttura di Emotet, il botnet nato come trojan bancario e diventato la porta d’ingresso per Trickbot e Ryuk.",
      en: "An international operation coordinated by Europol and Eurojust takes control of Emotet’s infrastructure, the botnet born as a banking trojan that had become the entry point for Trickbot and Ryuk.",
    },
    detail: {
      it: "Le autorità di otto Paesi (Paesi Bassi, Germania, USA, Regno Unito, Francia, Lituania, Canada e Ucraina) dirottarono il traffico delle macchine infette verso un server controllato dalle forze dell’ordine, neutralizzando la rete di comando.",
      en: "Authorities from eight countries (the Netherlands, Germany, the US, the UK, France, Lithuania, Canada and Ukraine) diverted infected machines’ traffic to a law-enforcement-controlled server, neutralising the command network.",
    },
    sourceLabel: {
      it: "Europol — EMOTET disrupted through global action",
      en: "Europol — EMOTET disrupted through global action",
    },
    sourceUrl:
      "https://www.europol.europa.eu/media-press/newsroom/news/world%E2%80%99s-most-dangerous-malware-emotet-disrupted-through-global-action",
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
    id: "cyber-2021-eo14028",
    date: "2021-05-12",
    type: "legislative",
    lens: "politica",
    actorId: "whitehouse",
    title: {
      it: "Ordine esecutivo 14028: la cybersicurezza federale USA",
      en: "Executive Order 14028: US federal cybersecurity",
    },
    summary: {
      it: "Il presidente Biden firma l’ordine esecutivo 14028 «Improving the Nation’s Cybersecurity», una risposta a SolarWinds che impone zero trust, notifica degli incidenti e trasparenza del software (SBOM) ai fornitori della pubblica amministrazione.",
      en: "President Biden signs Executive Order 14028, “Improving the Nation’s Cybersecurity”, a response to SolarWinds imposing zero trust, incident reporting and software transparency (SBOM) on federal suppliers.",
    },
    detail: {
      it: "Istituisce il Cyber Safety Review Board e fissa requisiti di sicurezza per la catena di fornitura del software governativo.",
      en: "It establishes the Cyber Safety Review Board and sets security requirements for the government software supply chain.",
    },
    sourceLabel: {
      it: "govinfo — Executive Order 14028 (Federal Register)",
      en: "govinfo — Executive Order 14028 (Federal Register)",
    },
    sourceUrl: "https://www.govinfo.gov/content/pkg/FR-2021-05-17/pdf/2021-10460.pdf",
  },
  {
    id: "cyber-2021-suex",
    date: "2021-09-21",
    type: "sanction",
    lens: "attori",
    actorId: "ofac",
    title: {
      it: "OFAC sanziona SUEX, primo exchange colpito",
      en: "OFAC sanctions SUEX, the first exchange hit",
    },
    summary: {
      it: "Il Tesoro USA (OFAC), con l’FBI, sanziona l’exchange di criptovalute SUEX per aver facilitato transazioni illecite legate ad almeno otto varianti di ransomware: è la prima designazione di un exchange.",
      en: "The US Treasury (OFAC), with the FBI, sanctions the SUEX cryptocurrency exchange for facilitating illicit transactions tied to at least eight ransomware variants: the first designation of an exchange.",
    },
    detail: {
      it: "L’analisi delle transazioni mostrò che oltre il 40% della storia nota di SUEX era associata ad attori illeciti; la designazione avvenne ai sensi dell’E.O. 13694.",
      en: "Transaction analysis showed over 40% of SUEX’s known history was associated with illicit actors; the designation was made under E.O. 13694.",
    },
    sourceLabel: {
      it: "US Treasury — OFAC press release jy0364",
      en: "US Treasury — OFAC press release jy0364",
    },
    sourceUrl: "https://home.treasury.gov/news/press-releases/jy0364",
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
    id: "cyber-2023-hive",
    date: "2023-01-26",
    type: "milestone",
    lens: "difese",
    actorId: "doj",
    title: {
      it: "Hive: l’FBI infiltra il gruppo ransomware per mesi",
      en: "Hive: the FBI infiltrates the ransomware group for months",
    },
    summary: {
      it: "Il DOJ annuncia di aver smantellato la rete ransomware Hive: l’FBI si era infiltrata nella sua rete nel luglio 2022, ottenendo le chiavi di decifratura e distribuendole alle vittime.",
      en: "The DOJ announces it dismantled the Hive ransomware network: the FBI had infiltrated it in July 2022, obtaining decryption keys and distributing them to victims.",
    },
    detail: {
      it: "Hive aveva colpito più di 1.500 vittime in oltre 80 Paesi; l’operazione impedì riscatti per oltre 130 milioni di dollari.",
      en: "Hive had targeted more than 1,500 victims in over 80 countries; the operation thwarted ransom demands worth more than $130 million.",
    },
    sourceLabel: {
      it: "US DOJ — Office of Public Affairs",
      en: "US DOJ — Office of Public Affairs",
    },
    sourceUrl:
      "https://www.justice.gov/archives/opa/pr/us-department-justice-disrupts-hive-ransomware-variant",
  },
  {
    id: "cyber-2023-wazawaka",
    date: "2023-05-16",
    type: "sanction",
    lens: "attori",
    actorId: "doj",
    title: {
      it: "Il DOJ incrimina «Wazawaka» e il Tesoro lo sanziona",
      en: "DOJ charges “Wazawaka” and Treasury sanctions him",
    },
    summary: {
      it: "Il DOJ rende noto che Mikhail Pavlovich Matveev, noto come Wazawaka, è stato incriminato nel New Jersey per aver partecipato alle operazioni ransomware LockBit, Babuk e Hive; il Tesoro lo sanziona.",
      en: "The DOJ announces that Mikhail Pavlovich Matveev, known as Wazawaka, has been charged in New Jersey for his role in the LockBit, Babuk and Hive ransomware operations; Treasury sanctions him.",
    },
    detail: {
      it: "Secondo l’atto di accusa, dal 2020 Matveev avrebbe partecipato a cospirazioni per diffondere tre varianti di ransomware, trasmettendo le richieste di riscatto alle vittime.",
      en: "Per the indictment, since 2020 Matveev allegedly took part in conspiracies to deploy three ransomware variants, transmitting the ransom demands to victims.",
    },
    sourceLabel: {
      it: "US DOJ — Office of Public Affairs",
      en: "US DOJ — Office of Public Affairs",
    },
    sourceUrl:
      "https://www.justice.gov/archives/opa/pr/russian-national-charged-ransomware-attacks-against-critical-infrastructure",
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
    id: "cyber-2024-volt-typhoon",
    date: "2024-02-07",
    type: "milestone",
    lens: "attacchi",
    actorId: "cisa",
    title: {
      it: "Volt Typhoon: attori cinesi pre-posizionati nelle infrastrutture USA",
      en: "Volt Typhoon: Chinese actors pre-positioned in US infrastructure",
    },
    summary: {
      it: "CISA, NSA e FBI pubblicano l’advisory AA24-038A: attori statuali cinesi (Volt Typhoon) mantengono accessi persistenti nelle reti IT di infrastrutture critiche statunitensi per possibili attacchi distruttivi in caso di crisi.",
      en: "CISA, NSA and the FBI publish advisory AA24-038A: Chinese state-sponsored actors (Volt Typhoon) maintain persistent access in the IT networks of US critical infrastructure for possible destructive attacks in a crisis.",
    },
    detail: {
      it: "I settori presi di mira includono comunicazioni, energia, trasporti e sistemi idrici e fognari; alcune posizioni durano almeno cinque anni e usano tecniche «living off the land».",
      en: "Targeted sectors include communications, energy, transport, and water and wastewater systems; some footholds last at least five years and use “living off the land” techniques.",
    },
    sourceLabel: {
      it: "CISA — Advisory AA24-038A",
      en: "CISA — Advisory AA24-038A",
    },
    sourceUrl: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a",
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
    id: "cyber-2024-endgame",
    date: "2024-05-30",
    type: "milestone",
    lens: "difese",
    actorId: "europol",
    title: {
      it: "Operation Endgame: colpito l’ecosistema dei dropper",
      en: "Operation Endgame: the dropper ecosystem hit",
    },
    summary: {
      it: "Europol annuncia Operation Endgame, la più grande operazione contro i botnet: sequestrati oltre 100 server legati ai dropper IcedID, SystemBC, Pikabot, Smokeloader, Bumblebee e Trickbot, con quattro arresti.",
      en: "Europol announces Operation Endgame, the largest ever operation against botnets: over 100 servers linked to the droppers IcedID, SystemBC, Pikabot, Smokeloader, Bumblebee and Trickbot seized, with four arrests.",
    },
    detail: {
      it: "Coordinata da Francia, Germania e Paesi Bassi dal 27 al 29 maggio 2024, colpì i servizi criminali che aprono la strada a ransomware, spyware e virus.",
      en: "Coordinated by France, Germany and the Netherlands from 27 to 29 May 2024, it struck the criminal services that pave the way for ransomware, spyware and viruses.",
    },
    sourceLabel: {
      it: "Europol — Operation Endgame",
      en: "Europol — Operation Endgame",
    },
    sourceUrl:
      "https://www.europol.europa.eu/media-press/newsroom/news/largest-ever-operation-against-botnets-hits-dropper-malware-ecosystem",
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
    id: "cyber-2024-solidarity",
    date: "2024-12-19",
    type: "legislative",
    lens: "politica",
    actorId: "eu",
    title: {
      it: "Cyber Solidarity Act: difesa comune europea",
      en: "Cyber Solidarity Act: a common European defence",
    },
    summary: {
      it: "Il Parlamento e il Consiglio adottano il Regolamento (UE) 2025/38 (Cyber Solidarity Act), che crea una rete europea di poli di sicurezza informatica, un meccanismo di emergenza e una riserva UE di fornitori fidati.",
      en: "The Parliament and Council adopt Regulation (EU) 2025/38 (Cyber Solidarity Act), creating a European network of cybersecurity hubs, an emergency mechanism and an EU reserve of trusted providers.",
    },
    detail: {
      it: "Introduce anche un meccanismo di revisione degli incidenti gravi; è entrato in vigore il 4 febbraio 2025, con fondi dal programma Europa digitale.",
      en: "It also introduces a review mechanism for large-scale incidents; it entered into force on 4 February 2025, funded by the Digital Europe Programme.",
    },
    sourceLabel: {
      it: "EUR-Lex — Regolamento (UE) 2025/38",
      en: "EUR-Lex — Regulation (EU) 2025/38",
    },
    sourceUrl: "https://eur-lex.europa.eu/eli/reg/2025/38/oj/eng",
  },
  {
    id: "cyber-2024-un-convention",
    date: "2024-12-24",
    type: "legislative",
    lens: "politica",
    actorId: "un",
    title: {
      it: "ONU: adottata la Convenzione contro il cybercrime",
      en: "UN: the Cybercrime Convention adopted",
    },
    summary: {
      it: "L’Assemblea generale delle Nazioni Unite adotta per consenso la Convenzione contro il cybercrime (risoluzione 79/243), il primo trattato globale sulla cooperazione contro i reati informatici e la condivisione delle prove elettroniche.",
      en: "The UN General Assembly adopts by consensus the Convention against Cybercrime (resolution 79/243), the first global treaty on cooperation against cyber offences and the sharing of electronic evidence.",
    },
    detail: {
      it: "Conclusa dopo cinque anni di negoziati, è aperta alla firma a Hanoi dal 25 ottobre 2025; entrerà in vigore dopo il quarantesimo strumento di ratifica.",
      en: "Concluded after five years of negotiations, it opened for signature in Hanoi on 25 October 2025; it will enter into force after the fortieth instrument of ratification.",
    },
    sourceLabel: {
      it: "UNODC — UN General Assembly adopts landmark convention on cybercrime",
      en: "UNODC — UN General Assembly adopts landmark convention on cybercrime",
    },
    sourceUrl:
      "https://www.unodc.org/unodc/en/press/releases/2024/December/un-general-assembly-adopts-landmark-convention-on-cybercrime.html",
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
    id: "cyber-2026-gunra",
    date: "2026-08-11",
    type: "milestone",
    lens: "attacchi",
    actorId: "gunra",
    title: {
      it: "Gunra: nuova ransomware-as-a-service sulle infrastrutture critiche",
      en: "Gunra: a new ransomware-as-a-service on critical infrastructure",
    },
    summary: {
      it: "CISA, FBI, NSA, DC3, Secret Service e l’agenzia coreana KNPA pubblicano un advisory congiunto su Gunra, ransomware-as-a-service comparso nel 2025 che colpisce sanità, finanza, governo e servizi professionali con un modello a doppia estorsione.",
      en: "CISA, the FBI, the NSA, DC3, the Secret Service and Korea’s KNPA publish a joint advisory on Gunra, a ransomware-as-a-service that appeared in 2025 and targets healthcare, finance, government and professional services with a double-extortion model.",
    },
    detail: {
      it: "L’accesso iniziale sfrutta CVE-2024-55591 e CVE-2025-24472 in dispositivi esposti a Internet; gli affiliati negoziano su un portale Tor e minacciano di pubblicare i dati esfiltrati entro cinque-sette giorni.",
      en: "Initial access exploits CVE-2024-55591 and CVE-2025-24472 in internet-facing devices; affiliates negotiate on a Tor portal and threaten to publish exfiltrated data within five to seven days.",
    },
    sourceLabel: {
      it: "CISA — Advisory AA26-222A",
      en: "CISA — Advisory AA26-222A",
    },
    sourceUrl: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-222a",
  },
  {
    id: "cyber-2026-siemens-plc",
    date: "2026-08-19",
    type: "milestone",
    lens: "attacchi",
    title: {
      it: "Siemens S7: attacchi ai controllori industriali guidati dall’IA",
      en: "Siemens S7: AI-driven attacks on industrial controllers",
    },
    summary: {
      it: "NSA, CISA, FBI, DOE ed EPA avvertono di una minaccia attiva ai controllori logici programmabili Siemens S7 (serie 200, 300, 400, 1200 e 1500) in settori critici statunitensi, con script di sfruttamento generati dall’IA camuffati da strumenti di monitoraggio.",
      en: "The NSA, CISA, the FBI, the DOE and the EPA warn of an active threat to Siemens S7 programmable logic controllers (200, 300, 400, 1200 and 1500 series) in US critical sectors, with AI-generated exploitation scripts disguised as monitoring tools.",
    },
    detail: {
      it: "L’attività colpisce manifattura critica, energia e acqua; le agenzie chiedono di inventariare i PLC, togliere dalla rete quelli esposti e applicare subito le patch di sicurezza.",
      en: "The activity hits critical manufacturing, energy and water; the agencies ask operators to inventory PLCs, take internet-exposed ones offline and apply security patches promptly.",
    },
    sourceLabel: {
      it: "CISA — Advisory AA26-231A",
      en: "CISA — Advisory AA26-231A",
    },
    sourceUrl: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-231a",
  },
  {
    id: "cyber-2026-sakura",
    date: "2026-08-19",
    type: "milestone",
    lens: "attacchi",
    title: {
      it: "Sakura Internet: accesso illecito ai sistemi",
      en: "Sakura Internet: unauthorised access to its systems",
    },
    summary: {
      it: "Il provider giapponese di cloud e data center Sakura Internet comunica un accesso illecito al sistema di gestione delle vendite, dove risiedono i dati contrattuali e dei membri.",
      en: "Japanese cloud and data-centre provider Sakura Internet discloses unauthorised access to its sales management system, which holds contract and member data.",
    },
    detail: {
      it: "L’indagine individua fino a 1.360.563 account potenzialmente coinvolti; in un incidente distinto su un server dedicato risultano interessati 951 account.",
      en: "The investigation identifies up to 1,360,563 potentially affected accounts; in a separate incident on a dedicated server, 951 accounts are involved.",
    },
    sourceLabel: {
      it: "Sakura Internet — Comunicato (19 ago 2026)",
      en: "Sakura Internet — Notice (19 Aug 2026)",
    },
    sourceUrl: "https://www.sakura.ad.jp/corporate/information/newsreleases/2026/08/19/1968225633/",
  },
  {
    id: "cyber-2026-owncloud",
    date: "2026-08-27",
    type: "milestone",
    lens: "vulnerabilita",
    title: {
      it: "ownCloud: CVE-2023-49105 sfruttata per rubare file",
      en: "ownCloud: CVE-2023-49105 exploited to steal files",
    },
    summary: {
      it: "CISA inserisce nel catalogo KEV CVE-2023-49105, un bypass di autenticazione nell’API WebDAV di ownCloud (CVSS 9,8), dopo la pubblicazione di un’intrusione in un istituto di ricerca nucleare filippino.",
      en: "CISA adds CVE-2023-49105 to the KEV catalog, an authentication bypass in ownCloud’s WebDAV API (CVSS 9.8), after an intrusion into a Philippine nuclear research institute was published.",
    },
    detail: {
      it: "La falla, corretta quasi tre anni prima, permette a chi conosce lo username di leggere, modificare o cancellare qualsiasi file dell’istanza; la scadenza federale di remediazione è fissata al 30 agosto 2026.",
      en: "The flaw, patched almost three years earlier, lets anyone who knows a username read, modify or delete any file in the instance; the federal remediation deadline is set for 30 August 2026.",
    },
    sourceLabel: {
      it: "NVD — CVE-2023-49105",
      en: "NVD — CVE-2023-49105",
    },
    sourceUrl: "https://nvd.nist.gov/vuln/detail/CVE-2023-49105",
  },
  {
    id: "cyber-2026-mckesson",
    date: "2026-08-28",
    type: "milestone",
    lens: "attacchi",
    actorId: "shinyhunters",
    title: {
      it: "McKesson: furto di dati sanitari rivendicato da ShinyHunters",
      en: "McKesson: healthcare data theft claimed by ShinyHunters",
    },
    summary: {
      it: "Il distributore farmaceutico statunitense McKesson rende noto un accesso non autorizzato ad applicazioni di terze parti con esfiltrazione di dati, rilevato il 25 agosto 2026.",
      en: "US pharmaceutical distributor McKesson discloses unauthorised access to third-party applications with data theft, detected on 25 August 2026.",
    },
    detail: {
      it: "Il gruppo di estorsione ShinyHunters rivendica circa 284 milioni di record di pazienti (circa 1 TB); il numero riflette righe grezze, non pazienti unici confermati.",
      en: "The ShinyHunters extortion group claims about 284 million patient records (roughly 1 TB); the figure reflects raw rows, not confirmed unique patients.",
    },
    sourceLabel: {
      it: "BleepingComputer — 28 ago 2026",
      en: "BleepingComputer — 28 Aug 2026",
    },
    sourceUrl: "https://www.bleepingcomputer.com/news/security/mckesson-discloses-breach-after-shinyhunters-claims-patient-data-theft/",
  },
  {
    id: "cyber-2026-xinbi",
    date: "2026-09-09",
    type: "sanction",
    lens: "attori",
    actorId: "ofac",
    title: {
      it: "Xinbi Guarantee: sanzionato il marketplace della cybercriminalità",
      en: "Xinbi Guarantee: the cybercrime marketplace sanctioned",
    },
    summary: {
      it: "Il Tesoro statunitense (OFAC) designa Xinbi Guarantee, marketplace in lingua cinese usato dalla criminalità informatica per truffe, frodi e riciclaggio, con oltre 24 miliardi di dollari movimentati da circa il 2022.",
      en: "The US Treasury (OFAC) designates Xinbi Guarantee, a Chinese-language marketplace used by cybercriminals for scams, fraud and money laundering, with over $24 billion processed since around 2022.",
    },
    detail: {
      it: "L’azione, coordinata con la Scam Center Strike Force del DOJ che sequestra infrastrutture e wallet, colpisce anche due società di supporto (Anwen Technology e SafeW Technology) e segue le sanzioni britanniche di marzo 2026.",
      en: "The action, coordinated with the DOJ’s Scam Center Strike Force which seizes infrastructure and wallets, also targets two supporting firms (Anwen Technology and SafeW Technology) and follows the UK sanctions of March 2026.",
    },
    sourceLabel: {
      it: "Treasury — Comunicato (9 set 2026)",
      en: "Treasury — Press release (9 Sep 2026)",
    },
    sourceUrl: "https://home.treasury.gov/news/press-releases/sb0624/",
  },
  {
    id: "cyber-2026-divd-zammad",
    date: "2026-09-21",
    type: "milestone",
    lens: "vulnerabilita",
    actorId: "divd",
    title: {
      it: "DIVD: un agente IA autonomo viola la rete con due zero-day",
      en: "DIVD: an autonomous AI agent breaches the network with two zero-days",
    },
    summary: {
      it: "L’Istituto olandese per la divulgazione delle vulnerabilità (DIVD) rende noto di essere stato violato da quello che valuta un agente IA autonomo, senza direzione umana, incatenando due zero-day in Zammad, l’helpdesk che gestisce la sua casella csirt@divd.nl.",
      en: "The Dutch Institute for Vulnerability Disclosure (DIVD) discloses that it was breached by what it assesses to be an autonomous AI agent, with no human direction, chaining two zero-days in Zammad, the helpdesk running its csirt@divd.nl mailbox.",
    },
    detail: {
      it: "CVE-2026-102489, un session hijack che porta a esecuzione di codice come utente zammad (CVSS 9,4), è concatenata con CVE-2026-102490, un’escalation locale a root; entrambe entrano nel catalogo KEV il 2 ottobre 2026.",
      en: "CVE-2026-102489, a session hijack leading to code execution as the zammad user (CVSS 9.4), is chained with CVE-2026-102490, a local escalation to root; both enter the KEV catalog on 2 October 2026.",
    },
    sourceLabel: {
      it: "CSIRT DIVD — CVE-2026-102489",
      en: "CSIRT DIVD — CVE-2026-102489",
    },
    sourceUrl: "https://csirt.divd.nl/CVE-2026-102489",
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
  {
    id: "cyber-2026-cold-chain",
    date: "2026-11-02",
    type: "milestone",
    lens: "attacchi",
    title: {
      it: "Catena del freddo: attacchi ai sistemi di refrigerazione in Europa",
      en: "Cold chain: attacks on refrigeration systems across Europe",
    },
    summary: {
      it: "Tra la notte del 1º e il 2 novembre 2026 i sistemi di refrigerazione di catene di supermercati in diversi Paesi dell’UE vengono manipolati, con temperature portate fino a 50 °C e cibo deperito; è la seconda ondata di una campagna iniziata l’11 ottobre.",
      en: "Between the night of 1 and 2 November 2026, refrigeration systems of supermarket chains in several EU countries are manipulated, with temperatures pushed up to 50 °C and food spoiling; it is the second wave of a campaign that began on 11 October.",
    },
    detail: {
      it: "Gli attacchi sfruttano controllori industriali Danfoss AK-SM/AK-SC e Copeland/Dixell XWEB attivando lo sbrinamento; gruppi legati all’intelligence militare russa ne hanno rivendicato la paternità, ma l’attribuzione non è ufficiale.",
      en: "The attacks exploit Danfoss AK-SM/AK-SC and Copeland/Dixell XWEB industrial controllers, triggering defrost; groups linked to Russian military intelligence have claimed them, but the attribution is not official.",
    },
    sourceLabel: {
      it: "ENISA — Comunicato congiunto (4 nov 2026)",
      en: "ENISA — Joint statement (4 Nov 2026)",
    },
    sourceUrl:
      "https://www.enisa.europa.eu/news/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu",
  },
  {
    id: "cyber-2026-crafty-falcon",
    date: "2026-11-04",
    type: "milestone",
    lens: "attacchi",
    actorId: "craftyfalcon",
    title: {
      it: "Crafty Falcon: attacchi guidati dall’IA alle finanze indiane",
      en: "Crafty Falcon: AI-driven attacks on Indian finance",
    },
    summary: {
      it: "CERT-In e il centro nazionale I4C avvertono banche, società finanziarie, fintech e piattaforme crypto dell’India di una campagna attiva e in escalation, ribattezzata Crafty Falcon, condotta con strumenti IA che sfruttano le API di pagamento e disborso per trasferimenti non autorizzati di fondi.",
      en: "CERT-In and the national I4C centre warn India’s banks, non-bank lenders, fintechs and crypto platforms of an active, escalating campaign, named Crafty Falcon, run with AI tools that exploit payment and disbursement APIs for unauthorised fund transfers.",
    },
    detail: {
      it: "È la prima volta che gli exchange di criptovalute compaiono esplicitamente tra i bersagli di un advisory di CERT-In; almeno due degli strumenti indicati sono collegati alla Cina.",
      en: "It is the first time cryptocurrency exchanges appear explicitly among the targets of a CERT-In advisory; at least two of the named tools are linked to China.",
    },
    sourceLabel: {
      it: "CERT-In / I4C — Advisory (4 nov 2026)",
      en: "CERT-In / I4C — Advisory (4 Nov 2026)",
    },
    sourceUrl:
      "https://i4c.mha.gov.in/theme/resources/advisories/AI-Assisted-Cyber-Attack-on-Banks-NBFCs.pdf",
  },
];
