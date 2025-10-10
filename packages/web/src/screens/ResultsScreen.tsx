/**
 * Results Screen - Web
 * Shows quiz results with grade, score, stats, and action buttons
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCcw, Home, BookOpen, Trophy, Target } from 'lucide-react';
import type { Question } from '@quiz/shared';

interface LocationState {
  score: number;
  totalQuestions: number;
  correctAnswers: Question[];
}

export const ResultsScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  // Fallback if navigated directly without state
  const score = state?.score ?? 0;
  const totalQuestions = state?.totalQuestions ?? 12;
  const correctAnswers = state?.correctAnswers ?? [];

  const percentage = Math.round((score / totalQuestions) * 100);
  const points = score * 10;

  const getResultMessage = (): string => {
    if (percentage >= 90) return 'Unfassbar. Du hast tatsächlich eine funktionierende Gehirnzelle.';
    if (percentage >= 70) return 'Nicht schlecht. Aber auch ein blindes Huhn findet mal ein Korn.';
    if (percentage >= 50) return 'Mittelmäßig. Wie dein gesamtes Leben vermutlich.';
    if (percentage >= 30) return 'Autsch. Das war schmerzhafter als meine Witze.';
    return 'Beeindruckend schlecht. Hast du versucht, falsch zu antworten?';
  };

  const getGrade = (): { grade: string; color: string } => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-success' };
    if (percentage >= 80) return { grade: 'A', color: 'text-success' };
    if (percentage >= 70) return { grade: 'B', color: 'text-neutral' };
    if (percentage >= 60) return { grade: 'C', color: 'text-accent' };
    if (percentage >= 50) return { grade: 'D', color: 'text-destructive' };
    return { grade: 'F', color: 'text-destructive' };
  };

  const resultGrade = getGrade();

  const handlePlayAgain = () => {
    navigate('/play');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleViewEncyclopedia = () => {
    navigate('/encyclopedia');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <h1 className="text-xl font-bold">Quiz beendet</h1>
        <p className="text-sm opacity-90 mt-1">Zeit für die harte Wahrheit</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="game-card p-6 text-center bg-gradient-to-br from-primary/5 to-accent/5">
            <div className={`text-6xl font-bold mb-2 ${resultGrade.color}`}>
              {resultGrade.grade}
            </div>
            <div className="text-3xl font-medium mb-2">
              {score} / {totalQuestions}
            </div>
            <div className="text-lg text-muted-foreground mb-4">
              {percentage}% richtig
            </div>
            <div className="inline-block bg-secondary rounded-lg px-4 py-2">
              <span className="text-sm font-bold">+{points} Punkte</span>
            </div>
          </div>
        </motion.div>

        {/* Quizmaster Comment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="game-card p-4 bg-accent/10 border-accent/20">
            <div className="flex items-start gap-3">
              <div className="text-2xl">😈</div>
              <div>
                <p className="font-medium">Quizmaster sagt:</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {getResultMessage()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="game-stat-card p-3 text-center">
            <Target className="w-5 h-5 text-success mx-auto mb-1" />
            <p className="text-lg font-medium">{score}</p>
            <p className="text-xs text-muted-foreground">Richtig</p>
          </div>
          <div className="game-stat-card p-3 text-center">
            <Trophy className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="text-lg font-medium">{points}</p>
            <p className="text-xs text-muted-foreground">Punkte</p>
          </div>
          <div className="game-stat-card p-3 text-center">
            <BookOpen className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-medium">{correctAnswers.length}</p>
            <p className="text-xs text-muted-foreground">Gelernt</p>
          </div>
        </div>

        {/* Encyclopedia Notice */}
        {correctAnswers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="game-card p-4 bg-muted/50">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {correctAnswers.length} neue{correctAnswers.length === 1 ? 'r' : ''} Eintrag
                    {correctAnswers.length === 1 ? '' : 'e'} in deiner Enzyklopädie!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Erklärungen und Fun Facts findest du dort.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handlePlayAgain}
            className="w-full py-4 px-6 game-button-primary flex items-center justify-center"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            <span className="font-bold">Nochmal versuchen</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleViewEncyclopedia}
              className="py-3 px-4 game-button-secondary flex items-center justify-center"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="font-medium">Enzyklopädie</span>
            </button>

            <button
              onClick={handleGoHome}
              className="py-3 px-4 game-button-secondary flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              <span className="font-medium">Startseite</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
