"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Целевая дата: 19 Апреля 2026 года, 19:00 по Немецкому летнему времени (CEST = UTC+2)
// 19:00 CEST — это 17:00 UTC
const TARGET_DATE = new Date("2026-04-19T17:00:00Z").getTime();

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#CA00DF]">
      {/* 1. Изображение */}
      <img
        src="/bird.png"
        alt="Aura Deutsch Mascot"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* 2. Aura Deutsch Сверху */}
      <div className="absolute top-0 left-0 right-0 pt-20 z-10 flex justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-outfit font-black tracking-tight"
        >
          {/* Белый с мягким свечением */}
          <span 
            className="text-white"
            style={{ textShadow: "0 0 15px rgba(255,255,255,0.4)" }}
          >
            Aura
          </span>
          {" "}
          {/* Красный с красным неоном */}
          <span 
            className="text-[#FF003C]"
            style={{ textShadow: "0 0 25px rgba(255,0,60,0.5)" }}
          >
            Deutsch
          </span>
        </motion.h1>
      </div>

      {/* 3. Отсчет опущен ниже (bottom-[20%]) */}
      <div className="absolute bottom-[20%] left-0 right-0 z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center w-full px-4"
        >
          {/* Красивый жирный шрифт Открытие ЗБТ */}
          <h2 className="text-white text-xl md:text-2xl font-outfit uppercase tracking-[0.25em] mb-5 font-black flex items-center justify-center gap-3" style={{ textShadow: "0 4px 10px rgba(0,0,0,0.5)" }}>
            <span className="w-8 h-px bg-white/40 hidden sm:block" />
            Открытие ЗБТ
            <span className="w-8 h-px bg-white/40 hidden sm:block" />
          </h2>
          
          {/* Контейнер часов "всё в одном" (без подписей) */}
          <div className="flex justify-center">
            <div className="flex items-baseline bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              {/* Дни */}
              <div className="min-w-[60px] text-center">
                <span className="text-4xl md:text-5xl font-outfit font-black text-white drop-shadow-md">
                  {timeLeft.days.toString().padStart(2, "0")}
                </span>
              </div>
              
              <span className="text-2xl md:text-3xl text-white/40 font-bold mx-1 md:mx-2 relative -top-1">:</span>
              
              {/* Часы */}
              <div className="min-w-[60px] text-center">
                <span className="text-4xl md:text-5xl font-outfit font-black text-white drop-shadow-md">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </span>
              </div>

              <span className="text-2xl md:text-3xl text-white/40 font-bold mx-1 md:mx-2 relative -top-1">:</span>
              
              {/* Минуты */}
              <div className="min-w-[60px] text-center">
                <span className="text-4xl md:text-5xl font-outfit font-black text-white drop-shadow-md">
                  {timeLeft.minutes.toString().padStart(2, "0")}
             </span>
              </div>

              <span className="text-2xl md:text-3xl text-white/40 font-bold mx-1 md:mx-2 relative -top-1">:</span>
              
              {/* Секунды с красивой плавной анимацией замены цифр */}
              <div className="min-w-[60px] text-center overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={timeLeft.seconds}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="inline-block text-4xl md:text-5xl font-outfit font-black text-[#FF003C]"
                    style={{ textShadow: "0 0 15px rgba(255,0,60,0.5)" }}
                  >
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
