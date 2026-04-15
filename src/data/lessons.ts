// Lesson content data — German curriculum A0 to B1

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  steps: LessonStep[];
  pointsReward: number;
}

export type LessonStep =
  | { type: "alphabet"; card: AlphabetCardItem }
  | { type: "flashcard"; card: FlashCard }
  | { type: "grammar"; card: GrammarCardItem }
  | { type: "jumble"; exercise: JumbleExercise }
  | { type: "audio_story"; story: AudioStoryItem }
  | { type: "exam"; questions: ExamQuestion[] };

export interface AlphabetCardItem {
  id: string;
  letter: string;
  pronunciation: string;
  exampleWord: string;
  exampleTranslation: string;
}

export interface FlashCard {
  id: string;
  german: string;
  russian: string;
  example: string;
  exampleRu: string;
  emoji: string;
  tag: string;
  pronunciation: string;
}

export interface GrammarCardItem {
  id: string;
  title: string;
  content: string;
  tips: string[];
}

export interface JumbleExercise {
  id: string;
  instruction: string;
  words: string[];        // correct order or jumbled pool
  correctSentence: string;
  translation: string;
}

export interface AudioStoryItem {
  id: string;
  title: string;
  transcript: string; 
  questions: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

// ==========================================
// Level A0: Alphabet & Basics
// ==========================================
const A0_LESSONS: Lesson[] = [
  {
    id: "a0-lesson-1",
    title: "Алфавит",
    subtitle: "Das Alphabet - Часть 1",
    pointsReward: 15,
    steps: [
      {
        type: "alphabet",
        card: { id: "a0-1-al-a", letter: "A a", pronunciation: "а", exampleWord: "der Apfel", exampleTranslation: "яблоко" }
      },
      {
        type: "alphabet",
        card: { id: "a0-1-al-b", letter: "B b", pronunciation: "бэ", exampleWord: "das Brot", exampleTranslation: "хлеб" }
      },
      {
        type: "alphabet",
        card: { id: "a0-1-al-c", letter: "C c", pronunciation: "цэ", exampleWord: "der Computer", exampleTranslation: "компьютер" }
      }
    ]
  },
  {
    id: "a0-lesson-2",
    title: "Приветствия",
    subtitle: "Guten Tag!",
    pointsReward: 15,
    steps: [
      {
        type: "grammar",
        card: {
          id: "a0-2-gr-1",
          title: "Формальности",
          content: "В немецком языке важно отличать 'Du' (ты) от вежливого 'Sie' (Вы).",
          tips: ["Hallo - Привет (друзьям)", "Guten Tag - Добрый день (официально)"]
        }
      },
      {
        type: "flashcard",
        card: { id: "a0-2-fc-1", german: "Hallo", russian: "Привет", example: "Hallo, Anna!", exampleRu: "Привет, Анна!", emoji: "👋", tag: "повседневный", pronunciation: "ха-ло" }
      },
      {
        type: "flashcard",
        card: { id: "a0-2-fc-2", german: "Guten Tag", russian: "Добрый день", example: "Guten Tag Herr Schmidt.", exampleRu: "Добрый день, господин Шмидт.", emoji: "☀️", tag: "официальный", pronunciation: "гу-тэн так" }
      }
    ]
  },
  {
    id: "a0-lesson-3",
    title: "Числа",
    subtitle: "Zahlen 1-3",
    pointsReward: 15,
    steps: [
      {
        type: "flashcard",
        card: { id: "a0-3-fc-1", german: "eins", russian: "один", example: "Ich habe eins.", exampleRu: "У меня один.", emoji: "1️⃣", tag: "официальный", pronunciation: "айнс" }
      },
      {
        type: "flashcard",
        card: { id: "a0-3-fc-2", german: "zwei", russian: "два", example: "Zwei Kaffee, bitte.", exampleRu: "Два кофе, пожалуйста.", emoji: "2️⃣", tag: "официальный", pronunciation: "цвай" }
      },
      {
        type: "flashcard",
        card: { id: "a0-3-fc-3", german: "drei", russian: "три", example: "Drei Tickets.", exampleRu: "Три билета.", emoji: "3️⃣", tag: "официальный", pronunciation: "драй" }
      }
    ]
  },
  {
    id: "a0-lesson-4",
    title: "Вопросы",
    subtitle: "W-Fragen",
    pointsReward: 15,
    steps: [
      {
        type: "grammar",
        card: {
          id: "a0-4-gr-1",
          title: "Вопросительные слова",
          content: "В немецком языке многие вопросительные слова начинаются на букву W.",
          tips: ["Wer? - Кто?", "Was? - Что?", "Wie? - Как?"]
        }
      },
      {
        type: "flashcard",
        card: { id: "a0-4-fc-1", german: "Was", russian: "Что", example: "Was ist das?", exampleRu: "Что это?", emoji: "❓", tag: "повседневный", pronunciation: "вас" }
      },
      {
        type: "jumble",
        exercise: { id: "a0-4-jb-1", instruction: "Составь: «Что это?»", words: ["Was", "ist", "das"], correctSentence: "Was ist das", translation: "Что это?" }
      }
    ]
  },
  {
    id: "a0-lesson-5",
    title: "Мини-тест",
    subtitle: "Первая аудио-история",
    pointsReward: 15,
    steps: [
      {
        type: "audio_story",
        story: {
          id: "a0-5-as-1",
          title: "В кафе",
          transcript: "Hallo! Guten Tag. Zwei Kaffee, bitte. Danke!",
          questions: [
            { id: "q1", question: "Сколько кофе заказали?", options: ["Один", "Два", "Три"], correctIndex: 1 }
          ]
        }
      }
    ]
  }
];

// Generate exactly 40 lessons length for A0
for (let i = 6; i <= 39; i++) {
  A0_LESSONS.push({
    id: `a0-lesson-${i}`,
    title: `Урок ${i}`,
    subtitle: "Закрепление материала",
    pointsReward: 15,
    steps: [] // empty placeholders
  });
}

A0_LESSONS.push({
  id: "a0-exam",
  title: "A0 Финальный Экзамен",
  subtitle: "Тест для перехода на A1",
  pointsReward: 50,
  steps: [
    {
      type: "exam",
      questions: Array.from({length: 10}).map((_, i) => ({
        id: `a0-ex-${i}`,
        question: `Тестовый вопрос A0 #${i + 1}`,
        options: ["Вариант 1", "Правильный", "Вариант 3"],
        correctIndex: 1
      }))
    }
  ]
});

// ==========================================
// Level A1, A2, B1 placeholders
// ==========================================
const fillLevel = (levelPrefix: string) => {
  const arr: Lesson[] = [];
  for (let i = 1; i <= 39; i++) {
    arr.push({
      id: `${levelPrefix}-lesson-${i}`,
      title: `Урок ${i} (${levelPrefix.toUpperCase()})`,
      subtitle: "В разработке",
      pointsReward: 15,
      steps: []
    });
  }
  arr.push({
    id: `${levelPrefix}-exam`,
    title: `${levelPrefix.toUpperCase()} Финальный Экзамен`,
    subtitle: "Проверка знаний",
    pointsReward: 50,
    steps: [
      {
        type: "exam",
        questions: Array.from({length: 10}).map((_, i) => ({
          id: `${levelPrefix}-ex-${i}`,
          question: `Тестовый вопрос ${levelPrefix.toUpperCase()} #${i + 1}`,
          options: ["Вариант 1", "Правильный", "Вариант 2"],
          correctIndex: 1
        }))
      }
    ]
  });
  return arr;
};

export const CURRICULUM: Record<"A0" | "A1" | "A2" | "B1", Lesson[]> = {
  A0: A0_LESSONS,
  A1: fillLevel("a1"),
  A2: fillLevel("a2"),
  B1: fillLevel("b1"),
};

export function getLessonByLevelAndIndex(level: "A0" | "A1" | "A2" | "B1", index: number): Lesson | undefined {
  return CURRICULUM[level]?.[index];
}
