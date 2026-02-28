# 🎯 Codebase Adaptation Plan: New Question Format

## Overview

**Goal:** Adapt the Quiz App codebase to use the new question format instead of converting questions.

**Why:** The new format is cleaner, more flexible, and matches the question data structure better.

---

## 📊 Format Comparison

### Current Format (OLD)
```typescript
interface Question {
  id: string;
  question: string;
  options: string[];              // Always 4 options
  correctAnswer: number;          // 0-3
  explanation: string;            // Required
  funFact?: string;
  category: string;               // Display name
  difficulty: "easy" | "medium" | "hard";
  tags: string[];                 // Required
}
```

### New Format (GOAL)
```typescript
interface Question {
  id: string;
  categoryId: string;             // Changed: Use ID not display name
  question: string;
  options: [string, string, string]; // Changed: 3 options (can be extended to 3-4)
  correctIndex: 0 | 1 | 2;        // Changed: Renamed from correctAnswer
  difficulty: 1 | 2 | 3 | 4 | 5;  // Changed: 1-5 scale
  // Optional fields
  explanation?: string;           // Changed: Now optional
  funFact?: string;
  tags?: string[];                // Changed: Now optional
}
```

---

## 🎯 Implementation Steps

### Phase 1: Update Data Models ✅

**File:** `packages/shared/src/models/Question.ts`

**Changes:**
1. Update `Question` interface to new format
2. Add helper functions for backwards compatibility
3. Add category mapping utilities

**Impact:**
- ⚠️ Breaking change for existing code
- ✅ All imports will need updating

---

### Phase 2: Update Core Services 🔧

#### A. QuizEngine
**File:** `packages/shared/src/services/QuizEngine.ts`

**Changes:**
- Update `validateAnswer()` to use `correctIndex`
- Update references from `category` to `categoryId`
- Handle variable option lengths (3 or 4)

**Code Changes:**
```typescript
// Before
validateAnswer(question: Question, selectedAnswerIndex: number): boolean {
  return selectedAnswerIndex === question.correctAnswer;
}

// After
validateAnswer(question: Question, selectedAnswerIndex: number): boolean {
  return selectedAnswerIndex === question.correctIndex;
}
```

#### B. Question Selector
**File:** `packages/shared/src/services/QuestionSelector.ts`

**Changes:**
- Filter by `categoryId` instead of `category` string
- Add difficulty range filters (1-5 instead of easy/medium/hard)

#### C. Level Calculator
**File:** `packages/shared/src/services/LevelCalculator.ts`

**Changes:**
- Update to work with numeric difficulty (1-5)
- May need to adjust point calculations if they depend on difficulty

---

### Phase 3: Update Category System 🏷️

#### A. Category Enums
**File:** `packages/shared/src/models/Enums.ts`

**Changes:**
```typescript
export enum QuizCategory {
  // New format - use IDs
  SKURRILES_SURREAL = 'SKURRILES_FUER_AHNUNGSLOSE_SURREAL',
  WISSENSCHAFT_SURREAL = 'WISSENSCHAFT_FUER_SCHULABBRECHER_SURREAL',
  // ... add more as needed
}

// Add mapping helper
export const CATEGORY_DISPLAY_NAMES: Record<QuizCategory, string> = {
  [QuizCategory.SKURRILES_SURREAL]: "Skurriles Wissen",
  [QuizCategory.WISSENSCHAFT_SURREAL]: "Wissenschaft & Alltag",
};
```

#### B. Category Store
**File:** `packages/shared/src/stores/categoryStore.ts`

**Changes:**
- Update to use `categoryId` instead of display names
- Add helper methods for display name lookup

---

### Phase 4: Update UI Components 🎨

#### A. Answer Buttons (Mobile)
**File:** `packages/mobile/src/components/AnswerButton.tsx`

**Changes:**
- Support dynamic number of options (3 or 4)
- Update labels: A, B, C (and D if present)

#### B. Answer Buttons (Web)
**File:** `packages/web/src/components/AnswerButton.tsx`

**Changes:**
- Same as mobile

#### C. Quiz Session Screen
**Files:**
- `packages/mobile/src/screens/QuizSessionScreen.tsx`
- `packages/web/src/screens/QuizSessionScreen.tsx`

**Changes:**
- Update to use `correctIndex` instead of `correctAnswer`
- Handle questions with 3 options
- Update difficulty display (show numeric or mapped label)

#### D. Category Cards
**Changes:**
- Use `categoryId` for navigation/selection
- Display name via helper function

#### E. Encyclopedia Entries
**Changes:**
- Handle optional `explanation` field gracefully
- Show placeholder if explanation missing

---

### Phase 5: Update Question Data 📝

#### A. Question Bank
**File:** `packages/shared/src/data/questions/questions.ts`

**Changes:**
1. Replace existing ~34 questions with new format
2. Add your 100+ questions in new format
3. Update export structure

**Structure:**
```typescript
import type { Question } from '../../models/Question';

// Import question arrays
import { questionsSkurrilSurreal } from './categories/skurriles_surreal';
import { questionsScienceSurreal } from './categories/wissenschaft_surreal';

// Combine into question bank
export const questionBank: Question[] = [
  ...questionsSkurrilSurreal,
  ...questionsScienceSurreal,
  // ... more categories
];
```

#### B. Create Category Files
**New Files:**
- `packages/shared/src/data/questions/categories/skurriles_surreal.ts`
- `packages/shared/src/data/questions/categories/wissenschaft_surreal.ts`
- ... more as needed

Each file exports its question array directly from your format.

---

### Phase 6: Update Tests 🧪

**Files:** All test files in `packages/shared/src/services/__tests__/`

**Changes:**
- Update mock questions to use new format
- Update assertions to check `correctIndex` instead of `correctAnswer`
- Update category references

---

### Phase 7: Update Documentation 📚

**Files:**
- `CLAUDE.md`
- `README.md`
- Type documentation

**Changes:**
- Update interface descriptions
- Update example code
- Update question count (from 34 to 100+)

---

## 🎯 Migration Strategy

### Option A: Big Bang Migration (Recommended)
1. Update all files in one go
2. Single PR with all changes
3. Ensures consistency
4. **Downtime:** Temporary breakage until all files updated

### Option B: Incremental with Adapter
1. Support BOTH formats temporarily
2. Create adapter layer
3. Migrate gradually
4. Remove old format when done
5. **Benefit:** No breakage, but more complex

---

## 📋 Implementation Checklist

### Phase 1: Models & Types
- [ ] Update `Question.ts` interface
- [ ] Add category mapping helpers
- [ ] Update `Enums.ts` with new categories
- [ ] Add difficulty helper functions

### Phase 2: Services
- [ ] Update `QuizEngine.ts`
- [ ] Update `QuestionSelector.ts`
- [ ] Update `LevelCalculator.ts`
- [ ] Update `StreakManager.ts`

### Phase 3: Stores
- [ ] Update `quizStore.ts`
- [ ] Update `categoryStore.ts`
- [ ] Update `encyclopediaStore.ts`

### Phase 4: UI - Mobile
- [ ] Update `AnswerButton.tsx`
- [ ] Update `QuizSessionScreen.tsx`
- [ ] Update `CategoriesScreen.tsx`
- [ ] Update `EncyclopediaScreen.tsx`

### Phase 5: UI - Web
- [ ] Update `AnswerButton.tsx`
- [ ] Update `QuizSessionScreen.tsx`
- [ ] Update `CategoriesScreen.tsx`
- [ ] Update `EncyclopediaScreen.tsx`

### Phase 6: Question Data
- [ ] Create category folder structure
- [ ] Add Skurriles questions (50)
- [ ] Add Wissenschaft questions (50)
- [ ] Add more categories as available
- [ ] Update question bank index

### Phase 7: Tests & Validation
- [ ] Update all test files
- [ ] Run test suite
- [ ] Validate all questions load
- [ ] Test quiz flow end-to-end

### Phase 8: Documentation
- [ ] Update CLAUDE.md
- [ ] Update README.md
- [ ] Add migration notes

---

## ⚠️ Breaking Changes

### API Changes
- `Question.correctAnswer` → `Question.correctIndex`
- `Question.category` → `Question.categoryId`
- `Question.difficulty: string` → `Question.difficulty: number`
- `Question.tags: string[]` → `Question.tags?: string[]`

### Component Props
- Any component receiving `Question` objects will need updates
- Category selection now uses IDs not names

---

## 🧪 Testing Strategy

### Unit Tests
- [ ] QuizEngine validates answers correctly
- [ ] Question selector filters by categoryId
- [ ] Difficulty mapping works correctly

### Integration Tests
- [ ] Full quiz session with 3-option questions
- [ ] Category filtering works
- [ ] Encyclopedia entries created properly

### Manual Testing
- [ ] Play a full quiz session
- [ ] Verify all 3 options render correctly
- [ ] Check difficulty display
- [ ] Verify category names show correctly

---

## 📦 Rollout Plan

1. **Create feature branch** ✅ (current branch)
2. **Implement Phase 1-3** (Core changes)
3. **Test core functionality**
4. **Implement Phase 4-5** (UI changes)
5. **Add question data**
6. **Full testing**
7. **Update documentation**
8. **Merge to main**
9. **Deploy**

---

## 🚀 Next Steps

**Immediate:**
1. Review this plan with stakeholders
2. Decide on migration strategy (A or B)
3. Start with Phase 1: Update Question interface

**Ready to proceed?**
Say the word and I'll start implementing! 🎯
