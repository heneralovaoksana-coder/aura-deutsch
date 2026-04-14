"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { initTWA, haptic } from "@/lib/telegram";
import ProfileHeader from "@/components/dashboard/ProfileHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";

export default function DashboardPage() {
  const { user, points, balance } = useAppStore();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const checkAndUpdateStreak = useAppStore((s) => s.checkAndUpdateStreak);

  useEffect(() => {
    initTWA();
    checkAndUpdateStreak();
  }, [checkAndUpdateStreak]);

  const handleWithdraw = () => {
    haptic.success();
    setShowWithdrawModal(true);
  };

  return (
    <main className="min-h-screen bg-bg-deep pb-8">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #FF007A 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-1/2 -left-32 w-80 h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #00FF94 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg mx-auto">
        <ProfileHeader user={user} points={points} />
        <StatsGrid
          points={points}
          balance={balance}
          rank={user.rank}
          onWithdraw={handleWithdraw}
        />
      </div>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWithdrawModal(false)}
            />

            {/* Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="glass rounded-t-3xl border-t border-x border-bg-border p-6">
                {/* Handle */}
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />

                <h2 className="text-2xl font-outfit font-bold text-white mb-2">
                  Вывести средства
                </h2>
                <p className="text-text-secondary text-sm mb-6">
                  Доступно к выводу:{" "}
                  <span className="text-green-money font-semibold">
                    ${balance.available.toFixed(2)}
                  </span>
                </p>

                {/* Info box */}
                <div className="bg-bg-deep rounded-2xl p-4 mb-6 border border-bg-border">
                  <p className="text-text-secondary text-xs leading-relaxed">
                    🕐 Выплаты производятся в конце ЗБТ-периода. Средства зачислятся
                    на ваш криптокошелёк после верификации активности.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    className="flex-1 glass border border-bg-border text-text-secondary py-4 rounded-2xl font-outfit font-semibold"
                    onClick={() => setShowWithdrawModal(false)}
                  >
                    Отмена
                  </button>
                  <button
                    className="flex-1 btn-neon-green py-4 rounded-2xl font-outfit font-bold text-bg-deep"
                    onClick={() => {
                      haptic.success();
                      setShowWithdrawModal(false);
                    }}
                  >
                    Подтвердить
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
