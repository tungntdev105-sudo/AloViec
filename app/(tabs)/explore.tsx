import { Image } from 'expo-image';
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { Screen } from '@/src/components/ui/Screen';
import { Typography } from '@/src/components/ui/Typography';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { useAuth } from '@/src/features/auth/AuthContext';
import { auth } from '@/src/services/firebase';

export default function ProfileScreen() {
  const { user } = useAuth();

  const handleLogout = async () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất không?', [
      { text: 'Hủy', style: 'cancel' },
      { 
        text: 'Đăng xuất', 
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut(auth);
            // AuthContext onAuthStateChanged will handle clearing user
            router.replace('/');
          } catch (error) {
            console.error("Lỗi đăng xuất:", error);
          }
        }
      }
    ]);
  };

  if (!user) {
    return (
      <Screen style={styles.center}>
        <Typography variant="body" style={{ marginBottom: 16 }}>Vui lòng đăng nhập để xem hồ sơ</Typography>
        <Button 
          title="Đăng Nhập" 
          onPress={() => router.push('/login')} 
        />
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <Card style={styles.profileCard}>
        <View style={styles.avatar}>
          <Typography variant="h1" color="#FFFFFF">{user.name.charAt(0).toUpperCase()}</Typography>
        </View>
        <Typography variant="h2" weight="bold">{user.name}</Typography>
        <Typography variant="body" color="#6B7280" style={{ marginTop: 4 }}>
          {user.email || 'Email chưa cập nhật'}
        </Typography>
        
        <View style={styles.badge}>
          <Typography variant="caption" color="#059669" weight="bold">✓ Đã xác thực hồ sơ</Typography>
        </View>
      </Card>

      <View style={{ paddingHorizontal: 16 }}>
        <Button 
          title="Đăng Xuất Khỏi Thiết Bị" 
          variant="secondary"
          onPress={handleLogout} 
          style={styles.logoutBtn}
        />
        <Typography variant="caption" align="center" color="#9CA3AF" style={{ marginTop: 16 }}>
          AloViec phiên bản 1.0.0
        </Typography>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 32,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  badge: {
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#D1FAE5',
    borderRadius: 16,
  },
  logoutBtn: {
    backgroundColor: '#EF4444', 
  }
});
