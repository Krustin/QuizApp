/**
 * Profile Screen - Web
 * Displays user stats, achievements, and settings
 */

import React, { useEffect } from 'react';
import { Progress } from '../components/ui/Progress';
import { Trophy, Target, Flame, BarChart3 } from 'lucide-react';
import { useUserStore } from '@quiz/shared/stores/userStore';
import { useSettingsStore, setStorageService } from '@quiz/shared/stores/settingsStore';
import { storageService } from '../services/StorageService';

// Initialize settings store with storage service
setStorageService(storageService);

export const ProfileScreen: React.FC = () => {
  const { userProfile, isLoading, loadUserProfile, accuracyRate } =
    useUserStore();
  const {
    soundEnabled,
    vibrationEnabled,
    toggleSound,
    toggleVibration,
    loadSettings,
  } = useSettingsStore();

  useEffect(() => {
    loadUserProfile(storageService);
    loadSettings();
  }, []);

  if (isLoading || !userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Lade Profil...</p>
        </div>
      </div>
    );
  }

  const accuracyPercentage = Math.round(accuracyRate() * 100);
  const nextLevelPoints = (userProfile.currentLevel + 1) * 500;
  const progressToNextLevel =
    ((userProfile.totalPoints - userProfile.currentLevel * 500) /
      (nextLevelPoints - userProfile.currentLevel * 500)) *
    100;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 text-6xl opacity-10 floating-element">🏆</div>
        <h1 className="text-3xl font-bold">Scham-Profil</h1>
        <p className="text-base opacity-90 mt-2">
          Level {userProfile.currentLevel} Hobby-Versager
        </p>
      </div>

      <div className="p-4 space-y-6">
        {/* Level Progress */}
        <div className="game-card p-6">
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="w-8 h-8 text-accent" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">Versager-Level {userProfile.currentLevel}</h3>
              <p className="text-muted-foreground">
                {userProfile.totalPoints} / {nextLevelPoints} Mitleids-Punkte
              </p>
            </div>
          </div>
          <Progress value={Math.min(progressToNextLevel, 100)} className="h-3" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="game-stat-card text-center">
            <Target className="w-8 h-8 text-success mx-auto mb-3" />
            <p className="text-3xl font-bold">{accuracyPercentage}%</p>
            <p className="text-sm text-muted-foreground">Glücks-Quote</p>
            <p className="text-xs text-muted-foreground mt-1">
              {userProfile.correctAnswers} / {userProfile.questionsAnswered} Zufallstreffer
            </p>
          </div>

          <div className="game-stat-card text-center">
            <Flame className="w-8 h-8 text-accent mx-auto mb-3" />
            <p className="text-3xl font-bold">{userProfile.currentStreak}</p>
            <p className="text-sm text-muted-foreground">Aktuelle Glückssträhne</p>
            <p className="text-xs text-muted-foreground mt-1">
              Rekord: {userProfile.longestStreak}
            </p>
          </div>

          <div className="game-stat-card text-center">
            <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-3xl font-bold">{userProfile.totalPoints}</p>
            <p className="text-sm text-muted-foreground">Mitleids-Punkte</p>
          </div>

          <div className="game-stat-card text-center">
            <Trophy className="w-8 h-8 text-neutral mx-auto mb-3" />
            <p className="text-3xl font-bold">{userProfile.sessionsPlayed}</p>
            <p className="text-sm text-muted-foreground">Sessions</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="game-card p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-3">
            <Trophy className="w-6 h-6" />
            Peinliche Errungenschaften
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🎯', name: 'Zufallstreffer', unlocked: userProfile.correctAnswers >= 1 },
              { icon: '🔥', name: 'Glückssträhne', unlocked: userProfile.longestStreak >= 5 },
              { icon: '🏹', name: 'Pseudo-Experte', unlocked: accuracyPercentage >= 80 },
              { icon: '🧠', name: 'Ratemonster', unlocked: userProfile.questionsAnswered >= 50 },
              { icon: '⭐', name: 'Veteran', unlocked: userProfile.currentLevel >= 5 },
              {
                icon: '💎',
                name: 'Reiner Zufall',
                unlocked: accuracyPercentage === 100 && userProfile.questionsAnswered >= 10,
              },
            ].map((achievement, index) => (
              <div
                key={index}
                className={`
                  p-4 rounded-2xl border-2 text-center transition-all
                  ${
                    achievement.unlocked
                      ? 'bg-primary/10 border-primary/30 game-stat-card'
                      : 'bg-muted/30 border-border opacity-50'
                  }
                `}
              >
                <div className="text-3xl mb-2 floating-element">{achievement.icon}</div>
                <p className="font-bold text-sm">{achievement.name}</p>
                {achievement.unlocked && (
                  <div className="mt-2 inline-block bg-success text-white text-xs px-2 py-1 rounded-full">
                    Erreicht! 🎉
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="game-card p-6">
          <h3 className="font-bold text-lg mb-4">⚙️ Einstellungen</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <div>
                <p className="font-medium">🔊 Sound</p>
                <p className="text-sm text-muted-foreground">Soundeffekte aktivieren</p>
              </div>
              <button
                onClick={toggleSound}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  soundEnabled ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    soundEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <div>
                <p className="font-medium">📳 Vibration</p>
                <p className="text-sm text-muted-foreground">Haptisches Feedback</p>
              </div>
              <button
                onClick={toggleVibration}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  vibrationEnabled ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    vibrationEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
