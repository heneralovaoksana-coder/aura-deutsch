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
        bg: {
          deep: "#0B0E11",
          card: "#111519",
          elevated: "#16191F",
          border: "#1E2328",
        },
        pink: {
          neon: "#FF007A",
          soft: "#FF4DA6",
          dim: "#FF007A33",
          glow: "#FF007A1A",
        },
        green: {
          money: "#00FF94",
          soft: "#00FF9499",
          dim: "#00FF9433",
          glow: "#00FF941A",
        },
        gold: {
          bright: "#FFD700",
          soft: "#FFA500",
        },
        purple: {
          neon: "#8B5CF6",
          soft: "#A78BFA",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#8B9099",
          muted: "#4A5058",
        },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "neon-pink": "0 0 20px #FF007A66, 0 0 40px #FF007A33",
        "neon-pink-sm": "0 0 10px #FF007A55, 0 0 20px #FF007A22",
        "neon-green": "0 0 20px #00FF9466, 0 0 40px #00FF9433",
        "neon-green-sm": "0 0 10px #00FF9455, 0 0 20px #00FF9422",
        "neon-purple": "0 0 20px #8B5CF666, 0 0 40px #8B5CF633",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card-hover": "0 16px 48px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "pink-glow": "radial-gradient(ellipse at center, #FF007A22 0%, transparent 70%)",
        "green-glow": "radial-gradient(ellipse at center, #00FF9422 0%, transparent 70%)",
        "card-gradient": "linear-gradient(135deg, #16191F 0%, #111519 100%)",
        "pink-gradient": "linear-gradient(135deg, #FF007A 0%, #CC0060 100%)",
        "green-gradient": "linear-gradient(135deg, #00FF94 0%, #00CC75 100%)",
        "gold-gradient": "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
        "purple-gradient": "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
      },
      animation: {
        "pulse-pink": "pulse-pink 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "counter": "counter 0.6s ease-out",
      },
      keyframes: {
        "pulse-pink": {
          "0%, 100%": { boxShadow: "0 0 10px #FF007A55" },
          "50%": { boxShadow: "0 0 30px #FF007A99, 0 0 60px #FF007A44" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
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
