export type PlacementCategory = "Hören" | "Lesen" | "Schreiben" | "Sprechen";
export type PlacementLevel = "A1" | "A2" | "B1"; // We only map up to B1 for now.

export interface PlacementItem {
  id: string;
  category: PlacementCategory;
  level: PlacementLevel;
  content: string; // The text/audio source
  question?: string; // The specific question
  options?: string[]; // For multiple choice
  correctAnswer?: string; // For auto-verification (Hören, Lesen)
  keywords?: string[]; // For soft-verification (Schreiben, Sprechen)
}

export const placementQuestions: PlacementItem[] = [
  // ==================== HÖREN ====================
  {
    id: "h1",
    category: "Hören",
    level: "A1",
    content: "Hallo, mein Name ist Anna. Ich komme aus Berlin.",
    question: "Woher kommt Anna?",
    options: ["Aus München", "Aus Berlin", "Aus Wien", "Aus Zürich"],
    correctAnswer: "Aus Berlin"
  },
  {
    id: "h2",
    category: "Hören",
    level: "A1",
    content: "Der Zug nach Hamburg fährt auf Gleis 7 ab.",
    question: "Auf welchem Gleis fährt der Zug ab?",
    options: ["Gleis 5", "Gleis 6", "Gleis 7", "Gleis 8"],
    correctAnswer: "Gleis 7"
  },
  {
    id: "h3",
    category: "Hören",
    level: "A1",
    content: "Ein Kilo Äpfel kostet zwei Euro fünfzig.",
    question: "Wie viel kosten die Äpfel?",
    options: ["1,50 Euro", "2,50 Euro", "3,50 Euro", "2,00 Euro"],
    correctAnswer: "2,50 Euro"
  },
  {
    id: "h4",
    category: "Hören",
    level: "A1",
    content: "Meine Telefonnummer ist null-eins-sieben-sechs, drei-vier.",
    question: "Wie lautet die Nummer?",
    options: ["0176-34", "0167-34", "0176-43", "0186-34"],
    correctAnswer: "0176-34"
  },
  {
    id: "h5",
    category: "Hören",
    level: "A2",
    content: "Wir treffen uns morgen um halb acht vor dem Kino.",
    question: "Wann treffen sie sich?",
    options: ["Um 7:30", "Um 8:30", "Um 7:00", "Um 8:00"],
    correctAnswer: "Um 7:30"
  },
  {
    id: "h6",
    category: "Hören",
    level: "A2",
    content: "Bitte vergessen Sie nicht, Ihren Regenschirm mitzunehmen. Es wird regnen.",
    question: "Was soll man mitnehmen?",
    options: ["Einen Mantel", "Einen Regenschirm", "Geld", "Einen Koffer"],
    correctAnswer: "Einen Regenschirm"
  },
  {
    id: "h7",
    category: "Hören",
    level: "A2",
    content: "Der Termin beim Arzt wurde auf Donnerstag verschoben.",
    question: "Wann ist der neue Termin?",
    options: ["Dienstag", "Mittwoch", "Donnerstag", "Freitag"],
    correctAnswer: "Donnerstag"
  },
  {
    id: "h8",
    category: "Hören",
    level: "B1",
    content: "Obwohl es sehr spät war, haben wir das Projekt noch rechtzeitig beendet.",
    question: "Was haben sie beendet?",
    options: ["Den Film", "Das Projekt", "Das Abendessen", "Das Meeting"],
    correctAnswer: "Das Projekt"
  },
  {
    id: "h9",
    category: "Hören",
    level: "B1",
    content: "Die Umweltschutzorganisation warnt vor den Folgen des Klimawandels.",
    question: "Wovor wird gewarnt?",
    options: ["Vor dem Klimawandel", "Vor dem Krieg", "Vor der Wirtschaft", "Vor dem Ozean"],
    correctAnswer: "Vor dem Klimawandel"
  },
  {
    id: "h10",
    category: "Hören",
    level: "B1",
    content: "Zusammenfassend lässt sich sagen, dass diese Methode sehr effizient ist.",
    question: "Wie ist die Methode?",
    options: ["Teuer", "Langsam", "Effizient", "Schwierig"],
    correctAnswer: "Effizient"
  },

  // ==================== LESEN ====================
  {
    id: "l1",
    category: "Lesen",
    level: "A1",
    content: "Das ist Herr Müller. Er ist Lehrer und wohnt in Köln. Er ist 40 Jahre alt.",
    question: "Was ist Herr Müller von Beruf?",
    options: ["Arzt", "Lehrer", "Verkäufer", "Mechaniker"],
    correctAnswer: "Lehrer"
  },
  {
    id: "l2",
    category: "Lesen",
    level: "A1",
    content: "Zimmer zu vermieten! 20 Quadratmeter, mit Balkon, nähe Zentrum. 400 Euro pro Monat.",
    question: "Was hat das Zimmer?",
    options: ["Einen Garten", "Einen Balkon", "Eine Garage", "Zwei Betten"],
    correctAnswer: "Einen Balkon"
  },
  {
    id: "l3",
    category: "Lesen",
    level: "A1",
    content: "Ich gehe in den Supermarkt. Ich brauche Milch, Brot und Eier.",
    question: "Was braucht die Person NICHT?",
    options: ["Milch", "Brot", "Eier", "Käse"],
    correctAnswer: "Käse"
  },
  {
    id: "l4",
    category: "Lesen",
    level: "A1",
    content: "Bitte schalte das Licht aus, wenn du gehst. Danke!",
    question: "Was soll man tun?",
    options: ["Licht einschalten", "Licht ausschalten", "Fenster schließen", "Türe zumachen"],
    correctAnswer: "Licht ausschalten"
  },
  {
    id: "l5",
    category: "Lesen",
    level: "A2",
    content: "Liebe Sarah, ich lade dich herzlich zu meiner Geburtstagsparty ein. Sie findet am Samstag um 19 Uhr statt. Dein Paul.",
    question: "Wann findet die Party statt?",
    options: ["Freitag 19 Uhr", "Samstag 19 Uhr", "Sonntag 18 Uhr", "Samstag 20 Uhr"],
    correctAnswer: "Samstag 19 Uhr"
  },
  {
    id: "l6",
    category: "Lesen",
    level: "A2",
    content: "Achtung Fahrgäste! Der ICE nach München hat voraussichtlich 20 Minuten Verspätung.",
    question: "Wie viele Minuten Verspätung hat der Zug?",
    options: ["10", "15", "20", "30"],
    correctAnswer: "20"
  },
  {
    id: "l7",
    category: "Lesen",
    level: "A2",
    content: "Dieses Medikament muss nach dem Essen eingenommen werden. Nicht für Kinder geeignet.",
    question: "Wann soll man das Medikament nehmen?",
    options: ["Vor dem Essen", "Nach dem Essen", "Morgens", "Abends"],
    correctAnswer: "Nach dem Essen"
  },
  {
    id: "l8",
    category: "Lesen",
    level: "B1",
    content: "Bewerbung als Praktikant: Sehr geehrte Damen und Herren, mit großem Interesse habe ich Ihre Anzeige gelesen...",
    question: "Als was bewirbt sich die Person?",
    options: ["Als Chef", "Als Praktikant", "Als Manager", "Als Kunde"],
    correctAnswer: "Als Praktikant"
  },
  {
    id: "l9",
    category: "Lesen",
    level: "B1",
    content: "Laut einer neuen Studie lesen Jugendliche heute weniger Bücher, nutzen aber häufiger digitale Medien.",
    question: "Was nutzen Jugendliche häufiger?",
    options: ["Bücher", "Zeitungen", "Digitale Medien", "Das Radio"],
    correctAnswer: "Digitale Medien"
  },
  {
    id: "l10",
    category: "Lesen",
    level: "B1",
    content: "Wir bedauern, Ihnen mitteilen zu müssen, dass Ihr Flug storniert wurde.",
    question: "Welche schlechte Nachricht gibt es?",
    options: ["Flugzeug ist voll", "Flug ist storniert", "Flug ist pünktlich", "Flug ist teurer"],
    correctAnswer: "Flug ist storniert"
  },

  // ==================== SCHREIBEN ====================
  // (Verification uses text length and keyword matches in the placement component)
  {
    id: "w1", category: "Schreiben", level: "A1",
    content: "Stelle dich kurz vor.", question: "Schreibe 2-3 Sätze (Name, Herkunft, Alter).", keywords: ["heisse", "bin", "komme", "aus", "jahre"]
  },
  {
    id: "w2", category: "Schreiben", level: "A1",
    content: "Was kaufst du im Supermarkt?", question: "Schreibe 1-2 Sätze.", keywords: ["brauche", "kaufe", "und", "möchte"]
  },
  {
    id: "w3", category: "Schreiben", level: "A1",
    content: "Dein Wochenende.", question: "Was machst du am Samstag?", keywords: ["gehe", "mache", "am", "samstag", "spiele"]
  },
  {
    id: "w4", category: "Schreiben", level: "A2",
    content: "Eine Entschuldigung.", question: "Schreibe, dass du leider nicht kommen kannst.", keywords: ["leider", "kann", "nicht", "kommen", "entschuldigung"]
  },
  {
    id: "w5", category: "Schreiben", level: "A2",
    content: "Einladung annehmen.", question: "Danke für die Einladung, du kommst gerne.", keywords: ["danke", "komme", "gerne", "einladung"]
  },
  {
    id: "w6", category: "Schreiben", level: "A2",
    content: "Deine Arbeit/Schule.", question: "Beschreibe kurz was du arbeitest oder lernst.", keywords: ["arbeite", "als", "lerne", "studiere", "firma"]
  },
  {
    id: "w7", category: "Schreiben", level: "B1",
    content: "Deine Meinung.", question: "Findest du, dass Handys in der Schule verboten sein sollten?", keywords: ["meine", "meinung", "finde", "dass", "sollten", "verboten"]
  },
  {
    id: "w8", category: "Schreiben", level: "B1",
    content: "Probleme im Hotel.", question: "Schreibe eine E-Mail an das Hotel, dass die Heizung kaputt ist.", keywords: ["sehr", "geehrte", "heizung", "kaputt", "funktioniert", "nicht"]
  },
  {
    id: "w9", category: "Schreiben", level: "B1",
    content: "Ein Rat.", question: "Dein Freund ist krank. Gib ihm Tipps.", keywords: ["solltest", "musst", "arzt", "trinken", "ins", "bett"]
  },
  {
    id: "w10", category: "Schreiben", level: "B1",
    content: "Urlaub.", question: "Erzähle kurz von deinem letzten Urlaub (Vergangenheit).", keywords: ["war", "bin", "gefahren", "haben", "gemacht", "urlaub"]
  },

  // ==================== SPRECHEN ====================
  // (Verification will use web speech to check strings)
  {
    id: "s1", category: "Sprechen", level: "A1",
    content: "Lies laut vor: 'Hallo'", question: "Sag 'Hallo'", keywords: ["hallo"]
  },
  {
    id: "s2", category: "Sprechen", level: "A1",
    content: "Lies laut vor: 'Guten Morgen'", question: "Sag 'Guten Morgen'", keywords: ["guten", "morgen"]
  },
  {
    id: "s3", category: "Sprechen", level: "A1",
    content: "Lies laut vor: 'Ich lerne Deutsch.'", question: "Sag den Satz.", keywords: ["ich", "lerne", "deutsch"]
  },
  {
    id: "s4", category: "Sprechen", level: "A1",
    content: "Lies laut vor: 'Wie geht es dir?'", question: "Sag den Satz.", keywords: ["wie", "geht", "es", "dir"]
  },
  {
    id: "s5", category: "Sprechen", level: "A2",
    content: "Antworte auf: 'Wie heißt du?'", question: "Sag z.B. 'Ich heiße...'", keywords: ["ich", "heiße", "bin", "name"]
  },
  {
    id: "s6", category: "Sprechen", level: "A2",
    content: "Lies laut vor: 'Entschuldigung, wo ist der Bahnhof?'", question: "Sag den Satz.", keywords: ["entschuldigung", "wo", "ist", "bahnhof"]
  },
  {
    id: "s7", category: "Sprechen", level: "A2",
    content: "Antworte auf: 'Was ist dein Hobby?'", question: "Sag z.B. 'Mein Hobby ist lesen'.", keywords: ["mein", "hobby", "ist", "spiele", "lese", "schwimme"]
  },
  {
    id: "s8", category: "Sprechen", level: "B1",
    content: "Lies laut vor: 'Ich möchte gerne einen Tisch für zwei Personen reservieren.'", question: "Sag den Satz.", keywords: ["möchte", "gerne", "tisch", "reservieren", "personen"]
  },
  {
    id: "s9", category: "Sprechen", level: "B1",
    content: "Lies laut vor: 'Könnten Sie mir bitte helfen, ich habe mich verlaufen.'", question: "Sag den Satz.", keywords: ["könnten", "bitte", "helfen", "habe", "verlaufen"]
  },
  {
    id: "s10", category: "Sprechen", level: "B1",
    content: "Antworte auf: 'Warum lernst du Deutsch?'", question: "Sag einen vollständigen Satz (z.B. 'Weil ich in Deutschland leben möchte').", keywords: ["weil", "ich", "möchte", "deutschland", "leben", "arbeiten", "lernen"]
  }
];
