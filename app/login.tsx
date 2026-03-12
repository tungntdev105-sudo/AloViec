import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { router, Link } from 'expo-router';
import { Screen } from '@/src/components/ui/Screen';
import { Typography } from '@/src/components/ui/Typography';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { auth } from '@/src/services/firebase';
import { useFacebookAuth } from '@/src/features/auth/useFacebookAuth';
import { useAuth } from '@/src/features/auth/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleLogin: loginFB } = useFacebookAuth();
  const { user } = useAuth(); // Neu co user do auto-login thi redirect ngam

  // Auto redirect if logged in
  React.useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user]);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập Email và Mật khẩu');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // AuthContext listener will pick this up and handle Biometrics -> User state
    } catch (error: any) {
      Alert.alert('Đăng nhập thất bại', error.message || 'Kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h1" color="#2563EB" align="center">AloViec</Typography>
        <Typography variant="body" color="#6B7280" align="center" style={{ marginTop: 8 }}>
          Đăng nhập để tìm việc làm nhanh chóng
        </Typography>
      </View>

      <View style={styles.form}>
        <Input
          label="Email"
          placeholder="Nhập email của bạn"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <View style={styles.forgotPass}>
          <Link href="/forgot-password">
            <Typography variant="caption" color="#2563EB" weight="600">Quên mật khẩu?</Typography>
          </Link>
        </View>

        <Button 
          title="Đăng nhập" 
          onPress={handleEmailLogin} 
          loading={loading}
          size="lg"
        />

        <View style={styles.divider}>
          <View style={styles.line} />
          <Typography variant="caption" color="#9CA3AF" style={{ paddingHorizontal: 8 }}>hoặc</Typography>
          <View style={styles.line} />
        </View>

        <Button 
          title="Đăng nhập bằng Facebook" 
          variant="outline" 
          onPress={loginFB}
          size="lg"
        />

        <View style={styles.register}>
          <Typography variant="body">Chưa có tài khoản? </Typography>
          <Link href="/register">
            <Typography variant="body" color="#2563EB" weight="bold">Đăng ký ngay</Typography>
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
  forgotPass: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
});
