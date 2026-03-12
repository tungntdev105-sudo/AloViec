import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Typography } from '@/src/components/ui/Typography';
import { useAuth } from '@/src/features/auth/AuthContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        headerTitle: () => (
          <Typography variant="h3" weight="bold" color="#2563EB">
            AloViec
          </Typography>
        ),
        headerRight: () => (
          <View style={{ marginRight: 16 }}>
            {user ? (
              <Typography variant="caption" weight="600" color="#059669">
                ✓ {user.name}
              </Typography>
            ) : (
              <Typography variant="caption" color="#6B7280">
                Khách
              </Typography>
            )}
          </View>
        ),
        tabBarButton: HapticTab,
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: '#E5E7EB',
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Việc làm',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Hồ sơ',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
