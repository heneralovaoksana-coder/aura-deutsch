"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { initTWA, haptic } from "@/lib/telegram";
import { useRouter } from "next/navigation";
import { Play, Flame, Target, BookOpen, ChevronRight } from "lucide-react";
import { CURRICULUM } from "@/data/lessons";

export default function DashboardPage() {
  const { user, points, streak, progress } = useAppStore();
  const checkAndUpdateStreak = useAppStore((s) => s.checkAndUpdateStreak);
  const router = useRouter();

  const currentLevelProgress = progress[user.level] || 0;
  const currentLesson = CURRICULUM[user.level]?.[currentLevelProgress];
  const totalLessons = CURRICULUM[user.level]?.length || 40;

  useEffect(() => {
    initTWA();
    checkAndUpdateStreak();
  }, [checkAndUpdateStreak]);

  // Calculate daily goal progress (e.g., 30 points per day goal)
  const dailyGoal = 30;
  const dailyProgress = Math.min(100, Math.round((points.todayGain / dailyGoal) * 100));

  return (
    <main className="min-h-screen bg-bg-deep pb-32">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #FF007A 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-40 -left-32 w-80 h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-6 space-y-6">
        
        {/* Header greeting */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-widest font-inter mb-1">
              С возвращением
            </p>
            <h1 className="text-2xl font-outfit font-bold text-white">
              Привет, {user.name}! 👋
            </h1>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-neon to-purple-soft flex items-center justify-center text-lg font-outfit font-bold text-white shadow-neon-purple shadow-sm">
            {user.avatar}
          </div>
        </motion.div>

        {/* Big Continue Learning Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl border border-bg-border overflow-hidden relative"
        >
          {/* Card Bg FX */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-neon/10 to-purple-neon/5" />
          
          <div className="relative p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="glass-pink px-2.5 py-1 rounded-md flex items-center gap-1">
                <BookOpen size={12} className="text-pink-neon" />
                <span className="text-[10px] font-outfit font-semibold text-pink-neon uppercase tracking-wider">
                  Текущий уровень: {user.level}
                </span>
              </div>
              <div className="text-xs font-bold text-text-muted">
                {currentLevelProgress + 1} / {totalLessons}
              </div>
            </div>

            <h2 className="text-xl font-outfit font-bold text-white mb-1">
              {currentLesson ? currentLesson.title : "Уровень пройден!"}
            </h2>
            <p className="text-sm text-text-secondary mb-6 truncate">
              {currentLesson ? currentLesson.subtitle : "Ожидайте новых обновлений."}
            </p>

            <button
              onClick={() => {
                if (!currentLesson) return;
                haptic.select();
                router.push("/lesson");
              }}
              disabled={!currentLesson}
              className={`w-full py-3.5 rounded-2xl font-outfit font-bold text-base flex items-center justify-center gap-2 transition-transform ${
                currentLesson ? "btn-neon-pink bg-pink-neon text-white hover:scale-[0.98]" : "bg-white/5 text-text-muted cursor-not-allowed"
              }`}
            >
              <Play size={18} fill="currentColor" />
              {currentLesson ? "Продолжить обучение" : "Скоро"}
            </button>
          </div>
        </motion.div>

        {/* Stats Row: Streak & Daily Goal */}
        <div className="grid grid-cols-2 gap-3">
          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl border border-bg-border p-4 relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Flame size={80} className="text-orange-500" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={16} className="text-orange-500" fill="currentColor" />
                <p className="text-xs text-text-muted uppercase tracking-wider">Серия</p>
              </div>
              <p className="text-3xl font-outfit font-black text-white mb-1">
                {streak.days} 
                <span className="text-base text-text-secondary font-medium ml-1">дней</span>
              </p>
              <p className="text-[10px] text-text-secondary leading-tight">
                Зайди завтра, чтобы не потерять множитель!
              </p>
            </div>
          </motion.div>

          {/* Daily Goal Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-3xl border border-bg-border p-4 relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Target size={80} className="text-green-money" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Target size={16} className="text-green-money" />
                <p className="text-xs text-text-muted uppercase tracking-wider">Цель</p>
              </div>
              <p className="text-3xl font-outfit font-black text-white mb-2">
                {points.todayGain}
                <span className="text-base text-text-secondary font-medium ml-1">/ {dailyGoal}</span>
              </p>
              
              {/* Mini progress bar */}
              <div className="h-1.5 w-full bg-bg-deep rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-green-money rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${dailyProgress}%` }}
                  transition={{ delay: 0.8, duration: 1 }}
                />
              </div>
              <p className="text-[10px] text-text-secondary mt-1.5">
                {dailyProgress >= 100 ? "Цель выполнена! 🎉" : "Очки за сегодня"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Word of the Day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl border border-dashed border-bg-border p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-text-muted uppercase tracking-widest">Слово дня</p>
            <div className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-white/5 text-text-secondary">
              A1
            </div>
          </div>
          <div className="text-center pb-2">
            <h3 className="text-3xl font-outfit font-black text-white mb-1">
              wunderschön
            </h3>
            <p className="text-pink-neon font-outfit font-semibold mb-3">
              (прекрасный, чудесный)
            </p>
            <p className="text-sm text-text-secondary italic">
              «Das Wetter heute ist wunderschön!»
            </p>
          </div>
        </motion.div>

        {/* Navigate to profile hint */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.6 }}
           onClick={() => {
             haptic.tap();
             router.push("/profile");
           }}
           className="glass border border-bg-border rounded-2xl p-4 flex items-center justify-between active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-pink-neon/20 flex items-center justify-center">
              <span className="text-pink-neon">💸</span>
            </div>
            <div>
              <p className="text-sm font-outfit font-bold text-white">Статистика и баланс</p>
              <p className="text-xs text-text-secondary">Проверяй свои накопления ЗБТ</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-text-muted" />
        </motion.div>

      </div>
    </main>
  );
}
