"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { AlphabetCardItem } from "@/data/lessons";
import { haptic } from "@/lib/telegram";

interface AlphabetCardProps {
  card: AlphabetCardItem;
  onComplete: () => void;
}

export default function AlphabetCard({ card, onComplete }: AlphabetCardProps) {
  const playAudio = () => {
    haptic.tick();
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(card.letter.split(" ")[0]);
      utterance.lang = "de-DE";
      window.speechSynthesis.speak(utterance);
    }
  };

  const playExampleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    haptic.tick();
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(card.exampleWord);
      utterance.lang = "de-DE";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-[32px] p-8 glass-panel relative border border-white/5 shadow-2xl flex flex-col items-center text-center"
      >
        <button
          onClick={playAudio}
          className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Play size={24} fill="currentColor" />
        </button>

        <h1 className="text-8xl font-outfit font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] my-6">
          {card.letter}
        </h1>
        
        <div className="text-xl text-primary bg-primary/10 px-4 py-1 flex items-center rounded-full mb-6 font-medium">
          [{card.pronunciation}]
        </div>

        <div className="mt-4 p-4 bg-black/20 rounded-2xl w-full">
          <p className="text-white/60 text-sm mb-2 uppercase tracking-wide text-left">Пример</p>
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-3xl font-bold text-white mb-1">{card.exampleWord}</p>
              <p className="text-lg text-white/50">{card.exampleTranslation}</p>
            </div>
            <button
              onClick={playExampleAudio}
              className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-primary border border-primary/20 hover:bg-white/10 shrink-0 ml-4"
            >
              <Play size={18} fill="currentColor" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-20 left-0 right-0 px-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            haptic.tap();
            onComplete();
          }}
          className="w-full py-4 text-white font-bold text-lg rounded-2xl bg-gradient-to-r from-primary to-[#FF003C] shadow-[0_4px_20px_rgba(255,0,122,0.4)] active:opacity-80"
        >
          Понятно
        </motion.button>
      </div>
    </div>
  );
}
