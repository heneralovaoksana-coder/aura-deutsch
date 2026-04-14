"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lesson, LessonStep } from "@/data/lessons";
import LessonProgressBar from "./LessonProgressBar";
import Flashcard from "./Flashcard";
import WordJumble from "./WordJumble";
import ExcellentScreen from "./ExcellentScreen";
import { haptic } from "@/lib/telegram";

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

  const totalSteps = lesson.steps.length;
  const currentStep = lesson.steps[stepIndex];

  const goNext = () => {
    haptic.tick();
    if (stepIndex >= totalSteps - 1) {
      setFinished(true);
    } else {
      setDirection(1);
      setStepIndex((prev) => prev + 1);
    }
  };

  if (finished) {
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
            {currentStep.type === "flashcard" ? (
              <Flashcard card={currentStep.card} onComplete={goNext} />
            ) : (
              <WordJumble exercise={currentStep.exercise} onComplete={goNext} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
