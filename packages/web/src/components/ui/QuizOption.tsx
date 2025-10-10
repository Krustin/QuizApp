/**
 * QuizOption - Answer button component for web
 * States: default, selected, correct, incorrect
 * Implements 2.5D design from UI-STYLE-GUIDE.md
 */

import React from 'react';
import { cn } from '../../lib/utils';
import { Check, X } from 'lucide-react';

interface QuizOptionProps {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  isRevealed: boolean;
  onSelect: () => void;
  disabled: boolean;
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  index,
  isSelected,
  isCorrect,
  isRevealed,
  onSelect,
  disabled,
}) => {
  const letters = ['A', 'B', 'C', 'D'];

  /**
   * Determine CSS classes based on current state
   */
  const getClasses = () => {
    let classes = 'game-quiz-option';

    if (!isRevealed) {
      return isSelected ? `${classes} border-primary` : classes;
    }

    if (isSelected && isCorrect) return `${classes} correct`;
    if (isSelected && !isCorrect) return `${classes} incorrect`;
    if (!isSelected && isCorrect) return `${classes} border-success`;

    return classes;
  };

  /**
   * Get icon component based on state
   */
  const getIcon = () => {
    if (!isRevealed) return null;
    if (isSelected && isCorrect) return <Check className="w-6 h-6 text-success" />;
    if (isSelected && !isCorrect) return <X className="w-6 h-6 text-destructive" />;
    if (!isSelected && isCorrect) return <Check className="w-6 h-6 text-success" />;
    return null;
  };

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={cn(getClasses(), disabled && 'cursor-not-allowed')}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold w-7">{letters[index]}</span>
        <span className="flex-1 text-left">{option}</span>
        {getIcon()}
      </div>
    </button>
  );
};
