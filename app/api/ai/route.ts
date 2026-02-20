import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

type AIProvider = 'openai' | 'anthropic' | 'google' | 'ollama';

interface ModelOptions {
  provider: AIProvider;
  apiKey: string;
  ollamaUrl?: string;
  ollamaModel?: string;
}

function getModel(options: ModelOptions) {
  const { provider, apiKey, ollamaUrl, ollamaModel } = options;
  switch (provider) {
    case 'openai': {
      const openai = createOpenAI({ apiKey });
      return openai('gpt-4o-mini');
    }
    case 'anthropic': {
      const anthropic = createAnthropic({ apiKey });
      return anthropic('claude-sonnet-4-20250514');
    }
    case 'google': {
      const google = createGoogleGenerativeAI({ apiKey });
      return google('gemini-1.5-flash');
    }
    case 'ollama': {
      const baseURL = (ollamaUrl || 'http://localhost:11434') + '/v1';
      const ollama = createOpenAI({ baseURL, apiKey: 'ollama' });
      return ollama(ollamaModel || 'llama3.1');
    }
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { provider, apiKey, prompt, action, ollamaUrl, ollamaModel } = body as {
      provider: AIProvider;
      apiKey: string;
      prompt: string;
      action: 'questions' | 'flowchart' | 'ethics' | 'validate';
      ollamaUrl?: string;
      ollamaModel?: string;
    };

    if (!provider || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields: provider, prompt' },
        { status: 400 }
      );
    }

    if (provider !== 'ollama' && !apiKey) {
      return NextResponse.json(
        { error: 'Missing required field: apiKey' },
        { status: 400 }
      );
    }

    const modelOptions: ModelOptions = { provider, apiKey, ollamaUrl, ollamaModel };

    if (action === 'validate') {
      try {
        const model = getModel(modelOptions);
        await generateText({
          model,
          prompt: 'Respond with just the word "ok".',
          maxOutputTokens: 5,
        });
        return NextResponse.json({ valid: true });
      } catch {
        return NextResponse.json({ valid: false, error: 'Invalid API key or provider configuration' });
      }
    }

    const model = getModel(modelOptions);

    const { text } = await generateText({
      model,
      prompt,
      maxOutputTokens: 4096,
      temperature: 0.3,
    });

    let parsed = null;
    try {
      const jsonMatch = text.match(/[\[{][\s\S]*[\]}]/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      }
    } catch {
      // Return raw text if JSON parsing fails
    }

    return NextResponse.json({
      text,
      parsed,
      action,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
