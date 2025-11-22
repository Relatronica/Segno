'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Sparkles, Code2, User } from 'lucide-react';
import Image from 'next/image';
import type { UserMode } from '@/store/useAppStore';

const AVATARS = [
  { id: 'peep-14', image: '/avatar/peep-14.png', label: 'Explorer' },
  { id: 'peep-20', image: '/avatar/peep-20.png', label: 'Builder' },
  { id: 'peep-32', image: '/avatar/peep-32.png', label: 'Scientist' },
  { id: 'peep-45', image: '/avatar/peep-45.png', label: 'Analyst' },
  { id: 'peep-49', image: '/avatar/peep-49.png', label: 'Designer' },
  { id: 'peep-51', image: '/avatar/peep-51.png', label: 'Developer' },
  { id: 'peep-55', image: '/avatar/peep-55.png', label: 'Manager' },
  { id: 'peep-56', image: '/avatar/peep-56.png', label: 'Researcher' },
];

export function OnboardingModule() {
  const { setUser, setStep } = useAppStore();
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(AVATARS[0].id);
  const [userMode, setUserMode] = useState<UserMode | null>(null);
  
  const handleStart = () => {
    if (!name.trim() || !userMode) return;
    setUser({ name, avatarId: selectedAvatar, mode: userMode });
    setStep('builder');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-70"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
    >
      <Card className="border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/20 pointer-events-none"></div>
        
        <CardHeader className="text-center flex flex-col items-center relative z-10 pb-4">
          <div className="relative w-16 h-16 mb-2">
            <Image 
              src="/segno_logo.png" 
              alt="Segno Logo" 
              fill 
              className="object-contain drop-shadow-xl"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">
            Segno
          </CardTitle>
            <CardDescription className="text-slate-500 text-sm mt-1">
            Costruisci il tuo scenario AI e scopri l'impatto.
          </CardDescription>
        </CardHeader>
          
        <CardContent className="space-y-4 relative z-10 pt-0">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm text-slate-700 font-medium">Come ti chiami?</Label>
            <Input
              id="name"
              placeholder="Il tuo nome o azienda"
              value={name}
              onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && name.trim() && userMode) {
                    handleStart();
                  }
                }}
              className="h-9 bg-white border-slate-200 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 shadow-sm text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm text-slate-700 font-medium">Cosa vuoi fare?</Label>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setUserMode('use')}
                className={`p-2.5 rounded-lg border transition-all text-center relative overflow-hidden ${
                  userMode === 'use'
                    ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-200/50'
                    : 'border-slate-200 bg-white/80 hover:border-blue-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex flex-col items-center gap-1.5 relative z-10">
                  <div className={`p-1 rounded-md transition-colors ${
                    userMode === 'use' ? 'bg-blue-100' : 'bg-slate-100'
                  }`}>
                    <User className={`h-3.5 w-3.5 ${
                      userMode === 'use' ? 'text-blue-600' : 'text-slate-600'
                    }`} />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-semibold text-xs text-slate-800 leading-tight">
                      Capire i rischi dell'uso dell'IA
                    </h3>
                    <p className="text-[10px] text-slate-600 leading-tight">
                      Usi ChatGPT, Gemini o altri strumenti AI?
                    </p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setUserMode('design')}
                className={`p-2.5 rounded-lg border transition-all text-center relative overflow-hidden ${
                  userMode === 'design'
                    ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-200/50'
                    : 'border-slate-200 bg-white/80 hover:border-blue-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex flex-col items-center gap-1.5 relative z-10">
                  <div className={`p-1 rounded-md transition-colors ${
                    userMode === 'design' ? 'bg-blue-100' : 'bg-slate-100'
                  }`}>
                    <Code2 className={`h-3.5 w-3.5 ${
                      userMode === 'design' ? 'text-blue-600' : 'text-slate-600'
                    }`} />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-semibold text-xs text-slate-800 leading-tight">
                      Progettare un'applicazione AI
                    </h3>
                    <p className="text-[10px] text-slate-600 leading-tight">
                      Stai costruendo un sistema AI?
                    </p>
                  </div>
                </div>
              </motion.button>
            </div>
          </div>

          <div className="space-y-1.5">
              <Label className="text-sm text-slate-700 font-medium">Scegli il tuo avatar</Label>
            <div className="grid grid-cols-4 gap-1.5">
              {AVATARS.map((avatar) => (
                <motion.button
                  key={avatar.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAvatar(avatar.id)}
                    className={`relative p-1.5 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-0.5 shadow-sm overflow-hidden ${
                    selectedAvatar === avatar.id
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 ring-offset-1'
                      : 'border-slate-100 hover:border-blue-300 bg-white hover:bg-slate-50'
                  }`}
                    title={avatar.label}
                >
                    <div className="relative w-10 h-10">
                      <Image
                        src={avatar.image}
                        alt={avatar.label}
                        fill
                        className="object-contain"
                        sizes="40px"
                      />
                    </div>
                </motion.button>
              ))}
            </div>
          </div>

            <div className="rounded-lg bg-blue-50 border border-blue-200 p-2.5 space-y-1">
              <div className="flex items-center gap-1.5 text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                <p className="text-xs font-semibold">Come funziona</p>
              </div>
              <p className="text-[10px] text-blue-600 leading-relaxed">
                Rispondi alle domande nella sidebar per costruire il tuo scenario. Ogni elemento include note educative con riferimenti normativi e best practices.
              </p>
            </div>

          <Button
              onClick={handleStart}
            disabled={!name.trim() || !userMode}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 shadow-lg shadow-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
              Inizia <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
    </div>
  );
}
