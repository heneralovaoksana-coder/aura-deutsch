"use client";

// Prevent static prerendering — Zustand reads localStorage (client-only)
export const dynamic = "force-dynamic";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Trophy, LayoutDashboard, Zap } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { CURRICULUM } from "@/data/lessons";
import { useRouter } from "next/navigation";
import { haptic } from "@/lib/telegram";

// ── Lazy-imported sub-content (inline for simplicity) ──────────────
import StatsGrid from "@/components/dashboard/StatsGrid";
import ProfileHeader from "@/components/dashboard/ProfileHeader";

// Leaderboard data
const mockLeaderboard = [
  { rank: 1, name: "Даня К.",    points: 3840, initial: "Д", color: "#F43F6F" },
  { rank: 2, name: "Sophia M.",  points: 3120, initial: "S", color: "#6366F1" },
  { rank: 3, name: "Max B.",     points: 2980, initial: "M", color: "#F59E0B" },
  { rank: 4, name: "Lea S.",     points: 2750, initial: "L", color: "#10B981" },
  { rank: 5, name: "Ivan P.",    points: 2600, initial: "И", color: "#818CF8" },
];

const TABS = [
  { id: "cabinet",  label: "Кабинет",  icon: LayoutDashboard },
  { id: "lessons",  label: "Уроки",    icon: BookOpen        },
  { id: "rating",   label: "Рейтинг",  icon: Trophy          },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("cabinet");
  const { points, user, balance } = useAppStore();
  const router = useRouter();

  return (
    <main className="min-h-screen bg-bg-deep pb-36">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="float-orb w-80 h-80 -top-10 left-1/2 -translate-x-1/2 opacity-40"
          style={{ background: "rgba(99, 102, 241, 0.06)" }}
        />
        <div
          className="float-orb w-48 h-48 bottom-40 right-0 opacity-30"
          style={{ background: "rgba(244, 63, 111, 0.05)", animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto">

        {/* ── Profile header ──────────────────────────────── */}
        <div className="px-4 pt-6 pb-2">
          <ProfileHeader user={user} points={points} />
        </div>

        {/* ── Tabs ────────────────────────────────────────── */}
        <div className="px-4 mb-4">
          <div
            className="glass rounded-2xl border border-bg-border p-1 flex gap-1"
          >
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  haptic.select();
                  setActiveTab(id);
                }}
                className="relative flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-outfit font-semibold transition-colors duration-200"
              >
                {activeTab === id && (
                  <motion.div
                    layoutId="profile-tab-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(244,63,111,0.12), rgba(99,102,241,0.08))",
                      border: "1px solid rgba(244,63,111,0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  size={13}
                  className={`relative z-10 transition-colors ${activeTab === id ? "text-rose-400" : "text-text-muted"}`}
                />
                <span className={`relative z-10 transition-colors ${activeTab === id ? "text-text-primary" : "text-text-muted"}`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab content ─────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* КАБИНЕТ */}
            {activeTab === "cabinet" && (
              <div className="px-4 space-y-4">
                <StatsGrid
                  points={points}
                  balance={balance}
                  rank={user.rank}
                  onWithdraw={() => alert("Вывод средств скоро будет доступен в профиле!")}
                />
              </div>
            )}

            {/* УРОКИ */}
            {activeTab === "lessons" && (
              <div className="px-4 space-y-3">
                {/* ZBT chip */}
                <div className="glass-rose rounded-xl px-4 py-2 inline-flex items-center gap-2">
                  <Zap size={12} className="text-rose-400" />
                  <span className="text-rose-400 text-xs font-outfit font-semibold">
                    +15 баллов за урок · 1 балл = $0.08
                  </span>
                </div>

                {(CURRICULUM[user.level] || []).map((lesson: any, i: number) => (
                  <motion.button
                    key={lesson.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      haptic.select();
                      router.push("/lesson");
                    }}
                    className="w-full glass rounded-2xl border border-bg-border p-4 flex items-center gap-4 hover:border-rose-500/20 transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-indigo-500 flex items-center justify-center text-xl font-outfit font-black text-white flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-text-primary font-outfit font-bold truncate">{lesson.title}</p>
                      <p className="text-text-secondary text-sm truncate">{lesson.subtitle}</p>
                      <p className="text-text-muted text-xs mt-1">
                        {lesson.steps.length} шагов · <span className="text-amber-400">+{lesson.pointsReward} pts</span>
                      </p>
                    </div>
                    <span className="text-text-muted text-lg flex-shrink-0">›</span>
                  </motion.button>
                ))}

                <div className="glass rounded-2xl border border-dashed border-bg-border p-5 text-center">
                  <p className="text-text-muted text-sm">🚀 Больше уроков скоро...</p>
                  <p className="text-text-muted text-xs mt-1">Числа · Цвета · Дни недели</p>
                </div>
              </div>
            )}

            {/* РЕЙТИНГ */}
            {activeTab === "rating" && (
              <div className="px-4 space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-text-secondary text-xs uppercase tracking-widest">Топ участников ЗБТ</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-xs font-semibold">Live</span>
                  </div>
                </div>

                {mockLeaderboard.map((u, i) => (
                  <motion.div
                    key={u.rank}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="glass rounded-2xl border border-bg-border p-4 flex items-center gap-3"
                  >
                    <span className="text-text-muted w-5 text-sm font-bold text-center">
                      {u.rank <= 3 ? ["🥇","🥈","🥉"][u.rank - 1] : `#${u.rank}`}
                    </span>
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-outfit font-black text-lg flex-shrink-0"
                      style={{ background: u.color }}
                    >
                      {u.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary font-outfit font-semibold text-sm truncate">{u.name}</p>
                      <p className="text-text-muted text-xs">{u.points.toLocaleString()} баллов</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-emerald-400 font-outfit font-bold text-sm">
                        ${(u.points * 0.08).toFixed(2)}
                      </p>
                      <p className="text-text-muted text-xs">возн.</p>
                    </div>
                  </motion.div>
                ))}

                {/* Current user pinned */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-2xl border border-rose-500/25 p-4 flex items-center gap-3 mt-4"
                  style={{ background: "rgba(244,63,111,0.06)" }}
                >
                  <span className="text-text-muted w-5 text-sm font-bold text-center">#–</span>
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-indigo-500 flex items-center justify-center text-white font-outfit font-black text-lg">
                    П
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-rose-400 font-outfit font-semibold text-sm">Ты</p>
                    <p className="text-text-muted text-xs">{points.total} баллов</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-emerald-400 font-outfit font-bold text-sm">
                      ${(points.total * 0.08).toFixed(2)}
                    </p>
                    <p className="text-text-muted text-xs">возн.</p>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
