"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { haptic } from "@/lib/telegram";

const FAQS = [
  {
    q: "Как начать зарабатывать баллы?",
    a: "Просто проходи уроки! За каждый урок начисляется +15 баллов ЗБТ. Баллы накапливаются и конвертируются в вознаграждение при выплате.",
  },
  {
    q: "Когда будет выплата вознаграждения?",
    a: "Выплаты запланированы после окончания Закрытого Бета-теста (ЗБТ). Все накопленные баллы сохраняются. Курс: 1 балл = $0.08.",
  },
  {
    q: "Как попасть в ТОП рейтинга?",
    a: "Проходи уроки каждый день — активная серия даёт множитель к очкам. Чем больше дней подряд, тем быстрее растёт твой счёт.",
  },
  {
    q: "Приложение работает без интернета?",
    a: "Основной контент уроков доступен офлайн после первой загрузки. Данные синхронизируются при следующем подключении.",
  },
  {
    q: "Что такое ЗБТ?",
    a: "ЗБТ — это Закрытое Бета-тестирование. Ты — один из первых участников, кто тестирует платформу и получает вознаграждение за активность.",
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    haptic.success();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <main className="min-h-screen bg-bg-deep pb-36">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-64 opacity-15"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, #00FF94 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-8 space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-5xl mb-3">🎧</div>
          <h1 className="text-3xl font-outfit font-black text-white mb-1">Поддержка</h1>
          <p className="text-text-secondary text-sm">
            Мы здесь, если что-то непонятно или не работает
          </p>
        </motion.div>

        {/* Quick contact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          <a
            href="https://t.me/aura_deutsch_support"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => haptic.tap()}
          >
            <motion.div
              whileTap={{ scale: 0.96 }}
              className="glass rounded-3xl border border-bg-border p-5 text-center hover:border-pink-neon/30 transition-all"
            >
              <MessageCircle size={28} className="text-pink-neon mx-auto mb-2" />
              <p className="text-white font-outfit font-bold text-sm">Telegram</p>
              <p className="text-text-muted text-xs mt-0.5">@aura_support</p>
            </motion.div>
          </a>

          <a href="mailto:support@auradeutsch.com" onClick={() => haptic.tap()}>
            <motion.div
              whileTap={{ scale: 0.96 }}
              className="glass rounded-3xl border border-bg-border p-5 text-center hover:border-pink-neon/30 transition-all"
            >
              <Mail size={28} className="text-purple-soft mx-auto mb-2" />
              <p className="text-white font-outfit font-bold text-sm">Email</p>
              <p className="text-text-muted text-xs mt-0.5">support@...</p>
            </motion.div>
          </a>
        </motion.div>

        {/* Write to us */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl border border-bg-border p-5 space-y-3"
        >
          <h3 className="text-white font-outfit font-bold">Написать нам</h3>
          <textarea
            placeholder="Опиши проблему или вопрос..."
            className="w-full bg-bg-deep border border-bg-border rounded-2xl p-4 text-white text-sm font-inter placeholder:text-text-muted resize-none focus:outline-none focus:border-pink-neon/50 transition-colors"
            rows={4}
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSend}
            className={`w-full py-4 rounded-2xl font-outfit font-bold text-base flex items-center justify-center gap-2 transition-all ${
              sent
                ? "bg-green-money/20 border border-green-money/40 text-green-money"
                : "btn-neon-pink"
            }`}
          >
            {sent ? (
              <>✓ Отправлено!</>
            ) : (
              <>
                <Send size={16} />
                Отправить
              </>
            )}
          </motion.button>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <p className="text-text-muted text-xs uppercase tracking-widest text-center mb-3">
            Частые вопросы
          </p>

          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="glass rounded-2xl border border-bg-border overflow-hidden"
            >
              <button
                onClick={() => {
                  haptic.tick();
                  setOpenFaq(openFaq === i ? null : i);
                }}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-white font-outfit font-semibold text-sm pr-3">
                  {faq.q}
                </span>
                {openFaq === i ? (
                  <ChevronUp size={16} className="text-pink-neon flex-shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-text-muted flex-shrink-0" />
                )}
              </button>

              {openFaq === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-4 pb-4"
                >
                  <p className="text-text-secondary text-sm leading-relaxed border-t border-bg-border pt-3">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
