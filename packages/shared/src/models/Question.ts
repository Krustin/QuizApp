/**
 * Question interface - NEW FORMAT (Phase 1 Migration)
 * Represents a single quiz question with all its metadata
 *
 * NEW FORMAT CHANGES:
 * - 3 options instead of 4 (more flexible, can support both)
 * - Numeric difficulty (1-5 scale) instead of easy/medium/hard
 * - categoryId instead of category display name
 * - Optional explanation and tags
 *
 * @property id - Unique identifier for the question (e.g., "sk_001", "sci_003")
 * @property categoryId - Category identifier (e.g., "SKURRILES_FUER_AHNUNGSLOSE_SURREAL")
 * @property question - The actual question text shown to user (in German)
 * @property options - Array of 3 or 4 answer options
 * @property correctIndex - Index of correct answer in options array (0-2 for 3 options, 0-3 for 4)
 * @property difficulty - Question difficulty level: 1 (easiest) to 5 (hardest)
 * @property explanation - Optional detailed explanation shown in encyclopedia
 * @property funFact - Optional additional interesting fact
 * @property tags - Optional array of topic tags for filtering (e.g., ["tiere", "biologie"])
 */
export interface Question {
  id: string;
  categoryId: string;
  question: string;
  options: string[]; // Support 3 or 4 options
  correctIndex: number; // 0-2 for 3 options, 0-3 for 4 options
  difficulty: 1 | 2 | 3 | 4 | 5; // 1=easiest, 5=hardest
  explanation?: string; // Optional
  funFact?: string; // Optional
  tags?: string[]; // Optional
}

/**
 * Old Question interface - DEPRECATED
 * Kept for backward compatibility during migration
 * @deprecated Use new Question interface instead
 */
export interface LegacyQuestion {
  id: string;
  question: string;
  options: string[]; // Always 4 options
  correctAnswer: number; // Index 0-3
  explanation: string; // Required
  funFact?: string;
  category: string; // Display name instead of ID
  difficulty: "easy" | "medium" | "hard"; // String enum
  tags: string[]; // Required
}

/**
 * Even older legacy format
 * @deprecated
 */
export interface LegacyQuestionV1 {
  id: string;
  category: string;
  difficulty: string;
  questionText: string;
  correctAnswer: string;
  wrongAnswers: string[];
  tldr: string;
  funFact?: string;
  source?: string;
}

// ========================================
// Helper Functions
// ========================================

/**
 * Get difficulty label in German
 * Maps numeric difficulty to display label
 */
export function getDifficultyLabel(difficulty: number): string {
  if (difficulty <= 2) return "Leicht";
  if (difficulty === 3) return "Mittel";
  return "Schwer";
}

/**
 * Get difficulty level (1-5) from old string format
 * Used for backward compatibility
 */
export function getDifficultyFromString(difficulty: "easy" | "medium" | "hard"): 1 | 2 | 3 | 4 | 5 {
  switch (difficulty) {
    case "easy": return 2;
    case "medium": return 3;
    case "hard": return 4;
    default: return 3;
  }
}

/**
 * Get old string format from difficulty level
 * Used for backward compatibility
 */
export function getStringFromDifficulty(difficulty: number): "easy" | "medium" | "hard" {
  if (difficulty <= 2) return "easy";
  if (difficulty === 3) return "medium";
  return "hard";
}

/**
 * Convert legacy question to new format
 */
export function convertLegacyQuestion(legacy: LegacyQuestion): Question {
  return {
    id: legacy.id,
    categoryId: legacy.category.toUpperCase().replace(/\s+/g, '_'),
    question: legacy.question,
    options: legacy.options,
    correctIndex: legacy.correctAnswer,
    difficulty: getDifficultyFromString(legacy.difficulty),
    explanation: legacy.explanation,
    funFact: legacy.funFact,
    tags: legacy.tags,
  };
}

/**
 * Convert new question to legacy format (for backward compatibility)
 */
export function convertToLegacyQuestion(question: Question, categoryDisplayName: string): LegacyQuestion {
  return {
    id: question.id,
    question: question.question,
    options: question.options,
    correctAnswer: question.correctIndex,
    explanation: question.explanation || "",
    funFact: question.funFact,
    category: categoryDisplayName,
    difficulty: getStringFromDifficulty(question.difficulty),
    tags: question.tags || [],
  };
}

/**
 * Validate question format
 */
export function validateQuestion(question: Question): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!question.id) errors.push("Missing id");
  if (!question.categoryId) errors.push("Missing categoryId");
  if (!question.question) errors.push("Missing question text");
  if (!question.options || question.options.length < 3 || question.options.length > 4) {
    errors.push(`Invalid options length: must be 3 or 4, got ${question.options?.length}`);
  }
  if (question.correctIndex < 0 || question.correctIndex >= (question.options?.length || 0)) {
    errors.push(`Invalid correctIndex: must be 0-${(question.options?.length || 1) - 1}, got ${question.correctIndex}`);
  }
  if (question.difficulty < 1 || question.difficulty > 5) {
    errors.push(`Invalid difficulty: must be 1-5, got ${question.difficulty}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
