'use client';

import { useScenarioStore } from '@/store/useScenarioStore';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import { serviceCategories } from '@/lib/data/services';
import { motion } from 'framer-motion';
import {
  Users,
  MessageCircle,
  Mail,
  Play,
  ShoppingCart,
  Brain,
  Monitor,
} from 'lucide-react';
import type { ServiceCategory } from '@/lib/data/services';

const iconMap: Record<string, React.ElementType> = {
  Users,
  MessageCircle,
  Mail,
  Play,
  ShoppingCart,
  Brain,
  Monitor,
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4 },
  }),
};

export function CategorySelector() {
  const { selectedCategories, toggleCategory } = useScenarioStore();
  const locale = useAppStore((s) => s.locale);
  const t = useT();

  return (
    <div>
      <h2 className="text-2xl font-bold sm:text-3xl">{t.mappaDigitale.step1Title}</h2>
      <p className="mt-2 text-muted-foreground">{t.mappaDigitale.step1Subtitle}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon] ?? Monitor;
          const selected = selectedCategories.includes(cat.id);

          return (
            <motion.button
              key={cat.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              onClick={() => toggleCategory(cat.id as ServiceCategory)}
              className={`group relative rounded-2xl border p-6 text-left transition-all ${
                selected
                  ? 'border-foreground bg-foreground/5 ring-1 ring-foreground/20'
                  : 'border-border/50 bg-card hover:border-border hover:shadow-md'
              }`}
            >
              <div
                className={`inline-flex rounded-xl p-3 transition-colors ${
                  selected
                    ? 'bg-foreground text-background'
                    : 'bg-accent text-muted-foreground group-hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold">{cat.label[locale]}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {cat.description[locale]}
              </p>

              {selected && (
                <motion.div
                  layoutId="category-check"
                  className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {selectedCategories.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">{t.mappaDigitale.noCategories}</p>
      )}
    </div>
  );
}
