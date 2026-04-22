"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { initTWA, haptic } from "@/lib/telegram";
import { useAppStore } from "@/lib/store";
import {
  Sparkles, Megaphone, ExternalLink, ArrowRight,
  MessageCircle, Globe, Users, Zap, Gift, TrendingUp,
} from "lucide-react";

/* ── Mock data for news feed ─────────────────────────────────────── */
const NEWS = [
  {
    id: 1,
    tag: "Обновление",
    tagColor: "rose",
    title: "Новый дизайн платформы",
    description: "Мы полностью обновили интерфейс: Premium Liquid Glass, новые анимации и улучшенный UX.",
    date: "22 апреля 2026",
    icon: <Sparkles size={20} />,
  },
  {
    id: 2,
    tag: "Новость",
    tagColor: "indigo",
    title: "Расширенная база словаря",
    description: "Добавлено более 200 новых слов в категориях: Путешествия, Бизнес и Повседневный немецкий.",
    date: "20 апреля 2026",
    icon: <Megaphone size={20} />,
  },
  {
    id: 3,
    tag: "Акция",
    tagColor: "amber",
    title: "Двойные баллы за серию",
    description: "На этой неделе все бета-тестеры получают x2 множитель баллов за ежедневную серию!",
    date: "18 апреля 2026",
    icon: <Gift size={20} />,
  },
  {
    id: 4,
    tag: "Событие",
    tagColor: "emerald",
    title: "Топ-10 недели",
    description: "Лучшие участники ЗБТ получат бонусные награды. Поднимайся в рейтинге!",
    date: "15 апреля 2026",
    icon: <TrendingUp size={20} />,
  },
];

const SOCIALS = [
  { label: "Telegram", icon: <MessageCircle size={22} />, href: "https://t.me/aura_deutsch", color: "#F43F6F" },
  { label: "Канал",    icon: <Megaphone size={22} />,     href: "https://t.me/aura_deutsch_news", color: "#6366F1" },
  { label: "Сайт",     icon: <Globe size={22} />,         href: "https://auradeutsch.com", color: "#10B981" },
  { label: "Комьюнити",icon: <Users size={22} />,         href: "https://t.me/aura_deutsch_chat", color: "#F59E0B" },
];

const TAG_COLORS: Record<string, string> = {
  rose:    "bg-rose-500/10 text-rose-400 border-rose-500/20",
  indigo:  "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  amber:   "bg-amber-500/10 text-amber-400 border-amber-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function DashboardPage() {
  const { user } = useAppStore();

  useEffect(() => {
    initTWA();
  }, []);

  return (
    <main className="min-h-screen bg-bg-deep pb-32">
      {/* Ambient mesh background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="float-orb w-80 h-80 -top-20 -right-20 opacity-60"
          style={{ background: "rgba(244, 63, 111, 0.08)" }}
        />
        <div
          className="float-orb w-64 h-64 top-1/2 -left-20 opacity-40"
          style={{ background: "rgba(99, 102, 241, 0.06)", animationDelay: "2s" }}
        />
        <div
          className="float-orb w-48 h-48 bottom-20 right-10 opacity-30"
          style={{ background: "rgba(16, 185, 129, 0.06)", animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-6 space-y-6">
        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-widest font-inter mb-1">
              Добро пожаловать
            </p>
            <h1 className="text-2xl font-outfit font-bold text-text-primary">
              Привет, {user.name}! 👋
            </h1>
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-lg font-outfit font-bold text-white shadow-rose-soft"
          >
            {user.avatar}
          </motion.div>
        </motion.div>

        {/* ── Hero Banner ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl overflow-hidden relative"
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(244,63,111,0.12) 0%, rgba(99,102,241,0.08) 100%)",
            }}
          />
          {/* Decorative 3D-like orb */}
          <div
            className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-30 animate-float-slow"
            style={{
              background: "radial-gradient(circle, rgba(244,63,111,0.4) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          <div className="relative p-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-rose-400" />
              <span className="text-xs font-outfit font-semibold text-rose-400 uppercase tracking-wider">
                Aura Deutsch · ЗБТ
              </span>
            </div>
            <h2 className="text-xl font-outfit font-bold text-text-primary mb-2">
              Учи немецкий. Зарабатывай.
            </h2>
            <p className="text-sm text-text-secondary mb-1">
              Изучай немецкий язык в нашей платформе и получай реальные вознаграждения за свой прогресс.
            </p>
            <div className="glass-rose inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mt-3">
              <Sparkles size={12} className="text-rose-400" />
              <span className="text-xs font-outfit font-semibold text-rose-400">
                1 балл = $0.08 · Без лимитов
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Social Media ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-text-muted text-xs uppercase tracking-widest mb-3 font-outfit">
            Мы в соцсетях
          </p>
          <div className="grid grid-cols-4 gap-2">
            {SOCIALS.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic.tap()}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.06 }}
                whileTap={{ scale: 0.94 }}
                className="glass rounded-2xl p-3 flex flex-col items-center gap-2 hover:border-bg-hover transition-all border border-transparent"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ background: `${social.color}18`, color: social.color }}
                >
                  {social.icon}
                </div>
                <span className="text-[10px] font-outfit font-medium text-text-secondary">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ── News Feed ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-text-muted text-xs uppercase tracking-widest font-outfit">
              Новости и обновления
            </p>
            <span className="text-rose-400 text-xs font-outfit font-semibold flex items-center gap-1">
              Все <ArrowRight size={12} />
            </span>
          </div>

          <div className="space-y-3">
            {NEWS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="glass rounded-2xl border border-bg-border p-4 hover:border-bg-hover transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: item.tagColor === "rose" ? "rgba(244,63,111,0.1)"
                        : item.tagColor === "indigo" ? "rgba(99,102,241,0.1)"
                        : item.tagColor === "amber" ? "rgba(245,158,11,0.1)"
                        : "rgba(16,185,129,0.1)",
                      color: item.tagColor === "rose" ? "#F43F6F"
                        : item.tagColor === "indigo" ? "#818CF8"
                        : item.tagColor === "amber" ? "#FBBF24"
                        : "#34D399",
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-outfit font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${TAG_COLORS[item.tagColor]}`}>
                        {item.tag}
                      </span>
                      <span className="text-text-muted text-[10px]">{item.date}</span>
                    </div>
                    <h3 className="text-sm font-outfit font-bold text-text-primary mb-1 group-hover:text-rose-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ExternalLink size={14} className="text-text-muted group-hover:text-rose-400 transition-colors flex-shrink-0 mt-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── 3D Model Placeholder ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-3xl border border-dashed border-bg-border p-6 text-center"
        >
          <div className="text-4xl mb-3 animate-float">🐦</div>
          <p className="text-sm font-outfit font-bold text-text-primary mb-1">
            3D Маскот скоро здесь
          </p>
          <p className="text-xs text-text-secondary">
            Интерактивная 3D-модель нашего птенца Aura
          </p>
        </motion.div>
      </div>
    </main>
  );
}
