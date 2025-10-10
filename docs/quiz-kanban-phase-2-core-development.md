---

kanban-plugin: board

---

## 📋 Backlog

- [ ] **🎨 Web-Specific UI Polish** 🌐 #web #polish 🔽
	- Responsive layout adjustments
	- Desktop-specific interactions
	- Keyboard navigation support
	- Can be done in Phase 5

- [ ] **📱 Mobile-Specific Optimizations** 📱 #mobile #polish 🔽
	- Haptic feedback refinements
	- Gesture improvements
	- Performance optimizations
	- Can be done in Phase 5


## 🎯 Ready

### Week 3: Core Foundation

- [ ] **💾 [P2-D1] Complete Storage Implementation** 👨‍💻 Dev #dev #storage #critical ⏫ 📅 2025-10-17
	- Est: 6-8h | Actual: 0h
	- 🎯 Milestone: M5
	- Depends on: Phase 0 complete
	- Blocks: [[#P2-D2]]

	**Quick Wins:**
	- ✓ Can save/load user profile
	- ✓ Sessions persist correctly
	- ✓ Encyclopedia entries save
	- ✓ All tests passing

	<details>
	<summary>📝 Detailed Tasks</summary>

	**Storage Methods:**
	- [ ] Implement getUserProfile() with default initialization
	- [ ] Implement saveUserProfile() with validation
	- [ ] Implement getAllSessions() / saveSession()
	- [ ] Implement getEncyclopedia() / addEncyclopediaEntry()
	- [ ] Implement getCategoryAccess() / updateCategoryAccess()
	- [ ] Add getAchievements() / unlockAchievement()

	**First-Time User Flow:**
	- [ ] Create INITIAL_USER_PROFILE constant
	- [ ] Setup GENERAL category as unlocked by default
	- [ ] Initialize empty arrays for sessions/encyclopedia
	- [ ] Test first launch → profile created

	**Testing:**
	- [ ] Write unit tests for all storage methods
	- [ ] Test save/load operations
	- [ ] Test edge cases (empty data, corrupt data)
	- [ ] Test storage quota handling (web)

	</details>

- [ ] **🗄️ [P2-D2] Zustand State Stores** 👨‍💻 Dev #dev #state #critical ⏫ 📅 2025-10-18
	- Est: 8-10h | Actual: 0h
	- 🎯 Milestone: M6
	- Depends on: [[#P2-D1]]
	- Blocks: [[#P2-D3]]

	**Quick Wins:**
	- ✓ All stores update correctly
	- ✓ State persists across restarts
	- ✓ Actions work as expected

	<details>
	<summary>📝 Detailed Tasks</summary>

	**userStore.ts** (packages/mobile/src/stores/ & packages/web/src/stores/):
	- [ ] UserProfile state
	- [ ] Actions: updatePoints(), levelUp(), updateStreak()
	- [ ] Actions: updateAccuracy(), incrementSessions()
	- [ ] Computed: pointsToNextLevel(), currentAccuracy()
	- [ ] Persistence middleware to storage

	**quizStore.ts:**
	- [ ] QuizSession state (active session)
	- [ ] currentQuestionIndex state
	- [ ] Actions: startSession(), answerQuestion()
	- [ ] Actions: nextQuestion(), completeSession()
	- [ ] Computed: currentQuestion(), progress()

	**encyclopediaStore.ts:**
	- [ ] EncyclopediaEntry[] state
	- [ ] Actions: addEntry(), getEntry(id)
	- [ ] Actions: searchEntries(query)
	- [ ] Actions: filterByCategory(category)
	- [ ] Computed: totalEntries(), categoryCounts()

	**categoryStore.ts:**
	- [ ] CategoryAccess[] state
	- [ ] Actions: unlockCategory(), updateProgress()
	- [ ] Actions: getProgress(categoryId)
	- [ ] Computed: unlockedCategories(), lockedCategories()

	**settingsStore.ts:**
	- [ ] App preferences (sound, vibration, theme)
	- [ ] Actions: toggleSound(), toggleVibration()
	- [ ] Persistence to storage

	**Testing:**
	- [ ] Write tests for each store
	- [ ] Test persistence works
	- [ ] Test computed values

	</details>

- [ ] **🎯 [P2-D3] Quiz Engine Core Logic** 👨‍💻 Dev #dev #quiz-engine #critical ⏫ 📅 2025-10-19
	- Est: 6-8h | Actual: 0h
	- 🎯 Milestone: M7
	- Depends on: [[#P2-D2]]
	- Blocks: [[#P2-UI1]]

	**Quick Wins:**
	- ✓ Can select 12 random questions
	- ✓ Answer validation works
	- ✓ Streak tracking correct
	- ✓ All tests passing

	<details>
	<summary>📝 Detailed Tasks</summary>

	**QuestionSelector.ts** (packages/shared/src/gameLogic/):
	- [ ] getRandomQuestions(category, count) method
	- [ ] Fisher-Yates shuffle for answer randomization
	- [ ] Load questions from JSON files
	- [ ] Filter out recently asked (optional)

	**QuizEngine.ts** (packages/shared/src/gameLogic/):
	- [ ] initializeSession(category, questionCount) → QuizSession
	- [ ] validateAnswer(questionId, userAnswer) → boolean
	- [ ] calculateScore(session) → number
	- [ ] shuffleAnswers(question) → string[]

	**StreakManager.ts** (packages/shared/src/gameLogic/):
	- [ ] updateStreak(isCorrect, currentStreak) → number
	- [ ] calculateLongestStreak(sessions) → number
	- [ ] getStreakStatus(streak) → StreakLevel enum

	**LevelCalculator.ts** (packages/shared/src/gameLogic/):
	- [ ] calculateLevel(totalPoints) → number
	- [ ] pointsToNextLevel(currentPoints, currentLevel) → number
	- [ ] checkLevelUp(oldPoints, newPoints) → boolean

	**Sample Data:**
	- [ ] Create 20 sample questions (GENERAL category)
	- [ ] Add to packages/shared/src/data/questions/general-sample.json

	**Testing:**
	- [ ] Test question selection (randomness, count)
	- [ ] Test answer validation
	- [ ] Test streak logic
	- [ ] Test level calculations

	</details>


## 🔨 In Progress

### Week 4: Quiz UI Implementation

- [ ] **🏠 [P2-UI1] PlayScreen Implementation** 👨‍💻 Dev #dev #ui #critical ⏫ 📅 2025-10-20
	- Est: 10-12h | Actual: 0h
	- 🎯 Milestone: M8
	- Depends on: [[#P2-D3]], Design components ready
	- Blocks: [[#P2-UI2]]

	**Quick Wins:**
	- ✓ Tab navigation functional
	- ✓ PlayScreen matches design
	- ✓ Can select category
	- ✓ Quick Start button works

	<details>
	<summary>📝 Detailed Tasks</summary>

	**Mobile (packages/mobile/src/screens/PlayScreen.tsx):**
	- [ ] Replace placeholder with real implementation
	- [ ] Header component (level, streak display)
	- [ ] Quick Start card (hero CTA)
	- [ ] Category selection (default GENERAL)
	- [ ] Connect to userStore (level, streak)
	- [ ] Connect to categoryStore (unlocked categories)
	- [ ] Handle "Quiz Starten" tap → navigate to QuizSession

	**Web (packages/web/src/pages/PlayPage.tsx):**
	- [ ] Same functionality as mobile
	- [ ] Responsive layout (desktop/tablet/mobile)
	- [ ] Use Tailwind CSS for styling

	**Components to Create:**
	- [ ] UserStatsHeader (level + streak display)
	- [ ] QuickStartCard (large CTA button)
	- [ ] CategorySelector (grid of category cards)

	**Navigation:**
	- [ ] Wire up "Quiz Starten" → QuizSessionScreen
	- [ ] Pass selected category via route params

	</details>

- [ ] **🎮 [P2-UI2] QuizSessionScreen - Part 1** 👨‍💻 Dev #dev #ui #critical ⏫ 📅 2025-10-21
	- Est: 12-14h | Actual: 0h
	- 🎯 Milestone: M9
	- Depends on: [[#P2-UI1]]
	- Blocks: [[#P2-UI3]]

	**Quick Wins:**
	- ✓ Questions display correctly
	- ✓ Answer buttons work
	- ✓ Progress bar updates

	<details>
	<summary>📝 Detailed Tasks</summary>

	**Screen Layout:**
	- [ ] Progress bar (Question X/12) at top
	- [ ] Streak counter (top-right, animated)
	- [ ] Question text display (large, centered)
	- [ ] 4 answer buttons (A, B, C, D)

	**AnswerButton Component** (mobile & web):
	- [ ] Create AnswerButton.tsx with 5 states:
		- Default (white bg, gray border)
		- Pressed (scale 0.98, teal border)
		- Correct selected (green bg, checkmark icon)
		- Incorrect selected (red bg, X icon)
		- Correct not selected (green border, checkmark)
	- [ ] Smooth state transitions (100ms)
	- [ ] Touch feedback (mobile) / hover (web)

	**Quiz Logic Integration:**
	- [ ] Load current question from quizStore
	- [ ] Shuffle answers on question load
	- [ ] Handle answer tap → call quizStore.answerQuestion()
	- [ ] Disable buttons after answer selected
	- [ ] Update progress bar
	- [ ] Update streak counter

	</details>

- [ ] **🎮 [P2-UI3] QuizSessionScreen - Part 2** 👨‍💻 Dev #dev #ui #critical ⏫ 📅 2025-10-22
	- Est: 10-12h | Actual: 0h
	- 🎯 Milestone: M10
	- Depends on: [[#P2-UI2]]
	- Blocks: [[#P2-UI4]]

	**Quick Wins:**
	- ✓ Quizmaster comments display
	- ✓ "Next" button appears
	- ✓ Navigation to next question works

	<details>
	<summary>📝 Detailed Tasks</summary>

	**Feedback Flow:**
	- [ ] After answer → show correct/incorrect state
	- [ ] Display Quizmaster comment (speech bubble)
	- [ ] Show "Nächste Blamage" button
	- [ ] Tap button → next question OR results (if Q12)

	**QuizmasterComment Component:**
	- [ ] Speech bubble design (pointing to Quizmaster avatar)
	- [ ] Fade-in animation (200ms)
	- [ ] Comment text from CommentGenerator

	**CommentGenerator Service** (packages/shared/src/services/quizmaster/):
	- [ ] Create CommentGenerator.ts
	- [ ] Load comments from quizmasterComments.json
	- [ ] selectComment(isCorrect, streak, difficulty) → string
	- [ ] Track last 3 comments (avoid repeats)
	- [ ] Create quizmasterComments.json with 30 comments

	**Navigation:**
	- [ ] Loop through 12 questions
	- [ ] After Q12 → navigate to Results screen

	</details>


## Week 5: Quiz Completion & Results

- [ ] **📊 [P2-D4] Scoring & Persistence** 👨‍💻 Dev #dev #logic #critical ⏫ 📅 2025-10-24
	- Est: 8-10h | Actual: 0h
	- 🎯 Milestone: M11
	- Depends on: [[#P2-UI3]]
	- Blocks: [[#P2-UI4]]

	**Quick Wins:**
	- ✓ Points awarded correctly
	- ✓ Level-up triggers at 500pts
	- ✓ Session saves to storage

	<details>
	<summary>📝 Detailed Tasks</summary>

	**Scoring System:**
	- [ ] Award 10 points per correct answer
	- [ ] Calculate totalScore for session
	- [ ] Update userStore.totalPoints

	**Streak Tracking:**
	- [ ] Update currentStreak on each answer
	- [ ] Reset to 0 on wrong answer
	- [ ] Update longestStreak if new record

	**Level-Up Logic:**
	- [ ] Check if totalPoints >= (currentLevel * 500)
	- [ ] Call userStore.levelUp() if threshold reached
	- [ ] Set levelUpTriggered flag for Results screen

	**Session Persistence:**
	- [ ] Call quizStore.completeSession()
	- [ ] Save QuizSession to storage
	- [ ] Update UserProfile stats (questionsAnswered, correctAnswers)
	- [ ] Update CategoryAccess progress

	**Encyclopedia Auto-Population:**
	- [ ] For each correct answer → create EncyclopediaEntry
	- [ ] Check if entry already exists (by questionId)
	- [ ] Call encyclopediaStore.addEntry()
	- [ ] Count new entries for Results screen

	**Testing:**
	- [ ] Integration test: complete quiz flow
	- [ ] Verify points calculation
	- [ ] Verify level-up trigger
	- [ ] Verify data persistence

	</details>

- [ ] **🎉 [P2-UI4] Results Screen** 👨‍💻 Dev #dev #ui #critical ⏫ 📅 2025-10-25
	- Est: 10-12h | Actual: 0h
	- 🎯 Milestone: M12
	- Depends on: [[#P2-D4]]

	**Quick Wins:**
	- ✓ Results display correctly
	- ✓ Level-up animation shows
	- ✓ Navigation buttons work

	<details>
	<summary>📝 Detailed Tasks</summary>

	**Results Screen Layout:**
	- [ ] Hero score display (X/12 RICHTIG)
	- [ ] Points earned (+X PUNKTE)
	- [ ] Session stats:
		- Longest streak in session
		- Accuracy percentage
		- Time taken (optional)
	- [ ] Encyclopedia notification (X neue Einträge)

	**Level-Up Detection:**
	- [ ] Check if levelUpTriggered from quizStore
	- [ ] Show celebration animation (confetti)
	- [ ] Animate level number change
	- [ ] Display "Level X erreicht!" badge

	**Action Buttons:**
	- [ ] "Zum Lexikon" → Navigate to Encyclopedia tab
	- [ ] "Erneut versagen" → Start new session (same category)
	- [ ] Back button → Return to PlayScreen

	**Animations:**
	- [ ] Score count-up animation (0 → final score)
	- [ ] Stats fade-in (staggered)
	- [ ] Confetti effect for level-up (mobile: Lottie, web: CSS)

	</details>

- [ ] **💬 [P2-D5] Quizmaster Comment System** 👨‍💻 Dev #dev #content 🔼 📅 2025-10-26
	- Est: 4-6h | Actual: 0h
	- 🎯 Milestone: M13
	- Depends on: [[#P2-UI3]]

	**Quick Wins:**
	- ✓ 30 unique comments created
	- ✓ Comment selection works
	- ✓ No repeats in session

	<details>
	<summary>📝 Detailed Tasks</summary>

	**quizmasterComments.json** (packages/shared/src/data/):
	- [ ] 10 comments for correct answers:
		- 3 mild (sarcastic): "Glück gehabt..."
		- 4 medium: "Richtig. Erstaunlich..."
		- 3 streak-specific: "Zufall kann das nicht sein..."
	- [ ] 15 comments for incorrect answers:
		- 5 mild: "Erwartbar falsch..."
		- 7 medium (mocking): "Natürlich falsch..."
		- 3 brutal (savage): "Das wussten schon Grundschüler..."
	- [ ] 5 special comments:
		- First correct answer
		- Easy question wrong
		- Hard question correct
		- Perfect streak (12/12)

	**CommentGenerator.ts:**
	- [ ] Load comments from JSON
	- [ ] selectComment(scenario: CommentScenario) → string
	- [ ] Track last 3 shown comments
	- [ ] Random selection within filtered pool
	- [ ] Handle edge cases (not enough comments)

	**Comment Scenarios:**
	- [ ] Define CommentScenario enum
	- [ ] Map answer context to scenario
	- [ ] Test comment variety

	</details>


## 🧪 Testing

- [ ] **🧪 [P2-T1] Integration Tests** 👨‍💻 Dev #dev #testing 🔼 📅 2025-10-27
	- Est: 4-6h | Actual: 0h
	- 🎯 Milestone: M14

	<details>
	<summary>📝 Test Scenarios</summary>

	**Complete Quiz Flow:**
	- [ ] Start quiz from PlayScreen
	- [ ] Answer all 12 questions (mix correct/incorrect)
	- [ ] Verify scoring (10 points per correct)
	- [ ] Verify streak tracking
	- [ ] Verify level-up triggers correctly
	- [ ] Verify encyclopedia entries created
	- [ ] Navigate to Results screen
	- [ ] Verify all stats display correctly
	- [ ] Restart app → verify session persisted

	**Edge Cases:**
	- [ ] All answers correct (12/12)
	- [ ] All answers wrong (0/12)
	- [ ] Level-up during session
	- [ ] First quiz ever (new user)
	- [ ] Locked category (should not start)

	**Platform Testing:**
	- [ ] Run on iOS simulator
	- [ ] Run on Android emulator
	- [ ] Run on web browser
	- [ ] Verify consistent behavior

	</details>


## 👀 Review

- [ ] **👀 [P2-R1] Design QA** 👨‍🎨 Design #design #review 🔼 📅 2025-10-27
	- Est: 2-4h | Actual: 0h

	<details>
	<summary>📝 Review Checklist</summary>

	- [ ] PlayScreen matches Figma design
	- [ ] QuizSessionScreen matches Figma design
	- [ ] Results screen matches Figma design
	- [ ] AnswerButton states correct
	- [ ] Colors match design system
	- [ ] Shadows match spec
	- [ ] Spacing/padding correct
	- [ ] Typography correct
	- [ ] Animations smooth
	- [ ] Provide feedback & approval

	</details>


## ✅ Done

(Tasks will move here as they complete)


## 📊 Phase 2 Success Metrics

**Must-Have by End of Phase 2:**
- [ ] Complete quiz flow: PlayScreen → 12 questions → Results
- [ ] Scoring system: 10 points per correct answer
- [ ] Level-up calculation: 500 points = 1 level
- [ ] Streak tracking: increment on correct, reset on wrong
- [ ] 30 Quizmaster comments displaying correctly
- [ ] Data persisting to local storage (AsyncStorage/LocalStorage)
- [ ] Encyclopedia auto-populating on correct answers
- [ ] All core UI screens implemented (Play, Quiz, Results)
- [ ] Works on both mobile (iOS/Android) and web
- [ ] No critical bugs


## 🎯 Phase 2 Exit Criteria

**Before moving to Phase 3:**
1. User can complete a full quiz session (12 questions)
2. Points are awarded and level-up works
3. Quizmaster comments display based on answers
4. Encyclopedia entries are created automatically
5. Results screen shows accurate stats
6. Data persists across app restarts
7. All tests passing
8. Designer approves UI implementation
9. No blocking bugs


## 🔗 Dependencies & Blockers

**Prerequisites:**
- Phase 0 complete (✅ D1, D2, D3 done, ⏳ D4, D5 pending)
- Phase 1 design complete (🚧 Blocked - waiting for designer)
- Design components exported from Figma
- 30 Quizmaster comments written
- 20 sample questions created

**Cross-Team Dependencies:**
- Designer approval for UI implementation
- Designer provides missing assets (if any)
- Developer implements based on approved designs


## 💡 Notes for Phase 2

### Key Risks:
1. **Quiz UI Complexity**: QuizSessionScreen has many states (question, answer feedback, next button, animations). Plan for 2 days instead of 1.

2. **State Management**: Ensure Zustand stores are set up correctly first. Bad architecture here will slow everything down.

3. **Platform Differences**: Shadow rendering differs (iOS vs Android vs Web). Test early on all platforms.

4. **Comment Variety**: 30 comments might not feel diverse enough. Consider 50+ if time allows.

### Optimization Opportunities:
- Use React.memo() for AnswerButton to prevent unnecessary re-renders
- Lazy load encyclopedia entries (don't load all at once)
- Consider virtualized lists for categories if many categories in future

### Developer Notes:
- Implement mobile first, then adapt to web
- Reuse components between mobile and web where possible
- Keep business logic in shared package
- UI components in platform-specific packages


%% kanban:settings
```
{"kanban-plugin":"board","list-collapse":[false,false,false,false,false,false]}
```
%%
