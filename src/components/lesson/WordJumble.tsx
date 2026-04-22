"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JumbleExercise } from "@/data/lessons";
import { haptic } from "@/lib/telegram";

interface WordJumbleProps {
  exercise: JumbleExercise;
  onComplete: () => void;
}

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function WordJumble({ exercise, onComplete }: WordJumbleProps) {
  const [available, setAvailable] = useState<string[]>(() =>
    shuffle(exercise.words)
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "wrong" | "correct">("idle");

  const correctSentence = exercise.correctSentence;

  // Add word to answer zone
  const addWord = useCallback(
    (word: string, index: number) => {
      if (status === "correct") return;
      haptic.tick();
      setAvailable((prev) => prev.filter((_, i) => i !== index));
      setSelected((prev) => [...prev, word]);
      setStatus("idle");
    },
    [status]
  );

  // Remove word from answer zone
  const removeWord = useCallback(
    (index: number) => {
      if (status === "correct") return;
      haptic.tick();
      const word = selected[index];
      setSelected((prev) => prev.filter((_, i) => i !== index));
      setAvailable((prev) => [...prev, word]);
      setStatus("idle");
    },
    [selected, status]
  );

  // Check answer
  const checkAnswer = () => {
    const answer = selected.join(" ");
    if (answer === correctSentence) {
      haptic.success();
      setStatus("correct");
      setTimeout(onComplete, 900);
    } else {
      haptic.error();
      setStatus("wrong");
      setTimeout(() => setStatus("idle"), 700);
    }
  };

  const isAnswerReady = selected.length === exercise.words.length;

  return (
    <div className="flex flex-col px-4 py-4 flex-1 gap-5">
      {/* Instruction */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-text-secondary text-xs uppercase tracking-widest mb-1">
          Задание
        </p>
        <h3 className="text-white font-outfit font-bold text-lg leading-snug">
          {exercise.instruction}
        </h3>
        <p className="text-text-muted text-xs mt-1 italic">
          «{exercise.translation}»
        </p>
      </motion.div>

      {/* ── Answer zone ───────────────────────────────────────── */}
      <motion.div
        animate={
          status === "wrong"
            ? { x: [-8, 8, -6, 6, -4, 4, 0] }
            : status === "correct"
            ? { scale: [1, 1.02, 1] }
            : {}
        }
        transition={{ duration: 0.45 }}
        className={`min-h-20 rounded-3xl border-2 border-dashed p-4 flex flex-wrap gap-2 items-start transition-colors duration-300 ${
          status === "wrong"
            ? "border-red-500/60 bg-red-500/5"
            : status === "correct"
            ? "border-emerald-400/60 bg-emerald-400/5"
            : "border-white/10 bg-white/[0.02]"
        }`}
      >
        <AnimatePresence>
          {selected.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-text-muted text-sm w-full text-center py-2"
            >
              Нажми на слова снизу ↓
            </motion.p>
          )}

          {selected.map((word, i) => (
            <motion.button
              key={`${word}-${i}`}
              layout
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => removeWord(i)}
              className={`px-4 py-2 rounded-2xl font-outfit font-bold text-sm border transition-all ${
                status === "correct"
                  ? "bg-emerald-400/20 border-emerald-400/50 text-emerald-400"
                  : "bg-rose-500/20 border-rose-500/40 text-white hover:bg-rose-500/30"
              }`}
            >
              {word}
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Status indicators */}
        {status === "wrong" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full text-center text-red-400 text-xs mt-1"
          >
            ✗ Неверно — попробуй ещё раз
          </motion.p>
        )}
        {status === "correct" && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center text-emerald-400 text-sm font-outfit font-bold mt-1"
          >
            ✓ Правильно!
          </motion.p>
        )}
      </motion.div>

      {/* ── Word bank ────────────────────────────────────────── */}
      <div>
        <p className="text-text-muted text-xs mb-3 text-center uppercase tracking-widest">
          Доступные слова
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <AnimatePresence>
            {available.map((word, i) => (
              <motion.button
                key={`avail-${word}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 10 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 20,
                  delay: i * 0.05,
                }}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => addWord(word, i)}
                className="px-5 py-3 rounded-2xl font-outfit font-bold text-sm text-white border border-bg-border bg-bg-elevated hover:border-rose-500/40 hover:bg-rose-500/10 hover:shadow-rose-soft transition-all duration-200"
                style={{
                  boxShadow: "0 4px 0 rgba(0,0,0,0.4)",
                }}
              >
                {word}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Check button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnswerReady ? 1 : 0.4, y: 0 }}
        className="mt-auto"
      >
        <motion.button
          whileTap={isAnswerReady ? { scale: 0.96, y: 3 } : {}}
          onClick={isAnswerReady ? checkAnswer : undefined}
          className={`w-full py-4 rounded-2xl font-outfit font-bold text-lg transition-all duration-300 ${
            isAnswerReady
              ? "btn-rose cursor-pointer"
              : "bg-white/5 border border-white/10 text-text-muted cursor-not-allowed"
          }`}
        >
          Проверить ответ
        </motion.button>
      </motion.div>
    </div>
  );
}
