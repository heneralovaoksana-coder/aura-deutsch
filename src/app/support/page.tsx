"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, ChevronDown, ChevronUp, HelpCircle, Shield, Sparkles } from "lucide-react";
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
  {
    q: "Как работает система серий?",
    a: "Каждый день, когда ты заходишь и проходишь хотя бы один урок, твоя серия увеличивается. За 3+ дней ты получаешь множитель x1.1, за 7+ — x1.25, а за 14+ дней — x1.5 к баллам!",
  },
  {
    q: "Безопасны ли мои данные?",
    a: "Все данные хранятся локально на твоём устройстве и шифруются. Мы не передаём персональные данные третьим лицам. Платформа работает через защищённое соединение Telegram.",
  },
];

const FEATURES = [
  { icon: <Shield size={20} />, title: "Безопасность", desc: "Данные защищены и зашифрованы", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: <Sparkles size={20} />, title: "Обновления", desc: "Новый контент каждую неделю", color: "text-rose-400", bg: "bg-rose-500/10" },
  { icon: <HelpCircle size={20} />, title: "24/7 Поддержка", desc: "Отвечаем в течение 24 часов", color: "text-indigo-400", bg: "bg-indigo-500/10" },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    haptic.success();
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <main className="min-h-screen bg-bg-deep pb-36">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="float-orb w-72 h-72 top-0 left-1/2 -translate-x-1/2 opacity-40"
          style={{ background: "rgba(16, 185, 129, 0.06)" }}
        />
        <div
          className="float-orb w-48 h-48 bottom-40 right-0 opacity-30"
          style={{ background: "rgba(244, 63, 111, 0.04)", animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-8 space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center mx-auto mb-3 shadow-emerald-soft">
            <HelpCircle size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-outfit font-black text-text-primary mb-1">Поддержка</h1>
          <p className="text-text-secondary text-sm">
            Мы здесь, если что-то непонятно или не работает
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-3 gap-2"
        >
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="glass rounded-2xl border border-bg-border p-3 text-center"
            >
              <div className={`w-10 h-10 rounded-xl ${feat.bg} flex items-center justify-center mx-auto mb-2 ${feat.color}`}>
                {feat.icon}
              </div>
              <p className="text-text-primary font-outfit font-bold text-[11px] mb-0.5">{feat.title}</p>
              <p className="text-text-muted text-[9px] leading-tight">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick contact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
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
              className="glass rounded-2xl border border-bg-border p-4 text-center hover:border-rose-500/20 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center mx-auto mb-2">
                <MessageCircle size={24} className="text-rose-400" />
              </div>
              <p className="text-text-primary font-outfit font-bold text-sm">Telegram</p>
              <p className="text-text-muted text-xs mt-0.5">@aura_support</p>
            </motion.div>
          </a>

          <a href="mailto:support@auradeutsch.com" onClick={() => haptic.tap()}>
            <motion.div
              whileTap={{ scale: 0.96 }}
              className="glass rounded-2xl border border-bg-border p-4 text-center hover:border-indigo-500/20 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-2">
                <Mail size={24} className="text-indigo-400" />
              </div>
              <p className="text-text-primary font-outfit font-bold text-sm">Email</p>
              <p className="text-text-muted text-xs mt-0.5">support@...</p>
            </motion.div>
          </a>
        </motion.div>

        {/* Write to us */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl border border-bg-border p-5 space-y-3"
        >
          <h3 className="text-text-primary font-outfit font-bold">Написать нам</h3>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Опиши проблему или вопрос..."
            className="w-full bg-bg-deep border border-bg-border rounded-xl p-4 text-text-primary text-sm font-inter placeholder:text-text-muted resize-none focus:outline-none focus:border-rose-500/30 transition-colors"
            rows={4}
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSend}
            className={`w-full py-3.5 rounded-2xl font-outfit font-bold text-base flex items-center justify-center gap-2 transition-all ${
              sent
                ? "bg-emerald-500/10 border border-emerald-500/25 text-emerald-400"
                : "btn-rose"
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
          <p className="text-text-muted text-xs uppercase tracking-widest text-center mb-3 font-outfit">
            Частые вопросы
          </p>

          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="glass rounded-2xl border border-bg-border overflow-hidden"
            >
              <button
                onClick={() => {
                  haptic.tick();
                  setOpenFaq(openFaq === i ? null : i);
                }}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-text-primary font-outfit font-semibold text-sm pr-3">
                  {faq.q}
                </span>
                {openFaq === i ? (
                  <ChevronUp size={16} className="text-rose-400 flex-shrink-0" />
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
