/**
 * 2.5D Card component with optional pressable state
 * Implements design from UI-STYLE-GUIDE.md
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, borderRadius, getShadowStyle } from '@quiz/shared/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  pressable?: boolean;
  elevation?: 1 | 2 | 3 | 4;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  pressable = false,
  elevation = 2,
}) => {
  const [pressed, setPressed] = React.useState(false);

  const shadowLevel = pressed ? Math.max(0, elevation - 1) as 0 | 1 | 2 | 3 | 4 : elevation;
  const shadow = getShadowStyle(shadowLevel);

  const content = (
    <View
      style={[
        styles.card,
        shadow,
        {
          transform: [{ translateY: pressed ? 2 : -2 }],
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress || pressable) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        activeOpacity={0.9}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border.main,
    padding: 24,
  },
});
