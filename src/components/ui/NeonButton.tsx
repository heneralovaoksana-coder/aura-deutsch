"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { haptic } from "@/lib/telegram";

interface NeonButtonProps {
  children: ReactNode;
  variant?: "pink" | "green" | "ghost" | "outline-pink";
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  id?: string;
}

export default function NeonButton({
  children,
  variant = "pink",
  size = "md",
  onClick,
  className = "",
  disabled = false,
  fullWidth = false,
  icon,
  id,
}: NeonButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-base rounded-2xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
    xl: "px-10 py-5 text-xl rounded-3xl",
  };

  const variants = {
    pink:         "btn-rose",
    green:        "btn-emerald",
    ghost:        "btn-ghost",
    "outline-pink": "btn-outline-rose",
  };

  const handleClick = () => {
    if (disabled) return;
    haptic.tap();
    onClick?.();
  };

  return (
    <motion.button
      id={id}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`
        font-outfit font-semibold tracking-wide
        flex items-center justify-center gap-2
        ${sizes[size]}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
