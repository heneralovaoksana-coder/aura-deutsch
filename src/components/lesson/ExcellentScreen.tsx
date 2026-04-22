"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { haptic } from "@/lib/telegram";

interface ExcellentScreenProps {
  points: number;
  lessonTitle: string;
}

// Simple confetti particle
function Particle({ delay }: { delay: number }) {
  const colors = ["#F43F6F", "#10B981", "#6366F1", "#FBBF24", "#FF4DA6"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const x = Math.random() * 100;
  const size = Math.random() * 8 + 4;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: `${x}%`,
        top: "-10px",
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y: typeof window !== "undefined" ? window.innerHeight + 50 : 900,
        opacity: [1, 1, 0],
        rotate: Math.random() * 360,
        x: (Math.random() - 0.5) * 200,
      }}
      transition={{
        duration: 2 + Math.random() * 1.5,
        delay,
        ease: "easeIn",
      }}
    />
  );
}

export default function ExcellentScreen({
  points,
  lessonTitle,
}: ExcellentScreenProps) {
  const router = useRouter();
  const addPoints = useAppStore((s) => s.addPoints);
  const awarded = useRef(false);

  useEffect(() => {
    if (!awarded.current) {
      awarded.current = true;
      addPoints(points, "lesson");
      haptic.success();
      // Extra heavy haptic for achievement
      setTimeout(() => haptic.heavy(), 300);
    }
  }, [addPoints, points]);

  const particles = Array.from({ length: 40 }, (_, i) => i);

  return (
    <div className="fixed inset-0 bg-bg-deep flex flex-col items-center justify-center overflow-hidden">
      {/* Confetti particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((i) => (
          <Particle key={i} delay={i * 0.05} />
        ))}
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,0,122,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 space-y-6">
        {/* Trophy emoji */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
          className="text-8xl"
        >
          🏆
        </motion.div>

        {/* Excellent! */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-5xl font-outfit font-black text-white mb-1">
            Отлично!
          </h1>
          <p className="text-text-secondary text-base">
            Урок «{lessonTitle}» пройден
          </p>
        </motion.div>

        {/* Points earned */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 250,
            damping: 15,
          }}
          className="glass-rose rounded-3xl px-8 py-6 border border-rose-500/30"
        >
          <p className="text-text-secondary text-sm mb-1">Заработано</p>
          <motion.p
            className="text-6xl font-outfit font-black text-rose-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            +{points}
          </motion.p>
          <p className="text-rose-500 text-sm font-outfit font-semibold mt-1">
            баллов ЗБТ
          </p>
          <p className="text-text-muted text-xs mt-2">
            ≈ ${(points * 0.08).toFixed(2)} в вознаграждении
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { icon: "⚡", label: "Серия", value: "3 дня" },
            { icon: "✓", label: "Правильно", value: "100%" },
            { icon: "🚀", label: "Скорость", value: "Быстро" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl border border-bg-border px-4 py-3 text-center"
            >
              <div className="text-xl mb-1">{stat.icon}</div>
              <p className="text-white font-outfit font-bold text-sm">
                {stat.value}
              </p>
              <p className="text-text-muted text-[10px]">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="space-y-3 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <motion.button
            whileTap={{ scale: 0.96, y: 3 }}
            onClick={() => {
              haptic.tap();
              router.push("/lesson");
            }}
            className="w-full btn-rose py-4 rounded-2xl font-outfit font-bold text-lg"
          >
            Следующий урок →
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              haptic.tap();
              router.push("/dashboard");
            }}
            className="w-full glass border border-bg-border py-3 rounded-2xl font-outfit font-semibold text-text-secondary"
          >
            В кабинет
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
