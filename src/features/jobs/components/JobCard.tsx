import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Job } from '@/src/types/job';
import { Card } from '@/src/components/ui/Card';
import { Typography } from '@/src/components/ui/Typography';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const router = useRouter();

  return (
    <Card 
      style={styles.card} 
      onPress={() => router.push(`/job/${job.id}`)}
    >
      <View style={styles.header}>
        {job.companyLogoUrl ? (
          <Image 
            source={{ uri: job.companyLogoUrl }} 
            style={styles.logo} 
            contentFit="contain"
          />
        ) : (
          <View style={[styles.logo, styles.placeholderLogo]}>
            <Typography variant="h3" color="#9CA3AF">?</Typography>
          </View>
        )}
        <View style={styles.headerText}>
          <Typography variant="h3" weight="bold" numberOfLines={2}>
            {job.title}
          </Typography>
          <Typography variant="caption" numberOfLines={1}>
            {job.companyName}
          </Typography>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Typography weight="600" color="#059669">💰 {job.salary}</Typography>
        </View>
        <View style={styles.detailRow}>
          <Typography variant="body" color="#4B5563">👥 Tuyển {job.quantity} người</Typography>
        </View>
        <View style={styles.detailRow}>
          <Typography variant="body" color="#4B5563">⏰ {job.hours}</Typography>
        </View>
        <View style={styles.detailRow}>
          <Typography variant="body" color="#4B5563">📍 {job.location}</Typography>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  placeholderLogo: {
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  details: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
