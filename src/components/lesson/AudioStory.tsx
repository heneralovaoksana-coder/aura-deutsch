"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { AudioStoryItem } from "@/data/lessons";
import { haptic } from "@/lib/telegram";

interface AudioStoryProps {
  story: AudioStoryItem;
  onComplete: () => void;
}

export default function AudioStory({ story, onComplete }: AudioStoryProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);

  const activeQuestion = story.questions[currentQ];

  const handlePlay = () => {
    haptic.tick();
    if ("speechSynthesis" in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(story.transcript);
        utterance.lang = "de-DE";
        utterance.rate = 0.85; // slightly slower for learners
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleSelect = (idx: number) => {
    haptic.select();
    setSelectedOpt(idx);
    setShowError(false);
  };

  const checkAnswer = () => {
    if (selectedOpt === null) return;
    
    if (selectedOpt === activeQuestion.correctIndex) {
      haptic.success();
      if (currentQ < story.questions.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelectedOpt(null);
      } else {
        onComplete();
      }
    } else {
      haptic.error();
      setShowError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-[32px] glass-panel p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/5"
      >
         <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-rose-500 rounded-full p-[2px] shadow-[0_0_20px_rgba(255,0,122,0.4)]">
           <div className="w-full h-full bg-bg-deep rounded-full flex items-center justify-center relative border border-black overflow-hidden">
             {isPlaying && (
                <motion.div 
                  className="absolute inset-0 bg-rose-500/20"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
             )}
             <button onClick={handlePlay} className="text-white hover:text-rose-500 transition-colors relative z-10">
               {isPlaying ? <Pause fill="currentColor" size={32}/> : <Play fill="currentColor" size={32}/>}
             </button>
           </div>
         </div>
         
         <h2 className="text-2xl font-outfit font-black text-white mb-2">{story.title}</h2>
         <p className="text-text-muted text-sm mb-6">Прослушайте аудио и ответьте на вопрос.</p>

         {/* Question Area */}
         <AnimatePresence mode="wait">
           <motion.div
             key={currentQ}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             className="text-left"
           >
             <h3 className="text-lg font-bold text-white mb-4 leading-tight">{activeQuestion.question}</h3>
             
             <div className="space-y-3">
               {activeQuestion.options.map((opt, idx) => (
                 <button
                   key={idx}
                   onClick={() => handleSelect(idx)}
                   className={`w-full p-4 rounded-xl border text-left transition-colors font-medium text-sm ${
                     selectedOpt === idx
                       ? "border-rose-500 bg-rose-500/20 text-white shadow-[0_0_15px_rgba(255,0,122,0.2)]"
                       : "border-white/10 bg-white/5 text-text-primary hover:bg-white/10"
                   }`}
                 >
                   {opt}
                 </button>
               ))}
             </div>
           </motion.div>
         </AnimatePresence>
      </motion.div>

      <div className="absolute bottom-20 left-0 right-0 px-6">
        <motion.button
          animate={showError ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          whileTap={{ scale: 0.95 }}
          onClick={checkAnswer}
          disabled={selectedOpt === null}
          className={`w-full py-4 font-bold text-lg rounded-2xl transition-colors ${
            selectedOpt === null
              ? "bg-white/5 text-white/30 border border-white/10"
              : showError
                ? "bg-red-500/80 text-white shadow-lg"
                : "bg-gradient-to-r from-primary to-[#FF003C] text-white shadow-[0_4px_20px_rgba(255,0,122,0.4)]"
          }`}
        >
          {showError ? "Неправильно, попробуй еще" : "Проверить"}
        </motion.button>
      </div>
    </div>
  );
}
