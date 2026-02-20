export type ContentBlock =
  | { type: 'text'; content: { it: string; en: string } }
  | { type: 'heading'; content: { it: string; en: string } }
  | { type: 'list'; items: Array<{ it: string; en: string }> }
  | { type: 'callout'; variant: 'info' | 'warning' | 'tip'; content: { it: string; en: string } }
  | { type: 'quote'; content: { it: string; en: string }; author?: string };

export type Lesson = {
  id: string;
  slug: string;
  title: { it: string; en: string };
  description: { it: string; en: string };
  content: ContentBlock[];
  duration: string;
  order: number;
};

export type Course = {
  id: string;
  slug: string;
  title: { it: string; en: string };
  description: { it: string; en: string };
  longDescription?: { it: string; en: string };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lessonsCount: number;
  duration: string;
  icon: string;
  color: string;
  topics: string[];
  lessons: Lesson[];
};

export { courses } from './lessons';
