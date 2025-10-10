# Phase 3 - Question Format Migration & Concept Alignment

**Status**: 🚧 IN PROGRESS
**Started**: 2025-10-10
**Goal**: Migrate to Concept question format and align UI with reference design

---

## 🎯 Objectives

1. ✅ **Migrate Question Format** - Move from string-based to index-based answers
2. ✅ **Add Quality Questions** - Import 38 high-quality questions from Concept
3. ⚠️ **Update Services** - Adapt QuizEngine and QuestionSelector (DONE, tests pending)
4. 🔄 **Fix Tests** - Update all test files to use new format (IN PROGRESS)
5. ⏳ **Update UI Components** - Make screens match Concept layout exactly (TODO)
6. ⏳ **Add More Questions** - Expand to 100+ questions (TODO)

---

## ✅ Completed Work

### 1. Question Model Migration

**File**: `packages/shared/src/models/Question.ts`

**Old Format:**
```typescript
interface Question {
  questionText: string;
  correctAnswer: string;
  wrongAnswers: string[]; // 3 wrong answers
  tldr: string;
  // ...
}
```

**New Format:**
```typescript
interface Question {
  question: string;
  options: string[]; // 4 options (A, B, C, D)
  correctAnswer: number; // Index 0-3
  explanation: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  // ...
}
```

**Why Better:**
- Matches UI perfectly (A/B/C/D buttons)
- No need to shuffle answers separately
- Index-based validation is simpler
- Tags enable advanced filtering

### 2. Question Bank Created

**File**: `packages/shared/src/data/questions/questions.ts`

**Statistics:**
- **38 questions** migrated from Concept
- **Categories**:
  - Skurriles Wissen: 14 questions (8 easy, 6 medium)
  - Wissenschaft & Alltag: 14 questions (6 easy, 6 medium, 2 hard)
  - Geschichte: 2 questions
  - Popkultur: 1 question
  - Tiere: 1 question
  - Technik: 1 question
  - Extrem Absurd: 1 question

**Quality Features:**
- ✅ All questions in German
- ✅ Humorous/sarcastic answer options
- ✅ Detailed explanations
- ✅ Fun facts included
- ✅ Tagged for filtering

**Example Question:**
```typescript
{
  id: "skw_001",
  question: "Welches Tier kann tatsächlich rückwärts laufen?",
  options: [
    "Einhörner",
    "Kängurus", // correct
    "Zeitreisende Schildkröten",
    "Rückwärts-Giraffen"
  ],
  correctAnswer: 1,
  explanation: "Kängurus können aufgrund ihrer Körperstruktur...",
  funFact: "Deshalb ist das Känguru auch ein Symbol...",
  category: "Skurriles Wissen",
  difficulty: "easy",
  tags: ["tiere", "anatomie"]
}
```

### 3. Helper Functions Added

**File**: `packages/shared/src/data/questions/helpers.ts`

**Functions:**
- `getQuestionsByCategory(category, limit, excludeIds)`
  - Smart difficulty mixing: 50% easy, 30% medium, 20% hard
  - Automatic fallback if not enough questions

- `getRandomQuestions(limit, excludeIds)`
  - Get random questions from all categories

- `getQuestionsByDifficulty(difficulty, limit)`
  - Filter by specific difficulty level

- `getQuestionsByTags(tags, limit)`
  - Advanced tag-based filtering

- `shuffleQuestionOptions(question)`
  - Randomize option order for each session

- `getAllCategories()` / `getCategoryStats()`
  - Utility functions for category management

### 4. Service Updates

#### QuizEngine Updated

**File**: `packages/shared/src/services/QuizEngine.ts`

**Changes:**
```typescript
// OLD
validateAnswer(question: Question, selectedAnswer: string): boolean

// NEW
validateAnswer(question: Question, selectedAnswerIndex: number): boolean
```

**Benefits:**
- Simpler validation (index === index)
- No string comparison edge cases
- Matches UI button indices perfectly

#### QuestionSelector Updated

**File**: `packages/shared/src/services/QuestionSelector.ts`

**Changes:**
- Now uses `getQuestionsByCategory()` from helpers
- Automatic difficulty distribution
- Shuffles options for each question
- Maps QuizCategory enum to category names

**Removed:**
- `shuffleAnswers()` method (no longer needed with new format)

### 5. Backward Compatibility

**Legacy Support:**
- Added `LegacyQuestion` interface
- Old `questionLoader.ts` marked as deprecated
- Gradual migration possible

---

## ⚠️ Known Issues

### TypeScript Errors (22 errors)

**Test Files Need Updating:**

1. **QuizEngine.test.ts** (10 errors)
   - Mock questions use old format
   - validateAnswer calls use strings instead of indices
   - recordAnswer calls use strings instead of indices

2. **QuestionSelector.test.ts** (4 errors)
   - Tests call `shuffleAnswers()` which no longer exists
   - Mock questions use old format

3. **quizStore.test.ts** (3 errors)
   - Mock questions use old DifficultyLevel enum
   - Uses string correctAnswer instead of number

**Files:**
```
src/services/__tests__/QuizEngine.test.ts - 10 errors
src/services/__tests__/QuestionSelector.test.ts - 4 errors
src/stores/__tests__/quizStore.test.ts - 3 errors
```

---

## 🔄 Next Steps

### Immediate (Required for Build)

**Priority 1: Fix Test Files**
- [ ] Update `QuizEngine.test.ts` mock questions to new format
- [ ] Change validateAnswer test calls from strings to indices
- [ ] Update recordAnswer test calls
- [ ] Remove shuffleAnswers tests from QuestionSelector
- [ ] Update quizStore.test.ts mocks

**Estimated Time**: 30-45 minutes

### Phase 3 Remaining Work

**Priority 2: Update UI Components**
Goal: Match Concept layout exactly

**Mobile Components to Update:**
- [ ] `QuizSessionScreen.tsx` - Use question.options directly, pass indices
- [ ] `ResultsScreen.tsx` - Update to show correct option text
- [ ] `QuizOption.tsx` - Accept index instead of text
- [ ] Update any other components using questions

**Web Components to Update:**
- [ ] Same as mobile (parallel structure)

**Estimated Time**: 1-2 hours

**Priority 3: Expand Question Bank**
- [ ] Add more "Skurriles Wissen" questions (target: 50)
- [ ] Add more "Wissenschaft & Alltag" questions (target: 50)
- [ ] Fill out other categories (20+ each)
- [ ] Target: 200+ total questions

**Estimated Time**: 4-6 hours (content creation)

---

## 📊 Progress Metrics

### Questions
- ✅ Format migrated
- ✅ 38 questions added
- ⏳ Target: 200+ questions (19% complete)

### Services
- ✅ QuizEngine updated
- ✅ QuestionSelector updated
- ⚠️ Tests failing (needs fixes)

### UI Components
- ⏳ Not started
- Mobile screens need updates
- Web screens need updates

### Overall Phase 3
- **Completed**: 40%
- **In Progress**: 20%
- **Remaining**: 40%

---

## 🎨 Concept Alignment Checklist

### Question Format
- [x] Index-based options (0-3)
- [x] 4 options per question
- [x] Humorous German options
- [x] Explanation + funFact
- [x] Tags for filtering
- [x] Difficulty levels

### Helper Functions
- [x] getQuestionsByCategory with smart mixing
- [x] Shuffle functionality
- [x] Exclude recently asked
- [x] Category stats

### UI Layout (TODO)
- [ ] QuizSession uses option indices
- [ ] Results shows correct explanations
- [ ] Options labeled A, B, C, D
- [ ] Sarcastic comments integrated

---

## 🔧 How to Continue

### Option A: Fix Tests First (Recommended)
**Why**: Ensures code quality, catches regressions
**Command**: Work through test files one by one
**Time**: 30-45 minutes

### Option B: Update UI Components
**Why**: See the new format working visually
**Risk**: No test coverage during development
**Time**: 1-2 hours

### Option C: Add More Questions
**Why**: Content is key for user engagement
**Note**: Can be done in parallel with tests
**Time**: 4-6 hours

---

## 💡 Recommendations

1. **Fix tests first** - Ensures everything works correctly
2. **Update one UI component** - Verify new format works in practice
3. **Add 20 more questions** - Get to 60 total (enough for testing)
4. **Test end-to-end** - Run app, play quiz, verify flow
5. **Expand question bank** - Content creation can happen incrementally

---

## 📝 Commands

### Build (Currently Failing)
```bash
cd packages/shared
npm run build
# 22 TypeScript errors from tests
```

### Run Tests (Currently Failing)
```bash
npm test
# QuizEngine, QuestionSelector, quizStore tests failing
```

### Once Tests Fixed
```bash
npm run build  # Should pass
npm test       # Should pass
```

---

## 🎉 Achievements So Far

- ✅ **38 high-quality questions** with humor and depth
- ✅ **Better question format** that matches UI perfectly
- ✅ **Smart helper functions** with difficulty distribution
- ✅ **Updated core services** to use new format
- ✅ **Backward compatibility** for gradual migration

**This is major progress!** The foundation for Phase 3 is solid. Once tests are fixed, the new format will be fully operational.

---

_Last Updated: 2025-10-10_
_Next Review: After test fixes complete_
