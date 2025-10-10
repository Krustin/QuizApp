---

kanban-plugin: board

---

## 📋 Backlog



## 🎯 Week 3: Infrastructure & Quiz Engine



## Day 1-2: Storage Implementation

- [ ] **Complete StorageService Implementation** 💾
	  <details>
	  <summary><b>Full CRUD Operations for All Data Types</b></summary>
	  
	  **Time Estimate:** 12-16 hours
	  
	  **Tasks:**
	  - Complete AsyncStorageImpl.ts (mobile)
	- getUserProfile() / saveUserProfile()
	- getAllSessions() / saveSession()
	- getEncyclopedia() / addEncyclopediaEntry()
	- getCategoryAccess() / updateCategoryAccess()
	  - Complete LocalStorageImpl.ts (web)
	- Same methods as mobile
	- Use IndexedDB for large data (encyclopedia)
	  - Write unit tests for storage service
	- Test save/load operations
	- Test edge cases (empty data, corrupt data)
	  - Test first-time user initialization
	- Create INITIAL_USER_PROFILE
	- Setup GENERAL category as unlocked
	  
	  **Deliverables:**
	  - Fully working storage service
	  - 10+ unit tests passing
	  - First-time user flow tested
	  
	  **Acceptance Criteria:**
	  - [ ] Can save and load user profile
	  - [ ] Can persist quiz sessions
	  - [ ] Encyclopedia entries save correctly
	  - [ ] All tests passing
	  - [ ] Works on both mobile and web
	  </details>


## Day 3-4: Zustand Stores

- [ ] **Implement All State Stores** 🗄️
	  <details>
	  <summary><b>Create 5 Zustand Stores with Persistence</b></summary>
	  
	  **Time Estimate:** 12-16 hours
	  
	  **Tasks:**
	  - **userStore.ts:**
	- UserProfile state
	- Actions: updatePoints, levelUp, updateStreak, updateAccuracy
	- Persist to storage on changes
	  - **quizStore.ts:**
	- Active QuizSession state
	- Current question index
	- Actions: startSession, answerQuestion, completeSession
	  - **encyclopediaStore.ts:**
	- EncyclopediaEntry[] state
	- Actions: addEntry, searchEntries, filterByCategory
	  - **categoryStore.ts:**
	- UserCategoryAccess[] state
	- Actions: unlockCategory, updateProgress
	  - **settingsStore.ts:**
	- App preferences (sound, vibration)
	- Actions: toggleSound, toggleVibration
	  - Implement persistence middleware
	  - Write tests for each store
	  
	  **Deliverables:**
	  - 5 working Zustand stores
	  - Persistence to AsyncStorage/LocalStorage
	  - Store tests passing
	  
	  **Acceptance Criteria:**
	  - [ ] All stores update state correctly
	  - [ ] State persists across app restarts
	  - [ ] Actions work as expected
	  - [ ] No memory leaks
	  </details>


## Day 5: Quiz Engine Core

- [ ] **QuizEngine Business Logic** 🎯
	  <details>
	  <summary><b>Question Selection and Session Management</b></summary>
	  
	  **Time Estimate:** 6-8 hours
	  
	  **Tasks:**
	  - **QuestionSelector.ts:**
	- getRandomQuestions(category, count) method
	- Fisher-Yates shuffle algorithm
	- Filter out recently asked (optional optimization)
	  - **QuizEngine.ts:**
	- Session initialization (create QuizSession object)
	- Answer validation (check if answer correct)
	- Scoring logic (10 points per correct)
	  - **StreakManager.ts:**
	- Track current streak
	- Reset streak on wrong answer
	- Calculate longest streak
	  - Write unit tests for all logic
	  - Load 100 sample questions for testing
	  
	  **Deliverables:**
	  - Working quiz engine
	  - Question selection tested
	  - Scoring and streak logic verified
	  
	  **Acceptance Criteria:**
	  - [ ] Can select 12 random questions
	  - [ ] Questions properly shuffled
	  - [ ] Answer validation works
	  - [ ] Streak tracking correct
	  - [ ] All tests passing
	  </details>


## 🎯 Week 4: Quiz UI



## Day 1-2: PlayScreen

- [ ] **Build PlayScreen UI** 🏠
	  <details>
	  <summary><b>Main Quiz Hub with Category Selection</b></summary>
	  
	  **Time Estimate:** 12-16 hours
	  
	  **Tasks:**
	  - **Tab Navigation Setup:**
	- Configure React Navigation (mobile)
	- Setup 4 tabs (Spielen, Kategorien, Lexikon, Profil)
	- Style tab bar (icons, colors, active state)
	  - **PlayScreen Components:**
	- Header (level, streak display)
	- Quick Start card (large, hero element)
	- Category grid (2 columns, locked/unlocked)
	- Implement category selection (tap to switch Quick Start)
	  - **Connect to Stores:**
	- Read userStore for level/streak
	- Read categoryStore for unlocked categories
	- Update UI based on state
	  - Match Figma design exactly
	  
	  **Deliverables:**
	  - Complete PlayScreen
	  - Tab navigation working
	  - Category selection functional
	  
	  **Acceptance Criteria:**
	  - [ ] Tab navigation works (4 tabs)
	  - [ ] PlayScreen matches design
	  - [ ] Can tap category to select
	  - [ ] Quick Start button enabled when category selected
	  - [ ] Locked categories show lock icon
	  </details>


## Day 3-5: QuizSessionScreen

- [ ] **Build QuizSessionScreen** 🎮
	  <details>
	  <summary><b>Interactive Quiz with Answer Feedback</b></summary>
	  
	  **Time Estimate:** 18-24 hours (complex!)
	  
	  **Tasks:**
	  - **Screen Layout:**
	- Progress bar (Question X/12)
	- Streak counter (top-right, animated)
	- Question text display (large, centered)
	- 4 answer buttons (A, B, C, D)
	  - **Answer Button Component:**
	- Create AnswerButton.tsx with all 5 states:
	  - Default (white bg, gray border)
	  - Pressed (scale 0.98, teal border)
	  - Correct selected (green bg, checkmark)
	  - Incorrect selected (red bg, X mark)
	  - Correct not selected (green border, checkmark)
	  - **Answer Flow Logic:**
	- User taps answer → disable all buttons
	- Show correct/incorrect feedback
	- Display Quizmaster comment
	- Show "Nächste Blamage" button
	- Tap to continue to next question
	  - **Quizmaster Comments:**
	- Load comment pool from JSON
	- Select random comment based on correct/incorrect
	- Display in speech bubble
	  - **Navigation:**
	- Loop through 12 questions
	- After Q12, navigate to Results screen
	  
	  **Deliverables:**
	  - Fully functional quiz session
	  - Answer feedback working
	  - Quizmaster comments displaying
	  
	  **Acceptance Criteria:**
	  - [ ] Can answer 12 questions sequentially
	  - [ ] Answer buttons show correct states
	  - [ ] Quizmaster comment appears after answer
	  - [ ] Progress bar updates
	  - [ ] Streak counter updates on correct answers
	  - [ ] Navigate to Results after Q12
	  </details>


## 🎯 Week 5: Quiz Completion & Results



## Day 1-2: Quiz Logic Finalization

- [ ] **Complete Quiz Scoring & Persistence** 📊
	  <details>
	  <summary><b>Finalize Scoring, Leveling, and Data Persistence</b></summary>
	  
	  **Time Estimate:** 12-16 hours
	  
	  **Tasks:**
	  - **Scoring System:**
	- Award 10 points per correct answer
	- Calculate total session score
	- Update userStore.totalPoints
	  - **Streak Tracking:**
	- Update currentStreak on each answer
	- Reset to 0 on wrong answer
	- Track longestStreak
	  - **Level-Up Calculation:**
	- Check if totalPoints >= (currentLevel * 500)
	- Increment level if threshold reached
	- Calculate pointsToNextLevel
	  - **Session Persistence:**
	- Save QuizSession to storage after completion
	- Update UserProfile stats (totalQuestionsAnswered, accuracyRate)
	- Update CategoryAccess progress
	  - Write integration tests for complete flow
	  
	  **Deliverables:**
	  - Complete scoring system
	  - Level-up logic working
	  - Data persisting correctly
	  
	  **Acceptance Criteria:**
	  - [ ] Points awarded correctly (10 per right answer)
	  - [ ] Streak resets on wrong answer
	  - [ ] Level-up triggers at 500 points
	  - [ ] Session saves to storage
	  - [ ] UserProfile updates correctly
	  </details>


## Day 3-4: Results Screen

- [ ] **Build Results Screen** 🎉
	  <details>
	  <summary><b>Display Session Results with Stats</b></summary>
	  
	  **Time Estimate:** 12-16 hours
	  
	  **Tasks:**
	  - **Results Screen Layout:**
	- Hero score display (X/12 RICHTIG)
	- Points earned (+X PUNKTE)
	- Session stats breakdown:
	  - Longest streak
	  - Accuracy percentage
	  - Level change (if leveled up)
	- Encyclopedia notification (X neue Einträge)
	  - **Level-Up Animation:**
	- Detect level-up from quizStore
	- Show confetti/celebration animation
	- Animate level number change
	- Display "Level X erreicht!" badge
	  - **Action Buttons:**
	- "Zum Lexikon" → Navigate to Encyclopedia tab
	- "Erneut versagen" → Start new session (same category)
	- Back button → Return to PlayScreen
	  - Match Figma design
	  
	  **Deliverables:**
	  - Complete Results Screen
	  - Level-up animation working
	  - Navigation actions functional
	  
	  **Acceptance Criteria:**
	  - [ ] Results screen shows correct score
	  - [ ] Stats calculated accurately
	  - [ ] Level-up shows celebration if triggered
	  - [ ] Encyclopedia notification accurate
	  - [ ] Action buttons navigate correctly
	  </details>


## Day 5: Quizmaster Comments System

- [ ] **Implement Comment Generator** 💬
	  <details>
	  <summary><b>Dynamic Quizmaster Comment Selection</b></summary>
	  
	  **Time Estimate:** 6-8 hours
	  
	  **Tasks:**
	  - **CommentGenerator.ts:**
	- Load comment pool from quizmasterComments.json
	- Implement selection algorithm:
	  - Select based on CommentType (correct/incorrect)
	  - Track last 3 shown comments (avoid repetition)
	  - Random selection within pool
	- Handle different scenarios:
	  - First correct answer (CORRECT_FIRST)
	  - Streak 5+ (CORRECT_STREAK)
	  - Easy question wrong (INCORRECT_OBVIOUS)
	  - Create quizmasterComments.json with 30 comments
	- 10 for correct answers (various intensities)
	- 15 for incorrect answers (mild, medium, brutal)
	- 5 for streak milestones
	  - Test comment variety (ensure no repeats in 12 questions)
	  
	  **Deliverables:**
	  - CommentGenerator service working
	  - 30 unique Quizmaster comments
	  - Comment selection tested
	  
	  **Acceptance Criteria:**
	  - [ ] Comments load from JSON
	  - [ ] Correct comment type selected based on scenario
	  - [ ] No comment repeats in single session
	  - [ ] Comments match sarcastic tone
	  </details>


## 🔨 In Development



## ✅ Testing

- [ ] **Integration Testing: Complete Quiz Flow** 🧪
	  <details>
	  <summary><b>End-to-End Quiz Session Testing</b></summary>
	  
	  **Time Estimate:** 4-6 hours
	  
	  **Test Scenarios:**
	  - [ ] Start quiz from PlayScreen
	  - [ ] Answer all 12 questions
	  - [ ] Mix of correct and incorrect answers
	  - [ ] Verify scoring (10 points per correct)
	  - [ ] Verify streak tracking
	  - [ ] Verify level-up triggers
	  - [ ] Verify data persists to storage
	  - [ ] Restart app, verify session saved
	  - [ ] Navigate to Results screen
	  - [ ] Verify all stats display correctly
	  
	  **Acceptance Criteria:**
	  - All test scenarios pass
	  - No crashes or errors
	  - Data persists correctly
	  </details>


## ✅ Done



## 🎨 Designer Support Tasks

- [ ] **Design Tweaks & Adjustments** 🎨
	  <details>
	  <summary><b>Visual QA and Design Refinements</b></summary>
	  
	  **Time Estimate:** 2-4 hours/week
	  
	  **Tasks:**
	  - Review implemented screens vs designs
	  - Provide feedback on spacing, colors, shadows
	  - Create missing assets (if any)
	  - Adjust designs based on technical constraints
	  - Approve implemented components
	  
	  **Deliverables:**
	  - Design approval for each screen
	  - Updated Figma files if changes needed
	  
	  **Acceptance Criteria:**
	  - [ ] All screens match approved designs
	  - [ ] Designer signs off on visual quality
	  </details>


## 📊 Phase 2 Metrics

- [ ] Complete quiz flow working (start → 12 questions → results)
- [ ] Scoring system functional (10 points per correct)
- [ ] Level-up calculation working (500 points = 1 level)
- [ ] Streak tracking accurate
- [ ] Quizmaster comments displaying correctly
- [ ] Data persisting to local storage
- [ ] All core UI screens implemented




%% kanban:settings
```
{"kanban-plugin":"board","list-collapse":[null,null,false]}
```
%%