import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ─── Background System ─────────────────────────── */
        bg: {
          deep: "#0C0F14",
          card: "#141820",
          elevated: "#1A1F2B",
          border: "#242A38",
          hover: "#2A3144",
        },
        /* ─── Brand Pink (Premium Rose) ─────────────────── */
        rose: {
          50:  "#FFF1F3",
          100: "#FFE0E6",
          200: "#FFC6D1",
          300: "#FFA1B3",
          400: "#FF7090",
          500: "#F43F6F",  // Primary brand
          600: "#E11D56",
          700: "#BE1248",
          800: "#9F1243",
          900: "#87133F",
          glow: "rgba(244, 63, 111, 0.15)",
          dim:  "rgba(244, 63, 111, 0.08)",
        },
        /* ─── Accent: Emerald (Success / Money) ─────────── */
        emerald: {
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          glow: "rgba(16, 185, 129, 0.15)",
        },
        /* ─── Accent: Amber (Gold / Rewards) ────────────── */
        amber: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          glow: "rgba(245, 158, 11, 0.15)",
        },
        /* ─── Accent: Indigo (Secondary) ────────────────── */
        indigo: {
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          glow: "rgba(99, 102, 241, 0.15)",
        },
        /* ─── Text System ───────────────────────────────── */
        text: {
          primary:   "#F8FAFC",
          secondary: "#94A3B8",
          muted:     "#475569",
          inverse:   "#0F172A",
        },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        inter:  ["Inter", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        /* Glass card shadows */
        "glass":       "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glass-hover": "0 16px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        "glass-lg":    "0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        /* Colored soft shadows */
        "rose-soft":    "0 4px 24px rgba(244, 63, 111, 0.2)",
        "rose-glow":    "0 0 40px rgba(244, 63, 111, 0.15)",
        "emerald-soft": "0 4px 24px rgba(16, 185, 129, 0.2)",
        "amber-soft":   "0 4px 24px rgba(245, 158, 11, 0.2)",
        "indigo-soft":  "0 4px 24px rgba(99, 102, 241, 0.2)",
        /* Floating nav shadow */
        "nav": "0 -8px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)",
      },
      backgroundImage: {
        "rose-gradient":    "linear-gradient(135deg, #F43F6F 0%, #E11D56 100%)",
        "rose-gradient-h":  "linear-gradient(90deg, #F43F6F 0%, #E11D56 100%)",
        "emerald-gradient": "linear-gradient(135deg, #34D399 0%, #10B981 100%)",
        "amber-gradient":   "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
        "indigo-gradient":  "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
        "card-gradient":    "linear-gradient(135deg, rgba(26,31,43,0.9) 0%, rgba(20,24,32,0.95) 100%)",
        "glass-gradient":   "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        "mesh-1": "radial-gradient(at 20% 0%, rgba(244,63,111,0.12) 0%, transparent 50%), radial-gradient(at 80% 100%, rgba(99,102,241,0.1) 0%, transparent 50%)",
        "mesh-2": "radial-gradient(at 80% 0%, rgba(16,185,129,0.1) 0%, transparent 50%), radial-gradient(at 20% 100%, rgba(244,63,111,0.08) 0%, transparent 50%)",
      },
      animation: {
        "float":        "float 4s ease-in-out infinite",
        "float-slow":   "float 6s ease-in-out infinite",
        "pulse-soft":   "pulse-soft 3s ease-in-out infinite",
        "shimmer":      "shimmer 2s linear infinite",
        "slide-up":     "slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        "fade-in":      "fade-in 0.4s ease-out",
        "scale-in":     "scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "glow-pulse":   "glow-pulse 2.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(244,63,111,0.15)" },
          "50%":      { boxShadow: "0 0 40px rgba(244,63,111,0.3)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
