"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { FlashCard } from "@/data/lessons";
import { haptic } from "@/lib/telegram";

interface FlashcardProps {
  card: FlashCard;
  onComplete: () => void;
}

export default function Flashcard({ card, onComplete }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);

  const playWordAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    haptic.tick();
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(card.german);
      utterance.lang = "de-DE";
      window.speechSynthesis.speak(utterance);
    }
  };

  const playExampleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    haptic.tick();
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(card.example);
      utterance.lang = "de-DE";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleFlip = () => {
    if (done) return;
    haptic.select();
    setFlipped(true);
    // Auto-proceed after seeing the back
  };

  const handleGotIt = () => {
    haptic.success();
    setDone(true);
    setTimeout(onComplete, 400);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-6 flex-1">
      {/* Instruction */}
      <motion.p
        className="text-text-secondary text-sm mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {flipped ? "Запомни это слово" : "Нажми на карточку чтобы перевернуть"}
      </motion.p>

      {/* 3D Flip Card */}
      <div
        className="w-full max-w-sm cursor-pointer"
        style={{ perspective: "1200px" }}
        onClick={handleFlip}
      >
        <motion.div
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full"
        >
          {/* ── FRONT ───────────────────────────────────────── */}
          <motion.div
            style={{ backfaceVisibility: "hidden" }}
            className="w-full"
          >
            <div
              className="glass rounded-3xl border border-bg-border p-8 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(17,21,25,0.95) 100%)",
                boxShadow: "0 20px 60px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Emoji */}
              <motion.div
                className="text-7xl mb-6"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {card.emoji}
              </motion.div>

              {/* German word */}
              <div className="flex items-center justify-center gap-3 mb-2">
                <h2 className="text-5xl font-outfit font-black text-white">
                  {card.german}
                </h2>
                <button
                  onClick={playWordAudio}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors shrink-0"
                >
                  <Play size={20} fill="currentColor" />
                </button>
              </div>

              {/* Pronunciation */}
              <p className="text-text-muted text-sm font-inter mb-4">
                [{card.pronunciation}]
              </p>

              {/* Tag badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-outfit font-semibold ${
                  card.tag === "сленг"
                    ? "bg-rose-500/20 text-rose-500 border border-rose-500/30"
                    : "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                }`}
              >
                {card.tag === "сленг" ? "💬 Сленг" : "📚 Официальный"}
              </div>

              {/* Tap hint */}
              <motion.p
                className="text-text-muted text-xs mt-6"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👆 Нажми чтобы увидеть перевод
              </motion.p>
            </div>
          </motion.div>

          {/* ── BACK ────────────────────────────────────────── */}
          <motion.div
            style={{
              backfaceVisibility: "hidden",
              rotateY: 180,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <div
              className="glass rounded-3xl border border-rose-500/30 p-8 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,0,122,0.12) 0%, rgba(17,21,25,0.95) 100%)",
                boxShadow: "0 20px 60px rgba(255,0,122,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Russian translation */}
              <div className="text-6xl mb-3">{card.emoji}</div>
              <p className="text-text-secondary text-sm mb-2">перевод</p>
              <h2 className="text-4xl font-outfit font-black text-white mb-6">
                {card.russian}
              </h2>

              {/* Example */}
              <div className="bg-bg-deep rounded-2xl p-4 text-left mb-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-rose-500 font-outfit font-semibold text-base">
                    "{card.example}"
                  </p>
                  <button
                    onClick={playExampleAudio}
                    className="w-8 h-8 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 border border-rose-500/20 hover:bg-rose-500/20 shrink-0"
                  >
                    <Play size={14} fill="currentColor" />
                  </button>
                </div>
                <p className="text-text-secondary text-sm italic">
                  {card.exampleRu}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Got it button — appears after flip */}
      <AnimatePresence>
        {flipped && !done && (
          <motion.button
            key="gotit"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGotIt}
            className="mt-8 w-full max-w-sm btn-rose py-4 rounded-2xl font-outfit font-bold text-lg"
          >
            ✓ Понял, дальше!
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
