import { NextRequest, NextResponse } from 'next/server';

export interface OllamaModelInfo {
  name: string;
  parameterSize: string;
  family: string;
  quantization: string;
  size: number;
}

export async function POST(request: NextRequest) {
  try {
    const { ollamaUrl } = (await request.json()) as { ollamaUrl?: string };
    const baseUrl = ollamaUrl || 'http://localhost:11434';

    const res = await fetch(`${baseUrl}/api/tags`, {
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return NextResponse.json({ models: [], error: 'Ollama not reachable' }, { status: 502 });
    }

    const data = await res.json();

    const models: OllamaModelInfo[] = (data.models || []).map(
      (m: {
        name: string;
        size: number;
        details?: {
          family?: string;
          parameter_size?: string;
          quantization_level?: string;
        };
      }) => ({
        name: m.name.replace(/:latest$/, ''),
        parameterSize: m.details?.parameter_size || '',
        family: m.details?.family || '',
        quantization: m.details?.quantization_level || '',
        size: m.size,
      })
    );

    return NextResponse.json({ models });
  } catch {
    return NextResponse.json({ models: [], error: 'Failed to connect to Ollama' }, { status: 502 });
  }
}
