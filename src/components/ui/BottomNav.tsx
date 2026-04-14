"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Trophy, BookOpen, LayoutDashboard } from "lucide-react";
import { haptic } from "@/lib/telegram";

const tabs = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Кабинет" },
  { href: "/lesson",    icon: BookOpen,        label: "Уроки"   },
  { href: "/leaderboard", icon: Trophy,        label: "Рейтинг" },
  { href: "/profile",  icon: User,             label: "Профиль" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 twa-safe max-w-lg mx-auto">
      <div className="glass border-t border-bg-border mx-4 mb-3 rounded-3xl px-2 py-2">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const active = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => haptic.tick()}
                className="flex-1"
              >
                <motion.div
                  className="flex flex-col items-center gap-1 py-2 px-3 rounded-2xl relative"
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-bg"
                      className="absolute inset-0 rounded-2xl bg-pink-neon/10 border border-pink-neon/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <tab.icon
                    size={20}
                    className={`relative z-10 transition-colors ${
                      active ? "text-pink-neon" : "text-text-secondary"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-outfit font-semibold relative z-10 transition-colors ${
                      active ? "text-pink-neon" : "text-text-muted"
                    }`}
                  >
                    {tab.label}
                  </span>

                  {/* Active pink dot */}
                  {active && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -bottom-1 w-1 h-1 rounded-full bg-pink-neon shadow-neon-pink-sm"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
