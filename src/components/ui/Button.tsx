import React from 'react';
import { Pressable, PressableProps, StyleSheet, ActivityIndicator, ViewStyle, StyleProp } from 'react-native';
import { Typography } from './Typography';

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[`${variant}Variant`],
        styles[`${size}Size`],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#2563EB' : '#FFFFFF'} />
      ) : (
        <Typography
          weight="600"
          color={variant === 'outline' || variant === 'ghost' ? '#2563EB' : '#FFFFFF'}
          align="center"
        >
          {title}
        </Typography>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryVariant: {
    backgroundColor: '#2563EB', // Blue 600
  },
  secondaryVariant: {
    backgroundColor: '#4B5563', // Gray 600
  },
  outlineVariant: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  ghostVariant: {
    backgroundColor: 'transparent',
  },
  smSize: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mdSize: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  lgSize: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});
