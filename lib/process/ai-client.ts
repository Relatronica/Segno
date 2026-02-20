import type { AIProvider, ProcessQuestion, ProcessNodeData, EthicsAnalysis } from '@/store/useProcessStore';
import type { ProcessTemplate } from '@/store/useProcessStore';
import type { Locale } from '@/lib/i18n/translations';
import { buildQuestionsPrompt, buildFlowchartPrompt, buildEthicsPrompt } from './prompts';
import type { Node, Edge } from '@xyflow/react';

export interface AICallOptions {
  provider: AIProvider;
  apiKey: string;
  ollamaUrl?: string;
  ollamaModel?: string;
}

async function callOllamaDirect(ollamaUrl: string, ollamaModel: string, prompt: string) {
  const res = await fetch(`${ollamaUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: ollamaModel,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    throw new Error('Ollama request failed');
  }

  const data = await res.json();
  const text: string = data.choices?.[0]?.message?.content || '';

  let parsed = null;
  try {
    const jsonMatch = text.match(/[\[{][\s\S]*[\]}]/);
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[0]);
    }
  } catch {
    // raw text fallback
  }

  return { text, parsed };
}

async function callAI(options: AICallOptions, prompt: string, action: string) {
  const { provider, apiKey, ollamaUrl, ollamaModel } = options;

  if (provider === 'ollama') {
    return callOllamaDirect(
      ollamaUrl || 'http://localhost:11434',
      ollamaModel || 'llama3.1',
      action === 'validate' ? 'Respond with just the word "ok".' : prompt
    );
  }

  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, apiKey, prompt, action }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'AI request failed');
  }

  return res.json();
}

export async function validateApiKey(options: AICallOptions): Promise<boolean> {
  if (options.provider === 'ollama') {
    const res = await callOllamaDirect(
      options.ollamaUrl || 'http://localhost:11434',
      options.ollamaModel || 'llama3.1',
      'Respond with just the word "ok".'
    );
    return typeof res.text === 'string' && res.text.length > 0;
  }

  const res = await callAI(options, 'Respond with just the word "ok".', 'validate');
  return res.valid === true;
}

export async function generateQuestions(
  options: AICallOptions,
  template: ProcessTemplate,
  customDescription: string,
  locale: Locale
): Promise<ProcessQuestion[]> {
  const prompt = buildQuestionsPrompt(template, customDescription, locale);
  const res = await callAI(options, prompt, 'questions');

  if (res.parsed && Array.isArray(res.parsed)) {
    return res.parsed.map((q: { id: string; question: string }) => ({
      id: q.id,
      question: q.question,
      answer: '',
    }));
  }

  throw new Error('Failed to parse AI response for questions');
}

export async function generateFlowchart(
  options: AICallOptions,
  template: ProcessTemplate,
  customDescription: string,
  questions: ProcessQuestion[],
  locale: Locale
): Promise<{ nodes: Node<ProcessNodeData>[]; edges: Edge[] }> {
  const prompt = buildFlowchartPrompt(template, customDescription, questions, locale);
  const res = await callAI(options, prompt, 'flowchart');

  if (res.parsed && res.parsed.nodes && res.parsed.edges) {
    const nodes: Node<ProcessNodeData>[] = res.parsed.nodes.map(
      (n: { id: string; type: string; label: string; description: string }, i: number) => ({
        id: n.id,
        type: 'processNode',
        position: { x: 0, y: i * 150 },
        data: {
          label: n.label,
          description: n.description,
          type: n.type as ProcessNodeData['type'],
        },
      })
    );

    const edges: Edge[] = res.parsed.edges.map(
      (e: { id: string; source: string; target: string; label?: string }) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label || '',
        type: 'smoothstep',
        animated: true,
      })
    );

    return { nodes, edges };
  }

  throw new Error('Failed to parse AI response for flowchart');
}

export async function analyzeEthics(
  options: AICallOptions,
  nodes: Node<ProcessNodeData>[],
  edges: Edge[],
  locale: Locale
): Promise<EthicsAnalysis> {
  const nodeData = nodes.map((n) => ({
    label: n.data.label,
    description: n.data.description,
    type: n.data.type,
  }));

  const edgeData = edges.map((e) => ({
    source: e.source,
    target: e.target,
    label: typeof e.label === 'string' ? e.label : undefined,
  }));

  const prompt = buildEthicsPrompt(nodeData, edgeData, locale);
  const res = await callAI(options, prompt, 'ethics');

  if (res.parsed) {
    return res.parsed as EthicsAnalysis;
  }

  throw new Error('Failed to parse AI response for ethics analysis');
}
