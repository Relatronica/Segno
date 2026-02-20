'use client';

import { useScenarioStore } from '@/store/useScenarioStore';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import type { DigitalService, DataType } from '@/lib/data/services';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, Music, Users, AtSign, Briefcase, MessageSquare, Hash,
  MessageCircle, Send, Shield, Mail, HardDrive, FileText,
  Play, Tv, ShoppingCart, Bike, Car, Brain, Sparkles, Bot,
  Code, Image, Mic, PenTool, Globe, Monitor, Smartphone,
  ChevronDown,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Camera, Music, Users, AtSign, Briefcase, MessageSquare, Hash,
  MessageCircle, Send, Shield, Mail, HardDrive, FileText,
  Play, Tv, ShoppingCart, Bike, Car, Brain, Sparkles, Bot,
  Code, Image, Mic, PenTool, Globe, Monitor, Smartphone,
};

function riskBg(score: number) {
  if (score <= 3) return 'border-emerald-500/30 bg-emerald-500/5';
  if (score <= 6) return 'border-amber-500/30 bg-amber-500/5';
  return 'border-rose-500/30 bg-rose-500/5';
}

function riskDot(score: number) {
  if (score <= 3) return 'bg-emerald-500';
  if (score <= 6) return 'bg-amber-500';
  return 'bg-rose-500';
}

export function ServiceNode({ service, index }: { service: DigitalService; index: number }) {
  const { expandedServiceId, setExpandedServiceId } = useScenarioStore();
  const locale = useAppStore((s) => s.locale);
  const t = useT();

  const Icon = iconMap[service.icon] ?? Globe;
  const expanded = expandedServiceId === service.id;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`rounded-xl border ${riskBg(service.privacyScore)} transition-shadow hover:shadow-md`}
    >
      <button
        onClick={() => setExpandedServiceId(expanded ? null : service.id)}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{service.name}</span>
            <span className={`h-2 w-2 rounded-full ${riskDot(service.privacyScore)}`} />
          </div>
          <span className="text-xs text-muted-foreground">{service.companyOwner}</span>
        </div>
        {service.trainingUsage && (
          <span className="flex-shrink-0 rounded-md bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-600">
            AI Training
          </span>
        )}
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/30 px-4 pb-4 pt-3 text-sm">
              {/* Data collected */}
              <div>
                <span className="text-xs font-medium text-muted-foreground">
                  {t.mappaDigitale.insights.dataCollected}
                </span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {service.dataCollected.map((d) => (
                    <span
                      key={d}
                      className="rounded-md bg-accent px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {t.mappaDigitale.dataTypes[d as DataType]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Training */}
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">
                  {t.mappaDigitale.insights.usedForTraining}:
                </span>
                <span className={service.trainingUsage ? 'font-medium text-rose-500' : 'text-emerald-500'}>
                  {service.trainingUsage ? t.mappaDigitale.insights.yes : t.mappaDigitale.insights.no}
                </span>
              </div>

              {/* Alternatives */}
              {service.ethicalAlternatives.length > 0 && (
                <div className="mt-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    {t.mappaDigitale.insights.alternatives}
                  </span>
                  <div className="mt-1.5 space-y-1">
                    {service.ethicalAlternatives.map((alt) => (
                      <div key={alt.name} className="flex items-start gap-2 text-xs">
                        <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                        <div>
                          <span className="font-medium">{alt.name}</span>
                          <span className="text-muted-foreground"> — {alt.reason[locale]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
