/**
 * Question Bank
 * Complete collection of quiz questions across all categories
 *
 * Structure based on Concept reference with improved format
 */

import type { Question } from '../../models/Question';

export const questionBank: Question[] = [
  // ========================================
  // SKURRILES WISSEN - Easy
  // ========================================
  {
    id: "skw_001",
    question: "Welches Tier kann tatsächlich rückwärts laufen?",
    options: ["Einhörner", "Kängurus", "Zeitreisende Schildkröten", "Rückwärts-Giraffen"],
    correctAnswer: 1,
    explanation: "Kängurus können aufgrund ihrer Körperstruktur und ihres schweren Schwanzes tatsächlich nicht rückwärts laufen.",
    funFact: "Deshalb ist das Känguru auch ein Symbol auf dem australischen Wappen - es steht für Fortschritt.",
    category: "Skurriles Wissen",
    difficulty: "easy",
    tags: ["tiere", "anatomie"]
  },
  {
    id: "skw_002",
    question: "Was passiert, wenn Flamingos nicht genug Krebstierchen essen?",
    options: ["Sie werden blau", "Sie verlieren ihre rosa Farbe", "Sie explodieren sanft", "Sie werden unsichtbar"],
    correctAnswer: 1,
    explanation: "Flamingos sind nur durch ihre Nahrung rosa. Ohne Krebstierchen werden sie grau-weiß.",
    funFact: "Flamingos in Zoos bekommen oft spezielle Farbstoff-Zusätze ins Futter.",
    category: "Skurriles Wissen",
    difficulty: "easy",
    tags: ["tiere", "farbe"]
  },
  {
    id: "skw_003",
    question: "Wie viele Knochen hat ein Baby mehr als ein Erwachsener?",
    options: ["42 magische Knochen", "Etwa 100 Knochen", "666 Teufelsknochen", "Genau 17 Babyknochen"],
    correctAnswer: 1,
    explanation: "Babys haben etwa 300 Knochen, Erwachsene nur 206, da viele zusammenwachsen.",
    funFact: "Der Schädel eines Babys hat 6 weiche Stellen, die sich erst nach 2 Jahren schließen.",
    category: "Skurriles Wissen",
    difficulty: "easy",
    tags: ["anatomie", "entwicklung"]
  },
  {
    id: "skw_004",
    question: "Welche Farbe hat das Blut einer Hummer?",
    options: ["Knallrot wie Liebe", "Blau wie Trauer", "Grün wie Neid", "Transparent wie Tränen"],
    correctAnswer: 1,
    explanation: "Hummer haben blaues Blut, weil sie Kupfer statt Eisen für den Sauerstofftransport nutzen.",
    funFact: "Auch Spinnen und Tintenfische haben blaues Blut - sie sind quasi Adelige des Tierreichs.",
    category: "Skurriles Wissen",
    difficulty: "easy",
    tags: ["tiere", "biologie"]
  },
  {
    id: "skw_005",
    question: "Wie lange dauert es, bis ein Tropfen Honig vom Löffel fällt?",
    options: ["3,14159 Sekunden", "Genau 7 Sekunden", "Eine kleine Ewigkeit", "Er fällt nie"],
    correctAnswer: 1,
    explanation: "Honig ist so viskos, dass ein Tropfen etwa 7 Sekunden braucht, um zu fallen.",
    funFact: "Bei 20°C ist Honig 10.000 mal zäher als Wasser.",
    category: "Skurriles Wissen",
    difficulty: "easy",
    tags: ["physik", "nahrung"]
  },
  {
    id: "skw_009",
    question: "Welcher Körperteil wächst ein Leben lang weiter?",
    options: ["Die Nase", "Die Ohren", "Die Füße", "Die Existenzkrise"],
    correctAnswer: 1,
    explanation: "Die Ohren wachsen ein Leben lang weiter, etwa 0,2mm pro Jahr.",
    funFact: "Deshalb haben alte Menschen oft so große Ohren.",
    category: "Skurriles Wissen",
    difficulty: "easy",
    tags: ["anatomie", "alter"]
  },
  {
    id: "skw_010",
    question: "Wie viele Muskeln braucht man zum Lächeln?",
    options: ["17 Muskeln", "43 Muskeln", "100 Muskeln", "Alle verfügbaren Muskeln"],
    correctAnswer: 0,
    explanation: "Zum Lächeln braucht man nur 17 Muskeln, zum Stirnrunzeln aber 43.",
    funFact: "Lächeln ist also tatsächlich weniger anstrengend als Grummeln.",
    category: "Skurriles Wissen",
    difficulty: "easy",
    tags: ["anatomie", "emotion"]
  },
  {
    id: "skw_013",
    question: "Welches Tier schläft am längsten?",
    options: ["Koala", "Faultier", "Teenager", "Mein Kollege"],
    correctAnswer: 0,
    explanation: "Koalas schlafen 22 Stunden pro Tag - mehr als jedes andere Säugetier.",
    funFact: "Sie sind nur 2 Stunden täglich wach, hauptsächlich zum Essen.",
    category: "Skurriles Wissen",
    difficulty: "easy",
    tags: ["tiere", "schlaf"]
  },

  // ========================================
  // SKURRILES WISSEN - Medium
  // ========================================
  {
    id: "skw_006",
    question: "Was ist das meist gestohlene Lebensmittel der Welt?",
    options: ["Avocados der Millennials", "Käse", "Kaviar der Reichen", "Luft aus Chipstüten"],
    correctAnswer: 1,
    explanation: "Käse wird weltweit am häufigsten gestohlen - etwa 4% aller Käse wird geklaut.",
    funFact: "Es gibt sogar eine schwarze Börse für gestohlenen Parmesan in Italien.",
    category: "Skurriles Wissen",
    difficulty: "medium",
    tags: ["kriminalität", "nahrung"]
  },
  {
    id: "skw_007",
    question: "Wie viele Sprachen sterben pro Woche aus?",
    options: ["Eine Sprache", "Fünf Sprachen", "Zehn Sprachen", "Alle außer Emoji"],
    correctAnswer: 0,
    explanation: "Alle zwei Wochen stirbt eine Sprache aus. Pro Woche verschwinden etwa 0,5 Sprachen.",
    funFact: "Von den 7000 Sprachen der Welt werden die Hälfte bis 2100 verschwunden sein.",
    category: "Skurriles Wissen",
    difficulty: "medium",
    tags: ["sprache", "kultur"]
  },
  {
    id: "skw_008",
    question: "Was wiegt das Internet?",
    options: ["So viel wie eine Erdbeere", "So viel wie ein Auto", "So viel wie ein Elefant", "So viel wie meine Existenzkrise"],
    correctAnswer: 0,
    explanation: "Das Internet wiegt etwa 50 Gramm - so viel wie eine große Erdbeere.",
    funFact: "Das Gewicht kommt von den bewegten Elektronen in allen Servern weltweit.",
    category: "Skurriles Wissen",
    difficulty: "medium",
    tags: ["technologie", "physik"]
  },
  {
    id: "skw_011",
    question: "Was ist die häufigste Todesursache bei Ameisen?",
    options: ["Überarbeitung", "Pilzinfektionen", "Herzinfarkt", "Midlife-Crisis"],
    correctAnswer: 1,
    explanation: "Parasitäre Pilze sind die häufigste Todesursache bei Ameisen.",
    funFact: "Manche Pilze übernehmen sogar die Kontrolle über das Ameisengehirn (Zombie-Ameisen).",
    category: "Skurriles Wissen",
    difficulty: "medium",
    tags: ["tiere", "pilze"]
  },
  {
    id: "skw_012",
    question: "Wie schwer ist eine Wolke?",
    options: ["Federleicht", "500.000 kg", "Schwerer als die Erde", "Emotional sehr schwer"],
    correctAnswer: 1,
    explanation: "Eine durchschnittliche Cumuluswolke wiegt etwa 500.000 Kilogramm.",
    funFact: "Sie schwebt trotzdem, weil die Wassertropfen sehr fein verteilt sind.",
    category: "Skurriles Wissen",
    difficulty: "medium",
    tags: ["wetter", "physik"]
  },
  {
    id: "skw_014",
    question: "Woraus besteht der Duft nach Regen?",
    options: ["Petrichor", "Regentropfen-Essenz", "Erdgeist", "Nostalgie"],
    correctAnswer: 0,
    explanation: "Der Regenduft heißt Petrichor und entsteht durch Öle von Pflanzen und ein Bakterium namens Actinomycetes.",
    funFact: "Menschen können Petrichor in extrem geringen Konzentrationen riechen.",
    category: "Skurriles Wissen",
    difficulty: "medium",
    tags: ["chemie", "wetter"]
  },

  // ========================================
  // WISSENSCHAFT & ALLTAG - Easy
  // ========================================
  {
    id: "wa_001",
    question: "Was passiert mit Honig nach 3000 Jahren?",
    options: ["Er verwandelt sich in Gold", "Er explodiert spektakulär", "Er bleibt essbar", "Er entwickelt Bewusstsein"],
    correctAnswer: 2,
    explanation: "Honig ist praktisch unbegrenzt haltbar. Archäologen fanden 3000 Jahre alten essbaren Honig.",
    funFact: "Der hohe Zuckergehalt und niedrige pH-Wert machen Honig zu einem natürlichen Konservierungsmittel.",
    category: "Wissenschaft & Alltag",
    difficulty: "easy",
    tags: ["nahrung", "chemie"]
  },
  {
    id: "wa_002",
    question: "Welches Material ist tatsächlich härter als Diamant?",
    options: ["Aggregated Diamond Nanorods", "Chuck Norris' Fäuste", "Gefrorene Tränen", "Superhelden-Kryptonit"],
    correctAnswer: 0,
    explanation: "Aggregierte Diamant-Nanostäbe sind etwa 11% härter als natürliche Diamanten.",
    funFact: "Sie entstehen nur unter extremem Druck, wie er im Inneren von Planeten herrscht.",
    category: "Wissenschaft & Alltag",
    difficulty: "easy",
    tags: ["materialwissenschaft", "physik"]
  },
  {
    id: "wa_003",
    question: "Wie viele Bakterien leben auf einem Quadratzentimeter Haut?",
    options: ["100.000", "1 Million", "10 Millionen", "Unendlich viele Freunde"],
    correctAnswer: 0,
    explanation: "Auf einem Quadratzentimeter Haut leben etwa 100.000 Bakterien.",
    funFact: "Die meisten davon sind harmlos oder sogar nützlich für unsere Gesundheit.",
    category: "Wissenschaft & Alltag",
    difficulty: "easy",
    tags: ["biologie", "gesundheit"]
  },
  {
    id: "wa_004",
    question: "Warum platzen Seifenblasen?",
    options: ["Weil sie traurig werden", "Wegen Verdunstung", "Weil Gravity sie hasst", "Aus purer Bosheit"],
    correctAnswer: 1,
    explanation: "Seifenblasen platzen, weil das Wasser verdunstet und die Seifenhaut zu dünn wird.",
    funFact: "Eine Seifenblase ist nur etwa 1000 mal dünner als ein menschliches Haar.",
    category: "Wissenschaft & Alltag",
    difficulty: "easy",
    tags: ["physik", "chemie"]
  },
  {
    id: "wa_010",
    question: "Was passiert mit Metallgegenständen im Mikrowellenherd?",
    options: ["Sie werden magnetisch", "Sie funken und können brennen", "Sie verschwinden", "Sie werden traurig"],
    correctAnswer: 1,
    explanation: "Metall reflektiert Mikrowellen, was zu Funkenbildung und Bränden führen kann.",
    funFact: "Manche moderne Mikrowellen haben trotzdem Metallgitter - die Löcher sind kleiner als die Wellenlänge.",
    category: "Wissenschaft & Alltag",
    difficulty: "easy",
    tags: ["physik", "sicherheit"]
  },
  {
    id: "wa_014",
    question: "Woraus besteht hauptsächlich unser Körper?",
    options: ["Kohlenstoff", "Wasser", "Träume", "Enttäuschung"],
    correctAnswer: 1,
    explanation: "Der menschliche Körper besteht zu etwa 60% aus Wasser.",
    funFact: "Babys haben sogar 75% Wasseranteil, alte Menschen nur noch 50%.",
    category: "Wissenschaft & Alltag",
    difficulty: "easy",
    tags: ["biologie", "anatomie"]
  },

  // ========================================
  // WISSENSCHAFT & ALLTAG - Medium
  // ========================================
  {
    id: "wa_005",
    question: "Bei welcher Temperatur sind Celsius und Fahrenheit gleich?",
    options: ["-40 Grad", "-273 Grad", "0 Grad", "42 Grad des Universums"],
    correctAnswer: 0,
    explanation: "-40°C entspricht genau -40°F. Es ist der einzige Punkt, wo beide Skalen gleich sind.",
    funFact: "Daniel Fahrenheit wählte seine Skala so, dass die kälteste Temperatur in seinem Labor 0°F war.",
    category: "Wissenschaft & Alltag",
    difficulty: "medium",
    tags: ["physik", "temperatur"]
  },
  {
    id: "wa_006",
    question: "Wie viele Atome sind in einem Glas Wasser?",
    options: ["Eine Milliarde", "Eine Billion", "Mehr als Sterne im Universum", "42 (wie immer)"],
    correctAnswer: 2,
    explanation: "In einem Glas Wasser sind mehr Atome als Sterne im beobachtbaren Universum.",
    funFact: "Ein Glas Wasser enthält etwa 10^25 Atome, das Universum hat 'nur' 10^23 Sterne.",
    category: "Wissenschaft & Alltag",
    difficulty: "medium",
    tags: ["chemie", "astronomie"]
  },
  {
    id: "wa_008",
    question: "Warum knallt es beim Fingerschnipsen?",
    options: ["Finger kollidieren", "Finger trifft Handballen", "Luftblasen platzen", "Die Finger sind frustriert"],
    correctAnswer: 1,
    explanation: "Das Knacken entsteht, wenn der Finger auf den Handballen trifft, nicht durch Reibung der Finger.",
    funFact: "Der Mittelfinger erreicht dabei Geschwindigkeiten von bis zu 7 m/s.",
    category: "Wissenschaft & Alltag",
    difficulty: "medium",
    tags: ["physik", "anatomie"]
  },
  {
    id: "wa_009",
    question: "Wie viele Geschmacksrichtungen kann die menschliche Zunge unterscheiden?",
    options: ["5", "Etwa 1 Million", "42", "Nur süß und bitter"],
    correctAnswer: 1,
    explanation: "Menschen können etwa 1 Million verschiedene Geschmäcker unterscheiden.",
    funFact: "Der Geruchssinn trägt zu 80% des Geschmackserlebnisses bei.",
    category: "Wissenschaft & Alltag",
    difficulty: "medium",
    tags: ["biologie", "sinne"]
  },
  {
    id: "wa_011",
    question: "Welche Temperatur hat ein Blitz?",
    options: ["1.000°C", "10.000°C", "30.000°C", "Heiß wie die Hölle"],
    correctAnswer: 2,
    explanation: "Ein Blitz erreicht etwa 30.000°C - fünfmal heißer als die Sonnenoberfläche.",
    funFact: "Ein Blitz dauert nur etwa 0,0002 Sekunden.",
    category: "Wissenschaft & Alltag",
    difficulty: "medium",
    tags: ["physik", "wetter"]
  },
  {
    id: "wa_012",
    question: "Wie viele Herzschläge hat ein Kolibri pro Minute?",
    options: ["100", "600", "1.200", "Unendlich, wie meine Liebe"],
    correctAnswer: 2,
    explanation: "Das Herz eines Kolibris schlägt bis zu 1.200 mal pro Minute.",
    funFact: "Das ist so schnell, dass es als Summen wahrnehmbar ist.",
    category: "Wissenschaft & Alltag",
    difficulty: "medium",
    tags: ["tiere", "biologie"]
  },

  // ========================================
  // WISSENSCHAFT & ALLTAG - Hard
  // ========================================
  {
    id: "wa_007",
    question: "Was ist die Avogadro-Konstante?",
    options: ["6,022 × 10²³", "Die Anzahl Guacamoles pro Avocado", "Die Geschwindigkeit des Lichts", "3,14159"],
    correctAnswer: 0,
    explanation: "Die Avogadro-Konstante ist 6,022 × 10²³ - die Anzahl Teilchen in einem Mol.",
    funFact: "Benannt nach Amadeo Avogadro, der diese Zahl aber nie selbst berechnet hat.",
    category: "Wissenschaft & Alltag",
    difficulty: "hard",
    tags: ["chemie", "physik"]
  },
  {
    id: "wa_013",
    question: "Was ist das lauteste Tier der Welt?",
    options: ["Löwe", "Blauwal", "Pistolenkrebse", "Mein Nachbar"],
    correctAnswer: 2,
    explanation: "Pistolenkrebse erzeugen mit ihren Scheren Laute von bis zu 218 Dezibel.",
    funFact: "Das ist lauter als ein Gewehrschuss und kann kleine Fische betäuben.",
    category: "Wissenschaft & Alltag",
    difficulty: "hard",
    tags: ["tiere", "physik"]
  },

  // ========================================
  // GESCHICHTE - Sample questions
  // ========================================
  {
    id: "hist_001",
    question: "Was war Napoleon Bonapartes größte Angst?",
    options: ["Katzen", "Waterloo-Bahnhof", "Kleine Männer", "Josephines Kochkunst"],
    correctAnswer: 0,
    explanation: "Napoleon hatte Ailurophobie - panische Angst vor Katzen.",
    funFact: "Ironisch für einen Mann, der sich selbst als 'Löwe' sah.",
    category: "Geschichte",
    difficulty: "easy",
    tags: ["napoleon", "phobien"]
  },
  {
    id: "hist_002",
    question: "Wie starb der römische Kaiser Claudius vermutlich?",
    options: ["An vergifteten Pilzen", "An einem Lachkrampf", "An seiner Frau", "An Langeweile im Senat"],
    correctAnswer: 0,
    explanation: "Claudius starb wahrscheinlich an vergifteten Pilzen, die ihm seine Frau Agrippina servierte.",
    funFact: "Pilze waren seine Lieblingsspeise - was seine Frau zu seinem Verhängnis machte.",
    category: "Geschichte",
    difficulty: "medium",
    tags: ["rom", "mord"]
  },

  // ========================================
  // POPKULTUR - Sample questions
  // ========================================
  {
    id: "pop_001",
    question: "Welcher Superheld wurde ursprünglich als Bösewicht konzipiert?",
    options: ["Deadpool", "The Punisher", "Venom", "Mein Ex"],
    correctAnswer: 2,
    explanation: "Venom sollte ursprünglich Spider-Mans Erzfeind bleiben und nie zum Anti-Helden werden.",
    funFact: "Der schwarze Anzug war ein Fan-Vorschlag bei einem Marvel-Wettbewerb.",
    category: "Popkultur",
    difficulty: "medium",
    tags: ["marvel", "comics"]
  },

  // ========================================
  // TIERE - Sample questions
  // ========================================
  {
    id: "tier_001",
    question: "Wie kommunizieren Elefanten über große Entfernungen?",
    options: ["Über WhatsApp", "Mit Infraschall", "Durch Stampfen", "Elefanten-Telepathie"],
    correctAnswer: 1,
    explanation: "Elefanten nutzen Infraschall - Töne unter 20 Hz, die Menschen nicht hören können.",
    funFact: "Diese Töne können über 10 Kilometer weit reichen.",
    category: "Tiere",
    difficulty: "medium",
    tags: ["elefanten", "kommunikation"]
  },

  // ========================================
  // TECHNIK - Sample questions
  // ========================================
  {
    id: "tech_001",
    question: "Was war das erste Wort, das im Internet übertragen wurde?",
    options: ["Hello", "LOGIN", "Test", "404 - Wort not found"],
    correctAnswer: 1,
    explanation: "Das erste übertragene Wort war 'LOGIN' - allerdings stürzte das System nach 'LO' ab.",
    funFact: "Das war am 29. Oktober 1969 zwischen UCLA und Stanford.",
    category: "Technik",
    difficulty: "medium",
    tags: ["internet", "geschichte"]
  },

  // ========================================
  // EXTREM ABSURD - Sample questions
  // ========================================
  {
    id: "abs_001",
    question: "Was ist laut Gesetz in Alabama verboten?",
    options: ["Elefanten Erdnüsse zu geben", "Blindes Autofahren", "Salz auf Bahngleise zu streuen", "Sinn zu machen"],
    correctAnswer: 2,
    explanation: "In Alabama ist es illegal, Salz auf Bahngleise zu streuen.",
    funFact: "Dieses Gesetz existiert tatsächlich, auch wenn niemand weiß warum.",
    category: "Extrem Absurd",
    difficulty: "hard",
    tags: ["gesetze", "alabama"]
  }
];

/**
 * Category name mapping to match UI
 */
export const CATEGORY_NAMES = {
  GENERAL: "Allgemeinwissen",
  SKURRILES: "Skurriles Wissen",
  WISSENSCHAFT: "Wissenschaft & Alltag",
  GESCHICHTE: "Geschichte",
  POPKULTUR: "Popkultur",
  TIERE: "Tiere",
  TECHNIK: "Technik",
  ABSURD: "Extrem Absurd"
} as const;
