import type { Course } from '../courses';
import { fondamentiSovranitaDigitaleLessons } from './fondamenti-sovranita-digitale';
import { privacyPraticaLessons } from './privacy-pratica';
import { dirittiDigitaliGdprLessons } from './diritti-digitali-gdpr';
import { intelligenzaArtificialeEticaLessons } from './intelligenza-artificiale-etica';
import { attivismoDigitaleLessons } from './attivismo-digitale';
import { alternativeEticheLessons } from './alternative-etiche';

export const courses: Course[] = [
  {
    id: '1',
    slug: 'fondamenti-sovranita-digitale',
    title: {
      it: 'Fondamenti di sovranità digitale',
      en: 'Digital sovereignty fundamentals',
    },
    description: {
      it: 'Scopri cosa significa davvero "sovranità digitale" e perché è importante per te. Un percorso introduttivo per capire come i tuoi dati vengono raccolti, usati e venduti.',
      en: 'Discover what "digital sovereignty" really means and why it matters to you. An introductory path to understand how your data is collected, used and sold.',
    },
    longDescription: {
      it: 'In questo percorso esplorerai le basi della sovranità digitale: dal funzionamento di internet alla raccolta dati, dal capitalismo della sorveglianza al tracciamento online. Imparerai perché i tuoi dati sono preziosi, chi li controlla e quali sono i primi passi concreti per riprendere il controllo della tua vita digitale.',
      en: 'In this course you will explore the foundations of digital sovereignty: from how the internet works to data collection, from surveillance capitalism to online tracking. You will learn why your data is valuable, who controls it, and what are the first concrete steps to take back control of your digital life.',
    },
    difficulty: 'beginner',
    lessonsCount: 8,
    duration: '2h',
    icon: 'Shield',
    color: 'from-blue-500 to-cyan-500',
    topics: ['privacy', 'dati', 'diritti'],
    lessons: fondamentiSovranitaDigitaleLessons,
  },
  {
    id: '2',
    slug: 'privacy-pratica',
    title: {
      it: 'Privacy in pratica',
      en: 'Privacy in practice',
    },
    description: {
      it: 'Impara a proteggere la tua privacy online con strumenti concreti: browser sicuri, VPN, gestori di password, crittografia e molto altro.',
      en: 'Learn to protect your online privacy with concrete tools: secure browsers, VPNs, password managers, encryption and much more.',
    },
    longDescription: {
      it: 'Un percorso pratico e orientato all\'azione: imparerai a valutare la tua esposizione digitale, scegliere browser e motori di ricerca rispettosi della privacy, usare email sicure e messaggistica criptata, gestire password in modo intelligente e molto altro. Alla fine avrai costruito la tua routine di privacy quotidiana.',
      en: 'A practical, action-oriented course: you will learn to assess your digital exposure, choose privacy-respecting browsers and search engines, use secure email and encrypted messaging, manage passwords smartly and much more. By the end you will have built your daily privacy routine.',
    },
    difficulty: 'beginner',
    lessonsCount: 10,
    duration: '3h',
    icon: 'Lock',
    color: 'from-emerald-500 to-teal-500',
    topics: ['privacy', 'strumenti', 'sicurezza'],
    lessons: privacyPraticaLessons,
  },
  {
    id: '3',
    slug: 'diritti-digitali-gdpr',
    title: {
      it: 'I tuoi diritti digitali e il GDPR',
      en: 'Your digital rights and GDPR',
    },
    description: {
      it: 'Conosci i tuoi diritti secondo il GDPR e le normative europee. Impara come esercitarli: accesso ai dati, cancellazione, portabilità e consenso informato.',
      en: 'Know your rights under GDPR and European regulations. Learn how to exercise them: data access, deletion, portability and informed consent.',
    },
    longDescription: {
      it: 'Il GDPR ti dà poteri concreti sui tuoi dati personali. In questo percorso approfondirai ogni diritto — accesso, rettifica, cancellazione, portabilità, opposizione — e imparerai come esercitarli nella pratica con lettere modello, procedure e risorse utili.',
      en: 'GDPR gives you concrete powers over your personal data. In this course you will explore each right — access, rectification, erasure, portability, objection — and learn how to exercise them in practice with template letters, procedures and useful resources.',
    },
    difficulty: 'intermediate',
    lessonsCount: 12,
    duration: '4h',
    icon: 'Scale',
    color: 'from-violet-500 to-purple-500',
    topics: ['GDPR', 'diritti', 'normativa'],
    lessons: dirittiDigitaliGdprLessons,
  },
  {
    id: '4',
    slug: 'intelligenza-artificiale-etica',
    title: {
      it: 'Intelligenza artificiale ed etica',
      en: 'Artificial intelligence and ethics',
    },
    description: {
      it: 'Comprendi come funziona l\'AI, quali rischi comporta e come l\'AI Act europeo sta cercando di regolamentarla. Bias, trasparenza e accountability.',
      en: 'Understand how AI works, what risks it entails and how the European AI Act is trying to regulate it. Bias, transparency and accountability.',
    },
    longDescription: {
      it: 'Dall\'apprendimento automatico al riconoscimento facciale, dall\'AI generativa alla sorveglianza: questo percorso ti guiderà attraverso le sfide etiche dell\'intelligenza artificiale. Capirai come le AI prendono decisioni, perché possono discriminare e come l\'Europa sta cercando di regolamentarle.',
      en: 'From machine learning to facial recognition, from generative AI to surveillance: this course will guide you through the ethical challenges of artificial intelligence. You will understand how AIs make decisions, why they can discriminate and how Europe is trying to regulate them.',
    },
    difficulty: 'intermediate',
    lessonsCount: 10,
    duration: '3.5h',
    icon: 'Brain',
    color: 'from-orange-500 to-red-500',
    topics: ['AI', 'etica', 'AI Act'],
    lessons: intelligenzaArtificialeEticaLessons,
  },
  {
    id: '5',
    slug: 'attivismo-digitale',
    title: {
      it: 'Attivismo digitale',
      en: 'Digital activism',
    },
    description: {
      it: 'Come organizzarsi, comunicare e fare advocacy per i diritti digitali. Dalla comunicazione sicura alle campagne per il cambiamento.',
      en: 'How to organize, communicate and advocate for digital rights. From secure communication to campaigns for change.',
    },
    longDescription: {
      it: 'L\'attivismo digitale è il motore del cambiamento nell\'era tecnologica. Imparerai a comunicare in modo sicuro, organizzarti online, progettare campagne efficaci, fare advocacy istituzionale e contrastare la disinformazione. Un percorso per chi vuole passare dall\'indignazione all\'azione.',
      en: 'Digital activism is the engine of change in the technological era. You will learn to communicate securely, organize online, design effective campaigns, do institutional advocacy and fight disinformation. A course for those who want to move from outrage to action.',
    },
    difficulty: 'advanced',
    lessonsCount: 8,
    duration: '3h',
    icon: 'Megaphone',
    color: 'from-pink-500 to-rose-500',
    topics: ['attivismo', 'advocacy', 'comunicazione'],
    lessons: attivismoDigitaleLessons,
  },
  {
    id: '6',
    slug: 'alternative-etiche',
    title: {
      it: 'Alternative etiche al Big Tech',
      en: 'Ethical alternatives to Big Tech',
    },
    description: {
      it: 'Esplora le alternative open-source e rispettose della privacy ai servizi più usati: email, cloud, social media, messaggistica e altro.',
      en: 'Explore open-source and privacy-respecting alternatives to the most used services: email, cloud, social media, messaging and more.',
    },
    longDescription: {
      it: 'Non devi per forza dipendere da Google, Meta e Amazon. Questo percorso ti guiderà attraverso le migliori alternative etiche per email, cloud, social media, browser, motori di ricerca e sistemi operativi. Alla fine avrai un piano concreto per la tua migrazione digitale.',
      en: 'You don\'t have to depend on Google, Meta and Amazon. This course will guide you through the best ethical alternatives for email, cloud, social media, browsers, search engines and operating systems. By the end you will have a concrete plan for your digital migration.',
    },
    difficulty: 'beginner',
    lessonsCount: 6,
    duration: '2h',
    icon: 'Repeat',
    color: 'from-amber-500 to-yellow-500',
    topics: ['open source', 'alternative', 'strumenti'],
    lessons: alternativeEticheLessons,
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getLessonBySlug(courseSlug: string, lessonSlug: string) {
  const course = getCourseBySlug(courseSlug);
  if (!course) return undefined;
  const lesson = course.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;
  const index = course.lessons.findIndex((l) => l.slug === lessonSlug);
  const prev = index > 0 ? course.lessons[index - 1] : undefined;
  const next = index < course.lessons.length - 1 ? course.lessons[index + 1] : undefined;
  return { course, lesson, prev, next };
}
