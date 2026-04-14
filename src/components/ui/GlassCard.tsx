"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { haptic } from "@/lib/telegram";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "pink" | "green" | "purple" | "none";
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
    pink: "border-pink-neon/20 shadow-neon-pink-sm hover:shadow-neon-pink hover:border-pink-neon/40",
    green: "border-green-money/20 shadow-neon-green-sm hover:shadow-neon-green hover:border-green-money/40",
    purple: "border-purple-neon/20 shadow-neon-purple hover:border-purple-neon/40",
    none: "border-bg-border hover:border-white/10",
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
