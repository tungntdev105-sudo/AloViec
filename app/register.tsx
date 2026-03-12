import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { router, Link } from 'expo-router';
import { Screen } from '@/src/components/ui/Screen';
import { Typography } from '@/src/components/ui/Typography';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { auth } from '@/src/services/firebase';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ họ tên, email và mật khẩu.');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Cập nhật tên vào profile của user
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      Alert.alert('Thành công', 'Đăng ký tài khoản thành công! Tự động đăng nhập...', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') }
      ]);
    } catch (error: any) {
      Alert.alert('Lỗi đăng ký', error.message || 'Đã xảy ra lỗi hệ thống.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h2" color="#2563EB" align="center" weight="bold">Tạo Tài Khoản</Typography>
        <Typography variant="body" color="#6B7280" align="center" style={{ marginTop: 8 }}>
          Nhập thông tin của bạn để bắt đầu
        </Typography>
      </View>

      <View style={styles.form}>
        <Input
          label="Họ và Tên"
          placeholder="Ví dụ: Nguyễn Văn A"
          value={name}
          onChangeText={setName}
        />
        <Input
          label="Email"
          placeholder="Nhập email của bạn"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          label="Mật khẩu"
          placeholder="Tạo mật khẩu (từ 6 ký tự)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <Button 
          title="Đăng Ký" 
          onPress={handleRegister} 
          loading={loading}
          size="lg"
          style={{ marginTop: 8 }}
        />

        <View style={styles.login}>
          <Typography variant="body">Đã có tài khoản? </Typography>
          <Link href="/login">
            <Typography variant="body" color="#2563EB" weight="bold">Đăng nhập</Typography>
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
