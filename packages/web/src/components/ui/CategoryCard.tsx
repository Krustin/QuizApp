/**
 * Category selection card for web
 */

import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Lock, CheckCircle } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  questionsCount: number;
  isLocked: boolean;
  price?: string;
  icon: string; // Emoji
  onSelect: () => void;
  onUnlock?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  questionsCount,
  isLocked,
  price,
  icon,
  onSelect,
  onUnlock,
}) => {
  return (
    <Card className={`game-category-card ${isLocked ? 'game-locked-card' : ''}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl floating-element">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-lg">{title}</h3>
            {!isLocked && (
              <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
            {isLocked && (
              <div className="w-6 h-6 bg-muted-foreground rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <p className="text-muted-foreground mb-3">{description}</p>
          <div className="inline-block bg-secondary rounded-lg px-3 py-1">
            <span className="text-sm">{questionsCount} Demütigungen</span>
          </div>
        </div>
      </div>

      {isLocked ? (
        <div className="space-y-3">
          {price && <p className="text-accent font-bold text-lg">{price}</p>}
          <Button variant="accent" fullWidth onClick={onUnlock}>
            <span className="font-bold">💸 Abzocke akzeptieren</span>
          </Button>
        </div>
      ) : (
        <Button variant="primary" fullWidth onClick={onSelect}>
          <span className="font-bold">🎯 Blamage starten</span>
        </Button>
      )}
    </Card>
  );
};
