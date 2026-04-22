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
          className="float-orb w-96 h-96 -top-24 left-1/2 -translate-x-1/2 opacity-50"
          style={{ background: "rgba(244, 63, 111, 0.08)" }}
        />
        <div
          className="float-orb w-64 h-64 bottom-20 right-0 opacity-30"
          style={{ background: "rgba(16, 185, 129, 0.06)", animationDelay: "3s" }}
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
          <div className="w-28 h-28 rounded-[2rem] flex items-center justify-center shadow-rose-soft overflow-hidden border border-rose-500/15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-bird.png" alt="Aura Deutsch Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-4xl font-outfit font-black text-text-primary">
              Aura <span className="text-rose-500">Deutsch</span>
            </h1>
            <p className="text-text-secondary text-sm mt-1">ЗБТ · Бета-тест</p>
          </div>
        </motion.div>

        {/* Beta chip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-rose rounded-2xl px-5 py-3 inline-flex items-center gap-2 mx-auto"
        >
          <Zap size={14} className="text-rose-400" />
          <span className="text-rose-400 font-outfit font-semibold text-sm">
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
          <h2 className="text-xl font-outfit font-bold text-text-primary mb-2">
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

      </div>
    </main>
  );
}
