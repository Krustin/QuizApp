/**
 * QuizmasterService - Context-aware sarcastic comment generator
 *
 * Generates German sarcastic comments based on:
 * - Answer correctness
 * - Current streak
 * - Question difficulty
 * - Score performance
 */

import type { DifficultyLevel } from '../models/Enums';

export enum CommentIntensity {
  MILD = 'mild',
  MEDIUM = 'medium',
  BRUTAL = 'brutal',
}

export interface CommentContext {
  isCorrect: boolean;
  currentStreak: number;
  difficulty: DifficultyLevel;
  scorePercentage: number; // 0-100
}

/**
 * Mild comments - Gentle sarcasm
 */
const MILD_CORRECT = [
  'Oh, wie überraschend. Du kannst tatsächlich denken.',
  'Glückstreffer oder echtes Wissen? Wir werden es nie erfahren.',
  'Nicht schlecht. Auch ein blindes Huhn findet mal ein Korn.',
  'Richtig. Aber lass dich nicht davon täuschen.',
  'Korrekt. Vermutlich Zufall.',
  'Stimmt. Selbst die Uhr geht zweimal am Tag richtig.',
  'Ja, richtig. Auch Glück ist eine Form von Intelligenz.',
  'Treffer. Fast so, als hättest du es gewusst.',
  'Bingo. Selbst ein kaputter Kompass zeigt mal nach Norden.',
  'Ja. Sogar Zufallsgeneratoren haben ihre Momente.',
  'Stimmt. Und ich dachte, du wärst nur hier, um Zeit zu verschwenden.',
  'Richtig geraten. Ein Affenpuzzle hätte auch funktioniert.',
  'Korrekt. Deine Eltern wären fast stolz.',
  'Wow, tatsächlich richtig. Die Wunder hören nie auf.',
  'Genau. Auch eine kaputte Uhr zeigt zweimal richtig.',
];

const MILD_INCORRECT = [
  'Autsch. Das tat sogar mir weh.',
  'Und ich dachte, meine Witze wären schlecht...',
  'Nächstes Mal einfach würfeln. Kann nicht schlechter werden.',
  'Nein. Aber schön, dass du es versucht hast.',
  'Leider nein. Die Realität ist grausam, nicht wahr?',
  'Nope. Aber Träume darf man ja haben.',
  'Daneben. Selbst ein Dartpfeil hätte besser getroffen.',
  'Verfehlt. Wie ein Pingpong-Ball im Orkansturm.',
  'Falsch. Aber Unwissen ist auch eine Art Wissen.',
  'Nope. Dafür bekommst du den Teilnahme-Preis.',
  'Leider falsch. Aber du gibst nicht auf, das ist... süß.',
  'Knapp daneben ist auch vorbei. Sehr weit vorbei.',
  'Fast... fast hätte es geklappt. Leider nein.',
  'Nein, aber schöner Versuch. Wirklich.',
  'Falsch. Aber Übung macht den Meister, sagen sie.',
];

/**
 * Medium comments - Standard sarcasm
 */
const MEDIUM_CORRECT = [
  'Beeindruckend. Fast so wie ein funktionierender Verstand.',
  'Wow. Und ich dachte, du rätst nur.',
  'Korrekt. Der Affe mit der Schreibmaschine ist stolz.',
  'Richtig. Statistisch war das überfällig.',
  'Treffer! Dein IQ erreicht fast zweistellige Werte.',
  'Korrekt. Hast du etwa... nachgedacht?',
  'Richtig! Und das ganz ohne Hilfestellung.',
  'Stimmt. Die Wahrscheinlichkeit lag bei 25%. Glück gehabt.',
  'Ja! Selbst in der Dunkelheit findest du manchmal das Licht.',
  'Korrekt. Shakespeare wäre... na ja, überrascht.',
  'Richtig. Vielleicht bist du doch nicht hoffnungslos.',
  'Treffer! Die Münze ist auf die richtige Seite gefallen.',
  'Genau! Fast so, als könntest du lesen.',
  'Stimmt. Ein kleines Wunder in deiner sonst grauen Existenz.',
  'Korrekt. Sogar ein Eichhörnchen findet mal eine Nuss.',
];

const MEDIUM_INCORRECT = [
  'Daneben. Wie dein Leben vermutlich auch.',
  'Falsch. Überraschung des Jahrtausends.',
  'Verfehlt. Wie ein Sturm im Wasserglas.',
  'Falsch. Einstein rollt sich im Grab um.',
  'Nein. Das war schmerzhafter als ein Zahnarztbesuch.',
  'Daneben. Ich spüre, wie mein IQ sinkt.',
  'Nein. Das war wie Karate mit Nudeln.',
  'Falsch. Und ich dachte, es könnte nicht schlimmer werden.',
  'Verfehlt. Selbst Raten wäre besser gewesen.',
  'Nein. Deine Logik ist... faszinierend falsch.',
  'Daneben. Deine Gehirnzellen streiken wohl.',
  'Falsch. Das Universum weint mit dir.',
  'Nein. Sogar Google hätte aufgegeben.',
  'Verfehlt. Mathematisch war das unmöglich so falsch zu liegen.',
  'Falsch. Darwin würde seine Theorie überdenken.',
];

/**
 * Brutal comments - Maximum sarcasm
 */
const BRUTAL_CORRECT = [
  'Richtig. Ich bin schockiert. Wirklich schockiert.',
  'Korrekt. Hast du etwa... ein Buch gelesen?',
  'Wow. Ein Treffer. Markiere diesen Tag im Kalender.',
  'Stimmt. Bist du sicher, dass du nicht geschummelt hast?',
  'Richtig. Die Götter des Zufalls sind heute gnädig.',
  'Korrekt. Selbst ein blinder Huhn... ach, du kennst den Spruch.',
  'Treffer. Warst du etwa... konzentriert?',
  'Ja. Die Wahrscheinlichkeit war minimal, aber hier sind wir.',
  'Genau. Ich notiere: \"Erstes Lebenszeichen erkannt.\"',
  'Stimmt. Habe ich die Matrix gerade glitchen sehen?',
  'Richtig. Applaus für das absolute Minimum.',
  'Korrekt. Ist das... Evolution in Echtzeit?',
  'Treffer. Deine Neuronen hatten einen guten Tag.',
  'Genau. Selbst ein Stein hätte... nein, warte.',
  'Ja. Die Wissenschaft wird das nie erklären können.',
];

const BRUTAL_INCORRECT = [
  'Falsch. Spektakulär falsch. Sogar für dich.',
  'Nein. Ich habe schon viel gesehen, aber das...',
  'Daneben. Dein Denkvermögen ist... bewundernswert optimistisch.',
  'Verfehlt. Das war wie Philosophie für Goldfische.',
  'Nein. Selbst ein Toastbrot hätte besser geraten.',
  'Falsch. Ich frage mich, wie du morgens den Weg nach draußen findest.',
  'Daneben. Evolution hat bei dir eine Pause eingelegt.',
  'Nein. Das war schmerzhafter als Existenzialismus um 3 Uhr nachts.',
  'Verfehlt. Deine Synapsen sind wohl im Urlaub.',
  'Falsch. Sogar Alexa würde aufgeben.',
  'Nein. Die Tragik ist... künstlerisch.',
  'Daneben. Ich bewundere deinen Optimismus angesichts dieser Fakten.',
  'Falsch. Das Universum kollabiert gerade vor Scham.',
  'Verfehlt. Sokrates dreht sich im Grab um.',
  'Nein. Und ich dachte, Ignoranz sei Glückseligkeit.',
];

/**
 * Streak-based comments (high streak)
 */
const STREAK_CORRECT = [
  'Noch eine richtig. Die Serie geht weiter... vorerst.',
  'Wieder richtig. Vorsicht, dein Kopf könnte platzen.',
  'Korrekt. Diese Glückssträhne kann nicht ewig dauern.',
  'Richtig. Genießen den Moment, er ist flüchtig.',
  'Treffer! Du bist heute unerträglich gut.',
  'Ja. Dein Ego wird gleich durch die Decke gehen.',
  'Stimmt wieder. Ich bin fast beeindruckt. Fast.',
  'Korrekt. Wer bist du und was hast du mit dem echten du gemacht?',
];

const STREAK_INCORRECT = [
  'Falsch! Endlich. Die Normalität kehrt zurück.',
  'Nein. Dein Höhenflug war schön, aber kurz.',
  'Daneben. Und ich dachte, du hättest es verstanden.',
  'Verfehlt. Reality-Check erfolgreich abgeschlossen.',
  'Falsch. Die Träume sind vorbei, Freund.',
  'Nein. Vom Olymp in den Staub. Klassisch.',
  'Daneben. Icarus lässt grüßen.',
];

/**
 * Get context-aware Quizmaster comment
 */
export class QuizmasterService {
  /**
   * Generate a context-aware sarcastic comment
   */
  static getComment(context: CommentContext): string {
    const { isCorrect, currentStreak, scorePercentage } = context;

    // High streak (5+) gets special comments
    if (currentStreak >= 5) {
      return this.getRandomComment(isCorrect ? STREAK_CORRECT : STREAK_INCORRECT);
    }

    // Determine intensity based on score performance
    const intensity = this.getIntensity(scorePercentage);

    return this.getCommentByIntensity(isCorrect, intensity);
  }

  /**
   * Determine comment intensity based on performance
   */
  private static getIntensity(scorePercentage: number): CommentIntensity {
    if (scorePercentage >= 80) {
      return CommentIntensity.BRUTAL; // Player is doing well, can handle brutal
    } else if (scorePercentage >= 50) {
      return CommentIntensity.MEDIUM;
    } else {
      return CommentIntensity.MILD; // Player struggling, keep it mild
    }
  }

  /**
   * Get comment based on intensity level
   */
  private static getCommentByIntensity(
    isCorrect: boolean,
    intensity: CommentIntensity
  ): string {
    let commentPool: string[];

    if (isCorrect) {
      switch (intensity) {
        case CommentIntensity.MILD:
          commentPool = MILD_CORRECT;
          break;
        case CommentIntensity.MEDIUM:
          commentPool = MEDIUM_CORRECT;
          break;
        case CommentIntensity.BRUTAL:
          commentPool = BRUTAL_CORRECT;
          break;
      }
    } else {
      switch (intensity) {
        case CommentIntensity.MILD:
          commentPool = MILD_INCORRECT;
          break;
        case CommentIntensity.MEDIUM:
          commentPool = MEDIUM_INCORRECT;
          break;
        case CommentIntensity.BRUTAL:
          commentPool = BRUTAL_INCORRECT;
          break;
      }
    }

    return this.getRandomComment(commentPool);
  }

  /**
   * Get random comment from pool
   */
  private static getRandomComment(pool: string[]): string {
    return pool[Math.floor(Math.random() * pool.length)];
  }

  /**
   * Backwards compatible: Get simple comment (no context)
   */
  static getSimpleComment(isCorrect: boolean): string {
    return this.getComment({
      isCorrect,
      currentStreak: 0,
      difficulty: 'MEDIUM' as DifficultyLevel,
      scorePercentage: 50,
    });
  }
}
