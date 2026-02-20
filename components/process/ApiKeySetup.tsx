'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useProcessStore, type AIProvider } from '@/store/useProcessStore';
import { useT } from '@/lib/i18n/useT';
import { validateApiKey } from '@/lib/process/ai-client';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, AlertCircle, Monitor, Wifi, Info, Sparkles, Brain, Cloud, ChevronDown, Pencil, RefreshCw } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { OllamaModelInfo } from '@/app/api/ai/ollama-models/route';

const cloudProviders: { id: AIProvider; name: string; placeholder: string; icon: LucideIcon }[] = [
  { id: 'openai', name: 'OpenAI', placeholder: 'sk-...', icon: Sparkles },
  { id: 'anthropic', name: 'Anthropic', placeholder: 'sk-ant-...', icon: Brain },
  { id: 'google', name: 'Google AI', placeholder: 'AI...', icon: Cloud },
];

function formatSize(bytes: number): string {
  const gb = bytes / (1024 * 1024 * 1024);
  return gb >= 1 ? `${gb.toFixed(1)} GB` : `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export function ApiKeySetup() {
  const {
    aiProvider,
    apiKey,
    apiKeyValidated,
    ollamaUrl,
    ollamaModel,
    setAIProvider,
    setApiKey,
    setApiKeyValidated,
    setOllamaUrl,
    setOllamaModel,
    setStep,
    setError,
  } = useProcessStore();
  const t = useT();
  const [showKey, setShowKey] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validationError, setValidationError] = useState('');

  const [ollamaModels, setOllamaModels] = useState<OllamaModelInfo[]>([]);
  const [detectingModels, setDetectingModels] = useState(false);
  const [modelsDetected, setModelsDetected] = useState(false);
  const [manualModelEntry, setManualModelEntry] = useState(false);
  const fetchedUrlRef = useRef('');

  const isOllama = aiProvider === 'ollama';

  const fetchOllamaModels = useCallback(async (url: string) => {
    setDetectingModels(true);
    setModelsDetected(false);
    setOllamaModels([]);
    setValidationError('');
    try {
      const res = await fetch('/api/ai/ollama-models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ollamaUrl: url }),
      });
      const data = await res.json();
      if (data.models?.length) {
        setOllamaModels(data.models);
        setModelsDetected(true);
        const currentModelExists = data.models.some(
          (m: OllamaModelInfo) => m.name === ollamaModel
        );
        const selectedModel = currentModelExists ? ollamaModel : data.models[0].name;
        if (!currentModelExists) {
          setOllamaModel(selectedModel);
        }
        setApiKeyValidated(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem('segno-ai-provider', 'ollama');
          localStorage.setItem('segno-ollama-url', url);
          localStorage.setItem('segno-ollama-model', selectedModel);
        }
      } else {
        setModelsDetected(true);
      }
      fetchedUrlRef.current = url;
    } catch {
      setModelsDetected(true);
    } finally {
      setDetectingModels(false);
    }
  }, [ollamaModel, setOllamaModel, setApiKeyValidated]);

  useEffect(() => {
    if (isOllama && ollamaUrl && !modelsDetected && fetchedUrlRef.current !== ollamaUrl) {
      fetchOllamaModels(ollamaUrl);
    }
  }, [isOllama, ollamaUrl, modelsDetected, fetchOllamaModels]);

  const handleValidate = async () => {
    if (!isOllama && !apiKey.trim()) return;
    setValidating(true);
    setValidationError('');
    try {
      const options = isOllama
        ? { provider: aiProvider, apiKey: '', ollamaUrl, ollamaModel }
        : { provider: aiProvider, apiKey };
      const valid = await validateApiKey(options);
      if (valid) {
        setApiKeyValidated(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem('segno-ai-provider', aiProvider);
          if (isOllama) {
            localStorage.setItem('segno-ollama-url', ollamaUrl);
            localStorage.setItem('segno-ollama-model', ollamaModel);
            localStorage.removeItem('segno-ai-key');
          } else {
            localStorage.setItem('segno-ai-key', apiKey);
            localStorage.removeItem('segno-ollama-url');
            localStorage.removeItem('segno-ollama-model');
          }
        }
      } else {
        setValidationError(
          isOllama ? t.processDesigner.ollamaNotRunning : t.processDesigner.apiKeyInvalid
        );
        setApiKeyValidated(false);
      }
    } catch {
      setValidationError(
        isOllama ? t.processDesigner.ollamaNotRunning : t.processDesigner.apiKeyError
      );
      setApiKeyValidated(false);
    } finally {
      setValidating(false);
    }
  };

  const handleProviderChange = (provider: AIProvider) => {
    setAIProvider(provider);
    setApiKeyValidated(false);
    setValidationError('');
    if (provider !== 'ollama') {
      setModelsDetected(false);
      setOllamaModels([]);
      fetchedUrlRef.current = '';
    }
  };

  const handleNext = () => {
    if (apiKeyValidated) {
      setError(null);
      setStep('processType');
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div initial="hidden" animate="visible">
        <motion.div custom={0} variants={fadeUp} className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
            <Key className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold sm:text-3xl">{t.processDesigner.apiKeyTitle}</h2>
          <p className="mt-3 text-muted-foreground">{t.processDesigner.apiKeySubtitle}</p>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} className="mt-10 space-y-6">
          {/* Provider selection */}
          <div>
            <label className="mb-2 block text-sm font-medium">{t.processDesigner.chooseProvider}</label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {cloudProviders.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleProviderChange(p.id)}
                    className={`rounded-xl border p-4 text-center text-sm font-medium transition-all ${
                      aiProvider === p.id
                        ? 'border-foreground bg-foreground/5'
                        : 'border-border hover:border-foreground/30'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <Icon className="h-4 w-4" />
                      <span>{p.name}</span>
                    </div>
                  </button>
                );
              })}
              <button
                onClick={() => handleProviderChange('ollama')}
                className={`rounded-xl border p-4 text-center text-sm font-medium transition-all ${
                  isOllama
                    ? 'border-emerald-500 bg-emerald-500/5'
                    : 'border-border hover:border-emerald-500/30'
                }`}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <Monitor className="h-4 w-4" />
                  <span>Ollama</span>
                </div>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isOllama ? (
              <motion.div
                key="ollama"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-5"
              >
                {/* Ollama description */}
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <div className="flex gap-3">
                    <Monitor className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium">{t.processDesigner.ollamaTitle}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {t.processDesigner.ollamaSubtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ollama URL */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t.processDesigner.ollamaUrlLabel}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={ollamaUrl}
                      onChange={(e) => {
                        setOllamaUrl(e.target.value);
                        setApiKeyValidated(false);
                        setValidationError('');
                        setModelsDetected(false);
                        fetchedUrlRef.current = '';
                      }}
                      placeholder="http://localhost:11434"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-foreground focus:outline-none"
                    />
                    <button
                      onClick={() => fetchOllamaModels(ollamaUrl)}
                      disabled={detectingModels}
                      className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border px-3 py-3 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-50"
                      title={t.processDesigner.ollamaCheckConnection}
                    >
                      {detectingModels ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Ollama Model */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-medium">
                      {t.processDesigner.ollamaModelLabel}
                    </label>
                    {ollamaModels.length > 0 && (
                      <button
                        onClick={() => setManualModelEntry(!manualModelEntry)}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {manualModelEntry ? <ChevronDown className="h-3 w-3" /> : <Pencil className="h-3 w-3" />}
                        {t.processDesigner.ollamaManualModel}
                      </button>
                    )}
                  </div>

                  {detectingModels ? (
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.processDesigner.ollamaDetecting}
                    </div>
                  ) : ollamaModels.length > 0 && !manualModelEntry ? (
                    <div className="space-y-2">
                      <div className="relative">
                        <select
                          value={ollamaModel}
                          onChange={(e) => {
                            setOllamaModel(e.target.value);
                            setValidationError('');
                            if (typeof window !== 'undefined') {
                              localStorage.setItem('segno-ollama-model', e.target.value);
                            }
                          }}
                          className="w-full appearance-none rounded-xl border border-border bg-background px-4 py-3 pr-10 text-sm transition-colors focus:border-foreground focus:outline-none"
                        >
                          {ollamaModels.map((m) => (
                            <option key={m.name} value={m.name}>
                              {m.name} — {m.parameterSize}{m.quantization ? ` (${m.quantization})` : ''} — {formatSize(m.size)}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t.processDesigner.ollamaModelsFound.replace('{count}', String(ollamaModels.length))}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={ollamaModel}
                        onChange={(e) => {
                          setOllamaModel(e.target.value);
                          setApiKeyValidated(false);
                          setValidationError('');
                        }}
                        placeholder={t.processDesigner.ollamaModelPlaceholder}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-foreground focus:outline-none"
                      />
                      {modelsDetected && ollamaModels.length === 0 && (
                        <p className="flex items-start gap-1.5 text-xs text-amber-600">
                          <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />
                          {t.processDesigner.ollamaNoModels}
                        </p>
                      )}
                    </div>
                  )}

                  <p className="mt-1.5 flex items-start gap-1.5 text-xs text-muted-foreground">
                    <Info className="mt-0.5 h-3 w-3 shrink-0" />
                    {t.processDesigner.ollamaModelHint}
                  </p>
                </div>

                {/* Connection status */}
                <div className="flex items-center gap-3">
                  {apiKeyValidated ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                      <ShieldCheck className="h-4 w-4" />
                      {t.processDesigner.ollamaConnected}
                    </span>
                  ) : (
                    <button
                      onClick={handleValidate}
                      disabled={validating || !ollamaModel.trim()}
                      className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-50"
                    >
                      {validating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Wifi className="h-4 w-4" />
                      )}
                      {t.processDesigner.ollamaCheckConnection}
                    </button>
                  )}

                  {validationError && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      {validationError}
                    </span>
                  )}
                </div>

                {/* Ollama privacy note */}
                <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
                  <div className="flex gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium">{t.processDesigner.ollamaPrivacyNote}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="cloud"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-5"
              >
                {/* API Key input */}
                <div>
                  <label className="mb-2 block text-sm font-medium">{t.processDesigner.apiKeyLabel}</label>
                  <div className="relative">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => {
                        setApiKey(e.target.value);
                        setApiKeyValidated(false);
                        setValidationError('');
                      }}
                      placeholder={cloudProviders.find((p) => p.id === aiProvider)?.placeholder}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-20 text-sm transition-colors focus:border-foreground focus:outline-none"
                    />
                    <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
                      <button
                        onClick={() => setShowKey(!showKey)}
                        className="rounded-lg p-2 text-muted-foreground hover:text-foreground"
                      >
                        {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Validation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleValidate}
                    disabled={!apiKey.trim() || validating}
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-50"
                  >
                    {validating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="h-4 w-4" />
                    )}
                    {t.processDesigner.validateKey}
                  </button>

                  {apiKeyValidated && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                      <ShieldCheck className="h-4 w-4" />
                      {t.processDesigner.apiKeyValid}
                    </span>
                  )}

                  {validationError && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      {validationError}
                    </span>
                  )}
                </div>

                {/* Privacy note */}
                <motion.div
                  custom={2}
                  variants={fadeUp}
                  className="rounded-xl border border-border/50 bg-muted/30 p-4"
                >
                  <div className="flex gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium">{t.processDesigner.privacyNoteTitle}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {t.processDesigner.privacyNoteText}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div custom={3} variants={fadeUp} className="mt-8 flex justify-between">
          <button
            onClick={() => setStep('landing')}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            {t.common.back}
          </button>
          <button
            onClick={handleNext}
            disabled={!apiKeyValidated}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {t.common.next}
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
