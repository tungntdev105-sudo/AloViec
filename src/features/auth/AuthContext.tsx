import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/src/services/firebase';
import { authenticateWithBiometrics } from './useBiometrics';
import { ActivityIndicator, View } from 'react-native';

type User = {
  id: string;
  name: string;
  email: string | null;
  token?: string;
} | null;

interface AuthContextType {
  user: User;
  setUser: (userData: User) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lắng nghe trạng thái đăng nhập Firebase đổi
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Đã từng đăng nhập (lưu từ AsyncStorage), check sinh trắc học
        const success = await authenticateWithBiometrics();
        
        if (success) {
          setUserState({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Unknown User',
            email: firebaseUser.email,
          });
        } else {
          // Cancel/Fail biometrics - signout (tuỳ theo policy của app)
          auth.signOut();
          setUserState(null);
        }
      } else {
        setUserState(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const setUser = (userData: User) => {
    setUserState(userData);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
