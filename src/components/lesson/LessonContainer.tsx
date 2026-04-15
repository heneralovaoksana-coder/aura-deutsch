"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lesson, LessonStep } from "@/data/lessons";
import LessonProgressBar from "./LessonProgressBar";
import Flashcard from "./Flashcard";
import WordJumble from "./WordJumble";
import AlphabetCard from "./AlphabetCard";
import GrammarCard from "./GrammarCard";
import AudioStory from "./AudioStory";
import ExamScreen from "./ExamScreen";
import ExcellentScreen from "./ExcellentScreen";
import { haptic } from "@/lib/telegram";
import { useAppStore } from "@/lib/store";

interface LessonContainerProps {
  lesson: Lesson;
}

// Page slide animation variants
const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
};

const pageTransition = {
  type: "spring" as const,
  stiffness: 280,
  damping: 30,
};

export default function LessonContainer({ lesson }: LessonContainerProps) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [finished, setFinished] = useState(false);
  const [examPercentage, setExamPercentage] = useState<number | null>(null);

  const { completeLesson, user } = useAppStore();

  const totalSteps = lesson.steps.length;
  const currentStep = lesson.steps[stepIndex];

  const handleLessonComplete = (score: number) => {
    setExamPercentage(score);
    completeLesson(user.level, score);
    setFinished(true);
  };

  const goNext = () => {
    haptic.tick();
    if (stepIndex >= totalSteps - 1) {
      handleLessonComplete(100);
    } else {
      setDirection(1);
      setStepIndex((prev) => prev + 1);
    }
  };

  if (finished) {
    if (examPercentage !== null && examPercentage < 80 && lesson.id.includes("exam")) {
      return (
        <div className="fixed inset-0 bg-bg-deep flex flex-col items-center justify-center p-6 text-center z-50">
           <h1 className="text-5xl font-outfit font-black text-red-500 mb-4">Экзамен не сдан</h1>
           <p className="text-white text-lg mb-8 max-w-sm">Вы набрали {Math.round(examPercentage)}%. Для перехода дальше нужно 80%. Ваш прогресс откатился на 3 урока назад для повторения.</p>
           <button onClick={() => router.push("/dashboard")} className="w-full max-w-sm py-4 rounded-2xl font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20">
             Вернуться в меню
           </button>
        </div>
      );
    }

    return (
      <ExcellentScreen
        points={lesson.pointsReward}
        lessonTitle={lesson.title}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-deep">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 opacity-20 rounded-full"
          style={{
            background: "radial-gradient(circle, #FF007A 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Progress bar */}
      <div className="relative z-10">
        <LessonProgressBar
          current={stepIndex + 1}
          total={totalSteps}
          onClose={() => {
            haptic.tap();
            router.push("/lesson");
          }}
        />

        {/* Lesson title */}
        <div className="text-center pb-2">
          <p className="text-text-muted text-xs uppercase tracking-widest">
            {lesson.title}
          </p>
        </div>
      </div>

      {/* Step content with slide animation */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={stepIndex}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className="absolute inset-0 flex flex-col"
          >
            {currentStep.type === "flashcard" && <Flashcard card={currentStep.card} onComplete={goNext} />}
            {currentStep.type === "jumble" && <WordJumble exercise={currentStep.exercise} onComplete={goNext} />}
            {currentStep.type === "alphabet" && <AlphabetCard card={currentStep.card} onComplete={goNext} />}
            {currentStep.type === "grammar" && <GrammarCard card={currentStep.card} onComplete={goNext} />}
            {currentStep.type === "audio_story" && <AudioStory story={currentStep.story} onComplete={goNext} />}
            {currentStep.type === "exam" && <ExamScreen questions={currentStep.questions} onComplete={(score) => handleLessonComplete(score)} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
