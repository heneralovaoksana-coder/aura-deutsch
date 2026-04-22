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
    id: "basic",
    name: "Основы",
    icon: "🌟",
    words: [
      { id: "ba-1", word: "Hallo", translation: "Привет", example_sentence: "Hallo, wie geht es dir?", example_ru: "Привет, как дела?", difficulty_level: 1 },
      { id: "ba-2", word: "Danke", translation: "Спасибо", example_sentence: "Danke für deine Hilfe.", example_ru: "Спасибо за твою помощь.", difficulty_level: 1 },
      { id: "ba-3", word: "Bitte", translation: "Пожалуйста", example_sentence: "Bitte schön!", example_ru: "Пожалуйста!", difficulty_level: 1 },
      { id: "ba-4", word: "Ja", translation: "Да", example_sentence: "Ja, das ist richtig.", example_ru: "Да, это правильно.", difficulty_level: 1 },
      { id: "ba-5", word: "Nein", translation: "Нет", example_sentence: "Nein, das stimmt nicht.", example_ru: "Нет, это неправда.", difficulty_level: 1 },
      { id: "ba-6", word: "Tschüss", translation: "Пока", example_sentence: "Tschüss, bis morgen!", example_ru: "Пока, до завтра!", difficulty_level: 1 },
      { id: "ba-7", word: "Entschuldigung", translation: "Извините", example_sentence: "Entschuldigung, wo ist der Bahnhof?", example_ru: "Извините, где вокзал?", difficulty_level: 2 },
      { id: "ba-8", word: "Guten Morgen", translation: "Доброе утро", example_sentence: "Guten Morgen, Herr Müller!", example_ru: "Доброе утро, господин Мюллер!", difficulty_level: 1 },
    ]
  },
  {
    id: "official",
    name: "Официальный",
    icon: "📚",
    words: [
      { id: "o-1", word: "Sehr geehrte(r)", translation: "Уважаемый(ая)", example_sentence: "Sehr geehrte Damen und Herren.", example_ru: "Уважаемые дамы и господа.", difficulty_level: 2 },
      { id: "o-2", word: "Mit freundlichen Grüßen", translation: "С наилучшими пожеланиями", example_sentence: "Mit freundlichen Grüßen, Max.", example_ru: "С уважением, Макс.", difficulty_level: 3 },
      { id: "o-3", word: "Der Termin", translation: "Назначенная встреча", example_sentence: "Ich habe einen Termin beim Arzt.", example_ru: "У меня запись к врачу.", difficulty_level: 1 },
      { id: "o-4", word: "Die Bewerbung", translation: "Заявка / Резюме", example_sentence: "Ich schicke meine Bewerbung per E-Mail.", example_ru: "Я отправлю свое резюме по почте.", difficulty_level: 2 },
      { id: "o-5", word: "Der Vertrag", translation: "Договор", example_sentence: "Bitte unterschreiben Sie den Vertrag.", example_ru: "Пожалуйста, подпишите договор.", difficulty_level: 2 },
      { id: "o-6", word: "Die Bescheinigung", translation: "Справка / Удостоверение", example_sentence: "Ich brauche eine ärztliche Bescheinigung.", example_ru: "Мне нужна медицинская справка.", difficulty_level: 3 },
    ]
  },
  {
    id: "slang",
    name: "Сленг",
    icon: "💬",
    words: [
      { id: "s-1", word: "Krass", translation: "Жесть / Круто", example_sentence: "Das ist ja krass!", example_ru: "Это просто жесть/круто!", difficulty_level: 1 },
      { id: "s-2", word: "Alter", translation: "Чувак / Жесть", example_sentence: "Alter, was geht ab?", example_ru: "Чувак, как жизнь?", difficulty_level: 1 },
      { id: "s-3", word: "Geil", translation: "Супер / Классно", example_sentence: "Das Auto ist echt geil.", example_ru: "Эта машина реально классная.", difficulty_level: 1 },
      { id: "s-4", word: "Digga", translation: "Друг / Братан", example_sentence: "Digga, lass mal was essen gehen.", example_ru: "Братан, давай сходим поедим.", difficulty_level: 1 },
      { id: "s-5", word: "Bock haben", translation: "Иметь желание", example_sentence: "Hast du Bock auf Kino?", example_ru: "Хочешь в кино?", difficulty_level: 2 },
      { id: "s-6", word: "Chillen", translation: "Расслабляться", example_sentence: "Wir chillen heute im Park.", example_ru: "Мы расслабляемся сегодня в парке.", difficulty_level: 1 },
      { id: "s-7", word: "Mega", translation: "Мега / Очень", example_sentence: "Das war mega lustig!", example_ru: "Это было мега смешно!", difficulty_level: 1 },
    ]
  },
  {
    id: "business",
    name: "Бизнес",
    icon: "💼",
    words: [
      { id: "b-1", word: "Das Meeting", translation: "Встреча (рабочая)", example_sentence: "Das Meeting beginnt um 10 Uhr.", example_ru: "Встреча начинается в 10 часов.", difficulty_level: 2 },
      { id: "b-2", word: "Das Angebot", translation: "Предложение", example_sentence: "Wir haben ein gutes Angebot.", example_ru: "У нас есть хорошее предложение.", difficulty_level: 2 },
      { id: "b-3", word: "Die Rechnung", translation: "Счет", example_sentence: "Bitte schicken Sie die Rechnung.", example_ru: "Пожалуйста, пришлите счет.", difficulty_level: 2 },
      { id: "b-4", word: "Der Umsatz", translation: "Оборот (финансовый)", example_sentence: "Der Umsatz ist gestiegen.", example_ru: "Оборот вырос.", difficulty_level: 3 },
      { id: "b-5", word: "Die Besprechung", translation: "Совещание", example_sentence: "Die Besprechung dauert eine Stunde.", example_ru: "Совещание длится один час.", difficulty_level: 2 },
      { id: "b-6", word: "Der Kunde", translation: "Клиент", example_sentence: "Der Kunde möchte eine Beratung.", example_ru: "Клиент хочет консультацию.", difficulty_level: 1 },
    ]
  },
  {
    id: "travel",
    name: "Путешествия",
    icon: "✈️",
    words: [
      { id: "t-1", word: "Der Flughafen", translation: "Аэропорт", example_sentence: "Wo ist der Flughafen?", example_ru: "Где аэропорт?", difficulty_level: 1 },
      { id: "t-2", word: "Das Ticket", translation: "Билет", example_sentence: "Ich brauche ein Ticket nach Berlin.", example_ru: "Мне нужен билет до Берлина.", difficulty_level: 1 },
      { id: "t-3", word: "Das Gepäck", translation: "Багаж", example_sentence: "Mein Gepäck ist weg.", example_ru: "Мой багаж пропал.", difficulty_level: 2 },
      { id: "t-4", word: "Das Hotel", translation: "Отель", example_sentence: "Das Hotel liegt im Zentrum.", example_ru: "Отель находится в центре.", difficulty_level: 1 },
      { id: "t-5", word: "Die Reservierung", translation: "Бронирование", example_sentence: "Ich habe eine Reservierung für heute.", example_ru: "У меня бронирование на сегодня.", difficulty_level: 2 },
      { id: "t-6", word: "Der Reisepass", translation: "Загранпаспорт", example_sentence: "Zeigen Sie bitte Ihren Reisepass.", example_ru: "Покажите, пожалуйста, ваш загранпаспорт.", difficulty_level: 2 },
      { id: "t-7", word: "Die Sehenswürdigkeit", translation: "Достопримечательность", example_sentence: "Berlin hat viele Sehenswürdigkeiten.", example_ru: "В Берлине много достопримечательностей.", difficulty_level: 3 },
    ]
  },
  {
    id: "food",
    name: "Еда",
    icon: "🍽️",
    words: [
      { id: "f-1", word: "Das Frühstück", translation: "Завтрак", example_sentence: "Was möchtest du zum Frühstück?", example_ru: "Что ты хочешь на завтрак?", difficulty_level: 1 },
      { id: "f-2", word: "Das Mittagessen", translation: "Обед", example_sentence: "Das Mittagessen ist fertig.", example_ru: "Обед готов.", difficulty_level: 1 },
      { id: "f-3", word: "Das Abendessen", translation: "Ужин", example_sentence: "Wir gehen zum Abendessen aus.", example_ru: "Мы идём ужинать.", difficulty_level: 1 },
      { id: "f-4", word: "Die Speisekarte", translation: "Меню", example_sentence: "Kann ich die Speisekarte haben?", example_ru: "Можно мне меню?", difficulty_level: 2 },
      { id: "f-5", word: "Lecker", translation: "Вкусно", example_sentence: "Das Essen war sehr lecker!", example_ru: "Еда была очень вкусной!", difficulty_level: 1 },
      { id: "f-6", word: "Die Rechnung", translation: "Счёт", example_sentence: "Die Rechnung, bitte.", example_ru: "Счёт, пожалуйста.", difficulty_level: 1 },
    ]
  },
  {
    id: "emotions",
    name: "Эмоции",
    icon: "❤️",
    words: [
      { id: "e-1", word: "Glücklich", translation: "Счастливый", example_sentence: "Ich bin so glücklich!", example_ru: "Я так счастлив!", difficulty_level: 1 },
      { id: "e-2", word: "Traurig", translation: "Грустный", example_sentence: "Warum bist du traurig?", example_ru: "Почему ты грустный?", difficulty_level: 1 },
      { id: "e-3", word: "Wütend", translation: "Злой", example_sentence: "Er ist sehr wütend.", example_ru: "Он очень злой.", difficulty_level: 2 },
      { id: "e-4", word: "Aufgeregt", translation: "Взволнованный", example_sentence: "Ich bin aufgeregt wegen der Prüfung.", example_ru: "Я взволнован из-за экзамена.", difficulty_level: 2 },
      { id: "e-5", word: "Müde", translation: "Усталый", example_sentence: "Ich bin heute sehr müde.", example_ru: "Я сегодня очень устал.", difficulty_level: 1 },
      { id: "e-6", word: "Überrascht", translation: "Удивлённый", example_sentence: "Sie war überrascht über das Geschenk.", example_ru: "Она была удивлена подарку.", difficulty_level: 2 },
    ]
  },
];
