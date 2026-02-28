/**
 * Bulk Question Import Script
 * Import multiple question categories at once
 *
 * Usage:
 * 1. Add your question arrays below
 * 2. Run: npx tsx scripts/bulkImportQuestions.ts
 * 3. Questions will be converted and added to the question bank
 */

import {
  convertQuestions,
  getConversionStats,
  validateConvertedQuestions,
  formatAsTypeScript,
  type NewQuestion,
  type ExistingQuestion,
} from './universalQuestionConverter';

// ========================================
// Import Your Question Arrays Here
// ========================================

// Example: Copy-paste your question arrays here
// import { questionsSkurrilSurreal } from './your-categories/skurriles_surreal';
// import { questionsScienceSurreal } from './your-categories/wissenschaft_surreal';

// Or define them inline:
const questionsSkurrilSurreal: NewQuestion[] = [
  // Your 50 Skurriles questions here
  // Copy from: skurriles_surreal.ts
];

const questionsScienceSurreal: NewQuestion[] = [
  // Your 50 Wissenschaft questions here
  // Copy from: wissenschaft_schulabbrecher_surreal.ts
];

// Add more categories as needed:
// const questionsGeschichte: NewQuestion[] = [ ... ];
// const questionsPopkultur: NewQuestion[] = [ ... ];

// ========================================
// Configuration
// ========================================

interface CategoryImport {
  name: string;
  questions: NewQuestion[];
  enabled: boolean;
}

const CATEGORIES_TO_IMPORT: CategoryImport[] = [
  {
    name: "Skurriles Wissen",
    questions: questionsSkurrilSurreal,
    enabled: true, // Set to true when questions are added
  },
  {
    name: "Wissenschaft & Alltag",
    questions: questionsScienceSurreal,
    enabled: true, // Set to true when questions are added
  },
  // Add more categories here
];

// ========================================
// Import Process
// ========================================

function main() {
  console.log("🚀 Starting Bulk Question Import\n");
  console.log("=".repeat(60));

  const allConvertedQuestions: ExistingQuestion[] = [];
  const categoryStats: Record<string, any> = {};

  // Process each category
  for (const category of CATEGORIES_TO_IMPORT) {
    if (!category.enabled) {
      console.log(`⏭️  Skipping: ${category.name} (disabled)`);
      continue;
    }

    if (category.questions.length === 0) {
      console.log(`⚠️  Skipping: ${category.name} (no questions provided)`);
      continue;
    }

    console.log(`\n📦 Processing: ${category.name}`);
    console.log(`   Questions: ${category.questions.length}`);

    // Convert questions
    const converted = convertQuestions(category.questions);

    // Validate
    const validation = validateConvertedQuestions(converted);
    if (!validation.valid) {
      console.error(`\n❌ Validation failed for ${category.name}:`);
      validation.errors.forEach(err => console.error(`   - ${err}`));
      continue;
    }

    // Get stats
    const stats = getConversionStats(converted);
    categoryStats[category.name] = stats;

    console.log(`   ✅ Converted successfully`);
    console.log(`   📊 Difficulty: ${stats.byDifficulty.easy}E / ${stats.byDifficulty.medium}M / ${stats.byDifficulty.hard}H`);
    console.log(`   🏷️  Avg tags: ${stats.avgTagsPerQuestion} per question`);

    allConvertedQuestions.push(...converted);
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("\n📊 IMPORT SUMMARY\n");
  console.log(`Total questions converted: ${allConvertedQuestions.length}`);
  console.log(`Categories processed: ${Object.keys(categoryStats).length}`);

  console.log("\n📈 Breakdown by Difficulty:");
  const totalByDifficulty = allConvertedQuestions.reduce(
    (acc, q) => {
      acc[q.difficulty]++;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0 } as Record<string, number>
  );
  console.log(`   Easy:   ${totalByDifficulty.easy} (${Math.round((totalByDifficulty.easy / allConvertedQuestions.length) * 100)}%)`);
  console.log(`   Medium: ${totalByDifficulty.medium} (${Math.round((totalByDifficulty.medium / allConvertedQuestions.length) * 100)}%)`);
  console.log(`   Hard:   ${totalByDifficulty.hard} (${Math.round((totalByDifficulty.hard / allConvertedQuestions.length) * 100)}%)`);

  console.log("\n📁 Breakdown by Category:");
  Object.entries(categoryStats).forEach(([name, stats]) => {
    console.log(`   ${name}: ${stats.total} questions`);
  });

  // Generate TypeScript output
  console.log("\n" + "=".repeat(60));
  console.log("\n📝 Generating TypeScript output...\n");

  const tsOutput = formatAsTypeScript(allConvertedQuestions);

  console.log("✅ Done! Copy the output below and paste into:");
  console.log("   packages/shared/src/data/questions/questions.ts");
  console.log("\n" + "=".repeat(60));
  console.log("\n// Add these questions to the questionBank array:\n");
  console.log(tsOutput);
  console.log("\n" + "=".repeat(60));

  // Save to file (optional)
  const fs = require('fs');
  const outputPath = './converted-questions.ts';
  fs.writeFileSync(outputPath, `// Converted Questions\n// Generated: ${new Date().toISOString()}\n\n${tsOutput}`);
  console.log(`\n💾 Also saved to: ${outputPath}`);
}

// Run the import
try {
  main();
} catch (error) {
  console.error("\n❌ Error during import:", error);
  process.exit(1);
}
