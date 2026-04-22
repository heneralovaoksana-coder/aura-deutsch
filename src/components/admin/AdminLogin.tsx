"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Lock } from "lucide-react";

// ─── Admin Password ───────────────────────────────────────────────
// Change this to your own secret password!
const ADMIN_PASSWORD = "aura2026";

const STORAGE_KEY = "aura-admin-auth";

export function useAdminAuth() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved === "true") setIsAuthed(true);
    setIsChecking(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setIsAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAuthed(false);
  };

  return { isAuthed, isChecking, login, logout };
}

// ─── Login Screen Component ──────────────────────────────────────
export default function AdminLoginScreen({
  onLogin,
}: {
  onLogin: (password: string) => boolean;
}) {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#060810] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/20">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="text-xl font-outfit font-bold text-white">
            Aura Deutsch
          </h1>
          <p className="text-sm text-white/40 mt-1">Панель администратора</p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lock size={14} className="text-white/30" />
            <p className="text-sm text-white/50">Введите пароль для входа</p>
          </div>

          <div className="relative mb-4">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль..."
              autoFocus
              className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors ${
                error
                  ? "border-red-500/40 focus:border-red-500/60"
                  : "border-white/[0.06] focus:border-rose-500/30"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 mb-3"
            >
              Неверный пароль. Попробуйте ещё раз.
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-rose-500/20 transition-all active:scale-[0.98]"
          >
            Войти
          </button>
        </motion.form>

        <p className="text-[10px] text-white/15 text-center mt-6">
          Доступ ограничен. Только для администраторов.
        </p>
      </motion.div>
    </div>
  );
}
