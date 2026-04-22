"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Target, Users, Star, ChevronRight } from "lucide-react";

const FEATURES = [
  {
    icon: "🇩🇪",
    title: "Немецкий с нуля",
    desc: "Курс A0→A2 — от алфавита до свободного разговора. Шаг за шагом, без перегруза.",
  },
  {
    icon: "💎",
    title: "ЗБТ · Бета-тест",
    desc: "Ты среди первых! Зарабатывай баллы — они конвертируются в реальное вознаграждение.",
  },
  {
    icon: "⚡",
    title: "Геймификация",
    desc: "Серии дней, рейтинги, достижения. Учёба — это игра, в которой ты побеждаешь.",
  },
  {
    icon: "🤖",
    title: "AI-персонализация",
    desc: "Система адаптируется под твой темп. Сложные темы повторяются, лёгкие — ускоряются.",
  },
];

const STATS = [
  { value: "500+",   label: "Бета-участников" },
  { value: "$0.08",  label: "За каждый балл"  },
  { value: "A0→A2",  label: "Уровни курса"    },
  { value: "24/7",   label: "Доступно"         },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg-deep pb-36">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-72 opacity-20"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, #6366F1 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-8 space-y-6">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <motion.div
            className="text-7xl"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🇩🇪
          </motion.div>
          <h1 className="text-4xl font-outfit font-black text-white">
            Aura Deutsch
          </h1>
          <p className="text-text-secondary text-base leading-relaxed">
            Образовательная платформа нового поколения.<br />
            Учи немецкий — зарабатывай реальные деньги.
          </p>

          {/* Beta badge */}
          <div className="inline-flex items-center gap-2 glass-rose rounded-2xl px-5 py-2.5 border border-rose-500/30">
            <Zap size={14} className="text-rose-500" />
            <span className="text-rose-500 font-outfit font-bold text-sm">
              Закрытое Бета-тестирование
            </span>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-3"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="glass rounded-2xl border border-bg-border p-4 text-center"
            >
              <p className="text-3xl font-outfit font-black text-white mb-1">
                {stat.value}
              </p>
              <p className="text-text-muted text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-3"
        >
          <p className="text-text-muted text-xs uppercase tracking-widest text-center">
            Что такое Aura Deutsch
          </p>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="glass rounded-3xl border border-bg-border p-5 flex gap-4"
            >
              <div className="text-3xl flex-shrink-0 mt-0.5">{f.icon}</div>
              <div>
                <h3 className="text-white font-outfit font-bold mb-1">{f.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-3xl border border-indigo-500/30 p-6 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(17,21,25,0.95))",
          }}
        >
          <p className="text-indigo-400 text-xs uppercase tracking-widest mb-2">
            Наша миссия
          </p>
          <p className="text-white font-outfit font-bold text-lg leading-snug">
            Сделать изучение языка настолько ценным, чтобы оно само себя оплачивало.
          </p>
        </motion.div>

        {/* Version */}
        <div className="text-center pb-4">
          <p className="text-text-muted text-xs">
            Aura Deutsch · Версия 0.1 Beta · 2025
          </p>
        </div>
      </div>
    </main>
  );
}
