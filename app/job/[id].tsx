import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Screen } from '@/src/components/ui/Screen';
import { Typography } from '@/src/components/ui/Typography';
import { Button } from '@/src/components/ui/Button';
import { Job } from '@/src/types/job';
import { useAuth } from '@/src/features/auth/AuthContext';
import { useFacebookAuth } from '@/src/features/auth/useFacebookAuth';
import { fetchJobById } from '@/src/services/firebase';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const { handleLogin } = useFacebookAuth();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      const data = await fetchJobById(id);
      setJob(data);
      setLoading(false);
    };
    loadData();
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      Alert.alert(
        'Yêu cầu Đăng nhập', 
        'Bạn cần đăng nhập bằng Facebook để ứng tuyển công việc này.',
        [
          { text: 'Hủy', style: 'cancel' },
          { text: 'Đăng nhập', onPress: handleLogin }
        ]
      );
      return;
    }

    Alert.alert('Thành công', `Bạn đã ứng tuyển thành công vị trí: ${job?.title}`);
  };

  if (!job) {
    return (
      <Screen style={styles.center}>
        <Typography>Không tìm thấy công việc.</Typography>
      </Screen>
    );
  }

  return (
    <Screen safeArea={false} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          {job.companyLogoUrl && (
            <Image 
              source={{ uri: job.companyLogoUrl }} 
              style={styles.logo} 
              contentFit="contain"
            />
          )}
          <Typography variant="h2" weight="bold">{job.title}</Typography>
          <Typography variant="body" color="#4B5563">{job.companyName}</Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="h3" weight="600" style={styles.sectionTitle}>Thông tin chung</Typography>
          <Typography color="#059669" weight="bold" style={styles.infoLine}>💰 Mức lương: {job.salary}</Typography>
          <Typography style={styles.infoLine}>👥 Số lượng: {job.quantity}</Typography>
          <Typography style={styles.infoLine}>⏰ Giờ làm việc: {job.hours}</Typography>
          <Typography style={styles.infoLine}>📍 Địa điểm: {job.location}</Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="h3" weight="600" style={styles.sectionTitle}>Mô tả công việc</Typography>
          <Typography style={{ lineHeight: 24 }}>{job.description}</Typography>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title={user ? "Ứng tuyển ngay" : "Đăng nhập để Ứng tuyển"} 
          onPress={handleApply}
          size="lg"
        />
        {user && (
          <Typography variant="caption" align="center" style={{ marginTop: 8 }}>
            Đang đăng nhập với tên: {user.name}
          </Typography>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 8,
  },
  infoLine: {
    marginBottom: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
