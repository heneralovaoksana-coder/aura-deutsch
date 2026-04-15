"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, HeadphonesIcon, BookOpen } from "lucide-react";
import { haptic } from "@/lib/telegram";

const NAV_ITEMS = [
  { icon: Home,            label: "Главная",   href: "/dashboard" },
  { icon: BookOpen,        label: "Словарь",   href: "/dictionary" },
  { icon: User,            label: "Профиль",   href: "/profile"   },
  { icon: HeadphonesIcon,  label: "Поддержка", href: "/support"   },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router   = useRouter();

  // Hide on onboarding / lesson / placement
  const hidden =
    pathname === "/" ||
    pathname.startsWith("/lesson/") ||
    pathname.startsWith("/placement");

  if (hidden) return null;

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 25, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div
        className="glass rounded-3xl border border-bg-border px-2 py-2 flex items-center justify-around max-w-lg mx-auto"
        style={{
          background: "rgba(11, 14, 17, 0.92)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const active = isActive(href);
          return (
            <button
              key={href}
              onClick={() => {
                haptic.tap();
                router.push(href);
              }}
              className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200"
            >
              {/* Active pill background */}
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "rgba(255,0,122,0.15)",
                    border: "1px solid rgba(255,0,122,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={{
                  color: active ? "#FF007A" : "#6B7280",
                  scale: active ? 1.15 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative z-10"
              >
                <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              </motion.div>

              {/* Label */}
              <motion.span
                animate={{
                  color: active ? "#FF007A" : "#6B7280",
                  fontWeight: active ? 700 : 500,
                }}
                className="relative z-10 text-[10px] font-outfit leading-none"
              >
                {label}
              </motion.span>

              {/* Active dot */}
              {active && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -bottom-1 w-1 h-1 rounded-full bg-pink-neon"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
