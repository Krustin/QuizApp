/**
 * Universal Question Converter
 * Converts new 3-option format to existing 4-option codebase format
 */

// ========================================
// Type Definitions
// ========================================

// New format (from your files)
export type NewDifficulty = 1 | 2 | 3 | 4 | 5;

export interface NewQuestion {
  id: string;
  categoryId: string;
  question: string;
  options: [string, string, string];
  correctIndex: 0 | 1 | 2;
  difficulty: NewDifficulty;
}

// Existing format (codebase)
export interface ExistingQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  funFact?: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}

// ========================================
// Configuration & Mappings
// ========================================

/**
 * Category ID to display name mapping
 */
export const CATEGORY_MAPPINGS: Record<string, string> = {
  // Existing categories
  "GENERAL": "Allgemeinwissen",
  "SKURRILES": "Skurriles Wissen",
  "WISSENSCHAFT": "Wissenschaft & Alltag",
  "GESCHICHTE": "Geschichte",
  "POPKULTUR": "Popkultur",
  "TIERWISSEN": "Tiere",
  "TECHNIK": "Technik",

  // New surreal categories
  "SKURRILES_FUER_AHNUNGSLOSE_SURREAL": "Skurriles Wissen",
  "WISSENSCHAFT_FUER_SCHULABBRECHER_SURREAL": "Wissenschaft & Alltag",
};

/**
 * Creative 4th options by category theme
 * These maintain the sarcastic/absurd tone
 */
const FOURTH_OPTIONS_BY_THEME: Record<string, string[]> = {
  skurriles: [
    "Das weiß nur das Universum – und das lacht gerade",
    "Alle drei gleichzeitig in Parallelwelten",
    "Kommt drauf an, wen man nachts um 3 Uhr fragt",
    "Die Wissenschaft streitet sich noch in der Kaffeepause",
    "Schrödingers Antwort – irgendwie alles und nichts",
    "Das ändert sich je nach Mondphase",
    "Niemand weiß es wirklich, aber alle tun so",
    "Im Handbuch steht: ‚Es ist kompliziert'",
  ],
  wissenschaft: [
    "Das ist noch nicht erforscht – bitte später wiederkommen",
    "Alle Antworten sind falsch – es war eine Falle",
    "Laut Quantenmechanik: Ja, Nein und Vielleicht",
    "Das hängt von der Relativitätstheorie ab",
    "Die Physik nimmt sich hier eine Auszeit",
    "Im Labor funktioniert's – draußen Chaos",
    "Einstein hätte hier auch geraten",
    "Das gilt nur in ungeraden Jahren",
  ],
  general: [
    "Die Jury ist sich uneinig",
    "Das wechselt täglich ohne Vorwarnung",
    "Niemand weiß es, alle raten nur gut",
    "Kommt auf die Perspektive an",
    "Das ist Definitionssache – also unklar",
  ],
};

/**
 * Difficulty mapping: 1-5 scale → easy/medium/hard
 */
export function mapDifficulty(diff: NewDifficulty): "easy" | "medium" | "hard" {
  if (diff <= 2) return "easy";
  if (diff === 3) return "medium";
  return "hard"; // 4-5
}

/**
 * Get category display name from ID
 */
export function getCategoryName(categoryId: string): string {
  return CATEGORY_MAPPINGS[categoryId] || categoryId;
}

/**
 * Get category theme for 4th option generation
 */
function getCategoryTheme(categoryId: string): string {
  if (categoryId.includes("SKURRILES")) return "skurriles";
  if (categoryId.includes("WISSENSCHAFT")) return "wissenschaft";
  return "general";
}

// ========================================
// Smart Content Extraction
// ========================================

/**
 * Extract explanation from the correct answer
 * Many answers use format: "Thing – explanation"
 */
export function extractExplanation(correctOption: string, question: string): string {
  // Check if answer contains explanation separator
  const parts = correctOption.split("–");

  if (parts.length > 1) {
    const main = parts[0].trim();
    const explanation = parts.slice(1).join("–").trim();
    return `${main}. ${explanation}`;
  }

  // Fallback: create basic explanation
  return `Die richtige Antwort ist: ${correctOption}`;
}

/**
 * Generate tags from question text and category
 */
export function generateTags(question: string, categoryId: string): string[] {
  const tags: string[] = [];

  // Category-based tags
  if (categoryId.includes("SKURRILES")) {
    tags.push("skurril");
  }
  if (categoryId.includes("WISSENSCHAFT")) {
    tags.push("wissenschaft");
  }

  // Content-based keyword matching
  const keywordPatterns = [
    { pattern: /tier|vogel|fisch|säuger|katze|hund|wal|delfin|hai|frosch|pinguin|eule|garnele|kuh|oktopus|qualle|krake|seeotter|faultier|schnabeltier|elefant|giraffe|flamingo/i, tag: "tiere" },
    { pattern: /pflanze|baum|blume|pilz|wald|blatt|wurzel|banane|erdnuss|espe|drachenbaum/i, tag: "pflanzen" },
    { pattern: /ozean|meer|wasser|see|insel|bucht|atlantik|pazifik|korallenriff|strand/i, tag: "ozean" },
    { pattern: /geschichte|pyramide|krieg|kleopatra|azteken|oxford|stonehenge|pharao|antike/i, tag: "geschichte" },
    { pattern: /physik|chemie|biologie|atom|molekül|energie|kraft|masse|geschwindigkeit/i, tag: "wissenschaft" },
    { pattern: /essen|nahrung|honig|butter|melone|lebensmittel|kochen/i, tag: "nahrung" },
    { pattern: /anatomie|körper|herz|knochen|muskel|organ|gehirn|blut|zelle/i, tag: "anatomie" },
    { pattern: /weltraum|planet|stern|galaxie|mond|sonne|universum|satellit|astronaut/i, tag: "weltraum" },
    { pattern: /land|nation|staat|kontinent|europa|asien|afrika|amerika/i, tag: "geografie" },
    { pattern: /licht|farbe|spektrum|strahlung|photon|hell|dunkel/i, tag: "licht" },
    { pattern: /temperatur|kalt|heiß|wärme|grad|celsius|kelvin|gefrieren/i, tag: "temperatur" },
  ];

  for (const { pattern, tag } of keywordPatterns) {
    if (pattern.test(question) || pattern.test(correctOption)) {
      tags.push(tag);
    }
  }

  // Ensure at least one tag
  if (tags.length === 0) {
    tags.push("allgemein");
  }

  // Remove duplicates
  return [...new Set(tags)];
}

/**
 * Generate a creative 4th option that fits the tone
 */
export function generateFourthOption(
  existingOptions: [string, string, string],
  categoryId: string,
  question: string
): string {
  const theme = getCategoryTheme(categoryId);
  const optionPool = FOURTH_OPTIONS_BY_THEME[theme] || FOURTH_OPTIONS_BY_THEME.general;

  // Pick a random option (deterministic based on question)
  const seed = question.length + existingOptions.join("").length;
  const index = seed % optionPool.length;

  return optionPool[index];
}

/**
 * Try to extract a fun fact from the question or answer
 */
export function extractFunFact(question: string, options: string[]): string | undefined {
  // Look for interesting phrases that could be fun facts
  const combinedText = question + " " + options.join(" ");

  // If question contains multiple sentences, last one might be a fun fact
  const sentences = question.split(/[.!?]+/).filter(s => s.trim());
  if (sentences.length > 2) {
    return sentences[sentences.length - 1].trim();
  }

  return undefined;
}

// ========================================
// Main Conversion Function
// ========================================

/**
 * Convert a single question from new format to existing format
 */
export function convertQuestion(newQ: NewQuestion): ExistingQuestion {
  const correctOption = newQ.options[newQ.correctIndex];
  const fourthOption = generateFourthOption(newQ.options, newQ.categoryId, newQ.question);
  const allOptions = [...newQ.options, fourthOption];

  return {
    id: newQ.id,
    question: newQ.question,
    options: allOptions,
    correctAnswer: newQ.correctIndex, // Same index works since we append 4th option
    explanation: extractExplanation(correctOption, newQ.question),
    funFact: extractFunFact(newQ.question, allOptions),
    category: getCategoryName(newQ.categoryId),
    difficulty: mapDifficulty(newQ.difficulty),
    tags: generateTags(newQ.question, newQ.categoryId),
  };
}

/**
 * Convert an array of questions
 */
export function convertQuestions(newQuestions: NewQuestion[]): ExistingQuestion[] {
  return newQuestions.map(convertQuestion);
}

/**
 * Generate conversion statistics
 */
export function getConversionStats(converted: ExistingQuestion[]) {
  const stats = {
    total: converted.length,
    byDifficulty: {
      easy: converted.filter(q => q.difficulty === "easy").length,
      medium: converted.filter(q => q.difficulty === "medium").length,
      hard: converted.filter(q => q.difficulty === "hard").length,
    },
    byCategory: {} as Record<string, number>,
    avgTagsPerQuestion: 0,
  };

  // Count by category
  converted.forEach(q => {
    stats.byCategory[q.category] = (stats.byCategory[q.category] || 0) + 1;
  });

  // Calculate average tags
  const totalTags = converted.reduce((sum, q) => sum + q.tags.length, 0);
  stats.avgTagsPerQuestion = Math.round((totalTags / converted.length) * 10) / 10;

  return stats;
}

// ========================================
// Validation
// ========================================

/**
 * Validate converted questions
 */
export function validateConvertedQuestions(questions: ExistingQuestion[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  questions.forEach((q, index) => {
    // Check required fields
    if (!q.id) errors.push(`Question ${index}: Missing id`);
    if (!q.question) errors.push(`Question ${index}: Missing question text`);
    if (!q.explanation) errors.push(`Question ${index}: Missing explanation`);
    if (!q.category) errors.push(`Question ${index}: Missing category`);

    // Check options
    if (q.options.length !== 4) {
      errors.push(`Question ${q.id}: Must have exactly 4 options, has ${q.options.length}`);
    }

    // Check correctAnswer
    if (q.correctAnswer < 0 || q.correctAnswer > 3) {
      errors.push(`Question ${q.id}: correctAnswer must be 0-3, is ${q.correctAnswer}`);
    }

    // Check tags
    if (!q.tags || q.tags.length === 0) {
      errors.push(`Question ${q.id}: Must have at least one tag`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ========================================
// Export helpers
// ========================================

/**
 * Format questions as TypeScript code for questions.ts
 */
export function formatAsTypeScript(questions: ExistingQuestion[]): string {
  const formattedQuestions = questions.map(q => {
    const funFactLine = q.funFact
      ? `    funFact: "${q.funFact.replace(/"/g, '\\"')}",\n`
      : '';

    return `  {
    id: "${q.id}",
    question: "${q.question.replace(/"/g, '\\"')}",
    options: ${JSON.stringify(q.options, null, 6).replace(/\n/g, '\n    ')},
    correctAnswer: ${q.correctAnswer},
    explanation: "${q.explanation.replace(/"/g, '\\"')}",
${funFactLine}    category: "${q.category}",
    difficulty: "${q.difficulty}",
    tags: ${JSON.stringify(q.tags)}
  }`;
  });

  return formattedQuestions.join(',\n\n');
}
