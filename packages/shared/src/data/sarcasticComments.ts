/**
 * Sarcastic comments for the Quizmaster
 * Used to provide humorous feedback after answers
 * Reference: Concept/Absurd Quiz App Concept/src/data/questions.ts
 */

export const sarcasticComments = {
  correct: [
    "Oh, wie überraschend. Du kannst tatsächlich denken.",
    "Glückstreffer oder echtes Wissen? Wir werden es nie erfahren.",
    "Beeindruckend. Fast so wie ein funktionierender Verstand.",
    "Nicht schlecht. Auch ein blindes Huhn findet mal ein Korn.",
    "Wow. Und ich dachte, du rätst nur.",
    "Richtig. Aber lass dich nicht davon täuschen.",
    "Korrekt. Vermutlich Zufall.",
    "Stimmt. Selbst die Uhr geht zweimal am Tag richtig.",
    "Ja, richtig. Auch Glück ist eine Form von Intelligenz.",
    "Treffer. Fast so, als hättest du es gewusst.",
    "Korrekt. Der Affe mit der Schreibmaschine ist stolz.",
    "Richtig. Statistisch war das überfällig.",
    "Bingo. Selbst ein kaputter Kompass zeigt mal nach Norden.",
    "Ja. Sogar Zufallsgeneratoren haben ihre Momente.",
    "Stimmt. Und ich dachte, du wärst nur hier, um Zeit zu verschwenden."
  ],
  incorrect: [
    "Autsch. Das tat sogar mir weh.",
    "Und ich dachte, meine Witze wären schlecht...",
    "Nächstes Mal einfach würfeln. Kann nicht schlechter werden.",
    "Daneben. Wie dein Leben vermutlich auch.",
    "Falsch. Überraschung des Jahrtausends.",
    "Nein. Aber schön, dass du es versucht hast.",
    "Leider nein. Die Realität ist grausam, nicht wahr?",
    "Verfehlt. Wie ein Sturm im Wasserglas.",
    "Nope. Aber Träume darf man ja haben.",
    "Falsch. Einstein rollt sich im Grab um.",
    "Daneben. Selbst ein Dartpfeil hätte besser getroffen.",
    "Nein. Das war schmerzhafter als ein Zahnarztbesuch.",
    "Verfehlt. Wie ein Pingpong-Ball im Orkansturm.",
    "Falsch. Aber Unwissen ist auch eine Art Wissen.",
    "Nope. Dafür bekommst du den Teilnahme-Preis.",
    "Daneben. Ich spüre, wie mein IQ sinkt.",
    "Leider falsch. Aber du gibst nicht auf, das ist... süß.",
    "Nein. Das war wie Karate mit Nudeln."
  ]
} as const;

/**
 * Get a random sarcastic comment based on answer correctness
 * @param isCorrect - Whether the user's answer was correct
 * @returns Random sarcastic comment string
 */
export const getSarcasticComment = (isCorrect: boolean): string => {
  const comments = isCorrect ? sarcasticComments.correct : sarcasticComments.incorrect;
  return comments[Math.floor(Math.random() * comments.length)];
};
