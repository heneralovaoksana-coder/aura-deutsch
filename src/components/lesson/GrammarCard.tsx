"use client";

import { motion } from "framer-motion";
import { GrammarCardItem } from "@/data/lessons";
import { haptic } from "@/lib/telegram";

interface GrammarCardProps {
  card: GrammarCardItem;
  onComplete: () => void;
}

export default function GrammarCard({ card, onComplete }: GrammarCardProps) {
  return (
    <div className="flex flex-col h-full items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-[32px] p-8 glass-panel relative border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col"
        style={{
          background: "linear-gradient(145deg, rgba(30,30,30,0.95) 0%, rgba(15,15,15,0.98) 100%)"
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center shadow-lg text-white font-bold text-2xl font-outfit">
            i
          </div>
          <h2 className="text-2xl font-outfit font-black text-white">
            {card.title}
          </h2>
        </div>

        <p className="text-text-primary mb-6 leading-relaxed bg-black/30 p-4 rounded-2xl text-sm border border-white/5">
          {card.content}
        </p>

        {card.tips.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-rose-500 font-semibold text-sm uppercase tracking-wider mb-2">Примеры</h3>
            {card.tips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="bg-white/5 px-4 py-3 rounded-xl border border-white/5 flex gap-3 text-sm text-white/90"
              >
                <div className="text-rose-500 shrink-0">•</div>
                {tip}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <div className="absolute bottom-20 left-0 right-0 px-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            haptic.tap();
            onComplete();
          }}
          className="w-full py-4 text-white font-bold text-lg rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 shadow-lg transition-colors"
        >
          Далее
        </motion.button>
      </div>
    </div>
  );
}
