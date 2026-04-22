"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { haptic } from "@/lib/telegram";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "rose" | "emerald" | "amber" | "indigo" | "none";
  onClick?: () => void;
  animate?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  glowColor = "none",
  onClick,
  animate = true,
  delay = 0,
}: GlassCardProps) {
  const glowStyles = {
    rose:    "border-rose-500/15 hover:border-rose-500/25 hover:shadow-rose-soft",
    emerald: "border-emerald-500/15 hover:border-emerald-500/25 hover:shadow-emerald-soft",
    amber:   "border-amber-500/15 hover:border-amber-500/25 hover:shadow-amber-soft",
    indigo:  "border-indigo-500/15 hover:border-indigo-500/25 hover:shadow-indigo-soft",
    none:    "border-bg-border hover:border-bg-hover",
  };

  const handleClick = () => {
    if (onClick) {
      haptic.tap();
      onClick();
    }
  };

  const card = (
    <div
      className={`
        glass rounded-3xl border transition-all duration-300
        ${glowStyles[glowColor]}
        ${onClick ? "cursor-pointer active:scale-[0.98]" : ""}
        ${className}
      `}
      onClick={handleClick}
    >
      {children}
    </div>
  );

  if (!animate) return card;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {card}
    </motion.div>
  );
}
