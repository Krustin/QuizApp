/**
 * QuizOption - Answer button component with 4 states
 * States: default, selected, correct, incorrect
 * Implements 2.5D design from UI-STYLE-GUIDE.md
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, typography, borderRadius, spacing, get2DShadow } from '@quiz/shared/theme';

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
  const [pressed, setPressed] = React.useState(false);

  /**
   * Determine which style variant to use based on state
   */
  const getOptionStyle = () => {
    if (!isRevealed) {
      return isSelected ? styles.selected : styles.default;
    }
    if (isSelected) {
      return isCorrect ? styles.correct : styles.incorrect;
    }
    if (isCorrect) {
      return styles.correctNotSelected;
    }
    return styles.default;
  };

  /**
   * Get icon to display based on state (checkmark or X)
   */
  const getIcon = () => {
    if (!isRevealed) return null;
    if (isSelected && isCorrect) return '✓';
    if (isSelected && !isCorrect) return '✗';
    if (!isSelected && isCorrect) return '✓';
    return null;
  };

  const optionStyle = getOptionStyle();
  const icon = getIcon();
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <TouchableOpacity
      onPress={onSelect}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      activeOpacity={0.9}
      style={[
        styles.container,
        optionStyle.container,
        get2DShadow(optionStyle.shadowColor, pressed),
        { transform: [{ translateY: pressed ? 1 : -1 }] },
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.letter, optionStyle.text]}>{letters[index]}</Text>
        <Text style={[styles.option, optionStyle.text]}>{option}</Text>
        {icon && <Text style={[styles.icon, optionStyle.icon]}>{icon}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    padding: spacing[4],
    marginBottom: spacing[3],
    minHeight: 56, // Touch target minimum
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  letter: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    width: 28,
  },
  option: {
    flex: 1,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal * typography.fontSize.base,
  },
  icon: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  default: {
    container: {
      backgroundColor: colors.background.card,
      borderColor: colors.border.main,
    },
    text: { color: colors.text.primary },
    shadowColor: colors.border.main,
  },
  selected: {
    container: {
      backgroundColor: colors.background.card,
      borderColor: colors.primary.main,
    },
    text: { color: colors.text.primary },
    shadowColor: colors.primary.main,
  },
  correct: {
    container: {
      backgroundColor: `${colors.success.main}1A`, // 10% opacity
      borderColor: colors.success.main,
    },
    text: { color: colors.text.primary },
    icon: { color: colors.success.main },
    shadowColor: colors.success.dark,
  },
  incorrect: {
    container: {
      backgroundColor: `${colors.destructive.main}1A`, // 10% opacity
      borderColor: colors.destructive.main,
    },
    text: { color: colors.text.primary },
    icon: { color: colors.destructive.main },
    shadowColor: colors.destructive.dark,
  },
  correctNotSelected: {
    container: {
      backgroundColor: colors.background.card,
      borderColor: colors.success.main,
    },
    text: { color: colors.text.primary },
    icon: { color: colors.success.main },
    shadowColor: colors.success.dark,
  },
});
