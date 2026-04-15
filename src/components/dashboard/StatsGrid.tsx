"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Trophy, Wallet, TrendingUp, ArrowUpRight,
  Star, Clock, CheckCircle2, Banknote
} from "lucide-react";
import { PointsState, BalanceState, calcReward, ZBT_RATE } from "@/lib/store";
import NeonButton from "@/components/ui/NeonButton";
import { haptic } from "@/lib/telegram";

interface StatsGridProps {
  points: PointsState;
  balance: BalanceState;
  rank: number;
  onWithdraw: () => void;
}

// Animated number counter
function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  className = "",
  delay = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      key={value}
      className={`number-pop inline-block ${className}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 20 }}
    >
      {prefix}{typeof value === "number" ? value.toLocaleString("ru-RU") : value}{suffix}
    </motion.span>
  );
}

export default function StatsGrid({ points, balance, rank, onWithdraw }: StatsGridProps) {
  const reward = calcReward(points.total);

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as any },
    }),
  };

  return (
    <div className="px-4 py-3 space-y-3">
      {/* ── Row of 3 cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-3">

        {/* ── Card 1: Баллы ───────────────────────────────────── */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="glass rounded-3xl border border-bg-border p-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-neon/20 flex items-center justify-center">
                <Activity size={16} className="text-purple-soft" />
              </div>
              <div>
                <p className="text-[10px] text-text-secondary uppercase tracking-widest font-inter">
                  Активность · ЗБТ
                </p>
                <p className="text-base font-outfit font-bold text-white">Баллы</p>
              </div>
            </div>
          </div>

          {/* Big number */}
          <AnimatePresence mode="wait">
            <div className="mb-4">
              <AnimatedNumber
                value={points.total}
                className="text-5xl font-outfit font-black text-white"
                delay={0.1}
              />
              <p className="text-text-secondary text-sm mt-0.5">накоплено баллов</p>
            </div>
          </AnimatePresence>

          {/* Today + Rank row */}
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={14} className="text-green-money" />
              <div>
                <p className="text-green-money font-outfit font-bold text-sm">
                  +{points.todayGain}
                </p>
                <p className="text-text-muted text-[10px] uppercase tracking-wider">Сегодня</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowUpRight size={14} className="text-gold-bright" />
              <div>
                <p className="text-gold-bright font-outfit font-bold text-sm">#{rank}</p>
                <p className="text-text-muted text-[10px] uppercase tracking-wider">В рейтинге</p>
              </div>
            </div>
          </div>

          {/* Rate chip */}
          <div className="mt-4 glass-pink rounded-xl px-3 py-2 flex items-center gap-2">
            <Star size={12} className="text-pink-neon" />
            <span className="text-xs font-outfit text-pink-neon font-semibold">
              1 балл = ${ZBT_RATE}
            </span>
          </div>

          <p className="text-text-muted text-xs mt-3 leading-relaxed">
            Баллы начисляются за активность на платформе и влияют на итоговое вознаграждение.
          </p>
        </motion.div>

        {/* ── Card 2: Вознаграждение ───────────────────────────── */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="glass rounded-3xl border border-bg-border p-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gold-soft/20 flex items-center justify-center">
                <Trophy size={16} className="text-gold-bright" />
              </div>
              <div>
                <p className="text-[10px] text-text-secondary uppercase tracking-widest font-inter">
                  Расчёт · ЗБТ
                </p>
                <p className="text-base font-outfit font-bold text-white">Вознаграждение</p>
              </div>
            </div>
          </div>

          {/* Status badges */}
          <div className="flex gap-2 mb-4">
            <div className="glass-pink px-2.5 py-1 rounded-full flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-pink-neon" />
              <span className="text-[11px] font-outfit font-semibold text-pink-neon">Активный</span>
            </div>
            <div className="glass border border-bg-border px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="text-[11px] text-text-secondary">👤 #{rank}</span>
            </div>
          </div>

          {/* Formula display */}
          <div className="bg-bg-deep rounded-2xl p-4 mb-4">
            <p className="text-[10px] text-text-muted uppercase tracking-widest mb-2">Формула ЗБТ</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white font-outfit font-bold text-lg">
                {points.total.toLocaleString("ru-RU")}
              </span>
              <span className="text-text-secondary">×</span>
              <span className="text-pink-neon font-outfit font-bold text-lg">${ZBT_RATE}</span>
              <span className="text-text-secondary">=</span>
              <AnimatedNumber
                value={reward}
                prefix="$"
                className="text-pink-neon font-outfit font-black text-xl"
                delay={0.4}
              />
            </div>
          </div>

          {/* Expected reward */}
          <div className="border border-gold-soft/30 bg-gold-soft/5 rounded-2xl p-4">
            <p className="text-[10px] text-gold-bright uppercase tracking-widest mb-2">
              ⚡ Ожидаемое вознаграждение
            </p>
            <AnimatedNumber
              value={reward}
              prefix="$"
              className="text-gold-bright font-outfit font-black text-4xl"
              delay={0.5}
            />
          </div>

          <p className="text-text-muted text-xs mt-3 leading-relaxed">
            В режиме бета-тестирования вознаграждение рассчитывается напрямую на основе вашей активности:{" "}
            <span className="text-white font-semibold">1 балл = ${ZBT_RATE}</span>
          </p>
        </motion.div>

        {/* ── Card 3: Баланс ──────────────────────────────────── */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="glass rounded-3xl border border-bg-border p-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-green-money/20 flex items-center justify-center">
                <Wallet size={16} className="text-green-money" />
              </div>
              <div>
                <p className="text-[10px] text-text-secondary uppercase tracking-widest font-inter">
                  Финансы · ЗБТ
                </p>
                <p className="text-base font-outfit font-bold text-white">Баланс</p>
              </div>
            </div>
          </div>

          {/* Available */}
          <div className="mb-4">
            <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">
              Доступно для вывода
            </p>
            <AnimatedNumber
              value={balance.available}
              prefix="$"
              className="text-green-money font-outfit font-black text-5xl text-neon-green"
              delay={0.3}
            />
          </div>

          {/* Pending + Total row */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-bg-deep rounded-2xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock size={12} className="text-gold-soft" />
                <span className="text-gold-soft font-outfit font-bold text-sm">
                  ${balance.pending.toFixed(2)}
                </span>
              </div>
              <p className="text-text-muted text-[10px] uppercase tracking-wider">В ожидании</p>
            </div>
            <div className="bg-bg-deep rounded-2xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <ArrowUpRight size={12} className="text-text-secondary" />
                <span className="text-white font-outfit font-bold text-sm">
                  ${balance.total.toFixed(2)}
                </span>
              </div>
              <p className="text-text-muted text-[10px] uppercase tracking-wider">Итого</p>
            </div>
          </div>

          {/* Flow steps */}
          <div className="space-y-2 mb-5">
            {[
              { icon: <Activity size={12} />, text: "Активность → Баллы", color: "text-purple-soft" },
              { icon: <Trophy size={12} />, text: `Баллы × $${ZBT_RATE} = Вознаграждение`, color: "text-gold-bright" },
              { icon: <Banknote size={12} />, text: "Зачисление на баланс", color: "text-green-money" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 py-1"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <span className={item.color}>{item.icon}</span>
                <span className="text-text-secondary text-xs font-inter">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Withdraw CTA */}
          <NeonButton
            id="withdraw-btn"
            variant="green"
            size="lg"
            fullWidth
            icon={<CheckCircle2 size={18} />}
            onClick={() => {
              haptic.success();
              onWithdraw();
            }}
          >
            Вывести средства
          </NeonButton>
        </motion.div>
      </div>
    </div>
  );
}
