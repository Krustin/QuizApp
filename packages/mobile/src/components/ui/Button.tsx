/**
 * 2.5D Button component with Primary/Secondary/Accent variants
 * Implements design from UI-STYLE-GUIDE.md
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, typography, borderRadius, get2DShadow } from '@quiz/shared/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const [pressed, setPressed] = React.useState(false);

  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);
  const shadow = get2DShadow(
    variant === 'primary' ? colors.primary.dark :
    variant === 'accent' ? colors.accent.dark :
    colors.border.main,
    pressed
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled || loading}
      activeOpacity={0.9}
      style={[
        styles.base,
        variantStyles.container,
        sizeStyles.container,
        shadow,
        {
          transform: [{ translateY: pressed ? 1 : -2 }],
        },
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variantStyles.text.color}
          size={size === 'sm' ? 'small' : 'small'}
        />
      ) : (
        <Text
          style={[
            styles.text,
            variantStyles.text,
            sizeStyles.text,
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const getVariantStyles = (variant: ButtonVariant) => {
  const variants = {
    primary: {
      container: {
        backgroundColor: colors.primary.main,
        borderColor: 'transparent',
      },
      text: {
        color: colors.primary.foreground,
      },
    },
    secondary: {
      container: {
        backgroundColor: colors.background.card,
        borderColor: colors.border.main,
      },
      text: {
        color: colors.text.primary,
      },
    },
    accent: {
      container: {
        backgroundColor: colors.accent.main,
        borderColor: 'transparent',
      },
      text: {
        color: colors.accent.foreground,
      },
    },
  };

  return variants[variant];
};

const getSizeStyles = (size: ButtonSize) => {
  const sizes = {
    sm: {
      container: {
        paddingVertical: 8,
        paddingHorizontal: 16,
      },
      text: {
        fontSize: typography.fontSize.sm,
      },
    },
    md: {
      container: {
        paddingVertical: 12,
        paddingHorizontal: 24,
      },
      text: {
        fontSize: typography.fontSize.base,
      },
    },
    lg: {
      container: {
        paddingVertical: 16,
        paddingHorizontal: 32,
      },
      text: {
        fontSize: typography.fontSize.lg,
      },
    },
  };

  return sizes[size];
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 44, // Accessibility: minimum touch target
  },
  text: {
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.normal * typography.fontSize.base,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});
