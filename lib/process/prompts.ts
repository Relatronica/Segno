import type { ProcessTemplate, ProcessQuestion } from '@/store/useProcessStore';
import type { Locale } from '@/lib/i18n/translations';

export function buildQuestionsPrompt(
  template: ProcessTemplate,
  customDescription: string,
  locale: Locale
): string {
  const lang = locale === 'it' ? 'italiano' : 'English';
  const context =
    template === 'custom'
      ? `The user described this process: "${customDescription}"`
      : `The process type is: ${template.replace(/_/g, ' ')}`;

  return `You are an expert in ethics, GDPR compliance, and the EU AI Act.
${context}

Generate 6 contextual questions to understand this process better, focusing on:
- Data involved and data subjects
- Decision-making aspects
- Actors and stakeholders
- Risks and potential impact on people
- Technology used (especially AI/ML)

Respond in ${lang}. Return a JSON array of objects with "id" (q1-q6) and "question" fields.
Example: [{"id":"q1","question":"..."},{"id":"q2","question":"..."}]
Return ONLY the JSON array, no additional text.`;
}

export function buildFlowchartPrompt(
  template: ProcessTemplate,
  customDescription: string,
  questions: ProcessQuestion[],
  locale: Locale
): string {
  const lang = locale === 'it' ? 'italiano' : 'English';
  const context =
    template === 'custom'
      ? `Process description: "${customDescription}"`
      : `Process type: ${template.replace(/_/g, ' ')}`;

  const qa = questions
    .filter((q) => q.answer.trim())
    .map((q) => `Q: ${q.question}\nA: ${q.answer}`)
    .join('\n\n');

  return `You are an expert process designer specializing in ethics, GDPR, and the EU AI Act.
${context}

Based on these answers:
${qa}

Generate a flowchart in JSON format. The output must be a JSON object with "nodes" and "edges" arrays.

Each node must have:
- "id": unique string (e.g. "n1", "n2")
- "type": one of "start", "process", "decision", "data", "ai", "end"
- "label": short label text
- "description": brief description of what happens at this step

Each edge must have:
- "id": unique string (e.g. "e1", "e2")
- "source": source node id
- "target": target node id
- "label": optional label for the connection (e.g. "yes", "no" for decisions)

Guidelines:
- Start with exactly one "start" node and end with at least one "end" node
- Use "decision" nodes for branching logic (yes/no paths)
- Use "data" nodes where personal data is collected, stored, or transferred
- Use "ai" nodes where AI/ML processing occurs
- Include 8-15 nodes for a meaningful process
- Respond in ${lang}

Return ONLY the JSON object, no additional text.`;
}

export function buildEthicsPrompt(
  nodes: { label: string; description: string; type: string }[],
  edges: { source: string; target: string; label?: string }[],
  locale: Locale
): string {
  const lang = locale === 'it' ? 'italiano' : 'English';
  const processDescription = nodes
    .map((n) => `[${n.type}] ${n.label}: ${n.description}`)
    .join('\n');

  return `You are an expert in GDPR compliance, the EU AI Act, and digital ethics.

Analyze this process flowchart:
${processDescription}

Connections:
${edges.map((e) => `${e.source} -> ${e.target}${e.label ? ` (${e.label})` : ''}`).join('\n')}

Provide a comprehensive ethics and compliance analysis. Return a JSON object with this structure:
{
  "overallScore": <number 0-100>,
  "gdpr": {
    "score": <number 0-100>,
    "issues": ["list of GDPR compliance issues found"],
    "suggestions": ["specific suggestions to improve GDPR compliance"]
  },
  "aiAct": {
    "riskLevel": "<unacceptable|high|limited|minimal>",
    "classification": "brief classification explanation",
    "issues": ["list of AI Act compliance issues"],
    "suggestions": ["specific suggestions for AI Act compliance"]
  },
  "ethicalConcerns": ["list of ethical concerns"],
  "improvements": ["list of concrete improvements to make the process more ethical and compliant"]
}

Be specific and actionable in your analysis. Reference specific nodes/steps when possible.
Respond in ${lang}.
Return ONLY the JSON object, no additional text.`;
}
