"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number; // 0–100
  color?: "pink" | "green" | "purple";
  height?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  color = "pink",
  height = "md",
  showLabel = false,
  animated = true,
  className = "",
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const heights = { sm: "h-1", md: "h-2", lg: "h-3" };

  const fillClass = {
    pink: "progress-fill-pink",
    green: "progress-fill-green",
    purple: "bg-gradient-to-r from-purple-neon to-purple-soft shadow-neon-purple",
  }[color];

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>Прогресс</span>
          <span>{clampedValue}%</span>
        </div>
      )}
      <div className={`progress-track ${heights[height]}`}>
        <motion.div
          className={fillClass}
          initial={animated ? { width: 0 } : { width: `${clampedValue}%` }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </div>
    </div>
  );
}
