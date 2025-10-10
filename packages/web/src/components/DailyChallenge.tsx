/**
 * Daily Challenge Component
 * Shows daily quiz challenge with progress tracking and streak
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle } from 'lucide-react';
import { Progress } from './ui/Progress';

interface DailyChallengeProps {
  onStartChallenge: () => void;
}

interface ChallengeData {
  date: string;
  target: number;
  progress: number;
  completed: boolean;
  streak: number;
}

export function DailyChallenge({ onStartChallenge }: DailyChallengeProps) {
  const [challengeData, setChallengeData] = useState<ChallengeData>({
    date: new Date().toDateString(),
    target: 5,
    progress: 0,
    completed: false,
    streak: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem('daily-challenge');
    const today = new Date().toDateString();

    if (saved) {
      const data = JSON.parse(saved);
      if (data.date === today) {
        setChallengeData(data);
      } else {
        // New day, reset challenge
        const newStreak = data.completed ? data.streak + 1 : 0;
        setChallengeData({
          date: today,
          target: 5,
          progress: 0,
          completed: false,
          streak: newStreak,
        });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('daily-challenge', JSON.stringify(challengeData));
  }, [challengeData]);

  const progressPercentage = (challengeData.progress / challengeData.target) * 100;

  return (
    <div className="game-card p-6 bg-gradient-radial from-primary/5 to-transparent border-primary/20">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl floating-element">🎯</div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-bold text-lg">Tägliche Demütigung</h3>
            {challengeData.completed && (
              <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-sm">
            {challengeData.completed
              ? 'Fertig blamiert! Morgen wieder.'
              : `${challengeData.progress}/${challengeData.target} Zufallstreffer in Serie`}
          </p>
        </div>
        <div>
          <button
            onClick={onStartChallenge}
            disabled={challengeData.completed}
            className={`py-2 px-4 rounded-xl font-bold transition-all ${
              challengeData.completed
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'game-button-primary'
            }`}
          >
            {challengeData.completed ? '✅ Erledigt' : '🚀 Starten'}
          </button>
        </div>
      </div>

      {!challengeData.completed && (
        <div className="mb-4">
          <Progress value={progressPercentage} className="h-3" />
        </div>
      )}

      {challengeData.streak > 0 && (
        <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-xl">
          <div className="text-2xl">🔥</div>
          <div>
            <p className="font-bold">
              Glücks-Serie: {challengeData.streak} Tag{challengeData.streak !== 1 ? 'e' : ''}
            </p>
            <p className="text-sm text-muted-foreground">
              {challengeData.streak >= 7
                ? 'Wahnsinn! Reines Glück!'
                : challengeData.streak >= 3
                ? 'Beeindruckend zufällig!'
                : 'Weiter raten!'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
