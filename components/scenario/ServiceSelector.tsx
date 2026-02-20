'use client';

import { useScenarioStore } from '@/store/useScenarioStore';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import { digitalServices, serviceCategories } from '@/lib/data/services';
import { motion } from 'framer-motion';
import {
  Camera, Music, Users, AtSign, Briefcase, MessageSquare, Hash,
  MessageCircle, Send, Shield, Mail, HardDrive, FileText,
  Play, Tv, ShoppingCart, Bike, Car, Brain, Sparkles, Bot,
  Code, Image, Mic, PenTool, Globe, Monitor, Smartphone,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Camera, Music, Users, AtSign, Briefcase, MessageSquare, Hash,
  MessageCircle, Send, Shield, Mail, HardDrive, FileText,
  Play, Tv, ShoppingCart, Bike, Car, Brain, Sparkles, Bot,
  Code, Image, Mic, PenTool, Globe, Monitor, Smartphone,
};

function riskColor(score: number) {
  if (score <= 3) return 'bg-emerald-500/10 text-emerald-600';
  if (score <= 6) return 'bg-amber-500/10 text-amber-600';
  return 'bg-rose-500/10 text-rose-600';
}

export function ServiceSelector() {
  const { selectedCategories, selectedServiceIds, toggleService } = useScenarioStore();
  const locale = useAppStore((s) => s.locale);
  const t = useT();

  const filteredCategories = serviceCategories.filter((c) =>
    selectedCategories.includes(c.id)
  );

  return (
    <div>
      <h2 className="text-2xl font-bold sm:text-3xl">{t.mappaDigitale.step2Title}</h2>
      <p className="mt-2 text-muted-foreground">{t.mappaDigitale.step2Subtitle}</p>

      <div className="mt-8 space-y-10">
        {filteredCategories.map((cat) => {
          const catServices = digitalServices.filter((s) => s.category === cat.id);

          return (
            <div key={cat.id}>
              <h3 className="text-lg font-semibold">{cat.label[locale]}</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {catServices.map((svc, i) => {
                  const Icon = iconMap[svc.icon] ?? Globe;
                  const selected = selectedServiceIds.includes(svc.id);

                  return (
                    <motion.button
                      key={svc.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      onClick={() => toggleService(svc.id)}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                        selected
                          ? 'border-foreground bg-foreground/5 ring-1 ring-foreground/20'
                          : 'border-border/50 bg-card hover:border-border hover:shadow-sm'
                      }`}
                    >
                      <div className={`flex-shrink-0 rounded-lg p-2 ${riskColor(svc.privacyScore)}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-medium">{svc.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {svc.companyOwner}
                        </span>
                      </div>
                      <div
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          selected
                            ? 'border-foreground bg-foreground'
                            : 'border-muted-foreground/30'
                        }`}
                      >
                        {selected && (
                          <svg className="h-3 w-3 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {selectedServiceIds.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">{t.mappaDigitale.noServices}</p>
      )}
    </div>
  );
}
