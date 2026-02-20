import {
  type DigitalService,
  type DataType,
  type UsageFrequency,
  type ServiceCategory,
  digitalServices,
} from '@/lib/data/services';

export type ServiceUsage = {
  serviceId: string;
  frequency: UsageFrequency;
  sharesPersonalData?: boolean;
  uploadsDocuments?: boolean;
};

export type CategoryScore = {
  category: ServiceCategory;
  score: number;
  serviceCount: number;
};

export type CompanyExposure = {
  company: string;
  services: string[];
  dataTypes: DataType[];
};

export type RiskItem = {
  severity: 'high' | 'medium' | 'low';
  title: { it: string; en: string };
  description: { it: string; en: string };
};

export type QuickWin = {
  impact: 'high' | 'medium';
  action: { it: string; en: string };
  detail: { it: string; en: string };
  alternativeName?: string;
};

export type SuggestedContent = {
  type: 'course' | 'resource' | 'glossary';
  slug: string;
  relevanceScore: number;
};

export type ScenarioInsights = {
  privacyScore: number;
  categoryScores: CategoryScore[];
  totalDataTypes: DataType[];
  companyExposure: CompanyExposure[];
  aiTrainingCount: number;
  totalServices: number;
  risks: RiskItem[];
  quickWins: QuickWin[];
  suggestedContent: SuggestedContent[];
};

const frequencyMultiplier: Record<UsageFrequency, number> = {
  daily: 1.0,
  weekly: 0.7,
  rarely: 0.3,
};

function getService(id: string): DigitalService | undefined {
  return digitalServices.find((s) => s.id === id);
}

function computeCategoryScores(
  services: DigitalService[],
  usageMap: Map<string, ServiceUsage>
): CategoryScore[] {
  const grouped = new Map<ServiceCategory, DigitalService[]>();
  for (const s of services) {
    const list = grouped.get(s.category) ?? [];
    list.push(s);
    grouped.set(s.category, list);
  }

  return Array.from(grouped.entries()).map(([category, svcs]) => {
    const total = svcs.reduce((sum, svc) => {
      const usage = usageMap.get(svc.id);
      const freq = usage?.frequency ?? 'weekly';
      return sum + svc.privacyScore * frequencyMultiplier[freq];
    }, 0);
    const maxPossible = svcs.length * 10;
    const score = Math.round(100 - (total / maxPossible) * 100);
    return { category, score: Math.max(0, Math.min(100, score)), serviceCount: svcs.length };
  });
}

function computeCompanyExposure(services: DigitalService[]): CompanyExposure[] {
  const map = new Map<string, { services: Set<string>; dataTypes: Set<DataType> }>();
  for (const svc of services) {
    const companies = [svc.companyOwner, ...svc.thirdPartySharing];
    for (const company of companies) {
      const entry = map.get(company) ?? { services: new Set(), dataTypes: new Set() };
      entry.services.add(svc.name);
      svc.dataCollected.forEach((d) => entry.dataTypes.add(d));
      map.set(company, entry);
    }
  }

  return Array.from(map.entries())
    .map(([company, data]) => ({
      company,
      services: Array.from(data.services),
      dataTypes: Array.from(data.dataTypes),
    }))
    .sort((a, b) => b.services.length - a.services.length);
}

function buildRisks(
  services: DigitalService[],
  companyExposure: CompanyExposure[],
  aiTrainingCount: number,
  totalDataTypes: DataType[]
): RiskItem[] {
  const risks: RiskItem[] = [];

  const topCompany = companyExposure[0];
  if (topCompany && topCompany.services.length >= 3) {
    risks.push({
      severity: 'high',
      title: {
        it: `Concentrazione dati: ${topCompany.company}`,
        en: `Data concentration: ${topCompany.company}`,
      },
      description: {
        it: `${topCompany.company} ha accesso a ${topCompany.services.length} dei tuoi servizi. Questo crea un profilo molto dettagliato della tua vita digitale.`,
        en: `${topCompany.company} has access to ${topCompany.services.length} of your services. This creates a very detailed profile of your digital life.`,
      },
    });
  }

  if (aiTrainingCount > 0) {
    risks.push({
      severity: aiTrainingCount >= 3 ? 'high' : 'medium',
      title: {
        it: `${aiTrainingCount} servizi usano i tuoi dati per addestrare IA`,
        en: `${aiTrainingCount} services use your data for AI training`,
      },
      description: {
        it: 'I tuoi dati, conversazioni e contenuti contribuiscono ad addestrare modelli di intelligenza artificiale, spesso senza un opt-out chiaro.',
        en: 'Your data, conversations and content contribute to training AI models, often without a clear opt-out.',
      },
    });
  }

  if (totalDataTypes.includes('voice') || totalDataTypes.includes('audio_recordings')) {
    risks.push({
      severity: 'medium',
      title: {
        it: 'Registrazioni audio e vocali',
        en: 'Audio and voice recordings',
      },
      description: {
        it: 'Alcuni dei tuoi servizi raccolgono registrazioni vocali o audio ambientale, anche quando non li stai usando attivamente.',
        en: 'Some of your services collect voice recordings or ambient audio, even when you are not actively using them.',
      },
    });
  }

  if (totalDataTypes.includes('biometrics')) {
    risks.push({
      severity: 'high',
      title: {
        it: 'Dati biometrici raccolti',
        en: 'Biometric data collected',
      },
      description: {
        it: 'Dati biometrici come impronte facciali e pattern di digitazione vengono raccolti. Questi dati non possono essere cambiati se compromessi.',
        en: 'Biometric data like facial prints and typing patterns are being collected. This data cannot be changed if compromised.',
      },
    });
  }

  const highRiskServices = services.filter((s) => s.privacyScore >= 8);
  if (highRiskServices.length >= 3) {
    risks.push({
      severity: 'high',
      title: {
        it: `${highRiskServices.length} servizi ad alto rischio`,
        en: `${highRiskServices.length} high-risk services`,
      },
      description: {
        it: 'Stai usando diversi servizi con un livello di raccolta dati molto elevato. Insieme, creano un\'impronta digitale estremamente dettagliata.',
        en: 'You are using several services with very high data collection levels. Together, they create an extremely detailed digital footprint.',
      },
    });
  }

  if (totalDataTypes.includes('location')) {
    const locationServices = services.filter((s) => s.dataCollected.includes('location'));
    if (locationServices.length >= 3) {
      risks.push({
        severity: 'medium',
        title: {
          it: `${locationServices.length} servizi tracciano la tua posizione`,
          en: `${locationServices.length} services track your location`,
        },
        description: {
          it: 'Più servizi accedono contemporaneamente alla tua posizione, creando una cronologia completa dei tuoi spostamenti.',
          en: 'Multiple services simultaneously access your location, creating a complete history of your movements.',
        },
      });
    }
  }

  return risks
    .sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.severity] - order[b.severity];
    })
    .slice(0, 4);
}

function buildQuickWins(services: DigitalService[]): QuickWin[] {
  const wins: QuickWin[] = [];

  const highRiskWithAlts = services
    .filter((s) => s.privacyScore >= 7 && s.ethicalAlternatives.length > 0)
    .sort((a, b) => b.privacyScore - a.privacyScore);

  for (const svc of highRiskWithAlts.slice(0, 2)) {
    const alt = svc.ethicalAlternatives[0];
    wins.push({
      impact: 'high',
      action: {
        it: `Sostituisci ${svc.name} con ${alt.name}`,
        en: `Replace ${svc.name} with ${alt.name}`,
      },
      detail: alt.reason,
      alternativeName: alt.name,
    });
  }

  const trainingServices = services.filter((s) => s.trainingUsage);
  if (trainingServices.length > 0) {
    wins.push({
      impact: 'medium',
      action: {
        it: 'Disattiva il training IA dove possibile',
        en: 'Disable AI training where possible',
      },
      detail: {
        it: `${trainingServices.length} dei tuoi servizi usano i dati per il training. Controlla le impostazioni privacy di ciascuno.`,
        en: `${trainingServices.length} of your services use data for training. Check the privacy settings of each one.`,
      },
    });
  }

  const hasChromeOrWindows = services.some((s) => s.id === 'chrome' || s.id === 'windows');
  if (hasChromeOrWindows) {
    wins.push({
      impact: 'high',
      action: {
        it: 'Passa a Firefox come browser principale',
        en: 'Switch to Firefox as your main browser',
      },
      detail: {
        it: 'Il browser è il punto d\'accesso a tutto. Un browser che rispetta la privacy riduce il tracciamento su ogni sito visitato.',
        en: 'The browser is the gateway to everything. A privacy-respecting browser reduces tracking on every site visited.',
      },
      alternativeName: 'Firefox',
    });
  }

  return wins.slice(0, 3);
}

function collectSuggestedContent(services: DigitalService[]): SuggestedContent[] {
  const contentMap = new Map<string, { type: 'course' | 'resource' | 'glossary'; slug: string; count: number }>();

  for (const svc of services) {
    for (const ref of svc.relatedContent) {
      const key = `${ref.type}:${ref.slug}`;
      const existing = contentMap.get(key);
      if (existing) {
        existing.count++;
      } else {
        contentMap.set(key, { type: ref.type, slug: ref.slug, count: 1 });
      }
    }
  }

  return Array.from(contentMap.values())
    .map((c) => ({
      type: c.type,
      slug: c.slug,
      relevanceScore: c.count,
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 6);
}

export function calculateInsights(usages: ServiceUsage[]): ScenarioInsights {
  const usageMap = new Map(usages.map((u) => [u.serviceId, u]));

  const services = usages
    .map((u) => getService(u.serviceId))
    .filter((s): s is DigitalService => s !== undefined);

  if (services.length === 0) {
    return {
      privacyScore: 100,
      categoryScores: [],
      totalDataTypes: [],
      companyExposure: [],
      aiTrainingCount: 0,
      totalServices: 0,
      risks: [],
      quickWins: [],
      suggestedContent: [],
    };
  }

  const allDataTypes = [...new Set(services.flatMap((s) => s.dataCollected))];
  const aiTrainingCount = services.filter((s) => s.trainingUsage).length;
  const companyExposure = computeCompanyExposure(services);
  const categoryScores = computeCategoryScores(services, usageMap);

  const weightedTotal = services.reduce((sum, svc) => {
    const usage = usageMap.get(svc.id);
    const freq = usage?.frequency ?? 'weekly';
    let score = svc.privacyScore * frequencyMultiplier[freq];
    if (svc.category === 'ai' && usage?.sharesPersonalData) score *= 1.3;
    if (svc.category === 'ai' && usage?.uploadsDocuments) score *= 1.2;
    return sum + score;
  }, 0);

  const maxWeighted = services.length * 10;
  const privacyScore = Math.round(100 - (weightedTotal / maxWeighted) * 100);

  const risks = buildRisks(services, companyExposure, aiTrainingCount, allDataTypes);
  const quickWins = buildQuickWins(services);
  const suggestedContent = collectSuggestedContent(services);

  return {
    privacyScore: Math.max(0, Math.min(100, privacyScore)),
    categoryScores,
    totalDataTypes: allDataTypes,
    companyExposure,
    aiTrainingCount,
    totalServices: services.length,
    risks,
    quickWins,
    suggestedContent,
  };
}
