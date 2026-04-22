"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DICTIONARY } from "@/data/dictionary";
import { haptic } from "@/lib/telegram";
import { Play, Search, X, Volume2 } from "lucide-react";

export default function DictionaryPage() {
  const [activeTab, setActiveTab] = useState(DICTIONARY[0].id);
  const [search, setSearch] = useState("");
  const activeCategory = DICTIONARY.find(c => c.id === activeTab)!;

  // Filter words by search query
  const filteredWords = useMemo(() => {
    if (!search.trim()) return activeCategory.words;
    const q = search.toLowerCase();
    return activeCategory.words.filter(
      w => w.word.toLowerCase().includes(q) || w.translation.toLowerCase().includes(q)
    );
  }, [activeCategory, search]);

  // Count total words across all categories
  const totalWords = DICTIONARY.reduce((sum, cat) => sum + cat.words.length, 0);

  const playAudio = (text: string) => {
    haptic.tick();
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      window.speechSynthesis.speak(utterance);
    }
  };

  const difficultyLabels = ["", "Лёгкий", "Средний", "Сложный"];
  const difficultyColors = [
    "",
    "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    "text-amber-400 bg-amber-500/10 border-amber-500/20",
    "text-rose-400 bg-rose-500/10 border-rose-500/20",
  ];

  return (
    <div className="min-h-screen bg-bg-deep text-text-primary pb-28 font-inter px-4 pt-6">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="float-orb w-64 h-64 top-0 right-0 opacity-40" style={{ background: "rgba(244,63,111,0.06)" }} />
        <div className="float-orb w-48 h-48 bottom-40 left-0 opacity-30" style={{ background: "rgba(99,102,241,0.06)", animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <h1 className="text-3xl font-outfit font-black text-text-primary mb-1 tracking-tight">
            Словарь
          </h1>
          <p className="text-text-secondary text-sm">
            {totalWords} слов · {DICTIONARY.length} категорий
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass rounded-2xl border border-bg-border mb-4 flex items-center gap-3 px-4 py-3 focus-within:border-rose-500/30 transition-colors"
        >
          <Search size={18} className="text-text-muted flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск слов..."
            className="flex-1 bg-transparent text-text-primary text-sm font-inter placeholder:text-text-muted outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-text-muted hover:text-text-primary transition-colors">
              <X size={16} />
            </button>
          )}
        </motion.div>

        {/* Categories Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-4 no-scrollbar"
        >
          {DICTIONARY.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                haptic.select();
                setActiveTab(cat.id);
                setSearch("");
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-all font-outfit text-sm font-semibold border ${
                activeTab === cat.id
                  ? "bg-rose-500/10 border-rose-500/25 text-rose-400 shadow-rose-soft/30"
                  : "bg-bg-card/50 border-bg-border text-text-muted hover:bg-bg-elevated hover:text-text-secondary"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.name}
              <span className={`text-[10px] ml-0.5 ${activeTab === cat.id ? "text-rose-400/60" : "text-text-muted/60"}`}>
                {cat.words.length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Word Cards */}
        <div className="mt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + search}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {filteredWords.length === 0 && (
                <div className="glass rounded-2xl p-8 text-center">
                  <p className="text-text-muted text-sm">Ничего не найдено 🔍</p>
                </div>
              )}

              {filteredWords.map((word, i) => (
                <motion.div
                  key={word.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="glass rounded-2xl border border-bg-border p-4 hover:border-bg-hover transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-outfit font-bold text-text-primary mb-0.5 group-hover:text-rose-400 transition-colors">
                        {word.word}
                      </h3>
                      <p className="text-text-secondary text-sm">{word.translation}</p>
                    </div>
                    <button
                      onClick={() => playAudio(word.word)}
                      className="w-10 h-10 rounded-xl bg-rose-500/8 flex items-center justify-center text-rose-400 hover:bg-rose-500/15 transition-all shrink-0 ml-3 active:scale-90"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>

                  {/* Example */}
                  <div className="p-3 bg-bg-deep/60 rounded-xl border border-bg-border/50 mt-2">
                    <p className="text-rose-400/90 font-medium text-[13px] leading-snug mb-0.5">
                      "{word.example_sentence}"
                    </p>
                    <p className="text-text-muted text-xs italic">
                      {word.example_ru}
                    </p>
                  </div>

                  {/* Difficulty badge */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border ${difficultyColors[word.difficulty_level]}`}>
                      {difficultyLabels[word.difficulty_level]}
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3].map((level) => (
                        <div
                          key={level}
                          className={`w-4 h-1.5 rounded-full transition-all ${level <= word.difficulty_level
                            ? "bg-gradient-to-r from-rose-500 to-rose-400"
                            : "bg-bg-border"}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
