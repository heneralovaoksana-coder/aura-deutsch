"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExamQuestion } from "@/data/lessons";
import { haptic } from "@/lib/telegram";

interface ExamScreenProps {
  questions: ExamQuestion[];
  onComplete: (scorePercentage: number) => void;
}

export default function ExamScreen({ questions, onComplete }: ExamScreenProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const activeQuestion = questions[currentQ];

  const handleSelect = (idx: number) => {
    haptic.select();
    setSelectedOpt(idx);
  };

  const handleNext = () => {
    if (selectedOpt === null) return;
    
    const isCorrect = selectedOpt === activeQuestion.correctIndex;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    
    haptic.tick();
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOpt(null);
    } else {
      // Done - Calculate Final Score
      const finalScore = score + (isCorrect ? 1 : 0);
      const percentage = (finalScore / questions.length) * 100;
      onComplete(percentage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 h-full w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-[32px] glass-panel p-8 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(20,20,30,0.9) 0%, rgba(10,10,15,0.98) 100%)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)"
        }}
      >
        <div className="inline-flex px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-white/40 mb-6 uppercase tracking-widest border border-white/5">
          Вопрос {currentQ + 1} / {questions.length}
        </div>
        
        <h2 className="text-xl font-bold text-white mb-8 leading-relaxed">
          {activeQuestion.question}
        </h2>
        
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {activeQuestion.options.map((opt, idx) => (
                <button
                   key={idx}
                   onClick={() => handleSelect(idx)}
                   className={`w-full p-4 text-sm rounded-xl text-left font-medium transition-all ${
                     selectedOpt === idx
                       ? "bg-rose-500/20 border-rose-500 text-white shadow-[0_0_15px_rgba(255,0,122,0.2)]"
                       : "bg-white/5 border-white/5 text-text-primary hover:bg-white/10 hover:border-white/10"
                   } border`}
                >
                   {opt}
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="absolute bottom-20 left-0 right-0 px-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={selectedOpt === null}
          className={`w-full py-4 font-bold text-lg rounded-2xl transition-all ${
            selectedOpt === null
              ? "bg-white/5 text-white/30 border border-white/5"
              : "bg-white text-black shadow-[0_5px_20px_rgba(255,255,255,0.3)]"
          }`}
        >
          {currentQ < questions.length - 1 ? "Следующий вопрос" : "Завершить экзамен"}
        </motion.button>
      </div>
    </div>
  );
}
