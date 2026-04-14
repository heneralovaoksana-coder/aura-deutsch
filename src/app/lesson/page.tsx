"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Zap, Clock, ChevronRight, Star } from "lucide-react";
import { LESSONS } from "@/data/lessons";
import LessonContainer from "@/components/lesson/LessonContainer";
import { haptic } from "@/lib/telegram";

export default function LessonPage() {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const activeLesson = LESSONS.find((l) => l.id === activeLessonId);

  // If a lesson is active, show the lesson container full-screen
  if (activeLesson) {
    return <LessonContainer lesson={activeLesson} />;
  }

  return (
    <main className="min-h-screen bg-bg-deep pb-32">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-64 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #FF007A 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-pink-neon/20 border border-pink-neon/30 flex items-center justify-center">
              <BookOpen size={20} className="text-pink-neon" />
            </div>
            <div>
              <h1 className="text-2xl font-outfit font-black text-white">
                Уроки
              </h1>
              <p className="text-text-muted text-xs">Немецкий · A0 → A1</p>
            </div>
          </div>

          {/* ZBT chip */}
          <div className="glass-pink rounded-xl px-4 py-2 inline-flex items-center gap-2 mt-2">
            <Zap size={12} className="text-pink-neon" />
            <span className="text-pink-neon text-xs font-outfit font-semibold">
              +15 баллов за урок · 1 балл = $0.08
            </span>
          </div>
        </motion.div>

        {/* Lesson cards */}
        <div className="space-y-3">
          {LESSONS.map((lesson, i) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  haptic.select();
                  setActiveLessonId(lesson.id);
                }}
                className="w-full glass rounded-3xl border border-bg-border p-5 text-left flex items-center gap-4 hover:border-pink-neon/30 transition-all duration-300 hover:shadow-neon-pink-sm"
              >
                {/* Lesson number */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-neon to-purple-neon flex items-center justify-center text-2xl font-outfit font-black text-white flex-shrink-0 shadow-neon-pink-sm">
                  {i + 1}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-outfit font-bold text-base mb-0.5">
                    {lesson.title}
                  </p>
                  <p className="text-text-secondary text-sm mb-2">
                    {lesson.subtitle}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Clock size={11} className="text-text-muted" />
                      <span className="text-text-muted text-xs">
                        {lesson.steps.length} шагов
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-gold-bright" />
                      <span className="text-gold-bright text-xs font-semibold">
                        +{lesson.pointsReward} pts
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight size={20} className="text-text-muted flex-shrink-0" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Coming soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 glass rounded-3xl border border-dashed border-bg-border p-6 text-center"
        >
          <p className="text-text-muted text-sm">
            🚀 Больше уроков скоро...
          </p>
          <p className="text-text-muted text-xs mt-1">
            Числа · Цвета · Дни недели · Семья
          </p>
        </motion.div>
      </div>
    </main>
  );
}
