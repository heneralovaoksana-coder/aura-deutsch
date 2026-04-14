"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { haptic } from "@/lib/telegram";

interface LessonProgressBarProps {
  current: number;
  total: number;
  onClose: () => void;
}

export default function LessonProgressBar({
  current,
  total,
  onClose,
}: LessonProgressBarProps) {
  const router = useRouter();
  const progress = (current / total) * 100;

  return (
    <div className="flex items-center gap-3 px-4 py-4">
      {/* Close button */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => {
          haptic.tap();
          onClose();
        }}
        className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0"
      >
        <X size={16} className="text-text-secondary" />
      </motion.button>

      {/* Progress track */}
      <div className="flex-1 progress-track h-3">
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #FF007A, #FF4DA6, #8B5CF6)",
            boxShadow: "0 0 12px #FF007A66",
          }}
          initial={{ width: `${((current - 1) / total) * 100}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Shimmer inside bar */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Step counter */}
      <div className="flex-shrink-0 text-right">
        <span className="text-xs font-outfit font-semibold text-text-secondary">
          <span className="text-white">{current}</span>/{total}
        </span>
      </div>
    </div>
  );
}
