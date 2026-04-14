// Lesson content data — German vocabulary and sentence exercises

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  steps: LessonStep[];
  pointsReward: number;
}

export type LessonStep =
  | { type: "flashcard"; card: FlashCard }
  | { type: "jumble"; exercise: JumbleExercise };

export interface FlashCard {
  id: string;
  german: string;
  russian: string;
  example: string;
  exampleRu: string;
  emoji: string;
  tag: "официальный" | "сленг";
  pronunciation: string;
}

export interface JumbleExercise {
  id: string;
  instruction: string;
  words: string[];        // correct order
  correctSentence: string;
  translation: string;
}

// ─── Lesson 1: Приветствия ─────────────────────────────────────────
export const LESSONS: Lesson[] = [
  {
    id: "lesson-1",
    title: "Приветствия",
    subtitle: "Guten Tag!",
    pointsReward: 15,
    steps: [
      {
        type: "flashcard",
        card: {
          id: "fc-1",
          german: "Hallo",
          russian: "Привет",
          example: "Hallo! Wie geht's?",
          exampleRu: "Привет! Как дела?",
          emoji: "👋",
          tag: "официальный",
          pronunciation: "ха-ло",
        },
      },
      {
        type: "jumble",
        exercise: {
          id: "jmb-1",
          instruction: "Составь фразу: «Привет, как дела?»",
          words: ["Hallo", "Wie", "geht", "es", "dir"],
          correctSentence: "Hallo Wie geht es dir",
          translation: "Привет, как у тебя дела?",
        },
      },
      {
        type: "flashcard",
        card: {
          id: "fc-2",
          german: "Danke",
          russian: "Спасибо",
          example: "Danke schön!",
          exampleRu: "Большое спасибо!",
          emoji: "🙏",
          tag: "официальный",
          pronunciation: "дан-кэ",
        },
      },
      {
        type: "jumble",
        exercise: {
          id: "jmb-2",
          instruction: "Составь фразу: «Большое спасибо!»",
          words: ["Danke", "sehr", "schön"],
          correctSentence: "Danke sehr schön",
          translation: "Большое-большое спасибо!",
        },
      },
      {
        type: "flashcard",
        card: {
          id: "fc-3",
          german: "Guten Morgen",
          russian: "Доброе утро",
          example: "Guten Morgen! Schön dich zu sehen.",
          exampleRu: "Доброе утро! Рад тебя видеть.",
          emoji: "☀️",
          tag: "официальный",
          pronunciation: "гу-тэн мор-ген",
        },
      },
      {
        type: "jumble",
        exercise: {
          id: "jmb-3",
          instruction: "Составь: «Доброе утро, меня зовут...»",
          words: ["Guten", "Morgen", "ich", "heiße", "Anna"],
          correctSentence: "Guten Morgen ich heiße Anna",
          translation: "Доброе утро, меня зовут Анна",
        },
      },
    ],
  },
  {
    id: "lesson-2",
    title: "Числа",
    subtitle: "Zahlen 1-10",
    pointsReward: 15,
    steps: [
      {
        type: "flashcard",
        card: {
          id: "fc-4",
          german: "Eins",
          russian: "Один",
          example: "Ich habe eins, du hast zwei.",
          exampleRu: "У меня один, у тебя два.",
          emoji: "1️⃣",
          tag: "официальный",
          pronunciation: "айнс",
        },
      },
      {
        type: "jumble",
        exercise: {
          id: "jmb-4",
          instruction: "Составь: «Мне двадцать лет»",
          words: ["Ich", "bin", "zwanzig", "Jahre", "alt"],
          correctSentence: "Ich bin zwanzig Jahre alt",
          translation: "Мне двадцать лет",
        },
      },
      {
        type: "flashcard",
        card: {
          id: "fc-5",
          german: "Zwei",
          russian: "Два",
          example: "Zwei Kaffee, bitte!",
          exampleRu: "Два кофе, пожалуйста!",
          emoji: "2️⃣",
          tag: "официальный",
          pronunciation: "цвай",
        },
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
