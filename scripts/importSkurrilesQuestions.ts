/**
 * Import Script for Skurriles Questions
 * Run this to add the 50 new Skurriles questions to the question bank
 */

import type { Question } from '../packages/shared/src/models/Question';

// Paste your questionsSkurrilSurreal array here
// Or import from a file

type NewDifficulty = 1 | 2 | 3 | 4 | 5;

interface NewQuestion {
  id: string;
  categoryId: string;
  question: string;
  options: [string, string, string];
  correctIndex: 0 | 1 | 2;
  difficulty: NewDifficulty;
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
 * Generate tags from question
 */
function generateTags(question: string): string[] {
  const tags: string[] = ["skurril"];

  const keywords = [
    { pattern: /tier|vogel|fisch|säuger|katze|frosch|wal|hai|delfin|pinguin|eule|garnele|kuh|krabbe|oktopus|seeotter|faultier|axolotl|schnabeltier|pangolin|qualle|krake/i, tag: "tiere" },
    { pattern: /pflanze|baum|banane|erdnuss|pilz|wald|espe|drachenbaum/i, tag: "pflanzen" },
    { pattern: /ozean|meer|wasser|see|bucht|korallenriff|atlantik/i, tag: "ozean" },
    { pattern: /geschichte|pyramide|krieg|kleopatra|azteken|oxford|stonehenge/i, tag: "geschichte" },
    { pattern: /wissenschaft|physik|biologie|chemie|anatomie/i, tag: "wissenschaft" },
    { pattern: /essen|nahrung|honig|butter|melone/i, tag: "nahrung" },
    { pattern: /anatomie|körper|herz|knochen|zehe|wirbel|hals/i, tag: "anatomie" },
    { pattern: /länder|nation|schottland|island|japan|australien|venezuela|saudi/i, tag: "geografie" },
  ];

  for (const { pattern, tag } of keywords) {
    if (pattern.test(question)) {
      tags.push(tag);
    }
  }

  return [...new Set(tags)];
}

/**
 * Extract explanation from correct answer
 */
function extractExplanation(correctOption: string): string {
  const parts = correctOption.split("–");
  if (parts.length > 1) {
    const main = parts[0].trim();
    const explanation = parts.slice(1).join("–").trim();
    return `${main}. ${explanation}`;
  }
  return correctOption;
}

/**
 * Convert your question format to codebase format
 */
function convertToCodebaseFormat(newQ: NewQuestion): Question {
  const correctOption = newQ.options[newQ.correctIndex];

  // Add a 4th humorous option to match the 4-option format
  const fourthOptions = [
    "Das weiß nur das Universum – und das schweigt",
    "Schrödingers Antwort – weder richtig noch falsch",
    "Kommt drauf an, wen man fragt",
    "Die Wissenschaft ist sich uneinig",
    "Das ändert sich täglich",
    "Beide gleichzeitig in Quantenmechanik",
  ];

  const randomFourth = fourthOptions[Math.floor(Math.random() * fourthOptions.length)];
  const allOptions = [...newQ.options, randomFourth];

  return {
    id: newQ.id,
    question: newQ.question,
    options: allOptions,
    correctAnswer: newQ.correctIndex,
    explanation: extractExplanation(correctOption),
    funFact: undefined, // Add manually if you have fun facts
    category: "Skurriles Wissen",
    difficulty: mapDifficulty(newQ.difficulty),
    tags: generateTags(newQ.question),
  };
}

// Your 50 questions go here
const newSkurrilesQuestions: NewQuestion[] = [
  // Copy-paste your questions array here
];

// Convert all questions
export const convertedQuestions: Question[] = newSkurrilesQuestions.map(convertToCodebaseFormat);

// Log summary
console.log(`✅ Converted ${convertedQuestions.length} questions`);
console.log(`Difficulty breakdown:`);
console.log(`  Easy: ${convertedQuestions.filter(q => q.difficulty === "easy").length}`);
console.log(`  Medium: ${convertedQuestions.filter(q => q.difficulty === "medium").length}`);
console.log(`  Hard: ${convertedQuestions.filter(q => q.difficulty === "hard").length}`);
