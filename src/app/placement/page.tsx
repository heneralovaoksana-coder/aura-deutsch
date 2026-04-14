"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import NeonButton from "@/components/ui/NeonButton";

export default function PlacementPage() {
  return (
    <main className="min-h-screen bg-bg-deep flex flex-col items-center justify-center px-6">
      <motion.div
        className="text-center max-w-sm w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-20 h-20 rounded-3xl bg-purple-neon/20 border border-purple-neon/30 flex items-center justify-center mx-auto mb-6 shadow-neon-purple">
          <GraduationCap size={36} className="text-purple-soft" />
        </div>
        <h1 className="text-3xl font-outfit font-black text-white mb-2">Тест на уровень</h1>
        <p className="text-text-secondary mb-8">30 вопросов · A0 → B1 · Radar Chart</p>
        <Link href="/dashboard">
          <NeonButton variant="pink" size="lg" fullWidth>Вернуться в кабинет</NeonButton>
        </Link>
      </motion.div>
    </main>
  );
}
