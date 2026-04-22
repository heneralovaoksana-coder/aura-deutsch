"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, User, HeadphonesIcon, BookOpen } from "lucide-react";
import { haptic } from "@/lib/telegram";

const NAV_ITEMS = [
  { icon: Home,           label: "Главная",   href: "/dashboard" },
  { icon: BookOpen,       label: "Словарь",   href: "/dictionary" },
  { icon: User,           label: "Профиль",   href: "/profile"   },
  { icon: HeadphonesIcon, label: "Поддержка", href: "/support"   },
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
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div
        className="rounded-[20px] px-2 py-2 flex items-center justify-around max-w-lg mx-auto"
        style={{
          background: "rgba(12, 15, 20, 0.82)",
          backdropFilter: "blur(28px) saturate(1.6)",
          WebkitBackdropFilter: "blur(28px) saturate(1.6)",
          boxShadow: "0 -4px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
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
                    background: "rgba(244, 63, 111, 0.1)",
                    border: "1px solid rgba(244, 63, 111, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={{
                  color: active ? "#F43F6F" : "#475569",
                  scale: active ? 1.12 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative z-10"
              >
                <Icon size={21} strokeWidth={active ? 2.4 : 1.8} />
              </motion.div>

              {/* Label */}
              <motion.span
                animate={{
                  color: active ? "#F43F6F" : "#475569",
                  fontWeight: active ? 700 : 500,
                }}
                className="relative z-10 text-[10px] font-outfit leading-none"
              >
                {label}
              </motion.span>

              {/* Active dot indicator */}
              {active && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -bottom-0.5 w-1 h-1 rounded-full"
                  style={{ background: "#F43F6F" }}
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
