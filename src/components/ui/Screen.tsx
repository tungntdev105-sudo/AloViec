import React from 'react';
import { View, ViewProps, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

interface ScreenProps extends SafeAreaViewProps {
  safeArea?: boolean;
  backgroundColor?: string;
}

export function Screen({ children, style, safeArea = true, backgroundColor = '#F9FAFB', ...props }: ScreenProps) {
  const Container = safeArea ? SafeAreaView : View;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container style={[styles.container, { backgroundColor }, style]} {...(props as any)}>
        {children}
      </Container>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
