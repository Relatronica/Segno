'use client';

import { motion } from 'framer-motion';
import { useT } from '@/lib/i18n/useT';
import { ContactForm } from '@/components/contact/ContactForm';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export default function SegnalaContent() {
  const t = useT();

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh] bg-[radial-gradient(ellipse_at_12%_0%,oklch(0.48_0.17_25/_0.08),transparent_50%),linear-gradient(to_bottom,oklch(0.972_0.006_250),transparent)]"
      />

      <section className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <motion.div initial="hidden" animate="visible">
          <motion.p
            custom={0}
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.22em] text-mark/80"
          >
            Segno
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {t.segnala.title}
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-4 text-muted-foreground leading-relaxed"
          >
            {t.segnala.subtitle}
          </motion.p>
          <motion.div custom={3} variants={fadeUp} className="relative mt-10">
            <ContactForm />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
