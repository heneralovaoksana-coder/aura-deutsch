"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Trophy, Zap, User as UserIcon } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { calcReward } from "@/lib/store";
import { haptic } from "@/lib/telegram";

// ─── Mock data ────────────────────────────────────────────────────
const TOP_PLAYERS = [
  { rank: 1,  name: "Даня К.",    initial: "Д", status: "ТОП",      points: 3840, medal: "🥇" },
  { rank: 2,  name: "Sophia M.",  initial: "S", status: "ТОП",      points: 3120, medal: "🥈" },
  { rank: 3,  name: "Max B.",     initial: "M", status: "ТОП",      points: 2980, medal: "🥉" },
  { rank: 4,  name: "Lea S.",     initial: "L", status: "ТОП",      points: 2750, medal: null },
  { rank: 5,  name: "Ali R.",     initial: "A", status: "ТОП",      points: 2600, medal: null },
  { rank: 6,  name: "Nina W.",    initial: "N", status: "Активный",  points: 2340, medal: null },
  { rank: 7,  name: "Tom K.",     initial: "T", status: "Активный",  points: 2100, medal: null },
];

const tabs = ["ТОП", "Активный", "Новичок"] as const;
type Tab = typeof tabs[number];

const avatarColors = [
  "from-amber-400 to-amber-500",
  "from-gray-400 to-gray-600",
  "from-amber-600 to-amber-800",
  "from-indigo-500 to-indigo-400",
  "from-blue-500 to-blue-700",
  "from-emerald-400 to-green-soft",
  "from-rose-500 to-pink-soft",
];

export default function LeaderboardPage() {
  const { user, points } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>("ТОП");

  const filtered = TOP_PLAYERS.filter((p) => {
    if (activeTab === "ТОП") return p.status === "ТОП";
    if (activeTab === "Активный") return true;
    return p.status === "Новичок";
  });

  return (
    <main className="min-h-screen bg-bg-deep pb-32">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-72 h-72 opacity-15 rounded-full"
          style={{ background: "radial-gradient(circle, #FBBF24 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-6">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center">
              <Users size={20} className="text-amber-400" />
            </div>
            <div>
              <h1 className="text-xl font-outfit font-bold text-white">
                Рейтинг участников ЗБТ
              </h1>
              <p className="text-text-muted text-xs">обновляется каждые 24 часа</p>
            </div>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-1.5 glass border border-emerald-400/30 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-outfit font-semibold">Live</span>
          </div>
        </motion.div>

        {/* Tabs + rate */}
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { haptic.tick(); setActiveTab(tab); }}
                className={`px-3 py-1.5 rounded-full text-xs font-outfit font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? tab === "ТОП"
                      ? "bg-amber-400/20 border border-amber-400/40 text-amber-400"
                      : tab === "Активный"
                      ? "glass-rose text-rose-500"
                      : "glass border border-bg-border text-white"
                    : "glass border border-bg-border text-text-secondary hover:text-white"
                }`}
              >
                {tab === "ТОП" && "🏆 "}
                {tab === "Активный" && "⚡ "}
                {tab === "Новичок" && "👤 "}
                {tab}
              </button>
            ))}
          </div>
          <span className="text-text-muted text-xs">1 балл = $0.08 · без лимитов</span>
        </motion.div>

        {/* Player list */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((player, i) => (
              <motion.div
                key={player.name}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="glass rounded-2xl border border-bg-border p-4 flex items-center gap-4"
              >
                {/* Rank / medal */}
                <div className="w-10 text-center flex-shrink-0">
                  {player.medal ? (
                    <span className="text-2xl">{player.medal}</span>
                  ) : (
                    <span className="text-text-secondary font-outfit font-bold text-sm">
                      #{player.rank}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-sm font-outfit font-bold text-white flex-shrink-0`}
                >
                  {player.initial}
                </div>

                {/* Name + status */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-outfit font-semibold text-sm truncate">
                    {player.name}
                  </p>
                  <p className="text-amber-400 text-[11px] font-inter">
                    {player.status}
                  </p>
                </div>

                {/* Points + reward */}
                <div className="text-right flex-shrink-0">
                  <p className="text-white font-outfit font-bold text-sm">
                    {player.points.toLocaleString("ru-RU")}
                  </p>
                  <p className="text-[10px] text-text-muted">баллов</p>
                  <p className="text-emerald-400 font-outfit font-bold text-sm">
                    ${calcReward(player.points).toFixed(2)}
                  </p>
                  <p className="text-[10px] text-text-muted">возн.</p>
                </div>

                {/* Mini progress bar */}
                <div className="w-16 flex-shrink-0">
                  <div className="progress-track h-1">
                    <div
                      className="progress-fill-emerald"
                      style={{ width: `${Math.min(100, (player.points / 4000) * 100)}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Gap dots (…) */}
          {filtered.length > 0 && (
            <div className="text-center py-2">
              <span className="text-text-muted text-sm tracking-widest">• • •</span>
            </div>
          )}
        </div>

        {/* ── Current user (pinned) ──────────────────────────── */}
        <motion.div
          className="mt-2 rounded-2xl border p-4 flex items-center gap-4"
          style={{
            background: "rgba(255, 0, 122, 0.08)",
            borderColor: "rgba(255, 0, 122, 0.4)",
            boxShadow: "0 0 20px rgba(255, 0, 122, 0.15)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Rank */}
          <div className="w-10 text-center flex-shrink-0">
            <span className="text-rose-500 font-outfit font-black text-sm">
              #{user.rank}
            </span>
          </div>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-indigo-500 flex items-center justify-center text-sm font-outfit font-bold text-white flex-shrink-0 shadow-rose-soft">
            {user.avatar}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-outfit font-semibold text-sm truncate">
              {user.name} <span className="text-text-muted font-normal">(Вы)</span>
            </p>
            <p className="text-rose-500 text-[11px] font-inter">{user.status}</p>
          </div>

          {/* Points + reward */}
          <div className="text-right flex-shrink-0">
            <p className="text-white font-outfit font-bold text-sm">
              {points.total.toLocaleString("ru-RU")}
            </p>
            <p className="text-[10px] text-text-muted">баллов</p>
            <p className="text-emerald-400 font-outfit font-bold text-sm">
              ${calcReward(points.total).toFixed(2)}
            </p>
            <p className="text-[10px] text-text-muted">возн.</p>
          </div>

          {/* Mini progress bar (pink for current user) */}
          <div className="w-16 flex-shrink-0">
            <div className="progress-track h-1">
              <div
                className="progress-fill-rose"
                style={{ width: `${Math.min(100, (points.total / 4000) * 100)}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Footer note */}
        <p className="text-center text-text-muted text-xs mt-4 pb-4">
          Рейтинг обновляется на основе активности участников в режиме ЗБТ. 1 балл = $0.08, без ограничений.
        </p>
      </div>
    </main>
  );
}
