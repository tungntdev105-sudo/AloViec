import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: string;
  weight?: 'normal' | 'bold' | '500' | '600' | '700';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export function Typography({
  children,
  variant = 'body',
  color = '#111827',
  weight = 'normal',
  align = 'left',
  style,
  ...props
}: TypographyProps) {
  const textStyles = [
    styles.base,
    styles[variant],
    { color, fontWeight: weight, textAlign: align },
    style,
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System', // Can be customized with custom fonts later
  },
  h1: { fontSize: 32, lineHeight: 40, fontWeight: 'bold' },
  h2: { fontSize: 24, lineHeight: 32, fontWeight: 'bold' },
  h3: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24 },
  caption: { fontSize: 14, lineHeight: 20, color: '#6B7280' },
  label: { fontSize: 12, lineHeight: 16, textTransform: 'uppercase', fontWeight: '600' },
});
