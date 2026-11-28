import type { EventType } from '@/lib/data/trasparenza';
import type { DiscoverFeed } from './feeds';
import { CYBERSECURITY_SLUG, DATACENTER_SLUG, TIMELINE_SLUG } from '@/lib/db/timeline';

export type DiscoveryLaneRule = {
  lens: string;
  type: EventType;
  re: RegExp;
};

export type DiscoveryProfile = {
  slug: string;
  feeds: DiscoverFeed[];
  laneRules: DiscoveryLaneRule[];
  topicWords: RegExp;
  allowedHosts: string[];
};

function googleNews(query: string, label: string, lens: string, type: EventType, id: string): DiscoverFeed {
  return {
    id,
    label,
    url: `https://news.google.com/rss/search?q=${encodeURIComponent(`${query} when:7d`)}&hl=en-US&gl=US&ceid=US:en`,
    lens: lens as DiscoverFeed['lens'],
    type,
    group: 'policy',
    requiresPerson: false,
  };
}

const aiProfile: DiscoveryProfile = {
  slug: TIMELINE_SLUG,
  feeds: [],
  laneRules: [],
  topicWords: /(?:)/,
  allowedHosts: [],
};

export const DISCOVERY_PROFILES: Record<string, DiscoveryProfile> = {
  [TIMELINE_SLUG]: aiProfile,
  [CYBERSECURITY_SLUG]: {
    slug: CYBERSECURITY_SLUG,
    feeds: [
      googleNews('(CISA OR CERT OR CVE OR vulnerability) (breach OR ransomware OR vulnerability OR patch OR exploited)', 'CISA / CERT / CVE', 'difese', 'milestone', 'cyber-vulnerabilities'),
      googleNews('(ransomware OR cyberattack OR hack OR breach) (CISA OR FBI OR Europol OR NCSC)', 'Cyber incidents', 'attacchi', 'milestone', 'cyber-incidents'),
      googleNews('(OFAC OR DOJ OR Europol OR sanctions) (hacker OR ransomware OR cyber)', 'Cyber attribution and sanctions', 'attori', 'sanction', 'cyber-attribution'),
      googleNews('(NIS2 OR DORA OR "cyber resilience act" OR EU cybersecurity directive)', 'EU cyber policy', 'politica', 'legislative', 'cyber-policy'),
      googleNews('(CISA OR Europol OR FBI) (operation OR takedown OR disruption) ransomware', 'Joint operations and takedowns', 'difese', 'milestone', 'cyber-defence'),
    ],
    laneRules: [
      { lens: 'politica', type: 'legislative', re: /\b(nis2|dora|directive|regulation|law|act|europa|commission|framework|compliance)\b/i },
      { lens: 'attori', type: 'sanction', re: /\b(sanction|ofac|indictment|charging|attribution|group|actor|doj)\b/i },
      { lens: 'attacchi', type: 'milestone', re: /\b(breach|ransomware|attack|hack|incident|malware|cyberattack|compromise)\b/i },
      { lens: 'difese', type: 'milestone', re: /\b(takedown|disruption|patch|fix|mitigation|operation|joint|catalog|cisa|europol)\b/i },
      { lens: 'vulnerabilita', type: 'milestone', re: /\b(cve|vulnerability|exploit|zero[- ]day|flaw|kev)\b/i },
    ],
    topicWords: /\b(cyber|cybersecurity|ransomware|malware|vulnerability|vulnerabilities|cve|exploit|zero-day|breach|hacker|hacking|nis2|dora|europol|cisa|fbi|ofac)\b/i,
    allowedHosts: [
      'cisa.gov', 'nist.gov', 'europa.eu', 'enisa.europa.eu', 'europol.europa.eu',
      'ncsc.gov.uk', 'nationalcrimeagency.gov.uk', 'justice.gov', 'treasury.gov',
      'cve.org', 'nvd.nist.gov', 'cert.gov', 'reuters.com', 'bloomberg.com',
      'theguardian.com', 'bbc.com', 'politico.eu', 'apnews.com',
    ],
  },
  [DATACENTER_SLUG]: {
    slug: DATACENTER_SLUG,
    feeds: [
      googleNews('(data center OR datacenter OR data-centre) Italia Terna ARERA GSE', 'Data center Italia — rete ed energia', 'energia', 'milestone', 'dc-energy'),
      googleNews('(data center OR datacenter) Italia decreto DDL regione ARERA', 'Data center Italia — regolazione', 'regolazione', 'legislative', 'dc-regulation'),
      googleNews('(data center OR datacenter) Italia comune regione ricorso moratoria', 'Data center Italia — territorio', 'territorio', 'milestone', 'dc-territory'),
      googleNews('(data center OR datacenter) Italia Parlamento interrogazione audizione', 'Data center Italia — politica', 'politica', 'meeting', 'dc-politics'),
      googleNews('(data center OR datacenter) Italia investimento progetto operatore', 'Data center Italia — mercato', 'mercato', 'spending', 'dc-market'),
      googleNews('(data center OR datacenter) Italia acqua consumo ambiente', 'Data center Italia — ambiente', 'ambiente', 'milestone', 'dc-environment'),
    ],
    laneRules: [
      { lens: 'energia', type: 'milestone', re: /\b(terna|rete|grid|connession|energi|consumo|potenza|gw|mw|gse|power)\b/i },
      { lens: 'regolazione', type: 'legislative', re: /\b(decret|ddl|legge|deliber|circolare|norma|regolament|arera|acn|gazzetta)\b/i },
      { lens: 'territorio', type: 'milestone', re: /\b(comune|regione|comitato|ricorso|tar|moratoria|territori|manifestazione|accesso agli atti)\b/i },
      { lens: 'politica', type: 'meeting', re: /\b(parlamento|interrogazione|audizione|partito|ministro|governo|camera|senato)\b/i },
      { lens: 'mercato', type: 'spending', re: /\b(investiment|progetto|operatore|fondo|euro|milion|milard|annunci|acquist|sviluppo)\b/i },
      { lens: 'ambiente', type: 'milestone', re: /\b(acqua|ambiente|emission|sostenibil|suolo|clima|aria)\b/i },
      { lens: 'opinione', type: 'statement', re: /\b(comitato|cittadin|sondaggio|opinione|protesta|associazione)\b/i },
    ],
    topicWords: /\b(data center|datacenter|data-centre|terna|arera|gse|acn|consumo energetico|server|cloud|infrastruttura digitale)\b/i,
    allowedHosts: [
      'gazzettaufficiale.it', 'gov.it', 'mise.gov.it', 'mase.gov.it', 'terna.it', 'arera.it',
      'acn.gov.it', 'gse.it', 'camera.it', 'senato.it', 'regioni.it', 'comune.*',
      'ansa.it', 'repubblica.it', 'corriere.it', 'sole24ore.com', 'ilsole24ore.com',
      'radiocor.ilsole24ore.com', 'reuters.com', 'europa.eu',
    ],
  },
};

export function getDiscoveryProfile(slug: string): DiscoveryProfile | null {
  return DISCOVERY_PROFILES[slug] ?? null;
}
