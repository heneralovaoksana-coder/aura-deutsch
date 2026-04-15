"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DICTIONARY } from "@/data/dictionary";
import { haptic } from "@/lib/telegram";
import { Play } from "lucide-react";

export default function DictionaryPage() {
  const [activeTab, setActiveTab] = useState(DICTIONARY[0].id);
  const activeCategory = DICTIONARY.find(c => c.id === activeTab)!;

  const playAudio = (text: string) => {
    haptic.tick();
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-bg-deep text-text-primary pb-24 font-inter px-4 pt-6">
      <div className="fixed top-0 right-0 w-64 h-64 bg-pink-neon/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-64 h-64 bg-purple-neon/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 max-w-lg mx-auto">
        <h1 className="text-4xl font-outfit font-black text-white mb-6 tracking-tight drop-shadow-md">
          Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-neon to-pink-neon">Словарь</span>
        </h1>

        {/* Categories Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {DICTIONARY.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                haptic.select();
                setActiveTab(cat.id);
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl whitespace-nowrap transition-all font-outfit text-sm font-semibold border ${
                activeTab === cat.id
                  ? "bg-pink-neon/20 border-pink-neon text-white shadow-[0_0_15px_rgba(255,0,122,0.3)]"
                  : "bg-white/5 border-white/5 text-text-muted hover:bg-white/10 hover:text-white/80"
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Word Cards */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {activeCategory.words.map((word) => (
                <div 
                  key={word.id} 
                  className="glass-panel p-5 rounded-[24px] border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                  style={{
                    background: "linear-gradient(135deg, rgba(20,20,25,0.95) 0%, rgba(10,12,15,0.98) 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)"
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-2xl font-outfit font-black text-white mb-1">
                        {word.word}
                      </h3>
                      <p className="text-text-secondary text-sm font-medium">{word.translation}</p>
                    </div>
                    <button 
                      onClick={() => playAudio(word.word)}
                      className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-pink-neon hover:bg-pink-neon/20 transition-colors shrink-0 border border-white/5 shadow-md active:scale-95"
                    >
                      <Play size={20} fill="currentColor" />
                    </button>
                  </div>

                  <div className="mt-4 p-4 bg-black/30 rounded-2xl border border-white/5 shadow-inner">
                    <p className="text-pink-neon font-medium text-[15px] leading-snug mb-1">
                      "{word.example_sentence}"
                    </p>
                    <p className="text-text-muted text-xs italic">
                      {word.example_ru}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                     <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Сложность</span>
                     <div className="flex gap-1.5">
                       {[1,2,3].map((level) => (
                         <div 
                           key={level} 
                           className={`w-5 h-2 rounded-[2px] shadow-sm ${level <= word.difficulty_level ? "bg-gradient-to-r from-purple-neon to-pink-neon" : "bg-white/10"}`}
                         />
                       ))}
                     </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
