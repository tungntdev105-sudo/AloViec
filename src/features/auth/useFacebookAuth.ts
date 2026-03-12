import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';

WebBrowser.maybeCompleteAuthSession();

// Cần thay ID thực tế vào đây sau khi có FB App
const FB_APP_ID = '1234567890123456'; 

export function useFacebookAuth() {
  const { setUser } = useAuth();
  
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FB_APP_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setUser({
        id: 'facebook-user',
        name: 'Người dùng Facebook', // Trong thực tế lấy từ Graph API FB
        email: 'facebook-mock@example.com',
        token: authentication?.accessToken || 'mock-token',
      });
    }
  }, [response]);

  const handleLogin = async () => {
    // Để test logic khi chưa cấu hình config chuẩn trên dev account FB
    if (FB_APP_ID === '1234567890123456') {
      console.log('Đang sử dụng mock login Facebook do chưa có App ID thực.');
      setUser({
        id: 'mock-user',
        name: 'Người dùng Thử nghiệm',
        email: 'mock-user@aloviec.com',
        token: 'mock-facebook-token-123',
      });
      return;
    }
    
    await promptAsync();
  };

  return { handleLogin, isReady: !!request };
}
