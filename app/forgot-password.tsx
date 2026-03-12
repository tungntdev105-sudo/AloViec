import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { router, Link } from 'expo-router';
import { Screen } from '@/src/components/ui/Screen';
import { Typography } from '@/src/components/ui/Typography';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { auth } from '@/src/services/firebase';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập Email để khôi phục.');
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Kiểm tra Email', `Hướng dẫn đặt lại mật khẩu đã được gửi tới ${email}.`, [
        { text: 'Quay lại Đăng nhập', onPress: () => router.back() }
      ]);
    } catch (error: any) {
      Alert.alert('Không thể gửi Yêu cầu', error.message || 'Lỗi hệ thống.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h2" color="#2563EB" align="center" weight="bold">Quên Mật Khẩu</Typography>
        <Typography variant="body" color="#6B7280" align="center" style={{ marginTop: 8 }}>
          Nhập email bạn đã dùng đăng ký tài khoản
        </Typography>
      </View>

      <View style={styles.form}>
        <Input
          label="Email xác nhận"
          placeholder="Nhập email của bạn"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        <Button 
          title="Gửi Yêu cầu & Khôi Phục" 
          onPress={handleReset} 
          loading={loading}
          size="lg"
          style={{ marginTop: 8 }}
        />

        <View style={styles.login}>
          <Link href="/login">
            <Typography variant="body" color="#2563EB" weight="600">Quay lại Đăng Nhập</Typography>
          </Link>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  form: {
    gap: 16,
  },
  login: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
});
