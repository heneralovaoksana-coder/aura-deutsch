"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Flame,
  DollarSign,
  BarChart3,
  Activity,
  RefreshCw,
  Zap,
} from "lucide-react";
import { fetchAllUsers, computeStats, type AdminStats, type FirebaseUser } from "@/lib/adminData";
import { ZBT_RATE } from "@/lib/store";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<FirebaseUser[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<string>("");

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAllUsers();
    setUsers(data);
    setStats(computeStats(data));
    setLastRefresh(new Date().toLocaleTimeString("ru-RU"));
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const topUsers = [...users]
    .sort((a, b) => (b.points?.total || 0) - (a.points?.total || 0))
    .slice(0, 5);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px]">
      {/* ── Header ─────────────────────────────────────── */}
      <motion.div
        {...fadeUp}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-outfit font-bold text-white">
            Панель управления
          </h1>
          <p className="text-sm text-white/40 mt-1">
            Обзор платформы Aura Deutsch в реальном времени
          </p>
        </div>
        <button
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.08] transition-all text-sm"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          {loading ? "Загрузка..." : "Обновить"}
        </button>
      </motion.div>

      {/* ── Stats Grid ─────────────────────────────────── */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Users size={20} />}
            label="Всего учеников"
            value={stats.totalUsers.toString()}
            color="rose"
            delay={0}
          />
          <StatCard
            icon={<Activity size={20} />}
            label="Активных сегодня"
            value={stats.activeToday.toString()}
            sub={stats.totalUsers > 0 ? `${Math.round((stats.activeToday / stats.totalUsers) * 100)}%` : "0%"}
            color="emerald"
            delay={0.05}
          />
          <StatCard
            icon={<Zap size={20} />}
            label="Общие баллы"
            value={stats.totalPoints.toLocaleString("ru-RU")}
            sub={`≈ $${stats.totalBalanceUSD}`}
            color="amber"
            delay={0.1}
          />
          <StatCard
            icon={<Flame size={20} />}
            label="Средняя серия"
            value={`${stats.avgStreak} дн.`}
            color="indigo"
            delay={0.15}
          />
        </div>
      )}

      {/* ── Two columns ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── Level Distribution ─────────────────────── */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5"
        >
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 size={16} className="text-rose-400" />
            <h2 className="font-outfit font-semibold text-white text-sm">
              Распределение по уровням
            </h2>
          </div>
          {stats && (
            <div className="space-y-3">
              {(["A0", "A1", "A2", "B1"] as const).map((level) => {
                const count = stats.levelDistribution[level] || 0;
                const pct = stats.totalUsers > 0 ? (count / stats.totalUsers) * 100 : 0;
                const colors: Record<string, string> = {
                  A0: "bg-rose-500",
                  A1: "bg-amber-500",
                  A2: "bg-emerald-500",
                  B1: "bg-indigo-500",
                };
                return (
                  <div key={level}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-white/70">{level}</span>
                      <span className="text-xs text-white/40">
                        {count} чел. ({Math.round(pct)}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-full rounded-full ${colors[level]}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* ── Top Users Leaderboard ──────────────────── */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.25 }}
          className="lg:col-span-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5"
        >
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={16} className="text-emerald-400" />
            <h2 className="font-outfit font-semibold text-white text-sm">
              ТОП-5 учеников
            </h2>
          </div>
          <div className="space-y-2">
            {topUsers.length === 0 && !loading && (
              <p className="text-sm text-white/30 text-center py-6">
                Пользователей пока нет
              </p>
            )}
            {topUsers.map((u, i) => (
              <div
                key={u.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                    i === 0
                      ? "bg-amber-500/20 text-amber-400"
                      : i === 1
                        ? "bg-gray-400/20 text-gray-300"
                        : i === 2
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-white/[0.04] text-white/30"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/10 flex items-center justify-center text-xs font-bold text-rose-300">
                  {u.user?.avatar || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {u.user?.name || "Unknown"}
                  </p>
                  <p className="text-[10px] text-white/30">
                    TG: {u.id} · {u.user?.level || "A0"} · Серия: {u.streak?.days || 0} дн.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">
                    {(u.points?.total || 0).toLocaleString("ru-RU")}
                  </p>
                  <p className="text-[10px] text-emerald-400">
                    ${(u.balance?.total || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Financial Summary ──────────────────────────── */}
      {stats && (
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.3 }}
          className="mt-6 rounded-2xl bg-gradient-to-r from-rose-500/[0.06] to-pink-500/[0.04] border border-rose-500/10 p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={16} className="text-rose-400" />
            <h2 className="font-outfit font-semibold text-white text-sm">
              Финансовый отчёт (ЗБТ)
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MiniStat label="Курс ЗБТ" value={`1 балл = $${ZBT_RATE}`} />
            <MiniStat label="Общий фонд" value={`$${stats.totalBalanceUSD.toFixed(2)}`} />
            <MiniStat label="Всего баллов" value={stats.totalPoints.toLocaleString("ru-RU")} />
            <MiniStat
              label="Потенциальная нагрузка"
              value={`$${((stats.totalPoints * ZBT_RATE)).toFixed(2)}`}
            />
          </div>
        </motion.div>
      )}

      {/* ── Footer ─────────────────────────────────────── */}
      <p className="text-[10px] text-white/20 mt-6 text-center">
        Последнее обновление: {lastRefresh || "—"}
      </p>
    </div>
  );
}

// ─── Stat Card Component ──────────────────────────────────────────
function StatCard({
  icon,
  label,
  value,
  sub,
  color,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  color: "rose" | "emerald" | "amber" | "indigo";
  delay?: number;
}) {
  const colors = {
    rose: "from-rose-500/10 to-rose-500/[0.03] border-rose-500/10 text-rose-400",
    emerald: "from-emerald-500/10 to-emerald-500/[0.03] border-emerald-500/10 text-emerald-400",
    amber: "from-amber-500/10 to-amber-500/[0.03] border-amber-500/10 text-amber-400",
    indigo: "from-indigo-500/10 to-indigo-500/[0.03] border-indigo-500/10 text-indigo-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-2xl bg-gradient-to-br ${colors[color]} border p-4`}
    >
      <div className={`mb-3 ${colors[color].split(" ").pop()}`}>{icon}</div>
      <p className="text-2xl font-outfit font-bold text-white">{value}</p>
      <p className="text-xs text-white/40 mt-0.5">{label}</p>
      {sub && <p className={`text-xs mt-1 ${colors[color].split(" ").pop()}`}>{sub}</p>}
    </motion.div>
  );
}

// ─── Mini Stat ────────────────────────────────────────────────────
function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-white/40">{label}</p>
      <p className="text-sm font-semibold text-white mt-0.5">{value}</p>
    </div>
  );
}
