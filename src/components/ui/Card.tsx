import React from 'react';
import { View, ViewProps, StyleSheet, Pressable } from 'react-native';

interface CardProps extends ViewProps {
  onPress?: () => void;
  elevation?: number;
}

export function Card({ children, style, onPress, elevation = 2, ...props }: CardProps) {
  const cardStyle = [
    styles.card,
    {
      shadowOpacity: elevation * 0.05,
      shadowRadius: elevation,
      elevation: elevation,
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [cardStyle, pressed && styles.pressed]}
        {...props as any}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
