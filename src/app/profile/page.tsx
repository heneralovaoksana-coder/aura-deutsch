"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import Link from "next/link";
import NeonButton from "@/components/ui/NeonButton";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-bg-deep flex flex-col items-center justify-center px-6">
      <motion.div
        className="text-center max-w-sm w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-20 h-20 rounded-3xl bg-purple-neon/20 border border-purple-neon/30 flex items-center justify-center mx-auto mb-6">
          <User size={36} className="text-purple-soft" />
        </div>
        <h1 className="text-3xl font-outfit font-black text-white mb-2">Профиль</h1>
        <p className="text-text-secondary mb-8">Настройки профиля — скоро</p>
        <Link href="/dashboard">
          <NeonButton variant="pink" size="lg" fullWidth>В кабинет</NeonButton>
        </Link>
      </motion.div>
    </main>
  );
}
