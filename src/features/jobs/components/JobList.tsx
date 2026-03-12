import { Typography } from '@/src/components/ui/Typography';
import { fetchJobs } from '@/src/services/firebase';
import { Job } from '@/src/types/job';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { JobCard } from './JobCard';

export function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async (): Promise<void> => {
      try {
        const fetchedJobs = await fetchJobs();
        if (isMounted) {
          setJobs(fetchedJobs);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);



  const renderJobItem = useCallback(({ item }: ListRenderItemInfo<Job>) => {
    return <JobCard job={item} />;
  }, []);

  const keyExtractor = useCallback((item: Job) => item.id, []);

  const emptyListComponent = useMemo(
    () => (
      <View style={styles.centeredContainer}>
        <Typography>Không có dữ liệu công việc</Typography>
      </View>
    ),
    []
  );

  if (isLoading) {
    return (
      <View style={[styles.mainContainer, styles.centeredContainer]}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Typography style={styles.loadingText} color="#6B7280">
          Đang tải dữ liệu...
        </Typography>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlashList
        data={jobs}
        renderItem={renderJobItem}
        contentContainerStyle={styles.listContentContainer}
        keyExtractor={keyExtractor}
        ListEmptyComponent={emptyListComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  listContentContainer: {
    paddingVertical: 16,
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
  },
});
