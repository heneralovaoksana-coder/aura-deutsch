"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Wallet,
  BookOpen,
  Megaphone,
  Shield,
  ChevronLeft,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Дашборд", href: "/admin", icon: LayoutDashboard },
  { label: "Пользователи", href: "/admin/users", icon: Users },
  { label: "Выплаты", href: "/admin/withdrawals", icon: Wallet, badge: "Скоро" },
  { label: "Контент", href: "/admin/content", icon: BookOpen, badge: "Скоро" },
  { label: "Рассылки", href: "/admin/broadcasts", icon: Megaphone, badge: "Скоро" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0a0c10]/95 backdrop-blur-2xl border-r border-white/[0.06] flex flex-col z-50">
      {/* ── Logo ─────────────────────────────────────── */}
      <div className="p-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-outfit font-bold text-white text-sm tracking-wide">
              Aura Deutsch
            </h1>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────── */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 group relative
                ${
                  isActive
                    ? "bg-rose-500/10 text-rose-400 shadow-sm shadow-rose-500/5"
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                }
                ${item.badge ? "opacity-50 pointer-events-none" : ""}
              `}
            >
              <Icon
                size={18}
                className={`transition-colors ${isActive ? "text-rose-400" : "text-white/30 group-hover:text-white/60"}`}
              />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto text-[9px] uppercase tracking-wider bg-white/[0.06] text-white/30 px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-rose-500 rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Footer ───────────────────────────────────── */}
      <div className="p-4 border-t border-white/[0.06]">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          <ChevronLeft size={14} />
          Вернуться в приложение
        </Link>
      </div>
    </aside>
  );
}
