"use client";

import { motion } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { UserState, PointsState } from "@/lib/store";

interface ProfileHeaderProps {
  user: UserState;
  points: PointsState;
}

export default function ProfileHeader({ user, points }: ProfileHeaderProps) {
  // Calculate progress % toward TOP rank
  const topThreshold = 2600; // approximate points for TOP-10
  const progressToTop = Math.min(
    100,
    Math.round(((topThreshold - points.pointsToTop) / topThreshold) * 100)
  );

  return (
    <div className="px-4 pt-4 pb-2 space-y-4">
      {/* ── User Row ─────────────────────────────────────────────── */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Left: avatar + name */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-neon to-purple-soft flex items-center justify-center text-xl font-outfit font-bold text-white shadow-neon-purple">
              {user.avatar}
            </div>
            {/* Online dot */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-money border-2 border-bg-deep shadow-neon-green-sm" />
          </div>

          {/* Name + tag */}
          <div>
            <p className="text-xs text-text-secondary font-inter uppercase tracking-widest mb-0.5">
              Личный кабинет
            </p>
            <h1 className="text-2xl font-outfit font-bold text-white leading-tight">
              {user.name}
            </h1>
          </div>
        </div>

        {/* Right: Beta badge */}
        <motion.div
          className="flex flex-col items-end gap-1.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        >
          {/* Status chip */}
          <div className="glass-pink px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
            <Zap size={10} className="text-pink-neon" />
            <span className="text-[10px] font-outfit font-semibold text-pink-neon">
              ЗБТ Тест
            </span>
          </div>

          {/* Active status */}
          <div className="glass px-2 py-1 rounded-full flex items-center gap-1 border border-green-money/30 whitespace-nowrap">
            <div className="w-1.5 h-1.5 rounded-full bg-green-money animate-pulse" />
            <span className="text-[10px] font-outfit font-semibold text-green-money">
              Активный
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Progress to TOP ──────────────────────────────────────── */}
      <motion.div
        className="glass rounded-2xl p-4 border border-bg-border"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between mb-3">
          {/* Left: label */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-pink-neon/20 flex items-center justify-center">
              <ChevronRight size={14} className="text-pink-neon" />
            </div>
            <span className="text-sm font-outfit font-semibold text-white">
              До уровня ТОП
            </span>
          </div>

          {/* Right: stats */}
          <div className="flex items-center gap-3 text-right">
            <motion.span
              className="text-sm font-outfit font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {points.pointsToTop.toLocaleString()} баллов
            </motion.span>
            <span className="text-xs text-text-secondary">
              #{user.rank} → ТОП-{user.rankTarget}
            </span>
          </div>
        </div>

        {/* Gradient progress bar (pink → purple) */}
        <div className="progress-track h-2">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #FF007A 0%, #8B5CF6 60%, #FF4DA6 100%)",
              boxShadow: "0 0 12px #FF007A88, 0 0 24px #8B5CF633",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressToTop}%` }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
