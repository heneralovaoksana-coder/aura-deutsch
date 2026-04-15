"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { GraduationCap, Volume2, Mic, Check, ChevronRight, AlertCircle, PlayCircle, Loader2 } from "lucide-react";
import NeonButton from "@/components/ui/NeonButton";
import ProgressBar from "@/components/ui/ProgressBar";
import { useAppStore, UserLevel } from "@/lib/store";
import { placementQuestions, PlacementItem } from "@/data/placementTest";

// --- Subcomponents for each task type ---

// 1. Hören
function ListenTask({ item, onAnswer }: { item: PlacementItem; onAnswer: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.content);
      utterance.lang = "de-DE";
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech не поддерживается в вашем браузере.");
    }
  };

  return (
    <div className="flex flex-col gap-6 font-outfit">
      <div className="bg-bg-card border border-bg-border rounded-3xl p-6 text-center">
        <button 
          onClick={playAudio} 
          disabled={isPlaying}
          className="mx-auto w-20 h-20 bg-blue-neon/20 rounded-full flex items-center justify-center border-2 border-blue-neon mb-4 hover:scale-105 transition-transform disabled:opacity-50"
        >
          {isPlaying ? <Loader2 className="animate-spin text-blue-neon" size={32} /> : <Volume2 className="text-blue-neon" size={32} />}
        </button>
        <p className="text-text-secondary text-sm">Нажмите, чтобы прослушать аудио (робот)</p>
        <h3 className="text-xl font-bold text-white mt-4">{item.question}</h3>
      </div>
      
      <div className="grid gap-3">
        {item.options?.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selected === opt 
                ? "border-blue-neon bg-blue-neon/10 text-white" 
                : "border-bg-border bg-transparent text-text-muted hover:border-text-secondary"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <NeonButton 
        variant="outline-pink" 
        fullWidth 
        disabled={!selected}
        onClick={() => {
          if (selected) onAnswer(selected === item.correctAnswer);
        }}
      >
        Ответить
      </NeonButton>
    </div>
  );
}

// 2. Lesen
function ReadTask({ item, onAnswer }: { item: PlacementItem; onAnswer: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6 font-outfit">
      <div className="bg-bg-card border border-bg-border rounded-3xl p-6">
        <p className="text-white text-lg leading-relaxed mb-4">{item.content}</p>
        <h3 className="text-pink-neon font-semibold">{item.question}</h3>
      </div>
      
      <div className="grid gap-3">
        {item.options?.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selected === opt 
                ? "border-pink-neon bg-pink-neon/10 text-white" 
                : "border-bg-border bg-transparent text-text-muted hover:border-text-secondary"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <NeonButton 
        variant="pink" 
        fullWidth 
        disabled={!selected}
        onClick={() => {
          if (selected) onAnswer(selected === item.correctAnswer);
        }}
      >
        Ответить
      </NeonButton>
    </div>
  );
}

// 3. Schreiben
function WriteTask({ item, onAnswer }: { item: PlacementItem; onAnswer: (correct: boolean) => void }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    // Basic verification: Check if it's long enough and contains at least one keyword
    const lowerText = text.toLowerCase();
    const hasLength = text.length > 10;
    const hasKeyword = item.keywords?.some((k) => lowerText.includes(k.toLowerCase())) ?? true;
    
    // For test simplicity, we allow pass if length is good, keyword match is a bonus
    onAnswer(hasLength && hasKeyword);
  };

  return (
    <div className="flex flex-col gap-6 font-outfit">
      <div className="bg-bg-card border border-bg-border rounded-3xl p-6">
        <h3 className="text-white text-lg font-bold mb-2">{item.content}</h3>
        <p className="text-text-secondary">{item.question}</p>
      </div>
      
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Schreiben Sie hier..."
          className="w-full h-40 bg-bg-deep border border-bg-border rounded-2xl p-4 text-white placeholder-text-muted focus:outline-none focus:border-purple-neon resize-none transition-colors"
        />
        <div className="absolute bottom-4 right-4 text-xs font-mono text-text-muted">
          {text.length} chars
        </div>
      </div>

      <NeonButton 
        variant="pink" 
        fullWidth 
        disabled={text.length < 5}
        onClick={handleSubmit}
      >
        Ответить
      </NeonButton>
    </div>
  );
}

// 4. Sprechen
function SpeakTask({ item, onAnswer }: { item: PlacementItem; onAnswer: (correct: boolean) => void }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = "de-DE";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const spoken = event.results[0][0].transcript;
          setTranscript(spoken);
          setIsListening(false);
        };

        recognition.onerror = (event: any) => {
          console.error("Speech reco error", event);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript("");
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const submit = () => {
    if (!transcript) return;
    const lower = transcript.toLowerCase();
    // Soft verification: at least one keyword matches
    const correct = item.keywords?.some((k) => lower.includes(k.toLowerCase())) ?? false;
    onAnswer(correct);
  };

  const hasSpeechSupport = !!recognitionRef.current;

  return (
    <div className="flex flex-col gap-6 font-outfit">
      <div className="bg-bg-card border border-bg-border rounded-3xl p-6">
        <h3 className="text-white text-lg font-bold mb-2">{item.content}</h3>
        <p className="text-text-secondary">{item.question}</p>
      </div>

      {!hasSpeechSupport && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm flex gap-2">
          <AlertCircle size={16} />
          Ваш браузер не поддерживает распознавание речи. Пожалуйста, пропустите вопрос (зачтется как неверный, но это бета).
        </div>
      )}
      
      <div className="flex flex-col items-center justify-center p-8 border border-bg-border border-dashed rounded-3xl">
        <button
          onClick={toggleListen}
          disabled={!hasSpeechSupport}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
            isListening ? "bg-red-500 animate-pulse text-white scale-110" : "bg-bg-card border-2 border-green-neon text-green-neon hover:bg-green-neon hover:text-black"
          }`}
        >
          <Mic size={32} />
        </button>
        <p className="mt-4 text-text-secondary text-sm">
          {isListening ? "Говорите..." : "Нажмите, чтобы сказать"}
        </p>

        {transcript && (
          <div className="mt-6 p-4 w-full bg-black/40 rounded-xl text-center border border-bg-border">
            <span className="text-white italic">"{transcript}"</span>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        {/* Ability to skip if broken browser */}
        <button 
          className="px-6 py-4 rounded-2xl text-text-muted hover:text-white transition-colors border border-bg-border"
          onClick={() => onAnswer(false)}
        >
          Пропустить
        </button>
        <NeonButton 
          variant="green" 
          className="flex-1"
          disabled={!transcript}
          onClick={submit}
        >
          Подтвердить
        </NeonButton>
      </div>
    </div>
  );
}

// --- Main Page ---

export default function PlacementPage() {
  const router = useRouter();
  const setUserLevel = useAppStore((state) => state.setUserLevel);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  // Shuffle questions if needed, but here we just take them sequentially
  // Usually tests randomize, but we will go: Hören -> Lesen -> Schreiben -> Sprechen
  const total = placementQuestions.length; // 40
  const progressPercent = Math.round((currentIndex / total) * 100);

  const currentItem = placementQuestions[currentIndex];

  const handleAnswer = (correct: boolean) => {
    // Add point if correct
    if (correct && currentItem) {
      setScores((prev) => ({
        ...prev,
        [currentItem.category]: (prev[currentItem.category] || 0) + 1,
      }));
    }

    if (currentIndex + 1 < total) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true); // show results
    }
  };

  const finishTest = () => {
    // Calculate final level
    // Max 40 points total.
    // 0-15: A0, 16-25: A1, 26-35: A2, 36-40: B1
    const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);
    let assignedLevel: UserLevel = "A0";
    if (totalPoints >= 36) assignedLevel = "B1";
    else if (totalPoints >= 26) assignedLevel = "A2";
    else if (totalPoints >= 16) assignedLevel = "A1";

    setUserLevel(assignedLevel);
    router.push("/dashboard");
  };

  if (isFinished) {
    const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);
    let assignedLevel: UserLevel = "A0";
    if (totalPoints >= 36) assignedLevel = "B1";
    else if (totalPoints >= 26) assignedLevel = "A2";
    else if (totalPoints >= 16) assignedLevel = "A1";

    return (
      <main className="min-h-screen bg-bg-deep flex flex-col items-center justify-center p-6 font-outfit">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-bg-card border border-bg-border rounded-[2rem] p-8 text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-neon to-blue-neon rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(0,255,148,0.3)]">
            <GraduationCap size={48} className="text-black" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Тест завершен!</h1>
          <p className="text-text-secondary mb-8">Вот ваши результаты по 4-м модулям</p>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between p-4 bg-bg-deep rounded-2xl">
              <span className="text-text-muted">Hören (Аудирование)</span>
              <span className="font-bold text-white">{scores["Hören"] || 0}/10</span>
            </div>
            <div className="flex justify-between p-4 bg-bg-deep rounded-2xl">
              <span className="text-text-muted">Lesen (Чтение)</span>
              <span className="font-bold text-white">{scores["Lesen"] || 0}/10</span>
            </div>
            <div className="flex justify-between p-4 bg-bg-deep rounded-2xl">
              <span className="text-text-muted">Schreiben (Письмо)</span>
              <span className="font-bold text-white">{scores["Schreiben"] || 0}/10</span>
            </div>
            <div className="flex justify-between p-4 bg-bg-deep rounded-2xl">
              <span className="text-text-muted">Sprechen (Говорение)</span>
              <span className="font-bold text-white">{scores["Sprechen"] || 0}/10</span>
            </div>
          </div>

          <div className="p-6 border border-bg-border rounded-3xl mb-8 bg-black/50">
            <p className="text-text-secondary text-sm mb-1">Полученный уровень:</p>
            <p className="text-4xl font-black text-pink-neon">{assignedLevel}</p>
          </div>

          <NeonButton variant="pink" size="lg" fullWidth onClick={finishTest}>
            Перейти в кабинет
          </NeonButton>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-deep flex flex-col p-6 max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between py-4 mb-4">
        <button onClick={() => router.push("/")} className="text-text-muted text-sm px-4 py-2 bg-bg-card rounded-full border border-bg-border active:scale-95 transition-transform">
          Bыйти
        </button>
        <div className="flex flex-col items-end">
          <span className="text-white font-bold font-outfit text-lg">{currentItem?.category}</span>
          <span className="text-text-secondary text-xs">Вопрос {currentIndex + 1} из {total}</span>
        </div>
      </header>

      {/* Progress */}
      <div className="mb-8">
        <ProgressBar value={progressPercent} height="md" color="purple" />
      </div>

      {/* Dynamic Module Rendering */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem?.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          {currentItem?.category === "Hören" && <ListenTask item={currentItem} onAnswer={handleAnswer} />}
          {currentItem?.category === "Lesen" && <ReadTask item={currentItem} onAnswer={handleAnswer} />}
          {currentItem?.category === "Schreiben" && <WriteTask item={currentItem} onAnswer={handleAnswer} />}
          {currentItem?.category === "Sprechen" && <SpeakTask item={currentItem} onAnswer={handleAnswer} />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
