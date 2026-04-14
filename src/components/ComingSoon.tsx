"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-04-19T00:00:00T").getTime();

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
      {/* 1. Изображение птицы (фон) */}
      <img
        src="/bird.png"
        alt="Aura Deutsch Mascot"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Затемняющий градиент сверху и снизу для читаемости текста */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#CA00DF]/60 via-transparent to-[#CA00DF]/90 pointer-events-none" />

      {/* 2. Текст сверху (Aura Deutsch) */}
      <div className="absolute top-0 left-0 right-0 pt-16 z-10 flex justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-outfit font-black text-white tracking-tight drop-shadow-xl"
          style={{ textShadow: "0px 4px 20px rgba(0,0,0,0.5)" }}
        >
          Aura Deutsch
        </motion.h1>
      </div>

      {/* 3. Отсчёт времени снизу */}
      <div className="absolute bottom-0 left-0 right-0 pb-16 z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-white/90 text-sm font-outfit uppercase tracking-[0.3em] mb-4 font-bold drop-shadow-md">
            Открытие ЗБТ
          </p>
          
          <div className="flex items-center gap-3 md:gap-4 justify-center">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-3xl md:text-4xl font-outfit font-bold text-white">
                  {timeLeft.days.toString().padStart(2, "0")}
                </span>
              </div>
              <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest mt-2 font-inter font-semibold drop-shadow-sm">
                Дней
              </span>
            </div>

            <span className="text-2xl text-white/50 -mt-6 font-bold">:</span>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-3xl md:text-4xl font-outfit font-bold text-white">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </span>
              </div>
              <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest mt-2 font-inter font-semibold drop-shadow-sm">
                Часов
              </span>
            </div>

            <span className="text-2xl text-white/50 -mt-6 font-bold">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-3xl md:text-4xl font-outfit font-bold text-white">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </span>
              </div>
              <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest mt-2 font-inter font-semibold drop-shadow-sm">
                Минут
              </span>
            </div>

            <span className="text-2xl text-white/50 -mt-6 font-bold">:</span>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl">
                <motion.span
                  key={timeLeft.seconds}
                  initial={{ opacity: 0.5, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-outfit font-bold text-pink-300"
                >
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </motion.span>
              </div>
               <span className="text-pink-300/80 text-[10px] md:text-xs uppercase tracking-widest mt-2 font-inter font-semibold drop-shadow-sm">
                Секунд
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
