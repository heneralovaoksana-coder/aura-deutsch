"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, ChevronRight, BookOpen, GraduationCap } from "lucide-react";
import NeonButton from "@/components/ui/NeonButton";
import { haptic, initTWA } from "@/lib/telegram";
import { useEffect } from "react";

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    initTWA();
  }, []);

  return (
    <main className="min-h-screen bg-bg-deep flex flex-col items-center justify-center px-6 pb-12">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #FF007A 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-20 right-0 w-64 h-64 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #00FF94 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm text-center space-y-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-neon to-purple-neon flex items-center justify-center shadow-neon-pink overflow-hidden p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bird.png" alt="Aura Deutsch Bird" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <div>
            <h1 className="text-4xl font-outfit font-black text-white">
              Aura <span className="text-neon-pink">Deutsch</span>
            </h1>
            <p className="text-text-secondary text-sm mt-1">ЗБТ · Бета-тест</p>
          </div>
        </motion.div>

        {/* Beta chip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-pink rounded-2xl px-5 py-3 inline-flex items-center gap-2 mx-auto"
        >
          <Zap size={14} className="text-pink-neon" />
          <span className="text-pink-neon font-outfit font-semibold text-sm">
            1 балл = $0.08 · Без лимитов
          </span>
        </motion.div>

        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl border border-bg-border p-6"
        >
          <h2 className="text-xl font-outfit font-bold text-white mb-2">
            Вы начинаете с нуля?
          </h2>
          <p className="text-text-secondary text-sm mb-6">
            Выберите вариант, чтобы поставить вас на правильный уровень.
          </p>

          <div className="space-y-3">
            <NeonButton
              id="onboarding-beginner"
              variant="pink"
              size="lg"
              fullWidth
              icon={<BookOpen size={18} />}
              onClick={() => {
                haptic.select();
                router.push("/dashboard");
              }}
            >
              Да, я новичок
            </NeonButton>

            <NeonButton
              id="onboarding-test"
              variant="ghost"
              size="lg"
              fullWidth
              icon={<GraduationCap size={18} />}
              onClick={() => {
                haptic.select();
                router.push("/placement");
              }}
            >
              Нет, пройти тест <ChevronRight size={14} />
            </NeonButton>
          </div>
        </motion.div>

        {/* Go to dashboard */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-text-muted text-sm underline underline-offset-4"
          onClick={() => router.push("/dashboard")}
        >
          Перейти в кабинет →
        </motion.button>
      </div>
    </main>
  );
}
