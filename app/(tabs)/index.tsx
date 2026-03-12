import React from 'react';
import { Screen } from '@/src/components/ui/Screen';
import { JobList } from '@/src/features/jobs/components/JobList';
import { Typography } from '@/src/components/ui/Typography';
import { View, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <Typography variant="h2" weight="bold" color="#1F2937">
          Công việc mới nhất
        </Typography>
        <Typography variant="caption">
          Các cơ hội việc làm tốt nhất tại các KCN
        </Typography>
      </View>
      <JobList />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#F9FAFB',
  },
});
