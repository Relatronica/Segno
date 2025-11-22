'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { EduTooltip } from './EduTooltip';
import { BLOCK_TYPES, CATEGORIES } from '../utils/constants';
import { UserProfile, useAppStore } from '@/store/useAppStore';

function DraggableBlock({ type, label, color }: { type: string, label: string, color: string }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `toolbox-${type}-${label}`,
    data: { type, label, color, isToolboxItem: true },
  });

  return (
    <div className="relative z-[60]">
      <EduTooltip termKey={label}>
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className={`flex items-center gap-2 p-3 mb-2 rounded-lg shadow-sm cursor-grab active:cursor-grabbing text-white text-sm font-medium ${color} hover:brightness-110 hover:shadow-md hover:translate-x-1 transition-all`}
        >
          {label}
        </div>
      </EduTooltip>
    </div>
  );
}

type SidebarProps = {
  user: UserProfile | null;
};

export function Sidebar({ user }: SidebarProps) {
  const { setStep } = useAppStore();
  const [openCategories, setOpenCategories] = useState<string[]>(['input', 'process', 'storage', 'output']);

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="absolute left-6 top-6 bottom-6 w-72 flex flex-col z-40 pointer-events-none">
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl flex flex-col shadow-2xl overflow-hidden pointer-events-auto h-full">
        <div className="p-5 border-b border-slate-100 bg-white/50 flex items-center gap-3">
          <div className="relative w-8 h-8 shrink-0">
            <Image 
              src="/segno_logo.png" 
              alt="Segno" 
              fill 
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Componenti</h2>
            <p className="text-xs text-slate-500">Trascina sulla lavagna</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto glassmorphism-scrollbar p-3 space-y-2">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="bg-white/40 rounded-xl border border-white/50 overflow-hidden transition-all">
              <button 
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-white/60 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <cat.icon className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-bold text-slate-700">{cat.label}</span>
                </div>
                {openCategories.includes(cat.id) ? 
                  <ChevronDown className="w-4 h-4 text-slate-400" /> : 
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                }
              </button>
              
              <AnimatePresence>
                {openCategories.includes(cat.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-2 pt-0">
                      {BLOCK_TYPES.filter(b => b.type === cat.id).map(b => (
                        <DraggableBlock key={b.label} {...b} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 bg-white/50 space-y-3">
          <button
            onClick={() => setStep('wiki')}
            className="w-full flex items-center gap-2 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors group"
          >
            <BookOpen className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
            <span className="text-sm font-medium text-blue-700 group-hover:text-blue-800">Knowledge Hub</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-lg shadow-inner">
              {user?.avatarId === 'explorer' ? '🧑‍🚀' : user?.avatarId === 'robot' ? '🤖' : '👷'}
            </div>
            <p className="font-medium text-sm text-slate-700 truncate">{user?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

