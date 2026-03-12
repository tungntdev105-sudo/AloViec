import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { Job } from '@/src/types/job';
import { JobCard } from './JobCard';
import { fetchJobs } from '@/src/services/firebase';
import { Typography } from '@/src/components/ui/Typography';

export function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const fetchedJobs = await fetchJobs();
        setJobs(fetchedJobs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Job>) => {
    return <JobCard job={item} />;
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Typography style={{ marginTop: 12 }} color="#6B7280">Đang tải dữ liệu...</Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={jobs}
        renderItem={renderItem}
        estimatedItemSize={200}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Typography>Không có dữ liệu công việc</Typography>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  listContent: {
    paddingVertical: 16,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
