export interface DictionaryWord {
  id: string;
  word: string;
  translation: string;
  example_sentence: string;
  example_ru: string;
  audio_url?: string;
  difficulty_level: 1 | 2 | 3;
}

export interface DictionaryCategory {
  id: string;
  name: string;
  icon: string;
  words: DictionaryWord[];
}

export const DICTIONARY: DictionaryCategory[] = [
  {
    id: "official",
    name: "Официальный немецкий",
    icon: "📚",
    words: [
      { id: "o-1", word: "Sehr geehrte(r)", translation: "Уважаемый(ая)", example_sentence: "Sehr geehrte Damen und Herren.", example_ru: "Уважаемые дамы и господа.", difficulty_level: 2 },
      { id: "o-2", word: "Mit freundlichen Grüßen", translation: "С наилучшими пожеланиями", example_sentence: "Mit freundlichen Grüßen, Max.", example_ru: "С уважением, Макс.", difficulty_level: 3 },
      { id: "o-3", word: "Der Termin", translation: "Назначенная встреча", example_sentence: "Ich habe einen Termin beim Arzt.", example_ru: "У меня запись к врачу.", difficulty_level: 1 }
    ]
  },
  {
    id: "slang",
    name: "Повседневный сленг",
    icon: "💬",
    words: [
      { id: "s-1", word: "Krass", translation: "Жесть / Круто", example_sentence: "Das ist ja krass!", example_ru: "Это просто жесть/круто!", difficulty_level: 1 },
      { id: "s-2", word: "Alter", translation: "Чувак / Жесть", example_sentence: "Alter, was geht ab?", example_ru: "Чувак, как жизнь?", difficulty_level: 1 },
      { id: "s-3", word: "Geil", translation: "Супер / Классно", example_sentence: "Das Auto ist echt geil.", example_ru: "Эта машина реально классная.", difficulty_level: 1 }
    ]
  },
  {
    id: "business",
    name: "Бизнес",
    icon: "💼",
    words: [
      { id: "b-1", word: "Das Meeting", translation: "Встреча (рабочая)", example_sentence: "Das Meeting beginnt um 10 Uhr.", example_ru: "Встреча начинается в 10 часов.", difficulty_level: 2 },
      { id: "b-2", word: "Das Angebot", translation: "Предложение", example_sentence: "Wir haben ein gutes Angebot.", example_ru: "У нас есть хорошее предложение.", difficulty_level: 2 },
      { id: "b-3", word: "Die Rechnung", translation: "Счет", example_sentence: "Bitte schicken Sie die Rechnung.", example_ru: "Пожалуйста, пришлите счет.", difficulty_level: 2 }
    ]
  },
  {
    id: "travel",
    name: "Путешествия",
    icon: "✈️",
    words: [
      { id: "t-1", word: "Der Flughafen", translation: "Аэропорт", example_sentence: "Wo ist der Flughafen?", example_ru: "Где аэропорт?", difficulty_level: 1 },
      { id: "t-2", word: "Das Ticket", translation: "Билет", example_sentence: "Ich brauche ein Ticket nach Berlin.", example_ru: "Мне нужен билет до Берлина.", difficulty_level: 1 },
      { id: "t-3", word: "Das Gepäck", translation: "Багаж", example_sentence: "Mein Gepäck ist weg.", example_ru: "Мой багаж пропал.", difficulty_level: 2 }
    ]
  }
];
