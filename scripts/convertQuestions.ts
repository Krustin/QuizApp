/**
 * Question Conversion Script
 * Converts new question format to existing codebase format
 */

// New format (from your file)
type NewDifficulty = 1 | 2 | 3 | 4 | 5;

interface NewQuestion {
  id: string;
  categoryId: string;
  question: string;
  options: [string, string, string];
  correctIndex: 0 | 1 | 2;
  difficulty: NewDifficulty;
}

// Existing format (from codebase)
interface ExistingQuestion {
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

/**
 * Map difficulty 1-5 to easy/medium/hard
 */
function mapDifficulty(diff: NewDifficulty): "easy" | "medium" | "hard" {
  if (diff <= 2) return "easy";
  if (diff <= 3) return "medium";
  return "hard";
}

/**
 * Map categoryId to category display name
 */
function mapCategoryId(categoryId: string): string {
  const map: Record<string, string> = {
    "SKURRILES_FUER_AHNUNGSLOSE_SURREAL": "Skurriles Wissen",
    "GENERAL": "Allgemeinwissen",
    "WISSENSCHAFT": "Wissenschaft & Alltag",
    "GESCHICHTE": "Geschichte",
    "POPKULTUR": "Popkultur",
    "TIERWISSEN": "Tiere",
    "TECHNIK": "Technik",
  };
  return map[categoryId] || categoryId;
}

/**
 * Generate tags from question text
 */
function generateTags(question: string, categoryId: string): string[] {
  const tags: string[] = [];

  // Category-based tags
  if (categoryId.includes("SKURRILES")) {
    tags.push("skurril", "absurd");
  }

  // Content-based tags (simple keyword matching)
  const keywords = [
    { pattern: /tier|vogel|fisch|säuger|katze|hund|wal|delfin|hai|frosch/i, tag: "tiere" },
    { pattern: /pflanze|baum|blume|pilz|wald/i, tag: "pflanzen" },
    { pattern: /ozean|meer|wasser|insel/i, tag: "ozean" },
    { pattern: /geschichte|pyramide|krieg|jahr/i, tag: "geschichte" },
    { pattern: /wissenschaft|physik|biologie/i, tag: "wissenschaft" },
    { pattern: /essen|nahrung|honig|butter/i, tag: "nahrung" },
  ];

  for (const { pattern, tag } of keywords) {
    if (pattern.test(question)) {
      tags.push(tag);
    }
  }

  return tags.length > 0 ? tags : ["allgemein"];
}

/**
 * Generate explanation from question text (extract info from options)
 */
function generateExplanation(
  question: NewQuestion,
  correctOption: string
): string {
  // Extract explanation from the correct answer
  // Many answers have format: "Thing – explanation"
  const parts = correctOption.split("–");
  if (parts.length > 1) {
    return `${parts[0].trim()}: ${parts[1].trim()}`;
  }

  // Fallback: use the question and correct answer
  return `Die richtige Antwort ist: ${correctOption}`;
}

/**
 * Add a 4th plausible wrong answer
 */
function addFourthOption(
  existingOptions: [string, string, string],
  correctIndex: number,
  categoryId: string
): string[] {
  const fourthOptions: Record<string, string[]> = {
    "SKURRILES_FUER_AHNUNGSLOSE_SURREAL": [
      "Das ist eine Falle – die Frage war falsch",
      "Niemand weiß es wirklich",
      "Alle Antworten gleichzeitig",
      "Noch erforscht das die Wissenschaft",
      "Kommt auf die Perspektive an",
      "Im Paralleluniversum anders",
    ],
  };

  const pool = fourthOptions[categoryId] || fourthOptions["SKURRILES_FUER_AHNUNGSLOSE_SURREAL"];
  const randomFourth = pool[Math.floor(Math.random() * pool.length)];

  return [...existingOptions, randomFourth];
}

/**
 * Convert a new question to existing format
 */
export function convertQuestion(newQ: NewQuestion): ExistingQuestion {
  const correctOption = newQ.options[newQ.correctIndex];
  const fourOptions = addFourthOption(newQ.options, newQ.correctIndex, newQ.categoryId);

  return {
    id: newQ.id,
    question: newQ.question,
    options: fourOptions,
    correctAnswer: newQ.correctIndex, // Same index works for 4 options
    explanation: generateExplanation(newQ, correctOption),
    funFact: undefined, // Could extract from question text if needed
    category: mapCategoryId(newQ.categoryId),
    difficulty: mapDifficulty(newQ.difficulty),
    tags: generateTags(newQ.question, newQ.categoryId),
  };
}

/**
 * Convert array of questions
 */
export function convertQuestions(newQuestions: NewQuestion[]): ExistingQuestion[] {
  return newQuestions.map(convertQuestion);
}

// Example usage:
// import { questionsSkurrilSurreal } from './your-file';
// const converted = convertQuestions(questionsSkurrilSurreal);
