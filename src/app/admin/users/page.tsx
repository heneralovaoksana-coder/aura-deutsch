"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  ChevronUp,
  User,
  Award,
  Flame,
  X,
  Gift,
  RotateCcw,
} from "lucide-react";
import { fetchAllUsers, type FirebaseUser } from "@/lib/adminData";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ZBT_RATE } from "@/lib/store";

type SortKey = "name" | "points" | "level" | "streak" | "balance" | "lastActive";
type SortDir = "asc" | "desc";

const LEVEL_ORDER = { A0: 0, A1: 1, A2: 2, B1: 3 };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<FirebaseUser[]>([]);
  const [filtered, setFiltered] = useState<FirebaseUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("points");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selected, setSelected] = useState<FirebaseUser | null>(null);
  const [bonusAmount, setBonusAmount] = useState<number>(0);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAllUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ── Filter + Sort ──
  useEffect(() => {
    let list = [...users];

    // Search
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.id.includes(s) ||
          (u.user?.name || "").toLowerCase().includes(s)
      );
    }

    // Sort
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = (a.user?.name || "").localeCompare(b.user?.name || "", "ru");
          break;
        case "points":
          cmp = (a.points?.total || 0) - (b.points?.total || 0);
          break;
        case "level":
          cmp =
            (LEVEL_ORDER[a.user?.level as keyof typeof LEVEL_ORDER] || 0) -
            (LEVEL_ORDER[b.user?.level as keyof typeof LEVEL_ORDER] || 0);
          break;
        case "streak":
          cmp = (a.streak?.days || 0) - (b.streak?.days || 0);
          break;
        case "balance":
          cmp = (a.balance?.total || 0) - (b.balance?.total || 0);
          break;
        case "lastActive":
          cmp = (a.streak?.lastLoginDate || "").localeCompare(b.streak?.lastLoginDate || "");
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    setFiltered(list);
  }, [users, search, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k ? (
      sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />
    ) : (
      <ChevronDown size={12} className="opacity-20" />
    );

  // ── Admin actions ──
  const handleAddBonus = async (userId: string) => {
    if (bonusAmount <= 0) return;
    const userDoc = doc(db, "users", userId);
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const newTotal = (user.points?.total || 0) + bonusAmount;
    const newReward = parseFloat((newTotal * ZBT_RATE).toFixed(2));

    await updateDoc(userDoc, {
      "points.total": newTotal,
      "balance.total": newReward,
      "balance.available": parseFloat((newReward * 0.625).toFixed(2)),
      "balance.pending": parseFloat((newReward * 0.375).toFixed(2)),
    });

    setBonusAmount(0);
    setSelected(null);
    loadData();
  };

  const handleResetProgress = async (userId: string) => {
    if (!confirm("Точно сбросить весь прогресс этого пользователя?")) return;
    const userDoc = doc(db, "users", userId);

    await updateDoc(userDoc, {
      "progress.A0": 0,
      "progress.A1": 0,
      "progress.A2": 0,
      "progress.B1": 0,
      "points.total": 0,
      "points.todayGain": 0,
      "points.pointsToTop": 2600,
      "balance.available": 0,
      "balance.pending": 0,
      "balance.total": 0,
      "streak.days": 0,
      "user.level": "A0",
      "user.status": "Новичок",
      "user.rank": 0,
    });

    setSelected(null);
    loadData();
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px]">
      {/* ── Header ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-outfit font-bold text-white">
            Пользователи
          </h1>
          <p className="text-sm text-white/40 mt-1">
            {users.length} учеников в базе данных
          </p>
        </div>
      </motion.div>

      {/* ── Search ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative mb-5"
      >
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по имени или Telegram ID..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500/30 transition-colors"
        />
      </motion.div>

      {/* ── Table ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
      >
        {/* Header row */}
        <div className="grid grid-cols-[2fr_0.7fr_0.8fr_0.8fr_1fr_1fr] gap-2 px-4 py-3 border-b border-white/[0.06] text-[11px] uppercase tracking-wider text-white/30">
          <button onClick={() => toggleSort("name")} className="flex items-center gap-1 hover:text-white/60 transition-colors text-left">
            Ученик <SortIcon k="name" />
          </button>
          <button onClick={() => toggleSort("level")} className="flex items-center gap-1 hover:text-white/60 transition-colors">
            Уровень <SortIcon k="level" />
          </button>
          <button onClick={() => toggleSort("points")} className="flex items-center gap-1 hover:text-white/60 transition-colors">
            Баллы <SortIcon k="points" />
          </button>
          <button onClick={() => toggleSort("streak")} className="flex items-center gap-1 hover:text-white/60 transition-colors">
            Серия <SortIcon k="streak" />
          </button>
          <button onClick={() => toggleSort("balance")} className="flex items-center gap-1 hover:text-white/60 transition-colors">
            Баланс <SortIcon k="balance" />
          </button>
          <button onClick={() => toggleSort("lastActive")} className="flex items-center gap-1 hover:text-white/60 transition-colors">
            Последний визит <SortIcon k="lastActive" />
          </button>
        </div>

        {/* Rows */}
        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="py-12 text-center text-white/30 text-sm">
              Загрузка пользователей...
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="py-12 text-center text-white/30 text-sm">
              {search ? "Ничего не найдено" : "База пока пуста. Ждём первых учеников!"}
            </div>
          )}
          {filtered.map((u) => (
            <div
              key={u.id}
              onClick={() => setSelected(u)}
              className="grid grid-cols-[2fr_0.7fr_0.8fr_0.8fr_1fr_1fr] gap-2 px-4 py-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer"
            >
              {/* User */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/10 flex items-center justify-center text-xs font-bold text-rose-300 shrink-0">
                  {u.user?.avatar || "?"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {u.user?.name || "—"}
                  </p>
                  <p className="text-[10px] text-white/25 truncate">
                    ID: {u.id}
                  </p>
                </div>
              </div>

              {/* Level */}
              <div className="flex items-center">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                  u.user?.level === "B1" ? "bg-indigo-500/15 text-indigo-400" :
                  u.user?.level === "A2" ? "bg-emerald-500/15 text-emerald-400" :
                  u.user?.level === "A1" ? "bg-amber-500/15 text-amber-400" :
                  "bg-rose-500/15 text-rose-400"
                }`}>
                  {u.user?.level || "A0"}
                </span>
              </div>

              {/* Points */}
              <div className="flex items-center text-sm text-white/70">
                {(u.points?.total || 0).toLocaleString("ru-RU")}
              </div>

              {/* Streak */}
              <div className="flex items-center gap-1 text-sm">
                <Flame size={12} className="text-orange-400" />
                <span className="text-white/70">{u.streak?.days || 0} дн.</span>
              </div>

              {/* Balance */}
              <div className="flex items-center text-sm text-emerald-400 font-medium">
                ${(u.balance?.total || 0).toFixed(2)}
              </div>

              {/* Last active */}
              <div className="flex items-center text-xs text-white/30">
                {u.streak?.lastLoginDate || "—"}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── User Detail Modal ─────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-[#0c0f14] border border-white/[0.08] p-6 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/10 flex items-center justify-center text-lg font-bold text-rose-300">
                    {selected.user?.avatar || "?"}
                  </div>
                  <div>
                    <h3 className="font-outfit font-bold text-white">
                      {selected.user?.name}
                    </h3>
                    <p className="text-xs text-white/30">
                      TG ID: {selected.id} · {selected.user?.status}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-white/30 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="rounded-xl bg-white/[0.03] p-3 text-center">
                  <Award size={14} className="mx-auto mb-1 text-amber-400" />
                  <p className="text-xs text-white/40">Уровень</p>
                  <p className="text-sm font-bold text-white">{selected.user?.level}</p>
                </div>
                <div className="rounded-xl bg-white/[0.03] p-3 text-center">
                  <Flame size={14} className="mx-auto mb-1 text-orange-400" />
                  <p className="text-xs text-white/40">Серия</p>
                  <p className="text-sm font-bold text-white">{selected.streak?.days} дн.</p>
                </div>
                <div className="rounded-xl bg-white/[0.03] p-3 text-center">
                  <User size={14} className="mx-auto mb-1 text-rose-400" />
                  <p className="text-xs text-white/40">Ранг</p>
                  <p className="text-sm font-bold text-white">#{selected.user?.rank || "—"}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="rounded-xl bg-white/[0.03] p-3 mb-5">
                <p className="text-xs text-white/40 mb-2">Прогресс уроков</p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {(["A0", "A1", "A2", "B1"] as const).map((lvl) => (
                    <div key={lvl}>
                      <p className="text-[10px] text-white/30">{lvl}</p>
                      <p className="text-sm font-semibold text-white">
                        {selected.progress?.[lvl] || 0}/40
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial */}
              <div className="rounded-xl bg-white/[0.03] p-3 mb-5">
                <p className="text-xs text-white/40 mb-2">Финансы</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[10px] text-white/30">Баллы</p>
                    <p className="text-sm font-semibold text-white">
                      {(selected.points?.total || 0).toLocaleString("ru-RU")}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30">Доступно</p>
                    <p className="text-sm font-semibold text-emerald-400">
                      ${(selected.balance?.available || 0).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30">Всего</p>
                    <p className="text-sm font-semibold text-white">
                      ${(selected.balance?.total || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Admin Actions */}
              <div className="space-y-3">
                {/* Give bonus */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={bonusAmount || ""}
                    onChange={(e) => setBonusAmount(parseInt(e.target.value) || 0)}
                    placeholder="Бонусные баллы..."
                    className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/30"
                  />
                  <button
                    onClick={() => handleAddBonus(selected.id)}
                    disabled={bonusAmount <= 0}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors disabled:opacity-30"
                  >
                    <Gift size={14} />
                    Выдать
                  </button>
                </div>

                {/* Reset */}
                <button
                  onClick={() => handleResetProgress(selected.id)}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/5 border border-red-500/10 text-red-400/70 text-sm hover:bg-red-500/10 hover:text-red-400 transition-colors"
                >
                  <RotateCcw size={14} />
                  Сбросить весь прогресс
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
