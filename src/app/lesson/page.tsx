"use client";

import { motion } from "framer-motion";
import { BookOpen, Zap } from "lucide-react";
import Link from "next/link";
import NeonButton from "@/components/ui/NeonButton";

export default function LessonPage() {
  return (
    <main className="min-h-screen bg-bg-deep flex flex-col items-center justify-center px-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 opacity-20 rounded-full"
          style={{ background: "radial-gradient(circle, #FF007A 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-sm w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-20 h-20 rounded-3xl bg-pink-neon/20 border border-pink-neon/30 flex items-center justify-center mx-auto mb-6 shadow-neon-pink-sm">
          <BookOpen size={36} className="text-pink-neon" />
        </div>

        <h1 className="text-3xl font-outfit font-black text-white mb-2">
          Уроки Немецкого
        </h1>
        <p className="text-text-secondary mb-2">
          Модуль уроков в разработке.
        </p>
        <div className="glass-pink rounded-xl px-4 py-2 inline-flex items-center gap-2 mb-8">
          <Zap size={12} className="text-pink-neon" />
          <span className="text-pink-neon text-xs font-outfit font-semibold">
            +15 баллов за урок
          </span>
        </div>

        <Link href="/dashboard">
          <NeonButton variant="pink" size="lg" fullWidth>
            Перейти в кабинет
          </NeonButton>
        </Link>
      </motion.div>
    </main>
  );
}
